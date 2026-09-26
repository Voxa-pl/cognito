'use client';

import { Trophy, Clock, Target, RotateCcw, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  xpEarned: number;
  timeSpentSec: number;
  topicName: string;
  isGameOver?: boolean;
  onRetry: () => void;
  onGoBack: () => void;
}

export function QuizResult({
  score,
  totalQuestions,
  xpEarned,
  timeSpentSec,
  topicName,
  isGameOver = false,
  onRetry,
  onGoBack,
}: QuizResultProps) {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-12 px-4 text-center animate-in zoom-in-95 duration-200">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#ffdfe0] dark:bg-[#ff4b4b]/20 text-[#ff4b4b] border-4 border-[#ffb3b5] dark:border-[#ff4b4b]/40 shadow-[0_8px_0_#ea2b2b] dark:shadow-[0_8px_0_#991b1b] mb-6">
          <ShieldAlert className="h-12 w-12 stroke-[2.5]" />
        </div>

        <span className="rounded-full bg-[#ffdfe0] dark:bg-[#ff4b4b]/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#ff4b4b] mb-2 border border-transparent dark:border-[#ff4b4b]/30">
          DEĞERLENDİRME TAMAMLANDI
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-[#3c3c3c] dark:text-[#f8fafc] mb-2">
          Hata Limiti Aşıldı
        </h2>
        <p className="text-sm font-semibold text-[#777777] dark:text-[#94a3b8] mb-8 max-w-xs leading-relaxed">
          Hatalar akademik gelişimin doğal bir parçasıdır. Konuyu pekiştirip denemeyi tekrar başlatabilirsiniz.
        </p>

        <div className="w-full space-y-3">
          <button
            onClick={() => {
              sounds.playClick();
              onRetry();
            }}
            className="btn-duo btn-duo-blue w-full py-4 rounded-2xl text-base font-black text-white cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            <span>TESTİ TEKRAR BAŞLAT</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onGoBack();
            }}
            className="btn-duo btn-duo-white w-full py-3.5 rounded-2xl text-sm font-black text-[#4b4b4b] dark:text-[#94a3b8] dark:bg-[#1e293b] dark:border-[#334155] dark:border-b-[#283a45] cursor-pointer"
          >
            KOKPİTE DÖN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-8 px-4 text-center animate-in zoom-in-95 duration-200">
      {/* Celebration Trophy */}
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#fff8db] dark:bg-[#ffc800]/20 text-[#ffc800] border-4 border-[#ffe066] dark:border-[#ffc800]/40 shadow-[0_8px_0_#e5a500] dark:shadow-[0_8px_0_#996500] mb-6 animate-bounce">
        <Trophy className="h-12 w-12 stroke-[2.5]" />
      </div>

      <span className="rounded-full bg-[#e5f8d0] dark:bg-[#58cc02]/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#58cc02] mb-2 border border-transparent dark:border-[#58cc02]/30">
        KAZANIM TESTİ TAMAMLANDI
      </span>

      <h2 className="text-2xl sm:text-3xl font-black text-[#3c3c3c] dark:text-[#f8fafc] mb-1">
        Tebrikler, Başarıyla Tamamladın!
      </h2>
      <p className="text-sm font-semibold text-[#777777] dark:text-[#94a3b8] mb-8">
        {topicName} konusundaki kazanım değerlendirmesi kaydedildi.
      </p>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 w-full mb-8">
        {/* Total XP Card */}
        <div className="rounded-2xl border-2 border-[#bcf087] dark:border-[#58cc02]/40 border-b-4 border-b-[#58cc02] bg-[#e5f8d0] dark:bg-[#58cc02]/15 p-4 flex flex-col items-center justify-center">
          <span className="text-[11px] font-black uppercase text-[#4b7a00] dark:text-[#86efac]">KAZANILAN</span>
          <span className="text-2xl font-black text-[#58cc02]">+{xpEarned} XP</span>
        </div>

        {/* Accuracy Card */}
        <div className="rounded-2xl border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 border-b-4 border-b-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/15 p-4 flex flex-col items-center justify-center">
          <span className="text-[11px] font-black uppercase text-[#1899d6] dark:text-[#38bdf8]">DOĞRULUK</span>
          <span className="text-2xl font-black text-[#1cb0f6] dark:text-[#38bdf8]">%{percentage}</span>
        </div>

        {/* Time Spent Card */}
        <div className="rounded-2xl border-2 border-[#ffe082] dark:border-[#ffc800]/40 border-b-4 border-b-[#ffc800] bg-[#fff8db] dark:bg-[#ffc800]/15 p-4 flex flex-col items-center justify-center col-span-2 sm:col-span-1">
          <span className="text-[11px] font-black uppercase text-[#e68700] dark:text-[#fcd34d]">SÜRE</span>
          <span className="text-2xl font-black text-[#ff9600]">{formatTime(timeSpentSec)}</span>
        </div>
      </div>

      {/* 3D Action Buttons */}
      <div className="w-full space-y-3">
        <button
          onClick={() => {
            sounds.playClick();
            onGoBack();
          }}
          className="btn-duo btn-duo-green w-full py-4 rounded-2xl text-base font-black text-white cursor-pointer shadow-lg flex items-center justify-center gap-2"
        >
          <span>DERSLERE DEVAM ET</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            onRetry();
          }}
          className="btn-duo btn-duo-white w-full py-3.5 rounded-2xl text-sm font-black text-[#4b4b4b] dark:text-[#94a3b8] dark:bg-[#1e293b] dark:border-[#334155] dark:border-b-[#283a45] cursor-pointer flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 stroke-[2.5]" />
          <span>TESTİ TEKRAR ET</span>
        </button>
      </div>
    </div>
  );
}
