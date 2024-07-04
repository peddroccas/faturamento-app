import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '../../contexts/HomeContext'
import { AlertComponent } from '../../components/AlertComponent'
import { auth } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'
import { ToolBar } from '../../components/ToolBar'
import { EditFaturamentoDialog } from '../Faturamento/components/EditFaturamentoDialog'
import { NewFaturamentoDialog } from '../Faturamento/components/NewFaturamentoDialog'
import { Table } from '../../components/Table'
import { Data } from '../../services/api'

export function ValorDiario() {
  const { severity, isAlertOpen, handleAlertClose, data } =
    useContext(HomeContext)
  const [dailyData, setDailyData] = useState()
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
        <div className="m-2 flex w-11/12 flex-1 flex-col items-center justify-center rounded-3xl bg-bluesr-500 p-4">
          <h2 className="text-2xl font-bold text-aliceblue">
            Valor médio diário
          </h2>
          <article className="my-4 flex w-full flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
            <Table data={data} />
          </article>
        </div>
        <AlertComponent
          open={isAlertOpen}
          onClose={handleAlertClose}
          severity={severity}
        ></AlertComponent>
      </main>
    </div>
  )
}
