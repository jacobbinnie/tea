/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
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
      primary: '#301fed', // MAIN COLOR
      secondary: '#010001', // OFF-BLACK
      tertiary: '#fefffe', // OFF-WHITE
      gray: {
        100: '#323332', // BORDERS
      },
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
