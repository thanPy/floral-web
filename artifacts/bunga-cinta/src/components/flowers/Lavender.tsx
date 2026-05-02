import React from "react";

export default function Lavender() {
  return (
    <svg viewBox="0 0 100 150" className="w-full h-full overflow-visible drop-shadow-sm">
      {/* Leaves */}
      <path d="M 50 120 Q 35 110 30 90 Q 40 105 50 120" fill="#4a6b53" />
      <path d="M 50 130 Q 65 115 70 100 Q 60 115 50 130" fill="#4a6b53" />
      <path d="M 50 100 Q 40 85 35 65 Q 45 80 50 100" fill="#4a6b53" />
      
      {/* Little purple florets */}
      <circle cx="45" cy="20" r="4" fill="#a484c9" />
      <circle cx="55" cy="22" r="5" fill="#8c6db1" />
      
      <circle cx="43" cy="35" r="5" fill="#75519c" />
      <circle cx="58" cy="32" r="4" fill="#a484c9" />
      <circle cx="50" cy="30" r="6" fill="#8c6db1" />
      
      <circle cx="40" cy="48" r="6" fill="#8c6db1" />
      <circle cx="60" cy="45" r="5" fill="#75519c" />
      <circle cx="48" cy="42" r="5" fill="#a484c9" />
      <circle cx="55" cy="50" r="4" fill="#8c6db1" />
      
      <circle cx="42" cy="65" r="5" fill="#75519c" />
      <circle cx="58" cy="62" r="6" fill="#a484c9" />
      <circle cx="50" cy="58" r="5" fill="#8c6db1" />
      
      <circle cx="45" cy="80" r="4" fill="#8c6db1" />
      <circle cx="55" cy="78" r="5" fill="#75519c" />
      <circle cx="50" cy="72" r="5" fill="#a484c9" />
    </svg>
  );
}
