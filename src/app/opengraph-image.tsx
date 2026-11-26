import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const alt = "Fakom International Services Ltd — Electrical design, installation and power infrastructure";
export const size = { width: 1200, height: 630 };
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
          padding: "72px 84px",
          color: "#f7f9fb",
          backgroundColor: "#0e1a26",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 72, fontWeight: 700 }}>F</span>
          <span style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: "#e3b04b" }} />
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 22, letterSpacing: 3 }}>{siteName.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
          <div style={{ width: 56, height: 3, backgroundColor: "#e3b04b" }} />
          <div style={{ fontSize: 58, lineHeight: 1.15 }}>Electrical design, installation and power infrastructure</div>
        </div>
        <div style={{ display: "flex", fontFamily: "Arial, sans-serif", color: "#c3cdd7", fontSize: 20 }}>
          Port Harcourt · Owerri · Southern Nigeria
        </div>
      </div>
    ),
    size,
  );
}
