import { profile } from "@/data/profile";
import { education } from "@/data/education";

export const SITE = {
  url: "https://erdun.me",
  name: "Erdun E",
  title: "Erdun E · Software Engineer",
  description:
    "Erdun E, Software Engineer and ex-AWS EBS. Builder, engineer, always shipping. Portfolio of projects, experience, capabilities, and ways to get in touch.",
  ogImage: "https://erdun.me/og.png",
  locale: "en_US",
  themeColorLight: "#eceff4",
  themeColorDark: "#0e1623",
} as const;

// Public profile URLs only (exclude email / WhatsApp / WeChat).
const sameAs = profile.social
  .filter((s) => s.id === "linkedin" || s.id === "github" || s.id === "xiaohongshu")
  .map((s) => s.href);

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Erdun E",
  url: SITE.url,
  image: SITE.ogImage,
  jobTitle: "Software Engineer",
  description:
    "Software Engineer and ex-AWS EBS, focused on reliable, maintainable systems.",
  sameAs,
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
  })),
};
