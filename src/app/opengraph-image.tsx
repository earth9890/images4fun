import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "images4.fun — Free Online Image Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tools = [
  { name: "Compress", desc: "Reduce file size", color: "#3B82F6", bg: "#EFF6FF" },
  { name: "Crop", desc: "Trim to size", color: "#F59E0B", bg: "#FFFBEB" },
  { name: "Merge", desc: "Combine images", color: "#8B5CF6", bg: "#F5F3FF" },
  { name: "Convert", desc: "Change format", color: "#10B981", bg: "#ECFDF5" },
];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #FFF1EF 0%, #FFFAF6 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#FF5C4D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            i4
          </div>
          <span style={{ fontSize: "28px", fontWeight: 600, color: "#1A1A2E", letterSpacing: "-0.02em" }}>
            images4.fun
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "52px",
            fontWeight: 600,
            color: "#1A1A2E",
            textAlign: "center",
            lineHeight: 1.15,
            margin: "0 80px 16px",
            letterSpacing: "-0.03em",
          }}
        >
          Every image tool you need, in one place
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: "20px",
            color: "#6B7280",
            textAlign: "center",
            margin: "0 120px 40px",
            lineHeight: 1.5,
          }}
        >
          Compress, crop, merge, and convert images — 100% free, runs in your browser
        </p>

        {/* Tool cards */}
        <div style={{ display: "flex", gap: "16px" }}>
          {tools.map((tool) => (
            <div
              key={tool.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "white",
                border: "1px solid #E8E4DF",
                borderRadius: "14px",
                padding: "20px 32px",
                minWidth: "140px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: tool.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: tool.color,
                  }}
                />
              </div>
              <span style={{ fontSize: "16px", fontWeight: 600, color: "#1A1A2E" }}>
                {tool.name}
              </span>
              <span style={{ fontSize: "12px", color: "#6B7280" }}>
                {tool.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
