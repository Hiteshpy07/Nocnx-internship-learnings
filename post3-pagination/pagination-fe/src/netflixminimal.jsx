import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import img from './DuCs6OeXgAElz4V.jpg';

export default function NetflixMinimal() {
  const [infiniteMovies, setInfiniteMovies] = useState([]);
  const [infinitePage, setInfinitePage] = useState(1);
  const [infiniteHasMore, setInfiniteHasMore] = useState(true);
  const [infiniteDataBytes, setInfiniteDataBytes] = useState(0);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);

  const bottomObserverRef = useRef(null);

  // Core Data Fetch Routine
  const handleInfiniteFetch = async () => {
    if (isInfiniteLoading || !infiniteHasMore) return;
    
    setIsInfiniteLoading(true);
    const API_KEY = "bbc0cf70"; // Your active OMDb key
    
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=space&type=movie&page=${infinitePage}`);
      
      const size = res.headers.get('content-length');
      if (size) {
        setInfiniteDataBytes(prev => prev + parseInt(size, 10));
      }

      const data = await res.json();
      
      if (data.Search && data.Search.length > 0) {
        setInfiniteMovies(prev => [...prev, ...data.Search]);
        setInfinitePage(prev => prev + 1);
      } else {
        setInfiniteHasMore(false);
      }
    } catch (err) {
      console.error("Infinite stream connection dropped:", err);
    } finally {
      setIsInfiniteLoading(false);
    }
  };

  // Wire up Intersection Observer Hook
  useEffect(() => {
    if (!infiniteHasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("🎯 Bottom anchor in view! Streaming next page segment...");
          handleInfiniteFetch();
        }
      },
      {
        // Fixed: Target container ID now matches the element ID in JSX exactly
        root: document.getElementById('infinite-scroll-container'), 
        threshold: 0.1 
      }
    );

    const currentTarget = bottomObserverRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [infinitePage, infiniteHasMore, isInfiniteLoading]);

  // Format bytes helper
  const toMB = (bytes) => (bytes / (1024 * 1024)).toFixed(3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <div className='h-10 flex gap-2 justify-center text-white font-bold text-lg'>part2</div>
      
      {/* 🧭 Minimal Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/60 sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="text-red-600 font-black text-2xl tracking-tighter cursor-pointer select-none">
            NETFLIX
          </span>
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-400">
            <span className="text-slate-100 cursor-pointer transition-colors">Home</span>
            <span className="hover:text-slate-100 cursor-pointer transition-colors">TV Shows</span>
            <span className="hover:text-slate-100 cursor-pointer transition-colors">Movies</span>
          </div>
        </div>
        
        <div className="w-10 h-10 rounded bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-700 shadow cursor-pointer overflow-hidden" >
          <img src={img} alt="User Profile" className="w-full h-full object-cover" />
        </div>
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

        {/* Responsive Grid Shell Layout */}
        <div className="flex flex-col bg-slate-950 rounded-xl overflow-hidden border border-slate-900 p-4">
          <div className="mb-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800/60 flex justify-between items-center">
            <h3 className="text-xs font-bold tracking-wider text-emerald-400 uppercase">Netflix Streamer</h3>
            <p className="text-[10px] text-slate-500 font-mono font-bold">On-Demand Cost: {toMB(infiniteDataBytes)} MB</p>
          </div>

          {/* Clean Scrolling Grid for Infinite Cards */}
          <div 
            id="infinite-scroll-container" 
            className="overflow-y-auto max-h-[70vh] pr-1 grid grid-cols-2 lg:grid-cols-3 gap-4 content-start"
          >
            {infiniteMovies.map((card, idx) => (
              <div 
                key={`${card.imdbID}-${idx}`} 
                className="group bg-slate-900 border border-slate-800/80 rounded-lg overflow-hidden shadow-md hover:border-slate-700 transition-all cursor-pointer flex flex-col h-fit"
              >
                <div className="aspect-[2/3] bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-800 flex items-center justify-center p-4">
                  <img src={card.Poster} alt={card.Title} className="w-full h-full object-cover rounded" />
                </div>
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
            
            {/* 🎯 Target Viewport Anchor Block */}
            <div 
              ref={bottomObserverRef} 
              className="col-span-2 lg:col-span-3 h-14 flex items-center justify-center text-xs font-mono text-slate-500 font-bold pt-2"
            >
              {infiniteHasMore ? (
                <span className="animate-pulse flex items-center gap-1.5 text-slate-600 text-[10px]">
                  ⏳ Observer scanning viewport window...
                </span>
              ) : (
                <span className="text-emerald-500 text-[10px] bg-emerald-950/30 border border-emerald-900/40 px-3 py-1 rounded-full">
                  🏁 Content pipeline completely drained.
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}