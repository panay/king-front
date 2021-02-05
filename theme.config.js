const { ThemeBuilder, Theme } = require("tailwindcss-theming");

// todo: составить тему по дизайну
const colors = {
  black: "#000000",
  white: "#fff",
  transparent: "transparent",

  "button-link": "#0052cc",
  text: "#181818",
  "icon-grey": "#8f92a1",
};
const mainTheme = new Theme()
  .default()
  .colors(colors)
  .opacityVariant("muted", 0.55, "dusty-orange")
  .opacityVariant("hover", 0.3, "dusty-orange")
  .opacityVariant("hover", 0.3, "yellow-orange")
  .opacityVariant("hover", 0.3, "dark-mint")
  .opacityVariant("hover", 0.3, "off-white");

const darkTheme = new Theme()
  .colors(colors)
  .opacityVariant("muted", 0.55, "dusty-orange")
  .opacityVariant("hover", 0.3, "dusty-orange")
  .opacityVariant("hover", 0.3, "yellow-orange")
  .opacityVariant("hover", 0.3, "dark-mint")
  .opacityVariant("hover", 0.3, "off-white");

module.exports = new ThemeBuilder()
  .asDataThemeAttribute()
  .default(mainTheme)
  .dark(darkTheme);
