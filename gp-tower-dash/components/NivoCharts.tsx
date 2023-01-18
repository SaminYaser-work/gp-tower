import {
  ResponsiveScatterPlotCanvas,
  ScatterPlot,
  ScatterPlotCanvas,
  ScatterPlotDatum,
  ScatterPlotRawSerie,
} from "@nivo/scatterplot";
import TestData1 from "../types/TestData1";

export function NivoScatter({ data }: { data: TestData1[] }) {
  const scatterData: ScatterPlotRawSerie<ScatterPlotDatum>[] = [
    {
      id: "location",
      data: data.map((d) => {
        return {
          x: d.structure,
          y: d.id,
        };
      }),
    },
  ];

  const testData = [
    {
      id: "group A",
      data: [
        {
          x: 52,
          y: 109,
        },
        {
          x: 54,
          y: 112,
        },
        {
          x: 62,
          y: 52,
        },
        {
          x: 27,
          y: 111,
        },
      ],
    },
  ];

  console.log(scatterData);

  return (
    <ScatterPlotCanvas
      height={500}
      width={800}
      data={scatterData}
      margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
      xScale={{ type: "linear", min: 0, max: "auto" }}
      xFormat=">-.2f"
      yScale={{ type: "linear", min: 0, max: "auto" }}
      yFormat=">-.2f"
      nodeSize={5}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        // orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "id",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        // orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "height",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 130,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 12,
          itemsSpacing: 5,
          itemDirection: "left-to-right",
          symbolSize: 12,
          //   symbolShape: "rect",
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
