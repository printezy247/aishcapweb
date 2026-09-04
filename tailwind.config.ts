import type { Config } from "tailwindcss";

/**
 * Design tokens for Aish Capital.
 * The palette is fixed — it derives from the logo and brand wallpaper.
 * Gold is an accent, not a theme. Bull/bear are for signed numeric values only.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      navy: {
        deep: "#0A1B3D",
        midnight: "#061229",
        raised: "#12294F",
      },
      gold: {
        DEFAULT: "#D4A017",
        bright: "#F5D061",
      },
      platinum: "#E8E8E8",
      slate: "#8FA3C4",
      bull: "#2ECC71",
      bear: "#E74C3C",
    },
    fontFamily: {
      sans: [
        "Archivo",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
    },
    extend: {
      fontSize: {
        // Type scale (mobile → desktop handled with responsive utilities)
        "hero-m": ["32px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero-d": ["52px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section-m": ["24px", { lineHeight: "1.15" }],
        "section-d": ["32px", { lineHeight: "1.15" }],
        "stat-m": ["28px", { lineHeight: "1.1" }],
        "stat-d": ["36px", { lineHeight: "1.1" }],
        "body-m": ["16px", { lineHeight: "1.6" }],
        "body-d": ["17px", { lineHeight: "1.6" }],
        label: ["13px", { lineHeight: "1.4", letterSpacing: "0.01em" }],
        legal: ["13px", { lineHeight: "1.5" }],
      },
      maxWidth: {
        prose: "68ch",
        site: "1080px",
      },
      borderRadius: {
        card: "6px",
      },
      outlineColor: {
        focus: "#F5D061",
      },
    },
  },
  plugins: [],
} satisfies Config;
