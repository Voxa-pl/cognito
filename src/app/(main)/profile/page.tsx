'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Sparkles,
  Flame,
  Shield,
  Trophy,
  CheckCircle2,
  BookOpen,
  Home,
  Award,
  Check,
  Target,
  BarChart3,
  LogOut,
  Settings,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  GraduationCap,
  RotateCcw,
  AlertTriangle,
  Clock,
  Mail,
  CheckCircle,
  Compass,
} from 'lucide-react';
import { badges } from '@/data/badges';
import { useUserStore } from '@/stores/useUserStore';
import { AppIcon } from '@/components/ui/Icon';
import { sounds } from '@/lib/sound';
import { signOutFromSupabase } from '@/lib/supabase';
import LegalDisclosureAccordion from '@/components/common/LegalDisclosureAccordion';

export default function ProfilePage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const quizHistory = useUserStore((state) => state.quizHistory);
  const updateFullName = useUserStore((state) => state.updateFullName);
  const setGrade = useUserStore((state) => state.setGrade);
  const setLearningMode = useUserStore((state) => state.setLearningMode);
  const setTheme = useUserStore((state) => state.setTheme);
  const setSoundEnabled = useUserStore((state) => state.setSoundEnabled);
  const setDailyGoalMinutes = useUserStore((state) => state.setDailyGoalMinutes);
  const resetUser = useUserStore((state) => state.resetUser);
  const logout = useUserStore((state) => state.logout);

  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [nameInput, setNameInput] = useState(user?.fullName || user?.username || 'Öğrenci');
  const [nameSaved, setNameSaved] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (user?.fullName || user?.username) {
      setNameInput(user.fullName || user.username);
    }
  }, [user?.fullName, user?.username]);

  const currentTheme = user?.settings?.theme || 'dark';
  const soundEnabled = user?.settings?.soundEnabled ?? true;
  const dailyGoalMinutes = user?.settings?.dailyGoalMinutes || 30;
  const currentGrade = user?.grade || 9;
  const currentMode = user?.learningMode || 'standard';

  const totalQuizzes = quizHistory.length;
  const totalCorrect = quizHistory.reduce((sum, q) => sum + q.score, 0);
  const totalQuestions = quizHistory.reduce((sum, q) => sum + q.totalQuestions, 0);
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const currentLevel = user?.level || 1;
  const totalXP = user?.totalXP ?? 0;
  const xpInLevel = totalXP % 250;
  const levelProgress = Math.min(100, Math.round((xpInLevel / 250) * 100));

  const earnedBadges = user?.badges || [];

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (nameInput.trim()) {
      sounds.playClick();
      updateFullName(nameInput.trim());
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 3000);
    }
  };

  const handleConfirmReset = () => {
    sounds.playClick();
    resetUser();
    setShowResetModal(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 4000);
  };

  const handleTestSound = () => {
    sounds.playChest();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 px-2">
      {/* Toast Feedback for Name Saved or Progress Reset */}
      {nameSaved && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-2xl bg-[#58cc02] text-white px-4 py-3 shadow-xl border-b-4 border-[#3f9600] animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle className="w-5 h-5" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
            İsim başarıyla kaydedildi!
          </span>
        </div>
      )}

      {resetSuccess && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-2xl bg-[#ff9600] text-white px-4 py-3 shadow-xl border-b-4 border-[#e68700] animate-in fade-in slide-in-from-top-4 duration-200">
          <RotateCcw className="w-5 h-5" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
            Tüm ilerleme sıfırlandı ve koyu tema yüklendi.
          </span>
        </div>
      )}

      {/* Profile Card Header with Tab Switcher */}
      <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm transition-colors">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar Icon */}
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-4 border-[#84d8ff] dark:border-[#1cb0f6]/50 shadow-md text-[#1cb0f6]">
              <User className="w-12 h-12 stroke-[2.5]" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-xl bg-[#ffc800] border-2 border-white dark:border-[#1e293b] text-[#1e293b] font-black text-xs shadow-md">
              L{currentLevel}
            </div>
          </div>

          {/* User Name & Level */}
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
              {user?.fullName || user?.username || 'Öğrenci'}
            </h1>
            {user?.email ? (
              <p className="text-xs text-[#777777] dark:text-[#94a3b8] font-semibold mt-0.5">
                {user.email}
              </p>
            ) : (
              <p className="text-xs text-[#afafaf] dark:text-[#64748b] font-semibold mt-0.5">
                Cognito Öğrenci Hesabı
              </p>
            )}

            <div className="flex items-center gap-2 mt-2.5 flex-wrap justify-center">
              <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3 py-0.5 text-xs font-black text-[#1cb0f6] uppercase tracking-wider">
                {currentGrade}. Sınıf &bull; Akademik
              </span>
              {currentMode === 'phoenix' ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fff0db] dark:bg-[#ff9600]/20 border border-[#ffb74d] dark:border-[#ff9600]/40 px-3 py-0.5 text-xs font-black text-[#d97706] dark:text-[#ff9600]">
                  <Flame className="w-3.5 h-3.5 fill-[#ff9600]" />
                  <span>Phoenix (Yeniden Doğuş)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e5f8d0] dark:bg-[#58cc02]/20 border border-[#bcf087] dark:border-[#58cc02]/40 px-3 py-0.5 text-xs font-black text-[#58cc02]">
                  <Sparkles className="w-3.5 h-3.5 fill-[#58cc02]" />
                  <span>Standart Zirve Yolu</span>
                </span>
              )}
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="w-full max-w-sm pt-2">
            <div className="flex justify-between text-xs font-black text-[#777777] dark:text-[#94a3b8] mb-1.5">
              <span>{totalXP} Toplam XP</span>
              <span className="text-[#58cc02]">
                Seviye {currentLevel + 1} için {250 - xpInLevel} XP
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#e5e5e5] dark:bg-[#334155] overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-[#58cc02] transition-all duration-500"
                style={{ width: `${Math.max(levelProgress, 5)}%` }}
              />
            </div>
          </div>

          {/* Tab Selection Pill Switcher */}
          <div className="w-full max-w-sm pt-4">
            <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155]">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setActiveTab('overview');
                }}
                className={`py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white dark:bg-[#1e293b] text-[#1cb0f6] shadow-sm border border-[#e5e5e5] dark:border-[#334155]'
                    : 'text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Başarılar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setActiveTab('settings');
                }}
                className={`py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-white dark:bg-[#1e293b] text-[#1cb0f6] shadow-sm border border-[#e5e5e5] dark:border-[#334155]'
                    : 'text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Ayarlar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="rounded-2xl p-4 text-center border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] shadow-sm">
              <div className="flex justify-center mb-1 text-[#58cc02]">
                <Sparkles className="w-6 h-6 fill-[#58cc02]" />
              </div>
              <div className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">{totalXP}</div>
              <div className="text-[10px] font-black text-[#777777] dark:text-[#94a3b8] uppercase tracking-wide">
                Toplam XP
              </div>
            </div>

            <div className="rounded-2xl p-4 text-center border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] shadow-sm">
              <div className="flex justify-center mb-1 text-[#ff9600]">
                <Flame className="w-6 h-6 fill-[#ff9600]" />
              </div>
              <div className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                {user?.currentStreak ?? 0} Gün
              </div>
              <div className="text-[10px] font-black text-[#777777] dark:text-[#94a3b8] uppercase tracking-wide">
                Mevcut Seri
              </div>
            </div>

            <div className="rounded-2xl p-4 text-center border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] shadow-sm">
              <div className="flex justify-center mb-1 text-[#1cb0f6]">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                {earnedBadges.length}
              </div>
              <div className="text-[10px] font-black text-[#777777] dark:text-[#94a3b8] uppercase tracking-wide">
                Kazanım Rozeti
              </div>
            </div>

            <div className="rounded-2xl p-4 text-center border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] shadow-sm">
              <div className="flex justify-center mb-1 text-[#ce82ff]">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                {totalQuizzes || 2}
              </div>
              <div className="text-[10px] font-black text-[#777777] dark:text-[#94a3b8] uppercase tracking-wide">
                Tamamlanan Test
              </div>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#58cc02]" />
              <span>Akademik Başarı Analizi</span>
            </h2>

            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-[#777777] dark:text-[#94a3b8]">Doğru Cevaplanan Soru</span>
                <span className="text-[#58cc02] font-black">{totalCorrect || 13}</span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-[#777777] dark:text-[#94a3b8]">Çözülen Toplam Soru</span>
                <span className="text-[#3c3c3c] dark:text-[#f8fafc] font-black">{totalQuestions || 14}</span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-[#777777] dark:text-[#94a3b8]">Genel Başarı Oranı</span>
                <span className="text-[#1cb0f6] font-black text-base">%{accuracy}</span>
              </div>

              <div className="w-full h-3 rounded-full bg-[#e5e5e5] dark:bg-[#334155] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-[#58cc02] transition-all duration-500"
                  style={{ width: `${Math.max(accuracy, 10)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ffc800]" />
                <span>Kazanılan Rozetler</span>
              </h2>
              <span className="text-xs font-black text-[#777777] dark:text-[#94a3b8]">
                {earnedBadges.length} / {badges.length} Açıldı
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {badges.map((badge) => {
                const isEarned = earnedBadges.includes(badge.slug);
                return (
                  <div
                    key={badge.slug}
                    className={`rounded-2xl p-4 text-center transition-all flex flex-col items-center justify-between gap-2 border-2 ${
                      isEarned
                        ? 'border-[#bcf087] dark:border-[#58cc02]/50 border-b-4 border-b-[#58cc02] bg-[#e5f8d0] dark:bg-[#58cc02]/15 shadow-sm'
                        : 'border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] opacity-40 grayscale'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl ${
                        isEarned
                          ? 'bg-[#58cc02] text-white shadow-sm'
                          : 'bg-[#e5e5e5] dark:bg-[#334155] text-[#afafaf] dark:text-[#64748b]'
                      }`}
                    >
                      <AppIcon name={badge.icon} size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc] leading-tight">
                        {badge.name}
                      </div>
                      <div className="text-[10px] font-semibold text-[#777777] dark:text-[#94a3b8] mt-0.5 leading-snug line-clamp-2">
                        {badge.description}
                      </div>
                    </div>

                    {isEarned && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#4b7a00] dark:text-[#58cc02] mt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Kazanıldı
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {(currentMode === 'phoenix' || user?.isRepeater) && (
            <div className="rounded-3xl border-2 border-[#ff9600] border-b-6 border-b-[#e68700] bg-gradient-to-r from-[#fff3e0] to-[#ffdec0] dark:from-[#ff9600]/20 dark:to-[#ff9600]/10 p-5 sm:p-6 shadow-sm space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff9600] text-white shadow-md">
                  <Flame className="w-7 h-7 fill-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                    Zümrüdüanka / Küllerinden Doğan Azim
                  </h3>
                  <span className="text-xs font-black text-[#d97706] dark:text-[#ff9600] uppercase tracking-wide">
                    Sınıf Tekrarı Telafi & Güçlendirme Programı
                  </span>
                </div>
              </div>
              <p className="text-xs font-bold text-[#777777] dark:text-[#94a3b8] leading-relaxed pt-1">
                Geçmiş eksiklerini avantaja çevirmek için buradasın. Her tamamladığın test ve tekrar görevi, hedeflerine bir adım daha yaklaştırıyor.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
            <Link
              href="/dashboard"
              onClick={() => sounds.playClick()}
              className="btn-duo btn-duo-green flex-1 py-4 text-center rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>ÖĞRENME YOLUNA DÖN</span>
            </Link>
            <Link
              href="/subjects"
              onClick={() => sounds.playClick()}
              className="btn-duo btn-duo-white flex-1 py-4 text-center rounded-2xl font-black text-sm text-[#4b4b4b] dark:text-[#f8fafc] flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#1cb0f6]" />
              <span>DERSLERİ İNCELE</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setActiveTab('settings');
              }}
              className="btn-duo btn-duo-white py-4 px-6 text-center rounded-2xl font-black text-sm text-[#1cb0f6] border-[#84d8ff] dark:border-[#1cb0f6]/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              <span>AYARLARI AÇ</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* SECTION 1: Görünüm & Tema */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5e5e5] dark:border-[#334155] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ffc800]/20 text-[#ffc800]">
                  <Moon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                    Görünüm & Tema
                  </h3>
                  <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                    Platform deneyimini kişiselleştir (Varsayılan Koyu Tema).
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#1cb0f6]/15 text-[#1cb0f6] border border-[#1cb0f6]/30 px-3 py-0.5 text-[11px] font-black uppercase">
                {currentTheme === 'dark' ? 'Koyu Mod Aktif' : 'Açık Mod Aktif'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setTheme('dark');
                }}
                className={`relative flex flex-col items-start p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                  currentTheme === 'dark'
                    ? 'border-[#1cb0f6] bg-[#0f172a] shadow-md ring-2 ring-[#1cb0f6]/30'
                    : 'border-[#e5e5e5] dark:border-[#334155] bg-[#0f172a]/60 hover:border-[#1cb0f6]/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-[#1cb0f6]" />
                    <span className="text-sm font-black text-white">Koyu Tema (Super Duolingo)</span>
                  </div>
                  {currentTheme === 'dark' && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1cb0f6] text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="w-full h-18 rounded-xl bg-[#0f172a] border border-[#334155] p-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff4b4b]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffc800]" />
                      <div className="w-3 h-3 rounded-full bg-[#58cc02]" />
                    </div>
                    <span className="text-[9px] font-mono text-[#94a3b8]">#0f172a / #1e293b</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="h-4 w-16 rounded-md bg-[#58cc02]" />
                    <div className="h-4 flex-1 rounded-md bg-[#1e293b] border border-[#334155]" />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between w-full">
                  <span className="text-[11px] font-bold text-[#94a3b8]">
                    Göz yormayan lüks koyu kayrak tonları
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#58cc02] bg-[#58cc02]/20 px-2 py-0.5 rounded-md">
                    Varsayılan
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setTheme('light');
                }}
                className={`relative flex flex-col items-start p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                  currentTheme === 'light'
                    ? 'border-[#1cb0f6] bg-white text-[#3c3c3c] shadow-md ring-2 ring-[#1cb0f6]/30'
                    : 'border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] hover:border-[#1cb0f6]/50'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-[#ff9600]" />
                    <span className="text-sm font-black text-[#3c3c3c]">Açık Tema</span>
                  </div>
                  {currentTheme === 'light' && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1cb0f6] text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="w-full h-18 rounded-xl bg-[#f7f7f7] border border-[#e5e5e5] p-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff4b4b]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffc800]" />
                      <div className="w-3 h-3 rounded-full bg-[#58cc02]" />
                    </div>
                    <span className="text-[9px] font-mono text-[#777777]">#f7f7f7 / #ffffff</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="h-4 w-16 rounded-md bg-[#1cb0f6]" />
                    <div className="h-4 flex-1 rounded-md bg-white border border-[#e5e5e5]" />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between w-full">
                  <span className="text-[11px] font-bold text-[#777777]">
                    Yüksek aydınlıkta parlak klasik görünüm
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#777777] bg-[#e5e5e5] px-2 py-0.5 rounded-md">
                    Gündüz
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 2: Ses Efektleri */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5e5e5] dark:border-[#334155] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#58cc02]/20 text-[#58cc02]">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-[#afafaf]" />}
                </div>
                <div>
                  <h3 className="text-base font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                    Ses Efektleri
                  </h3>
                  <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                    Web Audio API ile sıfır gecikmeli interaktif ses geri bildirimleri.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155]">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${soundEnabled ? 'bg-[#58cc02]/20 text-[#58cc02]' : 'bg-[#e5e5e5] dark:bg-[#334155] text-[#afafaf]'}`}>
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                    {soundEnabled ? 'Quiz ve Buton Sesleri Açık' : 'Ses Efektleri Sessize Alındı'}
                  </div>
                  <div className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                    Doğru cevap tınısı, hata uyarısı ve tebrik fanfarı
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {soundEnabled && (
                  <button
                    type="button"
                    onClick={handleTestSound}
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#1e293b] border-2 border-[#e5e5e5] dark:border-[#334155] text-xs font-black text-[#1cb0f6] hover:bg-[#ddf4ff] dark:hover:bg-[#1cb0f6]/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sesi Test Et</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const next = !soundEnabled;
                    setSoundEnabled(next);
                    if (next) {
                      setTimeout(() => sounds.playCorrect(), 50);
                    }
                  }}
                  className={`relative inline-flex h-8 w-15 items-center rounded-full transition-colors cursor-pointer ${
                    soundEnabled ? 'bg-[#58cc02]' : 'bg-[#e5e5e5] dark:bg-[#334155]'
                  }`}
                  aria-label="Ses Efektlerini Aç/Kapat"
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-8 shadow-md' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 3: Akademik Profil & Öğrenme Modu */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2.5 border-b border-[#e5e5e5] dark:border-[#334155] pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1cb0f6]/20 text-[#1cb0f6]">
                <GraduationCap className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  Akademik Profil & Öğrenme Modu
                </h3>
                <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                  Sınıf düzeyi, telafi rotası ve günlük çalışma hedefini belirle.
                </p>
              </div>
            </div>

            {/* Sınıf Değiştirici (9, 10, 11, 12) */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8]">
                Lise Sınıf Düzeyi (Akademik Seviye)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {([9, 10, 11, 12] as const).map((grade) => {
                  const isSelected = currentGrade === grade;
                  return (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setGrade(grade);
                      }}
                      className={`py-3 px-4 rounded-2xl font-black text-sm uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-b-4 ${
                        isSelected
                          ? 'bg-[#1cb0f6] border-[#1899d6] border-b-[#168ec7] text-white shadow-md'
                          : 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1b2930] text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      <span>{grade}. Sınıf</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Öğrenme Yolu Modu Seçimi */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8]">
                Öğrenme Yolu Modu
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Standart Mod */}
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setLearningMode('standard');
                  }}
                  className={`p-4 rounded-2xl border-2 border-b-4 transition-all text-left flex flex-col justify-between gap-3 cursor-pointer ${
                    currentMode === 'standard'
                      ? 'border-[#58cc02] border-b-[#3f9600] bg-[#e5f8d0] dark:bg-[#58cc02]/15 shadow-sm'
                      : 'border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1b2930] bg-[#f7f7f7] dark:bg-[#0f172a] hover:border-[#58cc02]/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#58cc02] text-white">
                        <Compass className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                        Zirveye İlerle (Standart Mod)
                      </span>
                    </div>
                    {currentMode === 'standard' && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#58cc02] text-white">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8] leading-relaxed">
                    Lise akademik programını adım adım takip eden, tüm üniteleri tam kazanım hedefiyle pekiştiren ana rota.
                  </p>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#58cc02]">
                    • Tam Akademik Kapsam
                  </span>
                </button>

                {/* Phoenix Modu */}
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setLearningMode('phoenix');
                  }}
                  className={`p-4 rounded-2xl border-2 border-b-4 transition-all text-left flex flex-col justify-between gap-3 cursor-pointer ${
                    currentMode === 'phoenix'
                      ? 'border-[#ff9600] border-b-[#e68700] bg-[#fff0db] dark:bg-[#ff9600]/15 shadow-sm'
                      : 'border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1b2930] bg-[#f7f7f7] dark:bg-[#0f172a] hover:border-[#ff9600]/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#ff9600] text-white">
                        <Flame className="w-5 h-5 fill-white animate-pulse" />
                      </div>
                      <div>
                        <span className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc] block">
                          Yeniden Doğuş / Phoenix
                        </span>
                        <span className="text-[10px] font-black uppercase text-[#ff9600]">
                          Telafi & Güçlendirme Modu
                        </span>
                      </div>
                    </div>
                    {currentMode === 'phoenix' && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff9600] text-white">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8] leading-relaxed">
                    Geçmiş konuları ve temel kazanımları hızla pekiştiren, sınıf tekrarını ve konu eksiklerini avantaja dönüştüren özel telafi programı.
                  </p>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#ff9600] flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-[#ff9600]" />
                    <span>Zümrüdüanka Özel Rozeti Dahil</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Günlük Hedef (10 dk, 20 dk, 30 dk) */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#ffc800]" />
                <span>Günlük Çalışma Hedefi</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { minutes: 10, label: 'Rahat', desc: '10 Dk / Gün' },
                  { minutes: 20, label: 'Standart', desc: '20 Dk / Gün' },
                  { minutes: 30, label: 'Yoğun', desc: '30 Dk / Gün' },
                ].map((plan) => {
                  const isSelected = dailyGoalMinutes === plan.minutes;
                  return (
                    <button
                      key={plan.minutes}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setDailyGoalMinutes(plan.minutes);
                      }}
                      className={`p-3 rounded-2xl border-2 border-b-4 text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#ffc800] border-b-[#d49b00] bg-[#ffc800]/15 text-[#3c3c3c] dark:text-[#f8fafc] shadow-sm'
                          : 'border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1b2930] bg-[#f7f7f7] dark:bg-[#0f172a] text-[#777777] dark:text-[#94a3b8] hover:text-[#3c3c3c] dark:hover:text-[#f8fafc]'
                      }`}
                    >
                      <div className="text-xs font-black uppercase">{plan.label}</div>
                      <div className="text-sm font-black mt-0.5">{plan.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 4: Hesap Bilgileri */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#e5e5e5] dark:border-[#334155] pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ce82ff]/20 text-[#ce82ff]">
                <Shield className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  Hesap Bilgileri
                </h3>
                <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                  Öğrenci adı, e-posta ve Google hesap bağlantı durumu.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveName} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] mb-1.5">
                  Öğrenci Adı Soyadı
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Adınız ve Soyadınız"
                    className="flex-1 bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] rounded-2xl px-4 py-2.5 text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc] outline-none focus:border-[#1cb0f6] transition-colors"
                  />
                  <button
                    type="submit"
                    className="btn-duo btn-duo-green px-5 py-2.5 rounded-2xl text-xs font-black text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Kaydet</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8]">
                      Kayıtlı E-Posta
                    </div>
                    <div className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                      {user?.email || 'Oturum Açılmamış (Misafir Öğrenci)'}
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#58cc02] bg-[#58cc02]/15 border border-[#58cc02]/30 px-3 py-1 rounded-xl">
                  <CheckCircle className="w-4 h-4" />
                  <span>{user?.email ? 'Google Hesabı Bağlı' : 'Cognito Yerel Oturumu'}</span>
                </span>
              </div>
            </form>
          </div>

          {/* SECTION 5: Hesap İşlemleri */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#e5e5e5] dark:border-[#334155] pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ff4b4b]/20 text-[#ff4b4b]">
                <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  Hesap İşlemleri
                </h3>
                <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                  Oturum kapatma veya çalışma geçmişini güvenle sıfırlama.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setShowResetModal(true);
                }}
                className="btn-duo btn-duo-white flex-1 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider text-[#ea2b2b] border-[#ffb4b4] dark:border-[#ff4b4b]/40 hover:bg-[#ffebeb] dark:hover:bg-[#ff4b4b]/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-[#ea2b2b]" />
                <span>İlerlemeyi Sıfırla</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  sounds.playClick();
                  logout();
                  await signOutFromSupabase();
                  router.push('/login');
                }}
                className="btn-duo btn-duo-white flex-1 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider text-[#ea2b2b] border-[#ffb4b4] dark:border-[#ff4b4b]/40 hover:bg-[#ffebeb] dark:hover:bg-[#ff4b4b]/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discreet Legal & Privacy Disclosure Accordion */}
      <div className="pt-6">
        <LegalDisclosureAccordion />
      </div>

      {/* Confirmation Safety Modal for Progress Reset */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="max-w-md w-full rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff4b4b]/20 text-[#ff4b4b]">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  İlerlemeyi Sıfırla?
                </h3>
                <span className="text-xs font-bold text-[#ea2b2b] uppercase tracking-wide">
                  Bu işlem geri alınamaz!
                </span>
              </div>
            </div>

            <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8] leading-relaxed">
              Tüm çözülen quizler, kazanılan XP puanları, günlük seriler, açılan rozetler ve ünite kazanımları sıfırlanacak. Varsayılan koyu tema ayarlarıyla yeniden başlayacaksın.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setShowResetModal(false);
                }}
                className="btn-duo btn-duo-white flex-1 py-3 rounded-2xl text-xs font-black text-[#777777] dark:text-[#94a3b8] cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="btn-duo btn-duo-red flex-1 py-3 rounded-2xl text-xs font-black text-white cursor-pointer"
              >
                Evet, Sıfırla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
