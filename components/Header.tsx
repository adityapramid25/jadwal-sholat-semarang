
import React from 'react';

const FeatherIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-400">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
      <line x1="16" y1="8" x2="2" y2="22"></line>
      <line x1="17.5" y1="15" x2="9" y2="15"></line>
    </svg>
  );

const Header: React.FC = () => {
  return (
    <header className="text-center my-4 sm:my-8 w-full">
      <div className="flex items-center justify-center gap-4 mb-2">
        <FeatherIcon />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-cyan-400">
          AI Haiku Generator
        </h1>
      </div>
      <p className="text-md sm:text-lg text-slate-400">Crafting poetry from your prompts.</p>
    </header>
  );
};

export default Header;
