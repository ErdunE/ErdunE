import type { ImageMetadata } from "astro";
import { imageByName } from "@/lib/images";
import type { I18nText } from "@/lib/i18n";

const imgs = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/projects/*.{jpg,jpeg,png,webp,svg}",
  { eager: true },
);
const img = imageByName(imgs, "../assets/projects/");

export interface Project {
  title: I18nText;
  href: string;
  thumbnail: ImageMetadata;
  /** Product names keep their form; descriptive phrases translate (§4.2). */
  tags: I18nText[];
  descPrimary: I18nText;
  descSecondary: I18nText;
}

export const projects: Project[] = [
  {
    title: { en: "ErdunE's Web", zh: "额尔敦的个人网站" },
    href: "https://github.com/ErdunE/ErdunE",
    thumbnail: img("01.png"),
    tags: [{ en: "Astro", zh: "Astro" }, { en: "React", zh: "React" }, { en: "TypeScript", zh: "TypeScript" }, { en: "Tailwind CSS", zh: "Tailwind CSS" }],
    descPrimary: {
      en: "My personal portfolio site, designed and built from scratch.",
      zh: "我的个人作品集网站，设计和开发都是从零做的。",
    },
    descSecondary: {
      en: "Astro with React islands, TypeScript, and Tailwind, animated with Motion and deployed on Cloudflare Pages.",
      zh: "Astro 加 React 群岛、TypeScript 和 Tailwind，动效用 Motion，部署在 Cloudflare Pages。",
    },
  },
  {
    title: { en: "PromptLint", zh: "PromptLint" },
    href: "https://github.com/ErdunE/promptlint",
    thumbnail: img("promptlint.png"),
    tags: [{ en: "AI/ML", zh: "人工智能 / 机器学习" }, { en: "Prompt Engineering", zh: "提示词工程" }, { en: "Chrome Extension", zh: "Chrome 扩展" }, { en: "Developer Tooling", zh: "开发者工具" }],
    descPrimary: {
      en: "An AI-powered prompt quality analysis and optimization tool for developers.",
      zh: "面向开发者的 AI 提示词质量分析与优化工具。",
    },
    descSecondary: {
      en: "Provides real-time prompt scoring, structured feedback, and rephrase suggestions across web, IDE, and browser extensions.",
      zh: "在网页、IDE 和浏览器插件里提供实时提示词评分、结构化反馈和改写建议。",
    },
  },
  {
    title: { en: "Superstars", zh: "Superstars" },
    href: "https://github.com/naylalabs/superstars-mobile-v2",
    thumbnail: img("superstars.png"),
    tags: [{ en: "Flutter", zh: "Flutter" }, { en: "Bloc", zh: "Bloc" }, { en: "Firebase", zh: "Firebase" }, { en: "Mobile Architecture", zh: "移动端架构" }],
    descPrimary: {
      en: "A video-first professional hiring and networking mobile platform.",
      zh: "以视频为主的招聘与职场社交移动平台。",
    },
    descSecondary: {
      en: "Implemented end-to-end story creation workflows with clean architecture, state management, and media processing.",
      zh: "实现了端到端的故事创作流程，包含整洁架构、状态管理和媒体处理。",
    },
  },
  {
    title: { en: "Traffic Sign Recognition", zh: "交通标志识别" },
    href: "https://github.com/ErdunE/AI-Project-Computer-Vision-Traffic-Sign-Recognition",
    thumbnail: img("traffic_sign_classification_phases.png"),
    tags: [{ en: "Computer Vision", zh: "计算机视觉" }, { en: "CNN", zh: "卷积神经网络" }, { en: "TensorFlow", zh: "TensorFlow" }, { en: "Deep Learning", zh: "深度学习" }],
    descPrimary: {
      en: "A deep learning system for traffic sign classification and recognition.",
      zh: "识别并分类交通标志的深度学习系统。",
    },
    descSecondary: {
      en: "Trained CNN models on the GTSRB dataset with image augmentation and performance evaluation pipelines.",
      zh: "在 GTSRB 数据集上训练卷积神经网络模型，配套图像增强与性能评估流程。",
    },
  },
  {
    title: { en: "Bean Vibes", zh: "Bean Vibes" },
    href: "https://github.com/ErdunE/CS5200-Final-Project",
    thumbnail: img("02.jpg"),
    tags: [{ en: "Android", zh: "Android" }, { en: "MySQL", zh: "MySQL" }, { en: "REST API", zh: "REST API" }, { en: "Full Stack", zh: "全栈" }],
    descPrimary: {
      en: "A full-stack mobile app for personalized coffee tasting and journaling.",
      zh: "把每一杯咖啡的风味记下来，全栈移动应用。",
    },
    descSecondary: {
      en: "Supports flavor profiling, brew tracking, and backend-driven data persistence via RESTful APIs.",
      zh: "支持风味画像、冲煮记录，并通过 RESTful API 做后端数据持久化。",
    },
  },
  {
    title: { en: "Habitend", zh: "Habitend" },
    href: "https://github.com/ErdunE/CS5520-Final-Project",
    thumbnail: img("03.jpg"),
    tags: [{ en: "Kotlin", zh: "Kotlin" }, { en: "Firebase", zh: "Firebase" }, { en: "MVVM", zh: "MVVM" }, { en: "Mobile UX", zh: "移动端体验" }],
    descPrimary: {
      en: "A gamified habit-tracking Android application.",
      zh: "把习惯打卡做成游戏的 Android 应用。",
    },
    descSecondary: {
      en: "Designed with MVVM architecture, real-time sync, and streak-based habit visualization.",
      zh: "MVVM 架构，实时同步，用连续天数把习惯画出来。",
    },
  },
  {
    title: { en: "Entertainment Rec System", zh: "影视推荐系统" },
    href: "https://github.com/ErdunE/NortheasternMiami/tree/main/CS5010ProgrammingDesignParadigm/Final%20Project/FinalProject",
    thumbnail: img("04.jpg"),
    tags: [{ en: "JavaFX", zh: "JavaFX" }, { en: "Recommendation System", zh: "推荐系统" }, { en: "API Integration", zh: "API 对接" }, { en: "Desktop Application", zh: "桌面应用" }],
    descPrimary: {
      en: "A desktop-based movie recommendation application.",
      zh: "桌面端的影视推荐应用。",
    },
    descSecondary: {
      en: "Integrates TMDB API to filter and rank movies by genre, popularity, language, and release year.",
      zh: "接入 TMDB API，按类型、热度、语言和上映年份筛选并排序影片。",
    },
  },
  {
    title: { en: "KNN Visualization", zh: "K 近邻算法可视化" },
    href: "https://github.com/ErdunE/CS5800-Final-Project",
    thumbnail: img("05.jpg"),
    tags: [{ en: "Machine Learning", zh: "机器学习" }, { en: "KNN", zh: "K 近邻算法" }, { en: "Data Visualization", zh: "数据可视化" }, { en: "Python", zh: "Python" }],
    descPrimary: {
      en: "An interactive visualization tool for the k-Nearest Neighbors algorithm.",
      zh: "K 近邻算法的交互式可视化工具。",
    },
    descSecondary: {
      en: "Enables real-time adjustment of K values and distance metrics with visual decision boundaries.",
      zh: "可以实时调整 K 值和距离度量，并直观看到决策边界的变化。",
    },
  },
  {
    title: { en: "Due Mate", zh: "Due Mate" },
    href: "https://github.com/ErdunE/DueMate",
    thumbnail: img("06.jpg"),
    tags: [{ en: "Python", zh: "Python" }, { en: "Flask", zh: "Flask" }, { en: "SQLite", zh: "SQLite" }, { en: "Backend Systems", zh: "后端系统" }],
    descPrimary: {
      en: "A unified bill and payment deadline tracking application.",
      zh: "账单和缴费截止日，集中在一处。",
    },
    descSecondary: {
      en: "Supports recurring payments, reminders, and lightweight backend persistence.",
      zh: "支持周期账单和提醒，后端持久化做得很轻。",
    },
  },
  {
    title: { en: "FuckWork", zh: "FuckWork" },
    href: "https://github.com/ErdunE/Fuck-work",
    thumbnail: img("fuckwork.png"),
    tags: [{ en: "Chrome Extension", zh: "Chrome 扩展" }, { en: "Productivity", zh: "效率工具" }, { en: "JavaScript", zh: "JavaScript" }, { en: "UX Design", zh: "用户体验设计" }],
    descPrimary: {
      en: "A no-nonsense productivity Chrome extension designed to eliminate distractions.",
      zh: "不讲情面的 Chrome 效率插件，专门用来消灭干扰。",
    },
    descSecondary: {
      en: "Enforces focus through aggressive blocking rules and opinionated UX design.",
      zh: "靠强硬的拦截规则和不留余地的交互设计，把注意力摁回来。",
    },
  },
  {
    title: { en: "Mira", zh: "Mira" },
    href: "https://github.com/ErdunE/mira-astrology-companion",
    thumbnail: img("mira.png"),
    tags: [{ en: "AI", zh: "人工智能" }, { en: "NLP", zh: "自然语言处理" }, { en: "Reasoning Systems", zh: "推理系统" }, { en: "Python", zh: "Python" }],
    descPrimary: {
      en: "An intelligent AI assistant prototype focused on structured reasoning.",
      zh: "聚焦结构化推理的 AI 助手原型。",
    },
    descSecondary: {
      en: "Explores context-aware response generation and prompt-to-structure pipelines.",
      zh: "探索怎么让回复读懂上下文，以及从提示词到结构化输出的链路。",
    },
  },
  {
    title: { en: "Forecasting Store Sales", zh: "门店销售预测" },
    href: "https://github.com/ErdunE/NortheasternMiami/tree/main/CS6140MachineLearning/FinalProject",
    thumbnail: img("store_sales_forecasting.png"),
    tags: [{ en: "Machine Learning", zh: "机器学习" }, { en: "Time Series Forecasting", zh: "时间序列预测" }, { en: "Feature Engineering", zh: "特征工程" }, { en: "Python", zh: "Python" }],
    descPrimary: {
      en: "A retail sales forecasting project using historical time-series data.",
      zh: "用历史时间序列预测零售销量。",
    },
    descSecondary: {
      en: "Compares multiple models with feature engineering, validation strategies, and performance analysis.",
      zh: "对比多个模型，配合特征工程、验证策略和性能分析。",
    },
  },
  {
    title: { en: "Vibes Alert System Enhancement", zh: "Vibes 告警系统升级" },
    href: "https://www.notion.so/Vibes-Alert-System-Enhancement-Technical-Delivery-Report-336134f951b580918c9dfb1c865b5f53",
    thumbnail: img("Vibes.png"),
    tags: [{ en: "AWS Bedrock", zh: "AWS Bedrock" }, { en: "Claude AI", zh: "Claude AI" }, { en: "AWS Lambda", zh: "AWS Lambda" }, { en: "DynamoDB", zh: "DynamoDB" }],
    descPrimary: {
      en: "AI-powered student distress detection system for a K-8 emotional wellness platform.",
      zh: "为 K-8 情绪健康平台做的 AI 学生心理预警系统。",
    },
    descSecondary: {
      en: "Replaced legacy VADER sentiment analysis with Claude AI via AWS Bedrock. Designed a five-tier alert classification framework combining real-time scoring and six-day rolling history.",
      zh: "用 AWS Bedrock 上的 Claude AI 换掉老的 VADER 情感分析，并设计了五级告警分类框架——实时评分加六天滚动历史。",
    },
  },
  {
    title: { en: "ClaimIt", zh: "ClaimIt" },
    href: "https://github.com/claimit-team/claimit",
    thumbnail: img("claimit.webp"),
    tags: [{ en: "Multi-Agent AI", zh: "多智能体 AI" }, { en: "Gemini", zh: "Gemini" }, { en: "Next.js", zh: "Next.js" }, { en: "MongoDB", zh: "MongoDB" }],
    descPrimary: {
      en: "A multi-agent AI system that automates post-purchase price-match refunds.",
      zh: "自动处理购后价保退款的多智能体 AI 系统。",
    },
    descSecondary: {
      en: "Four Gemini agents coordinate over a Pub/Sub event bus, with MongoDB, Phoenix, and Elastic MCP integrations.",
      zh: "四个 Gemini 智能体通过 Pub/Sub 事件总线协同，并接入 MongoDB、Phoenix 和 Elastic MCP。",
    },
  },
];
