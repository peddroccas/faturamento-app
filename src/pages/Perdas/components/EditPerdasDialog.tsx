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
import { PerdasClass, months, years } from '../../../services/api'
import { HomeContext } from '../../../contexts/HomeContext'

interface EditPerdaDialogProps {
  open: boolean
  onClose: () => void
}

export function EditPerdasDialog({ open, onClose }: EditPerdaDialogProps) {
  const { lastMonthFilled, handleReload, selectedStore, handleAlertSeverity } =
    useContext(HomeContext)
  const [value, setValue] = useState<string>('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  useEffect(() => {
    async function fetchData() {
      if (lastMonthFilled) {
        const month = await PerdasClass.getValues(
          selectedStore,
          selectedYear,
          selectedMonth,
        )
        setValue(String(month))
      }
    }
    fetchData()
  }, [lastMonthFilled, selectedMonth, selectedStore, selectedYear])

  async function handleSubmitNewPerda() {
    try {
      const valueNumber = Number(value.replace(/[^\d,]/g, '').replace(',', '.'))
      await PerdasClass.setPerdaMonth(
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
    setSelectedMonth('')
    setSelectedYear('')
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
      <DialogTitle className="text-bluesr-500">Editar perda</DialogTitle>
      <DialogContent className="flex flex-col gap-3 !pb-2 !pt-2">
        <DialogContentText>
          Selecione a loja, e data, e preencha o valor
        </DialogContentText>
        <div className="flex h-8 gap-2">
          <Select
            className="p-1"
            id="months"
            value={selectedMonth}
            disabledOptions={lastMonthFilled}
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
        <BasicNumberField
          disabled={!(selectedMonth && selectedYear)}
          value={value}
          onChange={handleOnChangeValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} color="redsr-400">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmitNewPerda}
          type="submit"
          color="bluesr-500"
          disabled={!value}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
