import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CloudSwift — Cloud Managed Services & Microsoft Solutions India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#eef4ff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: logo area */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Cloud mark (inline SVG path as data) */}
          <svg width="56" height="56" viewBox="0 0 200 200" fill="none">
            <path
              d="M80 52c17 0 31 12 34 28 1 0 3 0 4 0 12 0 22 10 22 22s-10 22-22 22H50c-16 0-30-14-30-30C20 80 31 67 46 64c3-19 19-34 34-34Z"
              fill="#1a5fcc"
            />
            <path
              d="M128 70h48M138 90h40M148 110h28"
              stroke="#e05c20"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#0d1b35",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              Cloud<span style={{ color: "#1a5fcc" }}>Swift</span>
            </span>
            <span style={{ fontSize: 14, color: "#1a5fcc", marginTop: 4, fontWeight: 500 }}>
              ISO 9001-2015 Certified · Microsoft Azure Partner
            </span>
          </div>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#0d1b35",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              maxWidth: 820,
            }}
          >
            Expert Cloud &amp; IT Managed Services
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#1a5fcc",
              fontWeight: 500,
              maxWidth: 720,
            }}
          >
            Azure · Microsoft 365 · Dynamics 365 · Power BI · 24/7 Support
          </div>
        </div>

        {/* Bottom: CTA pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              background: "#e05c20",
              color: "#fff",
              fontSize: 20,
              fontWeight: 600,
              padding: "14px 32px",
              borderRadius: 8,
            }}
          >
            Book a free consultation
          </div>
          <span style={{ fontSize: 18, color: "#0d1b35", opacity: 0.55 }}>
            oncloudswift.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
