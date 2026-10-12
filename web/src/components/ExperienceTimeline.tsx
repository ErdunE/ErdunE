import { useState } from "react";

export interface ExpLogo {
  src: string;
  srcSet: string;
}

export interface ExpItem {
  role: string;
  company: string;
  /** Label for the axis node. Falls back to `company` when not shortened. */
  short: string;
  time: string;
  /**
   * Axis segment label: the year the role ended, or "Now" while it is current.
   * Derived in Experience.astro. Empty string means the entry sits outside the
   * time axis (the trailing "More" card).
   */
  end: string;
  detail: string;
  logo: ExpLogo | null;
}

function Logo({ logo, className }: { logo: ExpLogo | null; className: string }) {
  if (!logo) {
    return (
      <span className={`${className} grid place-items-center font-mono text-sm text-faint`}>
        •••
      </span>
    );
  }
  return (
    <img
      src={logo.src}
      srcSet={logo.srcSet}
      // Decorative: the button and panel already carry the company name.
      alt=""
      loading="lazy"
      decoding="async"
      className={`${className} object-contain`}
    />
  );
}

function Detail({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) => (
        <p key={i}>{para.trim()}</p>
      ))}
    </>
  );
}

export default function ExperienceTimeline({ items }: { items: ExpItem[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);

  // Axis segments: consecutive entries sharing an end label collapse into one
  // tick, so "2026" is printed once instead of four times (the standard
  // time-axis convention: label the larger unit only when it changes).
  const eras = items.reduce<{ end: string; n: number }[]>((acc, it) => {
    const last = acc[acc.length - 1];
    if (last && last.end === it.end) last.n += 1;
    else acc.push({ end: it.end, n: 1 });
    return acc;
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    // Automatic activation (ARIA APG): the panels are already in the DOM, so
    // moving focus may switch them with no latency.
    const el = document.getElementById(`exp-tab-${next}`);
    el?.focus();
  };

  const current = items[active];

  return (
    <div className="exp">
      {/* ── Wide: time axis + inline panel ───────────────────────────── */}
      <div className="exp-rail-view">
        <div className="exp-era-row" aria-hidden="true">
          {eras.map((era, i) => (
            <div key={i} className="exp-era" style={{ ["--n" as string]: era.n }}>
              {era.end && <span>{era.end}</span>}
            </div>
          ))}
        </div>

        <div
          role="tablist"
          aria-label="Experience timeline, most recent first"
          className="exp-rail"
          onKeyDown={onKeyDown}
        >
          {items.map((it, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              id={`exp-tab-${i}`}
              aria-controls="exp-panel"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className="exp-node"
              data-side={i % 2 === 0 ? "up" : "down"}
            >
              <span className="exp-node-label">{it.short}</span>
              <span className="exp-node-dot">
                <Logo logo={it.logo} className="size-[72%]" />
              </span>
              <span className="sr-only">
                {it.role}
                {it.time ? `, ${it.time}` : ""}
              </span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="exp-panel"
          aria-labelledby={`exp-tab-${active}`}
          tabIndex={0}
          className="exp-panel"
        >
          <div className="exp-panel-head">
            <span className="exp-panel-logo">
              <Logo logo={current.logo} className="size-[72%]" />
            </span>
            <div className="min-w-0">
              <h3 className="h-card text-text">{current.role}</h3>
              <p className="mt-0.5 text-sm text-muted">
                {current.company}
                {current.time && (
                  <span className="exp-panel-time"> · {current.time}</span>
                )}
              </p>
            </div>
          </div>
          <div className="exp-panel-body">
            <Detail text={current.detail} />
          </div>
        </div>
      </div>

      {/* ── Narrow: accordion. NN/g's own split is tabs for a few long
             sections, an accordion for many short ones, which is what ten
             entries at this length are. ────────────────────────────────── */}
      <div className="exp-acc-view">
        {items.map((it, i) => {
          const isOpen = i === open;
          return (
            <div key={i} className="exp-acc-item" data-open={isOpen}>
              <h3 className="exp-acc-h">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`exp-acc-panel-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="exp-acc-btn"
                >
                  <span className="exp-acc-logo">
                    <Logo logo={it.logo} className="size-[72%]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="exp-acc-role">{it.role}</span>
                    <span className="exp-acc-meta">
                      {it.company}
                      {it.time && <span className="exp-acc-time"> · {it.time}</span>}
                    </span>
                  </span>
                  <span className="exp-acc-chev" aria-hidden="true">
                    ›
                  </span>
                </button>
              </h3>
              <div
                id={`exp-acc-panel-${i}`}
                className="exp-acc-panel"
                hidden={!isOpen}
              >
                <Detail text={it.detail} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
