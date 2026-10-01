import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { Chess } from "../app/assets/engines/libraries/chessjs/chess.js";
import { chessinsperMetrics } from "../app/assets/js/chessinsper/visuals.js";
import { visibleChessinsperMoves } from "../app/assets/js/chessinsper/integration.js";
const require = createRequire(import.meta.url);
const core = require("../userscript-components/ChessinsperCore.js");
const input = require("../userscript-components/ChessinsperAutomation.js");
const start = new Chess().fen();
const candidates = (moves = ["e2e4", "d2d4", "g1f3", "b1c3", "c2c4", "a2a3"]) =>
  moves.map((move, index) => ({
    player: [move.slice(0, 2), move.slice(2, 4)],
    playerPromotion: move[4] || null,
    opponent: [null, null],
    cp: 35 - index * 12,
    ranking: index + 1,
    profile: "default",
  }));

test("legacy Chessinsper settings import excludes engine providers and unsafe values", () => {
  const settings = core.normalizeSettings(
    JSON.stringify({
      engineType: "api",
      api: { url: "https://example.com" },
      engineUI: {
        strength: 9999,
        candidateMoves: -1,
        manualDepth: 100,
        personality: { risk: 500 },
      },
      visualIntelligence: {
        arrowOpacity: 0,
        colors: { best: "red;position:fixed" },
      },
    }),
  );
  assert.equal(settings.engineUI.strength, 3000);
  assert.equal(settings.engineUI.candidateMoves, 1);
  assert.equal(settings.engineUI.manualDepth, 22);
  assert.equal(settings.engineUI.personality.risk, 100);
  assert.equal(settings.visualIntelligence.arrowOpacity, 0);
  assert.match(settings.visualIntelligence.colors.best, /^#[a-f0-9]{6}$/);
  assert.equal(settings.api, undefined);
  assert.equal(settings.engineType, undefined);
});
test("strength and manual depth control the existing engine search plan", () => {
  const weak = core.defaults(),
    strong = core.defaults();
  weak.engineUI.strength = 400;
  strong.engineUI.strength = 3000;
  const a = core.createRuntime(weak, { Chess }).searchPlan(start),
    b = core.createRuntime(strong, { Chess }).searchPlan(start);
  assert.ok(a.depth < b.depth);
  assert.ok(a.multiPV >= b.multiPV);
  strong.engineUI.depthMode = "manual";
  strong.engineUI.manualDepth = 4;
  strong.engineUI.candidateMoves = 12;
  const manual = core.createRuntime(strong, { Chess }).searchPlan(start);
  assert.equal(manual.depth, 4);
  assert.equal(manual.multiPV, 12);
});
test("human move selection uses only legal supplied candidates and stays stable for a position", () => {
  const runtime = core.createRuntime(core.defaults(), {
      Chess,
      id: "test-game",
    }),
    moves = candidates();
  moves.push({ player: ["e2", "e5"], cp: 900, ranking: 1 });
  const a = runtime.chooseMoves(start, moves),
    b = runtime.chooseMoves(start, moves);
  assert.ok(candidates().some((m) => m.player.join("") === a.choice.move));
  assert.equal(a.choice.move, b.choice.move);
  assert.ok(a.moves.every((m) => m.player.join("") !== "e2e5"));
  assert.equal(runtime.diagnostics().choices, 1);
  assert.ok(
    a.choice.explanation.distribution.every(
      (c) => Number.isFinite(c.probability) && c.probability >= 0,
    ),
  );
});
test("native engine mode selects the top candidate and handles zero evaluation", () => {
  const settings = core.defaults();
  settings.engineUI.humanMode = false;
  const runtime = core.createRuntime(settings, { Chess });
  const moves = candidates();
  moves[0].cp = 0;
  const result = runtime.chooseMoves(start, moves);
  assert.equal(result.choice.move, "e2e4");
  assert.equal(result.choice.reason, "engine");
});

test("original presets select legal candidates across opening, middlegame and endgame", () => {
  const game = new Chess();
  for (const move of [
    "e4",
    "e5",
    "Nf3",
    "Nc6",
    "Bb5",
    "a6",
    "Ba4",
    "Nf6",
    "O-O",
    "Be7",
    "Re1",
    "b5",
    "Bb3",
    "d6",
    "c3",
    "O-O",
    "h3",
  ])
    game.move(move);
  for (const preset of Object.values(core.createRuntime().presets)) {
    for (const fen of [
      start,
      game.fen(),
      "8/3k4/4p3/3pP3/3P4/4K3/8/8 w - - 0 1",
    ]) {
      const runtime = core.createRuntime({ engineUI: preset }, { Chess });
      const pool = new Chess(fen)
        .moves({ verbose: true })
        .slice(0, 12)
        .map((m, i) => ({
          player: [m.from, m.to],
          playerPromotion: m.promotion || null,
          ranking: i + 1,
          cp: 100 - i * 20,
        }));
      assert.ok(Number.isFinite(runtime.searchPlan(fen).depth));
      const result = runtime.chooseMoves(fen, pool);
      assert.ok(
        pool.some(
          (m) =>
            m.player.join("") + (m.playerPromotion || "") ===
            result.choice.move,
        ),
      );
      assert.ok(Number.isFinite(result.choice.delayMs));
      runtime.recordMove({ ...result.choice, fen, role: "own" });
    }
  }
});
test("clock-aware delay preserves dispatch time with a subsecond clock", () => {
  const result = core
    .createRuntime(core.defaults(), { Chess })
    .chooseMoves(start, candidates(), {
      clockSeconds: 0.4,
      timeControl: "1|0",
    });
  assert.ok(result.choice.delayMs > 0);
  assert.ok(result.choice.delayMs < 400);
});

test("visual changes preserve the behavior signature while engine changes invalidate it", () => {
  const settings = core.defaults(),
    original = core.behaviorSignature(settings);
  settings.visualIntelligence.colors.best = "#123abc";
  settings.visualIntelligence.maxArrows = 0;
  assert.equal(core.behaviorSignature(settings), original);
  settings.engineUI.strength = 800;
  assert.notEqual(core.behaviorSignature(settings), original);
});

test("arrow visibility obeys own-turn and piece filters without restricting the engine candidate pool", () => {
  const settings = core.defaults();
  settings.visualIntelligence.pieceFilter = "n";
  settings.visualIntelligence.maxArrows = 1;
  const runtime = core.createRuntime(settings, { Chess }),
    pool = candidates();
  assert.deepEqual(visibleChessinsperMoves(runtime, start, pool, false), []);
  assert.equal(
    visibleChessinsperMoves(runtime, start, pool, true)[0].player[0],
    "g1",
  );
  assert.ok(pool.length > 1);
});
test("board intelligence retains Chessinsper absolute pins and all visual layers use native shape descriptors", () => {
  const fen = "4k3/8/8/8/8/4r3/4B3/4K3 w - - 0 1",
    analysis = core.analyze(fen);
  assert.ok(
    analysis.pins.some((p) => p.pinned === "e2" && p.kind === "absolute"),
  );
  const settings = core.defaults();
  for (const k of Object.keys(settings.visualIntelligence))
    if (typeof settings.visualIntelligence[k] === "boolean")
      settings.visualIntelligence[k] = true;
  const shapes = chessinsperMetrics(
    core.createRuntime(settings, { Chess }),
    fen,
    "w",
  );
  assert.ok(shapes.length > 0);
  assert.ok(
    shapes.every(
      (s) =>
        ["text", "rectangle"].includes(s.shapeType) &&
        /^[a-h][1-8]$/.test(s.shapeSquare),
    ),
  );
  assert.deepEqual(
    chessinsperMetrics(core.createRuntime(settings, { Chess }), fen, "b"),
    [],
  );
});
for (const [label, fen, move] of [
  ["regular move", start, "e2e4"],
  ["castling", "r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1", "e1g1"],
  ["en passant", "4k3/8/8/3pP3/8/8/8/4K3 w - d6 0 1", "e5d6"],
  ["underpromotion", "4k3/P7/8/8/8/8/8/4K3 w - - 0 1", "a7a8n"],
  ["black promotion", "4k3/8/8/8/8/8/p7/4K3 b - - 0 1", "a2a1r"],
])
  test(`automation confirms the exact board transition for ${label}`, () => {
    const game = new Chess(fen);
    assert.ok(
      game.move({
        from: move.slice(0, 2),
        to: move.slice(2, 4),
        promotion: move[4],
      }),
    );
    assert.equal(input.expectedBoard(fen, move), game.fen().split(" ")[0]);
  });
