"use client"

import React from 'react';
import { cn } from '@/lib/utils';

interface CreatureProps {
  status: 'neutral' | 'crying' | 'dancing';
  type?: 'girl' | 'boy';
  className?: string;
}

export function Creature({ status, type = 'girl', className }: CreatureProps) {
  const isBoy = type === 'boy';

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
              <stop offset="0%" stopColor={isBoy ? "#2D1A12" : "#4A2B1F"} />
              <stop offset="100%" stopColor="#1A0D08" />
            </linearGradient>
            <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFEDD5" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>
            <linearGradient id="clothesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isBoy ? "#3B82F6" : "#D946EF"} />
              <stop offset="100%" stopColor={isBoy ? "#1E40AF" : "#A21CAF"} />
            </linearGradient>
          </defs>

          {/* Hair - Back Layer */}
          {isBoy ? (
            <path
              d="M45 40C45 25 60 15 80 15C100 15 115 25 115 40V65H45V40Z"
              fill="url(#hairGradient)"
            />
          ) : (
            <>
              <path
                d="M40 50C40 30 55 20 80 20C105 20 120 30 120 50V85H40V50Z"
                fill="url(#hairGradient)"
              />
              <g className={cn(
                status === 'dancing' && "animate-bounce",
                status === 'crying' && "animate-float"
              )}>
                <path d="M25 50C15 50 10 70 25 85C30 85 35 75 35 60" fill="url(#hairGradient)" />
                <circle cx="35" cy="55" r="6" fill="#F472B6" />
                <path d="M135 50C145 50 150 70 135 85C130 85 125 75 125 60" fill="url(#hairGradient)" />
                <circle cx="125" cy="55" r="6" fill="#F472B6" />
              </g>
            </>
          )}

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
            <g className={cn("origin-center", status === 'dancing' ? 'animate-pulse' : 'animate-blink')}>
              <circle cx="65" cy="58" r="6" fill="#1A1A1A" />
              <circle cx="67" cy="56" r="2.5" fill="white" />
              <circle cx="95" cy="58" r="6" fill="#1A1A1A" />
              <circle cx="97" cy="56" r="2.5" fill="white" />
            </g>
          )}

          {/* Nose */}
          <path d="M78 65Q80 67 82 65" stroke="#D19E7A" strokeWidth="1" fill="none" />

          {/* Mouth */}
          {status === 'crying' ? (
            <path d="M70 75Q80 70 90 75" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
          ) : status === 'dancing' ? (
            <path d="M72 72Q80 82 88 72" fill={isBoy ? "#1E40AF" : "#BE185D"} />
          ) : (
            <path d="M75 74Q80 76 85 74" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
          )}

          {/* Hair - Front */}
          {isBoy ? (
            <path
              d="M45 40C45 30 55 20 80 20C105 20 115 30 115 40C115 40 100 35 80 35C60 35 45 40 45 40Z"
              fill="url(#hairGradient)"
            />
          ) : (
            <path
              d="M45 50C45 35 55 25 80 25C105 25 115 35 115 50C115 50 100 42 80 42C60 42 45 50 45 50Z"
              fill="url(#hairGradient)"
            />
          )}

          {/* Torso */}
          {isBoy ? (
            <path
              d="M55 90H105V150H55V90Z"
              fill="url(#clothesGradient)"
              stroke="#1E3A8A"
              strokeWidth="1.5"
            />
          ) : (
            <path
              d="M60 90L45 150H115L100 90H60Z"
              fill={status === 'crying' ? '#F3F4F6' : 'url(#clothesGradient)'}
              stroke={status === 'crying' ? '#9CA3AF' : '#86198F'}
              strokeWidth="1.5"
            />
          )}

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

          {/* Legs */}
          <g className={cn(status === 'crying' && "animate-run-legs")}>
            <g className={cn(status === 'crying' && "animate-leg-left")}>
              <path d="M68 150V180" stroke="#374151" strokeWidth="8" strokeLinecap="round" />
              <rect x="60" y="176" width="18" height="8" rx="4" fill="#1F2937" />
            </g>
            <g className={cn(status === 'crying' && "animate-leg-right")}>
              <path d="M92 150V180" stroke="#374151" strokeWidth="8" strokeLinecap="round" />
              <rect x="84" y="176" width="18" height="8" rx="4" fill="#1F2937" />
            </g>
          </g>

          {/* Flower / Special Item */}
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
          {isBoy && status === 'neutral' && (
             <g transform="translate(115, 125) rotate(-15)">
                <circle cx="0" cy="0" r="4" fill="#FFD700" stroke="#B8860B" />
                <path d="M0 -4 L0 -8" stroke="#B8860B" strokeWidth="1" />
             </g>
          )}
        </svg>
      </div>

      <div className="mt-4 md:mt-8 font-body italic text-lg md:text-xl text-foreground/90 text-center px-4 max-w-[280px] drop-shadow-sm">
        {status === 'crying' && "Wait! Why are you running away? 🥺"}
        {status === 'dancing' && (isBoy ? "She said YES! My heart is full! 🌟" : "My heart is dancing with you! 🌸")}
        {status === 'neutral' && (isBoy ? "I'm so nervous... 💍" : "I have a special question... 👉👈")}
      </div>
    </div>
  );
}
