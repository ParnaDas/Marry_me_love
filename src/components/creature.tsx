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
        <div className="absolute top-12 w-full flex justify-center gap-10 z-20">
          <div className="w-1.5 h-4 bg-blue-300 rounded-full animate-tear shadow-sm" />
          <div className="w-1.5 h-4 bg-blue-300 rounded-full animate-tear shadow-sm" style={{ animationDelay: '0.4s' }} />
        </div>
      )}
      
      <div className={cn(
        "transition-all duration-500 origin-bottom",
        status === 'crying' && "animate-shake",
        status === 'dancing' && "animate-dance"
      )}>
        <svg
          width="140"
          height="180"
          viewBox="0 0 140 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Hair - Back layer */}
          <path
            d="M35 45C35 25 50 15 70 15C90 15 105 25 105 45V75H35V45Z"
            fill="#4B2C20"
          />
          
          {/* Pigtails */}
          <g className={cn(status === 'dancing' && "animate-bounce")}>
            <circle cx="30" cy="45" r="12" fill="#4B2C20" />
            <circle cx="110" cy="45" r="12" fill="#4B2C20" />
            {/* Ribbons */}
            <circle cx="30" cy="45" r="4" fill="#CC4CB2" />
            <circle cx="110" cy="45" r="4" fill="#CC4CB2" />
          </g>

          {/* Head / Face */}
          <circle 
            cx="70" cy="50" r="28" 
            fill={status === 'crying' ? '#FFF5F5' : '#FFEDD5'} 
            stroke="#4B2C20" 
            strokeWidth="1.5" 
          />
          
          {/* Blush */}
          {status !== 'crying' && (
            <>
              <circle cx="52" cy="58" r="4" fill="#FFB6C1" opacity="0.6" />
              <circle cx="88" cy="58" r="4" fill="#FFB6C1" opacity="0.6" />
            </>
          )}

          {/* Eyes */}
          {status === 'crying' ? (
            <>
              <path d="M58 48L64 54" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
              <path d="M76 54L82 48" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="58" cy="50" r="3.5" fill="#333" />
              <circle cx="82" cy="50" r="3.5" fill="#333" />
              {/* Eye shine */}
              <circle cx="59" cy="48.5" r="1" fill="white" />
              <circle cx="83" cy="48.5" r="1" fill="white" />
            </>
          )}

          {/* Mouth */}
          {status === 'crying' ? (
            <path d="M65 65C65 65 68 62 70 62C72 62 75 65 75 65" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />
          ) : status === 'dancing' ? (
            <path d="M62 62C62 68 78 68 78 62" fill="#B8144D" />
          ) : (
            <path d="M66 64C66 64 68 66 70 66C72 66 74 64 74 64" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          )}

          {/* Hair - Front (Bangs) */}
          <path
            d="M42 45C42 35 50 25 70 25C90 25 98 35 98 45C98 45 85 40 70 40C55 40 42 45 42 45Z"
            fill="#4B2C20"
          />

          {/* Dress */}
          <path
            d="M50 78L40 135H100L90 78H50Z"
            fill={status === 'crying' ? '#D1D5DB' : '#CC4CB2'}
            stroke={status === 'crying' ? '#9CA3AF' : '#B8144D'}
            strokeWidth="2"
          />
          {/* Dress detail (Collar) */}
          <path d="M60 78L70 85L80 78" stroke="white" strokeWidth="2" fill="none" />

          {/* Arms */}
          {status === 'dancing' ? (
            <>
              <path d="M50 90C35 80 25 75 20 80" stroke="#FFEDD5" strokeWidth="7" strokeLinecap="round" />
              <path d="M90 90C105 80 115 75 120 80" stroke="#FFEDD5" strokeWidth="7" strokeLinecap="round" />
            </>
          ) : status === 'crying' ? (
            <>
              <path d="M50 90C45 80 50 65 55 60" stroke="#FFEDD5" strokeWidth="7" strokeLinecap="round" />
              <path d="M90 90C95 80 90 65 85 60" stroke="#FFEDD5" strokeWidth="7" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M50 90C45 100 45 115 48 125" stroke="#FFEDD5" strokeWidth="7" strokeLinecap="round" />
              <path d="M90 90C95 100 95 115 92 125" stroke="#FFEDD5" strokeWidth="7" strokeLinecap="round" />
            </>
          )}

          {/* Legs */}
          <path d="M55 135V160" stroke="#333" strokeWidth="7" strokeLinecap="round" />
          <path d="M85 135V160" stroke="#333" strokeWidth="7" strokeLinecap="round" />
          {/* Shoes */}
          <rect x="48" y="155" width="14" height="6" rx="3" fill="#333" />
          <rect x="78" y="155" width="14" height="6" rx="3" fill="#333" />

          {/* Flower (Only when dancing) */}
          {status === 'dancing' && (
            <g transform="translate(120, 65) rotate(15)">
              <rect x="2" y="10" width="2" height="18" fill="#059669" />
              <circle cx="3" cy="5" r="6" fill="#FDE047" />
              <circle cx="3" cy="-1" r="5" fill="#FFF" />
              <circle cx="9" cy="5" r="5" fill="#FFF" />
              <circle cx="3" cy="11" r="5" fill="#FFF" />
              <circle cx="-3" cy="5" r="5" fill="#FFF" />
            </g>
          )}
        </svg>
      </div>

      <div className="mt-8 font-body italic text-xl text-foreground/80 text-center px-4">
        {status === 'crying' && "Please don't be mean to me... 🥺"}
        {status === 'dancing' && "I'm the luckiest girl in the world! 🌸"}
        {status === 'neutral' && "I have a special question for you... 👉👈"}
      </div>
    </div>
  );
}
