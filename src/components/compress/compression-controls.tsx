"use client";

import { clsx } from "clsx";
import { Slider } from "@/components/ui/slider";
import type { CompressionSettings, OutputFormat } from "@/lib/types";

interface CompressionControlsProps {
  settings: CompressionSettings;
  onChange: (partial: Partial<CompressionSettings>) => void;
}

const FORMATS: { value: OutputFormat; label: string }[] = [
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" },
];

export function CompressionControls({
  settings,
  onChange,
}: CompressionControlsProps) {
  return (
    <div className="flex flex-col gap-6 rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-5">
      {/* Format */}
      <div>
        <p className="mb-2.5 text-sm text-[var(--color-ink-muted)]">Output format</p>
        <div className="flex gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.value}
              onClick={() => onChange({ format: f.value })}
              className={clsx(
                "flex-1 rounded-[8px] py-2 text-sm font-semibold transition-colors",
                settings.format === f.value
                  ? "bg-[var(--color-tool-compress)] text-white"
                  : "bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)] hover:bg-[var(--color-edge)] hover:text-[var(--color-ink)]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quality */}
      <Slider
        label="Quality"
        displayValue={`${settings.quality}`}
        min={1}
        max={100}
        step={1}
        value={settings.quality}
        onChange={(e) =>
          onChange({ quality: Number((e.target as HTMLInputElement).value) })
        }
      />

      {/* Resize toggle */}
      <div>
        <label className="flex items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={settings.resizeEnabled}
            onChange={(e) => onChange({ resizeEnabled: e.target.checked })}
            className="h-4 w-4 rounded accent-[var(--color-brand)]"
          />
          <span className="text-[var(--color-ink-muted)]">Resize</span>
        </label>

        {settings.resizeEnabled && (
          <div className="mt-3 flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs text-[var(--color-ink-faint)]">
                Max width
              </label>
              <input
                type="number"
                value={settings.maxWidth}
                onChange={(e) =>
                  onChange({ maxWidth: Number(e.target.value) || 1920 })
                }
                min={1}
                max={8192}
                className="w-full rounded-[8px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs text-[var(--color-ink-faint)]">
                Max height
              </label>
              <input
                type="number"
                value={settings.maxHeight}
                onChange={(e) =>
                  onChange({ maxHeight: Number(e.target.value) || 1080 })
                }
                min={1}
                max={8192}
                className="w-full rounded-[8px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-brand)]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
