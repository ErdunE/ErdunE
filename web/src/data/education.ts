import type { ImageMetadata } from "astro";
import { imageByName } from "@/lib/images";

const imgs = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/edu/*.{jpg,jpeg,png,webp,svg}",
  { eager: true },
);
const img = imageByName(imgs, "../assets/edu/");

export interface Award {
  text: string;
  href?: string;
}

export interface Education {
  school: string;
  schoolHref: string;
  college: string;
  collegeHref: string;
  location: string;
  locationHref: string;
  time: string;
  degree: string;
  gpa: string;
  logo: ImageMetadata;
  mascot: ImageMetadata;
  courses: string[];
  awards: Award[];
}

export const education: Education[] = [
  {
    school: "Northeastern University",
    schoolHref: "https://www.northeastern.edu/",
    college: "Khoury College of Computer Science",
    collegeHref: "https://www.khoury.northeastern.edu/",
    location: "Miami, FL",
    locationHref: "https://miami.northeastern.edu/",
    time: "Sep 2024 – May 2026",
    degree: "M.S. in Computer Science",
    gpa: "4.00",
    logo: img("NEU.png"),
    mascot: img("NEUmascot.svg"),
    courses: [
      "CS5100 Foundations of Artificial Intelligence",
      "CS5520 Mobile App Development",
      "CS6140 Machine Learning",
      "CS6620 Fundamentals of Cloud Computing",
    ],
    awards: [
      {
        text: "2025 Outstanding Network Student Award 🏅",
        href: "https://outstandingawards.sites.northeastern.edu/2025-winners/#:~:text=Oakland%20campus%20community.-,2025,-Outstanding%20Network%20Student",
      },
      {
        text: "2026 Outstanding Teaching Assistant Award 🏅",
        href: "https://credsverse.com/credentials/c18ca22c-703f-4a75-b438-bd656b52c18b",
      },
      {
        text: "Laurel and Scroll 100 Honor Society 🏅",
        href: "https://distinction.northeastern.edu/laurel-and-scroll-100/laurel-and-scroll-100-inductees-2026/#:~:text=Erdun%20E%2C%20MS%E2%80%9926%20(Miami)",
      },
      {
        text: "President & Co-founder of Miami Tech Club",
        href: "https://www.khoury.northeastern.edu/clubs_and_orgs/miami-tech-club/",
      },
      { text: "Student Ambassador" },
    ],
  },
  {
    school: "University of Massachusetts",
    schoolHref: "https://www.massachusetts.edu/",
    college: "Kennedy College of Sciences",
    collegeHref: "https://www.uml.edu/",
    location: "Lowell, MA",
    locationHref: "https://www.uml.edu/Sciences/",
    time: "May 2016 – Dec 2020",
    degree: "B.S. in Computer Science",
    gpa: "3.20",
    logo: img("Umass.png"),
    mascot: img("UMLmascot.svg"),
    courses: [
      "COMP4200 Artificial Intelligence",
      "COMP4210 Data Mining",
      "COMP4610 GUI Programming I",
      "COMP4630 Mobile App Programming I",
    ],
    awards: [
      { text: "Dean's List (2018 – 2020) 🏅" },
      { text: "Communications Lead, CSSA" },
    ],
  },
];
