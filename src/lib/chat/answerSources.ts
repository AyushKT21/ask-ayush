import type { PortfolioContext } from "@/types/context";

const TOOL_SOURCE_LABELS: Record<string, string> = {
  getAbout: "Profile",
  getProjects: "Projects",
  getSkills: "Skills",
  getExperience: "Experience",
  getResume: "Resume",
  getContact: "Contact",
};

const CONTEXT_SOURCE_LABELS: Record<PortfolioContext, string[]> = {
  empty: ["Portfolio"],
  about: ["Profile"],
  projects: ["Projects"],
  skills: ["Skills"],
  experience: ["Experience"],
  resume: ["Resume"],
  contact: ["Contact", "GitHub"],
};

export function deriveAnswerSources(
  context: PortfolioContext,
  toolsUsed: string[] = [],
): string[] {
  const fromTools = toolsUsed
    .filter((tool) => tool !== "setContextPanel")
    .map((tool) => TOOL_SOURCE_LABELS[tool])
    .filter((label): label is string => Boolean(label));

  const merged = [...fromTools, ...CONTEXT_SOURCE_LABELS[context]];

  return [...new Set(merged)];
}
