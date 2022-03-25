module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: '#52bab1',
        brandDark: '#3a8982'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
