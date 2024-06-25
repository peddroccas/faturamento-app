import { Tooltip } from '@mui/material'
import { Select } from '../components/Select'
import { months, stores, years } from '../services/api'
import { Add, Edit } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { HomeContext } from '../contexts/HomeContext'

interface DialogProps {
  open: boolean
  onClose: () => void
}

interface ToolBarProps {
  EditDialog: React.ComponentType<DialogProps>
  NewDialog: React.ComponentType<DialogProps>
}

export function ToolBar({ EditDialog, NewDialog }: ToolBarProps) {
  const {
    selectedMonth,
    selectedYear,
    selectedStore,
    handleMonthOnChange,
    handleStoreOnChange,
    handleYearOnChange,
  } = useContext(HomeContext)
  const [newOpen, setNewOpen] = useState<boolean>(false)
  const [editOpen, setEditOpen] = useState<boolean>(false)

  function handleNewOnClick() {
    setNewOpen(true)
  }

  function handleCloseNewDialog() {
    setNewOpen(false)
  }

  function handleOnClickEdit() {
    setEditOpen(true)
  }

  function handleCloseEditDialog() {
    setEditOpen(false)
  }

  return (
    <div className="flex items-center justify-center gap-1 rounded-xl p-2 text-center text-aliceblue">
      <div className="flex gap-2 p-2">
        <Select
          className="p-1"
          id="Stores"
          options={stores}
          value={selectedStore}
          onChange={handleStoreOnChange}
        />
        <Select
          className="p-1"
          id="months"
          value={selectedMonth}
          onChange={handleMonthOnChange}
          options={months}
        />
        <Select
          className="p-1"
          id="years"
          value={selectedYear}
          onChange={handleYearOnChange}
          options={years}
        />
      </div>
      <Tooltip title="Editar " placement="top">
        <button
          onClick={handleOnClickEdit}
          className="flex h-fit items-center rounded-full p-1 transition-all hover:bg-bluesr-500"
        >
          <Edit />
        </button>
      </Tooltip>
      <EditDialog open={editOpen} onClose={handleCloseEditDialog} />
      <Tooltip title="Adicionar novo" placement="right">
        <button
          onClick={handleNewOnClick}
          className="flex h-fit items-center rounded-full p-1 transition-all hover:bg-bluesr-500"
        >
          <Add />
        </button>
      </Tooltip>
      <NewDialog open={newOpen} onClose={handleCloseNewDialog} />
    </div>
  )
}
