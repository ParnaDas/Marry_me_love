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
          height="220"
          viewBox="0 0 160 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl w-[110px] h-[150px] md:w-[160px] md:h-[220px]"
        >
          <defs>
            <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isBoy ? "#000000" : "#3D2318"} />
              <stop offset="100%" stopColor={isBoy ? "#0a0a0a" : "#1A0F0A"} />
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

          {/* Hair - Back Layer */}
          {isBoy ? (
            <path
              d="M30 35C30 10 50 -5 80 -5C110 -5 130 10 130 35V70H30V35Z"
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
          <rect x="74" y={isBoy ? "75" : "80"} width="12" height="10" fill="#FED7AA" />

          {/* Head / Face */}
          <g 
            className={cn((isKissing || isCuddling) && (isBoy ? "rotate-[12deg] translate-x-2" : "rotate-[-12deg] translate-x-[-2]"))} 
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

            {/* Hair - Front (Thick and full for boy) */}
            {isBoy ? (
              <path
                d="M30 35C30 15 45 0 80 0C115 0 130 15 130 35C130 35 110 20 80 20C50 20 30 35 30 35Z"
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
              {/* Black Shirt (Longer for taller look) */}
              <path
                d="M50 85H110V155H50V85Z"
                fill="#121212"
                stroke="#000000"
                strokeWidth="1"
              />
              {/* Beige Pants */}
              <path
                d="M50 155H110V180H50V155Z"
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

          {/* Flower for Dancing Girl */}
          {!isBoy && isDancing && (
            <g className="animate-bounce" style={{ transform: 'translate(125px, 110px)' }}>
              <path d="M0 0Q5 -15 0 -30" stroke="#166534" strokeWidth="2" fill="none" />
              <circle cx="0" cy="-35" r="8" fill="#F472B6" />
              <circle cx="5" cy="-30" r="8" fill="#F472B6" />
              <circle cx="-5" cy="-30" r="8" fill="#F472B6" />
              <circle cx="3" cy="-40" r="8" fill="#F472B6" />
              <circle cx="-3" cy="-40" r="8" fill="#F472B6" />
              <circle cx="0" cy="-35" r="4" fill="#FDE047" />
            </g>
          )}

          {/* Arms (Hugging/Cuddling logic) */}
          {(isDancing || isKissing || isCuddling) ? (
            <>
              <path 
                d={isCuddling 
                  ? (isBoy ? "M55 105Q100 105 120 125" : "M60 115Q100 115 120 135") 
                  : (isBoy ? "M60 105Q40 95 30 100" : "M60 115Q40 105 30 110")
                } 
                stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" 
                className={cn(!isCuddling && "animate-float")} 
              />
              <path 
                d={isCuddling 
                  ? (isBoy ? "M105 105Q60 105 40 125" : "M100 115Q60 115 40 135") 
                  : (isBoy ? "M100 105Q120 95 130 100" : "M100 115Q120 105 130 110")
                } 
                stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" 
                className={cn(!isCuddling && "animate-float")} 
                style={{ animationDelay: '0.2s' }} 
              />
            </>
          ) : status === 'crying' ? (
            <>
              <path d={isBoy ? "M60 105Q50 90 65 75" : "M60 115Q50 100 65 85"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
              <path d={isBoy ? "M100 105Q110 90 95 75" : "M100 115Q110 100 95 85"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : isNervous ? (
            <>
              <path d={isBoy ? "M60 105Q55 115 45 125" : "M60 115Q55 125 45 135"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
              <path d={isBoy ? "M100 105Q105 115 115 125" : "M100 115Q105 125 115 135"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d={isBoy ? "M60 105Q55 115 55 135" : "M60 115Q55 125 55 145"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
              <path d={isBoy ? "M100 105Q105 125 105 135" : "M100 115Q105 125 105 145"} stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
            </>
          )}

          {/* Legs (Boys legs remain stable when nervous) */}
          {isBoy && (
            <g className={cn(status === 'crying' && "animate-run-legs")}>
              <g className={cn(status === 'crying' && "animate-leg-left")}>
                <path d="M68 180V215" stroke="#F5F5DC" strokeWidth="10" strokeLinecap="round" />
                <rect x="58" y="210" width="22" height="10" rx="5" fill="#1A1A1A" />
              </g>
              <g className={cn(status === 'crying' && "animate-leg-right")}>
                <path d="M92 180V215" stroke="#F5F5DC" strokeWidth="10" strokeLinecap="round" />
                <rect x="82" y="210" width="22" height="10" rx="5" fill="#1A1A1A" />
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
