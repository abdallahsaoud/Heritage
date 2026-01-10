/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#A81712',
        'burgundy-light': '#C01A14',
        'burgundy-dark': '#8B120E',
        black: '#000000',
        white: '#FFFFFF',
      },
      fontFamily: {
        display: ['Noto Serif Display', 'serif'],
        subtitle: ['Bodoni Moda', 'serif'],
        serif: ['Bodoni Moda', 'serif'],
        sans: ['ASAP', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

