// import { Table } from '../../../components/Table'
// import { useContext, useEffect, useState } from 'react'
// import { HomeContext } from '../../../contexts/HomeContext'

export function PerdasMensal() {
  // const { isLoading, monthsPerdasData, yearsPerdasData } =
  //   useContext(HomeContext)

  // const [percentageMonth, setPercentageMonth] = useState<number[]>([])
  // const [percentageYears, setPercentageYears] = useState<number[]>([])

  // useEffect(() => {
  //   try {
  //     const porcentYears = yearsPerdasData?.values.map((num, index) =>
  //       Number(((num / yearsMensalData!.values[index]) * 100).toFixed(2)),
  //     )
  //     const porcentMonth = monthsPerdasData?.values.map((num, index) =>
  //       Number(((num / monthsMensalData!.values[index]) * 100).toFixed(2)),
  //     )
  //     setPercentageMonth(porcentMonth!)
  //     setPercentageYears(porcentYears!)
  //   } catch (error) {}
  // }, [monthsMensalData, monthsPerdasData, yearsMensalData, yearsPerdasData])

  return (
    <div className="m-2 flex w-11/12 flex-1 flex-col items-center justify-center rounded-3xl bg-bluesr-500 p-4">
      <h2 className="text-2xl font-bold text-aliceblue">Perdas Mensal</h2>
      <article className="my-4 flex w-full flex-1 flex-col items-center justify-center rounded-2xl bg-aliceblue p-2">
        <h3 className="font-roboto text-2xl font-medium text-redsr-400">
          Últimos meses
        </h3>
        {/* <Table /> */}
      </article>
    </div>
  )
}
