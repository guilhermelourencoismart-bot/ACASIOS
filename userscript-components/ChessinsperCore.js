/*
 * Chessinsper policies adapted from Chessrinsper 1.2.1-rc.1 (MIT), supplied by the user.
 * A.C.A.S owns engine workers, board detection, communication and all shape rendering.
 * This module has no remote engine, AI provider, DOM overlay or background loop.
 * Original source metadata: @author Chessrinsper; @license MIT.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function (root) {
  "use strict";
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const DEFAULTS = {
    enabled: false,
    dragSpeed: 1,
    engineUI: {
      strength: 1800,
      analysisQuality: "balanced",
      depthMode: "auto",
      manualDepth: 14,
      playingStyle: "universal",
      humanMode: true,
      eloCalibration: true,
      openingBook: false,
      candidateMoves: 5,
      personality: {
        creativity: 50,
        risk: 45,
        tactical: 55,
        positional: 55,
        kingSafety: 60,
        materialInitiative: 50,
        attackPreference: 50,
        exchangePreference: 50,
        queenTradePreference: 50,
        simplification: 50,
      },
      advanced: {
        openingStrength: 100,
        middlegameStrength: 100,
        endgameStrength: 100,
        consistency: 70,
        mistakeProfile: "natural",
        mistakeSeverity: 45,
        openingTheory: "theory",
        openingVariety: 55,
        openingRepertoire: "balanced",
        comebackMode: true,
        conversionMode: true,
        criticalBoost: true,
        easyRelaxation: true,
        alternativeQuality: 60,
        autoBalance: true,
        humanVariation: 45,
        movePrecision: 65,
      },
    },
    visualIntelligence: {
      enabled: true,
      pins: true,
      pinValues: true,
      hanging: true,
      loose: false,
      threats: true,
      ownVision: false,
      enemyVision: false,
      contested: false,
      safeSquares: false,
      neutralSquares: false,
      controlIntensity: false,
      attackerDefenderBalance: false,
      pieceContributions: false,
      kingSafety: false,
      kingDiagonals: false,
      potentialChecks: false,
      vulnerableOwn: true,
      vulnerableEnemy: true,
      bestMove: true,
      alternatives: true,
      xray: false,
      overloaded: false,
      forks: false,
      forkPotential: false,
      trapped: false,
      pawnStructure: false,
      weakSquares: false,
      showOnlyOwnTurn: true,
      markerOpacity: 0.48,
      markerScale: 0.72,
      lineWidth: 2,
      animation: "low",
      theme: "black-red",
      accent: "#e53935",
      boardTexture: "none",
      chessFont: "system",
      colors: {
        own: "#ef5350",
        enemy: "#ff8a80",
        contested: "#ab47bc",
        safe: "#43a047",
        neutral: "#78909c",
        ownPin: "#ff5252",
        enemyPin: "#ffb74d",
        best: "#e53935",
        alt: "#b0bec5",
        response: "#ff8a80",
        weak: "#ff9800",
      },
      pieceInspector: false,
      pieceOnlyAnalysis: false,
      moveFeedback: true,
      arrowScale: 1,
      arrowOpacity: 80,
      maxArrows: 3,
      pieceFilter: "all",
    },
    timing: {
      base: { min: 1500, max: 5000 },
      clockAware: {
        enabled: true,
        thresholds: [
          { secondsBelow: 30, timingMult: 0.25 },
          { secondsBelow: 60, timingMult: 0.4 },
          { secondsBelow: 120, timingMult: 0.6 },
          { secondsBelow: 300, timingMult: 0.8 },
        ],
      },
    },
    inputExecution: {
      clickMoveChance: 0.3,
      maxAttempts: 3,
      confirmationTimeoutMs: 1200,
      watchdogMs: 12000,
      pollMs: 50,
      stableReads: 2,
    },
    automation: {
      method: "mixed",
      minDelayMs: 800,
      maxDelayMs: 5000,
      clockAware: true,
    },
    session: {
      enabled: true,
      autoQueue: false,
      maxGamesPerSession: 8,
      breakDurationMs: 300000,
      maxWinStreak: 6,
      maxGamesPerHour: 6,
      betweenGamesMs: { min: 3000, max: 12000 },
    },
    afk: { enabled: true, localKeepAlive: false },
    warmup: {
      enabled: true,
      manualOverride: false,
      durationGames: 12,
      startEloOffset: -150,
    },
    winrateTarget: {
      enabled: false,
      target: 0.58,
      sampleGames: 12,
      overshootBoost: 0.4,
    },
    tilt: {
      enabled: true,
      durationGames: 2,
      suboptimalBoost: 0.08,
      blunderMult: 1.35,
      timingMult: 1.2,
    },
    opponentAdaptation: { enabled: false, ratingEdge: 100 },
    autoResign: {
      enabled: false,
      evalThreshold: -5,
      consecutiveMoves: 3,
      resignChance: 0.7,
      minMoveNumber: 10,
      delay: { min: 2000, max: 8000 },
    },
    annotations: {
      enabled: false,
      chancePerLongThink: 0.4,
      minThinkMs: 3000,
      maxPerThink: 3,
    },
    hardwarePersona: { enabled: true },
    weaknessProfile: { enabled: true },
    tcLock: { enabled: true },
    idleMouse: { enabled: false, triggerAfterMs: 3500, actionChance: 0.35 },
    postGame: {
      enabled: true,
      reviewChance: 0.18,
      reviewDurationMs: { min: 4000, max: 14000 },
    },
    coach: {
      enabled: false,
      disableAutoOnEnable: true,
      showAlternatives: true,
      showThreats: true,
      showHangingPieces: true,
      altEvalWindow: 0.5,
    },
    seed: "chessinsper-acas",
  };
  const INTERNAL_DEFAULTS = {
    engineUI: {
      strength: 1800,
      analysisQuality: "balanced",
      depthMode: "auto",
      manualDepth: 14,
      playingStyle: "universal",
      humanMode: true,
      eloCalibration: true,
      openingBook: false,
      candidateMoves: 5,
      personality: {
        creativity: 50,
        risk: 45,
        tactical: 55,
        positional: 55,
        kingSafety: 60,
        materialInitiative: 50,
        attackPreference: 50,
        exchangePreference: 50,
        queenTradePreference: 50,
        simplification: 50,
      },
      advanced: {
        openingStrength: 100,
        middlegameStrength: 100,
        endgameStrength: 100,
        consistency: 70,
        mistakeProfile: "natural",
        mistakeSeverity: 45,
        openingTheory: "theory",
        openingVariety: 55,
        openingRepertoire: "balanced",
        comebackMode: true,
        conversionMode: true,
        criticalBoost: true,
        easyRelaxation: true,
        alternativeQuality: 60,
        autoBalance: true,
        humanVariation: 45,
        movePrecision: 65,
      },
    },
    engineDepth: { base: 14, min: 6, max: 20, dynamicDepth: true },
    humanization: {
      enabled: true,
      targetEngineCorrelation: 0.62,
      ratingFidelity: {
        enabled: true,
        maxProfileShift: 75,
        suppressIntentionalLoss: true,
      },
      bookUseRate: 0.82,
      tablebaseUseRate: 0.32,
      suboptimalMoveRate: { opening: 0.15, middlegame: 0.22, endgame: 0.18 },
      winningDegradation: {
        enabled: true,
        tiers: [
          { evalAbove: 2, extraSuboptimalRate: 0.03 },
          { evalAbove: 4, extraSuboptimalRate: 0.06 },
          { evalAbove: 6, extraSuboptimalRate: 0.09 },
          { evalAbove: 8, extraSuboptimalRate: 0.12 },
        ],
      },
      losingSharpness: {
        enabled: true,
        evalBelow: -0.8,
        suboptimalReduction: 0.4,
      },
      maxAcceptableCPLoss: { opening: 55, middlegame: 110, endgame: 65 },
      blunder: {
        chance: 0.02,
        onlyInComplexPositions: true,
        maxCPLoss: 200,
        disableWhenEvalBetween: [-2, 2],
      },
      streaks: { enabled: true, perfectStreakMax: 7, sloppyStreakMax: 3 },
      personalityVariance: {
        enabled: true,
        suboptimalRateJitter: 0.15,
        depthJitter: 3,
        timingJitter: 0.4,
      },
      accuracyClustering: {
        enabled: true,
        hotStreakChance: 0.15,
        coldStreakChance: 0.07,
        streakDuration: { min: 3, max: 8 },
      },
      repertoireConsistency: { enabled: true },
      antiCorrelation: {
        enabled: true,
        maxTopMoveRate: 0.55,
        closeEvalThreshold: 0.4,
        closeEvalPreferRate: 0.28,
        missSmallTacticThreshold: 1.5,
        missSmallTacticRate: 0.08,
      },
      weaknessProfile: { enabled: true, seed: null },
      playerMoveDB: {
        enabled: false,
        minGames: 5,
        preferRate: 0.15,
        timeout: 3000,
      },
      timingAccuracyCoupling: {
        enabled: true,
        fastMoveSuboptimalBoost: 0.1,
        slowMoveBestBoost: 0.25,
        noiseRate: 0.12,
      },
    },
    humanMoveModel: {
      enabled: true,
      candidateLimit: 12,
      historyPlies: 12,
      explanationLimit: 5,
      minProbability: 0.000001,
      timeControls: {
        bullet: {
          qualityMult: 1.34,
          timingMult: 0.42,
          maxSpendFraction: 0.04,
          minReserveSeconds: 3,
          incrementCredit: 0.72,
        },
        blitz: {
          qualityMult: 1.14,
          timingMult: 0.72,
          maxSpendFraction: 0.06,
          minReserveSeconds: 8,
          incrementCredit: 0.68,
        },
        rapid: {
          qualityMult: 1,
          timingMult: 1,
          maxSpendFraction: 0.085,
          minReserveSeconds: 25,
          incrementCredit: 0.62,
        },
        classical: {
          qualityMult: 0.88,
          timingMult: 1.28,
          maxSpendFraction: 0.11,
          minReserveSeconds: 90,
          incrementCredit: 0.58,
        },
      },
    },
    inputExecution: {
      clickMoveChance: 0.3,
      maxAttempts: 3,
      confirmationTimeoutMs: 1200,
      watchdogMs: 12000,
      pollMs: 50,
      stableReads: 2,
    },
    timing: {
      base: { min: 1500, max: 5000 },
      forced: { min: 500, max: 1500 },
      book: { min: 600, max: 1800 },
      earlyGame: { min: 400, max: 1500 },
      complex: { min: 3500, max: 9000 },
      simple: { min: 1000, max: 2800 },
      longThink: { chance: 0.1, min: 6000, max: 15000 },
      instantMove: { chance: 0.03, min: 300, max: 700 },
      fatigue: { enabled: true, startMove: 20, msPerMove: 25, cap: 1200 },
      clockAware: {
        enabled: true,
        thresholds: [
          { secondsBelow: 30, timingMult: 0.25 },
          { secondsBelow: 60, timingMult: 0.4 },
          { secondsBelow: 120, timingMult: 0.6 },
          { secondsBelow: 300, timingMult: 0.8 },
        ],
      },
      sequenceVariation: {
        enabled: true,
        windowSize: 4,
        similarityThreshold: 0.3,
      },
      premove: { enabled: true, chance: 0.08, delay: { min: 50, max: 250 } },
    },
    dragSpeed: 1,
    visualIntelligence: {
      enabled: true,
      pins: true,
      pinValues: true,
      hanging: true,
      loose: false,
      threats: true,
      ownVision: false,
      enemyVision: false,
      contested: false,
      safeSquares: false,
      neutralSquares: false,
      controlIntensity: false,
      attackerDefenderBalance: false,
      pieceContributions: false,
      kingSafety: false,
      kingDiagonals: false,
      potentialChecks: false,
      vulnerableOwn: true,
      vulnerableEnemy: true,
      bestMove: true,
      alternatives: true,
      xray: false,
      overloaded: false,
      forks: false,
      forkPotential: false,
      trapped: false,
      pawnStructure: false,
      weakSquares: false,
      showOnlyOwnTurn: true,
      markerOpacity: 0.48,
      markerScale: 0.72,
      lineWidth: 2,
      animation: "low",
      theme: "black-red",
      accent: "#e53935",
      boardTexture: "none",
      chessFont: "system",
      colors: {
        own: "#ef5350",
        enemy: "#ff8a80",
        contested: "#ab47bc",
        safe: "#43a047",
        neutral: "#78909c",
        ownPin: "#ff5252",
        enemyPin: "#ffb74d",
        best: "#e53935",
        alt: "#b0bec5",
        response: "#ff8a80",
        weak: "#ff9800",
      },
      pieceInspector: false,
      pieceOnlyAnalysis: false,
      moveFeedback: true,
      arrowScale: 1,
      arrowOpacity: 80,
      maxArrows: 3,
      pieceFilter: "all",
    },
    forcedMove: {
      enabled: true,
      gapCp: 80,
      maxAlternatives: 1,
      instantMs: { min: 220, max: 750 },
    },
    blunderBias: {
      enabled: true,
      simpleCutoff: 0.3,
      simpleErrorMult: 0.35,
      criticalCutoff: 0.65,
      criticalErrorMult: 1.55,
    },
    shallowDepth: {
      enabled: true,
      chance: 0.1,
      preferLongPVChance: 0.45,
      longPVThreshold: 8,
    },
    motifBlindness: {
      enabled: true,
      zwischenzugMissChance: 0.18,
      longDiagonalMissChance: 0.12,
      backwardsKnightMissChance: 0.15,
      deflectionMissChance: 0.2,
    },
    endgameTechnique: {
      enabled: true,
      kpMistakeMult: 1.45,
      rpMistakeMult: 1.3,
      simpleMistakeMult: 1.2,
    },
    tilt: {
      enabled: true,
      triggerOn: ["L"],
      duration: { min: 1, max: 2 },
      suboptimalBoost: 0.08,
      blunderMult: 1.35,
      timingMult: 1.2,
    },
    premoveGating: { enabled: true, forcedOnly: true, allowRecaptures: true },
    bookExitPause: { enabled: true, multiplier: 2.4, minBookMovesBefore: 3 },
    timeBankCurve: {
      enabled: true,
      peakMove: 22,
      peakMultiplier: 1.35,
      falloffMoves: 12,
    },
    kingSafety: {
      enabled: true,
      evalDropTrigger: 0.5,
      defenseTimingMult: 1.45,
    },
    acplGovernor: {
      enabled: true,
      targetACPL: 45,
      windowSize: 20,
      hardCapMult: 1.15,
      softFloorMult: 0.55,
      minMoves: 6,
    },
    repertoireHard: {
      enabled: true,
      whiteFirstMoves: ["e4", "d4", "c4", "Nf3"],
      blackVsE4: ["c5", "e5", "e6", "c6"],
      blackVsD4: ["Nf6", "d5", "e6"],
      blackVsOther: ["Nf6", "d5"],
      picksPerColor: 2,
      deviationRate: 0.05,
    },
    antiDetection: {
      maxGamesPerHour: 6,
      randomAFK: {
        enabled: true,
        chance: 0.04,
        delay: { min: 4000, max: 15000 },
      },
      randomLegalMoveChance: 0.01,
      randomLegalMaxCPLoss: 250,
      changeOfMind: {
        enabled: true,
        chance: 0.12,
        hesitateMs: { min: 120, max: 350 },
      },
      sessionLengthJitter: 0.3,
      minBreakBetweenGames: { min: 3000, max: 12000 },
      telemetryNoise: {
        enabled: true,
        hoverChance: 0.05,
        premoveCancelChance: 0.02,
        uiClickChance: 0.03,
      },
    },
    engineRotation: {
      enabled: false,
      weights: { api: 0.55, local_full: 0.3, local_shallow: 0.15 },
      shallowDepth: 11,
    },
    autoLose: {
      enabled: false,
      triggerStreak: 5,
      suboptimalRate: 0.8,
      blunderChance: 0.25,
      maxCPLoss: 400,
      targetCorrelation: 0.2,
      minMovesBeforeLosing: 15,
    },
    account: {
      totalGamesPlayed: 0,
      repertoire: { white: null, black: null },
      hardware: null,
      recentResults: [],
      recentOpponentRatings: [],
      sessionTC: null,
      currentEngine: null,
    },
    multiPV: 5,
  };
  function mergeKnown(base, input) {
    const out = clone(base);
    if (!input || typeof input !== "object" || Array.isArray(input)) return out;
    for (const key of Object.keys(base)) {
      if (!Object.prototype.hasOwnProperty.call(input, key)) continue;
      const value = input[key],
        original = base[key];
      if (original && typeof original === "object" && !Array.isArray(original))
        out[key] = mergeKnown(original, value);
      else if (
        typeof value === typeof original &&
        (typeof value !== "number" || Number.isFinite(value))
      )
        out[key] = value;
    }
    return out;
  }
  function normalizeSettings(input) {
    if (typeof input === "string") {
      try {
        input = JSON.parse(input);
      } catch {
        input = {};
      }
    }
    if (input?.auto)
      input = {
        ...input,
        session: {
          ...input.session,
          autoQueue: input.session?.autoQueue ?? input.auto.autoQueue ?? false,
        },
        afk: {
          ...input.afk,
          enabled: input.afk?.enabled ?? input.auto.afkGuard ?? true,
        },
      };
    const settings = mergeKnown(DEFAULTS, input);
    const clamp = (v, a, b) => Math.max(a, Math.min(b, Number(v)));
    settings.dragSpeed = clamp(settings.dragSpeed, 0.25, 3);
    for (const [key, values] of Object.entries({
      analysisQuality: ["fast", "balanced", "deep"],
      depthMode: ["auto", "manual"],
      playingStyle: [
        "universal",
        "aggressive",
        "tactical",
        "positional",
        "defensive",
        "endgame_specialist",
      ],
    })) {
      if (!values.includes(settings.engineUI[key]))
        settings.engineUI[key] = DEFAULTS.engineUI[key];
    }
    if (
      !["off", "rare", "natural", "frequent"].includes(
        settings.engineUI.advanced.mistakeProfile,
      )
    )
      settings.engineUI.advanced.mistakeProfile =
        DEFAULTS.engineUI.advanced.mistakeProfile;
    settings.engineUI.strength = clamp(settings.engineUI.strength, 400, 3000);
    settings.engineUI.manualDepth = Math.round(
      clamp(settings.engineUI.manualDepth, 1, 22),
    );
    settings.engineUI.candidateMoves = Math.round(
      clamp(settings.engineUI.candidateMoves, 1, 20),
    );
    for (const key of Object.keys(settings.engineUI.personality))
      settings.engineUI.personality[key] = clamp(
        settings.engineUI.personality[key],
        0,
        100,
      );
    for (const key of Object.keys(settings.engineUI.advanced))
      if (typeof settings.engineUI.advanced[key] === "number")
        settings.engineUI.advanced[key] = clamp(
          settings.engineUI.advanced[key],
          0,
          125,
        );
    for (const key of Object.keys(settings.visualIntelligence.colors))
      if (!/^#[0-9a-f]{6}$/i.test(settings.visualIntelligence.colors[key]))
        settings.visualIntelligence.colors[key] =
          DEFAULTS.visualIntelligence.colors[key];
    const visual = settings.visualIntelligence;
    visual.arrowScale = clamp(visual.arrowScale, 0.25, 2);
    visual.arrowOpacity = clamp(visual.arrowOpacity, 0, 100);
    visual.maxArrows = Math.round(clamp(visual.maxArrows, 0, 20));
    visual.lineWidth = clamp(visual.lineWidth, 0.5, 8);
    visual.markerOpacity = clamp(visual.markerOpacity, 0, 1);
    visual.markerScale = clamp(visual.markerScale, 0.25, 2);
    if (!["all", "p", "n", "b", "r", "q", "k"].includes(visual.pieceFilter))
      visual.pieceFilter = "all";
    if (!["click", "drag", "mixed"].includes(settings.automation.method))
      settings.automation.method = "mixed";
    settings.automation.minDelayMs = clamp(
      settings.automation.minDelayMs,
      0,
      60000,
    );
    settings.automation.maxDelayMs = clamp(
      settings.automation.maxDelayMs,
      settings.automation.minDelayMs,
      60000,
    );
    settings.inputExecution.maxAttempts = Math.round(
      clamp(settings.inputExecution.maxAttempts, 1, 3),
    );
    settings.inputExecution.confirmationTimeoutMs = clamp(
      settings.inputExecution.confirmationTimeoutMs,
      200,
      5000,
    );
    settings.inputExecution.watchdogMs = clamp(
      settings.inputExecution.watchdogMs,
      1000,
      30000,
    );
    settings.inputExecution.pollMs = clamp(
      settings.inputExecution.pollMs,
      25,
      250,
    );
    settings.inputExecution.stableReads = Math.round(
      clamp(settings.inputExecution.stableReads, 1, 4),
    );
    for (const [key, min, max] of [
      ["maxGamesPerSession", 1, 100],
      ["breakDurationMs", 1000, 86400000],
      ["maxWinStreak", 0, 100],
      ["maxGamesPerHour", 1, 100],
    ])
      settings.session[key] = Math.round(
        clamp(settings.session[key], min, max),
      );
    for (const range of [
      settings.session.betweenGamesMs,
      settings.postGame.reviewDurationMs,
      settings.autoResign.delay,
    ]) {
      range.min = clamp(range.min, 0, 300000);
      range.max = clamp(range.max, range.min, 300000);
    }
    settings.warmup.durationGames = Math.round(
      clamp(settings.warmup.durationGames, 1, 100),
    );
    settings.warmup.startEloOffset = clamp(
      settings.warmup.startEloOffset,
      -1000,
      0,
    );
    settings.winrateTarget.target = clamp(settings.winrateTarget.target, 0, 1);
    settings.winrateTarget.sampleGames = Math.round(
      clamp(settings.winrateTarget.sampleGames, 2, 50),
    );
    settings.winrateTarget.overshootBoost = clamp(
      settings.winrateTarget.overshootBoost,
      0,
      1,
    );
    settings.tilt.durationGames = Math.round(
      clamp(settings.tilt.durationGames, 1, 10),
    );
    settings.tilt.suboptimalBoost = clamp(
      settings.tilt.suboptimalBoost,
      0,
      0.3,
    );
    settings.tilt.blunderMult = clamp(settings.tilt.blunderMult, 1, 3);
    settings.tilt.timingMult = clamp(settings.tilt.timingMult, 0.5, 3);
    settings.idleMouse.triggerAfterMs = clamp(
      settings.idleMouse.triggerAfterMs,
      1000,
      60000,
    );
    settings.idleMouse.actionChance = clamp(
      settings.idleMouse.actionChance,
      0,
      1,
    );
    settings.postGame.reviewChance = clamp(
      settings.postGame.reviewChance,
      0,
      1,
    );
    settings.coach.altEvalWindow = clamp(settings.coach.altEvalWindow, 0, 5);
    settings.opponentAdaptation.ratingEdge = clamp(
      settings.opponentAdaptation.ratingEdge,
      -500,
      500,
    );
    settings.autoResign.evalThreshold = clamp(
      settings.autoResign.evalThreshold,
      -30,
      -0.5,
    );
    settings.autoResign.consecutiveMoves = Math.round(
      clamp(settings.autoResign.consecutiveMoves, 1, 20),
    );
    settings.autoResign.minMoveNumber = Math.round(
      clamp(settings.autoResign.minMoveNumber, 1, 100),
    );
    settings.autoResign.resignChance = clamp(
      settings.autoResign.resignChance,
      0,
      1,
    );
    settings.annotations.chancePerLongThink = clamp(
      settings.annotations.chancePerLongThink,
      0,
      1,
    );
    settings.annotations.minThinkMs = clamp(
      settings.annotations.minThinkMs,
      1000,
      60000,
    );
    settings.annotations.maxPerThink = Math.round(
      clamp(settings.annotations.maxPerThink, 1, 3),
    );
    settings.seed = String(settings.seed).slice(0, 128);
    return settings;
  }
  const BoardIntelligence = {
    cache: new Map(),
    maxCache: 64,
    pieceValue: { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 },
    pinUnit: { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 },
    sq: (f, r) => `${"abcdefgh"[f]}${r + 1}`,
    coord: (sq) => [sq.charCodeAt(0) - 97, Number(sq[1]) - 1],
    parse: (fen) => {
      const board = Array.from({ length: 8 }, () => Array(8).fill(null)),
        rows = String(fen || "")
          .split(" ")[0]
          .split("/");
      for (let rr = 0; rr < 8; rr++) {
        let f = 0;
        for (const ch of rows[rr] || "") {
          if (/\d/.test(ch)) f += Number(ch);
          else board[7 - rr][f++] = ch;
        }
      }
      return board;
    },
    color: (p) => (!p ? null : p === p.toUpperCase() ? "w" : "b"),
    attacksFrom: (board, f, r) => {
      const p = board[r]?.[f];
      if (!p) return [];
      const c = BoardIntelligence.color(p),
        t = p.toLowerCase(),
        out = [];
      const add = (ff, rr) => {
        if (ff >= 0 && ff < 8 && rr >= 0 && rr < 8)
          out.push(BoardIntelligence.sq(ff, rr));
      };
      if (t === "p") {
        const d = c === "w" ? 1 : -1;
        add(f - 1, r + d);
        add(f + 1, r + d);
        return out;
      }
      if (t === "n") {
        [
          [1, 2],
          [2, 1],
          [2, -1],
          [1, -2],
          [-1, -2],
          [-2, -1],
          [-2, 1],
          [-1, 2],
        ].forEach(([df, dr]) => add(f + df, r + dr));
        return out;
      }
      if (t === "k") {
        for (let df = -1; df <= 1; df++)
          for (let dr = -1; dr <= 1; dr++) if (df || dr) add(f + df, r + dr);
        return out;
      }
      const dirs = [];
      if (t === "b" || t === "q") dirs.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
      if (t === "r" || t === "q") dirs.push([1, 0], [-1, 0], [0, 1], [0, -1]);
      for (const [df, dr] of dirs) {
        let ff = f + df,
          rr = r + dr;
        while (ff >= 0 && ff < 8 && rr >= 0 && rr < 8) {
          add(ff, rr);
          if (board[rr][ff]) break;
          ff += df;
          rr += dr;
        }
      }
      return out;
    },
    _pseudoMoves: (board, piece) => {
      const out = [];
      const c = piece.color,
        t = piece.type;
      if (t === "p") {
        const d = c === "w" ? 1 : -1,
          rr = piece.r + d;
        if (rr >= 0 && rr < 8 && !board[rr][piece.f])
          out.push(BoardIntelligence.sq(piece.f, rr));
        for (const df of [-1, 1]) {
          const f = piece.f + df;
          if (
            f >= 0 &&
            f < 8 &&
            rr >= 0 &&
            rr < 8 &&
            board[rr][f] &&
            BoardIntelligence.color(board[rr][f]) !== c
          )
            out.push(BoardIntelligence.sq(f, rr));
        }
        return out;
      }
      for (const sq of piece.attacks) {
        const [f, r] = BoardIntelligence.coord(sq),
          occ = board[r]?.[f];
        if (!occ || BoardIntelligence.color(occ) !== c) out.push(sq);
      }
      return out;
    },
    analyze: (fen) => {
      const key = String(fen || "")
        .split(" ")
        .slice(0, 4)
        .join(" ");
      if (BoardIntelligence.cache.has(key))
        return BoardIntelligence.cache.get(key);
      const board = BoardIntelligence.parse(fen),
        pieces = [],
        attack = { w: new Map(), b: new Map() };
      const pushAttack = (c, sq, from) => {
        const arr = attack[c].get(sq) || [];
        arr.push(from);
        attack[c].set(sq, arr);
      };
      for (let r = 0; r < 8; r++)
        for (let f = 0; f < 8; f++) {
          const p = board[r][f];
          if (!p) continue;
          const sq = BoardIntelligence.sq(f, r),
            c = BoardIntelligence.color(p),
            at = BoardIntelligence.attacksFrom(board, f, r);
          pieces.push({
            piece: p,
            type: p.toLowerCase(),
            color: c,
            sq,
            f,
            r,
            value: BoardIntelligence.pieceValue[p.toLowerCase()] || 0,
            attacks: at,
          });
          at.forEach((x) => pushAttack(c, x, sq));
        }
      const pieceAt = (sq) => pieces.find((p) => p.sq === sq),
        enemyOf = (s) => (s === "w" ? "b" : "w");
      const pins = [];
      for (const side of ["w", "b"]) {
        const king = pieces.find((x) => x.color === side && x.type === "k");
        if (!king) continue;
        for (const [df, dr, types] of [
          [1, 0, "rq"],
          [-1, 0, "rq"],
          [0, 1, "rq"],
          [0, -1, "rq"],
          [1, 1, "bq"],
          [1, -1, "bq"],
          [-1, 1, "bq"],
          [-1, -1, "bq"],
        ]) {
          let f = king.f + df,
            r = king.r + dr,
            blocker = null;
          while (f >= 0 && f < 8 && r >= 0 && r < 8) {
            const pc = board[r][f];
            if (pc) {
              const c = BoardIntelligence.color(pc),
                sq = BoardIntelligence.sq(f, r);
              if (!blocker && c === side) blocker = { sq };
              else {
                if (blocker && c !== side && types.includes(pc.toLowerCase()))
                  pins.push({
                    kind: "absolute",
                    side,
                    pinned: blocker.sq,
                    target: king.sq,
                    king: king.sq,
                    pinner: sq,
                  });
                break;
              }
            }
            f += df;
            r += dr;
          }
        }
      }
      for (const side of ["w", "b"]) {
        for (const target of pieces.filter(
          (x) => x.color === side && x.type !== "k" && x.value >= 500,
        )) {
          for (const [df, dr, types] of [
            [1, 0, "rq"],
            [-1, 0, "rq"],
            [0, 1, "rq"],
            [0, -1, "rq"],
            [1, 1, "bq"],
            [1, -1, "bq"],
            [-1, 1, "bq"],
            [-1, -1, "bq"],
          ]) {
            let f = target.f + df,
              r = target.r + dr,
              blocker = null;
            while (f >= 0 && f < 8 && r >= 0 && r < 8) {
              const pc = board[r][f];
              if (pc) {
                const c = BoardIntelligence.color(pc),
                  sq = BoardIntelligence.sq(f, r);
                if (!blocker && c === side) {
                  const pv =
                    BoardIntelligence.pieceValue[pc.toLowerCase()] || 0;
                  if (pv < target.value) blocker = { sq };
                  else break;
                } else {
                  if (blocker && c !== side && types.includes(pc.toLowerCase()))
                    pins.push({
                      kind: "relative",
                      side,
                      pinned: blocker.sq,
                      target: target.sq,
                      pinner: sq,
                    });
                  break;
                }
              }
              f += df;
              r += dr;
            }
          }
        }
      }
      // Pin valuation in pawn units. Liability = pinned piece value - material value of direct defenders, floor 0.
      for (const pin of pins) {
        const pc = pieceAt(pin.pinned),
          defSq = attack[pin.side].get(pin.pinned) || [];
        const defenders = defSq
          .map(pieceAt)
          .filter(Boolean)
          .filter((x) => x.sq !== pin.pinned && x.type !== "k");
        const pieceUnits = BoardIntelligence.pinUnit[pc?.type] || 0;
        const defenseCredit = Math.min(
          pieceUnits,
          defenders.reduce(
            (n, d) => n + (BoardIntelligence.pinUnit[d.type] || 0),
            0,
          ),
        );
        const liability = Math.max(0, pieceUnits - defenseCredit);
        pin.piece = pc?.piece || "?";
        pin.pieceUnits = pieceUnits;
        pin.defenders = defenders.map((x) => ({
          sq: x.sq,
          piece: x.piece,
          units: BoardIntelligence.pinUnit[x.type] || 0,
        }));
        pin.defenseCredit = defenseCredit;
        pin.liability = liability;
        pin.scoreForSide = -liability;
        pin.scoreForEnemy = liability;
      }

      const vulnerable = { w: [], b: [] },
        loose = { w: [], b: [] },
        hanging = { w: [], b: [] };
      for (const x of pieces.filter((x) => x.type !== "k")) {
        const enemy = enemyOf(x.color),
          atk = attack[enemy].get(x.sq) || [],
          def = attack[x.color].get(x.sq) || [];
        if (def.length === 0)
          loose[x.color].push({ ...x, attackers: atk, defenders: def });
        if (atk.length && def.length === 0)
          hanging[x.color].push({ ...x, attackers: atk, defenders: def });
        if (
          atk.length &&
          (def.length === 0 ||
            Math.min(...atk.map((s) => pieceAt(s)?.value || 9999)) < x.value)
        )
          vulnerable[x.color].push({ ...x, attackers: atk, defenders: def });
      }
      const squareControl = [],
        safe = { w: [], b: [] },
        neutral = [],
        contested = [];
      for (let r = 0; r < 8; r++)
        for (let f = 0; f < 8; f++) {
          const sq = BoardIntelligence.sq(f, r),
            w = (attack.w.get(sq) || []).length,
            b = (attack.b.get(sq) || []).length;
          squareControl.push({ sq, w, b, delta: w - b });
          if (w && b) contested.push(sq);
          if (w && !b) safe.w.push(sq);
          if (b && !w) safe.b.push(sq);
          if (!w && !b) neutral.push(sq);
        }
      const weakSquares = { w: [], b: [] };
      for (const side of ["w", "b"]) {
        const enemy = enemyOf(side);
        for (const c of squareControl) {
          const rank = Number(c.sq[1]),
            ownHalf = side === "w" ? rank <= 4 : rank >= 5;
          if (!ownHalf) continue;
          const enemyCount = c[enemy],
            ownCount = c[side];
          const pawnDef = (attack[side].get(c.sq) || []).some(
            (q) => pieceAt(q)?.type === "p" && pieceAt(q)?.color === side,
          );
          if (enemyCount > ownCount && !pawnDef) weakSquares[side].push(c.sq);
        }
      }

      const kingSafety = {};
      for (const side of ["w", "b"]) {
        const king = pieces.find((x) => x.color === side && x.type === "k");
        if (!king) {
          kingSafety[side] = null;
          continue;
        }
        const enemy = enemyOf(side),
          zone = [];
        for (let df = -1; df <= 1; df++)
          for (let dr = -1; dr <= 1; dr++) {
            const f = king.f + df,
              r = king.r + dr;
            if (f >= 0 && f < 8 && r >= 0 && r < 8)
              zone.push(BoardIntelligence.sq(f, r));
          }
        const attacked = zone.filter(
            (q) => (attack[enemy].get(q) || []).length,
          ),
          defended = zone.filter((q) => (attack[side].get(q) || []).length),
          pawnDir = side === "w" ? 1 : -1,
          pawnShield = [];
        for (const df of [-1, 0, 1]) {
          const f = king.f + df,
            r = king.r + pawnDir;
          if (
            f >= 0 &&
            f < 8 &&
            r >= 0 &&
            r < 8 &&
            board[r][f]?.toLowerCase() === "p" &&
            BoardIntelligence.color(board[r][f]) === side
          )
            pawnShield.push(BoardIntelligence.sq(f, r));
        }
        const fileHasPawn = pieces.some(
            (x) => x.color === side && x.type === "p" && x.f === king.f,
          ),
          openFile = !fileHasPawn;
        const openDiagonals = [];
        for (const [df, dr] of [
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ]) {
          let f = king.f + df,
            r = king.r + dr,
            ray = [];
          while (f >= 0 && f < 8 && r >= 0 && r < 8) {
            const sq = BoardIntelligence.sq(f, r);
            ray.push(sq);
            if (board[r][f]) {
              const p = board[r][f];
              if (
                BoardIntelligence.color(p) === enemy &&
                ["b", "q"].includes(p.toLowerCase())
              )
                openDiagonals.push({ ray, attacker: sq });
              break;
            }
            f += df;
            r += dr;
          }
        }
        const potentialChecks = [];
        for (const p of pieces.filter(
          (x) => x.color === enemy && x.type !== "k",
        )) {
          for (const dest of BoardIntelligence._pseudoMoves(board, p)) {
            const [df, dr] = BoardIntelligence.coord(dest),
              copy = board.map((row) => row.slice());
            copy[p.r][p.f] = null;
            copy[dr][df] = p.piece;
            if (BoardIntelligence.attacksFrom(copy, df, dr).includes(king.sq))
              potentialChecks.push({ from: p.sq, to: dest, piece: p.piece });
            if (potentialChecks.length >= 16) break;
          }
          if (potentialChecks.length >= 16) break;
        }
        kingSafety[side] = {
          king: king.sq,
          zone,
          attacked,
          defended,
          pawnShield,
          openFile,
          openDiagonals,
          potentialChecks,
          danger: Math.min(
            1,
            (attacked.length +
              (openFile ? 1 : 0) +
              openDiagonals.length * 0.7 +
              (3 - pawnShield.length) * 0.35) /
              7,
          ),
        };
      }
      const pawns = {
        w: {
          isolated: [],
          doubled: [],
          passed: [],
          protectedPassed: [],
          backward: [],
          chains: [],
          weakTargets: [],
        },
        b: {
          isolated: [],
          doubled: [],
          passed: [],
          protectedPassed: [],
          backward: [],
          chains: [],
          weakTargets: [],
        },
      };
      for (const side of ["w", "b"]) {
        const enemy = enemyOf(side),
          ps = pieces.filter((x) => x.color === side && x.type === "p"),
          files = {};
        ps.forEach((p) => (files[p.f] || (files[p.f] = [])).push(p));
        for (const [f, arr] of Object.entries(files)) {
          if (arr.length > 1)
            arr.forEach((p) => pawns[side].doubled.push(p.sq));
          const fi = Number(f);
          if (!files[fi - 1]?.length && !files[fi + 1]?.length)
            arr.forEach((p) => pawns[side].isolated.push(p.sq));
        }
        const opp = pieces.filter((x) => x.color === enemy && x.type === "p");
        for (const p of ps) {
          const ahead = opp.some(
            (o) =>
              Math.abs(o.f - p.f) <= 1 &&
              (side === "w" ? o.r > p.r : o.r < p.r),
          );
          if (!ahead) pawns[side].passed.push(p.sq);
          const defendedByPawn = (attack[side].get(p.sq) || []).some(
            (q) => pieceAt(q)?.type === "p" && pieceAt(q)?.color === side,
          );
          if (pawns[side].passed.includes(p.sq) && defendedByPawn)
            pawns[side].protectedPassed.push(p.sq);
          if (defendedByPawn) pawns[side].chains.push(p.sq);
          const rr = p.r + (side === "w" ? 1 : -1);
          if (rr >= 0 && rr < 8) {
            const aheadSq = BoardIntelligence.sq(p.f, rr),
              enemyPawnAttack = (attack[enemy].get(aheadSq) || []).some(
                (q) => pieceAt(q)?.type === "p" && pieceAt(q)?.color === enemy,
              ),
              supportBehind = ps.some(
                (o) =>
                  Math.abs(o.f - p.f) === 1 &&
                  (side === "w" ? o.r <= p.r : o.r >= p.r),
              );
            if (enemyPawnAttack && !supportBehind)
              pawns[side].backward.push(p.sq);
          }
          if (
            (pawns[side].isolated.includes(p.sq) ||
              pawns[side].backward.includes(p.sq)) &&
            (attack[enemy].get(p.sq) || []).length
          )
            pawns[side].weakTargets.push(p.sq);
        }
      }

      const xrays = [],
        forks = [],
        forkPotential = [],
        overloaded = [],
        trapped = [],
        batteries = [],
        skewers = [],
        discovered = [];
      for (const x of pieces.filter((x) => ["b", "r", "q"].includes(x.type))) {
        const dirs = [];
        if (x.type === "b" || x.type === "q")
          dirs.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
        if (x.type === "r" || x.type === "q")
          dirs.push([1, 0], [-1, 0], [0, 1], [0, -1]);
        for (const [df, dr] of dirs) {
          let f = x.f + df,
            r = x.r + dr,
            first = null;
          while (f >= 0 && f < 8 && r >= 0 && r < 8) {
            const p = board[r][f];
            if (p) {
              if (!first)
                first = {
                  piece: p,
                  sq: BoardIntelligence.sq(f, r),
                  color: BoardIntelligence.color(p),
                };
              else {
                const targetSq = BoardIntelligence.sq(f, r),
                  tc = BoardIntelligence.color(p);
                if (first.color !== x.color && tc !== x.color) {
                  const fv =
                      BoardIntelligence.pieceValue[first.piece.toLowerCase()] ||
                      0,
                    tv = BoardIntelligence.pieceValue[p.toLowerCase()] || 0;
                  xrays.push({
                    from: x.sq,
                    through: first.sq,
                    target: targetSq,
                    side: x.color,
                  });
                  if (fv > tv)
                    skewers.push({
                      from: x.sq,
                      front: first.sq,
                      behind: targetSq,
                      side: x.color,
                    });
                }
                if (first.color === x.color && tc !== x.color) {
                  if (
                    (df && dr ? "bq" : "rq").includes(first.piece.toLowerCase())
                  )
                    batteries.push({
                      rear: x.sq,
                      front: first.sq,
                      target: targetSq,
                      side: x.color,
                    });
                  else
                    discovered.push({
                      slider: x.sq,
                      blocker: first.sq,
                      target: targetSq,
                      side: x.color,
                    });
                }
                break;
              }
            }
            f += df;
            r += dr;
          }
        }
      }
      for (const x of pieces.filter((x) => x.type !== "k")) {
        const targets = pieces.filter(
          (y) =>
            y.color !== x.color && x.attacks.includes(y.sq) && y.value >= 300,
        );
        if (targets.length >= 2)
          forks.push({
            forker: x.sq,
            targets: targets.map((y) => y.sq),
            side: x.color,
          });
        let mobility = 0;
        for (const sq of BoardIntelligence._pseudoMoves(board, x)) {
          const enemy = enemyOf(x.color);
          if (!(attack[enemy].get(sq) || []).length) mobility++;
        }
        if (
          mobility === 0 &&
          x.value >= 300 &&
          (attack[enemyOf(x.color)].get(x.sq) || []).length
        )
          trapped.push({ sq: x.sq, side: x.color, mobility });
        if (x.type === "n") {
          for (const dest of BoardIntelligence._pseudoMoves(board, x)) {
            const [df, dr] = BoardIntelligence.coord(dest),
              copy = board.map((row) => row.slice());
            copy[x.r][x.f] = null;
            copy[dr][df] = x.piece;
            const ats = BoardIntelligence.attacksFrom(copy, df, dr),
              ts = pieces.filter(
                (y) =>
                  y.color !== x.color && y.value >= 300 && ats.includes(y.sq),
              );
            if (ts.length >= 2)
              forkPotential.push({
                from: x.sq,
                to: dest,
                targets: ts.map((y) => y.sq),
                side: x.color,
              });
          }
        }
      }
      for (const d of pieces.filter((x) => x.type !== "k")) {
        const defendedTargets = pieces.filter(
          (t) =>
            t.color === d.color &&
            t.sq !== d.sq &&
            (attack[d.color].get(t.sq) || []).includes(d.sq) &&
            (attack[enemyOf(d.color)].get(t.sq) || []).length,
        );
        if (defendedTargets.length >= 2)
          overloaded.push({
            sq: d.sq,
            side: d.color,
            targets: defendedTargets.map((t) => t.sq),
          });
      }
      const material = { w: 0, b: 0 };
      pieces.forEach((x) => {
        if (x.type !== "k") material[x.color] += x.value;
      });
      const metrics = {
        material,
        materialBalance: (material.w - material.b) / 100,
        mobility: { w: attack.w.size, b: attack.b.size },
        center: { w: 0, b: 0 },
        bishopPair: {
          w:
            pieces.filter((x) => x.color === "w" && x.type === "b").length >= 2,
          b:
            pieces.filter((x) => x.color === "b" && x.type === "b").length >= 2,
        },
        openFiles: [],
        semiOpen: { w: [], b: [] },
        space: { w: 0, b: 0 },
        development: { w: 0, b: 0 },
        activity: { w: 0, b: 0 },
        outposts: { w: [], b: [] },
        pieceContributions: { w: [], b: [] },
      };
      for (const q of ["d4", "e4", "d5", "e5"]) {
        metrics.center.w += (attack.w.get(q) || []).length;
        metrics.center.b += (attack.b.get(q) || []).length;
      }
      for (let f = 0; f < 8; f++) {
        const wp = pieces.some(
            (x) => x.type === "p" && x.color === "w" && x.f === f,
          ),
          bp = pieces.some(
            (x) => x.type === "p" && x.color === "b" && x.f === f,
          );
        if (!wp && !bp) metrics.openFiles.push("abcdefgh"[f]);
        if (!wp && bp) metrics.semiOpen.w.push("abcdefgh"[f]);
        if (!bp && wp) metrics.semiOpen.b.push("abcdefgh"[f]);
      }
      for (const side of ["w", "b"]) {
        const enemy = enemyOf(side);
        metrics.space[side] = Array.from(attack[side].keys()).filter((q) =>
          side === "w" ? Number(q[1]) >= 5 : Number(q[1]) <= 4,
        ).length;
        metrics.activity[side] = pieces
          .filter((x) => x.color === side && !["p", "k"].includes(x.type))
          .reduce((n, x) => n + x.attacks.length, 0);
        const starts =
          side === "w"
            ? { n: ["b1", "g1"], b: ["c1", "f1"] }
            : { n: ["b8", "g8"], b: ["c8", "f8"] };
        metrics.development[side] = pieces.filter(
          (x) =>
            x.color === side &&
            ["n", "b"].includes(x.type) &&
            !starts[x.type].includes(x.sq),
        ).length;
        for (const x of pieces.filter(
          (x) => x.color === side && !["p", "k"].includes(x.type),
        )) {
          const defended = x.attacks.filter(
              (q) => pieceAt(q)?.color === side,
            ).length,
            center = x.attacks.filter((q) =>
              ["d4", "e4", "d5", "e5"].includes(q),
            ).length,
            ek = kingSafety[enemy]?.zone || [],
            kingPressure = x.attacks.filter((q) => ek.includes(q)).length;
          metrics.pieceContributions[side].push({
            sq: x.sq,
            piece: x.piece,
            score: Number(
              (
                x.attacks.length +
                defended * 0.7 +
                center * 0.6 +
                kingPressure * 0.9
              ).toFixed(1),
            ),
          });
          if (["n", "b"].includes(x.type)) {
            const rr = Number(x.sq[1]),
              advanced = side === "w" ? rr >= 5 : rr <= 4,
              defPawn = (attack[side].get(x.sq) || []).some(
                (q) => pieceAt(q)?.type === "p" && pieceAt(q)?.color === side,
              ),
              enemyPawn = (attack[enemy].get(x.sq) || []).some(
                (q) => pieceAt(q)?.type === "p" && pieceAt(q)?.color === enemy,
              );
            if (advanced && defPawn && !enemyPawn)
              metrics.outposts[side].push(x.sq);
          }
        }
      }
      const result = {
        fen: key,
        board,
        pieces,
        attack,
        pins,
        vulnerable,
        loose,
        hanging,
        squareControl,
        safe,
        neutral,
        weakSquares,
        kingSafety,
        contested,
        pawns,
        xrays,
        forks,
        forkPotential,
        overloaded,
        trapped,
        batteries,
        skewers,
        discovered,
        metrics,
      };
      while (BoardIntelligence.cache.size >= BoardIntelligence.maxCache)
        BoardIntelligence.cache.delete(
          BoardIntelligence.cache.keys().next().value,
        );
      BoardIntelligence.cache.set(key, result);
      return result;
    },
    moveFeatures: (fen, move) => {
      if (!fen || !move || move.length < 4) return {};
      const a = BoardIntelligence.analyze(fen),
        from = move.slice(0, 2),
        to = move.slice(2, 4),
        [ff, fr] = BoardIntelligence.coord(from),
        [tf, tr] = BoardIntelligence.coord(to),
        piece = a.board[fr]?.[ff],
        target = a.board[tr]?.[tf],
        type = piece?.toLowerCase(),
        targetType = target?.toLowerCase(),
        center = ["d4", "e4", "d5", "e5"].includes(to),
        capture = !!target,
        development =
          (type === "n" || type === "b") &&
          ((BoardIntelligence.color(piece) === "w" && fr === 0) ||
            (BoardIntelligence.color(piece) === "b" && fr === 7)),
        queenTrade = (type === "q" && targetType === "q") || targetType === "q",
        exchange =
          capture &&
          targetType &&
          type &&
          Math.abs(
            (BoardIntelligence.pieceValue[type] || 0) -
              (BoardIntelligence.pieceValue[targetType] || 0),
          ) < 220,
        ourColor = BoardIntelligence.color(piece),
        enemyKing = a.pieces.find(
          (x) => x.color !== ourColor && x.type === "k",
        ),
        ourKing = a.pieces.find((x) => x.color === ourColor && x.type === "k"),
        kingDistance = enemyKing
          ? Math.max(Math.abs(tf - enemyKing.f), Math.abs(tr - enemyKing.r))
          : 8,
        ownKingDistance = ourKing
          ? Math.max(Math.abs(tf - ourKing.f), Math.abs(tr - ourKing.r))
          : 8;
      return {
        capture,
        center,
        development,
        queenTrade,
        exchange,
        attacking: kingDistance <= 2,
        kingDefensive: ownKingDistance <= 2,
        capturedValue: BoardIntelligence.pieceValue[targetType] || 0,
        movingValue: BoardIntelligence.pieceValue[type] || 0,
      };
    },
  };
  function createRuntime(input, adapter = {}) {
    let settings = normalizeSettings(input);
    const CONFIG = mergeKnown(INTERNAL_DEFAULTS, settings);
    CONFIG.targetRating = settings.engineUI.strength;
    CONFIG.playStyle = settings.engineUI.playingStyle;
    CONFIG.humanization.enabled = settings.engineUI.humanMode;
    let weaknessSeed = 2166136261;
    for (const char of settings.seed)
      weaknessSeed = Math.imul(weaknessSeed ^ char.charCodeAt(0), 16777619);
    CONFIG.humanization.weaknessProfile.seed = weaknessSeed >>> 0 || 1;
    CONFIG.humanization.weaknessProfile.enabled =
      settings.weaknessProfile.enabled;
    CONFIG.tilt = { ...CONFIG.tilt, ...settings.tilt };
    const State = {
      human: {
        ratingProfile: null,
        perfectStreak: 0,
        sloppyStreak: 0,
        bestMoveCount: 0,
        totalMoveCount: 0,
        gamePersonality: null,
        lastMoveWasBest: true,
        // Accuracy cluster state
        clusterMode: "normal", // 'normal', 'hot', 'cold'
        clusterMovesLeft: 0,
        // Predicted opponent reply (for premove simulation)
        predictedReply: null,
        predictedReplyFen: null,
        predictedReplyMatched: null,
        predictedReplyForced: false,
        // Auto-resign: track consecutive losing evals
        consecutiveLosingEvals: 0,
        // Auto-lose mode active flag
        autoLoseActive: false,
        // Opponent rating (read from DOM)
        opponentRating: null,
        // Time pressure accuracy multipliers (live)
        timePressureMult: { suboptimal: 1, blunder: 1, maxCPLoss: 1 },
        // Anti-correlation: track how often we play SF#1
        topMoveCount: 0,
        // Weakness profile (generated from seed)
        weaknesses: null,
        // Timing-accuracy coupling: pre-decided think time category for current move
        thinkCategory: "normal", // 'fast', 'normal', 'slow'
        // Opponent-move surprise: was the opponent's last move expected?
        opponentMoveSurprise: 0, // 0 = expected, 1 = surprising, set each move
        // Think momentum: how long we thought last move (ms)
        lastThinkTime: 0,
        // Track the eval BEFORE opponent moved, to measure surprise
        evalBeforeOpponentMove: null,
        // Persistent player tempo (seeded per account, set once)
        playerTempo: 1.0, // multiplier: <1 = fast player, >1 = slow player
        playerAccuracyBand: 0, // small offset to base suboptimal rate
        // --- v16 fields ---
        // Book-exit pause (A6)
        bookMovesPlayed: 0,
        justLeftBook: false,
        // King safety asymmetry (B16): track previous our-eval for delta detection
        prevOurEval: null,
        // Calc depth limiting (T2): how many shallow-depth picks this game (telemetry only)
        shallowPickCount: 0,
        // Tracking last mouse position for idle drift (B10)
        lastMouseX: null,
        lastMouseY: null,
        // --- v16.1 ACPL governor state ---
        // Rolling window of our recent move CP losses. Sum + ring buffer.
        acplWindow: [], // last N cp-loss values
        acplSum: 0, // running sum of values in window
        acplSuppressedCount: 0, // telemetry: how many times we suppressed an error this game
        // v17.3 calibrated-model context
        activeProfile: null,
        timeControl: null,
        moveHistory: [],
        lastChoiceExplanation: null,
      },
      engineRuntime: {},
      lastFen: null,
      lastHandledFen: null,
      moveCount: 0,
      playerColor: "w",
      candidates: {},
      currentEval: null,
      clock: { myTime: null, oppTime: null, maxMyTime: null, maxOppTime: null },
      recentTimings: [],
      diagnostics: {
        humanModel: { choices: 0, probabilitySum: 0, cpLossSum: 0, last: null },
      },
    };
    let context = {};
    const Main = { _gameInstanceId: adapter.id || 0 };
    const Game = {
      getBoardGame: () => ({
        getLegalMoves: () =>
          adapter.Chess
            ? new adapter.Chess(State.lastFen).moves({ verbose: true })
            : [],
      }),
      isCapture: (move) =>
        BoardIntelligence.moveFeatures(State.lastFen, move).capture,
    };
    const Account = {
      readTimeControl: () => context.timeControl || null,
      repertoireMove: (fen, legal) =>
        settings.engineUI.openingBook
          ? (context.repertoireMoves || []).find(
              (m) =>
                legal.includes(m) &&
                Object.values(State.candidates).some((c) => c.move === m),
            )
          : null,
    };
    const PlayerMoveDB = { getCached: () => [] };
    const WeaknessProfile = {
      // Seeded PRNG (mulberry32) for deterministic weakness generation
      _prng: (seed) => {
        let s = seed | 0;
        return () => {
          s = (s + 0x6d2b79f5) | 0;
          let t = Math.imul(s ^ (s >>> 15), 1 | s);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
      },

      // All possible weakness dimensions a human can have
      _dimensions: {
        // Piece-type weaknesses: worse at using/defending specific pieces
        pieces: ["knight", "bishop", "rook", "queen"],
        // Phase weaknesses: worse in specific game phases
        phases: ["opening", "middlegame", "endgame"],
        // Endgame-type weaknesses
        endgames: [
          "rook_endgame",
          "bishop_endgame",
          "knight_endgame",
          "pawn_endgame",
          "queen_endgame",
        ],
        // Tactical motif blind spots
        tactics: [
          "fork",
          "pin",
          "skewer",
          "discovery",
          "back_rank",
          "deflection",
        ],
        // Positional blind spots
        positional: [
          "pawn_structure",
          "king_safety",
          "piece_activity",
          "space",
          "weak_squares",
        ],
      },

      init: () => {
        const wp = CONFIG.humanization.weaknessProfile;
        if (!wp.enabled) {
          State.human.weaknesses = {
            pieces: [],
            phases: {},
            endgames: [],
            tactics: [],
            positional: [],
            extraErrorRate: {},
          };
          return;
        }

        // Generate or load seed
        if (!wp.seed) {
          wp.seed = Math.floor(Math.random() * 2147483647);
          Settings.save(CONFIG);
          Utils.log(`WeaknessProfile: Generated new seed ${wp.seed}`, "info");
        }

        const rng = WeaknessProfile._prng(wp.seed);
        const pick = (arr, count) => {
          const shuffled = [...arr];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return shuffled.slice(0, count);
        };

        // Each account gets 1-2 piece weaknesses, 1 phase weakness, 1-2 endgame weaknesses,
        // 1-2 tactical blind spots, 1 positional weakness
        const d = WeaknessProfile._dimensions;
        const weakPieces = pick(d.pieces, 1 + (rng() < 0.4 ? 1 : 0));
        const weakEndgames = pick(d.endgames, 1 + (rng() < 0.5 ? 1 : 0));
        const weakTactics = pick(d.tactics, 1 + (rng() < 0.35 ? 1 : 0));
        const weakPositional = pick(d.positional, 1);

        // Phase weakness: one phase is noticeably worse
        const phaseWeights = {};
        for (const p of d.phases) {
          phaseWeights[p] = 1.0; // baseline
        }
        const worstPhase = pick(d.phases, 1)[0];
        phaseWeights[worstPhase] = 1.15 + rng() * 0.25; // 1.15-1.40x more errors in weak phase

        // Generate extra error rates for each weakness (how much worse they are)
        const extraError = {};
        for (const p of weakPieces)
          extraError[`piece_${p}`] = 0.04 + rng() * 0.05;
        for (const e of weakEndgames)
          extraError[`endgame_${e}`] = 0.05 + rng() * 0.06;
        for (const t of weakTactics)
          extraError[`tactic_${t}`] = 0.05 + rng() * 0.05;
        for (const p of weakPositional)
          extraError[`positional_${p}`] = 0.03 + rng() * 0.04;

        State.human.weaknesses = {
          pieces: weakPieces,
          phases: phaseWeights,
          endgames: weakEndgames,
          tactics: weakTactics,
          positional: weakPositional,
          extraErrorRate: extraError,
        };

        // --- Multi-game behavioral consistency (item 5) ---
        // Generate persistent player tempo and accuracy band from the same seed
        // These make the account feel like a consistent person across many games
        State.human.playerTempo = 0.8 + rng() * 0.4; // 0.80-1.20 (fast player vs slow player)
        State.human.playerAccuracyBand = -0.04 + rng() * 0.08; // -0.04 to +0.04 shift on suboptimal rate

        Utils.log(
          `WeaknessProfile [seed=${wp.seed}]: pieces=${weakPieces}, phase=${worstPhase}(x${phaseWeights[worstPhase].toFixed(2)}), endgames=${weakEndgames}, tactics=${weakTactics}, positional=${weakPositional}, tempo=${State.human.playerTempo.toFixed(2)}, accuracyBand=${State.human.playerAccuracyBand.toFixed(3)}`,
          "info",
        );
      },

      // Returns extra suboptimal rate for the current position based on weaknesses
      getExtraErrorRate: (fen, move) => {
        const w = State.human.weaknesses;
        if (!w || !CONFIG.humanization.weaknessProfile.enabled) return 0;

        let extra = 0;
        const phase = HumanStrategy.getGamePhase(fen);

        // Phase weakness multiplier (applied as a multiplier to total rate externally)
        // Here we return additive bonus
        const phaseBonus = (w.phases[phase] || 1.0) - 1.0;
        extra += phaseBonus * 0.06; // convert multiplier to small additive rate

        // Piece involvement: check if the moving piece matches a weakness
        if (move && move.length >= 4) {
          const fromSq = move.substring(0, 2);
          const movingPiece = WeaknessProfile._identifyPiece(fen, fromSq);
          if (movingPiece && w.pieces.includes(movingPiece)) {
            extra += w.extraErrorRate[`piece_${movingPiece}`] || 0;
          }
        }

        // Endgame type weakness
        if (phase === "endgame") {
          const pieces = Utils.countPieces(fen);
          const egType = WeaknessProfile._classifyEndgame(fen);
          if (egType && w.endgames.includes(egType)) {
            extra += w.extraErrorRate[`endgame_${egType}`] || 0;
          }
        }

        return Math.min(extra, 0.15); // cap total extra at 15%
      },

      _identifyPiece: (fen, sq) => {
        const board = fen.split(" ")[0];
        const file = sq.charCodeAt(0) - 97;
        const rank = parseInt(sq[1]) - 1;
        const rows = board.split("/").reverse();
        if (!rows[rank]) return null;
        let col = 0;
        for (const ch of rows[rank]) {
          if (/\d/.test(ch)) {
            col += parseInt(ch);
            continue;
          }
          if (col === file) {
            const map = {
              n: "knight",
              b: "bishop",
              r: "rook",
              q: "queen",
              k: "king",
              p: "pawn",
            };
            return map[ch.toLowerCase()] || null;
          }
          col++;
        }
        return null;
      },

      _classifyEndgame: (fen) => {
        const board = fen.split(" ")[0].toLowerCase();
        const hasQ = board.includes("q");
        const hasR = board.includes("r");
        const hasB = board.includes("b");
        const hasN = board.includes("n");
        if (hasQ && !hasR && !hasB && !hasN) return "queen_endgame";
        if (hasR && !hasQ && !hasB && !hasN) return "rook_endgame";
        if (hasB && !hasQ && !hasR && !hasN) return "bishop_endgame";
        if (hasN && !hasQ && !hasR && !hasB) return "knight_endgame";
        if (!hasQ && !hasR && !hasB && !hasN) return "pawn_endgame";
        return null; // mixed — no specific type
      },
    };

    const Utils = {
      log: () => {},
      countPieces: (fen) =>
        (fen?.split(" ")[0].match(/[rnbqkp]/gi) || []).length,
      randomRange: (a, b) => a + Math.random() * (b - a),
      gaussianRandom: (m = 0, s = 1) =>
        m +
        Math.sqrt(-2 * Math.log(Math.max(Number.EPSILON, Math.random()))) *
          Math.cos(2 * Math.PI * Math.random()) *
          s,
      humanDelay: (a, b) =>
        Math.max(
          a * 0.7,
          Math.min(
            b * 1.4,
            Math.exp(
              Utils.gaussianRandom(Math.log(Math.max(1, (a + b) / 2)), 0.6),
            ),
          ),
        ),
    };
    const HumanStrategy = {
      evalLossCp: (best, candidate) => {
        if (!best || !candidate) return 0;
        if (best.type === "cp" && candidate.type === "cp") {
          return Math.max(0, (best.value - candidate.value) * 100);
        }
        if (best.type === "mate" && candidate.type === "cp") {
          return best.value > 0 ? 300 : 0;
        }
        if (best.type === "cp" && candidate.type === "mate") {
          return candidate.value > 0 ? 0 : 900;
        }
        if (best.type === "mate" && candidate.type === "mate") {
          if (best.value > 0 && candidate.value > 0) {
            return Math.max(
              0,
              (Math.abs(candidate.value) - Math.abs(best.value)) * 50,
            );
          }
          if (best.value < 0 && candidate.value < 0) {
            return Math.max(
              0,
              (Math.abs(best.value) - Math.abs(candidate.value)) * 50,
            );
          }
          return candidate.value > 0 ? 0 : 900;
        }
        return 0;
      },
      getGamePhase: (fen) => {
        if (!fen) return "middlegame";
        const board = fen.split(" ")[0];
        const moveNum = State.moveCount;
        const minorMajor = (board.match(/[rnbqRNBQ]/g) || []).length;
        const queens = (board.match(/[qQ]/g) || []).length;
        if (moveNum <= 12) return "opening";
        if (minorMajor <= 6 || (queens === 0 && minorMajor <= 8))
          return "endgame";
        return "middlegame";
      },
      getPositionComplexity: (fen) => {
        if (!fen) return 0.5;
        const board = fen.split(" ")[0];
        const pieces = (board.match(/[rnbqRNBQ]/g) || []).length;
        const pawns = (board.match(/[pP]/g) || []).length;
        let complexity = (pieces + pawns * 0.5) / 24;
        if (State.currentEval && Math.abs(State.currentEval.value) < 0.5) {
          complexity += 0.2;
        }
        // More pawns in center = more tactical complexity
        const ranks = board.split("/");
        let centerPawns = 0;
        for (const rank of ranks) {
          let col = 0;
          for (const ch of rank) {
            if (ch >= "1" && ch <= "8") col += parseInt(ch);
            else {
              if ((col === 3 || col === 4) && (ch === "p" || ch === "P"))
                centerPawns++;
              col++;
            }
          }
        }
        if (centerPawns >= 2) complexity += 0.15;
        if (pieces > 10) complexity += 0.1;
        return Math.min(1, Math.max(0, complexity));
      },
      getEndgameTechniqueMult: (fen) => {
        if (!fen) return 1.0;
        const cfg = CONFIG.endgameTechnique;
        if (!cfg?.enabled) return 1.0;
        const phase = HumanStrategy.getGamePhase(fen);
        if (phase !== "endgame") return 1.0;

        const board = fen.split(" ")[0];
        const knights = (board.match(/[nN]/g) || []).length;
        const bishops = (board.match(/[bB]/g) || []).length;
        const rooks = (board.match(/[rR]/g) || []).length;
        const queens = (board.match(/[qQ]/g) || []).length;
        const pawns = (board.match(/[pP]/g) || []).length;
        const pieces = knights + bishops + rooks + queens;

        // K+P only (no minor/major pieces left)
        if (pieces === 0 && pawns > 0) return cfg.kpMistakeMult;
        // R+P (only rooks and pawns)
        if (
          queens === 0 &&
          knights === 0 &&
          bishops === 0 &&
          rooks > 0 &&
          rooks <= 2
        )
          return cfg.rpMistakeMult;
        // Simple endgames: 1-2 minor pieces + pawns, no queens
        if (queens === 0 && pieces <= 2) return cfg.simpleMistakeMult;
        return 1.0;
      },
      recordMoveCPLoss: (cpLoss) => {
        const g = CONFIG.acplGovernor;
        if (!g?.enabled) return;
        // Sanity-clamp: ignore wildly negative or absurd values (mate-score noise).
        if (!Number.isFinite(cpLoss) || cpLoss < 0) cpLoss = 0;
        if (cpLoss > 500) cpLoss = 500; // single move's contribution is capped
        const win = State.human.acplWindow;
        win.push(cpLoss);
        State.human.acplSum += cpLoss;
        // Trim window to configured size
        while (win.length > g.windowSize) {
          State.human.acplSum -= win.shift();
        }
      },
      currentACPL: () => {
        const win = State.human.acplWindow;
        if (!win || win.length === 0) return 0;
        return State.human.acplSum / win.length;
      },
      acplBudgetState: () => {
        const g = CONFIG.acplGovernor;
        if (!g?.enabled) return "normal";
        const win = State.human.acplWindow;
        if (!win || win.length < g.minMoves) return "normal";
        const acpl = HumanStrategy.currentACPL();
        const target = g.targetACPL;
        if (acpl >= target * g.hardCapMult) return "over";
        if (acpl <= target * g.softFloorMult) return "under";
        return "normal";
      },
      detectMotifBlindness: (move, fen) => {
        const cfg = CONFIG.motifBlindness;
        if (!cfg?.enabled || !move || move.length < 4 || !fen) return 0;
        try {
          const board = HumanStrategy._parseFenBoard(fen);
          const fromSq = move.substring(0, 2);
          const toSq = move.substring(2, 4);
          const [fromR, fromF] = HumanStrategy._sqToIdx(fromSq);
          const [toR, toF] = HumanStrategy._sqToIdx(toSq);
          const piece = board[fromR]?.[fromF];
          if (!piece) return 0;
          const pieceLower = piece.toLowerCase();
          const isWhite = piece === piece.toUpperCase();

          let missChance = 0;

          // Backwards knight move: knight moves toward our own back rank
          if (pieceLower === "n") {
            const backwards = isWhite ? toR > fromR : toR < fromR;
            if (backwards)
              missChance = Math.max(missChance, cfg.backwardsKnightMissChance);
          }

          // Long diagonal bishop move: 5+ squares
          if (pieceLower === "b") {
            const distance = Math.max(
              Math.abs(toR - fromR),
              Math.abs(toF - fromF),
            );
            if (distance >= 5)
              missChance = Math.max(missChance, cfg.longDiagonalMissChance);
          }

          // Zwischenzug detection: best PV has a quiet (non-capture) move at index 2+
          // wedged inside a forcing sequence (captures at index 1 and 3+)
          const pv = State.candidates[1]?.pv;
          if (pv && pv.length >= 4) {
            const isCapture = (mv) => {
              if (!mv || mv.length < 4) return false;
              const [tR, tF] = HumanStrategy._sqToIdx(mv.substring(2, 4));
              return board[tR]?.[tF] != null;
            };
            // If our best move is forcing but PV[2] is quiet between captures
            if (
              isCapture(pv[0]) &&
              pv[2] &&
              !isCapture(pv[2]) &&
              isCapture(pv[3] || "")
            ) {
              missChance = Math.max(missChance, cfg.zwischenzugMissChance);
            }
          }

          // Deflection: piece sac (we move a higher-value piece to a square
          // attacked by a lower-value piece, but it's still best)
          const captured = board[toR]?.[toF];
          if (captured) {
            const ourValue = HumanStrategy._pieceValues[pieceLower] || 0;
            const theirValue =
              HumanStrategy._pieceValues[captured.toLowerCase()] || 0;
            if (ourValue > theirValue + 200) {
              // We're sacrificing — likely a deflection
              missChance = Math.max(missChance, cfg.deflectionMissChance);
            }
          }

          return missChance;
        } catch (e) {
          return 0;
        }
      },
      _pieceValues: { p: 100, n: 300, b: 320, r: 500, q: 900, k: 99999 },
      _parseFenBoard: (fen) => {
        const rows = fen.split(" ")[0].split("/").reverse(); // rank 1 first
        const board = [];
        for (let r = 0; r < 8; r++) {
          board[r] = [];
          let f = 0;
          for (const ch of rows[r] || "") {
            if (/\d/.test(ch)) {
              for (let i = 0; i < parseInt(ch); i++) board[r][f++] = null;
            } else board[r][f++] = ch;
          }
          while (f < 8) board[r][f++] = null;
        }
        return board;
      },
      _sqToIdx: (sq) => [parseInt(sq[1]) - 1, sq.charCodeAt(0) - 97],
      _getAttackers: (board, rank, file, color) => {
        const attackers = [];
        const isUpper = (ch) => ch && ch === ch.toUpperCase(); // white pieces
        const isColor = (ch) =>
          color === "w" ? isUpper(ch) : ch && !isUpper(ch);
        const inBounds = (r, f) => r >= 0 && r < 8 && f >= 0 && f < 8;
        const pv = HumanStrategy._pieceValues;

        // Pawn attacks
        const pawnDir = color === "w" ? -1 : 1; // pawns of color attack FROM this direction
        const pawnChar = color === "w" ? "P" : "p";
        for (const df of [-1, 1]) {
          const pr = rank + pawnDir,
            pf = file + df;
          if (inBounds(pr, pf) && board[pr][pf] === pawnChar) {
            attackers.push({ r: pr, f: pf, piece: "p", value: pv.p });
          }
        }

        // Knight attacks
        const knightChar = color === "w" ? "N" : "n";
        for (const [dr, df] of [
          [-2, -1],
          [-2, 1],
          [-1, -2],
          [-1, 2],
          [1, -2],
          [1, 2],
          [2, -1],
          [2, 1],
        ]) {
          const nr = rank + dr,
            nf = file + df;
          if (inBounds(nr, nf) && board[nr][nf] === knightChar) {
            attackers.push({ r: nr, f: nf, piece: "n", value: pv.n });
          }
        }

        // Sliding pieces: bishop/queen (diagonals), rook/queen (straights)
        const bishopChar = color === "w" ? "B" : "b";
        const rookChar = color === "w" ? "R" : "r";
        const queenChar = color === "w" ? "Q" : "q";

        // Diagonals (bishop + queen)
        for (const [dr, df] of [
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
        ]) {
          for (let dist = 1; dist < 8; dist++) {
            const sr = rank + dr * dist,
              sf = file + df * dist;
            if (!inBounds(sr, sf)) break;
            const p = board[sr][sf];
            if (p) {
              if (p === bishopChar || p === queenChar) {
                attackers.push({
                  r: sr,
                  f: sf,
                  piece: p.toLowerCase(),
                  value: pv[p.toLowerCase()],
                });
              }
              break; // blocked
            }
          }
        }

        // Straights (rook + queen)
        for (const [dr, df] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          for (let dist = 1; dist < 8; dist++) {
            const sr = rank + dr * dist,
              sf = file + df * dist;
            if (!inBounds(sr, sf)) break;
            const p = board[sr][sf];
            if (p) {
              if (p === rookChar || p === queenChar) {
                attackers.push({
                  r: sr,
                  f: sf,
                  piece: p.toLowerCase(),
                  value: pv[p.toLowerCase()],
                });
              }
              break; // blocked
            }
          }
        }

        // King attacks
        const kingChar = color === "w" ? "K" : "k";
        for (let dr = -1; dr <= 1; dr++) {
          for (let df = -1; df <= 1; df++) {
            if (dr === 0 && df === 0) continue;
            const kr = rank + dr,
              kf = file + df;
            if (inBounds(kr, kf) && board[kr][kf] === kingChar) {
              attackers.push({ r: kr, f: kf, piece: "k", value: pv.k });
            }
          }
        }

        return attackers;
      },
      getPieceValueFromFen: (fen, sq) => {
        if (!fen || !sq || sq.length < 2) return 0;
        const piece = WeaknessProfile._identifyPiece(fen, sq);
        const values = {
          pawn: 100,
          knight: 300,
          bishop: 320,
          rook: 500,
          queen: 900,
          king: 99999,
        };
        return values[piece] || 0;
      },
      isMoveSafe: (move, fen) => {
        if (!move || move.length < 4) return true;

        // --- Method 1: If this move is in the engine PV, check eval + board safety ---
        const candidates = State.candidates;
        const bestEval = candidates[1]?.eval;
        let inPV = false;
        for (let i = 1; i <= CONFIG.multiPV; i++) {
          const c = candidates[i];
          if (!c?.move || !c?.eval) continue;
          if (c.move === move) {
            if (bestEval?.type === "cp" && c.eval.type === "cp") {
              const cpLoss = (bestEval.value - c.eval.value) * 100;
              if (cpLoss > 250) return false;
            }
            if (c.eval.type === "mate" && c.eval.value < 0) return false;
            inPV = true;
            break; // don't return yet — still check board for high-value pieces
          }
        }

        // --- Method 2: Board-level attack analysis ---
        // Always run for non-PV moves. For PV moves, only run if a queen or rook is moving
        // (engine might say a queen move is "only -200cp" due to compensation, but visually
        // hanging your queen looks terrible and is a dead giveaway)
        try {
          const fromSq = move.substring(0, 2);
          const movingValue = HumanStrategy.getPieceValueFromFen(fen, fromSq);

          // If it's a PV move and NOT a high-value piece, trust the engine
          if (inPV && movingValue < 500) return true;

          // For high-value PV moves (queen/rook) or any non-PV move: run full board analysis
          const board = HumanStrategy._parseFenBoard(fen);
          const sideToMove = fen.split(" ")[1] || "w";
          const enemyColor = sideToMove === "w" ? "b" : "w";

          const toSq = move.substring(2, 4);
          const [toR, toF] = HumanStrategy._sqToIdx(toSq);
          const [fromR, fromF] = HumanStrategy._sqToIdx(fromSq);

          const movingPieceChar = board[fromR]?.[fromF];
          if (!movingPieceChar) return true; // can't identify piece

          // Is there an enemy piece on the destination? (capture)
          const capturedChar = board[toR]?.[toF];
          let capturedValue = capturedChar
            ? HumanStrategy._pieceValues[capturedChar.toLowerCase()] || 0
            : 0;
          const promotion = move[4]?.toLowerCase();
          const placedPieceChar = promotion
            ? sideToMove === "w"
              ? promotion.toUpperCase()
              : promotion
            : movingPieceChar;
          const resultingValue = promotion
            ? HumanStrategy._pieceValues[promotion] || movingValue
            : movingValue;

          // Simulate the move on the board for attack detection
          const simBoard = board.map((row) => [...row]);
          simBoard[fromR][fromF] = null;
          simBoard[toR][toF] = placedPieceChar;
          // En passant removes a pawn beside the destination, not on it.
          const epSquare = fen.split(" ")[3];
          if (
            movingPieceChar.toLowerCase() === "p" &&
            fromF !== toF &&
            !capturedChar &&
            epSquare === toSq
          ) {
            simBoard[fromR][toF] = null;
            capturedValue = HumanStrategy._pieceValues.p;
          }

          // Who attacks the destination AFTER the move?
          const enemyAttackers = HumanStrategy._getAttackers(
            simBoard,
            toR,
            toF,
            enemyColor,
          );
          const friendlyDefenders = HumanStrategy._getAttackers(
            simBoard,
            toR,
            toF,
            sideToMove,
          );

          // If no enemy attacks the square, it's safe
          if (enemyAttackers.length === 0) return true;

          // If it's a capture and we win material even if they recapture, it's fine
          // e.g. knight takes undefended rook — even if enemy recaptures we traded 300 for 500
          if (capturedValue >= resultingValue) return true;

          // Enemy attacks the square — check if we have enough defenders
          if (friendlyDefenders.length === 0) {
            // Piece is hanging with no defenders — BAD
            // Allow it only if the piece is a pawn (losing 100cp is minor)
            if (resultingValue <= 100) return true;
            Utils.log(
              `PieceProtect: ${move} hangs ${placedPieceChar} (${resultingValue}cp) with no defenders`,
              "debug",
            );
            return false;
          }

          // Both sides attack — do simple static exchange evaluation (SEE)
          // Sort attackers by value (cheapest first, like real exchanges)
          const atkSorted = [...enemyAttackers].sort(
            (a, b) => a.value - b.value,
          );
          const defSorted = [...friendlyDefenders].sort(
            (a, b) => a.value - b.value,
          );

          // Simulate exchange: enemy captures first, then we recapture, etc.
          let materialOnSquare = resultingValue; // our piece is there
          let balance = 0; // net material change from our perspective
          let turn = 0; // 0 = enemy captures, 1 = we recapture

          let atkIdx = 0,
            defIdx = 0;
          while (atkIdx < atkSorted.length || defIdx < defSorted.length) {
            if (turn % 2 === 0) {
              // Enemy captures
              if (atkIdx >= atkSorted.length) break; // enemy can't capture
              balance -= materialOnSquare; // we lose the piece on the square
              materialOnSquare = atkSorted[atkIdx].value; // enemy piece now sits there
              atkIdx++;
            } else {
              // We recapture
              if (defIdx >= defSorted.length) break; // we can't recapture
              balance += materialOnSquare; // we take their piece
              materialOnSquare = defSorted[defIdx].value; // our piece now sits there
              defIdx++;
            }
            turn++;
            // If it's the enemy's turn and balance is already positive for us, they'd stop
            if (turn % 2 === 0 && balance > 0) break;
            // If it's our turn and balance is very negative, we'd stop
            if (turn % 2 === 1 && balance < -resultingValue) break;
          }

          // Reject threshold depends on piece value:
          // Queen/Rook: reject if losing ANY material (> 50cp, to allow rounding)
          // Minor pieces: reject if losing more than a pawn (> 120cp)
          // Pawns: always ok (losing a pawn is minor)
          const rejectThreshold = resultingValue >= 500 ? -50 : -120;
          if (balance < rejectThreshold) {
            Utils.log(
              `PieceProtect: ${move} loses ~${Math.abs(balance)}cp in exchange (${placedPieceChar} worth ${resultingValue}cp vs ${atkSorted.length} attackers, ${defSorted.length} defenders)`,
              "debug",
            );
            return false;
          }

          return true;
        } catch (e) {
          // If analysis fails, fall back to conservative: don't move high-value pieces
          const fromSq = move.substring(0, 2);
          const val = HumanStrategy.getPieceValueFromFen(fen, fromSq);
          return val < 500; // only allow pawns/knights/bishops as fallback
        }
      },
      trackMove: (isBest, moveResult) => {
        State.human.totalMoveCount++;
        if (isBest) {
          State.human.bestMoveCount++;
          State.human.topMoveCount++;
          State.human.perfectStreak++;
          State.human.sloppyStreak = 0;
        } else {
          // Close alternatives still count toward top move for correlation tracking
          // (Chess.com sees them as essentially engine moves too)
          if (moveResult?.isCloseAlt) State.human.topMoveCount++;
          State.human.perfectStreak = 0;
          State.human.sloppyStreak++;
        }
        State.human.lastMoveWasBest = isBest;
        // Store eval for next move's tactic detection
        State.human._prevEval = State.currentEval?.value || 0;
        // Store our eval for king-safety detection (B16)
        State.human.prevOurEval = State.currentEval?.value ?? null;

        // --- ACPL governor (v16.1): record this move's cp-loss ---
        // Best move → 0 cp loss. Otherwise look up the chosen move in
        // State.candidates and diff against candidates[1] (the engine's pick).
        try {
          let cpLoss = Number.isFinite(moveResult?.cpLoss)
            ? moveResult.cpLoss
            : 0;
          if (
            !isBest &&
            moveResult?.move &&
            !Number.isFinite(moveResult?.cpLoss)
          ) {
            const bestEval = State.candidates?.[1]?.eval;
            if (bestEval) {
              // Find chosen move in candidates
              let chosen = null;
              for (let i = 1; i <= CONFIG.multiPV; i++) {
                const c = State.candidates?.[i];
                if (c?.move === moveResult.move) {
                  chosen = c;
                  break;
                }
              }
              if (chosen?.eval) {
                cpLoss = HumanStrategy.evalLossCp(bestEval, chosen.eval);
              } else {
                // Chosen move wasn't in candidates (random-legal / motif-blind / book deviation).
                // Use a conservative estimate: assume it's a typical sub-move for our rating.
                cpLoss =
                  CONFIG.humanization?.maxAcceptableCPLoss?.middlegame || 40;
              }
            }
          }
          HumanStrategy.recordMoveCPLoss(cpLoss);
          HumanMoveModel.recordHistory({
            role: "self",
            move: moveResult?.move,
            fen: moveResult?.fen || State.lastHandledFen,
            cpLoss,
            reason: moveResult?.reason,
            thinkCategory: State.human.thinkCategory,
            eval: State.currentEval?.value ?? null,
          });
        } catch (e) {
          // Never let ACPL bookkeeping break move tracking.
        }
      },
      calculateDelay: (fen, moveResult, isBook) => {
        const t = CONFIG.timing;
        const personality = State.human.gamePersonality || { timingMult: 1 };
        const phase = HumanStrategy.getGamePhase(fen);
        let min, max;

        // ============================================================
        // LAYER 0: Premove simulation (instant — bypasses everything)
        //
        // Gated by CONFIG.premoveGating. Real players premove ONLY when the
        // opponent's reply is effectively forced — single legal response,
        // obvious recapture, or king-moves-out-of-check. Premoving on any
        // "predicted" reply is a bot tell because it happens too often in
        // non-forcing positions.
        // ============================================================
        if (
          t.premove.enabled &&
          State.human.predictedReply &&
          moveResult.isBest
        ) {
          if (Math.random() < t.premove.chance && State.moveCount > 5) {
            const gate = CONFIG.premoveGating;
            let allowPremove = !gate.enabled; // if gating disabled, always allow

            if (gate.enabled) {
              // Never claim a premove if the opponent deviated from the
              // stored PV. `predictedReplyForced` is only set when a future
              // provider can prove a single legal response.
              if (
                State.human.predictedReplyMatched &&
                State.human.predictedReplyForced
              ) {
                allowPremove = true;
              }

              // Recapture gate: our move was a capture AND the predicted
              // reply is also a capture on the same destination square.
              if (!allowPremove && gate.allowRecaptures) {
                const ourMove = moveResult.move || "";
                if (
                  State.human.predictedReplyMatched &&
                  State.lastMoveWasCapture &&
                  State.lastCaptureSquare &&
                  ourMove.substring(2, 4) === State.lastCaptureSquare &&
                  Game.isCapture(ourMove, fen)
                ) {
                  allowPremove = true;
                }
              }
            }

            if (allowPremove) {
              Utils.log(
                `Timing: Premove (gated: ${CONFIG.premoveGating.enabled ? "pass" : "disabled"})`,
                "debug",
              );
              return TimeControlContext.clampDelay(
                Utils.humanDelay(t.premove.delay.min, t.premove.delay.max),
                fen,
                50,
              );
            } else {
              Utils.log(
                "Timing: Premove suppressed by gating (position not forcing enough)",
                "debug",
              );
            }
          }
        }

        // ============================================================
        // LAYER 0A: Forced-move recognition (B14)
        // When there's effectively only one good move (huge gap to next-best),
        // humans play it nearly instantly. Bots don't, which is detectable.
        // ============================================================
        if (
          CONFIG.forcedMove?.enabled &&
          !isBook &&
          moveResult.isBest &&
          State.moveCount > 3
        ) {
          const fm = CONFIG.forcedMove;
          const cands = State.candidates;
          const best = cands[1];
          if (best?.eval && best.eval.type === "cp") {
            let goodAlternatives = 0;
            let availableAlternatives = 0;
            for (let i = 2; i <= CONFIG.multiPV; i++) {
              const c = cands[i];
              if (!c?.eval || c.eval.type !== "cp") continue;
              availableAlternatives++;
              const cpGap = (best.eval.value - c.eval.value) * 100;
              if (cpGap < fm.gapCp) goodAlternatives++;
            }
            // We need at least two searched alternatives (unless MultiPV
            // itself is only 2) before claiming the position is forced.
            // One returned alternative is insufficient evidence that the
            // provider did not simply have a shallow/partial cache entry.
            const minimumEvidence = Math.min(
              2,
              Math.max(1, CONFIG.multiPV - 1),
            );
            if (
              availableAlternatives >= minimumEvidence &&
              goodAlternatives <= fm.maxAlternatives
            ) {
              const fastDelay = Utils.humanDelay(
                fm.instantMs.min,
                fm.instantMs.max,
              );
              Utils.log(
                `Timing: Forced move (only ${goodAlternatives + 1} good move${goodAlternatives ? "s" : ""} within ${fm.gapCp}cp) → ${Math.round(fastDelay)}ms`,
                "debug",
              );
              const boundedFastDelay = TimeControlContext.clampDelay(
                fastDelay,
                fen,
                180,
              );
              State.recentTimings.push(boundedFastDelay);
              if (State.recentTimings.length > 20) State.recentTimings.shift();
              return boundedFastDelay;
            }
          }
        }

        // ============================================================
        // LAYER 0B: Recapture speed (item 6)
        // When opponent just captured and our best move is to recapture,
        // humans respond almost instantly — it's the most obvious move.
        // ============================================================
        const isTrueRecapture =
          State.lastMoveWasCapture &&
          State.lastCaptureSquare &&
          moveResult.move?.substring(2, 4) === State.lastCaptureSquare &&
          Game.isCapture(moveResult.move, fen);
        if (isTrueRecapture && moveResult.isBest && !isBook) {
          min = 300;
          max = 1100;
          Utils.log("Timing: Instant recapture", "debug");
          // Still apply clock awareness to recaptures
          if (t.clockAware.enabled && State.clock.myTime != null) {
            for (const threshold of t.clockAware.thresholds) {
              if (State.clock.myTime <= threshold.secondsBelow) {
                min *= threshold.timingMult;
                max *= threshold.timingMult;
                break;
              }
            }
          }
          const recapDelay = Utils.humanDelay(min, max);
          const boundedRecapDelay = TimeControlContext.clampDelay(
            recapDelay,
            fen,
            180,
          );
          State.recentTimings.push(boundedRecapDelay);
          if (State.recentTimings.length > 20) State.recentTimings.shift();
          return boundedRecapDelay;
        }

        // ============================================================
        // LAYER 1: Base timing by move type
        // ============================================================
        if (isBook) {
          min = t.book.min;
          max = t.book.max;
        } else if (State.moveCount <= 6) {
          min = t.earlyGame.min;
          max = t.earlyGame.max;
        } else if (
          Game.isCapture(moveResult.move) &&
          State.currentEval &&
          Math.abs(State.currentEval.value) > 2
        ) {
          min = t.forced.min;
          max = t.forced.max;
        } else if (
          Math.random() < t.instantMove.chance &&
          State.moveCount > 5
        ) {
          min = t.instantMove.min;
          max = t.instantMove.max;
          Utils.log("Timing: Instant/pre-move");
        } else if (Math.random() < t.longThink.chance) {
          min = t.longThink.min;
          max = t.longThink.max;
          Utils.log("Timing: Long think");
        } else {
          const complexity = HumanStrategy.getPositionComplexity(fen);
          if (complexity > 0.65) {
            min = t.complex.min;
            max = t.complex.max;
          } else if (
            complexity < 0.3 ||
            (State.currentEval && State.currentEval.value > 3)
          ) {
            min = t.simple.min;
            max = t.simple.max;
          } else {
            min = t.base.min;
            max = t.base.max;
          }

          if (State.currentEval && Math.abs(State.currentEval.value) < 0.3) {
            min += 500;
            max += 1200;
          }
          if (moveResult.reason === "suboptimal") {
            min += 200;
            max += 600;
          }
          if (moveResult.reason === "blunder") {
            if (Math.random() < 0.5) {
              min = t.forced.min;
              max = t.forced.max + 300;
            } else {
              min = t.complex.min;
              max = t.complex.max;
            }
          }
        }

        // ============================================================
        // LAYER 2: Time management curve (item 3)
        // Real players spend ~15% of time in opening, ~55% middlegame, ~30% endgame
        // This shapes the base timing to match that distribution.
        // ============================================================
        if (!isBook) {
          if (phase === "opening") {
            min *= 0.65;
            max *= 0.75; // play faster in opening (known territory)
          } else if (phase === "middlegame") {
            min *= 1.15;
            max *= 1.3; // think most in middlegame (critical decisions)
          } else if (phase === "endgame") {
            // Endgame: a bit faster than middlegame but slower than opening
            // (technique phase — fewer choices but need precision)
            min *= 0.85;
            max *= 0.95;
          }
        }

        // ============================================================
        // LAYER 3: Opponent-move surprise reaction (item 1)
        // After a surprising opponent move, think longer.
        // After an expected/obvious move, respond faster.
        // ============================================================
        if (!isBook && State.moveCount > 3) {
          const surprise = State.human.opponentMoveSurprise; // 0-1
          if (surprise > 0.5) {
            // Surprising move — need extra time to recalculate
            const surpriseMult = 1.0 + surprise * 0.6; // up to 1.6x
            min *= surpriseMult;
            max *= surpriseMult;
            Utils.log(
              `Timing: Surprised by opponent move (${(surprise * 100).toFixed(0)}%) → ${surpriseMult.toFixed(2)}x`,
              "debug",
            );
          } else if (surprise < 0.1 && State.human.predictedReply) {
            // Completely expected move — respond a bit faster
            min *= 0.8;
            max *= 0.85;
          }
        }

        // ============================================================
        // LAYER 4: Think momentum / inertia (item 2)
        // After a long think, the next move is often faster because
        // you already calculated the continuation during the long think.
        // After a fast move, the next might be slower (didn't plan ahead).
        // ============================================================
        if (!isBook && State.human.lastThinkTime > 0) {
          const lastThink = State.human.lastThinkTime;
          if (lastThink > 8000) {
            // Last move was a long think — this one should be faster (calculated ahead)
            min *= 0.55;
            max *= 0.7;
            Utils.log(
              "Timing: Momentum — fast follow-up after long think",
              "debug",
            );
          } else if (lastThink > 5000) {
            min *= 0.75;
            max *= 0.85;
          } else if (lastThink < 1200 && State.moveCount > 8) {
            // Last move was very fast — might need to slow down and actually think now
            min *= 1.1;
            max *= 1.25;
          }
        }

        // ============================================================
        // LAYER 4A: Out-of-Book Confusion Pause (A6)
        // First move after leaving prep — humans pause significantly because
        // they're transitioning from memory to actual calculation.
        // ============================================================
        if (
          !isBook &&
          CONFIG.bookExitPause?.enabled &&
          State.human.justLeftBook
        ) {
          if (
            State.human.bookMovesPlayed >=
            CONFIG.bookExitPause.minBookMovesBefore
          ) {
            const mult = CONFIG.bookExitPause.multiplier;
            min *= mult;
            max *= mult;
            Utils.log(
              `Timing: Out-of-book confusion pause (${mult}x)`,
              "debug",
            );
          }
          State.human.justLeftBook = false; // consume the flag
        }

        // ============================================================
        // LAYER 4B: Time Bank Curve (A9)
        // Real time spending is a bell curve peaking at the critical
        // middlegame, lower in opening and endgame.
        // ============================================================
        if (!isBook && CONFIG.timeBankCurve?.enabled && State.moveCount > 3) {
          const tbc = CONFIG.timeBankCurve;
          const dist = Math.abs(State.moveCount - tbc.peakMove);
          // Bell shape: 1 at peak, falls to 1.0 at falloffMoves away
          const falloff = Math.max(0, 1 - dist / tbc.falloffMoves);
          const curveMult = 1.0 + (tbc.peakMultiplier - 1.0) * falloff;
          if (curveMult > 1.02) {
            min *= curveMult;
            max *= curveMult;
          }
        }

        // ============================================================
        // LAYER 4C: Asymmetric King Safety (B16)
        // Defending against an attack on our own king triggers longer
        // thinks than attacking the opponent's king.
        // ============================================================
        if (
          !isBook &&
          CONFIG.kingSafety?.enabled &&
          State.currentEval &&
          State.human.prevOurEval != null
        ) {
          const ks = CONFIG.kingSafety;
          const evalDelta = State.human.prevOurEval - State.currentEval.value;
          if (evalDelta >= ks.evalDropTrigger) {
            // Eval got worse for us — possibly under attack
            min *= ks.defenseTimingMult;
            max *= ks.defenseTimingMult;
            Utils.log(
              `Timing: King-safety defense (eval drop ${evalDelta.toFixed(2)}) → ${ks.defenseTimingMult}x`,
              "debug",
            );
          }
        }

        // ============================================================
        // LAYER 5: Fatigue
        // ============================================================
        if (t.fatigue.enabled && State.moveCount > t.fatigue.startMove) {
          const extra = Math.min(
            t.fatigue.cap,
            (State.moveCount - t.fatigue.startMove) * t.fatigue.msPerMove,
          );
          min += extra;
          max += extra;
        }

        // ============================================================
        // LAYER 6: Clock awareness
        // ============================================================
        if (t.clockAware.enabled && State.clock.myTime != null) {
          for (const threshold of t.clockAware.thresholds) {
            if (State.clock.myTime <= threshold.secondsBelow) {
              min *= threshold.timingMult;
              max *= threshold.timingMult;
              break;
            }
          }
        }

        // ============================================================
        // LAYER 7: Per-game personality jitter + persistent player tempo (item 5 partial)
        // ============================================================
        min *= personality.timingMult;
        max *= personality.timingMult;
        // Persistent player tempo: some accounts are naturally fast/slow players
        min *= State.human.playerTempo;
        max *= State.human.playerTempo;
        // Tilt: thinking slower/frustrated overthinking after a loss
        if (State.human.tiltActive && CONFIG.tilt?.enabled) {
          min *= CONFIG.tilt.timingMult;
          max *= CONFIG.tilt.timingMult;
        }

        // ============================================================
        // LAYER 8: Timing-accuracy coupling (existing)
        // ============================================================
        if (CONFIG.humanization.timingAccuracyCoupling.enabled && !isBook) {
          const cat = State.human.thinkCategory;
          if (cat === "fast") {
            min *= 0.45;
            max *= 0.55;
            Utils.log("TimingCoupling: Fast think", "debug");
          } else if (cat === "slow") {
            min *= 1.4;
            max *= 1.8;
            Utils.log("TimingCoupling: Slow think", "debug");
          }
        }

        // v17.3 time-control conditioning: faster pools compress the whole
        // timing shape while long controls preserve deliberate thinks. The
        // final spend budget below remains the authoritative clock guard.
        const tcTiming = TimeControlContext.profile().timingMult;
        min *= tcTiming;
        max *= tcTiming;

        // ============================================================
        // LAYER 9: Eval-aware timing (existing)
        // ============================================================
        if (State.currentEval && !isBook) {
          const ev = State.currentEval.value;
          if (Math.abs(ev) < 0.5) {
            min *= 1.15;
            max *= 1.25;
          } else if (ev > 3.0) {
            min *= 0.7;
            max *= 0.8;
          } else if (ev < -2.0) {
            if (Math.random() < 0.4) {
              min *= 0.5;
              max *= 0.65;
            } else {
              min *= 1.2;
              max *= 1.5;
            }
          }
        }

        // ============================================================
        // CUMULATIVE MULTIPLIER DAMPENING
        // ============================================================
        // Layers 2-9 multiply min/max cumulatively. In worst case the total
        // multiplier reaches ~5-8x which then hits the hard ceiling every
        // time, creating a detectable "many moves at exactly max" cluster.
        // Dampen the cumulative multiplier using sqrt-compression when it
        // goes beyond 2.0x (or below 0.5x), so extreme stacks pull toward
        // the middle while still preserving per-layer intent.
        const baseMean = (t.base.min + t.base.max) / 2;
        const currMean = (min + max) / 2;
        const cumMult = baseMean > 0 ? currMean / baseMean : 1;
        if (cumMult > 2.0) {
          // sqrt-compress: 4x becomes 2x, 9x becomes 3x, 16x becomes 4x
          const damped = Math.sqrt(cumMult * 2.0);
          const scale = damped / cumMult;
          min *= scale;
          max *= scale;
          Utils.log(
            `Timing: Dampened cumulative ${cumMult.toFixed(2)}x -> ${damped.toFixed(2)}x`,
            "debug",
          );
        } else if (cumMult < 0.5) {
          // Same compression for sub-0.5x stacks (prevents absurdly fast plays)
          const damped = 0.5 / Math.sqrt(0.5 / cumMult);
          const scale = damped / cumMult;
          min *= scale;
          max *= scale;
        }

        // ============================================================
        // FINAL: Sequence variation + clamp
        // ============================================================
        let delay = Utils.humanDelay(min, max);
        if (
          t.sequenceVariation.enabled &&
          State.recentTimings.length >= t.sequenceVariation.windowSize
        ) {
          const recent = State.recentTimings.slice(
            -t.sequenceVariation.windowSize,
          );
          const mean = recent.reduce((a, b) => a + b, 0) / recent.length;
          const variance =
            recent.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
            recent.length;
          const stdDev = Math.sqrt(variance);
          const cv = mean > 0 ? stdDev / mean : 0;

          if (cv < t.sequenceVariation.similarityThreshold) {
            if (Math.random() < 0.5) {
              delay = Utils.humanDelay(min * 0.3, min * 0.6);
              Utils.log(
                "Timing: Forced fast outlier (sequence variation)",
                "debug",
              );
            } else {
              delay = Utils.humanDelay(max * 1.15, max * 1.8);
              Utils.log(
                "Timing: Forced slow outlier (sequence variation)",
                "debug",
              );
            }
          }
        }

        // Hard clamp: respect user-configured base max.
        // Use a softer, noisier ceiling so we don't produce a spike at exactly
        // 1.5x base.max across every long-think move.
        const userMax = t.base.max;
        const noisyCeiling = userMax * (1.35 + Math.random() * 0.3); // 1.35-1.65x
        if (delay > noisyCeiling) {
          Utils.log(
            `Timing: Clamped ${Math.round(delay)}ms -> ${Math.round(noisyCeiling)}ms`,
            "debug",
          );
          delay = noisyCeiling;
        }
        // Minimum floor: 250ms unless it's an explicit premove/instant/recapture case.
        // 150ms was inhumanly fast — nobody makes non-recapture decisions that quick.
        delay = Math.max(delay, 250);

        // Time-scramble override: if < 5 seconds left, NEVER think more than 600ms
        if (State.clock.myTime != null && State.clock.myTime < 5) {
          delay = Math.min(delay, 400 + Math.random() * 200);
        }

        const unclampedByBudget = delay;
        delay = TimeControlContext.clampDelay(delay, fen, 250);
        if (delay < unclampedByBudget - 1) {
          Utils.log(
            `Timing: Clock budget ${Math.round(unclampedByBudget)}ms -> ${Math.round(delay)}ms (${TimeControlContext.describe()})`,
            "debug",
          );
        }

        State.recentTimings.push(delay);
        if (State.recentTimings.length > 20) State.recentTimings.shift();

        return delay;
      },
    };
    const RatingProfile = {
      styles: {
        universal: {
          opening: 1.0,
          middlegame: 1.0,
          endgame: 1.0,
          preferTactical: 0.5,
        },
        aggressive: {
          opening: 0.7,
          middlegame: 0.8,
          endgame: 1.3,
          preferTactical: 0.8,
        },
        positional: {
          opening: 1.2,
          middlegame: 1.1,
          endgame: 0.8,
          preferTactical: 0.2,
        },
        tactical: {
          opening: 0.9,
          middlegame: 0.72,
          endgame: 1.08,
          preferTactical: 0.92,
        },
        defensive: {
          opening: 1.0,
          middlegame: 0.9,
          endgame: 0.82,
          preferTactical: 0.3,
        },
        endgame: {
          opening: 1.35,
          middlegame: 1.15,
          endgame: 0.52,
          preferTactical: 0.45,
        },
        endgame_specialist: {
          opening: 1.5,
          middlegame: 1.3,
          endgame: 0.4,
          preferTactical: 0.5,
        },
      },
      anchors: [
        {
          rating: 400,
          depth: 4,
          correlation: 0.22,
          suboptimal: [0.7, 0.78, 0.66],
          cpLoss: [150, 220, 175],
          blunder: 0.11,
          blunderLoss: 520,
          acpl: 235,
          topCap: 0.18,
          bookRate: 0.08,
          tablebaseRate: 0.0,
          dbRate: 0.0,
          shallow: 0.6,
          motif: 2.35,
          endgame: [2.7, 2.45, 2.05],
          timing: [1800, 6200, 2800, 8200],
          longThink: 0.05,
          repertoireDeviation: 0.34,
          randomMove: 0.035,
          fastError: 0.28,
          slowBest: 0.06,
          hot: 0.04,
          cold: 0.22,
        },
        {
          rating: 600,
          depth: 6,
          correlation: 0.3,
          suboptimal: [0.6, 0.68, 0.57],
          cpLoss: [105, 155, 125],
          blunder: 0.075,
          blunderLoss: 380,
          acpl: 165,
          topCap: 0.28,
          bookRate: 0.18,
          tablebaseRate: 0.02,
          dbRate: 0.02,
          shallow: 0.43,
          motif: 1.95,
          endgame: [2.25, 2.05, 1.72],
          timing: [1750, 5900, 2900, 8600],
          longThink: 0.07,
          repertoireDeviation: 0.26,
          randomMove: 0.025,
          fastError: 0.22,
          slowBest: 0.09,
          hot: 0.06,
          cold: 0.18,
        },
        {
          rating: 800,
          depth: 8,
          correlation: 0.38,
          suboptimal: [0.51, 0.58, 0.49],
          cpLoss: [82, 118, 92],
          blunder: 0.052,
          blunderLoss: 285,
          acpl: 125,
          topCap: 0.36,
          bookRate: 0.3,
          tablebaseRate: 0.05,
          dbRate: 0.05,
          shallow: 0.34,
          motif: 1.65,
          endgame: [1.95, 1.78, 1.48],
          timing: [1700, 5600, 3000, 9000],
          longThink: 0.09,
          repertoireDeviation: 0.2,
          randomMove: 0.018,
          fastError: 0.18,
          slowBest: 0.12,
          hot: 0.08,
          cold: 0.15,
        },
        {
          rating: 1200,
          depth: 11,
          correlation: 0.48,
          suboptimal: [0.36, 0.43, 0.35],
          cpLoss: [52, 72, 56],
          blunder: 0.028,
          blunderLoss: 210,
          acpl: 75,
          topCap: 0.49,
          bookRate: 0.52,
          tablebaseRate: 0.1,
          dbRate: 0.08,
          shallow: 0.22,
          motif: 1.3,
          endgame: [1.7, 1.52, 1.32],
          timing: [1500, 5200, 3300, 9400],
          longThink: 0.1,
          repertoireDeviation: 0.14,
          randomMove: 0.012,
          fastError: 0.14,
          slowBest: 0.16,
          hot: 0.11,
          cold: 0.11,
        },
        {
          rating: 1500,
          depth: 12,
          correlation: 0.52,
          suboptimal: [0.29, 0.35, 0.28],
          cpLoss: [43, 58, 45],
          blunder: 0.018,
          blunderLoss: 180,
          acpl: 58,
          topCap: 0.54,
          bookRate: 0.68,
          tablebaseRate: 0.18,
          dbRate: 0.11,
          shallow: 0.17,
          motif: 1.1,
          endgame: [1.55, 1.42, 1.25],
          timing: [1300, 4700, 3500, 9800],
          longThink: 0.12,
          repertoireDeviation: 0.11,
          randomMove: 0.008,
          fastError: 0.12,
          slowBest: 0.2,
          hot: 0.13,
          cold: 0.09,
        },
        {
          rating: 1800,
          depth: 14,
          correlation: 0.57,
          suboptimal: [0.22, 0.27, 0.21],
          cpLoss: [34, 46, 34],
          blunder: 0.01,
          blunderLoss: 150,
          acpl: 42,
          topCap: 0.59,
          bookRate: 0.82,
          tablebaseRate: 0.32,
          dbRate: 0.15,
          shallow: 0.11,
          motif: 0.9,
          endgame: [1.4, 1.3, 1.18],
          timing: [1100, 4300, 3600, 9600],
          longThink: 0.13,
          repertoireDeviation: 0.08,
          randomMove: 0.005,
          fastError: 0.1,
          slowBest: 0.24,
          hot: 0.15,
          cold: 0.07,
        },
        {
          rating: 2100,
          depth: 15,
          correlation: 0.61,
          suboptimal: [0.17, 0.21, 0.16],
          cpLoss: [27, 36, 26],
          blunder: 0.006,
          blunderLoss: 125,
          acpl: 30,
          topCap: 0.63,
          bookRate: 0.9,
          tablebaseRate: 0.5,
          dbRate: 0.18,
          shallow: 0.075,
          motif: 0.7,
          endgame: [1.28, 1.22, 1.13],
          timing: [950, 4000, 3700, 9900],
          longThink: 0.14,
          repertoireDeviation: 0.065,
          randomMove: 0.003,
          fastError: 0.085,
          slowBest: 0.27,
          hot: 0.17,
          cold: 0.055,
        },
        {
          rating: 2400,
          depth: 16,
          correlation: 0.65,
          suboptimal: [0.13, 0.16, 0.12],
          cpLoss: [21, 28, 20],
          blunder: 0.0035,
          blunderLoss: 105,
          acpl: 21,
          topCap: 0.67,
          bookRate: 0.95,
          tablebaseRate: 0.68,
          dbRate: 0.21,
          shallow: 0.045,
          motif: 0.5,
          endgame: [1.18, 1.15, 1.09],
          timing: [850, 3800, 3900, 10500],
          longThink: 0.16,
          repertoireDeviation: 0.05,
          randomMove: 0.0015,
          fastError: 0.07,
          slowBest: 0.3,
          hot: 0.19,
          cold: 0.04,
        },
        {
          rating: 2600,
          depth: 17,
          correlation: 0.68,
          suboptimal: [0.1, 0.135, 0.09],
          cpLoss: [18, 23, 16],
          blunder: 0.0023,
          blunderLoss: 90,
          acpl: 16,
          topCap: 0.7,
          bookRate: 0.98,
          tablebaseRate: 0.8,
          dbRate: 0.23,
          shallow: 0.03,
          motif: 0.36,
          endgame: [1.12, 1.1, 1.06],
          timing: [780, 3600, 4000, 11200],
          longThink: 0.17,
          repertoireDeviation: 0.04,
          randomMove: 0.0008,
          fastError: 0.06,
          slowBest: 0.32,
          hot: 0.2,
          cold: 0.03,
        },
        {
          rating: 2800,
          depth: 18,
          correlation: 0.71,
          suboptimal: [0.08, 0.11, 0.07],
          cpLoss: [15, 19, 12],
          blunder: 0.0015,
          blunderLoss: 80,
          acpl: 12,
          topCap: 0.72,
          bookRate: 1.0,
          tablebaseRate: 0.9,
          dbRate: 0.25,
          shallow: 0.018,
          motif: 0.25,
          endgame: [1.07, 1.06, 1.04],
          timing: [700, 3400, 4200, 12000],
          longThink: 0.18,
          repertoireDeviation: 0.03,
          randomMove: 0.0003,
          fastError: 0.05,
          slowBest: 0.34,
          hot: 0.21,
          cold: 0.025,
        },
        {
          rating: 3000,
          depth: 19,
          correlation: 0.74,
          suboptimal: [0.06, 0.085, 0.05],
          cpLoss: [12, 15, 9],
          blunder: 0.001,
          blunderLoss: 70,
          acpl: 9,
          topCap: 0.75,
          bookRate: 1.0,
          tablebaseRate: 0.95,
          dbRate: 0.25,
          shallow: 0.01,
          motif: 0.18,
          endgame: [1.04, 1.035, 1.02],
          timing: [650, 3300, 4300, 12500],
          longThink: 0.19,
          repertoireDeviation: 0.025,
          randomMove: 0.0001,
          fastError: 0.04,
          slowBest: 0.36,
          hot: 0.22,
          cold: 0.02,
        },
      ],
      _blend: (left, right, amount) => {
        if (typeof left === "number" && typeof right === "number")
          return left + (right - left) * amount;
        if (Array.isArray(left) && Array.isArray(right)) {
          return left.map((value, index) =>
            RatingProfile._blend(value, right[index], amount),
          );
        }
        const output = {};
        for (const key of Object.keys(left))
          output[key] =
            key === "rating"
              ? left.rating + (right.rating - left.rating) * amount
              : RatingProfile._blend(left[key], right[key], amount);
        return output;
      },
      profileFor: (targetRating) => {
        const rating = Math.max(
          400,
          Math.min(3000, Number(targetRating) || 1800),
        );
        const anchors = RatingProfile.anchors;
        if (rating <= anchors[0].rating) return { ...anchors[0] };
        if (rating >= anchors[anchors.length - 1].rating)
          return { ...anchors[anchors.length - 1] };
        for (let index = 1; index < anchors.length; index++) {
          if (rating > anchors[index].rating) continue;
          const left = anchors[index - 1];
          const right = anchors[index];
          return RatingProfile._blend(
            left,
            right,
            (rating - left.rating) / (right.rating - left.rating),
          );
        }
        return { ...anchors[anchors.length - 1] };
      },
      apply(targetRating) {
        const r = Math.max(400, Math.min(3000, Number(targetRating) || 1800));
        const profile = RatingProfile.profileFor(r);
        const style =
          RatingProfile.styles[CONFIG.playStyle] ||
          RatingProfile.styles.universal;

        CONFIG.engineDepth.base = Math.round(profile.depth);
        CONFIG.engineDepth.min = Math.max(1, CONFIG.engineDepth.base - 2);
        CONFIG.engineDepth.max = Math.min(22, CONFIG.engineDepth.base + 3);

        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
        const h = CONFIG.humanization;
        h.targetEngineCorrelation = profile.correlation;
        h.suboptimalMoveRate.opening = clamp(
          profile.suboptimal[0] * style.opening,
          0.03,
          0.55,
        );
        h.suboptimalMoveRate.middlegame = clamp(
          profile.suboptimal[1] * style.middlegame,
          0.03,
          0.55,
        );
        h.suboptimalMoveRate.endgame = clamp(
          profile.suboptimal[2] * style.endgame,
          0.025,
          0.5,
        );
        h.maxAcceptableCPLoss.opening = Math.round(profile.cpLoss[0]);
        h.maxAcceptableCPLoss.middlegame = Math.round(profile.cpLoss[1]);
        h.maxAcceptableCPLoss.endgame = Math.round(profile.cpLoss[2]);
        h.blunder.chance = profile.blunder;
        h.blunder.maxCPLoss = Math.round(profile.blunderLoss);
        h.bookUseRate = profile.bookRate;
        h.tablebaseUseRate = profile.tablebaseRate;
        h.playerMoveDB.preferRate = profile.dbRate;
        h.losingSharpness.suboptimalReduction = clamp(
          0.7 - (r - 400) / 4400,
          0.2,
          0.7,
        );

        CONFIG.acplGovernor.targetACPL = Math.round(profile.acpl);
        h.streaks.perfectStreakMax = Math.max(
          2,
          Math.round(2 + (r - 400) / 520),
        );
        h.streaks.sloppyStreakMax = r >= 2300 ? 1 : r >= 1500 ? 2 : 3;
        h.antiCorrelation.maxTopMoveRate = profile.topCap;
        h.antiCorrelation.closeEvalPreferRate = clamp(
          0.34 - (r - 400) / 10400,
          0.14,
          0.34,
        );

        CONFIG.timing.base.min = Math.round(profile.timing[0]);
        CONFIG.timing.base.max = Math.round(profile.timing[1]);
        CONFIG.timing.complex.min = Math.round(profile.timing[2]);
        CONFIG.timing.complex.max = Math.round(profile.timing[3]);
        CONFIG.timing.longThink.chance = profile.longThink;
        h.timingAccuracyCoupling.fastMoveSuboptimalBoost = profile.fastError;
        h.timingAccuracyCoupling.slowMoveBestBoost = profile.slowBest;
        h.accuracyClustering.hotStreakChance = profile.hot;
        h.accuracyClustering.coldStreakChance = profile.cold;

        CONFIG.shallowDepth.chance = profile.shallow;
        CONFIG.shallowDepth.preferLongPVChance = clamp(
          0.62 - (r - 400) / 5400,
          0.22,
          0.62,
        );
        CONFIG.shallowDepth.longPVThreshold = Math.round(
          clamp(5 + (r - 400) / 430, 6, 11),
        );
        CONFIG.motifBlindness.zwischenzugMissChance = clamp(
          0.18 * profile.motif,
          0.02,
          0.35,
        );
        CONFIG.motifBlindness.longDiagonalMissChance = clamp(
          0.12 * profile.motif,
          0.015,
          0.25,
        );
        CONFIG.motifBlindness.backwardsKnightMissChance = clamp(
          0.15 * profile.motif,
          0.02,
          0.3,
        );
        CONFIG.motifBlindness.deflectionMissChance = clamp(
          0.2 * profile.motif,
          0.025,
          0.38,
        );
        CONFIG.endgameTechnique.kpMistakeMult = profile.endgame[0];
        CONFIG.endgameTechnique.rpMistakeMult = profile.endgame[1];
        CONFIG.endgameTechnique.simpleMistakeMult = profile.endgame[2];
        CONFIG.repertoireHard.deviationRate = profile.repertoireDeviation;
        CONFIG.antiDetection.randomLegalMoveChance = profile.randomMove;
        CONFIG.blunderBias.simpleErrorMult = clamp(
          0.68 - (r - 400) / 5400,
          0.28,
          0.68,
        );
        CONFIG.blunderBias.criticalErrorMult = clamp(
          1.25 + (r - 400) / 3400,
          1.25,
          1.9,
        );
        CONFIG.forcedMove.instantMs.min = Math.round(
          clamp(520 - (r - 400) * 0.13, 200, 520),
        );
        CONFIG.forcedMove.instantMs.max = Math.round(
          clamp(1250 - (r - 400) * 0.26, 650, 1250),
        );
        CONFIG.engineRotation.shallowDepth = Math.max(
          9,
          Math.round(profile.depth - 2),
        );
        State.human.ratingProfile = {
          rating: r,
          label:
            r >= 2600
              ? "grandmaster"
              : r >= 2300
                ? "master"
                : r >= 1900
                  ? "expert"
                  : r >= 1500
                    ? "club"
                    : "developing",
        };
        State.human.activeProfile = { ...profile, rating: r };

        Utils.log(
          `Rating profile applied: ${r} ELO ${State.human.ratingProfile.label} (${CONFIG.playStyle}) | target corr ${(h.targetEngineCorrelation * 100).toFixed(0)}% | top cap ${(h.antiCorrelation.maxTopMoveRate * 100).toFixed(0)}% | target ACPL ${CONFIG.acplGovernor.targetACPL}`,
          "info",
        );
      },
    };
    const HumanCalibration = {
      anchors: [
        {
          rating: 400,
          bestRate: 0.1,
          targetACPL: 260,
          lossCenter: 220,
          lossSpread: 175,
          lossP90: 500,
          searchMultiPV: 10,
          searchDepth: 1,
        },
        {
          rating: 600,
          bestRate: 0.16,
          targetACPL: 185,
          lossCenter: 160,
          lossSpread: 135,
          lossP90: 370,
          searchMultiPV: 9,
          searchDepth: 1,
        },
        {
          rating: 800,
          bestRate: 0.22,
          targetACPL: 130,
          lossCenter: 112,
          lossSpread: 98,
          lossP90: 270,
          searchMultiPV: 8,
          searchDepth: 2,
        },
        {
          rating: 1000,
          bestRate: 0.28,
          targetACPL: 108,
          lossCenter: 92,
          lossSpread: 80,
          lossP90: 225,
          searchMultiPV: 8,
          searchDepth: 2,
        },
        {
          rating: 1200,
          bestRate: 0.35,
          targetACPL: 88,
          lossCenter: 74,
          lossSpread: 66,
          lossP90: 190,
          searchMultiPV: 7,
          searchDepth: 3,
        },
        {
          rating: 1400,
          bestRate: 0.42,
          targetACPL: 72,
          lossCenter: 60,
          lossSpread: 56,
          lossP90: 165,
          searchMultiPV: 7,
          searchDepth: 4,
        },
        {
          rating: 1600,
          bestRate: 0.49,
          targetACPL: 58,
          lossCenter: 48,
          lossSpread: 46,
          lossP90: 140,
          searchMultiPV: 7,
          searchDepth: 5,
        },
        {
          rating: 1800,
          bestRate: 0.56,
          targetACPL: 45,
          lossCenter: 37,
          lossSpread: 36,
          lossP90: 115,
          searchMultiPV: 6,
          searchDepth: 6,
        },
        {
          rating: 2000,
          bestRate: 0.62,
          targetACPL: 35,
          lossCenter: 29,
          lossSpread: 29,
          lossP90: 92,
          searchMultiPV: 6,
          searchDepth: 8,
        },
        {
          rating: 2200,
          bestRate: 0.68,
          targetACPL: 27,
          lossCenter: 22,
          lossSpread: 23,
          lossP90: 72,
          searchMultiPV: 5,
          searchDepth: 10,
        },
        {
          rating: 2400,
          bestRate: 0.73,
          targetACPL: 20,
          lossCenter: 16,
          lossSpread: 18,
          lossP90: 56,
          searchMultiPV: 5,
          searchDepth: 12,
        },
        {
          rating: 2600,
          bestRate: 0.78,
          targetACPL: 15,
          lossCenter: 12,
          lossSpread: 14,
          lossP90: 42,
          searchMultiPV: 5,
          searchDepth: 14,
        },
        {
          rating: 2800,
          bestRate: 0.83,
          targetACPL: 11,
          lossCenter: 9,
          lossSpread: 11,
          lossP90: 31,
          searchMultiPV: 5,
          searchDepth: 16,
        },
        {
          rating: 3000,
          bestRate: 0.88,
          targetACPL: 8,
          lossCenter: 6,
          lossSpread: 8,
          lossP90: 23,
          searchMultiPV: 5,
          searchDepth: 18,
        },
      ],
      clamp: (v, lo, hi) => Math.max(lo, Math.min(hi, Number(v) || 0)),
      forRating: (rating) => {
        const r = HumanCalibration.clamp(rating, 400, 3000),
          a = HumanCalibration.anchors;
        if (r <= a[0].rating) return { ...a[0] };
        if (r >= a[a.length - 1].rating) return { ...a[a.length - 1] };
        for (let i = 1; i < a.length; i++) {
          if (r > a[i].rating) continue;
          const l = a[i - 1],
            h = a[i],
            t = (r - l.rating) / (h.rating - l.rating),
            out = { rating: r };
          for (const k of Object.keys(l))
            if (k !== "rating") out[k] = l[k] + (h[k] - l[k]) * t;
          out.searchMultiPV = Math.round(out.searchMultiPV);
          return out;
        }
        return { ...a[a.length - 1] };
      },
      describe: (rating) => {
        const c = HumanCalibration.forRating(rating);
        return `${Math.round(c.bestRate * 100)}% best · ~${Math.round(c.targetACPL)} ACPL · d${Math.round(c.searchDepth)} · pool ${Math.round(c.searchMultiPV)}`;
      },
      budgetBias: (calibration) => {
        const win = State.human?.acplWindow || [];
        if (win.length < 6) return 0;
        const current = HumanStrategy.currentACPL();
        return HumanCalibration.clamp(
          (calibration.targetACPL - current) /
            Math.max(20, calibration.targetACPL),
          -1,
          1,
        );
      },
    };
    const ProfileEngine = {
      ensureConfig: () => settings.engineUI,
      clamp: (v, lo, hi) => Math.max(lo, Math.min(hi, Number(v) || 0)),
      unit: (v) => ProfileEngine.clamp(v, 0, 100) / 100,
      presets: {
        Casual: {
          strength: 1200,
          playingStyle: "universal",
          personality: {
            creativity: 58,
            risk: 50,
            tactical: 42,
            positional: 42,
            kingSafety: 45,
            materialInitiative: 45,
            attackPreference: 50,
            exchangePreference: 50,
            queenTradePreference: 50,
            simplification: 45,
          },
          advanced: {
            consistency: 42,
            mistakeProfile: "natural",
            mistakeSeverity: 58,
            alternativeQuality: 42,
            humanVariation: 70,
            movePrecision: 42,
          },
        },
        "Club Player": {
          strength: 1600,
          playingStyle: "universal",
          personality: {
            creativity: 52,
            risk: 46,
            tactical: 52,
            positional: 50,
            kingSafety: 55,
            materialInitiative: 48,
            attackPreference: 50,
            exchangePreference: 50,
            queenTradePreference: 52,
            simplification: 50,
          },
          advanced: {
            consistency: 58,
            mistakeProfile: "natural",
            mistakeSeverity: 48,
            alternativeQuality: 55,
            humanVariation: 55,
            movePrecision: 58,
          },
        },
        Tactical: {
          strength: 2000,
          playingStyle: "tactical",
          personality: {
            creativity: 68,
            risk: 64,
            tactical: 90,
            positional: 42,
            kingSafety: 48,
            materialInitiative: 70,
            attackPreference: 82,
            exchangePreference: 38,
            queenTradePreference: 28,
            simplification: 25,
          },
          advanced: {
            consistency: 68,
            mistakeProfile: "rare",
            mistakeSeverity: 32,
            alternativeQuality: 65,
            humanVariation: 42,
            movePrecision: 72,
          },
        },
        Positional: {
          strength: 2000,
          playingStyle: "positional",
          personality: {
            creativity: 42,
            risk: 30,
            tactical: 58,
            positional: 90,
            kingSafety: 78,
            materialInitiative: 35,
            attackPreference: 38,
            exchangePreference: 62,
            queenTradePreference: 58,
            simplification: 65,
          },
          advanced: {
            consistency: 78,
            mistakeProfile: "rare",
            mistakeSeverity: 28,
            alternativeQuality: 72,
            humanVariation: 32,
            movePrecision: 80,
          },
        },
        Aggressive: {
          strength: 1950,
          playingStyle: "aggressive",
          personality: {
            creativity: 78,
            risk: 78,
            tactical: 80,
            positional: 45,
            kingSafety: 42,
            materialInitiative: 78,
            attackPreference: 92,
            exchangePreference: 28,
            queenTradePreference: 18,
            simplification: 18,
          },
          advanced: {
            consistency: 62,
            mistakeProfile: "natural",
            mistakeSeverity: 42,
            alternativeQuality: 60,
            humanVariation: 52,
            movePrecision: 66,
          },
        },
        Solid: {
          strength: 2050,
          playingStyle: "defensive",
          personality: {
            creativity: 30,
            risk: 22,
            tactical: 62,
            positional: 82,
            kingSafety: 92,
            materialInitiative: 28,
            attackPreference: 28,
            exchangePreference: 68,
            queenTradePreference: 72,
            simplification: 78,
          },
          advanced: {
            consistency: 88,
            mistakeProfile: "rare",
            mistakeSeverity: 22,
            alternativeQuality: 76,
            humanVariation: 25,
            movePrecision: 86,
          },
        },
        Grinder: {
          strength: 2150,
          playingStyle: "positional",
          personality: {
            creativity: 36,
            risk: 28,
            tactical: 65,
            positional: 88,
            kingSafety: 82,
            materialInitiative: 40,
            attackPreference: 42,
            exchangePreference: 58,
            queenTradePreference: 62,
            simplification: 70,
          },
          advanced: {
            consistency: 92,
            mistakeProfile: "rare",
            mistakeSeverity: 18,
            alternativeQuality: 82,
            humanVariation: 20,
            movePrecision: 90,
            endgameStrength: 112,
          },
        },
        "Endgame Specialist": {
          strength: 2200,
          playingStyle: "endgame",
          personality: {
            creativity: 38,
            risk: 25,
            tactical: 68,
            positional: 86,
            kingSafety: 80,
            materialInitiative: 32,
            attackPreference: 35,
            exchangePreference: 80,
            queenTradePreference: 88,
            simplification: 92,
          },
          advanced: {
            consistency: 90,
            mistakeProfile: "rare",
            mistakeSeverity: 18,
            alternativeQuality: 84,
            humanVariation: 18,
            movePrecision: 92,
            endgameStrength: 120,
          },
        },
        Master: {
          strength: 2450,
          playingStyle: "universal",
          personality: {
            creativity: 56,
            risk: 38,
            tactical: 88,
            positional: 90,
            kingSafety: 90,
            materialInitiative: 52,
            attackPreference: 58,
            exchangePreference: 60,
            queenTradePreference: 62,
            simplification: 62,
          },
          advanced: {
            consistency: 95,
            mistakeProfile: "rare",
            mistakeSeverity: 12,
            alternativeQuality: 92,
            humanVariation: 12,
            movePrecision: 96,
          },
        },
      },
      phase: (fen) => HumanStrategy.getGamePhase(fen),
      baseStrength: () =>
        ProfileEngine.clamp(CONFIG.engineUI?.strength ?? 1800, 400, 3000),
      eloCalibration: () =>
        HumanCalibration.forRating(ProfileEngine.effectiveStrength()),
      searchMultiPV: () => {
        const display = Math.round(
          ProfileEngine.clamp(CONFIG.engineUI?.candidateMoves ?? 5, 1, 5),
        );
        if (
          !CONFIG.engineUI?.humanMode ||
          CONFIG.engineUI?.eloCalibration === false
        )
          return display;
        return Math.max(
          display,
          Math.round(ProfileEngine.eloCalibration().searchMultiPV),
        );
      },
      effectiveStrength: () => {
        const runtime =
          typeof State !== "undefined" && State.engineRuntime
            ? State.engineRuntime.effectiveStrength
            : null;
        return ProfileEngine.clamp(
          runtime == null ? ProfileEngine.baseStrength() : runtime,
          400,
          3000,
        );
      },
      normalized: (fen = State.lastFen) => {
        ProfileEngine.ensureConfig();
        const ui = CONFIG.engineUI,
          p = ui.personality,
          a = ui.advanced;
        const phase = fen ? ProfileEngine.phase(fen) : "middlegame";
        const phasePct =
          phase === "opening"
            ? a.openingStrength
            : phase === "endgame"
              ? a.endgameStrength
              : a.middlegameStrength;
        const evalValue =
          State.currentEval?.type === "cp" ? State.currentEval.value : 0;
        let contextualRisk = ProfileEngine.unit(p.risk);
        let contextualAttack = ProfileEngine.unit(p.attackPreference);
        let contextualSimplification = ProfileEngine.unit(p.simplification);
        if (a.comebackMode && evalValue < -1.0) {
          contextualRisk = Math.min(1, contextualRisk + 0.12);
          contextualAttack = Math.min(1, contextualAttack + 0.14);
          contextualSimplification = Math.max(
            0,
            contextualSimplification - 0.14,
          );
        }
        if (a.conversionMode && evalValue > 1.5) {
          contextualRisk = Math.max(0, contextualRisk - 0.16);
          contextualAttack = Math.max(0, contextualAttack - 0.08);
          contextualSimplification = Math.min(
            1,
            contextualSimplification + 0.2,
          );
        }
        return {
          rating: ProfileEngine.effectiveStrength(),
          baseRating: ProfileEngine.baseStrength(),
          phase,
          phaseStrength: ProfileEngine.clamp(phasePct, 70, 125) / 100,
          creativity: ProfileEngine.unit(p.creativity),
          risk: contextualRisk,
          tactical: ProfileEngine.unit(p.tactical),
          positional: ProfileEngine.unit(p.positional),
          kingSafety: ProfileEngine.unit(p.kingSafety),
          materialInitiative: ProfileEngine.unit(p.materialInitiative),
          attackPreference: contextualAttack,
          exchangePreference: ProfileEngine.unit(p.exchangePreference),
          queenTradePreference: ProfileEngine.unit(p.queenTradePreference),
          simplification: contextualSimplification,
          consistency: ProfileEngine.unit(a.consistency),
          mistakeSeverity: ProfileEngine.unit(a.mistakeSeverity),
          alternativeQuality: ProfileEngine.unit(a.alternativeQuality),
          humanVariation: ProfileEngine.unit(a.humanVariation),
          movePrecision: ProfileEngine.unit(a.movePrecision),
          mistakeProfile: a.mistakeProfile,
          criticalBoost: !!a.criticalBoost,
          easyRelaxation: !!a.easyRelaxation,
          autoBalance: !!a.autoBalance,
          style: ui.playingStyle,
          analysisQuality: ui.analysisQuality,
          eloCalibration: ui.eloCalibration !== false,
        };
      },
      depthFor: (fen) => {
        const ui = CONFIG.engineUI,
          n = ProfileEngine.normalized(fen);
        if (ui.depthMode === "manual")
          return ProfileEngine.clamp(ui.manualDepth, 1, 22);
        const cal = HumanCalibration.forRating(n.rating);
        let base = Math.round(cal.searchDepth);
        base += { fast: -1, balanced: 0, deep: 1 }[ui.analysisQuality] || 0;
        base += Math.round((n.phaseStrength - 1) * 3);
        const complexity = HumanStrategy.getPositionComplexity(fen);
        if (n.criticalBoost && complexity > 0.68) base += 1;
        if (n.easyRelaxation && complexity < 0.28) base -= 1;
        return ProfileEngine.clamp(base, 1, 22);
      },
    };
    const TimeControlContext = {
      parse: (label) => {
        const raw = String(label || "").trim();
        const text = raw
          .toLowerCase()
          .replace(/[–—+]/g, "|")
          .replace(/\s+/g, " ");
        let baseSeconds = null;
        let incrementSeconds = 0;
        let match = text.match(/(\d+(?:\.\d+)?)\s*\|\s*(\d+(?:\.\d+)?)/);
        if (match) {
          baseSeconds = Number(match[1]) * 60;
          incrementSeconds = Number(match[2]);
        } else if (
          (match = text.match(/(\d+(?:\.\d+)?)\s*(?:min(?:ute)?s?|m)\b/))
        ) {
          baseSeconds = Number(match[1]) * 60;
        } else if (
          (match = text.match(/(\d+(?:\.\d+)?)\s*(?:sec(?:ond)?s?|s)\b/))
        ) {
          baseSeconds = Number(match[1]);
        }
        let bucket = null;
        if (/bullet|ultrabullet|hyperbullet/.test(text)) bucket = "bullet";
        else if (/blitz/.test(text)) bucket = "blitz";
        else if (/rapid/.test(text)) bucket = "rapid";
        else if (/classical|standard/.test(text)) bucket = "classical";
        if (!bucket && Number.isFinite(baseSeconds)) {
          const fortyMoveSeconds = baseSeconds + incrementSeconds * 40;
          bucket =
            fortyMoveSeconds < 180
              ? "bullet"
              : fortyMoveSeconds < 600
                ? "blitz"
                : fortyMoveSeconds < 3600
                  ? "rapid"
                  : "classical";
        }
        return {
          label: raw || null,
          baseSeconds: Number.isFinite(baseSeconds) ? baseSeconds : null,
          incrementSeconds: Number.isFinite(incrementSeconds)
            ? incrementSeconds
            : 0,
          bucket: bucket || "rapid",
        };
      },
      refresh: () => {
        const label =
          State.human.timeControl?.label ||
          Account.readTimeControl() ||
          CONFIG.account.sessionTC;
        const parsed = TimeControlContext.parse(label);
        const observedMax = Math.max(
          State.clock.maxMyTime || 0,
          State.clock.maxOppTime || 0,
        );
        if (parsed.baseSeconds == null && observedMax > 0)
          parsed.baseSeconds = observedMax;
        if (!label && observedMax > 0) {
          const inferred = TimeControlContext.parse(
            `${Math.max(0.25, observedMax / 60).toFixed(2)} min`,
          );
          parsed.bucket = inferred.bucket;
          parsed.label = `inferred ${Math.round(observedMax)}s`;
        }
        State.human.timeControl = parsed;
        return parsed;
      },
      current: () => State.human.timeControl || TimeControlContext.refresh(),
      profile: (context) => {
        const tc = context || TimeControlContext.current();
        return (
          CONFIG.humanMoveModel.timeControls[tc?.bucket] ||
          CONFIG.humanMoveModel.timeControls.rapid
        );
      },
      maxSpendMs: (fen, clockSeconds = State.clock.myTime) => {
        const tc = TimeControlContext.current();
        const cfg = TimeControlContext.profile(tc);
        if (!Number.isFinite(clockSeconds) || clockSeconds <= 0) {
          return Math.max(1200, CONFIG.timing.base.max * cfg.timingMult * 1.35);
        }
        const phase = HumanStrategy.getGamePhase(fen);
        const movesRemaining =
          phase === "opening" ? 28 : phase === "middlegame" ? 18 : 12;
        const reserve = Math.min(clockSeconds * 0.45, cfg.minReserveSeconds);
        const usable = Math.max(0.35, clockSeconds - reserve);
        const sustainable =
          usable / movesRemaining +
          (tc.incrementSeconds || 0) * cfg.incrementCredit;
        const fractionalCap = Math.max(
          0.35,
          clockSeconds * cfg.maxSpendFraction,
        );
        const flagSafeCap = Math.max(0.2, clockSeconds - 0.75);
        const budgetMs =
          Math.min(sustainable, fractionalCap, flagSafeCap) * 1000;
        // Sub-second emergency: preserve a fraction for dispatch instead of
        // letting the ordinary 180ms floor exceed the remaining clock.
        if (clockSeconds < 0.75)
          return Math.max(50, Math.min(budgetMs, clockSeconds * 800));
        return Math.max(180, budgetMs);
      },
      clampDelay: (delay, fen, minimum = 250) => {
        const budget = TimeControlContext.maxSpendMs(fen);
        return Math.max(
          Math.min(minimum, budget),
          Math.min(Number(delay) || minimum, budget),
        );
      },
      describe: () => {
        const tc = TimeControlContext.current();
        const inc = tc.incrementSeconds ? `+${tc.incrementSeconds}` : "";
        return `${tc.bucket}${tc.baseSeconds ? ` ${Math.round(tc.baseSeconds / 6) / 10}${inc}` : ""}`;
      },
    };
    const HumanMoveModel = {
      _rngOverride: null,
      hashString: (value) => {
        let hash = 2166136261 >>> 0;
        for (const ch of String(value)) {
          hash ^= ch.charCodeAt(0);
          hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
      },
      seededRng: (seed) => {
        let state =
          typeof seed === "number"
            ? seed >>> 0
            : HumanMoveModel.hashString(seed);
        if (!state) state = 0x6d2b79f5;
        return () => {
          state += 0x6d2b79f5;
          let value = state;
          value = Math.imul(value ^ (value >>> 15), value | 1);
          value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
          return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
        };
      },
      setRng: (rng) => {
        HumanMoveModel._rngOverride = typeof rng === "function" ? rng : null;
      },
      _positionRng: (fen) => {
        if (HumanMoveModel._rngOverride) return HumanMoveModel._rngOverride;
        const personaSeed =
          CONFIG.humanization.weaknessProfile.seed || "chessrinsper-persona";
        const gameSeed = Main?._gameInstanceId || 0;
        return HumanMoveModel.seededRng(`${personaSeed}|${gameSeed}|${fen}`);
      },
      _evalLossCp: (best, candidate) => {
        if (!best || !candidate) return 0;
        if (best.type === "cp" && candidate.type === "cp")
          return Math.max(0, (best.value - candidate.value) * 100);
        if (best.type === "mate" && candidate.type === "mate") {
          if (best.value > 0 && candidate.value > 0)
            return Math.max(0, (candidate.value - best.value) * 50);
          if (best.value < 0 && candidate.value < 0)
            return Math.max(
              0,
              (Math.abs(best.value) - Math.abs(candidate.value)) * 50,
            );
          return best.value > 0 && candidate.value < 0 ? 900 : 0;
        }
        if (best.type === "mate" && best.value > 0) return 700;
        if (candidate.type === "mate" && candidate.value < 0) return 700;
        return 0;
      },
      _legalMoves: () => {
        try {
          const game = Game.getBoardGame();
          if (!game?.getLegalMoves) return [];
          return game
            .getLegalMoves()
            .map((move) =>
              move?.from && move?.to
                ? `${move.from}${move.to}${move.promotion || ""}`
                : typeof move === "string"
                  ? move
                  : null,
            )
            .filter(Boolean);
        } catch (e) {
          return [];
        }
      },
      _activeProfile: () => {
        const profile =
          State.human.activeProfile ||
          RatingProfile.profileFor(ProfileEngine.effectiveStrength());
        if (CONFIG.engineUI.advanced.autoBalance) return profile;
        return {
          ...profile,
          correlation: CONFIG.humanization.targetEngineCorrelation,
          blunder: CONFIG.humanization.blunder.chance,
          topCap: CONFIG.humanization.antiCorrelation.maxTopMoveRate,
        };
      },
      selectThinkCategory: (tc, rng, rating) => {
        const bucket = tc?.bucket || "rapid";
        const base = {
          bullet: [0.62, 0.34],
          blitz: [0.38, 0.52],
          rapid: [0.24, 0.55],
          classical: [0.16, 0.54],
        }[bucket];
        const skill = Math.max(0, Math.min(1, ((rating || 1800) - 400) / 2600));
        const fast = Math.max(0.1, base[0] - skill * 0.05);
        const normal = Math.min(0.72, base[1] + skill * 0.04);
        const draw = rng();
        return draw < fast ? "fast" : draw < fast + normal ? "normal" : "slow";
      },
      _buildCandidates: (fen, bestMove, profile) => {
        const output = new Map();
        const bestEval = State.candidates?.[1]?.eval || State.currentEval;
        const add = (move, fields = {}) => {
          if (!move || !/^[a-h][1-8][a-h][1-8][qrbn]?$/i.test(move)) return;
          const current = output.get(move) || { move, sources: new Set() };
          const sourceSet =
            current.sources instanceof Set
              ? current.sources
              : new Set(current.sources || []);
          const { sources = [], ...values } = fields;
          Object.assign(current, values);
          current.sources = sourceSet;
          for (const source of sources) current.sources.add(source);
          output.set(move, current);
        };
        add(bestMove, {
          rank: 1,
          eval: bestEval,
          depth: State.candidates?.[1]?.depth || 0,
          pv: State.candidates?.[1]?.pv || [bestMove],
          sources: ["engine"],
        });
        for (const key of Object.keys(State.candidates || {}).sort(
          (a, b) => Number(a) - Number(b),
        )) {
          const candidate = State.candidates[key];
          if (!candidate?.move) continue;
          add(candidate.move, {
            rank: Number(key) || output.size + 1,
            eval: candidate.eval,
            depth: candidate.depth || 0,
            pv: candidate.pv || [candidate.move],
            sources: ["engine"],
          });
        }
        const legalMoves = HumanMoveModel._legalMoves();
        const legalSet = new Set(legalMoves);
        const dbMoves = PlayerMoveDB.getCached(fen) || [];
        for (const dbMove of dbMoves) {
          if (output.has(dbMove.uci))
            add(dbMove.uci, {
              games: dbMove.games || 0,
              winRate: dbMove.winRate,
              sources: ["human-db"],
            });
        }
        if (legalMoves.length) {
          const repertoire = Account.repertoireMove(fen, legalMoves);
          if (repertoire)
            add(repertoire, {
              rank: output.get(repertoire)?.rank || 99,
              estimatedLossCp: Math.min(18, profile.cpLoss?.[0] || 30),
              sources: ["repertoire"],
            });
        }
        const phase = HumanStrategy.getGamePhase(fen);
        const phaseIndex =
          phase === "opening" ? 0 : phase === "middlegame" ? 1 : 2;
        const phaseLoss =
          profile.cpLoss?.[phaseIndex] ||
          CONFIG.humanization.maxAcceptableCPLoss[phase];
        const tcProfile = TimeControlContext.profile();
        const pressure = State.human.timePressureMult?.maxCPLoss || 1;
        const hardCap = Math.max(
          20,
          Math.min(
            profile.blunderLoss || 200,
            phaseLoss * 1.85 * tcProfile.qualityMult * pressure,
          ),
        );
        const maxGames = Math.max(1, ...dbMoves.map((move) => move.games || 0));
        return Array.from(output.values())
          .filter((candidate) => !legalSet.size || legalSet.has(candidate.move))
          .map((candidate) => {
            const cpLoss =
              candidate.move === bestMove
                ? 0
                : candidate.eval && bestEval
                  ? HumanMoveModel._evalLossCp(bestEval, candidate.eval)
                  : (candidate.estimatedLossCp ?? hardCap);
            const safe =
              candidate.move === bestMove ||
              HumanStrategy.isMoveSafe(candidate.move, fen);
            return {
              ...candidate,
              sources: Array.from(candidate.sources),
              cpLoss: Math.max(0, cpLoss),
              safe,
              tail: cpLoss > hardCap,
              popularity: (candidate.games || 0) / maxGames,
              phase,
              phaseLoss,
              hardCap,
            };
          })
          .filter(
            (candidate) =>
              candidate.safe &&
              (!candidate.tail ||
                candidate.cpLoss <= (profile.blunderLoss || 200)),
          )
          .sort((a, b) => (a.rank || 99) - (b.rank || 99))
          .slice(0, Math.max(2, CONFIG.humanMoveModel.candidateLimit));
      },
      score: (fen, bestMove, options = {}) => {
        const profile = options.profile || HumanMoveModel._activeProfile();
        const calibration =
          CONFIG.engineUI?.humanMode &&
          CONFIG.engineUI?.eloCalibration !== false
            ? HumanCalibration.forRating(profile.rating)
            : null;
        const tc = options.timeControl || TimeControlContext.current();
        const tcProfile =
          CONFIG.humanMoveModel.timeControls[tc.bucket] ||
          CONFIG.humanMoveModel.timeControls.rapid;
        const rng = options.rng || HumanMoveModel._positionRng(fen);
        const thinkCategory =
          options.thinkCategory ||
          (CONFIG.humanization.timingAccuracyCoupling.enabled
            ? HumanMoveModel.selectThinkCategory(tc, rng, profile.rating)
            : "normal");
        const candidates =
          options.candidates ||
          HumanMoveModel._buildCandidates(fen, bestMove, profile);
        const best =
          candidates.find((candidate) => candidate.move === bestMove) ||
          candidates[0];
        if (!best)
          return {
            distribution: [],
            thinkCategory,
            profile,
            factors: ["no-candidates"],
          };
        if (candidates.length === 1)
          return {
            distribution: [{ ...best, probability: 1, score: 0 }],
            thinkCategory,
            profile,
            factors: ["only-legal-candidate"],
            rng,
          };

        const skill = Math.max(0, Math.min(1, (profile.rating - 400) / 2600));
        const complexity = HumanStrategy.getPositionComplexity(fen);
        const history = options.history || State.human.moveHistory || [];
        const lastHistory = history[history.length - 1];
        const bestPvLength = best.pv?.length || 1;
        const minAltLoss = Math.min(
          ...candidates
            .filter((candidate) => candidate.move !== bestMove)
            .map((candidate) => candidate.cpLoss),
        );
        const forced = minAltLoss >= (CONFIG.forcedMove?.gapCp || 80);
        const predictedContinuation =
          State.human.predictedReplyMatched === true;
        const motifRisk =
          State.moveCount > 5
            ? HumanStrategy.detectMotifBlindness(bestMove, fen)
            : 0;
        const budgetState =
          options.budgetState || HumanStrategy.acplBudgetState();
        const isLosing =
          State.currentEval?.type === "cp" && State.currentEval.value < -0.8;
        const factors = [];

        const phase = HumanStrategy.getGamePhase(fen);
        const phaseIndex =
          phase === "opening" ? 0 : phase === "endgame" ? 2 : 1;
        let targetBest =
          profile.correlation +
          profile.suboptimal[phaseIndex] -
          CONFIG.humanization.suboptimalMoveRate[phase];
        targetBest -= (tcProfile.qualityMult - 1) * (0.13 - skill * 0.05);
        // Correlation anchors describe an average position. Complexity
        // shifts around that baseline instead of always taxing it.
        targetBest -= (complexity - 0.5) * (1 - skill) * 0.07;
        targetBest -= WeaknessProfile.getExtraErrorRate(fen, bestMove);
        if (CONFIG.blunderBias.enabled) {
          const b = CONFIG.blunderBias,
            t = Math.max(
              0,
              Math.min(
                1,
                (complexity - b.simpleCutoff) /
                  Math.max(0.001, b.criticalCutoff - b.simpleCutoff),
              ),
            );
          const mult =
            b.simpleErrorMult + t * (b.criticalErrorMult - b.simpleErrorMult);
          targetBest = 1 - (1 - targetBest) * mult;
        }
        if (CONFIG.endgameTechnique.enabled)
          targetBest =
            1 - (1 - targetBest) * HumanStrategy.getEndgameTechniqueMult(fen);
        if (CONFIG.tilt.enabled && State.human.tiltActive)
          targetBest -= CONFIG.tilt.suboptimalBoost;
        if (thinkCategory === "fast")
          targetBest -= (profile.fastError || 0.1) * 0.55;
        if (thinkCategory === "slow")
          targetBest += (profile.slowBest || 0.2) * 0.32;
        if (
          CONFIG.humanization.accuracyClustering.enabled &&
          State.human.clusterMode === "hot"
        )
          targetBest += 0.07;
        if (
          CONFIG.humanization.accuracyClustering.enabled &&
          State.human.clusterMode === "cold"
        )
          targetBest -= 0.07;
        if (budgetState === "over") targetBest += 0.12;
        if (budgetState === "under") targetBest -= 0.045;
        if (forced) {
          targetBest += 0.21;
          factors.push("forced-gap");
        }
        if (predictedContinuation) {
          targetBest += 0.045;
          factors.push("planned-continuation");
        }
        if (isLosing) {
          targetBest += 0.055;
          factors.push("defensive-focus");
        }
        if (motifRisk > 0) {
          targetBest -= motifRisk * (0.45 - skill * 0.15);
          factors.push("motif-load");
        }
        if (
          CONFIG.shallowDepth.enabled &&
          bestPvLength > (CONFIG.shallowDepth?.longPVThreshold || 8)
        ) {
          targetBest -= (profile.shallow || 0.1) * (0.16 + (1 - skill) * 0.08);
          factors.push("deep-calculation");
        }
        if (State.human.totalMoveCount >= 6) {
          const observed =
            State.human.topMoveCount / Math.max(1, State.human.totalMoveCount);
          targetBest += Math.max(
            -0.1,
            Math.min(0.1, (profile.correlation - observed) * 0.22),
          );
        }
        if (CONFIG.humanization.streaks.enabled) {
          const streak = CONFIG.humanization.streaks;
          if (State.human.perfectStreak >= streak.perfectStreakMax)
            targetBest = 0;
          else if (State.human.sloppyStreak >= streak.sloppyStreakMax)
            targetBest = 1;
        }
        if (
          State.human.autoLoseActive &&
          State.moveCount >= CONFIG.autoLose.minMovesBeforeLosing
        )
          targetBest = 1 - CONFIG.autoLose.suboptimalRate;
        // Unified Engine Profile modifies the probability of the top move coherently.
        const userProfile = ProfileEngine.normalized(fen);
        const mistakeRate =
          userProfile.mistakeProfile === "off"
            ? 0
            : userProfile.mistakeProfile === "frequent"
              ? 1
              : userProfile.mistakeProfile === "natural"
                ? 0.58
                : 0.28;
        targetBest += (userProfile.consistency - 0.5) * 0.18;
        targetBest += (userProfile.movePrecision - 0.5) * 0.16;
        targetBest -= (userProfile.creativity - 0.5) * 0.08;
        targetBest -= mistakeRate * userProfile.mistakeSeverity * 0.09;
        targetBest += (userProfile.phaseStrength - 1) * 0.24;
        if (!userProfile.autoBalance) {
          if (CONFIG.humanization.antiCorrelation.enabled)
            targetBest = Math.min(targetBest, profile.topCap);
        }
        if (calibration) {
          const budgetBias = HumanCalibration.budgetBias(calibration);
          // Blend existing contextual logic with a rating-specific human target.
          // When rolling ACPL is below target, slightly lower best-move rate;
          // when it is already too high, tighten up instead of stacking errors.
          const calibratedBest = HumanCalibration.clamp(
            calibration.bestRate -
              Math.max(0, budgetBias) * 0.11 +
              Math.max(0, -budgetBias) * 0.13,
            0.12,
            0.94,
          );
          targetBest = targetBest * 0.42 + calibratedBest * 0.58;
          if (forced) targetBest = Math.max(targetBest, 0.92);
          factors.push("elo-calibration");
        }
        targetBest = Math.max(0.08, Math.min(0.985, targetBest));

        const phaseScale =
          best.phaseLoss *
          tcProfile.qualityMult *
          (thinkCategory === "fast"
            ? 1.22
            : thinkCategory === "slow"
              ? 0.82
              : 1) *
          (!CONFIG.humanization.accuracyClustering.enabled
            ? 1
            : State.human.clusterMode === "cold"
              ? 1.18
              : State.human.clusterMode === "hot"
                ? 0.84
                : 1);
        const temperature =
          (1.24 - skill * 0.4) *
          (0.92 + (tcProfile.qualityMult - 0.88) * 0.45) *
          (0.86 + userProfile.humanVariation * 0.3);
        const alternatives = candidates
          .filter((candidate) => candidate.move !== bestMove)
          .map((candidate) => {
            // Developing players' errors have a broader loss tail; expert
            // alternatives cluster tightly around the engine choice.
            const lossDiscipline = 0.38 + skill * 1.02;
            let score =
              -Math.pow(candidate.cpLoss / Math.max(8, phaseScale), 1.1) *
              lossDiscipline;
            score -=
              Math.max(0, (candidate.rank || 4) - 2) * (0.12 + skill * 0.22);
            if (calibration) {
              const budgetBias = HumanCalibration.budgetBias(calibration);
              const desiredLoss =
                calibration.lossCenter *
                (1 +
                  Math.max(0, budgetBias) * 0.45 -
                  Math.max(0, -budgetBias) * 0.3);
              const distance =
                Math.abs(candidate.cpLoss - desiredLoss) /
                Math.max(10, calibration.lossSpread);
              const humanErrorWeight = 0.22 + (1 - skill) * 0.7;
              score += (0.62 - distance) * humanErrorWeight;
              if (candidate.cpLoss > calibration.lossP90 * 1.3)
                score -= 0.85 + skill * 0.65;
            }
            if (
              candidate.cpLoss <=
              CONFIG.humanization.antiCorrelation.closeEvalThreshold * 100
            )
              score += 0.32;
            if (candidate.sources.includes("human-db"))
              score +=
                0.72 *
                Math.sqrt(candidate.popularity) *
                Math.min(1, (profile.dbRate || 0.05) / 0.25);
            if (candidate.sources.includes("repertoire")) score += 1.15;
            if (
              CONFIG.shallowDepth.enabled &&
              bestPvLength > (CONFIG.shallowDepth?.longPVThreshold || 8) &&
              (candidate.pv?.length || 1) + 2 < bestPvLength
            )
              score += (1 - skill) * 0.38;
            if (
              lastHistory?.move &&
              candidate.move.substring(0, 2) ===
                lastHistory.move.substring(2, 4)
            )
              score += 0.1;
            if (candidate.tail)
              score +=
                Math.log(Math.max(0.0001, profile.blunder ?? 0.01)) - 0.8;
            // CandidateScorer: personality affects alternatives using concrete move features.
            const mf = BoardIntelligence.moveFeatures(fen, candidate.move);
            score +=
              (userProfile.creativity - 0.5) *
              0.7 *
              Math.min(1, Math.max(0, candidate.rank - 1) / 3);
            score +=
              (userProfile.risk - 0.5) *
              0.42 *
              (mf.attacking ? 1 : mf.capture ? 0.5 : -0.15);
            score +=
              (userProfile.tactical - 0.5) *
              0.48 *
              (mf.capture || mf.attacking ? 1 : 0);
            score +=
              (userProfile.positional - 0.5) *
              0.34 *
              (mf.center || mf.development ? 1 : 0);
            score +=
              (userProfile.kingSafety - 0.5) *
              0.3 *
              (mf.kingDefensive ? 1 : mf.attacking ? -0.12 : 0);
            score +=
              (userProfile.materialInitiative - 0.5) *
              0.3 *
              (mf.attacking ? 1 : mf.capture ? -0.25 : 0);
            score +=
              (userProfile.attackPreference - 0.5) *
              0.34 *
              (mf.attacking ? 1 : 0);
            score +=
              (userProfile.exchangePreference - 0.5) *
              0.26 *
              (mf.exchange ? 1 : 0);
            score +=
              (userProfile.queenTradePreference - 0.5) *
              0.32 *
              (mf.queenTrade ? 1 : 0);
            score +=
              (userProfile.simplification - 0.5) *
              0.28 *
              (mf.capture && candidate.cpLoss <= best.phaseLoss ? 0.65 : 0);
            const altTolerance = 0.55 + userProfile.alternativeQuality * 0.9;
            score -=
              (Math.max(0, candidate.cpLoss - best.phaseLoss * altTolerance) /
                Math.max(22, best.phaseLoss)) *
              0.35;
            return { ...candidate, score: score / Math.max(0.45, temperature) };
          });
        const maxScore = Math.max(
          ...alternatives.map((candidate) => candidate.score),
        );
        let altWeightTotal = 0;
        for (const candidate of alternatives) {
          candidate.weight = Math.exp(candidate.score - maxScore);
          altWeightTotal += candidate.weight;
        }
        const distribution = [{ ...best, score: 0, probability: targetBest }];
        for (const candidate of alternatives)
          distribution.push({
            ...candidate,
            probability:
              ((1 - targetBest) * candidate.weight) /
              Math.max(Number.EPSILON, altWeightTotal),
          });
        const probabilityFloor = Math.max(
          0,
          Number(CONFIG.humanMoveModel.minProbability) || 0,
        );
        let probabilityTotal = 0;
        for (const candidate of distribution) {
          candidate.probability = Math.max(
            probabilityFloor,
            candidate.probability,
          );
          probabilityTotal += candidate.probability;
        }
        for (const candidate of distribution)
          candidate.probability /= probabilityTotal;
        distribution.sort((a, b) => b.probability - a.probability);
        return {
          distribution,
          thinkCategory,
          profile,
          targetBest,
          complexity,
          factors,
          rng,
        };
      },
      choose: (fen, bestMove, options = {}) => {
        const scored = HumanMoveModel.score(fen, bestMove, options);
        if (!scored.distribution.length)
          return { move: bestMove, reason: "engine-fallback", isBest: true };
        const rng =
          options.rng || scored.rng || HumanMoveModel._positionRng(fen);
        let draw = rng();
        let selected = scored.distribution[scored.distribution.length - 1];
        for (const candidate of scored.distribution) {
          draw -= candidate.probability;
          if (draw <= 0) {
            selected = candidate;
            break;
          }
        }
        State.human.thinkCategory = scored.thinkCategory;
        const isBest = selected.move === bestMove;
        const close =
          selected.cpLoss <=
          CONFIG.humanization.antiCorrelation.closeEvalThreshold * 100;
        let reason = "profile-alt";
        if (isBest)
          reason = scored.factors.includes("forced-gap")
            ? "forced-best"
            : scored.factors.includes("planned-continuation")
              ? "planned-best"
              : "best";
        else if (selected.sources?.includes("repertoire"))
          reason = "repertoire";
        else if (
          selected.sources?.includes("human-db") &&
          selected.popularity >= 0.35
        )
          reason = "human-popular";
        else if (close) reason = "close-alt";
        else if (selected.tail) reason = "error-tail";
        else if (
          scored.factors.includes("deep-calculation") &&
          (selected.pv?.length || 1) < 6
        )
          reason = "calculation-limit";
        else if (scored.factors.includes("motif-load")) reason = "motif-miss";

        const explanation = {
          selected: selected.move,
          probability: selected.probability,
          cpLoss: selected.cpLoss,
          reason,
          targetBest: scored.targetBest ?? 1,
          thinkCategory: scored.thinkCategory,
          timeControl: TimeControlContext.describe(),
          complexity: scored.complexity ?? 0,
          factors: scored.factors,
          distribution: scored.distribution
            .slice(0, CONFIG.humanMoveModel.explanationLimit)
            .map((candidate) => ({
              move: candidate.move,
              probability: candidate.probability,
              cpLoss: candidate.cpLoss,
              sources: candidate.sources,
            })),
        };
        State.human.lastChoiceExplanation = explanation;
        const diagnostics = State.diagnostics.humanModel;
        diagnostics.choices++;
        diagnostics.probabilitySum += selected.probability;
        diagnostics.cpLossSum += selected.cpLoss;
        diagnostics.last = explanation;
        Utils.log(
          `HumanModel: ${selected.move} ${(selected.probability * 100).toFixed(1)}% · ${Math.round(selected.cpLoss)}cp · ${reason} · ${TimeControlContext.describe()}`,
          "debug",
        );
        return {
          move: selected.move,
          reason,
          isBest,
          isCloseAlt: !isBest && close,
          cpLoss: selected.cpLoss,
          probability: selected.probability,
          explanation,
          fen,
        };
      },
      recordHistory: (entry) => {
        if (!entry?.move) return;
        const history = State.human.moveHistory;
        const signature = `${entry.role || "unknown"}:${entry.move}:${entry.fen || ""}`;
        if (history[history.length - 1]?.signature === signature) return;
        history.push({ ...entry, signature, at: Date.now() });
        const limit = Math.max(4, CONFIG.humanMoveModel.historyPlies);
        if (history.length > limit) history.splice(0, history.length - limit);
      },
    };

    WeaknessProfile.init();
    RatingProfile.apply(settings.engineUI.strength);
    CONFIG.humanization.enabled = settings.engineUI.humanMode;
    CONFIG.engineUI = settings.engineUI;
    const cached = new Map();
    const confirmedMoves = new Set();
    function prepare(fen, extra = {}) {
      context = extra;
      const effective = Number.isFinite(extra.effectiveRating)
        ? Math.max(400, Math.min(3000, extra.effectiveRating))
        : settings.engineUI.strength;
      if (State.engineRuntime.effectiveStrength !== effective) {
        State.engineRuntime.effectiveStrength = effective;
        RatingProfile.apply(effective);
        CONFIG.humanization.enabled = settings.engineUI.humanMode;
        CONFIG.engineUI = settings.engineUI;
      }
      State.human.tiltActive = !!extra.tiltActive;
      State.lastFen = fen;
      State.playerColor = extra.playerColor || fen.split(" ")[1];
      State.moveCount = Math.max(
        0,
        (Number(fen.split(" ")[5]) || 1) * 2 -
          2 +
          (fen.split(" ")[1] === "b" ? 1 : 0),
      );
      if (Number.isFinite(extra.clockSeconds))
        State.clock.myTime = extra.clockSeconds;
      State.human.timeControl = null;
      TimeControlContext.refresh();
    }
    function searchPlan(fen, extra = {}) {
      prepare(fen, extra);
      const calibrated =
        settings.engineUI.humanMode && settings.engineUI.eloCalibration;
      const cal = HumanCalibration.forRating(ProfileEngine.effectiveStrength());
      let depth = ProfileEngine.depthFor(fen);
      if (!calibrated && settings.engineUI.depthMode === "auto")
        depth = Math.round(
          RatingProfile.profileFor(ProfileEngine.effectiveStrength()).depth,
        );
      return {
        depth,
        multiPV: Math.max(
          settings.engineUI.candidateMoves,
          calibrated ? cal.searchMultiPV : 1,
        ),
        strength: ProfileEngine.effectiveStrength(),
      };
    }
    function chooseMoves(fen, moves, extra = {}) {
      prepare(fen, extra);
      const legal = new Set(
        Game.getBoardGame()
          .getLegalMoves()
          .map((m) => m.from + m.to + (m.promotion || "")),
      );
      const sorted = moves
        .filter((m) =>
          legal.has(m.player?.join("") + (m.playerPromotion || "")),
        )
        .sort((a, b) => (a.ranking || 1) - (b.ranking || 1));
      if (!sorted.length) return { moves: [], choice: null };
      State.candidates = Object.fromEntries(
        sorted.map((m, i) => [
          i + 1,
          {
            move: m.player.join("") + (m.playerPromotion || ""),
            eval:
              m.mate != null
                ? { type: "mate", value: Number(m.mate) }
                : { type: "cp", value: Number(m.cp || 0) / 100 },
            pv: m.pv || [m.player.join("")],
            depth: m.depth || 0,
          },
        ]),
      );
      State.currentEval = State.candidates[1].eval;
      const best = State.candidates[1].move;
      let choice = cached.get(fen);
      if (!choice) {
        choice =
          settings.engineUI.humanMode && !settings.coach.enabled
            ? HumanMoveModel.choose(fen, best)
            : { move: best, isBest: true, reason: "engine", cpLoss: 0 };
        cached.set(fen, choice);
        if (cached.size > 64) cached.delete(cached.keys().next().value);
      }
      const selected =
        sorted.find(
          (m) => m.player.join("") + (m.playerPromotion || "") === choice.move,
        ) || sorted[0];
      if (
        selected.player.join("") + (selected.playerPromotion || "") !==
        choice.move
      )
        choice = {
          move: selected.player.join("") + (selected.playerPromotion || ""),
          isBest: true,
          reason: "candidate-fallback",
          cpLoss: 0,
        };
      const min = settings.automation.minDelayMs,
        max = settings.automation.maxDelayMs;
      const delay = settings.engineUI.humanMode
        ? HumanStrategy.calculateDelay(fen, choice, false)
        : min;
      const budget = settings.automation.clockAware
        ? TimeControlContext.maxSpendMs(fen)
        : max;
      choice = {
        ...choice,
        delayMs: Math.max(
          0,
          Math.min(budget, Math.max(min, Math.min(max, delay))),
        ),
      };
      const annotations = settings.annotations;
      if (
        annotations.enabled &&
        choice.delayMs >= annotations.minThinkMs &&
        choice.annotation === undefined
      )
        choice.annotation = Math.random() < annotations.chancePerLongThink;
      cached.set(fen, choice);
      return {
        moves: [selected, ...sorted.filter((m) => m !== selected)].map(
          (m, i) => ({
            ...m,
            chessinsperAnnotation:
              !!choice.annotation && i < annotations.maxPerThink,
          }),
        ),
        choice,
      };
    }
    return {
      settings,
      searchPlan,
      chooseMoves,
      recordMove: (entry) => {
        if (!entry?.move) return;
        const key = `${entry.fen}:${entry.move}`;
        if (confirmedMoves.has(key)) return;
        confirmedMoves.add(key);
        if (confirmedMoves.size > 128)
          confirmedMoves.delete(confirmedMoves.keys().next().value);
        HumanStrategy.trackMove(entry.isBest ?? entry.cpLoss === 0, entry);
      },
      presets: clone(ProfileEngine.presets),
      coachReport: (fen, moves) => {
        const ranked = [...moves].sort(
          (a, b) => (a.ranking || 1) - (b.ranking || 1),
        );
        const best = ranked[0];
        if (!best) return null;
        const uci = best.player.join("") + (best.playerPromotion || "");
        const feature = BoardIntelligence.moveFeatures(fen, uci);
        const notes = [
          feature.capture && "captura",
          feature.type === "k" &&
            Math.abs(uci.charCodeAt(0) - uci.charCodeAt(2)) === 2 &&
            "roque",
          uci.length === 5 && "promoção",
          feature.development && "desenvolvimento",
        ].filter(Boolean);
        return {
          move: uci,
          notes,
          alternatives: settings.coach.showAlternatives
            ? ranked
                .slice(1)
                .filter(
                  (m) =>
                    best.mate == null &&
                    m.mate == null &&
                    Number.isFinite(m.cp) &&
                    Math.abs(best.cp - m.cp) <=
                      settings.coach.altEvalWindow * 100,
                )
                .map((m) => m.player.join("") + (m.playerPromotion || ""))
                .slice(0, 3)
            : [],
          threat: settings.coach.showThreats ? best.pv?.[1] || null : null,
        };
      },
      diagnostics: () => ({
        ...clone(State.diagnostics.humanModel),
        weaknesses: clone(State.human.weaknesses),
        effectiveRating: ProfileEngine.effectiveStrength(),
        tiltActive: State.human.tiltActive,
      }),
    };
  }
  const api = {
    defaults: () => clone(DEFAULTS),
    normalizeSettings,
    behaviorSignature: (input) => {
      const { visualIntelligence, ...behavior } = normalizeSettings(input);
      return JSON.stringify(behavior);
    },
    createRuntime,
    analyze: (fen) => BoardIntelligence.analyze(fen),
    moveFeatures: (fen, move) => BoardIntelligence.moveFeatures(fen, move),
  };
  root.ChessinsperCore = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
