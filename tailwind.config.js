const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#fff",
        transparent: "transparent",

        primary: "#0052cc",
        "default": "#181818",
        success: "#3eb969",

        "input-grey": "#f4f4f6",
        "icon-grey": "#8f92a1",
        "border-grey": "#ebecf0",

        "ic-violet": "#5243aa",
        "ic-orange": "#ff991f",
        "ic-green": "#00875a",
        "ic-lawngreen": "#6acd00",
        "ic-purple": "#ec31ff",

        "off-white": "#fdf0ba",
        brown: "#3f2e00",
        orangered: "#f2461f",
        seagreen: "#2e8b58",
        "lighten-blue": "#f7faff",
        "dusty-orange": "#ff531d",
      },
      fontFamily: {
        ...fontFamily,
        body: ["Inter", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
