"use client"

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import { evaluate, compile } from "mathjs";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

type FunctionGraphProps = {
  step: number;
  xRange: [number, number];
  expr: string;
  theXVal: number;
}

const generateData = (theXVal: number, expr: string, xRange: [number, number], step: number) => {
  const [start, end] = xRange;
  const labels = [];
  const yValues = [];

  for (let i = start; i < end; i += step) {
    labels.push(i.toFixed());
    const y = compile(expr).evaluate({ theXVal });
    yValues.push(y);
  }
  return { labels, yValues };
}

const FuncGraph = ({ step, xRange, expr, theXVal }: FunctionGraphProps) => {
  const { labels, yValues } = generateData(theXVal, expr, xRange, step);
  const options = {
    scales: {
      y: {
        grid: {
          color: "rgba(200, 33, 100, 1)"
        },
      },
      x: {
        grid: {
          color: "rgba(200, 33, 100, 1)"
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false
  };

  const funcData = {
    labels,
    datasets: [
      {
        label: "f(x) = sin(x)",
        data: yValues,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(200, 255, 255, 1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="w-full h-full rounded-b-none rounded-xl bg-gray-900 p-5">
      <Line options={options} data={funcData} />
    </div>
  )
}

export default FuncGraph
