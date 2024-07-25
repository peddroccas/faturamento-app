import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { HomeContextProvider } from '../contexts/HomeContext'

// import { Sidebar } from '../components/Sidebar'

export function HomeLayout() {
  return (
    // grid grid-cols-app
    <HomeContextProvider>
      <div className="bg-brown-500 flex min-h-screen overflow-auto font-montserrat text-green-300">
        <Sidebar />
        <Outlet />
      </div>
    </HomeContextProvider>
  )
}
