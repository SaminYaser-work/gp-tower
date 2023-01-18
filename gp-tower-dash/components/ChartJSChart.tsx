import TestData1 from "../types/TestData1";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const states = [
  "AK",
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY",
];

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  //   plugin: {
  //     decimation: {
  //       enabled: true,
  //       algorithm: "lttb",
  //       samples: 100,
  //     },
  //   },
};

function getRandomColor() {
  return "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");
}

export function ChartJSScatter({ data }: { data: TestData1[] }) {
  const datasets = states.map((state) => ({
    label: state,
    data: data
      .filter((d) => d.state == state)
      .map((d) => ({
        x: d.latitude,
        y: d.longitude,
      })),
    borderColor: getRandomColor(),
    backgroundColor: getRandomColor(),
  }));

  const scatterData: ChartData<"scatter"> = {
    datasets: datasets,
    // datasets: [
    //   {
    //     label: "Lat Long in AK",
    //     data: data
    //       .filter((d) => d.state == "AK")
    //       .map((d) => ({
    //         x: d.latitude,
    //         y: d.longitude,
    //       })),
    //     borderColor: getRandomColor(),
    //     backgroundColor: getRandomColor(),
    //   },
    //   {
    //     label: "Lat Long in AL",
    //     data: data
    //       .filter((d) => d.state == "AL")
    //       .map((d) => ({
    //         x: d.latitude,
    //         y: d.longitude,
    //       })),
    //     borderColor: getRandomColor(),
    //     backgroundColor: getRandomColor(),
    //   },
    // ],
  };

  //   console.log(scatterData[0]);

  return <Scatter options={options} data={scatterData} />;
}
