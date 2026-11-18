import type { ImageMetadata } from "astro";
import { imageByName } from "@/lib/images";
import type { I18nText, MaybeI18n } from "@/lib/i18n";

const imgs = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/people/*.{jpg,jpeg,png,webp,svg}",
  { eager: true },
);
const img = imageByName(imgs, "../assets/people/");

export interface Testimonial {
  quote: I18nText;
  /**
   * Usually a plain string, left in English because the card links to that
   * person's LinkedIn and a transliteration would not match it (§4.2). An
   * entry with no LinkedIn and a real name in both scripts can carry both.
   */
  name: MaybeI18n;
  title: I18nText;
  /** Translated only where a Chinese name exists (§4.2). */
  company: I18nText;
  /** Public LinkedIn profile. Omitted where none is known; the name then
      renders as plain text instead of a link. */
  linkedin?: string;
  /**
   * Set for a quote that is an aphorism rather than a paragraph. The card
   * then sets it larger and centres it, so a deliberately short endorsement
   * reads as composed rather than as a card someone forgot to fill.
   */
  aphorism?: boolean;
  avatar: ImageMetadata;
}

export const testimonials: Testimonial[] = [
  {
    // Written in Chinese, as a 4-4-4 aphorism. Translating it into a sentence
    // would lose the form, so the English keeps three beats too.
    quote: {
      en: "Trustworthy. Delivers beyond expectation. Always moving forward.",
      zh: "值得信任，创造惊喜，始终向前",
    },
    // No LinkedIn to mismatch, and the name has a settled form in both
    // scripts, so unlike the other entries this one is translated (§4.2).
    name: { en: "Yang Yi (YY)", zh: "杨易（YY）" },
    title: { en: "VP", zh: "副总裁" },
    company: { en: "MolarData", zh: "整数智能" },
    aphorism: true,
    avatar: img("YangYi.jpeg"),
  },
  {
    // The only entry written in Chinese; every other quote was written in
    // English and translated. The Chinese is the original, trimmed by eight
    // characters to clear the card's six-line limit — the author wrote
    // "他始终保持着学习的热情，能够在实际工作中不断反思、学习和迭代自己。" and the cut
    // phrase is already implied by the rest of the sentence. Restoring it
    // costs the closing line, which is the part worth keeping.
    quote: {
      en: "Erdun takes real initiative and is deeply committed to his work. He holds his own standards on the details and thinks things through before calling them done. He keeps learning and iterating on himself — that is what I admire in him.",
      zh: "尔敦是一个主观能动性很强、对工作有着高度投入感的人。他对工作中的细节有自己的坚持，愿意花时间深入研究，把事情想清楚、做到位。更难得的是，他始终保持着学习的热情，不断反思、学习和迭代自己。这种认真、主动且持续成长的特质，是我非常欣赏他的地方。",
    },
    name: "Michael Han",
    title: { en: "Head of Talent", zh: "人才负责人" },
    company: { en: "MolarData", zh: "整数智能" },
    linkedin: "https://www.linkedin.com/in/michaehanco/",
    avatar: img("Michael.jpeg"),
  },
  {
    quote: {
      en: "Working with Erdun has been a pleasure. He brings professionalism, curiosity, and a genuine desire to uplift others, creating a collaborative and inclusive environment where everyone feels valued.",
      zh: "和额尔敦共事是件愉快的事。他身上有专业、好奇心，还有一种发自内心想把身边人托起来的劲头，总能营造出让每个人都被看见的协作氛围。",
    },
    name: "Jay Rodriguez",
    title: { en: "Account Executive", zh: "客户经理" },
    company: { en: "Aegis IT Solutions", zh: "Aegis IT Solutions" },
    linkedin: "https://www.linkedin.com/in/jay-rod/",
    avatar: img("Jay.jpeg"),
  },
  {
    quote: {
      en: "Erdun is a force of productivity and precision. Collaborating with him as Co-President of the Miami Tech Club and Khoury Ambassador has been a privilege. His speed, quality, and consistency never cease to impress.",
      zh: "额尔敦是效率与精准的代名词。能和他一起担任 Miami Tech Club 联席会长、做库里学院的学生大使，是我的荣幸。他的速度、质量和稳定性始终让人佩服。",
    },
    name: "Naveen Kumanan",
    title: { en: "President, Miami Tech Club", zh: "Miami Tech Club 会长" },
    company: { en: "Ambassador, Northeastern University – Khoury", zh: "美国东北大学库里学院 学生大使" },
    linkedin: "https://www.linkedin.com/in/naveen-kumanan-2328ba208/",
    avatar: img("Naveen.jpeg"),
  },
  {
    quote: {
      en: "Erdun is an exceptional leader who brings energy and insight to the global Northeastern community. His contributions to the multicultural teamwork workshop showcased his professionalism and ability to connect across cultures.",
      zh: "额尔敦是一位出色的领导者，为美国东北大学的全球社群注入了活力和洞见。他在多元文化团队协作工作坊中的贡献，展现了他的专业素养和跨文化沟通的能力。",
    },
    name: "Haedy Liu, Ph.D.",
    title: { en: "Global Learner Support Tutor", zh: "全球学习支持导师" },
    company: { en: "Northeastern University – Miami", zh: "美国东北大学迈阿密校区" },
    linkedin: "https://www.linkedin.com/in/haedy-l-99533435/",
    avatar: img("Haedy.png"),
  },
  {
    quote: {
      en: "It was incredible working with Erdun during the Northeastern Miami Entrepreneurship Trek. He brought both technical expertise and collaborative spirit to our team, helping us deliver a working product under intense time pressure.",
      zh: "在美国东北大学迈阿密创业营和额尔敦合作的经历非常棒。他既带来了技术专长，也带来了协作精神，帮我们在极紧的时间压力下交付出了能跑的产品。",
    },
    name: "Alejandro Vides",
    title: { en: "Co-Founder", zh: "联合创始人" },
    company: { en: "The Daily Benji", zh: "The Daily Benji" },
    linkedin: "https://www.linkedin.com/in/a-vides/",
    avatar: img("Alex.jpeg"),
  },
  {
    quote: {
      en: "Erdun brings professionalism and passion to everything he does, consistently delivering top-quality work in the classroom. His innovative problem-solving and genuine care for building community make him an outstanding collaborator.",
      zh: "额尔敦做任何事都带着专业和热情，在课堂上始终交出高质量的作业。他解决问题的创造力，以及真心经营社群的那份在意，让他成为非常出色的合作者。",
    },
    name: "Gabriela Gongora-Svartzman, Ph.D.",
    title: { en: "Associate Teaching Professor & Director of Computing Programs", zh: "副教学教授兼计算机项目主任" },
    company: { en: "Northeastern University – Khoury College", zh: "美国东北大学库里学院" },
    linkedin: "https://www.linkedin.com/in/profgs/",
    avatar: img("ProfGS.jpeg"),
  },
  {
    quote: {
      en: "Erdun is a bright and driven engineer who quickly grasps complex problems, takes ownership, and consistently delivers impactful results. More importantly, he's a kind and helpful person to be around!",
      zh: "额尔敦是个聪明又有干劲的工程师，能迅速抓住复杂问题的要害，主动扛事，并持续做出有分量的结果。更重要的是，他为人善良、乐于助人！",
    },
    name: "Shihao Zhang",
    title: { en: "Co-Founder / Investor", zh: "联合创始人 / 投资人" },
    company: { en: "G1 Innovations", zh: "G1 Innovations" },
    linkedin: "https://www.linkedin.com/in/shihao-zhang-7977487b/",
    avatar: img("Haoge.jpeg"),
  },
  {
    quote: {
      en: "Erdun is a curious learner, patient teacher, and dedicated community member, technically proficient and exactly the kind of teammate you want.",
      zh: "额尔敦是个充满好奇心的学习者、有耐心的老师、尽心的社群成员，技术扎实，正是你会想要的那种队友。",
    },
    name: "Alan Jamieson",
    title: { en: "Teaching Professor, Associate Dean of Computing Programs – East Coast", zh: "教学教授、东海岸计算机项目副院长" },
    company: { en: "Northeastern University", zh: "美国东北大学" },
    linkedin: "https://www.linkedin.com/in/alancjamieson/",
    avatar: img("Alan.jpeg"),
  },
  {
    quote: {
      en: "Erdun's commitment to excellence goes beyond his responsibilities, he actively enhances the student learning experience while pursuing his own growth. His curiosity, dedication, and positive energy make him an invaluable member of our campus community.",
      zh: "额尔敦对卓越的追求远超出他的职责范围——他在自己成长的同时，也在主动改善其他学生的学习体验。他的好奇心、投入和正能量，让他成为我们校园社群中不可多得的一员。",
    },
    name: "Juan F. Gonzalez, Ed.S",
    title: { en: "Associate Director of Operations", zh: "运营副主任" },
    company: { en: "Northeastern University – Miami", zh: "美国东北大学迈阿密校区" },
    linkedin: "https://www.linkedin.com/in/jfgonzalez63/",
    avatar: img("Juan.jpeg"),
  },
  {
    quote: {
      en: "I worked with Erdun during the Northeastern Miami Trek, where he played a key role in brainstorming, attracting attendees, and building Mediclear that a price transparency prototype we successfully pitched within a week.",
      zh: "我在美国东北大学迈阿密创业营和额尔敦共事，他在头脑风暴、吸引参与者以及搭建 Mediclear 上都起了关键作用——那是一个医疗价格透明化的原型，我们在一周内就成功完成了路演。",
    },
    name: "Faisal Rehman Khattak",
    title: { en: "Co-Founder & CTO", zh: "联合创始人兼首席技术官" },
    company: { en: "Bite Buddy AI", zh: "Bite Buddy AI" },
    linkedin: "https://www.linkedin.com/in/faisalrehmanktk/",
    avatar: img("Faisai.jpeg"),
  },
  {
    quote: {
      en: "Erdun brought energy, innovation, and community to the classroom and campus via captivating academic projects, novel technological events, and camaraderie amongst colleagues.",
      zh: "额尔敦用引人入胜的学术项目、新颖的技术活动和同伴间的情谊，为课堂和校园带来了活力、创新与归属感。",
    },
    name: "Nate Derbinsky",
    title: { en: "Teaching Professor", zh: "教学教授" },
    company: { en: "Northeastern University", zh: "美国东北大学" },
    linkedin: "https://www.linkedin.com/in/natederbinsky/",
    avatar: img("Nate.jpeg"),
  },
  {
    quote: {
      en: "Erdun is resilient under pressure, steady and reliable in all situations, and trusted by those who work with him.",
      zh: "额尔敦抗压能力强，无论什么情况都沉稳可靠，和他共事的人都信得过他。",
    },
    name: "Shenghua Du",
    title: { en: "State Police Officer", zh: "州警" },
    company: { en: "Massachusetts State Police", zh: "马萨诸塞州警察局" },
    avatar: img("Mudan.png"),
  },
  {
    quote: {
      en: "As a student leader at Northeastern's Miami campus, Erdun built the Miami Tech Club into a thriving community. His calm demeanor, time management, and dedication to peers also led to his election to Khoury's MS Advisory Board.",
      zh: "作为美国东北大学迈阿密校区的学生领袖，额尔敦把 Miami Tech Club 做成了一个有活力的社群。他的沉稳、时间管理能力以及对同学的用心，也让他当选了库里学院硕士生顾问委员会成员。",
    },
    name: "David Paquette",
    title: { en: "Assistant Director of Retention and Engagement", zh: "学生留存与参与事务助理主任" },
    company: { en: "Northeastern University", zh: "美国东北大学" },
    linkedin: "https://www.linkedin.com/in/david-paquette-48832784/",
    avatar: img("David.jpeg"),
  },
  {
    quote: {
      en: "Erdun impressed me at the 2025 NU Entrepreneurship Trek with his ability to distill abstract ideas into actionable strategies. His adaptability, curiosity, and problem-solving mindset make him an exceptional founder and teammate.",
      zh: "在 2025 年美国东北大学创业营上，额尔敦把抽象想法提炼成可执行策略的能力让我印象深刻。他的适应力、好奇心和解决问题的思维方式，让他成为出色的创始人和队友。",
    },
    name: "Pedro C. C. Gomes",
    title: { en: "Associate Director of Entrepreneurship", zh: "创业事务副主任" },
    company: { en: "Northeastern University – Miami", zh: "美国东北大学迈阿密校区" },
    linkedin: "https://www.linkedin.com/in/pccg/",
    avatar: img("Pedro.jpeg"),
  },
  {
    quote: {
      en: "Erdun is one of the best interns I have ever worked with, delivering impact far beyond expectations.",
      zh: "额尔敦是我合作过最好的实习生之一，做出的成果远超预期。",
    },
    name: "Shachar Golan, MBA",
    title: { en: "Co-Founder & CEO", zh: "联合创始人兼首席执行官" },
    company: { en: "Superstars", zh: "Superstars" },
    linkedin: "https://www.linkedin.com/in/shachargolan/",
    avatar: img("Shachar.jpeg"),
  },
  {
    quote: {
      en: "Erdun combines deep technical expertise with the maturity to lead projects and mentor others.",
      zh: "额尔敦既有深厚的技术功底，也有带项目、带新人的成熟度。",
    },
    name: "Dharmesh Thakkar",
    title: { en: "Senior Software Development Manager", zh: "高级软件开发经理" },
    company: { en: "Amazon Elastic Block Store (EBS)", zh: "Amazon Elastic Block Store (EBS)" },
    linkedin: "https://www.linkedin.com/in/thakkd/",
    avatar: img("Dharmesh.jpeg"),
  },
  {
    quote: {
      en: "Erdun's initiative and problem-solving saved millions in costs and earned cross-team trust at Amazon.",
      zh: "额尔敦的主动性和解决问题的能力，在亚马逊为公司省下了数百万美元的成本，也赢得了跨团队的信任。",
    },
    name: "Nirmit Kachrani",
    title: { en: "Engineering Manager", zh: "工程经理" },
    company: { en: "Google", zh: "谷歌" },
    linkedin: "https://www.linkedin.com/in/nirmitkachrani/",
    avatar: img("Nirmit.png"),
  },
  {
    quote: {
      en: "Erdun is a driven engineer whose ownership and technical depth left a lasting impact on our AWS team.",
      zh: "额尔敦是个有冲劲的工程师，他的担当和技术深度给我们亚马逊云科技团队留下了长久的影响。",
    },
    name: "Hong Zhao",
    title: { en: "Senior Software Development Engineer", zh: "高级软件开发工程师" },
    company: { en: "Amazon Web Services", zh: "亚马逊云科技" },
    linkedin: "https://www.linkedin.com/in/hong-zhao-1b086532/",
    avatar: img("Hong.jpeg"),
  },
  {
    quote: {
      en: "Erdun stands out as one of the most self-motivated and determined students I have taught.",
      zh: "在我教过的学生里，额尔敦是最有自驱力、最有决心的之一。",
    },
    name: "Tingjian Ge",
    title: { en: "Professor of Computer Science", zh: "计算机科学教授" },
    company: { en: "University of Massachusetts Lowell", zh: "马萨诸塞大学洛厄尔分校" },
    linkedin: "https://www.linkedin.com/in/tingjian-ge-7a857297/",
    avatar: img("Ge.jpeg"),
  },
  {
    quote: {
      en: "Erdun has shown tremendous initiative in improving the maintenance and documentation of the application.",
      zh: "在改善应用的维护和文档方面，额尔敦展现出了极强的主动性。",
    },
    name: "Clif Ong",
    title: { en: "Backend Engineer", zh: "后端工程师" },
    company: { en: "Tencent", zh: "腾讯" },
    linkedin: "https://www.linkedin.com/in/clif-ong-724467199/",
    avatar: img("Clif.png"),
  },
  {
    quote: {
      en: "Erdun consistently impressed me with his attention to detail and commitment to high-quality work.",
      zh: "额尔敦对细节的在意和对高质量产出的坚持，始终让我印象深刻。",
    },
    name: "Gnana Chand Mallangi",
    title: { en: "Data Analytics Intern", zh: "数据分析实习生" },
    company: { en: "UNC Charlotte", zh: "北卡罗来纳大学夏洛特分校" },
    linkedin: "https://www.linkedin.com/in/gnanachand-mallangi/",
    avatar: img("Gnana.jpeg"),
  },
  {
    quote: {
      en: "Erdun was the go-to reviewer, improving code quality and guiding best practices across the team.",
      zh: "额尔敦是大家最信赖的代码评审人，他提升了代码质量，也把最佳实践带给了整个团队。",
    },
    name: "Dhruvkumar Parmar",
    title: { en: "Computer Science Student", zh: "计算机科学专业学生" },
    company: { en: "Saint Louis University", zh: "圣路易斯大学" },
    linkedin: "https://www.linkedin.com/in/dhruvprmr/",
    avatar: img("Dhruv.png"),
  },
  {
    quote: {
      en: "Erdun's reliability and professionalism made him a trusted teammate, recognized as one of the best interns.",
      zh: "额尔敦的可靠和专业让他成为值得信赖的队友，大家公认他是最好的实习生之一。",
    },
    name: "Aditya Bhuran",
    title: { en: "Webmaster", zh: "网站管理员" },
    company: { en: "Digital Grandparents Inc", zh: "Digital Grandparents Inc" },
    avatar: img("Aditya.jpeg"),
  },
  {
    quote: {
      en: "Erdun uplifted everyone around him with his collaborative mindset and supportive leadership.",
      zh: "额尔敦以协作的心态和愿意托举他人的领导方式，带动了身边的每一个人。",
    },
    name: "Tejesh Boppana",
    title: { en: "Computer Science Student", zh: "计算机科学专业学生" },
    company: { en: "University of Florida", zh: "佛罗里达大学" },
    linkedin: "https://www.linkedin.com/in/tejesh0209/",
    avatar: img("Tejesh.png"),
  },
  {
    quote: {
      en: "Erdun created a detailed onboarding guide that saved time and smoothed the transition for new interns.",
      zh: "额尔敦写了一份详尽的新人上手指南，省下了大量时间，也让新实习生的过渡顺畅了很多。",
    },
    name: "Mohana Siddhartha Chivukula",
    title: { en: "Computer Science Student", zh: "计算机科学专业学生" },
    company: { en: "Arizona State University", zh: "亚利桑那州立大学" },
    linkedin: "https://www.linkedin.com/in/siddharthachivukula/",
    avatar: img("Mohana.png"),
  },
  {
    quote: {
      en: "Erdun is a passionate and diligent engineer with an impressive sense of ownership in cloud storage.",
      zh: "额尔敦是个有热情、肯下功夫的工程师，在云存储方向上的担当令人印象深刻。",
    },
    name: "Weiwei Zhao",
    title: { en: "Senior Software Engineer", zh: "高级软件工程师" },
    company: { en: "Amazon Web Services", zh: "亚马逊云科技" },
    linkedin: "https://www.linkedin.com/in/weiwei-zhao-23616730/",
    avatar: img("Weiwei.jpeg"),
  },
  {
    quote: {
      en: "Erdun iterates quickly, resolves roadblocks, and always delivers results.",
      zh: "额尔敦迭代快、能啃下拦路的问题，而且总能交出结果。",
    },
    name: "Linlin Ding",
    title: { en: "Senior Software Development Engineer", zh: "高级软件开发工程师" },
    company: { en: "Amazon Web Services", zh: "亚马逊云科技" },
    linkedin: "https://www.linkedin.com/in/linlin-ding-ab918b111/",
    avatar: img("Linlin.jpeg"),
  },
  {
    quote: {
      en: "Erdun is self-motivated, meets deadlines, and is a great team player.",
      zh: "额尔敦自驱力强、守得住期限，也是个很好的团队伙伴。",
    },
    name: "Zhiqiang (Justin) Wang",
    title: { en: "Software Development Engineer", zh: "软件开发工程师" },
    company: { en: "Amazon Web Services", zh: "亚马逊云科技" },
    linkedin: "https://www.linkedin.com/in/zhiqiang-justin-wang/",
    avatar: img("Zhiqiang.jpeg"),
  },
  {
    quote: {
      en: "Erdun's proactive problem-solving and deep technical expertise made him invaluable in high-stakes projects.",
      zh: "额尔敦主动解决问题的习惯和深厚的技术功底，让他在高风险项目中格外不可或缺。",
    },
    name: "Eric W",
    title: { en: "Software Development Engineer", zh: "软件开发工程师" },
    company: { en: "Microsoft", zh: "微软" },
    linkedin: "https://www.linkedin.com/in/eric-w-388b4b141/",
    avatar: img("default-avatar.png"),
  },
];
