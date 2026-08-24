"use client";

import * as React from "react";

import { cn } from "@/utils/cn";

const STEPS = [
  "Searching my projects…",
  "Gathering relevant information…",
  "Preparing your answer…",
];

export function ThinkingIndicator({ className }: { className?: string }) {
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((step) => Math.min(step + 1, STEPS.length - 1));
    }, 1200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2.5">
        <span className="flex gap-1">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-thinking-dot"
              style={{ animationDelay: `${dot * 0.15}s` }}
            />
          ))}
        </span>
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          Ayush AI is typing…
        </span>
      </div>

      <ul className="space-y-1.5 pl-1">
        {STEPS.map((step, index) => {
          const isComplete = index < activeStep;
          const isCurrent = index === activeStep;

          return (
            <li
              key={step}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors duration-300",
                isComplete && "text-[var(--text-muted)]",
                isCurrent && "text-[var(--text-secondary)]",
                !isComplete && !isCurrent && "text-[var(--text-muted)]/50",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  isComplete && "bg-[var(--primary)]",
                  isCurrent && "bg-[var(--primary)] animate-thinking-dot",
                  !isComplete && !isCurrent && "bg-[var(--border)]",
                )}
              />
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
