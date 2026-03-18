export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[i]}`;
}

export function calculateReduction(
  originalSize: number,
  compressedSize: number
): number {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
}

export function getExtension(format: string): string {
  switch (format) {
    case "jpeg":
      return "jpg";
    case "webp":
      return "webp";
    case "avif":
      return "avif";
    case "png":
      return "png";
    default:
      return format;
  }
}

export function getMimeType(format: string): string {
  switch (format) {
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "avif":
      return "image/avif";
    case "png":
      return "image/png";
    default:
      return `image/${format}`;
  }
}

let idCounter = 0;
export function generateId(): string {
  return `${Date.now()}-${++idCounter}`;
}

export function loadImage(file: File): Promise<{ url: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ url, width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}
