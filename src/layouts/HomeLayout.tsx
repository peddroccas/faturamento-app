import { Outlet } from 'react-router-dom'

// import { Sidebar } from '../components/Sidebar'

export function HomeLayout() {
  return (
    // grid grid-cols-app
    <div className=" min-h-screen overflow-auto bg-bluesr-400 font-montserrat text-aliceblue">
      {/* <Sidebar > */}
      <Outlet />
    </div>
  )
}
