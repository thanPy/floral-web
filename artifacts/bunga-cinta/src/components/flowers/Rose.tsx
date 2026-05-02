import React from "react";
import { motion } from "framer-motion";

export default function Rose() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-md">
      {/* Leaves */}
      <path d="M 50 60 Q 30 70 20 55 Q 35 50 50 60" fill="#2d5a27" />
      <path d="M 50 70 Q 70 60 80 75 Q 65 80 50 70" fill="#2d5a27" />
      
      {/* Outer Petals */}
      <path d="M 50 50 C 10 40 20 10 50 20 C 80 10 90 40 50 50" fill="#a0001c" />
      <path d="M 20 40 C 10 60 40 60 50 50 C 40 30 20 20 20 40" fill="#800016" />
      <path d="M 80 40 C 90 60 60 60 50 50 C 60 30 80 20 80 40" fill="#800016" />
      
      {/* Inner Petals */}
      <path d="M 50 45 C 30 35 35 15 50 25 C 65 15 70 35 50 45" fill="#c8102e" />
      <path d="M 35 35 C 30 45 45 50 50 45 C 45 35 35 30 35 35" fill="#b00b25" />
      <path d="M 65 35 C 70 45 55 50 50 45 C 55 35 65 30 65 35" fill="#b00b25" />
      
      {/* Center Center */}
      <path d="M 50 40 C 40 35 45 25 50 30 C 55 25 60 35 50 40" fill="#e61c3a" />
      <circle cx="50" cy="35" r="4" fill="#600010" />
    </svg>
  );
}
