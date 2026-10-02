import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { Chess } from "../app/assets/engines/libraries/chessjs/chess.js";
const require = createRequire(import.meta.url);
const core = require("../userscript-components/ChessinsperCore.js");
const behavior = require("../userscript-components/ChessinsperBehavior.js");
const fen = new Chess().fen();
function fixture(input = {}, stored) {
  let time = 100000,
    saved = stored;
  const settings = core.normalizeSettings({
    enabled: true,
    session: { autoQueue: true, betweenGamesMs: { min: 1000, max: 1000 } },
    postGame: { enabled: false },
    ...input,
  });
  const controller = behavior.create(settings, {
    now: () => time,
    random: () => 0.5,
    read: () => saved,
    write: (value) => (saved = value),
  });
  const observe = (id, result = null, extra = {}) =>
    controller.observe({
      gameId: id,
      fen,
      timeControl: "3+2",
      queueAvailable: true,
      gameOver: !!result,
      result,
      ...extra,
    });
  return {
    settings,
    controller,
    observe,
    advance: (ms) => {
      time += ms;
    },
    saved: () => saved,
  };
}
test("sessions record each result once and persist across reloads", () => {
  const f = fixture();
  f.observe("game-a");
  f.observe("game-a", "W");
  f.observe("game-a", "W");
  assert.equal(f.controller.status().games, 1);
  assert.equal(f.controller.status().wins, 1);
  assert.equal(f.controller.queueDecision().allowed, false);
  f.advance(1001);
  assert.equal(f.controller.queueDecision().allowed, true);
  const g = fixture({}, f.saved());
  g.observe("game-a", "W");
  assert.equal(g.controller.status().games, 1);
  assert.equal(g.controller.status().totalGames, 1);
});
test("session limit waits for a fixed deadline and resets only session counters", () => {
  const f = fixture({
    session: {
      autoQueue: true,
      maxGamesPerSession: 2,
      breakDurationMs: 10000,
      betweenGamesMs: { min: 0, max: 0 },
    },
  });
  f.observe("a");
  f.observe("a", "W");
  f.observe("b");
  f.observe("b", "D");
  const deadline = f.controller.queueDecision().waitUntil;
  f.advance(5000);
  f.observe("b", "D");
  assert.equal(f.controller.queueDecision().waitUntil, deadline);
  assert.equal(f.controller.queueDecision().allowed, false);
  f.advance(5001);
  f.observe("b", "D");
  assert.equal(f.controller.status().games, 0);
  assert.equal(f.controller.status().totalGames, 2);
  assert.equal(f.controller.queueDecision().allowed, true);
});
test("hourly caps survive session resets and release at the oldest result deadline", () => {
  const f = fixture({
    session: {
      autoQueue: true,
      maxGamesPerHour: 2,
      maxGamesPerSession: 100,
      betweenGamesMs: { min: 0, max: 0 },
    },
  });
  f.observe("a", "L");
  f.advance(1000);
  f.observe("b", "D");
  assert.match(f.controller.queueDecision().reason, /por hora/);
  f.controller.resetSession();
  assert.equal(f.controller.queueDecision().allowed, false);
  f.advance(3600000);
  f.observe("b", "D");
  assert.equal(f.controller.queueDecision().allowed, true);
});
test("master switch, pause, Coach and changed time control all block actions", () => {
  const f = fixture();
  f.observe("a");
  assert.equal(f.controller.canMove(), true);
  f.controller.pause(true);
  assert.equal(f.controller.canMove(), false);
  f.controller.pause(false);
  f.controller.configure({ ...f.settings, enabled: false });
  assert.equal(f.controller.canMove(), false);
  assert.equal(f.controller.queueDecision().allowed, false);
  f.controller.configure({
    ...f.settings,
    coach: { enabled: true, disableAutoOnEnable: true },
  });
  assert.equal(f.controller.canMove(), false);
  f.controller.configure(f.settings);
  f.observe("a", "W", { timeControl: "10+0" });
  f.advance(12000);
  assert.match(f.controller.queueDecision().reason, /Ritmo mudou/);
});
test("queue retries are bounded, and new games cancel the prior queue deadline", () => {
  const f = fixture();
  f.observe("a", "D");
  f.advance(2000);
  for (let i = 0; i < 3; i++) {
    assert.equal(f.controller.queueDecision().allowed, true);
    f.controller.queueAttempt();
    f.advance(10001);
  }
  assert.equal(f.controller.queueDecision().allowed, false);
  f.observe("b");
  assert.equal(f.controller.status().queueAttempts, 0);
  assert.equal(f.controller.queueDecision().allowed, false);
  assert.equal(f.controller.canMove(), true);
});
test("warmup, tilt duration and account history reach the native engine plan", () => {
  const f = fixture({
    engineUI: { strength: 1800 },
    warmup: { durationGames: 2, startEloOffset: -200 },
    tilt: { durationGames: 2 },
  });
  const first = f.observe("a");
  assert.equal(first.effectiveRating, 1600);
  const runtime = core.createRuntime(f.settings, { Chess });
  assert.equal(runtime.searchPlan(fen, first).strength, 1600);
  f.observe("a", "L");
  assert.equal(f.observe("b").tiltActive, true);
  f.observe("b", "W");
  assert.equal(f.observe("c").tiltActive, true);
  f.observe("c", "D");
  assert.equal(f.observe("d").tiltActive, false);
  assert.equal(f.controller.context().effectiveRating, 1800);
});
test("unknown results stay separate and move confirmations are idempotent", () => {
  const f = fixture();
  f.observe("a", null, { gameOver: true });
  f.observe("a", null, { gameOver: true });
  assert.equal(f.controller.status().unknown, 1);
  assert.equal(f.controller.status().losses, 0);
  f.observe("a", "W");
  f.observe("a", "W");
  assert.equal(f.controller.status().unknown, 0);
  assert.equal(f.controller.status().wins, 1);
  assert.equal(f.controller.status().games, 1);
  const move = { fen, move: "e2e4", cpLoss: 30 };
  f.controller.recordMove(move);
  f.controller.recordMove(move);
  assert.equal(f.controller.status().moves, 1);
  assert.equal(f.controller.status().averageCPLoss, 30);
  const other = fixture();
  assert.equal(other.controller.status().moves, 0);
});
test("seeded weaknesses persist across games and Coach chooses the engine best candidate", () => {
  const a = core.createRuntime({ seed: "account-a" }, { Chess, id: "game-1" }),
    b = core.createRuntime({ seed: "account-a" }, { Chess, id: "game-2" });
  assert.deepEqual(a.diagnostics().weaknesses, b.diagnostics().weaknesses);
  const c = core.createRuntime({ seed: "account-b" }, { Chess });
  assert.notDeepEqual(a.diagnostics().weaknesses, c.diagnostics().weaknesses);
  const coach = core.createRuntime({ coach: { enabled: true } }, { Chess });
  const candidates = ["e2e4", "d2d4", "g1f3"].map((move, i) => ({
    player: [move.slice(0, 2), move.slice(2)],
    ranking: i + 1,
    cp: 50 - i * 20,
    pv: [move, "e7e5"],
  }));
  assert.equal(coach.chooseMoves(fen, candidates).choice.move, "e2e4");
  assert.deepEqual(coach.coachReport(fen, candidates).alternatives, [
    "d2d4",
    "g1f3",
  ]);
});
test("AFK uses a worker plus fallback and cleans up listeners, worker and URL", async () => {
  const window = new EventTarget(),
    document = new EventTarget();
  let terminated = 0,
    revoked = 0,
    cancelled = 0,
    recoveries = 0,
    ticks = 0;
  const timers = new Set();
  let worker;
  const environment = Object.assign(window, {
    document,
    Blob,
    URL: {
      createObjectURL: () => "blob:test",
      revokeObjectURL: () => revoked++,
    },
    Worker: class {
      constructor() {
        worker = this;
      }
      terminate() {
        terminated++;
      }
    },
    setInterval: (fn) => {
      timers.add(fn);
      return fn;
    },
    clearInterval: (fn) => timers.delete(fn),
    setTimeout,
    clearTimeout,
  });
  const supervisor = behavior.createSupervisor(
    {
      tick: () => ticks++,
      cancel: () => cancelled++,
      recover: () => recoveries++,
    },
    environment,
  );
  supervisor.start();
  await Promise.resolve();
  assert.equal(supervisor.isActive(), true);
  assert.equal(timers.size, 1);
  worker.onmessage();
  await Promise.resolve();
  document.dispatchEvent(new Event("freeze"));
  window.dispatchEvent(new Event("pageshow"));
  await Promise.resolve();
  assert.equal(recoveries, 1);
  supervisor.stop();
  assert.equal(timers.size, 0);
  assert.equal(terminated, 1);
  assert.equal(revoked, 1);
  assert.ok(cancelled >= 2);
  window.dispatchEvent(new Event("focus"));
  await Promise.resolve();
  assert.equal(recoveries, 1);
  assert.ok(ticks >= 1);
});
test("legacy session and AFK settings import while runtime counters remain separate", () => {
  const settings = core.normalizeSettings({
    auto: { autoQueue: true, afkGuard: false },
    session: { gamesPlayed: 99, maxGamesPerSession: 5 },
  });
  assert.equal(settings.session.autoQueue, true);
  assert.equal(settings.afk.enabled, false);
  assert.equal(settings.session.maxGamesPerSession, 5);
  assert.equal(settings.session.gamesPlayed, undefined);
  const invalid = core.normalizeSettings({
    session: { maxGamesPerHour: -5 },
    warmup: { durationGames: 0 },
    tilt: { suboptimalBoost: 999 },
  });
  assert.equal(invalid.session.maxGamesPerHour, 1);
  assert.equal(invalid.warmup.durationGames, 1);
  assert.equal(invalid.tilt.suboptimalBoost, 0.3);
});
test("resignation needs distinct losing positions, a deadline and an enabled unpaused profile", () => {
  const f = fixture({
    autoResign: {
      enabled: true,
      consecutiveMoves: 2,
      minMoveNumber: 1,
      resignChance: 1,
      delay: { min: 2000, max: 2000 },
    },
  });
  f.observe("a");
  f.controller.recordAnalysis({ fen, bestCp: -700 });
  f.controller.recordAnalysis({ fen, bestCp: -700 });
  assert.equal(f.controller.canResign(), false);
  const next = fen.replace(" 0 1", " 0 2");
  f.controller.recordAnalysis({ fen: next, bestCp: -800 });
  assert.equal(f.controller.canMove(), false);
  f.advance(2001);
  assert.equal(f.controller.canResign(), true);
  f.controller.pause(true);
  assert.equal(f.controller.canResign(), false);
  f.controller.pause(false);
  f.controller.resignAttempt(false);
  assert.equal(f.controller.canResign(), false);
  f.advance(1501);
  assert.equal(f.controller.canResign(), true);
  f.controller.resignAttempt(true);
  assert.equal(f.controller.canResign(), false);
  f.observe("b");
  assert.equal(f.controller.canMove(), true);
});
test("opponent adaptation and rate balancing remain explicit optional policies", () => {
  const f = fixture({
    warmup: { enabled: false },
    opponentAdaptation: { enabled: true, ratingEdge: 100 },
  });
  assert.equal(
    f.observe("a", null, { opponentRating: 1400 }).effectiveRating,
    1500,
  );
  f.controller.configure({
    ...f.settings,
    opponentAdaptation: { enabled: false },
    winrateTarget: {
      enabled: true,
      target: 0.5,
      sampleGames: 2,
      overshootBoost: 0.4,
    },
  });
  f.observe("a", "W");
  f.observe("b", "W");
  assert.equal(f.controller.context().effectiveRating, 1600);
});
test("an unresponsive resignation control expires and releases move execution", () => {
  const f = fixture({
    autoResign: {
      enabled: true,
      consecutiveMoves: 1,
      minMoveNumber: 1,
      resignChance: 1,
      delay: { min: 0, max: 0 },
    },
  });
  f.observe("a");
  f.controller.recordAnalysis({ fen, bestCp: -900 });
  assert.equal(f.controller.canMove(), false);
  f.controller.resignAttempt(false);
  f.advance(10001);
  f.observe("a");
  assert.equal(f.controller.canResign(), false);
  assert.equal(f.controller.canMove(), true);
});
