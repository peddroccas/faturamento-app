import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router.js";

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}