import { BarChart } from "@mui/x-charts";

interface BarGraphicProps {
  monthRow: number[];
}

export function BarGraphic({ monthRow }: BarGraphicProps) {
  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",
          data: ["Mês em destaque", "Mês passado", "Ano passado"],
        },
      ]}
      series={[
        { data: [monthRow[0], monthRow[1], monthRow[2]], color: '#0C4B80'},
      ]}
      width={500}
      height={300}
    />
  );
}
