/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: 'minmax(18rem, 20rem) 1fr',
      },
      fontFamily: {
        roboto: 'Roboto',
        agdasima: 'Agdasima',
        montserrat: 'Montserrat'
      },
      colors: {
        aliceblue: '#f0f8ff',
        'aliceblue-500': '#D4DCE2',
        'bluesr-200' : '#116EBA',
        'bluesr-400': '#0C4B80',
        'bluesr-500': '#093A62',
        'bluesr-800' : '#041728',
        'redsr-400': '#E4252F',
        'redsr-500': '#C62028',
      }
    },
  },
  plugins: [],
}

