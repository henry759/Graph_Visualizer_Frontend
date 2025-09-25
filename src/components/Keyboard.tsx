type KeyType = {
  addExpression: (expression: string) => void;
}

const Keyboard = ({ addExpression }: KeyType) => {
  return (
    <div className="w-full h-auto rounded-2xl bg-sky-950/50 border-[1px] border-slate-800 shadow-2xl shadow-black/40">
      {/* Header */}
      <div className="">
        <h1 className="w-full text-xl text-center mb-7 border-b-2 border-b-slate-500 py-4"><code className="bg-cyan-900 rounded-xl px-5 py-2">Keys ⌨</code></h1>
      </div>

      {/* Keys */}
      <div className="w-full px-4 pt-0 pb-6 flex justify-between">
        {/* Expression Keys */}
        <div className="flex gap-x-12 flex-wrap">
          {/* <button className="border-none outline-none rounded-xl px-10 py-4 bg-sky-950">Pi</button> */}
          <button onClick={() => addExpression("x")} className="border-none outline-none rounded-xl px-10 py-4 bg-sky-950">x</button>
          {/* <button className="border-none outline-none rounded-xl px-10 py-4 bg-sky-950">y</button> */}
          <button onClick={() => addExpression("square")} className="border-none outline-none rounded-xl px-10 py-4 bg-sky-950">square</button>
        </div>
        {/* Operator Keys */}
        <div className="flex gap-x-12 flex-wrap">
          <button onClick={() => addExpression("+")} className="border-none outline-none rounded-xl px-10 py-4 bg-sky-950">+</button>
          <button onClick={() => addExpression("-")} className="border-none outline-none rounded-xl px-10 py-4 bg-sky-950">-</button>
          <button onClick={() => addExpression("*")} className="border-none outline-none rounded-xl px-10 py-4 bg-sky-950">*</button>
          <button onClick={() => addExpression("/")} className="border-none outline-none rounded-xl px-10 py-4 bg-sky-950">/</button>
        </div>
      </div>
    </div>
  )
}

export default Keyboard
