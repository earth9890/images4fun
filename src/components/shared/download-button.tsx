"use client";

import { useCallback } from "react";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

interface DownloadButtonProps {
  blob: Blob;
  fileName: string;
}

export function DownloadButton({ blob, fileName }: DownloadButtonProps) {
  const handleDownload = useCallback(() => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [blob, fileName]);

  return (
    <Button onClick={handleDownload}>
      <Icon icon={Download01Icon} size={16} className="text-white" />
      Download
    </Button>
  );
}
