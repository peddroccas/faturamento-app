import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { firestore } from "../services/firebase";

export function BasicTable() {
    const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023']
  function createData(
    month: string,
    value: number,
    lastYeart: number,
    lastMonth: number
  ) {
    return { month, value, lastYeart, lastMonth };
  }

  async function readData() {
    const data = (await firestore.collection('2017').doc('dezembro').get()).data()
    console.log(data)
  
  }
    readData()
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24),
    createData("Ice cream sandwich", 237, 9.0, 37),
    createData("Eclair", 262, 16.0, 24),
    createData("Cupcake", 305, 3.7, 67),
    createData("Gingerbread", 356, 16.0, 49),
  ];


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mês</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell align="right">Relativo ao mês passado</TableCell>
            <TableCell align="right">Relativo ao ano passado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.month}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.month}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right">{row.lastYeart}</TableCell>
              <TableCell align="right">{row.lastMonth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
