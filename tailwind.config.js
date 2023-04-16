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
      primary: '#5745b7', // MAIN COLOR
      secondary: '#101014', // OFF-BLACK
      tertiary: '#fefffe', // OFF-WHITE,
      black: '#000000',
      backdrop: '#16151c',
      gray: {
        100: '#363540',
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
