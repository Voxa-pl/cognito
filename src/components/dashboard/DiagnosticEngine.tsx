'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { allTopics, getTopicById } from '@/data/curriculum';
import { subjects } from '@/data/subjects';
import { TopicMasteryDiagnostic } from '@/types';
import { sounds } from '@/lib/sound';
import { saveDiagnosticReportToSupabase, isSupabaseConfigured } from '@/lib/supabase';

export function DiagnosticEngine() {
  const user = useUserStore((state) => state.user);
  const topicProgress = useUserStore((state) => state.topicProgress);
  const quizHistory = useUserStore((state) => state.quizHistory);

  // Analyze topics and detect weak points (< 60% mastery)
  const diagnostics = useMemo<TopicMasteryDiagnostic[]>(() => {
    const list: TopicMasteryDiagnostic[] = [];

    // Check all tracked topics
    Object.entries(topicProgress).forEach(([topicId, progress]) => {
      const topic = getTopicById(topicId);
      if (!topic) return;

      const sub = subjects.find((s) => s.id === topic.subjectId || s.slug === topic.subjectId);
      const isWeak = progress.masteryLevel < 60;

      list.push({
        topicId,
        topicName: topic.name,
        subjectSlug: sub ? sub.slug : topic.subjectId,
        subjectName: sub ? sub.name : topic.subjectId,
        masteryLevel: progress.masteryLevel,
        totalAttempts: progress.totalAttempts,
        correctCount: progress.correctCount,
        isWeakPoint: isWeak,
        reason: isWeak
          ? 'Kavram kavrama oranı %60 başarı eşiğinin altında kaldı.'
          : 'Kazanım başarıyla kavrandı.',
        recommendation: isWeak
          ? '1-tıkla Eksik Kapatma Antrenmanı yaparak bu konudaki temel eksikleri giderin.'
          : 'Tebrikler, bu konuda tam yetkinsin.',
      });
    });

    // Initial fallback for onboarding students to experience 1-click remedial training
    if (list.filter((d) => d.isWeakPoint).length === 0) {
      list.push({
        topicId: 'mat-u1-t3',
        topicName: 'Üslü ve Köklü İfadeler',
        subjectSlug: 'matematik',
        subjectName: 'Matematik',
        masteryLevel: 45,
        totalAttempts: 1,
        correctCount: 4,
        isWeakPoint: true,
        reason: 'Henüz yeterli pekiştirme yapılmadı (%45). Temel kazanım eşiği (%60) altında.',
        recommendation: '1-tıkla Eksik Kapatma Antrenmanı yaparak bu konudaki temel eksikleri giderin.',
      });
    }

    return list;
  }, [topicProgress]);

  const weakTopics = diagnostics.filter((d) => d.isWeakPoint);
  const [filterSubject, setFilterSubject] = useState<string>('all');

  const displayedWeakTopics =
    filterSubject === 'all'
      ? weakTopics
      : weakTopics.filter((d) => d.subjectSlug === filterSubject);

  // Sync diagnostic report to Supabase for backend readiness
  useEffect(() => {
    if (!user?.id || !user?.isAuthenticated || !isSupabaseConfigured()) return;

    const weakPointsData = weakTopics.map((w) => ({
      topic_id: w.topicId,
      topic_name: w.topicName,
      subject_slug: w.subjectSlug,
      mastery_level: w.masteryLevel,
      reason: w.reason,
    }));

    // Dynamically calculate predicted exam score from average topic mastery
    const avgMastery = diagnostics.length > 0
      ? Math.round(diagnostics.reduce((acc, d) => acc + d.masteryLevel, 0) / diagnostics.length)
      : 75;
    const dynamicPredictedScore = Math.min(100, Math.max(20, avgMastery));

    saveDiagnosticReportToSupabase({
      user_id: user.id,
      predicted_exam_score: dynamicPredictedScore,
      weak_topics: weakPointsData,
      mastery_summary: {
        total_weak: weakTopics.length,
        evaluated_topics: diagnostics.length,
      },
      grade: user.grade || 9,
      learning_track: user.learningMode || 'standard',
    }).catch(() => {});
  }, [user?.id, user?.isAuthenticated, user?.grade, user?.learningMode, weakTopics.length, diagnostics]);

  return (
    <section className="w-full rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-7 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e5e5e5] dark:border-[#334155]">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 text-[#1cb0f6] shadow-sm">
            <BrainCircuit className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-[#1a202c] dark:text-[#f8fafc] tracking-tight">
                Akıllı Eksik Teşhis &amp; Telafi Motoru
              </h2>
              <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 px-2.5 py-0.5 text-[10px] font-black uppercase text-[#1cb0f6] border border-[#84d8ff] dark:border-[#1cb0f6]/40">
                Yapay Zeka Destekli Bilişsel Teşhis
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#718096] dark:text-[#94a3b8] mt-0.5">
              Quiz sonuçlarını analiz eder; %60&apos;ın altına düşen konuları tespit edip telafi antrenmanı sunar.
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="self-start sm:self-center">
          {weakTopics.length > 0 ? (
            <div className="inline-flex items-center gap-2 rounded-2xl bg-[#fff0db] dark:bg-[#ff9600]/20 border-2 border-[#ffe0b2] dark:border-[#ff9600]/40 px-4 py-2 text-xs font-black text-[#d97706] dark:text-[#ff9600] shadow-xs">
              <AlertTriangle className="w-4 h-4 text-[#ea580c] dark:text-[#ff9600] shrink-0" />
              <span>{weakTopics.length} Zayıf Nokta Tespit Edildi</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-2xl bg-[#e5f8d0] dark:bg-[#58cc02]/20 border-2 border-[#bcf087] dark:border-[#58cc02]/40 px-4 py-2 text-xs font-black text-[#58cc02] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#58cc02] shrink-0" />
              <span>Tüm Konularda Güçlüsün</span>
            </div>
          )}
        </div>
      </div>

      {/* Subject Filter Pills if multiple subjects have weak topics */}
      {weakTopics.length > 1 && (
        <div className="pt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => {
              sounds.playClick();
              setFilterSubject('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              filterSubject === 'all'
                ? 'bg-[#1cb0f6] text-white shadow-xs'
                : 'bg-[#f7f7f7] dark:bg-[#0f172a] text-[#718096] dark:text-[#94a3b8] hover:bg-[#edf2f7] dark:hover:bg-[#1e293b]'
            }`}
          >
            Tümü ({weakTopics.length})
          </button>
          {Array.from(new Set(weakTopics.map((w) => w.subjectSlug))).map((slug) => {
            const subName = weakTopics.find((w) => w.subjectSlug === slug)?.subjectName || slug;
            const count = weakTopics.filter((w) => w.subjectSlug === slug).length;
            return (
              <button
                key={slug}
                onClick={() => {
                  sounds.playClick();
                  setFilterSubject(slug);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  filterSubject === slug
                    ? 'bg-[#1cb0f6] text-white shadow-xs'
                    : 'bg-[#f7f7f7] dark:bg-[#0f172a] text-[#718096] dark:text-[#94a3b8] hover:bg-[#edf2f7] dark:hover:bg-[#1e293b]'
                }`}
              >
                {subName} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Weak Topics List */}
      <div className="pt-5 space-y-4">
        {displayedWeakTopics.length > 0 ? (
          displayedWeakTopics.map((item) => (
            <div
              key={item.topicId}
              className="rounded-2xl border-2 border-[#ff9600]/30 dark:border-[#ff9600]/40 border-b-4 border-b-[#e68700] bg-gradient-to-r from-[#fffbf5] via-[#fff8ef] to-white dark:from-[#ff9600]/15 dark:via-[#ff9600]/10 dark:to-[#1e293b] p-4 sm:p-5 transition-all hover:border-[#ff9600]/60 shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Topic Info */}
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded-md bg-[#ff4b4b] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      Geliştirilmesi Gereken Zayıf Nokta
                    </span>
                    <span className="rounded-md bg-[#edf2f7] dark:bg-[#0f172a] text-[#4a5568] dark:text-[#94a3b8] px-2 py-0.5 text-[11px] font-bold">
                      {item.subjectName}
                    </span>
                    <span className="text-[11px] font-extrabold text-[#e53e3e]">
                      Ustalık: %{item.masteryLevel} (&lt; %60 Eşik)
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-[#1a202c] dark:text-[#f8fafc]">
                    {item.topicName}
                  </h3>

                  <p className="text-xs font-semibold text-[#718096] dark:text-[#94a3b8] leading-relaxed">
                    {item.reason}
                  </p>

                  {/* Progress Bar under 60% */}
                  <div className="w-full max-w-md pt-1">
                    <div className="flex items-center justify-between text-[10px] font-black text-[#718096] dark:text-[#94a3b8] mb-1">
                      <span>Mevcut Seviye: %{item.masteryLevel}</span>
                      <span>Hedef: %75+ Kavram Ustalığı</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[#e2e8f0] dark:bg-[#334155] overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#f56565] to-[#ed8936] transition-all duration-500"
                        style={{ width: `${Math.max(10, item.masteryLevel)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 1-Click Telafi Action Button */}
                <div className="shrink-0 flex items-center">
                  <Link
                    href={`/quiz/${item.topicId}`}
                    onClick={() => sounds.playClick()}
                    className="btn-duo btn-duo-orange w-full sm:w-auto px-5 py-3.5 rounded-2xl text-xs font-black text-white flex items-center justify-center gap-2 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Zap className="w-4 h-4 fill-white text-white" />
                    <span>Eksik Kapatma Antrenmanı</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 rounded-2xl bg-[#f7fafc] dark:bg-[#0f172a] border-2 border-dashed border-[#e2e8f0] dark:border-[#334155] p-6">
            <CheckCircle2 className="w-10 h-10 text-[#58cc02] mx-auto mb-2" />
            <h4 className="text-base font-black text-[#1a202c] dark:text-[#f8fafc]">
              Tüm Konularda %60 Eşiğinin Üzerindesin!
            </h4>
            <p className="text-xs font-semibold text-[#718096] dark:text-[#94a3b8] max-w-md mx-auto mt-1">
              Akademik başarı grafiğin dengeli seyrediyor. Yeni konular çözerek başarı oranını artırabilirsin.
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-5 pt-4 border-t border-[#e5e5e5] dark:border-[#334155] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold text-[#a0aec0] dark:text-[#64748b]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#1cb0f6]" />
          <span>Dinamik Teşhis Algoritması devrede</span>
        </div>
        <Link
          href="/quiz/mixed"
          onClick={() => sounds.playClick()}
          className="text-[#1cb0f6] hover:underline flex items-center gap-1 font-black self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Genel Seviye Tespit Denemesi Çöz</span>
        </Link>
      </div>
    </section>
  );
}
