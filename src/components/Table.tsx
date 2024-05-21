interface TableProps {
  headers: string[];
  rows: (number|string)[][];
}

export function Table({ headers, rows }: TableProps) {
  return (
    <div>
      <table className="">
        <thead>
          <tr>
            {headers.map((header) => (
              <th className="p-4" id={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                const bgColor = Number(cell) >= 0 ? 'bg-green-500' : 'bg-redsr-400'
                const roundedClass = `
                  ${rowIndex === 0 && cellIndex === 0 ? 'rounded-tl-lg' : ''}
                  ${rowIndex === 0 && cellIndex === row.length - 1 ? 'rounded-tr-lg' : ''}
                  ${rowIndex === rows.length - 1 && cellIndex === 0 ? 'rounded-bl-lg' : ''}
                  ${rowIndex === rows.length - 1 && cellIndex === row.length - 1 ? 'rounded-br-lg' : ''}
                `;
                return (
                  <td
                    key={cellIndex}
                    className={`border border-aliceblue leading-4 p-2 ${cellIndex && rowIndex ? bgColor : 'bg-bluesr-400'} text-aliceblue ${roundedClass}`}
                  >
                    {rowIndex ? cell.toLocaleString('pt-br') + (!cellIndex || !rowIndex ? '' : '%')  : cell.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
