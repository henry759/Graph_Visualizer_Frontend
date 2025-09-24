"use client"
import { useEffect, useState, useRef } from "react"
import FuncGraph from "./FuncGraph";

const GetValues = () => {
  const [stepper, setStepper] = useState<number>(0.01);
  const stepperEl = useRef<HTMLInputElement>(null);

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const stepValue = parseFloat(e.target.value);
    if (!isNaN(stepValue) && stepValue <= 2 && stepValue >= 0.01) {
      setStepper(stepValue);
    }
  }

  return (
    <div className="w-full h-auto bg-gray-800 shadow-2xl shadow-graph-shadow/40 flex flex-col-reverse md:flex-row items-center justify-between mt-10 rounded-xl _hover:shadow-2xl _hover:shadow-sky-950 transition-shadow duration-300">
      <div className="rounded-xl px-10 py-10">
        <label>
          <h2>Step:</h2>
          <input value={stepper} step="0.01" onChange={handleChangeInput} type="number" className="graph-input" />
        </label>

      </div>
      <div className="w-auto h-auto">
        <FuncGraph step={stepper} />
      </div>
    </div>
  )
}

export default GetValues
