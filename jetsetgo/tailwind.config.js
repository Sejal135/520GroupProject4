/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#000080',
        'navy-blue-light': '#0000E0',
        'sunshine-yellow': '#FFDD00',
        'sunshine-yellow-dark': '#FFB300',
        'navy-blue-dark': '#001530',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}