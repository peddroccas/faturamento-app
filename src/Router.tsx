import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./pages/LoginForm";
import { Home } from "./pages/Home";
import { HeaderLayout } from "./layouts/HeaderLayout";
import { HomeLayout } from "./layouts/HomeLayout"
import { Faturamento } from "./components/Faturamento";


export function Router() {

  return (
    <Routes>
      <Route path="/" element={<HeaderLayout />}>
        <Route path="/home" element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/faturamento" element={<Faturamento />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
      </Route>
    </Routes>
  );
}
