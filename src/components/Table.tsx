interface TableProps {
  headers: string[];
  values: number[];
  rows: number;
}

export function Table({ headers, values }: TableProps) {
  return (
    <div className="my-4 p-2 border border-aliceblue rounded">
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
          <tr className="">
            {values.map((value, cellIndex) => {
              const bgColor = Number(value) >= 0 ? 'bg-green-500' : 'bg-redsr-400'
              return (
                <td
                  className={`leading-4 p-2 ${cellIndex ? bgColor : 'bg-bluesr-400'} text-aliceblue ${cellIndex === 0 ? "first:rounded-l-lg" : ""} ${cellIndex === values.length - 1 ? "last:rounded-r-lg" : ""}`}
                >
                  {value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + (!cellIndex ? '' : '%')}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
