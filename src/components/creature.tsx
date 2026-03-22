"use client"

import React from 'react';
import { cn } from '@/lib/utils';

interface CreatureProps {
  status: 'neutral' | 'crying' | 'dancing';
  className?: string;
}

export function Creature({ status, className }: CreatureProps) {
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Tears overlay for crying state */}
      {status === 'crying' && (
        <div className="absolute top-8 w-full flex justify-center gap-10 z-20">
          <div className="w-1.5 h-4 bg-blue-400 rounded-full animate-tear" />
          <div className="w-1.5 h-4 bg-blue-400 rounded-full animate-tear" style={{ animationDelay: '0.4s' }} />
        </div>
      )}
      
      <div className={cn(
        "transition-all duration-500 origin-bottom",
        status === 'crying' && "animate-shake",
        status === 'dancing' && "animate-dance"
      )}>
        <svg
          width="120"
          height="160"
          viewBox="0 0 120 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-xl"
        >
          {/* Head */}
          <circle 
            cx="60" cy="45" r="25" 
            fill={status === 'crying' ? '#F3F4F6' : '#FFEDD5'} 
            stroke={status === 'crying' ? '#9CA3AF' : '#B8144D'} 
            strokeWidth="3" 
          />
          
          {/* Eyes */}
          {status === 'crying' ? (
            <>
              <path d="M50 42L55 47" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
              <path d="M65 47L70 42" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="52" cy="42" r="3" fill="#333" />
              <circle cx="68" cy="42" r="3" fill="#333" />
            </>
          )}

          {/* Mouth */}
          {status === 'crying' ? (
            <path d="M55 58C55 58 58 54 60 54C62 54 65 58 65 58" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
          ) : status === 'dancing' ? (
            <path d="M52 55C52 62 68 62 68 55" fill="#B8144D" />
          ) : (
            <path d="M55 55C55 55 58 58 60 58C62 58 65 55 65 55" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          )}

          {/* Torso / Clothes */}
          <path
            d="M40 70C40 70 30 110 35 120H85C90 110 80 70 80 70H40Z"
            fill={status === 'crying' ? '#D1D5DB' : '#CC4CB2'}
            stroke={status === 'crying' ? '#9CA3AF' : '#B8144D'}
            strokeWidth="2"
          />

          {/* Arms */}
          {status === 'dancing' ? (
            <>
              {/* Joyful waving arms */}
              <path d="M40 85C30 75 20 70 15 75" stroke="#FFEDD5" strokeWidth="8" strokeLinecap="round" />
              <path d="M80 85C90 75 100 70 105 75" stroke="#FFEDD5" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : status === 'crying' ? (
            <>
              {/* Hands covering face slightly */}
              <path d="M40 85C35 75 40 60 45 55" stroke="#F3F4F6" strokeWidth="8" strokeLinecap="round" />
              <path d="M80 85C85 75 80 60 75 55" stroke="#F3F4F6" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Natural standing arms */}
              <path d="M40 85C35 95 35 110 38 120" stroke="#FFEDD5" strokeWidth="8" strokeLinecap="round" />
              <path d="M80 85C85 95 85 110 82 120" stroke="#FFEDD5" strokeWidth="8" strokeLinecap="round" />
            </>
          )}

          {/* Legs */}
          <path d="M45 120V145" stroke="#333" strokeWidth="8" strokeLinecap="round" />
          <path d="M75 120V145" stroke="#333" strokeWidth="8" strokeLinecap="round" />

          {/* Flower (Only when dancing) */}
          {status === 'dancing' && (
            <g transform="translate(100, 60) rotate(10)">
              <rect x="2" y="10" width="2" height="15" fill="#059669" />
              <circle cx="3" cy="5" r="5" fill="#FDE047" />
              <circle cx="3" cy="0" r="4" fill="#FFF" />
              <circle cx="8" cy="5" r="4" fill="#FFF" />
              <circle cx="3" cy="10" r="4" fill="#FFF" />
              <circle cx="-2" cy="5" r="4" fill="#FFF" />
            </g>
          )}
        </svg>
      </div>

      <div className="mt-6 font-body italic text-lg text-foreground/80">
        {status === 'crying' && "Please don't break my heart... 🥺"}
        {status === 'dancing' && "You've made me the happiest! 🌸"}
        {status === 'neutral' && "I have something important to ask... 👉👈"}
      </div>
    </div>
  );
}
