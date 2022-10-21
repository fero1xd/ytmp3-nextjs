/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        darkAccent: '#131313',
        primaryBtn: '#0077FF',
        primaryBtnHvr: '#014a9c',
        input: '#151515',
        link: '#014A9C',
      },
    },
  },
  plugins: [],
};
