import { Skeleton } from '@mui/material'

interface TableProps {
  headers: string[] | []
  rows: (number | string)[][]
  isLoading: boolean
}

export function Table({ headers, rows, isLoading }: TableProps) {
  return (
    <div className="w-full p-4 font-montserrat">
      <div
        className={`transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      >
        {isLoading && (
          <Skeleton
            className="rounded"
            animation="wave"
            variant="rectangular"
            width="100%"
            height={100}
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
                  {headers.map((header) => (
                    <th key={header} className="pb-4 text-center" id={header}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center">
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                      const bgColor =
                        Number(cell) >= 0 ? 'bg-green-700' : 'bg-redsr-400'
                      const roundedClass = `
                        ${rowIndex === 0 && cellIndex === 0 ? 'rounded-tl-lg' : ''}
                        ${rowIndex === 0 && cellIndex === row.length - 1 ? 'rounded-tr-lg' : ''}
                        ${rowIndex === rows.length - 1 && cellIndex === 0 ? 'rounded-bl-lg' : ''}
                        ${rowIndex === rows.length - 1 && cellIndex === row.length - 1 ? 'rounded-br-lg' : ''}
                      `
                      return (
                        <td
                          key={cellIndex}
                          className={`border border-aliceblue p-2 leading-4 ${cellIndex && rowIndex ? bgColor : 'bg-bluesr-400'} text-aliceblue ${roundedClass} `}
                        >
                          {rowIndex
                            ? cell.toLocaleString('pt-br') +
                              (!cellIndex || !rowIndex ? '' : '%')
                            : cell.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
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
