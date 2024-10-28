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
          150: '#E6A76A',
          200: '#D49A6A',
          250: '#FFC084',
          300: '#E59B4C',
          350: '#FFC25F',
          400: '#B38486',
          450: '#E0A5A7',
          500: '#899B78',
          550: '#ABC296',
        },
        availability: {
          200: '#C2DCFB',
          300: '#FFC1C1',
          400: '#FFE6A4',
          500: '#C3F2EA',

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