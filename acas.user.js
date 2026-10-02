// ==UserScript==
// @name        A.C.A.S × Chessinsper (ACASIOS)
// @name:en     A.C.A.S × Chessinsper (ACASIOS)
// @name:fi     A.C.A.S × Chessinsper (ACASIOS)
// @name:sw     A.C.A.S × Chessinsper (ACASIOS)
// @name:zh-CN  A.C.A.S × Chessinsper (ACASIOS)
// @name:es     A.C.A.S × Chessinsper (ACASIOS)
// @name:hi     A.C.A.S × Chessinsper (ACASIOS)
// @name:ar     A.C.A.S × Chessinsper (ACASIOS)
// @name:pt     A.C.A.S × Chessinsper (ACASIOS)
// @name:ja     A.C.A.S × Chessinsper (ACASIOS)
// @name:de     A.C.A.S × Chessinsper (ACASIOS)
// @name:fr     A.C.A.S × Chessinsper (ACASIOS)
// @name:it     A.C.A.S × Chessinsper (ACASIOS)
// @name:ko     A.C.A.S × Chessinsper (ACASIOS)
// @name:nl     A.C.A.S × Chessinsper (ACASIOS)
// @name:pl     A.C.A.S × Chessinsper (ACASIOS)
// @name:tr     A.C.A.S × Chessinsper (ACASIOS)
// @name:vi     A.C.A.S × Chessinsper (ACASIOS)
// @name:uk     A.C.A.S × Chessinsper (ACASIOS)
// @name:ru     A.C.A.S × Chessinsper (ACASIOS)
// @description        Enhance your chess performance with a cutting-edge real-time move analysis and strategy assistance system
// @description:en     Enhance your chess performance with a cutting-edge real-time move analysis and strategy assistance system
// @description:fi     Paranna shakkipelisi suorituskykyä huippuluokan reaaliaikaisen siirtoanalyysin ja strategisen avustusjärjestelmän avulla
// @description:sw     Förbättra dina schackprestationer med ett banbrytande rörelseanalys i realtid och strategiassistans
// @description:zh-CN  利用尖端实时走法分析和策略辅助系统，提升您的国际象棋水平
// @description:es     Mejora tu rendimiento en ajedrez con un sistema de análisis de movimientos en tiempo real y asistencia estratégica de vanguardia
// @description:hi     अपने शतरंज प्रदर्शन को उन्नत करें, एक कटिंग-एज रियल-टाइम मूव विश्लेषण और रणनीति सहायता प्रणाली के साथ
// @description:ar     قم بتحسين أداءك في الشطرنج مع تحليل حركات اللعب في الوقت الحقيقي ونظام مساعدة استراتيجية حديث
// @description:pt     Melhore seu desempenho no xadrez com uma análise de movimentos em tempo real e um sistema avançado de assistência estratégica
// @description:ja     最新のリアルタイムのムーブ分析と戦略支援システムでチェスのパフォーマンスを向上させましょう
// @description:de     Verbessern Sie Ihre Schachleistung mit einer hochmodernen Echtzeitzug-Analyse- und Strategiehilfe-System
// @description:fr     Améliorez vos performances aux échecs avec une analyse de mouvement en temps réel de pointe et un système d'assistance stratégique
// @description:it     Migliora le tue prestazioni agli scacchi con un sistema all'avanguardia di analisi dei movimenti in tempo reale e assistenza strategica
// @description:ko     최첨단 실시간 움직임 분석 및 전략 지원 시스템으로 체스 성과 향상
// @description:nl     Verbeter je schaakprestaties met een geavanceerd systeem voor realtime zetanalyse en strategische ondersteuning
// @description:pl     Popraw swoje osiągnięcia w szachach dzięki zaawansowanemu systemowi analizy ruchów w czasie rzeczywistym i wsparciu strategicznemu
// @description:tr     Keskinleşmiş gerçek zamanlı hareket analizi ve strateji yardım sistemiyle satranç performansınızı artırın
// @description:vi     Nâng cao hiệu suất cờ vua của bạn với hệ thống phân tích nước đi và hỗ trợ chiến thuật hiện đại
// @description:uk     Покращуйте свою шахову гру з використанням передової системи аналізу ходів в режимі реального часу та стратегічної підтримки
// @description:ru     Слава Украине
// @homepageURL https://guilhermelourencoismart-bot.github.io/ACASIOS
// @supportURL  https://github.com/guilhermelourencoismart-bot/ACASIOS
// @match       https://guilhermelourencoismart-bot.github.io/ACASIOS/*
// @match       http://localhost/*
// @match       https://www.chess.com/*
// @match       https://lichess.org/*
// @match       https://playstrategy.org/*
// @match       https://www.pychess.org/*
// @match       https://chess.org/*
// @match       https://papergames.io/*
// @match       https://chess.coolmathgames.com/*
// @match       https://www.coolmathgames.com/0-chess/*
// @match       https://immortal.game/*
// @match       https://worldchess.com/*
// @match       http://chess.net/*
// @match       https://chess.net/*
// @match       https://*.freechess.club/*
// @match       https://*.chessclub.com/*
// @match       https://gameknot.com/*
// @match       https://www.chessanytime.com/*
// @match       https://app.edchess.io/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       GM_openInTab
// @grant       GM.getValue
// @grant       GM.setValue
// @grant       GM.deleteValue
// @grant       GM.listValues
// @grant       GM.openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setClipboard
// @grant       GM_notification
// @grant       unsafeWindow
// @run-at      document-start
// @require     https://update.greasyfork.org/scripts/534637/LegacyGMjs.js?acasv=2
// @require     https://update.greasyfork.org/scripts/470418/CommLinkjs.js?acasv=2
// @require     https://update.greasyfork.org/scripts/470417/UniversalBoardDrawerjs.js?acasv=2
// @require     https://update.greasyfork.org/scripts/591079/1919285/AutomaticMove.js
// @icon        https://raw.githubusercontent.com/guilhermelourencoismart-bot/ACASIOS/main/assets/images/logo-192.png
// @version     2.5.0-chessinsper.3
// @namespace    A.C.A.S × Chessinsper (ACASIOS)
// @author      HKR
// @license     GPL-3.0
// ==/UserScript==

/*
     e            e88~-_            e           ,d88~~\
    d8b         d888    \          d8b          8888
   /Y88b        8888              /Y88b         `Y88b
  /  Y88b       8888             /  Y88b         `Y88b
 /____Y88b   d88b Y88   / d88b /____Y88b  d88b    8888
/      Y88b  Y88P "88Y-~   Y88P/      Y88b Y88P \__88P'
Advanced Chess Assistance System (A.C.A.S) v2 | Q3 2023

[WARNING]
- Please be advised that the use of A.C.A.S may violate the rules and lead to disqualification or banning from tournaments and online platforms.
- The developers of A.C.A.S and related systems will NOT be held accountable for any consequences resulting from its use.
- We strongly advise to use A.C.A.S only in a controlled environment ethically.

[ADDITIONAL]
- Big fonts created with: https://www.patorjk.com/software/taag/ (Tmplr)

DANGER ZONE - DO NOT PROCEED IF YOU DON'T KNOW WHAT YOU'RE DOING*\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////////////////////////////
DANGER ZONE - DO NOT PROCEED IF YOU DON'T KNOW WHAT YOU'RE DOING*/

const DynamicSettingsCore = (() => {
    const variables = Object.freeze({
        __proto__: null,
        pieceCount: Object.freeze({
            label: 'Piece Count',
            min: 0,
            max: 32,
            getValue: safeMethod(context => context?.pieceCount, () => null)
        }),
        moveNumber: Object.freeze({ label: 'Move Number', min: 1, max: 200,
            getValue: safeMethod(context => context?.moveNumber, () => null) }),
        evaluation: Object.freeze({ label: 'Evaluation (your advantage, cp)', min: -1000, max: 1000,
            getValue: safeMethod(context => context?.evaluation, () => null) })
    });

    // Accept data, not objects with custom coercion or values such as Symbols.
    function finiteNumber(value, fallback = null) {
        const type = typeof value;
        if(type !== 'number' && type !== 'string' && type !== 'boolean') return fallback;
        if(type === 'string' && !value.trim()) return fallback;
        const number = Number(value);
        return Number.isFinite(number) ? number : fallback;
    }

    function contextKey(instanceID) {
        return typeof instanceID === 'string' || typeof instanceID === 'number' && Number.isFinite(instanceID)
            ? String(instanceID) : null;
    }

    function baseFallback(baseValue) {
        return typeof baseValue === 'number' && Number.isFinite(baseValue) ? Math.round(baseValue) : baseValue;
    }

    // One boundary protects every public method, including hostile getters/proxies.
    // Fallbacks only inspect primitive types or create fresh, safe return values.
    function safeMethod(method, fallback) {
        return (...args) => {
            try { return method(...args); }
            catch(e) { return fallback(...args); }
        };
    }

    function getVariableValue(variable, context) {
        if(typeof variable !== 'string' || !Object.hasOwn(variables, variable)) return null;
        const definition = variables[variable];
        const value = finiteNumber(definition.getValue(context));
        if(value === null) return null;
        return variable === 'pieceCount' ? Math.max(definition.min, Math.min(definition.max, Math.round(value))) : Math.round(value);
    }

    function formatVariableValue(variable, value) {
        if(variable !== 'evaluation') {
            return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ? String(value) : '';
        }
        value = finiteNumber(value);
        if(value === null) return '';
        return value === 0 ? 'Equal (0 cp)' : `${value > 0 ? 'Winning' : 'Losing'} (${value > 0 ? '+' : ''}${value} cp)`;
    }

    function normalizePoints(points) {
        if(!Array.isArray(points)) return [];
        const byX = new Map();
        points.forEach(point => {
            if(!point || typeof point !== 'object') return;
            const x = finiteNumber(point.x);
            const y = finiteNumber(point.y);
            if(x !== null && y !== null) byX.set(Math.round(x), Math.round(y));
        });
        return [...byX].map(([x, y]) => ({ x, y })).sort((a, b) => a.x - b.x);
    }

    function normalizeCurve(curve, baseValue) {
        if(!curve || typeof curve !== 'object' || Array.isArray(curve)) return { points: [] };
        const boolean = typeof baseValue === 'boolean' || curve.boolean === true;
        const normalized = { ...curve, points: normalizePoints(curve.points) };
        if(curve.variable === 'pieceCount') {
            normalized.points = normalizePoints(normalized.points.map(point => ({ ...point,
                x: Math.max(variables.pieceCount.min, Math.min(variables.pieceCount.max, point.x)) })));
        }
        if(boolean) Object.assign(normalized, { boolean: true, interpolation: 'step', minY: 0, maxY: 1 });
        if(Array.isArray(curve.values)) {
            normalized.values = [...curve.values];
            Object.assign(normalized, { interpolation: 'step', minY: 0, maxY: Math.max(0, curve.values.length - 1) });
        }
        const minY = Math.ceil(finiteNumber(normalized.minY, -Infinity));
        const maxY = Math.floor(finiteNumber(normalized.maxY, Infinity));
        if(minY > maxY) return { ...normalized, points: [] };
        normalized.points.forEach(point => {
            point.y = Math.max(minY, Math.min(maxY, point.y));
        });
        return normalized;
    }

    function evaluateCurve(curve, variableValue) {
        if(!curve || typeof curve !== 'object' || Array.isArray(curve) || !curve.enabled) return null;
        const x = finiteNumber(variableValue);
        if(x === null) return null;
        curve = normalizeCurve(curve);
        const points = curve.points;
        if(!points.length) return null;
        const last = points[points.length - 1];
        if(curve.outsideRange === 'default' && (x < points[0].x || x > last.x)) return null;
        if(x <= points[0].x) return points[0].y;
        if(x >= last.x) return last.y;

        const rightIndex = points.findIndex(point => point.x >= x);
        const left = points[rightIndex - 1];
        const right = points[rightIndex];
        if(!left || !right) return null;
        // A step changes at the point itself, not just after its X coordinate.
        if(x === right.x) return right.y;
        const width = right.x - left.x;
        if(width <= 0 || curve.interpolation === 'step') return left.y;

        const t = (x - left.x) / width;
        if(curve.interpolation === 'smooth') {
            const slopes = points.slice(0, -1).map((point, index) =>
                (points[index + 1].y - point.y) / (points[index + 1].x - point.x)
            );
            const tangent = index => {
                if(index === 0 || index === points.length - 1) return 0;
                const before = slopes[index - 1];
                const after = slopes[index];
                if(before === 0 || after === 0 || Math.sign(before) !== Math.sign(after)) return 0;
                const beforeWidth = points[index].x - points[index - 1].x;
                const afterWidth = points[index + 1].x - points[index].x;
                const w1 = 2 * afterWidth + beforeWidth;
                const w2 = afterWidth + 2 * beforeWidth;
                return (w1 + w2) / (w1 / before + w2 / after);
            };
            const m0 = tangent(rightIndex - 1) * width;
            const m1 = tangent(rightIndex) * width;
            const t2 = t * t;
            const t3 = t2 * t;
            return finiteNumber((2 * t3 - 3 * t2 + 1) * left.y
                + (t3 - 2 * t2 + t) * m0
                + (-2 * t3 + 3 * t2) * right.y
                + (t3 - t2) * m1);
        }

        return finiteNumber(left.y + (right.y - left.y) * t);
    }

    function coerceSettingValue(value, baseValue, curve) {
        if(Array.isArray(curve.values)) {
            const choice = curve.values[Math.round(value)];
            return typeof choice === typeof baseValue && (typeof choice === 'string' || typeof choice === 'boolean'
                || typeof choice === 'number' && Number.isFinite(choice)) ? choice : baseValue;
        }
        if(typeof baseValue === 'boolean') return Number(value) >= 0.5;
        if(typeof baseValue === 'number') {
            const numericValue = finiteNumber(value);
            if(numericValue === null) return baseValue;
            const bounded = Math.max(
                finiteNumber(curve.minY, -Infinity),
                Math.min(finiteNumber(curve.maxY, Infinity), numericValue)
            );
            const rounded = Math.round(bounded);
            return Number.isFinite(rounded) ? rounded : baseValue;
        }
        return baseValue;
    }

    function resolveValue(baseValue, curve, context) {
        // Ordinary settings without a graph keep their existing value/type semantics.
        if(!curve || typeof curve !== 'object' || Array.isArray(curve)) return baseValue;
        const fallback = baseFallback(baseValue);
        if(baseValue === undefined || !curve.enabled) return fallback;
        if(curve.resetAtStart && (finiteNumber(context?.gameStart, 0) !== 0 || finiteNumber(context?.moveNumber) === 1)) return fallback;
        curve = normalizeCurve(curve, baseValue);
        const variableValue = getVariableValue(curve.variable, context);
        const result = evaluateCurve(curve, variableValue);
        if(result === null) return fallback;
        return coerceSettingValue(result, fallback, curve);
    }

    function getContextFromFen(fen) {
        if(typeof fen !== 'string' || !fen.trim()) return {};
        const fields = fen.trim().split(/\s+/);
        return {
            pieceCount: (fields[0].match(/[rnbqkpRNBQKP]/g) ?? []).length,
            moveNumber: Math.max(1, Math.round(finiteNumber(fields[5], 1))),
            gameStart: 0
        };
    }

    const contexts = new Map();
    const defaultContext = Object.create(null);

    function setContext(instanceID, context) {
        if(!context || typeof context !== 'object' || Array.isArray(context)) return;
        const instanceKey = contextKey(instanceID);
        if(instanceID != null && instanceKey === null) return;
        // Validate the entire update before committing it, so a getter failure
        // cannot leave a previously valid instance context partially changed.
        const target = Object.assign(Object.create(null), instanceID == null ? defaultContext : contexts.get(instanceKey));
        Object.entries(context ?? {}).forEach(([key, value]) => {
            if(!Object.hasOwn(variables, key) && key !== 'gameStart') return;
            if(value === undefined) return;
            const number = finiteNumber(value);
            if(number === null) {
                delete target[key];
                return;
            }
            target[key] = number;
        });
        if(instanceID != null) contexts.set(instanceKey, target);
        else {
            Object.keys(defaultContext).forEach(key => delete defaultContext[key]);
            Object.assign(defaultContext, target);
        }
    }

    function getContext(instanceID) {
        return { ...defaultContext, ...(instanceID == null ? {} : contexts.get(contextKey(instanceID))) };
    }

    function removeContext(instanceID) {
        const instanceKey = contextKey(instanceID);
        if(instanceKey !== null) contexts.delete(instanceKey);
    }

    function getContexts() {
        return [...contexts].map(([instanceID, context]) => ({ instanceID, context: { ...defaultContext, ...context } }));
    }

    return Object.freeze({
        variables,
        getVariableValue: safeMethod(getVariableValue, () => null),
        formatVariableValue: safeMethod(formatVariableValue, () => ''),
        normalizePoints: safeMethod(normalizePoints, () => []),
        normalizeCurve: safeMethod(normalizeCurve, () => ({ points: [] })),
        evaluateCurve: safeMethod(evaluateCurve, () => null),
        resolveValue: safeMethod(resolveValue, baseFallback),
        getContextFromFen: safeMethod(getContextFromFen, () => ({})),
        setContext: safeMethod(setContext, () => undefined),
        getContext: safeMethod(getContext, () => ({})),
        getContexts: safeMethod(getContexts, () => []),
        removeContext: safeMethod(removeContext, () => undefined)
    });
})();

// BEGIN CHESSINSPER BUNDLE
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

/* Chessinsper move input adapted from Chessrinsper 1.2.1-rc.1 (MIT).
 * Uses the existing A.C.A.S board adapter. No overlay, engine or polling loop is added.
 * Original author: Chessrinsper. MIT permission notice is in ChessinsperCore.js.
 */
