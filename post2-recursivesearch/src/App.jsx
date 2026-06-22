import React, { useState } from 'react';
import noimg from './hero-image.fill.size_1200x675.v1626877109.webp'
import yesimg from './B2YarLBCMAM21TP.jpg'
export default function MemeSearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [finishedsearch,setfinishedsearch]=useState(false);
  
  const [normieTime, setNormieTime] = useState(null);
  const [chadTime, setChadTime] = useState(null);
  const [percentFaster, setPercentFaster] = useState(null);

  const handleSearch = async () => {
    console.log("Initiating search for:", keyword);
    setIsSearching(true);
    try {
      const normieResponse = await fetch('http://localhost:3000/api/search/normie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: keyword })
      });
      const normieData = await normieResponse.json();

      const chadResponse = await fetch('http://localhost:3000/api/search/chad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ keyword: 'cat' })
        body: JSON.stringify({ keyword: keyword })
      });
      const chadData = await chadResponse.json();

      // 3. Process Execution Deltas
      const nTime = parseFloat(normieData.time);
      const gTime = parseFloat(chadData.time);
      const diff = (((nTime - gTime) / nTime) * 100).toFixed(1);

      // Render calculations directly onto layout containers
      setResults(chadData.results);
      setNormieTime(nTime);
      setChadTime(gTime);
      setPercentFaster(diff > 0 ? diff : 0);

    } catch (err) {
      console.error("Backend offline or connection dropped.", err);
    } finally {
      setIsSearching(false);
      setfinishedsearch(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center font-sans">
      <div className="max-w-4xl w-full">
        
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            THE PRODUCTION level recursive search
          </h1>
          {/* <p className="text-slate-400 text-sm mt-2">
            Live Full-Stack Benchmark: Parallel Streams vs. Blocking Disk I/O
          </p> */}
        </header>

        <div className="flex gap-3 mb-8 bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            // placeholder="🔍 Ask backend to hunt files (try: 'cat', 'pointer', 'developer')..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 text-sm"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-gradient-to-r from-blue-500 to-emerald-500 text-slate-950 font-bold px-6 py-2 rounded-lg text-sm disabled:opacity-50"
          >
            {isSearching ? 'Querying Kernel...' : 'Fire Backend API'}
          </button>
        </div>

        {/* Side-by-Side Live Performance Layout Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          
          {/* Card A: Slow Blocking Sync Loop */}
          <div className="bg-slate-900 border border-red-900/50 rounded-xl p-5 shadow-lg relative">
            <div className="absolute top-0 right-0 bg-red-900/20 text-red-400 px-3 py-1 text-xs font-mono rounded-bl-lg">
              🤡 Normie Search
            </div>
            <h2 className="text-lg font-bold text-red-400 mb-1">Normie loop search</h2>
            <p className="text-[11px] text-slate-400 mb-4 font-mono">⚠️seaching keyword+ if directory-searching one by one</p>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono">
              <p className="text-slate-500 text-xs">Server Compute Time:</p>
              <p className="text-2xl font-bold text-red-500 mt-1">
                {normieTime ? `${normieTime} ms` : '--'}
                {finishedsearch ? (
  <span><img src={noimg} alt="Search Finished" className="w-60 h-60" /></span>
) : (
  ""
)}
              </p>
            </div>
          </div>

          {/* Card B: Optimized Parallel Streams Pipeline */}
          <div className="bg-slate-900 border border-emerald-900/50 rounded-xl p-5 shadow-lg relative">
            <div className="absolute top-0 right-0 bg-emerald-900/20 text-emerald-400 px-3 py-1 text-xs font-mono rounded-bl-lg">
              😎 Gigachad Search
            </div>
            <h2 className="text-lg font-bold text-emerald-400 mb-1">Chad Pipeline</h2>
            <p className="text-[11px] text-slate-400 mb-4 font-mono">⚡ passind stats:file or folder + Promise.all Streams</p>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono">
              <p className="text-slate-500 text-xs">Server Compute Time:</p>
              <p className="text-2xl font-bold text-emerald-500 mt-1">
                {chadTime ? `${chadTime} ms` : '--'}
                {finishedsearch ? (
  <span><img src={yesimg} alt="Search Finished" className="w-60 h-60" /></span>
) : (
  ""
)}
                
              </p>
            </div>
          </div>

        </div>

        {/* Real-time Math Performance Shield Container */}
        {percentFaster > 0 && (
          <div className="bg-gradient-to-r from-blue-950 to-emerald-950 border border-emerald-500/30 rounded-xl p-4 text-center mb-8 shadow-md">
            <p className="text-sm font-semibold text-emerald-300">
              🚀 new CHAD LEVEL optimizED BY <span className="text-xl font-extrabold text-white underline mx-1">{percentFaster}%</span>! my PR will be merged now...
            </p>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Live Indexed Server seaches({results.length})</h3>
          {results.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {results.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800 font-mono text-xs">
                  <span className="text-slate-300">📄 {item.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.type === 'folder' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 font-mono italic">No indexed currently matched.</p>
          )}
        </div>

      </div>
    </div>
  );
}