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
  fullName: "Ayush Tiwari",
  title: "Frontend Developer",
  tagline: "React · TypeScript · UI Systems",
  location: "India",
  summary:
    "I'm a frontend developer who focuses on building polished, practical interfaces that feel fast, clear, and easy to use. I like turning complex product ideas into reusable components, clean layouts, and predictable user flows.",
  bio: [
    "Most of my recent work has been around React, TypeScript, responsive UI, and making interfaces feel production-ready.",
    "I also built Ayush AI (this site) and Edge Folio — a single-page portfolio inspired by the Edge browser, where everything stays on one screen without endless scrolling.",
  ],
  highlights: [
    "2+ years building scalable web applications with React and TypeScript",
    "Enterprise insurance platforms: journeys, config-driven UI, and API-heavy dashboards",
    "Design-to-code workflows from Figma to reusable component systems",
    "AI portfolio with OpenAI + Vercel AI SDK (streaming chat and live context panels)",
  ],
  classicPortfolioHref: "https://edge-folio.vercel.app/",
} as const;

export const PROJECTS: Project[] = [
  {
    id: "insurance-journey-builder",
    title: "Insurance Journey Builder",
    description:
      "A configurable React flow for dynamic forms, validations, and multi-step insurance journeys.",
    tags: ["React", "TypeScript", "Forms", "Config-driven UI"],
    featured: true,
    thumbnailSrc: "/projects/insurance-journey-builder.svg",
  },
  {
    id: "ayush-ai",
    title: "Ayush AI Portfolio",
    description:
      "Interactive AI portfolio — explore my work through conversation, streaming answers, and guided navigation.",
    tags: ["Next.js", "OpenAI", "Vercel AI SDK", "React 19"],
    featured: true,
    href: "https://ask-ayush.vercel.app/",
    github: "https://github.com/AyushKT21/ask-ayush",
    thumbnailSrc: "/projects/ayush-ai.svg",
  },
  {
    id: "edge-folio",
    title: "Edge Folio (Ayush.dev)",
    description:
      "Single-page portfolio inspired by Microsoft Edge — glass cards, no long scroll; skills, projects, and experience in one view.",
    tags: ["React", "Vite", "CSS", "UI Design"],
    featured: true,
    href: "https://edge-folio.vercel.app/",
    github: "https://github.com/AyushKT21",
    thumbnailSrc: "/projects/edge-folio.svg",
  },
  {
    id: "design-to-code-ui",
    title: "Design-to-Code UI System",
    description:
      "A reusable component system built from Figma designs with responsive behavior and clean interaction states.",
    tags: ["React", "CSS", "Figma", "Components"],
    featured: true,
    thumbnailSrc: "/projects/design-to-code-ui.svg",
  },
  {
    id: "performance-dashboard",
    title: "Performance-First Dashboard",
    description:
      "Enterprise dashboard work focused on API rendering, caching, and keeping interactions responsive at scale.",
    tags: ["React", "REST APIs", "React Query", "Performance"],
    featured: false,
    thumbnailSrc: "/projects/performance-dashboard.svg",
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "nvest",
    role: "Software Engineer",
    company: "Nvest",
    period: "2024 — Present",
    description:
      "Developed and maintained enterprise-scale insurance platforms using React and TypeScript. Built dynamic insurance journeys with configurable forms, validations, and conditional workflows. Architected reusable component systems and config-driven UI modules across products. Integrated REST APIs with caching, optimistic updates, and dynamic data mapping. Optimized rendering with memoization, lazy loading, and code-splitting. Supported scalable frontend architecture for Motor, Health, and Reinsurance flows.",
    current: true,
  },
  {
    id: "techloom",
    role: "Frontend Developer",
    company: "Techloom",
    period: "2022 — 2024",
    description:
      "Developed client-facing web applications with React, JavaScript, HTML, and CSS. Built modular UI components with a component-driven architecture. Integrated backend APIs and dynamic data rendering. Created responsive layouts for desktop, tablet, and mobile. Collaborated with designers to translate Figma designs into production-ready interfaces.",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend Engineering",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    id: "architecture",
    label: "Architecture & Systems",
    skills: [
      "Component Architecture",
      "Config-Driven UI",
      "Reusable Systems",
      "REST APIs",
      "API Integration",
      "Performance Optimization",
      "Dynamic Form Workflows",
    ],
  },
  {
    id: "tools",
    label: "Developer Tools",
    skills: ["Git", "React Query", "Figma", "Vercel", "Docker"],
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
  "Tailwind CSS",
  "Node.js",
  "React Query",
  "Git",
  "Figma",
] as const;

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/AyushKT21",
    kind: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayusht21/",
    kind: "linkedin",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:ayushtiwari20072001@gmail.com",
    kind: "email",
  },
];

export const RESUME = {
  fileName: "Ayush_Tiwari_resume.pdf",
  downloadHref: "/Ayush_Tiwari_resume.pdf",
  lastUpdated: "Mar 2026",
  headline:
    "Frontend developer focused on React, TypeScript, UI systems, and AI-powered product experiences.",
} as const;

export const FEATURED_PROJECTS = PROJECTS.filter(
  (project) => project.featured,
);
