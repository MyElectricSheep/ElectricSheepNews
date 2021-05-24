// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          black: colors.black,
          white: colors.white,
          gray: colors.trueGray,
          indigo: colors.indigo,
          red: colors.rose,
          yellow: colors.amber,
          hacker: {
            light: '#F6F6EF',
            electric: '#FFF219',
            DEFAULT: '#FF6701',
            dark: '#888888',
          }
        }
      },
    variants: {
      extend: {},
    },
    plugins: [],
  }