import esbuild from "esbuild";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const watch = process.argv.includes("--watch");
const outdir = "dist";

await mkdir(outdir, { recursive: true });

/** Compose dist/ui.html by inlining the bundled JS + CSS into one file. */
async function writeHtml(js) {
  const css = await readFile("src/ui/styles.css", "utf8");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>${css}</style>
</head>
<body>
  <div id="root"></div>
  <script>${js}</script>
</body>
</html>`;
  await writeFile(path.join(outdir, "ui.html"), html, "utf8");
  console.log("✓ ui.html built");
}

/** esbuild plugin that, on every successful build, inlines output into HTML. */
const inlineHtmlPlugin = {
  name: "inline-html",
  setup(build) {
    build.onEnd(async (result) => {
      const out = result.outputFiles?.find((f) => f.path.endsWith(".js"));
      if (out) await writeHtml(out.text);
    });
  },
};

const codeCtx = await esbuild.context({
  entryPoints: ["src/code.ts"],
  bundle: true,
  outfile: path.join(outdir, "code.js"),
  target: "es2020",
  format: "iife",
  logLevel: "info",
});

const uiOptions = {
  entryPoints: ["src/ui/main.tsx"],
  bundle: true,
  write: false,
  target: "es2020",
  format: "iife",
  jsx: "automatic",
  jsxImportSource: "preact",
  loader: { ".css": "text", ".svg": "text" },
  logLevel: "info",
};

if (watch) {
  const uiCtx = await esbuild.context({ ...uiOptions, plugins: [inlineHtmlPlugin] });
  await codeCtx.watch();
  await uiCtx.watch();
  console.log("watching…");
} else {
  await codeCtx.rebuild();
  await codeCtx.dispose();
  const result = await esbuild.build(uiOptions);
  await writeHtml(result.outputFiles[0].text);
  console.log("✓ build complete");
}
