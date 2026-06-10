export type CapabilityIcon =
  | "network"
  | "shield-check"
  | "git-branch"
  | "compass";

export interface Capability {
  title: string;
  /** lucide icon key, resolved to a component in Capability.astro. */
  icon: CapabilityIcon;
  /** Two paragraphs: lead statement + a muted elaboration. */
  body: string;
  bodyMuted: string;
}

export const capabilityLead =
  "Erdun's engineering capabilities are shaped by real systems and real constraints. He focuses on making sound engineering decisions in environments where trade-offs matter. Decisions balance reliability, clarity, and long-term maintainability over short-term wins.";

export const capabilities: Capability[] = [
  {
    title: "System-Level Decision Making",
    icon: "network",
    body: "Experience making trade-off decisions in complex systems where performance, stability, velocity, and maintainability conflict.",
    bodyMuted:
      "Focused on reducing long-term risk, knowing when to simplify, and recognizing when deeper investment is necessary.",
  },
  {
    title: "Reliable Delivery Under Real Constraints",
    icon: "shield-check",
    body: "Delivered features and workflows in production environments with real users, deadlines, and dependencies.",
    bodyMuted:
      "Prioritizes predictable outcomes, graceful failure modes, and systems that remain stable under pressure.",
  },
  {
    title: "Engineering for Change",
    icon: "git-branch",
    body: "Designs systems with the assumption that requirements will evolve.",
    bodyMuted:
      "Architectural choices emphasize clarity, extensibility, and the ability to iterate without introducing regressions.",
  },
  {
    title: "Ownership & Judgment",
    icon: "compass",
    body: "Operates with a strong sense of ownership across system boundaries.",
    bodyMuted:
      "Communicates decisions clearly, surfaces risks early, and aligns technical execution with broader product goals.",
  },
];

export const capabilityContext = {
  title: "Technical Context",
  text: "Specific tools, languages, and frameworks naturally vary by project and team. The capabilities above reflect transferable engineering practices that remain applicable across technology stacks.",
};
