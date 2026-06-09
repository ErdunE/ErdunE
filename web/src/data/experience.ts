import type { ImageMetadata } from "astro";
import promptlintLogo from "@/assets/people/PromptLint.png";
import kidzhackLogo from "@/assets/people/KidzHack.jpeg";
import neuLogo from "@/assets/people/NEU.png";
import superstarsLogo from "@/assets/people/Superstars.png";
import miamiTechLogo from "@/assets/people/Miami_tech_club_logo.jpg";
import khouryLogo from "@/assets/people/NEU_Khoury_Logo.jpg";
import awsLogo from "@/assets/people/AWS_Logo.jpeg";

export interface Experience {
  role: string;
  company: string;
  time: string;
  logo: ImageMetadata | null;
  /** Full detail shown in the dialog. \n\n marks a paragraph break. */
  detail: string;
}

export const experience: Experience[] = [
  {
    role: "CEO & Founder",
    company: "PromptLint",
    time: "Aug 2025 – Present",
    logo: promptlintLogo,
    detail:
      "Building PromptLint, an AI prompt quality analysis tool with real-time scoring and rephrase suggestions, launching on web, desktop, mobile and IDE extension.",
  },
  {
    role: "Software Dev Manager",
    company: "KidzHack",
    time: "Jan 2026 – Apr 2026",
    logo: kidzhackLogo,
    detail:
      "Course-based project (CS6966 Practicum). \n\nLed a team of 5 to redesign the alert detection pipeline for Vibes, a K-8 emotional wellness platform. Replaced VADER with Claude AI via AWS Bedrock and designed a five-tier alert classification framework. Delivered a production-ready system on AWS Lambda, DynamoDB, API Gateway, and Bedrock.",
  },
  {
    role: "Teaching Assistant",
    company: "Northeastern University",
    time: "Sep 2025 – May 2026",
    logo: neuLogo,
    detail:
      "CS5100 Programming Design Paradigm (Fall 2025): Led weekly recitations, graded assignments, and held office hours.\n\nCS5800/INFO6205 Algorithms (Spring 2026): Supported students in algorithm design and analysis under Prof. Jia Zhu, including grading and office hours.",
  },
  {
    role: "Software Engineer Intern",
    company: "Superstars",
    time: "May 2025 – Aug 2025",
    logo: superstarsLogo,
    detail:
      "Delivered full story creation workflow in Flutter and authored Contribution Guide to streamline onboarding.",
  },
  {
    role: "Co-founder & President",
    company: "Miami Tech Club",
    time: "Jan 2025 – May 2026",
    logo: miamiTechLogo,
    detail:
      "Leading the Miami Tech Club at Northeastern, organized events like Leetcode challenges and participated in the East Coast Student Leadership Retreat.",
  },
  {
    role: "Student Ambassador",
    company: "Khoury College",
    time: "Nov 2024 – May 2026",
    logo: khouryLogo,
    detail:
      "Supporting Khoury College at the Miami campus by collaborating with directors, advisors, and peers to build student community and lead events.",
  },
  {
    role: "Software Development Engineer",
    company: "Amazon Web Services",
    time: "Aug 2021 – Jun 2023",
    logo: awsLogo,
    detail:
      "Led firmware testing and performance evaluation for Amazon EBS, improving system stability and supporting deployments across 20,000+ servers. Worked across teams to unblock releases, reduce operational risk, and improve reliability in large-scale production environments.",
  },
  {
    role: "More",
    company: "Additional",
    time: "",
    logo: null,
    detail: "Additional academic, leadership, and internship experience.",
  },
];
