/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        xl: "1200px",
      },
    },
    extend: {
      fontFamily: {
        // inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        bricolage: ["Bricolage Grotesque", "sans-serif"],
      },
      colors: {
        primaryGreen: "#049a37",
        primaryBlue: "#5671ff",
        accent: {
          light: "#fefcbf",
          DEFAULT: "#faf089",
          dark: "#ecc94b",
        },
        background: "#f7fafc",
        text: "#2d3748",
      },
    },
  },
  plugins: [],
};
