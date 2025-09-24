"use client"

import GetValues from "@/components/GetValues";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-950">
      <div className="container mx-auto w-full h-screen flex flex-col items-center justify-center px-4 py-4">
        <div>
          <h1 className="text-3xl font-bold md:text-5xl w-full block mx-auto text-center mt-10 mb-4">Graph Visualizer 📉</h1>
        </div>
        <GetValues />
      </div>
    </div>
  );
}
