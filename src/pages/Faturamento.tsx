import { ChangeEvent, useEffect, useState } from 'react'
import { Table } from '../components/Table'
import {
  getMonthsValues,
  getYearsValues,
  months,
  years,
  getLastMonthFilled,
  stores,
} from '../services/api'

import { CircularProgress, Tooltip } from '@mui/material'
import { Select } from '../components/Select'
import { Add, Edit } from '@mui/icons-material'

import { NewFaturamentoDialog } from '../components/NewFaturamentoDialog'
import { ReloadContext } from '../contexts/FaturamentoContext'
import { EditFaturamentoDialog } from '../components/EditFaturamentoDialog'
import { AlertComponent, Severity } from '../components/AlertComponent'
import { auth } from '../services/firebase'
import { useNavigate } from 'react-router-dom'

interface DataValue {
  values: number[]
  growth: (string | number)[]
  dates: string[]
}

export function Faturamento() {
  const navigate = useNavigate()

  useEffect(() => {
    // auth.signOut()
    const isLogged = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login')
      }
    })
    return () => isLogged()
  }, [navigate])

  const [reload, setReload] = useState<boolean>(false)
  const [lastMonthFilled, setLastMonthFilled] = useState<number>()
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1])
  const [selectedStore, setselectedStore] = useState<string>(stores[0])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [yearsData, setYearsData] = useState<DataValue | undefined>({
    values: [],
    growth: [],
    dates: [],
  })
  const [monthsData, setMonthsData] = useState<DataValue | undefined>({
    values: [],
    growth: [],
    dates: [],
  })
  const [isVisible, setIsVisible] = useState<string>()
  const [open, setOpen] = useState<boolean>(false)
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [severity, setSeverity] = useState<Severity>()

  // Fecha alerta depois de 5 segundos
  useEffect(() => {
    function closeAlert() {
      try {
        if (isAlertOpen) {
          setTimeout(() => {
            setIsAlertOpen(false)
          }, 5000)
        }
      } catch (error) {}
    }
    closeAlert()
  }, [isAlertOpen])

  // Recarrega último campo preenchido do banco após a iniciação e/ou adição de novo mês ou troca de Store
  useEffect(() => {
    async function fetchLastMonthFilled() {
      const lastMonth = await getLastMonthFilled(selectedStore)
      setLastMonthFilled(lastMonth)
      setSelectedMonth(months[lastMonth])
      setReload(false)
    }
    fetchLastMonthFilled()
  }, [reload, selectedStore])

  // Observa para ver se está carregando, se tiver ele põe o componente de carregamento
  useEffect(() => {
    function loading() {
      try {
        if (isLoading) {
          setIsVisible('visible max-h-none')
        } else {
          setIsVisible('invisible max-h-0')
        }
      } catch (error) {}
    }
    loading()
  }, [isLoading, reload])

  // Busca no db os dados assim que carrega a página e toda vez que o usuário selecionar mês ou ano diferentes
  useEffect(() => {
    async function fetchYears() {
      try {
        if (lastMonthFilled) {
          const response = await getYearsValues(selectedStore, selectedMonth)
          // console.log(response)
          setYearsData(response)
          setIsLoading(false)
        }
      } catch (error) {}
    }
    fetchYears()
  }, [isLoading, selectedStore, selectedMonth, lastMonthFilled])

  useEffect(() => {
    async function fetchMonths() {
      try {
        if (lastMonthFilled) {
          const response = await getMonthsValues(
            selectedStore,
            selectedMonth,
            selectedYear,
          )
          // console.log(response)
          setMonthsData(response)
          setIsLoading(false)
        }
      } catch (error) {}
    }
    fetchMonths()
  }, [isLoading, selectedStore, selectedMonth, selectedYear, lastMonthFilled])

  function handleAlertClose() {
    setIsAlertOpen(false)
  }

  function handleAlertSeverity(severity: Severity) {
    if (severity === 'error') {
      setSeverity('error')
    } else {
      setSeverity('success')
    }
  }

  function handleMonthOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedMonth(event.target.value)
    setIsLoading(true)
  }

  function handleYearOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value)
    setIsLoading(true)
  }

  function handleOnChangeStore(event: ChangeEvent<HTMLSelectElement>) {
    setselectedStore(event.target.value)
    setIsLoading(true)
  }

  function handleNewFaturamentoOnClick() {
    setOpen(true)
  }

  function handleCloseFaturamentoDialog() {
    setOpen(false)
  }

  function handleReload() {
    setReload(true)
    setIsLoading(true)
    setTimeout(() => setIsAlertOpen(true), 1000)
  }

  function handleOnClickEditFaturamento() {
    setEditOpen(true)
  }

  function handleCloseEditFaturamentoDialog() {
    setEditOpen(false)
  }

  return (
    <ReloadContext.Provider
      value={{
        reload,
        handleReload,
        lastMonthFilled,
        selectedStore,
        handleAlertSeverity,
      }}
    >
      <div className="flex h-screen w-auto flex-1 flex-col">
        <header className="flex gap-4 border-b border-b-slate-400 p-4">
          <h1 className="text-3xl">Faturamento</h1>
          <Select
            id="Stores"
            options={stores}
            value={selectedStore}
            onChange={handleOnChangeStore}
          />
        </header>
        <main className="m-4 flex w-auto  flex-col items-center gap-2 text-bluesr-500 ">
          <div className="flex items-center justify-center gap-2 rounded-xl p-2 text-center text-aliceblue">
            <div className="flex gap-2 p-2">
              <h2 className="flex items-center font-roboto text-xl font-medium">
                Mês em destaque:
              </h2>
              <Select
                id="months"
                value={selectedMonth}
                onChange={handleMonthOnChange}
                options={months}
              />
              <Select
                id="years"
                value={selectedYear}
                onChange={handleYearOnChange}
                options={years}
              />
            </div>
            <Tooltip title="Editar faturamento" placement="right">
              <button
                onClick={handleOnClickEditFaturamento}
                className="flex h-fit items-center rounded-full p-1 transition-all hover:bg-bluesr-500"
              >
                <Edit />
              </button>
            </Tooltip>
            <EditFaturamentoDialog
              open={editOpen}
              onClose={handleCloseEditFaturamentoDialog}
            />
            <Tooltip title="Adicionar novo faturamento" placement="right">
              <button
                onClick={handleNewFaturamentoOnClick}
                className="flex h-fit items-center rounded-full p-1 transition-all hover:bg-bluesr-500"
              >
                <Add />
              </button>
            </Tooltip>
            <NewFaturamentoDialog
              open={open}
              onClose={handleCloseFaturamentoDialog}
            />
            <AlertComponent
              open={isAlertOpen}
              onClose={handleAlertClose}
              severity={severity}
            ></AlertComponent>
          </div>
          <article className="my-4 flex w-5/6 flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
            <h2 className="font-roboto text-2xl font-medium">Últimos anos</h2>
            <Table
              headers={yearsData!.dates}
              rows={[yearsData!.values, yearsData!.growth]}
              isLoading={isLoading}
            ></Table>
            <CircularProgress
              color="bluesr-200"
              className={`${isVisible} fixed`}
            />
          </article>
          <article className="my-4 flex w-5/6 flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
            <h2 className="font-roboto text-2xl font-medium">Últimos meses</h2>
            <Table
              headers={monthsData!.dates}
              rows={[monthsData!.values, monthsData!.growth]}
              isLoading={isLoading}
            ></Table>
            <CircularProgress
              color="bluesr-200"
              className={`${isVisible} fixed`}
            />
          </article>
        </main>
      </div>
    </ReloadContext.Provider>
  )
}
