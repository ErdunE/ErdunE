import { profile } from "@/data/profile";
import { education } from "@/data/education";

export const SITE = {
  url: "https://erdun.me",
  name: "Erdun E",
  title: "Erdun E · Senior AI Solutions Architect",
  description:
    "Erdun E, Senior AI Solutions Architect at DJI in Shenzhen, ex-AWS. Builder, engineer, always shipping. Projects, experience, and ways to get in touch.",
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
  jobTitle: "Senior AI Solutions Architect",
  description:
    "Senior AI Solutions Architect at DJI in Shenzhen, previously at AWS. Focused on reliable, maintainable systems.",
  worksFor: {
    "@type": "Organization",
    name: "DJI",
    url: "https://www.dji.com/",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Shenzhen",
    addressRegion: "Guangdong",
    addressCountry: "CN",
  },
  sameAs,
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
  })),
};
