import React from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { FLOWER_DATA } from "@/lib/data";
import FlowerStem from "@/components/FlowerStem";
import Rose from "@/components/flowers/Rose";
import Lavender from "@/components/flowers/Lavender";
import Sunflower from "@/components/flowers/Sunflower";
import Peony from "@/components/flowers/Peony";
import Lily from "@/components/flowers/Lily";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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

export default function FlowerDetail() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const id = parseInt(params.id || "1", 10);
  const flower = FLOWER_DATA.find((f) => f.id === id) || FLOWER_DATA[0];

  const isLeftAligned = flower.leftPos <= 50;

  return (
    <motion.div 
      className="min-h-[100dvh] w-full flex flex-col md:flex-row bg-[#fdf8f5] dark:bg-[#1a0a0d]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Flower Side */}
      <div 
        className={`w-full md:w-1/2 h-[50dvh] md:h-screen relative flex items-center justify-center overflow-hidden order-1 ${isLeftAligned ? "md:order-1" : "md:order-2"}`}
        style={{ 
          background: `radial-gradient(circle at center, ${flower.color}40 0%, ${flower.color}10 100%)` 
        }}
      >
        <FlowerStem data={flower} index={0} isDetailed={true} onClick={() => {}}>
          {getFlowerComponent(flower.type)}
        </FlowerStem>
        
        {/* Floating background petals */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`bg-petal-${i}`}
              className="absolute w-4 h-4 rounded-full opacity-30"
              style={{
                backgroundColor: flower.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                borderRadius: "10px 0px 10px 0px"
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* Message Side */}
      <div className={`w-full md:w-1/2 min-h-[50dvh] md:h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 order-2 ${isLeftAligned ? "md:order-2" : "md:order-1"}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-md mx-auto w-full"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6" style={{ color: flower.color }}>
            {flower.name}
          </h1>
          
          <div className="w-12 h-px bg-border mb-8" style={{ backgroundColor: flower.color, opacity: 0.5 }} />
          
          <p className="text-lg md:text-xl font-serif leading-relaxed text-foreground/80 whitespace-pre-line tracking-wide">
            {flower.message}
          </p>
          
          <div className="mt-16">
            <Button 
              variant="ghost" 
              className="group hover:bg-transparent pl-0 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setLocation("/")}
              data-testid="btn-back-to-garden"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Taman
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
