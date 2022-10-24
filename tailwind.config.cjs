/** @type {import('tailwindcss/types/generated/default-theme').DefaultTheme} */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,js,svelte,ts,svx}'],

  theme: {
    extend: {
      fontFamily: {
        pixel: ['Dogica Pixel', defaultTheme.fontFamily.sans],
      },
      listStyleType: {
        'lower-latin': 'lower-latin',
      },
    },
  },

  plugins: [],
}

module.exports = config
