'use client';

import { useState } from 'react';
import { Sparkles, X, Target, Gem, CheckCircle, AlertCircle } from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { sounds } from '@/lib/sound';

interface TicketPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TicketPurchaseModal({ isOpen, onClose }: TicketPurchaseModalProps) {
  const user = useUserStore((state) => state.user);
  const buyPlacementTicket = useUserStore((state) => state.buyPlacementTicket);

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleBuy = (currency: 'xp' | 'gems') => {
    const res = buyPlacementTicket(currency);
    setMessage({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    if (res.success) {
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 h-8 w-8 rounded-full flex items-center justify-center text-[#777777] dark:text-[#94a3b8] hover:bg-[#f7f7f7] dark:hover:bg-[#334155] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border border-[#84d8ff] dark:border-[#1cb0f6]/40">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc]">
              Sınav Hakkı Satın Al
            </h3>
            <p className="text-xs text-[#777777] dark:text-[#94a3b8] font-semibold">
              Platform birimleriyle Seviye Belirleme Sınavı bileti edinin.
            </p>
          </div>
        </div>

        {message && (
          <div
            className={`p-3 rounded-2xl text-xs font-black flex items-center gap-2 mb-4 border ${
              message.type === 'success'
                ? 'bg-[#e5f8d0] dark:bg-[#58cc02]/20 border-[#58cc02] text-[#4b7a00] dark:text-[#58cc02]'
                : 'bg-[#ffdfe0] dark:bg-[#ff4b4b]/20 border-[#ff4b4b] text-[#ea2b2b]'
            }`}
          >
            {message.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="space-y-3 mb-6">
          {/* XP Purchase Option */}
          <div className="p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#1cb0f6]/20 text-[#1cb0f6] flex items-center justify-center">
                <Target className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  150 Akademik XP
                </div>
                <div className="text-[11px] font-bold text-[#777777] dark:text-[#94a3b8]">
                  Mevcut: {user?.totalXP || 0} XP
                </div>
              </div>
            </div>

            <button
              onClick={() => handleBuy('xp')}
              disabled={(user?.totalXP || 0) < 150}
              className={`btn-duo px-4 py-2.5 rounded-xl text-xs font-black uppercase cursor-pointer ${
                (user?.totalXP || 0) >= 150
                  ? 'btn-duo-blue text-white'
                  : 'btn-duo-disabled opacity-50 cursor-not-allowed'
              }`}
            >
              Satın Al
            </button>
          </div>

          {/* Gems / Kredi Purchase Option */}
          <div className="p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#ce82ff]/20 text-[#ce82ff] flex items-center justify-center">
                <Gem className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  50 Başarı Kredisi
                </div>
                <div className="text-[11px] font-bold text-[#777777] dark:text-[#94a3b8]">
                  Mevcut: {user?.gems || 0} Kredi
                </div>
              </div>
            </div>

            <button
              onClick={() => handleBuy('gems')}
              disabled={(user?.gems || 0) < 50}
              className={`btn-duo px-4 py-2.5 rounded-xl text-xs font-black uppercase cursor-pointer ${
                (user?.gems || 0) >= 50
                  ? 'btn-duo-purple text-white'
                  : 'btn-duo-disabled opacity-50 cursor-not-allowed'
              }`}
            >
              Satın Al
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] font-semibold text-[#777777] dark:text-[#94a3b8]">
          Her hafta hesabınıza 1 adet ücretsiz seviye belirleme sınav hakkı otomatik olarak tanımlanır.
        </div>
      </div>
    </div>
  );
}
