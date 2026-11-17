/**
 * Locale plumbing. The content itself lives in `src/data/*`; this file holds
 * the types that make a field bilingual, the resolver, and the chrome strings
 * that never belonged in a data file (section headings, aria-labels, button
 * text).
 *
 * Governing rule (see I18N_PLAN.md §0): each locale is self-contained. Neither
 * version annotates the other.
 */

export const LOCALES = ["en", "zh"] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = "en";

/** A field that differs per locale. A plain `string` is locale-invariant. */
export type I18nText = { readonly en: string; readonly zh: string };
export type MaybeI18n = string | I18nText;

/** Resolve a possibly-bilingual field. Plain strings pass through unchanged. */
export function t(value: MaybeI18n, lang: Lang): string {
  return typeof value === "string" ? value : value[lang];
}

/** Resolve an array of them. */
export function tAll(values: readonly MaybeI18n[], lang: Lang): string[] {
  return values.map((v) => t(v, lang));
}

/**
 * `Astro.currentLocale` is `string | undefined` — it is undefined on the
 * default-locale route because `prefixDefaultLocale` is false, and Astro makes
 * no promise the value is one of ours. Narrow it once, here.
 */
export function langOf(locale: string | undefined): Lang {
  return (LOCALES as readonly string[]).includes(locale ?? "")
    ? (locale as Lang)
    : DEFAULT_LANG;
}

export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "zh" : "en";
}

/** Root path per locale. Single page per locale, so this is the whole map. */
export const HOME_PATH: Record<Lang, string> = {
  en: "/",
  zh: "/zh/",
};

/** `lang`/`hreflang` attribute values and `og:locale`. */
export const HTML_LANG: Record<Lang, string> = { en: "en", zh: "zh-Hans" };
export const HREFLANG: Record<Lang, string> = { en: "en", zh: "zh-Hans" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", zh: "zh_CN" };

/**
 * The name the language switcher shows. Always written in the language it
 * switches *to*, so the person who needs it can read it.
 */
export const LANG_NAME: Record<Lang, string> = { en: "EN", zh: "中文" };

/* ── Chrome strings ─────────────────────────────────────────────────────── */

export const UI = {
  skipToContent: { en: "Skip to content", zh: "跳到主要内容" },

  nav: {
    label: { en: "Primary", zh: "主导航" },
    resume: { en: "Résumé", zh: "简历" },
    menu: { en: "Menu", zh: "菜单" },
    menuDescription: {
      en: "Site navigation and quick links",
      zh: "站点导航与快捷链接",
    },
    openMenu: { en: "Open menu", zh: "打开菜单" },
    close: { en: "Close", zh: "关闭" },
    switchLang: {
      en: "切换到中文",
      zh: "Switch to English",
    },
  },

  sections: {
    experience: {
      eyebrow: { en: "Experience", zh: "经历" },
      heading: { en: "Where I've built", zh: "我待过的地方" },
      subtitle: {
        en: "Roles across engineering, teaching, and founding, most recent first.",
        zh: "工程、教学与创业的经历，由近及远。",
      },
      timeline: {
        en: "Experience timeline, most recent first",
        zh: "经历时间轴，由近及远",
      },
      now: { en: "Now", zh: "至今" },
    },
    projects: {
      eyebrow: { en: "Projects", zh: "项目" },
      heading: { en: "Things I've shipped", zh: "我交付过的东西" },
      subtitle: {
        en: "Drag, scroll, or swipe to rotate through the work. Tap the centered card to open it.",
        zh: "拖动、滚动或滑动浏览作品，点击中间的卡片查看详情。",
      },
    },
    capability: {
      eyebrow: { en: "Capability", zh: "能力" },
      heading: { en: "How I approach the work", zh: "我怎么做事" },
    },
    testimonials: {
      eyebrow: { en: "Testimonials", zh: "评价" },
      heading: { en: "What collaborators say", zh: "合作者怎么说" },
      subtitle: {
        en: "A few words from people Erdun has worked, built, and taught alongside.",
        zh: "来自与额尔敦共事、合作和一起教过课的人。",
      },
      translatedNote: {
        en: "",
        zh: "以上评价原文为英文，此处为中文翻译。",
      },
    },
    education: {
      eyebrow: { en: "Education", zh: "教育" },
      heading: { en: "Where I studied", zh: "我读过的学校" },
    },
    contact: {
      eyebrow: { en: "Contact", zh: "联系" },
      heading: { en: "Get in touch", zh: "联系我" },
      connect: { en: "Connect with me", zh: "与我联系" },
    },
  },

  signal: {
    label: { en: "Recent activity", zh: "最近动态" },
    heading: { en: "Recent activity", zh: "最近动态" },
    sources: {
      project: { en: "Project", zh: "项目" },
      event: { en: "Event", zh: "活动" },
      press: { en: "Press", zh: "报道" },
      milestone: { en: "Milestone", zh: "里程碑" },
      note: { en: "Note", zh: "随记" },
    },
  },

  email: {
    label: { en: "Email", zh: "邮箱" },
    copied: { en: "Copied!", zh: "已复制！" },
    copiedAnnounce: {
      en: "Email address copied to clipboard",
      zh: "邮箱地址已复制到剪贴板",
    },
  },

  wechat: {
    name: { en: "WeChat", zh: "微信" },
    scan: { en: "Scan QR Code", zh: "扫描二维码" },
    description: {
      en: "Scan the code to connect on WeChat.",
      zh: "扫描二维码添加微信。",
    },
    alt: { en: "WeChat QR code", zh: "微信二维码" },
  },

  widgets: {
    donate: { en: "Donate to Erdun", zh: "赞赏额尔敦" },
  },

  footer: {
    builtWith: {
      en: "Built with Astro · Boston · Indy · Miami · Hangzhou · Shenzhen",
      zh: "由 Astro 构建 · 波士顿 · 印第安纳波利斯 · 迈阿密 · 杭州 · 深圳",
    },
  },
} as const;
