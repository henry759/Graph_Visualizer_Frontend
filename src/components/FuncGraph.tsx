"use client"

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

type FunctionGraphProps = {
  step: number;
}

const generateData = (func: (x: number) => number, xRange: [number, number], step: number) => {
  const [start, end] = xRange;
  const labels = [];
  const yValues = [];
  for (let i = start; i < end; i += step) {
    labels.push(i.toFixed());
    yValues.push(func(i));
  }
  return { labels, yValues };
}

const FuncGraph = ({ step }: FunctionGraphProps) => {
  const { labels, yValues } = generateData((x) => Math.sin(x), [-10, 10], step);

  const funcData = {
    labels,
    datasets: [
      {
        label: "f(x) = sin(x)",
        data: yValues,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="w-full h-[70vh] container rounded-xl bg-gray-900 p-5">
      <Line data={funcData} />
    </div>
  )
}

export default FuncGraph
