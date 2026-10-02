// Chessinsper computes board information; A.C.A.S UniversalBoardDrawer renders every descriptor.
export function chessinsperMetrics(runtime, fen, playerColor) {
  const cfg = {
    ...runtime.settings.visualIntelligence,
    hanging:
      runtime.settings.visualIntelligence.hanging ||
      (runtime.settings.coach?.enabled &&
        runtime.settings.coach.showHangingPieces),
  };
  const side = String(playerColor || fen.split(" ")[1]).toLowerCase()[0],
    enemy = side === "w" ? "b" : "w";
  if (!cfg.enabled || (cfg.showOnlyOwnTurn && fen.split(" ")[1] !== side))
    return [];
  const a = ChessinsperCore.analyze(fen),
    colors = cfg.colors,
    shapes = [];
  const fill = (sq, color, opacity = 1) =>
    shapes.push({
      shapeType: "rectangle",
      shapeSquare: sq,
      shapeConfig: {
        style: `fill:${color};opacity:${cfg.markerOpacity * opacity};stroke:none;`,
      },
    });
  const mark = (sq, color, text) =>
    shapes.push({
      shapeType: "text",
      shapeSquare: sq,
      shapeConfig: {
        text,
        size: 1.1 * cfg.markerScale,
        style: `fill:${color};opacity:${Math.min(1, cfg.markerOpacity + 0.35)};stroke:#111;stroke-width:.035;paint-order:stroke;`,
        position: [0.55, 0.55],
      },
    });
  if (cfg.ownVision)
    for (const sq of a.attack[side].keys()) fill(sq, colors.own);
  if (cfg.enemyVision)
    for (const sq of a.attack[enemy].keys()) fill(sq, colors.enemy);
  if (cfg.contested) a.contested.forEach((sq) => fill(sq, colors.contested));
  if (cfg.safeSquares) a.safe[side].forEach((sq) => fill(sq, colors.safe, 0.7));
  if (cfg.neutralSquares)
    a.neutral.forEach((sq) => fill(sq, colors.neutral, 0.35));
  if (cfg.controlIntensity)
    for (const c of a.squareControl) {
      const difference = c[side] - c[enemy];
      if (difference)
        fill(
          c.sq,
          difference > 0 ? colors.own : colors.enemy,
          Math.min(1.5, 0.4 + Math.abs(difference) * 0.25),
        );
    }
  if (cfg.attackerDefenderBalance)
    for (const c of a.squareControl.filter((c) => c[side] && c[enemy]))
      mark(
        c.sq,
        c[side] >= c[enemy] ? colors.own : colors.enemy,
        `${c[side]}:${c[enemy]}`,
      );
  if (cfg.pins)
    for (const pin of a.pins) {
      const own = pin.side === side,
        score = own ? pin.scoreForSide : pin.scoreForEnemy;
      mark(
        pin.pinned,
        own ? colors.ownPin : colors.enemyPin,
        cfg.pinValues
          ? `${score > 0 ? "+" : ""}${Number(score.toFixed(2))}`
          : pin.kind === "absolute"
            ? "P"
            : "R",
      );
    }
  for (const [flag, group, color, label] of [
    ["hanging", a.hanging[side], colors.weak, "H"],
    ["loose", a.loose[side], colors.weak, "L"],
    ["vulnerableOwn", a.vulnerable[side], colors.weak, "!"],
    ["vulnerableEnemy", a.vulnerable[enemy], colors.safe, "×"],
  ])
    if (cfg[flag]) group.forEach((x) => mark(x.sq, color, label));
  if (cfg.kingSafety)
    a.kingSafety[side]?.attacked.forEach((sq) => fill(sq, colors.enemy));
  if (cfg.kingDiagonals)
    a.kingSafety[side]?.openDiagonals.forEach((x) =>
      x.ray.forEach((sq) => fill(sq, colors.weak, 0.5)),
    );
  if (cfg.potentialChecks)
    a.kingSafety[side]?.potentialChecks.forEach((x) =>
      mark(x.to, colors.enemy, "+"),
    );
  if (cfg.pawnStructure) {
    a.pawns[side].passed.forEach((sq) =>
      mark(
        sq,
        colors.safe,
        a.pawns[side].protectedPassed.includes(sq) ? "PP" : "P",
      ),
    );
    a.pawns[side].isolated.forEach((sq) => mark(sq, colors.weak, "I"));
    a.pawns[side].backward.forEach((sq) => mark(sq, colors.weak, "B"));
    a.pawns[side].weakTargets.forEach((sq) => mark(sq, colors.weak, "W"));
  }
  if (cfg.weakSquares)
    a.weakSquares[side].forEach((sq) => fill(sq, colors.weak, 0.55));
  for (const [flag, items, field, color, label, selectedSide] of [
    ["xray", a.xrays, "target", colors.contested, "X", side],
    ["xray", a.skewers, "front", colors.contested, "S", side],
    ["xray", a.discovered, "blocker", colors.own, "D", side],
    ["xray", a.batteries, "front", colors.contested, "B", side],
    ["overloaded", a.overloaded, "sq", colors.weak, "O", enemy],
    ["forks", a.forks, "forker", colors.own, "F", side],
    ["forkPotential", a.forkPotential, "to", colors.safe, "F?", side],
    ["trapped", a.trapped, "sq", colors.weak, "T", enemy],
  ])
    if (cfg[flag])
      items
        .filter((x) => x.side === selectedSide)
        .forEach((x) => mark(x[field], color, label));
  if (cfg.pieceContributions)
    [...a.metrics.pieceContributions[side]]
      .sort((x, y) => y.score - x.score)
      .slice(0, 6)
      .forEach((x) => mark(x.sq, colors.best, String(x.score)));
  return shapes;
}
