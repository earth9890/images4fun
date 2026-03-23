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

interface MobileNavProps {
  currentRoute: string;
}

export function MobileNav({ currentRoute }: MobileNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-[var(--color-edge)] bg-white/95 backdrop-blur-md px-2 py-2 lg:hidden"
      aria-label="Mobile tool navigation"
    >
      {TOOLS.map((tool) => {
        const icon = iconMap[tool.icon];
        const isActive = currentRoute.startsWith(tool.route);
        const color = toolColorMap[tool.id];

        return (
          <a
            key={tool.id}
            href={tool.route}
            className={clsx(
              "flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 transition-colors",
              isActive
                ? "font-semibold"
                : "text-[var(--color-ink-faint)]"
            )}
            style={isActive ? { color } : undefined}
          >
            {icon && <Icon icon={icon} size={20} />}
            <span className="text-[10px]">{tool.name}</span>
          </a>
        );
      })}
    </nav>
  );
}
