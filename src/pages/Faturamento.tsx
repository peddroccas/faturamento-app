import { ChangeEvent, useEffect, useState } from 'react'
import { Table } from '../components/Table'
import {
  getMonthsValues,
  getYearsValues,
  months,
  years,
  getLastMonthFilled,
  lojas,
} from '../services/api'

import { CircularProgress, Tooltip } from '@mui/material'
import { Select } from '../components/Select'
import { Add } from '@mui/icons-material'

import { NewFaturamentoDialog } from '../components/NewFaturamentoDialog'
import { ReloadContext } from '../contexts/FaturamentoContext'
import { db } from '../services/firebase'

interface DataValue {
  values: number[]
  growth: (string | number)[]
  dates: string[]
}

export function Faturamento() {
  useEffect(() => {
    const databaseRef = db.ref('antunes/2017/janeiro') // Caminho dos dados
    const fetchData = async () => {
      try {
        const snapshot = await databaseRef.once('value')
        console.log(snapshot.val()) // Atualize o estado com os dados obtidos
        console.log('aquiiiiiiiiii')
      } catch (error) {
        console.error('Erro ao buscar os dados do banco de dados: ', error)
      }
    }

    fetchData()
  }, [])

  const [reload, setReload] = useState<boolean>(true)
  const [lastMonthFilled, setLastMonthFilled] = useState<number>()
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [yearsData, setYearsData] = useState<DataValue | undefined>({
    values: [],
    growth: [],
    dates: [],
  })
  const [monthsData, setMonthsData] = useState<DataValue | undefined>({
    values: [],
    growth: [],
    dates: [],
  })
  const [isVisible, setIsVisible] = useState<string>()
  const [open, setOpen] = useState<boolean>(false)
  const [loja, setLoja] = useState<string>(lojas[2])

  useEffect(() => {
    async function fetchLastMonthFilled() {
      if (reload) {
        const lastMonth = await getLastMonthFilled()
        setLastMonthFilled(lastMonth)
        setSelectedMonth(months[lastMonth])
        setReload(false)
      }
    }
    fetchLastMonthFilled()
  }, [reload])
  // Observa para ver se está carregando, se tiver ele põe o componente de carregamento
  useEffect(() => {
    function loading() {
      try {
        if (isLoading) {
          setIsVisible('visible max-h-none')
        } else {
          setIsVisible('invisible max-h-0')
        }
      } catch (error) {}
    }
    loading()
  }, [isLoading])

  // Busca no db os dados assim que carrega a página e toda vez que o usuário selecionar mês ou ano diferentes

  useEffect(() => {
    async function fetchYears() {
      try {
        if (lastMonthFilled) {
          const response = await getYearsValues(selectedMonth)
          // console.log(response)
          setYearsData(response)
          setIsLoading(false)
        }
      } catch (error) {}
    }
    fetchYears()
  }, [selectedMonth, lastMonthFilled])

  useEffect(() => {
    async function fetchMonths() {
      try {
        if (lastMonthFilled) {
          const response = await getMonthsValues(selectedMonth, selectedYear)
          // console.log(response)
          setMonthsData(response)
          setIsLoading(false)
        }
      } catch (error) {}
    }
    fetchMonths()
  }, [selectedMonth, selectedYear, lastMonthFilled])

  function handleMonthOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(event.target.value)
    setIsLoading(true)
  }

  function handleYearOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value)
    setIsLoading(true)
  }
  function handleNewFaturamentoOnClick() {
    setReload(!reload)
    setOpen(true)
  }

  function handleCloseFaturamentoDialog() {
    setReload(!reload)
    setOpen(false)
  }

  function handleOnChangeLoja(event: ChangeEvent<HTMLSelectElement>) {
    setLoja(event.target.value)
  }

  return (
    <ReloadContext.Provider value={{ reload, setReload, lastMonthFilled }}>
      <div className="flex h-screen w-auto flex-1 flex-col">
        <header className="flex gap-4 border-b border-b-slate-400 p-4">
          <h1 className="text-3xl">Faturamento</h1>
          <Select
            id="lojas"
            options={lojas}
            value={loja}
            onChange={handleOnChangeLoja}
          />
        </header>
        <main className="m-4 flex w-auto  flex-col items-center gap-2 text-bluesr-500 ">
          <div className="flex items-center justify-center gap-2 rounded-xl p-2 text-center text-aliceblue">
            <div className="flex gap-2 p-2">
              <h2 className="flex items-center font-roboto text-xl font-medium">
                Mês em destaque:
              </h2>
              <Select
                id="months"
                disabledOptions={lastMonthFilled}
                value={selectedMonth}
                onChange={handleMonthOnChange}
                options={months}
              />
              <Select
                id="years"
                value={selectedYear}
                onChange={handleYearOnChange}
                options={years}
              />
            </div>
            <Tooltip title="Adicionar novo faturamento" placement="right">
              <button
                onClick={handleNewFaturamentoOnClick}
                className="flex h-fit items-center rounded-full p-1 transition-all hover:bg-bluesr-500"
              >
                <Add />
              </button>
            </Tooltip>
            <NewFaturamentoDialog
              open={open}
              onClose={handleCloseFaturamentoDialog}
            />
          </div>
          <article className="my-4 flex w-5/6 flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
            <h2 className="font-roboto text-2xl font-medium">Últimos anos</h2>
            <Table
              headers={yearsData!.dates}
              rows={[yearsData!.values, yearsData!.growth]}
              isLoading={isLoading}
            ></Table>
            <CircularProgress
              color="bluesr-200"
              className={`${isVisible} fixed`}
            />
          </article>
          <article className="my-4 flex w-5/6 flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
            <h2 className="font-roboto text-2xl font-medium">Últimos meses</h2>
            <Table
              headers={monthsData!.dates}
              rows={[monthsData!.values, monthsData!.growth]}
              isLoading={isLoading}
            ></Table>
            <CircularProgress
              color="bluesr-200"
              className={`${isVisible} fixed`}
            />
          </article>
        </main>
      </div>
    </ReloadContext.Provider>
  )
}
