import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  const [active, setActive] = useState<number | null>(null);
  const item = active === null ? null : items[active];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="group flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-6 text-center transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`${it.role}${it.company ? ` at ${it.company}` : ""} — view details`}
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
          </button>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        {item && (
          <DialogContent>
            <div className="flex items-center gap-4 pr-8">
              <span className="flex size-14 shrink-0 items-center justify-center">
                <Logo logo={item.logo} company={item.company} size="size-14" />
              </span>
              <div>
                <DialogTitle>{item.role}</DialogTitle>
                {item.company && (
                  <p className="mt-0.5 text-sm text-muted">{item.company}</p>
                )}
              </div>
            </div>

            {item.time && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                {item.time}
              </p>
            )}

            <DialogDescription className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              {item.detail.split("\n\n").map((para, idx) => (
                <span key={idx} className="block">
                  {para.trim()}
                </span>
              ))}
            </DialogDescription>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
