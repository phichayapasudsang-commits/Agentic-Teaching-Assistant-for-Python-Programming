import React from 'react';
import { useLearningStore } from '../../store/useLearningStore';

export const Sidebar = () => {
  const currentTopic = useLearningStore(state => state.currentTopic);

  return (
    <aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-72 flex-col p-panel-padding z-40 bg-surface-container-high/95 backdrop-blur-md border-r border-white/10 shadow-xl overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center border border-white/10">
            <span className="material-symbols-outlined text-primary">terminal</span>
          </div>
          <div>
            <h3 className="font-h2 text-lg text-primary">Python Learner</h3>
            <p className="font-label-caps text-[10px] text-on-surface-variant">Level 5 • 85% Complete</p>
          </div>
        </div>
        <div className="bg-surface-dim p-3 rounded-lg border border-white/5 mt-4">
          <p className="font-label-caps text-on-surface-variant text-[10px] mb-2 uppercase">Current Milestone</p>
          <p className="font-body-md text-sm text-on-surface font-medium">{currentTopic || 'None'}</p>
          <div className="w-full bg-surface-container-lowest h-1.5 rounded-full mt-2">
            <div className="bg-tertiary h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>
      
      <nav className="space-y-1">
        <div className="flex items-center gap-3 px-4 py-3 text-primary bg-primary/10 rounded-lg font-bold border-l-4 border-primary transition-all cursor-pointer">
          <span className="material-symbols-outlined">code</span>
          <span className="font-label-caps text-label-caps">Active Project</span>
        </div>
        {/* Other links */}
        <div className="flex items-center gap-3 px-4 py-3 text-on-surface-variant font-medium hover:bg-white/5 transition-all rounded-lg cursor-pointer">
          <span className="material-symbols-outlined">list_alt</span>
          <span className="font-label-caps text-label-caps">Curriculum</span>
        </div>
      </nav>
    </aside>
  );
};