(function (root) {
  "use strict";
  const boardKey = (fen) => String(fen || "").split(" ")[0];
  function expectedBoard(fen, move) {
    const rows = boardKey(fen)
      .split("/")
      .map((row) =>
        [...row].flatMap((c) =>
          /^[1-8]$/.test(c) ? Array(Number(c)).fill(null) : [c],
        ),
      );
    if (
      rows.length !== 8 ||
      rows.some((r) => r.length !== 8) ||
      !/^([a-h][1-8]){2}[qrbn]?$/.test(move || "")
    )
      return null;
    const coord = (s) => [8 - Number(s[1]), s.charCodeAt(0) - 97],
      [fr, fc] = coord(move.slice(0, 2)),
      [tr, tc] = coord(move.slice(2, 4));
    let piece = rows[fr][fc];
    if (!piece) return null;
    const white = piece === piece.toUpperCase();
    if ((fen.split(" ")[1] === "w") !== white) return null;
    if (piece.toLowerCase() === "p" && fc !== tc && !rows[tr][tc])
      rows[fr][tc] = null;
    rows[fr][fc] = null;
    if (move[4]) piece = white ? move[4].toUpperCase() : move[4];
    rows[tr][tc] = piece;
    if (piece.toLowerCase() === "k" && Math.abs(tc - fc) === 2) {
      const rook = tc > fc ? 7 : 0;
      rows[tr][tc > fc ? tc - 1 : tc + 1] = rows[tr][rook];
      rows[tr][rook] = null;
    }
    return rows
      .map((row) => {
        let text = "",
          empty = 0;
        for (const p of row) {
          if (!p) empty++;
          else {
            if (empty) {
              text += empty;
              empty = 0;
            }
            text += p;
          }
        }
        return text + (empty || "");
      })
      .join("/");
  }
  function create(adapter) {
    let active = null;
    const handled = new Set();
    const State = {
      playerColor: "w",
      human: { lastMouseX: null, lastMouseY: null },
    };
    let CONFIG = {
      dragSpeed: 1,
      antiDetection: { changeOfMind: { enabled: false } },
    };
    const Game = {
      getBoard: () => adapter.getBoard(),
      squareToCoords: (s) => s.charCodeAt(0) - 96 + s[1],
    };
    const Account = {
      currentPersona: () =>
        ({
          mouse: {
            jitterScale: 1,
            clickHoldMs: { min: 50, max: 110 },
            speedScale: 1,
          },
          trackpad: {
            jitterScale: 1.45,
            clickHoldMs: { min: 70, max: 150 },
            speedScale: 0.85,
          },
          tablet: {
            jitterScale: 1.2,
            clickHoldMs: { min: 90, max: 180 },
            speedScale: 0.95,
          },
        })[adapter.persona?.(active?.profile)] || null,
    };
    const UI = { toast: () => {} };
    const Utils = {
      randomRange: (a, b) => a + Math.random() * (b - a),
      gaussianRandom: (m = 0, s = 1) =>
        m +
        Math.sqrt(-2 * Math.log(Math.max(Number.EPSILON, Math.random()))) *
          Math.cos(2 * Math.PI * Math.random()) *
          s,
      humanDelay: (a, b) => a + Math.random() * (b - a),
      log: () => {},
      sleep: async (ms) => {
        await new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
        if (
          active &&
          (active.cancelled ||
            Date.now() > active.deadline ||
            !adapter.enabled(active.profile, active.settings))
        )
          throw new Error("input-cancelled");
      },
    };
    const Humanizer = {
      showClick: () => {},
      createEvent: (type, x, y, options = {}) => {
        const defaults = {
          bubbles: true,
          cancelable: true,
          view: window,
          detail: 1,
          screenX: x,
          screenY: y,
          clientX: x,
          clientY: y,
          pointerId: 1,
          pointerType: "mouse",
          isPrimary: true,
          button: 0,
          buttons: 1,
          which: 1,
          composed: true,
        };
        return new PointerEvent(type, { ...defaults, ...options });
      },
      dragDrop: async (fromSq, toSq) => {
        const board = Game.getBoard();
        if (!board) return false;
        const startPos = Humanizer.getCoords(fromSq);
        const endPos = Humanizer.getCoords(toSq);
        if (!startPos || !endPos) return false;

        // Hardware persona shapes the drag character:
        //   trackpad -> slower, noisier, longer click-hold
        //   mouse    -> baseline
        //   tablet   -> medium noise, slow click-hold
        const persona = Account.currentPersona() || {
          jitterScale: 1,
          clickHoldMs: { min: 50, max: 110 },
          speedScale: 1,
        };
        const jScale = persona.jitterScale;

        Humanizer.showClick(startPos.x, startPos.y, "#00ff00");
        const fromCoords = Game.squareToCoords(fromSq);
        const pieceEl =
          board.querySelector(`.piece.square-${fromCoords}`) ||
          document.elementFromPoint(startPos.x, startPos.y);
        const targetSource = pieceEl || board;
        const opts = {
          bubbles: true,
          composed: true,
          buttons: 1,
          pointerId: 1,
          isPrimary: true,
        };

        const pickupNoise = () => Utils.gaussianRandom(0, 2 * jScale);
        const sx = startPos.x + pickupNoise();
        const sy = startPos.y + pickupNoise();

        // pointerType advertises what device the "user" is on. Trackpads still
        // register as 'mouse' in browser API but some sites sniff this; we keep
        // it as 'mouse' for all personas (trackpad is a mouse device to the DOM).
        const realisticPointerProps = (x, y, prevX, prevY) => ({
          width: 1,
          height: 1,
          pressure: 0.5 + Math.random() * 0.25,
          tangentialPressure: 0,
          tiltX: Math.round(Utils.gaussianRandom(0, 3 * jScale)),
          tiltY: Math.round(Utils.gaussianRandom(0, 3 * jScale)),
          twist: 0,
          pointerType: "mouse",
          movementX: prevX != null ? Math.round(x - prevX) : 0,
          movementY: prevY != null ? Math.round(y - prevY) : 0,
        });

        targetSource.dispatchEvent(
          new PointerEvent("pointerover", {
            ...opts,
            ...realisticPointerProps(sx, sy),
            clientX: sx,
            clientY: sy,
          }),
        );
        targetSource.dispatchEvent(
          new PointerEvent("pointerdown", {
            ...opts,
            ...realisticPointerProps(sx, sy),
            clientX: sx,
            clientY: sy,
          }),
        );
        targetSource.dispatchEvent(
          new MouseEvent("mousedown", { ...opts, clientX: sx, clientY: sy }),
        );

        // Click-hold time is persona-specific (trackpad/tablet hold longer).
        const spd = (CONFIG.dragSpeed || 1.0) / persona.speedScale;
        const clickHold = Utils.randomRange(
          persona.clickHoldMs.min,
          persona.clickHoldMs.max,
        );
        await Utils.sleep(clickHold);

        // Helper: run a noisy human-like drag path between two points.
        // IMPORTANT: we dispatch pointermove to the SAME element that received
        // pointerdown (`targetSource`) whenever possible. This preserves the
        // implicit pointer-capture contract Chess.com's drag handler expects.
        // Dispatching to `document` breaks that contract and leaves a detectable
        // gap in the pointer event target chain.
        const bezierPath = async (from, to, stepCount, speedMult = 1) => {
          const pdx = to.x - from.x,
            pdy = to.y - from.y;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pDist < 1) return;

          // Multiple random control points for a wobbly spline, not a clean curve
          const perpX = -pdy / pDist,
            perpY = pdx / pDist;
          const cp1t = 0.25 + Math.random() * 0.15;
          const cp2t = 0.55 + Math.random() * 0.15;
          const wobble1 = Utils.gaussianRandom(0, pDist * 0.18 * jScale);
          const wobble2 = Utils.gaussianRandom(0, pDist * 0.14 * jScale);
          const cp1 = {
            x: from.x + pdx * cp1t + perpX * wobble1,
            y: from.y + pdy * cp1t + perpY * wobble1,
          };
          const cp2 = {
            x: from.x + pdx * cp2t + perpX * wobble2,
            y: from.y + pdy * cp2t + perpY * wobble2,
          };

          // Cubic bezier eval
          const cubicBez = (a, b, c, d, t) => {
            const omt = 1 - t;
            return (
              omt * omt * omt * a +
              3 * omt * omt * t * b +
              3 * omt * t * t * c +
              t * t * t * d
            );
          };

          // Wobble state that drifts smoothly (fake Perlin)
          let wobX = 0,
            wobY = 0;
          const wobDrift = () => {
            wobX += Utils.gaussianRandom(0, 1.2 * jScale);
            wobY += Utils.gaussianRandom(0, 1.2 * jScale);
            wobX *= 0.7;
            wobY *= 0.7; // dampen so it doesn't run away
          };

          const totalSteps = Math.max(stepCount, Math.round(pDist / 6));
          let lastPauseAt = 0;

          for (let i = 1; i <= totalSteps; i++) {
            const t = i / totalSteps;

            // Base position from cubic bezier
            let cx_ = cubicBez(from.x, cp1.x, cp2.x, to.x, t);
            let cy_ = cubicBez(from.y, cp1.y, cp2.y, to.y, t);

            // Perpendicular wobble — stronger in the middle, fades at endpoints
            wobDrift();
            const wobbleEnvelope = Math.sin(t * Math.PI) * 1.5;
            cx_ += wobX * wobbleEnvelope;
            cy_ += wobY * wobbleEnvelope;

            // Random high-freq noise (hand tremor)
            const tremor =
              Math.max(0.3, (1 - t) * 2.5 + Math.sin(t * 12) * 0.5) * jScale;
            cx_ += Utils.gaussianRandom(0, tremor);
            cy_ += Utils.gaussianRandom(0, tremor);

            const rpp = realisticPointerProps(cx_, cy_, prevMoveX, prevMoveY);
            targetSource.dispatchEvent(
              new PointerEvent("pointermove", {
                ...opts,
                ...rpp,
                clientX: cx_,
                clientY: cy_,
              }),
            );
            targetSource.dispatchEvent(
              new MouseEvent("mousemove", {
                ...opts,
                clientX: cx_,
                clientY: cy_,
                movementX: rpp.movementX,
                movementY: rpp.movementY,
              }),
            );
            prevMoveX = cx_;
            prevMoveY = cy_;

            // Speed: slow start, fast middle, slow end (bell curve)
            const bell = Math.sin(t * Math.PI);
            const baseDelay = Utils.randomRange(6, 18) * (1.4 - bell * 0.9);
            const delay = Math.max(3, Math.round(baseDelay * speedMult * spd));

            // Most steps get a delay, but vary the chance
            if (Math.random() < 0.7) await Utils.sleep(delay);

            // Occasional micro-pause (human recalculating / hand jitter)
            if (
              t > 0.15 &&
              t < 0.85 &&
              t - lastPauseAt > 0.2 &&
              Math.random() < 0.08
            ) {
              await Utils.sleep(Utils.randomRange(30, 80) * spd);
              lastPauseAt = t;
            }
          }
        };

        const dx = endPos.x - startPos.x;
        const dy = endPos.y - startPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const sqSize = board.getBoundingClientRect().width / 8;
        let prevMoveX = sx,
          prevMoveY = sy;

        // --- CHANGE-OF-MIND FAKE-OUT ---
        const com = CONFIG.antiDetection.changeOfMind;
        const doFakeout =
          com.enabled && Math.random() < com.chance && dist > sqSize * 1.2;

        if (doFakeout) {
          // Pick a fake target: a square adjacent to the real target but NOT the real target
          const offsets = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [1, 1],
            [-1, 1],
            [1, -1],
          ];
          const realFile = endPos.x,
            realRank = endPos.y;
          const pick = offsets[Math.floor(Math.random() * offsets.length)];
          const fakeX = endPos.x + pick[0] * sqSize;
          const fakeY = endPos.y + pick[1] * sqSize;
          // Clamp to board bounds
          const bRect = board.getBoundingClientRect();
          const clampX = Math.max(
            bRect.left + sqSize * 0.5,
            Math.min(bRect.right - sqSize * 0.5, fakeX),
          );
          const clampY = Math.max(
            bRect.top + sqSize * 0.5,
            Math.min(bRect.bottom - sqSize * 0.5, fakeY),
          );
          const fakePos = { x: clampX, y: clampY };

          // Phase 1: drag toward the fake square (go ~75-90% of the way)
          const fakeSteps = Math.max(6, Math.min(14, Math.round(dist / 10)));
          const approach = 0.75 + Math.random() * 0.15;
          const nearFake = {
            x: startPos.x + (fakePos.x - startPos.x) * approach,
            y: startPos.y + (fakePos.y - startPos.y) * approach,
          };
          await bezierPath(startPos, nearFake, fakeSteps, 1.0);

          // Phase 2: slow down near the fake square (decelerating micro-movements)
          const slowSteps = Math.round(Utils.randomRange(2, 5));
          for (let i = 0; i < slowSteps; i++) {
            const driftX = prevMoveX + Utils.gaussianRandom(0, 3);
            const driftY = prevMoveY + Utils.gaussianRandom(0, 3);
            const rpp = realisticPointerProps(
              driftX,
              driftY,
              prevMoveX,
              prevMoveY,
            );
            targetSource.dispatchEvent(
              new PointerEvent("pointermove", {
                ...opts,
                ...rpp,
                clientX: driftX,
                clientY: driftY,
              }),
            );
            targetSource.dispatchEvent(
              new MouseEvent("mousemove", {
                ...opts,
                clientX: driftX,
                clientY: driftY,
                movementX: rpp.movementX,
                movementY: rpp.movementY,
              }),
            );
            prevMoveX = driftX;
            prevMoveY = driftY;
            await Utils.sleep(Utils.randomRange(25, 60));
          }

          // Phase 3: hesitate — hold still
          const hesitate = Utils.humanDelay(
            com.hesitateMs.min,
            com.hesitateMs.max,
          );
          Utils.log(
            `Change-of-mind: faked toward (${pick[0]},${pick[1]}), hesitating ${Math.round(hesitate)}ms`,
            "debug",
          );
          UI.toast(
            "Fake-Out",
            `Changed mind mid-drag — redirecting to real target`,
            "fakeout",
            2500,
          );
          await Utils.sleep(hesitate);

          // Phase 4: redirect to real target (slightly faster, more decisive)
          const redirectSteps = Math.max(
            6,
            Math.min(12, Math.round(dist / 12)),
          );
          await bezierPath(
            { x: prevMoveX, y: prevMoveY },
            endPos,
            redirectSteps,
            0.7,
          );
        } else {
          // Normal drag path
          const steps = Math.max(
            8,
            Math.min(18, Math.round(dist / 8) + Math.round(Math.random() * 4)),
          );
          await bezierPath(startPos, endPos, steps, 1.0);
        }

        // Overshoot + settle — common in real mouse movement
        if (Math.random() < 0.35) {
          const ovMag = Utils.randomRange(3, 10);
          const ovAngle = Math.random() * Math.PI * 2;
          const ovX = endPos.x + Math.cos(ovAngle) * ovMag;
          const ovY = endPos.y + Math.sin(ovAngle) * ovMag;
          const rpp1 = realisticPointerProps(ovX, ovY, prevMoveX, prevMoveY);
          targetSource.dispatchEvent(
            new PointerEvent("pointermove", {
              ...opts,
              ...rpp1,
              clientX: ovX,
              clientY: ovY,
            }),
          );
          prevMoveX = ovX;
          prevMoveY = ovY;
          await Utils.sleep(Utils.randomRange(10, 30) * spd);
          // Correct back with a small wobble
          const settleX = endPos.x + Utils.gaussianRandom(0, 1.5);
          const settleY = endPos.y + Utils.gaussianRandom(0, 1.5);
          const rpp2 = realisticPointerProps(
            settleX,
            settleY,
            prevMoveX,
            prevMoveY,
          );
          targetSource.dispatchEvent(
            new PointerEvent("pointermove", {
              ...opts,
              ...rpp2,
              clientX: settleX,
              clientY: settleY,
            }),
          );
          prevMoveX = settleX;
          prevMoveY = settleY;
          await Utils.sleep(Utils.randomRange(8, 20) * spd);
          // Final settle on target
          const rpp3 = realisticPointerProps(
            endPos.x,
            endPos.y,
            prevMoveX,
            prevMoveY,
          );
          targetSource.dispatchEvent(
            new PointerEvent("pointermove", {
              ...opts,
              ...rpp3,
              clientX: endPos.x,
              clientY: endPos.y,
            }),
          );
          await Utils.sleep(Utils.randomRange(5, 15) * spd);
        }

        const toCoords = Game.squareToCoords(toSq);
        const targetEl =
          board.querySelector(`.square-${toCoords}`) ||
          document.elementFromPoint(endPos.x, endPos.y);
        const dropTarget = targetEl || board;

        const dropX = endPos.x + Utils.gaussianRandom(0, 1.5);
        const dropY = endPos.y + Utils.gaussianRandom(0, 1.5);
        Humanizer.showClick(endPos.x, endPos.y, "red");

        dropTarget.dispatchEvent(
          new PointerEvent("pointerup", {
            ...opts,
            clientX: dropX,
            clientY: dropY,
          }),
        );
        dropTarget.dispatchEvent(
          new MouseEvent("mouseup", {
            ...opts,
            clientX: dropX,
            clientY: dropY,
          }),
        );
        dropTarget.dispatchEvent(
          new PointerEvent("click", {
            ...opts,
            clientX: dropX,
            clientY: dropY,
          }),
        );

        // (T3 / B10) Save real mouse position so IdleBehavior can drift from here
        State.human.lastMouseX = dropX;
        State.human.lastMouseY = dropY;
        return true;
      },
      clickSquare: async (square, pointerId = 1) => {
        const board = Game.getBoard();
        const pos = Humanizer.getCoords(square);
        if (!board || !pos) return false;
        const coords = Game.squareToCoords(square);
        const target =
          board.querySelector(`.piece.square-${coords}`) ||
          board.querySelector(`.square-${coords}`) ||
          document.elementFromPoint(pos.x, pos.y) ||
          board;
        const x = pos.x + Utils.gaussianRandom(0, 2.2);
        const y = pos.y + Utils.gaussianRandom(0, 2.2);
        const base = {
          bubbles: true,
          cancelable: true,
          composed: true,
          view: window,
          clientX: x,
          clientY: y,
          screenX: x,
          screenY: y,
          button: 0,
          pointerId,
          pointerType: "mouse",
          isPrimary: true,
        };
        target.dispatchEvent(
          new PointerEvent("pointerover", { ...base, buttons: 0, pressure: 0 }),
        );
        target.dispatchEvent(
          new MouseEvent("mouseover", { ...base, buttons: 0 }),
        );
        await Utils.sleep(Utils.randomRange(18, 55));
        target.dispatchEvent(
          new PointerEvent("pointerdown", {
            ...base,
            buttons: 1,
            pressure: 0.5,
          }),
        );
        target.dispatchEvent(
          new MouseEvent("mousedown", { ...base, buttons: 1 }),
        );
        await Utils.sleep(Utils.randomRange(45, 125));
        target.dispatchEvent(
          new PointerEvent("pointerup", { ...base, buttons: 0, pressure: 0 }),
        );
        target.dispatchEvent(
          new MouseEvent("mouseup", { ...base, buttons: 0 }),
        );
        target.dispatchEvent(
          new MouseEvent("click", { ...base, buttons: 0, detail: 1 }),
        );
        Humanizer.showClick(x, y, "#4caf50");
        State.human.lastMouseX = x;
        State.human.lastMouseY = y;
        return true;
      },
      clickMove: async (fromSq, toSq) => {
        if (!(await Humanizer.clickSquare(fromSq, 3))) return false;
        await Utils.sleep(Utils.randomRange(90, 260));
        return Humanizer.clickSquare(toSq, 4);
      },
      handlePromotion: async (promo = "q") => {
        const pieceMap = { q: "queen", r: "rook", b: "bishop", n: "knight" };
        const pieceName = pieceMap[promo] || "queen";
        Utils.log(`Promotion: selecting ${pieceName}`);

        let promoEl = null;
        for (let i = 0; i < 20; i++) {
          await Utils.sleep(100);
          const selectors = [
            `.promotion-piece[data-piece="${promo}"]`,
            `.promotion-piece.w${promo}, .promotion-piece.b${promo}`,
            `[class*="promotion"] [class*="${pieceName}"]`,
            `#promotion-choice piece.${pieceName}`,
          ];
          for (const sel of selectors) {
            promoEl = document.querySelector(sel);
            if (promoEl) break;
          }
          if (!promoEl) {
            const promoContainer = document.querySelector(
              '#promotion-choice, .promotion-window, .promotion-area, [class*="promotion-"]',
            );
            if (promoContainer) {
              const pieces = promoContainer.querySelectorAll(
                '.promotion-piece, piece, [class*="piece"]',
              );
              if (pieces.length > 0) {
                promoEl =
                  promo === "q"
                    ? pieces[0]
                    : pieces[{ r: 1, b: 2, n: 3 }[promo] || 0];
              }
            }
          }
          if (promoEl) break;
        }

        if (promoEl) {
          // Pick a slightly off-center hit point so chess.com's input stream
          // sees a non-perfect tap (real fingers/mice never hit dead-center).
          const rect = promoEl.getBoundingClientRect();
          const jitter = (mag) => (Math.random() * 2 - 1) * mag;
          const x = rect.left + rect.width / 2 + jitter(rect.width * 0.15);
          const y = rect.top + rect.height / 2 + jitter(rect.height * 0.15);
          const opts = {
            bubbles: true,
            cancelable: true,
            composed: true,
            buttons: 1,
            button: 0,
            pointerId: 2,
            pointerType: "mouse",
            isPrimary: true,
            pressure: 0.5,
            view: window,
          };
          // Full natural sequence: pointerover -> pointerenter -> pointerdown
          // -> mousedown -> (small hold) -> pointerup -> mouseup -> click.
          // No raw .click() — it produces an untrusted synthetic event with no
          // associated pointerdown/up history, which Chess.com's input audit
          // can flag as scripted.
          promoEl.dispatchEvent(
            new PointerEvent("pointerover", {
              ...opts,
              clientX: x,
              clientY: y,
              buttons: 0,
            }),
          );
          promoEl.dispatchEvent(
            new PointerEvent("pointerenter", {
              ...opts,
              clientX: x,
              clientY: y,
              buttons: 0,
            }),
          );
          promoEl.dispatchEvent(
            new MouseEvent("mouseover", {
              ...opts,
              clientX: x,
              clientY: y,
              buttons: 0,
            }),
          );
          promoEl.dispatchEvent(
            new MouseEvent("mouseenter", {
              ...opts,
              clientX: x,
              clientY: y,
              buttons: 0,
            }),
          );
          await Utils.sleep(Utils.randomRange(20, 60));
          promoEl.dispatchEvent(
            new PointerEvent("pointerdown", {
              ...opts,
              clientX: x,
              clientY: y,
            }),
          );
          promoEl.dispatchEvent(
            new MouseEvent("mousedown", { ...opts, clientX: x, clientY: y }),
          );
          await Utils.sleep(Utils.randomRange(40, 110));
          promoEl.dispatchEvent(
            new PointerEvent("pointerup", {
              ...opts,
              clientX: x,
              clientY: y,
              buttons: 0,
            }),
          );
          promoEl.dispatchEvent(
            new MouseEvent("mouseup", {
              ...opts,
              clientX: x,
              clientY: y,
              buttons: 0,
            }),
          );
          promoEl.dispatchEvent(
            new MouseEvent("click", {
              ...opts,
              clientX: x,
              clientY: y,
              buttons: 0,
            }),
          );
          Utils.log(`Promotion: clicked ${pieceName}`);
        } else {
          Utils.log(
            "Promotion dialog not found - default queen will be used",
            "warn",
          );
        }
      },
      getCoords: (sq) => {
        const board = Game.getBoard();
        if (!board) return null;
        const rect = board.getBoundingClientRect();
        const sqSize = rect.width / 8;
        const isFlipped = State.playerColor === "b";
        const f = sq.charCodeAt(0) - 97;
        const r = parseInt(sq[1]) - 1;
        const x = rect.left + (isFlipped ? 7 - f : f) * sqSize + sqSize / 2;
        const y = rect.top + (isFlipped ? r : 7 - r) * sqSize + sqSize / 2;
        return { x, y };
      },
    };
    function release() {
      const board = adapter.getBoard();
      if (board) {
        const r = board.getBoundingClientRect();
        board.dispatchEvent(
          new PointerEvent("pointerup", {
            bubbles: true,
            clientX: r.x + r.width / 2,
            clientY: r.y + r.height / 2,
            buttons: 0,
          }),
        );
        board.dispatchEvent(
          new MouseEvent("mouseup", { bubbles: true, buttons: 0 }),
        );
      }
    }
    function valid(transaction) {
      const currentFen = adapter.getFen();
      return (
        !transaction.cancelled &&
        adapter.enabled(transaction.profile, transaction.settings) &&
        boardKey(currentFen) === transaction.before &&
        String(currentFen).split(" ")[1] === transaction.turn &&
        adapter.getBoard()?.isConnected !== false
      );
    }
    async function run(packet) {
      const settings = ChessinsperCore.normalizeSettings(packet.settings),
        before = boardKey(packet.fen),
        expected = expectedBoard(packet.fen, packet.move);
      if (
        !expected ||
        !adapter.enabled(packet.profile, settings) ||
        boardKey(adapter.getFen()) !== before ||
        String(adapter.getFen()).split(" ")[1] !== packet.fen.split(" ")[1] ||
        (adapter.getOrientation() &&
          adapter.getOrientation() !== packet.fen.split(" ")[1])
      )
        return { status: "stale" };
      const key = before + "|" + packet.profile;
      if (active) return { status: "busy" };
      if (handled.has(key)) return { status: "duplicate" };
      handled.add(key);
      if (handled.size > 128) handled.delete(handled.values().next().value);
      const transaction = {
        profile: packet.profile,
        settings,
        before,
        turn: packet.fen.split(" ")[1],
        cancelled: false,
        deadline:
          Date.now() +
          Math.max(0, packet.delayMs || 0) +
          settings.inputExecution.watchdogMs,
      };
      active = transaction;
      State.playerColor = adapter.getOrientation() || packet.fen.split(" ")[1];
      CONFIG.dragSpeed = settings.dragSpeed || 1;
      try {
        const until =
          Date.now() +
          Math.max(0, Math.min(60000, Number(packet.delayMs) || 0));
        while (Date.now() < until) {
          if (!valid(transaction)) return { status: "stale" };
          await Utils.sleep(Math.min(50, until - Date.now()));
        }
        for (
          let attempt = 0;
          attempt < settings.inputExecution.maxAttempts;
          attempt++
        ) {
          if (!valid(transaction)) return { status: "stale" };
          const selected = settings.automation.method;
          const method =
            selected === "mixed"
              ? attempt % 2 === 0
                ? "click"
                : "drag"
              : attempt === 0
                ? selected
                : selected === "click"
                  ? "drag"
                  : "click";
          if (method === "click")
            await Humanizer.clickMove(
              packet.move.slice(0, 2),
              packet.move.slice(2, 4),
            );
          else
            await Humanizer.dragDrop(
              packet.move.slice(0, 2),
              packet.move.slice(2, 4),
            );
          if (packet.move[4]) await Humanizer.handlePromotion(packet.move[4]);
          const end =
            Date.now() + settings.inputExecution.confirmationTimeoutMs;
          let stable = 0;
          while (Date.now() < end) {
            const now = boardKey(adapter.getFen());
            if (now === expected) {
              stable++;
              if (stable >= settings.inputExecution.stableReads) {
                adapter.onConfirmed?.(packet);
                return {
                  status: "confirmed",
                  move: packet.move,
                  attempt: attempt + 1,
                };
              }
            } else {
              stable = 0;
            }
            await Utils.sleep(settings.inputExecution.pollMs);
          }
          if (boardKey(adapter.getFen()) !== before)
            return { status: "superseded" };
          release();
        }
        return { status: "failed" };
      } catch (error) {
        return {
          status:
            transaction.cancelled ||
            !adapter.enabled(transaction.profile, transaction.settings)
              ? "cancelled"
              : "failed",
          reason: error.message,
        };
      } finally {
        release();
        active = null;
      }
    }
    return {
      run,
      cancel: () => {
        if (active) active.cancelled = true;
      },
      reset: () => {
        if (active) active.cancelled = true;
        handled.clear();
      },
      isActive: () => !!active,
    };
  }
  const api = { create, expectedBoard };
  root.ChessinsperAutomation = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

/* Chessinsper session and browser lifecycle policies adapted from Chessrinsper 1.2.1-rc.1 (MIT).
 * Original author: Chessrinsper. MIT permission notice is in ChessinsperCore.js.
 * Engines and drawing belong to A.C.A.S.
 */
