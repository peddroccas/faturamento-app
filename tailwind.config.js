/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        aliceblue: '#f0f8ff',
        blueSr: '#0C4B80',
        blueDSr: '#093A62',
        redSr: '#E4252F',
        redDSr: '#C62028',
      }
    },
  },
  plugins: [],
}

