import { Outlet } from 'react-router-dom'

// import { Sidebar } from '../components/Sidebar'

export function HomeLayout() {
  return (
    // grid grid-cols-app
    <div className=" h-screen bg-bluesr-400 font-montserrat text-aliceblue">
      {/* <Sidebar > */}
      <Outlet />
    </div>
  )
}
