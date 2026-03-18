"use client";

import { clsx } from "clsx";

const PRESETS = [
  { value: "#ffffff", label: "White" },
  { value: "#000000", label: "Black" },
  { value: "transparent", label: "Transparent" },
  { value: "#f5f5f5", label: "Light gray" },
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  return (
    <div className={clsx("flex items-center gap-2.5", className)}>
      {PRESETS.map((preset) => (
        <button
          key={preset.value}
          title={preset.label}
          onClick={() => onChange(preset.value)}
          className={clsx(
            "h-8 w-8 rounded-full border-2 transition-all duration-200",
            value === preset.value
              ? "border-[var(--color-brand)] scale-110 shadow-sm"
              : "border-[var(--color-edge)] hover:border-[var(--color-edge-strong)] hover:scale-105"
          )}
          style={{
            background:
              preset.value === "transparent"
                ? "repeating-conic-gradient(#d4d4d4 0% 25%, white 0% 50%) 50% / 12px 12px"
                : preset.value,
          }}
        />
      ))}
    </div>
  );
}
