"use client";

import { clsx } from "clsx";
import { formatBytes, calculateReduction } from "@/lib/utils";

interface CompressionStatsProps {
  originalSize: number;
  compressedSize: number;
  timeTakenMs: number;
  originalDimensions: { width: number; height: number };
  compressedDimensions: { width: number; height: number };
}

export function CompressionStats({
  originalSize,
  compressedSize,
  timeTakenMs,
  originalDimensions,
  compressedDimensions,
}: CompressionStatsProps) {
  const reduction = calculateReduction(originalSize, compressedSize);
  const increased = compressedSize > originalSize;
  const barPct = Math.min(100, (compressedSize / originalSize) * 100);

  return (
    <div className="rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] px-5 py-4">
      {/* Size bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-ink-muted)]">{formatBytes(originalSize)}</span>
          <span className="font-semibold text-[var(--color-ink)]">{formatBytes(compressedSize)}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-sunken)]">
          <div
            className={clsx(
              "h-full rounded-full transition-all duration-500",
              increased ? "bg-red-400" : "bg-[var(--color-tool-compress)]"
            )}
            style={{ width: `${barPct}%` }}
          />
        </div>
      </div>

      {/* Metrics row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className={clsx("font-semibold", increased ? "text-red-600" : "text-[var(--color-tool-compress)]")}>
          {increased ? `${Math.abs(reduction)}% larger` : `${reduction}% smaller`}
        </span>

        {(originalDimensions.width !== compressedDimensions.width ||
          originalDimensions.height !== compressedDimensions.height) && (
          <span className="text-[var(--color-ink-muted)]">
            {originalDimensions.width}&times;{originalDimensions.height}
            {" → "}
            {compressedDimensions.width}&times;{compressedDimensions.height}
          </span>
        )}

        <span className="text-[var(--color-ink-faint)]">{(timeTakenMs / 1000).toFixed(1)}s</span>
      </div>
    </div>
  );
}
