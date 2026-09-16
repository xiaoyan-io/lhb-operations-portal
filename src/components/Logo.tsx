import React from 'react';

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g filter="url(#drop-shadow)">
        {/* Outer Chevron */}
        <path d="M50 15 L10 85 L20 85 L50 30 L80 85 L90 85 Z" fill="url(#silver-gradient)" />
        <path d="M50 15 L10 85 L20 85 L50 30 Z" fill="url(#red-gradient)" />
        
        {/* Middle Chevron */}
        <path d="M50 35 L25 80 L35 80 L50 50 L65 80 L75 80 Z" fill="url(#silver-gradient-dark)" />
        <path d="M50 35 L25 80 L35 80 L50 50 Z" fill="url(#red-gradient-dark)" />
        
        {/* Inner Chevron */}
        <path d="M50 55 L40 75 L45 75 L50 65 L55 75 L60 75 Z" fill="url(#silver-gradient)" />
        <path d="M50 55 L40 75 L45 75 L50 65 Z" fill="url(#red-gradient)" />
      </g>

      <defs>
        <linearGradient id="red-gradient" x1="10" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b30000" />
          <stop offset="1" stopColor="#660000" />
        </linearGradient>
        <linearGradient id="red-gradient-dark" x1="25" y1="35" x2="50" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#990000" />
          <stop offset="1" stopColor="#4d0000" />
        </linearGradient>
        <linearGradient id="silver-gradient" x1="50" y1="15" x2="90" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#a6a6a6" />
        </linearGradient>
        <linearGradient id="silver-gradient-dark" x1="50" y1="35" x2="75" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e6e6e6" />
          <stop offset="1" stopColor="#8c8c8c" />
        </linearGradient>
        <filter id="drop-shadow" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.5" />
        </filter>
      </defs>
    </svg>
  );
};

