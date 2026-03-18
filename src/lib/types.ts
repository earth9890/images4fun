export type OutputFormat = "jpeg" | "webp" | "avif" | "png";

export type CompressionStatus =
  | "idle"
  | "decoding"
  | "compressing"
  | "done"
  | "error";

export interface CompressionSettings {
  format: OutputFormat;
  quality: number;
  resizeEnabled: boolean;
  maxWidth: number;
  maxHeight: number;
}

export interface CompressionResult {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
  timeTakenMs: number;
}

export interface OriginalImage {
  file: File;
  url: string;
  imageData: ImageData;
  width: number;
  height: number;
  size: number;
}

export interface CompressionState {
  original: OriginalImage | null;
  result: CompressionResult | null;
  settings: CompressionSettings;
  status: CompressionStatus;
  error: string | null;
}

export type CompressionAction =
  | { type: "SET_ORIGINAL"; payload: OriginalImage }
  | { type: "SET_SETTINGS"; payload: Partial<CompressionSettings> }
  | { type: "SET_RESULT"; payload: CompressionResult }
  | { type: "SET_STATUS"; payload: CompressionStatus }
  | { type: "SET_ERROR"; payload: string }
  | { type: "RESET" };

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  enabled: boolean;
}

// --- Crop types ---

export interface CropRegion {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type AspectRatio = "free" | "1:1" | "4:3" | "3:2" | "16:9";

export type CropStatus = "idle" | "cropping" | "done" | "error";

export interface CropState {
  original: { file: File; url: string; width: number; height: number; size: number } | null;
  cropRegion: CropRegion;
  aspectRatio: AspectRatio;
  outputFormat: OutputFormat;
  quality: number;
  result: { blob: Blob; url: string; width: number; height: number; size: number } | null;
  status: CropStatus;
  error: string | null;
}

export type CropAction =
  | { type: "SET_ORIGINAL"; payload: CropState["original"] }
  | { type: "SET_CROP_REGION"; payload: CropRegion }
  | { type: "SET_ASPECT_RATIO"; payload: AspectRatio }
  | { type: "SET_OUTPUT_FORMAT"; payload: OutputFormat }
  | { type: "SET_QUALITY"; payload: number }
  | { type: "SET_RESULT"; payload: CropState["result"] }
  | { type: "SET_STATUS"; payload: CropStatus }
  | { type: "SET_ERROR"; payload: string }
  | { type: "RESET" };

// --- Merge types ---

export type MergeLayout = "horizontal" | "vertical" | "grid";

export type MergeStatus = "idle" | "merging" | "done" | "error";

export interface MergeImage {
  id: string;
  file: File;
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface MergeState {
  images: MergeImage[];
  layout: MergeLayout;
  gap: number;
  bgColor: string;
  result: { blob: Blob; url: string; width: number; height: number; size: number } | null;
  status: MergeStatus;
  error: string | null;
}

export type MergeAction =
  | { type: "ADD_IMAGES"; payload: MergeImage[] }
  | { type: "REMOVE_IMAGE"; payload: string }
  | { type: "REORDER_IMAGES"; payload: MergeImage[] }
  | { type: "SET_LAYOUT"; payload: MergeLayout }
  | { type: "SET_GAP"; payload: number }
  | { type: "SET_BG_COLOR"; payload: string }
  | { type: "SET_RESULT"; payload: MergeState["result"] }
  | { type: "SET_STATUS"; payload: MergeStatus }
  | { type: "SET_ERROR"; payload: string }
  | { type: "RESET" };

// --- Convert types ---

export type ConvertStatus = "idle" | "decoding" | "converting" | "done" | "error";

export interface ConvertState {
  original: { file: File; url: string; width: number; height: number; size: number; format: string } | null;
  outputFormat: OutputFormat;
  quality: number;
  result: { blob: Blob; url: string; size: number; timeTakenMs: number } | null;
  status: ConvertStatus;
  error: string | null;
}

export type ConvertAction =
  | { type: "SET_ORIGINAL"; payload: ConvertState["original"] }
  | { type: "SET_OUTPUT_FORMAT"; payload: OutputFormat }
  | { type: "SET_QUALITY"; payload: number }
  | { type: "SET_RESULT"; payload: ConvertState["result"] }
  | { type: "SET_STATUS"; payload: ConvertStatus }
  | { type: "SET_ERROR"; payload: string }
  | { type: "RESET" };

// Worker message types
export interface DecodeMessage {
  type: "decode";
  buffer: ArrayBuffer;
  mimeType: string;
}

export interface CompressMessage {
  type: "compress";
  imageData: {
    data: ArrayBuffer;
    width: number;
    height: number;
  };
  settings: CompressionSettings;
}

export interface ConvertWorkerMessage {
  type: "convert";
  buffer: ArrayBuffer;
  mimeType: string;
  targetFormat: OutputFormat;
  quality: number;
}

export type WorkerInMessage = DecodeMessage | CompressMessage | ConvertWorkerMessage;

export interface DecodedMessage {
  type: "decoded";
  imageData: {
    data: ArrayBuffer;
    width: number;
    height: number;
  };
}

export interface CompressedMessage {
  type: "compressed";
  buffer: ArrayBuffer;
  width: number;
  height: number;
  timeTakenMs: number;
}

export interface ConvertedMessage {
  type: "converted";
  buffer: ArrayBuffer;
  timeTakenMs: number;
}

export interface ErrorMessage {
  type: "error";
  message: string;
}

export type WorkerOutMessage = DecodedMessage | CompressedMessage | ConvertedMessage | ErrorMessage;
