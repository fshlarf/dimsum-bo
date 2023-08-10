/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".wrapper": {
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1.3rem",
          paddingRight: "1.3rem",

          "@screen sm": {
            maxWidth: "640px",
            paddingLeft: "1.3rem",
            paddingRight: "1.3rem",
          },
          "@screen md": {
            maxWidth: "768px",
            paddingLeft: "30px",
            paddingRight: "30px",
          },
          "@screen lg": {
            maxWidth: "1024px",
            paddingLeft: "0",
            paddingRight: "0",
          },
          "@screen xl": {
            maxWidth: "1440px",
            paddingLeft: "0",
            paddingRight: "0",
          },
        },
        ".title-text": {
          fontSize: "14px",
          "@screen md": {
            maxWidth: "768px",
            fontSize: "16px",
          },
          "@screen lg": {
            maxWidth: "1024px",
            fontSize: "20px",
          },
          "@screen xl": {
            maxWidth: "1440px",
            fontSize: "20px",
          },
        },
        ".button-text": {
          fontSize: "12px",
          fontWeight: "600",
          "@screen md": {
            maxWidth: "768px",
            fontSize: "14px",
          },
          "@screen lg": {
            maxWidth: "1024px",
            fontSize: "14px",
          },
          "@screen xl": {
            maxWidth: "1440px",
            fontSize: "14px",
          },
        },
      });
    },
  ],
};
