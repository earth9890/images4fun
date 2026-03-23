"use client";

import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ASPECT_RATIOS } from "@/lib/constants";
import type { AspectRatio, CropRegion, OutputFormat } from "@/lib/types";

interface CropControlsProps {
  cropRegion: CropRegion;
  aspectRatio: AspectRatio;
  outputFormat: OutputFormat;
  quality: number;
  onAspectRatioChange: (ratio: AspectRatio) => void;
  onFormatChange: (format: OutputFormat) => void;
  onQualityChange: (quality: number) => void;
  onApply: () => void;
  onReset: () => void;
  isCropping: boolean;
}

const FORMATS: { value: OutputFormat; label: string }[] = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" },
];

export function CropControls({
  cropRegion,
  aspectRatio,
  outputFormat,
  quality,
  onAspectRatioChange,
  onFormatChange,
  onQualityChange,
  onApply,
  onReset,
  isCropping,
}: CropControlsProps) {
  return (
    <div className="flex flex-col gap-6 rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-5">
      {/* Aspect ratio */}
      <div>
        <p className="mb-2.5 text-sm text-[var(--color-ink-muted)]">Aspect ratio</p>
        <div className="flex flex-wrap gap-2">
          {ASPECT_RATIOS.map((r) => (
            <button
              key={r.value}
              onClick={() => onAspectRatioChange(r.value)}
              className={clsx(
                "rounded-[8px] px-3 py-1.5 text-sm font-semibold transition-colors",
                aspectRatio === r.value
                  ? "bg-[var(--color-tool-crop)] text-white"
                  : "bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)] hover:bg-[var(--color-edge)] hover:text-[var(--color-ink)]"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Output format */}
      <div>
        <p className="mb-2.5 text-sm text-[var(--color-ink-muted)]">Output format</p>
        <div className="flex gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.value}
              onClick={() => onFormatChange(f.value)}
              className={clsx(
                "flex-1 rounded-[8px] py-2 text-sm font-semibold transition-colors",
                outputFormat === f.value
                  ? "bg-[var(--color-tool-crop)] text-white"
                  : "bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)] hover:bg-[var(--color-edge)] hover:text-[var(--color-ink)]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quality (JPEG only) */}
      {outputFormat === "jpeg" && (
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

      {/* Dimensions display */}
      <div className="rounded-[8px] bg-[var(--color-surface-sunken)] px-4 py-3">
        <p className="text-xs text-[var(--color-ink-faint)]">Crop dimensions</p>
        <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">
          {Math.round(cropRegion.w)} &times; {Math.round(cropRegion.h)} px
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onApply} disabled={isCropping} className="flex-1">
          {isCropping ? "Cropping..." : "Apply crop"}
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
