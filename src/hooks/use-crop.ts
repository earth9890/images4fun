"use client";

import { useCallback } from "react";
import { useCrop as useCropState, useCropDispatch } from "@/context/crop-context";
import { loadImage, getMimeType } from "@/lib/utils";
import { ACCEPTED_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import type { CropRegion } from "@/lib/types";

export function useCropPipeline() {
  const state = useCropState();
  const dispatch = useCropDispatch();

  const upload = useCallback(
    async (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        dispatch({ type: "SET_ERROR", payload: "Please upload a JPEG or PNG image." });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        dispatch({ type: "SET_ERROR", payload: "File too large. Maximum size is 50MB." });
        return;
      }

      try {
        const { url, width, height } = await loadImage(file);
        dispatch({
          type: "SET_ORIGINAL",
          payload: { file, url, width, height, size: file.size },
        });
      } catch {
        dispatch({ type: "SET_ERROR", payload: "Failed to load image." });
      }
    },
    [dispatch]
  );

  const updateCropRegion = useCallback(
    (region: CropRegion) => {
      dispatch({ type: "SET_CROP_REGION", payload: region });
    },
    [dispatch]
  );

  const applyCrop = useCallback(async () => {
    if (!state.original) return;

    dispatch({ type: "SET_STATUS", payload: "cropping" });

    try {
      const img = new Image();
      img.src = state.original.url;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
      });

      const { x, y, w, h } = state.cropRegion;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w);
      canvas.height = Math.round(h);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, Math.round(x), Math.round(y), Math.round(w), Math.round(h), 0, 0, Math.round(w), Math.round(h));

      const mimeType = getMimeType(state.outputFormat);
      const quality = state.outputFormat === "png" ? undefined : state.quality / 100;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Failed to create blob"))),
          mimeType,
          quality
        );
      });

      const url = URL.createObjectURL(blob);
      dispatch({
        type: "SET_RESULT",
        payload: { blob, url, width: Math.round(w), height: Math.round(h), size: blob.size },
      });
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Failed to crop image." });
    }
  }, [state.original, state.cropRegion, state.outputFormat, state.quality, dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  return { state, dispatch, upload, updateCropRegion, applyCrop, reset };
}
