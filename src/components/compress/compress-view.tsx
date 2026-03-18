"use client";

import { useCallback } from "react";
import { Dropzone } from "@/components/shared/dropzone";
import { CompressionControls } from "./compression-controls";
import { ImagePreview } from "./image-preview";
import { CompressionStats } from "./compression-stats";
import { DownloadButton } from "./download-button";
import { ComparisonView } from "./comparison-view";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ToolLayout } from "@/components/layout/tool-layout";
import { useCompressionPipeline } from "@/hooks/use-compression";
import { ACCEPTED_TYPES } from "@/lib/constants";

interface CompressViewProps {
  showCompare: boolean;
}

export function CompressView({ showCompare }: CompressViewProps) {
  const { state, dispatch, upload, reset } = useCompressionPipeline();
  const { original, result, settings, status, error } = state;

  const hasImage = !!original && original.width > 0;

  const handleFiles = useCallback(
    (files: File[]) => {
      if (files[0]) upload(files[0]);
    },
    [upload]
  );

  // Compare view
  if (showCompare && original && result) {
    return (
      <ToolLayout>
        <ComparisonView original={original} result={result} />
      </ToolLayout>
    );
  }

  // No image — show large dropzone
  if (!hasImage) {
    return (
      <ToolLayout>
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-full max-w-xl">
            <Dropzone onFiles={handleFiles} acceptedTypes={ACCEPTED_TYPES} />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>
      </ToolLayout>
    );
  }

  // Has image — show preview + controls + stats
  return (
    <ToolLayout>
      <div className="flex flex-col gap-6">
        {/* Preview + Controls */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-4">
            {status === "decoding" && (
              <div className="flex items-center justify-center rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-sunken)] py-20">
                <Spinner />
                <span className="ml-3 text-sm text-[var(--color-ink-muted)]">Decoding image...</span>
              </div>
            )}
            {status === "compressing" && !result && (
              <div className="flex items-center justify-center rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-sunken)] py-20">
                <Spinner />
                <span className="ml-3 text-sm text-[var(--color-ink-muted)]">Compressing...</span>
              </div>
            )}
            {result && <ImagePreview src={result.url} alt="Compressed preview" />}
            {status === "compressing" && result && (
              <p className="text-center text-xs text-[var(--color-ink-faint)]">
                Recompressing...
              </p>
            )}
          </div>

          <CompressionControls
            settings={settings}
            onChange={(partial) =>
              dispatch({ type: "SET_SETTINGS", payload: partial })
            }
          />
        </div>

        {/* Stats + Actions */}
        {result && (
          <div className="flex flex-col gap-4">
            <CompressionStats
              originalSize={original.size}
              compressedSize={result.size}
              timeTakenMs={result.timeTakenMs}
              originalDimensions={{
                width: original.width,
                height: original.height,
              }}
              compressedDimensions={{
                width: result.width,
                height: result.height,
              }}
            />
            <div className="flex items-center justify-between">
              <DownloadButton
                blob={result.blob}
                originalName={original.file.name}
                format={settings.format}
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
