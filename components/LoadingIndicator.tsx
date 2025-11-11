
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Consulting the cosmos...",
  "Aligning the planets...",
  "Reading the celestial charts...",
  "Interpreting the stars...",
  "Channeling ancient wisdom...",
];

const LoadingIndicator: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-50"></div>
        <div className="absolute inset-2 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute inset-4 flex items-center justify-center bg-gray-900 rounded-full">
            <svg className="w-10 h-10 text-yellow-300 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
      </div>
      <p className="text-lg text-purple-200 animate-pulse">{loadingMessages[messageIndex]}</p>
    </div>
  );
};

export default LoadingIndicator;
