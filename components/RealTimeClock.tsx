import React, { useState, useEffect } from 'react';

const RealTimeClock: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Get time in 'Asia/Jakarta' timezone (WIB) in 24-hour format (HH:mm:ss)
      const timeString = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTime(timeString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-4 text-4xl sm:text-5xl font-mono font-bold text-green-400 tracking-widest" aria-live="polite">
      {time || '00:00:00'}
    </div>
  );
};

export default RealTimeClock;
