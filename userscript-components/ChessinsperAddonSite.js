/* Chessinsper execution and lifecycle adapter. It does not load an engine or draw a board overlay. */
(function (root) {
  "use strict";
  const addon = root.ChessinsperAddon;
  const visible = (elem) =>
    elem?.isConnected &&
    elem.getClientRects().length &&
    root.getComputedStyle(elem).visibility !== "hidden";
  function boardElement(document) {
    for (const selector of [
      "wc-chess-board",
      "chess-board",
      ".board-layout-chessboard .board",
      "cg-board",
    ]) {
      const board = [...document.querySelectorAll(selector)].find(visible);
      if (board) return board;
    }
    return null;
  }
  function orientation(board, fallback = "w") {
    if (
      board?.classList.contains("flipped") ||
      board?.closest(".orientation-black") ||
      board?.parentElement?.querySelector(
        "coords.files.black, coords.side.black",
      )
    )
      return "b";
    if (board?.closest(".orientation-white")) return "w";
    return fallback;
  }
  function placement(board, side = "w") {
    if (!board) return null;
    const rows = Array.from({ length: 8 }, () => Array(8).fill(null)),
      rect = board.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const pieces = [...board.querySelectorAll(".piece, piece")].filter(
      (e) => !e.classList.contains("ghost"),
    );
    if (!pieces.length) return null;
    for (const piece of pieces) {
      let file, rank, code;
      const token = [...piece.classList].find((c) => /^[wb][prnbqk]$/.test(c));
      const square = [...piece.classList].find((c) =>
        /^square-[1-8][1-8]$/.test(c),
      );
      if (token && square) {
        code = token[0] === "w" ? token[1].toUpperCase() : token[1];
        file = Number(square[7]) - 1;
        rank = Number(square[8]) - 1;
      } else {
        const type = ["pawn", "knight", "bishop", "rook", "queen", "king"].find(
          (c) => piece.classList.contains(c),
        );
        const short = [...piece.classList].find((c) =>
          /^[pnbrqk]-piece$/.test(c),
        );
        if (
          (!type && !short) ||
          (!piece.classList.contains("white") &&
            !piece.classList.contains("black"))
        )
          return null;
        const letter = short
          ? short[0]
          : {
              pawn: "p",
              knight: "n",
              bishop: "b",
              rook: "r",
              queen: "q",
              king: "k",
            }[type];
        code = piece.classList.contains("white")
          ? letter.toUpperCase()
          : letter;
        const style = root.getComputedStyle(piece),
          matrix = new root.DOMMatrix(style.transform);
        let x = matrix.e / (rect.width / 8),
          y = matrix.f / (rect.height / 8);
        if (style.transform === "none") {
          const p = piece.getBoundingClientRect();
          x = (p.left - rect.left) / (rect.width / 8);
          y = (p.top - rect.top) / (rect.height / 8);
        }
        if (
          Math.abs(x - Math.round(x)) > 0.2 ||
          Math.abs(y - Math.round(y)) > 0.2
        )
          return null;
        file = Math.round(x);
        rank = 7 - Math.round(y);
        if (side === "b") {
          file = 7 - file;
          rank = 7 - rank;
        }
      }
      if (file < 0 || file > 7 || rank < 0 || rank > 7 || rows[rank][file])
        return null;
      rows[rank][file] = code;
    }
    return rows
      .reverse()
      .map((row) => {
        let value = "",
          spaces = 0;
        for (const piece of row) {
          if (!piece) spaces++;
          else {
            if (spaces) value += spaces;
            spaces = 0;
            value += piece;
          }
        }
        if (spaces) value += spaces;
        return value;
      })
      .join("/");
  }
  function create(page) {
    const clientID = addon.id(),
      domain = location.hostname.replace(/^www\./, ""),
      controllers = new Map();
    const bus = new CommLinkHandler(`chessinsper-client-${clientID}`, {
      silentMode: true,
      statusCheckInterval: 20,
      singlePacketResponseWaitTime: 1200,
      maxSendAttempts: 1,
    });
    let markerAt = 0;
    let guiID = null,
      nativeID = null,
      nativeFen = null,
      playerColor = "w",
      activeProfile = null,
      timer = null,
      busy = false,
      leaseSince = 0,
      ready = false,
      lastTick = 0,
      lastRegistered = null,
      stopped = false,
      lastExecution = null;
    const clientKey = addon.CLIENT_PREFIX + clientID;
    function getFen() {
      const board = boardElement(document),
        basic = placement(board, orientation(board, playerColor));
      if (!basic || !nativeFen) return null;
      return basic + " " + nativeFen.split(" ").slice(1).join(" ");
    }
    function owns(profile, claim = false) {
      if (
        profile !== activeProfile ||
        !nativeID ||
        Date.now() - markerAt > 12000
      )
        return false;
      const key = root.ChessinsperBehavior.key(domain, profile) + ":owner",
        owner = GM_getValue(key),
        time = Date.now();
      if (owner?.id !== clientID && owner?.until > time) return false;
      if (owner?.id !== clientID) {
        if (!claim) return false;
        leaseSince = time;
        const entry = controllers.get(profile);
        if (entry) entry.controller = makeController(profile, entry.settings);
      }
      GM_setValue(key, { id: clientID, until: time + 10000 });
      return time - leaseSince >= 1000 && GM_getValue(key)?.id === clientID;
    }
    function release(profile) {
      if (!profile) return;
      const key = root.ChessinsperBehavior.key(domain, profile) + ":owner";
      if (GM_getValue(key)?.id === clientID) GM_deleteValue(key);
    }
    function makeController(profile, cfg) {
      const key = root.ChessinsperBehavior.key(domain, profile);
      return root.ChessinsperBehavior.create(cfg, {
        read: () => GM_getValue(key),
        write: (value) => {
          if (GM_getValue(key + ":owner")?.id === clientID)
            GM_setValue(key, value);
        },
      });
    }
    function entry(profile) {
      const cfg = addon.settings(profile);
      let value = controllers.get(profile);
      if (!value) {
        value = {
          settings: cfg,
          controller: makeController(profile, cfg),
          firstFen: null,
          lastFen: null,
          fenAt: Date.now(),
          lastIdleAt: 0,
        };
        controllers.set(profile, value);
      }
      value.settings = cfg;
      value.controller.configure(cfg);
      return value;
    }
    function clockContext() {
      const text =
        document
          .querySelector(
            ".clock-bottom .clock-time-monospace, .clock-bottom, .rclock-bottom .time",
          )
          ?.textContent.trim() || "";
      const match = text.match(/^(?:(\d+):)?(\d+):(\d+(?:\.\d+)?)$/);
      const clockSeconds = match
        ? Number(match[1] || 0) * 3600 +
          Number(match[2]) * 60 +
          Number(match[3])
        : null;
      const timeControl =
        document
          .querySelector(
            '[data-cy="time-control"], .time-control, .game-controls-clock',
          )
          ?.textContent.trim() || null;
      const rating = document
        .querySelector(
          '.player-top .user-tagline-rating, .player-top [data-cy="user-rating"], .ruser-top .rating',
        )
        ?.textContent.match(/\b\d{3,4}\b/);
      return {
        playerColor,
        clockSeconds,
        timeControl,
        opponentRating: rating ? Number(rating[0]) : null,
      };
    }
    function match(fen) {
      const key = `ChessinsperAddon.Match:${domain}:${location.pathname}`;
      let value = GM_getValue(key);
      const routeID =
        location.pathname.match(/\/game\/(?:live|daily)\/(\d+)/)?.[1] ||
        (/lichess\.org$/.test(domain)
          ? location.pathname.match(/^\/([a-zA-Z0-9]{8,12})(?:\/|$)/)?.[1]
          : null);
      const basic = fen?.split(" ")[0];
      if (
        !value ||
        value.route !== location.pathname ||
        (value.ended && basic && basic !== value.fen?.split(" ")[0])
      ) {
        value = {
          id: routeID ? `${domain}:${routeID}` : `${domain}:${addon.id()}`,
          route: location.pathname,
          fen,
          ended: false,
        };
        GM_setValue(key, value);
        input.reset();
        controllers.forEach((v) => {
          v.firstFen = null;
        });
        if (guiID)
          void bus.send(`chessinsper-gui-${guiID}`, "newgame", {
            clientID,
            nativeInstanceID: nativeID,
          });
      }
      const pageState = root.ChessinsperBehavior.readPage(
        document,
        playerColor,
      );
      if (value.fen !== fen || value.ended !== pageState.gameOver)
        GM_setValue(key, {
          ...value,
          fen: fen || value.fen,
          ended: pageState.gameOver,
        });
      return { gameId: value.id, ...pageState };
    }
    function snapshot() {
      const fen = getFen();
      return {
        ...clockContext(),
        ...match(fen),
        fen,
        queueAvailable: !!root.ChessinsperBehavior.readPage(
          document,
          playerColor,
        ).queueButton,
      };
    }
    async function recover(source) {
      input.cancel();
      if (
        !activeProfile ||
        !owns(activeProfile) ||
        !addon.settings(activeProfile).enabled
      )
        return;
      const value = entry(activeProfile);
      value.controller.recover(source);
      input.reset();
      if (guiID && nativeID)
        await bus.send(`chessinsper-gui-${guiID}`, "recover", {
          clientID,
          nativeInstanceID: nativeID,
          profile: activeProfile,
        });
    }
    const input = root.ChessinsperAutomation.create({
      getBoard: () => boardElement(document),
      getFen,
      getOrientation: () => orientation(boardElement(document), playerColor),
      enabled: (profile, planned) => {
        const cfg = addon.settings(profile);
        return (
          cfg.enabled &&
          cfg.automation.enabled &&
          owns(profile) &&
          entry(profile).controller.canMove() &&
          !root.ChessinsperBehavior.readPage(document, playerColor).gameOver &&
          (!planned ||
            root.ChessinsperCore.behaviorSignature(cfg) ===
              root.ChessinsperCore.behaviorSignature(planned))
        );
      },
      persona: (profile) => entry(profile).controller.context().hardwarePersona,
      onConfirmed: (packet) => {
        entry(packet.profile).controller.recordMove(packet);
        if (guiID)
          void bus.send(`chessinsper-gui-${guiID}`, "confirmed", {
            ...packet,
            clientID,
            nativeInstanceID: nativeID,
            role: "own",
          });
      },
    });
    const supervisor = root.ChessinsperBehavior.createSupervisor({
      tick: () => pulse(true),
      cancel: () => input.cancel(),
      checkpoint: () =>
        controllers.forEach((value) => value.controller.checkpoint()),
      recover: (source) => void recover(source),
    });
    bus.registerListener(`chessinsper-client-${clientID}`, (packet) => {
      const data = packet.data;
      if (!data || data.nativeInstanceID !== nativeID || !data.profile)
        return { ok: false };
      nativeFen = data.fen;
      playerColor = data.playerColor || playerColor;
      const value = entry(data.profile),
        current = getFen();
      if (
        !value.settings.enabled ||
        !current ||
        current.split(" ")[0] !== data.fen?.split(" ")[0]
      )
        return { ok: false, reason: "position-changed" };
      if (packet.command === "context") {
        if (owns(data.profile)) value.controller.observe(snapshot());
        return {
          ok: true,
          context: { ...clockContext(), ...value.controller.context() },
        };
      }
      if (packet.command === "move") {
        if (!owns(data.profile)) return { ok: false, reason: "inactive-tab" };
        value.controller.observe(snapshot());
        value.controller.recordAnalysis(data);
        if (!value.controller.canMove()) return { ok: true, reason: "paused" };
        if (value.settings.automation.afterUser) {
          const key = current.split(" ").slice(0, 2).join(" ");
          if (!value.firstFen) value.firstFen = key;
          if (value.firstFen === key) return { ok: true, reason: "after-user" };
        }
        void input.run(data).then((result) => {
          lastExecution = result;
        });
        return { ok: true };
      }
      return { ok: false };
    });
    function queueAndIdle(value) {
      const cfg = value.settings,
        c = value.controller,
        s = snapshot(),
        was = c.canMove();
      c.observe(s);
      if (!was && c.canMove()) void recover("retomada da sessão");
      const key = root.ChessinsperBehavior.key(domain, activeProfile),
        command = GM_getValue(key + ":command");
      if (command?.id) {
        if (command.type === "pause") {
          c.pause(true);
          input.cancel();
        }
        if (command.type === "resume") {
          c.pause(false);
          void recover("retomada manual");
        }
        if (command.type === "reset") {
          c.resetSession();
          void recover("nova sessão");
        }
        GM_deleteValue(key + ":command");
      }
      if (!c.canMove()) input.cancel();
      if (
        c.queueDecision().allowed &&
        cfg.automation.enabled &&
        !input.isActive()
      ) {
        const live = addon.settings(activeProfile),
          state = root.ChessinsperBehavior.readPage(document, playerColor);
        if (
          live.enabled &&
          live.automation.enabled &&
          live.session.autoQueue &&
          owns(activeProfile) &&
          state.gameOver &&
          state.queueButton
        ) {
          c.queueAttempt();
          state.queueButton.click();
        }
      }
      if (c.canResign() && cfg.automation.enabled && !input.isActive()) {
        const confirming = c.status().resignStage === "confirm";
        const selector = confirming
          ? 'button[data-cy="confirm-resign"], [data-cy="resign-confirmation"] button, .resign-confirmation button, button.confirm-resign'
          : '[data-cy="resign-button"], .resign-button-component button, button.resign';
        const button = [...document.querySelectorAll(selector)].find(
          (e) =>
            visible(e) &&
            !e.disabled &&
            (!confirming ||
              /^(?:resign|abandonar|desistir|confirm(?:ar)?(?: resignation)?|yes|sim)$/i.test(
                e.textContent || e.getAttribute("aria-label") || "",
              )),
        );
        if (button && !s.gameOver && owns(activeProfile)) {
          c.resignAttempt(confirming);
          button.click();
        }
      }
      const time = Date.now();
      if (value.lastFen !== s.fen) {
        value.lastFen = s.fen;
        value.fenAt = time;
      }
      if (
        cfg.idleMouse.enabled &&
        cfg.automation.enabled &&
        c.canMove() &&
        !input.isActive() &&
        time - value.fenAt > cfg.idleMouse.triggerAfterMs &&
        time - value.lastIdleAt > 1200 &&
        Math.random() < cfg.idleMouse.actionChance
      ) {
        value.lastIdleAt = time;
        const board = boardElement(document),
          rect = board?.getBoundingClientRect();
        if (rect?.width)
          board.dispatchEvent(
            new MouseEvent("mousemove", {
              bubbles: true,
              buttons: 0,
              clientX: rect.left + rect.width * (0.2 + Math.random() * 0.6),
              clientY: rect.top + rect.height * (0.2 + Math.random() * 0.6),
            }),
          );
      }
    }
    async function pulse(fromSupervisor = false) {
      if (busy || stopped || Date.now() - lastTick < 400) return;
      busy = true;
      lastTick = Date.now();
      try {
        const marker = [...document.querySelectorAll("svg text")].find((e) =>
          e.textContent.startsWith(addon.LINK_PREFIX),
        );
        if (marker) {
          const [gui, native, timestamp] = marker.textContent
            .slice(addon.LINK_PREFIX.length)
            .split(":");
          markerAt = Number(timestamp) || 0;
          if (gui !== guiID || native !== nativeID) {
            guiID = gui;
            nativeID = native;
            nativeFen = null;
            lastRegistered = null;
            input.reset();
          }
        }
        if (Date.now() - markerAt > 12000) {
          input.cancel();
          ready = false;
        }
        const enabled = GM_listValues()
          .filter((key) => key.startsWith(addon.PROFILE_PREFIX))
          .map((key) => key.slice(addon.PROFILE_PREFIX.length))
          .filter((profile) => addon.settings(profile).enabled);
        const preferred = GM_getValue(
          "ChessinsperAddon.SelectedProfile",
          "default",
        );
        const next =
          enabled.includes(preferred) &&
          addon.settings(preferred).automation.enabled
            ? preferred
            : enabled.find(
                (profile) => addon.settings(profile).automation.enabled,
              ) ||
              enabled[0] ||
              null;
        if (next !== activeProfile) {
          if (activeProfile && owns(activeProfile)) {
            entry(activeProfile).controller.configure(
              addon.settings(activeProfile),
            );
            entry(activeProfile).controller.checkpoint();
          }
          input.cancel();
          release(activeProfile);
          activeProfile = next;
          leaseSince = Date.now();
          ready = false;
        }
        const value = next ? entry(next) : null;
        if (value?.settings.afk.enabled) supervisor.start(value.settings.afk);
        else if (supervisor.isActive()) supervisor.stop();
        if (nativeID && guiID && value) {
          const owned = owns(next, true);
          GM_setValue(clientKey, {
            id: clientID,
            nativeInstanceID: nativeID,
            guiID,
            domain,
            at: Date.now(),
            ready: owned,
          });
          if (lastRegistered !== nativeID) {
            lastRegistered = nativeID;
            await bus.send(`chessinsper-gui-${guiID}`, "register", {
              id: clientID,
              nativeInstanceID: nativeID,
            });
          }
          if (owned && !ready) {
            ready = true;
            void recover("conexão ao A.C.A.S");
          }
          if (owned && nativeFen) queueAndIdle(value);
        }
      } catch (error) {
        console.warn("Chessinsper site adapter:", error);
      } finally {
        busy = false;
      }
    }
    return {
      start() {
        timer = root.setInterval(() => void pulse(), 500);
        void pulse();
      },
      stop() {
        stopped = true;
        root.clearInterval(timer);
        input.cancel();
        supervisor.stop();
        release(activeProfile);
        GM_deleteValue(clientKey);
        bus.kill();
      },
      status: () => ({
        clientID,
        nativeInstanceID: nativeID,
        guiID,
        profile: activeProfile,
        ready,
        lastExecution,
      }),
    };
  }
  root.ChessinsperAddonSite = { create, boardElement, placement, orientation };
})(globalThis);
