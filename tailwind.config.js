/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,tsx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto',
        agdasima: 'Agdasima',
        montserrat: 'Montserrat',
      },
      colors: {
        aliceblue: '#f0f8ff',
        'green-300': '#0CF0B7',
        'green-500': '#35B091',
        'green-700': '#3E7064',
        'orange-500': '#F0430C',
        'brown-300': '#70533E',
        'brown-500': '#463326',
      },
    },
  },
  plugins: [],
}
