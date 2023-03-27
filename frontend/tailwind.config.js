/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
      Quicksand: ['Quicksand', 'sans-serif'],
    },
    extend: {
      colors: {
        'indeed-blue': '#003599',
        'indeed-bgTitleColor': '#e5e4e2',
        'indeed-bgItemColor': '#f3f2f0',
        'indeed-inputBorderColor': '#acacac',
      },
    },
  },
  plugins: [],
};
