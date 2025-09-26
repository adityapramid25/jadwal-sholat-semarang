import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  prayerName: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, prayerName }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      hours: '00',
      minutes: '00',
      seconds: '00',
    };

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      timeLeft = {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      };
    }
    
    return timeLeft;
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Recalculate immediately when targetDate changes
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-4 sm:p-6 text-center shadow-lg backdrop-blur-sm">
      <p className="text-md sm:text-lg text-gray-300 mb-2">
        Waktu tersisa untuk <span className="font-bold text-green-300">{prayerName}</span>
      </p>
      <div className="text-4xl sm:text-5xl font-mono font-bold text-green-400 tracking-widest" aria-live="polite">
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </div>
    </div>
  );
};

export default CountdownTimer;