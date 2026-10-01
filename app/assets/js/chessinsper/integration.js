import { Chess } from "../../engines/libraries/chessjs/chess.js";

export async function getChessinsper(instance, profile) {
  const settings = ChessinsperCore.normalizeSettings(
    await instance.getConfigValue("chessinsper", profile),
  );
  if (
    !settings.enabled ||
    !instance.currentFen ||
    instance.boardDimensions?.width !== 8 ||
    instance.boardDimensions?.height !== 8
  )
    return null;
  try {
    new Chess(instance.currentFen);
  } catch {
    return null;
  }
  const pv = instance.pV[profile];
  if (!pv) return null;
  if (pv.useChess960 || (pv.chessVariant && pv.chessVariant !== "chess"))
    return null;
  const signature = ChessinsperCore.behaviorSignature(settings);
  if (pv.chessinsperSignature !== signature) {
    pv.chessinsperSignature = signature;
    pv.chessinsperRuntime = ChessinsperCore.createRuntime(settings, {
      Chess,
      id: `${instance.instanceID}:${profile}`,
    });
  }
  pv.chessinsperRuntime.settings.visualIntelligence =
    settings.visualIntelligence;
  return pv.chessinsperRuntime;
}

export async function applyChessinsperSearch(instance, profile, fen) {
  const runtime = await getChessinsper(instance, profile);
  if (!runtime) return null;
  const plan = runtime.searchPlan(fen, instance.pV[profile].chessinsperContext);
  const options = instance.pV[profile].uciOptions || {};
  if (options.MultiPV) {
    const count = Math.min(
      options.MultiPV.max || 20,
      Math.max(options.MultiPV.min || 1, plan.multiPV),
    );
    instance.pV[profile].multiPV = count;
    await instance.sendMsgToEngine(
      `setoption name MultiPV value ${count}`,
      profile,
      true,
    );
  }
  if (options["Skill Level"]) {
    await instance.sendMsgToEngine(
      `setoption name Skill Level value ${options["Skill Level"].max ?? 20}`,
      profile,
      true,
    );
  }
  const elo = options.UCI_Elo;
  if (elo && options.UCI_LimitStrength) {
    const limit = plan.strength >= elo.min && plan.strength <= elo.max;
    await instance.sendMsgToEngine(
      `setoption name UCI_LimitStrength value ${limit}`,
      profile,
      true,
    );
    if (limit)
      await instance.sendMsgToEngine(
        `setoption name UCI_Elo value ${plan.strength}`,
        profile,
        true,
      );
  } else if (elo) {
    const rating = Math.max(
      elo.min || 400,
      Math.min(elo.max || 3000, plan.strength),
    );
    await instance.sendMsgToEngine(
      `setoption name UCI_Elo value ${rating}`,
      profile,
      true,
    );
  }
  instance.pV[profile].searchDepth = plan.depth;
  // Calibrated depth owns the search budget; engine-specific node overrides remain available in native mode.
  instance.pV[profile].engineNodes = 0;
  return plan;
}

export function visibleChessinsperMoves(
  runtime,
  fen,
  moves,
  isPlayerTurn = true,
) {
  const visual = runtime.settings.visualIntelligence;
  if (
    !visual.enabled ||
    (visual.showOnlyOwnTurn && !isPlayerTurn) ||
    (!visual.bestMove && !visual.alternatives) ||
    visual.arrowOpacity === 0
  )
    return [];
  const board = new Chess(fen);
  return moves
    .filter((move, index) => {
      if (index === 0 ? !visual.bestMove : !visual.alternatives) return false;
      return (
        visual.pieceFilter === "all" ||
        board.get(move.player?.[0])?.type === visual.pieceFilter
      );
    })
    .slice(0, visual.maxArrows)
    .map((move) => ({
      ...move,
      chessinsperVisual: {
        scale: visual.arrowScale,
        lineWidth: visual.lineWidth,
        opacity: visual.arrowOpacity / 100,
        primary: visual.colors.best,
        secondary: visual.colors.alt,
        opponent: visual.colors.response,
        showOpponent: visual.threats,
        constantOpponent: visual.threats,
      },
    }));
}
