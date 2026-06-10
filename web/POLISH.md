# erdun.me Final Polish Review (advisory only)

> Snapshot at commit `988c28a` (branch `redesign`). **No code changes** beyond the
> donate-pill move that prompted this pass. Findings are prioritized P1/P2/P3 with
> file refs. The site is in strong shape — these are refinements, not fixes.

---

## P1 — most worth doing

### P1-1. Keyboard focus rings are inconsistent across interactive elements
Buttons (`ui/button.tsx`), experience cards (`ExperienceDialog.tsx`), the theme toggle, the mobile-nav toggle, the Stripe pill, and the WeChat tile all have explicit `focus-visible:ring-2 focus-visible:ring-accent`. But several other interactive controls have **zero** `focus-visible:` styling and fall back to the browser's default outline:
- **Contact link tiles** (`Contact.astro` — the `tile` const, plus the résumé button uses `buttonVariants` so it's fine, but the social tiles aren't).
- **Education links** (`Education.astro` — school / college / location / award-badge links) and the courses `<summary>`.
- **Nav links + brand link** (`Nav.astro` — `.nav-link`, the brand `<a>`).

A keyboard user tabbing through the page gets a branded coral ring on some controls and a default blue/black outline on others. **Fix:** add a consistent `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent` (or `focus-visible:border-accent`) to these. Low effort, noticeably more cohesive.

### P1-2. Easing is used ad hoc — codify "brand ease for entrances, default for micro"
The brand curve `cubic-bezier(0.22, 1, 0.36, 1)` (= `EASE_OUT_EXPO` in `lib/motion.ts`) is used for **entrances**: scroll reveals (`global.css:348`), `dialog-in` (`:321`), sheet-in (`:169`), projects active-card width (`:202`). But:
- All hover/color micro-transitions (`transition-colors` everywhere) use Tailwind's default ease, not the brand curve.
- Several **exits/secondary** animations use generic `ease-in`/`ease-out`: `dialog-out` (`:324`), `sheet-out` (`:172`), overlay in/out (`:314-318`).

This isn't wrong, but it's unintentional rather than a decision. **Recommendation:** make it a documented rule — brand ease for entrances/reveals; default ease for sub-200ms hover/press micro-interactions — and align the **exit** animations (dialog-out, sheet-out) to either the brand ease or a deliberate ease-in so open/close feel like a matched pair. Right now `dialog-in` (0.22s, brand ease) and `dialog-out` (0.18s, ease-in) are subtly mismatched.

---

## P2 — good polish

### P2-1. Card hover language is inconsistent
Each card type reacts differently to hover:
- **Experience cards** — lift (`whileHover={{y:-4}}`) + border-accent + shadow (`ExperienceDialog.tsx`).
- **Education cards** (`Education.astro` `<article>`) — no hover response at all (only inner links change color).
- **Contact tiles** (`Contact.astro`) — border-accent only, no lift.
- **Testimonial cards** (`Testimonials.tsx`) — **no hover response**, even though the marquee row pauses on hover (so the user is clearly hovering a card).
- **Project cards** — scale only via the active/centered state.

**Recommendation:** pick one restrained "interactive card" language (e.g. `border-accent` + a 1–2px lift + slightly stronger shadow) and apply it to education cards, contact tiles, and testimonial cards so hovering anything tappable feels the same.

### P2-2. Durations have no shared scale; CSS can't see the `motion.ts` tokens
`lib/motion.ts` defines `DURATION` (micro 0.2 / reveal 0.5 / hero 0.6) but the CSS hardcodes its own values, which drift: **0.18, 0.2, 0.22, 0.24, 0.25, 0.3, 0.32, 0.4, 0.45, 0.5** appear across `global.css`. **Recommendation:** define CSS custom properties in `:root` (`--ease-brand: cubic-bezier(0.22,1,0.36,1)`, `--dur-micro: 200ms`, `--dur-reveal: 500ms`, etc.) and reference them in the CSS animations + as the source of truth, so JS (`motion.ts`) and CSS share one vocabulary and stray values (0.24 vs 0.25, 0.18 vs 0.2) collapse to a scale.

