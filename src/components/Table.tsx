interface TableProps {
  headers: string[];
  rows: number;
}

export function Table({ headers, rows }: TableProps) {
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
        <tbody className="text-center border-t border-l-4 rounded-l">
          <tr className="">
            <td className="leading-4 p-2 bg-bluesr-400  text-aliceblue">{[30, 1, 2]}</td>
            <td className="leading-4 p-2 bg-bluesr-400  text-aliceblue">{"30%"}</td>
            <td className="leading-4 p-2 bg-bluesr-400  text-aliceblue">{"10%"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
