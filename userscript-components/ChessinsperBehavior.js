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
