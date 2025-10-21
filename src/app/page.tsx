"use client";

import GetValues from "@/components/GetValues";

export default function Home() {
  return (
    <div className="text-white w-full min-h-screen bg-main-background">
      <div className="container mx-auto w-full h-screen flex flex-col items-center justify-center px-4 py-4">
        <div className="px-4 py-5 border-[1px] border-slate-900 backdrop-blur-[14px] _bg-cyan-300/40 bg-black/50 rounded-2xl shadow-2xl shadow-black/70">
          <h1 className="font-main text-5xl md:text-5xl xl:text-6xl 2xl:text-7xl w-full _text-cyan-300 block mx-auto text-center mt-0 mb-0 bg-clip-text bg-gradient-to-t from-blue-500 to-rose-500 text-transparent">Graph  Visualizer</h1>
        </div>
        <GetValues />
      </div>
    </div>
  );
}
