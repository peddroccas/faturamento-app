import { useContext, useEffect, useState } from 'react'
import { FaturamentoClass, months } from '../../services/api'
import { HomeContext } from '../../contexts/HomeContext'
import { AlertComponent } from '../../components/AlertComponent'
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
  const {
    reload,
    isLoading,
    selectedMonth,
    selectedStore,
    selectedYear,
    lastMonthFilled,
    isAlertOpen,
    handleAlertSeverity,
    handleMonthOnChange,
    handleReload,
    handleEndReload,
    handleStoreOnChange,
    handleYearOnChange,
    handleLastMonthFilled,
    severity,
  } = useContext(HomeContext)

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
      const lastMonth = await FaturamentoClass.getLastMonthFilled(selectedStore)
      handleLastMonthFilled(lastMonth)
      setSelectedMonth(months[lastMonth])
      handleEndReload()
    }
    fetchLastMonthFilled()
  }, [handleEndReload, handleLastMonthFilled, reload, selectedStore])

  // Busca no db os dados assim que carrega a página e toda vez que o usuário selecionar mês ou ano diferentes
  useEffect(() => {
    async function fetchData() {
      try {
        if (lastMonthFilled) {
          const responseDailyValueYears =
            await FaturamentoClass.getYearsDailyValueValues(
              selectedStore,
              selectedMonth,
            )
          const responseYears = await FaturamentoClass.getYearsValues(
            selectedStore,
            selectedMonth,
          )
          // console.log(response)

          const responseDailyValueMonths =
            await FaturamentoClass.getMonthsDailyValueValues(
              selectedStore,
              selectedMonth,
              selectedYear,
            )
          const responseMonths = await FaturamentoClass.getMonthsValues(
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

  function handleAlertClose() {
    setIsAlertOpen(false)
  }

  return (
    <div className="flex w-auto flex-1 flex-col overflow-hidden">
      <header className="flex items-center border-b border-b-aliceblue p-4">
        <h1 className="text-3xl ">Faturamento</h1>
      </header>
      <main className="m-4 flex w-auto  flex-col items-center gap-2 text-bluesr-500 ">
        <ToolBar
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          selectedStore={selectedStore}
          handleStoreOnChange={handleStoreOnChange}
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
  )
}
