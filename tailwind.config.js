/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        clash: ["Clash Grotesk", "sans-serif"],
        geist: ["Geist", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#f3f0ff",
          100: "#e9e3ff",
          200: "#d4c9ff",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          900: "#2e1065",
        },
        surface: {
          DEFAULT: "#0a0a0f",
          card:    "#0f0f1e",
          muted:   "#161625",
          border:  "#1e1a35",
          border2: "#2a2640",
        },
        text: {
          primary:   "#e8e6f0",
          secondary: "#8b85a0",
          muted:     "#4a4460",
        },
      },
    },
  },
  plugins: [],
};
