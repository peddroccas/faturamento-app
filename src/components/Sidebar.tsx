export function Sidebar() {
  return (
    <aside className="flex flex-col items-center border-r border-aliceblue p-6 text-bluesr-800">
      <h1 className="mb-8 text-xl font-bold text-aliceblue">Opções</h1>
      <div className="flex w-48 flex-col gap-3">
        <a
          href="/home/faturamento"
          className="rounded bg-aliceblue p-4 text-sm font-semibold text-redsr-400 hover:bg-aliceblue-500"
        >
          Faturamento
        </a>
        <a
          href=""
          className="cursor-not-allowed rounded bg-aliceblue p-4 text-sm  font-semibold text-redsr-400 hover:bg-aliceblue-500"
          aria-disabled="true"
        >
          Em desenvolvimento
        </a>
      </div>
    </aside>
  )
}
