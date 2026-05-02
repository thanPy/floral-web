import { useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { FLOWER_DATA } from "@/lib/data";
import FlowerStem from "@/components/FlowerStem";
import Rose from "@/components/flowers/Rose";
import Lavender from "@/components/flowers/Lavender";
import Sunflower from "@/components/flowers/Sunflower";
import Peony from "@/components/flowers/Peony";
import Lily from "@/components/flowers/Lily";
import MusicButton from "@/components/MusicButton";
import type { ReactElement } from "react";

const FLOWER_MAP: Record<string, ReactElement> = {
  rose: <Rose />,
  lavender: <Lavender />,
  sunflower: <Sunflower />,
  peony: <Peony />,
  lily: <Lily />,
};

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
}

export default function Garden() {
  const [, setLocation] = useLocation();

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: (i * 5.7) % 100,
      top: (i * 7.3) % 90,
      delay: (i * 0.41) % 5,
      duration: 3.5 + (i % 5),
      size: i % 2 === 0 ? 3 : 4,
    }));
  }, []);

  return (
    <motion.div
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #110407 0%, #1e0a10 35%, #0d1a10 80%, #061008 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* Ambient light — static, no animation */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%", left: "50%", transform: "translateX(-50%)",
          width: "70vw", height: "60vh",
          background: "radial-gradient(ellipse, rgba(180,40,70,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Firefly particles — CSS animated, precomputed */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="firefly absolute rounded-full pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            backgroundColor: "#fef9c3",
            opacity: 0.35,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Ground grass */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "18%",
          background: "linear-gradient(to top, #020a04 0%, #071510 40%, transparent 100%)",
        }}
      />

      {/* Flowers container — full screen, flowers positioned by % */}
      <div className="absolute inset-0">
        {FLOWER_DATA.map((flower, idx) => (
          <FlowerStem
            key={flower.id}
            data={flower}
            index={idx}
            onClick={() => setLocation(`/flower/${flower.id}`)}
          >
            {FLOWER_MAP[flower.type]}
          </FlowerStem>
        ))}
      </div>

      {/* Prompt label */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
      >
        <motion.p
          className="text-rose-200/60 italic tracking-widest"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(0.7rem, 2vw, 1rem)",
          }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✦ Klik bunga untuk pesanku ✦
        </motion.p>
      </motion.div>

      {/* Music control */}
      <MusicButton />
    </motion.div>
  );
}
