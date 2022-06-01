module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          50: "#EBF2FE",
          100: "#D7E6FD",
          200: "#B0CDFB",
          300: "#89B4FA",
          400: "#629BF8",
          500: "#3B82F6",
          600: "#0B61EE",
          700: "#084BB8",
          800: "#063583",
          900: "#041F4D",
        },
        accent: {
          DEFAULT: "#EC4899",
          50: "#FDEEF6",
          100: "#FBDCEB",
          200: "#F8B7D7",
          300: "#F492C2",
          400: "#F06DAE",
          500: "#EC4899",
          600: "#E4187D",
          700: "#B11261",
          800: "#7F0D45",
          900: "#4C0829",
        },
      },
      animation: {
        "slide-right":
          "slide-right 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left":
          "slide-left 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
    },
  },
  plugins: [],
};
