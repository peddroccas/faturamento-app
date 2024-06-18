import { ChangeEvent, useEffect, useState } from 'react'
import {
  getMonthsValues,
  getYearsValues,
  months,
  years,
  getLastMonthFilled,
  stores,
  getYearsDailyValueValues,
  getMonthsDailyValueValues,
} from '../../services/api'

import { Select } from '../../components/Select'
import { FaturamentoContext } from '../../contexts/FaturamentoContext'
import { AlertComponent, Severity } from '../../components/AlertComponent'
import { auth } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'
import { FaturamentoMensal } from './components/FaturamentoMensal'
import { ToolBar } from './components/ToolBar'
import { DailyValue } from './components/DailyValue'

export interface DataValue {
  values: number[]
  growth: (string | number)[]
  dates: string[]
}

export function Faturamento() {
  const [reload, setReload] = useState<boolean>(false)
  const [lastMonthFilled, setLastMonthFilled] = useState<number>()
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>(
    years[years.length - 1],
  )
  const [selectedStore, setselectedStore] = useState<string>(stores[0])
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
  const [yearsDailyValueData, setYearsDailyValueData] = useState<
    DataValue | undefined
  >({ values: [], growth: [], dates: [] })
  const [monthsDailyValueData, setMonthsDailyValueData] = useState<
    DataValue | undefined
  >({ values: [], growth: [], dates: [] })
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [severity, setSeverity] = useState<Severity>()

  const navigate = useNavigate()

  // Verifica se está logado, se não tiver redireciona para o login
  useEffect(() => {
    // auth.signOut()
    const isLogged = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login')
      }
    })
    return () => isLogged()
  }, [navigate])

  // Fecha alerta depois de 5 segundos
  useEffect(() => {
    function closeAlert() {
      try {
        if (isAlertOpen) {
          setTimeout(() => {
            setIsAlertOpen(false)
          }, 5000)
        }
      } catch (error) {}
    }
    closeAlert()
  }, [isAlertOpen])

  // Recarrega último campo preenchido do banco após a iniciação e/ou adição de novo mês ou troca de Store
  useEffect(() => {
    async function fetchLastMonthFilled() {
      const lastMonth = await getLastMonthFilled(selectedStore)
      setLastMonthFilled(lastMonth)
      setSelectedMonth(months[lastMonth])
      setReload(false)
    }
    fetchLastMonthFilled()
  }, [reload, selectedStore])

  // Busca no db os dados assim que carrega a página e toda vez que o usuário selecionar mês ou ano diferentes
  useEffect(() => {
    async function fetchData() {
      try {
        if (lastMonthFilled) {
          const responseDailyValueYears = await getYearsDailyValueValues(
            selectedStore,
            selectedMonth,
          )
          const responseYears = await getYearsValues(
            selectedStore,
            selectedMonth,
          )
          // console.log(response)

          const responseDailyValueMonths = await getMonthsDailyValueValues(
            selectedStore,
            selectedMonth,
            selectedYear,
          )
          const responseMonths = await getMonthsValues(
            selectedStore,
            selectedMonth,
            selectedYear,
          )
          // console.log(response)
          setMonthsDailyValueData(responseDailyValueMonths)
          setMonthsData(responseMonths)
          setYearsData(responseYears)
          setYearsDailyValueData(responseDailyValueYears)

          setIsLoading(false)
        }
      } catch (error) {}
    }
    fetchData()
  }, [isLoading, selectedStore, selectedMonth, selectedYear, lastMonthFilled])

  function handleAlertSeverity(severity: Severity) {
    if (severity === 'error') {
      setSeverity('error')
    } else {
      setSeverity('success')
    }
  }

  function handleReload() {
    setReload(true)
    setIsLoading(true)
    setTimeout(() => setIsAlertOpen(true), 1000)
  }

  function handleOnChangeStore(event: ChangeEvent<HTMLSelectElement>) {
    setselectedStore(event.target.value)
    setIsLoading(true)
  }

  function handleAlertClose() {
    setIsAlertOpen(false)
  }

  function handleMonthOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(event.target.value)
    setIsLoading(true)
  }

  function handleYearOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value)
    setIsLoading(true)
  }

  return (
    <FaturamentoContext.Provider
      value={{
        reload,
        handleReload,
        lastMonthFilled,
        selectedStore,
        selectedMonth,
        selectedYear,
        handleAlertSeverity,
        isLoading,
      }}
    >
      <div className="flex  w-auto flex-1 flex-col">
        <header className="flex gap-4 border-b border-b-slate-400 p-4">
          <h1 className="text-3xl ">Faturamento</h1>
          <Select
            id="Stores"
            options={stores}
            value={selectedStore}
            onChange={handleOnChangeStore}
          />
        </header>
        <main className="m-4 flex w-auto  flex-col items-center gap-2 text-bluesr-500 ">
          <ToolBar
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            handleMonthOnChange={handleMonthOnChange}
            handleYearOnChange={handleYearOnChange}
          />
          <FaturamentoMensal yearsData={yearsData} monthsData={monthsData} />
          <DailyValue
            yearsData={yearsDailyValueData}
            monthsData={monthsDailyValueData}
          />
          <AlertComponent
            open={isAlertOpen}
            onClose={handleAlertClose}
            severity={severity}
          ></AlertComponent>
        </main>
      </div>
    </FaturamentoContext.Provider>
  )
}
