"use client";

import { clsx } from "clsx";

interface SpinnerProps {
  size?: "sm" | "md";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-6 w-6";

  return (
    <svg
      className={clsx("animate-spin text-[var(--color-brand)]", sizeClass, className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
