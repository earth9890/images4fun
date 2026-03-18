"use client";

import { clsx } from "clsx";
import {
  FileMinusIcon,
  Layers01Icon,
  CropIcon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { TOOLS } from "@/lib/constants";
import type { IconSvgElement } from "@hugeicons/react";

const iconMap: Record<string, IconSvgElement> = {
  "file-minus-02": FileMinusIcon,
  "layers-01": Layers01Icon,
  crop: CropIcon,
  refresh: RefreshIcon,
};

const toolColorMap: Record<string, string> = {
  compress: "var(--color-tool-compress)",
  crop: "var(--color-tool-crop)",
  merge: "var(--color-tool-merge)",
  convert: "var(--color-tool-convert)",
};

interface SidebarProps {
  currentRoute: string;
  onNavigate: (hash: string) => void;
}

export function Sidebar({ currentRoute, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden w-48 shrink-0 border-r border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-4 lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
        Tools
      </p>
      <nav className="flex flex-col gap-1">
        {TOOLS.map((tool) => {
          const isActive = currentRoute.startsWith(tool.route);
          const icon = iconMap[tool.icon];
          const color = toolColorMap[tool.id];
          return (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.route)}
              className={clsx(
                "flex items-center gap-2.5 rounded-[8px] px-3 py-2 text-left text-sm transition-all duration-150",
                isActive
                  ? "bg-[var(--color-surface-sunken)] font-semibold"
                  : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)] hover:translate-x-0.5"
              )}
              style={isActive ? { color } : undefined}
            >
              {icon && <Icon icon={icon} size={16} />}
              {tool.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
