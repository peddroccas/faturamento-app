interface TableProps {
  headers: string[];
  values: string[] | number[];
  rows: number;
}

export function Table({ headers, values, rows }: TableProps) {
  return (
    <div className="my-4 p-2 border border-aliceblue rounded">
      <table className="">
        <thead>
          <tr>
            {headers.map((header) => (
              <th className="p-4" id={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          <tr className="">
            {values.map((value, cellIndex) => (
              <td className={`leading-4 p-2 bg-bluesr-400 text-aliceblue ${cellIndex === 0 ? 'first:rounded-l-lg' : ''} ${cellIndex === values.length - 1 ? 'last:rounded-r-lg' : ''}`}>{value}</td>

            ))}

          </tr>
        </tbody>
      </table>
    </div>
  );
}
