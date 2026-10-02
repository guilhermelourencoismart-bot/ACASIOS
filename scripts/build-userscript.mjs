import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = new URL("../", import.meta.url);
const path = new URL("acas.user.js", root);
let script = await readFile(path, "utf8");
const begin = "// BEGIN CHESSINSPER BUNDLE",
  end = "// END CHESSINSPER BUNDLE";
const modules = await Promise.all(
  ["ChessinsperCore.js", "ChessinsperAutomation.js", "ChessinsperBehavior.js"].map((name) =>
    readFile(new URL("userscript-components/" + name, root), "utf8"),
  ),
);
const bundle = begin + "\n" + modules.join("\n") + "\n" + end + "\n";
if (script.includes(begin)) {
  const start = script.indexOf(begin),
    stop = script.indexOf(end, start);
  if (stop < 0) throw new Error("Unclosed Chessinsper bundle");
  script =
    script.slice(0, start) +
    bundle +
    script.slice(stop + end.length).replace(/^\r?\n/, "");
} else {
  const anchor = "(async () => { try { await LOAD_LEGACY_GM_SUPPORT();";
  if (!script.includes(anchor))
    throw new Error("A.C.A.S entry point not found");
  script = script.replace(anchor, bundle + anchor);
}
script = script.replace(/^[\t ]+$/gm, "").replace(/\n+$/, "\n");
await writeFile(path, script);
await writeFile(new URL("acas.user.txt", root), script);
console.log(
  "Bundled Chessinsper policies and move input in " + fileURLToPath(path),
);
