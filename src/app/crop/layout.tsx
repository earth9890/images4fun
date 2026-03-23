import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crop Images Online — Free, Private | images4.fun",
  description:
    "Trim images to the exact size you need. Interactive crop with preset ratios (1:1, 4:3, 16:9). Runs in your browser — no uploads, completely private.",
  alternates: {
    canonical: "/crop",
  },
  openGraph: {
    title: "Crop Images Online — Free, Private | images4.fun",
    description:
      "Trim images to the exact size you need. Interactive crop with preset ratios. Runs entirely in your browser.",
    url: "https://images4.fun/crop",
  },
};

export default function CropLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
