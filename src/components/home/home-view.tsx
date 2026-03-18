"use client";

import { clsx } from "clsx";
import {
  FileMinusIcon,
  Layers01Icon,
  CropIcon,
  RefreshIcon,
  ShieldKeyIcon,
  FlashIcon,
  GiftIcon,
  GlobalIcon,
  Tick01Icon,
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

const toolColorMap: Record<string, { bg: string; light: string }> = {
  compress: { bg: "var(--color-tool-compress)", light: "var(--color-tool-compress-light)" },
  crop: { bg: "var(--color-tool-crop)", light: "var(--color-tool-crop-light)" },
  merge: { bg: "var(--color-tool-merge)", light: "var(--color-tool-merge-light)" },
  convert: { bg: "var(--color-tool-convert)", light: "var(--color-tool-convert-light)" },
};

interface HomeViewProps {
  onNavigate: (hash: string) => void;
}

const FEATURES = [
  {
    icon: ShieldKeyIcon,
    title: "100% Private",
    description: "Everything runs locally in your browser. No uploads, no servers, no tracking.",
  },
  {
    icon: FlashIcon,
    title: "Lightning Fast",
    description: "WebAssembly-powered processing delivers results in milliseconds.",
  },
  {
    icon: GiftIcon,
    title: "Completely Free",
    description: "No sign-ups, no watermarks, no limits. Every tool is free, forever.",
  },
  {
    icon: GlobalIcon,
    title: "Works Everywhere",
    description: "Chrome, Firefox, Safari, Edge — desktop and mobile. No install needed.",
  },
];

const TOOL_DETAILS: Record<string, { tagline: string; bullets: string[] }> = {
  compress: {
    tagline: "Reduce file size while keeping quality high",
    bullets: ["JPEG, PNG, WebP, AVIF output", "Quality slider for precise control", "Optional resize with max dimensions"],
  },
  crop: {
    tagline: "Trim images to the exact size you need",
    bullets: ["Interactive drag-to-crop canvas", "Preset ratios: 1:1, 4:3, 3:2, 16:9", "PNG or JPEG output"],
  },
  merge: {
    tagline: "Combine multiple images into a single file",
    bullets: ["Horizontal, vertical, or grid layout", "Drag-to-reorder image list", "Adjustable gap and background color"],
  },
  convert: {
    tagline: "Switch between image formats instantly",
    bullets: ["Supports JPEG, PNG, WebP, AVIF", "Quality control for lossy formats", "See size comparison instantly"],
  },
};

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="flex-1">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[var(--color-brand-light)] to-[var(--color-surface)] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-5 text-4xl font-semibold tracking-tight text-[var(--color-ink)] md:text-5xl lg:text-6xl animate-fade-in">
            Every image tool you need, in one place
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--color-ink-muted)] md:text-xl animate-slide-up">
            Compress, crop, merge, and convert images — all 100% free and running entirely in your browser. No uploads, no servers, completely private.
          </p>
        </div>
      </div>

      {/* Tool cards grid */}
      <div className="mx-auto max-w-5xl px-4 -mt-6 md:-mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool, i) => {
            const icon = iconMap[tool.icon];
            const colors = toolColorMap[tool.id];
            return (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.route)}
                className={clsx(
                  "group flex flex-col items-start gap-4 rounded-[14px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-6 text-left",
                  "transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-[var(--color-edge-strong)]",
                  `animate-slide-up delay-${i + 1}`
                )}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-[12px] transition-all duration-200 group-hover:scale-110"
                  style={{ backgroundColor: colors.light }}
                >
                  {icon && (
                    <span style={{ color: colors.bg }}>
                      <Icon icon={icon} size={22} />
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-[var(--color-ink)]">
                    {tool.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {tool.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool details section */}
      <div className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="mb-12 text-center text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
          Powerful tools, simple to use
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TOOLS.map((tool) => {
            const icon = iconMap[tool.icon];
            const details = TOOL_DETAILS[tool.id];
            const colors = toolColorMap[tool.id];
            return (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.route)}
                className="group rounded-[14px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-6 text-left transition-all duration-200 hover:shadow-md hover:border-[var(--color-edge-strong)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-[8px]"
                    style={{ backgroundColor: colors.light }}
                  >
                    {icon && <span style={{ color: colors.bg }}><Icon icon={icon} size={18} /></span>}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--color-ink)]">{tool.name}</h3>
                </div>
                <p className="mb-3 text-sm text-[var(--color-ink-muted)]">{details.tagline}</p>
                <ul className="space-y-1.5">
                  {details.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-[var(--color-ink-muted)]">
                      <span className="mt-0.5 shrink-0" style={{ color: colors.bg }}><Icon icon={Tick01Icon} size={14} /></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>

      {/* Features section */}
      <div className="bg-[var(--color-surface-sunken)] py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-4 text-center text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
            Why images4.fun?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-[var(--color-ink-muted)]">
            Unlike other tools that upload your images to remote servers, we process everything directly in your browser.
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-edge)] shadow-sm">
                  <Icon icon={feature.icon} size={22} className="text-[var(--color-brand)]" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-[var(--color-ink)]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--color-ink)] md:text-3xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-sm text-[var(--color-ink-muted)]">
            Pick a tool and start processing your images. No sign-up required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TOOLS.map((tool) => {
              const colors = toolColorMap[tool.id];
              return (
                <button
                  key={tool.id}
                  onClick={() => onNavigate(tool.route)}
                  className="rounded-[10px] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
                  style={{ backgroundColor: colors.bg }}
                >
                  {tool.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
