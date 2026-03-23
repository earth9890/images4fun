/// <reference lib="webworker" />

type DecodeModule = { decode: (buffer: ArrayBuffer) => Promise<ImageData> };
type EncodeModule = {
  encode: (data: ImageData, options?: { quality?: number }) => Promise<ArrayBuffer>;
};
type ResizeFn = (
  data: ImageData,
  options: { width: number; height: number }
) => Promise<ImageData>;

// Module cache — loaded once per codec
let jpegDecModule: DecodeModule | null = null;
let pngDecModule: DecodeModule | null = null;
let webpDecModule: DecodeModule | null = null;
let jpegEncModule: EncodeModule | null = null;
let pngEncModule: EncodeModule | null = null;
let webpEncModule: EncodeModule | null = null;
let avifEncModule: EncodeModule | null = null;
let resizeFn: ResizeFn | null = null;

async function getDecoder(mimeType: string): Promise<DecodeModule> {
  if (mimeType === "image/jpeg") {
    if (!jpegDecModule) {
      jpegDecModule = await import("@jsquash/jpeg");
    }
    return jpegDecModule;
  }
  if (mimeType === "image/webp") {
    if (!webpDecModule) {
      webpDecModule = await import("@jsquash/webp");
    }
    return webpDecModule;
  }
  // Default to PNG
  if (!pngDecModule) {
    pngDecModule = await import("@jsquash/png");
  }
  return pngDecModule;
}

async function getEncoder(format: string): Promise<EncodeModule> {
  switch (format) {
    case "jpeg":
      if (!jpegEncModule) {
        jpegEncModule = await import("@jsquash/jpeg");
      }
      return jpegEncModule;
    case "png":
      if (!pngEncModule) {
        const mod = await import("@jsquash/png");
        pngEncModule = { encode: (data: ImageData) => mod.encode(data) };
      }
      return pngEncModule;
    case "webp":
      if (!webpEncModule) {
        webpEncModule = await import("@jsquash/webp");
      }
      return webpEncModule;
    case "avif":
      if (!avifEncModule) {
        avifEncModule = await import("@jsquash/avif");
      }
      return avifEncModule;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

async function getResizer(): Promise<ResizeFn> {
  if (!resizeFn) {
    const mod = await import("@jsquash/resize");
    resizeFn = mod.default;
  }
  return resizeFn;
}

self.onmessage = async (e: MessageEvent) => {
  try {
    const msg = e.data;

    if (msg.type === "decode") {
      const decoder = await getDecoder(msg.mimeType);
      const imageData = await decoder.decode(msg.buffer);

      // Transfer the underlying ArrayBuffer
      const buffer = imageData.data.buffer as ArrayBuffer;
      self.postMessage(
        {
          type: "decoded",
          imageData: {
            data: buffer,
            width: imageData.width,
            height: imageData.height,
          },
        },
        [buffer]
      );
    } else if (msg.type === "compress") {
      const start = performance.now();

      // Reconstruct ImageData from transferred buffer
      const clampedArray = new Uint8ClampedArray(msg.imageData.data);
      let imageData = new ImageData(
        clampedArray,
        msg.imageData.width,
        msg.imageData.height
      );

      // Optional resize
      if (msg.settings.resizeEnabled) {
        const resize = await getResizer();
        const { maxWidth, maxHeight } = msg.settings;
        const { width, height } = imageData;

        if (width > maxWidth || height > maxHeight) {
          const scale = Math.min(maxWidth / width, maxHeight / height);
          const newWidth = Math.round(width * scale);
          const newHeight = Math.round(height * scale);
          imageData = await resize(imageData, {
            width: newWidth,
            height: newHeight,
          });
        }
      }

      // Encode
      const encoder = await getEncoder(msg.settings.format);
      const buffer = await encoder.encode(imageData, {
        quality: msg.settings.quality,
      });

      const timeTakenMs = Math.round(performance.now() - start);

      self.postMessage(
        {
          type: "compressed",
          buffer,
          width: imageData.width,
          height: imageData.height,
          timeTakenMs,
        },
        [buffer]
      );
    } else if (msg.type === "convert") {
      const start = performance.now();

      // Decode input
      const decoder = await getDecoder(msg.mimeType);
      const imageData = await decoder.decode(msg.buffer);

      // Encode to target format
      const encoder = await getEncoder(msg.targetFormat);
      const qualityOpt = msg.targetFormat === "png" ? undefined : msg.quality;
      const buffer = await encoder.encode(imageData, {
        quality: qualityOpt,
      });

      const timeTakenMs = Math.round(performance.now() - start);

      self.postMessage(
        {
          type: "converted",
          buffer,
          timeTakenMs,
        },
        [buffer]
      );
    }
  } catch (err) {
    self.postMessage({
      type: "error",
      message: err instanceof Error ? err.message : "Unknown worker error",
    });
  }
};
