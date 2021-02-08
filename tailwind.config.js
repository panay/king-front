//todo: настроить tailwind
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#fff",
        transparent: "transparent",
        "button-link": "#0052cc",
        text: "#181818",
        "icon-grey": "#8f92a1",
        "input-grey": "#f4f4f6",
        "dusty-orange": "#ff531d",
        success: "#3eb969",
        "chocolate-brown": "#3f2e00",
        seagreen: "#2e8b58",
        ice: "#e5fbef",
        darkblue: "#5243aa",
        orange: "#ff991f",
        teal: "#00875a",
        "acid-green": "#6acd00",
        magenta: "#ec31ff",
        moccasin: "#fdf0ba",
        skyblue: "#41b2ff",
        seashell: "#fff3f0",
        orangered: "#f2461f",
        "lighten-blue": "#f7faff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
