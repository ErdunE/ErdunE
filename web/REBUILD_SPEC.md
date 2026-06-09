# erdun.me — Full Rebuild Plan (Claude Code execution spec)

> Author: planning lead. Executor: **Claude Code (Fable 5)**. Owner: Erdun (relays + reviews).
> This document is the single source of truth for the rebuild. Read it fully before doing anything.
> Place it in the repo and re-read the relevant phase at the start of each work session.

---

## 0. HARD RULES — read first, never violate

1. **BRANCH FIRST. NEVER TOUCH THE LIVE SITE.**
   - The current live site is served by **GitHub Pages from the `master` branch root** of `github.com/ErdunE/ErdunE`, fronted by Cloudflare DNS/CDN.
   - Before doing anything, create and switch to a new branch: `git checkout -b redesign`.
   - Do **all** work on `redesign`. Do **not** commit to `master`. Do **not** edit, move, or delete any of the existing root files on `master`.
   - The new Astro app lives in a **subfolder `web/`** on the `redesign` branch, so the old site's files stay intact even on this branch. Zero ambiguity, zero risk to the live site.
2. **Work phase by phase. Stop after each phase for review.** Do not run ahead. After finishing a phase, commit, then report what you did + how to verify, and wait.
3. **Commit per phase** with the message specified in each phase. Small, reviewable commits.
4. **Do not "improve" against the locked decisions in §2.** Several choices are deliberate and counter to typical "best practice" (e.g., the projects carousel is intentionally NOT searchable/filterable). Respect them.
5. **Ask before anything destructive or irreversible**: deleting files, force-push, changing DNS, deleting branches, `git reset --hard`, etc.
6. **Never deploy to production or change DNS without explicit approval.** Deployment (Phase 8) is preview-first; the live `erdun.me` cutover happens only on Erdun's explicit go.
7. **Verify exact CLI flags / config against current official docs** (Astro, Tailwind, shadcn/ui, Swiper, Motion, Cloudflare Pages) before running scaffolders — tool versions move. Pin versions in `package.json` once working.
8. **Keep the old `index.html` as the content source of truth.** All real copy, links, names, and data are ported from it (see Appendix A). Do not invent or omit content.

---

## 1. Current state (baseline)

- Static site: Bootstrap 3.3.6 + jQuery 1.11.1 + Font Awesome 4 + ScrollReveal + Magnific Popup + "Creative" theme. No build system.
- Monolith `index.html` ≈ 2400 lines / 130 KB; 11 inline `<script>` blocks; inline styles; one hidden dead "legacy project grid".
- Assets: `img/` 15 MB + `video/` 18 MB ≈ 33 MB. `header.jpg` 2.4 MB; team photos ~1 MB PNGs; `video/background.mp4` 18 MB; project thumbnails in `img/portfolio/thumbnails/`; 5 résumé PDFs in `img/`.
- Tech debt to fix during rebuild: dead **Universal Analytics** (`UA-68657454-1`, stopped processing 2023); `http://` jquery-easing (mixed content); deprecated maxcdn; `.DS_Store` / `.idea/` / `.cursor/` committed; multiple résumé versions.

---

## 2. LOCKED DECISIONS (non-negotiable)

