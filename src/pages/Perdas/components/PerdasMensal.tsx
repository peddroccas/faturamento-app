import { Table } from './Table'
import { useContext } from 'react'
import { HomeContext } from '../../../contexts/HomeContext'

export function PerdasMensal() {
  const { isLoading, monthsMensalData } = useContext(HomeContext)

  return (
    <div className="m-2 flex w-11/12 flex-1 flex-col items-center justify-center rounded-3xl bg-bluesr-500 p-4">
      <h2 className="text-2xl font-bold text-aliceblue">Perdas Mensal</h2>
      <article className="my-4 flex w-full flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
        <h3 className="font-roboto text-2xl font-medium text-redsr-400">
          Últimos meses
        </h3>
        <Table
          headers={monthsMensalData!.dates}
          rows={[monthsMensalData!.values, monthsMensalData!.growth]}
          isLoading={isLoading}
        ></Table>
      </article>
    </div>
  )
}
