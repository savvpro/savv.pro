import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SavvPro — Intelligence backbone for the agentic era";
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
          fontFamily: "serif",
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
          <span>SAVVPRO · STEALTH</span>
          <span>SAVV.PRO</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9E1450",
              fontFamily: "monospace",
              marginBottom: 18,
              display: "flex",
            }}
          >
            &gt; INTELLIGENCE BACKBONE
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              fontFamily: "sans-serif",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            An intelligence&nbsp;<span style={{ fontStyle: "italic", fontWeight: 400, color: "#9E1450" }}>backbone</span>
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              fontFamily: "sans-serif",
              display: "flex",
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            for the&nbsp;<span style={{ fontStyle: "italic", fontWeight: 400 }}>agentic era</span>
            <span style={{ color: "#9E1450" }}>.</span>
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 22,
              color: "#6B5A7A",
              fontStyle: "italic",
              fontFamily: "serif",
              display: "flex",
            }}
          >
            Capabilities, not features · Without a management layer · Through partners
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
          <span>SAVV·PRO · MAY 2026</span>
          <span>&gt; TALK TO THE AGENT</span>
        </div>
      </div>
    ),
    size
  );
}
