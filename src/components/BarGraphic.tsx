import { BarChart } from "@mui/x-charts";
import { capitalize } from "lodash";

interface BarGraphicProps {
  monthRow: number[];
  label: { today: string; lastMonth: string; lastYear: string };
}

export function BarGraphic({ monthRow, label }: BarGraphicProps) {
  return (

    <BarChart
      xAxis={[
        {
          scaleType: "band",
          data: [capitalize(label.today), capitalize(label.lastMonth), capitalize(label.lastYear)],
        },
      ]}
      margin={{ top: 10, bottom: 30, left: 60, right: 10 }}
      series={[
        { data: [monthRow[0], monthRow[1], monthRow[2]], color: "#0C4B80" },
      ]}
      width={375}
      height={300}
    />

  );

}
