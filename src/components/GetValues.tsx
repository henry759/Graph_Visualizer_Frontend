"use client"
import { useState } from "react"
import FuncGraph from "./FuncGraph";

const GetValues = () => {
  const [stepper, setStepper] = useState<number>(0.3);
  const [rangeStart, setRangeStart] = useState<number>(-10);
  const [rangeEnd, setRangeEnd] = useState<number>(10);

  function handleChangeStepperInput(e: React.ChangeEvent<HTMLInputElement>) {
    const stepValue = parseFloat(e.target.value);
    if (!isNaN(stepValue) && stepValue <= 10 && stepValue >= 0.3) {
      setStepper(stepValue);
    }
  }

  function handleChangeRangeStartInput(e: React.ChangeEvent<HTMLInputElement>) {
    const startValue = parseFloat(e.target.value);
    if (!isNaN(startValue) && startValue <= 50 && startValue >= -50) {
      setRangeStart(startValue);
    }
  }

  function handleChangeRangeEndInput(e: React.ChangeEvent<HTMLInputElement>) {
    const endValue = parseFloat(e.target.value);
    if (!isNaN(endValue) && endValue <= 50 && endValue >= -50) {
      setRangeEnd(endValue);
    }
  }

  return (
    <div className="w-full h-[auto] _bg-gray-800 shadow-2xl shadow-black/70 flex flex-col-reverse md:flex-col-reverse items-center justify-center mt-10 rounded-xl _hover:shadow-2xl _hover:shadow-sky-950 transition-shadow duration-300">
      <div className="w-full flex flex-row items-center justify-between rounded-xl rounded-t-none border-[1px] border-slate-800 px-10 py-10 bg-black/50 backdrop-blur-[10px]">
        {/* Get Length Between Points as an input float number  */}
        <label>
          <h2 className="graph-input-header"><code>Step:</code></h2>
          {/* step is inside of input */}
          <input value={stepper} step="0.02" onChange={handleChangeStepperInput} type="number" className="graph-input" />
        </label>

        <label>
          <h2 className="graph-input-header"><code>Range [Start - End]</code></h2>
          <input value={rangeStart} step="1" onChange={handleChangeRangeStartInput} type="number" className="graph-input" />
          <span className="px-4">----</span>
          <input value={rangeEnd} step="1" onChange={handleChangeRangeEndInput} type="number" className="graph-input" />
        </label>

      </div>
      <div className="w-full h-full">
        <FuncGraph step={stepper} xRange={[rangeStart, rangeEnd]} />
      </div>
    </div>
  )
}

export default GetValues
