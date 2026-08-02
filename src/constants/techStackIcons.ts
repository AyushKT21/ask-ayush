import type { IconType } from "react-icons";
import {
  SiDocker,
  SiGit,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type TechStackIconItem = {
  name: string;
  icon: IconType;
  /** Fixed brand color (ignored when themeAware is true). */
  color: string;
  /** Icon follows --foreground (e.g. Next.js black/white logo). */
  themeAware?: boolean;
};

export const TECH_STACK_ICON_ITEMS: TechStackIconItem[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
    themeAware: true,
  },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];
