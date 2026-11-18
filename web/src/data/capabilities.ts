import type { I18nText } from "@/lib/i18n";

export type CapabilityIcon =
  | "network"
  | "shield-check"
  | "git-branch"
  | "compass";

export interface Capability {
  title: I18nText;
  /** lucide icon key, resolved to a component in Capability.astro. */
  icon: CapabilityIcon;
  /** Two paragraphs: lead statement + a muted elaboration. */
  body: I18nText;
  bodyMuted: I18nText;
}

export const capabilityLead: I18nText = {
  en: "Erdun's engineering capabilities are shaped by real systems and real constraints. He focuses on making sound engineering decisions in environments where trade-offs matter. Decisions balance reliability, clarity, and long-term maintainability over short-term wins.",
  zh: "额尔敦的工程能力是真实系统和真实约束磨出来的。他擅长在不得不取舍的时候把决策做稳——宁可要可靠、要看得懂、要长期好维护，也不去换短期漂亮的结果。",
};

export const capabilities: Capability[] = [
  {
    title: {
      en: "System-Level Decision Making",
      zh: "系统层面的决策",
    },
    icon: "network",
    body: {
      en: "Experience making trade-off decisions in complex systems where performance, stability, velocity, and maintainability conflict.",
      zh: "在复杂系统里做过取舍。性能、稳定性、迭代速度和可维护性，常常互相打架。",
    },
    bodyMuted: {
      en: "Focused on reducing long-term risk, knowing when to simplify, and recognizing when deeper investment is necessary.",
      zh: "关键是压住长期风险：知道什么时候该做减法，也看得出什么时候值得多投入。",
    },
  },
  {
    title: {
      en: "Reliable Delivery Under Real Constraints",
      zh: "在真实约束下稳定交付",
    },
    icon: "shield-check",
    body: {
      en: "Delivered features and workflows in production environments with real users, deadlines, and dependencies.",
      zh: "在生产环境里交付过功能和流程——有真实用户、真实期限、真实依赖。",
    },
    bodyMuted: {
      en: "Prioritizes predictable outcomes, graceful failure modes, and systems that remain stable under pressure.",
      zh: "他看重的是结果可预期、出了问题能优雅降级、压力上来系统还稳得住。",
    },
  },
  {
    title: {
      en: "Engineering for Change",
      zh: "为变化而设计",
    },
    icon: "git-branch",
    body: {
      en: "Designs systems with the assumption that requirements will evolve.",
      zh: "设计系统时就假定需求一定会变。",
    },
    bodyMuted: {
      en: "Architectural choices emphasize clarity, extensibility, and the ability to iterate without introducing regressions.",
      zh: "架构上图的是清楚、好扩展，以及改起来不会把原来能跑的东西弄坏。",
    },
  },
  {
    title: {
      en: "Ownership & Judgment",
      zh: "担当与判断",
    },
    icon: "compass",
    body: {
      en: "Operates with a strong sense of ownership across system boundaries.",
      zh: "做事不划地盘，跨系统的活儿照样接得住。",
    },
    bodyMuted: {
      en: "Communicates decisions clearly, surfaces risks early, and aligns technical execution with broader product goals.",
      zh: "决策讲得清楚，风险提早摆出来，技术怎么落地也对得上更上层的产品目标。",
    },
  },
];

export const capabilityContext: { title: I18nText; text: I18nText } = {
  title: { en: "Technical Context", zh: "技术背景说明" },
  text: {
    en: "Specific tools, languages, and frameworks naturally vary by project and team. The capabilities above reflect transferable engineering practices that remain applicable across technology stacks.",
    zh: "具体用什么工具、语言和框架，本来就会随项目和团队而变。上面这些讲的是可迁移的工程实践，换一套技术栈同样成立。",
  },
};
