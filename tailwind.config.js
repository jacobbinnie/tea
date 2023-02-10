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
      primary: '#4e67f5', // MAIN COLOR
      secondary: '#0a0a0a', // OFF-BLACK
      tertiary: '#fffefe', // OFF-WHITE
      gray: {
        100: '#f6f9fa', // BACKGROUND
        200: '#eceff0', // LIKE / DISLIKE BUTTONS
        300: '#d1d8dc', // NAV BUTTONS
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
