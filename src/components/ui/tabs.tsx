"use client";

import { clsx } from "clsx";

interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div className={clsx("flex items-center gap-1 rounded-[10px] bg-[var(--color-surface-sunken)] p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            "rounded-[8px] px-3.5 py-1.5 text-sm transition-all duration-200",
            value === tab.value
              ? "bg-white font-semibold text-[var(--color-ink)] shadow-sm"
              : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
