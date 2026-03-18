"use client";

import { useCallback } from "react";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { getExtension } from "@/lib/utils";

interface DownloadButtonProps {
  blob: Blob;
  originalName: string;
  format: string;
}

export function DownloadButton({
  blob,
  originalName,
  format,
}: DownloadButtonProps) {
  const handleDownload = useCallback(() => {
    const ext = getExtension(format);
    const baseName = originalName.replace(/\.[^.]+$/, "");
    const fileName = `${baseName}-compressed.${ext}`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [blob, originalName, format]);

  return (
    <Button onClick={handleDownload}>
      <Icon icon={Download01Icon} size={16} className="text-white" />
      Download
    </Button>
  );
}
