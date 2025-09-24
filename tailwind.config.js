/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-500': {
          'raw': '(max-width: 500px)'
        }, // tu 0 -> 499
        "min-2000": {
          "raw": "(min-width: 2000px)"
        }
      },
      colors: {
        white: "#ffffff",
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          500: "#6b7280",
          700: "#374151",
          800: "#1f2937",
        },
        blue: {
          200: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
        },
        yellow: {
          700: "#FEC600",
        },
        "dark-bg": "#101214",
        "dark-secondary": "#1d1f21",
        "dark-tertiary": "#3b3d40",
        "primary": "#0275ff",
        "secondary": "#22c55e",
        "accent": "#FEC600",
        "stroke-dark": "#2d3135",
        "bg-gray": "#faf5f0",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"], // h1, h2, h3
        body: ["Kanit", "sans-serif"], // paragraph
        display: ["Poppins", "sans-serif"], // tiêu đề đặc biệt
      },
    },
  },
  plugins: [],
}