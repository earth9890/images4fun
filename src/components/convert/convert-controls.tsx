"use client";

import { clsx } from "clsx";
import { Slider } from "@/components/ui/slider";
import type { OutputFormat } from "@/lib/types";

interface ConvertControlsProps {
  inputFormat: string;
  outputFormat: OutputFormat;
  quality: number;
  onFormatChange: (format: OutputFormat) => void;
  onQualityChange: (quality: number) => void;
}

const FORMATS: { value: OutputFormat; label: string }[] = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" },
];

export function ConvertControls({
  inputFormat,
  outputFormat,
  quality,
  onFormatChange,
  onQualityChange,
}: ConvertControlsProps) {
  const isLossy = outputFormat !== "png";

  return (
    <div className="flex flex-col gap-6 rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-5">
      {/* Input format badge */}
      <div>
        <p className="mb-2.5 text-sm text-[var(--color-ink-muted)]">Input format</p>
        <span className="inline-block rounded-[8px] bg-[var(--color-surface-sunken)] px-3 py-1.5 text-sm font-semibold text-[var(--color-ink)]">
          {inputFormat}
        </span>
      </div>

      {/* Output format */}
      <div>
        <p className="mb-2.5 text-sm text-[var(--color-ink-muted)]">Convert to</p>
        <div className="grid grid-cols-2 gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.value}
              onClick={() => onFormatChange(f.value)}
              className={clsx(
                "rounded-[8px] py-2 text-sm font-semibold transition-colors",
                outputFormat === f.value
                  ? "bg-[var(--color-tool-convert)] text-white"
                  : "bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)] hover:bg-[var(--color-edge)] hover:text-[var(--color-ink)]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quality (lossy only) */}
      {isLossy && (
        <Slider
          label="Quality"
          displayValue={`${quality}`}
          min={1}
          max={100}
          step={1}
          value={quality}
          onChange={(e) =>
            onQualityChange(Number((e.target as HTMLInputElement).value))
          }
        />
      )}
    </div>
  );
}
