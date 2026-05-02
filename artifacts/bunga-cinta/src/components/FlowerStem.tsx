import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { FlowerData } from "@/lib/data";

interface FlowerStemProps {
  data: FlowerData;
  index: number;
  children: ReactNode;
  onClick: () => void;
  isDetailed?: boolean;
}

export default function FlowerStem({ data, index, children, onClick, isDetailed = false }: FlowerStemProps) {
  const swayDuration = 3 + (index % 3);

  if (isDetailed) {
    return (
      <motion.div 
        layoutId={`flower-${data.id}`}
        className="w-full h-full flex items-center justify-center relative"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-64 h-64 md:w-96 md:h-96 z-10"
        >
          {children}
        </motion.div>
        
        {/* Soft glow behind */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: data.color }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      layoutId={`flower-${data.id}`}
      className="absolute bottom-0 cursor-pointer group origin-bottom flex flex-col items-center"
      style={{
        left: `${data.leftPos}%`,
        height: `${data.height}vh`,
        transform: "translateX(-50%)"
      }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ 
        duration: 1.2, 
        delay: 4 + (index * 0.2), // After intro
        ease: "easeOut"
      }}
      onClick={onClick}
      data-testid={`flower-${data.type}`}
    >
      <motion.div
        className="w-full h-full relative origin-bottom flex flex-col items-center"
        animate={{
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: swayDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Flower Head */}
        <motion.div 
          className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 z-10 relative"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {children}
          
          {/* Hover glow */}
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
        
        {/* Stem */}
        <div className="w-1.5 md:w-2 bg-gradient-to-b from-[#4a6b53] to-[#1e3b24] rounded-full flex-grow mt-[-10px] z-0 shadow-sm" />
      </motion.div>
    </motion.div>
  );
}
