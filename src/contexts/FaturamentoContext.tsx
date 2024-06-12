import { createContext } from 'react'
import { Severity } from '../components/AlertComponent'

interface ReloadContextType {
  reload: boolean
  handleReload: () => void // Tipagem do setState
  lastMonthFilled?: number
  selectedStore: string
  handleAlertSeverity: (severity: Severity) => void
}
export const ReloadContext = createContext({} as ReloadContextType)
