import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { HomeContextProvider } from '../contexts/HomeContext'

// import { Sidebar } from '../components/Sidebar'

export function HomeLayout() {
  return (
    // grid grid-cols-app
    <HomeContextProvider>
      <div className="flex min-h-screen overflow-auto bg-bluesr-400 font-montserrat text-aliceblue">
        <Sidebar />
        <Outlet />
      </div>
    </HomeContextProvider>
  )
}
