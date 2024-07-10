import { Skeleton } from '@mui/material'
import { capitalizeFirstLetters, months, Data } from '../services/api'
import { useContext } from 'react'
import { HomeContext } from '../contexts/HomeContext'

type isComparedTo = 'lastYear' | 'lastMonth'
type tableType = 'perdas' | 'faturamento'

interface TableProps {
  data: Data | undefined
  tableType: tableType
}

export function Table({ data, tableType }: TableProps) {
  const { isLoading, faturamentoData } = useContext(HomeContext)

  function percentage(
    data: Data | undefined,
    month: string,
    year: number,
    isComparedTo: isComparedTo,
  ): number | undefined {
    try {
      if (data && data[year][month]) {
        switch (isComparedTo) {
          case 'lastMonth':
            if (month === 'janeiro') {
              const lastMonth = 'dezembro'
              const percentage =
                ((data[year][month] - data[year - 1][lastMonth]) /
                  data[year][month]) *
                100
              return Number(percentage.toFixed(2))
            } else {
              const lastMonth = months[months.indexOf(month) - 1]
              const percentage =
                ((data[year][month] - data[year][lastMonth]) /
                  data[year][month]) *
                100
              return Number(percentage.toFixed(2))
            }
          case 'lastYear':
            if (year === 2017) {
              return 0
            } else {
              const percentage =
                ((data[year][month] - data[year - 1][month]) /
                  data[year][month]) *
                100
              return Number(percentage.toFixed(2))
            }
        }
      }
      return 0
    } catch {}
  }

  function perdasPercentage(
    data: Data | undefined,
    month: string,
    year: number,
  ): number | undefined {
    if (data![year][month]) {
      const percentage =
        (data![year][month] / faturamentoData![year][month]) * 100
      return Number(percentage.toFixed(2))
    }
  }

  switch (tableType) {
    case 'faturamento':
      return (
        <div className="w-full p-4 font-montserrat text-sm">
          <div
            className={`transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
          >
            {isLoading && (
              <Skeleton
                className="rounded"
                animation="wave"
                variant="rectangular"
                width="100%"
                height={600}
              />
            )}
          </div>
          <div
            className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          >
            {!isLoading && (
              <div className="w-full overflow-x-scroll">
                <table className="w-full table-auto border-collapse  truncate">
                  <thead>
                    <tr className="w-auto">
                      {Object.keys(data!).map((year) => (
                        <th className="pb-4 text-center" key={year} id={year}>
                          {year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {months.map((month) => (
                      <tr key={month}>
                        {Object.keys(data!).map((year) => {
                          const lastMonthPercentage = percentage(
                            data,
                            month,
                            Number(year),
                            'lastMonth',
                          )
                          const lastYearPercentage = percentage(
                            data,
                            month,
                            Number(year),
                            'lastYear',
                          )
                          const lastMonthPercentageColor =
                            lastMonthPercentage! >= 0
                              ? 'text-green-400'
                              : 'text-red-400'
                          const lastYearPercentageColor =
                            lastYearPercentage! >= 0
                              ? 'text-green-400'
                              : 'text-red-400'
                          return (
                            <td
                              className="rounded-xl border border-aliceblue bg-bluesr-400 font-medium text-aliceblue"
                              key={`${month}-${year}`}
                            >
                              <div className="flex justify-between px-2">
                                <span className="opacity-50">
                                  {capitalizeFirstLetters(month)}
                                </span>
                                <p className={`${lastMonthPercentageColor}`}>
                                  {isNaN(lastMonthPercentage!) ||
                                  lastMonthPercentage === 0
                                    ? ' '
                                    : `${lastMonthPercentage}%`}
                                </p>
                              </div>
                              <div className="flex w-full justify-between gap-2 px-2 py-px">
                                <p className={`${lastYearPercentageColor}`}>
                                  {isNaN(lastYearPercentage!) ||
                                  lastYearPercentage === 0
                                    ? ''
                                    : `${lastYearPercentage}%`}
                                </p>
                                <p>
                                  {(isNaN(Number(data![year][month])) ||
                                    Number(data![year][month]).toLocaleString(
                                      'pt-br',
                                      {
                                        style: 'currency',
                                        currency: 'BRL',
                                      },
                                    )) ??
                                    ''}
                                </p>
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )
    case 'perdas':
      return (
        <div className="w-full p-4 font-montserrat text-sm">
          <div
            className={`transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
          >
            {isLoading && (
              <Skeleton
                className="rounded"
                animation="wave"
                variant="rectangular"
                width="100%"
                height={600}
              />
            )}
          </div>
          <div
            className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          >
            {!isLoading && (
              <div className="w-full overflow-x-scroll">
                <table className="w-full table-auto border-collapse  truncate">
                  <thead>
                    <tr className="w-auto">
                      {Object.keys(data!).map((year) => (
                        <th className="pb-4 text-center" key={year} id={year}>
                          {year}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {months.map((month) => (
                      <tr key={month}>
                        {Object.keys(data!).map((year) => {
                          const percentage = perdasPercentage(
                            data,
                            month,
                            Number(year),
                          )
                          return (
                            <td
                              className="rounded-xl border border-aliceblue bg-bluesr-400 font-medium text-aliceblue"
                              key={`${month}-${year}`}
                            >
                              <span className="flex justify-between px-2 opacity-50">
                                {capitalizeFirstLetters(month)}
                              </span>
                              <div className="flex w-full justify-between gap-2 px-2 py-px">
                                <p>{percentage ? percentage + '%' : ''}</p>
                                <p>
                                  {(isNaN(Number(data![year][month])) ||
                                    Number(data![year][month]).toLocaleString(
                                      'pt-br',
                                      {
                                        style: 'currency',
                                        currency: 'BRL',
                                      },
                                    )) ??
                                    ''}
                                </p>
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )
  }
}
