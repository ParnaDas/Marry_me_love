"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/ui/heart-icon";
import { Celebration } from "@/components/celebration";
import { Creature } from "@/components/creature";

export default function ProposalPage() {
  const [noClicks, setNoClicks] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleNoClick = () => {
    if (noClicks < 3) {
      setNoClicks(prev => prev + 1);
    }
  };

  const handleYesClick = () => {
    setIsAccepted(true);
  };

  // Aggressive scaling so YES grows significantly as NO shrinks
  const yesScale = 1 + (noClicks * 0.6);
  const noScale = Math.max(0, 1 - (noClicks * 0.33));
  const noVisible = noClicks < 3;

  const creatureStatus = isAccepted 
    ? 'dancing' 
    : noClicks > 0 
    ? 'crying' 
    : 'neutral';

  if (isAccepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background animate-in fade-in duration-1000">
        <Celebration />
        <div className="max-w-md space-y-8 animate-float">
          <Creature status="dancing" className="scale-150 mb-12" />
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground">
            I Knew You'd Say Yes!
          </h1>
          <p className="text-2xl text-muted-foreground font-body italic leading-relaxed">
            "I love you more than words can say. <br />
            Our adventure starts now, forever."
          </p>
          <div className="pt-10 flex justify-center gap-4">
            <HeartIcon className="w-12 h-12 text-primary animate-heart-beat" />
            <span className="text-4xl">💍🌹</span>
            <HeartIcon className="w-12 h-12 text-primary animate-heart-beat" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="space-y-6">
          <Creature status={creatureStatus} className="mb-8" />
          <h1 className="text-4xl md:text-6xl font-headline font-semibold text-foreground leading-tight px-4">
            Do you love me? <br />
            <span className="text-primary">Want to marry me??</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 min-h-[250px]">
          <Button
            size="lg"
            onClick={handleYesClick}
            className="bg-accent hover:bg-accent/90 text-white font-headline text-2xl px-12 py-8 rounded-full shadow-2xl transition-all duration-500 transform active:scale-95 z-10"
            style={{ 
              transform: `scale(${yesScale})`,
              boxShadow: `0 0 ${noClicks * 15 + 25}px rgba(204, 76, 178, 0.4)` 
            }}
          >
            YES!
          </Button>

          {noVisible && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleNoClick}
              className="border-primary/50 text-muted-foreground font-headline text-lg px-8 py-4 rounded-full transition-all duration-300 transform"
              style={{ 
                transform: `scale(${noScale})`,
                opacity: noScale 
              }}
            >
              No
            </Button>
          )}
        </div>

        <div className="text-muted-foreground/30 font-body text-sm pt-8">
          Made with love, specifically for you.
        </div>
      </div>
    </div>
  );
}
