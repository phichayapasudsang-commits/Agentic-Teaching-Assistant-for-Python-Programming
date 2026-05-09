import React, { useState } from 'react';
import { useLearningStore } from '../../store/useLearningStore';

export const WelcomeHero = () => {
  const [input, setInput] = useState('');
  const setTopic = useLearningStore((state) => state.setTopic);

  const handleSubmit = () => {
    if (input.trim()) setTopic(input);
  };

  const chips = ['Lists', 'Loops', 'Decorators', 'Dunder Methods', 'AsyncIO'];

  return (
    <div className="w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>
      
      <section className="max-w-3xl w-full px-gutter z-10 text-center">
        <div className="mb-xl">
          <h2 className="font-h1 text-h1 text-on-surface mb-md">What Python topic are you struggling with today?</h2>
          <p className="text-on-surface-variant font-body-md max-w-xl mx-auto">PyGuide uses real-time code analysis to help you bridge the gap between concept and syntax.</p>
        </div>

        <div className="glass-panel p-md rounded-xl input-glow group transition-all duration-300 mb-lg text-left">
          <div className="flex items-start gap-md">
            <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors mt-1">terminal</span>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSubmit())}
              className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline font-code-block resize-none h-32 outline-none" 
              placeholder="e.g. 'I'm trying to understand how list comprehensions work with nested loops...'"
            />
          </div>
          <div className="flex justify-between items-center mt-md pt-md border-t border-white/5">
            <p className="font-label-caps text-label-caps text-outline">Press Enter to submit</p>
            <button 
              onClick={handleSubmit}
              className="bg-primary-container hover:bg-primary-container/80 text-on-primary-container px-lg py-sm rounded font-bold font-label-caps text-label-caps flex items-center gap-xs transition-colors active:scale-95 duration-75 shadow-lg"
            >
              Analyze <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-sm">
          {chips.map(chip => (
            <button 
              key={chip}
              onClick={() => setTopic(chip)}
              className="px-md py-xs bg-surface-container hover:bg-surface-container-high border border-white/10 rounded-full text-on-surface-variant font-label-caps text-label-caps transition-all hover:text-primary hover:border-primary/30"
            >
              {chip}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};