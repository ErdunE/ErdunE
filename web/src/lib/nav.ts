// Layout-level nav config (content data lives in src/data/*).

export const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Capability", href: "#capability" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

// Single source of truth lives in profile.ts; re-exported here for nav imports.
export { RESUME_HREF } from "@/data/profile";