### P2-3. `--grid` token is defined in both themes but never used
`global.css:18` / `:32` define `--grid` (the faint blueprint grid color from spec §4.1) but nothing consumes it. Either **use it** (see P3-1 — the spec explicitly wanted a subtle 48px grid for the "blueprint/systems" feel) or **remove the dead token** from both `:root` and `[data-theme="dark"]`.

### P2-4. A couple of magic numbers
- `FloatingWidgets.astro:60-61` — Calendly badge `color: "#15202f"` / `textColor: "#ffffff"` are passed to Calendly's JS API (can't be CSS vars), but `#15202f` is just `--surface` dark as a literal. Fine, but worth a named constant/comment so it's not mistaken for arbitrary.
- The `bmc` block in `config/widgets.ts` + `initBmc()` in `FloatingWidgets.astro` are dead while `bmc.enabled === false`. Keeping them is reasonable (toggle-ready), just flagging the dormant code.

---

## P3 — tasteful delight (optional, fits the restrained style)

### P3-1. Subtle blueprint grid background (uses the orphaned `--grid`)
Spec §4.1 wanted "a faint 48px grid background to carry the blueprint/systems feel." It was never implemented. A *very* faint repeating grid (e.g. on `body` or per-section, `background-image` linear-gradients at the `--grid` color) would add quiet texture without competing with the hero video. This is the single most "on-brand" delight opportunity left.

### P3-2. Active project card thumbnail micro-zoom
The centered project card already widens; a `scale(1.03)` on its `<img>` (transition on the active state) would draw the eye to center a touch more. Keep it tiny.

### P3-3. Testimonial cards: minimal hover affordance
Since the row pauses on hover, give the hovered card a faint `border-accent` (and optional 1px lift) so the pause feels like a deliberate "stop and read this one."

### P3-4. Nav brand accent dot
The `Erdun E•` brand dot (`Nav.astro`) is static; a subtle scale/opacity nudge on brand-link hover would be a small, classy touch. (Skip if it feels too cute.)

---

## What's already strong (no action)
- **Token discipline:** components use semantic Tailwind utilities (`bg-surface`, `text-muted`, `border-border`, `var(--radius-*)`) consistently; hardcoded values are confined to defensible cases (hero white/black over the video scrim, brand-icon hexes, the Calendly API color).
- **Dark-mode parity:** every token has a dark value; `--accent-soft` correctly switches to rgba in dark; the just-fixed `--faint` passes AA in both themes.
- **Reduced-motion:** comprehensive — reveals, dialog, sheet, marquee, projects coverflow, theme cross-fade, and nav underline are all gated behind `prefers-reduced-motion`.
- **Spacing/rhythm + hierarchy:** every section shares `container-page` + `border-t` + `py-16 sm:py-20` and the `eyebrow → h-section → subtitle` pattern; one `h1`, ordered headings.
- **The hero moment** (signature draw + staggered entrance) is the right single "wow," with everything else appropriately quiet.

---

## Top findings (priority order)
1. **P1** Add consistent `focus-visible` rings to contact tiles, education links, and nav links (keyboard focus is inconsistent today).
2. **P1** Codify easing: brand ease for entrances, default for micro; align dialog/sheet **exit** animations to match their entrances.
3. **P2** Unify the card hover language (education / contact / testimonial cards are currently flat or inconsistent vs experience cards).
4. **P2** Introduce shared CSS duration/easing custom properties so the 10+ drifting duration values collapse to one scale shared with `motion.ts`.
5. **P2 / P3** Decide on `--grid`: either implement the faint blueprint grid (best on-brand delight) or delete the dead token.
6. **P3** Small delights: active-card thumbnail micro-zoom, testimonial hover affordance, brand-dot hover.
