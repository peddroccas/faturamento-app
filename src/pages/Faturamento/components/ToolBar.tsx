import { Tooltip } from '@mui/material'
import { Select } from '../../../components/Select'
import { EditFaturamentoDialog } from './EditFaturamentoDialog'
import { NewFaturamentoDialog } from './NewFaturamentoDialog'
import { months, years } from '../../../services/api'
import { Add, Edit } from '@mui/icons-material'
import { ChangeEvent, useState } from 'react'

interface ToolBarProps {
  selectedMonth: string
  selectedYear: string
  handleMonthOnChange: (event: ChangeEvent<HTMLSelectElement>) => void
  handleYearOnChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function ToolBar({
  selectedMonth,
  selectedYear,
  handleMonthOnChange,
  handleYearOnChange,
}: ToolBarProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [editOpen, setEditOpen] = useState<boolean>(false)

  function handleNewFaturamentoOnClick() {
    setOpen(true)
  }

  function handleCloseFaturamentoDialog() {
    setOpen(false)
  }

  function handleOnClickEditFaturamento() {
    setEditOpen(true)
  }

  function handleCloseEditFaturamentoDialog() {
    setEditOpen(false)
  }

  return (
    <div className="flex items-center justify-center gap-2 rounded-xl p-2 text-center text-aliceblue">
      <div className="flex gap-2 p-2">
        <h2 className="flex items-center font-roboto text-xl font-medium">
          Mês em destaque:
        </h2>
        <Select
          id="months"
          value={selectedMonth}
          onChange={handleMonthOnChange}
          options={months}
        />
        <Select
          id="years"
          value={selectedYear}
          onChange={handleYearOnChange}
          options={years}
        />
      </div>
      <Tooltip title="Editar faturamento" placement="right">
        <button
          onClick={handleOnClickEditFaturamento}
          className="flex h-fit items-center rounded-full p-1 transition-all hover:bg-bluesr-500"
        >
          <Edit />
        </button>
      </Tooltip>
      <EditFaturamentoDialog
        open={editOpen}
        onClose={handleCloseEditFaturamentoDialog}
      />
      <Tooltip title="Adicionar novo faturamento" placement="right">
        <button
          onClick={handleNewFaturamentoOnClick}
          className="flex h-fit items-center rounded-full p-1 transition-all hover:bg-bluesr-500"
        >
          <Add />
        </button>
      </Tooltip>
      <NewFaturamentoDialog
        open={open}
        onClose={handleCloseFaturamentoDialog}
      />
    </div>
  )
}
