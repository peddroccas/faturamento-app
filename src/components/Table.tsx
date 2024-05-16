import { yearData } from "../services/api";
import { BarChart } from '@mui/x-charts/BarChart';

export function BasicTable() {
  const rows = yearData


  const values = rows?.map((row)=>{
    return {value: row.value, month: row.month.substring(0,3)}
  })
  const chartSetting = {
    xAxis: [
      {
        label: 'reais',
      },
    ],
    width: 600,
    height: 400,
    'background-color': "#fff"
  };
  
  const valueFormatter = (value: number | null) => `R$${value}`;
  
  return (
    <div className="p-4">
     <BarChart
      dataset={values}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'value', label: '2023', valueFormatter, color: '#D4DCE2'}]}
      layout="horizontal"
      {...chartSetting}
    />
    </div>
  );
}