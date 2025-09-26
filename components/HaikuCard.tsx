
import React from 'react';

interface HaikuCardProps {
  title: string;
  haikuLines: [string, string, string];
}

const HaikuCard: React.FC<HaikuCardProps> = ({ title, haikuLines }) => {
  return (
    <div className="w-full p-6 sm:p-8 bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl shadow-cyan-500/10 backdrop-blur-sm animate-fade-in">
      <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-cyan-400">
        {title}
      </h3>
      <div className="space-y-3 text-center">
        {haikuLines.map((line, index) => (
          <p key={index} className="text-lg sm:text-xl text-slate-300 italic tracking-wide">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

// Add a simple fade-in animation keyframe to index.html style block if needed, but Tailwind's default setup is usually sufficient.
// For this setup, we'll create a custom animation class in a style tag within the component.
// NOTE: This is a workaround for not having a CSS file. In a real project, this would be in a CSS file.
const AnimationStyle: React.FC = () => (
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.7s ease-out forwards;
      }
    `}</style>
  );

const HaikuCardWithAnimation: React.FC<HaikuCardProps> = (props) => (
    <>
      <AnimationStyle />
      <HaikuCard {...props} />
    </>
  );
  

export default HaikuCardWithAnimation;
