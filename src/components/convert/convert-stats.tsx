"use client";

import { clsx } from "clsx";
import { formatBytes, calculateReduction } from "@/lib/utils";

interface ConvertStatsProps {
  originalSize: number;
  convertedSize: number;
  inputFormat: string;
  outputFormat: string;
  timeTakenMs: number;
}

export function ConvertStats({
  originalSize,
  convertedSize,
  inputFormat,
  outputFormat,
  timeTakenMs,
}: ConvertStatsProps) {
  const reduction = calculateReduction(originalSize, convertedSize);
  const increased = convertedSize > originalSize;

  // Visual bar: width of converted relative to original
  const barPct = Math.min(100, (convertedSize / originalSize) * 100);

  return (
    <div className="rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] p-5">
      {/* Format badges */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <span className="rounded-[6px] bg-[var(--color-surface-sunken)] px-2.5 py-1 font-semibold text-[var(--color-ink)]">
          {inputFormat}
        </span>
        <span className="text-[var(--color-ink-faint)]">&rarr;</span>
        <span className="rounded-[6px] bg-[var(--color-tool-convert)] px-2.5 py-1 font-semibold text-white">
          {outputFormat.toUpperCase()}
        </span>
      </div>

      {/* Size comparison bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-ink-muted)]">{formatBytes(originalSize)}</span>
          <span className="font-semibold text-[var(--color-ink)]">{formatBytes(convertedSize)}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-surface-sunken)]">
          <div
            className={clsx(
              "h-full rounded-full transition-all duration-500",
              increased ? "bg-red-400" : "bg-[var(--color-tool-convert)]"
            )}
            style={{ width: `${barPct}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-sm">
        <span className={clsx("font-semibold", increased ? "text-red-600" : "text-[var(--color-tool-convert)]")}>
          {increased ? `${Math.abs(reduction)}% larger` : `${reduction}% smaller`}
        </span>
        <span className="text-[var(--color-ink-faint)]">{(timeTakenMs / 1000).toFixed(1)}s</span>
      </div>
    </div>
  );
}
