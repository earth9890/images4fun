"use client";

import { useCallback } from "react";
import { Dropzone } from "@/components/shared/dropzone";
import { DownloadButton } from "@/components/shared/download-button";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ToolLayout } from "@/components/layout/tool-layout";
import { ConvertControls } from "./convert-controls";
import { ConvertStats } from "./convert-stats";
import { useConvertPipeline } from "@/hooks/use-convert";
import { ACCEPTED_TYPES_EXTENDED } from "@/lib/constants";
import { getExtension } from "@/lib/utils";

export function ConvertView() {
  const { state, dispatch, upload, reset } = useConvertPipeline();
  const { original, outputFormat, quality, result, status, error } = state;

  const handleFiles = useCallback(
    (files: File[]) => {
      if (files[0]) upload(files[0]);
    },
    [upload]
  );

  // No image — show dropzone
  if (!original) {
    return (
      <ToolLayout>
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-full max-w-xl">
            <Dropzone
              onFiles={handleFiles}
              acceptedTypes={ACCEPTED_TYPES_EXTENDED}
              hint="or click to browse. JPEG, PNG, and WebP up to 50MB."
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Preview / Loading */}
          <div className="flex flex-col gap-4">
            {status === "converting" && !result && (
              <div className="flex items-center justify-center rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-sunken)] py-20">
                <Spinner />
                <span className="ml-3 text-sm text-[var(--color-ink-muted)]">Converting...</span>
              </div>
            )}

            {result && (
              <div className="overflow-hidden rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-sunken)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.url}
                  alt="Converted"
                  className="h-auto max-h-[400px] w-full object-contain"
                />
              </div>
            )}

            {status === "converting" && result && (
              <p className="text-center text-xs text-[var(--color-ink-faint)]">Re-converting...</p>
            )}
          </div>

          {/* Controls */}
          <ConvertControls
            inputFormat={original.format}
            outputFormat={outputFormat}
            quality={quality}
            onFormatChange={(f) => dispatch({ type: "SET_OUTPUT_FORMAT", payload: f })}
            onQualityChange={(q) => dispatch({ type: "SET_QUALITY", payload: q })}
          />
        </div>

        {/* Stats + Download */}
        {result && (
          <div className="flex flex-col gap-4">
            <ConvertStats
              originalSize={original.size}
              convertedSize={result.size}
              inputFormat={original.format}
              outputFormat={outputFormat}
              timeTakenMs={result.timeTakenMs}
            />
            <div className="flex items-center justify-between">
              <DownloadButton
                blob={result.blob}
                fileName={`${original.file.name.replace(/\.[^.]+$/, "")}.${getExtension(outputFormat)}`}
              />
              <Button variant="ghost" onClick={reset}>
                New image
              </Button>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </ToolLayout>
  );
}
