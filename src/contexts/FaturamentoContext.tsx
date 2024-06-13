import { createContext } from 'react'
import { Severity } from '../components/AlertComponent'

interface FaturamentoContextType {
  reload: boolean
  handleReload: () => void // Tipagem do setState
  lastMonthFilled?: number
  selectedStore: string
  handleAlertSeverity: (severity: Severity) => void
  isLoading: boolean
}
export const FaturamentoContext = createContext({} as FaturamentoContextType)
