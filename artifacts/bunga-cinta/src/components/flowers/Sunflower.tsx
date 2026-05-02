import React from "react";

export default function Sunflower() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-md">
      {/* Leaves */}
      <path d="M 50 80 Q 20 85 10 65 Q 30 65 50 80" fill="#385e2b" />
      <path d="M 50 90 Q 80 85 90 70 Q 70 70 50 90" fill="#385e2b" />
      
      {/* Petals - Outer */}
      {[...Array(16)].map((_, i) => (
        <path 
          key={`outer-${i}`}
          d="M 50 40 L 40 10 L 50 0 L 60 10 Z" 
          fill="#f2c81d" 
          transform={`rotate(${i * 22.5} 50 50)`} 
        />
      ))}
      
      {/* Petals - Inner */}
      {[...Array(16)].map((_, i) => (
        <path 
          key={`inner-${i}`}
          d="M 50 45 L 42 20 L 50 10 L 58 20 Z" 
          fill="#ffd700" 
          transform={`rotate(${i * 22.5 + 11.25} 50 50)`} 
        />
      ))}
      
      {/* Center Brown part */}
      <circle cx="50" cy="50" r="22" fill="#5c3a21" />
      <circle cx="50" cy="50" r="18" fill="#4a2e1a" stroke="#754b2b" strokeWidth="2" strokeDasharray="2,2" />
      <circle cx="50" cy="50" r="12" fill="#362213" stroke="#8a5a33" strokeWidth="1" strokeDasharray="1,2" />
    </svg>
  );
}
