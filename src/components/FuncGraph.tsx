"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import { evaluate, compile } from "mathjs";
import { useRef, useState } from "react";
import { log } from "console";
import Image from "next/image";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

type FunctionGraphProps = {
  savedOnes: any;
  setSavedOnes: any;
  step: number;
  xRange: [number, number];
  expr: string;
  theXVal: number;
}

const generateData = (theXVal: number, expr: string, xRange: [number, number], step: number) => {
  const [start, end] = xRange;
  const labels = [];
  const yValues = [];
  const compiled = compile(expr);

  for (let x = start; x <= end; x += step) {
    labels.push(x.toFixed(2));
    try {
      const y = compiled.evaluate({ x });
      yValues.push(y);
    } catch (err) {
      console.error(err);
    }
  }
  return { labels, yValues };
}

// Component Starts...
const FuncGraph = ({ savedOnes, setSavedOnes, theXVal, step, xRange, expr }: FunctionGraphProps) => {
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
    type: 'line',
    labels,
    datasets: [
      {
        label: "f(x)",
        data: yValues,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(200, 255, 255, 1)",
        fill: false,
      },
    ],
  };

  const lineRef = useRef(null);

  async function handleSaveGraph() {
    const lineEl = lineRef.current
    const canvas = lineEl?.canvas
    if (canvas) {
      console.log(canvas);
      const myImageBase64 = canvas.toDataURL('image/png');
      console.log("My Fricking image base 64 is: ", myImageBase64)
      const response = await fetch("http://localhost:8000/images", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: myImageBase64,
        })
      });

      if (response.ok) {
        const updatedList = await fetch("http://localhost:8000/images");
        const data = await updatedList.json();
        setSavedOnes(data);
      }
    } else {
      return;
    }
  };


  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full rounded-b-none rounded-xl bg-gray-900 p-5">
        <Line ref={lineRef} options={options} data={funcData} />
        <button onClick={handleSaveGraph} className="absolute top-0 left-0 px-6 py-2 xl:px-12 xl:py-6 rounded-[0.3rem] xl:rounded-[1rem] shadow-xl bg-teal-600/20 z-20 backdrop-blur-xs font-bold">Save Graph</button>
      </div>
    </div>
  )
}

export default FuncGraph
