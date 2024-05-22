import { ChangeEvent, useEffect, useState } from "react";
import { Table } from "../components/Table";
import { getValues } from "../services/api";
import { months, years } from "../services/api";
import { CircularProgress } from "@mui/material";
import { capitalize } from 'lodash';
import { BarGraphic } from "../components/BarGraphic";

interface Month {
  monthRow: number[],
  monthGrowth: (string | number)[]
}

export function Faturamento() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState(years[1]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<Month | undefined>({ monthRow: [], monthGrowth: [] });
  const [isVisible, setIsVisible] = useState<string>()

  // Observa para ver se está carregando, se tiver ele põe o componente de carregamento
  useEffect(() => {
   function loading() {
      try {
        if(isLoading){
          setIsVisible('visible max-h-none')
        }
        else{
          setIsVisible('invisible max-h-0')
        }
      } catch (error) {
      }
    }
    loading();
  }, [isLoading]);

// Busca no db os dados assim que carrega a página
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getValues(selectedMonth, selectedYear);
        setData(response);
        setIsLoading(false)
      } catch (error) {
      }
    }
    fetchData();
  }, [selectedMonth, selectedYear]);

  function handleMonth(event: ChangeEvent<HTMLSelectElement>){
    setSelectedMonth(event.target.value)
    setIsLoading(true)
  }

  function handleYear(event: ChangeEvent<HTMLSelectElement>){
    setSelectedYear(event.target.value)
    setIsLoading(true)

  }
  return (
    <div className="flex-1 h-screen w-auto flex flex-col">
      <header className="flex gap-4 p-4 border-b border-b-slate-400">
        <h1 className="text-3xl">Faturamento</h1>
        <select value={selectedMonth} onChange={handleMonth} className="text-bluesr-500 rounded-xl text-center focus-visible: outline-bluesr-500">
          {months.map((month) => (
            <option key={month} className="" value={month}>{capitalize(month)}</option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYear} className="text-bluesr-500 rounded-xl text-center focus-visible: outline-bluesr-500">
          {years.map((year) => (
            <option key={year} className="text" value={year}>{year.toUpperCase()}</option>
          ))}
        </select>
      </header>
      <main className="m-4 gap-2 text-bluesr-500 flex">
        <section className="w-fit h-min bg-aliceblue rounded-2xl my-4 p-2 flex flex-col items-center justify-center">
          <Table headers={['Valor', 'Mês passado', 'Ano passado']} rows={[data!.monthRow, data!.monthGrowth]} isLoading={isLoading}></Table>
          <CircularProgress color="bluesr-200" className={`${isVisible} fixed`} />
        </section>
        <section className=" my-4 p-2 w-full flex items-center justify-center bg-aliceblue rounded-2xl">
          <div className="flex items-center justify-center">
          <BarGraphic monthRow={data!.monthRow} ></BarGraphic>
          <CircularProgress color="bluesr-200" className={`${isVisible} fixed`} />
          </div>
        </section>
      </main>
    </div>
  );
}
