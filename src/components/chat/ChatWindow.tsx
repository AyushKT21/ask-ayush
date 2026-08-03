import * as React from "react";

import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/utils/cn";

export interface ChatWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  isEmpty?: boolean;
  endRef?: React.Ref<HTMLDivElement>;
}

function ChatWindow({
  className,
  isEmpty = false,
  children,
  endRef,
  ...props
}: ChatWindowProps) {
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
        "flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto scroll-smooth",
        className,
      )}
      {...props}
    >
      {children}
      <div ref={endRef} className="h-px shrink-0" aria-hidden />
    </div>
  );
}

ChatWindow.displayName = "ChatWindow";

export { ChatWindow };
