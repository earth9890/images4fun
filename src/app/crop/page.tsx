"use client";

import { CropProvider } from "@/context/crop-context";
import { CropView } from "@/components/crop/crop-view";

export default function CropPage() {
  return (
    <CropProvider>
      <CropView />
    </CropProvider>
  );
}
