import { Table } from '../../../components/Table'
import { useContext, useState } from 'react'
import { HomeContext } from '../../../contexts/HomeContext'
import { Switch } from '@mui/material'

type tableData = 'Mensal' | 'Diário'

export function FaturamentoMensal() {
  const { faturamentoData, dailyFaturamentoData } = useContext(HomeContext)
  const [table, setTable] = useState<tableData>('Mensal')
  const [switchTransition, setSwitchTransition] = useState(false)

  function handleSwitchOnChange() {
    setSwitchTransition(true)
    setTimeout(() => {
      setTable(table === 'Diário' ? 'Mensal' : 'Diário')
      setSwitchTransition(false)
    }, 300) // Tempo da transição, deve ser o mesmo da duração do transição
  }

  return (
    <div className="bg-brown-300 m-2 flex w-full flex-1 flex-col items-center justify-center  rounded-3xl p-4">
      <header className="grid w-full grid-cols-3 items-center">
        <Switch color="default" onChange={handleSwitchOnChange} />
        <h2
          className={`transform text-center text-2xl font-bold text-green-300 transition-all ${switchTransition ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        >
          Faturamento {table}
        </h2>
      </header>
      <article
        className={`my-4 flex w-full flex-1 items-center justify-center rounded-2xl bg-green-700 p-2 transition-all ${switchTransition ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Table
          data={table === 'Mensal' ? faturamentoData : dailyFaturamentoData}
          tableType="faturamento"
        />
      </article>
    </div>
  )
}
