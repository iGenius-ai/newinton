/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        circular: ["CircularStd-Book", "sans-serif"],
        circularMedium: ["CircularStd-Medium", "sans-serif"],
        circularBold: ["CircularStd-Bold", "sans-serif"],
        circularBlack: ["CircularStd-Black", "sans-serif"],
        outfitLight: ["Outfit-Light", "sans-serif"],
        outfitBlack: ["Outfit-Black", "sans-serif"],
        outfitBold: ["Outfit-Bold", "sans-serif"],
        outfitMedium: ["Outfit-Medium", "sans-serif"],
        outfitRegular: ["Outfit-Regular", "sans-serif"]
      },
    },
  },
  plugins: [],
};
