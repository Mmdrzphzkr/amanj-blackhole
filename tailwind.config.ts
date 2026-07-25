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
        void: "#000005",
        cosmic: "#03000f",
        nebula: "#0a0020",
        accent: "#7c3aed",
        accentGlow: "#a855f7",
        accentLight: "#c084fc",
        gold: "#f59e0b",
        goldLight: "#fbbf24",
        horizon: "#ef4444",
        plasma: "#06b6d4",
        starWhite: "#f0f4ff",
        dimStar: "#94a3b8",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        drift: "drift 15s ease-in-out infinite",
        flicker: "flicker 4s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(1deg)" },
          "66%": { transform: "translateY(8px) rotate(-1deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, -10px)" },
          "50%": { transform: "translate(-5px, 15px)" },
          "75%": { transform: "translate(-10px, -5px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
          "75%": { opacity: "0.9" },
        },
      },
      backgroundImage: {
        "radial-void":
          "radial-gradient(ellipse at center, #0a0020 0%, #03000f 40%, #000005 100%)",
        "radial-horizon":
          "radial-gradient(ellipse at center, #7c3aed22 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
