import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "481px",
        sm: "641px",
        md: "769px",
        lg: "1025px",
        xl: "1281px",
        "2xl": "1440px",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        black: "#1B1B1B",
        gray: {
          DEFAULT: "#6D6D6D",
        },
        orange: {
          DEFAULT: "#F58120",
        },
        green: {
          DEFAULT: "#3C6649",
        },
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#F58120", // orange
            },
            secondary: {
              DEFAULT: "#3C6649", // green
            },
          },
        },
      },
    }),
  ],
};
export default config;
