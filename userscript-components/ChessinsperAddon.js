/* Chessinsper companion for the unmodified A.C.A.S GUI. GPL-3.0.
 * Engine loading, position tracking, UCI transport and SVG rendering belong to A.C.A.S.
 */
(function (root) {
  "use strict";
  const VERSION = "1.0.0";
  const PROFILE_PREFIX = "ChessinsperAddon.Profile:";
  const CLIENT_PREFIX = "ChessinsperAddon.Client:";
  const LINK_PREFIX = "ChessinsperAddon.Link:";
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const id = () =>
    root.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const settings = (profile) =>
    root.ChessinsperCore.normalizeSettings(
      GM_getValue(PROFILE_PREFIX + profile, {}),
    );
  const save = (profile, value) =>
    GM_setValue(
      PROFILE_PREFIX + profile,
      root.ChessinsperCore.normalizeSettings(value),
    );
  function createGUI(page) {
    const guiID = id(),
      hooks = new Map(),
      bindings = new Map();
    const bus = new CommLinkHandler(`chessinsper-gui-${guiID}`, {
      silentMode: true,
      statusCheckInterval: 20,
      singlePacketResponseWaitTime: 1000,
      maxSendAttempts: 1,
    });
    let timer,
      busy = false,
      stopped = false,
      panel;
    const native = () => page.USERSCRIPT;
    const compatible = (instance) =>
      instance &&
      typeof instance.sendMsgToEngine === "function" &&
      typeof instance.engineMessageProcessor === "function" &&
      typeof instance.displayMoves === "function" &&
      typeof instance.Interface?.getMoveShapes === "function" &&
      typeof instance.CommLink?.commands?.renderVisualsToSite === "function";
    const profiles = () => [
      ...new Set(
        [...hooks.keys()].flatMap((instance) => Object.keys(instance.pV || {})),
      ),
    ];
    const eligible = (instance, profile, fen = instance.currentFen) => {
      const pv = instance.pV[profile];
      return (
        settings(profile).enabled &&
        pv &&
        !pv.useExternalChessEngine &&
        !pv.useChess960 &&
        (!pv.chessVariant || ["chess", "standard"].includes(pv.chessVariant)) &&
        instance.boardDimensions?.width === 8 &&
        instance.boardDimensions?.height === 8 &&
        !!fen &&
        (!pv.pendingCalculations?.find((c) => !c.finished)?.analyzedFen ||
          pv.pendingCalculations.find((c) => !c.finished).analyzedFen === fen)
      );
    };
    const wire = (object, name, fn) => {
      object[name] =
        typeof exportFunction === "function"
          ? exportFunction(fn, page, { allowCrossOriginArguments: true })
          : fn;
    };
    function profileState(instance, profile) {
      const hook = hooks.get(instance),
        cfg = settings(profile),
        pv = instance.pV[profile];
      let state = hook.profiles.get(profile);
      const signature = root.ChessinsperCore.behaviorSignature(cfg);
      if (!state || state.pv !== pv || state.signature !== signature) {
        state?.metrics?.forEach((elem) => elem.remove());
        state = {
          pv,
          signature,
          settings: cfg,
          runtime: root.ChessinsperCore.createRuntime(cfg, {
            Chess: page.Chess,
            id: `${instance.instanceID}:${profile}`,
          }),
          options: state?.options || {},
          pool: new Map(),
          fen: null,
          selection: null,
          choice: null,
          context: {},
          queried: false,
        };
        hook.profiles.set(profile, state);
      }
      state.settings = cfg;
      state.runtime.settings.visualIntelligence = cfg.visualIntelligence;
      return state;
    }
    function client(instance) {
      return GM_listValues()
        .filter((key) => key.startsWith(CLIENT_PREFIX))
        .map((key) => GM_getValue(key))
        .find(
          (value) =>
            value?.nativeInstanceID === instance.instanceID &&
            value.guiID === guiID &&
            Date.now() - value.at < 15000,
        );
    }
    function registerClient(value) {
      if (!value?.id || !value.nativeInstanceID) return { ok: false };
      const instance = [...hooks.keys()].find(
        (i) => i.instanceID === value.nativeInstanceID,
      );
      if (!instance || instance.instanceClosed) return { ok: false };
      bindings.set(value.id, instance);
      return { ok: true };
    }
    bus.registerListener(`chessinsper-gui-${guiID}`, async (packet) => {
      const value = packet.data;
      if (packet.command === "register") return registerClient(value);
      const instance = bindings.get(value?.clientID);
      if (
        !instance ||
        instance.instanceClosed ||
        instance.instanceID !== value?.nativeInstanceID
      )
        return { ok: false };
      if (packet.command === "confirmed") {
        hooks
          .get(instance)
          .profiles.get(value.profile)
          ?.runtime.recordMove(value);
        return { ok: true };
      }
      if (packet.command === "recover") {
        const fen = await instance.CommLink.commands.getFen();
        if (fen && fen === instance.currentFen)
          await instance.calculateBestMoves(fen, {
            specificProfileName: value.profile,
            skipValidityChecks: true,
          });
        return { ok: true };
      }
      if (packet.command === "newgame") {
        const hook = hooks.get(instance);
        hook.profiles.forEach((state) => {
          state.signature = null;
          state.selection = null;
        });
        return { ok: true };
      }
      return { ok: false };
    });
    async function context(instance, profile, fen) {
      const target = client(instance);
      if (!target) return {};
      const result = await bus.send(
        `chessinsper-client-${target.id}`,
        "context",
        {
          fen,
          profile,
          nativeInstanceID: instance.instanceID,
          playerColor: await instance.getPlayerColor(),
        },
      );
      return result?.ok ? result.context : {};
    }
    async function plan(instance, profile, fen, originalSend, isCurrent) {
      const state = profileState(instance, profile),
        snapshot = await context(instance, profile, fen);
      if (!isCurrent() || !eligible(instance, profile, fen)) return null;
      state.context = snapshot;
      const value = state.runtime.searchPlan(fen, snapshot),
        options = state.options;
      if (options.MultiPV) {
        const count = Math.max(
          options.MultiPV.min || 1,
          Math.min(options.MultiPV.max || 20, value.multiPV),
        );
        state.pv.multiPV = count;
        await originalSend.call(
          instance,
          `setoption name MultiPV value ${count}`,
          profile,
          true,
          isCurrent,
        );
      }
      if (options["Skill Level"])
        await originalSend.call(
          instance,
          `setoption name Skill Level value ${options["Skill Level"].max ?? 20}`,
          profile,
          true,
          isCurrent,
        );
      const elo = options.UCI_Elo;
      if (elo && options.UCI_LimitStrength) {
        const limit = value.strength >= elo.min && value.strength <= elo.max;
        await originalSend.call(
          instance,
          `setoption name UCI_LimitStrength value ${limit}`,
          profile,
          true,
          isCurrent,
        );
        if (limit)
          await originalSend.call(
            instance,
            `setoption name UCI_Elo value ${value.strength}`,
            profile,
            true,
            isCurrent,
          );
      } else if (elo)
        await originalSend.call(
          instance,
          `setoption name UCI_Elo value ${Math.max(elo.min, Math.min(elo.max, value.strength))}`,
          profile,
          true,
          isCurrent,
        );
      state.pv.searchDepth = value.depth;
      return value;
    }
    function parseInfo(message, profile, fen, state) {
      if (state.fen !== fen) {
        state.fen = fen;
        state.pool = new Map();
        state.selection = null;
      }
      const pv = message
        .match(/\bpv\s+(.+)$/)?.[1]
        ?.trim()
        .split(/\s+/);
      if (!pv?.length || !/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(pv[0])) return;
      const ranking = Number(message.match(/\bmultipv\s+(\d+)/)?.[1] || 1),
        depth = Number(message.match(/\bdepth\s+(\d+)/)?.[1] || 0);
      const old = state.pool.get(ranking);
      if (old && old.depth > depth) return;
      const cp = message.match(/\bscore\s+cp\s+(-?\d+)/),
        mate = message.match(/\bscore\s+mate\s+(-?\d+)/);
      const move = {
        player: [pv[0].slice(0, 2), pv[0].slice(2, 4)],
        playerPromotion: pv[0][4] || null,
        opponent: pv[1] ? [pv[1].slice(0, 2), pv[1].slice(2, 4)] : [null, null],
        opponentPromotion: pv[1]?.[4] || null,
        cp: cp ? Number(cp[1]) : 0,
        mate: mate ? Number(mate[1]) : null,
        ranking,
        depth,
        pv,
        profile,
        fen,
      };
      state.pool.set(ranking, move);
    }
    function visible(state, fen, moves, ownTurn) {
      const cfg = state.settings.visualIntelligence;
      if (
        !cfg.enabled ||
        !cfg.arrowOpacity ||
        (cfg.showOnlyOwnTurn && !ownTurn)
      )
        return [];
      const board = new page.Chess(fen);
      return moves
        .filter(
          (move, index) =>
            (index === 0 ? cfg.bestMove : cfg.alternatives) &&
            (cfg.pieceFilter === "all" ||
              board.get(move.player[0])?.type === cfg.pieceFilter),
        )
        .slice(0, cfg.maxArrows);
    }
    async function render(instance, profile, state) {
      if (
        !eligible(instance, profile) ||
        !state.selection ||
        state.fen !== instance.currentFen
      )
        return;
      const ownTurn =
        instance.currentFen.split(" ")[1] === (await instance.getPlayerColor());
      const moves = visible(state, state.fen, state.selection, ownTurn);
      if (moves.length)
        await hooks
          .get(instance)
          .original.displayMoves.call(instance, clone(moves), profile);
      else {
        instance.Interface.removeMarkings(profile, "Chessinsper visibility");
        await hooks
          .get(instance)
          .original.renderVisuals([
            { profileID: profile, category: "chessinsper-move" },
          ]);
      }
      renderCoach(instance, profile, state);
    }
    function renderCoach(instance, profile, state) {
      let elem = instance.instanceElem?.querySelector(
        "[data-chessinsper-coach]",
      );
      if (!state.settings.coach.enabled) {
        if (elem) elem.hidden = true;
        return;
      }
      if (!elem && instance.instanceElem) {
        elem = page.document.createElement("div");
        elem.dataset.chessinsperCoach = "";
        elem.className = "instance-chessinsper-coach";
        instance.instanceElem.append(elem);
      }
      const report = state.runtime.coachReport(
        state.fen,
        state.selection || [],
      );
      if (elem) {
        elem.hidden = false;
        elem.textContent = report
          ? `Coach · ${report.move}\n${report.alternatives.length ? "Alternativas: " + report.alternatives.join(", ") : ""}${report.threat ? "\nResposta prevista: " + report.threat : ""}`
          : "Coach · aguardando análise";
      }
    }
    async function metrics(instance, profile, state) {
      const visual = state.settings.visualIntelligence;
      state.metrics?.forEach((elem) => elem.remove());
      state.metrics = [];
      if (
        !visual.enabled ||
        !instance.BoardDrawer ||
        (visual.showOnlyOwnTurn &&
          instance.currentFen.split(" ")[1] !==
            (await instance.getPlayerColor()))
      ) {
        await hooks
          .get(instance)
          .original.renderVisuals([
            { category: "chessinsper-metric", profileID: profile },
          ]);
        return;
      }
      const shapes = root.ChessinsperAddonMetrics(
        state.runtime,
        instance.currentFen,
        await instance.getPlayerColor(),
      );
      state.metrics = shapes
        .map((shape) =>
          instance.BoardDrawer.createShape(
            shape.shapeType,
            shape.shapeSquare,
            shape.shapeConfig,
          ),
        )
        .filter(Boolean);
      if (
        await hooks
          .get(instance)
          .original.getConfigValue.call(
            instance,
            "renderOnExternalSite",
            profile,
          )
      )
        await hooks.get(instance).original.renderVisuals(
          shapes.length
            ? shapes.map((shape) => ({
                ...shape,
                category: "chessinsper-metric",
                profileID: profile,
              }))
            : [{ category: "chessinsper-metric", profileID: profile }],
        );
    }
    function attach(instance) {
      if (hooks.has(instance) || !compatible(instance)) return;
      const original = {};
      for (const name of [
        "getConfigValue",
        "sendMsgToEngine",
        "engineMessageProcessor",
        "displayMoves",
        "renderMetric",
        "startNewMatch",
        "close",
      ])
        original[name] = instance[name];
      original.renderVisuals = instance.CommLink.commands.renderVisualsToSite;
      original.getMoveVisualSettings = instance.Interface.getMoveVisualSettings;
      original.getMoveShapes = instance.Interface.getMoveShapes;
      const hook = {
        original,
        profiles: new Map(),
        markerAt: 0,
        enabled: new Set(),
      };
      hooks.set(instance, hook);
      wire(instance, "getConfigValue", async function (key, profile) {
        const name = typeof profile === "object" ? profile?.name : profile;
        if (name && eligible(instance, name)) {
          const cfg = settings(name).visualIntelligence;
          const values = {
            arrowOpacity: cfg.arrowOpacity,
            primaryArrowColorHex: cfg.colors.best,
            secondaryArrowColorHex: cfg.colors.alt,
            opponentArrowColorHex: cfg.colors.response,
            showOpponentMoveGuess: cfg.threats,
            showOpponentMoveGuessConstantly: cfg.threats,
          };
          if (Object.hasOwn(values, key)) return values[key];
        }
        return original.getConfigValue.call(instance, key, profile);
      });
      wire(
        instance,
        "sendMsgToEngine",
        async function (message, profile, dynamic, isCurrent = () => true) {
          if (
            /^go\b/.test(message) &&
            typeof profile === "string" &&
            eligible(instance, profile)
          ) {
            const request = instance.pV[profile].pendingCalculations.find(
                (c) => !c.finished,
              ),
              fen = request?.analyzedFen || instance.currentFen;
            if (fen === instance.currentFen) {
              const search = await plan(
                instance,
                profile,
                fen,
                original.sendMsgToEngine,
                isCurrent,
              );
              if (!isCurrent()) return false;
              if (search)
                message = `go depth ${search.depth}${message.includes(" searchmoves ") ? " searchmoves " + message.split(" searchmoves ")[1] : ""}`;
            }
          }
          return original.sendMsgToEngine.call(
            instance,
            message,
            profile,
            dynamic,
            isCurrent,
          );
        },
      );
      wire(
        instance,
        "engineMessageProcessor",
        async function (message, profile) {
          const pv = instance.pV[profile];
          if (!pv)
            return original.engineMessageProcessor.call(
              instance,
              message,
              profile,
            );
          const state = profileState(instance, profile),
            request = pv.pendingCalculations.find((c) => !c.finished);
          const fen = request?.analyzedFen || request?.fen;
          if (/^option name /.test(message)) {
            const name = message.match(/^option name (.+?) type /)?.[1];
            if (name)
              state.options[name] = {
                min: Number(message.match(/\bmin (-?\d+)/)?.[1] || 0),
                max: Number(message.match(/\bmax (-?\d+)/)?.[1] || 0),
              };
          }
          if (
            /^info /.test(message) &&
            fen &&
            request?.fen === instance.currentFen &&
            eligible(instance, profile, fen)
          )
            parseInfo(message, profile, fen, state);
          const final = /^bestmove\s+[a-h][1-8][a-h][1-8]/.test(message);
          const pool = state.pool;
          await original.engineMessageProcessor.call(
            instance,
            message,
            profile,
          );
          if (
            !final ||
            !request ||
            request.stopRequested ||
            request.fen !== instance.currentFen ||
            fen !== instance.currentFen ||
            !eligible(instance, profile, fen) ||
            instance.pV[profile] !== pv
          )
            return;
          const candidates = [...pool.values()];
          if (!candidates.length) return;
          const ownTurn =
            fen.split(" ")[1] === (await instance.getPlayerColor());
          const result = ownTurn
            ? state.runtime.chooseMoves(fen, candidates, {
                ...state.context,
                playerColor: await instance.getPlayerColor(),
                repertoireMoves: (
                  instance.openingBooks?.get(profile)?.getMoves(fen) || []
                ).map((m) => m.from + m.to + (m.promotion || "")),
              })
            : { moves: candidates, choice: null };
          state.selection = result.moves;
          state.choice = result.choice;
          state.fen = fen;
          await render(instance, profile, state);
          await metrics(instance, profile, state);
          const target = client(instance);
          if (target && result.choice) {
            const best =
              candidates.find((m) => m.ranking === 1) || candidates[0];
            await bus.send(`chessinsper-client-${target.id}`, "move", {
              ...result.choice,
              profile,
              settings: state.settings,
              fen,
              nativeInstanceID: instance.instanceID,
              bestCp: best.cp,
              bestMate: best.mate,
              playerColor: await instance.getPlayerColor(),
            });
          }
        },
      );
      wire(instance, "displayMoves", async function (moves, profile, ...rest) {
        if (!eligible(instance, profile))
          return original.displayMoves.call(instance, moves, profile, ...rest);
        const state = profileState(instance, profile);
        if (state.selection && state.fen === instance.currentFen)
          return render(instance, profile, state);
      });
      wire(instance, "renderMetric", async function (fen, profile) {
        const result = await original.renderMetric.call(instance, fen, profile);
        if (eligible(instance, profile, fen))
          await metrics(instance, profile, profileState(instance, profile));
        return result;
      });
      wire(
        instance.Interface,
        "getMoveVisualSettings",
        function (move, index, total, options) {
          const visual = original.getMoveVisualSettings.call(
            instance.Interface,
            move,
            index,
            total,
            options,
          );
          if (!visual || !eligible(instance, move.profile)) return visual;
          const cfg = settings(move.profile).visualIntelligence;
          return {
            ...visual,
            shapeConfig: {
              ...visual.shapeConfig,
              lineWidth:
                (visual.shapeConfig.lineWidth *
                  cfg.arrowScale *
                  cfg.lineWidth) /
                2,
              arrowheadWidth:
                visual.shapeConfig.arrowheadWidth * cfg.arrowScale,
              arrowheadHeight:
                visual.shapeConfig.arrowheadHeight * cfg.arrowScale,
              startOffset: visual.shapeConfig.startOffset * cfg.arrowScale,
            },
          };
        },
      );
      wire(instance.Interface, "getMoveShapes", function (move, index, ctx) {
        const shapes = original.getMoveShapes.call(
          instance.Interface,
          move,
          index,
          ctx,
        );
        if (move.chessinsperAnnotation && eligible(instance, move.profile))
          shapes.push({
            shapeType: "rectangle",
            shapeSquare: move.player[0],
            shapeConfig: {
              style: `fill:none;stroke:${settings(move.profile).visualIntelligence.colors.best};stroke-width:0.6%;rx:40%;ry:40%;`,
            },
          });
        return shapes;
      });
      wire(
        instance.CommLink.commands,
        "renderVisualsToSite",
        async function (markings) {
          return original.renderVisuals(
            (markings || []).map((mark) =>
              mark.category === "move" && eligible(instance, mark.profileID)
                ? { ...mark, category: "chessinsper-move" }
                : mark,
            ),
          );
        },
      );
      if (typeof original.startNewMatch === "function")
        wire(instance, "startNewMatch", function (...args) {
          hook.profiles.forEach((state) => {
            state.signature = null;
            state.selection = null;
            state.pool = new Map();
          });
          return original.startNewMatch.apply(instance, args);
        });
      if (typeof original.close === "function")
        wire(instance, "close", function (...args) {
          detach(instance);
          return original.close.apply(instance, args);
        });
    }
    function detach(instance) {
      const hook = hooks.get(instance);
      if (!hook) return;
      hook.profiles.forEach((state) =>
        state.metrics?.forEach((elem) => elem.remove()),
      );
      for (const [name, fn] of Object.entries(hook.original))
        if (
          [
            "getConfigValue",
            "sendMsgToEngine",
            "engineMessageProcessor",
            "displayMoves",
            "renderMetric",
            "startNewMatch",
            "close",
          ].includes(name)
        )
          instance[name] = fn;
      instance.Interface.getMoveVisualSettings =
        hook.original.getMoveVisualSettings;
      instance.Interface.getMoveShapes = hook.original.getMoveShapes;
      instance.CommLink.commands.renderVisualsToSite =
        hook.original.renderVisuals;
      hooks.delete(instance);
    }
    async function changed(profile) {
      for (const instance of hooks.keys()) {
        if (!instance.pV[profile]) continue;
        const hook = hooks.get(instance),
          enabled = settings(profile).enabled;
        if (!enabled) {
          const state = hook.profiles.get(profile);
          state?.metrics?.forEach((elem) => elem.remove());
          instance.instanceElem
            ?.querySelector("[data-chessinsper-coach]")
            ?.remove();
          await hook.original.renderVisuals([
            { category: "chessinsper-move", profileID: profile },
          ]);
          await hook.original.renderVisuals([
            { category: "chessinsper-metric", profileID: profile },
          ]);
          hook.profiles.delete(profile);
          hook.enabled.delete(profile);
          if (typeof instance.createAndLoadSpecificEngine === "function")
            await instance.createAndLoadSpecificEngine(profile);
          continue;
        }
        hook.enabled.add(profile);
        const state = profileState(instance, profile);
        if (state.selection) {
          await render(instance, profile, state);
          await metrics(instance, profile, state);
        } else if (instance.currentFen)
          await instance.calculateBestMoves(instance.currentFen, {
            specificProfileName: profile,
            skipValidityChecks: true,
          });
      }
    }
    async function pulse() {
      if (busy || stopped) return;
      busy = true;
      try {
        if (
          !native()?.getValue ||
          !Array.isArray(page.AcasInstances) ||
          !page.Chess
        ) {
          panel?.status(
            "Ative o userscript A.C.A.S oficial e recarregue este painel.",
          );
          return;
        }
        panel?.status("A.C.A.S oficial conectado · Chessinsper complementar");
        for (const entry of page.AcasInstances) {
          const instance = entry.instance;
          if (!compatible(instance)) continue;
          attach(instance);
          const hook = hooks.get(instance),
            names = Object.keys(instance.pV || {});
          for (const profile of names) {
            const enabled = settings(profile).enabled;
            if (enabled) {
              const state = profileState(instance, profile);
              if (instance.pV[profile].engineSettingsReady && !state.queried) {
                state.queried = true;
                await hook.original.sendMsgToEngine.call(
                  instance,
                  "uci",
                  profile,
                  true,
                );
              }
              if (!hook.enabled.has(profile)) {
                hook.enabled.add(profile);
                await changed(profile);
              }
            } else if (hook.enabled.has(profile)) await changed(profile);
          }
          if (
            names.some((name) => settings(name).enabled) &&
            Date.now() - hook.markerAt > 3000 &&
            instance.currentFen
          ) {
            hook.markerAt = Date.now();
            await hook.original.renderVisuals([
              {
                profileID: "ChessinsperAddon",
                category: "chessinsper-link",
                shapeType: "text",
                shapeSquare: "a1",
                shapeConfig: {
                  text:
                    LINK_PREFIX +
                    guiID +
                    ":" +
                    instance.instanceID +
                    ":" +
                    Date.now(),
                  style: "opacity:0;pointer-events:none;",
                },
              },
            ]);
          }
        }
        for (const instance of hooks.keys())
          if (
            instance.instanceClosed ||
            !page.AcasInstances.some((entry) => entry.instance === instance)
          )
            detach(instance);
        panel?.sync();
      } catch (error) {
        panel?.status(
          "A integração aguarda o painel do A.C.A.S. Recarregue se este aviso persistir.",
        );
        console.warn("Chessinsper addon:", error);
      } finally {
        busy = false;
      }
    }
    const services = {
      settings,
      save: async (profile, value) => {
        save(profile, value);
        await changed(profile);
      },
      profiles,
      native,
      guiID,
    };
    return {
      start() {
        panel = root.ChessinsperAddonPanel.create(services, page);
        panel.initialize();
        timer = root.setInterval(() => void pulse(), 500);
        void pulse();
      },
      stop() {
        stopped = true;
        root.clearInterval(timer);
        bus.kill();
        [...hooks.keys()].forEach(detach);
        panel?.stop();
      },
      status: () => ({
        version: VERSION,
        guiID,
        instances: hooks.size,
        connected: !!native()?.getValue,
      }),
    };
  }
  root.ChessinsperAddon = {
    VERSION,
    PROFILE_PREFIX,
    CLIENT_PREFIX,
    LINK_PREFIX,
    settings,
    save,
    id,
    createGUI,
  };
})(globalThis);
