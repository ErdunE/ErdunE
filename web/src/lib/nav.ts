// Layout-level nav config (content data lives in src/data/*).

import type { I18nText } from "@/lib/i18n";

export const NAV_LINKS: readonly { label: I18nText; href: string }[] = [
  { label: { en: "Experience", zh: "经历" }, href: "#experience" },
  { label: { en: "Projects", zh: "项目" }, href: "#projects" },
  { label: { en: "Capability", zh: "能力" }, href: "#capability" },
  { label: { en: "Testimonials", zh: "评价" }, href: "#testimonials" },
  { label: { en: "Education", zh: "教育" }, href: "#education" },
  { label: { en: "Contact", zh: "联系" }, href: "#contact" },
];

// Single source of truth lives in profile.ts; re-exported here for nav imports.
export { RESUME_HREF } from "@/data/profile";
