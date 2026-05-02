import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import NotFound from "@/pages/not-found";
import Garden from "@/pages/Garden";
import FlowerDetail from "@/pages/FlowerDetail";
import Intro from "@/components/Intro";

const queryClient = new QueryClient();

interface MusicContextValue {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  toggle: () => void;
}

export const MusicContext = createContext<MusicContextValue>({
  audioRef: { current: null },
  isPlaying: false,
  toggle: () => {},
});

export function useMusicContext() {
  return useContext(MusicContext);
}

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Garden} />
        <Route path="/flower/:id" component={FlowerDetail} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(import.meta.env.BASE_URL + "music.mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const hasSeenIntro = sessionStorage.getItem("bunga_cinta_intro");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const handleIntroStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("bunga_cinta_intro", "true");
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MusicContext.Provider value={{ audioRef, isPlaying, toggle }}>
          {showIntro && (
            <Intro
              onStart={handleIntroStart}
              onComplete={handleIntroComplete}
            />
          )}
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="font-sans antialiased w-full min-h-screen text-foreground bg-background">
              <Router />
            </div>
          </WouterRouter>
          <Toaster />
        </MusicContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
