export type LogSource = "project" | "event" | "press" | "milestone" | "note";

export interface LogEntry {
  /** ISO date (YYYY-MM-DD); the component sorts newest first. */
  date: string;
  source: LogSource;
  title: string;
  link?: string;
  /** Path under public/ (e.g. /log/foo.jpg). Omit for a text-only row. */
  media?: string;
}

export const log: LogEntry[] = [
  {
    date: "2026-06-10",
    source: "project",
    title:
      "Shipped ClaimIt with Will W., Raj K. and Chris C. for the Google Cloud Rapid Agent Hackathon: an AI agent for post-purchase price protection.",
    link: "https://claimitai.vercel.app/",
    // ClaimIt has no og:image yet, so this row stays text-only for now.
  },
  {
    date: "2026-06-09",
    source: "project",
    title: "Rebuilt and relaunched erdun.me on Astro and Cloudflare.",
    link: "https://erdun.me",
    media: "/log/erdunme.png",
  },
  {
    date: "2026-05-21",
    source: "press",
    title:
      "Featured in Khoury News: students bring in a record awards haul at the 2026 Northeastern convocation.",
    link: "https://www.khoury.northeastern.edu/khoury-students-bring-in-record-awards-haul-at-2026-northeastern-convocation/",
    media: "/log/khoury-awards.jpg",
  },
  {
    date: "2026-05-21",
    source: "press",
    title:
      "Featured in Khoury News: 'Coast to coast,' on 2026 Khoury grads' milestones and next steps.",
    link: "https://www.khoury.northeastern.edu/coast-to-coast-2026-khoury-grads-recognize-milestones-and-plan-their-next-steps/",
    media: "/log/khoury-coast.jpg",
  },
  {
    date: "2026-05-07",
    source: "event",
    title:
      "Teamed up with Will W., Raj K. and Chris C. to enter the Google Cloud Rapid Agent Hackathon.",
    link: "https://rapid-agent.devpost.com/",
    media: "/log/rapid-agent.jpg",
  },
  {
    date: "2026-05-05",
    source: "note",
    title: "Shared that I'm open to software and backend engineering roles.",
    link: "https://www.linkedin.com/posts/erdune_opentowork-softwareengineer-backendengineer-activity-7457822954211426305-yGXJ",
  },
  {
    date: "2026-05-02",
    source: "milestone",
    title: "Graduated from Northeastern University.",
    link: "https://www.linkedin.com/posts/erdune_gohuskies-khourymia-khourycollege-activity-7457188941671202816-dKQh",
    // media /log/graduation.jpg pending from Erdun; text-only until then.
  },
];
