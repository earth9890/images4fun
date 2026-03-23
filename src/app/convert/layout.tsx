import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Images Online — Free, Private | images4.fun",
  description:
    "Convert between JPEG, PNG, WebP, and AVIF instantly. See file size comparison in real-time. Runs in your browser — no uploads, completely private.",
  alternates: {
    canonical: "/convert",
  },
  openGraph: {
    title: "Convert Images Online — Free, Private | images4.fun",
    description:
      "Convert between JPEG, PNG, WebP, and AVIF instantly. Runs entirely in your browser.",
    url: "https://images4.fun/convert",
  },
};

export default function ConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
