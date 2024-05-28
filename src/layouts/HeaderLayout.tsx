import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function HeaderLayout() {
  return (
    <div className="h-screen bg-bluesr-400 font-montserrat">
      <Header />
      <Outlet />
    </div>
  )
}
