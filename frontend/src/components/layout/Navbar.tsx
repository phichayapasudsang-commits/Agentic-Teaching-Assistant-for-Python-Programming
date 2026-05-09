import React from 'react';
import { useLearningStore } from '../../store/useLearningStore';

export const Navbar = () => {
  const reset = useLearningStore(state => state.reset);

  return (
    <header className="bg-surface-container/90 backdrop-blur-xl flex justify-between items-center px-gutter h-16 w-full z-50 border-b border-white/10 shadow-sm fixed top-0">
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined text-primary hover:bg-white/5 transition-colors p-2 rounded-lg">menu</button>
        <h1 
          onClick={reset} 
          className="font-h1 text-h1 font-black text-primary-container dark:text-primary-container tracking-tight cursor-pointer hover:opacity-80"
        >
          PyGuide
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-6 mr-8">
          <span className="font-label-caps text-label-caps text-primary cursor-pointer">Curriculum</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Documentation</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary/20">
          <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8bVnkZR8YPCtTWjCIolXi7Mx7AdcakJaS5AlISy8hyU3K4wToeD8u1NY8c0CM9qJ1hHmjrwHlZ_X_6WJ9_0c-8xRAGc5RDHtdt2lXFGIg3RAJxqRaC9kkwTo1njs-BVzPU3aWyJ_05X4jGuImq700OeBLQqiUmVYKwttWqA4MnFkewp1DEW35oI1NvHTPbFVsc7HCJxzx9Wy7xnDXJJrVVJOXJRBAE4maJwI6_G-jA3uuq1xGl3W4bmyqnPnqsc-WlRLIGguio4f"/>
        </div>
      </div>
    </header>
  );
};