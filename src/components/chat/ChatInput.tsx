"use client";

import * as React from "react";
import { ArrowUp, Square } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export interface ChatInputProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onSubmit"
  > {
  loading?: boolean;
  streaming?: boolean;
  onSubmit?: () => void;
  onStop?: () => void;
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      className,
      loading = false,
      streaming = false,
      onSubmit,
      onStop,
      disabled,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const isLocked = disabled || loading || streaming;

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
      if (event.key === "Enter" && !event.shiftKey && !isLocked) {
        event.preventDefault();
        onSubmit?.();
      }
    }

    return (
      <div
        className={cn(
          [
            "flex items-end gap-3",
            "rounded-[var(--radius-xl)]",
            "border border-[var(--border)]",
            "bg-[var(--surface)]",
            "p-3",
            "transition-shadow duration-200",
          ],
          streaming && "border-[var(--primary)]/40 shadow-[var(--shadow-glow)]",
          className,
        )}
      >
        <textarea
          ref={ref}
          rows={1}
          disabled={isLocked}
          placeholder={
            streaming ? "Ayush AI is responding…" : placeholder
          }
          onKeyDown={handleKeyDown}
          className={cn(
            "max-h-40 min-h-11 flex-1 resize-none bg-transparent px-2 py-2",
            "text-sm text-[var(--text-primary)] outline-none",
            "placeholder:text-[var(--text-muted)]",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
          {...props}
        />

        {streaming ? (
          <Button
            size="icon"
            variant="secondary"
            aria-label="Stop generating"
            onClick={onStop}
          >
            <Square className="h-3.5 w-3.5 fill-current" />
          </Button>
        ) : (
          <Button
            size="icon"
            loading={loading}
            onClick={onSubmit}
            disabled={disabled}
            aria-label="Send message"
          >
            {!loading && <ArrowUp className="h-4 w-4" />}
          </Button>
        )}
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";

export { ChatInput };
