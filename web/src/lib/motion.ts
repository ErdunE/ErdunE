// Motion tokens (spec §4.4). Durations in seconds (Motion/Framer convention).

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  micro: 0.2, // 150–250ms micro-interactions
  reveal: 0.5, // scroll reveals
  hero: 0.6, // hero beats (400–700ms)
  signature: 2.2, // signature stroke draw
} as const;

export const STAGGER = 0.08; // ~80ms between grouped children

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
