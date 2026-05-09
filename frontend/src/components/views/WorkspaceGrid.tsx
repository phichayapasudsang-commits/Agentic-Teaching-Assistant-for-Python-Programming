import React from 'react';
import { Sidebar } from '../layout/Sidebar'; // เดี๋ยวเราจะสร้างด้านล่าง
import { LearningPath } from '../workspace/LearningPath';
import { ChatPanel } from '../workspace/ChatPanel';
import { CodeWorkspace } from '../workspace/CodeWorkspace';

export const WorkspaceGrid = () => {
  return (
    <>
      <Sidebar />
      <div className="flex-1 lg:ml-72 flex flex-col md:flex-row gap-gutter p-md h-full overflow-hidden">
        {/* Left Panel: Context & Chat */}
        <div className="w-full md:w-1/3 flex flex-col gap-gutter h-full">
          <LearningPath />
          <ChatPanel />
        </div>

        {/* Right Panel: Editor & Terminal */}
        <div className="flex-1 flex flex-col gap-gutter h-full">
          <CodeWorkspace />
        </div>
      </div>
    </>
  );
};