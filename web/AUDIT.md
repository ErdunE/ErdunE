# erdun.me Rebuild — Pre-Phase-5 Audit (advisory only)

> Snapshot at commit `56072e2` (branch `redesign`). End of Phase 4 (sections + motion done).
> This is a review document — **no code was changed**. Recommendations are for discussion;
> several already map to planned phases (5 widgets/analytics, 6 SEO/a11y, 7 perf).
> Carousel + Contact are treated as **working** (the earlier "empty carousel" was a stale
> Vite dev cache, not a code bug; `astro check` + `npm run build` are clean).

## Measured baseline (this build)
- **JS (raw, uncompressed):** ~544 KB total across islands. Largest: `client` (React+Astro runtime) 180 KB, `motion` 120 KB, `ProjectsCarousel` (Swiper) 104 KB, `utils` 60 KB, `HeroIntro` 28 KB; rest <12 KB each.
- **CSS:** ~60 KB (one bundle, includes Tailwind + Swiper CSS).
- **Images:** 100 optimized `.webp` (1x/2x), ~1.3 MB total — **already done well** via `astro:assets`.
- **`dist` total ~25 MB**, of which **~20 MB is the hero video (18 MB) + temp poster (2.3 MB)**.
- **Headings:** exactly 1 `<h1>` (hero name) + 6 section `<h2>` — clean hierarchy.
- **SEO meta in output:** title + description + canonical present; **OG / Twitter / JSON-LD = none**; sitemap generated; **robots.txt missing**.

---

## P0 — address before launch

### P0-1. Hero video + poster dominate first load (~20 MB)
- `public/video/background.mp4` = **18 MB**, `public/video/poster.jpg` = **2.3 MB** (a temp copy of the old `header.jpg`). The video is `autoplay` and the poster is referenced by the above-the-fold hero, so both hit on first paint. On mobile data this is severe and will tank Lighthouse Performance/LCP.
- **Recommendation (Phase 7):** re-encode to ~2–4 MB H.264 + a VP9/AV1 `.webm`, scale to ≤1280px, `-an`, `+faststart`; generate a real **<200 KB** `poster.jpg` from a video frame; consider a poster-only / smaller variant on mobile and `preload="none"` there. Files: `Hero.astro:18-30`, `public/video/*`.

### P0-2. SEO essentials missing (social cards + structured data + robots)
- No Open Graph, no Twitter `summary_large_image`, no JSON-LD `Person`, no `robots.txt`, no OG image. For a portfolio whose primary distribution is LinkedIn/小红书/WhatsApp shares, missing OG means **no link preview card**.
- **Recommendation (Phase 6):** fill `Base.astro` head (`Base.astro:28-38`, the `head` slot is already scaffolded) with OG/Twitter/canonical (canonical already present), a static 1200×630 OG image in `public/`, JSON-LD `Person` (name, jobTitle, alumniOf NEU/UMass, sameAs LinkedIn/GitHub/小红书, url), and add `public/robots.txt` pointing at `/sitemap-index.xml`. Centralize in a `lib/seo.ts`.

---

## P1 — strongly recommended

### P1-1. `--faint` text fails WCAG AA contrast on light surfaces
- `--faint` light = `#8d97a8` on `--surface #ffffff` ≈ **2.9:1** (AA needs 4.5:1 for normal text; even AA-large 3:1 is borderline). It's used for **real content**, not just decoration: experience dates (`ExperienceDialog`), project `descSecondary` (`ProjectsCarousel`), capability `bodyMuted` (`Capability.astro:36`), education dates, testimonial company, footer. Dark theme `--faint #6b7689` on `--surface #15202f` is also borderline (~4:1).
- **Recommendation (Phase 6):** darken `--faint` (light) to ~`#6b7686`-ish to clear 4.5:1, OR reserve `--faint` strictly for decorative text and move the secondary descriptions/dates to `--muted` (which passes at ~5.8:1). Verify both themes with a contrast checker. File: `global.css` `:root`/`[data-theme="dark"]`. (`--muted` itself is fine.)

