export function Sidebar() {
    return (
        <aside className="p-6 flex flex-col items-center border-r border-redsr-400 text-bluesr-800">
            <h1 className="text-aliceblue font-bold text-xl mb-8">Opções</h1>
            <div className="w-60 flex flex-col gap-3">
                <a href="/home/faturamento" className="bg-aliceblue rounded p-4">Faturamento</a>
                <a href="" className="bg-aliceblue rounded p-4 cursor-not-allowed" >Em desenvolvimento</a>
            </div>
        </aside>
    )
}