import React from 'react';

interface PrayerTimeRowProps {
  // FIX: Changed JSX.Element to React.ReactElement to resolve namespace error.
  icon: React.ReactElement;
  name: string;
  time: string;
  isNext?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  description: string;
  details: {
    significance: string;
    hadith?: {
      text: string;
      source: string;
    };
  };
}

const PrayerTimeRow: React.FC<PrayerTimeRowProps> = ({ 
    icon, 
    name, 
    time, 
    isNext = false,
    isExpanded = false,
    onClick,
    description,
    details 
}) => {
  const containerClasses = [
    "rounded-lg",
    "transition-all duration-300",
    "border border-gray-700/50",
    "relative",
    "bg-gray-800/50",
    "md:w-40 md:h-40" // Desktop size
  ];

  if (isNext) {
    containerClasses.push(
      "bg-green-800/60",
      "ring-2 ring-offset-2 ring-offset-gray-900 ring-green-400",
      "shadow-lg shadow-green-500/20",
    );
  } else if (isExpanded) {
    containerClasses.push(
      "md:bg-green-900/50",
      "md:ring-2 md:ring-offset-2 md:ring-offset-gray-900 md:ring-green-500"
    );
  }
  
  return (
    <div className={containerClasses.join(' ')}>
       {isNext && (
          <div 
            className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xs bg-green-400 text-gray-900 font-bold px-2 py-0.5 rounded-full z-10"
            aria-label="Next prayer time"
          >
              BERIKUTNYA
          </div>
      )}
      <button 
        onClick={onClick} 
        className="w-full flex justify-between items-center p-4 rounded-t-lg transition-colors duration-300 hover:bg-green-800/40 focus:outline-none focus:ring-2 focus:ring-green-500 md:flex-col md:justify-center md:h-full md:gap-2 md:rounded-lg"
        aria-expanded={isExpanded}
        aria-controls={`description-${name}`}
      >
        <div className="flex items-center gap-4 md:flex-col md:text-center">
          <div className="md:scale-125">{icon}</div>
          <span className="text-lg text-gray-200">{name}</span>
        </div>
        <span 
          className="text-xl font-bold text-green-300 tracking-wider font-mono md:text-2xl"
          aria-label={`Prayer time for ${name} is ${time}`}
        >
          {time}
        </span>
      </button>

      {/* This is the mobile-only expandable area */}
      <div
        id={`description-${name}`}
        className={`grid transition-all duration-500 ease-in-out md:hidden ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        style={{ transitionProperty: 'grid-template-rows, opacity' }}
      >
        <div className="overflow-hidden">
             <div className="p-4 text-left text-sm text-gray-300 space-y-4">
              <p>{description}</p>
              
              <div className="border-t border-gray-700 pt-3">
                <h4 className="font-semibold text-green-300 mb-1">Keutamaan</h4>
                <p>{details.significance}</p>
              </div>
              
              {details.hadith && (
                <div className="border-t border-gray-700 pt-3">
                  <h4 className="font-semibold text-green-300 mb-1">Hadits Terkait</h4>
                  <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-400">
                    <p>"{details.hadith.text}"</p>
                    <cite className="block text-right not-italic mt-2 text-xs text-gray-500">{details.hadith.source}</cite>
                  </blockquote>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimeRow;