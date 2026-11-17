/**
 * Build the Chinese webfont from the characters the site actually uses.
 *
 * Noto Sans SC covers ~20k glyphs and weighs megabytes; /zh/ uses under a
 * thousand of them. This walks the source for CJK code points and cuts a
 * subset per weight, so the Chinese page carries roughly as much font as the
 * English one.
 *
 * Runs from `prebuild`, so a content edit can never leave the subset stale —
 * and it is pure Node (harfbuzz via WASM), so it works on the deploy builder
 * the same as locally.
 */

import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES = ["src/data", "src/lib", "src/components", "src/layouts", "src/pages"];
const OUT_DIR = path.join(ROOT, "src/assets/fonts");
// Two weights, not four. Each is ~110 KB, and CSS weight matching maps 500
// down to 400 and 600 up to 700, which is a better trade on a Chinese page
// than another 220 KB for two intermediate steps.
const WEIGHTS = [400, 700];

const fontFile = (w) =>
  path.join(
    ROOT,
    "node_modules/@fontsource/noto-sans-sc/files",
    `noto-sans-sc-chinese-simplified-${w}-normal.woff2`,
  );

/**
 * CJK ideographs, the two kana blocks (rare but cheap to keep), CJK
 * punctuation, and the full-width forms the Chinese copy uses: ，。！？（）《》…
 */
function isCjk(cp) {
  return (
    (cp >= 0x4e00 && cp <= 0x9fff) || // unified ideographs
    (cp >= 0x3400 && cp <= 0x4dbf) || // extension A
    (cp >= 0xf900 && cp <= 0xfaff) || // compatibility ideographs
    (cp >= 0x3000 && cp <= 0x303f) || // CJK punctuation 、。《》〈〉
    (cp >= 0xff00 && cp <= 0xffef) || // full-width forms ，！？（）：；
    (cp >= 0x3040 && cp <= 0x30ff) // kana
  );
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (/\.(ts|tsx|astro|md)$/.test(entry.name)) yield p;
  }
}

async function collect() {
  const chars = new Set();
  for (const rel of SOURCES) {
    const dir = path.join(ROOT, rel);
    if (!existsSync(dir)) continue;
    for await (const file of walk(dir)) {
      const text = await readFile(file, "utf8");
      for (const ch of text) if (isCjk(ch.codePointAt(0))) chars.add(ch);
    }
  }
  // Latin, digits and the dashes stay out: the @font-face's unicode-range is
  // CJK-only, so those code points can never resolve to this font anyway, and
  // the Latin faces already carry them.
  return [...chars].sort().join("");
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

async function main() {
  const text = await collect();
  if (!text) {
    console.log("[subset-cjk] no Chinese characters found; nothing to build");
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  let total = 0;

  for (const weight of WEIGHTS) {
    const src = fontFile(weight);
    if (!existsSync(src)) {
      throw new Error(
        `[subset-cjk] missing ${path.relative(ROOT, src)} — run \`npm install\``,
      );
    }
    const out = path.join(OUT_DIR, `noto-sans-sc-subset-${weight}.woff2`);
    const subset = await subsetFont(await readFile(src), text, {
      targetFormat: "woff2",
    });
    await writeFile(out, subset);
    total += subset.length;
    const before = (await stat(src)).size;
    console.log(
      `[subset-cjk] ${weight}: ${kb(before)} -> ${kb(subset.length)}  ${path.relative(ROOT, out)}`,
    );
  }

  console.log(
    `[subset-cjk] ${[...text].length} characters, ${WEIGHTS.length} weights, ${kb(total)} total`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
