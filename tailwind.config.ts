import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F1EC",      // base / negative space
        lighttan: "#DBCFC4",   // soft accents
        tan: "#C4B5A4",        // callouts, dividers
        warmbrown: "#A1866F",  // headlines, CTA
        charcoal: "#3D3A34",   // body text
        nearblack: "#272321",  // anchor / footer
        eranavy: "#1A3A7E",    // logo + seals only — sparing
        erared: "#C8102E",     // accent stripe — sparing
        paper: "#FBF8F3",      // page background
      },
      fontFamily: {
        display: ["var(--font-display)", "Vidaloka", "Playfair Display", "serif"],
        script: ["var(--font-script)", "Parisienne", "cursive"],
        sans: ["var(--font-sans)", "Montserrat", "Lato", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.18em",
        wider: "0.08em",
      },
      maxWidth: {
        prose: "68ch",
        editorial: "1240px",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
