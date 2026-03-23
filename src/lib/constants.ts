import type { AspectRatio, CompressionSettings, Tool } from "./types";

export const ROUTES = {
  HOME: "/",
  COMPRESS: "/compress",
  COMPARE: "/compress/compare",
  MERGE: "/merge",
  CROP: "/crop",
  CONVERT: "/convert",
  ABOUT: "/about",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  CONTACT: "/contact",
} as const;

export const TOOLS: Tool[] = [
  {
    id: "compress",
    name: "Compress",
    description: "Reduce file size without losing quality",
    icon: "file-minus-02",
    route: ROUTES.COMPRESS,
    enabled: true,
  },
  {
    id: "crop",
    name: "Crop",
    description: "Trim images to the perfect size",
    icon: "crop",
    route: ROUTES.CROP,
    enabled: true,
  },
  {
    id: "merge",
    name: "Merge",
    description: "Combine multiple images into one",
    icon: "layers-01",
    route: ROUTES.MERGE,
    enabled: true,
  },
  {
    id: "convert",
    name: "Convert",
    description: "Change image format instantly",
    icon: "refresh",
    route: ROUTES.CONVERT,
    enabled: true,
  },
];

export const DEFAULT_SETTINGS: CompressionSettings = {
  format: "webp",
  quality: 75,
  resizeEnabled: false,
  maxWidth: 1920,
  maxHeight: 1080,
};

export const ASPECT_RATIOS: { value: AspectRatio; label: string; ratio?: number }[] = [
  { value: "free", label: "Free" },
  { value: "1:1", label: "1:1", ratio: 1 },
  { value: "4:3", label: "4:3", ratio: 4 / 3 },
  { value: "3:2", label: "3:2", ratio: 3 / 2 },
  { value: "16:9", label: "16:9", ratio: 16 / 9 },
];

export const MAX_MERGE_IMAGES = 10;
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_DIMENSION = 8192;
export const ACCEPTED_TYPES = ["image/jpeg", "image/png"];
export const ACCEPTED_TYPES_EXTENDED = ["image/jpeg", "image/png", "image/webp"];
export const DEBOUNCE_MS = 300;
