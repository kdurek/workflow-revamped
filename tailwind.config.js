const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.js', './src/components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      // mon: ['Montserrat', 'sans-serif'],
      // heb: ["Heebo", "sans-serif"],
      sans: ['Poppins', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
      black: 'black',
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      gray: colors.gray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      lightBlue: colors.lightBlue,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    extend: {
      gridTemplateRows: {
        pancake: 'auto 1fr auto',
      },
      translate: {'-3/2': '150%', '3/2': '150%'},
    },
  },
  variants: {
    scrollbar: ['rounded', 'dark'],
    extend: {
      borderRadius: ['first', 'last'],
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
