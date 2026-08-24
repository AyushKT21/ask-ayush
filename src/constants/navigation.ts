import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  ExternalLink,
  FileText,
  FolderGit2,
  Mail,
  MessageSquare,
  Plus,
  User,
  Wrench,
} from "lucide-react";

import type { PortfolioContext } from "@/types/context";
import { PROFILE } from "@/constants/portfolio";

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  context?: PortfolioContext;
  keywords?: string[];
  external?: boolean;
};

export const COMMAND_ACTIONS: NavigationItem[] = [
  {
    id: "new-chat",
    label: "New chat",
    href: "/?new=1",
    icon: Plus,
    keywords: ["start", "clear", "reset"],
  },
];

export const PORTFOLIO_NAVIGATION: NavigationItem[] = [
  {
    id: "ask",
    label: "Ask Ayush",
    href: "/",
    icon: MessageSquare,
    context: "empty",
    keywords: ["chat", "home", "ask"],
  },
  {
    id: "about",
    label: "About Me",
    href: "/?context=about",
    icon: User,
    context: "about",
    keywords: ["profile", "intro", "yourself"],
  },
  {
    id: "projects",
    label: "Projects",
    href: "/?context=projects",
    icon: FolderGit2,
    context: "projects",
    keywords: ["portfolio", "builds", "apps"],
  },
  {
    id: "experience",
    label: "Experience",
    href: "/?context=experience",
    icon: BriefcaseBusiness,
    context: "experience",
    keywords: ["jobs", "work", "career"],
  },
  {
    id: "skills",
    label: "Skills",
    href: "/?context=skills",
    icon: Wrench,
    context: "skills",
    keywords: ["stack", "tech", "technologies"],
  },
  {
    id: "resume",
    label: "Resume",
    href: "/?context=resume",
    icon: FileText,
    context: "resume",
    keywords: ["cv", "download"],
  },
  {
    id: "contact",
    label: "Contact",
    href: "/?context=contact",
    icon: Mail,
    context: "contact",
    keywords: ["email", "linkedin", "reach"],
  },
];

export const EXTERNAL_NAVIGATION: NavigationItem[] = [
  {
    id: "classic-portfolio",
    label: "Ayush.dev",
    href: PROFILE.classicPortfolioHref,
    icon: ExternalLink,
    external: true,
    keywords: ["edge folio", "classic", "website"],
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/AyushKT21",
    icon: FolderGit2,
    external: true,
    keywords: ["code", "repos"],
  },
];

export const ALL_COMMAND_ITEMS: NavigationItem[] = [
  ...COMMAND_ACTIONS,
  ...PORTFOLIO_NAVIGATION,
  ...EXTERNAL_NAVIGATION,
];
