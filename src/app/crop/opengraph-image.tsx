import { createToolOgImage } from "@/lib/og-utils";

export const dynamic = "force-static";

export const alt = "Crop Images Online — Free, Private | images4.fun";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return createToolOgImage({
    toolName: "Crop",
    tagline: "Trim images to the exact size you need. Preset ratios, interactive canvas, pixel-perfect.",
    color: "#F59E0B",
    colorLight: "#FFFBEB",
  });
}
