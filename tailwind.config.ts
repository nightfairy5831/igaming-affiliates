import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        secondary: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },
        accent: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
        "gradient-accent": "linear-gradient(135deg, #7C3AED 0%, #10B981 100%)",
        "gradient-dark": "linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)",
        "gradient-sidebar": "linear-gradient(180deg, #1E1B4B 0%, #312E81 50%, #4C1D95 100%)",
        "gradient-hero": "linear-gradient(135deg, #F5F3FF 0%, #ECFEFF 50%, #ECFDF5 100%)",
        "gradient-card": "linear-gradient(135deg, #7C3AED 0%, #06B6D4 50%, #10B981 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
