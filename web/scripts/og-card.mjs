/**
 * Render a 1200x630 Open Graph card per locale.
 *
 * The English card (public/og.png) was made by hand before this script
 * existed; the script reproduces its layout so the Chinese one is a sibling
 * rather than a different design. It writes only the locale you ask for:
 *
 *   node scripts/og-card.mjs zh      # -> public/og-zh.png
 *   node scripts/og-card.mjs en      # -> public/og.png  (overwrites!)
 *
 * It is not wired into the build. Social platforms cache these by URL, so
 * regenerating one is a deliberate act, not a side effect of `npm run build`.
 *
 * Needs Chrome; the fonts come from the repo's own woff2 files, so the card
 * uses the same faces as the site including the Chinese subset.
 */

import { writeFile, mkdir, readFile, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const CARDS = {
  en: {
    out: "og.png",
    lang: "en",
    name: "Erdun E",
    title: "Senior AI Solutions Architect @ DJI",
    tagline: "builder · engineer · always shipping",
    nameSize: 118,
    titleSize: 40,
  },
  zh: {
    out: "og-zh.png",
    lang: "zh-Hans",
    name: "额尔敦",
    title: "高级 AI 解决方案架构师 @ 大疆创新",
    tagline: "做东西的人 · 工程师 · 一直在交付",
    // Chinese glyphs fill their em box, so the same optical size needs fewer px.
    nameSize: 104,
    titleSize: 38,
  },
};

const FONTS = [
  ["Space Grotesk", 700, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2"],
  ["Space Grotesk", 600, "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff2"],
  ["Inter", 400, "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2"],
  ["IBM Plex Mono", 500, "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2"],
  ["Noto Sans SC", 700, "src/assets/fonts/noto-sans-sc-subset-700.woff2"],
  ["Noto Sans SC", 400, "src/assets/fonts/noto-sans-sc-subset-400.woff2"],
];

async function fontCss() {
  const parts = [];
  for (const [family, weight, rel] of FONTS) {
    const buf = await readFile(path.join(ROOT, rel));
    parts.push(
      `@font-face{font-family:"${family}";font-weight:${weight};font-style:normal;` +
        `src:url(data:font/woff2;base64,${buf.toString("base64")}) format("woff2")}`,
    );
  }
  return parts.join("\n");
}

function html(card, fonts) {
  return `<!doctype html><html lang="${card.lang}"><head><meta charset="utf-8"><style>
${fonts}
:root{--bg:#eceff4;--text:#1f2733;--muted:#5c6678;--faint:#636c7f;--accent:#dd5430;--grid:rgba(20,30,48,0.035)}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:var(--bg);position:relative;overflow:hidden;
  background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);
  background-size:60px 60px}
.bar{position:absolute;left:0;top:0;bottom:0;width:8px;background:var(--accent)}
.wrap{position:absolute;left:95px;top:183px;right:80px}
.eyebrow{font:500 22px/1 "IBM Plex Mono","Noto Sans SC",monospace;letter-spacing:.34em;color:var(--muted)}
.name{margin-top:49px;font:700 ${card.nameSize}px/1 "Space Grotesk","Noto Sans SC",sans-serif;color:var(--text);letter-spacing:-.02em}
.rule{margin-top:34px;width:300px;height:6px;background:var(--accent)}
.title{margin-top:30px;font:600 ${card.titleSize}px/1.25 "Space Grotesk","Noto Sans SC",sans-serif;color:var(--muted)}
.tagline{margin-top:24px;font:400 27px/1.3 "Inter","Noto Sans SC",sans-serif;color:var(--faint)}
</style></head><body>
<div class="bar"></div>
<div class="wrap">
  <div class="eyebrow">ERDUN.ME</div>
  <div class="name">${card.name}</div>
  <div class="rule"></div>
  <div class="title">${card.title}</div>
  <div class="tagline">${card.tagline}</div>
</div>
</body></html>`;
}

async function main() {
  const which = process.argv[2];
  const card = CARDS[which];
  if (!card) {
    console.error(`usage: node scripts/og-card.mjs <${Object.keys(CARDS).join("|")}>`);
    process.exit(1);
  }

  const tmp = path.join(ROOT, ".og-tmp");
  await mkdir(tmp, { recursive: true });
  const page = path.join(tmp, "card.html");
  await writeFile(page, html(card, await fontCss()));

  const out = path.join(ROOT, "public", card.out);
  await new Promise((resolve, reject) => {
    const p = spawn(CHROME, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      "--virtual-time-budget=6000",
      `--screenshot=${out}`,
      `file://${page}`,
    ]);
    p.on("error", reject);
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`chrome exited ${code}`))));
  });

  await rm(tmp, { recursive: true, force: true });
  console.log(`[og-card] wrote public/${card.out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
