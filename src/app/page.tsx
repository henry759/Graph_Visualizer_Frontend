"use client";
import { LuSquareMenu } from "react-icons/lu";
import { IoTrashBinSharp } from "react-icons/io5";

import GetValues from "@/components/GetValues";
import { useEffect, useState } from "react";

const userId = localStorage.getItem("user_id") || crypto.randomUUID();
localStorage.setItem("user_id", userId);

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type SavedOne = {
  id: string;
  image_url: string;
}

export default function Home() {
  const [savedOnes, setSavedOnes] = useState<SavedOne[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${apiUrl}/images?user_id=${userId}`);
        const data = await res.json();
        setSavedOnes(data);
      } catch (err) {
        console.log("FetchErropr", err);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [])

  console.log(savedOnes);

  const handleDeleteSavedImage = async (id: string) => {
    const response = await fetch(`${apiUrl}/images/${id}?user_id=${userId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setSavedOnes(prev => prev.filter(img => img.id !== id));
    }
  }

  return (
    <div className="text-white w-full min-h-screen bg-main-background">
      <div className="relative container mx-auto w-full min-h-screen flex flex-col items-center justify-center px-4 py-4">
        <div className="px-4 py-5 border-[1px] border-slate-900 backdrop-blur-[14px] _bg-cyan-300/40 bg-black/50 rounded-2xl shadow-2xl shadow-black/70">
          <h1 className="font-main text-5xl md:text-5xl xl:text-6xl 2xl:text-7xl w-full _text-cyan-300 block mx-auto text-center mt-0 mb-0 bg-clip-text bg-gradient-to-t from-blue-500 to-rose-500 text-transparent">Graph  Visualizer</h1>
        </div>
        <GetValues userId={userId} savedOnes={savedOnes} setSavedOnes={setSavedOnes} />
        {/* Saved Graphs */}
        <button onClick={() => setIsMenuOpen(prev => !prev)} className="absolute bg-white/80 _invert top-[1rem] right-[1rem] px-7 py-7 z-20 text-black _bg-black/30 _backdrop-blur-sm rounded-2xl _mix-blend-lighten overflow-hidden _text-white">
          <LuSquareMenu />
        </button>
        <div style={isMenuOpen ? { right: 0 } : { right: "100%" }} className="border-2 border-slate-300/20 rounded-l-xl fixed top-0 right-0 bg-black/55 w-1/2 h-screen overflow-scroll backdrop-blur-2xl _mix-blend-hard-light px-10 py-8 shodow-xl _shadow-inner shadow-black/50 z010">
          <h1 className="w-full block text-center font-main text-2xl mb-10 md:text-4xl xl:5xl">
            Saves
          </h1>
          <ul className="saves_wrapper gap-y-5 _grid-cols-subgrid xl:gap-y-10 _flex-col _items-center _justify-start">
            {
              savedOnes.map((graph, idx) => (
                <div key={graph.id} className="w-auto h-auto">
                  <div className="w-full relative block rounded-lg xl:rounded-2xl border-2 border-slate-600">
                    <img className="w-full h-full overflow-hidden" src={graph.image_url} alt="Saved Graph" />
                  </div>
                  <button onClick={() => handleDeleteSavedImage(graph.id)} className="text-4xl">
                    <IoTrashBinSharp />
                  </button>
                </div>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
