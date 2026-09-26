'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Flame,
  Heart,
  Sparkles,
  ChevronDown,
  Check,
  Infinity as InfinityIcon,
  User as UserIcon,
  Compass,
  Shield,
  Zap,
  Sun,
  Moon,
  Target,
  BookOpen,
} from 'lucide-react';
import { subjects } from '@/data/subjects';
import { useUserStore } from '@/stores/useUserStore';
import { AppIcon } from '@/components/ui/Icon';
import { sounds } from '@/lib/sound';

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const activeSubjectSlug = useUserStore((state) => state.activeSubjectSlug);
  const setActiveSubject = useUserStore((state) => state.setActiveSubject);
  const selectedMode = useUserStore((state) => state.selectedMode);
  const setGameMode = useUserStore((state) => state.setGameMode);
  const setTheme = useUserStore((state) => state.setTheme);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [heartsModalOpen, setHeartsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLDivElement>(null);

  const activeSubject = subjects.find((s) => s.slug === activeSubjectSlug) || subjects[0];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (heartsRef.current && !heartsRef.current.contains(e.target as Node)) {
        setHeartsModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSubject = (slug: string) => {
    sounds.playClick();
    setActiveSubject(slug);
    setDropdownOpen(false);
    // If not on dashboard, navigate to dashboard to see the switched path
    if (pathname !== '/dashboard' && !pathname.startsWith('/subjects')) {
      router.push('/dashboard');
    }
  };

  const theme = user?.settings?.theme || 'dark';

  const toggleGameMode = () => {
    sounds.playClick();
    const newMode = selectedMode === 'challenge' ? 'practice' : 'challenge';
    setGameMode(newMode);
    setHeartsModalOpen(false);
  };

  const handleToggleTheme = () => {
    sounds.playClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#e5e5e5] dark:border-[#334155] bg-white/95 dark:bg-[#131f24]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Left: Active Subject Switcher Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              sounds.playClick();
              setDropdownOpen((prev) => !prev);
            }}
            className="group flex items-center gap-2.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] px-3 py-1.5 transition-all hover:bg-[#f7f7f7] dark:hover:bg-[#283a45] hover:border-[#d0d0d0] active:translate-y-[2px] active:border-b-2 cursor-pointer"
            aria-label="Ders Seçimi"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] shadow-sm">
              <AppIcon name={activeSubject.icon} size={16} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#afafaf] dark:text-[#64748b]">
                AKTİF DERS
              </span>
              <span className="text-xs sm:text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                {activeSubject.name}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-[#afafaf] dark:text-[#64748b] transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180 text-[#1cb0f6]' : 'group-hover:text-[#4b4b4b] dark:group-hover:text-[#f8fafc]'
              }`}
            />
          </button>

          {/* Subject Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-2.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="mb-2 px-3 pt-1 text-[11px] font-black uppercase tracking-wider text-[#afafaf] dark:text-[#64748b]">
                Akademik Dersi Seç
              </div>

              <div className="max-h-[360px] space-y-1 overflow-y-auto pr-1">
                {subjects.map((sub) => {
                  const isCurrent = sub.slug === activeSubjectSlug;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSelectSubject(sub.slug)}
                      className={`flex w-full items-center justify-between rounded-2xl p-2.5 text-left transition-all ${
                        isCurrent
                          ? 'bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-2 border-[#84d8ff] dark:border-[#1cb0f6]/50 text-[#1cb0f6] font-black'
                          : 'hover:bg-[#f7f7f7] dark:hover:bg-[#283a45] text-[#4b4b4b] dark:text-[#f8fafc] font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                            isCurrent
                              ? 'bg-[#1cb0f6] text-white shadow-md'
                              : 'bg-[#f7f7f7] dark:bg-[#131f24] text-[#777777] dark:text-[#94a3b8]'
                          }`}
                        >
                          <AppIcon name={sub.icon} size={18} />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm">{sub.name}</div>
                          <div className="text-[11px] font-semibold text-[#afafaf] dark:text-[#64748b]">
                            {sub.unitCount} Ünite
                          </div>
                        </div>
                      </div>

                      {isCurrent && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1cb0f6] text-white">
                          <Check className="h-4 w-4 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Academic Stats (Streak, XP, Mode, Theme, Profile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Counter (Günlük Çalışma Disiplini) */}
          <div
            className="flex items-center gap-1.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-white dark:bg-[#1e293b] px-2.5 sm:px-3 py-1.5 shadow-sm transition-all hover:border-[#ff9600]/40"
            title={`${user?.currentStreak || 3} Günlük Çalışma Disiplini`}
          >
            <Flame className="h-5 w-5 fill-[#ff9600] text-[#ff9600] animate-pulse" />
            <span className="text-xs sm:text-sm font-black text-[#ff9600]">
              {user?.currentStreak || 3}
            </span>
          </div>

          {/* Academic XP Counter */}
          <div
            className="flex items-center gap-1.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-white dark:bg-[#1e293b] px-2.5 sm:px-3 py-1.5 shadow-sm transition-all hover:border-[#1cb0f6]/40"
            title={`${user?.totalXP || 450} Akademik Başarı Puanı (XP)`}
          >
            <Target className="h-4.5 w-4.5 text-[#1cb0f6] stroke-[2.5]" />
            <span className="text-xs sm:text-sm font-black text-[#1cb0f6]">
              {user?.totalXP || 450} XP
            </span>
          </div>

          {/* Sınav Modu / Serbest Öğrenme Modu Switcher */}
          <div className="relative" ref={heartsRef}>
            <button
              onClick={() => {
                sounds.playClick();
                setHeartsModalOpen((prev) => !prev);
              }}
              className={`flex items-center gap-1.5 rounded-2xl border-2 border-b-4 bg-white dark:bg-[#1e293b] px-2.5 sm:px-3 py-1.5 shadow-sm transition-all active:translate-y-[2px] active:border-b-2 cursor-pointer ${
                selectedMode === 'challenge'
                  ? 'border-[#ffdfe0] dark:border-[#ff4b4b]/40 border-b-[#ea2b2b]/30 hover:border-[#ff4b4b]'
                  : 'border-[#ddf4ff] dark:border-[#1cb0f6]/40 border-b-[#1cb0f6]/30 hover:border-[#1cb0f6]'
              }`}
              aria-label="Değerlendirme Modu"
            >
              {selectedMode === 'challenge' ? (
                <>
                  <Shield className="h-4.5 w-4.5 text-[#ff4b4b] stroke-[2.5]" />
                  <span className="text-xs sm:text-sm font-black text-[#ff4b4b]">
                    Sınav Modu
                  </span>
                </>
              ) : (
                <>
                  <BookOpen className="h-4.5 w-4.5 text-[#1cb0f6] stroke-[2.5]" />
                  <span className="text-xs sm:text-sm font-black text-[#1cb0f6] hidden sm:inline">
                    Öğrenme Modu
                  </span>
                </>
              )}
            </button>

            {/* Mode Switcher Popover */}
            {heartsModalOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center gap-3 pb-3 border-b border-[#e5e5e5] dark:border-[#334155]">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    selectedMode === 'challenge'
                      ? 'bg-[#ffdfe0] dark:bg-[#ff4b4b]/20 text-[#ff4b4b]'
                      : 'bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6]'
                  }`}>
                    {selectedMode === 'challenge' ? (
                      <Shield className="h-6 w-6 stroke-[2.5]" />
                    ) : (
                      <BookOpen className="h-6 w-6 stroke-[2.5]" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                      {selectedMode === 'challenge' ? 'Akademik Sınav Modu' : 'Serbest Öğrenme Modu'}
                    </h4>
                    <p className="text-xs text-[#777777] dark:text-[#94a3b8]">
                      {selectedMode === 'challenge'
                        ? 'Akademik sınav simülasyonu: Hata korumalı ve derecelendirme odaklı.'
                        : 'Baskısız konu pekiştirme ve detaylı kazanım açıklamaları.'}
                    </p>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={toggleGameMode}
                    className={`w-full py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white border-b-4 transition-all active:translate-y-1 active:border-b-0 cursor-pointer ${
                      selectedMode === 'challenge'
                        ? 'bg-[#1cb0f6] border-[#1899d6] hover:bg-[#2bc4ff]'
                        : 'bg-[#ff4b4b] border-[#ea2b2b] hover:bg-[#ff6161]'
                    }`}
                  >
                    {selectedMode === 'challenge'
                      ? 'Serbest Öğrenme Moduna Geç'
                      : 'Akademik Sınav Moduna Geç'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Theme Toggle Button */}
          <button
            onClick={handleToggleTheme}
            className="flex items-center justify-center h-9 w-9 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] text-[#ffc800] hover:scale-105 active:translate-y-[2px] active:border-b-2 shadow-sm transition-all cursor-pointer"
            title={theme === 'dark' ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
            aria-label="Tema Değiştir"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 stroke-[2.5] text-[#ffc800]" />
            ) : (
              <Moon className="h-4 w-4 stroke-[2.5] text-[#1cb0f6]" />
            )}
          </button>

          {/* User Avatar */}
          <Link
            href="/profile"
            onClick={() => sounds.playClick()}
            className={`relative flex h-9 w-9 items-center justify-center rounded-2xl border-2 border-b-4 transition-all hover:scale-105 active:translate-y-[2px] active:border-b-2 shadow-sm shrink-0 font-black text-xs cursor-pointer ${
              user?.learningMode === 'phoenix'
                ? 'bg-[#fff0db] dark:bg-[#ff9600]/20 border-[#ffb74d] dark:border-[#ff9600] border-b-[#e68700] text-[#ff9600]'
                : 'bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#283a45] text-[#1cb0f6]'
            }`}
            title={`Profil (${user?.username || 'Öğrenci'})`}
          >
            {user?.username ? user.username.charAt(0).toUpperCase() : <UserIcon className="h-5 w-5" />}
            {user?.learningMode === 'phoenix' && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff9600] text-white shadow-xs">
                <Flame className="w-2.5 h-2.5 fill-white text-white" />
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
