import { CircularProgress } from '@mui/material'
import { Table } from './Table'
import { DataValue } from '../Faturamento'
import { useContext, useEffect, useState } from 'react'
import { FaturamentoContext } from '../../../contexts/FaturamentoContext'

interface TicketMedioProps {
  yearsData: DataValue | undefined
  monthsData: DataValue | undefined
}

export function TicketMedio({ yearsData, monthsData }: TicketMedioProps) {
  const { isLoading, reload } = useContext(FaturamentoContext)
  const [visibility, setVisibility] = useState<string>()

  // Observa para ver se está carregando, se tiver ele põe o componente de carregamento
  useEffect(() => {
    function loading() {
      try {
        if (isLoading) {
          setVisibility('visible max-h-none')
        } else {
          setVisibility('invisible max-h-0')
        }
      } catch (error) {}
    }
    loading()
  }, [isLoading, reload])

  return (
    <div className="m-2 flex w-11/12 flex-1 flex-col items-center justify-center rounded-3xl bg-bluesr-500 p-4">
      <h2 className="text-2xl font-bold text-aliceblue">Ticket Médio</h2>
      <article className="my-4 flex w-full flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
        <h3 className="font-roboto text-2xl font-medium text-redsr-400">
          Últimos anos
        </h3>
        <Table
          headers={yearsData!.dates}
          rows={[yearsData!.values, yearsData!.growth]}
          isLoading={isLoading}
        ></Table>
        <CircularProgress
          color="bluesr-200"
          className={`${visibility} fixed`}
        />
      </article>
      <article className="my-4 flex w-full flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
        <h3 className="font-roboto text-2xl font-medium text-redsr-400">
          Últimos meses
        </h3>
        <Table
          headers={monthsData!.dates}
          rows={[monthsData!.values, monthsData!.growth]}
          isLoading={isLoading}
        ></Table>
        <CircularProgress
          color="bluesr-200"
          className={`${visibility} fixed`}
        />
      </article>
    </div>
  )
}
