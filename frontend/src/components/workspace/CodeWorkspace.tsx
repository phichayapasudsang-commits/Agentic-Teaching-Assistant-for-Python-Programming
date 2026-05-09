import React from 'react';
import Editor from '@monaco-editor/react';
import { useLearningStore } from '../../store/useLearningStore';

export const CodeWorkspace = () => {
  const { code, updateCode, runCode, terminalOutput, isLoading } = useLearningStore();

  return (
    <>
      <section className="glass-panel rounded-xl flex flex-col flex-1 overflow-hidden border-l-2 border-primary">
        <div className="bg-surface-container-highest px-4 py-2 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-secondary">terminal</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">main.py</span>
          </div>
          <button className="flex items-center gap-1 px-2 py-1 hover:bg-white/5 rounded transition-colors group">
            <span className="material-symbols-outlined text-xs text-outline group-hover:text-primary">content_copy</span>
            <span className="font-label-caps text-[10px] text-outline group-hover:text-primary">Copy</span>
          </button>
        </div>
        
        {/* Editor Area */}
        <div className="flex-1 bg-surface-container-lowest pt-4">
          <Editor
            height="100%"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={updateCode}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'JetBrains Mono',
            }}
          />
        </div>

        <div className="p-3 bg-surface-container-high border-t border-white/10 flex items-center justify-end gap-3">
          <button className="bg-transparent border border-secondary text-secondary font-label-caps text-label-caps px-4 py-2.5 rounded hover:bg-secondary/10 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">history</span> Submit for Feedback
          </button>
          <button 
            onClick={runCode}
            disabled={isLoading}
            className="bg-primary-container text-white font-h2 text-sm px-6 py-2.5 rounded hover:bg-primary transition-all flex items-center gap-2 shadow-lg shadow-primary/10 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span> Run Code
          </button>
        </div>
      </section>

      {/* Terminal Output */}
      <section className="glass-panel rounded-xl h-32 md:h-40 flex flex-col overflow-hidden bg-surface-container-lowest/50">
        <div className="bg-surface-container-highest px-4 py-1.5 flex items-center gap-2 border-b border-white/10">
          <span className="material-symbols-outlined text-xs text-outline">terminal</span>
          <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-tighter">Terminal Output</span>
        </div>
        <div className="flex-1 p-3 font-code-block text-[13px] text-on-surface-variant overflow-y-auto whitespace-pre-wrap">
          <div className="flex gap-2">
            <span className="text-tertiary">➜</span>
            <span>python3 main.py</span>
          </div>
          <div className="text-on-surface">{terminalOutput || 'Ready...'}</div>
        </div>
      </section>
    </>
  );
};