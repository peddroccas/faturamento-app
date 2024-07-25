import { Table } from '../../../components/Table'
import { useContext } from 'react'
import { HomeContext } from '../../../contexts/HomeContext'

export function PerdasMensal() {
  const { perdasData } = useContext(HomeContext)

  return (
    <div className="bg-brown-300 m-2 flex w-full flex-1 flex-col items-center justify-center rounded-3xl p-4">
      <h2 className="text-2xl font-bold text-green-300">Perdas Mensal</h2>
      <article className="my-4 flex w-full flex-1 flex-col items-center justify-center rounded-2xl bg-green-700 p-2">
        <Table data={perdasData} tableType="perdas" />
      </article>
    </div>
  )
}
