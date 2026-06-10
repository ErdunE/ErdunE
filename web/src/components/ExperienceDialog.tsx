import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EASE_OUT_EXPO } from "@/lib/motion";

export interface ExpLogo {
  src: string;
  srcSet: string;
}

export interface ExpItem {
  role: string;
  company: string;
  time: string;
  detail: string;
  logo: ExpLogo | null;
}

function Logo({ logo, company, size }: { logo: ExpLogo | null; company: string; size: string }) {
  if (logo) {
    return (
      <img
        src={logo.src}
        srcSet={logo.srcSet}
        alt={`${company} logo`}
        className={`${size} object-contain`}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <span
      className={`flex ${size} items-center justify-center rounded-full bg-accent-soft text-accent`}
    >
      <MoreHorizontal className="size-6" />
    </span>
  );
}

export default function ExperienceDialog({ items }: { items: ExpItem[] }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  // Keep the last item so its content stays during the close animation.
  const [shown, setShown] = useState<ExpItem | null>(null);

  const open = (i: number) => {
    setShown(items[i]);
    setActive(i);
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const cardV = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        variants={reduced ? undefined : container}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((it, i) => (
          <motion.button
            key={i}
            type="button"
            variants={reduced ? undefined : cardV}
            whileHover={reduced ? undefined : { y: -4 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            onClick={() => open(i)}
            className="group flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-6 text-center transition-[border-color,box-shadow] duration-200 hover:border-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`${it.role}${it.company ? ` at ${it.company}` : ""}, view details`}
          >
            <span className="flex size-12 items-center justify-center">
              <Logo logo={it.logo} company={it.company} size="size-12" />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold text-text">
                {it.role}
              </span>
              <span className="mt-0.5 block text-xs text-muted">{it.company}</span>
              {it.time && (
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-faint">
                  {it.time}
                </span>
              )}
            </span>
          </motion.button>
        ))}
      </motion.div>

      <Dialog
        open={active !== null}
        onOpenChange={(o) => {
          if (!o) setActive(null);
        }}
      >
        <DialogContent>
          {shown && (
            <>
              <div className="flex items-center gap-4 pr-8">
                <span className="flex size-14 shrink-0 items-center justify-center">
                  <Logo logo={shown.logo} company={shown.company} size="size-14" />
                </span>
                <div>
                  <DialogTitle>{shown.role}</DialogTitle>
                  {shown.company && (
                    <p className="mt-0.5 text-sm text-muted">{shown.company}</p>
                  )}
                </div>
              </div>

              {shown.time && (
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  {shown.time}
                </p>
              )}

              <DialogDescription className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {shown.detail.split("\n\n").map((para, idx) => (
                  <span key={idx} className="block">
                    {para.trim()}
                  </span>
                ))}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
