"use client";

import { useCallback } from "react";
import { Dropzone } from "@/components/shared/dropzone";
import { DownloadButton } from "@/components/shared/download-button";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ToolLayout } from "@/components/layout/tool-layout";
import { ImageList } from "./image-list";
import { MergeControls } from "./merge-controls";
import { MergePreview } from "./merge-preview";
import { useMergePipeline } from "@/hooks/use-merge";
import { ACCEPTED_TYPES, MAX_MERGE_IMAGES } from "@/lib/constants";
import { formatBytes } from "@/lib/utils";

export function MergeView() {
  const { state, dispatch, addImages, removeImage, reorderImages, merge, reset } =
    useMergePipeline();
  const { images, layout, gap, bgColor, result, status, error } = state;

  const handleFiles = useCallback(
    (files: File[]) => {
      addImages(files);
    },
    [addImages]
  );

  // No images — show dropzone
  if (images.length === 0) {
    return (
      <ToolLayout>
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-full max-w-xl">
            <Dropzone
              onFiles={handleFiles}
              multiple
              acceptedTypes={ACCEPTED_TYPES}
              label="Drop your images here"
              hint={`or click to browse. Up to ${MAX_MERGE_IMAGES} images.`}
            />
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
              alt="Merged"
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
            <DownloadButton blob={result.blob} fileName="merged.png" />
            <Button variant="ghost" onClick={reset}>
              New merge
            </Button>
          </div>
        </div>
      </ToolLayout>
    );
  }

  // Has images — show merge interface
  return (
    <ToolLayout>
      <div className="flex flex-col gap-6 animate-fade-in">
        {status === "merging" && (
          <div className="flex items-center justify-center py-10">
            <Spinner />
            <span className="ml-3 text-sm text-[var(--color-ink-muted)]">Merging images...</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-4">
            <ImageList
              images={images}
              onRemove={removeImage}
              onReorder={reorderImages}
            />

            {images.length < MAX_MERGE_IMAGES && (
              <Dropzone
                onFiles={handleFiles}
                multiple
                acceptedTypes={ACCEPTED_TYPES}
                compact
                label="Add more images"
              />
            )}

            <MergePreview
              images={images}
              layout={layout}
              gap={gap}
              bgColor={bgColor}
            />
          </div>

          <MergeControls
            layout={layout}
            gap={gap}
            bgColor={bgColor}
            imageCount={images.length}
            onLayoutChange={(l) => dispatch({ type: "SET_LAYOUT", payload: l })}
            onGapChange={(g) => dispatch({ type: "SET_GAP", payload: g })}
            onBgColorChange={(c) => dispatch({ type: "SET_BG_COLOR", payload: c })}
            onMerge={merge}
            onReset={reset}
            isMerging={status === "merging"}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </ToolLayout>
  );
}