(function (root) {
  "use strict";
  const copy = (value) => JSON.parse(JSON.stringify(value));
  const key = (domain, profile) => `ChessinsperBehavior:${domain}:${profile}`;
  const number = (value, fallback = 0) =>
    Number.isFinite(value) ? value : fallback;
  function create(settings, adapter = {}) {
    const now = adapter.now || Date.now,
      random = adapter.random || Math.random;
    let config = root.ChessinsperCore.normalizeSettings(settings);
    const restored = adapter.read?.();
    const fresh = () => ({
      games: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      unknown: 0,
      winStreak: 0,
    });
    const state = {
      version: 1,
      sessionSerial: 0,
      session: fresh(),
      totalGames: 0,
      results: [],
      timestamps: [],
      processed: [],
      history: [],
      activeGame: null,
      nextQueueAt: 0,
      breakUntil: 0,
      paused: false,
      queueAttempts: 0,
      lastQueueAt: 0,
      sessionTC: null,
      tiltGamesLeft: 0,
      tiltActive: false,
      persona: null,
      moveCount: 0,
      cpLossSum: 0,
      recoveries: 0,
      lastRecovery: null,
      lastAnalysisFen: null,
      losingPositions: 0,
      evaluationHistory: [],
      resignAt: 0,
      resignDeadline: 0,
      resignStage: null,
    };
    if (restored?.version === 1) {
      for (const name of Object.keys(state)) {
        const value = restored[name];
        if (Array.isArray(state[name]) && Array.isArray(value))
          state[name] = value.slice(-100);
        else if (name === "session" && value && typeof value === "object") {
          for (const field of Object.keys(state.session))
            state.session[field] = Math.max(0, number(value[field]));
        } else if (typeof state[name] === "number")
          state[name] = Math.max(0, number(value));
        else if (typeof state[name] === "boolean" && typeof value === "boolean")
          state[name] = value;
        else if (
          state[name] === null &&
          (typeof value === "string" || value === null)
        )
          state[name] = value;
      }
    }
    let snapshot = {},
      serialized = "",
      lastWriteAt = 0,
      reason = "Aguardando tabuleiro";
    const between = (range) => range.min + random() * (range.max - range.min);
    const persist = () => {
      const data = { ...copy(state), updatedAt: now(), status: status() };
      // Persist only when policies or the visible status change, not every heartbeat.
      const signature = JSON.stringify({ ...data, updatedAt: 0 });
      if (serialized !== signature || now() - lastWriteAt >= 15000) {
        serialized = signature;
        lastWriteAt = now();
        adapter.write?.(data);
      }
    };
    function resetSession() {
      state.session = fresh();
      state.sessionSerial++;
      state.breakUntil = 0;
      state.sessionTC = null;
      state.queueAttempts = 0;
      state.paused = false;
      state.nextQueueAt = snapshot.gameOver
        ? now() + config.session.betweenGamesMs.min
        : 0;
      persist();
    }
    function beginGame(id) {
      if (!id || state.activeGame === id) return;
      state.activeGame = id;
      state.queueAttempts = 0;
      state.lastQueueAt = 0;
      state.nextQueueAt = 0;
      state.lastAnalysisFen = null;
      state.losingPositions = 0;
      state.resignAt = 0;
      state.resignDeadline = 0;
      state.resignStage = null;
      state.tiltActive = config.tilt.enabled && state.tiltGamesLeft > 0;
      state.tiltGamesLeft = Math.max(0, state.tiltGamesLeft - 1);
      if (!state.sessionTC && snapshot.timeControl)
        state.sessionTC = snapshot.timeControl;
      if (!state.persona)
        state.persona = ["mouse", "mouse", "mouse", "trackpad", "tablet"][
          Math.floor(random() * 5)
        ];
      persist();
    }
    function finishGame(id, result) {
      if (!id) return false;
      if (state.processed.includes(id)) {
        const game = state.history.find((entry) => entry.id === id);
        if (game?.result !== "?" || !["W", "L", "D"].includes(result))
          return false;
        game.result = result;
        state.results = [...state.results, result].slice(-50);
        if (game.sessionSerial === state.sessionSerial) {
          state.session.unknown = Math.max(0, state.session.unknown - 1);
          state.session[{ W: "wins", L: "losses", D: "draws" }[result]]++;
          state.session.winStreak =
            result === "W" ? state.session.winStreak + 1 : 0;
          if (
            config.session.enabled &&
            config.session.maxWinStreak > 0 &&
            state.session.winStreak >= config.session.maxWinStreak &&
            !state.breakUntil
          )
            state.breakUntil = now() + config.session.breakDurationMs;
        }
        if (result === "L" && config.tilt.enabled)
          state.tiltGamesLeft = config.tilt.durationGames;
        persist();
        return true;
      }
      state.processed.push(id);
      state.processed = state.processed.slice(-100);
      const outcome = ["W", "L", "D"].includes(result) ? result : "?";
      state.session.games++;
      state.totalGames++;
      state.session[
        { W: "wins", L: "losses", D: "draws", "?": "unknown" }[outcome]
      ]++;
      state.session.winStreak =
        outcome === "W" ? state.session.winStreak + 1 : 0;
      if (outcome !== "?")
        state.results = [...state.results, outcome].slice(-50);
      if (outcome === "L" && config.tilt.enabled)
        state.tiltGamesLeft = config.tilt.durationGames;
      state.timestamps = [
        ...state.timestamps.filter(
          (t) => Number.isFinite(t) && now() - t < 3600000,
        ),
        now(),
      ];
      state.history = [
        ...state.history,
        { id, result: outcome, at: now(), sessionSerial: state.sessionSerial },
      ].slice(-50);
      state.nextQueueAt = now() + between(config.session.betweenGamesMs);
      if (config.postGame.enabled && random() < config.postGame.reviewChance)
        state.nextQueueAt += between(config.postGame.reviewDurationMs);
      if (
        config.session.enabled &&
        (state.session.games >= config.session.maxGamesPerSession ||
          (config.session.maxWinStreak > 0 &&
            state.session.winStreak >= config.session.maxWinStreak))
      )
        state.breakUntil = now() + config.session.breakDurationMs;
      persist();
      return true;
    }
    function observe(value) {
      snapshot = value || {};
      if (state.breakUntil && now() >= state.breakUntil) resetSession();
      if (!state.sessionTC && snapshot.timeControl)
        state.sessionTC = snapshot.timeControl;
      if (state.resignDeadline && now() >= state.resignDeadline) {
        state.resignAt = 0;
        state.resignDeadline = 0;
        state.resignStage = null;
      }
      if (snapshot.gameId && snapshot.fen) beginGame(snapshot.gameId);
      if (snapshot.gameOver && snapshot.gameId)
        finishGame(snapshot.gameId, snapshot.result);
      queueDecision();
      persist();
      return context();
    }
    function canMove() {
      return (
        config.enabled &&
        !state.paused &&
        !snapshot.gameOver &&
        !(config.autoResign.enabled && state.resignAt > 0) &&
        !(config.coach.enabled && config.coach.disableAutoOnEnable)
      );
    }
    function queueDecision() {
      let waitUntil = state.nextQueueAt;
      if (!config.enabled) reason = "Chessinsper desligado";
      else if (state.paused) reason = "Sessão pausada";
      else if (config.coach.enabled && config.coach.disableAutoOnEnable)
        reason = "Coach ativo · execução desligada";
      else if (!config.session.autoQueue) reason = "Fila automática desligada";
      else if (!snapshot.gameOver || !snapshot.gameId)
        reason = "Partida em andamento";
      else if (state.breakUntil > now()) {
        reason = "Intervalo de sessão";
        waitUntil = state.breakUntil;
      } else if (
        config.tcLock.enabled &&
        state.sessionTC &&
        snapshot.timeControl &&
        state.sessionTC !== snapshot.timeControl
      )
        reason = "Ritmo mudou · reinicie a sessão";
      else {
        const recent = state.timestamps.filter(
          (t) => Number.isFinite(t) && now() - t < 3600000,
        );
        if (
          config.session.enabled &&
          recent.length >= config.session.maxGamesPerHour
        ) {
          reason = "Limite de partidas por hora";
          waitUntil =
            recent[recent.length - config.session.maxGamesPerHour] + 3600000;
        } else if (state.queueAttempts >= 3)
          reason = "Fila não respondeu · retome a sessão";
        else if (state.lastQueueAt && now() < state.lastQueueAt + 10000) {
          reason = "Aguardando nova partida";
          waitUntil = state.lastQueueAt + 10000;
        } else if (waitUntil > now()) reason = "Pausa entre partidas";
        else if (!snapshot.queueAvailable)
          reason = "Aguardando botão de nova partida";
        else {
          reason = "Pronto para nova partida";
          return { allowed: true, waitUntil: 0, reason };
        }
      }
      return { allowed: false, waitUntil: Math.max(0, waitUntil), reason };
    }
    function context() {
      const warmup = config.warmup;
      const p = Math.min(1, state.totalGames / warmup.durationGames);
      const smooth = p * p * (3 - 2 * p);
      const offset =
        warmup.enabled && !warmup.manualOverride
          ? warmup.startEloOffset * (1 - smooth)
          : 0;
      const recent = state.results.slice(-config.winrateTarget.sampleGames);
      const winRate = recent.length
        ? recent.filter((v) => v === "W").length / recent.length
        : null;
      const balance =
        config.winrateTarget.enabled &&
        recent.length >= config.winrateTarget.sampleGames &&
        winRate > config.winrateTarget.target
          ? Math.min(
              200,
              (winRate - config.winrateTarget.target) *
                config.winrateTarget.overshootBoost *
                1000,
            )
          : 0;
      let effective = config.engineUI.strength + offset - balance;
      if (
        config.opponentAdaptation.enabled &&
        Number.isFinite(snapshot.opponentRating) &&
        offset === 0
      )
        effective =
          snapshot.opponentRating + config.opponentAdaptation.ratingEdge;
      return {
        effectiveRating: Math.round(Math.max(400, Math.min(3000, effective))),
        tiltActive: state.tiltActive && config.tilt.enabled,
        hardwarePersona: config.hardwarePersona.enabled ? state.persona : null,
        sessionGames: state.session.games,
        totalGames: state.totalGames,
        winRate,
      };
    }
    function status() {
      const decision = queueDecision();
      return {
        ...context(),
        ...copy(state.session),
        reason,
        paused: state.paused,
        waitUntil: decision.waitUntil,
        queueAttempts: state.queueAttempts,
        moves: state.moveCount,
        averageCPLoss: state.moveCount
          ? Math.round(state.cpLossSum / state.moveCount)
          : 0,
        recoveries: state.recoveries,
        lastRecovery: state.lastRecovery,
        resignAt: state.resignAt,
        resignStage: state.resignStage,
        lastEval: state.evaluationHistory.at(-1)?.cp ?? null,
      };
    }
    return {
      observe,
      context,
      status,
      canMove,
      queueDecision,
      resetSession,
      configure(value) {
        config = root.ChessinsperCore.normalizeSettings(value);
      },
      pause(value) {
        state.paused = !!value;
        if (!value) {
          state.queueAttempts = 0;
          state.lastQueueAt = 0;
        }
        persist();
      },
      queueAttempt() {
        state.queueAttempts++;
        state.lastQueueAt = now();
        persist();
      },
      recover(source) {
        state.recoveries++;
        state.lastRecovery = source;
        persist();
      },
      recordMove(entry) {
        const id = `move:${state.activeGame}:${entry.fen}:${entry.move}`;
        if (state.processed.includes(id)) return;
        state.processed = [...state.processed, id].slice(-100);
        state.moveCount++;
        state.cpLossSum += Math.max(0, number(entry.cpLoss));
        persist();
      },
      recordAnalysis(packet) {
        if (!packet.fen || packet.fen === state.lastAnalysisFen) return;
        state.lastAnalysisFen = packet.fen;
        if (Number.isFinite(packet.bestCp))
          state.evaluationHistory = [
            ...state.evaluationHistory,
            { fen: packet.fen, cp: packet.bestCp, at: now() },
          ].slice(-100);
        const ar = config.autoResign;
        const lost =
          (Number.isFinite(packet.bestCp) &&
            packet.bestCp <= ar.evalThreshold * 100) ||
          (Number.isFinite(packet.bestMate) && packet.bestMate < 0);
        state.losingPositions = lost ? state.losingPositions + 1 : 0;
        if (!lost) {
          state.resignAt = 0;
          state.resignDeadline = 0;
          state.resignStage = null;
        }
        if (
          ar.enabled &&
          !state.resignAt &&
          state.losingPositions >= ar.consecutiveMoves &&
          Number(packet.fen.split(" ")[5]) >= ar.minMoveNumber &&
          random() < ar.resignChance
        ) {
          state.resignAt = now() + between(ar.delay);
          state.resignDeadline = state.resignAt + 10000;
        }
        persist();
      },
      canResign() {
        return (
          config.enabled &&
          config.autoResign.enabled &&
          !state.paused &&
          !snapshot.gameOver &&
          !(config.coach.enabled && config.coach.disableAutoOnEnable) &&
          state.resignAt > 0 &&
          now() >= state.resignAt &&
          state.resignStage !== "sent"
        );
      },
      resignAttempt(confirmed) {
        state.resignStage = confirmed ? "sent" : "confirm";
        state.resignAt = now() + 1500;
        persist();
      },
      checkpoint: () => {
        persist();
        return copy(state);
      },
    };
  }

  function createSupervisor(adapter, environment = root) {
    let interval = null,
      worker = null,
      workerURL = null,
      lastTick = 0,
      active = false,
      busy = false,
      workerRestartAt = 0,
      rtcGeneration = 0,
      rtcStarting = false,
      peers = [],
      channel = null,
      rtcTimer = null,
      rtcTimeout = null,
      rtcFinish = null;
    const document = environment.document;
    const events = ["focus", "pageshow", "online", "visibilitychange"];
    function recover(source) {
      adapter.cancel?.();
      adapter.recover?.(source);
    }
    async function tick(source) {
      if (!active || busy) return;
      const time = Date.now();
      if (lastTick && time - lastTick > 15000)
        recover("retorno após suspensão");
      lastTick = time;
      if (!worker && time >= workerRestartAt) startWorker();
      busy = true;
      try {
        await adapter.tick?.(source);
      } catch (error) {
        adapter.error?.(error);
      } finally {
        busy = false;
      }
    }
    function wake(event) {
      if (!active) return;
      recover(event.type);
      void tick(event.type);
    }
    function freeze() {
      adapter.cancel?.();
      adapter.checkpoint?.();
    }
    function disposeWorker() {
      worker?.terminate();
      worker = null;
      if (workerURL) environment.URL.revokeObjectURL(workerURL);
      workerURL = null;
    }
    function startWorker() {
      if (!active || worker) return;
      try {
        workerURL = environment.URL.createObjectURL(
          new environment.Blob(
            ["setInterval(()=>postMessage(Date.now()),1000)"],
            { type: "text/javascript" },
          ),
        );
        worker = new environment.Worker(workerURL);
        worker.onmessage = () => void tick("worker");
        worker.onerror = () => {
          disposeWorker();
          workerRestartAt = Date.now() + 30000;
        };
      } catch {
        disposeWorker();
        workerRestartAt = Date.now() + 60000;
      }
    }
    function closeRTC() {
      rtcGeneration++;
      rtcStarting = false;
      rtcFinish?.(false);
      rtcFinish = null;
      if (rtcTimeout) environment.clearTimeout(rtcTimeout);
      rtcTimeout = null;
      if (rtcTimer) environment.clearInterval(rtcTimer);
      rtcTimer = null;
      channel?.close();
      channel = null;
      peers.forEach((peer) => peer.close());
      peers = [];
    }
    async function startRTC() {
      if (
        !active ||
        rtcStarting ||
        peers.length ||
        !environment.RTCPeerConnection
      )
        return;
      rtcStarting = true;
      const generation = rtcGeneration;
      let timeout;
      try {
        const a = new environment.RTCPeerConnection({ iceServers: [] });
        const b = new environment.RTCPeerConnection({ iceServers: [] });
        peers = [a, b];
        const forA = [],
          forB = [];
        a.onicecandidate = (e) => {
          if (e.candidate) {
            if (b.remoteDescription)
              b.addIceCandidate(e.candidate).catch(() => {});
            else forB.push(e.candidate);
          }
        };
        b.onicecandidate = (e) => {
          if (e.candidate) {
            if (a.remoteDescription)
              a.addIceCandidate(e.candidate).catch(() => {});
            else forA.push(e.candidate);
          }
        };
        b.ondatachannel = (e) => {
          e.channel.onmessage = () => void tick("rtc");
        };
        channel = a.createDataChannel("chessinsper-local", {
          ordered: false,
          maxRetransmits: 0,
        });
        const connected = new Promise((resolve) => {
          rtcFinish = resolve;
          channel.onopen = () => resolve(true);
          timeout = rtcTimeout = environment.setTimeout(
            () => resolve(false),
            8000,
          );
        });
        await a.setLocalDescription(await a.createOffer());
        await b.setRemoteDescription(a.localDescription);
        await Promise.all(
          forB.map((candidate) => b.addIceCandidate(candidate).catch(() => {})),
        );
        await b.setLocalDescription(await b.createAnswer());
        await a.setRemoteDescription(b.localDescription);
        await Promise.all(
          forA.map((candidate) => a.addIceCandidate(candidate).catch(() => {})),
        );
        const opened = await connected;
        if (!opened) {
          if (generation === rtcGeneration) closeRTC();
          return;
        }
        if (!active || generation !== rtcGeneration) return;
        rtcTimer = environment.setInterval(() => {
          if (channel?.readyState === "open") channel.send("tick");
        }, 15000);
      } catch {
        if (generation === rtcGeneration) closeRTC();
      } finally {
        environment.clearTimeout(timeout);
        if (generation === rtcGeneration) {
          rtcStarting = false;
          rtcTimeout = null;
          rtcFinish = null;
        }
      }
    }
    return {
      start(options = {}) {
        if (active) {
          if (options.localKeepAlive) void startRTC();
          else if (peers.length) closeRTC();
          return;
        }
        active = true;
        lastTick = Date.now();
        startWorker();
        interval = environment.setInterval(() => void tick("interval"), 5000);
        events.forEach((event) =>
          environment.addEventListener(event, wake, true),
        );
        document?.addEventListener("freeze", freeze, true);
        document?.addEventListener("resume", wake, true);
        environment.addEventListener("pagehide", freeze, true);
        if (options.localKeepAlive) void startRTC();
        if (document?.wasDiscarded) recover("aba restaurada");
        void tick("start");
      },
      stop() {
        active = false;
        environment.clearInterval(interval);
        interval = null;
        disposeWorker();
        closeRTC();
        adapter.cancel?.();
        adapter.checkpoint?.();
        events.forEach((event) =>
          environment.removeEventListener(event, wake, true),
        );
        document?.removeEventListener("freeze", freeze, true);
        document?.removeEventListener("resume", wake, true);
        environment.removeEventListener("pagehide", freeze, true);
      },
      tick,
      isActive: () => active,
    };
  }
  const visible = (element) =>
    !!element &&
    element.isConnected &&
    element.getClientRects().length > 0 &&
    root.getComputedStyle(element).visibility !== "hidden";
  function readPage(document, playerColor) {
    const modal = [
      ...document.querySelectorAll(
        '[data-cy="game-over-modal"], .game-over-modal, .game-over-component, .game-over-dialog, .game-over-modal-component, .result-wrap',
      ),
    ].find(visible);
    const ended =
      modal ||
      [
        ...document.querySelectorAll(
          ".game-header-component, .game-header-title, .game__meta .status",
        ),
      ].find(
        (e) =>
          visible(e) &&
          /checkmate|xeque.?mate|resigned|abandonou|draw|empate|wins|venceu|time.?out|tempo esgotado/i.test(
            e.textContent,
          ),
      );
    const text = ended?.textContent || "";
    let result = /you won|você venceu|voce venceu|vitória|victory/i.test(text)
      ? "W"
      : /you lost|você perdeu|voce perdeu|derrota/i.test(text)
        ? "L"
        : /\b(draw|empate|stalemate|agreement|repetition)\b/i.test(text)
          ? "D"
          : null;
    const score = text.match(
      /\b(1\s*[-–]\s*0|0\s*[-–]\s*1|½\s*[-–]\s*½|1\/2\s*[-–]\s*1\/2)\b/,
    );
    if (score)
      result = /½|1\/2/.test(score[1])
        ? "D"
        : (score[1].startsWith("1") ? "w" : "b") === playerColor
          ? "W"
          : "L";
    if (!result && /white (wins|won)|brancas venceram/i.test(text))
      result = playerColor === "w" ? "W" : "L";
    if (!result && /black (wins|won)|pretas venceram/i.test(text))
      result = playerColor === "b" ? "W" : "L";
    let queueButton = [
      ...document.querySelectorAll(
        '[data-cy="new-game-button"], [data-cy="game-over-new-game"], .game-over-modal .new-game-button, .game-over-component .new-game-button, .follow-up .button[href="/"], .follow-up .rematch',
      ),
    ].find(visible);
    if (!queueButton && modal)
      queueButton = [...modal.querySelectorAll("button, a")].find(
        (e) =>
          visible(e) &&
          /^(new (\d+\s*(min|minute)\s*)?game|play again|nova partida|jogar novamente|rematch|revanche)$/i.test(
            e.textContent.trim(),
          ),
      );
    if (
      queueButton?.disabled ||
      queueButton?.getAttribute("aria-disabled") === "true"
    )
      queueButton = null;
    return { gameOver: !!ended, result, queueButton };
  }
  const api = { create, createSupervisor, readPage, key };
  root.ChessinsperBehavior = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

// END CHESSINSPER BUNDLE
(async () => { try { await LOAD_LEGACY_GM_SUPPORT();
/*
┏┓┓ ┏┓┳┓┏┓┓
┃┓┃ ┃┃┣┫┣┫┃
┗┛┗┛┗┛┻┛┛┗┗┛
============
Code below this point runs on any site, including the GUI.
*/

const backendConfig = {
    'hosts': { 'prod': 'guilhermelourencoismart-bot.github.io', 'dev': 'localhost' },
    'path': '/ACASIOS/'
};

const currentBackendUrlKey = 'currentBackendURL';
const currentBackendUrl = typeof GM_getValue === 'function'
    ? GM_getValue(currentBackendUrlKey)
    : await GM.getValue(currentBackendUrlKey);
const isBackendUrlUpToDate = Object.values(backendConfig.hosts)
    .some(x => currentBackendUrl?.includes(x));
const isDevPage = window?.location?.pathname?.includes('/dev');

function constructBackendURL(host) {
    const protocol = window.location.protocol + '//';
    const hosts = backendConfig.hosts;

    return protocol + (host || (hosts?.prod || hosts?.path)) + backendConfig.path;
}

function isRunningOnBackend(skipGM) {
    const hostsArr = Object.values(backendConfig.hosts);

    const path = window?.location?.pathname;
    const foundHost = hostsArr.find(host => host === window?.location?.host);
    const isCorrectPath = path?.includes(backendConfig.path);

    const isBackend = typeof foundHost === 'string' && isCorrectPath;

    if(isBackend && !skipGM)
        GM_setValue(currentBackendUrlKey, constructBackendURL(foundHost));

    return isBackend;
}

const runningOnBackend = isRunningOnBackend();
const runningOnDevPage = runningOnBackend && isDevPage;

const activeInputListeners = [];

// KEEP THESE AS FALSE ON PRODUCTION
const debugModeActivated = false;
const onlyUseDevelopmentBackend = false;

const domain = window.location.hostname.replace('www.', '');
const greasyforkURL = 'https://github.com/guilhermelourencoismart-bot/ACASIOS';

function prependProtocolWhenNeeded(url) {
    if(!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'http://' + url;
    }

    return url;
}

function getCurrentBackendURL(skipGmStorage) {
    if(onlyUseDevelopmentBackend) {
        return constructBackendURL(backendConfig.hosts?.dev);
    }

    const gmStorageUrl = GM_getValue(currentBackendUrlKey);

    if(skipGmStorage || !gmStorageUrl) {
        return constructBackendURL();
    }

    return prependProtocolWhenNeeded(gmStorageUrl);
}

if(!isBackendUrlUpToDate) {
    GM_setValue(currentBackendUrlKey, getCurrentBackendURL(true));
}

function createInstanceVariable(dbValue) {
    return {
        set: (instanceID, value) => GM_setValue(dbValues[dbValue](instanceID), { value, 'date': Date.now() }),
        get: instanceID => {
            const data = GM_getValue(dbValues[dbValue](instanceID));

            if(data?.date) {
                data.date = Date.now();

                GM_setValue(dbValues[dbValue](instanceID), data);
            }

            return data?.value;
        }
    }
}

const tempValueIndicator = '-temp-value-';
const dbValues = {
    AcasConfig: 'AcasConfig',
    playerColor: instanceID => 'playerColor' + tempValueIndicator + instanceID,
    turn: instanceID => 'turn' + tempValueIndicator + instanceID,
    fen: instanceID => 'fen' + tempValueIndicator + instanceID,
    gameStateHistory: instanceID => 'gameStateHistory' + tempValueIndicator + instanceID,
};
// Add them to /js/misc/userscriptBridge.js as well if you decide to add more variables here
// Also make sure dbValues (above) have these instanceVars
const instanceVars = {
    playerColor: createInstanceVariable('playerColor'),
    turn: createInstanceVariable('turn'),
    fen: createInstanceVariable('fen'),
    gameStateHistory: createInstanceVariable('gameStateHistory')
};

function exposeViaMessages() {
    const handlers = {
        USERSCRIPT_getValue: (args, messageId) => {
            const [key] = args;
            const value = GM_getValue(key);
            window.postMessage({ messageId, value }, '*');
        },
        USERSCRIPT_setValue: (args, messageId) => {
            const [key, value] = args;
            GM_setValue(key, value);
            window.postMessage({ messageId, value: true }, '*');
        },
        USERSCRIPT_deleteValue: (args, messageId) => {
            const [key] = args;
            GM_deleteValue(key);
            window.postMessage({ messageId, value: true }, '*');
        },
        USERSCRIPT_listValues: (args, messageId) => {
            const value = GM_listValues();
            window.postMessage({ messageId, value }, '*');
        },
        USERSCRIPT_getInfo: (args, messageId) => {
            const value = typeof GM_info !== 'undefined' ? JSON.parse(JSON.stringify(GM_info)) : {};
            window.postMessage({ messageId, value }, '*');
        },
        USERSCRIPT_instanceVars: (args, messageId) => {
            const [instanceId, key, value] = args;

            if (!instanceVars.hasOwnProperty(key)) {
                window.postMessage({ messageId, value: false }, '*');
                return;
            }

            const result = (value !== undefined)
                ? instanceVars[key].set(instanceId, value)
                : instanceVars[key].get(instanceId);

            window.postMessage({ messageId, value: result }, '*');
        }
    };

    window.addEventListener('message', (event) => {
        const handler = handlers[event.data?.type];
        if(handler) handler(event.data.args, event.data.messageId);
    });

    const script = document.createElement('script');
    script.innerHTML = 'window.isUserscriptActive = true;';

    document.head.appendChild(script);
}

function exposeViaUnsafe() {
    if(typeof unsafeWindow !== 'object') return;

    unsafeWindow.USERSCRIPT = {
        'getValue': val => GM_getValue(val),
        'setValue': (val, data) => GM_setValue(val, data),
        'deleteValue': val => GM_deleteValue(val),
        'listValues': val => GM_listValues(val),
        'instanceVars': instanceVars,
        'getInfo': () => GM_info
    };

    unsafeWindow.isUserscriptActive = true;
}

if(runningOnBackend && !isDevPage) {
    if(typeof unsafeWindow === 'object')
        exposeViaUnsafe();
    else
        exposeViaMessages();

    return;
}

/*ZONE CHANGE - DO NOT PROCEED IF YOU DON'T KNOW WHAT YOU'RE DOING*\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////////////////
/!ZONE CHANGE - DO NOT PROCEED IF YOU DON'T KNOW WHAT YOU'RE DOING!/

┏┓┓┏┏┓┏┓┏┓  ┏┓┳┏┳┓┏┓┏┓
┃ ┣┫┣ ┗┓┗┓  ┗┓┃ ┃ ┣ ┗┓
┗┛┛┗┗┛┗┛┗┛  ┗┛┻ ┻ ┗┛┗┛
======================
Code below this point only runs on chess sites, not on the GUI itself.
*/

function getUniqueID() {
    return ([1e7]+-1e3+4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

function getBoardChangesObjTemplate() {
    return {
            changedSquaresAmount: 0,
            movedPieces: [],
            removed: [],
            added: [],
            pieceAmountChange: 0,

            from: null,
            to: null,
            movedPiece: null,
            movedPieceColor: null,

            capturedPiece: null,
            capturedSquare: null,

            isPromotion: false,
            promotionPiece: null,
            isEnPassant: false,

            missedFen: null
    };
}

function getGameStateObjTemplate() {
    return {
        fen: { 'full': null, 'basic': null },
        turn: null,

        pieceAmountChange: 0,

        boardChanges: getBoardChangesObjTemplate(),

        movedPiece: null,

        enPassantTarget: '-',
        castlingRights: 'KQkq',
        lostCastlingRights: [],

        isCapture: false,
        isPawnMove: false,
        isCastling: false,
        castlingSide: null,

        halfmoveClock: -1,
        plyCount: -1,
        fullmoveNumber: 1
    };
}

const commLinkInstanceID = getUniqueID();

const blacklistedURLs = [
    constructBackendURL(backendConfig?.hosts?.prod),
    constructBackendURL(backendConfig?.hosts?.dev),
    'https://www.chess.com/play',
    'https://lichess.org/',
    'https://chess.org/',
    'https://papergames.io/en/chess',
    'https://playstrategy.org/',
    'https://www.pychess.org/',
    'https://www.coolmathgames.com/0-chess',
    'https://chess.net/'
];

const configKeys = Object.freeze([
    'engineElo', 'moveSuggestionAmount', 'arrowOpacity',
    'displayMovesOnExternalSite', 'showMoveGhost', 'showOpponentMoveGuess',
    'showOpponentMoveGuessConstantly', 'onlyShowTopMoves', 'maxMovetime',
    'chessVariant', 'chessEngine', 'lc0Weight',
    'engineNodes', 'chessFont', 'useChess960',
    'onlyCalculateOwnTurn', 'ttsVoiceEnabled', 'ttsVoiceName',
    'ttsVoiceSpeed', 'ttsTranslateAudio', 'ttsAnnounceEnemyMoves', 'ttsAnnounceEvaluation', 'chessEngineProfile', 'primaryArrowColorHex',
    'secondaryArrowColorHex', 'opponentArrowColorHex', 'bookMoveColorHex',
    'bookMoveOpacity', 'reverseSide', 'engineEnabled', 'autoMove', 'autoMoveLegit',
    'autoMoveRandom', 'autoMoveAfterUser', 'legitModeType',
    'moveDisplayDelay', 'renderSquarePlayer', 'renderSquareEnemy',
    'renderSquareContested', 'renderSquareSafe', 'renderPiecePlayerCapture',
    'renderPieceEnemyCapture', 'renderOnExternalSite', 'feedbackOnExternalSite',
    'enableMoveRatings', 'enableEnemyFeedback', 'feedbackEngineDepth',
    'enableAdvancedElo', 'moveAsFilledSquares',
    'movesOnDemand', 'onlySuggestPieces', 'chessinsper', 'isUserscriptGhost'
].reduce((o, k) => (o[k] = k, o), {}));

const config = {};
const supportedSites = {};
const pieceNameToFen = {
    'pawn': 'p',
    'knight': 'n',
    'bishop': 'b',
    'rook': 'r',
    'queen': 'q',
    'king': 'k'
};
const defaultPosBasicFens = [
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
];

const gameStateHistory = {
    set: (val) => instanceVars.gameStateHistory.set(commLinkInstanceID, val || []),
    get: () => instanceVars.gameStateHistory.get(commLinkInstanceID) || []
};

let BoardDrawer = null;
let chessBoardElem = null;
let chesscomVariantPlayerColorsTable = null;
let activeVisuals = [];
let boardObserver = null;
let dumbBoardObservingInterval = null;

let lastMutationObservationDate = 0;
let lastBoardRanks = null;
let lastBoardFiles = null;
let lastBoardSize = null;
let lastPieceSize = null;
let lastBoardMatrix = null;
let lastBoardOrientation = null;
let lastMoveRequestTime = 0;
let lastAllowedFen = '';
let lastRejectedFen = '';

let gameState = getGameStateObjTemplate();

let backendTabOpenedOnceAlready = false;
let matchFirstSuggestionGiven = false;
let isUserMouseDown = false;
let modListeners = [];
let modDrawerListeners = [];
let modLastEnteredSquare = { 'squareIndex': null, 'squareFen': null, 'pieceFen': null };
let isMovesOnDemandActive = false;

Object.values(configKeys).forEach(key => {
    config[key] = {
        get:  profile => getGmConfigValue(key, commLinkInstanceID, profile),
        set: null
    };
});

// Dynamic settings are optional: missing/older @require files or malformed
// stored data must never interrupt normal userscript board processing.
function withDynamicSettings(callback, fallback = () => undefined) {
    try { return callback(); }
    catch(e) { return fallback(); }
}

function getDynamicSettingsCore() {
    return withDynamicSettings(() => typeof DynamicSettingsCore !== 'undefined' ? DynamicSettingsCore : null, () => null);
}

function resolveDynamicSetting(baseValue, curve, instanceID) {
    return withDynamicSettings(() => {
        const core = getDynamicSettingsCore();
        if(!curve || typeof curve !== 'object' || Array.isArray(curve)
            || typeof core?.resolveValue !== 'function' || typeof core?.getContext !== 'function') return baseValue;
        const resolved = core.resolveValue(baseValue, curve, core.getContext(instanceID));
        return typeof resolved === typeof baseValue && (typeof resolved === 'boolean' || typeof resolved === 'string'
            || typeof resolved === 'number' && Number.isFinite(resolved)) ? resolved : baseValue;
    }, () => baseValue);
}

function updateUserscriptDynamicContext(context, fen) {
    return withDynamicSettings(() => {
        const core = getDynamicSettingsCore();
        let updated = false;
        if(typeof core?.setContext === 'function') {
            const fenContext = typeof fen === 'string' && typeof core.getContextFromFen === 'function'
                ? core.getContextFromFen(fen) : {};
            const state = context && typeof context === 'object' && !Array.isArray(context) ? context : {};
            core.setContext(commLinkInstanceID, { ...fenContext, ...state });
            updated = true;
        }
        refreshSettings();
        return updated;
    }, () => false);
}

function getGmConfigValue(key, instanceID, profileID, baseOnly = false) {
    let baseValue;
    return withDynamicSettings(() => {
        if(typeof profileID === 'object') profileID = profileID?.name;
        if(typeof key !== 'string' || (profileID != null && typeof profileID !== 'string')) return null;
        const config = GM_getValue(dbValues.AcasConfig);
        const profileKey = profileID ? getProfileStorageKey(profileID) : null;
        const globalProfile = profileKey ? config?.global?.profiles?.[profileKey] : null;
        const instanceProfile = profileKey ? config?.instance?.[instanceID]?.profiles?.[profileKey] : null;

        if(instanceProfile?.[key] !== undefined) baseValue = instanceProfile[key];
        else if(globalProfile?.[key] !== undefined) baseValue = globalProfile[key];
        else if(config?.instance?.[instanceID]?.[key] !== undefined) baseValue = config.instance[instanceID][key];
        else baseValue = config?.global?.[key];

        if(baseValue === undefined || baseOnly) return baseValue ?? null;
        const curve = instanceProfile?.dynamicSettings?.[key] ?? globalProfile?.dynamicSettings?.[key];
        return resolveDynamicSetting(baseValue, curve, instanceID);
    }, () => baseValue ?? null);
}

function getProfileStorageKey(profileName) {
    if(profileName === 'default') return 'default';
    if(typeof profileName !== 'string' || profileName.startsWith('__B64__')) return profileName;
    const encoded = btoa(unescape(encodeURIComponent(profileName)));
    return `__B64__${encoded}`;
}

function getProfileStorageName(profileKey) {
    if(typeof profileKey !== 'string' || !profileKey.startsWith('__B64__')) return profileKey;
    try { return decodeURIComponent(escape(atob(profileKey.slice(7)))); }
    catch(e) { return profileKey; }
}

function resolveProfileConfig(profile) {
    return withDynamicSettings(() => {
        const config = profile?.config;
        if(!config || typeof config !== 'object' || Array.isArray(config)) return profile;
        const curves = config.dynamicSettings;
        if(!curves || typeof curves !== 'object' || Array.isArray(curves)) return profile;
        Object.entries(curves).forEach(([key, curve]) => {
            if(key === '__proto__' || key === 'constructor' || key === 'prototype' || !Object.hasOwn(config, key)) return;
            const baseValue = config[key];
            if(baseValue === undefined) return;
            const resolved = resolveDynamicSetting(baseValue, curve, commLinkInstanceID);
            if(!Object.is(resolved, baseValue)) config[key] = resolved;
        });
        return profile;
    }, () => profile);
}

function getConfigValue(key, profile) {
    return getGmConfigValue(key, commLinkInstanceID, profile);
}

function setConfigValue(key, val) {
    return config[key]?.set(val);
}

const CommLink = new CommLinkHandler(`frontend_${commLinkInstanceID}`, {
    'singlePacketResponseWaitTime': 250,
    'maxSendAttempts': 3,
    'statusCheckInterval': 1,
    'silentMode': true
});

// manually register a command so that the variables are dynamic
CommLink.commands['createInstance'] = async () => {
    return await CommLink.send('mum', 'createInstance', {
        'domain': domain,
        'instanceID': commLinkInstanceID,
        'chessVariant': getChessVariant(),
        'playerColor': getBoardOrientation()
    });
}

CommLink.registerSendCommand('ping', { commlinkID: 'mum', data: 'ping' });
CommLink.registerSendCommand('pingInstance', { data: 'ping' });
CommLink.registerSendCommand('log');
CommLink.registerSendCommand('updateBoardOrientation');
CommLink.registerSendCommand('updateBoardFen');
CommLink.registerSendCommand('newMatchStarted');
CommLink.registerSendCommand('calculateBestMoves');
CommLink.registerSendCommand('calculateSpecificMoves');
CommLink.registerSendCommand('forceInstanceRestart');
CommLink.registerSendCommand('toggleConcealAssistance');

CommLink.registerSendCommand('chessinsperMoveConfirmed');

const chessinsperBehaviors = new Map();
let chessinsperActiveProfile = null, chessinsperLeaseSince = 0, chessinsperLastTick = 0;
const chessinsperMatchKey = `ChessinsperMatch:${domain}:${location.pathname}`;
function chessinsperMatch(newMatch = false) {
    const fen = getFen(), route = location.pathname;
    let match = GM_getValue(chessinsperMatchKey);
    const routeId = route.match(/\/game\/(?:live|daily)\/(\d+)/)?.[1]
        || (/lichess\.org$/.test(domain) ? route.match(/^\/([a-zA-Z0-9]{8,12})(?:\/|$)/)?.[1] : null);
    const reset = newMatch && match?.fen && fen && match.fen.split(' ').slice(0,2).join(' ') !== fen.split(' ').slice(0,2).join(' ')
        && (match.ended || defaultPosBasicFens.includes(fen.split(' ')[0]));
    if(!match || match.route !== route || reset) {
        match = { id: routeId ? `${domain}:${routeId}` : `${domain}:${Date.now()}:${getUniqueID()}`, route, fen, ended: false };
        GM_setValue(chessinsperMatchKey, match);
    }
    return match;
}
function chessinsperBehavior(profile) {
    const settings = ChessinsperCore.normalizeSettings(getConfigValue(configKeys.chessinsper, profile));
    let entry = chessinsperBehaviors.get(profile);
    if(!entry) {
        const key = ChessinsperBehavior.key(domain, profile);
        entry = { key, settings, controller: ChessinsperBehavior.create(settings, {
            read: () => GM_getValue(key), write: state => {
                if(GM_getValue(key + ':owner')?.id === commLinkInstanceID) GM_setValue(key, state);
            }
        }), lastCommand: null, lastFen: null, fenSince: Date.now(), lastIdleAt: 0 };
        chessinsperBehaviors.set(profile, entry);
    }
    const wasAllowed = entry.controller.canMove();
    entry.settings = settings;
    entry.controller.configure(settings);
    const autoMove = !!getConfigValue(configKeys.autoMove, profile);
    if((!wasAllowed && entry.controller.canMove()) || autoMove && !entry.autoMove) entry.needsAnalysis = true;
    entry.autoMove = autoMove;
    return entry;
}
function chessinsperOwnsTab(profile) {
    if(profile !== chessinsperActiveProfile) return false;
    const key = ChessinsperBehavior.key(domain, profile) + ':owner';
    const time = Date.now(), owner = GM_getValue(key);
    if(owner?.id !== commLinkInstanceID && owner?.until > time) return false;
    if(owner?.id !== commLinkInstanceID) {
        chessinsperLeaseSince = time;
        const entry = chessinsperBehaviors.get(profile);
        if(entry) {
            entry.controller = ChessinsperBehavior.create(entry.settings, {
                read: () => GM_getValue(entry.key), write: state => {
                    if(GM_getValue(entry.key + ':owner')?.id === commLinkInstanceID) GM_setValue(entry.key, state);
                }
            });
            entry.needsAnalysis = true;
        }
    }
    GM_setValue(key, { id: commLinkInstanceID, until: time + 10000 });
    return time - chessinsperLeaseSince >= 1000 && GM_getValue(key)?.id === commLinkInstanceID;
}
function chessinsperReleaseTab(profile) {
    if(!profile) return;
    const key = ChessinsperBehavior.key(domain, profile) + ':owner';
    if(GM_getValue(key)?.id === commLinkInstanceID) GM_deleteValue(key);
}
function chessinsperSnapshot() {
    const base = getChessinsperContext(), page = ChessinsperBehavior.readPage(document, base.playerColor);
    const match = chessinsperMatch();
    const fen = getFen();
    if(fen && (match.fen !== fen || match.ended !== page.gameOver)) GM_setValue(chessinsperMatchKey, { ...match, fen, ended: page.gameOver });
    return { ...base, ...page, fen, gameId: match.id, queueAvailable: !!page.queueButton };
}
function chessinsperTick() {
    const time = Date.now();
    if(time - chessinsperLastTick < 750 || !chessinsperActiveProfile) return;
    chessinsperLastTick = time;
    const entry = chessinsperBehavior(chessinsperActiveProfile);
    const ownsTab = chessinsperOwnsTab(chessinsperActiveProfile);
    if(!entry.settings.enabled || !ownsTab) return;
    const c = entry.controller;
    const command = GM_getValue(entry.key + ':command');
    if(command?.id && command.id !== entry.lastCommand) {
        entry.lastCommand = command.id;
        if(command.type === 'reset') c.resetSession();
        if(command.type === 'pause') { c.pause(true); chessinsperInput.cancel(); }
        if(command.type === 'resume') { c.pause(false); entry.needsAnalysis = true; }
        GM_deleteValue(entry.key + ':command');
    }
    const snapshot = chessinsperSnapshot();
    const wasAllowed = c.canMove();
    c.observe(snapshot);
    if(!wasAllowed && c.canMove()) entry.needsAnalysis = true;
    if(entry.needsAnalysis && snapshot.fen && !snapshot.gameOver && !chessinsperInput.isActive()) {
        entry.needsAnalysis = false;
        CommLink.commands.calculateBestMoves(snapshot.fen);
    }
    if(!c.canMove()) chessinsperInput.cancel();
    if(c.canResign() && getConfigValue(configKeys.autoMove, chessinsperActiveProfile) && !chessinsperInput.isActive()) {
        const confirming = c.status().resignStage === 'confirm';
        const selector = confirming ? 'button[data-cy="confirm-resign"], button[data-cy="resign-confirmation"], [data-cy="resign-confirmation"] button, .resign-confirmation button, button.confirm-resign' : '[data-cy="resign-button"], button.resign-button, .resign-button-component button, button.resign-button-component, button.resign, .board-controls-btn-resign';
        const button = [...document.querySelectorAll(selector)].find(e => e.isConnected && e.getClientRects().length && !e.disabled && getComputedStyle(e).visibility !== 'hidden'
            && (!confirming || /^(resign|abandonar|desistir|yes(?:,?\s*resign)?|sim(?:,?\s*abandonar)?|confirm(?:ar)?)[.!]?$/i.test((e.textContent || e.getAttribute('aria-label') || '').trim())));
        if(button && !ChessinsperBehavior.readPage(document, snapshot.playerColor).gameOver && chessinsperOwnsTab(chessinsperActiveProfile)) {
            c.resignAttempt(confirming); button.click();
        }
    }
    if(c.queueDecision().allowed && getConfigValue(configKeys.autoMove, chessinsperActiveProfile) && !chessinsperInput.isActive()) {
        // Re-read both the live settings and the DOM immediately before the one click.
        const live = ChessinsperCore.normalizeSettings(getConfigValue(configKeys.chessinsper, chessinsperActiveProfile));
        const page = ChessinsperBehavior.readPage(document, snapshot.playerColor);
        if(live.enabled && live.session.autoQueue && page.gameOver && page.queueButton && chessinsperOwnsTab(chessinsperActiveProfile)) {
            c.queueAttempt(); page.queueButton.click();
        }
    }
    if(entry.lastFen !== snapshot.fen) { entry.lastFen = snapshot.fen; entry.fenSince = time; }
    const idle = entry.settings.idleMouse;
    if(idle.enabled && c.canMove() && !chessinsperInput.isActive() && getConfigValue(configKeys.autoMove, chessinsperActiveProfile)
       && time - entry.fenSince >= idle.triggerAfterMs && time - entry.lastIdleAt >= 1200 && Math.random() < idle.actionChance) {
        entry.lastIdleAt = time;
        const board = getBoardElem(), rect = board?.getBoundingClientRect();
        if(rect?.width && rect.height) board.dispatchEvent(new MouseEvent('mousemove', {
            bubbles: true, clientX: rect.left + rect.width * (0.15 + Math.random() * 0.7),
            clientY: rect.top + rect.height * (0.15 + Math.random() * 0.7), buttons: 0
        }));
    }
}
const chessinsperSupervisor = ChessinsperBehavior.createSupervisor({
    tick: chessinsperTick,
    cancel: () => chessinsperInput.cancel(),
    checkpoint: () => chessinsperBehaviors.forEach(entry => entry.controller.checkpoint()),
    recover: source => {
        const entry = chessinsperBehaviors.get(chessinsperActiveProfile);
        if(!entry || !entry.settings.enabled || !chessinsperOwnsTab(chessinsperActiveProfile)) return;
        entry.controller.recover(source);
        if(entry.controller.canMove()) {
            chessinsperInput.reset();
            CommLink.commands.updateBoardFen();
            CommLink.commands.calculateBestMoves(getFen());
        }
    },
    error: error => { if(debugModeActivated) console.warn('Chessinsper AFK', error); }
});
function syncChessinsperBehaviors(names, config) {
    const enabled = [...names].filter(name => ChessinsperCore.normalizeSettings(getConfigValue(configKeys.chessinsper, name)).enabled);
    const preferred = config?.global?.chessEngineProfile;
    const next = enabled.includes(preferred) && getConfigValue(configKeys.autoMove, preferred) ? preferred
        : enabled.find(name => getConfigValue(configKeys.autoMove, name)) || enabled[0] || null;
    if(next !== chessinsperActiveProfile) {
        const previous = chessinsperBehaviors.get(chessinsperActiveProfile);
        if(previous && chessinsperOwnsTab(chessinsperActiveProfile)) {
            previous.controller.configure(ChessinsperCore.normalizeSettings(getConfigValue(configKeys.chessinsper, chessinsperActiveProfile)));
            previous.controller.checkpoint();
        }
        chessinsperInput.cancel(); chessinsperReleaseTab(chessinsperActiveProfile);
        chessinsperActiveProfile = next; chessinsperLeaseSince = Date.now();
    }
    chessinsperBehaviors.forEach((entry, profile) => {
        if(!enabled.includes(profile)) entry.controller.configure({ ...entry.settings, enabled: false });
    });
    const entry = next ? chessinsperBehavior(next) : null;
    if(entry?.settings.afk.enabled) chessinsperSupervisor.start(entry.settings.afk);
    else if(chessinsperSupervisor.isActive()) chessinsperSupervisor.stop();
    chessinsperTick();
}
window.addEventListener('pagehide', () => {
    chessinsperSupervisor.stop(); chessinsperReleaseTab(chessinsperActiveProfile);
});

const chessinsperFirstPositions = new Map();
const chessinsperInput = ChessinsperAutomation.create({
    getBoard: getBoardElem,
    getFen,
    getOrientation: getBoardOrientation,
    enabled: (profile, plannedSettings) => {
        const current = ChessinsperCore.normalizeSettings(getConfigValue(configKeys.chessinsper, profile));
        return !!getConfigValue(configKeys.autoMove, profile) && current.enabled
            && chessinsperOwnsTab(profile) && chessinsperBehavior(profile).controller.canMove()
            && !ChessinsperBehavior.readPage(document, getBoardOrientation()).gameOver
            && (!plannedSettings || ChessinsperCore.behaviorSignature(current) === ChessinsperCore.behaviorSignature(plannedSettings));
    },
    persona: profile => chessinsperBehavior(profile).controller.context().hardwarePersona,
    onConfirmed: packet => {
        chessinsperBehavior(packet.profile).controller.recordMove(packet);
        CommLink.commands.chessinsperMoveConfirmed({
            profile: packet.profile, move: packet.move, fen: packet.fen, cpLoss: packet.cpLoss, isBest: packet.isBest, role: 'own'
        });
    }
});

CommLink.registerListener(`backend_${commLinkInstanceID}`, packet => {
    try {
        switch(packet.command) {
            case 'ping':
                return `pong (took ${Date.now() - packet.date}ms)`;
            case 'getFen':
                return getFen();
            case 'chessinsperContext': {
                const profile = packet.data?.profile || chessinsperActiveProfile;
                const entry = profile ? chessinsperBehavior(profile) : null;
                if(entry && chessinsperOwnsTab(profile)) entry.controller.observe(chessinsperSnapshot());
                return { ...getChessinsperContext(), ...(entry?.controller.context() || {}) };
            }
            case 'chessinsperMove': {
                if(!packet.data?.profile || !chessinsperOwnsTab(packet.data.profile)) return false;
                const entry = chessinsperBehavior(packet.data.profile);
                entry.controller.observe(chessinsperSnapshot());
                entry.controller.recordAnalysis(packet.data);
                if(!entry.controller.canMove()) return true;
                if(getConfigValue(configKeys.autoMoveAfterUser, packet.data?.profile)) {
                    const first = chessinsperFirstPositions.get(packet.data.profile);
                    const position = packet.data.fen?.split(' ').slice(0, 2).join(' ');
                    if(!first) chessinsperFirstPositions.set(packet.data.profile, position);
                    if(!first || first === position) return true;
                }
                chessinsperInput.run(packet.data).then(result => {
                    if(debugModeActivated) console.debug('Chessinsper input', result);
                });
                return true;
            }
            case 'updateDynamicContext':
                if(!packet.data || typeof packet.data !== 'object' || Array.isArray(packet.data)) return false;
                if(packet.data.fen && packet.data.fen !== gameState?.fen?.full) return false;
                return updateUserscriptDynamicContext({ ...packet.data, gameStart: 0 });
            case 'renderVisualsToSite':
                if(Array.isArray(packet.data) && packet.data[0]?.category === 'feedback') {
                    if(packet.data[0].feedbackFen && packet.data[0].feedbackFen !== gameState?.fen?.full) return false;
                    renderStuffToBoard(packet.data);
                    return true;
                }
                renderStuffToBoard(packet.data);
                handleAutoMove(packet.data);

                matchFirstSuggestionGiven = true;

                return true;
            case 'updateRestartListener':
                createInputListener('instanceRestart', packet.data, () => {
                    CommLink.commands.forceInstanceRestart();
                });
                return true;
            case 'updateConcealAssistanceListener':
                createInputListener('concealAssistance', packet.data, toggleConcealAssistance);
                return true;
            case 'applyAssistanceConcealment':
                applyAssistanceConcealment(packet.data);
                return true;
        }
    } catch(e) {
        return null;
    }
});

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function getChessgroundCoordsFromPiece(pieceElem) {
    const key = pieceElem?.cgKey;

    if(key) return chessCoordinatesToIndex(key);

    if(!pieceElem || !chessBoardElem || !lastBoardOrientation) return;

    const [x, y] = extractElemTransformData(pieceElem) || [];
    const squareSize = chessBoardElem.clientWidth / 8;

    if(x == null || y == null || !squareSize) return;

    const file = Math.round(x / squareSize);
    const rank = Math.round(y / squareSize);

    if(
        file < 0 || file > 7 ||
        rank < 0 || rank > 7 ||
        Math.abs(x - file * squareSize) > 1 ||
        Math.abs(y - rank * squareSize) > 1
    ) return;

    return lastBoardOrientation === 'w'
        ? [file, 7 - rank]
        : [7 - file, rank];
}

function createInputListener(listenerType, targetValue, callback) {
    if(typeof listenerType !== 'string' || typeof targetValue !== 'string' || !callback) return;

    const existingIndex = activeInputListeners
        .findIndex(l => l.listenerType === listenerType);

    if(existingIndex !== -1) {
        const existing = activeInputListeners[existingIndex];
        if(existing.targetValue === targetValue) return;

        existing.listeners.forEach(({ type, fn }) => document.removeEventListener(type, fn));
        activeInputListeners.splice(existingIndex, 1);
    }

    let holdTimer = null;
    let lastTapTime = 0;
    const dblTapThreshold = 300;
    const listeners = [];

    const addListener = (type, fn) => {
        document.addEventListener(type, fn);
        listeners.push({ type, fn });
    };

    addListener('keydown', (e) => {
        if(!targetValue.startsWith("Interact") && e.code === targetValue)
            callback(e);
    });

    const startPress = (e) => {
        if(!targetValue.startsWith("Interact")) return;

        const match = targetValue.match(/^InteractLongPress(\d+)$/);
        if(match) holdTimer = setTimeout(() => {
            callback(e); holdTimer = null;
        }, parseInt(match[1], 10) * 1000);

        if(targetValue === "InteractDoubleClick" && e.type.startsWith("touch")) {
            const now = performance.now();
            if(now - lastTapTime < dblTapThreshold) {
                callback(e);
                lastTapTime = 0;
            }
            else lastTapTime = now;
        }
    };

    const endPress = () => { if(holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
    }};

    addListener('mousedown', startPress);
    addListener('mouseup', endPress);
    addListener('touchstart', startPress);
    addListener('touchend', endPress);
    addListener('dblclick', (e) => {
        if(targetValue === "InteractDoubleClick") callback(e);
    });

    activeInputListeners.push({
        listenerType,
        targetValue,
        callback,
        listeners
    });
}

function maybeAnnounceMarkingsToPage() {
    if(!runningOnDevPage || typeof unsafeWindow === 'undefined') return;

    const markings = activeVisuals
        .map(({ marking }) => marking)
        .filter(marking =>
            marking?.category === 'move' &&
            !marking.isOpponent &&
            !marking.isFuture
        );

    let selectedMarking = null;

    if(markings.length > 0) {
        const marking = markings.length === 1
            ? markings[0]
            : markings[Math.floor(Math.random() * markings.length)];

        selectedMarking = [marking.from, marking.to];
    }

    unsafeWindow.postMessage({
        name: 'bestMoveArr',
        value: selectedMarking
    });
}

async function makeMove(profile, fenMoveArr, isLegit) {
    const move = new AutomaticMove({
        profile,
        fenMoveArr,
        isLegit,
        pieceAmount: getPieceAmount(),
        moveDomCoords: fenCoordArrToDomCoord(fenMoveArr),
        isPromotion: isPawnPromotion(fenMoveArr),
        legitModeType: getConfigValue(configKeys.legitModeType, profile),
        debugModeActivated: debugModeActivated,
        getRandomOwnPieceDomCoord: getRandomOwnPieceDomCoord,
        lastPieceSize: lastPieceSize,
        lastMoveRequestTime: lastMoveRequestTime,
        boardMatrix: getBoardMatrix(),
        domain: domain
    }, e => {
        // This is ran when the move finished

        if(debugModeActivated) {
            console.warn('Move', fenMoveArr, move.id, 'finished', 'for profile:', profile);
        }
    });
}

function getChessinsperContext() {
    const clockElem = document.querySelector('.clock-bottom .clock-time-monospace, .clock-bottom, .rclock-bottom .time');
    const text = clockElem?.textContent?.trim() || '';
    const match = text.match(/^(?:(\d+):)?(\d+):(\d+(?:\.\d+)?)$/);
    const clockSeconds = match ? Number(match[1] || 0)*3600 + Number(match[2])*60 + Number(match[3]) : null;
    const timeControl = document.querySelector('[data-cy="time-control"], .time-control, .game-controls-clock')?.textContent?.trim() || null;
    const ratingText = document.querySelector('.player-top .user-tagline-rating, .player-top [data-cy="user-rating"], .player-top .rating, .ruser-top .rating')?.textContent || '';
    const ratingMatch = ratingText.match(/\b(\d{3,4})\b/);
    return { clockSeconds, timeControl, playerColor: getBoardOrientation(), opponentRating: ratingMatch ? Number(ratingMatch[1]) : null };
}


function handleAutoMove(markings) {
    if(!Array.isArray(markings) || !markings.length) {
        return;
    }

    const filteredMarkings = markings.filter(marking =>
        marking?.category === 'move' &&
        !marking.isOpponent &&
        !marking.isFuture
    );

    if(!filteredMarkings.length) {
        return;
    }

    const profileID = filteredMarkings[0]?.profileID;
    if(filteredMarkings[0]?.chessinsperHandled) return;
    const isAutoMove = getConfigValue(configKeys.autoMove, profileID);

    const isAutoMoveAfterUser = getConfigValue(configKeys.autoMoveAfterUser, profileID);

    if(isAutoMove && (!isAutoMoveAfterUser || matchFirstSuggestionGiven)) {
        AutomaticMove.stopAll();

        const isLegit = getConfigValue(configKeys.autoMoveLegit, profileID);
        const isRandom = getConfigValue(configKeys.autoMoveRandom, profileID);

        const marking = isRandom
            ? filteredMarkings[
                Math.floor(
                    Math.random() * Math.random() * filteredMarkings.length
                )
            ]
            : filteredMarkings[0];

        const move = [marking.from, marking.to];

        makeMove(profileID, move, isLegit);
    }
}

const feedbackVisualRevisions = new Map();

function renderStuffToBoard(markings) {
    if(!BoardDrawer || !Array.isArray(markings) || !markings.length) {
        return;
    }

    const profileID = markings[0]?.profileID;
    const category = markings[0]?.category;

    // A rating can cross the CommLink after another move has already reached
    // the DOM. Never draw it (or clear newer feedback) on that newer position.
    if(category === 'feedback' && markings[0]?.feedbackFen
        && markings[0].feedbackFen !== gameState?.fen?.full) return;
    if(category === 'feedback' && markings[0]?.feedbackFen
        && markings[0].feedbackFen.split(' ')[0] !== getFen(true)) return;
    if(category === 'feedback' && Number.isFinite(markings[0]?.feedbackRevision)) {
        const revision = markings[0].feedbackRevision;
        // Settings can produce a replacement/clear on the SAME board. A late
        // packet must not undo a newer toggle or resurrect its old rating.
        if(revision <= (feedbackVisualRevisions.get(profileID) || 0)) return;
        feedbackVisualRevisions.set(profileID, revision);
    }

    clearVisuals({
        profileID,
        category
    });

    markings.forEach(marking => {
        const {
            shapeType,
            shapeSquare,
            shapeConfig,
            forceHoverOnly,
            bringToFront,
            from
        } = marking || {};

        if(!shapeType || !shapeSquare || !shapeConfig) {
            return;
        }

        const shape = BoardDrawer.createShape(
            shapeType,
            shapeSquare,
            shapeConfig
        );

        if(!shape) {
            return;
        }

        if(marking.feedbackDescription) {
            shape.setAttribute('aria-label', marking.feedbackDescription);
            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = marking.feedbackDescription;
            shape.appendChild(title);
        }

        let hoverListener = null;

        if(forceHoverOnly && from) {
            hoverListener = BoardDrawer.addSquareListener(
                from,
                type => {
                    if(type === 'enter') {
                        shape.style.display = 'inherit';
                    } else if(type === 'leave') {
                        shape.style.display = 'none';
                    }
                }
            );
        }

        if(bringToFront) {
            shape.parentElement?.appendChild(shape);
        }

        activeVisuals.push({
            marking,
            shape,
            hoverListener
        });
    });

    maybeAnnounceMarkingsToPage();
}

function clearVisuals({
    noMetricsRemoval = false,
    profileID = null,
    category = null
} = {}) {
    const shouldRemove = marking => {
        if(profileID && marking?.profileID !== profileID) {
            return false;
        }

        if(category && marking?.category !== category) {
            return false;
        }

        if(noMetricsRemoval && marking?.category === 'metric') {
            return false;
        }

        return true;
    };

    const removalArr = activeVisuals.filter(
        item => shouldRemove(item.marking)
    );

    activeVisuals = activeVisuals.filter(
        item => !shouldRemove(item.marking)
    );

    removalArr.forEach(({ shape, hoverListener }) => {
        hoverListener?.remove();
        shape?.remove();
    });
}

function displayImportantNotification(title, text) {
    if(typeof GM_notification === 'function') {
        GM_notification({ title: title, text: text });
    } else {
        alert(`[${title}]` + '\n\n' + text);
    }
}

function filterInvisibleElems(elementArr, inverse) {
    return [...elementArr].filter(elem => {
        const style = getComputedStyle(elem);
        const bounds = elem.getBoundingClientRect();

        const isHidden =
            style.visibility === 'hidden' ||
            style.display === 'none' ||
            style.opacity === '0' ||
            bounds.width == 0 ||
            bounds.height == 0;

        return inverse ? isHidden : !isHidden;
    });
}

function getElementSize(elem) {
    const rect = elem.getBoundingClientRect();

    if(rect.width !== 0 && rect.height !== 0) {
        return { width: rect.width, height: rect.height };
    }

    const computedStyle = window.getComputedStyle(elem);
    const width = parseFloat(computedStyle.width);
    const height = parseFloat(computedStyle.height);

    return { width, height };
}

function extractElemTransformData(elem) {
    const computedStyle = window.getComputedStyle(elem);
    const transformMatrix = new DOMMatrix(computedStyle.transform);

    const x = transformMatrix.e;
    const y = transformMatrix.f;

    return [x, y];
}

function getElemCoordinatesFromTransform(elem, config) {
    const onlyFlipX = config?.onlyFlipX;
    const onlyFlipY = config?.onlyFlipY;

    lastBoardSize = getElementSize(chessBoardElem);

    getBoardDimensions(); // getBoardDimensions() keeps lastBoardRanks/lastBoardFiles in sync.

    const boardOrientation = getBoardOrientation();

    let [x, y] = extractElemTransformData(elem);

    const boardDimensions = lastBoardSize;
    const squareWidth = boardDimensions.width / lastBoardRanks;
    const squareHeight = boardDimensions.height / lastBoardFiles;

    const normalizedX = Math.round(x / squareWidth);
    const normalizedY = Math.round(y / squareHeight);

    if(onlyFlipY || boardOrientation === 'w') {
        const flippedY = lastBoardFiles - normalizedY - 1;

        return [normalizedX, flippedY];
    } else {
        const flippedX = lastBoardRanks - normalizedX - 1;

        return [flippedX, normalizedY];
    }
}

function getElemCoordinatesFromLeftBottomPercentages(elem) {
    if(!lastBoardRanks || !lastBoardFiles) getBoardDimensions();

    const boardOrientation = getBoardOrientation();

    const leftPercentage = parseFloat(elem.style.left?.replace('%', ''));
    const bottomPercentage = parseFloat(elem.style.bottom?.replace('%', ''));

    const x = Math.max(Math.round(leftPercentage / (100 / lastBoardRanks)), 0);
    const y = Math.max(Math.round(bottomPercentage / (100 / lastBoardFiles)), 0);

    if (boardOrientation === 'w') {
        return [x, y];
    } else {
        const flippedX = lastBoardRanks - (x + 1);
        const flippedY = lastBoardFiles - (y + 1);

        return [flippedX, flippedY];
    }
}

function getElemCoordinatesFromLeftTopPixels(elem) {
    const pieceSize = getElementSize(elem);

    lastPieceSize = pieceSize;

    if(!lastBoardRanks || !lastBoardFiles) getBoardDimensions();

    const leftPixels = parseFloat(elem.style.left?.replace('px', ''));
    const topPixels = parseFloat(elem.style.top?.replace('px', ''));

    const x = Math.max(Math.round(leftPixels / pieceSize.width), 0);
    const y = Math.max(Math.round(topPixels / pieceSize.height), 0);

    const boardOrientation = getBoardOrientation();

    if (boardOrientation === 'w') {
        const flippedY = lastBoardFiles - (y + 1);

        return [x, flippedY];
    } else {
        const flippedX = lastBoardRanks - (x + 1);

        return [flippedX, y];
    }
}

function updateChesscomVariantPlayerColorsTable() {
    let colors = [];

    document.querySelectorAll('*[data-color]').forEach(pieceElem => {
        const colorCode = Number(pieceElem?.dataset?.color);

        if(!colors?.includes(colorCode)) {
            colors.push(colorCode);
        }
    });

    if(colors?.length > 1) {
        colors = colors.sort((a, b) => a - b);

        chesscomVariantPlayerColorsTable = { [colors[0]]: 'w', [colors[1]]: 'b' };
    }
}

function getBoardDimensionsFromSize() {
    const boardDimensions = getElementSize(chessBoardElem);

    lastBoardSize = boardDimensions;

    const boardWidth = boardDimensions?.width;
    const boardHeight = boardDimensions.height;

    const boardPiece = getPieceElem();

    if(boardPiece) {
        const pieceDimensions = getElementSize(boardPiece);

        lastPieceSize = getElementSize(boardPiece);

        const boardPieceWidth = pieceDimensions?.width;
        const boardPieceHeight = pieceDimensions?.height;

        const boardRanks = Math.floor(boardWidth / boardPieceWidth);
        const boardFiles = Math.floor(boardHeight / boardPieceHeight);

        const ranksInAllowedRange = 0 < boardRanks && boardRanks <= 69;
        const filesInAllowedRange = 0 < boardFiles && boardFiles <= 69;

        if(ranksInAllowedRange && filesInAllowedRange) {
            return [boardRanks, boardFiles];
        }
    }
}

function chessCoordinatesToIndex(coord) {
    const x = coord.charCodeAt(0) - 97;
    let y = null;

    const lastHalf = coord.slice(1);

    if(lastHalf === ':') {
        y = 9;
    } else {
        y = Number(coord.slice(1)) - 1;
    }

    return [x, y];
}

/* Need to make the board matricies more cohesive, right now it's really confusing flipping them
    * differently for each function. I just can't be bothered right now so please don't make fun of it.
    * Thanks, Haka
    * */

function chessCoordinatesToMatrixIndex(coord) {
    const [boardRanks, boardFiles] = getBoardDimensions();
    const indexArr = chessCoordinatesToIndex(coord);

    let x, y;

    y = boardFiles - (indexArr[1] + 1);
    x = indexArr[0];

    return [x, y];
}

function chessCoordinatesToDomIndex(coord) {
    const [boardRanks, boardFiles] = getBoardDimensions();
    const indexArr = chessCoordinatesToIndex(coord);
    const boardOrientation = getBoardOrientation();

    let x, y;

    if(boardOrientation === 'w') {
        x = indexArr[0];
        y = boardFiles - (indexArr[1] + 1);
    } else {
        x = boardRanks - (indexArr[0] + 1);
        y = indexArr[1];
    }

    return [x, y];
}

function indexToChessCoordinates(coord) {
    const [boardRanks, boardFiles] = getBoardDimensions();

    const [x, y] = coord;
    const file = String.fromCharCode('a'.charCodeAt(0) + x);

    const rank = boardFiles - y;

    return `${file}${rank}`;
}

function isPawnPromotion(bestMove) {
    const [fenCoordFrom, fenCoordTo] = bestMove;
    const piece = getBoardPiece(fenCoordFrom);

    if(typeof piece !== 'string' || piece.toLowerCase() !== 'p')
        return false;

    const endingRow = chessCoordinatesToIndex(fenCoordTo)[1] + 1;

    // Check if the pawn reaches the promotion row
    if ((piece === 'P' && endingRow === (lastBoardFiles ?? 8)) || (piece === 'p' && endingRow === 1)) {
        return true;
    }

    return false;
}

function isPawnOnPromotionSquareFen(fenStr) {
    if(!fenStr || typeof fenStr !== 'string') return false;

    const board = fenStr.split(' ')[0];
    if(!board) return false;

    const ranks = board.split('/');

    return ranks[0]?.includes('P') || ranks[ranks.length - 1]?.includes('p');
}

function fenCoordArrToDomCoord(fenCoordArr) {
    // fenCoordArr e.g. ["e6", "e5"]

    const boardClientRect = chessBoardElem.getBoundingClientRect();

    const pieceElem = getPieceElem();
    const pieceDimensions = getElementSize(pieceElem);
    const pieceWidth = pieceDimensions?.width;
    const pieceHeight = pieceDimensions?.height;

    lastPieceSize = pieceDimensions;

    const [boardRanks, boardFiles] = getBoardDimensions();

    // Array to hold the center coordinates of each square
    const centerCoordinates = fenCoordArr.map(coord => {
        const [x, y] = chessCoordinatesToDomIndex(coord);

        const centerX = boardClientRect.x + (x * pieceWidth) + (pieceWidth / 2);
        const centerY = boardClientRect.y + (y * pieceHeight) + (pieceHeight / 2);

        return [centerX, centerY];
    });

    return centerCoordinates;
}

function coordinatesFromMoves(board, piecePos, moves, isPieceWhite) { // piecePos [x, y], moves [[x, y], ...]
    const result = [];

    for(let i = 0; i < moves.length; i++) {
        const x = piecePos[0] + moves[i][0];
        const y = piecePos[1] + moves[i][1];
        const square = board?.[y]?.[x];

        if(!square) continue;

        if(square === 1) {
            result.push([x, y]);
        } else {
            const squareIsWhite = square === square.toUpperCase();

            if(squareIsWhite !== isPieceWhite)
                result.push([x, y]);
        }
    }

    return result;
}

// Called by addMovesOnDemandListeners()
function getPiecePaths(board, piecePos, pieceFen, isPieceWhite) {
    const [xPos, yPos] = piecePos;

    if(!pieceFen || typeof pieceFen !== 'string') return;

    const pieceType = pieceFen.toUpperCase();

    const isLinearMovingPiece = pieceType === 'R' || pieceType === 'Q';
    const isDiagonalMovingPiece = pieceType === 'B' || pieceType === 'Q';

    const boardHeight = board.length;
    const boardWidth = board[0]?.length || 0;
    const longerBoardSide = Math.max(boardWidth, boardHeight);
    const shorterBoardSide = Math.min(boardWidth, boardHeight);

    function cast(directions, length) {
        const moves = [];

        for(let direction of directions) {
            for(let i = 1; i < length; i++) {
                const x = xPos + direction[0] * i;
                const y = yPos + direction[1] * i;

                const square = board?.[y]?.[x];
                if(!square) break;

                if(square === 1) {
                    moves.push([x, y]);
                } else {
                    const squareIsWhite = square === square.toUpperCase();

                    if(squareIsWhite !== isPieceWhite) {
                        moves.push([x, y]);
                        break;
                    } else
                        break;
                }
            }
        }

        return moves;
    }

    function castDiagonal() {
        return cast(
            [
                [1, -1], [-1, -1], // top right, top left
                [1, 1], [-1, 1]    // bottom right, bottom left
            ],
            shorterBoardSide
        );
    }

    function castStraight() {
        return cast(
            [
                [0, -1], [0, 1], // top, bottom
                [-1, 0], [1, 0]  // left, right
            ],
            longerBoardSide
        );
    }

    if(pieceType === 'P') {
        const direction = isPieceWhite ? [[-1, -1], [1, -1], [0, -1], [0, -2]] : [[-1, 1], [1, 1], [0, 1], [0, 2]];
        return coordinatesFromMoves(board, piecePos, direction, isPieceWhite);
    }

    if(pieceType === 'N') {
        return coordinatesFromMoves(board, piecePos, [
            [-2, -1], [-2, 1], [2, -1], [2, 1],
            [-1, -2], [-1, 2], [1, -2], [1, 2]
        ], isPieceWhite);
    }

    if(pieceType === 'K') {
        return coordinatesFromMoves(board, piecePos, [
            [-1, 0], [-2, 0], [1, 0], [2, 0], [0, -1],
            [0, 1], [-1, -1], [1, 1], [-1, 1], [1, -1]
        ], isPieceWhite);
    }

    if(pieceType === 'B') return castDiagonal();
    if(pieceType === 'R') return castStraight();
    if(pieceType === 'Q') return [...castDiagonal(), ...castStraight()];

    return [0, 0];
}

function addMovesOnDemandListeners() {
    let lastProcessedSquareFen = null;

    if(!BoardDrawer) return;

    function handle() {
        if((lastProcessedSquareFen !== modLastEnteredSquare.squareFen) || !modLastEnteredSquare.squareFen) {
            const lastIdx = modLastEnteredSquare.squareIndex;

            if(!modLastEnteredSquare.squareFen && lastIdx) {
                const lastPieceFen = modLastEnteredSquare.pieceFen;

                modLastEnteredSquare.squareFen = indexToChessCoordinates(lastIdx);
                modLastEnteredSquare.pieceFen = lastBoardMatrix?.[lastIdx?.[1]]?.[lastIdx?.[0]];

                if(lastPieceFen === 1) return;
            }

            lastProcessedSquareFen = modLastEnteredSquare.squareFen;

            const pieceFen = modLastEnteredSquare.pieceFen;
            const isPieceWhite = pieceFen >= 'A' && pieceFen <= 'Z';
            const isPlayerPiece = (lastBoardOrientation === 'w') === isPieceWhite;

            if(!pieceFen) return;

            const legalMovesArr = getPiecePaths(lastBoardMatrix, modLastEnteredSquare.squareIndex, pieceFen, isPieceWhite)
                ?.map(pathArr => lastProcessedSquareFen + indexToChessCoordinates(pathArr));

            if(legalMovesArr?.length > 0)
                CommLink.commands.calculateSpecificMoves({ 'moves': legalMovesArr, 'isOpponent': !isPlayerPiece });
        }
    }

    // Clear existing listeners
    modListeners.forEach(({ type, handler }) => {
        document.removeEventListener(type, handler);
    }); modListeners.length = 0;

    modDrawerListeners.forEach(x => x?.remove());
    modDrawerListeners.length = 0;

    const mouseDownHandler = () => handle(true);
    const touchStartHandler = () => handle(true);

    [
        ['mousedown', mouseDownHandler],
        ['touchstart', touchStartHandler]
    ].forEach(([type, handler]) => {
        document.addEventListener(type, handler);
        modListeners.push({ type, handler });
    });

    for (let y = 0; y < lastBoardMatrix.length; y++)
        for (let x = 0; x < lastBoardMatrix[y].length; x++) {
                const squareFen = indexToChessCoordinates([x, y]);

                const squareListener = BoardDrawer.addSquareListener(squareFen, type => {
                    if(!isMovesOnDemandActive) return;

                    switch(type) {
                        case 'enter':
                            modLastEnteredSquare.pieceFen = lastBoardMatrix[y][x];
                            modLastEnteredSquare.squareFen = squareFen;
                            modLastEnteredSquare.squareIndex = [x, y];

                            break;
                    }
                });

                modDrawerListeners.push(squareListener);
            }
}

function getRandomOwnPieceDomCoord(fenCoord, boardMatrix) {
    let [x, y] = chessCoordinatesToMatrixIndex(fenCoord);

    const pieceAtFenCoord = boardMatrix[y][x];

    if(pieceAtFenCoord === 1) {
        return null;
    }

    const isWhitePiece = pieceAtFenCoord === pieceAtFenCoord.toUpperCase();

    const getDistance = (row1, col1, row2, col2) => {
        return Math.abs(row1 - row2) + Math.abs(col1 - col2);
    };

    let candidatePieces = [];

    // Loop through the board matrix to find all close own pieces
    for(let row = 0; row < boardMatrix.length; row++) {
        for(let col = 0; col < boardMatrix[row].length; col++) {
            const currentPiece = boardMatrix[row][col];

            // Skip if no piece is found or if the piece is of the wrong color
            if(currentPiece === 1 || (isWhitePiece && currentPiece === currentPiece.toLowerCase()) || (!isWhitePiece && currentPiece === currentPiece.toUpperCase())) {
                continue;
            }

            const distance = getDistance(y, x, row, col);

            if(distance < 6) {
                candidatePieces.push({ distance, coord: [col, row], piece: currentPiece });
            }
        }
    }

    if(candidatePieces.length > 0) {
        // Choose a random piece from the candidates
        const randomIndex = Math.floor(Math.random() * candidatePieces.length);
        const chosenPiece = candidatePieces[randomIndex];

        return fenCoordArrToDomCoord([indexToChessCoordinates(chosenPiece.coord)])[0];
    }

    return null;
}

function getPieceAmount() {
    return getPieceElem(true)?.length ?? 0;
}

function isBoardDrawerNeeded() {
    return withDynamicSettings(() => {
        const config = GM_getValue(dbValues.AcasConfig);
        const gP = config?.global?.['profiles'];
        const iP = config?.instance?.[commLinkInstanceID]?.['profiles'];
        if(config?.global?.[configKeys.isUserscriptGhost]) return false;

        function check(cfg) {
            if(!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) return false;
            for(const profile of Object.values(cfg)) {
                if(!profile || typeof profile !== 'object' || Array.isArray(profile)) continue;
                const externalMoves = profile[configKeys.displayMovesOnExternalSite];
                const renderingNeeded = profile[configKeys.renderOnExternalSite];
                const feedbackNeeded = profile[configKeys.feedbackOnExternalSite];
                const movesOnDemand = profile[configKeys.movesOnDemand];
                const curves = profile.dynamicSettings;
                const mayEnableDynamically = curves && typeof curves === 'object' && !Array.isArray(curves)
                    && [configKeys.displayMovesOnExternalSite, configKeys.renderOnExternalSite,
                        configKeys.feedbackOnExternalSite, configKeys.movesOnDemand].some(key => {
                        const curve = curves[key];
                        return curve && typeof curve === 'object' && !Array.isArray(curve) && curve.enabled;
                    });

                if(externalMoves || renderingNeeded || feedbackNeeded || movesOnDemand || mayEnableDynamically) return true;
            }
            return false;
        }

        return check(gP) || check(iP);
    }, () => false);
}

function squeezeEmptySquares(fenStr) {
    return fenStr.replace(/1+/g, match => match.length);
}

function getFenPieceColor(pieceFenStr) {
    return pieceFenStr == pieceFenStr.toUpperCase() ? 'w' : 'b';
}

function getFenPieceOppositeColor(pieceFenStr) {
    return getFenPieceColor(pieceFenStr) == 'w' ? 'b' : 'w';
}

function convertPieceStrToFen(str) {
    if(!str || str.length !== 2) {
        return null;
    }

    const firstChar = str[0].toLowerCase();
    const secondChar = str[1];

    if(firstChar === 'w') {
        return secondChar.toUpperCase();
    } else if (firstChar === 'b') {
        return secondChar.toLowerCase();
    }

    return null;
}

function getCanvasPixelColor(canvas, [xPercentage, yPercentage], debug) {
    const ctx = canvas.getContext('2d');

    const x = xPercentage * canvas.width;
    const y = yPercentage * canvas.height;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixel = imageData.data;
    const brightness = (pixel[0] + pixel[1] + pixel[2]) / 3;

    if(debug) {
        const clonedCanvas = document.createElement('canvas');
                clonedCanvas.width = canvas.width;
                clonedCanvas.height = canvas.height;

        const clonedCtx = clonedCanvas.getContext('2d');
                clonedCtx.drawImage(canvas, 0, 0);

        clonedCtx.fillStyle = 'red';
        clonedCtx.beginPath();
        clonedCtx.arc(x, y, 1, 0, Math.PI * 2);
        clonedCtx.fill();

        const dataURL = clonedCanvas.toDataURL();
    }

    return brightness < 128 ? 'b' : 'w';
}

function canvasHasPixelAt(canvas, [xPercentage, yPercentage], debug) {
    xPercentage = Math.min(Math.max(xPercentage, 0), 100);
    yPercentage = Math.min(Math.max(yPercentage, 0), 100);

    const ctx = canvas.getContext('2d');
    const x = xPercentage * canvas.width;
    const y = yPercentage * canvas.height;

    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixel = imageData.data;

    if(debug) {
        const clonedCanvas = document.createElement('canvas');
                clonedCanvas.width = canvas.width;
                clonedCanvas.height = canvas.height;

        const clonedCtx = clonedCanvas.getContext('2d');
                clonedCtx.drawImage(canvas, 0, 0);

        clonedCtx.fillStyle = 'red';
        clonedCtx.beginPath();
        clonedCtx.arc(x, y, 1, 0, Math.PI * 2);
        clonedCtx.fill();

        const dataURL = clonedCanvas.toDataURL();
    }

    return pixel[3] !== 0;
}

function getSiteData(dataType, obj) {
    const pathname = window.location.pathname;

    let dataObj = { pathname };

    if(obj && typeof obj === 'object') {
        dataObj = { ...dataObj, ...obj };
    }

    const dataHandlerFunction = supportedSites[domain]?.[dataType];

    if(typeof dataHandlerFunction !== 'function') {
        return null;
    }

    const result = dataHandlerFunction(dataObj);

    return result;
}

function addSupportedChessSite(domains, typeHandlerObj) {
    const domainList = Array.isArray(domains) ? domains : [domains];

    domainList.forEach(domain => {
        supportedSites[domain] = typeHandlerObj;
    });
}

function getBoardElem() {
    const boardElem = getSiteData('boardElem');

    return boardElem || null;
}

function getPieceElem(getAll) {
    const boardElem = getBoardElem();

    const boardQuerySelector = (getAll ? query => {
      const elems = boardElem?.querySelectorAll(query);
      return elems?.length ? [...elems] : null;
    } : boardElem?.querySelector?.bind(boardElem));

    if(typeof boardQuerySelector !== 'function')
        return null;

    const pieceElem = getSiteData('pieceElem', { boardQuerySelector, getAll });

    return pieceElem || null;
}

function getSquareElems(element) {
    const squareElems = getSiteData('squareElems', { element });

    return squareElems || null;
}

function getChessVariant() {
    const chessVariant = getSiteData('chessVariant');

    return chessVariant || null;
}

function getBoardOrientation() {
    const boardOrientation = getSiteData('boardOrientation');

    return boardOrientation || null;
}

function getPieceElemFen(pieceElem) {
    const pieceFen = getSiteData('pieceElemFen', { pieceElem });

    return pieceFen || null;
}

// this function gets called a lot, needs to be optimized
function getPieceElemCoords(pieceElem) {
    const pieceCoords = getSiteData('pieceElemCoords', { pieceElem });

    return pieceCoords || null;
}

function getBoardDimensions() {
    const boardDimensionArr = getSiteData('boardDimensions');

    if(boardDimensionArr) {
        lastBoardRanks = boardDimensionArr[0];
        lastBoardFiles = boardDimensionArr[1];

        return boardDimensionArr;
    } else {
        lastBoardRanks = 8;
        lastBoardFiles = 8;

        return [8, 8];
    }
}

function isMutationNewMove(mutationArr) {
    return getSiteData('isMutationNewMove', { mutationArr }) || false;
}

function getBoardMatrix() {
    const [boardRanks, boardFiles] = getBoardDimensions();

    const board = Array.from({ length: boardFiles }, () => Array(boardRanks).fill(1));
    const pieceElems = getPieceElem(true);
    const isValidPieceElemsArray = Array.isArray(pieceElems) || pieceElems instanceof NodeList;

    if(isValidPieceElemsArray) {
        pieceElems.forEach(pieceElem => {
            try {
                const pieceFenCode = getPieceElemFen(pieceElem);
                const pieceCoordsArr = getPieceElemCoords(pieceElem);

                if(typeof pieceFenCode !== 'string' || !pieceFenCode) return;

                const [xIdx, yIdx] = pieceCoordsArr;

                board[boardFiles - (yIdx + 1)][xIdx] = pieceFenCode;
            } catch(e) {
                if(debugModeActivated) console.error(e);
            }
        });
    }

    lastBoardMatrix = board;

    return board;
}

function getBoardPiece(fenCoord, boardMatrix) {
    const [boardRanks, boardFiles] = getBoardDimensions();
    const indexArr = chessCoordinatesToIndex(fenCoord);

    const matrix = boardMatrix ?? getBoardMatrix();

    return matrix?.[boardFiles - (indexArr[1] + 1)]?.[indexArr[0]];
}

function getBasicFen(boardMatrix) {
    const matrix = boardMatrix ?? getBoardMatrix();

    return squeezeEmptySquares(matrix.map(x => x.join('')).join('/'));
}

function getFen(onlyBasic, turn, basicFenToUse, state = gameState) {
    const boardMatrix = getBoardMatrix();
    const basicFen = typeof basicFenToUse === 'string'
        ? basicFenToUse
        : getBasicFen(boardMatrix);

    if(onlyBasic) return basicFen;

    const sideToMove = turn || state.turn || 'w'; // whose turn it is

    // FEN structure: [fen] [player color] [castling rights] [en passant targets] [halfmove clock] [fullmove clock]
    return `${basicFen} ${sideToMove} ${state.castlingRights} ${state.enPassantTarget} ${state.halfmoveClock} ${state.fullmoveNumber}`;
}

function resetStoredMatchVariables() {
    chesscomVariantPlayerColorsTable = null;
    gameStateHistory.set(); // reset

    gameState = getGameStateObjTemplate();
    forceUpdateGameState();
}

function fenToBoard(basicFen) {
    const board = [];

    for(const row of basicFen.split('/')) {
        const boardRow = [];

        for(const char of row) {
            if(isNaN(char)) {
                boardRow.push(char);
            } else {
                boardRow.push(...Array(Number(char)).fill(''));
            }
        }

        board.push(boardRow);
    }

    return board;
}

function boardToFen(board) {
    return board.map(row => {
        let fenRow = '';
        let emptyCount = 0;

        for(const piece of row) {
            if(piece === '') {
                emptyCount++;
                continue;
            }

            if(emptyCount) {
                fenRow += emptyCount;
                emptyCount = 0;
            }

            fenRow += piece;
        }

        if(emptyCount) {
            fenRow += emptyCount;
        }

        return fenRow;
    }).join('/');
}

function getBoardChanges(lastBasicFen, newBasicFen, turn) {
    const changes = getBoardChangesObjTemplate();

    if(!lastBasicFen || !newBasicFen) {
        return changes;
    }

    const lastBoard = fenToBoard(lastBasicFen);
    const newBoard = fenToBoard(newBasicFen);

    const rows = newBoard.length;
    const cols = newBoard[0]?.length ?? 0;

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            const before = lastBoard[i]?.[j] ?? '';
            const after = newBoard[i]?.[j] ?? '';

            if(before === after) continue;

            changes.changedSquaresAmount++;

            const square =
                `${String.fromCharCode(97 + j)}${rows - i}`;

            if(before !== '') {
                changes.movedPieces.push(before);

                changes.removed.push({
                    square,
                    piece: before,
                    row: i,
                    col: j
                });
            }

            if(after !== '') {
                changes.added.push({
                    square,
                    piece: after,
                    row: i,
                    col: j
                });
            }
        }
    }

    changes.pieceAmountChange =
        changes.added.length - changes.removed.length;

    if(turn && changes.changedSquaresAmount !== 2) {
        changes.missedFen = getMissedFen(
            lastBoard,
            newBoard,
            changes,
            turn
        );
    }

    /*
        Castling:
        two pieces disappear and two pieces appear.
    */
    if(
        changes.removed.length === 2 &&
        changes.added.length === 2
    ) {
        const kingFrom = changes.removed.find(({ piece }) =>
            piece.toLowerCase() === 'k'
        );

        const kingTo = changes.added.find(({ piece }) =>
            piece.toLowerCase() === 'k'
        );

        if(kingFrom && kingTo) {
            changes.from = kingFrom.square;
            changes.to = kingTo.square;
            changes.movedPiece = kingFrom.piece;
        }
    }

    /*
        Normal move, capture, en passant, or promotion:
        exactly one piece appears.
    */
    if(!changes.to && changes.added.length === 1) {
        const destination = changes.added[0];

        changes.to = destination.square;

        const source = changes.removed.find(({ piece, square }) =>
            piece === destination.piece &&
            square !== changes.to
        );

        if(source) {
            changes.from = source.square;
            changes.movedPiece = source.piece;
        }

        /*
            Promotion:
            a pawn disappears and a non-pawn appears.
        */
        if(
            !changes.from &&
            destination.piece.toLowerCase() !== 'p'
        ) {
            const pawnSource = changes.removed.find(({ piece }) =>
                piece.toLowerCase() === 'p'
            );

            if(pawnSource) {
                changes.from = pawnSource.square;
                changes.movedPiece = pawnSource.piece;
                changes.isPromotion = true;
                changes.promotionPiece = destination.piece;
            }
        }
    }

    /*
        Normal capture:
        captured piece disappears from the destination square.
    */
    if(changes.to) {
        const capture = changes.removed.find(({ square }) =>
            square === changes.to
        );

        if(capture) {
            changes.capturedPiece = capture.piece;
            changes.capturedSquare = capture.square;
        }
    }

    /*
        En passant.
    */
    if (
        changes.movedPiece?.toLowerCase() === 'p' &&
        changes.removed.length === 2 &&
        changes.added.length === 1 &&
        !changes.capturedPiece
    ) {
        const capturedPawn = changes.removed.find(({ piece, square }) =>
            piece.toLowerCase() === 'p' &&
            square !== changes.from
        );

        if (capturedPawn) {
            changes.capturedPiece = capturedPawn.piece;
            changes.capturedSquare = capturedPawn.square;
            changes.isEnPassant = true;
        }
    }

    if(changes.movedPiece) {
        changes.movedPieceColor =
            changes.movedPiece === changes.movedPiece.toUpperCase()
                ? 'w'
                : 'b';
    }

    return changes;
}

// This function is enourmously large, I know. It's still in development.
function getMissedFen(lastBoard, newBoard, changes, turn) {
    const opponent = turn === 'w' ? 'b' : 'w';

    const turnRemoved = changes.removed.filter(({ piece }) =>
        getFenPieceColor(piece) === turn
    );

    const turnAdded = changes.added.filter(({ piece }) =>
        getFenPieceColor(piece) === turn
    );

    const opponentChanged = [
        ...changes.removed,
        ...changes.added
    ].some(({ piece }) =>
        getFenPieceColor(piece) === opponent
    );

    if(!turnRemoved.length || !opponentChanged) {
        return null;
    }

    /*
        ---------------------------------------------------------
        Same-square recapture
        ---------------------------------------------------------

        One of the opponent's removed pieces is the piece that
        was captured by the turn piece. It must be on the same
        square where the opponent's remaining piece ends up.

        The other opponent removal is the source of the
        recapturing piece.
    */
    if(
        turnRemoved.length === 1 &&
        turnAdded.length === 0
    ) {
        const opponentRemoved = changes.removed.filter(({ piece }) =>
            getFenPieceColor(piece) === opponent
        );

        const opponentAdded = changes.added.filter(({ piece }) =>
            getFenPieceColor(piece) === opponent
        );

        if(
            opponentRemoved.length === 2 &&
            opponentAdded.length === 1
        ) {
            const firstMover = turnRemoved[0];
            const opponentTo = opponentAdded[0];

            /*
                The captured opponent piece must have been on
                the destination square.
            */
            const captured = opponentRemoved.find(({ row, col }) =>
                row === opponentTo.row &&
                col === opponentTo.col
            );

            /*
                The other removed opponent piece is the piece
                that made the recapture.
            */
            const opponentFrom = opponentRemoved.find(({ row, col }) =>
                row !== opponentTo.row ||
                col !== opponentTo.col
            );

            if(captured && opponentFrom) {
                /*
                    The opponent must actually move its piece from
                    opponentFrom to opponentTo. This also prevents
                    accidentally treating two unrelated removals
                    as a recapture.
                */
                if(opponentFrom.piece === opponentTo.piece) {
                    const board = lastBoard.map(row => [...row]);

                    board[firstMover.row][firstMover.col] = '';
                    board[opponentTo.row][opponentTo.col] =
                        firstMover.piece;

                    let valid = true;
                    let opponentChanges = 0;
                    const checked = new Set();

                    for(const change of [
                        ...changes.removed,
                        ...changes.added
                    ]) {
                        const key = `${change.row}:${change.col}`;

                        if(checked.has(key)) {
                            continue;
                        }

                        checked.add(key);

                        const candidatePiece =
                            board[change.row]?.[change.col] ?? '';

                        const actualPiece =
                            newBoard[change.row]?.[change.col] ?? '';

                        if(candidatePiece === actualPiece) {
                            continue;
                        }

                        const candidateColor = candidatePiece
                            ? getFenPieceColor(candidatePiece)
                            : null;

                        const actualColor = actualPiece
                            ? getFenPieceColor(actualPiece)
                            : null;

                        /*
                            Opponent captures the turn piece on the
                            destination square.
                        */
                        if(
                            candidateColor === turn &&
                            actualColor === opponent
                        ) {
                            opponentChanges++;
                            continue;
                        }

                        /*
                            Opponent's original piece disappears
                            from its source square.
                        */
                        if(
                            candidateColor === opponent &&
                            !actualPiece
                        ) {
                            opponentChanges++;
                            continue;
                        }

                        /*
                            Generic opponent removal case.
                        */
                        if(
                            !candidatePiece &&
                            actualColor === opponent
                        ) {
                            opponentChanges++;
                            continue;
                        }

                        valid = false;
                        break;
                    }

                    if(valid && opponentChanges) {
                        return boardToFen(board);
                    }
                }
            }
        }
    }

    /*
        ---------------------------------------------------------
        Normal move / capture
        ---------------------------------------------------------
    */
    for(const from of turnRemoved) {
        for(const to of turnAdded) {
            if(from.piece !== to.piece) {
                continue;
            }

            if(from.row === to.row && from.col === to.col) {
                continue;
            }

            const board = lastBoard.map(row => [...row]);

            board[from.row][from.col] = '';
            board[to.row][to.col] = from.piece;

            let valid = true;
            let opponentChanges = 0;
            const checked = new Set();

            for(const change of [
                ...changes.removed,
                ...changes.added
            ]) {
                const key = `${change.row}:${change.col}`;

                if(checked.has(key)) {
                    continue;
                }

                checked.add(key);

                const candidatePiece =
                    board[change.row]?.[change.col] ?? '';

                const actualPiece =
                    newBoard[change.row]?.[change.col] ?? '';

                if(candidatePiece === actualPiece) {
                    continue;
                }

                const candidateColor = candidatePiece
                    ? getFenPieceColor(candidatePiece)
                    : null;

                const actualColor = actualPiece
                    ? getFenPieceColor(actualPiece)
                    : null;

                /*
                    Remaining difference must belong to opponent.
                */
                if(
                    candidateColor === turn &&
                    actualColor === opponent
                ) {
                    opponentChanges++;
                    continue;
                }

                if(
                    candidateColor === opponent &&
                    !actualPiece
                ) {
                    opponentChanges++;
                    continue;
                }

                if(
                    !candidatePiece &&
                    actualColor === opponent
                ) {
                    opponentChanges++;
                    continue;
                }

                valid = false;
                break;
            }

            if(valid && opponentChanges) {
                return boardToFen(board);
            }
        }
    }

    /*
        ---------------------------------------------------------
        Promotion
        ---------------------------------------------------------
    */
    for(const from of turnRemoved) {
        if(from.piece.toLowerCase() !== 'p') {
            continue;
        }

        for(const to of turnAdded) {
            if(to.piece.toLowerCase() === 'p') {
                continue;
            }

            const board = lastBoard.map(row => [...row]);

            board[from.row][from.col] = '';
            board[to.row][to.col] = to.piece;

            let valid = true;
            let opponentChanges = 0;
            const checked = new Set();

            for(const change of [
                ...changes.removed,
                ...changes.added
            ]) {
                const key = `${change.row}:${change.col}`;

                if(checked.has(key)) {
                    continue;
                }

                checked.add(key);

                const candidatePiece =
                    board[change.row]?.[change.col] ?? '';

                const actualPiece =
                    newBoard[change.row]?.[change.col] ?? '';

                if(candidatePiece === actualPiece) {
                    continue;
                }

                const candidateColor = candidatePiece
                    ? getFenPieceColor(candidatePiece)
                    : null;

                const actualColor = actualPiece
                    ? getFenPieceColor(actualPiece)
                    : null;

                if(
                    candidateColor === turn &&
                    actualColor === opponent
                ) {
                    opponentChanges++;
                    continue;
                }

                if(
                    candidateColor === opponent &&
                    !actualPiece
                ) {
                    opponentChanges++;
                    continue;
                }

                if(
                    !candidatePiece &&
                    actualColor === opponent
                ) {
                    opponentChanges++;
                    continue;
                }

                valid = false;
                break;
            }

            if(valid && opponentChanges) {
                return boardToFen(board);
            }
        }
    }

    /*
        ---------------------------------------------------------
        En passant
        ---------------------------------------------------------
    */
    if(
        turnRemoved.length === 1 &&
        turnAdded.length === 0 &&
        turnRemoved[0].piece.toLowerCase() === 'p'
    ) {
        const from = turnRemoved[0];

        const direction = turn === 'w' ? -1 : 1;
        const startRow = turn === 'w' ? 6 : 1;

        if(from.row === startRow) {
            const toRow = from.row + direction * 2;
            const middleRow = from.row + direction;

            /*
                The intermediate square must be empty in the
                current position because the pawn was captured.
            */
            if(
                lastBoard[middleRow][from.col] === '' &&
                newBoard[toRow][from.col] === ''
            ) {
                const board = lastBoard.map(row => [...row]);

                board[from.row][from.col] = '';
                board[toRow][from.col] = from.piece;

                let valid = true;
                let opponentChanges = 0;
                const checked = new Set();

                for(const change of [
                    ...changes.removed,
                    ...changes.added
                ]) {
                    const key = `${change.row}:${change.col}`;

                    if(checked.has(key)) {
                        continue;
                    }

                    checked.add(key);

                    const candidatePiece =
                        board[change.row]?.[change.col] ?? '';

                    const actualPiece =
                        newBoard[change.row]?.[change.col] ?? '';

                    if(candidatePiece === actualPiece) {
                        continue;
                    }

                    const candidateColor = candidatePiece
                        ? getFenPieceColor(candidatePiece)
                        : null;

                    const actualColor = actualPiece
                        ? getFenPieceColor(actualPiece)
                        : null;

                    if(
                        candidateColor === turn &&
                        actualColor === opponent
                    ) {
                        opponentChanges++;
                        continue;
                    }

                    if(
                        candidateColor === opponent &&
                        !actualPiece
                    ) {
                        opponentChanges++;
                        continue;
                    }

                    if(
                        !candidatePiece &&
                        actualColor === opponent
                    ) {
                        opponentChanges++;
                        continue;
                    }

                    valid = false;
                    break;
                }

                if(valid && opponentChanges) {
                    return boardToFen(board);
                }
            }
        }
    }

    /*
        ---------------------------------------------------------
        Castling
        ---------------------------------------------------------
    */
    if(
        turnRemoved.length === 2 &&
        turnAdded.length === 2
    ) {
        const kingFrom = turnRemoved.find(({ piece }) =>
            piece.toLowerCase() === 'k'
        );

        const rookFrom = turnRemoved.find(({ piece }) =>
            piece.toLowerCase() === 'r'
        );

        const kingTo = turnAdded.find(({ piece }) =>
            piece.toLowerCase() === 'k'
        );

        const rookTo = turnAdded.find(({ piece }) =>
            piece.toLowerCase() === 'r'
        );

        if(
            kingFrom &&
            rookFrom &&
            kingTo &&
            rookTo
        ) {
            const board = lastBoard.map(row => [...row]);

            board[kingFrom.row][kingFrom.col] = '';
            board[rookFrom.row][rookFrom.col] = '';

            board[kingTo.row][kingTo.col] = kingFrom.piece;
            board[rookTo.row][rookTo.col] = rookFrom.piece;

            let valid = true;
            let opponentChanges = 0;
            const checked = new Set();

            for(const change of [
                ...changes.removed,
                ...changes.added
            ]) {
                const key = `${change.row}:${change.col}`;

                if(checked.has(key)) {
                    continue;
                }

                checked.add(key);

                const candidatePiece =
                    board[change.row]?.[change.col] ?? '';

                const actualPiece =
                    newBoard[change.row]?.[change.col] ?? '';

                if(candidatePiece === actualPiece) {
                    continue;
                }

                const candidateColor = candidatePiece
                    ? getFenPieceColor(candidatePiece)
                    : null;

                const actualColor = actualPiece
                    ? getFenPieceColor(actualPiece)
                    : null;

                if(
                    candidateColor === turn &&
                    actualColor === opponent
                ) {
                    opponentChanges++;
                    continue;
                }

                if(
                    candidateColor === opponent &&
                    !actualPiece
                ) {
                    opponentChanges++;
                    continue;
                }

                if(
                    !candidatePiece &&
                    actualColor === opponent
                ) {
                    opponentChanges++;
                    continue;
                }

                valid = false;
                break;
            }

            if(valid && opponentChanges) {
                return boardToFen(board);
            }
        }
    }

    return null;
}

// Which castling rights can still exist, judged from piece placement alone
function inferCastlingRightsFromFen(fen) {
    try {
        const ranks = String(fen).trim().split(/\s+/)[0].split('/');
        if(ranks.length !== 8) return '-';

        const expand = rank => rank.replace(/[1-8]/g, d => '1'.repeat(d));
        const rank8 = expand(ranks[0]); // black back rank
        const rank1 = expand(ranks[7]); // white back rank

        if(rank8.length !== 8 || rank1.length !== 8) return '-';

        let rights = '';
        if(rank1[4] === 'K') {
            if(rank1[7] === 'R') rights += 'K';
            if(rank1[0] === 'R') rights += 'Q';
        }
        if(rank8[4] === 'k') {
            if(rank8[7] === 'r') rights += 'k';
            if(rank8[0] === 'r') rights += 'q';
        }

        return rights || '-';
    } catch(e) {
        return '-';
    }
}

function seedLostCastlingRights(basicFen) {
    const possible = inferCastlingRightsFromFen(basicFen);

    for(const right of ['K', 'Q', 'k', 'q']) {
        if(!possible.includes(right) && !gameState.lostCastlingRights.includes(right)) {
            gameState.lostCastlingRights.push(right);
        }
    }
}

// This is called by observeNewMoves()
// Note: gameStateHistory.get()[0].fen.full / gameStateHistory.get()[0].fen.basic is the last FEN, from the previous board position.
async function determineBoardPositionValidity() {
    const pieceAmount = getPieceAmount(); // this depends on the current DOM, not from FEN.

    // A new board just appeared and is still loading, most likely a new match!
    if(pieceAmount === 0) {
        gameStateHistory.set(); // reset

        await wait(100);

        return determineBoardPositionValidity();
    }

    const history = gameStateHistory.get();
    const currentBasicFen = getFen(true);
    const lastTurn = history[0]?.turn;

    // Promotion positions are not valid to process or store.
    if(isPawnOnPromotionSquareFen(currentBasicFen)) {
        lastRejectedFen = currentBasicFen;
        return;
    }

    // Do not continue if FEN did not change!
    if(currentBasicFen === lastAllowedFen || lastRejectedFen === currentBasicFen) return;

    const boardChanges = getBoardChanges(lastAllowedFen, currentBasicFen, lastTurn);

    /* Possible "pieceAmountChange" value explanations,
        (change < -1) -> multiple pieces have disappeared (atomic chess variant or a faulty newFen?)
        (change = -1) -> piece has been eaten
        (change = 0)  -> piece moved
        (change = 1)  -> piece has spawned
        (change > 1)  -> multiple pieces have spawned (possibly a new game?)
    */

    // Do not continue if a piece just disappeared, this is not possible legally!
    // (This happens sometimes because the mutationObserver detects DOM changes so fast)
    if(boardChanges.pieceAmountChange === -1 && boardChanges.changedSquaresAmount === 1) {
        lastRejectedFen = currentBasicFen;

        return;
    }

    // When moves are done very quickly, two moves can happen at once on the DOM.
    // If that happens, we generate the missing move and its fen ourselves.
    if(boardChanges.missedFen) {
        const missedFen = boardChanges.missedFen;
        const turnAfterMissedMove = lastTurn === 'w' ? 'b' : 'w';

        const missedChanges = getBoardChanges(lastAllowedFen, missedFen);
        updateGameState(missedFen, missedChanges, true, turnAfterMissedMove);

        const actualChanges = getBoardChanges(missedFen, currentBasicFen);
        updateGameState(currentBasicFen, actualChanges, true);

        processBoardPosition();
    } else {
        updateGameState(currentBasicFen, boardChanges);

        processBoardPosition();
    }

    // IMPORTANT: lastAllowedFen must remain the previous FEN while processing
    // so that we get this path (lastAllowedFen → missedFen → currentBasicFen)
    // (Keep this declaration at the bottom of this function, will ya'?)
    lastAllowedFen = currentBasicFen;
    lastRejectedFen = '';
}

function forceUpdateGameState() {
    const currentBasicFen = getFen(true);
    const boardChanges = getBoardChanges(currentBasicFen, currentBasicFen);

    updateGameState(currentBasicFen, boardChanges);
}

function removeTakeback(history) {
    // Todo
    return history;
}

function updateGameState(basicFenToProcess, boardChanges, forceFen, forcedTurn) {
    const stateHistory = gameStateHistory.get();
    const previousBasicFen = stateHistory[0]?.fen?.basic;
    const isTurnForced = typeof forcedTurn === 'string';

    const turn = forcedTurn || (boardChanges?.movedPieceColor === 'w' ? 'b' : 'w');

    const isStandardChessBoard =
        lastBoardRanks === 8 &&
        lastBoardFiles === 8;

    const movedPiece =
        boardChanges?.movedPiece;

    const isCapture =
        boardChanges.pieceAmountChange === -1;

    const isPawnMove =
        movedPiece?.toLowerCase() === 'p';

    const isCastling =
        isStandardChessBoard &&
        boardChanges?.changedSquaresAmount === 4 &&
        movedPiece?.toLowerCase() === 'k' &&
        boardChanges.movedPieces.some(piece =>
            piece.toLowerCase() === 'r'
        );

    const castlingSide =
        isCastling
            ? movedPiece === 'K'
                ? 'white'
                : 'black'
            : null;

    const isDoublePawnPush =
        isPawnMove &&
        boardChanges.from &&
        boardChanges.to &&
        Math.abs(
            Number(boardChanges.from[1]) -
            Number(boardChanges.to[1])
        ) === 2;

    const enPassantTarget =
        isDoublePawnPush
            ? `${boardChanges.from[0]}${
                (
                    Number(boardChanges.from[1]) +
                    Number(boardChanges.to[1])
                ) / 2
            }`
            : '-';

    const isWhiteKingMove =
        movedPiece === 'K';

    const isBlackKingMove =
        movedPiece === 'k';

    const isWhiteKingsideRookMove =
        movedPiece === 'R' &&
        boardChanges.from === 'h1';

    const isWhiteQueensideRookMove =
        movedPiece === 'R' &&
        boardChanges.from === 'a1';

    const isBlackKingsideRookMove =
        movedPiece === 'r' &&
        boardChanges.from === 'h8';

    const isBlackQueensideRookMove =
        movedPiece === 'r' &&
        boardChanges.from === 'a8';

    const isWhiteKingsideRookCapture =
        boardChanges.capturedPiece === 'R' &&
        boardChanges.capturedSquare === 'h1';

    const isWhiteQueensideRookCapture =
        boardChanges.capturedPiece === 'R' &&
        boardChanges.capturedSquare === 'a1';

    const isBlackKingsideRookCapture =
        boardChanges.capturedPiece === 'r' &&
        boardChanges.capturedSquare === 'h8';

    const isBlackQueensideRookCapture =
        boardChanges.capturedPiece === 'r' &&
        boardChanges.capturedSquare === 'a8';

    const halfmoveClock =
        isCapture || isPawnMove
            ? 0
            : gameState.halfmoveClock + 1;

    const plyCount =
        gameState.plyCount + 1;

    const fullmoveNumber =
        Math.floor((plyCount / 2) + 1);

    const loseCastlingRights = (...rights) => {
        for(const right of rights) {
            if(!gameState.lostCastlingRights.includes(right)) {
                gameState.lostCastlingRights.push(right);
            }
        }
    };

    // First state of this match (e.g. page loaded mid-game)
    // Derive the impossible castling rights from the board itself.
    if(!stateHistory.length) seedLostCastlingRights(basicFenToProcess);

    if(isWhiteKingMove) loseCastlingRights('K', 'Q');
    if(isBlackKingMove) loseCastlingRights('k', 'q');

    if(isWhiteKingsideRookMove || isWhiteKingsideRookCapture) loseCastlingRights('K');
    if(isWhiteQueensideRookMove || isWhiteQueensideRookCapture) loseCastlingRights('Q');
    if(isBlackKingsideRookMove || isBlackKingsideRookCapture) loseCastlingRights('k');
    if(isBlackQueensideRookMove || isBlackQueensideRookCapture) loseCastlingRights('q');

    const castlingRights =
        isStandardChessBoard
            ? ['K', 'Q', 'k', 'q']
                .filter(right => !gameState.lostCastlingRights.includes(right))
                .join('') || '-'
            : '-';

    const stateObj = {
        turn,
        movedPiece,
        enPassantTarget,
        castlingRights,
        isCapture,
        isPawnMove,
        isCastling,
        castlingSide,
        halfmoveClock,
        plyCount,
        fullmoveNumber,
        boardChanges,
        'pieceAmountChange': boardChanges.pieceAmountChange
    };

    const currentFullFen = getFen(
        false,
        turn,
        forceFen ? basicFenToProcess : false,
        stateObj
    );

    const currentBasicFen = currentFullFen?.split(' ', 1)?.[0];

    stateObj.fen = {
        'full': currentFullFen,
        'basic': currentBasicFen
    };

    const tempStateHistory = [
        structuredClone(stateObj),
        ...stateHistory
    ];

    const filteredStateHistory = removeTakeback(tempStateHistory);
    const currentStateObj = filteredStateHistory?.[0];

    Object.assign(gameState, currentStateObj);
    gameStateHistory.set(filteredStateHistory);
}

async function processBoardPosition() {
    clearVisuals({ noMetricsRemoval: true });

    const stateHistory = gameStateHistory.get();
    const latestState = stateHistory[0];
    const squareChangeAmount = latestState?.boardChanges?.changedSquaresAmount || 0;

    updateUserscriptDynamicContext({ gameStart: 0 }, gameState?.fen?.full);

    instanceVars.fen.set(commLinkInstanceID, gameState.fen.full);

    const didBoardOrientationChange = await checkBoardOrientationChange();

    lastMoveRequestTime = Date.now();
    modLastEnteredSquare.squareFen = null;

    if(BoardDrawer)
        BoardDrawer.setBoardDimensions(getBoardDimensions());

    if(!modListeners.length)
        addMovesOnDemandListeners();

    if( // ...if a new match started
        didBoardOrientationChange ||
        squareChangeAmount > 6 ||
        ( defaultPosBasicFens.includes(gameState.fen.basic) && (squareChangeAmount > 1) )
    ) {
        resetStoredMatchVariables();
        updateUserscriptDynamicContext({ evaluation: null, gameStart: 1 });

        matchFirstSuggestionGiven = false;
        chessinsperInput.reset();
        chessinsperFirstPositions.clear();
        chessinsperMatch(true);
        chessinsperBehaviors.forEach(entry => { entry.lastFen = null; });
        gameState.turn = getBoardOrientation();
        instanceVars.turn.set(commLinkInstanceID, gameState.turn);

        CommLink.commands.newMatchStarted();
    } else if(gameState.turn)
        instanceVars.turn.set(commLinkInstanceID, gameState.turn);

    // The GUI loads the current board state from instanceVars.gameStateHistory
    CommLink.commands.updateBoardFen();
}

// This also updates the turn instanceVariable that the GUI uses to determine the turn!
function observeNewMoves() {
    if(boardObserver?.disconnect) boardObserver.disconnect();
    if(dumbBoardObservingInterval) clearInterval(dumbBoardObservingInterval);

    dumbBoardObservingInterval = setInterval(() => {
        if(isUserMouseDown) return;

        determineBoardPositionValidity();
    }, 250);

    boardObserver = new MutationObserver(mutationArr => {
        try {
            lastMutationObservationDate = Date.now();

            // Do not continue if mutation was not detected as a possible new move! (Different for each chess site)
            // We later compare FENs to detect if it was actually a new valid move!
            if(!isMutationNewMove(mutationArr)) return;

            determineBoardPositionValidity();
        } catch(e) {
            if(debugModeActivated) console.error(e);
        }
    });

    boardObserver.observe(chessBoardElem, { childList: true, subtree: true, attributes: true });
}

async function checkBoardOrientationChange() {
    const boardOrientation = getBoardOrientation();

    const boardOrientationChanged = lastBoardOrientation !== boardOrientation;
    const boardOrientationDiffers = BoardDrawer && BoardDrawer?.orientation !== boardOrientation;

    if(boardOrientationChanged || boardOrientationDiffers) {
        lastBoardOrientation = boardOrientation;

        instanceVars.playerColor.set(commLinkInstanceID, boardOrientation);

        if(BoardDrawer) BoardDrawer.setOrientation(boardOrientation);

        await CommLink.commands.updateBoardOrientation(boardOrientation);
    }

    return boardOrientationChanged;
}

/*ZONE CHANGE - DO NOT PROCEED IF YOU DON'T KNOW WHAT YOU'RE DOING*\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////////////////
/!ZONE CHANGE - DO NOT PROCEED IF YOU DON'T KNOW WHAT YOU'RE DOING!/

┏┓┳┏┳┓┏┓  ┏┓┏┓┳┓┏┓┳┏┓
┗┓┃ ┃ ┣   ┃ ┃┃┃┃┣ ┃┃┓
┗┛┻ ┻ ┗┛  ┗┛┗┛┛┗┻ ┻┗┛
=====================
Code below this point handles chess site specific things. (e.g. which element is the board or the pieces)
*/

addSupportedChessSite('chess.com', {
    'boardElem': obj => {
        const pathname = obj.pathname;

        if(pathname?.includes('/variants')) {
            return document.querySelector('.TheBoard-layers');
        }

        return document.querySelector('#board-layout-chessboard > .board');
    },

    'pieceElem': obj => {
        const pathname = obj.pathname;
        const getAll = obj.getAll;

        if(pathname?.includes('/variants')) {
            const filteredPieceElems = filterInvisibleElems(
                document.querySelectorAll('.TheBoard-layers *[data-piece]')
            )
                .filter(elem => {
                    if(elem?.dataset?.piece?.toLowerCase() === 'x') return false;

                    return !elem.closest('[class*="captured-pieces"]');
                });

            return getAll ? filteredPieceElems : filteredPieceElems[0];
        }

        return obj.boardQuerySelector('.piece');
    },

    'squareElems': obj => {
        const pathname = obj.pathname;
        const element = obj.element;

        if(pathname?.includes('/variants')) {
            return [...element.querySelectorAll('.square')];
        }
    },

    'chessVariant': obj => {
        const pathname = obj.pathname;

        if(pathname?.includes('/variants')) {
            const variant = pathname.match(/variants\/([^\/]*)/)?.[1]
                .replaceAll('-chess', '')
                .replaceAll('-', '');

            const replacementTable = {
                'doubles-bughouse': 'bughouse',
                'paradigm-chess30': 'paradigm'
            };

            return replacementTable[variant] || variant;
        }
    },

    'boardOrientation': obj => {
        const pathname = obj.pathname;

        if(pathname?.includes('/variants')) {
            const playerNumberStr = document.querySelector('.playerbox-bottom [data-player]')?.dataset?.player;

            if(!playerNumberStr)
                return 'w';

            return playerNumberStr === '0' ? 'w' : 'b';
        }

        const boardElem = getBoardElem();

        return boardElem?.classList.contains('flipped') ? 'b' : 'w';
    },

    'pieceElemFen': obj => {
        const pathname = obj.pathname;
        const pieceElem = obj.pieceElem;

        let pieceColor = null;
        let pieceName = null;

        if(pathname?.includes('/variants')) {
            if(!chesscomVariantPlayerColorsTable) {
                updateChesscomVariantPlayerColorsTable();
            }

            const pieceFenStr = pieceElem?.dataset?.piece;

            pieceColor = chesscomVariantPlayerColorsTable?.[pieceElem?.dataset?.color];
            pieceName = pieceElem?.dataset?.piece;

            if(pieceName?.length > 1) {
                pieceName = pieceName[0];
            }
        } else {
            const pieceStr = [...pieceElem.classList].find(x => x.match(/^(b|w)[prnbqk]{1}$/));

            [pieceColor, pieceName] = pieceStr.split('');
        }

        return pieceColor == 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
    },

    'pieceElemCoords': obj => {
        const pathname = obj.pathname;
        const pieceElem = obj.pieceElem;

        if(pathname?.includes('/variants')) {
            const coords = getElemCoordinatesFromTransform(pieceElem);

            return coords;
        }

        return pieceElem.classList.toString()
            ?.match(/square-(\d)(\d)/)
            ?.slice(1)
            ?.map(x => Number(x) - 1);
    },

    'boardDimensions': obj => {
        const pathname = obj.pathname;

        if(pathname?.includes('/variants')) {
            const squaresContainerElem = document.querySelector('.TheBoard-squares');

            let ranks = 0;
            let files = 0;

            [...squaresContainerElem.childNodes].forEach((x, i) => {
                const visibleChildElems = filterInvisibleElems([...x.childNodes]);

                if(visibleChildElems?.length > 0) {
                    ranks = ranks + 1;

                    if(visibleChildElems.length > files) {
                        files = visibleChildElems.length;
                    }
                }
            });

            return [ranks, files];
        } else {
            return [8, 8];
        }
    },

    'isMutationNewMove': obj => {
        const pathname = obj.pathname;
        const mutationArr = obj.mutationArr;

        // Process variant boards...
        if(pathname?.includes('/variants')) {
            if(isUserMouseDown) return false;
            return true; // allow everything
        }

        // Not a variant board, processing differently...

        if(mutationArr.length === 1)
            return false;

        const isPremove = mutationArr.filter(m => m?.target?.classList?.contains('highlight'))
            .map(x => x?.target?.style?.['background-color'])
            .find(x => x === 'rgb(244, 42, 50)') ? true : false;

        const isNewMove = mutationArr.length >= 3 && !isPremove;

        return isNewMove;
    }
});

addSupportedChessSite('lichess.org', {
    'boardElem': obj => {
        return document.querySelector('cg-board');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('piece:not(.ghost)');
    },

    'chessVariant': obj => {
        const variantLinkElem = document.querySelector('.variant-link');

        if(variantLinkElem) {
            let variant = variantLinkElem?.innerText?.toLowerCase()?.replaceAll(' ', '-');

            const replacementTable = {
                'correspondence': 'chess',
                'koth': 'kingofthehill',
                'three-check': '3check'
            };

            return replacementTable[variant] || variant;
        }
    },

    'boardOrientation': obj => {
        const filesElem = document.querySelector('coords.files');

        return filesElem?.classList?.contains('black') ? 'b' : 'w';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const pieceColor = pieceElem?.classList?.contains('white') ? 'w' : 'b';
        const elemPieceName = [...pieceElem?.classList]?.find(className => Object.keys(pieceNameToFen).includes(className));

        if(pieceColor && elemPieceName) {
            const pieceName = pieceNameToFen[elemPieceName];

            return pieceColor == 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getChessgroundCoordsFromPiece(pieceElem);
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        const isNewMove = mutationArr.length >= 3;

        return isNewMove;
    }
});

addSupportedChessSite('playstrategy.org', {
    'boardElem': obj => {
        return document.querySelector('cg-board');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('piece[class*="-piece"]:not(.ghost)');
    },

    'chessVariant': obj => {
        const variantLinkElem = document.querySelector('.variant-link');

        if(variantLinkElem) {
            let variant = variantLinkElem?.innerText
                ?.toLowerCase()
                ?.replaceAll(' ', '-');

            const replacementTable = {
                'correspondence': 'chess',
                'koth': 'kingofthehill',
                'three-check': '3check',
                'five-check': '5check',
                'no-castling': 'nocastle'
            };

            return replacementTable[variant] || variant;
        }
    },

    'boardOrientation': obj => {
        const cgWrapElem = document.querySelector('.cg-wrap');

        return cgWrapElem.classList?.contains('orientation-p1') ? 'w' : 'b';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const playerColor = getBoardOrientation();
        const pieceColor = pieceElem?.classList?.contains('ally') ? playerColor : (playerColor == 'w' ? 'b' : 'w');

        let pieceName = null;

        [...pieceElem?.classList]?.forEach(className => {
            if(className?.includes('-piece')) {
                const elemPieceName = className?.split('-piece')?.[0];

                if(elemPieceName && elemPieceName?.length === 1) {
                    pieceName = elemPieceName;
                }
            }
        });

        if(pieceColor && pieceName) {
            return pieceColor == 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getChessgroundCoordsFromPiece(pieceElem);
    },

    'boardDimensions': obj => {
        return getBoardDimensionsFromSize();
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        const isNewMove = mutationArr.length >= 4
            || mutationArr.find(m => m.type === 'childList') ? true : false
            || mutationArr.find(m => m?.target?.classList?.contains('last-move')) ? true : false;

        return isNewMove;
    }
});

addSupportedChessSite('pychess.org', {
    'boardElem': obj => {
        return document.querySelector('cg-board');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('piece[class*="-piece"]:not(.ghost)');
    },

    'chessVariant': obj => {
        const variantLinkElem = document.querySelector('#main-wrap .tc .user-link');

        if(variantLinkElem) {
            let variant = variantLinkElem?.innerText
                ?.toLowerCase()
                ?.replaceAll(' ', '')
                ?.replaceAll('-', '');

            const replacementTable = {
                'correspondence': 'chess',
                'koth': 'kingofthehill',
                'nocastling': 'nocastle',
                'gorogoro+': 'gorogoro',
                'oukchaktrang': 'cambodian'
            };

            return replacementTable[variant] || variant;
        }
    },

    'boardOrientation': obj => {
        const cgWrapElem = document.querySelector('.cg-wrap');

        return cgWrapElem.classList?.contains('orientation-black') ? 'b' : 'w';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const playerColor = getBoardOrientation();
        const pieceColor = pieceElem?.classList?.contains('ally') ? playerColor : (playerColor == 'w' ? 'b' : 'w');

        let pieceName = null;

        [...pieceElem?.classList]?.forEach(className => {
            if(className?.includes('-piece')) {
                const elemPieceName = className?.split('-piece')?.[0];

                if(elemPieceName && elemPieceName?.length === 1) {
                    pieceName = elemPieceName;
                }
            }
        });

        if(pieceColor && pieceName) {
            return pieceColor == 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getChessgroundCoordsFromPiece(pieceElem);
    },

    'boardDimensions': obj => {
        return getBoardDimensionsFromSize();
    },


    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        const isNewMove = mutationArr.length >= 4
            || mutationArr.find(m => m.type === 'childList') ? true : false
            || mutationArr.find(m => m?.target?.classList?.contains('last-move')) ? true : false;

        return isNewMove;
    }
});

addSupportedChessSite('chess.org', {
    'boardElem': obj => {
        return document.querySelector('.cg-board');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('piece:not(.ghost)');
    },

    'chessVariant': obj => {
        return 'chess';
    },

    'boardOrientation': obj => {
        const filesElem = document.querySelector('coords.files');

        return filesElem?.classList?.contains('black') ? 'b' : 'w';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const pieceColor = pieceElem?.classList?.contains('white') ? 'w' : 'b';
        const elemPieceName = [...pieceElem?.classList]?.find(className => Object.keys(pieceNameToFen).includes(className));

        if(pieceColor && elemPieceName) {
            const pieceName = pieceNameToFen[elemPieceName];

            return pieceColor == 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getElemCoordinatesFromTransform(pieceElem);
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        if(isUserMouseDown) {
            return false;
        }

        const isNewMove = true; // laggy but this is a non-popular site

        return isNewMove;
    }
});

addSupportedChessSite('chess.coolmathgames.com', {
    'boardElem': obj => {
        return document.querySelector('cg-board');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('piece:not(.ghost)');
    },

    'chessVariant': obj => {
        return 'chess';
    },

    'boardOrientation': obj => {
        const boardElem = getBoardElem();

        return document.querySelector('.ranks.black') ? 'b' : 'w';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const pieceColor = pieceElem?.classList?.contains('white') ? 'w' : 'b';
        const elemPieceName = [...pieceElem?.classList]?.find(className => Object.keys(pieceNameToFen).includes(className));

        if(pieceColor && elemPieceName) {
            const pieceName = pieceNameToFen[elemPieceName];

            return pieceColor == 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getChessgroundCoordsFromPiece(pieceElem);
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        if(isUserMouseDown) {
            return false;
        }

        const isNewMove = true; // laggy but this is a non-popular site

        // NOTE! IF YOU'RE TRYING TO FIX DISAPPEARING MOVES, IT IS CAUSED BY THE BOARD CHANGING
        // AND THE USERSCRIPT TRIGGERING A WHOLE NEW MATCH STARTING. THIS IS A NON-POPULAR SITE
        // SO FIX HAS NOT BEEN MADE...

        return isNewMove;
    }
});

addSupportedChessSite('papergames.io', {
    'boardElem': obj => {
        return document.querySelector('.cm-chessboard');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('*[data-piece][data-square]');
    },

    'chessVariant': obj => {
        return 'chess';
    },

    'boardOrientation': obj => {
        const boardElem = getBoardElem();

        if(boardElem) {
            const firstRankText = [...boardElem.querySelector('.coordinates').childNodes]?.[0].textContent;

            return firstRankText == 'h' ? 'b' : 'w';
        }
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        return convertPieceStrToFen(pieceElem?.dataset?.piece);
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        const key = pieceElem?.dataset?.square;

        if(key) {
            return chessCoordinatesToIndex(key);
        }
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        const isNewMove = mutationArr.length >= 12;

        return isNewMove;
    }
});

addSupportedChessSite('immortal.game', {
    'boardElem': obj => {
        return document.querySelector('div.pawn.relative, div.knight.relative, div.bishop.relative, div.rook.relative, div.queen.relative, div.king.relative')?.parentElement?.parentElement;
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('div.pawn.relative, div.knight.relative, div.bishop.relative, div.rook.relative, div.queen.relative, div.king.relative');
    },

    'chessVariant': obj => {
        return 'chess';
    },

    'boardOrientation': obj => {
        const coordA = [...document.querySelectorAll('svg text[x]')]
            .find(elem => elem?.textContent == 'a');

        const coordAX = Number(coordA?.getAttribute('x')) || 10;

        return coordAX < 15 ? 'w' : 'b';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const pieceColor = pieceElem?.classList?.contains('white') ? 'w' : 'b';
        const elemPieceName = [...pieceElem?.classList]?.find(className => Object.keys(pieceNameToFen).includes(className));

        if(pieceColor && elemPieceName) {
            const pieceName = pieceNameToFen[elemPieceName];

            return pieceColor === 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getElemCoordinatesFromTransform(pieceElem?.parentElement);
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        if(isUserMouseDown) {
            return false;
        }

        const isNewMove = mutationArr.length >= 5;

        return isNewMove;
    }
});

addSupportedChessSite('worldchess.com', {
    'boardElem': obj => {
        return document.querySelector('*[data-component="GameBoard"] cg-board');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('cg-piece:not(*[style*="visibility: hidden;"])');
    },

    'chessVariant': obj => {
        return 'chess';
    },

    'boardOrientation': obj => {
        const titlesElem = document.querySelector('cg-titles');

        return titlesElem?.classList?.contains('rotated') ? 'b' : 'w';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const pieceColor = pieceElem?.className?.[0];
        const elemPieceName = pieceElem?.className?.[1];

        if(pieceColor && elemPieceName) {
            const pieceName = elemPieceName; // pieceNameToFen[elemPieceName]

            return pieceColor === 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getElemCoordinatesFromTransform(pieceElem, { 'onlyFlipY': true });
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        if(isUserMouseDown) {
            return false;
        }

        const isNewMove = mutationArr.find(m => m?.attributeName === 'style') ? true : false;

        return isNewMove;
    }
});

addSupportedChessSite('chess.net', {
    'boardElem': obj => {
        return document.querySelector('cg-board');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('piece:not(.ghost)');
    },

    'chessVariant': obj => {
        const variantLinkElem = document.querySelector('.variant-link');

        if(variantLinkElem) {
            let variant = variantLinkElem?.innerText?.toLowerCase()?.replaceAll(' ', '-');

            const replacementTable = {
                'correspondence': 'chess',
                'koth': 'kingofthehill',
                'three-check': '3check'
            };

            return replacementTable[variant] || variant;
        }
    },

    'boardOrientation': obj => {
        const filesElem = document.querySelector('coords.files');

        return filesElem?.classList?.contains('black') ? 'b' : 'w';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const pieceColor = pieceElem?.classList?.contains('white') ? 'w' : 'b';
        const elemPieceName = [...pieceElem?.classList]?.find(className => Object.keys(pieceNameToFen).includes(className));

        if(pieceColor && elemPieceName) {
            const pieceName = pieceNameToFen[elemPieceName];

            return pieceColor == 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getChessgroundCoordsFromPiece(pieceElem);
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        const isNewMove = mutationArr.length >= 3;

        return isNewMove;
    }
});

addSupportedChessSite('freechess.club', {
    'boardElem': obj => {
        return document.querySelector('cg-board');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('piece:not(.ghost)');
    },

    'chessVariant': obj => {
        return 'chess';
    },

    'boardOrientation': obj => {
        const filesElem = document.querySelector('coords.files');

        return filesElem?.classList?.contains('black') ? 'b' : 'w';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const pieceColor = pieceElem?.classList?.contains('white') ? 'w' : 'b';
        const elemPieceName = [...pieceElem?.classList]?.find(className => Object.keys(pieceNameToFen).includes(className));

        if(pieceColor && elemPieceName) {
            const pieceName = pieceNameToFen[elemPieceName];

            return pieceColor == 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getChessgroundCoordsFromPiece(pieceElem);
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        const isNewMove = mutationArr.length >= 3;

        return isNewMove;
    }
});

addSupportedChessSite('play.chessclub.com', {
    'boardElem': obj => {
        return document.querySelector('[data-boardid]');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('[data-piece]');
    },

    'chessVariant': obj => {
        return 'chess';
    },

    'boardOrientation': obj => {
        return document.querySelector('[data-square]')?.dataset?.square === 'a8'
            ? 'w' : 'b';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;
        const [pieceColor, pieceName] = (pieceElem?.dataset?.piece || 'wp');

        if(pieceColor && pieceName) {
            return pieceColor === 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        const parentParent = pieceElem?.parentElement?.parentElement;

        if(parentParent) {
            return chessCoordinatesToIndex(parentParent?.dataset?.square);
        }
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        const isNewMove = mutationArr.find(mutation => mutation?.type === 'childList')
            ? true : false;

        return isNewMove;
    }
});

addSupportedChessSite('gameknot.com', {
    'boardElem': obj => {
        return document.querySelector('#chess-board-acboard');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('*[class*="chess-board-piece"] > img[src*="chess56."][style*="visible"]');
    },

    'chessVariant': obj => {
        return 'chess';
    },

    'boardOrientation': obj => {
        return document.querySelector('#chess-board-my-side-color .player_white') ? 'w' : 'b';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const left = Number(pieceElem.style.left.replace('px', ''));
        const top = Number(pieceElem.style.top.replace('px', ''));

        const pieceColor = left >= 0 ? 'w' : 'b';
        const pieceName = 'kqrnbp'[(top * -1) / 60];

        return pieceColor === 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getElemCoordinatesFromLeftTopPixels(pieceElem.parentElement);
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        const isNewMove = mutationArr.find(m => m.type === 'childList') ? true : false
            || mutationArr.find(m => m?.target?.classList?.contains('last-move')) ? true : false;

        return isNewMove;
    }
});

addSupportedChessSite('app.edchess.io', {
    'boardElem': obj => {
        return document.querySelector('*[data-boardid="chessboard"]');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('*[data-piece]');
    },

    'chessVariant': obj => {
        return 'chess';
    },

    'boardOrientation': obj => {
        return document.querySelector('*[data-square]')?.dataset?.square == 'h1' ? 'b' : 'w';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;
        const [pieceColor, pieceName] = pieceElem?.dataset?.piece?.split('');

        return pieceColor === 'w' ? pieceName.toUpperCase() : pieceName.toLowerCase();
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return chessCoordinatesToIndex(pieceElem?.parentElement?.parentElement?.dataset?.square);
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;

        const isNewMove = mutationArr.length >= 2;

        return isNewMove;
    }
});

addSupportedChessSite([
    backendConfig?.hosts?.prod || 'guilhermelourencoismart-bot.github.io',
    backendConfig?.hosts?.dev || 'localhost'
], {
    'boardElem': obj => {
        return document.querySelector('cg-board');
    },

    'pieceElem': obj => {
        return obj.boardQuerySelector('piece:not(.ghost)');
    },

    'chessVariant': obj => {
        return 'chess';
    },

    'boardOrientation': obj => {
        const filesElem = document.querySelector('coords.side');

        return filesElem?.classList?.contains('black') ? 'b' : 'w';
    },

    'pieceElemFen': obj => {
        const pieceElem = obj.pieceElem;

        const pieceColor = pieceElem?.classList?.contains('white') ? 'w' : 'b';

        const elemPieceName = [...(pieceElem?.classList ?? [])]
          .map(cls => cls.replace('-piece', ''))
          .find(cls => Object.values(pieceNameToFen).includes(cls));

        if(pieceColor && elemPieceName) {
            return pieceColor == 'w' ? elemPieceName.toUpperCase() : elemPieceName.toLowerCase();
        }
    },

    'pieceElemCoords': obj => {
        const pieceElem = obj.pieceElem;

        return getChessgroundCoordsFromPiece(pieceElem);
    },

    'boardDimensions': obj => {
        return [8, 8];
    },

    'isMutationNewMove': obj => {
        const mutationArr = obj.mutationArr;
        const isNewMove = mutationArr.length >= 2;

        return isNewMove;
    }
});

/*ZONE CHANGE - DO NOT PROCEED IF YOU DON'T KNOW WHAT YOU'RE DOING*\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////////////////
/!ZONE CHANGE - DO NOT PROCEED IF YOU DON'T KNOW WHAT YOU'RE DOING!/

┳┓┏┓┏┓┏┳┓  ┏┓┏┓┏┓┳┳┏┓┳┓┏┓┏┓
┣┫┃┃┃┃ ┃   ┗┓┣ ┃┃┃┃┣ ┃┃┃ ┣
┻┛┗┛┗┛ ┻   ┗┛┗┛┗┻┗┛┗┛┛┗┗┛┗┛
===========================
Code below this point is related to initialization. (e.g. wait for chess board and create the instance)
*/

async function isAcasBackendReady() {
    const res = await CommLink.commands.ping();

    return res ? true : false;
}

function refreshSettings() {
    // This work is synchronous; do not create an unobserved rejected promise
    // when invoked by a timer or a board-context update.
    return withDynamicSettings(() => {
        const config = GM_getValue(dbValues.AcasConfig);
        const globalProfiles = config?.global?.profiles;
        const instanceProfiles = config?.instance?.[commLinkInstanceID]?.profiles;
        const names = new Set([
            ...Object.keys(globalProfiles && typeof globalProfiles === 'object' && !Array.isArray(globalProfiles) ? globalProfiles : {}),
            ...Object.keys(instanceProfiles && typeof instanceProfiles === 'object' && !Array.isArray(instanceProfiles) ? instanceProfiles : {})
        ]);
        syncChessinsperBehaviors(names, config);
        isMovesOnDemandActive = [...names].some(profileName =>
            getGmConfigValue(configKeys.movesOnDemand, commLinkInstanceID, profileName) === true);
        return true;
    }, () => false);
}

async function start() {
    await CommLink.commands.createInstance(commLinkInstanceID);

    const pathname = window.location.pathname;
    const boardOrientation = getBoardOrientation();

    instanceVars.playerColor.set(commLinkInstanceID, boardOrientation);
    instanceVars.fen.set(commLinkInstanceID, getFen());

    if(isBoardDrawerNeeded()) {
        if(BoardDrawer) BoardDrawer?.terminate();

        BoardDrawer = new UniversalBoardDrawer(chessBoardElem, {
            'window': window,
            'boardDimensions': getBoardDimensions(),
            'playerColor': getBoardOrientation(),
            'zIndex': Math.floor(Math.random() * 90) + 10,
            'prepend': true,
            'debugMode': debugModeActivated,
            'adjustSizeByDimensions': domain === 'chess.com' && pathname?.includes('/variants'),
            'adjustSizeConfig': {
                'noLeftAdjustment': true
            },
            'ignoreBodyRectLeft': domain === 'app.edchess.io'
        });

        const waitForBoardMatrix = setInterval(() => {
            if(lastBoardMatrix) {
                clearInterval(waitForBoardMatrix);

                addMovesOnDemandListeners();
            }
        }, 50);
    }

    await checkBoardOrientationChange();

    refreshSettings();
    observeNewMoves();

    CommLink.setIntervalAsync(async () => {
        refreshSettings();
        await CommLink.commands.createInstance(commLinkInstanceID);
    }, 1000);

    createInputListener(
        'concealAssistance',
        await getGmConfigValue('concealAssistanceTriggerCode'),
        toggleConcealAssistance
    );

    createInputListener(
        'instanceRestart',
        await getGmConfigValue('instanceRestartTriggerCode'),
        () => { CommLink.commands.forceInstanceRestart() }
    );
}

function applyAssistanceConcealment(isConcealed = false) {
    const BoardDrawerSvg = BoardDrawer?.boardContainerElem;
    if(!BoardDrawerSvg) return;

    if(isConcealed) BoardDrawerSvg.style.display = 'none';
    else BoardDrawerSvg.style.display = 'block';
}

function toggleConcealAssistance() {
    CommLink.commands.toggleConcealAssistance();
}

function startWhenBackendReady() {
    const interval = CommLink.setIntervalAsync(async () => {
        if(await isAcasBackendReady()) {
            start();

            interval.stop();
        } else if(!backendTabOpenedOnceAlready) {
            backendTabOpenedOnceAlready = true;

            const config = GM_getValue(dbValues.AcasConfig);
            const isGhost = config?.global?.[configKeys.isUserscriptGhost];

            if(!isGhost) GM_openInTab(getCurrentBackendURL(), true);
        }
    }, 100);
}

function initializeIfSiteReady() {
    const boardElem = getBoardElem();
    const firstPieceElem = getPieceElem();

    const bothElemsExist = boardElem && firstPieceElem;
    const isChessComImageBoard = domain === 'chess.com' && boardElem?.className.includes('webgl-2d');
    const boardElemChanged = chessBoardElem != boardElem;

    if((bothElemsExist || isChessComImageBoard) && boardElemChanged) {
        chessBoardElem = boardElem;

        chessBoardElem.addEventListener('mousedown', () => { isUserMouseDown = true; });
        chessBoardElem.addEventListener('mouseup', () => { isUserMouseDown = false; });
        chessBoardElem.addEventListener('touchstart', () => { isUserMouseDown = true; });
        chessBoardElem.addEventListener('touchend', () => { isUserMouseDown = false; });

        if(!blacklistedURLs.includes(window.location.href)) {
            startWhenBackendReady();
        }
    }
}

if(typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('[u] Open ACASIOS Repository', e => {
        GM_openInTab(greasyforkURL, true);
    }, 'u');

    GM_registerMenuCommand('[o] Open GUI Manually', e => {
        GM_openInTab(getCurrentBackendURL(), true);
    }, 'o');

    GM_registerMenuCommand('[s] Start Manually', e => {
        if(chessBoardElem) {
            start();
        } else {
            displayImportantNotification('Failed to start manually', 'No chessboard element found!');
        }
    }, 's');

    GM_registerMenuCommand('[g] Get Moves Manually', e => {
        if(chessBoardElem) {
            processBoardPosition();
        } else {
            displayImportantNotification('Failed to get moves', 'No chessboard element found!');
        }
    }, 'g');

    GM_registerMenuCommand('[r] Render BoardDrawer Manually', e => {
        if(typeof BoardDrawer?.updateDimensions === 'function') {
            BoardDrawer.updateDimensions();
        } else {
            displayImportantNotification('Failed to render BoardDrawer', 'BoardDrawer not initialized or something else went wrong!');
        }
    }, 'r');

    if(typeof GM_setClipboard === 'function') {
        GM_registerMenuCommand('[c] Copy FEN to Clipboard', e => {
            if(chessBoardElem) {
                GM_setClipboard(getFen());
            } else {
                displayImportantNotification('Failed to get FEN', 'No chessboard element found!');
            }
        }, 'c');
    }
}

setInterval(initializeIfSiteReady, 100);
// This slow rate might cause users to complain that settings aren't being applied fast enough
setInterval(refreshSettings, 2500);

} catch(e) { // Attempt to catch all errors on userscript (Note: ONLY LOG DURING DEVELOPMENT. ERRORS EXPOSE USERSCRIPT TO THE PAGE!)
    //console.warn(e);
}})(); // Wraps around the whole userscript to enable async.

/*////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

Thank you for reading through this userscript! Please visit GitHub
Contributions are absolutely welcome >> github.com/Psyyke/ACASIOS!

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
000000000000000000000000000000000000000000000000000000000000000000
777777770000000007777777777777770000000077777777700000000077777777
777777777000000777777777777777777700000077777777770000007777777777
777077777000007777777000000077777700000777777777777000007777770000
777077777700007777770000000000000000007777770077777000007777777777
770007777770077777700000000000000000077777700077777700000777777777
700000777777007777770000000000000000077777700007777770000000007777
777777777777007777770000000077777700777777777777777777077777700000
777777777777700777777777777777777707777777777777777777007777777777
000000007777770007777777777777770077777770000000077777700777777777
000000007777777000007777777770000077777700000000007777770000777777
000000000000000000000000000000000000000000000000000000000000000000
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////*/