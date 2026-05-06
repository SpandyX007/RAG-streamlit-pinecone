import React, { useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { Send, Bot, User, Loader2, Sparkles, LogOut, ArrowLeft, MoreVertical, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { Message } from '../types';

interface ChatInterfaceProps {
  currentLink: string;
  messages: Message[];
  isSending: boolean;
  messageInput: string;
  onMessageInputChange: (val: string) => void;
  onSendMessage: () => void;
  onEndSession: () => void;
}

export default function ChatInterface({
  currentLink,
  messages,
  isSending,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  onEndSession
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim() || isSending) return;
    onSendMessage();
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white overflow-hidden relative">
      
      {/* Small Header */}
      <header className="h-16 shrink-0 border-b border-zinc-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onEndSession}
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <div className="h-8 w-px bg-zinc-200 mx-2" />
          
          <div className="flex items-center max-w-[200px] sm:max-w-sm overflow-hidden">
            <div className="shrink-0 h-8 w-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mr-3">
              <Bot size={16} className="text-zinc-600" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-zinc-900 truncate">LinkWhisper</span>
              <span className="text-[11px] font-medium text-emerald-600 truncate flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Reading: {(() => {
                  try {
                    return new URL(currentLink).hostname;
                  } catch (e) {
                    return "URL";
                  }
                })()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 rounded-full transition-colors hidden sm:block">
            <Settings size={18} />
          </button>
          <button 
            onClick={onEndSession}
            title="End Session"
            className="bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            <LogOut size={14} className="hidden sm:block" />
            Clear
          </button>
          <button className="p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 rounded-full transition-colors sm:hidden">
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto w-full flex justify-center bg-zinc-50 relative scroll-smooth">
        <div className="w-full max-w-4xl min-h-full pb-6">
                
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center py-20 px-4 text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 max-w-md w-full"
              >
                <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                  <Sparkles size={32} />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 mb-2">Ready to assist</h2>
                <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                  I've processed the contents of <span className="font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-4">{currentLink}</span>. What would you like to know?
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <button 
                    onClick={() => onMessageInputChange("What is the main topic of this page?")}
                    className="p-3 text-left w-full border border-zinc-200 hover:border-indigo-300 hover:bg-indigo-50/50 rounded-xl transition-colors text-zinc-600 font-medium"
                  >
                    "What is the main topic of this page?"
                  </button>
                  <button 
                    onClick={() => onMessageInputChange("Summarize the key points.")}
                    className="p-3 text-left w-full border border-zinc-200 hover:border-indigo-300 hover:bg-indigo-50/50 rounded-xl transition-colors text-zinc-600 font-medium"
                  >
                    "Summarize the key points."
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="px-4 py-8 space-y-6 sm:px-6 w-full">
              {messages.map((message) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={message.id} 
                  className={cn(
                    "flex w-full gap-3 sm:gap-4 max-w-3xl",
                    message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center shadow-sm",
                    message.role === 'user' 
                      ? "bg-zinc-800 text-white" 
                      : "bg-white border border-zinc-200 text-indigo-600"
                  )}>
                    {message.role === 'user' ? <User size={16} /> : <Bot size={18} />}
                  </div>
                  
                  <div className={cn(
                    "px-4 py-3 sm:px-5 sm:py-4 rounded-2xl max-w-[85%] sm:max-w-[80%] text-[15px] sm:text-base leading-relaxed shadow-sm ring-1 ring-black/5",
                    message.role === 'user' 
                      ? "bg-zinc-900 text-white rounded-tr-[4px]" 
                      : "bg-white text-zinc-800 rounded-tl-[4px]"
                  )}>
                    {message.role === 'user' ? (
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    ) : (
                      <div className="markdown-body">
                        <Markdown>{message.content}</Markdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isSending && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex w-full gap-3 sm:gap-4 max-w-3xl mr-auto flex-row"
                >
                  <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 bg-white border border-zinc-200 rounded-full flex items-center justify-center shadow-sm text-indigo-600">
                    <Bot size={18} />
                  </div>
                  <div className="px-5 py-4 rounded-2xl rounded-tl-[4px] bg-white text-zinc-500 text-sm shadow-sm flex items-center gap-2 ring-1 ring-black/5">
                    <Loader2 size={16} className="animate-spin text-indigo-500" />
                    Analyzing content...
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-zinc-50 pb-4 pt-4 px-4 sm:px-6 shrink-0 z-10 border-t border-zinc-200/50">
        <form 
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto relative flex items-end gap-2 bg-white p-2 rounded-3xl shadow-sm border border-zinc-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition-all font-sans"
        >
          <textarea
            value={messageInput}
            onChange={(e) => onMessageInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Ask a question about the content..."
            className="flex-1 bg-transparent border-0 px-4 py-3 focus:ring-0 focus:outline-none min-h-[48px] max-h-40 text-[15px] sm:text-base resize-none"
            rows={1}
            disabled={isSending}
          />
          <div className="pb-1.5 pr-1.5 shrink-0">
            <button 
              type="submit"
              disabled={!messageInput.trim() || isSending}
              className="h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-200 disabled:text-zinc-400 text-white shadow-md transition-all active:scale-95"
            >
              <Send size={18} className={cn("translate-x-[-1px] translate-y-[1px]", !messageInput.trim() && "opacity-50")} />
            </button>
          </div>
        </form>
        <div className="text-center mt-3 max-w-3xl mx-auto">
          <p className="text-[11px] text-zinc-400 font-medium">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
