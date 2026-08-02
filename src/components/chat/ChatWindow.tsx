import * as React from "react";

import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/utils/cn";

export interface ChatWindowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
  isEmpty?: boolean;
}

function ChatWindow({
  className,
  loading = false,
  isEmpty = false,
  children,
  ...props
}: ChatWindowProps) {
  if (loading && isEmpty) {
    return (
      <div
        className={cn(
          "flex min-h-[420px] items-center justify-center",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
          <Spinner size="md" />
          <span>Ayush AI is thinking...</span>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        className={className}
        title="Start a conversation"
        description="Ask anything about Ayush, his projects, skills, or experience."
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto",
        className,
      )}
      {...props}
    >
      {children}

      {loading && (
        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
          <Spinner size="md" />
          <span>Ayush AI is thinking...</span>
        </div>
      )}
    </div>
  );
}

ChatWindow.displayName = "ChatWindow";

export { ChatWindow };