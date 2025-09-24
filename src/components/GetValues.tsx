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
    <div className="w-full h-auto bg-gray-800 shadow-2xl shadow-graph-shadow/40 flex items-center justify-center mt-10 rounded-xl _hover:shadow-2xl _hover:shadow-sky-950 transition-shadow duration-300">
      <div className="rounded-xl px-10">
        <input value={stepper} step="0.01" onChange={handleChangeInput} type="number" className="text-xl text-gray-900 bg-sky-100 outline-none border-none" />
      </div>
      <div className="w-full h-full">
        <FuncGraph step={stepper} />
      </div>
    </div>
  )
}

export default GetValues
