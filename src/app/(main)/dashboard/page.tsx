'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame,
  Sparkles,
  Trophy,
  Award,
  BookOpen,
  Shuffle,
  ChevronRight,
  Heart,
  Infinity as InfinityIcon,
  Compass,
  Shield,
  Target,
  GraduationCap,
  Users,
  Ticket,
  FileText,
} from 'lucide-react';
import { subjects } from '@/data/subjects';
import { useUserStore } from '@/stores/useUserStore';
import { AppIcon } from '@/components/ui/Icon';
import { LearningPath } from '@/components/dashboard/LearningPath';
import { ExamPredictorRadar } from '@/components/dashboard/ExamPredictorRadar';
import { DiagnosticEngine } from '@/components/dashboard/DiagnosticEngine';
import { DueMistakesCard } from '@/components/dashboard/DueMistakesCard';
import { MistakeReviewModal } from '@/components/dashboard/MistakeReviewModal';
import { sounds } from '@/lib/sound';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const user = useUserStore((state) => state.user);
  const activeSubjectSlug = useUserStore((state) => state.activeSubjectSlug);
  const setActiveSubject = useUserStore((state) => state.setActiveSubject);
  const selectedMode = useUserStore((state) => state.selectedMode);
  const setGameMode = useUserStore((state) => state.setGameMode);
  const dailyQuests = useUserStore((state) => state.dailyQuests);
  const clans = useUserStore((state) => state.clans);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const userClan = clans.find((c) => c.id === user?.clanId);
  const placementTickets = user?.placementTickets ?? 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeSubject = subjects.find((s) => s.slug === activeSubjectSlug) || subjects[0];

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'İyi Günler';
    return 'İyi Akşamlar';
  })();

  const currentLevel = user?.level || 1;
  const currentXP = user?.totalXP ?? 0;
  const xpInLevel = currentXP % 250;
  const xpPercent = Math.min(100, Math.round((xpInLevel / 250) * 100));

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Top Welcome Card */}
      <section className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#1cb0f6]">
                2026-2027 Akademik &bull; {user?.grade || 9}. Sınıf
              </span>
              <span className="flex items-center gap-1 rounded-full bg-[#fff0db] dark:bg-[#ff9600]/20 border border-[#ffb74d] dark:border-[#ff9600]/40 px-3 py-1 text-xs font-black text-[#ff9600]">
                <Flame className="w-3.5 h-3.5 fill-[#ff9600]" />
                {user?.currentStreak ?? 0} Günlük İstikrar
              </span>
              {user?.learningMode === 'phoenix' ? (
                <span className="flex items-center gap-1.5 rounded-full bg-[#ffe8cc] dark:bg-[#ff9600]/20 border border-[#ffb74d] dark:border-[#ff9600]/40 px-3 py-1 text-xs font-black text-[#d97706] dark:text-[#ff9600]">
                  <Flame className="w-3.5 h-3.5 fill-[#ff9600] text-[#ff9600]" />
                  <span>Phoenix Telafi Modu</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 rounded-full bg-[#e5f8d0] dark:bg-[#58cc02]/20 border border-[#bcf087] dark:border-[#58cc02]/40 px-3 py-1 text-xs font-black text-[#58cc02]">
                  <Sparkles className="w-3.5 h-3.5 fill-[#58cc02] text-[#58cc02]" />
                  <span>Akademik Başarı Yolu</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#3c3c3c] dark:text-[#f8fafc] tracking-tight">
              {greeting}, {user?.fullName || user?.username || 'Öğrenci'}!
            </h1>
            <p className="mt-1 text-sm font-semibold text-[#777777] dark:text-[#94a3b8]">
              Kazanım odaklı modern akademik öğrenme ve sınav hazırlık süreci.
            </p>
          </div>

          {/* Quick Academic Mode Toggle */}
          <div className="flex items-center gap-2 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] p-1.5 self-start md:self-auto">
            <button
              onClick={() => {
                sounds.playClick();
                setGameMode('challenge');
              }}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-black transition-all cursor-pointer ${
                selectedMode === 'challenge'
                  ? 'bg-[#ff4b4b] text-white border-b-3 border-[#ea2b2b] shadow-sm'
                  : 'text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
              }`}
              title="Akademik Sınav Modu (Hata korumalı değerlendirme)"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Sınav Modu</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setGameMode('practice');
              }}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-black transition-all cursor-pointer ${
                selectedMode === 'practice'
                  ? 'bg-[#1cb0f6] text-white border-b-3 border-[#1899d6] shadow-sm'
                  : 'text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
              }`}
              title="Serbest Öğrenme Modu (Açıklamalı çalışma)"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Öğrenme Modu</span>
            </button>
          </div>
        </div>

        {/* Subject Pills (Fast Switcher) */}
        <div className="mt-6 pt-5 border-t border-[#e5e5e5] dark:border-[#334155]">
          <div className="text-[11px] font-black uppercase tracking-wider text-[#afafaf] dark:text-[#64748b] mb-2.5">
            Akademik Branş Seçimi
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {subjects.map((sub) => {
              const isSelected = sub.slug === activeSubjectSlug;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveSubject(sub.slug);
                  }}
                  className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-black whitespace-nowrap transition-all border-2 border-b-4 cursor-pointer ${
                    isSelected
                      ? 'bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-[#1cb0f6] border-b-[#1899d6] text-[#1cb0f6] translate-y-[-1px]'
                      : 'bg-white dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] text-[#777777] dark:text-[#94a3b8] hover:bg-[#f7f7f7] dark:hover:bg-[#1e293b] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
                  }`}
                >
                  <AppIcon name={sub.icon} size={15} />
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Phoenix / Sınıf Tekrarı Telafi & Güçlendirme Hero Banner */}
      {(user?.learningMode === 'phoenix' || user?.isRepeater) && (
        <section className="rounded-3xl border-2 border-[#ff9600] border-b-6 border-b-[#e68700] bg-gradient-to-r from-[#fff3e0] via-[#ffe8cc] to-[#ffdec0] p-6 sm:p-7 shadow-md animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff9600] to-[#ea2b2b] text-white shadow-lg">
                <Flame className="w-8 h-8 fill-white animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#ff9600] px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-white shadow-xs">
                    <Flame className="w-3 h-3 fill-white text-white" />
                    <span>ZÜMRÜDÜANKA MODU AKTİF</span>
                  </span>
                  <span className="rounded-full bg-white/80 border border-[#ffb74d] px-2.5 py-0.5 text-[11px] font-bold text-[#b78103]">
                    Yeniden Doğuş & Güçlendirme
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3c3c3c]">
                  Küllerinden Doğan Azim: Eksikleri Fırsata Çevir!
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-[#666666] max-w-2xl leading-relaxed">
                  Sınıf tekrarını büyük bir akademik avantaja dönüştürüyorsun. Temel eksiklerini kapat, her konu tekrarında 2 kat özgüven kazan ve sınavlara sağlam adımlarla yürü.
                </p>
              </div>
            </div>

            <Link
              href="/quiz/mixed"
              onClick={() => sounds.playClick()}
              className="btn-duo btn-duo-orange shrink-0 px-6 py-3.5 rounded-2xl text-xs font-black text-white flex items-center justify-center gap-2 shadow-md whitespace-nowrap self-start sm:self-center cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>TEMEL PEKİŞTİRME TESTİ</span>
            </Link>
          </div>
        </section>
      )}

      {/* Super-Features Surpassing EBA: Kazanım Takip Sistemi & Sınav Tahmincisi */}
      <ExamPredictorRadar />

      {/* Super-Features Surpassing EBA: Akıllı Eksik Teşhis & Telafi Motoru */}
      <DiagnosticEngine />

      {/* Akıllı Hata Defteri & Ebbinghaus Aralıklı Tekrar Kartı */}
      <DueMistakesCard onStartReview={() => setIsReviewModalOpen(true)} />

      {/* Main Grid: Learning Path (Center) + Widgets (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Learning Path (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#e5f8d0] dark:bg-[#58cc02]/20 text-[#58cc02] border border-[#bcf087] dark:border-[#58cc02]/40">
                <Compass className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc] tracking-tight">
                  {activeSubject.name} Kazanım İlerleme Planı
                </h2>
                <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                  Kazanımları sırayla tamamla, ara kontrol noktalarını geç ve ünite başarı sertifikasını kazan.
                </p>
              </div>
            </div>
          </div>

          {/* S-Curve Learning Path */}
          <LearningPath subjectSlug={activeSubjectSlug} />
        </div>

        {/* Right Widgets: Placement Exam + Clan + Daily Quests + Mixed Quiz + Subjects Quick List */}
        <div className="flex flex-col gap-6 w-full">
          {/* Seviye Belirleme Sınavı Widget */}
          <div className="rounded-3xl border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 border-b-6 border-b-[#1cb0f6] bg-gradient-to-br from-[#ddf4ff] to-[#c7edff] dark:from-[#1cb0f6]/15 dark:to-[#1cb0f6]/5 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1cb0f6] border-b-4 border-[#1899d6] text-white shadow-md">
                  <GraduationCap className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#1cb0f6] dark:text-[#38bdf8]">
                    Seviye Belirleme Sınavı
                  </h3>
                  <span className="text-[11px] font-black uppercase text-[#1899d6] dark:text-[#38bdf8] flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{placementTickets} Sınav Hakkı Mevcut</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs font-semibold text-[#4b4b4b] dark:text-[#cbd5e1] leading-relaxed mb-4">
              Haftalık ücretsiz hakkınızı kullanın; açık uçlu ve test sorularıyla akademik seviyenizi teşhis edin.
            </p>

            <Link
              href="/exams"
              onClick={() => sounds.playClick()}
              className="btn-duo btn-duo-blue w-full py-3 rounded-2xl text-xs font-black text-white flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>SINAVLAR MERKEZİNE GİT</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>

          {/* Akademik Klan Widget */}
          {userClan && (
            <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0db] dark:bg-[#ff9600]/20 text-[#ff9600] border border-[#ffb74d] dark:border-[#ff9600]/30 shadow-xs">
                    <Users className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase text-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 px-1.5 py-0.2 rounded">
                        {userClan.tag}
                      </span>
                      <span className="text-[10px] font-black uppercase text-[#ff9600] bg-[#fff0db] dark:bg-[#ff9600]/20 px-1.5 py-0.2 rounded">
                        Seviye {userClan.level}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-[#3c3c3c] dark:text-[#f8fafc] mt-0.5">
                      {userClan.name}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155] flex items-center justify-between text-xs font-bold mb-4">
                <span className="text-[#777777] dark:text-[#94a3b8]">Haftalık Klan Havuzu:</span>
                <span className="font-black text-[#1cb0f6]">{userClan.weeklyXP} XP</span>
              </div>

              <Link
                href="/clans"
                onClick={() => sounds.playClick()}
                className="btn-duo btn-duo-white w-full py-2.5 rounded-2xl text-xs font-black text-[#ff9600] border-[#ffb74d] dark:border-[#ff9600]/40 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Klan Panosunu Aç</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          )}

          {/* Quick Mixed Quiz Card */}
          <div className="rounded-3xl border-2 border-[#ce82ff]/40 dark:border-[#ce82ff]/30 border-b-6 border-b-[#a560e8] bg-gradient-to-br from-[#fbf3ff] to-[#f4e6ff] dark:from-[#ce82ff]/10 dark:to-[#ce82ff]/5 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ce82ff] border-b-4 border-[#a560e8] text-white shadow-md">
                <Shuffle className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  Kazanım Değerlendirme Denemesi
                </h3>
                <p className="text-xs font-bold text-[#a560e8]">
                  8 Temel Branştan 10 Soru
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold text-[#666666] dark:text-[#94a3b8] leading-relaxed mb-5">
              Tüm {user?.grade || 9}. sınıf ders kazanımlarından harmanlanan sorularla kendini sına, genel akademik seviyeni yükselt.
            </p>

            <Link
              href="/quiz/mixed"
              onClick={() => sounds.playClick()}
              className="btn-duo btn-duo-purple w-full py-3.5 rounded-2xl text-xs font-black text-white flex items-center justify-center gap-2"
            >
              <span>DENEME SINAVINI BAŞLAT</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>

          {/* Daily Quests Card */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-[#3c3c3c] dark:text-[#f8fafc] text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ffc800]" />
                <span>Günlük Akademik Hedefler</span>
              </h3>
              <span className="text-[11px] font-bold text-[#afafaf] dark:text-[#64748b]">24 Saat</span>
            </div>

            <div className="space-y-4">
              {dailyQuests.map((quest) => {
                const percent = Math.min(100, Math.round((quest.currentValue / quest.targetValue) * 100));
                return (
                  <div
                    key={quest.id}
                    className="p-3.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-black ${
                          quest.completed ? 'text-[#afafaf] dark:text-[#64748b] line-through' : 'text-[#3c3c3c] dark:text-[#f8fafc]'
                        }`}
                      >
                        {quest.description}
                      </span>
                      <span className="text-[11px] font-black text-[#58cc02] bg-[#e5f8d0] dark:bg-[#58cc02]/20 px-2 py-0.5 rounded-md">
                        +{quest.xpReward} XP
                      </span>
                    </div>

                    <div className="h-2 w-full bg-[#e5e5e5] dark:bg-[#334155] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          quest.completed ? 'bg-[#58cc02]' : 'bg-[#1cb0f6]'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] font-bold text-[#777777] dark:text-[#94a3b8]">
                      <span>{quest.currentValue} / {quest.targetValue}</span>
                      {quest.completed && <span className="text-[#58cc02]">Tamamlandı!</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All Subjects Grid */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-[#3c3c3c] dark:text-[#f8fafc] text-base flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#1cb0f6]" />
                <span>Akademik Dersler</span>
              </h3>
              <Link
                href="/subjects"
                onClick={() => sounds.playClick()}
                className="text-xs font-black text-[#1cb0f6] hover:underline inline-flex items-center gap-1"
              >
                <span>Tümü</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {subjects.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveSubject(sub.slug);
                  }}
                  className={`p-3 rounded-2xl border-2 border-b-4 flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                    sub.slug === activeSubjectSlug
                      ? 'bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-[#1cb0f6] border-b-[#1899d6] text-[#1cb0f6]'
                      : 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] text-[#3c3c3c] dark:text-[#f8fafc] hover:bg-[#efefef] dark:hover:bg-[#1e293b]'
                  }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white dark:bg-[#1e293b] text-[#1cb0f6] shadow-sm shrink-0">
                    <AppIcon name={sub.icon} size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs font-black block truncate">
                      {sub.name}
                    </span>
                    <span className="text-[10px] font-bold text-[#777777] dark:text-[#94a3b8] block">
                      {sub.unitCount} Ünite
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Akıllı Hata Defteri & Ebbinghaus Tekrar Modalı */}
      <MistakeReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
}
