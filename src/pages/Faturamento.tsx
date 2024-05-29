import { ChangeEvent, useEffect, useState } from "react";
import { Table } from "../components/Table";
import {
  getYearsValues,
} from "../services/api";
import { months, years } from "../services/api";
import { CircularProgress } from "@mui/material";
import { capitalize } from "lodash";
import { Select } from "../components/Select";


interface YearsValue {
  yearsValues: number[];
  yearsGrowth: number[]
}

export function Faturamento() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState(years[years.length -1]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<YearsValue | undefined>({
    yearsValues: [],
    yearsGrowth: []
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
    async function fetchData() {
      try {
        const response = await getYearsValues(selectedMonth);
        //console.log(response)
        setData(response);
        setIsLoading(false);
      } catch (error) { }
    }
    fetchData();
  }, [selectedMonth]);

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
        <Select id='months' value={selectedMonth} onChange={handleMonthOnChange} options={months}/>
        <Select id='years' value={selectedYear} onChange={handleYearOnChange} options={years} />
      </header>
      <main className="w-auto m-4 gap-2 text-bluesr-500 flex items-center flex-col">

        <article className="flex-1 bg-aliceblue rounded-2xl my-4 p-2 flex flex-col items-center justify-center">
          <h2 className="font-medium text-2xl font-roboto">Últimos anos</h2>
          <Table
            headers={[
              "2017",
              "2018",
              "2019",
              "2020",
              "2021",
              "2022",
              "2023"]}
            rows={[data!.yearsValues, data!.yearsGrowth]}
            isLoading={isLoading}
          ></Table>
          <CircularProgress
            color="bluesr-200"
            className={`${isVisible} fixed`}
          />
        </article>
        <section className="flex-1 flex items-center justify-center">
          <div className="my-4 p-2 flex items-center justify-center bg-aliceblue rounded-2xl">
          {/* <Table
            headers={[
              capitalize(dates.today),
              capitalize(dates.lastMonth),
              capitalize(dates.lastYear),
            ]}
            rows={[data!.monthRow, data!.monthGrowth]}
            isLoading={isLoading}
          ></Table> */}
          {/* <CircularProgress
            color="bluesr-200"
            className={`${isVisible} fixed`}
          /> */}
          </div>
        </section>
      </main>
    </div>
  );
}
