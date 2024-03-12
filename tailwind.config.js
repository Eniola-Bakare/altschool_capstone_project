/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#543EE0",
        black: "#111",
        white: "#FFF",
        grey: "#626262",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};
