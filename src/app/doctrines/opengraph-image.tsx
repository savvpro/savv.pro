import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SavvPro Doctrines · Published operating principles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#F2EBDE",
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          color: "#1A0E2A",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 72,
            right: 72,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6B5A7A",
            fontFamily: "monospace",
          }}
        >
          <span>SAVVPRO · /DOCTRINES</span>
          <span>04 PUBLISHED</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9E1450",
              fontFamily: "monospace",
              marginBottom: 16,
              display: "flex",
            }}
          >
            &gt; PUBLISHED DOCTRINES
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              fontFamily: "sans-serif",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            The operating principles.
          </div>
          <div
            style={{
              fontSize: 84,
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              lineHeight: 1.02,
              fontFamily: "serif",
              color: "#9E1450",
              marginTop: 6,
              display: "flex",
            }}
          >
            Published, not pitched.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 22,
              color: "#6B5A7A",
              fontStyle: "italic",
              fontFamily: "serif",
              display: "flex",
            }}
          >
            01 End of Hierarchy · 02 Capabilities Over Features · 03 World Model · 04 Partner Doctrine
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 72,
            right: 72,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6B5A7A",
            fontFamily: "monospace",
          }}
        >
          <span>SAVV.PRO/DOCTRINES</span>
          <span>&gt; STEALTH · MAY 2026</span>
        </div>
      </div>
    ),
    size
  );
}
