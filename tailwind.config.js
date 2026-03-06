/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5a4',
        accent: '#06b6d4'
      }
    }
  },
  plugins: []
}
