import type { I18nText } from "@/lib/i18n";

export type LogSource = "project" | "event" | "press" | "milestone" | "note";

export interface LogEntry {
  /** ISO date (YYYY-MM-DD); the component sorts newest first. */
  date: string;
  source: LogSource;
  title: I18nText;
  link?: string;
  /** Path under public/ (e.g. /log/foo.jpg). Omit for a text-only row. */
  media?: string;
}

export const log: LogEntry[] = [
  {
    date: "2026-11-25",
    source: "milestone",
    title: {
      en: "Started at DJI in Shenzhen as a Senior AI Solutions Architect, on the team building their business-finance data platform.",
      zh: "入职深圳大疆创新，任高级 AI 解决方案架构师，加入业财数据平台团队。",
    },
    link: "https://www.dji.com/",
    media: "/log/16dji-start.webp",
  },
  {
    date: "2026-11-20",
    source: "note",
    title: {
      en: "Moved 1,050 km south, from Hangzhou to Shenzhen.",
      zh: "从杭州南下 1,050 公里，搬到深圳。",
    },
    media: "/log/15shenzhen-move.webp",
  },
  {
    date: "2026-11-19",
    source: "milestone",
    title: {
      en: "Wrapped up at MolarData after shipping their unified cross-cloud observability platform to three business lines.",
      zh: "从整数智能离职，走之前把跨云统一可观测体系平台交付给了三条业务线。",
    },
    link: "https://www.molardata.com/",
    media: "/log/14molardata-end.webp",
  },
  {
    date: "2026-08-25",
    source: "milestone",
    title: {
      en: "Started as a Full Stack Engineer at MolarData, on the team behind their AI data annotation platform.",
      zh: "入职整数智能，任全栈工程师，加入 AI 数据标注平台团队。",
    },
    link: "https://www.molardata.com/",
    media: "/log/13molardata-start.webp",
  },
  {
    date: "2026-08-20",
    source: "note",
    title: {
      en: "Arrived in Hangzhou, the city I'll be working in. Spent the first evening walking the river.",
      zh: "到了杭州，以后要在这儿工作。第一个晚上沿着江边走了很久。",
    },
    media: "/log/12hangzhou.webp",
  },
  {
    date: "2026-08-16",
    source: "note",
    title: {
      en: "Landed in China. Woke up to the Oriental Pearl and the Huangpu from a Pudong window.",
      zh: "落地中国。在浦东的窗边醒来，看见东方明珠和黄浦江。",
    },
    media: "/log/11shanghai.webp",
  },
  {
    date: "2026-08-14",
    source: "milestone",
    title: {
      en: "Left the US with one small dog and everything I own, closing the chapter on a second hometown.",
      zh: "带着一条小狗和全部家当离开美国，告别第二故乡。",
    },
    media: "/log/10departure.webp",
  },
  {
    date: "2026-07-15",
    source: "milestone",
    title: {
      en: "Accepted MolarData's Full Stack Engineer offer, and with it the decision to move back to China.",
      zh: "接下整数智能的全栈工程师 offer，也就此决定回国。",
    },
    link: "https://www.molardata.com/",
    media: "/log/09molardata-offer.webp",
  },
  {
    date: "2026-07-04",
    source: "event",
    title: {
      en: "Caught several FIFA World Cup 2026 matches at Hard Rock Stadium in Miami: Cape Verde against Argentina in the Round of 32 was the standout.",
      zh: "在迈阿密硬石体育场看了几场 2026 年世界杯，最精彩的是 32 强赛佛得角对阿根廷。",
    },
    media: "/log/08worldcup.webp",
  },
  {
    date: "2026-06-10",
    source: "project",
    title: {
      en: "Shipped ClaimIt with Will W., Raj K. and Chris C. for the Google Cloud Rapid Agent Hackathon: an AI agent for post-purchase price protection.",
      zh: "和 Will W.、Raj K.、Chris C. 一起为谷歌云 Rapid Agent 黑客松做出了 ClaimIt —— 一个做购后价格保护的 AI 智能体。",
    },
    link: "https://claimitai.vercel.app/",
    media: "/log/07claimit.webp",
  },
  {
    date: "2026-06-09",
    source: "project",
    title: {
      en: "Rebuilt and relaunched erdun.me on Astro and Cloudflare.",
      zh: "用 Astro 和 Cloudflare 把 erdun.me 重做了一遍，上线。",
    },
    link: "https://erdun.me",
    media: "/log/06erdunme.png",
  },
  {
    date: "2026-05-29",
    source: "milestone",
    title: {
      en: "Joined diGeniusAI as a Software Development Engineer II, working on the AI operating system behind their restaurant platform.",
      zh: "入职 diGeniusAI，任软件开发工程师 II，参与他们餐饮平台背后的 AI 操作系统。",
    },
    link: "https://www.digeniusai.com/",
    media: "/log/05digeniusai.webp",
  },
  {
    date: "2026-05-21",
    source: "press",
    title: {
      en: "Featured in Khoury News: students bring in a record awards haul at the 2026 Northeastern convocation.",
      zh: "被库里学院新闻报道：2026 年美国东北大学毕业典礼上，学生的获奖数创下纪录。",
    },
    link: "https://www.khoury.northeastern.edu/khoury-students-bring-in-record-awards-haul-at-2026-northeastern-convocation/",
    media: "/log/04khoury-awards.jpg",
  },
  {
    date: "2026-05-21",
    source: "press",
    title: {
      en: "Featured in Khoury News: 'Coast to coast,' on 2026 Khoury grads' milestones and next steps.",
      zh: "被库里学院新闻报道：《横跨东西海岸》，讲 2026 届库里毕业生的里程碑与下一步去向。",
    },
    link: "https://www.khoury.northeastern.edu/coast-to-coast-2026-khoury-grads-recognize-milestones-and-plan-their-next-steps/",
    media: "/log/03khoury-coast.jpg",
  },
  {
    date: "2026-05-07",
    source: "event",
    title: {
      en: "Teamed up with Will W., Raj K. and Chris C. to enter the Google Cloud Rapid Agent Hackathon.",
      zh: "和 Will W.、Raj K.、Chris C. 组队参加谷歌云 Rapid Agent 黑客松。",
    },
    link: "https://rapid-agent.devpost.com/",
    media: "/log/02rapid-agent.jpg",
  },
  {
    date: "2026-05-05",
    source: "note",
    title: {
      en: "Shared that I'm open to software and backend engineering roles.",
      zh: "公开表示在找软件工程和后端工程的岗位。",
    },
    link: "https://www.linkedin.com/posts/erdune_opentowork-softwareengineer-backendengineer-activity-7457822954211426305-yGXJ",
    media: "/log/01open-to-work.png",
  },
  {
    date: "2026-05-02",
    source: "milestone",
    title: {
      en: "Graduated from Northeastern University.",
      zh: "从美国东北大学毕业。",
    },
    link: "https://www.linkedin.com/posts/erdune_gohuskies-khourymia-khourycollege-activity-7457188941671202816-dKQh",
    media: "/log/00graduation.webp",
  },
];
