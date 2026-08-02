"use client";

import * as React from "react";

import { cn } from "@/utils/cn";

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback: React.ReactNode;
}

function Avatar({
  className,
  src,
  alt,
  fallback,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const shouldShowImage = Boolean(src) && !imageError;

  if (shouldShowImage) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          [
            "h-10 w-10",
            "shrink-0",
            "rounded-full",
            "object-cover",
            "border border-[var(--border)]",
            "bg-[var(--surface-secondary)]",
          ],
          className,
        )}
        onError={() => setImageError(true)}
        {...props}
      />
    );
  }

  return (
    <span
      aria-label={alt}
      className={cn(
        [
          "inline-flex",
          "h-10 w-10",
          "shrink-0",
          "items-center",
          "justify-center",
          "rounded-full",
          "border border-[var(--border)]",
          "bg-[var(--surface-secondary)]",
          "text-sm",
          "font-semibold",
          "text-[var(--text-primary)]",
          "select-none",
        ],
        className,
      )}
    >
      {fallback}
    </span>
  );
}

Avatar.displayName = "Avatar";

export { Avatar };