import type { ImageMetadata } from "astro";
import type { Dated } from "@/lib/dates";
import type { I18nText } from "@/lib/i18n";
import { imageByName } from "@/lib/images";

const imgs = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/edu/*.{jpg,jpeg,png,webp,svg}",
  { eager: true },
);
const img = imageByName(imgs, "../assets/edu/");

export interface Award {
  text: I18nText;
  href?: string;
}

export interface Education extends Dated {
  school: I18nText;
  schoolHref: string;
  college: I18nText;
  collegeHref: string;
  location: I18nText;
  locationHref: string;
  degree: I18nText;
  gpa: string;
  logo: ImageMetadata;
  mascot: ImageMetadata;
  courses: I18nText[];
  awards: Award[];
}

export const education: Education[] = [
  {
    school: { en: "Northeastern University", zh: "美国东北大学" },
    schoolHref: "https://www.northeastern.edu/",
    college: { en: "Khoury College of Computer Sciences", zh: "库里计算机科学学院" },
    collegeHref: "https://www.khoury.northeastern.edu/",
    location: { en: "Miami, FL", zh: "美国佛罗里达州迈阿密" },
    locationHref: "https://miami.northeastern.edu/",
    start: "2024-09",
    end: "2026-05",
    degree: { en: "M.S. in Computer Science", zh: "计算机科学硕士" },
    gpa: "4.00",
    logo: img("NEU.png"),
    mascot: img("NEUmascot.svg"),
    courses: [
      { en: "CS5100 Foundations of Artificial Intelligence", zh: "CS5100 人工智能基础" },
      { en: "CS5520 Mobile App Development", zh: "CS5520 移动应用开发" },
      { en: "CS6140 Machine Learning", zh: "CS6140 机器学习" },
      { en: "CS6620 Fundamentals of Cloud Computing", zh: "CS6620 云计算基础" },
    ],
    awards: [
      {
        text: { en: "2025 Outstanding Network Student Award 🏅", zh: "2025 年度全球校区杰出学生奖 🏅" },
        href: "https://outstandingawards.sites.northeastern.edu/2025-winners/#:~:text=Oakland%20campus%20community.-,2025,-Outstanding%20Network%20Student",
      },
      {
        text: { en: "2026 Outstanding Teaching Assistant Award 🏅", zh: "2026 年度杰出助教奖 🏅" },
        href: "https://credsverse.com/credentials/c18ca22c-703f-4a75-b438-bd656b52c18b",
      },
      {
        text: { en: "Laurel and Scroll 100 Honor Society 🏅", zh: "Laurel and Scroll 100 荣誉学会 🏅" },
        href: "https://distinction.northeastern.edu/laurel-and-scroll-100/laurel-and-scroll-100-inductees-2026/#:~:text=Erdun%20E%2C%20MS%E2%80%9926%20(Miami)",
      },
      {
        text: { en: "President & Co-founder of Miami Tech Club", zh: "Miami Tech Club 会长兼联合创始人" },
        href: "https://www.khoury.northeastern.edu/clubs_and_orgs/miami-tech-club/",
      },
      { text: { en: "Student Ambassador", zh: "学生大使" } },
    ],
  },
  {
    school: { en: "University of Massachusetts Lowell", zh: "马萨诸塞大学洛厄尔分校" },
    schoolHref: "https://www.uml.edu/",
    college: { en: "Kennedy College of Sciences", zh: "肯尼迪理学院" },
    collegeHref: "https://www.uml.edu/",
    location: { en: "Lowell, MA", zh: "美国马萨诸塞州洛厄尔" },
    locationHref: "https://www.uml.edu/Sciences/",
    start: "2016-05",
    end: "2020-12",
    degree: { en: "B.S. in Computer Science", zh: "计算机科学学士" },
    gpa: "3.20",
    logo: img("Umass.png"),
    mascot: img("UMLmascot.svg"),
    courses: [
      { en: "COMP4200 Artificial Intelligence", zh: "COMP4200 人工智能" },
      { en: "COMP4210 Data Mining", zh: "COMP4210 数据挖掘" },
      { en: "COMP4610 GUI Programming I", zh: "COMP4610 图形界面编程 I" },
      { en: "COMP4630 Mobile App Programming I", zh: "COMP4630 移动应用编程 I" },
    ],
    awards: [
      { text: { en: "Dean's List (2018 – 2020) 🏅", zh: "院长嘉许名单（2018—2020）🏅" } },
      { text: { en: "Communications Lead, CSSA", zh: "中国学生学者联合会 宣传负责人" } },
    ],
  },
];
