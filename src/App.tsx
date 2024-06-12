import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

import { ThemeProvider } from '@mui/material/styles'
import { theme } from './themes/DefaultTheme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}
