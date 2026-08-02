"use client";

import { ChatInput } from "@/components/chat/ChatInput";
import { cn } from "@/utils/cn";

type ChatFooterProps = {
  value: string;
  loading?: boolean;
  placeholder?: string;
  disclaimer?: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  className?: string;
};

export function ChatFooter({
  value,
  loading = false,
  placeholder = "Ask me anything...",
  disclaimer = "Ayush AI can make mistakes. Consider verifying important information.",
  onChange,
  onSubmit,
  className,
}: ChatFooterProps) {
  return (
    <div
      className={cn(
        "shrink-0 border-t border-[var(--border)]",
        "bg-[var(--background)]/80 backdrop-blur-md",
        "px-6 py-4",
        className,
      )}
    >
      <ChatInput
        value={value}
        placeholder={placeholder}
        loading={loading}
        className="chat-input-premium shadow-[var(--shadow-md)]"
        onChange={(event) => onChange(event.target.value)}
        onSubmit={onSubmit}
      />

      <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
        {disclaimer}
      </p>
    </div>
  );
}
