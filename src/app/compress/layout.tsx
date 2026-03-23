import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress Images Online — Free, Private | images4.fun",
  description:
    "Reduce image file size without losing quality. Compress JPEG, PNG to WebP or AVIF. Runs in your browser — no uploads, no servers, 100% private.",
  alternates: {
    canonical: "/compress",
  },
  openGraph: {
    title: "Compress Images Online — Free, Private | images4.fun",
    description:
      "Reduce image file size without losing quality. Compress JPEG, PNG to WebP or AVIF. Runs entirely in your browser.",
    url: "https://images4.fun/compress",
  },
};

export default function CompressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
