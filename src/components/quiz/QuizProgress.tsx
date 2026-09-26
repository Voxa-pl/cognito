'use client';

import { X, Shield, BookOpen } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface QuizProgressProps {
  current: number; // 0-based index
  total: number;
  mode?: 'challenge' | 'practice';
  hearts?: number;
  maxHearts?: number;
  onClose?: () => void;
}

export function QuizProgress({
  current,
  total,
  mode = 'challenge',
  hearts = 5,
  maxHearts = 5,
  onClose,
}: QuizProgressProps) {
  const percent = total > 0 ? Math.min(100, Math.round(((current) / total) * 100)) : 0;

  return (
    <div className="w-full flex items-center justify-between gap-4 py-2">
      {/* Close 'X' Button */}
      <button
        onClick={() => {
          sounds.playClick();
          if (onClose) onClose();
        }}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-[#afafaf] dark:text-[#64748b] hover:text-[#4b4b4b] dark:hover:text-[#f8fafc] hover:bg-[#f7f7f7] dark:hover:bg-[#1e293b] transition-all cursor-pointer"
        title="Çıkış Yap"
        aria-label="Testten Çıkış Yap"
      >
        <X className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Duolingo Smooth Green Progress Bar */}
      <div className="flex-1 h-4 bg-[#e5e5e5] dark:bg-[#334155] rounded-full overflow-hidden p-0.5 relative">
        <div
          className="h-full bg-[#58cc02] rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${Math.max(5, percent)}%` }}
        >
          {/* Subtle Top White Gloss Sheen */}
          <div className="absolute top-0.5 left-1 right-1 h-1 bg-white/35 rounded-full" />
        </div>
      </div>

      {/* Mode & Tolerance Indicator */}
      <div className="flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-[#e5e5e5] dark:border-[#334155] shadow-xs">
        {mode === 'challenge' ? (
          <>
            <Shield className={`w-4 h-4 ${hearts <= 1 ? 'text-[#ff4b4b] animate-pulse' : 'text-[#1cb0f6]'}`} />
            <span className={`text-xs font-black ${hearts <= 1 ? 'text-[#ff4b4b]' : 'text-[#1cb0f6]'}`}>
              {hearts} Hak
            </span>
          </>
        ) : (
          <>
            <BookOpen className="w-4 h-4 text-[#58cc02]" />
            <span className="text-xs font-black text-[#58cc02] hidden sm:inline">Öğrenme</span>
          </>
        )}
      </div>
    </div>
  );
}
