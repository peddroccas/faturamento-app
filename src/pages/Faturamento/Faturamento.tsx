import { useContext, useEffect } from 'react'
import { HomeContext } from '../../contexts/HomeContext'
import { AlertComponent } from '../../components/AlertComponent'
import { auth } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'
import { FaturamentoMensal } from './components/FaturamentoMensal'
import { ToolBar } from '../../components/ToolBar'
import { EditFaturamentoDialog } from './components/EditFaturamentoDialog'
import { NewFaturamentoDialog } from './components/NewFaturamentoDialog'

export function Faturamento() {
  const { severity, isAlertOpen, handleAlertClose } = useContext(HomeContext)

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
            handleAlertClose()
          }, 5000)
        }
      } catch (error) {}
    }
    closeAlert()
  }, [handleAlertClose, isAlertOpen])

  return (
    <div className="flex w-auto flex-1 flex-col overflow-hidden">
      <header className="flex items-center border-b border-b-aliceblue p-4">
        <h1 className="text-3xl ">Faturamento</h1>
      </header>
      <main className="m-4 flex w-auto  flex-col items-center gap-2 text-bluesr-500 ">
        <ToolBar
          EditDialog={EditFaturamentoDialog}
          NewDialog={NewFaturamentoDialog}
        />
        <FaturamentoMensal />
        <AlertComponent
          open={isAlertOpen}
          onClose={handleAlertClose}
          severity={severity}
        ></AlertComponent>
      </main>
    </div>
  )
}
