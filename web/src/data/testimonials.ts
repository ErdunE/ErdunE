import type { ImageMetadata } from "astro";
import jay from "@/assets/people/Jay.jpeg";
import naveen from "@/assets/people/Naveen.jpeg";
import haedy from "@/assets/people/Haedy.png";
import alex from "@/assets/people/Alex.jpeg";
import profGS from "@/assets/people/ProfGS.jpeg";
import haoge from "@/assets/people/Haoge.jpeg";
import alan from "@/assets/people/Alan.jpeg";
import juan from "@/assets/people/Juan.jpeg";
import faisal from "@/assets/people/Faisai.jpeg";
import nate from "@/assets/people/Nate.jpeg";
import mudan from "@/assets/people/Mudan.png";
import david from "@/assets/people/David.jpeg";
import pedro from "@/assets/people/Pedro.jpeg";
import shachar from "@/assets/people/Shachar.jpeg";
import dharmesh from "@/assets/people/Dharmesh.jpeg";
import nirmit from "@/assets/people/Nirmit.png";
import hong from "@/assets/people/Hong.jpeg";
import ge from "@/assets/people/Ge.jpeg";
import clif from "@/assets/people/Clif.png";
import gnana from "@/assets/people/Gnana.jpeg";
import dhruv from "@/assets/people/Dhruv.png";
import aditya from "@/assets/people/Aditya.jpeg";
import tejesh from "@/assets/people/Tejesh.png";
import mohana from "@/assets/people/Mohana.png";
import weiwei from "@/assets/people/Weiwei.jpeg";
import linlin from "@/assets/people/Linlin.jpeg";
import zhiqiang from "@/assets/people/Zhiqiang.jpeg";
import defaultAvatar from "@/assets/people/default-avatar.png";

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar: ImageMetadata;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Working with Erdun has been a pleasure. He brings professionalism, curiosity, and a genuine desire to uplift others, creating a collaborative and inclusive environment where everyone feels valued.",
    name: "Jay Rodriguez",
    title: "Account Executive",
    company: "Aegis IT Solutions",
    avatar: jay,
  },
  {
    quote:
      "Erdun is a force of productivity and precision. Collaborating with him as Co-President of the Miami Tech Club and Khoury Ambassador has been a privilege. His speed, quality, and consistency never cease to impress.",
    name: "Naveen Kumanan",
    title: "President, Miami Tech Club",
    company: "Ambassador, Northeastern University – Khoury",
    avatar: naveen,
  },
  {
    quote:
      "Erdun is an exceptional leader who brings energy and insight to the global Northeastern community. His contributions to the multicultural teamwork workshop showcased his professionalism and ability to connect across cultures.",
    name: "Haedy Liu, Ph.D.",
    title: "Global Learner Support Tutor",
    company: "Northeastern University – Miami",
    avatar: haedy,
  },
  {
    quote:
      "It was incredible working with Erdun during the Northeastern Miami Entrepreneurship Trek. He brought both technical expertise and collaborative spirit to our team, helping us deliver a working product under intense time pressure.",
    name: "Alejandro Vides",
    title: "Co-Founder",
    company: "The Daily Benji",
    avatar: alex,
  },
  {
    quote:
      "Erdun brings professionalism and passion to everything he does, consistently delivering top-quality work in the classroom. His innovative problem-solving and genuine care for building community make him an outstanding collaborator.",
    name: "Gabriela Gongora-Svartzman, Ph.D.",
    title: "Associate Teaching Professor & Director of Computing Programs",
    company: "Northeastern University – Khoury College",
    avatar: profGS,
  },
  {
    quote:
      "Erdun is a bright and driven engineer who quickly grasps complex problems, takes ownership, and consistently delivers impactful results. More importantly, he's a kind and helpful person to be around!",
    name: "Shihao Zhang",
    title: "Co-Founder / Investor",
    company: "G1 Innovations",
    avatar: haoge,
  },
  {
    quote:
      "Erdun is a curious learner, patient teacher, and dedicated community member, technically proficient and exactly the kind of teammate you want.",
    name: "Alan Jamieson",
    title: "Teaching Professor, Associate Dean of Computing Programs – East Coast",
    company: "Northeastern University",
    avatar: alan,
  },
  {
    quote:
      "Erdun's commitment to excellence goes beyond his responsibilities, he actively enhances the student learning experience while pursuing his own growth. His curiosity, dedication, and positive energy make him an invaluable member of our campus community.",
    name: "Juan F. Gonzalez, Ed.S",
    title: "Associate Director of Operations",
    company: "Northeastern University - Miami",
    avatar: juan,
  },
  {
    quote:
      "I worked with Erdun during the Northeastern Miami Trek, where he played a key role in brainstorming, attracting attendees, and building Mediclear that a price transparency prototype we successfully pitched within a week.",
    name: "Faisal Rehman Khattak",
    title: "Co-Founder & CTO",
    company: "Bite Buddy AI",
    avatar: faisal,
  },
  {
    quote:
      "Erdun brought energy, innovation, and community to the classroom and campus via captivating academic projects, novel technological events, and camaraderie amongst colleagues.",
    name: "Nate Derbinsky",
    title: "Teaching Professor",
    company: "Northeastern University",
    avatar: nate,
  },
  {
    quote:
      "Erdun is resilient under pressure, steady and reliable in all situations, and trusted by those who work with him.",
    name: "Shenghua Du",
    title: "State Police Officer",
    company: "Massachusetts State Police",
    avatar: mudan,
  },
  {
    quote:
      "As a student leader at Northeastern's Miami campus, Erdun built the Miami Tech Club into a thriving community. His calm demeanor, time management, and dedication to peers also led to his election to Khoury's MS Advisory Board.",
    name: "David Paquette",
    title: "Assistant Director of Retention and Engagement",
    company: "Northeastern University",
    avatar: david,
  },
  {
    quote:
      "Erdun impressed me at the 2025 NU Entrepreneurship Trek with his ability to distill abstract ideas into actionable strategies. His adaptability, curiosity, and problem-solving mindset make him an exceptional founder and teammate.",
    name: "Pedro C. C. Gomes",
    title: "Associate Director of Entrepreneurship",
    company: "Northeastern University – Miami",
    avatar: pedro,
  },
  {
    quote:
      "Erdun is one of the best interns I have ever worked with, delivering impact far beyond expectations.",
    name: "Shachar Golan, MBA",
    title: "Co-Founder & CEO",
    company: "Superstars",
    avatar: shachar,
  },
  {
    quote:
      "Erdun combines deep technical expertise with the maturity to lead projects and mentor others.",
    name: "Dharmesh Thakkar",
    title: "Senior Software Development Manager",
    company: "Amazon Elastic Block Store (EBS)",
    avatar: dharmesh,
  },
  {
    quote:
      "Erdun's initiative and problem-solving saved millions in costs and earned cross-team trust at Amazon.",
    name: "Nirmit Kachrani",
    title: "Engineering Manager",
    company: "Google",
    avatar: nirmit,
  },
  {
    quote:
      "Erdun is a driven engineer whose ownership and technical depth left a lasting impact on our AWS team.",
    name: "Hong Zhao",
    title: "Senior Software Development Engineer",
    company: "Amazon Web Services",
    avatar: hong,
  },
  {
    quote:
      "Erdun stands out as one of the most self-motivated and determined students I have taught.",
    name: "Tingjian Ge",
    title: "Professor of Computer Science",
    company: "University of Massachusetts Lowell",
    avatar: ge,
  },
  {
    quote:
      "Erdun has shown tremendous initiative in improving the maintenance and documentation of the application.",
    name: "Clif Ong",
    title: "Backend Engineer",
    company: "Tencent",
    avatar: clif,
  },
  {
    quote:
      "Erdun consistently impressed me with his attention to detail and commitment to high-quality work.",
    name: "Gnana Chand Mallangi",
    title: "Data Analytics Intern",
    company: "UNC Charlotte",
    avatar: gnana,
  },
  {
    quote:
      "Erdun was the go-to reviewer, improving code quality and guiding best practices across the team.",
    name: "Dhruvkumar Parmar",
    title: "Computer Science Student",
    company: "Saint Louis University",
    avatar: dhruv,
  },
  {
    quote:
      "Erdun's reliability and professionalism made him a trusted teammate, recognized as one of the best interns.",
    name: "Aditya Bhuran",
    title: "Webmaster",
    company: "Digital Grandparents Inc",
    avatar: aditya,
  },
  {
    quote:
      "Erdun uplifted everyone around him with his collaborative mindset and supportive leadership.",
    name: "Tejesh Boppana",
    title: "Computer Science Student",
    company: "University of Florida",
    avatar: tejesh,
  },
  {
    quote:
      "Erdun created a detailed onboarding guide that saved time and smoothed the transition for new interns.",
    name: "Mohana Siddhartha Chivukula",
    title: "Computer Science Student",
    company: "Arizona State University",
    avatar: mohana,
  },
  {
    quote:
      "Erdun is a passionate and diligent engineer with an impressive sense of ownership in cloud storage.",
    name: "Weiwei Zhao",
    title: "Senior Software Engineer",
    company: "Amazon Web Services",
    avatar: weiwei,
  },
  {
    quote: "Erdun iterates quickly, resolves roadblocks, and always delivers results.",
    name: "Linlin Ding",
    title: "Senior Software Development Engineer",
    company: "Amazon Web Services",
    avatar: linlin,
  },
  {
    quote: "Erdun is self-motivated, meets deadlines, and is a great team player.",
    name: "Zhiqiang (Justin) Wang",
    title: "Software Development Engineer",
    company: "Amazon Web Services",
    avatar: zhiqiang,
  },
  {
    quote:
      "Erdun's proactive problem-solving and deep technical expertise made him invaluable in high-stakes projects.",
    name: "Eric W",
    title: "Software Development Engineer",
    company: "Microsoft",
    avatar: defaultAvatar,
  },
];
