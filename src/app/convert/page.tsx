"use client";

import { ConvertProvider } from "@/context/convert-context";
import { ConvertView } from "@/components/convert/convert-view";

export default function ConvertPage() {
  return (
    <ConvertProvider>
      <ConvertView />
    </ConvertProvider>
  );
}
