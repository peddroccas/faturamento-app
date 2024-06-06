import { createContext } from 'react'

interface ReloadContextType {
  reload: boolean
  setReload: React.Dispatch<React.SetStateAction<boolean>>
  lastMonthFilled?: number
}
export const ReloadContext = createContext({} as ReloadContextType)
