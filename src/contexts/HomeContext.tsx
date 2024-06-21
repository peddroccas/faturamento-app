import {
  ChangeEvent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react'
import { Severity } from '../components/AlertComponent'
import {
  FaturamentoClass,
  PerdasClass,
  months,
  stores,
  years,
} from '../services/api'

export interface DataValue {
  values: number[]
  growth?: (string | number)[]
  dates: string[]
}

interface HomeContextProviderProps {
  children: ReactNode
}

interface HomeContextType {
  reload: boolean
  severity: Severity | undefined
  isLoading: boolean
  isAlertOpen: boolean
  selectedStore: string
  selectedYear: string
  selectedMonth: string
  lastMonthFilled: number | undefined
  // Faturamento
  monthsMensalData: DataValue | undefined
  yearsMensalData: DataValue | undefined
  yearsDailyValueData: DataValue | undefined
  monthsDailyValueData: DataValue | undefined
  // Perdas
  monthsPerdasData: DataValue | undefined
  yearsPerdasData: DataValue | undefined

  handleReload: () => void
  handleAlertClose: () => void
  handleAlertSeverity: (severity: Severity) => void
  handleMonthOnChange: (event: ChangeEvent<HTMLSelectElement>) => void
  handleYearOnChange: (event: ChangeEvent<HTMLSelectElement>) => void
  handleStoreOnChange: (event: ChangeEvent<HTMLSelectElement>) => void
}
export const HomeContext = createContext({} as HomeContextType)

export function HomeContextProvider({ children }: HomeContextProviderProps) {
  const [reload, setReload] = useState<boolean>(false)
  const [lastMonthFilled, setLastMonthFilled] = useState<number>()
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>(
    years[years.length - 1],
  )
  const [selectedStore, setselectedStore] = useState<string>(stores[0])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [severity, setSeverity] = useState<Severity>()
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [yearsMensalData, setYearsMensalData] = useState<DataValue | undefined>(
    {
      values: [],
      growth: [],
      dates: [],
    },
  )

  const [monthsMensalData, setMonthsMensalData] = useState<
    DataValue | undefined
  >({
    values: [],
    growth: [],
    dates: [],
  })
  const [yearsDailyValueData, setYearsDailyValueData] = useState<
    DataValue | undefined
  >({
    values: [],
    growth: [],
    dates: [],
  })
  const [monthsDailyValueData, setMonthsDailyValueData] = useState<
    DataValue | undefined
  >({
    values: [],
    growth: [],
    dates: [],
  })
  const [yearsPerdasData, setYearsPerdasData] = useState<DataValue | undefined>(
    {
      values: [],
      dates: [],
    },
  )

  const [monthsPerdasData, setMonthsPerdasData] = useState<
    DataValue | undefined
  >({
    values: [],
    dates: [],
  })

  // Recarrega último campo preenchido do banco após a iniciação e/ou adição de novo mês ou troca de Store
  useEffect(() => {
    async function fetchLastMonthFilled() {
      const lastMonth = await FaturamentoClass.getLastMonthFilled(selectedStore)
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
          const responseDailyValueYears =
            await FaturamentoClass.getYearsDailyValueValues(
              selectedStore,
              selectedMonth,
            )
          const responseYears = await FaturamentoClass.getYearsValues(
            selectedStore,
            selectedMonth,
          )
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
          const responsePerdasYears = await PerdasClass.getYearsValues(
            selectedStore,
            selectedMonth,
          )
          const responsePerdas = await PerdasClass.getMonthsValues(
            selectedStore,
            selectedMonth,
            selectedYear,
          )
          setYearsPerdasData(responsePerdasYears)
          setMonthsPerdasData(responsePerdas)
          setMonthsDailyValueData(responseDailyValueMonths)
          setMonthsMensalData(responseMonths)
          setYearsMensalData(responseYears)
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

  function handleReload() {
    setReload(true)
    setIsLoading(true)
    setTimeout(() => setIsAlertOpen(true), 1000)
  }
  function handleMonthOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(event.target.value)
    setIsLoading(true)
  }

  function handleYearOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value)
    setIsLoading(true)
  }
  function handleStoreOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setselectedStore(event.target.value)
    setIsLoading(true)
  }

  function handleAlertSeverity(severity: Severity) {
    if (severity === 'error') {
      setSeverity('error')
    } else {
      setSeverity('success')
    }
  }
  return (
    <HomeContext.Provider
      value={{
        reload,
        severity,
        isLoading,
        isAlertOpen,
        selectedStore,
        selectedMonth,
        selectedYear,
        lastMonthFilled,
        monthsMensalData,
        yearsMensalData,
        monthsDailyValueData,
        yearsDailyValueData,
        monthsPerdasData,
        yearsPerdasData,
        handleReload,
        handleAlertClose,
        handleMonthOnChange,
        handleYearOnChange,
        handleStoreOnChange,
        handleAlertSeverity,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
