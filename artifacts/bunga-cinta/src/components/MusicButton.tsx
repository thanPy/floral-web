import { useMusicContext } from "@/App";
import { motion } from "framer-motion";

export default function MusicButton() {
  const { isPlaying, toggle } = useMusicContext();

  return (
    <motion.button
      onClick={toggle}
      data-testid="btn-music-toggle"
      className="fixed bottom-4 right-4 z-30 flex items-center justify-center rounded-full border border-rose-300/30 backdrop-blur-sm"
      style={{
        width: 40, height: 40,
        background: "rgba(26,10,13,0.75)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      title={isPlaying ? "Pause musik" : "Putar musik"}
    >
      {isPlaying ? (
        /* Pause icon */
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f4a3b5">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        /* Play icon */
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f4a3b5">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </motion.button>
  );
}