| Area | Decision |
|---|---|
| Stack | **Astro + React islands + TypeScript + Tailwind CSS + shadcn/ui + Motion + Swiper**, deployed to **Cloudflare Pages** (static output). |
| Hosting/deploy | New site → **Cloudflare Pages** (static `dist`). DNS already on Cloudflare → cutover is trivial. Old GitHub Pages stays as fallback until cutover. |
| Section order | Hero → Experience → Projects → Capability → Testimonials → Education → Contact. |
| Hero | **Full-bleed background video** behind everything (this is the "活人感" — keep it central), content overlaid on a restrained glass card. Optimize the video, never remove it. |
| Signature | Keep Erdun's real handwritten signature SVG as the hero centerpiece, animated stroke draw-on in the accent color. |
| Projects | Keep the **random rotating carousel** (3D coverflow feel). Use **Swiper `EffectCoverflow`** (drag/scroll/swipe/keyboard, momentum), random shuffle on each load. **Intentionally NOT searchable or filterable** — discovery-by-rotation is the desired UX. Do not add a filter/search/grid. |
| Experience | Logo cards in a grid; click a card → **Dialog** with full detail (role/company/time/description). |
| Testimonials | Its **own section**; ~30 testimonials in **two horizontal marquee rows scrolling opposite directions**, pause on hover, seamless loop, shuffled. |
| Capability | 4 capability rows; subtle highlight as each scrolls into view. |
| Glassmorphism | Restrained — **hero only**, not site-wide. |
| Color | **Light theme is the default**, eye-comfortable (soft off-white, not harsh pure white; accent used sparingly). **Dark theme available via a toggle**; both themes fully supported; theme persists; smooth ~300ms color cross-fade on switch. |
| Motion | One orchestrated hero moment (entrance + signature draw); everything else restrained scroll-reveals + micro-interactions; `transform`/`opacity` only; `prefers-reduced-motion` fully respected. (Full spec in §6.) |
| Floating widgets | Port Calendly badge, Chatbase chatbot, Buy Me a Coffee, Stripe donation button; keep desktop-gated; make each toggleable via a config flag. |
| Analytics | Replace dead UA with **Cloudflare Web Analytics** (privacy-friendly, fits the Cloudflare stack). Leave a clean integration point. |

> **Hero content amendment (Erdun, 2026-06-09):** the hero RETAINS the tagline "builder · engineer · always shipping", the subline "Lifelong big-mountain skier. Former Software Engineer at Amazon.", the signature SVG, the status badge, and the 3 CTAs. Only the old hero's education-columns block and the cities line are dropped.

---

## 3. Target architecture

### 3.1 Repo & branch layout
```
ErdunE/                     (repo root — OLD site files untouched on redesign branch)
├─ index.html, css/, js/, img/, video/, CNAME, README.md   ← legacy, left as-is
└─ web/                     ← NEW Astro app (all rebuild work happens here)
```
- Branch: `redesign`. Cloudflare Pages "root directory" = `web/`, build command `npm run build`, output `web/dist`.
- Alternative (if Erdun prefers a clean repo later): a fresh `erdun-me` repo. Default to `web/` subfolder for now.

### 3.2 Astro app structure (inside `web/`)
```
web/
├─ astro.config.mjs
├─ tsconfig.json            (strict; path alias @/* → src/*)
├─ tailwind.config / CSS    (per current Astro+Tailwind setup)
├─ components.json          (shadcn/ui)
├─ public/                  (favicon, video, robots.txt, _headers, CF analytics)
│  ├─ video/background.(mp4|webm)  + poster.jpg
│  └─ resume/Resume_2026_04_16.pdf
└─ src/
   ├─ assets/               (images that go through astro:assets optimization)
   │  ├─ projects/          (project thumbnails)
   │  ├─ people/            (testimonial avatars, experience logos)
   │  └─ edu/               (school logos/mascots)
   ├─ data/                 (TYPED content — the maintainability win)
   │  ├─ profile.ts         (hero text, status, contact, social links)
   │  ├─ experience.ts
   │  ├─ projects.ts
   │  ├─ capabilities.ts
   │  ├─ testimonials.ts
   │  └─ education.ts
   ├─ components/
   │  ├─ ui/                (shadcn/ui primitives)
   │  ├─ Nav.astro
   │  ├─ Hero.astro          + HeroIntro.tsx (Motion island), Signature.tsx
   │  ├─ Experience.astro    + ExperienceDialog.tsx (island)
   │  ├─ ProjectsCarousel.tsx (Swiper island, client:visible)
   │  ├─ Capability.astro    + CapabilityReveal.tsx (island, IntersectionObserver)
   │  ├─ Testimonials.tsx    (marquee island)
   │  ├─ Education.astro
   │  ├─ Contact.astro
   │  ├─ Footer.astro
   │  ├─ ThemeToggle.tsx
   │  └─ FloatingWidgets.astro (Calendly/Chatbase/BMC/Stripe, config-gated)
   ├─ layouts/Base.astro     (head, meta, SEO, theme no-flash script, fonts)
   ├─ lib/                   (seo.ts, motion.ts tokens, utils.ts)
   └─ pages/index.astro
```

