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
      {status === 'crying' && (
        <>
          <div className="absolute top-10 left-8 w-1 h-3 bg-blue-400 rounded-full animate-tear" />
          <div className="absolute top-10 right-8 w-1 h-3 bg-blue-400 rounded-full animate-tear" style={{ animationDelay: '0.4s' }} />
        </>
      )}
      
      <div className={cn(
        "transition-all duration-500",
        status === 'crying' && "animate-shake",
        status === 'dancing' && "animate-dance"
      )}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Main Body */}
          <path
            d="M20 80C20 50 40 30 60 30C80 30 100 50 100 80C100 100 80 110 60 110C40 110 20 100 20 80Z"
            fill={status === 'crying' ? '#E5E7EB' : '#FFD6E0'}
            stroke={status === 'crying' ? '#9CA3AF' : '#B8144D'}
            strokeWidth="3"
          />
          
          {/* Eyes */}
          {status === 'crying' ? (
            <>
              <path d="M40 65L50 70" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
              <path d="M70 70L80 65" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="45" cy="65" r="4" fill="#333" />
              <circle cx="75" cy="65" r="4" fill="#333" />
            </>
          )}

          {/* Mouth */}
          {status === 'crying' ? (
            <path d="M50 90C50 90 55 85 60 85C65 85 70 90 70 90" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
          ) : status === 'dancing' ? (
            <path d="M45 85C45 95 75 95 75 85" fill="#B8144D" />
          ) : (
            <path d="M50 85C50 85 55 90 60 90C65 90 70 85 70 85" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          )}

          {/* Flower (Only when dancing) */}
          {status === 'dancing' && (
            <g transform="translate(85, 40) rotate(15)">
              <rect x="2" y="10" width="2" height="20" fill="#059669" />
              <circle cx="3" cy="5" r="5" fill="#FDE047" />
              <circle cx="3" cy="0" r="4" fill="#FFF" />
              <circle cx="8" cy="5" r="4" fill="#FFF" />
              <circle cx="3" cy="10" r="4" fill="#FFF" />
              <circle cx="-2" cy="5" r="4" fill="#FFF" />
            </g>
          )}
        </svg>
      </div>

      <div className="mt-4 font-body italic text-lg text-foreground/80">
        {status === 'crying' && "Oh no... please don't! 🥺"}
        {status === 'dancing' && "Yay! I'm so happy! 🌸"}
        {status === 'neutral' && "I have a question... 👉👈"}
      </div>
    </div>
  );
}
