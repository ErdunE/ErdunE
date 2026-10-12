import { useState } from "react";

export interface ExpLogo {
  src: string;
  srcSet: string;
}

export interface ExpItem {
  role: string;
  company: string;
  /** Label shown under the axis while this node is selected. */
  short: string;
  time: string;
  /**
   * Axis segment label: the year the role ended, or "Now" while it is current.
   * Derived in Experience.astro. Empty string means the entry sits outside the
   * time axis (the trailing "More" card).
   */
  end: string;
  /**
   * Logos fill their tile edge to edge so each brand's own ground becomes the
   * icon, which is why most of these read as app icons. Set "contain" for art
   * that is not square, or that would lose its mark to the crop.
   */
  logoFit: "cover" | "contain";
  detail: string;
  logo: ExpLogo | null;
}

function Logo({ item, className }: { item: ExpItem; className: string }) {
  if (!item.logo) {
    return (
      <span className={`${className} exp-logo-none`} aria-hidden="true">
        •••
      </span>
    );
  }
  return (
    <img
      src={item.logo.src}
      srcSet={item.logo.srcSet}
      // Decorative: the button and the panel already name the company.
      alt=""
      loading="lazy"
      decoding="async"
      data-fit={item.logoFit}
      className={className}
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
  // -1 / 1: which way the last move went, so the panel swaps along the axis
  // instead of blinking in place.
  const [dir, setDir] = useState(0);
  const [open, setOpen] = useState(0);

  const go = (i: number) => {
    setDir(Math.sign(i - active));
    setActive(i);
  };

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
    go(next);
    // Automatic activation (ARIA APG): the panel is already in the DOM, so
    // moving focus may switch it with no latency.
    document.getElementById(`exp-tab-${next}`)?.focus();
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
              onClick={() => go(i)}
              className="exp-node"
            >
              <span className="exp-node-tile">
                <Logo item={it} className="exp-node-img" />
              </span>
              <span className="sr-only">
                {it.role}
                {it.company ? `, ${it.company}` : ""}
                {it.time ? `, ${it.time}` : ""}
              </span>
            </button>
          ))}
        </div>

        {/* One label for the whole axis: it slides to whichever node is
            selected, so the rail stays quiet and the movement itself reads as
            the state change. */}
        <div
          className="exp-marker"
          style={{ ["--count" as string]: items.length }}
          aria-hidden="true"
        >
          <span className="exp-marker-slot" style={{ ["--i" as string]: active }}>
            <span className="exp-marker-caret"></span>
            <span className="exp-marker-label">{current.short}</span>
          </span>
        </div>

        <div
          role="tabpanel"
          id="exp-panel"
          aria-labelledby={`exp-tab-${active}`}
          tabIndex={0}
          className="exp-panel"
        >
          {/* Keyed so the entrance replays on every swap. */}
          <div key={active} className="exp-panel-inner" data-dir={dir}>
            <div className="exp-panel-head">
              <span className="exp-panel-tile">
                <Logo item={current} className="exp-panel-img" />
              </span>
              <div className="min-w-0">
                <h3 className="h-card text-text">{current.role}</h3>
                <p className="mt-1 text-sm text-muted">
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
                  <span className="exp-acc-tile">
                    <Logo item={it} className="exp-acc-img" />
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
