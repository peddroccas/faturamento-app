import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { BasicNumberField } from '../../../components/BasicNumberField'
import { Select } from '../../../components/Select'
import { months, FaturamentoClass, years } from '../../../services/api'
import { HomeContext } from '../../../contexts/HomeContext'

interface NewFaturamentoDialogProps {
  open: boolean
  onClose: () => void
}

export function NewFaturamentoDialog({
  open,
  onClose,
}: NewFaturamentoDialogProps) {
  const { lastMonthFilled, handleReload, selectedStore, handleAlertSeverity } =
    useContext(HomeContext)
  const [value, setValue] = useState<string>('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1])

  useEffect(() => {
    async function fetchLastMonthFilled() {
      setSelectedMonth(months[lastMonthFilled! + 1])
    }
    fetchLastMonthFilled()
  }, [lastMonthFilled])

  async function handleSubmitNewFaturamento() {
    try {
      const valueNumber = Number(value.replace(/[^\d,]/g, '').replace(',', '.'))
      await FaturamentoClass.setFaturamentoMonth(
        valueNumber,
        selectedStore,
        selectedMonth,
        selectedYear,
      )
      handleAlertSeverity('success')
      handleOnClose()
      handleReload()
    } catch (error) {
      handleAlertSeverity('error')
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
      <DialogTitle className="text-green-500">Novo Faturamento</DialogTitle>
      <DialogContent className="flex flex-col gap-3 !pb-2 !pt-2">
        <DialogContentText>
          Selecione a data e preencha o valor
        </DialogContentText>
        <div className="flex h-8 gap-2">
          <Select
            className="p-1"
            id="months"
            value={selectedMonth}
            disabledOptions={lastMonthFilled}
            reverse
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
        <BasicNumberField value={value} onChange={handleOnChangeValue} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} color="error">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmitNewFaturamento}
          type="submit"
          color="green-500"
          disabled={!value}
        >
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
