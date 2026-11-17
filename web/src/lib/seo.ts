import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { HOME_PATH, OG_LOCALE, type Lang } from "@/lib/i18n";

export const SITE = {
  url: "https://erdun.me",
  themeColorLight: "#eceff4",
  themeColorDark: "#0e1623",
} as const;

/** Per-locale head metadata. Each is written for its own reader, not translated. */
export const META: Record<
  Lang,
  { name: string; title: string; description: string; ogImage: string; locale: string }
> = {
  en: {
    name: "Erdun E",
    title: "Erdun E · Senior AI Solutions Architect",
    description:
      "Erdun E, Senior AI Solutions Architect at DJI in Shenzhen, ex-AWS. Builder, engineer, always shipping. Projects, experience, and ways to get in touch.",
    ogImage: `${SITE.url}/og.png`,
    locale: OG_LOCALE.en,
  },
  zh: {
    name: "额尔敦",
    title: "额尔敦 · 高级 AI 解决方案架构师",
    description:
      "额尔敦，大疆创新高级 AI 解决方案架构师，常驻深圳，曾任职于亚马逊云科技。一直在做东西、一直在交付。项目、经历与联系方式都在这里。",
    ogImage: `${SITE.url}/og-zh.png`,
    locale: OG_LOCALE.zh,
  },
};

/** Absolute URL of this page in the given locale — for canonical and hreflang. */
export function localeUrl(lang: Lang): string {
  return new URL(HOME_PATH[lang], SITE.url).href;
}

// Public profile URLs only (exclude email / WhatsApp / WeChat).
const sameAs = profile.social
  .filter((s) => s.id === "linkedin" || s.id === "github" || s.id === "xiaohongshu")
  .map((s) => s.href);

const PERSON: Record<
  Lang,
  { jobTitle: string; description: string; employer: string; locality: string; region: string }
> = {
  en: {
    jobTitle: "Senior AI Solutions Architect",
    description:
      "Senior AI Solutions Architect at DJI in Shenzhen, previously at AWS. Focused on reliable, maintainable systems.",
    employer: "DJI",
    locality: "Shenzhen",
    region: "Guangdong",
  },
  zh: {
    jobTitle: "高级 AI 解决方案架构师",
    description:
      "大疆创新高级 AI 解决方案架构师，常驻深圳，曾任职于亚马逊云科技。专注于可靠、可维护的系统。",
    employer: "大疆创新",
    locality: "深圳",
    region: "广东",
  },
};

export function personJsonLd(lang: Lang) {
  const p = PERSON[lang];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: META[lang].name,
    url: localeUrl(lang),
    image: META[lang].ogImage,
    inLanguage: lang === "zh" ? "zh-Hans" : "en",
    jobTitle: p.jobTitle,
    description: p.description,
    worksFor: {
      "@type": "Organization",
      name: p.employer,
      url: "https://www.dji.com/",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: p.locality,
      addressRegion: p.region,
      addressCountry: "CN",
    },
    sameAs,
    alumniOf: education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
    })),
  };
}
