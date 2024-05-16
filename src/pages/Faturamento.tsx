import { BasicTable } from "../components/Table";


export function Faturamento() {
  return (
    <div className="h-screen w-auto p-6 flex flex-col items-center gap-4">
      <h1 className="text-4xl mb-2">Faturamento</h1>
      <BasicTable></BasicTable>
    </div>
  );
}
