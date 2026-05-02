import { useMemo } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { FLOWER_DATA } from "@/lib/data";
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

interface FloatingPetal {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

function getReadableTextColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.65 ? "#1a1209" : hex;
}

export default function FlowerDetail() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const id = parseInt(params.id || "1", 10);
  const flower = FLOWER_DATA.find((f) => f.id === id) ?? FLOWER_DATA[0];

  const textColor = getReadableTextColor(flower.color);
  const isFlowerLeft = flower.leftPos <= 50;

  const petals = useMemo<FloatingPetal[]>(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: (i * 11) % 100,
      top: (i * 9 + 5) % 90,
      size: 10 + (i % 3) * 4,
      delay: (i * 0.38) % 3,
      duration: 5 + (i % 4),
    }));
  }, []);

  const flowerBg = `radial-gradient(ellipse at center, ${flower.color}30 0%, ${flower.color}08 60%, transparent 100%)`;

  const flowerSide = (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        background: flowerBg,
        backgroundColor: "#0d1108",
      }}
    >
      {/* Floating petals — CSS animated, precomputed */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal-float absolute pointer-events-none rounded-full opacity-20"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size * 0.65,
            backgroundColor: flower.color,
            borderRadius: "60% 0% 60% 0%",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Glow */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "55%", height: "55%",
          backgroundColor: flower.color,
          opacity: 0.08,
          filter: "blur(48px)",
        }}
      />

      {/* Flower */}
      <motion.div
        className="relative z-10"
        style={{ width: "clamp(140px, 30vw, 340px)", height: "clamp(140px, 30vw, 340px)" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {FLOWER_MAP[flower.type]}
      </motion.div>
    </div>
  );

  const messageSide = (
    <div
      className="relative flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-16 py-10 overflow-y-auto"
      style={{ backgroundColor: "#fdf5ef" }}
    >
      <motion.div
        className="max-w-sm mx-auto w-full"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        {/* Back button */}
        <button
          onClick={() => setLocation("/")}
          data-testid="btn-back-to-garden"
          className="flex items-center gap-2 mb-8 group transition-colors"
          style={{ color: `${textColor}cc` }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform duration-200">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span className="text-sm tracking-wider" style={{ fontFamily: "'Playfair Display',Georgia,serif" }}>
            Kembali ke Taman
          </span>
        </button>

        {/* Flower name */}
        <h1
          className="font-bold mb-4 leading-tight"
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            color: textColor,
          }}
        >
          {flower.name}
        </h1>

        {/* Divider */}
        <div
          className="mb-7"
          style={{
            width: 48, height: 2, borderRadius: 1,
            background: `linear-gradient(90deg, ${flower.color}, transparent)`,
          }}
        />

        {/* Message */}
        <p
          className="leading-loose"
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            color: "#3a2020",
            letterSpacing: "0.02em",
          }}
        >
          {flower.message}
        </p>

        {/* Small decorative */}
        <motion.p
          className="mt-10 text-xs tracking-[0.25em]"
          style={{ color: `${textColor}80`, fontFamily: "'Playfair Display',Georgia,serif", fontStyle: "italic" }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          ✦ dengan sepenuh hati ✦
        </motion.p>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      className="fixed inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Mobile: stack vertically. Desktop: side by side */}
      <div className="w-full h-full flex flex-col md:flex-row">
        {isFlowerLeft ? (
          <>
            <div className="w-full md:w-[45%] h-[42%] md:h-full">{flowerSide}</div>
            <div className="w-full md:w-[55%] h-[58%] md:h-full">{messageSide}</div>
          </>
        ) : (
          <>
            <div className="w-full md:w-[55%] h-[58%] md:h-full md:order-1 order-2">{messageSide}</div>
            <div className="w-full md:w-[45%] h-[42%] md:h-full md:order-2 order-1">{flowerSide}</div>
          </>
        )}
      </div>

      <MusicButton />
    </motion.div>
  );
}
