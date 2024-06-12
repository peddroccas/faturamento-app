import { ReactNode, createContext } from 'react'
import { auth } from '../services/firebase'

interface AuthContextType {
  handleUser: () => void
}
export const AuthContext = createContext({} as AuthContextType)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  function handleUser() {
    auth.setPersistence('session').catch((error) => {
      console.error('Erro ao configurar a persistência:', error)
    })
  }

  return (
    <AuthContext.Provider value={{ handleUser }}>
      {children}
    </AuthContext.Provider>
  )
}
