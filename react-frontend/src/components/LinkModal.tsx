import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Link2, Loader2, AlertCircle } from 'lucide-react';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProcess: (url: string) => Promise<void>;
  initialUrl?: string;
  isProcessing: boolean;
  error?: string | null;
}

export default function LinkModal({ isOpen, onClose, onProcess, initialUrl = "", isProcessing, error }: LinkModalProps) {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    if (initialUrl && isOpen) {
      setUrl(initialUrl);
    }
  }, [initialUrl, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onProcess(url.trim());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl z-[101] p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-200">
              <div className="px-6 py-4 flex justify-between items-center border-b border-zinc-100 bg-zinc-50/50">
                <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
                  <Link2 size={18} className="text-indigo-600" />
                  Analyze a Web Page
                </h2>
                <button 
                  onClick={onClose}
                  className="p-1.5 hover:bg-zinc-200 rounded-full text-zinc-500 transition-colors"
                  disabled={isProcessing}
                >
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <p className="text-sm text-zinc-600 mb-4">
                  Paste any public article, documentation page, or text-heavy URL below to begin chatting with its contents.
                </p>
                
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <Link2 size={20} />
                  </div>
                  <input 
                    type="url" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/long-article" 
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-inner disabled:opacity-50"
                    disabled={isProcessing}
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-rose-600 flex items-start gap-2 p-3 mb-4 rounded-xl bg-rose-50 border border-rose-100">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className="flex justify-end gap-3 pt-2 mt-4 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all"
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!url.trim() || isProcessing}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-300 disabled:text-zinc-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm active:scale-95"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Start Conversation'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
