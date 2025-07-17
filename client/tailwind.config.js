/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // 👈 THIS enables toggling via class
  theme: {
    extend: {},
  },
  plugins: [],
};
