import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

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

export function ContextPanel({ context }: ContextPanelProps) {
  let panel: ReactNode;

  switch (context) {
    case "about":
      panel = <AboutPanel />;
      break;
    case "projects":
      panel = <ProjectsPanel />;
      break;
    case "skills":
      panel = <SkillsPanel />;
      break;
    case "experience":
      panel = <ExperiencePanel />;
      break;
    case "resume":
      panel = <ResumePanel />;
      break;
    case "contact":
      panel = <ContactPanel />;
      break;
    case "empty":
    default:
      panel = <EmptyPanel />;
  }

  return (
    <div key={context} className={cn("context-panel-animate min-h-0")}>
      {panel}
    </div>
  );
}