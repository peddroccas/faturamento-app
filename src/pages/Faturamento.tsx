import { BasicTable } from "../components/Table";

export function Faturamento() {
  return (
    <div className="h-screen w-auto p-6 flex flex-col items-center">
      <h1 className="text-4xl mb-12">Faturamento</h1>
      <p>Tabela</p>
      <BasicTable></BasicTable>
    </div>
  );
}
