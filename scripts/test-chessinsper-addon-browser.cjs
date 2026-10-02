/* Tests two independently scoped userscripts against an unmodified upstream checkout.
 * ACAS_OFFICIAL_ROOT points to the checkout served at http://localhost/A.C.A.S/.
 */
const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path");
const { chromium } = require("playwright");
const repo = path.resolve(__dirname, ".."),
  official = process.env.ACAS_OFFICIAL_ROOT || "/workspace/acas-official";
const base = process.env.ACAS_ADDON_TEST_URL || "http://localhost/A.C.A.S/";
const read = (dir, file) => fs.readFileSync(path.join(dir, file), "utf8");
const passed = [];
const push = passed.push.bind(passed);
passed.push = (v) => {
  console.log("PASS", v);
  return push(v);
};
setTimeout(() => {
  console.error("Watchdog: browser test stalled");
  process.exit(2);
}, 90000).unref();
function scope(prefix, info, code) {
  return `(function(){
 const unsafeWindow=window, GM_info=${JSON.stringify({ script: info })};
 const GM_getValue=(k,f)=>{const v=localStorage.getItem('${prefix}'+k);return v===null?f:JSON.parse(v)},
 GM_setValue=(k,v)=>localStorage.setItem('${prefix}'+k,JSON.stringify(v)),
 GM_deleteValue=k=>localStorage.removeItem('${prefix}'+k),
 GM_listValues=()=>Object.keys(localStorage).filter(k=>k.startsWith('${prefix}')).map(k=>k.slice(${prefix.length})),
 GM_registerMenuCommand=()=>{},GM_openInTab=()=>{},GM_setClipboard=()=>{},GM_notification=()=>{};
 ${code}
 })();`;
}
const originalDeps = [
  "LegacyGM.js",
  "CommLink.js",
  "UniversalBoardDrawer.js",
  "AutomaticMove.js",
]
  .map((file) => read(official, "userscript-components/" + file))
  .join("\n");
