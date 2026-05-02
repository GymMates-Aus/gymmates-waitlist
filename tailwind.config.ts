import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#E8E4D8",
        "bone-2": "#F2EEE4",
        linen: "#D5CEBB",
        "linen-2": "#C9C2AF",
        hay: "#B8A07A",
        ochre: "#B7773A",
        "ochre-deep": "#8F5A26",
        eucalypt: "#5A6B4C",
        forest: "#324036",
        ink: "#1F2A1F",
        earth: "#8A6E5D",
        "fg-muted": "#47514A",
      },
      fontFamily: {
        display: ["var(--f-display)", "system-ui", "sans-serif"],
        body: ["var(--f-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter: "-0.03em",
        tight: "-0.02em",
        eyebrow: "0.14em",
        eyebrowwide: "0.18em",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "18px",
        xl: "28px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(31,42,31,0.04), 0 2px 6px rgba(31,42,31,0.04)",
        lift: "0 2px 4px rgba(31,42,31,0.06), 0 8px 20px rgba(31,42,31,0.08)",
        deep: "0 6px 14px rgba(31,42,31,0.08), 0 18px 40px rgba(31,42,31,0.10)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.4, 0, 0.2, 1)",
        out: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
      transitionDuration: {
        fast: "120ms",
        DEFAULT: "200ms",
        slow: "320ms",
      },
    },
  },
  plugins: [],
};

export default config;
