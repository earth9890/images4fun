import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge Images Online — Free, Private | images4.fun",
  description:
    "Combine multiple images into one. Horizontal, vertical, or grid layouts. Drag to reorder, adjust spacing. Runs in your browser — no uploads, 100% private.",
  alternates: {
    canonical: "/merge",
  },
  openGraph: {
    title: "Merge Images Online — Free, Private | images4.fun",
    description:
      "Combine multiple images into one. Horizontal, vertical, or grid layouts. Runs entirely in your browser.",
    url: "https://images4.fun/merge",
  },
};

export default function MergeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
