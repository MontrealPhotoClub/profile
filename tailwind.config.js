const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.js', './components/**/*.js', './elements/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: colors.sky,
        error: colors.rose,
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
