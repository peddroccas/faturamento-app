import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function HeaderLayout() {
  return (
    <div className="bg-brown-500 h-screen font-montserrat">
      <Header />
      <Outlet />
    </div>
  )
}
