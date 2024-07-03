import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginForm } from './pages/LoginForm'
import { Home } from './pages/Home'
import { HeaderLayout } from './layouts/HeaderLayout'
import { HomeLayout } from './layouts/HomeLayout'
import { Faturamento } from './pages/Faturamento/Faturamento'
import { Perdas } from './pages/Perdas/Perdas'
import { ValorDiario } from './pages/ValorDiario/ValorDiario'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/" element={<HeaderLayout />}>
        <Route path="home" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="faturamento" element={<Faturamento />} />
          <Route path="valormedio" element={<ValorDiario />} />
          <Route path="perdas" element={<Perdas />} />
        </Route>
        <Route path="login" element={<LoginForm />} />
      </Route>
    </Routes>
  )
}
