"use client";

import { MergeProvider } from "@/context/merge-context";
import { MergeView } from "@/components/merge/merge-view";

export default function MergePage() {
  return (
    <MergeProvider>
      <MergeView />
    </MergeProvider>
  );
}
