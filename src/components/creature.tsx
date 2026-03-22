"use client"

import React from 'react';
import { cn } from '@/lib/utils';

interface CreatureProps {
  status: 'neutral' | 'crying' | 'dancing' | 'kissing' | 'nervous' | 'cuddling';
  type?: 'girl' | 'boy';
  className?: string;
  flip?: boolean;
}

export function Creature({ status, type = 'girl', className, flip }: CreatureProps) {
  const isBoy = type === 'boy';
  const isKissing = status === 'kissing';
  const isNervous = status === 'nervous';
  const isCuddling = status === 'cuddling';
  const isDancing = status === 'dancing';

  return (
    <div className={cn(
      "relative flex flex-col items-center select-none transition-transform duration-500",
      flip && "scale-x-[-1]",
      className
    )}>
      {/* Tears overlay for crying state */}
      {status === 'crying' && (
        <div className={cn(
          "absolute w-full flex justify-center gap-10 md:gap-12 z-20",
          isBoy ? "top-10 md:top-12" : "top-12 md:top-14"
        )}>
          <div className="w-1.5 md:w-2 h-4 md:h-5 bg-blue-300/80 rounded-full animate-tear shadow-sm" />
          <div className="w-1.5 md:w-2 h-4 md:h-5 bg-blue-300/80 rounded-full animate-tear shadow-sm" style={{ animationDelay: '0.4s' }} />
        </div>
      )}

      {/* Sweat drop for nervous state */}
      {isNervous && (
        <div className="absolute top-6 left-1/2 ml-8 z-30">
          <div className="w-1.5 h-3 bg-blue-200 rounded-full animate-tear opacity-70" />
        </div>
      )}
      
      <div className={cn(
        "transition-all duration-500 origin-bottom",
        (status === 'crying' || isNervous) && "animate-shake",
        isDancing && "animate-dance",
        (isKissing || isCuddling) && "animate-float"
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
              <stop offset="0%" stopColor={isBoy ? "#000000" : "#3D2318"} />
              <stop offset="100%" stopColor={isBoy ? "#1a1a1a" : "#1A0F0A"} />
            </linearGradient>
            <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFEDD5" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>
            <linearGradient id="gownGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B8144D" />
              <stop offset="100%" stopColor="#800C32" />
            </linearGradient>
          </defs>

          {/* Hair - Back Layer (Thicker for boy) */}
          {isBoy ? (
            <path
              d="M35 30C35 10 50 0 80 0C110 0 125 10 125 30V65H35V30Z"
              fill="url(#hairGradient)"
            />
          ) : (
            <>
              <path
                d="M40 50C40 30 55 20 80 20C105 20 120 30 120 50V85H40V50Z"
                fill="url(#hairGradient)"
              />
              <g className={cn(
                isDancing && "animate-bounce",
                (status === 'crying' || isKissing || isCuddling) && "animate-float"
              )}>
                <path d="M25 50C15 50 10 70 25 85C30 85 35 75 35 60" fill="url(#hairGradient)" />
                <circle cx="35" cy="55" r="6" fill="#F472B6" />
                <path d="M135 50C145 50 150 70 135 85C130 85 125 75 125 60" fill="url(#hairGradient)" />
                <circle cx="125" cy="55" r="6" fill="#F472B6" />
              </g>
            </>
          )}

          {/* Neck */}
          <rect x="74" y={isBoy ? "70" : "80"} width="12" height="10" fill="#FED7AA" />

          {/* Head / Face */}
          <g 
            className={cn((isKissing || isCuddling) && (isBoy ? "rotate-[10deg] translate-x-1" : "rotate-[-10deg] translate-x--1"))} 
            style={{ transformOrigin: isBoy ? '80px 45px' : '80px 55px' }}
          >
            <circle 
              cx="80" cy={isBoy ? "45" : "55"} r="35" 
              fill={status === 'crying' ? '#FFF5F5' : 'url(#skinGradient)'} 
              stroke="#2D1A12" 
              strokeWidth="1" 
            />
            
            {/* Ears */}
            <circle cx="45" cy={isBoy ? "45" : "55"} r="6" fill="url(#skinGradient)" stroke="#2D1A12" strokeWidth="0.5" />
            <circle cx="115" cy={isBoy ? "45" : "55"} r="6" fill="url(#skinGradient)" stroke="#2D1A12" strokeWidth="0.5" />

            {/* Blush */}
            {(status === 'neutral' || isDancing || isKissing || isCuddling) && (
              <>
                <circle cx="60" cy={isBoy ? "58" : "68"} r="6" fill="#FCA5A5" opacity="0.6" />
                <circle cx="100" cy={isBoy ? "58" : "68"} r="6" fill="#FCA5A5" opacity="0.6" />
              </>
            )}

            {/* Eyes */}
            {status === 'crying' ? (
              <>
                <path d={isBoy ? "M62 48Q70 42 78 48" : "M62 58Q70 52 78 58"} stroke="#4B5563" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d={isBoy ? "M82 48Q90 42 98 48" : "M82 58Q90 52 98 58"} stroke="#4B5563" strokeWidth="3" strokeLinecap="round" fill="none" />
              </>
            ) : isNervous ? (
              <>
                <circle cx="65" cy={isBoy ? "48" : "58"} r="3.5" fill="#1A1A1A" className="animate-pulse" />
                <circle cx="95" cy={isBoy ? "48" : "58"} r="3.5" fill="#1A1A1A" className="animate-pulse" />
              </>
            ) : (isKissing || isCuddling) ? (
              <>
                <path d={isBoy ? "M60 48Q65 44 70 48" : "M60 58Q65 54 70 58"} stroke="#1A1A1A" strokeWidth="2" fill="none" />
                <path d={isBoy ? "M90 48Q95 44 100 48" : "M90 58Q95 54 100 58"} stroke="#1A1A1A" strokeWidth="2" fill="none" />
              </>
            ) : (
              <g className={cn("origin-center", isDancing ? 'animate-pulse' : 'animate-blink')}>
                <circle cx="65" cy={isBoy ? "48" : "58"} r="6" fill="#1A1A1A" />
                <circle cx="67" cy={isBoy ? "46" : "56"} r="2.5" fill="white" />
                <circle cx="95" cy={isBoy ? "48" : "58"} r="6" fill="#1A1A1A" />
                <circle cx="97" cy={isBoy ? "46" : "56"} r="2.5" fill="white" />
              </g>
            )}

            {/* Mouth */}
            {(isKissing || isCuddling) ? (
              <path d={isBoy ? "M75 65Q80 70 85 65" : "M75 75Q80 80 85 75"} stroke="#B8144D" strokeWidth="3" strokeLinecap="round" />
            ) : status === 'crying' ? (
              <path d={isBoy ? "M70 65Q80 60 90 65" : "M70 75Q80 70 90 75"} stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
            ) : isNervous ? (
              <path d={isBoy ? "M70 65Q80 62 90 65" : "M70 75Q80 72 90 75"} stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
            ) : isDancing ? (
              <path d={isBoy ? "M72 62Q80 72 88 62" : "M72 72Q80 82 88 72"} fill={isBoy ? "#1E40AF" : "#BE185D"} />
            ) : (
              <path d={isBoy ? "M75 64Q80 66 85 64" : "M75 74Q80 76 85 74"} stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
            )}

            {/* Hair - Front (Thicker for boy) */}
            {isBoy ? (
              <path
                d="M35 30C35 15 50 5 80 5C110 5 125 15 125 30C125 30 100 22 80 22C60 22 35 30 35 30Z"
                fill="url(#hairGradient)"
              />
            ) : (
              <path
                d="M45 50C45 35 55 25 80 25C105 25 115 35 115 50C115 50 100 42 80 42C60 42 45 50 45 50Z"
                fill="url(#hairGradient)"
              />
            )}
          </g>

          {/* Torso */}
          {isBoy ? (
            <>
              {/* Black Shirt */}
              <path
                d="M50 80H110V140H50V80Z"
                fill="#121212"
                stroke="#000000"
                strokeWidth="1"
              />
              {/* Beige Pants */}
              <path
                d="M50 140H110V165H50V140Z"
                fill="#F5F5DC"
                stroke="#D2B48C"
                strokeWidth="1"
              />
            </>
          ) : (
            <path
              d="M60 90L30 190H130L100 90H60Z"
              fill="url(#gownGradient)"
              stroke="#600926"
              strokeWidth="1.5"
            />
          )}

          {/* Arms (Hugging/Cuddling logic) */}
          {(isDancing || isKissing || isCuddling) ? (
            <>
              <path 
                d={isCuddling 
                  ? (isBoy ? "M55 95Q100 95 120 110" : "M60 105Q100 105 120 120") 
                  : (isBoy ? "M60 95Q40 85 30 90" : "M60 105Q40 95 30 100")
                } 
                stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" 
                className={cn(!isCuddling && "animate-float")} 
              />
              <path 
                d={isCuddling 
                  ? (isBoy ? "M105 95Q60 95 40 110" : "M100 105Q60 105 40 120") 
                  : (isBoy ? "M100 95Q120 85 130 90" : "M100 105Q120 95 130 100")
                } 
                stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" 
                className={cn(!isCuddling && "animate-float")} 
                style={{ animationDelay: '0.2s' }} 
              />
            </>
          ) : status === 'crying' ? (
            <>
              <path d={isBoy ? "M60 95Q50 80 65 65" : "M60 105Q50 90 65 75"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
              <path d={isBoy ? "M100 95Q110 80 95 65" : "M100 105Q110 90 95 75"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : isNervous ? (
            <>
              <path d={isBoy ? "M60 95Q55 105 45 115" : "M60 105Q55 115 45 125"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
              <path d={isBoy ? "M100 95Q105 105 115 115" : "M100 105Q105 115 115 125"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d={isBoy ? "M60 95Q55 105 55 125" : "M60 105Q55 115 55 135"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
              <path d={isBoy ? "M100 95Q105 115 105 125" : "M100 105Q105 115 105 135"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
            </>
          )}

          {/* Legs (Show boy legs unless cuddling close-up) */}
          {isBoy && (
            <g className={cn((status === 'crying' || isNervous) && "animate-run-legs")}>
              <g className={cn((status === 'crying' || isNervous) && "animate-leg-left")}>
                <path d="M68 150V195" stroke="#F5F5DC" strokeWidth="10" strokeLinecap="round" />
                <rect x="58" y="190" width="22" height="10" rx="5" fill="#1A1A1A" />
              </g>
              <g className={cn((status === 'crying' || isNervous) && "animate-leg-right")}>
                <path d="M92 150V195" stroke="#F5F5DC" strokeWidth="10" strokeLinecap="round" />
                <rect x="82" y="190" width="22" height="10" rx="5" fill="#1A1A1A" />
              </g>
            </g>
          )}
        </svg>
      </div>

      <div className="mt-2 font-body italic text-sm md:text-base text-foreground/80 text-center px-4 max-w-[280px]">
        {status === 'crying' && "Please don't go... 🥺"}
        {isCuddling && "Forever in your arms! ❤️"}
        {isKissing && "A fairy tale ending! 💋"}
        {isNervous && "She looks upset... oh no! 😰"}
        {isDancing && (isBoy ? "She said YES! 🌟" : "My heart is dancing! 🌸")}
      </div>
    </div>
  );
}
