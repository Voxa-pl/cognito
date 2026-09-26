'use client';

import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface ChestRewardModalProps {
  isOpen: boolean;
  chestId: string;
  gemReward: number;
  xpReward: number;
  onClaim: () => void;
  onClose: () => void;
}

export function ChestRewardModal({
  isOpen,
  chestId,
  gemReward,
  xpReward,
  onClaim,
  onClose,
}: ChestRewardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Academic Milestone Emblem */}
        <div className="mx-auto mb-4 relative flex h-20 w-20 items-center justify-center rounded-3xl bg-[#e5f8d0] dark:bg-[#58cc02]/20 border-4 border-[#58cc02] shadow-[0_6px_0_#3f9600] text-[#58cc02]">
          <ShieldCheck className="h-10 w-10 stroke-[2.5]" />
          <div className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1cb0f6] text-white shadow-md">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>

        <span className="inline-block rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#1cb0f6] mb-1.5">
          ARA KONTROL NOKTASI
        </span>

        <h3 className="text-xl sm:text-2xl font-black text-[#3c3c3c] dark:text-[#f8fafc] mb-1">
          Kazanım Onayı Tamamlandı
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-[#777777] dark:text-[#94a3b8] mb-6">
          Bu ünitedeki hedeflenen konu kazanımlarını başarıyla tamamladın ve akademik yeterliliğini kanıtladın.
        </p>

        {/* Academic Reward Badges */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 border-b-4 border-b-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/15 p-3">
            <Award className="h-6 w-6 text-[#1cb0f6] mb-1" />
            <span className="text-lg font-black text-[#1cb0f6]">+{xpReward || 50}</span>
            <span className="text-[10px] font-black uppercase text-[#1899d6] dark:text-[#1cb0f6]">Akademik XP</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-[#bcf087] dark:border-[#58cc02]/40 border-b-4 border-b-[#58cc02] bg-[#e5f8d0] dark:bg-[#58cc02]/15 p-3">
            <CheckCircle2 className="h-6 w-6 text-[#58cc02] mb-1" />
            <span className="text-lg font-black text-[#58cc02]">%100</span>
            <span className="text-[10px] font-black uppercase text-[#4b7a00] dark:text-[#58cc02]">Kazanım Onayı</span>
          </div>
        </div>

        {/* Claim Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClaim();
          }}
          className="btn-duo btn-duo-green w-full py-4 rounded-2xl text-sm font-black text-white cursor-pointer shadow-lg tracking-wide uppercase"
        >
          KAZANIMI ONAYLA VE DEVAM ET
        </button>
      </div>
    </div>
  );
}

