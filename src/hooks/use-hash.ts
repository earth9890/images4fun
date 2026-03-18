"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

function getHash() {
  if (typeof window === "undefined") return "";
  return window.location.hash;
}

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

export function useHash() {
  const hash = useSyncExternalStore(subscribe, getHash, () => "");

  const setHash = useCallback((newHash: string) => {
    window.location.hash = newHash;
  }, []);

  return [hash, setHash] as const;
}
