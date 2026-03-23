import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge Images Online — Free, Private | images4.fun",
  description:
    "Combine multiple images into one. Horizontal, vertical, or grid layouts. Drag to reorder, adjust spacing. Runs in your browser — no uploads, 100% private.",
  keywords: [
    "merge images",
    "combine images",
    "image merger",
    "join images",
    "collage maker",
    "stitch images",
    "side by side images",
    "image grid",
    "free image merger",
    "online merge tool",
  ],
  alternates: {
    canonical: "/merge",
  },
  openGraph: {
    type: "website",
    title: "Merge Images Online — Free, Private | images4.fun",
    description:
      "Combine multiple images into one. Horizontal, vertical, or grid layouts. Runs entirely in your browser.",
    url: "https://images4.fun/merge",
    siteName: "images4.fun",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge Images Online — Free, Private | images4.fun",
    description:
      "Combine multiple images into one. Horizontal, vertical, or grid layouts. 100% free, runs in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MergeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
