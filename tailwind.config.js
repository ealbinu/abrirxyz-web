module.exports = {
  content: ["./pages/**/*.{vue,js,ts}", "./components/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        menu_color1: "var(--menu-color1)",
        menu_color2: "var(--menu-color2)",
        menu_color3: "var(--menu-color3)",
      },
      fontFamily: {
        menu_font1: "var(--menu-font1)",
        menu_font2: "var(--menu-font2)",
      },
    },
  },
};
