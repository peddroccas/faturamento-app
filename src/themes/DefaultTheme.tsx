import { PaletteColorOptions, createTheme } from '@mui/material/styles'
declare module '@mui/material/styles' {
  interface CustomPalette {
    'green-700': PaletteColorOptions
    'orange-500': PaletteColorOptions
    'brown-300': PaletteColorOptions
    'green-300': PaletteColorOptions
    'bluesr-800': PaletteColorOptions
    'green-500': PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    'green-700': true
    'orange-500': true
    'brown-300': true
    'green-300': true
    'bluesr-800': true
    'green-500': true
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    'green-700': true
    'orange-500': true
    'brown-300': true
    'green-300': true
    'bluesr-800': true
    'green-500': true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    'green-700': true
    'orange-500': true
    'brown-300': true
    'green-300': true
    'bluesr-800': true
    'green-500': true
  }
}
declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    'green-700': true
    'orange-500': true
    'brown-300': true
    'green-300': true
    'bluesr-800': true
    'green-500': true
  }
}

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } })
export const theme = createTheme({
  palette: {
    'green-700': createColor('#3E7064'),
    'orange-500': createColor('#F0430C'),
    'brown-300': createColor('#70533E'),
    'green-300': createColor('#093A62'),
    'bluesr-800': createColor('#041728'),
    'green-500': createColor('#35B091'),
  },
})
