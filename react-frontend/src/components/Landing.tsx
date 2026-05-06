import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, BookOpen, Code2, LineChart, Cpu, Search, CheckCircle2 } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
  onTrySample: (url: string) => void;
}

const COLLAGE_IMAGES = [
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
];

const SAMPLE_SITES = [
  {
    name: "Wikipedia",
    desc: "Dive deep into any historical article.",
    icon: <BookOpen className="text-zinc-500" size={24} />,
    url: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation"
  },
  {
    name: "React Docs",
    desc: "Chat with the new React 19 features.",
    icon: <Code2 className="text-sky-500" size={24} />,
    url: "https://react.dev/blog/2024/12/05/react-19"
  },
  {
    name: "Financial Returns",
    desc: "Analyze quarterly earnings reports.",
    icon: <LineChart className="text-emerald-500" size={24} />,
    url: "https://investor.apple.com/investor-relations/default.aspx"
  },
  {
    name: "AI Research",
    desc: "Extract info from ML papers.",
    icon: <Cpu className="text-indigo-500" size={24} />,
    url: "https://arxiv.org/abs/1706.03762"
  }
];

export default function Landing({ onGetStarted, onTrySample }: LandingProps) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col relative overflow-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-zinc-900">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Sparkles size={18} className="text-indigo-50" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">LinkWhisper</h1>
          </div>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-zinc-500">
            <button className="hover:text-zinc-900 transition-colors">Features</button>
            <button className="hover:text-zinc-900 transition-colors">Use Cases</button>
            <button className="hover:text-zinc-900 transition-colors">Pricing</button>
          </div>
          <div className="flex gap-4 items-center">
            <button className="hidden md:block text-sm font-medium text-zinc-600 hover:text-zinc-900">Sign In</button>
            <button 
              onClick={onGetStarted}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-sm active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex-1 flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Collage Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-white/90 z-10 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-zinc-50 z-20" />
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 opacity-30 transform -rotate-2 scale-105"
          >
            {COLLAGE_IMAGES.map((src, i) => (
              <img 
                key={i} 
                src={src} 
                alt="Background" 
                className="w-full h-full object-cover rounded-3xl"
              />
            ))}
          </motion.div>
        </div>

        <div className="relative z-30 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-8 uppercase tracking-wider"
          >
            <Sparkles size={14} />
            Powered by Gemini RAG
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-6"
          >
            Converse with <br className="hidden md:block"/> any web page.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-600 max-w-2xl text-center mb-10 leading-relaxed"
          >
            Turn long articles, documentation, or news into interactive conversations. Paste a link and let LinkWhisper find the answers you need in seconds.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={onGetStarted}
              className="group mx-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-lg font-medium transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
            >
              <Search size={20} />
              Start Exploring
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-30 py-12 bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-100">
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <h3 className="text-4xl font-bold text-zinc-900 mb-2">1M+</h3>
            <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Pages Analyzed</p>
          </div>
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <h3 className="text-4xl font-bold text-zinc-900 mb-2">99.9%</h3>
            <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Answer Accuracy</p>
          </div>
          <div className="flex flex-col items-center pt-8 md:pt-0">
            <h3 className="text-4xl font-bold text-zinc-900 mb-2">10hrs</h3>
            <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Saved per Week</p>
          </div>
        </div>
      </section>

      {/* Suggestions Section */}
      <section className="relative z-30 py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Not sure where to start?</h2>
            <p className="text-zinc-600">Try conversing with these popular resources right away.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_SITES.map((site, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-zinc-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all group flex flex-col cursor-pointer"
                onClick={() => onTrySample(site.url)}
              >
                <div className="h-12 w-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {site.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">{site.name}</h3>
                <p className="text-zinc-500 text-sm mb-6 flex-1 leading-relaxed">{site.desc}</p>
                <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Chat now <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="relative z-30 py-24 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-6">How it works</h2>
            <div className="space-y-8">
              {[
                { title: 'Paste a link', desc: 'Securely extract texts from any public URL using our advanced scrapers.' },
                { title: 'Vectorized Processing', desc: 'Content is split into chunks, embedded, and stored in an isolated Pinecone namespace dynamically.' },
                { title: 'Deep Conversational Context', desc: 'Query using natural language. The Gemini LLM cites specific context to give rigorous answers.' }
              ].map((feat, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <CheckCircle2 className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 mb-1">{feat.title}</h4>
                    <p className="text-zinc-600 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-zinc-100 rounded-[2rem] p-8 md:p-12 border border-zinc-200 shadow-inner">
            <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden flex flex-col h-96">
              <div className="h-12 bg-zinc-50 border-b border-zinc-200 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="w-full max-w-sm mx-auto bg-zinc-200 rounded-md h-6 flex items-center px-3">
                  <span className="text-[10px] text-zinc-500 font-mono">https://docs.example.com</span>
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col gap-4 bg-zinc-50/50">
                <div className="w-3/4 bg-white border border-zinc-200 p-4 rounded-2xl rounded-tl-sm text-sm text-zinc-700 shadow-sm leading-relaxed self-start">
                  Based on the documentation, how do I configure WebSockets?
                </div>
                <div className="w-5/6 bg-indigo-600 p-4 rounded-2xl rounded-br-sm text-sm text-indigo-50 shadow-sm leading-relaxed self-end">
                  To configure WebSockets, you need to set `ws: true` in your server configuration block and explicitly pass the port to the listener...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white/90">
            <Sparkles size={16} className="text-indigo-400" />
            <span className="font-bold text-lg">LinkWhisper</span>
          </div>
          <div className="flex gap-6 text-sm text-white/50">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Contact</button>
          </div>
          <p className="text-white/30 text-sm">© {(new Date()).getFullYear()} LinkWhisper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
