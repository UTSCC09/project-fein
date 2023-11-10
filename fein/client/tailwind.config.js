/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        navbar: "#2b363b",
        basic: "#1D1F1C",
        highlight: "#36ab00",
        darkMode: "#1e1f1e",
        darkModeCard: "#4b4b4b"
      }
    },
  },
  plugins: [],
}


