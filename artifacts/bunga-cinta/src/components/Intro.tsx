import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Petal {
  id: number;
  color: string;
  left: number;
  delay: number;
  duration: number;
  width: number;
  height: number;
  rotation: number;
  drift: number;
  borderRadius: string;
}

const COLORS = ["#ffb6c1", "#ff99a8", "#e6a8d7", "#fffacd", "#ffdab9", "#f4c2c2", "#c9a0e0"];
const SHAPES = ["50%", "80% 0% 80% 0%", "50% 50% 50% 50%"];

const welcomeLetters = "Selamat Datang".split("");

interface IntroProps {
  onStart: () => void;
  onComplete: () => void;
}

type Phase = "waiting" | "animating" | "done";

export default function Intro({ onStart, onComplete }: IntroProps) {
  const [phase, setPhase] = useState<Phase>("waiting");

  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: 55 }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      left: (i * 1.85) % 110 - 5,
      delay: (i * 0.09) % 3,
      duration: 4 + (i % 5),
      width: 12 + (i % 3) * 6,
      height: 8 + (i % 3) * 4,
      rotation: (i * 37) % 360,
      drift: ((i * 13) % 80) - 40,
      borderRadius: SHAPES[i % SHAPES.length],
    }));
  }, []);

  const handleStart = () => {
    setPhase("animating");
    onStart();

    setTimeout(() => {
      setPhase("done");
      setTimeout(onComplete, 1000);
    }, 5500);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, #2a0d14 0%, #120508 60%, #0a0205 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          {/* Static ambient glow — no animation, no lag */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600, height: 600,
              background: "radial-gradient(circle, rgba(200,50,80,0.14) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Petals — CSS animations, only rendered during animating */}
          {phase === "animating" && petals.map((p) => (
            <div
              key={p.id}
              className="petal-fall absolute top-0 pointer-events-none"
              style={{
                left: `${p.left}%`,
                width: p.width,
                height: p.height,
                backgroundColor: p.color,
                borderRadius: p.borderRadius,
                opacity: 0.82,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--petal-drift": `${p.drift}px`,
                "--petal-rotate-end": `${p.rotation + 360}deg`,
              } as React.CSSProperties}
            />
          ))}

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-6 text-center">
            <AnimatePresence mode="wait">
              {phase === "waiting" && (
                <motion.div
                  key="wait"
                  className="flex flex-col items-center gap-6 sm:gap-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16, scale: 0.96 }}
                  transition={{ duration: 0.7 }}
                >
                  {/* Flower icon */}
                  <motion.svg
                    width="64" height="64" viewBox="0 0 100 100"
                    className="drop-shadow-lg"
                    animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.06, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <circle cx="50" cy="28" r="13" fill="#e8738a" opacity="0.9" />
                    <circle cx="72" cy="50" r="13" fill="#c45e78" opacity="0.85" />
                    <circle cx="50" cy="72" r="13" fill="#e8738a" opacity="0.9" />
                    <circle cx="28" cy="50" r="13" fill="#c45e78" opacity="0.85" />
                    <circle cx="50" cy="50" r="15" fill="#f4a3b5" />
                    <circle cx="50" cy="50" r="7" fill="#8a1a2a" opacity="0.85" />
                  </motion.svg>

                  <div className="flex flex-col items-center gap-2">
                    <p
                      className="text-rose-200/55 text-xs sm:text-sm tracking-[0.3em] uppercase"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Sebuah pesan untukmu
                    </p>
                    <div
                      className="w-14 h-px"
                      style={{ background: "linear-gradient(90deg,transparent,#e8738a,transparent)" }}
                    />
                  </div>

                  {/* Start button */}
                  <button
                    onClick={handleStart}
                    data-testid="btn-start-intro"
                    className="relative cursor-pointer select-none group"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full border border-rose-400/35"
                      animate={{ scale: [1, 1.65, 1.65], opacity: [0.55, 0, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                      className="relative flex items-center gap-3 px-7 py-3.5 sm:px-9 sm:py-4 rounded-full border border-rose-400/40"
                      style={{ background: "rgba(200,50,80,0.13)" }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(200,50,80,0.22)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#f4a3b5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span
                        className="text-rose-100 text-base sm:text-lg tracking-wide"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        Mulai
                      </span>
                    </motion.div>
                  </button>

                  <motion.p
                    className="text-rose-300/30 text-xs tracking-widest"
                    animate={{ opacity: [0.3, 0.65, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    ✦ aktifkan suara ✦
                  </motion.p>
                </motion.div>
              )}

              {phase === "animating" && (
                <motion.div
                  key="anim"
                  className="flex flex-col items-center gap-8 sm:gap-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* "Selamat Datang" letter by letter */}
                  <div className="flex flex-wrap justify-center">
                    {welcomeLetters.map((letter, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: "clamp(2rem, 7vw, 4.5rem)",
                          fontWeight: 700,
                          letterSpacing: letter === " " ? "0.35em" : "0.04em",
                          background: "linear-gradient(135deg,#f4a3b5 0%,#e8738a 40%,#c4557a 70%,#f4a3b5 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          filter: "drop-shadow(0 0 18px rgba(232,115,138,0.4))",
                          whiteSpace: letter === " " ? "pre" : undefined,
                        }}
                        initial={{ opacity: 0, y: 36 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.48, delay: 0.15 + i * 0.065, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                  </div>

                  {/* Divider */}
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 1.3, ease: "easeOut" }}
                  >
                    <div className="h-px w-20 sm:w-28" style={{ background: "linear-gradient(90deg,transparent,rgba(232,115,138,0.6))" }} />
                    <motion.span className="text-rose-300/60 text-base" animate={{ rotate: [0, 360] }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}>✦</motion.span>
                    <div className="h-px w-20 sm:w-28" style={{ background: "linear-gradient(90deg,rgba(232,115,138,0.6),transparent)" }} />
                  </motion.div>

                  <motion.p
                    className="text-rose-200/55 tracking-[0.25em] text-xs sm:text-sm uppercase italic"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.1 }}
                  >
                    ke taman bungaku
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
