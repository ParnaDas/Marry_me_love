"use client"

import React, { useEffect, useState } from 'react';

export function Celebration() {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; color: string }>>([]);

  useEffect(() => {
    const colors = ['#B8144D', '#CC4CB2', '#FFFFFF', '#FFD700', '#FF69B4'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-20px] w-3 h-3 rounded-full animate-confetti"
          style={{
            left: p.left,
            animationDelay: p.delay,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}
