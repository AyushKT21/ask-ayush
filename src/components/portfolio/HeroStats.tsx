import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  Code2,
  Heart,
  FolderGit2,
} from "lucide-react";

import { Separator } from "@/components/ui/Separator";

type HeroStat = {
  value: string;
  label: string;
  icon: ReactNode;
};

const stats: HeroStat[] = [
  {
    value: "1.8+",
    label: "Years Experience",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
  },
  {
    value: "10+",
    label: "Projects Built",
    icon: <FolderGit2 className="h-4 w-4" />,
  },
  {
    value: "15+",
    label: "Technologies",
    icon: <Code2 className="h-4 w-4" />,
  },
  {
    value: "100%",
    label: "Dedication",
    icon: <Heart className="h-4 w-4" />,
  },
];

export function HeroStats() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <div key={stat.label} className="flex items-center">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
              {stat.icon}
            </span>

            <div>
              <p className="text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--text-muted)] sm:text-sm">
                {stat.label}
              </p>
            </div>
          </div>

          {index !== stats.length - 1 && (
            <Separator
              orientation="vertical"
              className="mx-4 hidden h-10 sm:mx-6 md:block"
            />
          )}
        </div>
      ))}
    </div>
  );
}
