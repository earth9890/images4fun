"use client";

import { clsx } from "clsx";
import type { MergeImage, MergeLayout } from "@/lib/types";

interface MergePreviewProps {
  images: MergeImage[];
  layout: MergeLayout;
  gap: number;
  bgColor: string;
}

export function MergePreview({ images, layout, gap, bgColor }: MergePreviewProps) {
  if (images.length === 0) return null;

  const cols = layout === "grid" ? Math.ceil(Math.sqrt(images.length)) : undefined;

  return (
    <div
      className="overflow-hidden rounded-[12px] border border-[var(--color-edge)] p-3"
      style={{
        background:
          bgColor === "transparent"
            ? "repeating-conic-gradient(#d4d4d4 0% 25%, white 0% 50%) 50% / 16px 16px"
            : bgColor,
      }}
    >
      <div
        className={clsx(
          layout === "horizontal" && "flex flex-row flex-wrap",
          layout === "vertical" && "flex flex-col",
          layout === "grid" && "grid"
        )}
        style={{
          gap: `${gap}px`,
          ...(layout === "grid" ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : {}),
        }}
      >
        {images.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.id}
            src={img.url}
            alt={img.file.name}
            className={clsx(
              "object-contain rounded-[4px]",
              layout === "horizontal" && "h-24",
              layout === "vertical" && "w-full max-h-24",
              layout === "grid" && "w-full max-h-24"
            )}
          />
        ))}
      </div>
    </div>
  );
}
