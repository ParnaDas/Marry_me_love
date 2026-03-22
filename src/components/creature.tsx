"use client"

import React from 'react';
import { cn } from '@/lib/utils';

interface CreatureProps {
  status: 'neutral' | 'crying' | 'dancing';
  className?: string;
}

export function Creature({ status, className }: CreatureProps) {
  return (
    <div className={cn("relative flex flex-col items-center select-none", className)}>
      {/* Tears overlay for crying state */}
      {status === 'crying' && (
        <div className="absolute top-12 md:top-14 w-full flex justify-center gap-10 md:gap-12 z-20">
          <div className="w-1.5 md:w-2 h-4 md:h-5 bg-blue-300/80 rounded-full animate-tear shadow-sm" />
          <div className="w-1.5 md:w-2 h-4 md:h-5 bg-blue-300/80 rounded-full animate-tear shadow-sm" style={{ animationDelay: '0.4s' }} />
        </div>
      )}
      
      <div className={cn(
        "transition-all duration-500 origin-bottom",
        status === 'crying' && "animate-shake",
        status === 'dancing' && "animate-dance"
      )}>
        <svg
          width="160"
          height="200"
          viewBox="0 0 160 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl w-[110px] h-[140px] md:w-[160px] md:h-[200px]"
        >
          <defs>
            <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A2B1F" />
              <stop offset="100%" stopColor="#2D1A12" />
            </linearGradient>
            <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFEDD5" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>
            <linearGradient id="dressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D946EF" />
              <stop offset="100%" stopColor="#A21CAF" />
            </linearGradient>
          </defs>

          {/* Hair - Back Layer */}
          <path
            d="M40 50C40 30 55 20 80 20C105 20 120 30 120 50V85H40V50Z"
            fill="url(#hairGradient)"
          />
          
          {/* Pigtails with movement */}
          <g className={cn(
            status === 'dancing' && "animate-bounce",
            status === 'crying' && "animate-float"
          )}>
            {/* Left Pigtail */}
            <path d="M25 50C15 50 10 70 25 85C30 85 35 75 35 60" fill="url(#hairGradient)" />
            <circle cx="35" cy="55" r="6" fill="#F472B6" /> {/* Ribbon */}
            
            {/* Right Pigtail */}
            <path d="M135 50C145 50 150 70 135 85C130 85 125 75 125 60" fill="url(#hairGradient)" />
            <circle cx="125" cy="55" r="6" fill="#F472B6" /> {/* Ribbon */}
          </g>

          {/* Neck */}
          <rect x="74" y="80" width="12" height="10" fill="#FED7AA" />

          {/* Head / Face */}
          <circle 
            cx="80" cy="55" r="35" 
            fill={status === 'crying' ? '#FFF5F5' : 'url(#skinGradient)'} 
            stroke="#2D1A12" 
            strokeWidth="1" 
          />
          
          {/* Ears */}
          <circle cx="45" cy="55" r="6" fill="url(#skinGradient)" stroke="#2D1A12" strokeWidth="0.5" />
          <circle cx="115" cy="55" r="6" fill="url(#skinGradient)" stroke="#2D1A12" strokeWidth="0.5" />

          {/* Blush */}
          {(status === 'neutral' || status === 'dancing') && (
            <>
              <circle cx="60" cy="68" r="6" fill="#FCA5A5" opacity="0.4" />
              <circle cx="100" cy="68" r="6" fill="#FCA5A5" opacity="0.4" />
            </>
          )}

          {/* Eyes */}
          {status === 'crying' ? (
            <>
              <path d="M62 58Q70 52 78 58" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M82 58Q90 52 98 58" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <g className={cn("origin-center", status === 'dancing' ? 'animate-pulse' : 'animate-blink')}>
                {/* Left Eye */}
                <circle cx="65" cy="58" r="6" fill="#1A1A1A" />
                <circle cx="67" cy="56" r="2.5" fill="white" /> {/* Reflection */}
                <path d="M58 52Q65 48 72 52" stroke="#1A1A1A" strokeWidth="1" fill="none" /> {/* Eyelashes area */}
                
                {/* Right Eye */}
                <circle cx="95" cy="58" r="6" fill="#1A1A1A" />
                <circle cx="97" cy="56" r="2.5" fill="white" /> {/* Reflection */}
                <path d="M88 52Q95 48 102 52" stroke="#1A1A1A" strokeWidth="1" fill="none" /> {/* Eyelashes area */}
              </g>
            </>
          )}

          {/* Nose */}
          <path d="M78 65Q80 67 82 65" stroke="#D19E7A" strokeWidth="1" fill="none" />

          {/* Mouth */}
          {status === 'crying' ? (
            <path d="M70 75Q80 70 90 75" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
          ) : status === 'dancing' ? (
            <path d="M72 72Q80 82 88 72" fill="#BE185D" />
          ) : (
            <path d="M75 74Q80 76 85 74" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
          )}

          {/* Hair - Front (Bangs) */}
          <path
            d="M45 50C45 35 55 25 80 25C105 25 115 35 115 50C115 50 100 42 80 42C60 42 45 50 45 50Z"
            fill="url(#hairGradient)"
          />
          <path d="M75 25Q80 35 85 25" stroke="#5D3A29" strokeWidth="1" fill="none" opacity="0.5" />

          {/* Dress */}
          <path
            d="M60 90L45 150H115L100 90H60Z"
            fill={status === 'crying' ? '#F3F4F6' : 'url(#dressGradient)'}
            stroke={status === 'crying' ? '#9CA3AF' : '#86198F'}
            strokeWidth="1.5"
          />
          {/* Dress Details - Collar */}
          <path d="M60 90Q80 105 100 90" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
          <circle cx="80" cy="115" r="3" fill="white" opacity="0.4" />
          <circle cx="80" cy="130" r="3" fill="white" opacity="0.4" />

          {/* Arms */}
          {status === 'dancing' ? (
            <>
              <path d="M60 105Q40 95 30 100" stroke="#FED7AA" strokeWidth="7" strokeLinecap="round" className="animate-float" />
              <path d="M100 105Q120 95 130 100" stroke="#FED7AA" strokeWidth="7" strokeLinecap="round" className="animate-float" style={{ animationDelay: '0.2s' }} />
            </>
          ) : status === 'crying' ? (
            <>
              <path d="M60 105Q50 90 65 75" stroke="#FED7AA" strokeWidth="7" strokeLinecap="round" />
              <path d="M100 105Q110 90 95 75" stroke="#FED7AA" strokeWidth="7" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M60 105Q55 115 55 135" stroke="#FED7AA" strokeWidth="7" strokeLinecap="round" />
              <path d="M100 105Q105 115 105 135" stroke="#FED7AA" strokeWidth="7" strokeLinecap="round" />
            </>
          )}

          {/* Legs with Specific Running Animation */}
          <g className={cn(status === 'crying' && "animate-run-legs")}>
            <g className={cn(status === 'crying' && "animate-leg-left")}>
              <path d="M68 150V175" stroke="#374151" strokeWidth="8" strokeLinecap="round" />
              <rect x="60" y="172" width="18" height="8" rx="4" fill="#1F2937" /> {/* Shoe */}
            </g>
            <g className={cn(status === 'crying' && "animate-leg-right")}>
              <path d="M92 150V175" stroke="#374151" strokeWidth="8" strokeLinecap="round" />
              <rect x="84" y="172" width="18" height="8" rx="4" fill="#1F2937" /> {/* Shoe */}
            </g>
          </g>

          {/* Flower (Only when dancing) */}
          {status === 'dancing' && (
            <g transform="translate(135, 75) rotate(15)">
              <rect x="2" y="10" width="2" height="25" fill="#10B981" />
              <circle cx="3" cy="5" r="8" fill="#FDE047" />
              <circle cx="3" cy="-3" r="7" fill="#FFF" />
              <circle cx="11" cy="5" r="7" fill="#FFF" />
              <circle cx="3" cy="13" r="7" fill="#FFF" />
              <circle cx="-5" cy="5" r="7" fill="#FFF" />
            </g>
          )}
        </svg>
      </div>

      <div className="mt-4 md:mt-8 font-body italic text-lg md:text-xl text-foreground/90 text-center px-4 max-w-[280px] drop-shadow-sm">
        {status === 'crying' && "Wait! Why are you running away? 🥺"}
        {status === 'dancing' && "My heart is dancing with you! 🌸"}
        {status === 'neutral' && "I have a special question... 👉👈"}
      </div>
    </div>
  );
}
