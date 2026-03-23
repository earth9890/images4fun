"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CropRegion, AspectRatio } from "@/lib/types";
import { ASPECT_RATIOS } from "@/lib/constants";

interface CropCanvasProps {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  cropRegion: CropRegion;
  aspectRatio: AspectRatio;
  onCropChange: (region: CropRegion) => void;
}

type DragMode = "move" | "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w" | null;

export function CropCanvas({
  imageUrl,
  imageWidth,
  imageHeight,
  cropRegion,
  aspectRatio,
  onCropChange,
}: CropCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const dragRef = useRef<{ mode: DragMode; startX: number; startY: number; startRegion: CropRegion }>({
    mode: null,
    startX: 0,
    startY: 0,
    startRegion: { x: 0, y: 0, w: 0, h: 0 },
  });

  // Load image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      draw();
    };
    img.src = imageUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  // Calculate display scale
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const maxW = container.clientWidth;
      const maxH = 500;
      const s = Math.min(1, maxW / imageWidth, maxH / imageHeight);
      setScale(s);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [imageWidth, imageHeight]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d")!;
    const dw = Math.round(imageWidth * scale);
    const dh = Math.round(imageHeight * scale);
    canvas.width = dw;
    canvas.height = dh;

    // Draw image
    ctx.drawImage(img, 0, 0, dw, dh);

    // Dark overlay outside crop
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, dw, dh);

    // Clear crop area
    const sx = cropRegion.x * scale;
    const sy = cropRegion.y * scale;
    const sw = cropRegion.w * scale;
    const sh = cropRegion.h * scale;
    ctx.clearRect(sx, sy, sw, sh);
    ctx.drawImage(img, cropRegion.x, cropRegion.y, cropRegion.w, cropRegion.h, sx, sy, sw, sh);

    // Crop border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(sx, sy, sw, sh);

    // Grid lines (rule of thirds)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(sx + (sw * i) / 3, sy);
      ctx.lineTo(sx + (sw * i) / 3, sy + sh);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(sx, sy + (sh * i) / 3);
      ctx.lineTo(sx + sw, sy + (sh * i) / 3);
      ctx.stroke();
    }

    // Draw corner handles
    const handleSize = 10;
    ctx.fillStyle = "white";
    const corners = [
      [sx, sy],
      [sx + sw, sy],
      [sx, sy + sh],
      [sx + sw, sy + sh],
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillRect(cx - handleSize / 2, cy - handleSize / 2, handleSize, handleSize);
    });

    // Edge handles
    const edges = [
      [sx + sw / 2, sy],
      [sx + sw / 2, sy + sh],
      [sx, sy + sh / 2],
      [sx + sw, sy + sh / 2],
    ];
    edges.forEach(([cx, cy]) => {
      ctx.fillRect(cx - handleSize / 2, cy - handleSize / 2, handleSize, handleSize);
    });
  }, [imageWidth, imageHeight, scale, cropRegion]);

  useEffect(() => {
    draw();
  }, [draw]);

  const getDragMode = useCallback(
    (clientX: number, clientY: number): DragMode => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;
      const sx = cropRegion.x * scale;
      const sy = cropRegion.y * scale;
      const sw = cropRegion.w * scale;
      const sh = cropRegion.h * scale;
      const threshold = 12;

      const nearLeft = Math.abs(mx - sx) < threshold;
      const nearRight = Math.abs(mx - (sx + sw)) < threshold;
      const nearTop = Math.abs(my - sy) < threshold;
      const nearBottom = Math.abs(my - (sy + sh)) < threshold;

      if (nearTop && nearLeft) return "nw";
      if (nearTop && nearRight) return "ne";
      if (nearBottom && nearLeft) return "sw";
      if (nearBottom && nearRight) return "se";
      if (nearTop) return "n";
      if (nearBottom) return "s";
      if (nearLeft) return "w";
      if (nearRight) return "e";

      if (mx > sx && mx < sx + sw && my > sy && my < sy + sh) return "move";
      return null;
    },
    [cropRegion, scale]
  );

  const constrainRegion = useCallback(
    (region: CropRegion): CropRegion => {
      let { x, y, w, h } = region;

      // Enforce aspect ratio
      const ratioEntry = ASPECT_RATIOS.find((r) => r.value === aspectRatio);
      if (ratioEntry?.ratio) {
        const r = ratioEntry.ratio;
        h = w / r;
        if (y + h > imageHeight) {
          h = imageHeight - y;
          w = h * r;
        }
      }

      // Clamp bounds
      w = Math.max(20, Math.min(w, imageWidth));
      h = Math.max(20, Math.min(h, imageHeight));
      x = Math.max(0, Math.min(x, imageWidth - w));
      y = Math.max(0, Math.min(y, imageHeight - h));

      return { x, y, w, h };
    },
    [aspectRatio, imageWidth, imageHeight]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const mode = getDragMode(e.clientX, e.clientY);
      if (!mode) return;

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragRef.current = {
        mode,
        startX: e.clientX,
        startY: e.clientY,
        startRegion: { ...cropRegion },
      };
    },
    [getDragMode, cropRegion]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const { mode, startX, startY, startRegion } = dragRef.current;

      // Update cursor
      if (!mode) {
        const hover = getDragMode(e.clientX, e.clientY);
        const canvas = canvasRef.current;
        if (canvas) {
          const cursors: Record<string, string> = {
            move: "move",
            nw: "nw-resize",
            ne: "ne-resize",
            sw: "sw-resize",
            se: "se-resize",
            n: "n-resize",
            s: "s-resize",
            e: "e-resize",
            w: "w-resize",
          };
          canvas.style.cursor = hover ? cursors[hover] : "crosshair";
        }
        return;
      }

      const dx = (e.clientX - startX) / scale;
      const dy = (e.clientY - startY) / scale;

      let next: CropRegion;

      if (mode === "move") {
        next = { ...startRegion, x: startRegion.x + dx, y: startRegion.y + dy };
      } else {
        next = { ...startRegion };
        if (mode.includes("e")) {
          next.w = startRegion.w + dx;
        }
        if (mode.includes("w")) {
          next.x = startRegion.x + dx;
          next.w = startRegion.w - dx;
        }
        if (mode.includes("s")) {
          next.h = startRegion.h + dy;
        }
        if (mode.includes("n")) {
          next.y = startRegion.y + dy;
          next.h = startRegion.h - dy;
        }
      }

      onCropChange(constrainRegion(next));
    },
    [getDragMode, scale, onCropChange, constrainRegion]
  );

  const handlePointerUp = useCallback(() => {
    dragRef.current.mode = null;
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        className="rounded-[8px]"
        style={{ touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </div>
  );
}
