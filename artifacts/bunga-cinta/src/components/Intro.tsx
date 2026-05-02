import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Petal {
  id: number;
  color: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  drift: number;
  shape: "ellipse" | "teardrop" | "round";
}

const PETAL_COLORS = ["#ffb6c1", "#ff99a8", "#e6a8d7", "#fffacd", "#ffdab9", "#f4c2c2", "#c9a0e0"];

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    left: Math.random() * 110 - 5,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    size: 12 + Math.random() * 18,
    rotation: Math.random() * 360,
    drift: Math.random() * 80 - 40,
    shape: (["ellipse", "teardrop", "round"] as const)[Math.floor(Math.random() * 3)],
  }));
}

const petalBorderRadius: Record<Petal["shape"], string> = {
  ellipse: "50% 50% 50% 50%",
  teardrop: "80% 0% 80% 0%",
  round: "50%",
};

interface IntroProps {
  onComplete: () => void;
}

type Phase = "waiting" | "animating" | "done";

const welcomeLetters = "Selamat Datang".split("");

export default function Intro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [petals] = useState<Petal[]>(() => generatePetals(60));
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(import.meta.env.BASE_URL + "music.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const handleStart = () => {
    setPhase("animating");

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    const timer = setTimeout(() => {
      setPhase("done");

      if (audioRef.current) {
        const audio = audioRef.current;
        const fadeOut = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = Math.max(0, audio.volume - 0.05);
          } else {
            audio.pause();
            clearInterval(fadeOut);
          }
        }, 150);
      }

      setTimeout(() => {
        onComplete();
      }, 1200);
    }, 5500);

    return () => clearTimeout(timer);
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          style={{ background: "radial-gradient(ellipse at center, #2a0d14 0%, #120508 60%, #0a0205 100%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "600px",
                height: "600px",
                background: "radial-gradient(circle, rgba(200,50,80,0.12) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>

          {/* Falling petals — only visible during animating */}
          <AnimatePresence>
            {phase === "animating" && petals.map((petal) => (
              <motion.div
                key={petal.id}
                className="absolute top-0 pointer-events-none"
                style={{
                  left: `${petal.left}%`,
                  width: petal.size,
                  height: petal.size * 0.7,
                  backgroundColor: petal.color,
                  borderRadius: petalBorderRadius[petal.shape],
                  opacity: 0.85,
                }}
                initial={{ y: -60, rotate: petal.rotation, x: 0, opacity: 0 }}
                animate={{
                  y: "115vh",
                  rotate: petal.rotation + 360,
                  x: [0, petal.drift * 0.5, petal.drift, petal.drift * 0.3, 0],
                  opacity: [0, 0.85, 0.85, 0.7, 0],
                }}
                transition={{
                  duration: petal.duration,
                  delay: petal.delay,
                  ease: "linear",
                  repeat: Infinity,
                  times: [0, 0.1, 0.5, 0.9, 1],
                }}
              />
            ))}
          </AnimatePresence>

          {/* CENTER CONTENT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8">

            {/* WAITING PHASE — click to start */}
            <AnimatePresence mode="wait">
              {phase === "waiting" && (
                <motion.div
                  key="waiting"
                  className="flex flex-col items-center gap-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Decorative flower icon */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg width="72" height="72" viewBox="0 0 100 100" className="drop-shadow-lg">
                      <circle cx="50" cy="30" r="12" fill="#e8738a" opacity="0.9" />
                      <circle cx="70" cy="50" r="12" fill="#c45e78" opacity="0.85" />
                      <circle cx="50" cy="70" r="12" fill="#e8738a" opacity="0.9" />
                      <circle cx="30" cy="50" r="12" fill="#c45e78" opacity="0.85" />
                      <circle cx="50" cy="50" r="14" fill="#f4a3b5" opacity="1" />
                      <circle cx="50" cy="50" r="7" fill="#8a1a2a" opacity="0.85" />
                    </svg>
                  </motion.div>

                  <div className="flex flex-col items-center gap-3">
                    <p
                      className="text-rose-200/60 text-sm tracking-[0.3em] uppercase"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Sebuah pesan untukmu
                    </p>
                    <div
                      className="w-16 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, #e8738a, transparent)" }}
                    />
                  </div>

                  <button
                    onClick={handleStart}
                    data-testid="btn-start-intro"
                    className="relative group cursor-pointer select-none"
                  >
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: "1px solid rgba(232,115,138,0.4)" }}
                      animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: "1px solid rgba(232,115,138,0.3)" }}
                      animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    />

                    {/* Button */}
                    <motion.div
                      className="relative flex items-center gap-3 px-8 py-4 rounded-full border border-rose-400/40 backdrop-blur-sm"
                      style={{ background: "rgba(200,50,80,0.12)" }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(200,50,80,0.22)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Play icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#f4a3b5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span
                        className="text-rose-100 text-lg tracking-wide"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        Mulai
                      </span>
                    </motion.div>
                  </button>

                  <motion.p
                    className="text-rose-300/30 text-xs tracking-widest"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    ✦ aktifkan suara ✦
                  </motion.p>
                </motion.div>
              )}

              {/* ANIMATING PHASE — welcome text */}
              {phase === "animating" && (
                <motion.div
                  key="animating"
                  className="flex flex-col items-center gap-10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* "Selamat Datang" letter by letter */}
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap justify-center">
                      {welcomeLetters.map((letter, i) => (
                        <motion.span
                          key={i}
                          className="inline-block"
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "clamp(2.5rem, 8vw, 5rem)",
                            fontWeight: 700,
                            letterSpacing: letter === " " ? "0.4em" : "0.05em",
                            color: "transparent",
                            WebkitTextStroke: "1px rgba(244,163,181,0.5)",
                            background: "linear-gradient(135deg, #f4a3b5 0%, #e8738a 40%, #c4557a 70%, #f4a3b5 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            textShadow: "none",
                            filter: "drop-shadow(0 0 20px rgba(232,115,138,0.4))",
                            whiteSpace: letter === " " ? "pre" : "normal",
                          }}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.2 + i * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Decorative divider */}
                  <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
                  >
                    <div
                      className="h-px w-24"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(232,115,138,0.6))" }}
                    />
                    <motion.span
                      className="text-rose-300/60 text-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      ✦
                    </motion.span>
                    <div
                      className="h-px w-24"
                      style={{ background: "linear-gradient(90deg, rgba(232,115,138,0.6), transparent)" }}
                    />
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    className="text-rose-200/60 tracking-[0.25em] text-sm uppercase"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
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
