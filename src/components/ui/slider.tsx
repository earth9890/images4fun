"use client";

import { clsx } from "clsx";
import type { InputHTMLAttributes } from "react";

interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  displayValue?: string;
}

export function Slider({
  label,
  displayValue,
  className,
  ...props
}: SliderProps) {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {(label || displayValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-[var(--color-ink-muted)]">{label}</span>}
          {displayValue && (
            <span className="font-semibold text-[var(--color-ink)]">{displayValue}</span>
          )}
        </div>
      )}
      <input
        type="range"
        className="h-1.5 w-full cursor-pointer rounded-full"
        {...props}
      />
    </div>
  );
}
