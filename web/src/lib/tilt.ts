// Pointer-aware card tilt + glow (B2). The handler owns the element's transform
// inline (so it wins over reveal/hover CSS without specificity wars) and feeds
// the glow position to CSS via --mx/--my. Caller is responsible for gating:
// initTilt() and attachTilt() are no-ops conceptually only via the guards in
// initTilt; attachTilt assumes the caller already checked hover/pointer/motion.

const MAX_DEG = 5;
const PERSPECTIVE = 800;
const LIFT = 4; // px, folded into the transform so it never fights card-hover

export function attachTilt(el: HTMLElement): () => void {
  let raf = 0;
  let lastX = 0;
  let lastY = 0;

  const apply = () => {
    raf = 0;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const px = (lastX - r.left) / r.width; // 0..1
    const py = (lastY - r.top) / r.height; // 0..1
    const ry = (px - 0.5) * 2 * MAX_DEG; // rotateY: left/right
    const rx = -(py - 0.5) * 2 * MAX_DEG; // rotateX: up/down
    el.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-${LIFT}px)`;
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  const onEnter = () => {
    el.style.transition = "none";
    el.style.willChange = "transform";
    el.classList.add("is-tilting");
  };
  const onMove = (e: PointerEvent) => {
    lastX = e.clientX;
    lastY = e.clientY;
    if (!raf) raf = requestAnimationFrame(apply);
  };
  const onLeave = () => {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    el.style.transition = `transform var(--dur-base) var(--ease-brand)`;
    el.style.transform = "";
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    el.style.willChange = "";
    el.classList.remove("is-tilting");
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
