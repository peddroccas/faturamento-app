import { Routes, Route} from "react-router-dom";
import { LoginForm } from "./pages/LoginForm";
import { Home } from "./pages/Home";
import { DefaultLayout } from "./layouts/DefaultLayout.tsx";


export function Router() {
  
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />}/>
      </Route>
    </Routes>
  );
}
