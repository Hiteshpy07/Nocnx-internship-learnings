import React, { use,useEffect, useState } from 'react';
import axios from 'axios';
import img from './DuCs6OeXgAElz4V.jpg'

export default function Netflixloadbulk() {
  // Mock array for layout placement (12 simple items)
  

  const [data, setData] = useState([]);
  const [bulkdata, setbulkData] = useState([]);

   useEffect(() => {
    axios.get("http://localhost:8000/movies/bulk")
      .then(response => {
        setbulkData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching bulk data from server:', error);
      });
   }, []);

//    const placeholderCards = Array.from({ length: 12 }, (_, i) => ({
//     id: i + 1,
//     title: data ? data.Title : `Movie Title ${i + 1}`,
//     poster: data ? data.Poster : `https://via.placeholder.com/300x450?text=Poster+${i + 1}`,
    
//   }));

   console.log("Data in component state:", data);
   console.log(typeof data);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* 🧭 Minimal Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/60 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <span className="text-red-600 font-black text-2xl tracking-tighter cursor-pointer select-none">
            NETFLIX
          </span>
          {/* Simple Navigation Links */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-400">
            <span className="text-slate-100 cursor-pointer transition-colors">Home</span>
            <span className="hover:text-slate-100 cursor-pointer transition-colors">TV Shows</span>
            <span className="hover:text-slate-100 cursor-pointer transition-colors">Movies</span>
          </div>
        </div>
        
        {/* User Profile Frame Placement */}
        <div className="w-10     h-10    rounded bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-700 shadow cursor-pointer" >
        <img src={img} alt="User Profile" className="w-10 h-10    border border-slate-700 shadow cursor-pointer" /></div>
      </nav>

      {/* 🎬 Hero Spot Frame */}
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-16 md:py-24 border-b border-slate-900">
        <div className="max-w-2xl">
          <span className="text-red-500 text-xs font-bold tracking-widest uppercase">NETFLIX ORIGINAL</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-100 mt-2">
            THE LAST PAGINATION
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
            An unoptimized database query threatens to crash the production server. One engineer stands between a clean merge request and total thread pool collapse.
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="bg-white hover:bg-slate-200 text-slate-950 font-bold px-5 py-2 rounded text-xs transition-all shadow">
              ▶ Play Stream
            </button>
            <button className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-2 rounded text-xs border border-slate-700/50 transition-all">
              ℹ More Info
            </button>
          </div>
        </div>
      </div>

      {/* 🖼️ Grid Canvas Layer */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="mb-4">
          <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
            Your Content Queue
          </h3>
        </div>

        {/* Responsive Grid Structure */}
        <div className="grid grid-cols-2  lg:grid-cols-3 gap-4">
          {bulkdata.map((card) => (
            <div 
              key={card.id} 
              className="group bg-slate-900 border border-slate-800/80 rounded-lg overflow-hidden shadow-md hover:border-slate-700 transition-all cursor-pointer flex flex-col"
            >
              {/* Asset Poster Shell */}
              <div className="aspect-[2/3] bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-800 flex items-center justify-center p-4">
                <img src={card.Poster} alt={card.title} className="w-full h-full object-cover rounded" />
              </div>
              
              {/* Details Pane */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h4 className="font-bold text-xs text-slate-200 line-clamp-1 group-hover:text-red-500 transition-colors">
                  {card.Title}
                </h4>
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                  {card.Year} | {card.Type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
}