### 3.3 Content is data, not markup
All section content lives in typed `src/data/*.ts` arrays/objects. Components map over data. Adding a project/testimonial/role later = add one typed object — never editing a monolith. This is the core fix for the old "屎山".

---

## 4. Design system

### 4.1 Color tokens (CSS variables; both themes)
Define as CSS variables on `:root` (light) and `[data-theme="dark"]`. Tailwind reads them via theme extension. Eye-comfortable: no pure `#fff`, no neon.

Light (default):
```
--bg:#eceff4  --surface:#ffffff  --surface-2:#f3f5f9
--text:#1f2733  --muted:#5c6678  --faint:#8d97a8
--border:rgba(20,30,48,.10)  --border-strong:rgba(20,30,48,.20)
--accent:#dd5430  --accent-soft:#fbe9e2     (warm coral — brand continuity)
--grid:rgba(20,30,48,.035)
```
Dark:
```
--bg:#0e1623  --surface:#15202f  --surface-2:#1a2535
--text:#e7ecf4  --muted:#94a0b5  --faint:#6b7689
--border:rgba(255,255,255,.10)  --border-strong:rgba(255,255,255,.18)
--accent:#ff6a3d  --accent-soft:rgba(255,106,61,.12)
--grid:rgba(255,255,255,.04)
```
- Verify text/background contrast ≥ WCAG AA in both themes.
- A faint 48px grid background can carry the "blueprint/systems" feel; keep it very subtle.

### 4.2 Typography (self-hosted via @fontsource — no external font CDN)
- Display/headings: **Space Grotesk** (500–700).
- Body: **Inter** (400/500).
- Mono/utility (eyebrows, tags, dates, labels): **IBM Plex Mono** (400/500).
- Signature: use the **real SVG** asset (not a font). If a font placeholder is ever needed, Caveat — but final = real signature SVG.
- Scale: h1 ~62px (clamp down on mobile), h2 ~28px, h3 ~18–19px, body 16px, mono labels 11–12px with letter-spacing .08–.16em, uppercase.

### 4.3 Layout / radius / spacing
- Container max-width ~1080px, side padding 28px (clamp on mobile).
- Radius: cards 14px, small elements 8px, pills 999px.
- Vertical rhythm: section padding ~48–56px; consistent spacing scale.
- Shadows: minimal; use only for the active carousel card and dialogs.

### 4.4 Motion tokens (`src/lib/motion.ts`)
- Easing: `[0.22, 1, 0.36, 1]` (ease-out-expo-ish) for entrances; spring for hero card if desired.
- Durations: micro 150–250ms; reveals ~500ms; hero beats 400–700ms; signature draw ~2.2s.
- Stagger: ~80ms between grouped children.
- Global: respect `prefers-reduced-motion`.

---

## 5. Section specs (build in this order)

For each section: data source → components → layout → interaction → motion → acceptance.

### 5.0 Global — Nav + Layout
- Sticky top nav: brand (name + accent dot), mono links (Experience / Projects / Capability / Testimonials / Education / Contact), résumé button, **ThemeToggle**.
- Mobile: shadcn `Sheet` drawer. Desktop nav shrinks + increases backdrop blur on scroll (Motion `useScroll`).
- `Base.astro`: SEO/meta (§8), `@fontsource` imports, **no-flash theme script** (read localStorage, set `data-theme` before paint), smooth-scroll for anchors, color cross-fade transition on theme change.
- Acceptance: nav works desktop + mobile; theme toggle flips both themes with smooth transition and persists across reload with no flash.

