import React from "react";

export default function Peony() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-md">
      {/* Leaves */}
      <path d="M 50 70 Q 25 75 15 55 Q 35 60 50 70" fill="#436b4a" />
      <path d="M 50 80 Q 75 75 85 60 Q 65 65 50 80" fill="#436b4a" />
      <path d="M 50 60 Q 30 50 20 30 Q 40 40 50 60" fill="#436b4a" />
      
      {/* Back petals */}
      <circle cx="35" cy="40" r="25" fill="#d96a83" />
      <circle cx="65" cy="40" r="25" fill="#d96a83" />
      <circle cx="50" cy="25" r="25" fill="#e27c95" />
      <circle cx="50" cy="60" r="25" fill="#d45b77" />
      
      {/* Mid petals */}
      <circle cx="40" cy="35" r="20" fill="#e88ea4" />
      <circle cx="60" cy="35" r="20" fill="#e88ea4" />
      <circle cx="35" cy="50" r="20" fill="#df6e89" />
      <circle cx="65" cy="50" r="20" fill="#df6e89" />
      
      {/* Inner petals */}
      <circle cx="45" cy="45" r="15" fill="#ed9eb1" />
      <circle cx="55" cy="45" r="15" fill="#ed9eb1" />
      <circle cx="50" cy="35" r="15" fill="#f2b1c2" />
      
      {/* Center fluff */}
      <circle cx="50" cy="45" r="8" fill="#f7c8d3" />
      <circle cx="48" cy="43" r="5" fill="#fcdece" />
      <circle cx="52" cy="47" r="4" fill="#fcdece" />
    </svg>
  );
}
