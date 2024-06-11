import { createContext } from 'react'

interface ReloadContextType {
  reload: boolean
  handleReload: () => void // Tipagem do setState
  lastMonthFilled?: number
  selectedStore: string
}
export const ReloadContext = createContext({} as ReloadContextType)
