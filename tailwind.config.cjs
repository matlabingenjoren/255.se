/** @type {import('tailwindcss/tailwind-config-default').TailwindConfigDefault['theme']} */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
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
