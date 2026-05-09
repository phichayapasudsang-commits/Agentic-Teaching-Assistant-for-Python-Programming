import React, { useState } from 'react';
import { useLearningStore } from '../../store/useLearningStore';

export const ChatPanel = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useLearningStore();

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <section className="glass-panel rounded-xl p-panel-padding flex flex-col flex-1 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-secondary">forum</span>
        <h2 className="font-h2 text-sm text-on-surface uppercase tracking-widest">Socratic Assistant</h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 flex flex-col">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : ''}`}>
            <div className={`p-3 rounded-xl text-sm font-body-md max-w-[90%] ${
              msg.role === 'assistant' 
                ? 'bg-surface-container-highest rounded-tl-none border border-white/5' 
                : 'bg-primary/20 rounded-tr-none border border-primary/20'
            }`}>
              {msg.content}
            </div>
            <span className={`text-[10px] text-outline ${msg.role === 'user' ? 'mr-1' : 'ml-1'}`}>
              {msg.role === 'user' ? 'You' : 'PyGuide Assistant'} • {msg.time}
            </span>
          </div>
        ))}
      </div>
      <div className="relative">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          disabled={isLoading}
          className="w-full bg-surface-dim border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all text-white disabled:opacity-50" 
          placeholder="Ask for a hint..." 
          type="text"
        />
        <button disabled={isLoading} onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary hover:scale-110 transition-transform disabled:opacity-50">send</button>
      </div>
    </section>
  );
};