"use client";

import { useState, useCallback } from "react";
import { clsx } from "clsx";
import {
  FileMinusIcon,
  Layers01Icon,
  CropIcon,
  RefreshIcon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { TOOLS } from "@/lib/constants";
import { Tabs } from "@/components/ui/tabs";
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

interface HeaderProps {
  currentRoute: string;
  onNavigate: (hash: string) => void;
}

const COMPRESS_TABS = [
  { value: "#/compress", label: "Compress" },
  { value: "#/compress/compare", label: "Compare" },
];

export function Header({ currentRoute, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCompress = currentRoute.startsWith("#/compress");

  const navigate = useCallback(
    (hash: string) => {
      onNavigate(hash);
      setMobileMenuOpen(false);
    },
    [onNavigate]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-edge)] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <button
          onClick={() => navigate("#/")}
          className="flex items-center gap-2 group"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--color-brand)] text-white text-sm font-semibold shadow-sm transition-transform duration-200 group-hover:scale-105">
            i4
          </span>
          <span className="text-base font-semibold text-[var(--color-ink)] tracking-tight">
            images4.fun
          </span>
        </button>

        {/* Desktop tool nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {TOOLS.map((tool) => {
            const icon = iconMap[tool.icon];
            const isActive = currentRoute.startsWith(tool.route);
            const color = toolColorMap[tool.id];
            return (
              <button
                key={tool.id}
                onClick={() => navigate(tool.route)}
                className={clsx(
                  "flex items-center gap-1.5 rounded-[9px] px-3.5 py-2 text-sm transition-all duration-200",
                  isActive
                    ? "font-semibold text-white shadow-sm"
                    : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-ink)]"
                )}
                style={isActive ? { backgroundColor: color } : undefined}
              >
                {icon && <Icon icon={icon} size={16} />}
                {tool.name}
              </button>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-[9px] p-2 text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-sunken)] md:hidden"
        >
          <Icon icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon} size={22} />
        </button>
      </div>

      {/* Compress sub-tabs */}
      {isCompress && (
        <div className="border-t border-[var(--color-edge)]">
          <div className="mx-auto max-w-6xl px-4 py-2 lg:px-6">
            <Tabs
              tabs={COMPRESS_TABS}
              value={currentRoute === "#/compress/compare" ? "#/compress/compare" : "#/compress"}
              onChange={onNavigate}
            />
          </div>
        </div>
      )}

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-[var(--color-edge)] bg-white md:hidden animate-slide-up">
          <div className="flex flex-col p-3 gap-1">
            {TOOLS.map((tool) => {
              const icon = iconMap[tool.icon];
              const isActive = currentRoute.startsWith(tool.route);
              const color = toolColorMap[tool.id];
              return (
                <button
                  key={tool.id}
                  onClick={() => navigate(tool.route)}
                  className={clsx(
                    "flex items-center gap-2.5 rounded-[9px] px-4 py-3 text-sm transition-all duration-200",
                    isActive
                      ? "font-semibold text-white"
                      : "text-[var(--color-ink)] hover:bg-[var(--color-surface-sunken)]"
                  )}
                  style={isActive ? { backgroundColor: color } : undefined}
                >
                  {icon && <Icon icon={icon} size={18} />}
                  {tool.name}
                </button>
              );
            })}
            <div className="my-2 border-t border-[var(--color-edge)]" />
            <button
              onClick={() => navigate("#/about")}
              className="rounded-[9px] px-4 py-2.5 text-left text-sm text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-sunken)]"
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
