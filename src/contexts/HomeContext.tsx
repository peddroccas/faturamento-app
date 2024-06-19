import { ChangeEvent, ReactNode, createContext, useState } from 'react'
import { Severity } from '../components/AlertComponent'
import { stores, years } from '../services/api'

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
  lastMonthFilled?: number
  handleReload: () => void
  handleAlertSeverity: (severity: Severity) => void
  handleMonthOnChange: (event: ChangeEvent<HTMLSelectElement>) => void
  handleYearOnChange: (event: ChangeEvent<HTMLSelectElement>) => void
  handleStoreOnChange: (event: ChangeEvent<HTMLSelectElement>) => void
  handleLastMonthFilled: (value: number) => void
  handleEndReload: () => void
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

  function handleLastMonthFilled(value: number) {
    setLastMonthFilled(value)
  }

  function handleEndReload() {
    setReload(false)
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
        handleReload,
        handleEndReload,
        handleMonthOnChange,
        handleYearOnChange,
        handleStoreOnChange,
        handleAlertSeverity,
        handleLastMonthFilled,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
