import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ayush AI — Ask anything about my career, projects, and skills";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #312e81 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #8b6cff, #38bdf8)",
              fontSize: "40px",
            }}
          >
            💬
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "56px", fontWeight: 700 }}>Ayush AI</div>
            <div style={{ fontSize: "28px", color: "#cbd5e1" }}>
              AI-first portfolio assistant
            </div>
          </div>
        </div>

        <div style={{ fontSize: "34px", color: "#e2e8f0", maxWidth: "900px" }}>
          Ask anything about my career, projects, experience, and skills.
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
