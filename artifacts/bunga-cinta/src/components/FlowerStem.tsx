import { ReactNode } from "react";
import { motion } from "framer-motion";
import { FlowerData } from "@/lib/data";

interface FlowerStemProps {
  data: FlowerData;
  index: number;
  children: ReactNode;
  onClick: () => void;
  isDetailed?: boolean;
}

const SWAY_DURATIONS = [3.8, 4.4, 3.2, 5.0, 4.0];

export default function FlowerStem({ data, index, children, onClick, isDetailed = false }: FlowerStemProps) {
  const swayDuration = SWAY_DURATIONS[index % SWAY_DURATIONS.length];
  const swayClass = `sway-${(index % 5) + 1}`;

  if (isDetailed) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <motion.div
          className="relative z-10"
          style={{ width: "clamp(140px, 30vw, 340px)", height: "clamp(140px, 30vw, 340px)" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: "45%", height: "45%",
            backgroundColor: data.color,
            opacity: 0.09,
            filter: "blur(48px)",
          }}
        />
      </div>
    );
  }

  /*
   * Layer structure (no transform conflict):
   *  1. Outer <div>  — absolute positioning via left/height, translateX(-50%) ONLY
   *  2. <motion.div> — entrance scaleY animation (transform independent, origin-bottom)
   *  3. Inner <div>  — CSS sway rotation (rotate only, no translate)
   */
  return (
    /* Layer 1: position */
    <div
      className="absolute bottom-0 cursor-pointer group"
      style={{
        left: `${data.leftPos}%`,
        height: `${data.height}%`,
        transform: "translateX(-50%)",
        transformOrigin: "bottom center",
      }}
      onClick={onClick}
      data-testid={`flower-${data.type}`}
    >
      {/* Layer 2: entrance grow-in */}
      <motion.div
        className="w-full h-full flex flex-col items-center"
        style={{ transformOrigin: "bottom center" }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{
          duration: 0.9,
          delay: 0.3 + index * 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Layer 3: CSS sway (rotate only) */}
        <div
          className={`w-full h-full flex flex-col items-center ${swayClass}`}
          style={{
            transformOrigin: "bottom center",
            animationDuration: `${swayDuration}s`,
          }}
        >
          {/* Flower head */}
          <motion.div
            className="relative z-10 flex-shrink-0"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            style={{ width: "clamp(44px, 7.5vw, 88px)", height: "clamp(44px, 7.5vw, 88px)" }}
          >
            {children}
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: `0 0 22px 8px ${data.color}50` }}
            />
          </motion.div>

          {/* Stem */}
          <div
            className="rounded-full flex-grow mt-[-5px] z-0"
            style={{
              width: "clamp(3px, 0.45vw, 6px)",
              background: "linear-gradient(to bottom, #5a8060, #2a4e30)",
              boxShadow: "inset -1px 0 3px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
