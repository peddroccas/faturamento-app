import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { ChangeEvent, useState } from "react";
import { BasicNumberField } from "./BasicNumberField";
import { Select } from "./Select";
import { disabledMonths, months, years } from "../services/api";


interface NewFaturamentoDialogProps {
  open: boolean;
  onClose: () => void
}

export function NewFaturamentoDialog({ open, onClose }: NewFaturamentoDialogProps) {
  const [value, setValue] = useState<string>('')
  const [selectedMonth, setSelectedMonth] = useState(months[disabledMonths() - 1]);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);

  function handleOnChangeValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleOnClose() {
    setValue('')
    onClose()
  }

  function handleMonthOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(event.target.value);
  }

  function handleYearOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value);
  }

  return (
    <Dialog open={open}
      onClose={handleOnClose}
      className=""
    >
      <DialogTitle className="text-bluesr-500">Novo Faturamento</DialogTitle>
      <DialogContent className="flex flex-col gap-3 !pt-2 !pb-2">
        <DialogContentText>Selecione a data e preencha o valor</DialogContentText>
        <div className="flex gap-2 h-8">
          <Select id="months" value={selectedMonth} disabledOptions={disabledMonths()} options={months} onChange={handleMonthOnChange} />
          <Select id="years" value={selectedYear} disabledOptions={years.length+1} options={years} onChange={handleYearOnChange} />
        </div>
        <BasicNumberField value={value} onChange={handleOnChangeValue} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="redsr-400" >Cancelar</Button>
        <Button type="submit" color="bluesr-500" disabled={value ? false : true} >Cadastrar</Button>
      </DialogActions>
    </Dialog>
  )
}