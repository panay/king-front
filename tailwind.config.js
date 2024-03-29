const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: [
        "bg-icon-violet",
        "bg-icon-orange",
        "bg-icon-green",
        "bg-icon-lawngreen",
        "bg-icon-purple",
        "text-icon-violet",
        "text-icon-orange",
        "text-icon-green",
        "text-icon-lawngreen",
        "text-icon-purple",
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#0052cc",
        default: "#181818",
        success: "#3bcf7e",
        warning: "#ff531d",
        "hover-warning": "#ff7145",
        "active-warning": "#ef3a01",
        "hover-success": "#24DB77",
        "active-success": "#2FB069",
        "hover-primary": "#4b87df",
        "active-primary": "#0049b5",

        "input-grey": "#f4f4f6",
        "icon-grey": "#8f92a1",
        "border-grey": "#ebecf0",
        "icon-white": "#ffffff",
        "lighten-grey": "#fcfcff",

        "icon-violet": "#5243aa",
        "icon-orange": "#ff991f",
        "icon-green": "#00875a",
        "icon-lawngreen": "#6acd00",
        "icon-purple": "#ec31ff",

        "tag-green": "#e5fbef",
        "tag-red": "#fff3f0",
        "tag-text-red": "#de3c16",
        "tag-grey": "#e9ecea",
        "tag-text-grey": "#6e717d",

        "off-white": "#fdf0ba",
        brown: "#3f2e00",
        orangered: "#f2461f",
        seagreen: "#2e8b58",
        "lighten-blue": "#f7faff",
      },
      fontFamily: {
        ...fontFamily,
        body: ["Inter", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "disabled"],
      textColor: ["group-hover", "disabled"],
      opacity: ["disabled"],
      pointerEvents: ["disabled"],
      display: ["group-hover"],
      visibility: ["group-hover"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
