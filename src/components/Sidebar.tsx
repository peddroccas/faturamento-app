import { Close, Menu, BarChart, PieChart } from '@mui/icons-material'
import { Drawer, IconButton } from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleSidebar() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="min-h-screen border-r border-green-700">
      <Drawer
        variant="permanent"
        className=" h-full"
        open={isOpen}
        sx={{
          '& .MuiDrawer-paper': {
            position: 'relative',
            width: isOpen ? 240 : 64,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#463326',
          },
        }}
      >
        <div
          className={`flex w-full ${isOpen ? 'justify-end' : 'justify-center'} p-2`}
        >
          <IconButton onClick={handleSidebar} color="green-700">
            {isOpen ? <Close /> : <Menu />}
          </IconButton>
        </div>
        <h1
          className={`text-2xl font-semibold text-green-700 ${isOpen ? 'block' : 'hidden'}`}
        >
          Tabelas
        </h1>
        <div className="mt-4 flex w-full flex-col gap-4">
          <NavLink
            className={({ isActive }) =>
              `hover:bg-brown-300 flex items-center gap-2 rounded-xl p-2 transition-colors hover:text-green-700 ${
                isActive ? 'bg-brown-300 text-aliceblue' : 'text-green-700'
              } ${isOpen ? 'justify-start' : 'justify-center'}`
            }
            to="/home/faturamento"
          >
            <BarChart />
            {isOpen && <span>Faturamento</span>}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:bg-brown-300 flex items-center gap-2 rounded-xl p-2 transition-colors hover:text-green-700 ${
                isActive ? 'bg-brown-300 text-aliceblue' : 'text-green-700'
              } ${isOpen ? 'justify-start' : 'justify-center'}`
            }
            to="/home/perdas"
          >
            <PieChart />
            {isOpen && <span>Perdas</span>}
          </NavLink>
        </div>
      </Drawer>
    </div>
  )
}
