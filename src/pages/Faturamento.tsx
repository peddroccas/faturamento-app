import { ChangeEvent, useEffect, useState } from "react";
import { Table } from "../components/Table";
import {
  disabledMonths,
  getMonthsValues,
  getYearsValues,
} from "../services/api";
import { months, years } from "../services/api";
import { CircularProgress } from "@mui/material";
import { Select } from "../components/Select";
import { Add } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { NewFaturamentoDialog } from "../components/NewFaturamentoDialog";

interface DataValue {
  values: number[];
  growth: (string | number)[]
  dates: string[];
}


export function Faturamento() {
  const [selectedMonth, setSelectedMonth] = useState(months[disabledMonths() - 2]);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [yearsData, setYearsData] = useState<DataValue | undefined>({
    values: [],
    growth: [],
    dates: []
  });
  const [monthsData, setMonthsData] = useState<DataValue | undefined>({
    values: [],
    growth: [],
    dates: []
  });
  const [isVisible, setIsVisible] = useState<string>();
  const [open, setOpen] = useState<boolean>(false)


  // Observa para ver se está carregando, se tiver ele põe o componente de carregamento
  useEffect(() => {
    function loading() {
      try {
        if (isLoading) {
          setIsVisible("visible max-h-none");
        } else {
          setIsVisible("invisible max-h-0");
        }
      } catch (error) { }
    }
    loading();
  }, [isLoading]);

  // Busca no db os dados assim que carrega a página
  useEffect(() => {
    async function fetchYears() {
      try {
        const response = await getYearsValues(selectedMonth);
        //console.log(response)
        setYearsData(response);
        setIsLoading(false);
      } catch (error) { }
    }
    fetchYears();
  }, [selectedMonth]);

  useEffect(() => {
    async function fetchMonths() {
      try {
        const response = await getMonthsValues(selectedMonth, selectedYear);
        //console.log(response)
        setMonthsData(response);
        setIsLoading(false);
      } catch (error) { }
    }
    fetchMonths();
  }, [selectedMonth, selectedYear]);

  function handleMonthOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(event.target.value);
    setIsLoading(true);
  }

  function handleYearOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value);
    setIsLoading(true);
  }
  function handleNewFaturamentoOnClick() {
    setOpen(true)
  }

  function handleCloseFaturamentoDialog() {
    setOpen(false)
  }

  return (
    <div className="flex-1 h-screen w-auto flex flex-col">
      <header className="flex gap-4 p-4 border-b border-b-slate-400">
        <h1 className="text-3xl">Faturamento</h1>
      </header>
      <main className="w-auto m-4 gap-2 text-bluesr-500 flex items-center flex-col">
        <div className="flex items-center text-center justify-center w-1/2 p-2 gap-2 text-aliceblue rounded-xl">
          <div className="flex p-2 gap-2">
            <h2 className="flex items-center font-roboto font-medium text-xl">Mês em destaque:</h2>
            <Select id='months' disabledOptions={disabledMonths()} value={selectedMonth} onChange={handleMonthOnChange} options={months} />
            <Select id='years' value={selectedYear} onChange={handleYearOnChange} options={years} />
          </div>
          <Tooltip title='Adicionar novo faturamento' placement="right">
            <button onClick={handleNewFaturamentoOnClick} className="h-fit p-1 transition-all hover:bg-bluesr-500 rounded-full flex items-center">
              <Add />
            </button>
          </Tooltip>
          <NewFaturamentoDialog open={open} onClose={handleCloseFaturamentoDialog}/>
        </div>
        <article className="flex-1 w-5/6 bg-aliceblue rounded-2xl my-4 p-2 flex flex-col items-center justify-center">
          <h2 className="font-medium text-2xl font-roboto">Últimos anos</h2>
          <Table
            headers={yearsData!.dates}
            rows={[yearsData!.values, yearsData!.growth]}
            isLoading={isLoading}
          ></Table>
          <CircularProgress
            color="bluesr-200"
            className={`${isVisible} fixed`}
          />
        </article>
        <article className="flex-1 w-1/2 bg-aliceblue rounded-2xl my-4 p-2 flex flex-col items-center justify-center">
          <h2 className="font-medium text-2xl font-roboto">Últimos meses</h2>
          <Table
            headers={monthsData!.dates}
            rows={[monthsData!.values, monthsData!.growth]}
            isLoading={isLoading}
          ></Table>
          <CircularProgress
            color="bluesr-200"
            className={`${isVisible} fixed`}
          />
        </article>
      </main>
    </div>
  );
}
