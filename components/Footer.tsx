import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full text-center py-4 mt-8">
      <p className="text-sm text-green-300/70">
        Prayer times data provided by <a href="https://aladhan.com/prayer-times-api" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-200">Aladhan API</a>.
      </p>
    </footer>
  );
};

export default Footer;
