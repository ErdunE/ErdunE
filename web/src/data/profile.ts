import type { Lang } from "@/lib/i18n";

/** Two separate documents, not translations of one file. */
export const RESUME_HREF: Record<Lang, string> = {
  en: "/resume/Resume_of_ErdunE_2026_04_16.pdf",
  zh: "/resume/Resume_of_ErdunE_zh_2026_10_18.pdf",
};

export interface SocialLink {
  /** Stable key used for the brand SVG + styling in Phase 3. */
  id: "email" | "linkedin" | "github" | "wechat" | "whatsapp" | "xiaohongshu";
  name: string;
  detail: string;
  /** External link, or the QR image href for WeChat. */
  href: string;
  /** WeChat opens a QR dialog instead of navigating. */
  isQr?: boolean;
}

export const profile = {
  name: "Erdun E",
  heroStatus: "Shenzhen · Senior AI Solutions Architect @ DJI",
  tagline: "builder · engineer · always shipping",
  subline: "Lifelong big-mountain skier. Former Software Engineer at Amazon.",
  resumeHref: RESUME_HREF,

  contact: {
    status: "Senior AI Solutions Architect @ DJI · Shenzhen",
    intro:
      "Want to build something together?\nHave a cool open source project Erdun can help with?\nOr just want to chat tech, drop him a line!",
    detail:
      "He is interested in working on challenging projects. Feel free to reach out through any of the channels.",
    resumeLabel: "View My Resume",
  },

  wechatQr: "/wechat-qr.webp",

  social: [
    {
      id: "email",
      name: "Email",
      detail: "erdunwork@gmail.com",
      href: "mailto:erdunwork@gmail.com",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      detail: "/in/erdune",
      href: "https://www.linkedin.com/in/erdune",
    },
    {
      id: "github",
      name: "GitHub",
      detail: "@ErdunE",
      href: "https://github.com/ErdunE",
    },
    {
      id: "wechat",
      name: "WeChat",
      detail: "Scan QR Code",
      href: "#wechat-qr",
      isQr: true,
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      detail: "Message Me",
      href: "https://wa.me/19789544270",
    },
    {
      id: "xiaohongshu",
      name: "小红书",
      detail: "RedNote",
      href: "https://xhslink.com/m/4lKgPEuKzoA",
    },
  ] satisfies SocialLink[],
} as const;
