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
      <div className="flex justify-center">
        <div className="text-[1rem] px-4 py-2 rounded-xl border-[1px] rounded-b-none border-b-0 border-gray-600 bg-black/50">
          <span className="mr-2 px-2 py-2 rounded-full bg-conic-120 from-blue-700 to-violet-600">ƒx</span>
          <input className="placeholder:text-[0.8rem] md:placeholder:text-[1rem] border-0 outline-none rounded-xl rounded-r-none" type="text" placeholder="Write your function for see as Graph" value={funcExp} onChange={handleExpChange} />
        </div>
        <button onClick={() => calculateFunction(funcExp)} className="cursor-pointer text-xs md:text-[1rem] border-0 outline-none px-4 py-2 md:px-7 md:py-3 rounded-xl rounded-b-none bg-violet-700"><code><strong>🧮 Calculate</strong></code></button>
      </div>
      <div className="w-full h-full shadow-xl shadow-black/80">
        <FuncGraph step={stepper} xRange={[rangeStart, rangeEnd]} expr={realExpr} theXVal={theX} />
      </div>
      <div className="shadow-2xl shadow-black/70 w-full flex flex-col items-center justify-between rounded-xl rounded-t-none border-[1px] border-slate-800 px-10 py-10 bg-black/50 backdrop-blur-[10px]">
        {/* Get Length Between Points as an input float number  */}
        <h1 className="w-full text-[0.8rem] md:text-[1rem] text-center mb-7 border-b-2 border-b-slate-500 py-4"><code className="bg-violet-700 rounded-xl px-5 py-2">Utilities 🔨</code></h1>

        {/* Stepper and range Wrapper */}
        <div className="w-full flex gap-x-10 flex-col xl:flex-row items-center justify-between">
          <label className="w-full">
            <h2 className="graph-input-header text-xs md:text-[1rem]"><code>Step:</code></h2>
            {/* step is inside of input */}
            <input value={stepper} step="0.02" onChange={handleChangeStepperInput} type="range" min={0.3} max={5} className="graph-input w-full text-white accent-rose-300" />
          </label>

          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="graph-input-header w-full text-xs md:text-[1rem]"><code>Range [Start - End]</code></h2>
            <label className="flex flex-col gap-y-3 md:flex-row flex-wrap justify-center items-center w-full">
              <div className="flex flex-row w-full gap-x-3 xl:gap-x-7 justify-center items-center">
                <span className="whitespace-nowrap text-xs">min: -50</span>
                <input value={rangeStart} step="1" onChange={handleChangeRangeStartInput} type="range" min={-50} max={0} className="graph-input w-full accent-rose-500" />
                <span className="whitespace-nowrap text-xs">max: <strong>0</strong></span>
              </div>
              <div className="flex flex-row w-full gap-x-3 xl:gap-x-7 justify-center items-center">
                <span className="whitespace-nowrap text-xs">min: <strong>0</strong></span>
                <input value={rangeEnd} step="1" onChange={handleChangeRangeEndInput} type="range" min={0} max={50} className="graph-input w-full accent-rose-500" />
                <span className="whitespace-nowrap text-xs">max: 50</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full h-auto mt-10">
        {/* <Keyboard addExpression={handleAddingExpression} /> */}
      </div>
    </div>
  )
}

export default GetValues
