/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'luckiestGuy':["Luckiest Guy", "cursive"],
        'myFont':["Ga Maamli", "sans-serif"],
        'gloria':["Gloria Hallelujah", "cursive"]
      }
    },
  },
  plugins: [],
}