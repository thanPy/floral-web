import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import NotFound from "@/pages/not-found";
import Garden from "@/pages/Garden";
import FlowerDetail from "@/pages/FlowerDetail";
import Intro from "@/components/Intro";

const queryClient = new QueryClient();

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

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("bunga_cinta_intro");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("bunga_cinta_intro", "true");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showIntro && <Intro onComplete={handleIntroComplete} />}
        
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="font-sans antialiased w-full min-h-screen text-foreground bg-background">
            <Router />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
