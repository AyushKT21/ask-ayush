import Image from "next/image";

import type { Project } from "@/constants/portfolio";
import { cn } from "@/utils/cn";

const gradientByProject: Record<string, string> = {
  "devvault-ai":
    "bg-gradient-to-br from-emerald-500/90 via-teal-600/80 to-slate-900",
  "ayush-ai":
    "bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900",
  "ecommerce-store":
    "bg-gradient-to-br from-orange-500 via-rose-500 to-purple-900",
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
          className="object-cover"
          sizes="120px"
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
