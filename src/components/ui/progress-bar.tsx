"use client";

import { clsx } from "clsx";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  return (
    <div
      className={clsx(
        "h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-sunken)]",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-[var(--color-brand)] transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
