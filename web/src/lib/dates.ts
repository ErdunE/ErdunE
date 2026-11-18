/**
 * Dates as data, not as display strings.
 *
 * The timeline used to regex the English month out of "Nov 2026 – Present" to
 * derive both the axis ticks and the order of every entry, which meant a
 * Chinese label would have silently reordered the section. Entries now carry
 * machine fields and the string is rendered from them, per locale.
 */

import type { Lang } from "@/lib/i18n";

/** "YYYY-MM". */
export type YearMonth = string;

export interface Dated {
  /** "YYYY-MM". Omit together with `end` for an entry that carries no dates. */
  start?: YearMonth;
  /** "YYYY-MM", or `null` while it is still current. */
  end?: YearMonth | null;
}

const MONTH_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const PRESENT: Record<Lang, string> = { en: "Present", zh: "至今" };
const NOW: Record<Lang, string> = { en: "Now", zh: "至今" };

function parse(ym: YearMonth): { y: number; m: number } {
  const [y, m] = ym.split("-").map(Number);
  return { y, m };
}

/** "2026-11" -> "Nov 2026" / "2026年11月". */
export function formatMonth(ym: YearMonth, lang: Lang): string {
  const { y, m } = parse(ym);
  return lang === "zh" ? `${y}年${m}月` : `${MONTH_EN[m - 1]} ${y}`;
}

/**
 * The displayed range. Undated entries render nothing.
 *
 * The separator is not shared. English sets a spaced en dash; Chinese has no
 * such convention — 至今 already carries "up to now" and needs nothing before
 * it, and a closed range takes an unspaced em dash.
 */
export function formatRange(r: Dated, lang: Lang): string {
  if (!r.start) return "";
  const from = formatMonth(r.start, lang);
  if (lang === "zh") {
    return r.end == null ? `${from}至今` : `${from}—${formatMonth(r.end, lang)}`;
  }
  const right = r.end == null ? PRESENT.en : formatMonth(r.end, lang);
  return `${from} – ${right}`;
}

/** Axis tick under a node: the year it ended, or the current-role label. */
export function endLabel(r: Dated, lang: Lang): string {
  if (!r.start) return "";
  if (r.end == null) return NOW[lang];
  return String(parse(r.end).y);
}

const key = (ym: YearMonth) => {
  const { y, m } = parse(ym);
  return y * 100 + m;
};

/** Sort key for a range's end: current sorts first, undated last. */
export function endKey(r: Dated): number {
  if (!r.start) return Number.NEGATIVE_INFINITY;
  return r.end == null ? Number.POSITIVE_INFINITY : key(r.end);
}

/** Sort key for a range's start. Undated sorts last. */
export function startKey(r: Dated): number {
  return r.start ? key(r.start) : Number.NEGATIVE_INFINITY;
}

/** Log entry date: "2026-11-17" -> "Nov 17" / "11月17日". */
export function formatDay(iso: string, lang: Lang): string {
  const [, m, d] = iso.split("-").map(Number);
  return lang === "zh" ? `${m}月${d}日` : `${MONTH_EN[m - 1]} ${d}`;
}
