import { Skeleton } from '@mui/material'
import {
  capitalizeFirstLetters,
  months,
  years,
  Data,
  FaturamentoClass,
} from '../services/api'
import { useContext } from 'react'
import { HomeContext } from '../contexts/HomeContext'

interface TableProps {
  data: Data | undefined
}

export function Table({ data }: TableProps) {
  const { isLoading } = useContext(HomeContext)

  console.log(data)

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
            height={665}
          />
        )}
      </div>
      <div
        className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        {!isLoading && (
          <div className="w-full overflow-x-scroll">
            <table className="w-full table-auto border-collapse truncate">
              <thead>
                <tr>
                  <th></th>
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
                    <td className="font-semibold">
                      {capitalizeFirstLetters(month)}
                    </td>
                    {Object.keys(data!).map((year, indexYear) => (
                      <td className="font-medium" key={`${month}-${year}`}>
                        <div className="flex justify-end pr-2">
                          {FaturamentoClass.percentage(
                            data![year][
                              FaturamentoClass.getLastMonths(month, year, 2)[0]
                                .month
                            ],
                            data![
                              FaturamentoClass.getLastMonths(month, year, 2)[0]
                                .year
                            ][month],
                          )}
                        </div>
                        <div className="flex justify-between gap-2 p-2">
                          <p>Mes</p>
                          {Number(data![year][month]).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </div>
                      </td>
                    ))}
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
