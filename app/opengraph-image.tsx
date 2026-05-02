import { ImageResponse } from "next/og";

// Edge runtime is required for next/og.
export const runtime = "edge";
export const alt = "GymMates · Find a mate at your gym";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// TODO(og-image): swap the system stack for the real Plus Jakarta Sans + Work
//   Sans pair via fetch+@font-face once we have the woff files in /public.

export default async function OpenGraph() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#324036",
          color: "#E8E4D8",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#B7773A",
            }}
          />
          GymMates
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 0.96,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            One mate.
            <br />
            Same gym.
            <br />
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "#D68A48",
                textTransform: "none",
                letterSpacing: "-0.02em",
              }}
            >
              you’ll show up.
            </span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "rgba(232,228,216,0.75)",
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Find a mate at your gym. Free for members. Built in regional Victoria.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "rgba(232,228,216,0.55)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span>Waitlist · for members</span>
          <span>waitlist.gymmates.com.au</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
