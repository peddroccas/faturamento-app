import { ChangeEvent, useEffect, useState } from "react";
import { Table } from "../components/Table";
import { getValues } from "../services/api";
import { months, years } from "../services/api";

interface Month {
  monthRow: number[],
  monthGrowth: (string | number)[]
}

export function Faturamento() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState(years[1]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<Month | undefined>({ monthRow: [], monthGrowth: [] });

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
        <select value={selectedMonth} onChange={handleMonth} className="text-bluesr-500 rounded-xl text-center">
          {months.map((month) => (
            <option key={month} className="text" value={month}>{month.toUpperCase()}</option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYear} className="text-bluesr-500 rounded-xl">
          {years.map((year) => (
            <option key={year} className="text" value={year}>{year.toUpperCase()}</option>
          ))}
        </select>
      </header>
      <main className="m-4 gap-2 text-bluesr-500">
        <section className="w-fit bg-aliceblue rounded-2xl my-4 p-2">
          <Table headers={['Valor', 'Mês passado', 'Ano passado']} rows={[data!.monthRow, data!.monthGrowth]} isLoading={isLoading}></Table>
        </section>
        <section className="w-full  bg-aliceblue rounded">
          <p>helloword</p>
        </section>
      </main>
    </div>
  );
}
