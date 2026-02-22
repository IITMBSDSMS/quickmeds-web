/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 🔥 THIS FIXES IT
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};