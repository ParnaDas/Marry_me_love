"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/ui/heart-icon";
import { Celebration } from "@/components/celebration";
import { Creature } from "@/components/creature";
import { cn } from "@/lib/utils";

export default function ProposalPage() {
  const [noClicks, setNoClicks] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [creaturePos, setCreaturePos] = useState<{ x: number; y: number } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for the Boy Cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle the random movement of the crying creature
  useEffect(() => {
    if (noClicks > 0 && !isAccepted) {
      const moveCreature = () => {
        if (typeof window === 'undefined') return;
        
        const maxX = window.innerWidth - 140;
        const maxY = window.innerHeight - 180;
        
        const randomX = Math.max(10, Math.random() * maxX);
        const randomY = Math.max(10, Math.random() * maxY);
        
        setCreaturePos({ x: randomX, y: randomY });
      };

      moveCreature();
      const interval = setInterval(moveCreature, 1500); 
      
      return () => clearInterval(interval);
    } else {
      setCreaturePos(null);
    }
  }, [noClicks, isAccepted]);

  const handleNoClick = () => {
    if (noClicks < 3) {
      setNoClicks(prev => prev + 1);
    }
  };

  const handleYesClick = () => {
    setIsAccepted(true);
  };

  const yesScale = 1 + (noClicks * 0.4);
  const noScale = Math.max(0, 1 - (noClicks * 0.33));
  const noVisible = noClicks < 3;

  const creatureStatus = isAccepted 
    ? 'dancing' 
    : noClicks > 0 
    ? 'crying' 
    : 'neutral';

  if (isAccepted) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 text-center bg-background animate-in fade-in duration-1000 relative overflow-hidden">
        <Celebration />
        
        <div className="max-w-lg w-full space-y-8 animate-float px-4 relative flex flex-col items-center">
          {/* Kissing Scene */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
             <Creature type="boy" status="kissing" className="scale-110 md:scale-125" />
             <div className="text-4xl animate-pulse">❤️</div>
             <Creature type="girl" status="kissing" flip className="scale-110 md:scale-125" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold text-foreground leading-tight">
            I Knew You'd Say Yes!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-body italic leading-relaxed">
            "I love you more than words can say. <br className="hidden sm:block" />
            Our adventure starts now, forever."
          </p>
          <div className="pt-6 md:pt-10 flex justify-center items-center gap-4">
            <HeartIcon className="w-8 h-8 md:w-12 md:h-12 text-primary animate-heart-beat" />
            <span className="text-3xl md:text-4xl">💍🌹</span>
            <HeartIcon className="w-8 h-8 md:w-12 md:h-12 text-primary animate-heart-beat" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4 bg-background relative overflow-hidden selection:bg-accent/20 cursor-none">
      {/* Boy Character Cursor */}
      <div 
        className="fixed pointer-events-none z-[100] transition-all duration-150 ease-out hidden md:block"
        style={{ 
          left: `${mousePos.x}px`, 
          top: `${mousePos.y}px`,
          transform: `translate(-50%, -50%) scale(0.5)`
        }}
      >
        <Creature type="boy" status={creatureStatus === 'crying' ? 'crying' : 'neutral'} />
      </div>

      {/* Randomly moving crying girl */}
      {creatureStatus === 'crying' && creaturePos && (
        <div 
          className="fixed z-50 transition-all duration-1000 ease-in-out pointer-events-none transform scale-75 md:scale-100"
          style={{ 
            left: `${creaturePos.x}px`, 
            top: `${creaturePos.y}px` 
          }}
        >
          <Creature type="girl" status="crying" />
        </div>
      )}

      <div className="max-w-2xl w-full text-center space-y-8 md:space-y-12 z-10">
        <div className="space-y-4 md:space-y-6">
          {creatureStatus === 'neutral' && (
            <Creature type="girl" status="neutral" className="mb-4 md:mb-8 scale-90 md:scale-100" />
          )}
          
          {creatureStatus === 'crying' && (
            <div className="h-[120px] md:h-[150px] mb-4 md:mb-8" />
          )}

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-headline font-semibold text-foreground leading-tight px-2">
            Do you love me? <br />
            <span className="text-primary">Want to marry me??</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 min-h-[180px] md:min-h-[250px] px-4">
          <Button
            size="lg"
            onClick={handleYesClick}
            className={cn(
              "bg-accent hover:bg-accent/90 text-white font-headline rounded-full shadow-2xl transition-all duration-500 transform active:scale-95 z-10 cursor-pointer",
              "text-xl sm:text-2xl px-10 sm:px-12 py-6 sm:py-8 h-auto"
            )}
            style={{ 
              transform: `scale(${yesScale})`,
              boxShadow: `0 0 ${noClicks * 10 + 20}px rgba(204, 76, 178, 0.4)` 
            }}
          >
            YES!
          </Button>

          {noVisible && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleNoClick}
              className="border-primary/50 text-muted-foreground font-headline rounded-full transition-all duration-300 transform h-auto py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg cursor-pointer"
              style={{ 
                transform: `scale(${noScale})`,
                opacity: noScale 
              }}
            >
              No
            </Button>
          )}
        </div>

        <div className="text-muted-foreground/30 font-body text-xs sm:text-sm pt-4 md:pt-8 px-4">
          He's following you everywhere...
        </div>
      </div>
    </div>
  );
}
