module.exports = {
  content: [
    "./pages/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "formkit.theme.ts",
  ],
  theme: {
    extend: {
      colors: {
        xyzmain: "#030679",
        xyzsec: "#7C96F6",
        xyzsec2: "#5A7BF5",
        xyzaccent: "#ffdd04",
        menu_color1: "var(--menu-color1)",
        menu_color2: "var(--menu-color2)",
        menu_color3: "var(--menu-color3)",
      },
      fontFamily: {
        menu_font0: "Outfit",
        menu_font1: "var(--menu-font1)",
        menu_font2: "var(--menu-font2)",
      },
    },
  },
};
