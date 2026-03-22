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
        <div className="absolute top-10 md:top-12 w-full flex justify-center gap-8 md:gap-10 z-20">
          <div className="w-1 md:w-1.5 h-3 md:h-4 bg-blue-300 rounded-full animate-tear shadow-sm" />
          <div className="w-1 md:w-1.5 h-3 md:h-4 bg-blue-300 rounded-full animate-tear shadow-sm" style={{ animationDelay: '0.4s' }} />
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
          className="drop-shadow-2xl w-[100px] h-[130px] md:w-[140px] md:h-[180px]"
        >
          {/* Hair - Back layer with texture */}
          <path
            d="M35 45C35 25 50 15 70 15C90 15 105 25 105 45V75H35V45Z"
            fill="#3D2419"
          />
          
          {/* Pigtails with movement */}
          <g className={cn(
            status === 'dancing' && "animate-bounce",
            status === 'crying' && "animate-float"
          )}>
            <circle cx="30" cy="45" r="14" fill="#3D2419" />
            <circle cx="110" cy="45" r="14" fill="#3D2419" />
            <path d="M20 45C20 60 30 70 35 70" stroke="#3D2419" strokeWidth="4" strokeLinecap="round" />
            <path d="M120 45C120 60 110 70 105 70" stroke="#3D2419" strokeWidth="4" strokeLinecap="round" />
            {/* Ribbons */}
            <circle cx="30" cy="45" r="5" fill="#CC4CB2" />
            <circle cx="110" cy="45" r="5" fill="#CC4CB2" />
          </g>

          {/* Head / Face */}
          <circle 
            cx="70" cy="50" r="30" 
            fill={status === 'crying' ? '#FFF5F5' : '#FFEDD5'} 
            stroke="#3D2419" 
            strokeWidth="1.5" 
          />
          
          {/* Blush */}
          {(status === 'neutral' || status === 'dancing') && (
            <>
              <circle cx="50" cy="60" r="5" fill="#FFB6C1" opacity="0.6" />
              <circle cx="90" cy="60" r="5" fill="#FFB6C1" opacity="0.6" />
            </>
          )}

          {/* Eyes - More Detailed */}
          {status === 'crying' ? (
            <>
              <path d="M55 52C55 52 60 48 65 52" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M75 52C75 52 80 48 85 52" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <g className={status === 'dancing' ? 'animate-pulse' : ''}>
                <circle cx="56" cy="52" r="4.5" fill="#1A1A1A" />
                <circle cx="84" cy="52" r="4.5" fill="#1A1A1A" />
                <circle cx="57.5" cy="50" r="1.5" fill="white" />
                <circle cx="85.5" cy="50" r="1.5" fill="white" />
              </g>
            </>
          )}

          {/* Mouth */}
          {status === 'crying' ? (
            <path d="M62 68C62 68 66 64 70 64C74 64 78 68 78 68" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
          ) : status === 'dancing' ? (
            <path d="M60 65C60 72 80 72 80 65" fill="#B8144D" />
          ) : (
            <path d="M65 66C65 66 68 69 70 69C72 69 75 66 75 66" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
          )}

          {/* Hair - Front (Bangs) with more shape */}
          <path
            d="M40 45C40 30 50 22 70 22C90 22 100 30 100 45C100 45 85 38 70 38C55 38 40 45 40 45Z"
            fill="#3D2419"
          />

          {/* Dress - Better Silhouette */}
          <path
            d="M52 80L38 140H102L88 80H52Z"
            fill={status === 'crying' ? '#E5E7EB' : '#CC4CB2'}
            stroke={status === 'crying' ? '#9CA3AF' : '#B8144D'}
            strokeWidth="2"
          />
          {/* Dress Detail */}
          <path d="M52 80Q70 95 88 80" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
          <circle cx="70" cy="110" r="3" fill="white" opacity="0.5" />
          <circle cx="55" cy="125" r="2" fill="white" opacity="0.3" />
          <circle cx="85" cy="125" r="2" fill="white" opacity="0.3" />

          {/* Arms */}
          {status === 'dancing' ? (
            <>
              <path d="M52 95C35 85 25 80 18 85" stroke="#FFEDD5" strokeWidth="8" strokeLinecap="round" className="animate-float" />
              <path d="M88 95C105 85 115 80 122 85" stroke="#FFEDD5" strokeWidth="8" strokeLinecap="round" className="animate-float" style={{ animationDelay: '0.2s' }} />
            </>
          ) : status === 'crying' ? (
            <>
              <path d="M52 95C45 85 50 70 55 65" stroke="#FFEDD5" strokeWidth="8" strokeLinecap="round" />
              <path d="M88 95C95 85 90 70 85 65" stroke="#FFEDD5" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M52 95C48 105 48 120 50 130" stroke="#FFEDD5" strokeWidth="8" strokeLinecap="round" />
              <path d="M88 95C92 105 92 120 90 130" stroke="#FFEDD5" strokeWidth="8" strokeLinecap="round" />
            </>
          )}

          {/* Legs with Specific Running Animation */}
          <g className={cn(status === 'crying' && "animate-run-legs")}>
            <g className={cn(status === 'crying' && "animate-leg-left")}>
              <path d="M58 140V165" stroke="#333" strokeWidth="8" strokeLinecap="round" />
              <rect x="50" y="160" width="16" height="7" rx="3.5" fill="#333" />
            </g>
            <g className={cn(status === 'crying' && "animate-leg-right")}>
              <path d="M82 140V165" stroke="#333" strokeWidth="8" strokeLinecap="round" />
              <rect x="74" y="160" width="16" height="7" rx="3.5" fill="#333" />
            </g>
          </g>

          {/* Flower (Only when dancing) */}
          {status === 'dancing' && (
            <g transform="translate(120, 65) rotate(15)">
              <rect x="2" y="10" width="2" height="20" fill="#059669" />
              <circle cx="3" cy="5" r="7" fill="#FDE047" />
              <circle cx="3" cy="-2" r="6" fill="#FFF" />
              <circle cx="10" cy="5" r="6" fill="#FFF" />
              <circle cx="3" cy="12" r="6" fill="#FFF" />
              <circle cx="-4" cy="5" r="6" fill="#FFF" />
            </g>
          )}
        </svg>
      </div>

      <div className="mt-4 md:mt-8 font-body italic text-lg md:text-xl text-foreground/80 text-center px-4 max-w-[250px]">
        {status === 'crying' && "Wait! Why are you running away? 🥺"}
        {status === 'dancing' && "My heart is dancing with you! 🌸"}
        {status === 'neutral' && "I have a special question... 👉👈"}
      </div>
    </div>
  );
}
