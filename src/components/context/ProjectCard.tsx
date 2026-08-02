import {
  BriefcaseBusiness,
  ExternalLink,
  FolderGit2,
  LayoutDashboard,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Card, CardFooter } from "@/components/ui/Card";
import type { Project } from "@/constants/portfolio";
import { cn } from "@/utils/cn";

import { ProjectThumbnail } from "./ProjectThumbnail";

const iconByProject: Record<string, typeof Sparkles> = {
  "insurance-journey-builder": Workflow,
  "ayush-ai": Sparkles,
  "edge-folio": LayoutDashboard,
  "design-to-code-ui": LayoutDashboard,
  "performance-dashboard": LayoutDashboard,
};

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const Icon = iconByProject[project.id] ?? BriefcaseBusiness;

  return (
    <Card
      className={cn(
        "overflow-hidden border-[var(--border)]",
        "shadow-sm transition-all duration-200",
        "hover:border-[var(--primary)]/35 hover:shadow-md",
      )}
    >
      <ProjectThumbnail
        project={project}
        className={cn(
          "h-36 w-full rounded-none border-0 border-b border-[var(--border)]",
          compact && "h-28",
        )}
      />

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center",
              "rounded-lg bg-[var(--primary)]/12 text-[var(--primary)]",
            )}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold leading-tight">
              {project.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
              {project.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] font-medium"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {(project.href || project.github) && (
        <CardFooter className="gap-2 border-t border-[var(--border)] bg-[var(--surface-secondary)]/40 px-4 py-3">
          {project.href && (
            <Link
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
              )}
            >
              Live demo
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          )}

          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
              )}
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              Code
            </Link>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
