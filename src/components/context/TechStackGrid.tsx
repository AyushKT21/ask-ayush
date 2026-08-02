import { cn } from "@/utils/cn";
import { TECH_STACK_ICON_ITEMS } from "@/constants/techStackIcons";

type TechStackGridProps = {
  className?: string;
};

export function TechStackGrid({ className }: TechStackGridProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-3", className)}>
      {TECH_STACK_ICON_ITEMS.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.name}
            className={cn(
              "group flex flex-col items-center justify-center gap-2",
              "rounded-[var(--radius-lg)]",
              "border border-[var(--border)]",
              "bg-[var(--surface-secondary)]/80",
              "px-2 py-3",
              "text-center",
              "transition-colors duration-200",
              "hover:border-[var(--primary)]/40 hover:bg-[var(--surface-hover)]",
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center",
                "rounded-lg bg-[var(--surface)]",
                "shadow-sm ring-1 ring-[var(--border)]",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                  item.themeAware && "text-[var(--foreground)]",
                )}
                style={
                  item.themeAware ? undefined : { color: item.color }
                }
                aria-hidden
              />
            </div>
            <span className="text-[10px] leading-tight text-[var(--text-muted)]">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
