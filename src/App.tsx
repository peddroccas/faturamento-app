import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { AuthContextProvider } from './contexts/AuthContext'

import { ThemeProvider } from '@mui/material/styles'
import { theme } from './themes/DefaultTheme'

export function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  )
}
