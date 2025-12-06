import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-dark": "#424B3C",
        "main-light": "#FFF9F3",
        "accent-orange": "#EB9100",
        "accent-orange-hover": "#D38200",
        "text-primary": "#302B2F",
        "text-on-dark": "#FFFFFF",
        "card-bg": "#FFFBF7",
        "border-light": "rgba(255, 255, 255, 0.3)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontSize: {
        // Hero heading
        "hero-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "hero-md": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "hero-sm": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        // Section headings
        "section-title": ["2.25rem", { lineHeight: "1.2", letterSpacing: "0.01em" }],
        "section-title-sm": ["1.75rem", { lineHeight: "1.25", letterSpacing: "0.01em" }],
        // Card titles
        "card-title": ["1.125rem", { lineHeight: "1.3", letterSpacing: "0.02em" }],
        // Body text
        "body-lg": ["1.0625rem", { lineHeight: "1.7" }],
        "body-md": ["0.9375rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.65" }],
        // Nav
        "nav": ["0.8125rem", { lineHeight: "1", letterSpacing: "0.08em" }],
        // Footer
        "footer": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
      },
      maxWidth: {
        "content": "702px",
        "content-wide": "820px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      boxShadow: {
        "card": "0 4px 20px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        "card": "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
