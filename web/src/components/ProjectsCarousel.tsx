import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Keyboard, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export interface ProjThumb {
  src: string;
  srcSet: string;
}

export interface ProjItem {
  title: string;
  href: string;
  descPrimary: string;
  descSecondary: string;
  tags: string[];
  thumb: ProjThumb;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ProjectsCarousel({ items }: { items: ProjItem[] }) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => setMounted(true), []);

  // Shuffle client-side only (random each load; avoids hydration mismatch).
  const ordered = useMemo(() => (mounted ? shuffle(items) : items), [mounted, items]);

  if (!mounted) {
    // Reserve space until the island hydrates with shuffled order.
    return <div className="h-[440px]" aria-hidden="true" />;
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coverflowEffect = reduce
    ? { rotate: 0, depth: 60, modifier: 1, stretch: 0, slideShadows: false }
    : { rotate: 34, depth: 180, modifier: 1, stretch: 0, slideShadows: false };

  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, Keyboard, Mousewheel]}
      effect="coverflow"
      centeredSlides
      slidesPerView="auto"
      loop
      grabCursor
      mousewheel={{ forceToAxis: true }}
      keyboard={{ enabled: true }}
      pagination={{ clickable: true }}
      coverflowEffect={coverflowEffect}
      speed={reduce ? 250 : 500}
      onSwiper={(s) => {
        swiperRef.current = s;
        setActiveIndex(s.realIndex);
      }}
      onSlideChange={(s) => setActiveIndex(s.realIndex)}
      className="projects-swiper"
    >
      {ordered.map((it, i) => {
        const isActive = i === activeIndex;
        return (
          <SwiperSlide
            key={`${it.title}-${i}`}
            className="projects-slide w-[280px] sm:w-[320px]"
          >
            <a
              href={it.href}
              target="_blank"
              rel="noopener"
              tabIndex={isActive ? 0 : -1}
              onClick={(e) => {
                if (!isActive) {
                  e.preventDefault();
                  swiperRef.current?.slideToLoop(i);
                }
              }}
              className={`block overflow-hidden rounded-[var(--radius-card)] border bg-surface transition-[border-color,box-shadow] duration-300 ${
                isActive
                  ? "border-accent shadow-xl"
                  : "border-border shadow-none"
              }`}
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-surface-2">
                <img
                  src={it.thumb.src}
                  srcSet={it.thumb.srcSet}
                  alt={it.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-[var(--radius-pill)] bg-surface-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-text">
                  {it.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{it.descPrimary}</p>
                <p className="mt-1 text-xs text-faint">{it.descSecondary}</p>
              </div>
            </a>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
