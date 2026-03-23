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
import { ToolContent } from "@/components/shared/tool-content";

const COMPRESS_CONTENT = {
  title: "Compress images online — free, private, no upload",
  description:
    "Reduce the file size of your JPEG and PNG images without losing visible quality. Our image compressor runs entirely in your browser using WebAssembly-powered codecs. Your photos are never uploaded to any server — processing is instant and completely private.",
  steps: [
    "Drag and drop your image onto the upload area, or click to browse your files. We accept JPEG and PNG images up to 50MB.",
    "Choose your output format (JPEG, WebP, or AVIF) and adjust the quality slider. Lower quality means smaller files, but the visual difference is often imperceptible above 60%.",
    "Optionally enable resizing to set maximum width and height dimensions. The aspect ratio is always preserved.",
    "View the compression results — file size reduction, dimensions, and processing time. Use the Compare tab to see a side-by-side before-and-after view.",
    "Download your compressed image with one click. No watermarks, no sign-up required.",
  ],
  faqs: [
    {
      q: "Which format should I choose for the smallest file size?",
      a: "AVIF generally produces the smallest files at equivalent quality, followed by WebP, then JPEG. However, AVIF encoding is slower and not supported by all browsers yet. WebP is a great balance of size and compatibility.",
    },
    {
      q: "Will compressing my image reduce its quality?",
      a: "At quality levels above 70%, the visual difference is usually imperceptible to the human eye. You can use the Compare feature to see a pixel-level before-and-after comparison.",
    },
    {
      q: "What happens to my original image?",
      a: "Nothing — your original file is never modified. The compressed version is generated as a new file. Your original stays exactly as it was on your device.",
    },
    {
      q: "Can I compress multiple images at once?",
      a: "Currently, the compressor processes one image at a time. This allows you to fine-tune quality settings for each image individually.",
    },
  ],
};

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
          <ToolContent {...COMPRESS_CONTENT} />
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
