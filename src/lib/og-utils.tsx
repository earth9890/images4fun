import { ImageResponse } from "next/og";

interface ToolOgOptions {
  toolName: string;
  tagline: string;
  color: string;
  colorLight: string;
}

export function createToolOgImage({ toolName, tagline, color, colorLight }: ToolOgOptions) {
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "#FF5C4D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            i4
          </div>
          <span style={{ fontSize: "24px", fontWeight: 600, color: "#1A1A2E", letterSpacing: "-0.02em" }}>
            images4.fun
          </span>
        </div>

        {/* Tool icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "18px",
            backgroundColor: colorLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: color,
            }}
          />
        </div>

        {/* Tool name */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 600,
            color: "#1A1A2E",
            textAlign: "center",
            lineHeight: 1.15,
            margin: "0 80px 16px",
            letterSpacing: "-0.03em",
          }}
        >
          {toolName} Images Online
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "22px",
            color: "#6B7280",
            textAlign: "center",
            margin: "0 120px 32px",
            lineHeight: 1.5,
          }}
        >
          {tagline}
        </p>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          {["Free", "Private", "No Upload"].map((badge) => (
            <div
              key={badge}
              style={{
                backgroundColor: "white",
                border: "1px solid #E8E4DF",
                borderRadius: "8px",
                padding: "8px 18px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#6B7280",
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
