import { createToolOgImage } from "@/lib/og-utils";

export const dynamic = "force-static";

export const alt = "Merge Images Online — Free, Private | images4.fun";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return createToolOgImage({
    toolName: "Merge",
    tagline: "Combine multiple images into one. Horizontal, vertical, or grid — drag to reorder.",
    color: "#8B5CF6",
    colorLight: "#F5F3FF",
  });
}
