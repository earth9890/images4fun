import { createToolOgImage } from "@/lib/og-utils";

export const dynamic = "force-static";

export const alt = "Convert Images Online — Free, Private | images4.fun";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return createToolOgImage({
    toolName: "Convert",
    tagline: "Switch between JPEG, PNG, WebP, and AVIF instantly. Real-time size comparison.",
    color: "#10B981",
    colorLight: "#ECFDF5",
  });
}
