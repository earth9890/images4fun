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
import { ToolContent } from "@/components/shared/tool-content";

const CONVERT_CONTENT = {
  title: "Convert images online — free, private, no upload",
  description:
    "Convert between JPEG, PNG, WebP, and AVIF formats instantly in your browser. Our converter uses WebAssembly-powered codecs to decode and re-encode your images at the quality level you choose. See a real-time file size comparison so you can pick the optimal format. Your images are never uploaded to any server.",
  steps: [
    "Upload a JPEG, PNG, or WebP image by dragging it onto the upload area or clicking to browse. Files up to 50MB are supported.",
    "Select your target output format — JPEG for broad compatibility, PNG for lossless quality, WebP for excellent size-quality balance, or AVIF for maximum compression.",
    "For lossy formats (JPEG, WebP, AVIF), adjust the quality slider to control the size-quality trade-off. PNG is always lossless.",
    "View the conversion results — including a file size comparison showing how much larger or smaller the converted file is compared to the original.",
    "Download the converted image with one click. The file is generated entirely on your device.",
  ],
  faqs: [
    {
      q: "Which format produces the smallest file?",
      a: "AVIF typically produces the smallest files, followed by WebP, then JPEG, then PNG. AVIF can be 30-50% smaller than JPEG at equivalent visual quality. However, AVIF has less browser support than WebP.",
    },
    {
      q: "When should I use PNG instead of JPEG?",
      a: "Use PNG for images that need transparency, screenshots, diagrams, text-heavy images, or anything that requires pixel-perfect quality. Use JPEG for photographs where small compression artifacts are acceptable.",
    },
    {
      q: "What is WebP and why should I use it?",
      a: "WebP is a modern image format developed by Google. It provides 25-34% better compression than JPEG at equivalent quality, supports both lossy and lossless compression, and supports transparency. It is supported by all modern browsers.",
    },
    {
      q: "Is AVIF supported by all browsers?",
      a: "AVIF is supported by Chrome, Firefox, and Safari (from version 16.4). Edge and Opera also support it. For maximum compatibility, WebP or JPEG are safer choices.",
    },
  ],
};

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
          <ToolContent {...CONVERT_CONTENT} />
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
