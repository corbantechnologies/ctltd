import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Corban Technologies LTD — Enterprise Software & Cloud Infrastructure";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0f172a",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              backgroundColor: "#ea580c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "26px",
              fontWeight: "bold",
            }}
          >
            CT
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
                letterSpacing: "-0.5px",
              }}
            >
              Corban Technologies LTD
            </span>
            <span style={{ color: "#94a3b8", fontSize: "15px" }}>
              Mombasa &bull; Nairobi, Kenya
            </span>
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 14px",
              borderRadius: "6px",
              backgroundColor: "rgba(234, 88, 12, 0.15)",
              border: "1px solid rgba(234, 88, 12, 0.4)",
              color: "#ea580c",
              fontSize: "15px",
              fontWeight: 600,
              width: "fit-content",
            }}
          >
            Enterprise Software &bull; Cloud Infrastructure
          </div>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "46px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            Mission-Critical Software Platforms Across East Africa
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            SACCO Core Banking &bull; Double-Entry SME Finance &bull; Omnichannel POS &bull; Telecom Messaging
          </p>
        </div>

        {/* Bottom Footer Details */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "24px",
            borderTop: "1px solid #334155",
          }}
        >
          <div style={{ display: "flex", gap: "24px", color: "#cbd5e1", fontSize: "16px", fontWeight: 600 }}>
            <span>✓ 3 Live SACCOs</span>
            <span>✓ 99.9% Uptime SLA</span>
            <span>✓ Safaricom Daraja M-Pesa</span>
          </div>
          <div style={{ color: "#ea580c", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            corbantechnologies.org
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
