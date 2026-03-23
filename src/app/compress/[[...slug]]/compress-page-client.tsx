"use client";

import { useState, useEffect } from "react";
import { CompressionProvider } from "@/context/compression-context";
import { CompressView } from "@/components/compress/compress-view";

interface CompressPageClientProps {
  initialCompare: boolean;
}

export function CompressPageClient({ initialCompare }: CompressPageClientProps) {
  const [showCompare, setShowCompare] = useState(initialCompare);

  useEffect(() => {
    const handlePopState = () => {
      setShowCompare(window.location.pathname === "/compress/compare");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <CompressionProvider>
      <CompressView showCompare={showCompare} />
    </CompressionProvider>
  );
}
