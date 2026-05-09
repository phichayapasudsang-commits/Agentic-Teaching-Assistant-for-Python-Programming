import React from 'react';
import { Navbar } from './Navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background text-on-background font-body-md overflow-hidden h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mt-16 pb-16 md:pb-0 flex overflow-hidden">
        {children}
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 md:hidden bg-surface-dim/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_12px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center justify-center text-outline hover:text-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined">search</span>
          <span className="font-label-caps text-[10px] mt-1">Inquiry</span>
        </div>
        <div className="flex flex-col items-center justify-center text-outline hover:text-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined">forum</span>
          <span className="font-label-caps text-[10px] mt-1">Dialogue</span>
        </div>
        <div className="flex flex-col items-center justify-center text-secondary bg-secondary/10 rounded-full px-4 py-1 transition-all active:scale-95 duration-75">
          <span className="material-symbols-outlined">terminal</span>
          <span className="font-label-caps text-[10px] mt-1">Editor</span>
        </div>
        <div className="flex flex-col items-center justify-center text-outline hover:text-primary transition-colors cursor-pointer">
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-label-caps text-[10px] mt-1">Progress</span>
        </div>
      </nav>
    </div>
  );
};