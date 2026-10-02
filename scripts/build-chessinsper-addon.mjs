import { readFile, writeFile } from "node:fs/promises";
const root = new URL("../", import.meta.url);
const files = [
  "ChessinsperCore.js",
  "ChessinsperAutomation.js",
  "ChessinsperBehavior.js",
  "ChessinsperAddon.js",
  "ChessinsperAddonSite.js",
  "ChessinsperAddonMetrics.js",
  "ChessinsperAddonPanel.js",
];
const modules = await Promise.all(
  files.map((file) =>
    readFile(new URL("userscript-components/" + file, root), "utf8"),
  ),
);
const header = `// ==UserScript==
// @name         Chessinsper para A.C.A.S — Complemento
// @namespace    Chessinsper.ACASAddon
// @version      1.0.0
// @description  Personalidade, setas nativas, automação, sessões e AFK usando o A.C.A.S oficial. Requer instalar A.C.A.S separadamente.
// @author       Chessrinsper contributors; A.C.A.S contributors
// @license      GPL-3.0
// @match        https://psyyke.github.io/A.C.A.S/*
// @match        https://www.chess.com/*
// @match        https://lichess.org/*
// @match        http://localhost/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @grant        GM.listValues
// @grant        unsafeWindow
// @run-at       document-end
// @noframes
// @require      https://update.greasyfork.org/scripts/534637/LegacyGMjs.js?acasv=2
// @require      https://update.greasyfork.org/scripts/470418/CommLinkjs.js?acasv=2
// ==/UserScript==

/* Standalone companion. Install official A.C.A.S alongside this script.
 * No engine binaries or board renderer are supplied by this companion.
 * A.C.A.S: https://github.com/Psyyke/A.C.A.S — GPL-3.0.
 * Chessrinsper original strategy code: MIT; notice retained in ChessinsperCore.
 */
`;
const entry = `
(async()=>{
  try {
    await LOAD_LEGACY_GM_SUPPORT();
    if(document.readyState==='loading') await new Promise(resolve=>document.addEventListener('DOMContentLoaded',resolve,{once:true}));
    const page=typeof unsafeWindow==='object' ? unsafeWindow : window;
    const officialGUI=(location.hostname==='psyyke.github.io' || location.hostname==='localhost')
      && location.pathname.includes('/A.C.A.S/') && !location.pathname.includes('/dev');
    const app=officialGUI ? ChessinsperAddon.createGUI(page) : ChessinsperAddonSite.create(page);
    app.start();
    // Read-only diagnostics. Never replace the A.C.A.S USERSCRIPT storage bridge.
    page.ChessinsperACASAddon={status:app.status};
    window.addEventListener('pagehide',()=>app.stop(),{once:true});
  } catch(error) {console.error('Chessinsper complemento: não foi possível iniciar.',error);}
})();
`;
const output =
  header +
  modules
    .map((code, i) => "\n// Component: " + files[i] + "\n" + code)
    .join("\n") +
  entry;
await writeFile(new URL("chessinsper-acas.user.js", root), output);
await writeFile(new URL("chessinsper-acas.user.txt", root), output);
console.log(
  "Standalone Chessinsper built: " +
    Buffer.byteLength(output) +
    " bytes; JS and TXT identical.",
);
