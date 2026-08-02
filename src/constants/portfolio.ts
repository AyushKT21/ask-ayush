export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  href?: string;
  github?: string;
  thumbnailSrc?: string;
  thumbnailGradient?: string;
};

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
};

export type SkillCategory = {
  id: string;
  label: string;
  skills: string[];
};

export type ContactLink = {
  id: string;
  label: string;
  href: string;
  kind: "github" | "linkedin" | "email" | "twitter";
};

export const PROFILE = {
  name: "Ayush",
  fullName: "Ayush Kumar",
  title: "Frontend Developer",
  location: "India",
  summary:
    "I build modern, performant web experiences with React and Next.js. I care about clean architecture, thoughtful UX, and shipping products that feel polished — like this AI-first portfolio.",
  highlights: [
    "2+ years building production React and Next.js apps",
    "Strong TypeScript, component design, and design systems",
    "Experience integrating AI into real user-facing products",
  ],
} as const;

export const PROJECTS: Project[] = [
  {
    id: "devvault-ai",
    title: "DevVault AI",
    description:
      "AI-powered developer workspace for snippets, documentation, and project knowledge.",
    tags: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS"],
    featured: true,
    href: "#",
    github: "#",
  },
  {
    id: "ayush-ai",
    title: "Ayush AI",
    description:
      "An AI-first portfolio where visitors chat to explore my career, skills, and projects.",
    tags: ["React 19", "Next.js 16", "Vercel AI SDK", "Tailwind v4"],
    featured: true,
    href: "#",
    github: "#",
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce Store",
    description:
      "Full-stack storefront with cart, checkout flow, and admin-friendly product management.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    featured: true,
    href: "#",
    github: "#",
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "frizz-frontend",
    role: "Frontend Developer",
    company: "Frizz Solutions",
    period: "2023 — Present",
    description:
      "Ship responsive dashboards and marketing sites, own component libraries, and collaborate on API integration with backend teams.",
    current: true,
  },
  {
    id: "web-intern",
    role: "Web Developer Intern",
    company: "Startup Studio",
    period: "2022 — 2023",
    description:
      "Built landing pages and internal tools with React, improved Core Web Vitals, and learned agile delivery in a small team.",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML & CSS"],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    skills: ["Node.js", "REST APIs", "PostgreSQL", "Prisma"],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    skills: ["Git", "Docker", "Vercel", "Figma", "Postman"],
  },
  {
    id: "ai",
    label: "AI",
    skills: ["OpenAI API", "Vercel AI SDK", "Prompt design", "Streaming UX"],
  },
];

export const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Git",
  "Docker",
] as const;

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com",
    kind: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
    kind: "linkedin",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:hello@example.com",
    kind: "email",
  },
  {
    id: "twitter",
    label: "Twitter",
    href: "https://twitter.com",
    kind: "twitter",
  },
];

export const RESUME = {
  fileName: "Ayush-Kumar-Resume.pdf",
  downloadHref: "#",
  lastUpdated: "2026",
  headline:
    "Frontend developer focused on React, Next.js, and AI-powered product experiences.",
} as const;

export const FEATURED_PROJECTS = PROJECTS.filter(
  (project) => project.featured,
);
