import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Content Vault";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: "64px",
            height: "5px",
            background: "#d4ff00",
            marginBottom: "40px",
            borderRadius: "2px",
          }}
        />

        {/* Live badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              background: "#d4ff00",
            }}
          />
          <span
            style={{
              color: "#d4ff00",
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Open Source · Community Curated
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "28px",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "86px",
              fontWeight: "900",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            The Content
          </span>
          <span
            style={{
              color: "#d4ff00",
              fontSize: "86px",
              fontWeight: "900",
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            Vault.
          </span>
        </div>

        {/* Description */}
        <span
          style={{
            color: "#777777",
            fontSize: "22px",
            lineHeight: 1.6,
            maxWidth: "680px",
            marginBottom: "auto",
          }}
        >
          Marketing wisdom and vibe coding insights from real builders.
          Curated by the community.
        </span>

        {/* Bottom stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            borderTop: "1px solid #1a1a1a",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ color: "#ffffff", fontSize: "30px", fontWeight: "900" }}>
              16+
            </span>
            <span
              style={{
                color: "#444444",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Items
            </span>
          </div>
          <div
            style={{
              width: "1px",
              height: "36px",
              background: "#1f1f1f",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ color: "#d4ff00", fontSize: "30px", fontWeight: "900" }}>
              2
            </span>
            <span
              style={{
                color: "#444444",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Sections
            </span>
          </div>
          <div
            style={{
              width: "1px",
              height: "36px",
              background: "#1f1f1f",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ color: "#d4ff00", fontSize: "30px", fontWeight: "900" }}>
              Free
            </span>
            <span
              style={{
                color: "#444444",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Open Source
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