const addonDeps = ["LegacyGM.js", "CommLink.js"]
  .map((file) => read(official, "userscript-components/" + file))
  .join("\n");
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
  let context, gui, frontend;
  const errors = [];
  try {
    context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    });
    context.setDefaultTimeout(20000);
    await context.addInitScript({
      content:
        `if(location.hostname==='localhost'){window.__workers=[];const RealWorker=Worker;window.Worker=new Proxy(RealWorker,{construct(t,args){__workers.push(String(args[0]));return Reflect.construct(t,args)}});\n` +
        scope(
          "original-acas:",
          { name: "A.C.A.S", version: "2.5.0", namespace: "HKR" },
          originalDeps + "\n" + read(official, "acas.user.js"),
        ) +
        scope(
          "companion:",
          {
            name: "Chessinsper para A.C.A.S",
            version: "1.0.0",
            namespace: "Chessinsper.ACASAddon",
          },
          addonDeps + "\n" + read(repo, "chessinsper-acas.user.js"),
        ) +
        "\n}",
    });
    const open = async (url) => {
      console.log("OPEN", url);
      const p = await context.newPage();
      p.on("pageerror", (e) => {
        errors.push(e.message);
        console.error("PAGE", e.message);
      });
      p.on("console", (m) => {
        if (m.type() === "warning" && m.text().includes("Chessinsper"))
          console.error(m.text());
      });
      await p.goto(url, { waitUntil: "load" });
      return p;
    };
    gui = await open(base + "app/");
    console.log("TOS");
    await gui.locator("#tos-checkbox").check();
    await Promise.all([
      gui.waitForURL(/\?t=/),
      gui.locator("#tos-continue-button").click(),
    ]);
    console.log("PANEL");
    await gui.waitForSelector("#chessinsper-panel");
    await gui.waitForFunction(
      () => window.USERSCRIPT?.getValue && window.Chess,
    );
    const profile = await gui
      .locator('[data-key="chessEngineProfile"]')
      .inputValue();
    assert.equal(
      (await gui.evaluate(() => USERSCRIPT.getInfo())).script.name,
      "A.C.A.S",
    );
    const before = await gui.evaluate(() => USERSCRIPT.getValue("AcasConfig"));
    await gui.locator("#chessinsper-activate").click();
    await gui.waitForFunction(
      () =>
        document
          .querySelector("#chessinsper-activate")
          .getAttribute("aria-pressed") === "true",
    );
    assert.deepEqual(
      await gui.evaluate(() => USERSCRIPT.getValue("AcasConfig")),
      before,
    );
    assert.equal(await gui.locator('input[data-key="chessinsper"]').count(), 0);
    passed.push(
      "Own namespace and storage: activating companion leaves official A.C.A.S config and storage bridge intact",
    );
    const set = async (label, value) => {
      const f = gui.getByLabel(label, { exact: true }),
        details = f.locator("xpath=ancestor::details");
      if (await details.count())
        await details.evaluate((el) => (el.open = true));
      if (typeof value === "boolean") await f.setChecked(value);
      else if ((await f.getAttribute("type")) === "color")
        await f.evaluate((el, v) => (el.value = v), value);
      else await f.fill(String(value));
      await f.dispatchEvent("change");
      await gui.waitForTimeout(80);
    };
    await set("Profundidade manual", 4);
    await gui
      .getByLabel("Profundidade", { exact: true })
      .selectOption("manual");
    await set("Força do perfil (ELO)", 800);
    await set("Limite de setas", 2);
    await set("Cor do lance escolhido", "#123abc");
    await gui.reload({ waitUntil: "load" });
    await gui.waitForSelector("#chessinsper-panel");
    await gui.waitForFunction(
      () =>
        document.querySelector('[data-chessinsper="engineUI.strength"]')
          .value === "800",
    );
    assert.equal(
      await gui.locator("#chessinsper-activate").getAttribute("aria-pressed"),
      "true",
    );
    passed.push(
      "Floating button and all companion settings persist after reload",
    );
    await gui.setViewportSize({ width: 390, height: 844 });
    const mobile = await gui.locator("#chessinsper-panel").evaluate((el) => ({
      width: el.getBoundingClientRect().width,
      columns: getComputedStyle(
        el.querySelector(".chessinsper-grid"),
      ).gridTemplateColumns.split(" ").length,
    }));
    assert.ok(mobile.width <= 390);
    assert.equal(mobile.columns, 1);
    const b = await gui.locator("#chessinsper-activate").boundingBox();
    assert.ok(b.x >= 0 && b.x + b.width <= 390 && b.y + b.height <= 844);
    passed.push(
      "Standalone controls and fixed activation button fit a 390px mobile viewport",
    );
    await gui
      .locator('[data-key="chessEngineProfile"]')
      .evaluate((e) => (e.value = "Perfil secundário ç"));
    await gui.waitForFunction(
      () =>
        document.querySelector('[data-chessinsper="engineUI.strength"]')
          .value === "1800",
    );
    await set("Força do perfil (ELO)", 1250);
    await gui
      .locator('[data-key="chessEngineProfile"]')
      .evaluate((e) => (e.value = "default"));
    await gui.waitForFunction(
      () =>
        document.querySelector('[data-chessinsper="engineUI.strength"]')
          .value === "800",
    );
    assert.equal(
      await gui.evaluate(
        () =>
          JSON.parse(
            localStorage.getItem(
              "companion:ChessinsperAddon.Profile:Perfil secundário ç",
            ),
          ).engineUI.strength,
      ),
      1250,
    );
    passed.push(
      "Companion settings remain independent between native profile selections, including Unicode names",
    );

    await gui.setViewportSize({ width: 1280, height: 900 });
    await gui.evaluate(() => {
      const cfg = USERSCRIPT.getValue("AcasConfig"),
        key = GET_PROFILE_STORAGE_KEY(
          document.querySelector('[data-key="chessEngineProfile"]').value,
        );
      Object.assign(cfg.global.profiles[key], {
        chessEngine: "stockfish-19-lite-single",
        enableMoveRatings: false,
        enableAdvancedElo: true,
        renderOnExternalSite: true,
        autoMove: true,
      });
      USERSCRIPT.setValue("AcasConfig", cfg);
    });
    frontend = await open(base + "app/dev/");
    await frontend.evaluate(() => {
      const original = ChessgroundX;
      window.ChessgroundX = (...args) => {
        window.__localGround = original(...args);
        return __localGround;
      };
    });
    await frontend.getByRole("button", { name: /Free Move/ }).click();
    await frontend.waitForFunction(
      () => window.ChessinsperACASAddon?.status().ready,
      null,
      { timeout: 25000 },
    );
    await frontend.waitForFunction(
      () =>
        [...document.querySelectorAll("svg polygon")].some((el) =>
          el.getAttribute("style")?.includes("#123abc"),
        ),
      null,
      { timeout: 25000 },
    );
    await gui.waitForFunction(() => {
      const i = AcasInstances[0]?.instance;
      return i && i.pV[Object.keys(i.pV)[0]].activeGuiMoveMarkings.length === 2;
    });
    const result = await gui.evaluate(() => {
      const i = AcasInstances[0].instance,
        p = i.pV[Object.keys(i.pV)[0]];
      return {
        depth: p.searchDepth,
        multiPV: p.multiPV,
        marks: p.activeGuiMoveMarkings.length,
        workers: __workers.map((url) => new URL(url, location.href).href),
        fen: i.currentFen,
        info: USERSCRIPT.getInfo(),
        status: ChessinsperACASAddon.status(),
      };
    });
    assert.equal(result.depth, 4);
    assert.ok(result.multiPV >= 5);
    assert.equal(result.marks, 2);
    assert.ok(
      result.workers.some(
        (s) =>
          s.includes("/A.C.A.S/app/assets/engines/") &&
          s.includes("stockfish-19-lite-single"),
      ),
    );
    assert.ok(
      result.workers.every((s) => s.includes("/A.C.A.S/app/assets/engines/")),
    );
    assert.equal(result.info.script.name, "A.C.A.S");
    passed.push(
      "Two separately scoped userscripts bind the correct board and use official Stockfish, UCI analysis and native external SVG arrows",
    );
    await frontend.waitForTimeout(1200);
    assert.equal(
      await frontend.evaluate(
        () => document.querySelectorAll("piece:not(.ghost)").length,
      ),
      32,
      "Native autoMove must not run while companion automation is disabled",
    );
    passed.push(
      "Native autoMove is bypassed during companion control, preventing duplicate or unwanted moves",
    );
    await set("Cor do lance escolhido", "#abcdef");
    await frontend.waitForFunction(() =>
      [...document.querySelectorAll("svg polygon")].some((el) =>
        el.getAttribute("style")?.includes("#abcdef"),
      ),
    );
    await set("Limite de setas", 0);
    await gui.waitForFunction(
      () =>
        AcasInstances[0].instance.pV[
          Object.keys(AcasInstances[0].instance.pV)[0]
        ].activeGuiMoveMarkings.length === 0,
    );
    await frontend.waitForFunction(
      () => document.querySelectorAll("svg polygon").length === 0,
    );
    await set("Limite de setas", 2);
    passed.push(
      "Changing arrow colors and setting zero arrows updates the official renderer without another automated move",
    );
    // Chessground deliberately rejects synthetic DOM events. Supply a Chess.com DOM
    // input fixture and mirror its accepted legal move through the public local-board API.
    await frontend.evaluate(() => {
      const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        game = new Chess(fen);
      const board = document.createElement("wc-chess-board");
      board.style.cssText =
        "display:block;position:fixed;right:0;bottom:0;width:320px;height:320px;background:#999;z-index:9999";
      for (const square of game.board().flat().filter(Boolean)) {
        const p = document.createElement("div");
        p.className =
          "piece " +
          square.color +
          square.type +
          " square-" +
          (square.square.charCodeAt(0) - 96) +
          square.square[1];
        p.style.cssText =
          "position:absolute;width:40px;height:40px;left:" +
          (square.square.charCodeAt(0) - 97) * 40 +
          "px;top:" +
          (8 - Number(square.square[1])) * 40 +
          "px";
        board.append(p);
      }
      let selected = null;
      board.addEventListener("mousedown", (event) => {
        const rect = board.getBoundingClientRect(),
          file = Math.floor((event.clientX - rect.left) / 40),
          rank = 8 - Math.floor((event.clientY - rect.top) / 40),
          square = String.fromCharCode(97 + file) + rank;
        if (!selected) {
          selected = square;
          return;
        }
        const from = selected;
        selected = null;
        let move;
        try {
          move = game.move({ from, to: square });
        } catch {
          return;
        }
        if (!move) return;
        const token = (sq) => "square-" + (sq.charCodeAt(0) - 96) + sq[1],
          piece = board.querySelector("." + token(from)),
          capture = board.querySelector("." + token(square));
        capture?.remove();
        piece.classList.replace(token(from), token(square));
        piece.style.left = file * 40 + "px";
        piece.style.top = (8 - rank) * 40 + "px";
        __localGround.move(from, square);
      });
      document.body.append(board);
    });
    // Execute exactly one legal native-engine move through the companion input adapter.
    await set("Espera mínima (ms)", 0);
    await set("Espera máxima (ms)", 0);
    await gui
      .getByLabel("Execução do lance", { exact: true })
      .selectOption("click");
    await set("Executar lances automaticamente", true);
    const moveKey = "companion:ChessinsperBehavior:localhost:" + profile;
    await frontend.waitForFunction(
      (key) => JSON.parse(localStorage.getItem(key))?.status?.moves === 1,
      moveKey,
      { timeout: 20000 },
    );
    await gui.waitForFunction(
      () => AcasInstances[0].instance.currentFen.split(" ")[1] === "b",
    );
    passed.push(
      "Companion executes a legal native-engine move in a Chess.com DOM input fixture, mirrors the official board and confirms the position once",
    );
    await set("Executar lances automaticamente", false);
    // Session lifecycle uses only local fixtures; it never queues a game on a public site.
    await frontend.evaluate(() => {
      window.__queueClicks = 0;
      const modal = document.createElement("div");
      modal.dataset.cy = "game-over-modal";
      modal.style.cssText =
        "position:fixed;top:0;left:0;z-index:2147483647;background:white;color:black";
      modal.textContent = "You won ";
      const button = document.createElement("button");
      button.dataset.cy = "new-game-button";
      button.textContent = "New game";
      button.onclick = () => __queueClicks++;
      modal.append(button);
      document.body.append(modal);
    });
    await set("Executar lances automaticamente", true);
    const configure = async (patch) =>
      gui.evaluate(
        ({ profile, patch }) => {
          const key = "companion:ChessinsperAddon.Profile:" + profile,
            settings = JSON.parse(localStorage.getItem(key));
          for (const [k, v] of Object.entries(patch))
            settings[k] = { ...settings[k], ...v };
          localStorage.setItem(key, JSON.stringify(settings));
        },
        { profile, patch },
      );
    await configure({
      session: { autoQueue: true, betweenGamesMs: { min: 8000, max: 8000 } },
      postGame: { enabled: false },
      coach: { enabled: false },
    });
    const behaviorKey = "companion:ChessinsperBehavior:localhost:" + profile;
    await frontend.waitForFunction(
      (key) => JSON.parse(localStorage.getItem(key))?.status?.wins === 1,
      behaviorKey,
    );
    await gui.getByText("Sessões, fila e AFK", { exact: true }).click();
    await gui
      .getByRole("button", { name: "Pausar sessão", exact: true })
      .click();
    await frontend.waitForFunction(
      (key) => JSON.parse(localStorage.getItem(key))?.status?.paused,
      behaviorKey,
    );
    assert.equal(await frontend.evaluate(() => __queueClicks), 0);
    await gui
      .getByRole("button", { name: "Retomar sessão", exact: true })
      .click();
    await frontend.waitForFunction(() => __queueClicks === 1);
    assert.equal(
      await frontend.evaluate(
        (key) => JSON.parse(localStorage.getItem(key)).status.games,
        behaviorKey,
      ),
      1,
    );
    passed.push(
      "Session results persist once; pause/resume controls block and resume the local post-game queue",
    );
    await frontend.evaluate(() => window.dispatchEvent(new Event("pageshow")));
    await frontend.waitForFunction(
      (key) => JSON.parse(localStorage.getItem(key)).status.recoveries >= 2,
      behaviorKey,
    );
    assert.ok(
      await frontend.evaluate(() =>
        __workers.some((s) => s.startsWith("blob:")),
      ),
    );
    passed.push(
      "AFK uses a local heartbeat worker and recovers the native A.C.A.S analysis on page resume",
    );
    // Turn off native automation before restoring it, so the local free-move board remains unchanged.
    await gui.evaluate(() => {
      const cfg = USERSCRIPT.getValue("AcasConfig");
      Object.values(cfg.global.profiles).forEach((p) => (p.autoMove = false));
      USERSCRIPT.setValue("AcasConfig", cfg);
      window.__oldEngine = AcasInstances[0].instance.getEngineAcasObj(
        Object.keys(AcasInstances[0].instance.pV)[0],
      );
    });
    await gui.locator("#chessinsper-activate").click();
    await frontend.waitForFunction(
      () => ChessinsperACASAddon.status().profile === null,
    );
    await gui.waitForFunction(() => {
      const i = AcasInstances[0].instance,
        p = Object.keys(i.pV)[0];
      return (
        i.getEngineAcasObj(p) !== __oldEngine && i.pV[p].engineSettingsReady
      );
    });
    assert.equal(await gui.locator(".chessinsper-native-hidden").count(), 0);
    passed.push(
      "Disabling companion stops AFK/automation and restores native A.C.A.S engine and controls",
    );
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log(
      JSON.stringify({ passed: passed.length, checks: passed }, null, 2),
    );
  } catch (error) {
    if (gui)
      console.error(
        "GUI",
        JSON.stringify(
          await gui.evaluate(() => ({
            text: document.body.innerText.slice(-1500),
            status: window.ChessinsperACASAddon?.status(),
            instances: window.AcasInstances?.map((e) => ({
              id: e.id,
              fen: e.instance.currentFen,
              pv: Object.entries(e.instance.pV).map(([name, p]) => ({
                name,
                ready: p.engineSettingsReady,
                depth: p.searchDepth,
                pending: p.pendingCalculations,
                marks: p.activeGuiMoveMarkings.length,
              })),
            })),
            stores: Object.keys(localStorage)
              .filter((k) => k.startsWith("companion:Chessinsper"))
              .map((k) => ({ key: k, value: localStorage.getItem(k) })),
          })),
          null,
          2,
        ),
      );
    if (frontend)
      console.error(
        "FRONT",
        JSON.stringify(
          await frontend.evaluate(() => ({
            status: window.ChessinsperACASAddon?.status(),
            text: document.body.innerText.slice(0, 1200),
            pieces: document.querySelectorAll("piece").length,
            markers: [...document.querySelectorAll("svg text")].map(
              (e) => e.textContent,
            ),
          })),
          null,
          2,
        ),
      );
    throw error;
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
