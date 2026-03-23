"use client";

import { useCallback } from "react";
import { useCompressionDispatch } from "@/context/compression-context";
import { ACCEPTED_TYPES, MAX_FILE_SIZE } from "@/lib/constants";

export function useImageUpload(
  postMessage: (msg: unknown, transfer?: Transferable[]) => void
) {
  const dispatch = useCompressionDispatch();

  const upload = useCallback(
    async (file: File) => {
      // Validate type
      if (!ACCEPTED_TYPES.includes(file.type)) {
        dispatch({
          type: "SET_ERROR",
          payload: "Please upload a JPEG or PNG image.",
        });
        return;
      }

      // Validate size
      if (file.size > MAX_FILE_SIZE) {
        dispatch({
          type: "SET_ERROR",
          payload: "File too large. Maximum size is 50MB.",
        });
        return;
      }

      dispatch({ type: "SET_STATUS", payload: "decoding" });

      try {
        const arrayBuffer = await file.arrayBuffer();
        const url = URL.createObjectURL(file);

        // Store file info now; imageData will come from worker
        dispatch({
          type: "SET_ORIGINAL",
          payload: {
            file,
            url,
            imageData: null as unknown as ImageData, // will be set after decode
            width: 0,
            height: 0,
            size: file.size,
          },
        });

        // Send to worker for decode
        postMessage(
          {
            type: "decode",
            buffer: arrayBuffer,
            mimeType: file.type,
          },
          [arrayBuffer]
        );
      } catch {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to read the file.",
        });
      }
    },
    [dispatch, postMessage]
  );

  return { upload };
}
