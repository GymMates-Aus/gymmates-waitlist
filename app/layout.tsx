import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Work_Sans } from "next/font/google";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--f-display",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--f-body",
  display: "swap",
});

const SITE = "https://waitlist.gymmates.com.au"; // TODO: set real domain
const TITLE = "GymMates · Find a mate at your gym";
const DESC =
  "GymMates pairs you with one mate at your gym, so showing up gets easier. Free for members. Join the waitlist.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  applicationName: "GymMates",
  authors: [{ name: "Next Level Echuca" }],
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE,
    siteName: "GymMates",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "GymMates · All you need is a mate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#324036",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
