import type { ImageMetadata } from "astro";
import type { Dated } from "@/lib/dates";
import { imageByName } from "@/lib/images";

const imgs = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/people/*.{jpg,jpeg,png,webp,svg}",
  { eager: true },
);
const img = imageByName(imgs, "../assets/people/");

export interface Experience extends Dated {
  role: string;
  company: string;
  /** Axis-node label when `company` is too long for a 1/10 slot. */
  short?: string;
  /** "contain" for logo art that is not square or would lose its mark
      to an edge-to-edge crop. Defaults to "cover". */
  logoFit?: "cover" | "contain";
  logo: ImageMetadata | null;
  /** Full detail shown in the dialog. \n\n marks a paragraph break. */
  detail: string;
}

export const experience: Experience[] = [
  {
    role: "Senior AI Solutions Architect",
    company: "DJI",
    start: "2026-11",
    end: null,
    logo: img("DJI.png"),
    detail:
      "Building the business-finance data platform at DJI in Shenzhen: warehouse architecture, turning finance rules and metrics into data models and services, and the data governance underneath.",
  },
  {
    role: "Full Stack Engineer",
    company: "MolarData",
    start: "2026-08",
    end: "2026-11",
    logo: img("MolarData.jpeg"),
    detail:
      "Built MolarData's unified cross-cloud observability platform and took it to production, onboarding three business lines.",
  },
  {
    role: "Software Development Engineer II",
    company: "diGeniusAI",
    start: "2026-05",
    end: null,
    logo: img("diGeniusAI.jpeg"),
    detail:
      "Working on diGeniusAI, an AI operating system for multi-unit restaurant and retail operators, where agentic modules coordinate over a single source of truth on a serverless architecture.",
  },
  {
    role: "CEO & Founder",
    company: "PromptLint",
    start: "2025-08",
    end: null,
    logo: img("PromptLint.png"),
    detail:
      "Building PromptLint, an AI prompt quality analysis tool with real-time scoring and rephrase suggestions, launching on web, desktop, mobile and IDE extension.",
  },
  {
    role: "Software Dev Manager",
    company: "KidzHack",
    start: "2026-01",
    end: "2026-04",
    logo: img("KidzHack.jpeg"),
    detail:
      "Course-based project (CS6966 Practicum). \n\nLed a team of 5 to redesign the alert detection pipeline for Vibes, a K-8 emotional wellness platform. Replaced VADER with Claude AI via AWS Bedrock and designed a five-tier alert classification framework. Delivered a production-ready system on AWS Lambda, DynamoDB, API Gateway, and Bedrock.",
  },
  {
    role: "Teaching Assistant",
    company: "Northeastern University",
    short: "Northeastern",
    logoFit: "contain",
    start: "2025-09",
    end: "2026-05",
    logo: img("NEU.png"),
    detail:
      "CS5100 Programming Design Paradigm (Fall 2025): Led weekly recitations, graded assignments, and held office hours.\n\nCS5800/INFO6205 Algorithms (Spring 2026): Supported students in algorithm design and analysis under Prof. Jia Zhu, including grading and office hours.",
  },
  {
    role: "Software Engineer Intern",
    company: "Superstars",
    start: "2025-05",
    end: "2025-08",
    logo: img("Superstars.png"),
    detail:
      "Delivered full story creation workflow in Flutter and authored Contribution Guide to streamline onboarding.",
  },
  {
    role: "Co-founder & President",
    company: "Miami Tech Club",
    start: "2025-01",
    end: "2026-05",
    logo: img("Miami_tech_club_logo.jpg"),
    detail:
      "Leading the Miami Tech Club at Northeastern, organized events like Leetcode challenges and participated in the East Coast Student Leadership Retreat.",
  },
  {
    role: "Student Ambassador",
    company: "Khoury College",
    start: "2024-11",
    end: "2026-05",
    logo: img("NEU_Khoury_Logo.jpg"),
    detail:
      "Supporting Khoury College at the Miami campus by collaborating with directors, advisors, and peers to build student community and lead events.",
  },
  {
    role: "Software Development Engineer",
    company: "Amazon Web Services",
    start: "2021-08",
    end: "2023-06",
    logo: img("AWS_Logo.jpeg"),
    detail:
      "Led firmware testing and performance evaluation for Amazon EBS, improving system stability and supporting deployments across 20,000+ servers. Worked across teams to unblock releases, reduce operational risk, and improve reliability in large-scale production environments.",
  },
  {
    role: "More",
    company: "Additional",
    short: "More",
    // no dates — this entry is the catch-all
    logo: null,
    detail: "Additional academic, leadership, and internship experience.",
  },
];
