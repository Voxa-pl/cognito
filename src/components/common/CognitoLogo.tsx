'use client';

import React from 'react';

interface CognitoLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTagline?: boolean;
  iconOnly?: boolean;
  className?: string;
  animateGlow?: boolean;
}

export function CognitoLogo({
  size = 'md',
  showTagline = false,
  iconOnly = false,
  className = '',
  animateGlow = false,
}: CognitoLogoProps) {
  const sizeMap = {
    xs: { iconSize: 22, text: 'text-sm', tagline: 'text-[8px]', gap: 'gap-2' },
    sm: { iconSize: 32, text: 'text-lg', tagline: 'text-[9px]', gap: 'gap-2.5' },
    md: { iconSize: 42, text: 'text-xl', tagline: 'text-[10px]', gap: 'gap-3' },
    lg: { iconSize: 56, text: 'text-2xl sm:text-3xl', tagline: 'text-xs', gap: 'gap-3.5' },
    xl: { iconSize: 72, text: 'text-3xl sm:text-4xl', tagline: 'text-sm', gap: 'gap-4' },
    hero: { iconSize: 96, text: 'text-4xl sm:text-5xl', tagline: 'text-sm sm:text-base', gap: 'gap-5' },
  }[size];

  return (
    <div className={`flex items-center ${sizeMap.gap} select-none ${className}`}>
      {/* Prestigious Geometric Cognitive "C" Emblem */}
      <div
        className={`relative shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${
          animateGlow ? 'animate-pulse' : ''
        }`}
        style={{ width: sizeMap.iconSize, height: sizeMap.iconSize }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Primary Prismatic Blue-Cyan Gradient */}
            <linearGradient id="cog-primary" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="45%" stopColor="#1cb0f6" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Neural Energy Emerald-Cyan Gradient */}
            <linearGradient id="cog-emerald" x1="90" y1="80" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#58cc02" />
              <stop offset="60%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#1cb0f6" />
            </linearGradient>

            {/* Depth Facet Gradient */}
            <linearGradient id="cog-depth" x1="30" y1="20" x2="70" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="cog-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Prismatic Hex-Shield Background Silhouette */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="24"
            className="fill-white dark:fill-[#1e293b] stroke-[#e2e8f0] dark:stroke-[#334155]"
            strokeWidth="3"
          />

          {/* Upper Arc Facet of Geometric "C" */}
          <path
            d="M 72 26 L 42 26 C 30 26 22 34 22 46 L 22 54 C 22 66 30 74 42 74 L 72 74 L 64 62 L 44 62 C 38 62 34 58 34 52 L 34 48 C 34 42 38 38 44 38 L 64 38 Z"
            fill="url(#cog-primary)"
          />

          {/* Lower Resonance Prismatic Blade */}
          <path
            d="M 44 62 L 74 62 L 68 74 L 42 74 C 30 74 22 66 22 54 L 34 54 C 34 58 38 62 44 62 Z"
            fill="url(#cog-emerald)"
          />

          {/* Inner Geometric Diamond / Neural Focal Core */}
          <polygon
            points="58,40 68,50 58,60 48,50"
            fill="url(#cog-depth)"
            className="stroke-[#38bdf8] dark:stroke-[#00e5ff]"
            strokeWidth="1.5"
          />

          {/* Neural Synapse Resonance Sparkle (Center) */}
          <circle cx="58" cy="50" r="3.5" fill="#58cc02" className="animate-ping" style={{ transformOrigin: '58px 50px', animationDuration: '3s' }} />
          <circle cx="58" cy="50" r="3" fill="#ffffff" />

          {/* Top Right Energy Node */}
          <circle cx="72" cy="26" r="3" fill="#38bdf8" />
          <circle cx="72" cy="74" r="3" fill="#58cc02" />
        </svg>
      </div>

      {/* Typography: COGNITO */}
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center leading-none tracking-tight font-black">
            <span className={`text-[#1e293b] dark:text-[#f8fafc] ${sizeMap.text}`}>
              COG
            </span>
            <span className={`text-[#1cb0f6] ${sizeMap.text}`}>
              NI
            </span>
            <span className={`text-[#58cc02] ${sizeMap.text}`}>
              TO
            </span>
          </div>

          {showTagline && (
            <span className={`font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] mt-1 ${sizeMap.tagline}`}>
              Akademik Öğrenme Platformu &bull; Lise Programı
            </span>
          )}
        </div>
      )}
    </div>
  );
}