### P1-2. Motion (120 KB) ships in the initial load
- `HeroIntro` is `client:load` (hero is above the fold), and it imports `motion/react`, so the 120 KB Motion chunk is fetched on every initial page load purely for the one-time hero entrance. `ProjectsCarousel` is also `client:load` now (104 KB Swiper), so first-load JS is heavy (~330 KB raw of the 544 KB just from motion+swiper+client).
- **Recommendation (Phase 7):** options, in order of effort — (a) keep, but confirm it's acceptable after gzip (~likely ~45 KB gzipped for motion); (b) do the hero entrance with a small CSS/WAAPI approach and drop Motion from the hero, leaving Motion only in `ExperienceDialog` (already `client:visible`, so deferred); (c) move `ProjectsCarousel` back toward `client:visible` once the stale-cache issue is confirmed gone, to defer Swiper. Net: the only thing forcing Motion into first-load is the hero.

### P1-3. Image-import friction in the typed-data model
- Adding a project/testimonial/role today means **two coordinated edits**: append a typed object *and* add a top-of-file `import thumb from "@/assets/..."` (see `projects.ts:1-14`, `testimonials.ts:1-28`, `experience.ts:1-7`). For 28 testimonials this is already a 28-line import preamble. It's clean and type-safe, but every future content add touches the import block — easy to mis-wire.
- **Recommendation:** consider Astro **content collections** (glob + schema) or `import.meta.glob('@/assets/...', { eager: true })` keyed by filename, so a new entry only needs the data object + dropping the image in the folder. Not urgent, but it's the main scalability seam. (Trade-off: glob loses the explicit per-image type the current approach gives.)

### P1-4. `robots.txt` missing
- Covered under P0-2 but flagging concretely: there is no `public/robots.txt`. Sitemap is generated but unreferenced.

---

## P2 — polish / tech debt

### Maintainability
- **P2-1. Capability icons live outside the data.** `Capability.astro:10` hardcodes `const icons = [Network, ShieldCheck, GitBranch, Compass]` indexed positionally against `capabilities`. Adding a 5th capability requires editing both the data file and this array, in matching order. Consider moving an `icon` key into `capabilities.ts` (string name resolved to a lucide component in the component) so data drives it.
- **P2-2. Duplicate résumé path.** `RESUME_HREF` is defined in both `lib/nav.ts` and `profile.ts`. Pick one source of truth (suggest `profile.ts`) and import it in nav.
- **P2-3. Dead data.** `profile.cities` (`"Boston · Indy · Miami"`) is unused — the hero dropped the cities line and the footer hardcodes the same string. Remove the field or wire the footer to it.
- **P2-4. Inline brand SVGs bloat `Contact.astro`.** The LinkedIn/GitHub/WhatsApp/小红书 paths are large and inlined per-tile (the GitHub octocat path alone is ~3 KB). Consider extracting to `.svg` files or an `icons/` module; also de-dupes the WeChat SVG which currently exists in both `Contact.astro` and `WeChatDialog.tsx`.

### UI / UX
- **P2-5. Experience mobile grid is 2-up.** `ExperienceDialog.tsx:51` uses `grid-cols-2` on the smallest breakpoint; long roles ("Software Development Engineer") wrap to 3+ lines in ~160 px cells, making the 8-card grid uneven. Consider 1-col on `<sm`, or smaller role text / tighter wrapping on xs.
- **P2-6. Testimonial cards fixed at 250 px + `line-clamp-6`.** The longest quotes (Juan, Gabriela) are clamped; short quotes leave a large gap above the pinned footer. It reads intentionally, but worth confirming you're OK with truncation; alternatively allow 2 height tiers.
- **P2-7. Icon style mix in Contact.** Email uses an outline lucide glyph while the brand icons are filled two-tone badges — a slight visual inconsistency. Minor; acceptable.
- **P2-8. Consistency is otherwise strong:** every section shares the `container-page` + `border-t` + `py-16 sm:py-20` rhythm, the `eyebrow → h-section → subtitle` heading pattern, and `radius-card`/`accent-soft` tokens. Spacing/vertical rhythm is coherent. No major hierarchy problems found.

