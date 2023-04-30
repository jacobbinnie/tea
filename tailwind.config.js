/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /columns-./,
    },
  ],
  theme: {
    fontFamily: {
      Poppins: ['Poppins, sans-serif'],
      sans: ['Poppins, sans-serif'],
    },
    colors: {
      primary: '#ff8586', // PINK
      secondary: '#000274', // BLUE
      tertiary: '#fdfdfd', // WHITE,
      quarterly: '#dcdedc', // OFF-WHITE,
      backdrop: '#01025c',
    },

    extend: {
      fontFamily: {
        sans: [
          '"Poppins"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
    plugins: [require('@tailwindcss/forms')],
  },
}
