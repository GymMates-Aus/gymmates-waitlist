import { ImageResponse } from "next/og";

// Edge runtime is required for next/og.
export const runtime = "edge";
export const alt = "GymMates · All you need is a mate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// CDN-hosted font binaries via @fontsource on jsdelivr. Stable URLs, public,
// no auth. Required because Netlify's edge runtime doesn't ship the same
// default fonts as Vercel, so the previous system-ui stack was failing to
// resolve and crashing the route with a 500.
const DISPLAY_FONT_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/plus-jakarta-sans@5.0.21/files/plus-jakarta-sans-latin-800-normal.woff";
const ACCENT_FONT_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/work-sans@5.0.21/files/work-sans-latin-400-italic.woff";

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`font fetch ${res.status}`);
  return res.arrayBuffer();
}

export default async function OpenGraph() {
  // Load both fonts in parallel. If either fails, render with whatever we have
  // and let next/og use its bundled default for the missing one. Better than a
  // 500.
  const [displayFont, accentFont] = await Promise.allSettled([
    fetchFont(DISPLAY_FONT_URL),
    fetchFont(ACCENT_FONT_URL),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 800; style: "normal" | "italic" }[] = [];
  if (displayFont.status === "fulfilled") {
    fonts.push({ name: "Jakarta", data: displayFont.value, weight: 800, style: "normal" });
  }
  if (accentFont.status === "fulfilled") {
    fonts.push({ name: "Work", data: accentFont.value, weight: 400, style: "italic" });
  }

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
          fontFamily: "Jakarta, sans-serif",
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
              fontSize: 104,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            All you need
            <br />
            is a mate.
            <br />
            <span
              style={{
                fontFamily: "Work, sans-serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#D68A48",
                textTransform: "none",
                letterSpacing: "-0.02em",
              }}
            >
              &amp; you&rsquo;ll show up.
            </span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
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
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}
