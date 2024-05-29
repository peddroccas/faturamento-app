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


interface DataValue {
  values: number[];
  growth: (string | number)[]
  dates: string[];
}


export function Faturamento() {
  const [selectedMonth, setSelectedMonth] = useState(months[disabledMonths() - 1]);
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

  return (
    <div className="flex-1 h-screen w-auto flex flex-col">
      <header className="flex gap-4 p-4 border-b border-b-slate-400">
        <h1 className="text-3xl">Faturamento</h1>
        <Select id='months' disabledOptions={disabledMonths()} value={selectedMonth} onChange={handleMonthOnChange} options={months} />
        <Select id='years' value={selectedYear} onChange={handleYearOnChange} options={years} />
      </header>
      <main className="w-auto m-4 gap-2 text-bluesr-500 flex items-center flex-col">
        <article className="flex-1 bg-aliceblue rounded-2xl my-4 p-2 flex flex-col items-center justify-center">
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
        <article className="flex-1 bg-aliceblue rounded-2xl my-4 p-2 flex flex-col items-center justify-center">
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
