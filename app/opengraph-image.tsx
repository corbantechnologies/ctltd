import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Corban Technologies LTD — Enterprise Software & Cloud Infrastructure";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const logoBase64 = fs.readFileSync(logoPath).toString("base64");
  const logoDataUri = `data:image/png;base64,${logoBase64}`;

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
          backgroundColor: "#ffffff",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          border: "16px solid #f1f5f9",
        }}
      >
        {/* Top Header with Official Logo & Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUri}
            alt="Corban Technologies LTD Logo"
            style={{ width: "220px", height: "auto" }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: "6px",
              backgroundColor: "#f8fafc",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Enterprise Software &bull; Cloud Infrastructure
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "980px" }}>
          <h1
            style={{
              color: "#0f172a",
              fontSize: "46px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          >
            Mission-Critical Software Platforms Across East Africa
          </h1>
          <p
            style={{
              color: "#475569",
              fontSize: "20px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            SACCO Core Banking &bull; Double-Entry SME Finance &bull; Omnichannel Retail POS &bull; Telecom &amp; Logistics
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
            borderTop: "1.5px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", gap: "24px", color: "#334155", fontSize: "16px", fontWeight: 600 }}>
            <span>&bull; 3 Live SACCOs</span>
            <span>&bull; 99.9% Uptime SLA</span>
            <span>&bull; Safaricom Daraja Rails</span>
          </div>
          <div style={{ color: "#ea580c", fontSize: "18px", fontWeight: 700 }}>
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
