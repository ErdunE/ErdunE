# erdun.me — Bilingual (EN / ZH) Plan

> Decisions locked with Erdun on **2026-11-17**. Executor: Claude Code.
> Source of truth for the English/Chinese work. Read it fully before starting a phase.
> Baseline commit: `18e2b1a` (branch `redesign`, live on erdun.me).

---

## 0. The governing principle

**Each locale is self-contained.** The Chinese reader is assumed to read no
English; the English reader is assumed to read no Chinese. Neither version
annotates the other — no `大疆 (DJI)`, no `计算机视觉 (Computer Vision)`.

Everything below is an application of that one rule, including the two places
where it yields to a stronger constraint (§4.2).

---

## 1. Locked decisions

| | Decision | Consequence |
|---|---|---|
| **URL** | `/` = English, `/zh/` = Chinese, two static pages | Astro native i18n; full SEO per locale; routing refactor |
| **Testimonials** | All 28 quotes translated into Chinese | ~6,500 extra characters; see §4.2 note |
| **CJK font** | Subset a Chinese face at build time | ~850 glyphs, 70–100 KB; adds a prebuild step |
| **Scope, phase 1** | Whole site | **17,984 characters** to translate |

---

## 2. Audit baseline (measured 2026-11-17)

```
src/data/*.ts — translatable content
  testimonials.ts   6,542 chars   36%   28 entries
  projects.ts       3,589         20%   15 entries
  experience.ts     2,927         16%   11 entries
  log.ts            1,814         10%   18 entries
  capabilities.ts   1,509          8%    6 entries
  education.ts        875          5%
  profile.ts          717          4%
  signature.ts         11
                   ──────
                   17,984 chars

Components: ~20 hardcoded strings (section headings + aria-labels)
Build today: dist 22 MB · HTML 204 KB · JS 560 KB · CSS 68 KB · fonts 128 KB (7 latin-only woff2)
```

**What makes this tractable:** one page (`src/pages/index.astro`), one layout,
all content already lifted into `src/data/*.ts`, and every React island except
`HeroIntro.tsx` already receives its content as `items` props from an `.astro`
parent.

---

## 3. Architecture

### 3.1 Routing

```js
// astro.config.mjs
i18n: {
  locales: ["en", "zh"],
  defaultLocale: "en",
  routing: { prefixDefaultLocale: false },
}
```

`src/pages/index.astro` and `src/pages/zh/index.astro` are both thin shells over
the same component tree.

### 3.2 Locale propagation

`.astro` components read **`Astro.currentLocale`** directly. No prop drilling —
this is the main reason the routing decision is cheap.

React islands receive already-translated `items`, so most need no change. Five
need a small `t` prop or a props change:

| File | Change |
|---|---|
| `HeroIntro.tsx` | imports `profile` directly → must take props |
| `ExperienceTimeline.tsx` | `aria-label="Experience timeline, most recent first"` |
| `WeChatDialog.tsx` | 5 strings |
| `MobileNav.tsx` | `aria-label="Open menu"` + nav labels |
| `EmailCopy.tsx`, `ui/dialog.tsx`, `ui/sheet.tsx` | `"Email"`, `"Close"` |

### 3.3 Data layer — inline bilingual fields

```ts
export type I18nText = { en: string; zh: string };

{
  quote:   { en: "Erdun is one of…", zh: "Erdun 是我共事过…" },
  name:    "Jay Rodriguez",           // §4.2
  role:    { en: "Technical Director", zh: "技术总监" },
  company: "Aegis IT Solutions",      // §4.2
  avatar:  img("Jay.jpeg"),           // single source
}
```

Chosen over separate `*.zh.ts` files so that images, links and dates stay
single-source: changing a logo touches one place, and adding an entry can't
leave the two locales out of sync. Cost: data files grow ~60%.

---

## 4. Translation policy

### 4.1 Translated

- All prose: `detail`, `descPrimary`, `descSecondary`, `quote`, capability bodies, log entries
- All job titles, degrees, award names, course names (`CS5100 Foundations of Artificial Intelligence` → `CS5100 人工智能基础`; course codes stay)
- All place names (`Miami, FL` → `美国佛罗里达州迈阿密`)
- Organisations **that have an official Chinese name** — see glossary
- **Descriptive** project tags: `Computer Vision` → `计算机视觉`, `Full Stack` → `全栈`, `Recommendation System` → `推荐系统`, `Time Series Forecasting` → `时间序列预测`, `UX Design` → `用户体验设计`
- All UI chrome: nav, buttons, section headings, `aria-label`s

### 4.2 Keeps its original form — and why

Researched 2026-11-17. Three categories, all for **factual accuracy**:

