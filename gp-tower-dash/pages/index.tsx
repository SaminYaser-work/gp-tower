import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import data from "../../data/data1.json";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, {
  ChangeEvent,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import TestData1 from "../types/TestData1";

const NivoScatter = dynamic(
  () => import("../components/NivoCharts").then((mod) => mod.NivoScatter),
  {
    ssr: false,
  }
);
import { ChartJSScatter } from "../components/ChartJSChart";

// import { XYFrame, OrdinalFrame } from "semiotic";

const Home: NextPage = () => {
  const defValue = 50;

  let d = data as TestData1[];
  const totalLength = d.length;

  const [chartData, setChartData] = useState(d.slice(0, defValue));
  const [label, setLabel] = useState<number>(defValue);
  const [isPending, startTransition] = useTransition();
  const sliderRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!sliderRef.current) return;
    const value = parseInt(sliderRef.current?.value);
    if (value) {
      startTransition(() => setChartData(d.slice(0, value)));
      // setChartData(d.slice(0, value));
    }
  };

  const getChart = useMemo(() => {
    console.log("RENDERING CHART");
    // return <ReChartLine data={chartData} />;
    // return <ReChartBar data={chartData} />;
    // return <ReChartScatter data={chartData} />;
    // return <SemioticScatter data={chartData} />;
    // return <SemioticBar data={chartData} />;
    // return <NivoScatter data={chartData} />;
    return <ChartJSScatter data={chartData} />;
  }, [chartData]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex flex-col justify-center items-center gap-5">
          <p>{label}</p>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLabel(parseInt(e.target.value))
            }
            className="w-screen"
            type="range"
            name=""
            min={0}
            max={Math.floor(totalLength)}
            id=""
            ref={sliderRef}
            defaultValue={defValue}
          />
          <button
            onClick={handleClick}
            className="font-bold text-black bg-amber-400 px-4 py-2 rounded-md"
          >
            Update
          </button>
        </div>
        {(isPending && <p>Updating...</p>) || <p>Done</p>}

        <div className="h-screen w-[80vw]">{getChart}</div>
      </main>
    </div>
  );
};

function ReChartScatter({ data }: { data: TestData1[] }) {
  return (
    <ScatterChart width={800} height={500}>
      <CartesianGrid />
      <XAxis type="number" dataKey="latitude" name="Lat" />
      <YAxis type="number" dataKey="longitude" name="Long" />
      {/* <Tooltip cursor={{ strokeDasharray: "3 3" }} /> */}
      <Scatter name="location" data={data} fill="#8884d8" r={1} />
    </ScatterChart>
  );
}

function ReChartLine({ data }: { data: TestData1[] }) {
  return (
    <LineChart width={1000} height={450} data={data}>
      <Line type="monotone" dataKey="structure" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="id" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}

function ReChartBar({ data }: { data: TestData1[] }) {
  return (
    <BarChart width={800} height={450} data={data}>
      <CartesianGrid stroke="#ccc" />
      <Bar dataKey={"license"} fill="#8884d8" />
      <YAxis />
      <XAxis dataKey={"structure_type"} />
      <Legend />
      <Tooltip />
    </BarChart>
  );
}

export default Home;

// const SemioticScatter = ({ data }: { data: TestData1[] }) => {
//   const frameProps = {
//     points: data,
//     size: [800, 500],
//     // margin: { left: 60, bottom: 90, right: 10, top: 40 },
//     xAccessor: "id",
//     yAccessor: "structure",
//     // yExtent: [0],
//     // xExtent: [0],
//     pointStyle: (d: any) => {
//       return {
//         r: 3,
//         fill:
//           d.state === "Ex Machina"
//             ? "#ac58e5"
//             : d.title === "Far from the Madding Crowd"
//             ? "#E0488B"
//             : "#9fd0cc",
//       };
//     },
//     title: <text textAnchor="middle">A shitty scatter plot</text>,
//     axes: [
//       { orient: "left", label: "Structure Height" },
//       { orient: "bottom", label: { name: "ID", locationDistance: 50 } },
//     ],
//     canvasPoints: true,
//   };

//   // @ts-ignore
//   return <XYFrame {...frameProps} />;
// };

// const SemioticBar = ({ data }: { data: TestData1[] }) => {
//   // @ts-ignore
//   return (
//     <OrdinalFrame
//       data={data}
//       size={[800, 500]}
//       oAccessor={"id"}
//       rAccessor={"structure"}
//       type={"bar"}
//       style={{ fill: "red", stroke: "black" }}
//       oLabel={true}
//     />
//   );
// };

// function Plotly({ df }: { df: dfd.DataFrame | undefined }) {
//   if (!df) return null;

//   const x = df["structure"].values;
//   const y = df["id"].values;

//   return (
//     <Plot
//       data={[
//         {
//           x: x,
//           y: y,
//           type: "scatter",
//           mode: "lines+markers",
//           marker: { color: "red" },
//         },
//       ]}
//       layout={{ width: 800, height: 500, title: "A Shitty Plot" }}
//     />
//   );
// }
