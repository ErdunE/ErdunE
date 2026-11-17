# erdun.me — Backlog

> Everything still open from `AUDIT.md` and `POLISH.md`, re-verified against
> `3033d29` on **2026-11-17**. Items are sequenced, not dated: the order is a
> dependency order, the dates are Erdun's to set.
>
> One item was dropped on re-verification — see §4.

---

## Batch 1 — give the reader back control

These are one idea, not three: every one of them is the site doing something
the reader cannot stop. Worth doing together, since they share a test pass.

### 1.1 The hero video ignores Reduce Motion and cannot be paused
`Hero.astro` renders `<video autoplay muted loop playsinline>` with no
`prefers-reduced-motion` branch and no pause control. Someone who has asked
their OS to reduce motion still gets a looping video behind the hero, and has
no way to stop it. WCAG 2.2.2 applies to anything that moves for more than five
seconds.

**Fix:** a poster-only branch under `prefers-reduced-motion: reduce`, plus a
small pause/play control in a corner of the hero. The poster already exists.

### 1.2 The testimonial marquee never stops
`Testimonials.tsx` has no `IntersectionObserver` and no hover pause — the
animation runs while the section is off-screen, and a reader cannot hold a card
still to read it or click its LinkedIn link.

**Fix:** pause on hover and focus, and pause while out of view. The second one
is also a battery win on mobile.

### 1.3 Focus rings are inconsistent
From `POLISH.md` P1-1, still true. Buttons, the experience cards, the toggles
and the WeChat tile carry `focus-visible:ring-2 focus-visible:ring-accent`; the
Contact social tiles, the Education links and `<summary>`, and the nav links and
brand fall back to the browser default. Tabbing through the page alternates
between a coral ring and a blue one.

**Fix:** one shared `focus-ring` utility on the controls that lack it.

---

## Batch 2 — things that are quietly wrong

### 2.1 Activity dates carry no year
`lib/dates.ts` `formatDay()` renders `Nov 25` / `11月25日`. The log already
spans May–November 2026; from January 2027 every entry reads as if it could be
this year. The `<time datetime>` attribute is correct, so this is presentation
only.

**Fix:** show the year once per year-group, or on any entry not from the current
year. Same convention the experience axis already uses — print the larger unit
only when it changes.

### 2.2 The English résumé is seven months old
`public/resume/Resume_of_ErdunE_2026_04_16.pdf`. The Chinese one is from
2026-10-18 and names DJI; the English one predates MolarData, diGeniusAI and
DJI, so the site's own experience section contradicts the PDF a visitor
downloads.

**Needs Erdun:** a current English PDF. Code change is one filename.

### 2.3 The root README still describes the old site
Last touched 2026-02-03, before the rebuild. The repo's default branch is what
a visitor from LinkedIn or GitHub search lands on.

**Fix:** rewrite for the Astro app — stack, `web/` layout, how to run it, where
it deploys, and the bilingual setup.

---

## Batch 3 — needs a decision before any code

### 3.1 The accent fails AA on white
`--accent #dd5430` on `--surface #ffffff` is **3.90:1**; WCAG AA wants 4.5:1 for
normal text. It passes AA-large (3:1), so headings and the eyebrow numerals are
fine — what fails is accent-coloured body-size text.

Three ways out, and the choice is a brand decision, not a technical one:
- darken the accent until it clears 4.5:1, and accept a slightly deeper orange
  everywhere;
- keep `#dd5430` for large text, borders and fills, and use a darker variant
  only where accent meets body-size copy;
- accept the 3.90:1 deliberately and record why.

**Needs Erdun:** which of the three.

### 3.2 Cloudflare Web Analytics is still not wired
Planned in the rebuild spec, never added. One beacon script in `Base.astro`.

**Needs Erdun:** whether he wants analytics at all. It is a privacy call, and
the answer "no" is a perfectly good one to write down.

### 3.3 Four résumé entry points
`HeroIntro`, `Nav`, `MobileNav` and `Contact` all link the résumé. That may be
deliberate — it is the conversion action — but nobody has decided it is.

**Needs Erdun:** keep all four, or drop one.

---

## 4. Dropped on re-verification

**"The Projects section renders empty in SSR."** No longer true. The section
emits 11 KB of markup with all fifteen project titles present in the HTML. The
finding dates from before `ProjectsCarousel` moved to `client:load`; the island
now server-renders its content. Removed rather than carried.
