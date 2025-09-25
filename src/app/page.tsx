"use client"

import GetValues from "@/components/GetValues";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-main-background">
      <div className="container mx-auto w-full h-screen flex flex-col items-center justify-center px-4 py-4">
        <div>
          <h1 className="text-3xl font-bold md:text-5xl w-full block mx-auto text-center mt-10 mb-4">Graph Visualizer 📉</h1>
          <h2 className="text-sky-200 text-sm font-thin md:text-xl w-full block mx-auto text-center mb-4">Understand data with a visual way</h2>
        </div>
        <GetValues />
      </div>
    </div>
  );
}
