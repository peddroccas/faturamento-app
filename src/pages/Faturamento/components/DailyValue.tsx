import { Table } from '../../../components/Table'
import { HomeContext } from '../../../contexts/HomeContext'
import { useContext } from 'react'

export function DailyValue() {
  const { isLoading, yearsDailyValueData, monthsDailyValueData } =
    useContext(HomeContext)

  return (
    <div className="m-2 flex w-11/12 flex-1 flex-col items-center justify-center rounded-3xl bg-bluesr-500 p-4">
      <h2 className="text-2xl font-bold text-aliceblue">Valor médio diário</h2>
      <article className="my-4 flex w-full flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
        <h3 className="font-roboto text-2xl font-medium text-redsr-400">
          Últimos meses
        </h3>
        <Table
          headers={monthsDailyValueData!.dates}
          rows={[monthsDailyValueData!.values, monthsDailyValueData!.growth]}
          isLoading={isLoading}
        ></Table>
      </article>
      <article className="my-4 flex w-full flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
        <h3 className="font-roboto text-2xl font-medium text-redsr-400">
          Últimos anos
        </h3>
        <Table
          headers={yearsDailyValueData!.dates}
          rows={[yearsDailyValueData!.values, yearsDailyValueData!.growth]}
          isLoading={isLoading}
        ></Table>
      </article>
    </div>
  )
}
