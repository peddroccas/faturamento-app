import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router.js";
import { ThemeProvider } from "@mui/material";
import { theme } from "./themes/DefaultTheme.js";


export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}