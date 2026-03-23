import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crop Images Online — Free, Private | images4.fun",
  description:
    "Trim images to the exact size you need. Interactive crop with preset ratios (1:1, 4:3, 16:9). Runs in your browser — no uploads, completely private.",
  keywords: [
    "crop image",
    "image cropper",
    "trim image online",
    "resize image",
    "crop photo",
    "aspect ratio crop",
    "1:1 crop",
    "16:9 crop",
    "free image cropper",
    "online crop tool",
  ],
  alternates: {
    canonical: "/crop",
  },
  openGraph: {
    type: "website",
    title: "Crop Images Online — Free, Private | images4.fun",
    description:
      "Trim images to the exact size you need. Interactive crop with preset ratios. Runs entirely in your browser.",
    url: "https://images4.fun/crop",
    siteName: "images4.fun",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crop Images Online — Free, Private | images4.fun",
    description:
      "Trim images to the exact size you need. Interactive crop with preset ratios. 100% free, runs in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CropLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
