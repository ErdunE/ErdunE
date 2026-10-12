import { profile } from "@/data/profile";
import { education } from "@/data/education";

export const SITE = {
  url: "https://erdun.me",
  name: "Erdun E",
  title: "Erdun E · Full Stack Engineer",
  description:
    "Erdun E, Full Stack Engineer at MolarData in Hangzhou, ex-AWS. Builder, engineer, always shipping. Portfolio of projects, experience, and ways to get in touch.",
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
  jobTitle: "Full Stack Engineer",
  description:
    "Full Stack Engineer at MolarData in Hangzhou, previously at AWS. Focused on reliable, maintainable systems.",
  worksFor: {
    "@type": "Organization",
    name: "MolarData",
    url: "https://www.molardata.com/",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hangzhou",
    addressRegion: "Zhejiang",
    addressCountry: "CN",
  },
  sameAs,
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
  })),
};
