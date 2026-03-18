"use client";

import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-5 py-2.5 text-sm",
        variant === "primary" &&
          "bg-[var(--color-brand)] text-white shadow-sm hover:bg-[var(--color-brand-hover)] hover:shadow-md active:scale-[0.98]",
        variant === "secondary" &&
          "border border-[var(--color-edge)] bg-white text-[var(--color-ink)] hover:border-[var(--color-edge-strong)] hover:bg-[var(--color-surface-sunken)]",
        variant === "ghost" &&
          "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-ink)]",
        className
      )}
      {...props}
    />
  );
}
