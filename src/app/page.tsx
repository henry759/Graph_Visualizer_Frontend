"use client"

import GetValues from "@/components/GetValues";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-sky-800">
      <div className="mx-auto w-full container h-screen flex flex-col items-center justify-center px-4 py-4">
        <GetValues />
      </div>
    </div>
  );
}
