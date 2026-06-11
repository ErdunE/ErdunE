import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from "@/data/signature";
import { EASE_OUT_EXPO, DURATION } from "@/lib/motion";

const { name, role, heroStatus, tagline, subline, resumeHref } = profile;

const ctaBase =
  "inline-flex h-11 min-w-[8.5rem] items-center justify-center rounded-[var(--radius-sm)] border px-6 text-sm font-medium transition-[color,background-color,border-color,transform] duration-150 ease-[var(--ease-brand)] active:scale-[0.98] motion-reduce:active:scale-100 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
const ctaPrimary = `${ctaBase} border-accent bg-accent text-white hover:bg-accent/90 focus-visible:ring-accent`;
const ctaSecondary = `${ctaBase} border-white/35 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/60`;

export default function HeroIntro() {
  const reduced = useReducedMotion();
  // client-correct on first client render (window undefined during SSR)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 640px)").matches);
  }, []);

  const ease = EASE_OUT_EXPO;
  const childDur = isMobile ? 0.3 : 0.4;
  const delayBase = isMobile ? 0.04 : 0.25; // delayChildren
  const step = isMobile ? 0.04 : 0.08; // stagger between children
  // Signature: long draw on desktop, quick reveal on mobile.
  const sigDur = isMobile ? 0.45 : DURATION.signature;

  // A staggered child (status/name/role/tagline/subline/CTAs).
  const child = (i: number) =>
    reduced
      ? ({ initial: false } as const)
      : ({
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: childDur, delay: delayBase + i * step, ease },
        } as const);

  // The glass card itself: rise + fade.
  const card = reduced
    ? ({ initial: false } as const)
    : ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: isMobile ? 0.4 : 0.7, ease },
      } as const);

  // Signature draw-on: left-to-right clip sweep (filled path, not a stroke).
  // Runs independently of the text stagger so CTAs don't wait for it.
  const sigClip = reduced
    ? ({ initial: false } as const)
    : ({
        initial: { clipPath: "inset(0 100% 0 0)" },
        animate: { clipPath: "inset(0 0% 0 0)" },
        transition: { duration: sigDur, delay: delayBase + 3 * step, ease: "linear" },
      } as const);

  return (
    <motion.div
      {...card}
      className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-white/15 bg-white/[0.06] px-6 py-10 text-center shadow-2xl backdrop-blur-xl sm:px-10 sm:py-12"
    >
      <motion.span
        {...child(0)}
        className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-accent/40 bg-accent/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white"
      >
        <span className="size-1.5 rounded-full bg-accent" />
        {heroStatus}
      </motion.span>

      <motion.h1 {...child(1)} className="h-display mt-6 text-white">
        {name}
      </motion.h1>

      <motion.p
        {...child(2)}
        className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-white/70 sm:text-sm"
      >
        {role}
      </motion.p>

      <motion.div {...sigClip} className="mx-auto mt-7 w-[78%] max-w-sm">
        <svg
          viewBox={SIGNATURE_VIEWBOX}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Erdun E signature"
          className="h-auto w-full text-accent"
        >
          <path d={SIGNATURE_PATH} fill="currentColor" stroke="none" />
        </svg>
      </motion.div>

      <motion.p {...child(4)} className="mt-7 text-lg text-white/90">
        {tagline}
      </motion.p>
      <motion.p {...child(5)} className="mt-2 text-sm text-white/65">
        {subline}
      </motion.p>

      <motion.div
        {...child(6)}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href={resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaPrimary}
        >
          Résumé
        </a>
        <a href="#contact" className={ctaSecondary}>
          Contact
        </a>
      </motion.div>
    </motion.div>
  );
}
