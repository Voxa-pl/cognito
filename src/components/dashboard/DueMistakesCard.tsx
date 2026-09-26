'use client';

import { useMemo } from 'react';
import {
  BrainCircuit,
  RotateCcw,
  Shield,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Clock,
  BookMarked,
  Award,
} from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { filterDueMistakes, getMistakeStats } from '@/lib/gamification/spacedRepetition';
import { sounds } from '@/lib/sound';

interface DueMistakesCardProps {
  onStartReview: () => void;
}

export function DueMistakesCard({ onStartReview }: DueMistakesCardProps) {
  const mistakeVault = useUserStore((state) => state.mistakeVault);
  const user = useUserStore((state) => state.user);

  const { dueList, stats } = useMemo(() => {
    const due = filterDueMistakes(mistakeVault || []);
    const st = getMistakeStats(mistakeVault || []);
    return { dueList: due, stats: st };
  }, [mistakeVault]);

  const hasDueMistakes = dueList.length > 0;
  const currentHearts = user?.hearts ?? 5;

  return (
    <section className="rounded-3xl border-2 border-[#1cb0f6]/30 dark:border-[#1cb0f6]/30 border-b-6 border-b-[#1899d6] dark:border-b-[#0284c7] bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd]/40 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] p-6 sm:p-7 shadow-sm transition-all duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Info Column */}
        <div className="flex items-start gap-4 sm:gap-5">
          <div
            className={`flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl shadow-md border-b-4 ${
              hasDueMistakes
                ? 'bg-[#1cb0f6] border-[#1899d6] text-white'
                : 'bg-[#58cc02] border-[#46a302] text-white'
            }`}
          >
            {hasDueMistakes ? (
              <BrainCircuit className="w-8 h-8 stroke-[2.2] animate-pulse" />
            ) : (
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1cb0f6] px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-white shadow-xs">
                <RotateCcw className="w-3 h-3 stroke-[2.5]" />
                <span>Ebbinghaus Aralıklı Tekrar Motoru</span>
              </span>

              {hasDueMistakes ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e0f2fe] dark:bg-[#1cb0f6]/20 border border-[#7dd3fc] dark:border-[#1cb0f6]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#0369a1] dark:text-[#38bdf8]">
                  <Clock className="w-3 h-3" />
                  <span>{dueList.length} Soru Vadesi Doldu</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#dcfce7] dark:bg-[#22c55e]/20 border border-[#86efac] dark:border-[#22c55e]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#15803d] dark:text-[#4ade80]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Tekrarlar Güncel</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#1e293b] dark:text-[#f8fafc] tracking-tight">
              {hasDueMistakes
                ? `Günün Bilişsel Tekrarları (${dueList.length} Soru Bekliyor)`
                : `Tüm Tekrarlar Güncel! ${stats.mastered} soru hafızada mühürlendi.`}
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-[#475569] dark:text-[#94a3b8] max-w-2xl leading-relaxed">
              {hasDueMistakes
                ? 'Ebbinghaus unutma eğrisi algoritmasına göre vadesi gelen soruları çöz; aşamaları ilerlet ve hatasız oturumla sınav hata tolerans kalkanını (+1) yenile.'
                : 'Bugün vadesi gelen eksik soru bulunmuyor. Düzenli aralıklı tekrarlar sayesinde kazandığın refleksleri koruyorsun. Dilersen kayıtlı soruları serbest modda gözden geçirebilirsin.'}
            </p>

            {/* Micro Stats Pills */}
            <div className="flex items-center gap-3 pt-1 flex-wrap text-xs font-bold text-[#64748b] dark:text-[#94a3b8]">
              <span className="flex items-center gap-1">
                <BookMarked className="w-3.5 h-3.5 text-[#1cb0f6]" />
                <span>Toplam Kayıt: <strong className="text-[#0f172a] dark:text-[#f8fafc]">{stats.total}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#58cc02]" />
                <span>Kalıcı Hafıza: <strong className="text-[#58cc02]">{stats.mastered}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#ff4b4b]" />
                <span>Mevcut Kalkan: <strong className="text-[#ff4b4b]">{currentHearts}/5</strong></span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Button & Shield Bonus */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3 shrink-0">
          {hasDueMistakes ? (
            <>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#ecfdf5] dark:bg-[#065f46]/30 border border-[#a7f3d0] dark:border-[#059669]/40 text-[11px] font-black text-[#047857] dark:text-[#34d399]">
                <Shield className="w-3.5 h-3.5 fill-[#10b981] text-[#10b981]" />
                <span>+1 Kalkan (Tolerans Kalkanı)</span>
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  onStartReview();
                }}
                className="btn-duo btn-duo-blue px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white flex items-center justify-center gap-2 shadow-md cursor-pointer w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>TEKRARA BAŞLA</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                sounds.playClick();
                onStartReview();
              }}
              className="btn-duo btn-duo-green px-6 py-3 rounded-2xl text-xs font-black text-white flex items-center justify-center gap-2 cursor-pointer shadow-sm w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>DEFTERİ İNCELE & PRATİK YAP</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
