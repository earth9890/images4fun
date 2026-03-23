import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Images Online — Free, Private | images4.fun",
  description:
    "Reduce image file size without losing quality. Compress JPEG, PNG to WebP or AVIF. Runs in your browser — no uploads, no servers, 100% private.",
  keywords: [
    "compress image",
    "image compressor",
    "reduce image size",
    "compress JPEG",
    "compress PNG",
    "convert to WebP",
    "convert to AVIF",
    "online image compression",
    "free image compressor",
    "browser image compression",
  ],
  alternates: {
    canonical: "/compress",
  },
  openGraph: {
    type: "website",
    title: "Compress Images Online — Free, Private | images4.fun",
    description:
      "Reduce image file size without losing quality. Compress JPEG, PNG to WebP or AVIF. Runs entirely in your browser.",
    url: "https://images4.fun/compress",
    siteName: "images4.fun",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Images Online — Free, Private | images4.fun",
    description:
      "Reduce image file size without losing quality. Compress JPEG, PNG to WebP or AVIF. 100% free, runs in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CompressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
