import { PaletteColorOptions, createTheme } from '@mui/material/styles'
declare module '@mui/material/styles' {
  interface CustomPalette {
    aliceblue: PaletteColorOptions
    'bluesr-200': PaletteColorOptions
    'bluesr-400': PaletteColorOptions
    'bluesr-500': PaletteColorOptions
    'bluesr-800': PaletteColorOptions
    'redsr-400': PaletteColorOptions
    'redsr-500': PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    aliceblue: true
    'bluesr-200': true
    'bluesr-400': true
    'bluesr-500': true
    'bluesr-800': true
    'redsr-400': true
    'redsr-500': true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    aliceblue: true
    'bluesr-200': true
    'bluesr-400': true
    'bluesr-500': true
    'bluesr-800': true
    'redsr-400': true
    'redsr-500': true
  }
}
declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    aliceblue: true
    'bluesr-200': true
    'bluesr-400': true
    'bluesr-500': true
    'bluesr-800': true
    'redsr-400': true
    'redsr-500': true
  }
}

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } })
export const theme = createTheme({
  palette: {
    aliceblue: createColor('#f0f8ff'),
    'bluesr-200': createColor('#116EBA'),
    'bluesr-400': createColor('#0C4B80'),
    'bluesr-500': createColor('#093A62'),
    'bluesr-800': createColor('#041728'),
    'redsr-400': createColor('#E4252F'),
    'redsr-500': createColor('#C62028'),
  },
})
