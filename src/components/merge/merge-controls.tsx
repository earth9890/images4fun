"use client";

import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/ui/color-picker";
import type { MergeLayout } from "@/lib/types";

interface MergeControlsProps {
  layout: MergeLayout;
  gap: number;
  bgColor: string;
  imageCount: number;
  onLayoutChange: (layout: MergeLayout) => void;
  onGapChange: (gap: number) => void;
  onBgColorChange: (color: string) => void;
  onMerge: () => void;
  onReset: () => void;
  isMerging: boolean;
}

const LAYOUTS: { value: MergeLayout; label: string }[] = [
  { value: "horizontal", label: "Horizontal" },
  { value: "vertical", label: "Vertical" },
  { value: "grid", label: "Grid" },
];

export function MergeControls({
  layout,
  gap,
  bgColor,
  imageCount,
  onLayoutChange,
  onGapChange,
  onBgColorChange,
  onMerge,
  onReset,
  isMerging,
}: MergeControlsProps) {
  return (
    <div className="flex flex-col gap-6 rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-5">
      {/* Layout */}
      <div>
        <p className="mb-2.5 text-sm text-[var(--color-ink-muted)]">Layout</p>
        <div className="flex gap-2">
          {LAYOUTS.map((l) => (
            <button
              key={l.value}
              onClick={() => onLayoutChange(l.value)}
              className={clsx(
                "flex-1 rounded-[8px] py-2 text-sm font-semibold transition-colors",
                layout === l.value
                  ? "bg-[var(--color-tool-merge)] text-white"
                  : "bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)] hover:bg-[var(--color-edge)] hover:text-[var(--color-ink)]"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gap */}
      <Slider
        label="Gap"
        displayValue={`${gap}px`}
        min={0}
        max={50}
        step={1}
        value={gap}
        onChange={(e) => onGapChange(Number((e.target as HTMLInputElement).value))}
      />

      {/* Background color */}
      <div>
        <p className="mb-2.5 text-sm text-[var(--color-ink-muted)]">Background</p>
        <ColorPicker value={bgColor} onChange={onBgColorChange} />
      </div>

      {/* Image count */}
      <div className="rounded-[8px] bg-[var(--color-surface-sunken)] px-4 py-3">
        <p className="text-sm text-[var(--color-ink-muted)]">
          {imageCount} image{imageCount !== 1 ? "s" : ""} selected
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onMerge} disabled={isMerging || imageCount < 2} className="flex-1">
          {isMerging ? "Merging..." : "Merge"}
        </Button>
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
