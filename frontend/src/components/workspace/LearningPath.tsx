import React from 'react';
import { useLearningStore } from '../../store/useLearningStore';

export const LearningPath = () => {
  const learningPath = useLearningStore(state => state.learningPath);
  const completedCount = learningPath.filter(s => s.completed).length;

  return (
    <section className="glass-panel rounded-xl p-panel-padding flex flex-col overflow-hidden max-h-[40%] md:max-h-[35%]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-h2 text-sm text-primary flex items-center gap-2 uppercase tracking-widest">
          <span className="material-symbols-outlined text-sm">analytics</span> Learning Path
        </h2>
        <span className="font-label-caps text-[10px] text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">
          {completedCount}/{learningPath.length} Steps
        </span>
      </div>
      <div className="space-y-3 overflow-y-auto pr-1">
        {learningPath.map((step) => (
          <div key={step.id} className={`flex items-start gap-3 ${step.completed ? 'opacity-60' : ''}`}>
            {step.completed ? (
              <span className="material-symbols-outlined text-tertiary text-sm mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            ) : (
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${step.isActive ? 'border-primary' : 'border-outline opacity-40'}`}></div>
            )}
            <span className={`font-body-md text-sm ${step.completed ? 'line-through decoration-outline' : step.isActive ? 'text-on-surface font-semibold' : 'opacity-40'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};