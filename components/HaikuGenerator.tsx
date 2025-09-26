
import React, { useState, useCallback } from 'react';
import { generateHaiku } from '../services/geminiService';
import { Haiku } from '../types';
import HaikuCard from './HaikuCard';
import LoadingSpinner from './LoadingSpinner';

const HaikuGenerator: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [haiku, setHaiku] = useState<Haiku | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setHaiku(null);

    try {
      const result = await generateHaiku(topic);
      setHaiku(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [topic]);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGenerate();
    }
  };


  return (
    <section className="w-full flex flex-col items-center gap-8 p-4">
      <div className="w-full max-w-lg space-y-4">
        <div className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 'Silent forest' or 'First cup of coffee'"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 placeholder-slate-500 text-slate-200"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75"
        >
          {isLoading ? (
            <>
              {/* FIX: Customize spinner for better UI consistency within the button. */}
              <LoadingSpinner className="h-5 w-5 text-white" />
              <span className="ml-2">Generating...</span>
            </>
          ) : (
            'Generate Haiku'
          )}
        </button>
      </div>

      <div className="w-full max-w-lg min-h-[200px] flex items-center justify-center">
        {error && <p className="text-red-400 bg-red-900/50 border border-red-700 rounded-lg p-4 text-center">{error}</p>}
        {haiku && !isLoading && <HaikuCard title={haiku.title} haikuLines={haiku.haiku} />}
      </div>
    </section>
  );
};

export default HaikuGenerator;