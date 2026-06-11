import { useEffect, useMemo, useState } from "react";

export interface TAvatar {
  src: string;
  srcSet: string;
}

export interface TItem {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar: TAvatar;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Card({ t, hidden }: { t: TItem; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className="marquee-card rounded-[var(--radius-card)] border border-border bg-surface p-5 transition-colors duration-150 ease-[var(--ease-brand)] hover:border-accent"
    >
      <blockquote className="line-clamp-6 text-sm leading-relaxed text-muted">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-4">
        <img
          src={t.avatar.src}
          srcSet={t.avatar.srcSet}
          alt={hidden ? "" : t.name}
          loading="lazy"
          decoding="async"
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="truncate font-display text-sm font-semibold text-text">
            {t.name}
          </div>
          <div className="truncate text-xs text-muted">{t.title}</div>
          <div className="truncate text-xs text-faint">{t.company}</div>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({ items, dir }: { items: TItem[]; dir: "left" | "right" }) {
  return (
    <div className="marquee-row">
      <div className={`marquee-track marquee-track--${dir}`}>
        {items.map((t, i) => (
          <Card key={`a${i}`} t={t} />
        ))}
        {/* Duplicate set for the seamless loop (hidden from a11y tree). */}
        {items.map((t, i) => (
          <Card key={`b${i}`} t={t} hidden />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials({ items }: { items: TItem[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [rowA, rowB] = useMemo(() => {
    const list = mounted ? shuffle(items) : items;
    const mid = Math.ceil(list.length / 2);
    return [list.slice(0, mid), list.slice(mid)];
  }, [mounted, items]);

  return (
    <div className="flex flex-col gap-4">
      <Row items={rowA} dir="left" />
      <Row items={rowB} dir="right" />
    </div>
  );
}
