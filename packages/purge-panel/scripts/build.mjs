import { build } from "esbuild";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectRoot = path.resolve(root, "../..");
const pkg = JSON.parse(
  await fs.readFile(path.join(projectRoot, "package.json"), "utf8"),
);
const result = await build({
  absWorkingDir: root,
  entryPoints: ["src/entry.js"],
  bundle: true,
  write: false,
  platform: "browser",
  format: "cjs",
  target: "es2022",
  external: ["react", "react-dom"],
  treeShaking: true,
  legalComments: "inline",
  loader: { ".css": "text" },
  define: {
    __PANEL_VERSION__: JSON.stringify(pkg.version),
    // 模块 id 必须等于宿主 profile 里注册的插件名（即包名）。
    __MODULE_ID__: JSON.stringify(pkg.name),
  },
});
const output =
  "// Generated from src/ by npm run build. Do not edit.\n" +
  "// Derived UI: YuJunZhiXue/dsh-purge (MIT), see LICENSE.\n" +
  "(()=>{const __PURGE_MODULE_URL__ = typeof document !== 'undefined' ? document.currentScript?.src : undefined;\n" +
  "window.__ModuleLoader__.load({id:" +
  JSON.stringify(pkg.name) +
  ",factory:(require)=>{\n" +
  "var module={exports:{}};var exports=module.exports;\n" +
  result.outputFiles[0].text +
  "\nreturn module.exports;\n}});})();\n";
const dest = path.join(projectRoot, "client.js");
if (process.argv.includes("--check")) {
  if ((await fs.readFile(dest, "utf8")) !== output)
    throw new Error(
      "client.js is stale; run npm run build and commit the output.",
    );
  console.log("PASS: checked-in bundle matches source");
} else {
  await fs.writeFile(dest, output);
  console.log(
    `Built ${pkg.name}@${pkg.version}: ${Buffer.byteLength(output)} bytes`,
  );
}
