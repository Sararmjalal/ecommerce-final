const colors = require("tailwindcss/colors");
const plugin = require('tailwindcss/plugin')

const shapeRendering = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.shape-auto': {
      'shape-rendering': 'auto',
    },
    '.shape-optimize-speed': {
      'shape-rendering': 'optimizeSpeed',
    },
    '.shape-crisp-edges': {
      'shape-rendering': 'crispEdges',
    },
    '.shape-geometric-precision': {
      'shape-rendering': 'geometricPrecision',
    },
  }

  addUtilities(newUtilities)
})

module.exports = {
  content: [
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxl: {max: "1920px"},
      xl: {max: "1279px"},
      lg: {max: "1023px"},
      md: {max: "767px"},
      sm: {max: "639px"},
      xs: {max: "350px"},
    },
    colors: {
      primary: "#FBB03B",
      secondary: "#FFF3DF",
      grayish: "#A8A8A8",
      blueish: "#3B5998",
      reddish: "#FF0000",
      red: colors.red,
      blue: colors.blue,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      green: colors.green,
      violet: colors.violet,
      grayborder: "#E5E5E5",
    },
    fontFamily: {
      Poppins: ["Poppins", "Sans-serif"],
    },
    extend: {},
  },
  variants: {
    mixBlendMode: ["responsive"],
    backgroundBlendMode: ["responsive"],
    isolation: ["responsive"],
  },
  plugins: [require("tailwindcss-blend-mode")(), shapeRendering],
};
