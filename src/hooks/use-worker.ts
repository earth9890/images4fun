"use client";

import { useEffect, useRef, useCallback } from "react";
import type { WorkerOutMessage } from "@/lib/types";

export function useWorker(onMessage: (msg: WorkerOutMessage) => void) {
  const workerRef = useRef<Worker | null>(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/compression.worker.ts", import.meta.url),
      { type: "module" }
    );

    worker.onmessage = (e: MessageEvent<WorkerOutMessage>) => {
      onMessageRef.current(e.data);
    };

    worker.onerror = (err) => {
      onMessageRef.current({
        type: "error",
        message: err.message || "Worker error",
      });
    };

    workerRef.current = worker;

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const postMessage = useCallback(
    (msg: unknown, transfer?: Transferable[]) => {
      workerRef.current?.postMessage(msg, transfer || []);
    },
    []
  );

  return { postMessage };
}
