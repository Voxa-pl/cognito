'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BrainCircuit,
  Target,
  Trophy,
  Zap,
  ArrowRight,
  Compass,
  ShieldCheck,
  Flame,
  User,
  BarChart3,
  Award,
} from 'lucide-react';
import { sounds } from '@/lib/sound';
import { useUserStore } from '@/stores/useUserStore';
import { CognitoLogo } from '@/components/ui/CognitoLogo';
import LegalDisclosureAccordion from '@/components/common/LegalDisclosureAccordion';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthenticated = mounted && Boolean(user?.isAuthenticated);

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#f7f7f7] dark:bg-[#0f172a] text-[#1a202c] dark:text-[#f8fafc]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 w-full border-b-2 border-[#e5e5e5] dark:border-[#334155] bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            onClick={() => sounds.playClick()}
            className="flex items-center gap-3 group"
          >
            <CognitoLogo size="sm" showTagline={false} />
          </Link>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                onClick={() => sounds.playClick()}
                className="btn-duo btn-duo-green px-5 py-2 text-xs font-black text-white rounded-xl flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>AKADEMİK KOKPİT</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => sounds.playClick()}
                  className="text-xs sm:text-sm font-black text-[#718096] dark:text-[#94a3b8] hover:text-[#1a202c] dark:hover:text-[#f8fafc] px-3 py-2 rounded-xl transition-colors"
                >
                  GİRİŞ YAP
                </Link>
                <Link
                  href="/register"
                  onClick={() => sounds.playClick()}
                  className="btn-duo btn-duo-blue px-4 sm:px-5 py-2 text-xs sm:text-sm font-black text-white rounded-xl"
                >
                  KAYIT OL
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 sm:py-16">
        <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
          {/* Tagline Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 px-5 py-2 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#1cb0f6] fill-[#1cb0f6]" />
            <span className="text-xs sm:text-sm font-black text-[#1cb0f6] dark:text-[#38bdf8] tracking-wide uppercase">
              Türkiye&apos;nin Yeni Nesil Akademik Öğrenme Platformu
            </span>
          </div>

          {/* Prestigious Cognito Dual-Tone Emblem */}
          <div className="mb-6 relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1cb0f6] to-[#0b84c7] border-b-6 border-[#086da5] text-white shadow-xl animate-bounce">
            <BrainCircuit className="w-13 h-13 stroke-[2.5]" />
            <div className="absolute -top-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#58cc02] border-3 border-white dark:border-[#0f172a] shadow-md">
              <Sparkles className="w-4 h-4 fill-white text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="mb-4 text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#1a202c] dark:text-[#f8fafc]">
            Akademik Başarının <br className="hidden sm:inline" />
            <span className="text-[#1cb0f6] dark:text-[#38bdf8]">En Güçlü</span> ve <span className="text-[#58cc02]">Akıllı</span> Yolu!
          </h1>

          <p className="mb-8 text-base sm:text-lg text-[#718096] dark:text-[#94a3b8] font-semibold max-w-2xl leading-relaxed">
            Cognito ile lise akademik hedeflerinde eksiklerini anında tespit et, S-Curve haritasında ilerle ve kazanım takip sistemi ile okul sınavlarında en yüksek başarıya ulaş.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                onClick={() => sounds.playClick()}
                className="btn-duo btn-duo-green w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-black text-white shadow-xl group cursor-pointer"
              >
                <span>DERSLERE DEVAM ET</span>
                <ArrowRight className="w-6 h-6 stroke-[3] transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={() => sounds.playClick()}
                  className="btn-duo btn-duo-green w-full sm:flex-1 inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 sm:py-5 text-base sm:text-lg font-black text-white shadow-xl group cursor-pointer"
                >
                  <span>ÖĞRENMEYE BAŞLA</span>
                  <ArrowRight className="w-6 h-6 stroke-[3] transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/login"
                  onClick={() => sounds.playClick()}
                  className="btn-duo btn-duo-white w-full sm:w-auto inline-flex items-center justify-center rounded-2xl px-8 py-4 sm:py-5 text-base sm:text-lg font-black text-[#1cb0f6] dark:text-[#38bdf8] border-[#84d8ff] dark:bg-[#1e293b] dark:border-[#334155] dark:border-b-[#283a45] shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <span>ZATEN HESABIM VAR</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Feature Cards Grid (Super-Features Surpassing EBA) */}
        <div className="relative z-10 mt-16 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1: Akıllı Eksik Teşhis */}
          <div className="flex flex-col items-center rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-6 text-center transition-all hover:bg-[#fcfcfc] dark:hover:bg-[#283a45] hover:translate-y-[-2px] shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 text-[#1cb0f6] shadow-sm">
              <BrainCircuit className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="mb-1.5 text-lg font-black text-[#1a202c] dark:text-[#f8fafc]">Akıllı Teşhis Motoru</h3>
            <p className="text-xs font-semibold text-[#718096] dark:text-[#94a3b8] leading-relaxed">
              Quiz sonuçlarını analiz ederek %60 altındaki zayıf noktaları tespit eder ve 1-tıkla telafi sunar.
            </p>
          </div>

          {/* Feature 2: Kazanım Takip Sistemi */}
          <div className="flex flex-col items-center rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-6 text-center transition-all hover:bg-[#fcfcfc] dark:hover:bg-[#283a45] hover:translate-y-[-2px] shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff8db] dark:bg-[#ffc800]/20 border-2 border-[#ffe066] dark:border-[#ffc800]/40 text-[#ffc800] shadow-sm">
              <Target className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="mb-1.5 text-lg font-black text-[#1a202c] dark:text-[#f8fafc]">Kazanım Radarı</h3>
            <p className="text-xs font-semibold text-[#718096] dark:text-[#94a3b8] leading-relaxed">
              Tamamlanan ders kazanımlarına göre tahmini dönem okul sınavı başarı puanını dinamik hesaplar.
            </p>
          </div>

          {/* Feature 3: Duolingo S-Curve Learning Path */}
          <div className="flex flex-col items-center rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-6 text-center transition-all hover:bg-[#fcfcfc] dark:hover:bg-[#283a45] hover:translate-y-[-2px] shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e5f8d0] dark:bg-[#58cc02]/20 border-2 border-[#bcf087] dark:border-[#58cc02]/40 text-[#58cc02] shadow-sm">
              <Compass className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="mb-1.5 text-lg font-black text-[#1a202c] dark:text-[#f8fafc]">S-Curve Yolu</h3>
            <p className="text-xs font-semibold text-[#718096] dark:text-[#94a3b8] leading-relaxed">
              Ders konularını adım adım açılan interaktif öğrenme haritasında tamamla, ara kontrol noktalarını geç.
            </p>
          </div>

          {/* Feature 4: Phoenix Telafi Modu */}
          <div className="flex flex-col items-center rounded-3xl border-2 border-[#ff9600]/30 dark:border-[#ff9600]/40 border-b-6 border-b-[#e68700] dark:border-b-[#9a5800] bg-gradient-to-b from-[#fffbf5] to-[#fff4e6] dark:from-[#1e293b] dark:to-[#0f172a] p-6 text-center transition-all hover:translate-y-[-2px] shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff0db] dark:bg-[#ff9600]/20 border-2 border-[#ffb74d] dark:border-[#ff9600]/40 text-[#ff9600] shadow-sm">
              <Flame className="w-7 h-7 fill-[#ff9600]" />
            </div>
            <h3 className="mb-1.5 text-lg font-black text-[#1a202c] dark:text-[#f8fafc]">Phoenix Güçlendirme</h3>
            <p className="text-xs font-semibold text-[#718096] dark:text-[#94a3b8] leading-relaxed">
              Sınıf tekrarı yapanlara özel Zümrüdüanka güçlendirme planı ve temelleri sağlamlaştırma odağı.
            </p>
          </div>
        </div>
      </main>

      {/* Footer & Legal Disclosure */}
      <footer className="border-t-2 border-[#e5e5e5] dark:border-[#334155] bg-white dark:bg-[#0f172a] py-8 px-4">
        <LegalDisclosureAccordion />
      </footer>
    </div>
  );
}
