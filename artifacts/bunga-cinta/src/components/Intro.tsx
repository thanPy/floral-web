import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    // Generate petals
    const newPetals = Array.from({ length: 50 }).map((_, i) => {
      const colors = ["#ffb6c1", "#ff99a8", "#e6a8d7", "#fffacd", "#ffdab9"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = 3 + Math.random() * 2;
      const size = 15 + Math.random() * 20;
      
      return { id: i, color, left, delay, duration, size };
    });
    
    setPetals(newPetals);

    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none bg-[#1a0a0d]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 2.5 }}
      >
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="petal"
            style={{
              left: `${petal.left}%`,
              width: petal.size,
              height: petal.size,
              backgroundColor: petal.color,
            }}
            initial={{ y: -50, rotate: 0, x: 0 }}
            animate={{
              y: "110vh",
              rotate: [0, 180, 360],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
