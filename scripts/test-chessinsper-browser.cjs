const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const repo = path.resolve(__dirname, "..");
const userscript = fs.readFileSync(path.join(repo, "acas.user.js"), "utf8");
const userscriptInfo = {
  script: {
    name: "A.C.A.S × Chessinsper",
    version: userscript.match(/@version\s+(\S+)/)[1],
  },
};
const base = process.env.ACAS_TEST_BASE_URL || "http://localhost/ACASIOS/";
const passed = [];
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
    ...(process.env.HTTPS_PROXY
      ? {
          proxy: {
            server: process.env.HTTPS_PROXY,
            bypass: "localhost,127.0.0.1",
          },
        }
      : {}),
    env: {
      ...process.env,
      XDG_CONFIG_HOME: "/workspace/acasios-cloud/browser-config",
      XDG_CACHE_HOME: "/tmp/acas-browser-cache",
    },
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    });
    await context.addInitScript({
      content:
        `
   window.unsafeWindow=window;
   window.GM_info=${JSON.stringify(userscriptInfo)};
   window.GM_getValue=(k,f)=>{const s=localStorage.getItem('test-gm-'+k);return s===null?f:JSON.parse(s)};
   window.GM_setValue=(k,v)=>localStorage.setItem('test-gm-'+k,JSON.stringify(v));
   window.GM_deleteValue=k=>localStorage.removeItem('test-gm-'+k);
   window.GM_listValues=()=>Object.keys(localStorage).filter(k=>k.startsWith('test-gm-')).map(k=>k.slice(8));
   window.__testWorkers=[];const NativeWorker=window.Worker;
   window.Worker=new Proxy(NativeWorker,{construct(target,args){window.__testWorkers.push(String(args[0]));return Reflect.construct(target,args)}});
  ` +
        fs.readFileSync(
          path.join(repo, "userscript-components/LegacyGM.js"),
          "utf8",
        ) +
        "\n" +
        "\nif (location.pathname.includes('/app/dev')) {\n" +
        ["CommLink.js", "UniversalBoardDrawer.js", "AutomaticMove.js"]
          .map((name) =>
            fs.readFileSync(
              path.join(repo, "userscript-components", name),
              "utf8",
            ),
          )
          .join("\n") +
        "\n" +
        userscript +
        "\n} else {\n" +
        userscript +
        "\n}",
    });
    context.setDefaultTimeout(20000);
    const page = await context.newPage(),
      errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") console.error(m.text().slice(0, 450));
    });
    await page.goto(base + "app/", { waitUntil: "load" });
    await page.locator("#tos-checkbox").check();
    await Promise.all([
      page.waitForURL(/\?t=/),
      page.locator("#tos-continue-button").click(),
    ]);
    await page.waitForSelector("#chessinsper-panel");
    await page
      .waitForFunction(() =>
        Object.values(GM_getValue("AcasConfig")?.global?.profiles || {}).some(
          (p) => p.chessinsper && p.chessEngine,
        ),
      )
      .catch(async (error) => {
        console.error(
          await page.evaluate(() => ({
            config: GM_getValue("AcasConfig"),
            filter: SETTING_FILTER_OBJ,
            body: document.body.innerText.slice(0, 1200),
          })),
        );
        throw error;
      });
    assert.equal(
      await page.locator("#chessinsper-activate").getAttribute("aria-pressed"),
      "false",
    );
    await page.locator("#chessinsper-activate").click();
    await page.waitForFunction(
      () =>
        document
          .querySelector("#chessinsper-activate")
          .getAttribute("aria-pressed") === "true",
    );
    passed.push(
      "Floating button activates Chessinsper for the selected profile",
    );
    const set = async (label, value) => {
      const field = page.getByLabel(label, { exact: true });
      const details = field.locator("xpath=ancestor::details");
      if ((await details.count()) && !(await details.evaluate((el) => el.open)))
        await details.locator("summary").click();
      if (typeof value === "boolean") await field.setChecked(value);
      else if ((await field.getAttribute("type")) === "color")
        await field.evaluate((el, v) => (el.value = v), value);
      else await field.fill(String(value));
      await field.dispatchEvent("change");
      await page.waitForTimeout(120);
    };
    await set("Profundidade manual", 4);
    await page
      .getByLabel("Profundidade", { exact: true })
      .selectOption("manual");
    await set("Força do perfil (ELO)", 800);
    await set("Limite de setas", 2);
    await set("Cor do lance escolhido", "#123abc");
    const stored = await page.evaluate(() =>
      JSON.parse(document.querySelector('input[data-key="chessinsper"]').value),
    );
    assert.equal(stored.engineUI.strength, 800);
    assert.equal(stored.visualIntelligence.maxArrows, 2);
    await page.reload({ waitUntil: "load" });
    await page.waitForSelector("#chessinsper-panel");
    await page.waitForFunction(
      () =>
        document.querySelector('[data-chessinsper="engineUI.strength"]')
          .value === "800",
    );
    passed.push("Unified controls persist across reload");
    const primaryProfile = await page.evaluate(
      () => SETTING_FILTER_OBJ.profileID,
    );
    await page.evaluate(async () => {
      const config = GM_getValue("AcasConfig");
      config.global.profiles[
        GET_PROFILE_STORAGE_KEY("Chessinsper secundário")
      ] = {
        engineEnabled: false,
        chessinsper: JSON.stringify(ChessinsperCore.defaults()),
      };
      GM_setValue("AcasConfig", config);
      SETTING_FILTER_OBJ.profileID = "Chessinsper secundário";
      const { loopThroughAndUpdateSettingsValues } = await import(
        "./assets/js/gui/settings.js"
      );
      await loopThroughAndUpdateSettingsValues(false);
    });
    assert.equal(
      await page.locator("#chessinsper-activate").getAttribute("aria-pressed"),
      "false",
    );
    await set("Força do perfil (ELO)", 1250);
    await page.evaluate(async (profile) => {
      SETTING_FILTER_OBJ.profileID = profile;
      const { loopThroughAndUpdateSettingsValues } = await import(
        "./assets/js/gui/settings.js"
      );
      await loopThroughAndUpdateSettingsValues(false);
    }, primaryProfile);
    assert.equal(
      await page
        .getByLabel("Força do perfil (ELO)", { exact: true })
        .inputValue(),
      "800",
    );
    assert.equal(
      await page.evaluate(
        () =>
          JSON.parse(
            GM_getValue("AcasConfig").global.profiles[
              GET_PROFILE_STORAGE_KEY("Chessinsper secundário")
            ].chessinsper,
          ).engineUI.strength,
      ),
      1250,
    );
    passed.push(
      "Chessinsper settings stay isolated between native A.C.A.S profiles",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    const mobile = await page
      .locator("#chessinsper-panel")
      .evaluate((panel) => {
        const box = panel.getBoundingClientRect();
        return {
          width: box.width,
          viewport: innerWidth,
          columns: getComputedStyle(
            panel.querySelector(".chessinsper-grid"),
          ).gridTemplateColumns.split(" ").length,
        };
      });
    assert.ok(mobile.width <= mobile.viewport);
    assert.equal(mobile.columns, 1);
    const floating = await page.locator("#chessinsper-activate").boundingBox();
    assert.ok(
      floating.x >= 0 &&
        floating.x + floating.width <= 390 &&
        floating.y + floating.height <= 844,
    );
    if (process.env.ACAS_TEST_SCREENSHOT_DIR) {
      fs.mkdirSync(process.env.ACAS_TEST_SCREENSHOT_DIR, { recursive: true });
      await page.locator("#chessinsper-panel").hover();
      await page.locator("#chessinsper-panel").screenshot({
        path: path.join(
          process.env.ACAS_TEST_SCREENSHOT_DIR,
          "chessinsper-mobile.png",
        ),
      });
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    if (process.env.ACAS_TEST_SCREENSHOT_DIR) {
      await page.locator("#chessinsper-panel").hover();
      await page.locator("#chessinsper-panel").screenshot({
        path: path.join(
          process.env.ACAS_TEST_SCREENSHOT_DIR,
          "chessinsper-desktop.png",
        ),
      });
    }
    passed.push("Integrated panel fits a mobile viewport");
    await page.evaluate(async () => {
      const key = GET_PROFILE_STORAGE_KEY(SETTING_FILTER_OBJ.profileID),
        config = GM_getValue("AcasConfig");
      config.global.profiles[key].chessEngine = "stockfish-19-lite-single";
      config.global.profiles[key].enableMoveRatings = false;
      config.global.profiles[key].enableAdvancedElo = true;
      GM_setValue("AcasConfig", config);
      const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        id = "chessinsper-test";
      USERSCRIPT.instanceVars.fen.set(id, fen);
      USERSCRIPT.instanceVars.playerColor.set(id, "w");
      USERSCRIPT.instanceVars.turn.set(id, "w");
      USERSCRIPT.instanceVars.gameStateHistory.set(id, [
        {
          fen: { full: fen, basic: fen.split(" ")[0] },
          boardChanges: { from: null, to: null, promotionPiece: null },
        },
      ]);
      const { createInstance } = await import("./assets/js/instanceManager.js");
      await createInstance("localhost", id, "chess");
      window.__instance = window.AcasInstances.find(
        (o) => o.id === id,
      ).instance;
      window.__packets = [];
      __instance.CommLink.commands.chessinsperContext = async () => ({
        clockSeconds: 300,
        timeControl: "5|0",
      });
      __instance.CommLink.commands.chessinsperMove = (packet) => {
        __packets.push(packet);
        return true;
      };
      setInterval(() => {
        const o = window.AcasInstances.find((o) => o.id === id);
        if (o) o.date = Date.now();
      }, 500);
    });
    await page.waitForFunction(() => window.__instance?.instanceReady);
    try {
      await page.waitForFunction(() => window.__packets?.length > 0, null, {
        timeout: 15000,
      });
    } catch (error) {
      console.error(
        JSON.stringify(
          await page.evaluate(() => ({
            errors: document.querySelector(".acas-toast")?.textContent,
            ready: __instance.instanceReady,
            currentFen: __instance.currentFen,
            board: __instance.boardDimensions,
            profiles: Object.fromEntries(
              Object.entries(__instance.pV).map(([k, v]) => [
                k,
                {
                  depth: v.searchDepth,
                  multiPV: v.multiPV,
                  pending: v.pendingCalculations,
                  lastFen: v.lastFen,
                  options: Object.keys(v.uciOptions || {}),
                  past: v.pastMoveObjects.length,
                  marks: v.activeGuiMoveMarkings.length,
                },
              ]),
            ),
            workers: __testWorkers,
            body: document.body.innerText.slice(-1000),
          })),
          null,
          2,
        ),
      );
      throw error;
    }
    const result = await page.evaluate(() => {
      const profile = Object.keys(__instance.pV)[0],
        pv = __instance.pV[profile];
      return {
        plan: { depth: pv.searchDepth, multiPV: pv.multiPV },
        candidates: [...pv.latestCandidates.values()].map((m) => ({
          depth: m.depth,
          ranking: m.ranking,
        })),
        packets: __packets,
        marks: pv.activeGuiMoveMarkings.map((m) => ({
          move: m.player,
          style: m.otherElems?.[0]?.getAttribute("style"),
          visual: m.chessinsperVisual,
        })),
        workers: __testWorkers,
      };
    });
    assert.equal(result.plan.depth, 4);
    assert.ok(result.plan.multiPV >= 5);
    assert.ok(result.candidates.length >= 5);
    assert.ok(result.candidates.every((m) => m.depth === 4));
    assert.equal(result.marks.length, 2);
    assert.equal(result.marks[0].visual.primary, "#123abc");
    assert.match(result.marks[0].style, /#123abc|18,\s*58,\s*188/);
    assert.match(result.packets[0].move, /^[a-h][1-8][a-h][1-8][qrbn]?$/);
    assert.ok(
      result.workers.some((p) => p.includes("stockfish-19-lite-single")),
    );
    assert.ok(result.workers.every((p) => p.includes("/assets/engines/")));
    passed.push(
      "A.C.A.S loads Stockfish, applies profile depth and candidate count, selects a move and renders native arrows",
    );
    const metrics = await page.evaluate(async () => {
      const profile = Object.keys(__instance.pV)[0];
      const originalFen = __instance.currentFen;
      __instance.currentFen = "4k3/8/8/8/8/4r3/4B3/4K3 w - - 0 1";
      await __instance.renderMetric(__instance.currentFen, profile);
      __instance.currentFen = originalFen;
      return __instance.pV[profile].activeMetrics.map((m) => ({
        type: m.data.shapeType,
        category: m.data.category,
        profile: m.data.profileID,
        x: m.elem.getAttribute("x"),
        y: m.elem.getAttribute("y"),
      }));
    });
    assert.ok(metrics.some((m) => m.type === "text"));
    assert.ok(metrics.every((m) => m.category === "metric" && m.profile));
    assert.ok(
      metrics.every(
        (m) => Number.isFinite(Number(m.x)) && Number.isFinite(Number(m.y)),
      ),
    );
    passed.push(
      "Chessinsper board analysis creates correctly positioned native SVG metrics",
    );
    await set("Cor do lance escolhido", "#abcdef");
    await page.waitForFunction(
      () =>
        Object.values(__instance.pV)[0].activeGuiMoveMarkings[0]
          ?.chessinsperVisual?.primary === "#abcdef",
    );
    const updatedMove = await page.evaluate(() => {
      const m = Object.values(__instance.pV)[0].activeGuiMoveMarkings[0];
      return m.player.join("") + (m.playerPromotion || "");
    });
    assert.equal(updatedMove, result.packets[0].move);
    assert.equal(await page.evaluate(() => __packets.length), 1);
    passed.push(
      "Changing arrow colors preserves the chosen move without replaying it",
    );
    await set("Limite de setas", 0);
    await page.waitForFunction(
      () => Object.values(__instance.pV)[0].activeGuiMoveMarkings.length === 0,
    );
    assert.equal(
      await page.evaluate(() => __packets.length),
      1,
      "Changing visuals must not execute another move",
    );
    passed.push(
      "Zero arrows clears native markings without triggering automation",
    );
    await page.evaluate(() => {
      window.__previousEngine = __instance.getEngineAcasObj(
        Object.keys(__instance.pV)[0],
      );
    });
    await page.locator("#chessinsper-activate").click();
    await page.waitForFunction(() => {
      const profile = Object.keys(__instance.pV)[0],
        pv = __instance.pV[profile];
      const engine = __instance.getEngineAcasObj(profile);
      return (
        engine &&
        engine !== __previousEngine &&
        Object.keys(pv.uciOptions || {}).length &&
        !pv.chessinsperRuntime
      );
    });
    const restored = await page.evaluate(async () => {
      const profile = Object.keys(__instance.pV)[0],
        pv = __instance.pV[profile];
      return {
        depth: pv.searchDepth,
        nativeDepth: await __instance.getConfigValue(
          "advancedEloDepth",
          profile,
        ),
      };
    });
    assert.equal(restored.depth, restored.nativeDepth);
    passed.push("Disabling Chessinsper reloads the native engine settings");
    await page.evaluate(() => __instance.close());
    // Two local tabs exercise the real compiled userscript and CommLink shape transport.
    await page.evaluate(() => {
      const config = GM_getValue("AcasConfig"),
        key = GET_PROFILE_STORAGE_KEY(SETTING_FILTER_OBJ.profileID);
      const settings = ChessinsperCore.normalizeSettings(
        config.global.profiles[key].chessinsper,
      );
      settings.enabled = true;
      settings.visualIntelligence.maxArrows = 2;
      config.global.profiles[key].chessinsper = JSON.stringify(settings);
      config.global.profiles[key].autoMove = false;
      GM_setValue("AcasConfig", config);
    });
    const frontend = await context.newPage();
    frontend.on("pageerror", (e) => errors.push(e.message));
    await frontend.goto(base + "app/dev/", { waitUntil: "load" });
    await frontend.getByRole("button", { name: /Free Move/ }).click();
    await frontend.waitForFunction(
      () =>
        [...document.querySelectorAll("svg polygon")].some((el) =>
          el.getAttribute("style")?.includes("#abcdef"),
        ),
      null,
      { timeout: 20000 },
    );
    passed.push(
      "Compiled userscript receives native A.C.A.S arrow shapes across two local tabs",
    );
    await frontend.close();
    // Exercise move input against a local board fixture; never contact an online game.
    const automation = await page.evaluate(async () => {
      const board = document.createElement("div");
      board.style.cssText =
        "position:fixed;left:10px;top:10px;width:400px;height:400px;z-index:2147483647;";
      document.body.append(board);
      const start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
      let fen = start,
        enabled = true,
        count = 0;
      board.addEventListener("pointerup", (e) => {
        if (
          e.clientX > 220 &&
          e.clientX < 250 &&
          e.clientY > 220 &&
          e.clientY < 250
        ) {
          fen =
            ChessinsperAutomation.expectedBoard(start, "e2e4") +
            " b KQkq - 0 1";
          count++;
        }
      });
      const settings = ChessinsperCore.defaults();
      settings.automation.method = "click";
      settings.automation.minDelayMs = 0;
      settings.automation.maxDelayMs = 0;
      const actor = ChessinsperAutomation.create({
        getBoard: () => board,
        getFen: () => fen,
        getOrientation: () => "w",
        enabled: () => enabled,
      });
      const packet = {
        move: "e2e4",
        fen: start,
        profile: "default",
        settings,
        delayMs: 0,
      };
      const confirmed = await actor.run(packet),
        duplicate = await actor.run(packet);
      fen = start;
      const actor2 = ChessinsperAutomation.create({
        getBoard: () => board,
        getFen: () => fen,
        getOrientation: () => "w",
        enabled: () => enabled,
      });
      const pending = actor2.run({ ...packet, delayMs: 200 });
      const busy = await actor2.run({ ...packet, move: "d2d4" });
      enabled = false;
      const cancelled = await pending;
      enabled = true;
      fen = start;
      const actor3 = ChessinsperAutomation.create({
        getBoard: () => board,
        getFen: () => fen,
        getOrientation: () => "w",
        enabled: () => enabled,
      });
      const drag = await actor3.run({
        ...packet,
        settings: {
          ...settings,
          automation: { ...settings.automation, method: "drag" },
        },
      });
      fen = start.replace(" w ", " b ");
      const staleTurn = await actor3.run(packet);
      board.remove();
      const promotionBoard = document.createElement("div");
      promotionBoard.style.cssText = board.style.cssText;
      document.body.append(promotionBoard);
      const promotionFen = "4k3/P7/8/8/8/8/8/4K3 w - - 0 1";
      fen = promotionFen;
      let selected = null;
      promotionBoard.addEventListener("pointerup", (e) => {
        if (
          e.clientX < 20 ||
          e.clientX > 50 ||
          e.clientY < 20 ||
          e.clientY > 50
        )
          return;
        const dialog = document.createElement("div");
        dialog.className = "promotion-window";
        dialog.style.cssText =
          "position:fixed;left:10px;top:10px;z-index:2147483647;";
        for (const piece of ["q", "r", "b", "n"]) {
          const button = document.createElement("button");
          button.className = "promotion-piece w" + piece;
          button.textContent = piece;
          button.addEventListener("pointerup", () => {
            selected = piece;
            fen =
              ChessinsperAutomation.expectedBoard(
                promotionFen,
                "a7a8" + piece,
              ) + " b - - 0 1";
            dialog.remove();
          });
          dialog.append(button);
        }
        document.body.append(dialog);
      });
      const actor4 = ChessinsperAutomation.create({
        getBoard: () => promotionBoard,
        getFen: () => fen,
        getOrientation: () => "w",
        enabled: () => enabled,
      });
      const promotion = await actor4.run({
        ...packet,
        fen: promotionFen,
        move: "a7a8n",
      });
      promotionBoard.remove();
      return {
        confirmed,
        duplicate,
        busy,
        cancelled,
        count,
        drag,
        staleTurn,
        promotion,
        selected,
      };
    });
    assert.equal(automation.confirmed.status, "confirmed");
    assert.ok(["stale", "duplicate"].includes(automation.duplicate.status));
    assert.equal(automation.busy.status, "busy");
    assert.ok(
      ["stale", "failed", "cancelled"].includes(automation.cancelled.status),
    );
    assert.equal(automation.count, 2);
    assert.equal(automation.drag.status, "confirmed");
    assert.equal(automation.staleTurn.status, "stale");
    assert.equal(automation.promotion.status, "confirmed");
    assert.equal(automation.selected, "n");
    passed.push(
      "Confirmed click input, duplicate rejection, single-flight execution and cancellation on disable",
    );
    passed.push(
      "Drag input, stale-turn rejection and knight promotion work on local fixtures",
    );
    assert.deepEqual(errors, [], "Browser JavaScript exceptions");
    console.log(
      JSON.stringify({ passed: passed.length, checks: passed }, null, 2),
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(JSON.stringify({ passed, error: error.stack }, null, 2));
  process.exitCode = 1;
});
