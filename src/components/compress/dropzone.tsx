"use client";

import { useCallback, useRef, useState } from "react";
import { clsx } from "clsx";
import { CloudUploadIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { ACCEPTED_TYPES } from "@/lib/constants";

interface DropzoneProps {
  onFile: (file: File) => void;
  compact?: boolean;
}

export function Dropzone({ onFile, compact = false }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFile(file);
      // Reset input so same file can be re-selected
      e.target.value = "";
    },
    [onFile]
  );

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={clsx(
        "flex cursor-pointer flex-col items-center justify-center rounded-[12px] border-2 border-dashed transition-all duration-200",
        isDragging
          ? "border-[var(--color-brand)] bg-[var(--color-brand-light)]"
          : "border-[var(--color-edge)] bg-[var(--color-surface-raised)] hover:border-[var(--color-edge-strong)] hover:bg-[var(--color-surface)]",
        compact ? "gap-2 p-6" : "gap-4 p-16"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[var(--color-surface-sunken)]">
        <Icon icon={CloudUploadIcon} size={24} className="text-[var(--color-ink-muted)]" />
      </div>
      <div className="text-center">
        <p className={clsx("font-semibold text-[var(--color-ink)]", compact ? "text-sm" : "text-base")}>
          {compact ? "Upload new image" : "Drop your image here"}
        </p>
        {!compact && (
          <p className="mt-1 text-sm text-[var(--color-ink-faint)]">
            or click to browse. JPEG and PNG up to 50MB.
          </p>
        )}
      </div>
    </div>
  );
}
