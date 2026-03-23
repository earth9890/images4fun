import { createToolOgImage } from "@/lib/og-utils";

export const dynamic = "force-static";

export const alt = "Compress Images Online — Free, Private | images4.fun";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return createToolOgImage({
    toolName: "Compress",
    tagline: "Reduce file size without losing quality. JPEG, PNG, WebP, AVIF — all in your browser.",
    color: "#3B82F6",
    colorLight: "#EFF6FF",
  });
}
