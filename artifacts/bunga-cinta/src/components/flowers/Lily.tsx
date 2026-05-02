import React from "react";

export default function Lily() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-md">
      {/* Leaves */}
      <path d="M 50 70 Q 20 60 10 80 Q 30 75 50 70" fill="#325e36" />
      <path d="M 50 80 Q 80 60 90 75 Q 70 80 50 80" fill="#325e36" />
      
      {/* Petals */}
      {/* Bottom petals */}
      <path d="M 50 50 Q 20 70 30 90 Q 40 70 50 50" fill="#e8e8e8" />
      <path d="M 50 50 Q 80 70 70 90 Q 60 70 50 50" fill="#e8e8e8" />
      
      {/* Side petals */}
      <path d="M 50 50 Q 10 40 5 20 Q 30 30 50 50" fill="#fdfdfd" />
      <path d="M 50 50 Q 90 40 95 20 Q 70 30 50 50" fill="#fdfdfd" />
      
      {/* Top petals */}
      <path d="M 50 50 Q 30 10 50 0 Q 70 10 50 50" fill="#ffffff" />
      
      {/* Petal details/creases */}
      <path d="M 50 50 Q 40 20 50 5" stroke="#e0e5d1" strokeWidth="1" fill="none" />
      <path d="M 50 50 Q 20 30 10 22" stroke="#e0e5d1" strokeWidth="1" fill="none" />
      <path d="M 50 50 Q 80 30 90 22" stroke="#e0e5d1" strokeWidth="1" fill="none" />
      
      {/* Center green base */}
      <path d="M 45 45 Q 50 60 55 45 Q 50 50 45 45" fill="#a4c98c" />
      
      {/* Stamens */}
      <path d="M 50 50 Q 45 30 40 25" stroke="#a4c98c" strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="25" r="2" fill="#c47a3b" />
      
      <path d="M 50 50 Q 55 30 60 25" stroke="#a4c98c" strokeWidth="1.5" fill="none" />
      <circle cx="60" cy="25" r="2" fill="#c47a3b" />
      
      <path d="M 50 50 Q 50 25 50 20" stroke="#a4c98c" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="20" r="2.5" fill="#c47a3b" />
      
      <path d="M 50 50 Q 35 40 30 35" stroke="#a4c98c" strokeWidth="1.5" fill="none" />
      <circle cx="30" cy="35" r="2" fill="#c47a3b" />
      
      <path d="M 50 50 Q 65 40 70 35" stroke="#a4c98c" strokeWidth="1.5" fill="none" />
      <circle cx="70" cy="35" r="2" fill="#c47a3b" />
    </svg>
  );
}
