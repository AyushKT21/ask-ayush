import { EmptyPanel } from "./EmptyPanel";
import { AboutPanel } from "./AboutPanel";
import { ProjectsPanel } from "./ProjectsPanel";
import { SkillsPanel } from "./SkillsPanel";
import { ExperiencePanel } from "./ExperiencePanel";
import { ResumePanel } from "./ResumePanel";
import { ContactPanel } from "./ContactPanel";

import type { PortfolioContext } from "@/types/context";

export type ContextType = PortfolioContext;

export interface ContextPanelProps {
  context: ContextType;
}

export function ContextPanel({
  context,
}: ContextPanelProps) {
  switch (context) {
    case "about":
      return <AboutPanel />;

    case "projects":
      return <ProjectsPanel />;

    case "skills":
      return <SkillsPanel />;

    case "experience":
      return <ExperiencePanel />;

    case "resume":
      return <ResumePanel />;

    case "contact":
      return <ContactPanel />;

    case "empty":
    default:
      return <EmptyPanel />;
  }
}