### 5.1 Hero (full-bleed video)
- Content: `profile.ts` — name "Erdun E", role "Software Engineer · ex-AWS EBS", status badge "Open to SWE roles · OPT", signature SVG, tagline "builder · engineer · always shipping", subline "Lifelong big-mountain skier. Former Software Engineer at Amazon.", CTAs (View work → #projects, Experience → #experience, Résumé PDF).
- Layout: **full-viewport background video** (`autoplay muted loop playsinline`, `poster`, `preload="metadata"`), dark scrim overlay for legibility, restrained glass card holding the content. No SPEC SHEET (removed by decision).
- Motion (the one orchestrated moment, `HeroIntro.tsx`): scrim present → glass card rises+fades (700ms) → signature stroke draws (2.2s, accent) → at ~60% draw, name/tagline/subline/CTAs stagger in (80ms apart). CTAs interactive by ~1.2s. Mobile / reduced-motion: skip draw, show final state.
- Acceptance: video plays full-bleed behind a legible glass card; signature draws on desktop, final state instantly on reduced-motion; works in light and dark; no layout shift; poster shows before video loads.

### 5.2 Experience
- Data: `experience.ts` (8 entries — see Appendix A.2). Fields: role, company, time, logo, detail.
- Layout: responsive grid of logo cards (monogram fallback if logo missing), hover lift + accent border.
- Interaction: click card → shadcn `Dialog` (`ExperienceDialog.tsx`) showing logo, role, company, time, full detail. Keyboard-accessible; Esc closes; focus trap.
- Motion: cards stagger-reveal on scroll; dialog scale(0.96)+fade via AnimatePresence.
- Acceptance: all 8 entries present with correct copy; dialog opens/closes accessibly; real company logos used (place in `src/assets/people/`).

### 5.3 Projects (random rotating carousel — DO NOT make searchable)
- Data: `projects.ts` (13 entries — Appendix A.3). Fields: title, href, thumbnail, tags[], descPrimary, descSecondary.
- Component: `ProjectsCarousel.tsx`, a React island (`client:visible`), **Swiper** with:
  - `effect: 'coverflow'`, `centeredSlides: true`, `slidesPerView: 'auto'`, `loop: true`, `grabCursor: true`
  - `mousewheel: { forceToAxis: true }`, `keyboard: { enabled: true }`, pagination (clickable dots)
  - `coverflowEffect: { rotate: ~34, depth: ~180, modifier: 1, slideShadows: false }`
  - **Shuffle the slide order on mount** (random each visit).
  - Optional: very slow `autoplay` that pauses on interaction (config flag, default off).
- Cards: thumbnail (optimized via astro:assets — see §7), title, descriptions, mono tag chips; whole card links to `href` (external, `target="_blank" rel="noopener"`); only the centered card is the active link target.
- Acceptance: rotating coverflow with drag/scroll/swipe/keyboard + dots; randomized order each load; **no filter/search/grid added**; mobile swipe works; respects reduced-motion (reduce transition intensity, keep usable).

### 5.4 Capability
- Data: `capabilities.ts` — lead paragraph + 4 rows (System-Level Decision Making / Reliable Delivery Under Real Constraints / Engineering for Change / Ownership & Judgment, each with two paragraphs) + Technical Context note (Appendix A.4).
- Layout: icon + title + description rows (lucide icons), generous spacing.
- Motion: each row gets an `is-active` highlight (e.g., accent left bar grows + text brightens) when it scrolls into view (IntersectionObserver / Motion whileInView, once).
- Acceptance: 4 rows + lead + context present; scroll highlight subtle and once-only.

### 5.5 Testimonials (own section)
- Data: `testimonials.ts` — **port all ~30** from old `index.html` `#all-testimonials` block (Appendix A.5 lists them). Fields: quote, name, title, company, avatar.
- Component: `Testimonials.tsx` island — shuffle, split into two rows, **two marquee tracks scrolling opposite directions**, seamless loop (duplicate track), pause on hover. Cards use shadcn `Avatar` + quote.
- Motion: continuous slow horizontal scroll (CSS animation), pause on hover; reduced-motion → static scrollable row.
- Acceptance: all ~30 testimonials ported with correct names/titles/companies/photos; two opposite rows loop seamlessly; hover pauses.

### 5.6 Education
- Data: `education.ts` — NEU (MS CS, GPA 4.00, courses, awards) + UMass (BS CS, GPA 3.20, courses, Dean's List) (Appendix A.6).
- Layout: two cards (shadcn `Card`), school logo/mascot, degree, dates, GPA, courses (in `Accordion` to keep tidy), awards as `Badge`s with their links.
- Acceptance: both cards with all honors + working award links; courses collapsible.

### 5.7 Contact
- Data: `profile.ts` contact block — status "Open to Full-time SWE Opportunities · OPT", intro copy, résumé button, 6 links: Email `erdunwork@gmail.com`, LinkedIn `/in/erdune`, GitHub `@ErdunE`, WeChat (QR image in Dialog), WhatsApp `wa.me/19789544270`, 小红书 `xhslink.com/m/4lKgPEuKzoA`.
- Layout: two cards — about/status (left) + social link grid (right). WeChat opens a `Dialog` with the QR image. Keep the existing brand SVGs for LinkedIn/GitHub/WeChat/WhatsApp/小红书.
- Acceptance: all links correct and working; WeChat QR in dialog; résumé button points to the single latest PDF.

### 5.8 Footer + Floating widgets
- Footer: copyright with auto-year.
- `FloatingWidgets.astro`: Calendly badge (`calendly.com/erdune/15min`), Chatbase, Buy Me a Coffee (`erdun`), Stripe donation (`donate.stripe.com/...`). Desktop-gated; each behind a config flag in `profile.ts` so Erdun can toggle. Lazy-load after idle; never block first paint.
- Acceptance: widgets load only on desktop, after page is interactive; each can be turned off via config.

---

## 6. Motion spec (consolidated)
- **Philosophy**: one orchestrated wow (hero), everything else quiet; the looping video is the page's primary motion, so other elements stay calm and never compete.
- **Hero**: see §5.1.
- **Scroll reveals**: title + content fade-up (~20px, ~500ms), once only, grouped children stagger ~80ms.
- **Carousel**: Swiper physics (drag/scroll/swipe momentum; center scale).
- **Testimonials**: slow opposite-direction marquees, pause on hover.
- **Capability**: in-view highlight.
- **Micro**: button press `scale(0.98)`; nav shrink + blur on scroll; theme switch ~300ms color cross-fade; link underline grow.
- **NOT doing**: parallax everywhere, scroll-jacking, entrance on every element, bounce/jelly, autoplay sound, anything that delays interactivity.
- **Accessibility**: `prefers-reduced-motion: reduce` → static final states, no transforms; provide video `poster`; consider a pause control for the hero video.

---

## 7. Asset pipeline
- **Images**: move team photos / project thumbnails / school logos into `src/assets/**` and render via `astro:assets` `<Image>` → automatic AVIF/WebP + responsive `srcset` + lazy. Target: `header`-class images < 200 KB, avatars < 40 KB.
- **Video** (`public/video/`): re-encode the 18 MB `background.mp4` down to ~2–4 MB. Requires `ffmpeg` (check `ffmpeg -version`; if absent, `brew install ffmpeg` — ask first). Suggested:
  ```
  ffmpeg -i background.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart background.mp4
  ffmpeg -i background.mp4 -vf "scale=1280:-2" -c:v libvpx-vp9 -crf 34 -b:v 0 -an background.webm
  ffmpeg -i background.mp4 -vframes 1 -q:v 4 poster.jpg
  ```
  Serve `<video>` with both sources + poster; consider a smaller/poster-only variant on mobile.
- **Fonts**: `@fontsource` (or `@fontsource-variable`) for Space Grotesk / Inter / IBM Plex Mono — self-hosted, no external font requests.
- **Favicon**: reuse `img/favicon.ico` (move to `public/`).
- **Résumés**: keep only the latest (`Resume_of_ErdunE_2026_04_16.pdf` → `public/resume/`); archive older versions (do not ship 5).

---

## 8. SEO & meta
- `Base.astro` + `lib/seo.ts`: per-page `<title>`, meta description, canonical, Open Graph (title/description/image/url/type), Twitter `summary_large_image`.
- **JSON-LD `Person`** (name, jobTitle, alumniOf NEU/UMass, worksFor/knowsAbout, sameAs: LinkedIn/GitHub/小红书, url erdun.me).
- `sitemap.xml` via `@astrojs/sitemap`; `robots.txt` in `public/`.
- OG image: a static branded image (or build-time generated) — 1200×630.
- **Analytics**: add Cloudflare Web Analytics beacon (remove the dead UA snippet entirely).
- Acceptance: each page has unique meta + OG; `/sitemap-index.xml` and `/robots.txt` resolve; JSON-LD validates; social preview renders a card.

---

## 9. Accessibility & quality floor
- Semantic landmarks (`header/nav/main/section/footer`), one `h1`.
- All images have meaningful `alt`; decorative ones `alt=""`.
- Keyboard: full nav, visible focus rings, dialogs trap focus + Esc, carousel arrow-key support.
- Contrast AA in both themes. `prefers-reduced-motion` respected everywhere.
- Lighthouse targets (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

---

## 10. Phased roadmap (commit + stop after each)

**Phase 0 — Branch + scaffold**
- `git checkout -b redesign`; create `web/`; scaffold Astro (TS, strict) in `web/`; add React, Tailwind, shadcn/ui (init), Motion, Swiper, @fontsource fonts, lucide-react.
- Add root `.gitignore` (node_modules, dist, .DS_Store, .idea/, .cursor/, .vercel, .astro).
- Minimal placeholder home page that builds and runs.
- Commit: `chore(redesign): scaffold Astro app in web/`. Report commands + `web/` tree + dev command. **Stop.**

**Phase 1 — Design system + layout shell**
- Color tokens (light default + dark), Tailwind theme wiring, typography, container, motion tokens, no-flash theme script, `ThemeToggle`, `Nav` (desktop + mobile Sheet), `Footer`, `Base.astro` SEO scaffold.
- Commit: `feat(redesign): design system + layout shell + theme toggle`. **Stop.**

**Phase 2 — Content data layer**
- Build all `src/data/*.ts` typed files; port real content from old `index.html` (Appendix A). Move/optimize assets into `src/assets/**`.
- Commit: `feat(redesign): typed content data + assets`. **Stop.**

**Phase 3 — Sections (static, no motion yet)**, in order: Hero (with video) → Experience → Projects (Swiper) → Capability → Testimonials → Education → Contact. Wire data; components render correctly; layouts responsive.
- Commit per 1–2 sections: `feat(redesign): <section> section`. **Stop after all sections.**

**Phase 4 — Motion**
- Hero orchestration + signature draw; scroll reveals; capability highlight; dialog/marquee/micro-interactions; reduced-motion guards.
- Commit: `feat(redesign): motion system`. **Stop.**

**Phase 5 — Floating widgets + analytics**
- Calendly/Chatbase/BMC/Stripe (config-gated, desktop, lazy); Cloudflare Web Analytics; remove all legacy/dead code references.
- Commit: `feat(redesign): widgets + analytics`. **Stop.**

**Phase 6 — SEO + a11y pass**
- Metadata/OG/JSON-LD/sitemap/robots; a11y + keyboard + contrast audit; Lighthouse.
- Commit: `feat(redesign): seo + accessibility`. **Stop.**

**Phase 7 — Asset/perf finalization**
- Video re-encode (ask before installing ffmpeg); image optimization verified; font subsetting; bundle check; Lighthouse to targets.
- Commit: `perf(redesign): assets + performance`. **Stop.**

**Phase 8 — Deploy (preview) + cutover (approval-gated)**
- Cloudflare Pages project, root dir `web/`, build `npm run build`, output `web/dist`; verify on a `*.pages.dev` preview.
- **Do not change DNS or merge to master without Erdun's explicit go.** When approved: point `erdun.me` to Cloudflare Pages, keep GitHub Pages as fallback, add redirects if any URLs changed, observe 24–48h.
- Commit/PR: `feat: launch rebuilt erdun.me`. **Stop and report preview URL first.**

---

## 11. Deployment & DNS cutover
- Build static, deploy to Cloudflare Pages (DNS already on Cloudflare → trivial).
- Validate fully on preview domain first.
- Cutover only on approval; rollback = repoint DNS to GitHub Pages.
- Lower DNS TTL beforehand to speed propagation.

---

## 12. Definition of Done
- All 7 sections present in the locked order with 100% of real content ported (cross-checked against old `index.html`).
- Hero: full-bleed optimized video + animated signature + glass card; light/dark both clean.
- Projects: random rotating Swiper coverflow, not searchable/filterable.
- Experience dialogs, testimonials dual marquee, capability highlight, education accordion, contact links + WeChat QR — all working.
- Motion per §6; reduced-motion respected.
- Assets optimized (≈33 MB → target < 5 MB first-load); video 2–4 MB.
- SEO/meta/JSON-LD/sitemap/robots; Cloudflare Web Analytics; dead UA removed.
- Lighthouse targets met; AA contrast; keyboard accessible.
- Old site untouched on `master`; new site validated on preview; cutover pending approval.

---

## Appendix A — Content inventory (port verbatim from old `index.html`)

### A.1 Profile / hero
- Name: Erdun E · Role: Software Engineer · ex-AWS EBS
- Status: "Open to Full-time SWE Opportunities · OPT"
- Tagline: "builder · engineer · always shipping"
- Subline: "Lifelong big-mountain skier. Former Software Engineer at Amazon."
- Cities: Boston · Indy · Miami
- Contact: email `erdunwork@gmail.com`; LinkedIn `/in/erdune`; GitHub `@ErdunE`; WhatsApp `+1 978 954 4270` (`wa.me/19789544270`); 小红书 `xhslink.com/m/4lKgPEuKzoA`; WeChat QR `img/WechatIMG218.jpg`; Calendly `calendly.com/erdune/15min`.

### A.2 Experience (8)
1. PromptLint — CEO & Founder — Aug 2025–Present — "Building PromptLint, an AI prompt quality analysis tool with real-time scoring and rephrase suggestions, launching on web, desktop, mobile and IDE extension."
2. KidzHack — Software Dev Manager — Jan 2026–Apr 2026 — "Course practicum (CS6966). Led a team of 5 to redesign the alert detection pipeline for Vibes, a K-8 emotional wellness platform. Replaced VADER with Claude AI via AWS Bedrock; five-tier alert classification on AWS Lambda, DynamoDB, API Gateway, Bedrock."
3. Northeastern University — Teaching Assistant — Sep 2025–May 2026 — "CS5100 Programming Design Paradigm (Fall 2025); CS5800/INFO6205 Algorithms (Spring 2026, Prof. Jia Zhu). Recitations, grading, office hours."
4. Superstars — Software Engineer Intern — May 2025–Aug 2025 — "Delivered full story-creation workflow in Flutter; authored Contribution Guide for onboarding."
5. Miami Tech Club — Co-founder & President — Jan 2025–May 2026 — "Organized events (LeetCode challenges); East Coast Student Leadership Retreat."
6. Khoury College — Student Ambassador — Nov 2024–May 2026 — "Supported Khoury at the Miami campus; collaborated with directors/advisors/peers; led events."
7. Amazon Web Services — Software Development Engineer — Aug 2021–Jun 2023 — "Led firmware testing & performance evaluation for Amazon EBS; improved stability across 20,000+ servers; unblocked releases, reduced operational risk."
8. More — Additional academic, leadership, and internship experience.

### A.3 Projects (13) — title · repo/link · tags · descriptions
1. PromptLint — github.com/ErdunE/promptlint — AI/ML, Prompt Engineering, Chrome Extension, Developer Tooling
2. ErdunE's Web — github.com/ErdunE/ErdunE — Bootstrap, Responsive, Personal Portfolio
3. Superstars — github.com/naylalabs/superstars-mobile-v2 — Flutter, Bloc, Firebase, Mobile Architecture
4. Traffic Sign Recognition — github.com/ErdunE/AI-Project-Computer-Vision-Traffic-Sign-Recognition — Computer Vision, CNN, TensorFlow, Deep Learning
5. Bean Vibes — github.com/ErdunE/CS5200-Final-Project — Android, MySQL, REST API, Full Stack
6. Habitend — github.com/ErdunE/CS5520-Final-Project — Kotlin, Firebase, MVVM, Mobile UX
7. Entertainment Rec System — github.com/ErdunE/NortheasternMiami (CS5010 Final) — JavaFX, Recommendation System, API Integration, Desktop
8. KNN Visualization — github.com/ErdunE/CS5800-Final-Project — Machine Learning, KNN, Data Visualization, Python
9. Due Mate — github.com/ErdunE/DueMate — Python, Flask, SQLite, Backend
10. FuckWork — github.com/ErdunE/Fuck-work — Chrome Extension, Productivity, JavaScript, UX
11. Mira — github.com/ErdunE/mira-astrology-companion — AI, NLP, Reasoning Systems, Python
12. Forecasting Store Sales — github.com/ErdunE/NortheasternMiami (CS6140 Final) — ML, Time Series, Feature Engineering, Python
13. Vibes Alert System Enhancement — notion.so/Vibes-Alert-System-Enhancement... — AWS Bedrock, Claude AI, AWS Lambda, DynamoDB
> Thumbnails are in old `img/portfolio/thumbnails/`; copy + optimize into `src/assets/projects/`. Use the primary/secondary descriptions from old `index.html`.

### A.4 Capability
- Lead: "Erdun's engineering capabilities are shaped by real systems and real constraints. He focuses on making sound engineering decisions in environments where trade-offs matter. Decisions balance reliability, clarity, and long-term maintainability over short-term wins."
- Rows: System-Level Decision Making · Reliable Delivery Under Real Constraints · Engineering for Change · Ownership & Judgment (use the two-paragraph copy from old file).
- Technical Context note (port verbatim).

### A.5 Testimonials (~30) — port all from `#all-testimonials`
Jay Rodriguez, Naveen Kumanan, Haedy Liu, Alejandro Vides, Gabriela Gongora-Svartzman, Shihao Zhang, Alan Jamieson, Juan F. Gonzalez, Faisal Rehman Khattak, Nate Derbinsky, Shenghua Du, David Paquette, Pedro C. C. Gomes, Shachar Golan, Dharmesh Thakkar, Nirmit Kachrani, Hong Zhao, Tingjian Ge, Clif Ong, Gnana Chand Mallangi, Dhruvkumar Parmar, Aditya Bhuran, Tejesh Boppana, Mohana Siddhartha Chivukula, Weiwei Zhao, Linlin Ding, Zhiqiang (Justin) Wang, Eric W. — copy quote/title/company/avatar for each from old file.

### A.6 Education
- Northeastern University — Khoury College — Miami, FL — Sep 2024–May 2026 — M.S. Computer Science — GPA 4.00. Courses: CS5100 Foundations of AI, CS5520 Mobile App Dev, CS6140 Machine Learning, CS6620 Fundamentals of Cloud Computing. Awards (with links): 2025 Outstanding Network Student; 2026 Outstanding Teaching Assistant; Laurel & Scroll 100 Honor Society; President & Co-founder Miami Tech Club; Student Ambassador.
- University of Massachusetts — Kennedy College of Sciences — Lowell, MA — May 2016–Dec 2020 — B.S. Computer Science — GPA 3.20. Courses: COMP4200 AI, COMP4210 Data Mining, COMP4610 GUI Programming I, COMP4630 Mobile App Programming I. Dean's List (2018–2020); Communications Lead, CSSA.

---

## Appendix B — Phase 0 scaffold commands (verify against current docs; pin versions after)
```
cd ~/Desktop/ErdunE
git checkout -b redesign
mkdir web && cd web
npm create astro@latest .        # TypeScript: Strict, empty/minimal template
npx astro add react              # React islands
npx astro add tailwind           # Tailwind (current Astro integration)
npx astro add sitemap            # sitemap
npx shadcn@latest init           # shadcn/ui (Slate base, CSS variables)
npm i motion swiper lucide-react
npm i @fontsource/space-grotesk @fontsource/inter @fontsource/ibm-plex-mono
# add .gitignore at repo root for node_modules, dist, .DS_Store, .idea/, .cursor/, .astro, .vercel
npm run dev                      # verify it serves
```

## Appendix C — Tech-debt fixes (do during rebuild, verify in DoD)
- [ ] Remove dead Universal Analytics (`UA-68657454-1`).
- [ ] No `http://` resources (no mixed content); all HTTPS / self-hosted.
- [ ] Drop Bootstrap 3 / jQuery / Magnific / old ScrollReveal / FA4.
- [ ] Delete legacy hidden project grid (dead code).
- [ ] `.gitignore` excludes `.DS_Store`, `.idea/`, `.cursor/`.
- [ ] Keep only the latest résumé PDF; archive the rest.
- [ ] Replace inline-everything with typed data + components.

---
*v2 of this plan supersedes the earlier (voided) REFACTOR_PLAN.md that assumed Vercel. Deploy target is Cloudflare Pages. Build on `redesign`, never touch `master`.*
