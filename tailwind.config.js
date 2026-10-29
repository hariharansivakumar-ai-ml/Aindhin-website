/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#155BAC",
        secondary: "#19352D",
        main: "#4B2CBE",
        text: "#576070",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
