/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        navbar: "#2b363b",
        basic: "#1D1F1C",
        highlight: "#36ab00",
        darkMode: "#1e1f1e",
        darkModeCard: "#3d3d3d",
        fein: "#e1eefc",
        feinDark: "#282828",
      },
      fontFamily: {
        fein: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
}
