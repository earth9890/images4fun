"use client";

import { useCallback, useRef, useState } from "react";
import { clsx } from "clsx";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { formatBytes } from "@/lib/utils";
import type { MergeImage } from "@/lib/types";

interface ImageListProps {
  images: MergeImage[];
  onRemove: (id: string) => void;
  onReorder: (images: MergeImage[]) => void;
}

export function ImageList({ images, onRemove, onReorder }: ImageListProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    dragItem.current = index;
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      setOverIndex(index);
    },
    []
  );

  const handleDrop = useCallback(
    (index: number) => {
      if (dragItem.current === null || dragItem.current === index) {
        setDragIndex(null);
        setOverIndex(null);
        return;
      }

      const reordered = [...images];
      const [removed] = reordered.splice(dragItem.current, 1);
      reordered.splice(index, 0, removed);
      onReorder(reordered);

      dragItem.current = null;
      setDragIndex(null);
      setOverIndex(null);
    },
    [images, onReorder]
  );

  const handleDragEnd = useCallback(() => {
    dragItem.current = null;
    setDragIndex(null);
    setOverIndex(null);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {images.map((img, i) => (
        <div
          key={img.id}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={() => handleDrop(i)}
          onDragEnd={handleDragEnd}
          className={clsx(
            "flex items-center gap-3 rounded-[10px] border bg-[var(--color-surface-raised)] p-2 transition-all cursor-grab active:cursor-grabbing",
            dragIndex === i && "opacity-40",
            overIndex === i && dragIndex !== i && "border-[var(--color-tool-merge)]",
            overIndex !== i && "border-[var(--color-edge)]"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.url}
            alt={img.file.name}
            className="h-12 w-12 rounded-[6px] object-cover bg-[var(--color-surface-sunken)]"
          />
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--color-ink)]">
              {img.file.name}
            </p>
            <p className="text-xs text-[var(--color-ink-faint)]">
              {img.width}&times;{img.height} &middot; {formatBytes(img.size)}
            </p>
          </div>
          <button
            onClick={() => onRemove(img.id)}
            className="shrink-0 rounded-[6px] p-1 text-[var(--color-ink-faint)] hover:bg-[var(--color-surface-sunken)] hover:text-[var(--color-ink-muted)] transition-colors"
          >
            <Icon icon={Cancel01Icon} size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
