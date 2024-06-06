import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { BasicNumberField } from './BasicNumberField'
import { Select } from './Select'
import {
  lastMonthFilled,
  months,
  setNewFaturamentoMonth,
  years,
} from '../services/api'
import { AlertComponent, Severity } from './AlertComponent'

interface NewFaturamentoDialogProps {
  open: boolean
  onClose: () => void
}

export function NewFaturamentoDialog({
  open,
  onClose,
}: NewFaturamentoDialogProps) {
  const [value, setValue] = useState<string>('')
  const [selectedMonth, setSelectedMonth] = useState(
    months[lastMonthFilled + 1],
  )
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1])
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [severity, setSeverity] = useState<Severity>()

  const handleAlertClose = () => {
    setIsAlertOpen(false)
  }

  async function handleSubmitNewFaturamento() {
    try {
      const valueNumber = Number(value.replace(/[^\d,]/g, '').replace(',', '.'))
      await setNewFaturamentoMonth(valueNumber, selectedMonth, selectedYear)
      setIsAlertOpen(true)
      setSeverity('success')
    } catch (error) {
      setIsAlertOpen(true)
      setSeverity('error')
      console.error(error)
    }
  }

  function handleOnChangeValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleOnClose() {
    setValue('')
    onClose()
  }

  function handleMonthOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(event.target.value)
  }

  function handleYearOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value)
  }

  return (
    <Dialog open={open} onClose={handleOnClose} className="">
      <DialogTitle className="text-bluesr-500">Novo Faturamento</DialogTitle>
      <DialogContent className="flex flex-col gap-3 !pb-2 !pt-2">
        <DialogContentText>
          Selecione a data e preencha o valor
        </DialogContentText>
        <div className="flex h-8 gap-2">
          <Select
            id="months"
            value={selectedMonth}
            disabledOptions={lastMonthFilled}
            reverse
            options={months}
            onChange={handleMonthOnChange}
          />
          <Select
            id="years"
            value={selectedYear}
            disabledOptions={years.length + 1}
            options={years}
            onChange={handleYearOnChange}
          />
        </div>
        <BasicNumberField value={value} onChange={handleOnChangeValue} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="redsr-400">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmitNewFaturamento}
          type="submit"
          color="bluesr-500"
          disabled={!value}
        >
          Cadastrar
        </Button>
        <AlertComponent
          open={isAlertOpen}
          onClose={handleAlertClose}
          severity={severity}
        ></AlertComponent>
      </DialogActions>
    </Dialog>
  )
}
