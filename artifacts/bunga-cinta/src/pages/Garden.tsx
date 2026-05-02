import React from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { FLOWER_DATA } from "@/lib/data";
import FlowerStem from "@/components/FlowerStem";
import Rose from "@/components/flowers/Rose";
import Lavender from "@/components/flowers/Lavender";
import Sunflower from "@/components/flowers/Sunflower";
import Peony from "@/components/flowers/Peony";
import Lily from "@/components/flowers/Lily";

const getFlowerComponent = (type: string) => {
  switch (type) {
    case "rose": return <Rose />;
    case "lavender": return <Lavender />;
    case "sunflower": return <Sunflower />;
    case "peony": return <Peony />;
    case "lily": return <Lily />;
    default: return <Rose />;
  }
};

export default function Garden() {
  const [, setLocation] = useLocation();

  return (
    <motion.div 
      className="min-h-[100dvh] w-full relative overflow-hidden bg-gradient-to-b from-[#1a0a0d] via-[#2d1219] to-[#0a1510]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200/40 rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Moon / Light source */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Garden Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-0 opacity-80" />

      {/* Flowers */}
      <div className="absolute inset-0 max-w-6xl mx-auto z-10">
        {FLOWER_DATA.map((flower, idx) => (
          <FlowerStem
            key={flower.id}
            data={flower}
            index={idx}
            onClick={() => setLocation(`/flower/${flower.id}`)}
          >
            {getFlowerComponent(flower.type)}
          </FlowerStem>
        ))}
      </div>

      {/* Prompt */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 text-center z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 2 }}
      >
        <motion.p 
          className="text-rose-200/70 font-serif italic text-lg tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✦ Klik bunga untuk pesanku ✦
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
