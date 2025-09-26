import React from 'react';

// New Icons for the detail view
const SignificanceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
);

const HadithIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

interface PrayerDetailProps {
  name: string;
  icon: React.ReactElement;
  description: string;
  details: {
    significance: string;
    hadith?: {
      text: string;
      source: string;
    };
  };
}

const PrayerDetail: React.FC<PrayerDetailProps> = ({ name, icon, description, details }) => {
  return (
    <div className="hidden md:flex flex-col w-full md:w-[450px] animate-slide-fade-in-right">
      {/* Header */}
      <div className="flex items-center gap-4 p-5 bg-gray-800/50 border-b border-gray-700 rounded-t-lg">
        <div className="scale-150 text-green-300">
            {icon}
        </div>
        <div>
            <h3 className="text-2xl font-bold text-white">{name}</h3>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>

      <div className="p-5 space-y-5 text-sm text-gray-300 bg-gray-800/20 rounded-b-lg">
        {/* Significance Section */}
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <SignificanceIcon />
                <h4 className="font-semibold text-green-300 text-base">Keutamaan</h4>
            </div>
            <p className="pl-8 text-gray-300">{details.significance}</p>
        </div>
        
        {/* Hadith Section */}
        {details.hadith && (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
                <HadithIcon />
                <h4 className="font-semibold text-green-300 text-base">Hadits Terkait</h4>
            </div>
            <blockquote className="ml-8 border-l-4 border-green-500/50 pl-4 py-2 bg-gray-800/40 rounded-r-lg italic text-gray-400 relative">
                <p>"{details.hadith.text}"</p>
                <cite className="block text-right not-italic mt-3 text-xs text-gray-500">{details.hadith.source}</cite>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerDetail;