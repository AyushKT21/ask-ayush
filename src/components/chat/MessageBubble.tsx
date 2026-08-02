import * as React from "react";

import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { MessageMarkdown } from "@/components/markdown/MessageMarkdown";
import { cn } from "@/utils/cn";

export interface MessageBubbleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  role: "user" | "assistant";
  avatar?: React.ReactNode;
  markdown?: boolean;
}

function MessageBubble({
  className,
  role,
  avatar,
  markdown = false,
  children,
  ...props
}: MessageBubbleProps) {
  const isUser = role === "user";

  const body =
    markdown && typeof children === "string" ? (
      <MessageMarkdown content={children} />
    ) : (
      children
    );

  return (
    <div
      className={cn(
        "flex w-full gap-3",
        isUser ? "justify-end" : "justify-start",
        className,
      )}
      {...props}
    >
      {!isUser && (avatar ?? <Avatar fallback="AI" />)}

      <Card
        className={cn(
          "max-w-[80%] px-4 py-3 text-sm leading-relaxed",
          isUser && "bg-[var(--primary)] text-[var(--primary-foreground)]",
          isUser && "prose-invert",
        )}
      >
        {body}
      </Card>

      {isUser && (avatar ?? <Avatar fallback="AK" />)}
    </div>
  );
}

MessageBubble.displayName = "MessageBubble";

export { MessageBubble };
