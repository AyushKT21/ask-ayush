import { PROJECTS } from "@/constants/portfolio";

import { PanelHeading } from "./PanelHeading";
import { ProjectCard } from "./ProjectCard";

export function ProjectsPanel() {
  return (
    <div className="space-y-4">
      <PanelHeading
        title="Projects"
        description="Selected work across AI products, portfolios, and full-stack apps."
      />

      <div className="space-y-4">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
