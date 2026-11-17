import type { ImageMetadata } from "astro";
import type { Dated } from "@/lib/dates";
import type { I18nText } from "@/lib/i18n";
import { imageByName } from "@/lib/images";

const imgs = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/people/*.{jpg,jpeg,png,webp,svg}",
  { eager: true },
);
const img = imageByName(imgs, "../assets/people/");

export interface Experience extends Dated {
  role: I18nText;
  company: I18nText;
  /** Axis-node label when `company` is too long for a 1/10 slot. */
  short?: I18nText;
  /** "contain" for logo art that is not square or would lose its mark
      to an edge-to-edge crop. Defaults to "cover". */
  logoFit?: "cover" | "contain";
  logo: ImageMetadata | null;
  /** Full detail shown in the dialog. \n\n marks a paragraph break. */
  detail: I18nText;
}

export const experience: Experience[] = [
  {
    role: { en: "Senior AI Solutions Architect", zh: "高级 AI 解决方案架构师" },
    company: { en: "DJI", zh: "大疆创新" },
    start: "2026-11",
    end: null,
    logo: img("DJI.png"),
    detail:
{
      en: "Building the business-finance data platform at DJI in Shenzhen: warehouse architecture, turning finance rules and metrics into data models and services, and the data governance underneath.",
      zh: "在深圳的大疆创新做业财数据平台：数仓架构、把财务规则和指标沉淀为数据模型与服务，以及底下那套数据治理体系。",
    },
  },
  {
    role: { en: "Full Stack Engineer", zh: "全栈工程师" },
    company: { en: "MolarData", zh: "整数智能" },
    start: "2026-08",
    end: "2026-11",
    logo: img("MolarData.jpeg"),
    detail:
{
      en: "Built MolarData's unified cross-cloud observability platform and took it to production, onboarding three business lines.",
      zh: "从零搭起整数智能的跨云统一可观测体系平台并跑通上线，接入了三条业务线。",
    },
  },
  {
    role: { en: "Software Development Engineer II", zh: "软件开发工程师 II" },
    company: { en: "diGeniusAI", zh: "diGeniusAI" },
    start: "2026-05",
    end: null,
    logo: img("diGeniusAI.jpeg"),
    detail:
{
      en: "Working on diGeniusAI, an AI operating system for multi-unit restaurant and retail operators, where agentic modules coordinate over a single source of truth on a serverless architecture.",
      zh: "参与 diGeniusAI —— 一套面向连锁餐饮与零售的 AI 操作系统，在无服务器架构上，各个智能体模块围绕同一份可信数据源协同工作。",
    },
  },
  {
    role: { en: "CEO & Founder", zh: "创始人兼首席执行官" },
    company: { en: "PromptLint", zh: "PromptLint" },
    start: "2025-08",
    end: null,
    logo: img("PromptLint.png"),
    detail:
{
      en: "Building PromptLint, an AI prompt quality analysis tool with real-time scoring and rephrase suggestions, launching on web, desktop, mobile and IDE extension.",
      zh: "在做 PromptLint —— 一个 AI 提示词质量分析工具，提供实时评分与改写建议，覆盖网页、桌面、移动端和 IDE 插件。",
    },
  },
  {
    role: { en: "Software Dev Manager", zh: "软件开发经理" },
    company: { en: "KidzHack", zh: "KidzHack" },
    start: "2026-01",
    end: "2026-04",
    logo: img("KidzHack.jpeg"),
    detail:
{
      en: "Course-based project (CS6966 Practicum). \n\nLed a team of 5 to redesign the alert detection pipeline for Vibes, a K-8 emotional wellness platform. Replaced VADER with Claude AI via AWS Bedrock and designed a five-tier alert classification framework. Delivered a production-ready system on AWS Lambda, DynamoDB, API Gateway, and Bedrock.",
      zh: "课程项目（CS6966 实践课）。\n\n带 5 人团队重做了 Vibes 的告警检测链路——那是一个面向 K-8 学生的情绪健康平台。用 AWS Bedrock 上的 Claude AI 替换掉原来的 VADER，并设计了五级告警分类框架。最终在 AWS Lambda、DynamoDB、API Gateway 和 Bedrock 上交付了可上生产的系统。",
    },
  },
  {
    role: { en: "Teaching Assistant", zh: "助教" },
    company: { en: "Northeastern University", zh: "美国东北大学" },
    short: { en: "Northeastern", zh: "东北大学" },
    logoFit: "contain",
    start: "2025-09",
    end: "2026-05",
    logo: img("NEU.png"),
    detail:
{
      en: "CS5100 Programming Design Paradigm (Fall 2025): Led weekly recitations, graded assignments, and held office hours.\n\nCS5800/INFO6205 Algorithms (Spring 2026): Supported students in algorithm design and analysis under Prof. Jia Zhu, including grading and office hours.",
      zh: "CS5100 程序设计范式（2025 年秋）：负责每周习题课、作业批改和答疑时间。\n\nCS5800/INFO6205 算法（2026 年春）：在朱佳教授指导下，帮助学生做算法设计与分析，同样负责批改和答疑。",
    },
  },
  {
    role: { en: "Software Engineer Intern", zh: "软件工程师实习生" },
    company: { en: "Superstars", zh: "Superstars" },
    start: "2025-05",
    end: "2025-08",
    logo: img("Superstars.png"),
    detail:
{
      en: "Delivered full story creation workflow in Flutter and authored Contribution Guide to streamline onboarding.",
      zh: "用 Flutter 交付了完整的故事创作流程，并编写了贡献指南，让新人上手更顺。",
    },
  },
  {
    role: { en: "Co-founder & President", zh: "联合创始人兼会长" },
    company: { en: "Miami Tech Club", zh: "Miami Tech Club" },
    start: "2025-01",
    end: "2026-05",
    logo: img("Miami_tech_club_logo.jpg"),
    detail:
{
      en: "Leading the Miami Tech Club at Northeastern, organized events like Leetcode challenges and participated in the East Coast Student Leadership Retreat.",
      zh: "负责美国东北大学的 Miami Tech Club，组织了 Leetcode 挑战赛等活动，并参加了东海岸学生领袖研习营。",
    },
  },
  {
    role: { en: "Student Ambassador", zh: "学生大使" },
    company: { en: "Khoury College", zh: "库里学院" },
    start: "2024-11",
    end: "2026-05",
    logo: img("NEU_Khoury_Logo.jpg"),
    detail:
{
      en: "Supporting Khoury College at the Miami campus by collaborating with directors, advisors, and peers to build student community and lead events.",
      zh: "在迈阿密校区协助库里学院，与主任、顾问和同学一起建设学生社群、牵头组织活动。",
    },
  },
  {
    role: { en: "Software Development Engineer", zh: "软件开发工程师" },
    company: { en: "Amazon Web Services", zh: "亚马逊云科技" },
    start: "2021-08",
    end: "2023-06",
    logo: img("AWS_Logo.jpeg"),
    detail:
{
      en: "Led firmware testing and performance evaluation for Amazon EBS, improving system stability and supporting deployments across 20,000+ servers. Worked across teams to unblock releases, reduce operational risk, and improve reliability in large-scale production environments.",
      zh: "主导 Amazon EBS 的固件测试与性能评估，提升了系统稳定性，并支撑了 20,000 多台服务器的部署。跨团队协作推动版本发布、降低运维风险，提高大规模生产环境的可靠性。",
    },
  },
  {
    role: { en: "More", zh: "更多" },
    company: { en: "Additional", zh: "其他经历" },
    short: { en: "More", zh: "更多" },
    // no dates — this entry is the catch-all
    logo: null,
    detail: {
      en: "Additional academic, leadership, and internship experience.",
      zh: "其他的学术、社团与实习经历。",
    },
  },
];
