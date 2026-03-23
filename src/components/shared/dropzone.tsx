"use client";

import { useCallback, useRef, useState } from "react";
import { clsx } from "clsx";
import { CloudUploadIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";

interface DropzoneProps {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  acceptedTypes?: string[];
  compact?: boolean;
  label?: string;
  hint?: string;
}

export function Dropzone({
  onFiles,
  multiple = false,
  acceptedTypes,
  compact = false,
  label,
  hint,
}: DropzoneProps) {
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
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) onFiles(multiple ? files : [files[0]]);
    },
    [onFiles, multiple]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) onFiles(files);
      e.target.value = "";
    },
    [onFiles]
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
          ? "border-[var(--color-brand)] bg-[var(--color-brand-light)] scale-[1.01]"
          : "border-[var(--color-edge)] bg-[var(--color-surface-raised)] hover:border-[var(--color-edge-strong)] hover:bg-[var(--color-surface)]",
        compact ? "gap-2 p-6" : "gap-4 p-16"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes?.join(",")}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      <div
        className={clsx(
          "flex items-center justify-center rounded-[10px] bg-[var(--color-surface-sunken)] transition-transform",
          isDragging && "scale-110",
          compact ? "h-10 w-10" : "h-12 w-12"
        )}
      >
        <Icon icon={CloudUploadIcon} size={compact ? 20 : 24} className="text-[var(--color-ink-muted)]" />
      </div>
      <div className="text-center">
        <p className={clsx("font-semibold text-[var(--color-ink)]", compact ? "text-sm" : "text-base")}>
          {label || (compact ? "Upload image" : "Drop your image here")}
        </p>
        {!compact && (
          <p className="mt-1 text-sm text-[var(--color-ink-faint)]">
            {hint || "or click to browse. JPEG and PNG up to 50MB."}
          </p>
        )}
      </div>
    </div>
  );
}
