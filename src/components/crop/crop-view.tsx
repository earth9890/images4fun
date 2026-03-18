"use client";

import { useCallback } from "react";
import { Dropzone } from "@/components/shared/dropzone";
import { DownloadButton } from "@/components/shared/download-button";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ToolLayout } from "@/components/layout/tool-layout";
import { CropCanvas } from "./crop-canvas";
import { CropControls } from "./crop-controls";
import { useCropPipeline } from "@/hooks/use-crop";
import { ACCEPTED_TYPES } from "@/lib/constants";
import { formatBytes, getExtension } from "@/lib/utils";
import type { AspectRatio } from "@/lib/types";

export function CropView() {
  const { state, dispatch, upload, updateCropRegion, applyCrop, reset } = useCropPipeline();
  const { original, cropRegion, aspectRatio, outputFormat, quality, result, status, error } = state;

  const handleFiles = useCallback(
    (files: File[]) => {
      if (files[0]) upload(files[0]);
    },
    [upload]
  );

  const handleAspectRatioChange = useCallback(
    (ratio: AspectRatio) => {
      dispatch({ type: "SET_ASPECT_RATIO", payload: ratio });
      if (original && ratio !== "free") {
        const ratioMap: Record<string, number> = {
          "1:1": 1,
          "4:3": 4 / 3,
          "3:2": 3 / 2,
          "16:9": 16 / 9,
        };
        const r = ratioMap[ratio];
        if (r) {
          let w = cropRegion.w;
          let h = w / r;
          if (h > original.height) {
            h = original.height;
            w = h * r;
          }
          if (w > original.width) {
            w = original.width;
            h = w / r;
          }
          updateCropRegion({ x: cropRegion.x, y: cropRegion.y, w, h });
        }
      }
    },
    [dispatch, original, cropRegion, updateCropRegion]
  );

  // No image — show dropzone
  if (!original) {
    return (
      <ToolLayout>
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-full max-w-xl">
            <Dropzone onFiles={handleFiles} acceptedTypes={ACCEPTED_TYPES} />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </ToolLayout>
    );
  }

  // Done — show result
  if (status === "done" && result) {
    return (
      <ToolLayout>
        <div className="flex flex-col gap-6 animate-fade-in">
          <div className="overflow-hidden rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-sunken)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.url}
              alt="Cropped"
              className="h-auto max-h-[500px] w-full object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-[12px] border border-[var(--color-edge)] bg-[var(--color-surface-raised)] px-5 py-4 text-sm">
            <div className="text-[var(--color-ink-muted)]">
              {result.width} &times; {result.height} px
            </div>
            <div className="font-semibold text-[var(--color-ink)]">
              {formatBytes(result.size)}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <DownloadButton
              blob={result.blob}
              fileName={`${original.file.name.replace(/\.[^.]+$/, "")}-cropped.${getExtension(outputFormat)}`}
            />
            <Button variant="ghost" onClick={reset}>
              New image
            </Button>
          </div>
        </div>
      </ToolLayout>
    );
  }

  const isCropping = status === "cropping";

  // Has image — show crop interface
  return (
    <ToolLayout>
      <div className="flex flex-col gap-6 animate-fade-in">
        {isCropping ? (
          <div className="flex items-center justify-center py-20">
            <Spinner />
            <span className="ml-3 text-sm text-[var(--color-ink-muted)]">Cropping...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            <CropCanvas
              imageUrl={original.url}
              imageWidth={original.width}
              imageHeight={original.height}
              cropRegion={cropRegion}
              aspectRatio={aspectRatio}
              onCropChange={updateCropRegion}
            />
            <CropControls
              cropRegion={cropRegion}
              aspectRatio={aspectRatio}
              outputFormat={outputFormat}
              quality={quality}
              onAspectRatioChange={handleAspectRatioChange}
              onFormatChange={(f) => dispatch({ type: "SET_OUTPUT_FORMAT", payload: f })}
              onQualityChange={(q) => dispatch({ type: "SET_QUALITY", payload: q })}
              onApply={applyCrop}
              onReset={reset}
              isCropping={isCropping}
            />
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </ToolLayout>
  );
}
