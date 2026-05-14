import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SavvPro Partners · The intelligence backbone";
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
          <span>SAVVPRO · /PARTNERS</span>
          <span>TWO-DIRECTIONAL</span>
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
            &gt; PARTNER ECOSYSTEM
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              fontFamily: "sans-serif",
              display: "flex",
            }}
          >
            We are the backbone.
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              fontFamily: "sans-serif",
              marginTop: 4,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            The partner is the&nbsp;
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "#9E1450", fontFamily: "serif" }}>
              surface
            </span>
            <span style={{ color: "#9E1450" }}>.</span>
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 24,
              color: "#1A0E2A",
              fontStyle: "italic",
              fontFamily: "serif",
              display: "flex",
            }}
          >
            The roles do not overlap. Structural, not transactional.
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
          <span>SAVV.PRO/PARTNERS</span>
          <span>&gt; MOINC · ZOVOX</span>
        </div>
      </div>
    ),
    size
  );
}
