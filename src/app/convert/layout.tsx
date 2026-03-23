import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Images Online — Free, Private | images4.fun",
  description:
    "Convert between JPEG, PNG, WebP, and AVIF instantly. See file size comparison in real-time. Runs in your browser — no uploads, completely private.",
  keywords: [
    "convert image",
    "image converter",
    "JPEG to WebP",
    "PNG to AVIF",
    "convert to WebP",
    "convert to AVIF",
    "image format converter",
    "change image format",
    "free image converter",
    "online convert tool",
  ],
  alternates: {
    canonical: "/convert",
  },
  openGraph: {
    type: "website",
    title: "Convert Images Online — Free, Private | images4.fun",
    description:
      "Convert between JPEG, PNG, WebP, and AVIF instantly. Runs entirely in your browser.",
    url: "https://images4.fun/convert",
    siteName: "images4.fun",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Images Online — Free, Private | images4.fun",
    description:
      "Convert between JPEG, PNG, WebP, and AVIF instantly. 100% free, runs in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
