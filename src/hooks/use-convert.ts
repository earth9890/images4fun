"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  useConvert as useConvertState,
  useConvertDispatch,
} from "@/context/convert-context";
import { useWorker } from "./use-worker";
import { loadImage, getMimeType } from "@/lib/utils";
import { ACCEPTED_TYPES_EXTENDED, MAX_FILE_SIZE, DEBOUNCE_MS } from "@/lib/constants";
import type { OutputFormat, WorkerOutMessage } from "@/lib/types";

export function useConvertPipeline() {
  const state = useConvertState();
  const dispatch = useConvertDispatch();

  const originalBufferRef = useRef<ArrayBuffer | null>(null);
  const originalMimeRef = useRef<string>("");
  const formatRef = useRef(state.outputFormat);
  formatRef.current = state.outputFormat;
  const qualityRef = useRef(state.quality);
  qualityRef.current = state.quality;
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const postMessageRef = useRef<(msg: unknown, transfer?: Transferable[]) => void>(() => {});

  const triggerConvert = useCallback(
    (format: OutputFormat, quality: number) => {
      if (!originalBufferRef.current) return;
      dispatch({ type: "SET_STATUS", payload: "converting" });

      const bufferCopy = originalBufferRef.current.slice(0);
      postMessageRef.current(
        {
          type: "convert",
          buffer: bufferCopy,
          mimeType: originalMimeRef.current,
          targetFormat: format,
          quality,
        },
        [bufferCopy]
      );
    },
    [dispatch]
  );

  const onWorkerMessage = useCallback(
    (msg: WorkerOutMessage) => {
      if (msg.type === "converted") {
        const mimeType = getMimeType(formatRef.current);
        const blob = new Blob([msg.buffer], { type: mimeType });
        const url = URL.createObjectURL(blob);
        dispatch({
          type: "SET_RESULT",
          payload: { blob, url, size: blob.size, timeTakenMs: msg.timeTakenMs },
        });
      } else if (msg.type === "error") {
        dispatch({ type: "SET_ERROR", payload: msg.message });
      }
    },
    [dispatch]
  );

  const { postMessage } = useWorker(onWorkerMessage);
  postMessageRef.current = postMessage;

  const upload = useCallback(
    async (file: File) => {
      if (!ACCEPTED_TYPES_EXTENDED.includes(file.type)) {
        dispatch({ type: "SET_ERROR", payload: "Please upload a JPEG, PNG, or WebP image." });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        dispatch({ type: "SET_ERROR", payload: "File too large. Maximum size is 50MB." });
        return;
      }

      try {
        const [{ url, width, height }, arrayBuffer] = await Promise.all([
          loadImage(file),
          file.arrayBuffer(),
        ]);

        // Detect input format
        const formatMap: Record<string, string> = {
          "image/jpeg": "JPEG",
          "image/png": "PNG",
          "image/webp": "WebP",
        };

        originalBufferRef.current = arrayBuffer;
        originalMimeRef.current = file.type;

        dispatch({
          type: "SET_ORIGINAL",
          payload: {
            file,
            url,
            width: width,
            height: height,
            size: file.size,
            format: formatMap[file.type] || "Unknown",
          },
        });

        // Auto-convert immediately
        triggerConvert(formatRef.current, qualityRef.current);
      } catch {
        dispatch({ type: "SET_ERROR", payload: "Failed to read the file." });
      }
    },
    [dispatch, triggerConvert]
  );

  // Debounced re-convert on format/quality change
  const prevFormatRef = useRef(state.outputFormat);
  const prevQualityRef = useRef(state.quality);
  useEffect(() => {
    if (!originalBufferRef.current || !state.original) return;
    if (prevFormatRef.current === state.outputFormat && prevQualityRef.current === state.quality) return;

    prevFormatRef.current = state.outputFormat;
    prevQualityRef.current = state.quality;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      triggerConvert(state.outputFormat, state.quality);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [state.outputFormat, state.quality, state.original, triggerConvert]);

  const reset = useCallback(() => {
    originalBufferRef.current = null;
    originalMimeRef.current = "";
    if (debounceRef.current) clearTimeout(debounceRef.current);
    dispatch({ type: "RESET" });
  }, [dispatch]);

  return { state, dispatch, upload, reset };
}
