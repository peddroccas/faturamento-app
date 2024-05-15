import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'

export function HomeLayout() {
  return (
    <div className="grid grid-cols-app h-screen bg-bluesr-400 font-montserrat">
      <Sidebar />
      <Outlet />
    </div>
  )
}
