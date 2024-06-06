import { createContext } from 'react'

interface ReloadContextType {
  reload: boolean
  setReload: React.Dispatch<React.SetStateAction<boolean>> // Tipagem do setState
  lastMonthFilled?: number
}
export const ReloadContext = createContext({} as ReloadContextType)
