import {
  ChangeEvent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react'
import { Severity } from '../components/AlertComponent'
import {
  Data,
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
  handleAlertOpen: () => void
  selectedStore: string
  selectedYear: string
  selectedMonth: string
  lastMonthFilled: number | undefined
  // Faturamento
  faturamentoData: Data | undefined
  dailyFaturamentoData: Data | undefined
  // Perdas
  perdasData: Data | undefined
  perdasLastMonthFilled: number | undefined

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
  const [perdasLastMonthFilled, setPerdasLastMonthFilled] = useState<number>()
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>(
    years[years.length - 1],
  )
  const [selectedStore, setselectedStore] = useState<string>(stores[0])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [severity, setSeverity] = useState<Severity>()
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [faturamentoData, setFaturamentoData] = useState<Data | undefined>()
  const [dailyFaturamentoData, setDailyFaturamentoData] = useState<
    Data | undefined
  >()
  const [perdasData, setPerdasData] = useState<Data | undefined>()

  // Recarrega último campo preenchido do banco após a iniciação e/ou adição de novo mês ou troca de Store
  useEffect(() => {
    async function fetchLastMonthFilled() {
      const perdasLastMonth =
        await PerdasClass.getLastMonthFilled(selectedStore)
      const lastMonth = await FaturamentoClass.getLastMonthFilled(selectedStore)
      setLastMonthFilled(lastMonth)
      setPerdasLastMonthFilled(perdasLastMonth)
      setSelectedMonth(months[lastMonth])
      setReload(false)
    }
    fetchLastMonthFilled()
  }, [reload, selectedStore])

  useEffect(() => {
    async function fetchFaturamentoData() {
      try {
        const faturamentoData =
          await FaturamentoClass.getStoreFaturamento(selectedStore)
        if (faturamentoData) {
          const dailyFaturamentoData =
            FaturamentoClass.getStoreDailyFaturamento(faturamentoData)
          setDailyFaturamentoData(dailyFaturamentoData)
        }
        const perdasData = await PerdasClass.getStorePerda(selectedStore)
        setPerdasData(perdasData)
        setFaturamentoData(faturamentoData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchFaturamentoData()
  }, [selectedStore, lastMonthFilled, isLoading])

  function handleAlertOpen() {
    setIsAlertOpen(true)
  }

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
    switch (severity) {
      case 'error':
        setSeverity('error')
        break
      case 'success':
        setSeverity('success')
        break
      case 'warning':
        setSeverity('warning')
        break
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
        faturamentoData,
        dailyFaturamentoData,
        perdasData,
        perdasLastMonthFilled,
        handleReload,
        handleAlertClose,
        handleMonthOnChange,
        handleYearOnChange,
        handleStoreOnChange,
        handleAlertSeverity,
        handleAlertOpen,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
