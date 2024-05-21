import { Table } from "../components/Table";
import { monthRow } from "../services/api";
import { months, years } from "../services/api";

export function Faturamento() {
  const row = monthRow;
  return (
    <div className="flex-1 h-screen w-auto flex flex-col">
      <header className="flex gap-4 p-4 border-b border-b-slate-400">
        <h1 className="text-3xl">Faturamento</h1>
        <select className="text-bluesr-500 rounded-xl text-center">
          {months.map((month)=> (
            <option className="text" value={month}>{month.toUpperCase()}</option>
          ))}
        </select>
        <select className="text-bluesr-500 rounded-xl">
          {years.map((year)=> (
            <option className="text" value={year}>{year.toUpperCase()}</option>
          ))}
        </select>
      </header>
      <main className="m-4 gap-2 text-bluesr-500">
        <section className="w-fit bg-aliceblue rounded">
          <Table headers={['Valor', 'Mês passado', 'Ano passado']} values={row!} rows={2}></Table>
        </section>
        <section className="w-full  bg-aliceblue rounded">
          <p>helloword</p>
        </section>
      </main>
    </div>
  );
}
