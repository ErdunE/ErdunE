// Pointer-aware card tilt + glow (B2). Smoothing is a JS lerp loop: each frame
// the rendered `cur*` values ease toward the cursor-derived `t*` targets, and
// the same `cur*` set drives BOTH the 3D transform and the glow position, so
// tilt and glow always move together. The transform gets no CSS transition while
// tilting (the lerp owns it); only the shadow eases. The handler owns the inline
// transform so it wins over reveal/hover CSS without specificity wars.
//
// Gating lives in initTilt() (and in the ProjectsCarousel island for the
// carousel): real pointer + motion allowed only. attachTilt assumes that check.

const MAX_DEG = 3.5; // max tilt angle (tunable 3 - 3.5)
const PERSPECTIVE = 800;
const LIFT = 4; // px lift, eased in with the tilt
const EASE = 0.15; // per-frame lerp factor (tunable 0.12 - 0.18)
const EPS = 0.05; // settle threshold; below this the loop parks until next move

export function attachTilt(el: HTMLElement): () => void {
  let raf = 0;
  let leaveTimer = 0;
  let hovering = false;
  let haveSample = false; // becomes true after the first pointermove
  let lastX = 0;
  let lastY = 0;

  // t* = where the cursor wants it; cur* = eased value actually rendered.
  let tRX = 0, tRY = 0, tLift = 0, tMX = 50, tMY = 50;
  let cRX = 0, cRY = 0, cLift = 0, cMX = 50, cMY = 50;

  const readTarget = () => {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const px = (lastX - r.left) / r.width; // 0..1
    const py = (lastY - r.top) / r.height; // 0..1
    tRY = (px - 0.5) * 2 * MAX_DEG; // rotateY: left/right
    tRX = -(py - 0.5) * 2 * MAX_DEG; // rotateX: up/down
    tMX = px * 100;
    tMY = py * 100;
  };

  const tick = () => {
    if (haveSample) readTarget();
    cRX += (tRX - cRX) * EASE;
    cRY += (tRY - cRY) * EASE;
    cLift += (tLift - cLift) * EASE;
    cMX += (tMX - cMX) * EASE;
    cMY += (tMY - cMY) * EASE;
    el.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${cRX.toFixed(3)}deg) rotateY(${cRY.toFixed(3)}deg) translateY(-${cLift.toFixed(3)}px)`;
    el.style.setProperty("--mx", `${cMX.toFixed(2)}%`);
    el.style.setProperty("--my", `${cMY.toFixed(2)}%`);

    const settled =
      Math.abs(tRX - cRX) < EPS &&
      Math.abs(tRY - cRY) < EPS &&
      Math.abs(tLift - cLift) < EPS &&
      Math.abs(tMX - cMX) < EPS &&
      Math.abs(tMY - cMY) < EPS;
    // Park the loop once settled and the hand has stopped; a new move restarts it.
    raf = hovering && !settled ? requestAnimationFrame(tick) : 0;
  };

  const start = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const onEnter = () => {
    hovering = true;
    tLift = LIFT;
    if (leaveTimer) {
      clearTimeout(leaveTimer);
      leaveTimer = 0;
    }
    // Transform smoothing is the lerp, so transform gets no CSS transition; the
    // shadow still eases.
    el.style.transition = "box-shadow var(--dur-base) var(--ease-brand)";
    el.style.willChange = "transform";
    el.classList.add("is-tilting");
    start();
  };

  const onMove = (e: PointerEvent) => {
    lastX = e.clientX;
    lastY = e.clientY;
    haveSample = true;
    start();
  };

  const onLeave = () => {
    hovering = false;
    haveSample = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    // Hand the reset to a one-shot CSS transition, then drop the inline
    // transition so it never shadows the card's own border/shadow transitions
    // on later interactions.
    el.style.transition = "transform var(--dur-base) var(--ease-brand)";
    el.style.transform = "";
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    el.style.willChange = "";
    el.classList.remove("is-tilting");
    tRX = tRY = cRX = cRY = 0;
    tLift = cLift = 0;
    tMX = tMY = cMX = cMY = 50;
    leaveTimer = window.setTimeout(() => {
      leaveTimer = 0;
      if (!hovering) el.style.transition = "";
    }, 340); // just past --dur-base (300ms) so the reset finishes first
  };

  el.addEventListener("pointerenter", onEnter);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  el.addEventListener("pointercancel", onLeave);

  return () => {
    onLeave();
    el.removeEventListener("pointerenter", onEnter);
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
    el.removeEventListener("pointercancel", onLeave);
  };
}

// Attach to every static [data-tilt] in `root`, but only where a tilt makes
// sense: a real pointer (no touch sticky-hover) and motion is allowed.
export function initTilt(root: ParentNode = document): void {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
    // Carousel cards live inside a Swiper that clones/reorders slides; the
    // ProjectsCarousel island attaches tilt to the active card itself.
    if (el.closest(".swiper")) return;
    attachTilt(el);
  });
}
