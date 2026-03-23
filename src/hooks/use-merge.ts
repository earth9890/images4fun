"use client";

import { useCallback } from "react";
import { useMerge as useMergeState, useMergeDispatch } from "@/context/merge-context";
import { loadImage, generateId } from "@/lib/utils";
import { ACCEPTED_TYPES, MAX_FILE_SIZE, MAX_MERGE_IMAGES } from "@/lib/constants";
import type { MergeImage } from "@/lib/types";

export function useMergePipeline() {
  const state = useMergeState();
  const dispatch = useMergeDispatch();

  const addImages = useCallback(
    async (files: File[]) => {
      const remaining = MAX_MERGE_IMAGES - state.images.length;
      if (remaining <= 0) {
        dispatch({ type: "SET_ERROR", payload: `Maximum ${MAX_MERGE_IMAGES} images allowed.` });
        return;
      }

      const toProcess = files.slice(0, remaining);
      const loaded: MergeImage[] = [];

      for (const file of toProcess) {
        if (!ACCEPTED_TYPES.includes(file.type)) continue;
        if (file.size > MAX_FILE_SIZE) continue;

        try {
          const { url, width, height } = await loadImage(file);
          loaded.push({ id: generateId(), file, url, width, height, size: file.size });
        } catch {
          // Skip invalid files
        }
      }

      if (loaded.length > 0) {
        dispatch({ type: "ADD_IMAGES", payload: loaded });
      }
    },
    [state.images.length, dispatch]
  );

  const removeImage = useCallback(
    (id: string) => {
      dispatch({ type: "REMOVE_IMAGE", payload: id });
    },
    [dispatch]
  );

  const reorderImages = useCallback(
    (images: MergeImage[]) => {
      dispatch({ type: "REORDER_IMAGES", payload: images });
    },
    [dispatch]
  );

  const merge = useCallback(async () => {
    if (state.images.length < 2) {
      dispatch({ type: "SET_ERROR", payload: "Need at least 2 images to merge." });
      return;
    }

    dispatch({ type: "SET_STATUS", payload: "merging" });

    try {
      // Load all images
      const imgs: HTMLImageElement[] = await Promise.all(
        state.images.map(
          (img) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const el = new Image();
              el.onload = () => resolve(el);
              el.onerror = () => reject(new Error("Failed to load"));
              el.src = img.url;
            })
        )
      );

      const { layout, gap, bgColor } = state;
      let canvasW: number;
      let canvasH: number;

      if (layout === "horizontal") {
        canvasW = state.images.reduce((sum, img) => sum + img.width, 0) + gap * (state.images.length - 1);
        canvasH = Math.max(...state.images.map((img) => img.height));
      } else if (layout === "vertical") {
        canvasW = Math.max(...state.images.map((img) => img.width));
        canvasH = state.images.reduce((sum, img) => sum + img.height, 0) + gap * (state.images.length - 1);
      } else {
        // Grid: calculate column count based on image count
        const cols = Math.ceil(Math.sqrt(state.images.length));
        const rows = Math.ceil(state.images.length / cols);
        const maxW = Math.max(...state.images.map((img) => img.width));
        const maxH = Math.max(...state.images.map((img) => img.height));
        canvasW = cols * maxW + (cols - 1) * gap;
        canvasH = rows * maxH + (rows - 1) * gap;
      }

      const canvas = document.createElement("canvas");
      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext("2d")!;

      // Fill background
      if (bgColor === "transparent") {
        ctx.clearRect(0, 0, canvasW, canvasH);
      } else {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvasW, canvasH);
      }

      // Draw images
      if (layout === "horizontal") {
        let x = 0;
        imgs.forEach((el, i) => {
          const img = state.images[i];
          ctx.drawImage(el, x, 0, img.width, img.height);
          x += img.width + gap;
        });
      } else if (layout === "vertical") {
        let y = 0;
        imgs.forEach((el, i) => {
          const img = state.images[i];
          ctx.drawImage(el, 0, y, img.width, img.height);
          y += img.height + gap;
        });
      } else {
        const cols = Math.ceil(Math.sqrt(state.images.length));
        const maxW = Math.max(...state.images.map((img) => img.width));
        const maxH = Math.max(...state.images.map((img) => img.height));
        imgs.forEach((el, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = col * (maxW + gap);
          const y = row * (maxH + gap);
          ctx.drawImage(el, x, y, state.images[i].width, state.images[i].height);
        });
      }

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Failed to export"))),
          "image/png"
        );
      });

      const url = URL.createObjectURL(blob);
      dispatch({
        type: "SET_RESULT",
        payload: { blob, url, width: canvasW, height: canvasH, size: blob.size },
      });
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Failed to merge images." });
    }
  }, [state, dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  return { state, dispatch, addImages, removeImage, reorderImages, merge, reset };
}
