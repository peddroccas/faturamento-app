import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Table } from "../components/Table";
import {
  addFaturamentoMonth,
  getPreviousMonth,
  getValues,
} from "../services/api";
import { months, years } from "../services/api";
import { CircularProgress } from "@mui/material";
import { capitalize } from "lodash";
import { BarGraphic } from "../components/BarGraphic";
import { BasicTextField } from "../components/TextField";
import { LoadingButtonComponent } from "../components/LoadingButton";

interface Month {
  monthRow: number[];
  monthGrowth: (string | number)[];
}

export function Faturamento() {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState(years[1]);
  const [prevMonth, prevYear] = getPreviousMonth(selectedMonth, selectedYear);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Month | undefined>({
    monthRow: [],
    monthGrowth: [],
  });
  const [isVisible, setIsVisible] = useState<string>();
  const [value, setValue] = useState<string>();
  const [date, setDate] = useState<string>();
  const [loading, setLoading] = useState(false);
  const dates = {
    today: `${selectedMonth}/${selectedYear}`,
    lastMonth: `${prevMonth}/${prevYear}`,
    lastYear: `${selectedMonth}/${Number(selectedYear) - 1}`,
  };

  // Observa para ver se está carregando, se tiver ele põe o componente de carregamento
  useEffect(() => {
    function loading() {
      try {
        if (isLoading) {
          setIsVisible("visible max-h-none");
        } else {
          setIsVisible("invisible max-h-0");
        }
      } catch (error) {}
    }
    loading();
  }, [isLoading]);

  // Busca no db os dados assim que carrega a página
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getValues(selectedMonth, selectedYear);
        setData(response);
        setIsLoading(false);
      } catch (error) {}
    }
    fetchData();
  }, [selectedMonth, selectedYear]);

  function handleMonth(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(event.target.value);
    setIsLoading(true);
  }

  function handleYear(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value);
    setIsLoading(true);
  }

  const handleFormOnClick = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      await addFaturamentoMonth("year", "month", value);
    } catch (error) {}
  };

  return (
    <div className="flex-1 h-screen w-auto flex flex-col">
      <header className="flex gap-4 p-4 border-b border-b-slate-400">
        <h1 className="text-3xl">Faturamento</h1>
        <select
          value={selectedMonth}
          onChange={handleMonth}
          className="text-bluesr-500 rounded-xl text-center focus-visible: outline-bluesr-500"
        >
          {months.map((month) => (
            <option key={month} className="" value={month}>
              {capitalize(month)}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={handleYear}
          className="text-bluesr-500 rounded-xl text-center focus-visible: outline-bluesr-500"
        >
          {years.map((year) => (
            <option key={year} className="text" value={year}>
              {year.toUpperCase()}
            </option>
          ))}
        </select>
      </header>
      <main className="m-4 gap-2 text-bluesr-500 flex">
        <div className="w-fit h-min">
          <section className=" bg-aliceblue rounded-2xl my-4 p-2 flex flex-col items-center justify-center">
            <Table
              headers={[
                capitalize(dates.today),
                capitalize(dates.lastMonth),
                capitalize(dates.lastYear),
              ]}
              rows={[data!.monthRow, data!.monthGrowth]}
              isLoading={isLoading}
            ></Table>
            <CircularProgress
              color="bluesr-200"
              className={`${isVisible} fixed`}
            />
          </section>
          <div className="bg-aliceblue rounded-2xl my-4 p-2 flex flex-col items-center justify-center gap-4">
            <h1 className="mt-2 font-roboto  text-xl font-medium">Novo Faturamento</h1>
            <div className="flex flex-row items-center">
              <BasicTextField
                type="value"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
              <BasicTextField
                type="dae"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
              <LoadingButtonComponent
                loading={loading}
                onClick={handleFormOnClick}
                value="Enviar"
              />
            </div>
          </div>
        </div>
        <section className=" my-4 p-2 w-full flex items-center justify-center bg-aliceblue rounded-2xl">
          <div className="flex items-center justify-center">
            <BarGraphic label={dates} monthRow={data!.monthRow}></BarGraphic>
            <CircularProgress
              color="bluesr-200"
              className={`${isVisible} fixed`}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