### Accessibility (current state is decent; Phase 6 to finalize)
- **Good already:** single `h1`, semantic `section`/`header`/`nav`/`footer`/`main`, skip-to-content link, `lang="en"`, visible focus rings, Radix dialogs/sheet provide focus trap + Esc + focus return, `prefers-reduced-motion` respected throughout, decorative images `alt=""` (mascots, hero video `aria-hidden`), signature has `aria-label`, theme toggle + mobile menu have `aria-label`.
- **Gaps to close (Phase 6):** (a) the `--faint` contrast above; (b) projects carousel — side cards are `tabIndex={-1}` and only the centered card is reachable, confirm keyboard users can rotate via the documented arrow keys and that the pattern is announced sensibly (consider an `aria-label`/roledescription on the carousel region); (c) nav has no `aria-current` for the in-view section (minor); (d) verify the hero `<video>` has a pause affordance or is safe under reduced-motion (spec §9 suggests a pause control — currently it always autoplays/loops); (e) audit that all interactive link tiles expose their accessible name (they do via visible text).

### Performance (beyond P0-1 / P1-2)
- **Already good:** images fully optimized via `astro:assets` (1.3 MB for 100 files), fonts self-hosted via `@fontsource` (no external requests), CSS single bundle (~60 KB).
- **Watch:** `@fontsource` imports 7 weight files (3× Space Grotesk, 2× Inter, 2× IBM Plex Mono) shipping all unicode subsets — consider subsetting to latin in Phase 7. Total `dist` ~25 MB is video-dominated; once the video is fixed the page is light.
- **Rough Phase-7 budgets:** first-load < 5 MB (spec target), video 2–4 MB, poster < 200 KB, hero-class images < 200 KB (met), avatars < 40 KB (met), JS first-load ideally < ~150 KB gzipped.

### SEO (beyond P0-2)
- Title/description/canonical are in place and per-page-overridable via `Base.astro` props. Sitemap (`@astrojs/sitemap`) emits `sitemap-index.xml`. Remaining = OG/Twitter/JSON-LD/robots/OG-image (P0-2).

---

## Other / risks
- **Astro 6 evaluation (task #2) still open.** Astro pinned at 5.18.2 has a moderate advisory (`define:vars` XSS + server-island replay) — neither used on this static site, so real exposure is nil. Evaluate the 5→6 upgrade deliberately before Phase 8 launch (test build + all islands). Don't migrate mid-build.
- **`client:load` on two heavy islands** (Hero/Motion, Projects/Swiper) is the main first-load cost; revisit in Phase 7 (see P1-2).
- **No automated tests / CI** — acceptable for a personal site; `astro check` + `npm run build` are the current gates and are green.
- **Deploy not yet wired** (Phase 8): Cloudflare Pages project, root dir `web/`, build `npm run build`, output `web/dist`; Cloudflare Web Analytics beacon still to add (Phase 5/6); DNS cutover is approval-gated.
- **No broken-content risk found:** all section content cross-checks against the original `index.html`; 0 em dashes; `·` separators intact.

---

## Top 8 by priority
1. **P0** Re-encode the 18 MB hero video + replace the 2.3 MB temp poster (~20 MB → <5 MB first load). [Phase 7]
2. **P0** Add OG/Twitter/JSON-LD `Person`/OG-image + `robots.txt` (currently zero social/structured data). [Phase 6]
3. **P1** Fix `--faint` text contrast (~2.9:1) — fails WCAG AA on real content in both themes. [Phase 6]
4. **P1** Motion (120 KB) + Swiper (104 KB) are in first-load via `client:load`; decide whether to defer/replace the hero's Motion. [Phase 7]
5. **P1** Reduce image-import friction in `src/data/*` (content collections or `import.meta.glob`) for scalable content adds.
6. **P2** Move capability icons into the data (`capabilities.ts`) to remove the positional `icons[]` coupling.
7. **P2** Clean small debt: duplicate `RESUME_HREF`, unused `profile.cities`, extract/de-dupe inline brand SVGs.
8. **P2** Experience grid is 2-up on xs (long roles wrap unevenly); consider 1-col on the smallest breakpoint.
