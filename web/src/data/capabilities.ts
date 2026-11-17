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
  zh: "额尔敦的工程能力来自真实的系统和真实的约束。他擅长在必须做取舍的环境里作出稳妥的工程决策——在可靠性、清晰度和长期可维护性之间取得平衡，而不是追求短期的漂亮结果。",
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
      zh: "在性能、稳定性、迭代速度与可维护性相互冲突的复杂系统里，有做取舍决策的经验。",
    },
    bodyMuted: {
      en: "Focused on reducing long-term risk, knowing when to simplify, and recognizing when deeper investment is necessary.",
      zh: "重点在于降低长期风险、知道什么时候该做减法，以及识别什么时候值得投入更多。",
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
      zh: "在有真实用户、真实期限和真实依赖的生产环境里交付过功能与流程。",
    },
    bodyMuted: {
      en: "Prioritizes predictable outcomes, graceful failure modes, and systems that remain stable under pressure.",
      zh: "优先考虑结果可预期、故障能优雅降级，以及系统在压力下仍然稳得住。",
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
      zh: "架构选择上强调清晰、可扩展，以及能在不引入回归的前提下持续迭代。",
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
      zh: "跨越系统边界做事，有很强的主人翁意识。",
    },
    bodyMuted: {
      en: "Communicates decisions clearly, surfaces risks early, and aligns technical execution with broader product goals.",
      zh: "把决策讲清楚、把风险提早暴露，并让技术落地和更大的产品目标对齐。",
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
