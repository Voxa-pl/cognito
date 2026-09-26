'use client';

import Link from 'next/link';
import { Brain, Shuffle, ChevronRight, Shield, BookOpen, Layers } from 'lucide-react';
import { subjects } from '@/data/subjects';
import { allQuestions, getTopicStats, questionsBySubject } from '@/data/questions';
import { getTopicName } from '@/data/curriculum';
import { AppIcon } from '@/components/ui/Icon';
import { useUserStore } from '@/stores/useUserStore';
import { sounds } from '@/lib/sound';

export default function QuizSelectionPage() {
  const selectedMode = useUserStore((state) => state.selectedMode);
  const setGameMode = useUserStore((state) => state.setGameMode);

  // Group all topics by subject
  const subjectsData = subjects.map((sub) => {
    const questions = questionsBySubject[sub.slug] || [];
    const topicIds = Array.from(new Set(questions.map((q) => q.topicId)));
    return {
      ...sub,
      questions,
      topicIds,
      totalQuestions: questions.length,
    };
  });

  return (
    <div className="container max-w-5xl mx-auto px-2 py-4 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#1cb0f6] border border-transparent dark:border-[#1cb0f6]/30">
              Kazanım Değerlendirme Merkezi
            </span>
            <span className="text-xs font-bold text-[#777777] dark:text-[#94a3b8]">9. Sınıf Akademik Program</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-[#3c3c3c] dark:text-[#f8fafc] tracking-tight flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40">
              <Brain className="w-7 h-7 stroke-[2.5]" />
            </div>
            <span>Akademik Quiz & Deneme</span>
          </h1>
          <p className="text-[#777777] dark:text-[#94a3b8] text-sm md:text-base mt-1 font-semibold">
            8 temel dersin tüm kazanımlarından test çöz, eksiklerini anında telafi et.
          </p>
        </div>

        {/* Game Mode Selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#1e293b] p-1.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#283a45] w-fit">
          <button
            onClick={() => {
              sounds.playClick();
              setGameMode('challenge');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedMode === 'challenge'
                ? 'bg-[#1cb0f6] text-white border-b-3 border-[#168ec7] shadow-sm'
                : 'text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
            }`}
          >
            <Shield className={`w-3.5 h-3.5 ${selectedMode === 'challenge' ? 'fill-white' : ''}`} />
            <span>Sınav Modu</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setGameMode('practice');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedMode === 'practice'
                ? 'bg-[#58cc02] text-white border-b-3 border-[#3f9600] shadow-sm'
                : 'text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Öğrenme Modu</span>
          </button>
        </div>
      </div>

      {/* Featured Mixed Quiz Card */}
      <Link
        href="/quiz/mixed"
        onClick={() => sounds.playClick()}
        className="block mb-10 group"
      >
        <div className="rounded-3xl border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 border-b-6 border-b-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/10 p-6 md:p-8 hover:translate-y-[-2px] transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1cb0f6] border-b-4 border-[#1899d6] text-white shadow-md group-hover:scale-105 transition-transform">
                <Shuffle className="w-8 h-8 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white dark:bg-[#1e293b] text-[#1cb0f6] shadow-sm">
                    GÜNÜN TAVSİYESİ
                  </span>
                  <span className="text-xs font-bold text-[#1899d6] dark:text-[#38bdf8]">8 Temel Ders</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#1cb0f6] dark:text-[#38bdf8] group-hover:text-[#1899d6] transition-colors">
                  Kazanım Değerlendirme Denemesi
                </h3>
                <p className="text-[#3c3c3c] dark:text-[#cbd5e1] text-xs sm:text-sm font-semibold mt-1 max-w-xl">
                  Tüm derslerin kazanımlarından derlenen 10 soru ile genel yeterliliğini sına ve akademik başarı puanını (XP) yükselt.
                </p>
              </div>
            </div>
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-[#1e293b] text-[#1cb0f6] shadow-sm group-hover:translate-x-1 transition-all border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40">
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </div>
          </div>
        </div>
      </Link>

      {/* 8 Subjects Topic Practice Grid */}
      <div className="space-y-12">
        {subjectsData.map((subject) => (
          <div key={subject.id} className="flex flex-col gap-4">
            {/* Subject Section Title */}
            <div className="flex items-center justify-between border-b-2 border-[#e5e5e5] dark:border-[#334155] pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 shadow-sm">
                  <AppIcon name={subject.icon} size={20} />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                    {subject.name}
                  </h2>
                  <span className="text-xs text-[#777777] dark:text-[#94a3b8] font-bold">
                    {subject.realmName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-[#58cc02] bg-[#e5f8d0] dark:bg-[#58cc02]/20 px-3 py-1 rounded-xl border border-[#bcf087] dark:border-[#58cc02]/40">
                  {subject.totalQuestions} Soru
                </span>
                <Link
                  href={`/subjects/${subject.slug}`}
                  onClick={() => sounds.playClick()}
                  className="text-xs font-black text-[#1cb0f6] dark:text-[#38bdf8] hover:underline hidden sm:inline"
                >
                  Üniteleri Gör →
                </Link>
              </div>
            </div>

            {/* Topic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.topicIds.map((topicId) => {
                const stats = getTopicStats(topicId);
                const topicTurkishName = getTopicName(topicId);

                return (
                  <Link
                    href={`/quiz/${topicId}`}
                    onClick={() => sounds.playClick()}
                    key={topicId}
                    className="group"
                  >
                    <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-5 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-5 h-full flex flex-col justify-between transition-all hover:bg-[#f7f7f7] dark:hover:bg-[#283a45] hover:border-[#d0d0d0] dark:hover:border-[#475569] hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-2">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <span className="text-[10px] font-black text-[#afafaf] dark:text-[#64748b] uppercase tracking-wider">
                            {subject.name}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-[#f7f7f7] dark:bg-[#0f172a] text-[#777777] dark:text-[#94a3b8] border border-[#e5e5e5] dark:border-[#334155]">
                            {stats.count} Soru
                          </span>
                        </div>

                        <h3 className="font-black text-base text-[#3c3c3c] dark:text-[#f8fafc] group-hover:text-[#1cb0f6] transition-colors leading-snug mb-3">
                          {topicTurkishName}
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-[#e5e5e5] dark:border-[#334155] mt-auto flex items-center justify-between">
                        <div className="flex gap-1.5">
                          {stats.easy > 0 && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#e5f8d0] dark:bg-[#58cc02]/20 text-[#58cc02]">
                              {stats.easy} Kolay
                            </span>
                          )}
                          {stats.medium > 0 && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#fff8db] dark:bg-[#ffc800]/20 text-[#e5a500] dark:text-[#ffc800]">
                              {stats.medium} Orta
                            </span>
                          )}
                          {stats.hard > 0 && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#ffdfe0] dark:bg-[#ff4b4b]/20 text-[#ff4b4b]">
                              {stats.hard} Zor
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-black text-[#1cb0f6] dark:text-[#38bdf8] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                          Başla →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
