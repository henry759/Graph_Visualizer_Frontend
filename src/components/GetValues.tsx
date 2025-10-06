"use client";
import { useRef, useState } from "react"
import FuncGraph from "./FuncGraph";
import Keyboard from "./Keyboard";

const GetValues = () => {
  const [stepper, setStepper] = useState<number>(0.3);
  const [rangeStart, setRangeStart] = useState<number>(-10);
  const [rangeEnd, setRangeEnd] = useState<number>(10);
  const [funcExp, setFuncExp] = useState("");
  const [realExpr, setRealExpr] = useState("");
  const [theX, setTheX] = useState<number>(2);

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

  // function handleAddingExpression(expression: string) {
  //   if (funcExp.length <= Infinity) {
  //     setFuncExp((prev) => prev + expression);
  //   }
  // }
  //
  function calculateFunction(funcExp: string) {
    setRealExpr(funcExp);
  }

  function handleExpChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (funcExp.length <= Infinity) {
      setFuncExp(e.target.value);
    }
  }

  //
  // function handleXChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setTheX(parseFloat(e.target.value));
  // }

  return (
    <div className="w-full h-[auto] _bg-gray-800 _shadow-2xl _shadow-black/70 flex flex-col items-center justify-center mt-10 rounded-xl _hover:shadow-2xl _hover:shadow-sky-950 transition-shadow duration-300">
      <div className="flex justify-between w-full">
        <div className="text-xl px-4 py-2 rounded-xl border-[1px] rounded-b-none border-b-0 border-gray-600 bg-black/50">
          {/* <input type="range" value={theX} onChange={handleXChange} /> */}
          <input className="border-0 outline-none" type="text" value={funcExp} onChange={handleExpChange} />
        </div>
        <button onClick={() => calculateFunction(funcExp)} className="border-0 outline-none px-7 py-3 rounded-xl bg-cyan-900"><code><strong>Calculate</strong></code></button>
      </div>
      <div className="w-full h-full shadow-xl shadow-black/80">
        <FuncGraph step={stepper} xRange={[rangeStart, rangeEnd]} expr={realExpr} theXVal={theX} />
      </div>
      <div className="shadow-2xl shadow-black/70 w-full flex flex-col items-center justify-between rounded-xl rounded-t-none border-[1px] border-slate-800 px-10 py-10 bg-black/50 backdrop-blur-[10px]">
        {/* Get Length Between Points as an input float number  */}
        <h1 className="w-full text-xl text-center mb-7 border-b-2 border-b-slate-500 py-4"><code className="bg-cyan-900 rounded-xl px-5 py-2">Utilities 🔨</code></h1>

        <div className="w-full flex flex-row items-center justify-between">
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
      </div>
      <div className="w-full h-auto mt-10">
        {/* <Keyboard addExpression={handleAddingExpression} /> */}
      </div>
    </div>
  )
}

export default GetValues
