/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sandDollar: "#C1B199",
        beige: "#C3A57C",
        ivory: "#DED8CD",
        salmon: "#C1937D",
      },
    },
  },
  plugins: [],
};
