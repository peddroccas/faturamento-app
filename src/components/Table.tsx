import { useContext } from 'react'
import {
  capitalizeFirstLetters,
  months,
  years,
  Data,
  FaturamentoClass,
} from '../services/api'
import { HomeContext } from '../contexts/HomeContext'

interface TableProps {
  data: Data | undefined
}

export function Table({ data }: TableProps) {
  const { selectedStore } = useContext(HomeContext)
  if (!data || !data.values) return null // Handling case where data is undefined or empty

  return (
    <div className="w-full overflow-x-scroll text-bluesr-400">
      <table className="w-full table-auto border-collapse truncate">
        <thead>
          <tr>
            <th></th>
            {selectedStore === 'São Rafael 2'
              ? years.slice(3).map((year, yearIndex) =>
                  // Verifica se o ano existe nos dados
                  data.values && yearIndex < data.values.length ? (
                    <th className="pb-4 text-center" key={year} id={year}>
                      {year}
                    </th>
                  ) : null,
                )
              : years.map((year, yearIndex) =>
                  // Verifica se o ano existe nos dados
                  data.values && yearIndex < data.values.length ? (
                    <th className="pb-4 text-center" key={year} id={year}>
                      {year}
                    </th>
                  ) : null,
                )}
          </tr>
        </thead>
        <tbody className="text-center">
          {months.map((month, monthIndex) => (
            <tr key={month} className="pb-4 text-center">
              <td className="font-semibold">{capitalizeFirstLetters(month)}</td>
              {data.values!.map((value, yearIndex) => {
                if (!value[month]) {
                  // Se o mês não estiver presente nos dados para este ano, retorna uma célula vazia
                  return <td key={`${yearIndex}-${month}`}></td>
                }

                let previousMonthValue
                let sameMonthLastYearValue

                if (month === 'janeiro' && Number(years[yearIndex]) === 2017) {
                  // Exibindo o valor de janeiro de 2017 sem calcular porcentagens
                  const currentMonthValue = Number(value[month])

                  return (
                    <td key={`${yearIndex}-${month}`}>
                      <div className="flex flex-col gap-px rounded-xl bg-bluesr-400 p-2 text-aliceblue">
                        <div className="flex items-center justify-around gap-4">
                          {isNaN(currentMonthValue)
                            ? ' '
                            : currentMonthValue.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                        </div>
                      </div>
                    </td>
                  )
                }

                // Para os outros meses e anos, calcular as porcentagens como antes
                if (month === 'janeiro' && yearIndex > 0) {
                  // Comparando janeiro com dezembro do ano anterior
                  previousMonthValue = data.values![yearIndex - 1].dezembro
                } else if (monthIndex > 0) {
                  // Comparando com o mês anterior no mesmo ano
                  previousMonthValue = value[months[monthIndex - 1]]
                }

                if (yearIndex > 0) {
                  // Comparando com o mesmo mês do ano anterior
                  sameMonthLastYearValue = data.values![yearIndex - 1][month]
                }

                const currentMonthValue = Number(value[month])
                const previousValue = Number(previousMonthValue)
                const lastYearValue = Number(sameMonthLastYearValue)

                // Verificar se algum valor é NaN
                if (isNaN(currentMonthValue) || isNaN(previousValue)) {
                  return (
                    <td key={`${yearIndex}-${month}`}></td> // Se algum valor for NaN, não renderiza nada na célula
                  )
                }

                const percentageMonthComparison = FaturamentoClass.percentage(
                  currentMonthValue,
                  previousValue,
                )
                const percentageColorMonth =
                  percentageMonthComparison > 0
                    ? 'text-green-500'
                    : 'text-red-500'

                let percentageYearComparison
                let percentageColorYear
                if (sameMonthLastYearValue !== undefined) {
                  percentageYearComparison = FaturamentoClass.percentage(
                    currentMonthValue,
                    lastYearValue,
                  )
                  percentageColorYear =
                    percentageYearComparison > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                }

                return (
                  <td key={`${yearIndex}-${month}`}>
                    <div className="flex flex-col gap-px rounded-xl bg-bluesr-400 p-2 text-aliceblue">
                      <div
                        className={`flex justify-end ${percentageColorMonth}`}
                      >
                        {percentageMonthComparison}%
                      </div>
                      <div className="flex items-center justify-around gap-4">
                        <p className={percentageColorYear}>
                          {percentageYearComparison !== undefined
                            ? `${percentageYearComparison}%`
                            : ''}
                        </p>
                        {currentMonthValue.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </div>
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