1. **Technology product names** — `React`, `Python`, `TypeScript`, `MongoDB`,
   `AWS Lambda`, `DynamoDB`, `Flutter`, `Next.js`, `TensorFlow`, `Astro`,
   `Tailwind CSS`, `Amazon Elastic Block Store`. Chinese technical writing uses
   these in Latin script — AWS's own Chinese documentation keeps
   "Amazon Elastic Block Store (Amazon EBS)" in English under the Chinese
   corporate name. This splits the tag list in two: product names stay,
   descriptive phrases (§4.1) translate.

2. **Companies with no Chinese name** — searched and confirmed to have no
   Chinese registration, Chinese-language site or established Chinese rendering:
   `Aegis IT Solutions` (Fair Lawn, NJ), `G1 Innovations`,
   `Digital Grandparents Inc` (Chatham, NY, a 501(c)(3)), `Bite Buddy AI`,
   `The Daily Benji`, `KidzHack`, `Miami Tech Club`, `Superstars`,
   `diGeniusAI`. Inventing one would make the employer unsearchable and, for
   the testimonial entries, misstate a real person's employer.

3. **Personal names** — all 28 testimonial authors. Every card links to that
   person's LinkedIn; a transliterated name on the card and an English name
   behind the link do not match, and no standard Chinese form exists for them.

Note the rule turns on **whether a Chinese name exists**, not on whose employer
it is. Universities that appear as testimonial employers (`University of
Florida`, `Arizona State University`, …) all have standard Chinese names and
are translated — there is nothing to mismatch.

`PromptLint` is Erdun's own project; he can name it in Chinese, so it is not in
category 2.

### 4.3 Glossary (verified 2026-11-17)

**Organisations — translated**

| English | 中文 | Source / note |
|---|---|---|
| DJI | 大疆创新 | brand name; full entity 深圳市大疆创新科技有限公司 |
| Amazon Web Services | 亚马逊云科技 | official Chinese brand since March 2021 |
| MolarData | 整数智能 | entity 整数智能信息技术（杭州）有限责任公司 |
| Google | 谷歌 | official |
| Microsoft | 微软 | official |
| Tencent | 腾讯 | already Chinese |
| Northeastern University | 美国东北大学 | **"美国" required** — zh-Wikipedia disambiguates as 东北大学（美国）; bare 东北大学 is the Shenyang university |
| Northeastern University – Miami | 美国东北大学迈阿密校区 | |
| Khoury College of Computer Sciences | 库里计算机科学学院 | no official name; 库里 is the prevailing form in Chinese study-abroad sources |
| University of Massachusetts Lowell | 马萨诸塞大学洛厄尔分校 | mainland standard (麻省大学… is the HK/TW variant) |
| Kennedy College of Sciences | 肯尼迪理学院 | compositional — 肯尼迪 is the standard form of the surname |
| Arizona State University | 亚利桑那州立大学 | standard |
| Saint Louis University | 圣路易斯大学 | standard |
| University of Florida | 佛罗里达大学 | standard |
| UNC Charlotte | 北卡罗来纳大学夏洛特分校 | standard |
| Massachusetts State Police | 马萨诸塞州警察局 | standard |
| Additional *(the "More" entry)* | 其他经历 | |

**Organisations — kept in English** (§4.2 category 2)

`Aegis IT Solutions` · `Bite Buddy AI` · `Digital Grandparents Inc` ·
`G1 Innovations` · `KidzHack` · `Miami Tech Club` · `Superstars` ·
`The Daily Benji` · `diGeniusAI` · `Amazon Elastic Block Store (EBS)`

**Roles and degrees**

| English | 中文 |
|---|---|
| Senior AI Solutions Architect | 高级 AI 解决方案架构师 |
| Software Development Engineer II | 软件开发工程师 II |
| Software Development Engineer | 软件开发工程师 |
| Full Stack Engineer | 全栈工程师 |
| Software Engineer Intern | 软件工程师实习生 |
| Software Dev Manager | 软件开发经理 |
| Co-founder & President | 联合创始人兼会长 |
| CEO & Founder | 创始人兼首席执行官 |
| Student Ambassador | 学生大使 |
| Teaching Assistant | 助教 |
| M.S. in Computer Science | 计算机科学硕士 |
| B.S. in Computer Science | 计算机科学学士 |

**Places** — `Shenzhen` 深圳 · `Hangzhou` 杭州 · `Boston` 波士顿 ·
`Indy` 印第安纳波利斯 · `Miami, FL` 美国佛罗里达州迈阿密 ·
`Lowell, MA` 美国马萨诸塞州洛厄尔

**Platforms** — `LinkedIn` 领英 · `WeChat` 微信 · `小红书` unchanged ·
`GitHub` / `WhatsApp` unchanged (no Chinese name).
领英职场 (InCareer) closed in August 2023, but 领英 remains LinkedIn's Chinese
brand and is what a Chinese reader recognises.

