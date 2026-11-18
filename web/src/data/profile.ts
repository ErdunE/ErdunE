import type { I18nText, Lang } from "@/lib/i18n";

/** Two separate documents, not translations of one file. */
export const RESUME_HREF: Record<Lang, string> = {
  en: "/resume/Resume_of_ErdunE_2026_04_16.pdf",
  zh: "/resume/Resume_of_ErdunE_zh_2026_10_18.pdf",
};

export interface SocialLink {
  /** Stable key used for the brand SVG + styling in Phase 3. */
  id: "email" | "linkedin" | "github" | "wechat" | "whatsapp" | "xiaohongshu";
  name: I18nText;
  /** Handle, address or call to action under the name. */
  detail: I18nText;
  /** External link, or the QR image href for WeChat. */
  href: string;
  /** WeChat opens a QR dialog instead of navigating. */
  isQr?: boolean;
}

export const profile = {
  name: { en: "Erdun E", zh: "额尔敦" },
  heroStatus: {
    en: "Shenzhen · Senior AI Solutions Architect @ DJI",
    zh: "深圳 · 大疆创新 高级 AI 解决方案架构师",
  },
  tagline: {
    en: "builder · engineer · always shipping",
    zh: "做东西 · 工程师 · 一直在交付",
  },
  subline: {
    en: "Lifelong big-mountain skier. Former Software Engineer at Amazon.",
    zh: "常年滑野雪。前亚马逊软件工程师。",
  },
  resumeHref: RESUME_HREF,

  contact: {
    status: {
      en: "Senior AI Solutions Architect @ DJI · Shenzhen",
      zh: "大疆创新 高级 AI 解决方案架构师 · 深圳",
    },
    // Third person on purpose, in both locales.
    intro: {
      en: "Want to build something together?\nHave a cool open source project Erdun can help with?\nOr just want to chat tech, drop him a line!",
      zh: "想一起做点什么吗？\n有好玩的开源项目想拉额尔敦搭把手？\n或者只是想聊聊技术，给他留个言吧！",
    },
    detail: {
      en: "He is interested in working on challenging projects. Feel free to reach out through any of the channels.",
      zh: "他喜欢做有挑战的项目。下面任何一个渠道都能找到他。",
    },
    resumeLabel: { en: "View My Resume", zh: "查看我的简历" },
  },

  wechatQr: "/wechat-qr.webp",

  social: [
    {
      id: "email",
      name: { en: "Email", zh: "邮箱" },
      detail: { en: "erdunwork@gmail.com", zh: "erdunwork@gmail.com" },
      href: "mailto:erdunwork@gmail.com",
    },
    {
      id: "linkedin",
      name: { en: "LinkedIn", zh: "领英" },
      detail: { en: "/in/erdune", zh: "/in/erdune" },
      href: "https://www.linkedin.com/in/erdune",
    },
    {
      id: "github",
      // No Chinese name exists; see I18N_PLAN.md §4.2.
      name: { en: "GitHub", zh: "GitHub" },
      detail: { en: "@ErdunE", zh: "@ErdunE" },
      href: "https://github.com/ErdunE",
    },
    {
      id: "wechat",
      name: { en: "WeChat", zh: "微信" },
      detail: { en: "Scan QR Code", zh: "扫描二维码" },
      href: "#wechat-qr",
      isQr: true,
    },
    {
      id: "whatsapp",
      name: { en: "WhatsApp", zh: "WhatsApp" },
      detail: { en: "Message Me", zh: "给我发消息" },
      href: "https://wa.me/19789544270",
    },
    {
      id: "xiaohongshu",
      name: { en: "小红书", zh: "小红书" },
      detail: { en: "RedNote", zh: "看我的笔记" },
      href: "https://xhslink.com/m/4lKgPEuKzoA",
    },
  ] satisfies SocialLink[],
} as const;
