import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SavvPro Join · Contributor pathway";
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
          <span>SAVVPRO · /JOIN</span>
          <span>SELF-SELECT</span>
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
            &gt; CONTRIBUTOR PATHWAY
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
            Read this.
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
            }}
          >
            If it still sounds right,
          </div>
          <div
            style={{
              fontSize: 88,
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              lineHeight: 1.04,
              fontFamily: "serif",
              color: "#9E1450",
              marginTop: 4,
              display: "flex",
            }}
          >
            start the conversation
            <span>.</span>
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
            Remote-first · Resource-agnostic · Agent-first · No hierarchy
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
          <span>SAVV.PRO/JOIN</span>
          <span>&gt; TIER 1 TRAITS</span>
        </div>
      </div>
    ),
    size
  );
}
