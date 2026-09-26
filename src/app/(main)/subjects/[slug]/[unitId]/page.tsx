'use client';

import { use } from 'react';
import Link from 'next/link';
import { getTopicsForUnit, getUnitById } from '@/data/curriculum';
import { allQuestions } from '@/data/questions';
import { AppIcon } from '@/components/ui/Icon';
import { ArrowLeft, Play, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { sounds } from '@/lib/sound';

export default function UnitDetailPage({ params }: { params: Promise<{ slug: string; unitId: string }> }) {
  const { slug, unitId } = use(params);

  const unit = getUnitById(unitId);
  const topics = getTopicsForUnit(unitId);
  const unitName = unit?.name || 'Ünite';
  const topicProgress = useUserStore((state) => state.topicProgress);

  return (
    <div className="flex flex-col gap-6 pb-20 max-w-5xl mx-auto px-2">
      {/* Back button */}
      <Link
        href={`/subjects/${slug}`}
        onClick={() => sounds.playClick()}
        className="btn-duo btn-duo-white flex w-fit items-center gap-2 text-xs font-black text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc] px-4 py-2 rounded-2xl dark:bg-[#1e293b] dark:border-[#334155] dark:border-b-[#283a45]"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Ünitelere Dön</span>
      </Link>

      {/* Unit Header */}
      <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-6 md:p-8 shadow-sm flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 shadow-sm">
          <AppIcon name={unit?.icon || 'layers'} size={32} />
        </div>
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#1cb0f6]">
            Ünite {unit?.orderIndex || 1}
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-[#3c3c3c] dark:text-[#f8fafc] mt-0.5 tracking-tight">
            {unitName}
          </h1>
          <p className="text-[#777777] dark:text-[#94a3b8] text-xs md:text-sm font-semibold mt-1">
            Konu testlerini çözerek kazanım yeterliliğini artır ve seviye atlamak için akademik başarı puanı (XP) topla.
          </p>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">Konular ve Testler</h2>
          <span className="text-xs font-black text-[#777777] dark:text-[#94a3b8]">{topics.length} Konu</span>
        </div>

        {topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => {
              const topicQuestions = allQuestions.filter((q) => q.topicId === topic.id);
              const questionCount = topicQuestions.length;
              const hasQuestions = questionCount > 0;
              const progress = topicProgress[topic.id];
              const mastery = progress?.masteryLevel || 0;

              return (
                <div
                  key={topic.id}
                  className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-5 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-6 flex flex-col justify-between gap-5 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[11px] font-black text-[#1cb0f6] uppercase tracking-wider">
                        Konu {topic.orderIndex}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#e5f8d0] dark:bg-[#58cc02]/20 text-[#58cc02] border border-[#bcf087] dark:border-[#58cc02]/40 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-[#58cc02]" />
                        +{topic.xpReward} XP
                      </span>
                    </div>

                    <h3 className="font-black text-[#3c3c3c] dark:text-[#f8fafc] text-lg leading-snug mb-2">
                      {topic.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8] leading-relaxed line-clamp-2">
                      {topic.description}
                    </p>
                  </div>

                  {/* Mastery Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-[#777777] dark:text-[#94a3b8] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#58cc02]" />
                        Kazanım Yeterliliği
                      </span>
                      <span className="text-[#3c3c3c] dark:text-[#f8fafc] font-black">%{mastery}</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[#e5e5e5] dark:bg-[#334155] overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-[#58cc02] transition-all duration-300"
                        style={{ width: `${Math.max(mastery > 0 ? 5 : 0, mastery)}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  {hasQuestions ? (
                    <Link
                      href={`/quiz/${topic.id}`}
                      onClick={() => sounds.playClick()}
                      className="btn-duo btn-duo-green w-full py-3 rounded-2xl font-black text-xs sm:text-sm text-white flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>TESTE BAŞLA ({questionCount} Soru)</span>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="btn-duo btn-duo-disabled w-full py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>İÇERİK HAZIRLANIYOR</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl bg-white dark:bg-[#1e293b] p-8 text-center border-2 border-[#e5e5e5] dark:border-[#334155]">
            <h3 className="text-base font-black text-[#3c3c3c] dark:text-[#f8fafc]">Bu ünitenin konuları hazırlanıyor.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
