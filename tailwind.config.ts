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
        // Primary Colors
        brand: {
          green: "#2ECC71",
          darkGreen: "#27AE60",
          blue: "#1C3E95",
        },
        // Neutrals
        neutralGray: "#6B6B6B",
        lightGray: "#F2F4F8",
        // Secondary/Accents
        neonGreen: "#6AFF65",
        silverBorder: "#DDE2E7",
        // Gradient colors
        gradientFrom: "#1FA54A",
        gradientTo: "#33D97A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
