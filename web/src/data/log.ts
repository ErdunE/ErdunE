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
    date: "2026-08-25",
    source: "milestone",
    title:
      "Started as a Full Stack Engineer at MolarData, on the team behind their AI data annotation platform.",
    link: "https://www.molardata.com/",
    media: "/log/13molardata-start.webp",
  },
  {
    date: "2026-08-20",
    source: "note",
    title:
      "Arrived in Hangzhou, the city I'll be working in. Spent the first evening walking the river.",
    media: "/log/12hangzhou.webp",
  },
  {
    date: "2026-08-16",
    source: "note",
    title:
      "Landed in China. Woke up to the Oriental Pearl and the Huangpu from a Pudong window.",
    media: "/log/11shanghai.webp",
  },
  {
    date: "2026-08-14",
    source: "milestone",
    title:
      "Left the US with one small dog and everything I own, closing the chapter on a second hometown.",
    media: "/log/10departure.webp",
  },
  {
    date: "2026-07-15",
    source: "milestone",
    title:
      "Accepted MolarData's Full Stack Engineer offer, and with it the decision to move back to China.",
    link: "https://www.molardata.com/",
    media: "/log/09molardata-offer.webp",
  },
  {
    date: "2026-07-04",
    source: "event",
    title:
      "Caught several FIFA World Cup 2026 matches at Hard Rock Stadium in Miami: Cape Verde against Argentina in the Round of 32 was the standout.",
    media: "/log/08worldcup.webp",
  },
  {
    date: "2026-06-10",
    source: "project",
    title:
      "Shipped ClaimIt with Will W., Raj K. and Chris C. for the Google Cloud Rapid Agent Hackathon: an AI agent for post-purchase price protection.",
    link: "https://claimitai.vercel.app/",
    media: "/log/07claimit.webp",
  },
  {
    date: "2026-06-09",
    source: "project",
    title: "Rebuilt and relaunched erdun.me on Astro and Cloudflare.",
    link: "https://erdun.me",
    media: "/log/06erdunme.png",
  },
  {
    date: "2026-05-29",
    source: "milestone",
    title:
      "Joined diGeniusAI as a Software Development Engineer II, working on the AI operating system behind their restaurant platform.",
    link: "https://www.digeniusai.com/",
    media: "/log/05digeniusai.webp",
  },
  {
    date: "2026-05-21",
    source: "press",
    title:
      "Featured in Khoury News: students bring in a record awards haul at the 2026 Northeastern convocation.",
    link: "https://www.khoury.northeastern.edu/khoury-students-bring-in-record-awards-haul-at-2026-northeastern-convocation/",
    media: "/log/04khoury-awards.jpg",
  },
  {
    date: "2026-05-21",
    source: "press",
    title:
      "Featured in Khoury News: 'Coast to coast,' on 2026 Khoury grads' milestones and next steps.",
    link: "https://www.khoury.northeastern.edu/coast-to-coast-2026-khoury-grads-recognize-milestones-and-plan-their-next-steps/",
    media: "/log/03khoury-coast.jpg",
  },
  {
    date: "2026-05-07",
    source: "event",
    title:
      "Teamed up with Will W., Raj K. and Chris C. to enter the Google Cloud Rapid Agent Hackathon.",
    link: "https://rapid-agent.devpost.com/",
    media: "/log/02rapid-agent.jpg",
  },
  {
    date: "2026-05-05",
    source: "note",
    title: "Shared that I'm open to software and backend engineering roles.",
    link: "https://www.linkedin.com/posts/erdune_opentowork-softwareengineer-backendengineer-activity-7457822954211426305-yGXJ",
    media: "/log/01open-to-work.png",
  },
  {
    date: "2026-05-02",
    source: "milestone",
    title: "Graduated from Northeastern University.",
    link: "https://www.linkedin.com/posts/erdune_gohuskies-khourymia-khourycollege-activity-7457188941671202816-dKQh",
    media: "/log/00graduation.webp",
  },
];
