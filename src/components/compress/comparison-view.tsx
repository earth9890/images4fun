"use client";

import { formatBytes } from "@/lib/utils";
import { ComparisonSlider } from "@/components/shared/comparison-slider";
import type { OriginalImage, CompressionResult } from "@/lib/types";

interface ComparisonViewProps {
  original: OriginalImage;
  result: CompressionResult;
}

export function ComparisonView({ original, result }: ComparisonViewProps) {
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <ComparisonSlider
        beforeSrc={original.url}
        afterSrc={result.url}
        beforeLabel={`Original (${formatBytes(original.size)})`}
        afterLabel={`Compressed (${formatBytes(result.size)})`}
      />
      <div className="flex justify-center gap-8 text-sm text-[var(--color-ink-muted)]">
        <span>
          {original.width}&times;{original.height}
        </span>
        <span>&rarr;</span>
        <span>
          {result.width}&times;{result.height}
        </span>
      </div>
    </div>
  );
}
