import Image from "next/image";

import type { Project } from "@/constants/portfolio";
import { cn } from "@/utils/cn";

const gradientByProject: Record<string, string> = {
  "insurance-journey-builder":
    "bg-gradient-to-br from-emerald-600/90 via-teal-700/80 to-slate-900",
  "ayush-ai":
    "bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900",
  "edge-folio":
    "bg-gradient-to-br from-sky-600 via-indigo-700 to-violet-900",
  "design-to-code-ui":
    "bg-gradient-to-br from-zinc-600 via-violet-800 to-zinc-900",
  "performance-dashboard":
    "bg-gradient-to-br from-amber-600 via-orange-700 to-stone-900",
};

type ProjectThumbnailProps = {
  project: Project;
  className?: string;
};

export function ProjectThumbnail({
  project,
  className,
}: ProjectThumbnailProps) {
  const gradient =
    project.thumbnailGradient ??
    gradientByProject[project.id] ??
    "bg-gradient-to-br from-[var(--primary)] to-indigo-800";

  if (project.thumbnailSrc) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-[var(--border)]",
          className,
        )}
      >
        <Image
          src={project.thumbnailSrc}
          alt={`${project.title} preview`}
          fill
          unoptimized
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 384px"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10 shadow-inner",
        gradient,
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent_55%)]" />
      <div className="absolute bottom-1 left-2 text-[9px] font-semibold uppercase tracking-wide text-white/80">
        Preview
      </div>
    </div>
  );
}
