/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d6d", // Um rosa legal para os cupons
        secondary: "#ffb3c1",
      }
    },
  },
  plugins: [],
}