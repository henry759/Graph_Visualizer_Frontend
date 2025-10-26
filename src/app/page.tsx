"use client";
import { LuSquareMenu } from "react-icons/lu";
import { IoTrashBinSharp } from "react-icons/io5";

import GetValues from "@/components/GetValues";
import { useEffect, useState } from "react";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type SavedOne = {
  id: string;
  image_url: string;
}

export default function Home() {
  const [savedOnes, setSavedOnes] = useState<SavedOne[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);


  useEffect(() => {
    let storedId = localStorage.getItem("user_id");
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("user_id", storedId);
    }
    setUserId(storedId);
  }, []);

  useEffect(() => {
    if (!userId) return;
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
  }, [userId])

  console.log(savedOnes);

  const handleDeleteSavedImage = async (id: string) => {
    if (!userId) return;
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
        <div className="px-4 py-5 border-[1px] border-slate-900 _backdrop-blur-[14px] _bg-cyan-300/40 bg-black/50 rounded-2xl shadow-2xl shadow-black/70">
          <h1 className="_font-main text-5xl md:text-5xl xl:text-6xl 2xl:text-7xl w-full _text-cyan-300 font-bold block mx-auto text-center mt-0 mb-0 bg-clip-text bg-gradient-to-t from-blue-500 to-rose-500 text-transparent">Graph Visualizer</h1>
        </div>
        <GetValues userId={userId} savedOnes={savedOnes} setSavedOnes={setSavedOnes} />
        {/* Saved Graphs */}
        <button onClick={() => setIsMenuOpen(prev => !prev)} className="absolute bg-white/80 _invert top-[1rem] right-[1rem] px-7 py-7 z-20 text-black _bg-black/30 _backdrop-blur-sm rounded-2xl _mix-blend-lighten overflow-hidden _text-white">
          <LuSquareMenu />
        </button>
        {/* Menu */}
        <div style={isMenuOpen ? { right: 0 } : { right: "100%" }} className="border-2 border-slate-300/20 rounded-l-xl fixed top-0 right-0 bg-black/85 w-2/3 xl:w-1/2 h-screen overflow-scroll flex flex-col px-10 py-8 z-10">
          <h1 className="w-full block text-center _font-main text-2xl mb-10 md:text-4xl xl:5xl">
            Saves
            <hr />
          </h1>
          <ul className="saves_wrapper gap-y-5 xl:gap-y-10">
            {loading ? <h1 className="text-white text-4xl">Loading...</h1> :
              savedOnes.map((graph) => (
                <div key={graph.id} className="w-full h-auto _aspect-video">
                  <div className="w-full aspect-video _h-[5rem] _xl:h-[10rem] relative rounded-lg xl:rounded-2xl border-2 border-slate-600">
                    <Image className="w-full h-full" fill={true} src={graph.image_url} alt="Saved Graph" />
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
