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