**Publications** — `Khoury News` 库里学院新闻 (appears twice in `log.ts`)

### 4.4 Tone

`profile.contact.intro` is deliberately **third person** ("Have a cool open
source project Erdun can help with?"). Keep third person in Chinese.

### 4.5 English-side errors found while verifying names

Both pre-date this work and are independent of i18n. **Not fixed — awaiting
Erdun's confirmation**, because they state his own credentials.

1. `education.ts:35` — `"Khoury College of Computer Science"`. The official
   name is **"Khoury College of Computer Sciences"** (plural). Named for
   alumnus and trustee Amin Khoury after his 2018 gift.

2. `education.ts:71` — `school: "University of Massachusetts"` with
   `schoolHref: "https://www.massachusetts.edu/"`, which is the **UMass system**,
   not a campus. Every other field on that entry points at Lowell
   (`Kennedy College of Sciences`, `Lowell, MA`, `uml.edu`), so the degree reads
   as if it came from the system office. Likely should be
   `"University of Massachusetts Lowell"` / `https://www.uml.edu/`.

Also cosmetic: `testimonials.ts:90` uses a hyphen in
`"Northeastern University - Miami"` where lines 45 and 134 use an en dash.

---

## 5. Phases

Each phase ends in a commit and a **hard stop** for Erdun's review.

### P1 — Routing and infrastructure
`astro.config.mjs` i18n · `src/lib/i18n.ts` (`Lang`, `I18nText`, `t()`, UI dictionary) ·
`src/pages/zh/index.astro` · `Base.astro` `<html lang>` + hreflang + `og:locale` ·
`LangToggle` in `Nav.astro` and `MobileNav.tsx`.

**Exit:** `/zh/` resolves and the toggle works. Content is still English.
No auto-redirect by `navigator.language` (breaks crawling, and strands a
Chinese reader who wants the English page).

### P2 — Date logic refactor
Today the time string is **both display and parse source**:

```
experience.ts   time: "Nov 2026 – Present"
                        ↓
Experience.astro  monthKey()  regex-extracts the English month → 202611 → sort order
                  endLabel()  "Present" → "Now"                → axis ticks
```

Change the Chinese string and both the ordering of all 11 entries and the axis
break. So the two roles get separated first:

```ts
start: "2026-11", end: null          // machine fields, locale-free
formatRange(start, end, lang)        // presentation
  en → "Nov 2026 – Present"
  zh → "2026年11月 – 至今"
```

Same for `education.ts` `time` and `Signal.astro` `fmtDate()`. `log.ts` already
stores ISO dates.

**Exit:** English output byte-identical to before. This phase is worth doing on
its own merits — deriving sort keys by regex-scraping a display string is
fragile regardless of language.

### P3 — Bilingual data + translation
Convert the 8 data files to `I18nText`; translate 17,984 characters.

**Exit:** section-by-section review with Erdun. Do not batch all eight files
into one review.

### P4 — CJK font subsetting *(done)*
`scripts/subset-cjk.mjs`, wired as a `prebuild` hook: it walks the source for
CJK code points and cuts Noto Sans SC (SIL OFL 1.1) down to them. 810
characters, two weights, 1.1 MB -> 109 KB each. Pure Node via harfbuzz WASM,
sourced from a pinned `@fontsource` package, so the deploy builder runs it the
same as a laptop and the build stays offline-capable.

Two weights rather than four: CSS weight matching maps 500 down to 400 and 600
up to 700.

**unicode-range was the wrong gate.** Measured in a browser, the English page
pulled the whole 109 KB face down to render 小红书 in Contact — three
characters. The font is named only in `html[lang="zh-Hans"]`'s stacks instead,
so `/` loads 101 KB of fonts with no CJK among them and `/zh/` loads 321 KB.

### P5 — SEO and assets *(done)*
`og-zh.png`, generated by `scripts/og-card.mjs` from the same template as the
English card and aligned to it to the pixel on the eyebrow and the name. The
script is deliberately **not** in the build: social platforms cache these by
URL, so regenerating one should be an act, not a side effect.

sitemap `i18n` alternates, localized JSON-LD `Person`, and the Chinese résumé
are all wired.

**Remaining:** platforms cache `og.png` by URL — LinkedIn Post Inspector and
Facebook Sharing Debugger force a refetch after deploy.

---

## 6. Assets

| Asset | Status |
|---|---|
| Chinese résumé | **in repo** — `public/resume/Resume_of_ErdunE_zh_2026_10_18.pdf` (496 KB, from `~/Downloads/额尔敦的简历2026_10_18.pdf`) |
| `og-zh.png` | to produce in P5 |
| CJK font file | to choose in P4 |

---

## 7. Out of scope

- Auto-redirect on browser language (§P1)
- Translating technology product names (§4.2)
- A third locale — the data shape supports it, but nothing else is built for it
