"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  useCompression as useCompressionState,
  useCompressionDispatch,
} from "@/context/compression-context";
import { useWorker } from "./use-worker";
import { useImageUpload } from "./use-image-upload";
import { DEBOUNCE_MS } from "@/lib/constants";
import { getMimeType } from "@/lib/utils";
import type { CompressionSettings, WorkerOutMessage } from "@/lib/types";

export function useCompressionPipeline() {
  const state = useCompressionState();
  const dispatch = useCompressionDispatch();

  // Refs for values needed in worker callback without stale closures
  const imageDataRef = useRef<{
    data: ArrayBuffer;
    width: number;
    height: number;
  } | null>(null);
  const originalRef = useRef(state.original);
  originalRef.current = state.original;
  const settingsRef = useRef(state.settings);
  settingsRef.current = state.settings;
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const postMessageRef = useRef<(msg: unknown, transfer?: Transferable[]) => void>(() => {});

  const triggerCompress = useCallback((settings: CompressionSettings) => {
    if (!imageDataRef.current) return;
    dispatch({ type: "SET_STATUS", payload: "compressing" });

    const dataCopy = imageDataRef.current.data.slice(0);
    postMessageRef.current(
      {
        type: "compress",
        imageData: {
          data: dataCopy,
          width: imageDataRef.current.width,
          height: imageDataRef.current.height,
        },
        settings,
      },
      [dataCopy]
    );
  }, [dispatch]);

  const onWorkerMessage = useCallback(
    (msg: WorkerOutMessage) => {
      if (msg.type === "decoded") {
        // The buffer was transferred so we need to make a copy to keep
        const bufferCopy = msg.imageData.data.slice(0);
        imageDataRef.current = {
          data: bufferCopy,
          width: msg.imageData.width,
          height: msg.imageData.height,
        };

        // Update original with decoded dimensions
        const original = originalRef.current;
        if (original) {
          dispatch({
            type: "SET_ORIGINAL",
            payload: {
              ...original,
              width: msg.imageData.width,
              height: msg.imageData.height,
              imageData: new ImageData(
                new Uint8ClampedArray(bufferCopy.byteLength),
                msg.imageData.width,
                msg.imageData.height
              ),
            },
          });
        }

        // Trigger initial compression
        triggerCompress(settingsRef.current);
      } else if (msg.type === "compressed") {
        const mimeType = getMimeType(settingsRef.current.format);
        const blob = new Blob([msg.buffer], { type: mimeType });
        const url = URL.createObjectURL(blob);

        dispatch({
          type: "SET_RESULT",
          payload: {
            blob,
            url,
            width: msg.width,
            height: msg.height,
            size: blob.size,
            timeTakenMs: msg.timeTakenMs,
          },
        });
      } else if (msg.type === "error") {
        dispatch({ type: "SET_ERROR", payload: msg.message });
      }
    },
    [dispatch, triggerCompress]
  );

  const { postMessage } = useWorker(onWorkerMessage);
  postMessageRef.current = postMessage;

  const { upload } = useImageUpload(postMessage);

  // Debounced recompression on settings change
  const prevSettingsRef = useRef(state.settings);
  useEffect(() => {
    if (!imageDataRef.current || state.status === "decoding" || !state.original) {
      prevSettingsRef.current = state.settings;
      return;
    }

    if (prevSettingsRef.current === state.settings) return;
    prevSettingsRef.current = state.settings;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      triggerCompress(state.settings);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [state.settings, state.original, state.status, triggerCompress]);

  const reset = useCallback(() => {
    imageDataRef.current = null;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    dispatch({ type: "RESET" });
  }, [dispatch]);

  return {
    state,
    dispatch,
    upload,
    reset,
  };
}
