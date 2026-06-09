import type { ImageMetadata } from "astro";
import erduneWeb from "@/assets/projects/01.png";
import promptlint from "@/assets/projects/promptlint.png";
import superstars from "@/assets/projects/superstars.png";
import trafficSign from "@/assets/projects/traffic_sign_classification_phases.png";
import beanVibes from "@/assets/projects/02.jpg";
import habitend from "@/assets/projects/03.jpg";
import entertainmentRec from "@/assets/projects/04.jpg";
import knn from "@/assets/projects/05.jpg";
import dueMate from "@/assets/projects/06.jpg";
import fuckwork from "@/assets/projects/fuckwork.png";
import mira from "@/assets/projects/mira.png";
import storeSales from "@/assets/projects/store_sales_forecasting.png";
import vibes from "@/assets/projects/Vibes.png";

export interface Project {
  title: string;
  href: string;
  thumbnail: ImageMetadata;
  tags: string[];
  descPrimary: string;
  descSecondary: string;
}

export const projects: Project[] = [
  {
    title: "ErdunE's Web",
    href: "https://github.com/ErdunE/ErdunE/tree/master",
    thumbnail: erduneWeb,
    tags: ["Bootstrap", "Responsive Design", "Personal Portfolio"],
    descPrimary:
      "A fully responsive personal portfolio website showcasing projects and experience.",
    descSecondary:
      "Built with Bootstrap and custom CSS, featuring glassmorphism UI, video background, and a custom 3D carousel.",
  },
  {
    title: "PromptLint",
    href: "https://github.com/ErdunE/promptlint",
    thumbnail: promptlint,
    tags: ["AI/ML", "Prompt Engineering", "Chrome Extension", "Developer Tooling"],
    descPrimary:
      "An AI-powered prompt quality analysis and optimization tool for developers.",
    descSecondary:
      "Provides real-time prompt scoring, structured feedback, and rephrase suggestions across web, IDE, and browser extensions.",
  },
  {
    title: "Superstars",
    href: "https://github.com/naylalabs/superstars-mobile-v2",
    thumbnail: superstars,
    tags: ["Flutter", "Bloc", "Firebase", "Mobile Architecture"],
    descPrimary:
      "A video-first professional hiring and networking mobile platform.",
    descSecondary:
      "Implemented end-to-end story creation workflows with clean architecture, state management, and media processing.",
  },
  {
    title: "Traffic Sign Recognition",
    href: "https://github.com/ErdunE/AI-Project-Computer-Vision-Traffic-Sign-Recognition",
    thumbnail: trafficSign,
    tags: ["Computer Vision", "CNN", "TensorFlow", "Deep Learning"],
    descPrimary:
      "A deep learning system for traffic sign classification and recognition.",
    descSecondary:
      "Trained CNN models on the GTSRB dataset with image augmentation and performance evaluation pipelines.",
  },
  {
    title: "Bean Vibes",
    href: "https://github.com/ErdunE/CS5200-Final-Project",
    thumbnail: beanVibes,
    tags: ["Android", "MySQL", "REST API", "Full Stack"],
    descPrimary:
      "A full-stack mobile app for personalized coffee tasting and journaling.",
    descSecondary:
      "Supports flavor profiling, brew tracking, and backend-driven data persistence via RESTful APIs.",
  },
  {
    title: "Habitend",
    href: "https://github.com/ErdunE/CS5520-Final-Project",
    thumbnail: habitend,
    tags: ["Kotlin", "Firebase", "MVVM", "Mobile UX"],
    descPrimary: "A gamified habit-tracking Android application.",
    descSecondary:
      "Designed with MVVM architecture, real-time sync, and streak-based habit visualization.",
  },
  {
    title: "Entertainment Rec System",
    href: "https://github.com/ErdunE/NortheasternMiami/tree/main/CS5010ProgrammingDesignParadigm/Final%20Project/FinalProject",
    thumbnail: entertainmentRec,
    tags: ["JavaFX", "Recommendation System", "API Integration", "Desktop Application"],
    descPrimary: "A desktop-based movie recommendation application.",
    descSecondary:
      "Integrates TMDB API to filter and rank movies by genre, popularity, language, and release year.",
  },
  {
    title: "KNN Visualization",
    href: "https://github.com/ErdunE/CS5800-Final-Project",
    thumbnail: knn,
    tags: ["Machine Learning", "KNN", "Data Visualization", "Python"],
    descPrimary:
      "An interactive visualization tool for the k-Nearest Neighbors algorithm.",
    descSecondary:
      "Enables real-time adjustment of K values and distance metrics with visual decision boundaries.",
  },
  {
    title: "Due Mate",
    href: "https://github.com/ErdunE/DueMate",
    thumbnail: dueMate,
    tags: ["Python", "Flask", "SQLite", "Backend Systems"],
    descPrimary: "A unified bill and payment deadline tracking application.",
    descSecondary:
      "Supports recurring payments, reminders, and lightweight backend persistence.",
  },
  {
    title: "FuckWork",
    href: "https://github.com/ErdunE/Fuck-work",
    thumbnail: fuckwork,
    tags: ["Chrome Extension", "Productivity", "JavaScript", "UX Design"],
    descPrimary:
      "A no-nonsense productivity Chrome extension designed to eliminate distractions.",
    descSecondary:
      "Enforces focus through aggressive blocking rules and opinionated UX design.",
  },
  {
    title: "Mira",
    href: "https://github.com/ErdunE/mira-astrology-companion",
    thumbnail: mira,
    tags: ["AI", "NLP", "Reasoning Systems", "Python"],
    descPrimary:
      "An intelligent AI assistant prototype focused on structured reasoning.",
    descSecondary:
      "Explores context-aware response generation and prompt-to-structure pipelines.",
  },
  {
    title: "Forecasting Store Sales",
    href: "https://github.com/ErdunE/NortheasternMiami/tree/main/CS6140MachineLearning/FinalProject",
    thumbnail: storeSales,
    tags: ["Machine Learning", "Time Series Forecasting", "Feature Engineering", "Python"],
    descPrimary:
      "A retail sales forecasting project using historical time-series data.",
    descSecondary:
      "Compares multiple models with feature engineering, validation strategies, and performance analysis.",
  },
  {
    title: "Vibes Alert System Enhancement",
    href: "https://www.notion.so/Vibes-Alert-System-Enhancement-Technical-Delivery-Report-336134f951b580918c9dfb1c865b5f53",
    thumbnail: vibes,
    tags: ["AWS Bedrock", "Claude AI", "AWS Lambda", "DynamoDB"],
    descPrimary:
      "AI-powered student distress detection system for a K-8 emotional wellness platform.",
    descSecondary:
      "Replaced legacy VADER sentiment analysis with Claude AI via AWS Bedrock. Designed a five-tier alert classification framework combining real-time scoring and six-day rolling history.",
  },
];
