/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          100: '#E6C694',
          200: '#F2D19B',
          250: '#FFFFE8',
          300: '#FFdCA3',
          400: '#FFE2A3',
          500: '#FFF4DC',
        },
        tetriary: {
          100: '#B88655',
          150: '#FFC97F',
          200: '#CDB183',
          250: '#FFFFC4',
          300: '#E3B645',
          350: '#FFFF67',
          400: '#F6CF65',
          450: '#FFFF97',
          500: '#899B78',
          550: '#CDE8B4',
          600: '#B38486',
          650: '#FFC6C9',
        },
        availability: {
          200: '#6C757D',
          300: '#C59B9D',
        },
        text: {
          dark: '#66481D',
          light: '#D9B787'
        }
      },
    },
    fontFamily: {
      clear: ['Poppins', 'sans-serif'],
      fancy: ['Pacifico', 'cursive'],
      semi: ['Merriweather', 'serif'],
      nav: ['Playfair Display', 'serif'],
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-shadow"),
  ],
}