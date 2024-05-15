export function Sidebar() {
  return (
    <aside className="p-6 flex flex-col items-center border-r border-aliceblue text-bluesr-800">
      <h1 className="text-aliceblue font-bold text-xl mb-8">Opções</h1>
      <div className="w-60 flex flex-col gap-3">
        <a
          href="/home/faturamento"
          className="bg-aliceblue rounded p-4 text-redsr-400 font-semibold hover:bg-aliceblue-500"
        >
          Faturamento
        </a>
        <a
          href=""
          className="bg-aliceblue rounded p-4 cursor-not-allowed  text-redsr-400 font-semibold hover:bg-aliceblue-500"
          aria-disabled="true"
        >
          Em desenvolvimento
        </a>
      </div>
    </aside>
  )
}
