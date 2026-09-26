'use client';

import React, { useEffect, useState } from 'react';
import { CognitoLogo } from './CognitoLogo';

interface AppLoadingScreenProps {
  message?: string;
  isReady?: boolean;
  onAnimationComplete?: () => void;
}

const statusMessages = [
  'Bilişsel Sistemler Başlatılıyor...',
  'Akademik Kazanım Matrisi Yükleniyor...',
  'Akademik Güvenlik & Doğrulama Katmanı Kontrol Ediliyor...',
  'Kişisel Öğrenme Rotası Hazırlanıyor...',
];

export function AppLoadingScreen({
  message,
  isReady = false,
  onAnimationComplete,
}: AppLoadingScreenProps) {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % statusMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isReady) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (onAnimationComplete) onAnimationComplete();
      }, 500); // 500ms fade transition
      return () => clearTimeout(timer);
    } else {
      setFadeOut(false);
      setShouldRender(true);
    }
  }, [isReady, onAnimationComplete]);

  if (!shouldRender) return null;

  const currentStatus = message || statusMessages[activeMessageIndex];

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0f172a] text-white transition-opacity duration-500 ease-out select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      {/* Ambient background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1cb0f6]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#58cc02]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Pulsating Emblem with Multi-ring Aura */}
        <div className="relative mb-8">
          {/* Animated Ring 1 */}
          <div className="absolute -inset-4 rounded-full border border-[#1cb0f6]/30 animate-ping opacity-25" style={{ animationDuration: '2.5s' }} />
          {/* Animated Ring 2 */}
          <div className="absolute -inset-2 rounded-full border border-[#58cc02]/40 animate-pulse" />

          {/* Cognito Logo */}
          <div className="relative p-3 rounded-3xl bg-[#1e293b]/80 border-2 border-[#334155] shadow-2xl backdrop-blur-md">
            <CognitoLogo size="xl" iconOnly animateGlow />
          </div>
        </div>

        {/* Brand Name */}
        <div className="mb-4 flex items-center justify-center gap-1 text-2xl sm:text-3xl font-black tracking-tight">
          <span className="text-white">COG</span>
          <span className="text-[#1cb0f6]">NI</span>
          <span className="text-[#58cc02]">TO</span>
        </div>

        {/* Dynamic Status Text */}
        <div className="h-6 flex items-center justify-center mb-6">
          <p className="text-xs sm:text-sm font-semibold text-[#94a3b8] tracking-wide animate-fade-in">
            {currentStatus}
          </p>
        </div>

        {/* High-tech Progress Line */}
        <div className="w-56 sm:w-64 h-1.5 bg-[#1e293b] rounded-full overflow-hidden border border-[#334155]/60 p-0.5">
          <div className="h-full bg-gradient-to-r from-[#1cb0f6] via-[#00f0ff] to-[#58cc02] rounded-full animate-indeterminate" />
        </div>

        {/* Academic Subtext */}
        <div className="mt-8 text-[11px] font-bold uppercase tracking-widest text-[#64748b]">
          BİLİŞSEL VE AKADEMİK ÖĞRENME PLATFORMU
        </div>

        {/* Referans Matrisi: MEB 2026-2027 Müfredat Matrisi */}
      </div>
    </div>
  );
}
