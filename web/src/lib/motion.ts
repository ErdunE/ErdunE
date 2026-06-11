// Motion tokens (spec §4.4). Durations in seconds (Motion/Framer convention).

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

// Three-tier scale, mirrors global.css --dur-fast/base/slow (seconds here).
export const DURATION = {
  fast: 0.15, // micro-interactions (hover/press)
  base: 0.3, // standard transitions
  slow: 0.45, // reveals / emphasis
  signature: 2.2, // bespoke hero stroke draw
} as const;

export const STAGGER = 0.08; // ~80ms between grouped children

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
