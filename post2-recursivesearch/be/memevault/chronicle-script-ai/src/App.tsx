/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  History, 
  Image as ImageIcon, 
  Type as TypeIcon, 
  Copy, 
  CheckCircle2, 
  ChevronRight, 
  Loader2,
  RefreshCw,
  Clock,
  ExternalLink
} from 'lucide-react';
import { HistoricalScriptService, ScriptResponse } from './services/geminiService';

// Initialize Gemini Service
const scriptService = new HistoricalScriptService(process.env.GEMINI_API_KEY || '');

export default function App() {
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<ScriptResponse | null>(null);
  const [copying, setCopying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateScript = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await scriptService.generateScript();
      setScript(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate script. Please ensure your API key is correctly configured.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!script) return;
    navigator.clipboard.writeText(JSON.stringify(script, null, 2));
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1a1a1a] font-sans selection:bg-[#EEDDCC]">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5">
        <History className="absolute -top-20 -left-20 w-80 h-80 rotate-12" />
        <Clock className="absolute top-1/2 -right-20 w-64 h-64 -rotate-12" />
      </div>

      <main className="relative max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* Header Section */}
        <header className="mb-16 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-[#1a1a1a1a] rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3 h-3 text-[#B45309]" />
              AI Storytelling Engine
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-light leading-none tracking-tight mb-6">
              Chronicle<span className="italic">Script</span>
            </h1>
            <p className="text-lg md:text-xl text-[#5A5A40] max-w-2xl mx-auto font-serif italic">
              Transforming historical fragments into cinematic short-form scripts. Optimized for 30-second vertical formats.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8"
          >
            {!script && !loading && (
              <button
                onClick={generateScript}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white rounded-full text-lg font-medium hover:bg-[#2a2a2a] transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
              >
                Assemble New Chronicle
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            
            {loading && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#B45309]" />
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-[#8E9299] animate-pulse">
                  Querying the archives...
                </p>
              </div>
            )}

            {error && (
              <div className="text-red-500 bg-red-50 px-4 py-2 rounded-lg border border-red-100 text-sm mt-4 inline-block">
                {error}
              </div>
            )}
          </motion.div>
        </header>

        {/* Script Display */}
        <AnimatePresence mode="wait">
          {script && !loading && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-[#1a1a1a1a] pb-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={generateScript}
                    className="p-2 hover:bg-white rounded-full transition-colors text-[#5A5A40]"
                    title="Regenerate"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <h2 className="text-2xl font-serif italic text-[#5A5A40]">{script.title}</h2>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-[#1a1a1a1a] rounded-full text-sm font-medium hover:shadow-md transition-all active:scale-95"
                >
                  {copying ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Copied JSON
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy JSON
                    </>
                  )}
                </button>
              </div>

              {/* Hook Section */}
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-[#1a1a1a1a] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Sparkles className="w-12 h-12" />
                </div>
                <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#8E9299] mb-2 block">
                  The Hook
                </label>
                <p className="text-2xl md:text-3xl font-serif text-[#B45309] leading-tight">
                  "{script.hook}"
                </p>
              </div>

              {/* Scenes Grid */}
              <div className="grid gap-6">
                {script.scenes.map((scene, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden border border-[#1a1a1a1a] hover:border-[#B4530944] transition-colors shadow-sm"
                  >
                    <div className="md:w-16 bg-[#1a1a1a] text-white flex items-center justify-center font-mono text-xl py-4 md:py-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 grid md:grid-cols-2">
                      <div className="p-6 border-b md:border-b-0 md:border-r border-[#1a1a1a0a]">
                        <div className="flex items-center gap-2 mb-3 text-[#B45309]">
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-[10px] tracking-widest uppercase font-bold">Image Prompt</span>
                        </div>
                        <p className="text-sm leading-relaxed text-[#5A5A40]">
                          {scene.imagePrompt}
                        </p>
                      </div>
                      <div className="p-6 bg-[#F9F7F4]">
                        <div className="flex items-center gap-2 mb-3 text-[#1a1a1a]">
                          <TypeIcon className="w-4 h-4" />
                          <span className="text-[10px] tracking-widest uppercase font-bold">Content Text</span>
                        </div>
                        <p className="text-base font-medium font-serif italic text-[#1a1a1a]">
                          {scene.contentText}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer CTA */}
              <footer className="pt-12 text-center border-t border-[#1a1a1a1a]">
                <p className="text-xs text-[#8E9299] mb-4 flex items-center justify-center gap-2 uppercase tracking-widest">
                  Ready for Production <ExternalLink className="w-3 h-3" />
                </p>
                <div className="flex justify-center gap-4">
                   <button 
                    onClick={() => setScript(null)}
                    className="text-sm font-medium underline underline-offset-4 hover:text-[#B45309] transition-colors"
                   >
                    Clear and start over
                   </button>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Styled Inline CSS for specific font imports */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono&display=swap');
        
        :root {
          --f-sans: 'Inter', sans-serif;
          --f-serif: 'Playfair Display', serif;
          --f-mono: 'JetBrains Mono', monospace;
        }

        body {
          font-family: var(--f-sans);
        }

        .font-serif {
          font-family: var(--f-serif);
        }

        .font-mono {
          font-family: var(--f-mono);
        }
      `}} />
    </div>
  );
}
