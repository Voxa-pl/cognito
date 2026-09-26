'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BrainCircuit,
  Sparkles,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Target,
} from 'lucide-react';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { useUserStore } from '@/stores/useUserStore';
import { sounds } from '@/lib/sound';
import { CognitoLogo } from '@/components/ui/CognitoLogo';
import LegalDisclosureAccordion from '@/components/common/LegalDisclosureAccordion';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const user = useUserStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user.isAuthenticated) {
      if (user.isOnboarded) {
        router.push(redirect);
      } else {
        router.push('/onboarding');
      }
    }
  }, [user.isAuthenticated, user.isOnboarded, redirect, router]);

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#0f172a] text-[#1a202c] dark:text-[#f8fafc] flex flex-col justify-between p-4 sm:p-6 md:p-10 transition-colors duration-200">
      {/* Top Brand Bar */}
      <header className="mx-auto w-full max-w-5xl flex items-center justify-between pb-6">
        <Link
          href="/"
          onClick={() => sounds.playClick()}
          className="flex items-center gap-3 group"
        >
          <CognitoLogo size="md" showTagline={true} />
        </Link>

        <Link
          href={`/login${redirect !== '/dashboard' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
          onClick={() => sounds.playClick()}
          className="btn-duo btn-duo-white px-5 py-2.5 rounded-2xl text-xs font-black text-[#1cb0f6] dark:text-[#38bdf8] border-[#84d8ff] dark:border-[#1cb0f6]/40 cursor-pointer"
        >
          GİRİŞ YAP
        </Link>
      </header>

      {/* Main Register Center Container */}
      <main className="mx-auto w-full max-w-4xl my-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-6">
        {/* Left: Gamified & Educational Value Proposition */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 bg-[#ddf4ff] dark:bg-[#1cb0f6]/15 px-4 py-1.5">
            <Sparkles className="w-4 h-4 text-[#1cb0f6] dark:text-[#38bdf8] fill-[#1cb0f6] dark:fill-[#38bdf8]" />
            <span className="text-xs font-black text-[#1cb0f6] dark:text-[#38bdf8] tracking-wide uppercase">
              GÜNCEL LİSE AKADEMİK STANDARTLARI
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1a202c] dark:text-[#f8fafc] leading-[1.15]">
            Akademik başarıyı <br />
            <span className="text-[#1cb0f6] dark:text-[#38bdf8]">öngören ve geliştiren</span> <br />
            yeni nesil platform.
          </h1>

          <p className="text-sm sm:text-base font-semibold text-[#718096] dark:text-[#94a3b8] leading-relaxed">
            Türkiye&apos;nin lise öğrenim standartlarına özel tasarlanan Cognito ile eksiklerini akıllı motorla tespit et, kazanım takip sistemini kullan ve okul sınavlarında en yüksek başarıya ulaş!
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#e5f8d0] dark:bg-[#58cc02]/20 text-[#58cc02] dark:text-[#61e002]">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#2d3748] dark:text-[#f8fafc]">
                9, 10, 11 ve 12. Sınıf Akademik Seviyelerine Tam Uyum
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] dark:text-[#38bdf8]">
                <Target className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#2d3748] dark:text-[#f8fafc]">
                Akıllı Eksik Teşhis Motoru &amp; Kazanım Takip Sistemi
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#fff0db] dark:bg-[#ff9600]/20 text-[#ff9600] dark:text-[#fbbf24]">
                <Flame className="w-4 h-4 fill-[#ff9600] dark:fill-[#fbbf24]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#2d3748] dark:text-[#f8fafc]">
                Sınıf Tekrarı Yapanlara Özel &quot;Phoenix Telafi &amp; Güçlendirme&quot; Desteği
              </span>
            </div>
          </div>
        </div>

        {/* Right: Auth Card with Google Sign In */}
        <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-8 border-b-[#cecece] dark:border-b-[#0f172a] bg-white dark:bg-[#1e293b] p-7 sm:p-9 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1cb0f6] to-[#0b84c7] text-white border-b-4 border-[#086da5] shadow-md mb-3">
              <BrainCircuit className="w-9 h-9 stroke-[2.5]" />
            </div>
            <h2 className="text-2xl font-black text-[#1a202c] dark:text-[#f8fafc]">
              Ücretsiz Cognito Hesabı Oluştur
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#718096] dark:text-[#94a3b8]">
              Saniyeler içinde Google hesabınla bağlan ve öğrenmeye başla.
            </p>
          </div>

          {/* Large Google Sign-In Tactile 3D Button */}
          <div className="pt-2">
            <GoogleSignInButton
              text="Google ile Devam Et"
              redirectTo={redirect}
              size="large"
            />
          </div>

          {/* Trust Banner */}
          <div className="flex items-center justify-center gap-2 rounded-2xl bg-slate-50 dark:bg-[#0f172a]/70 border border-slate-200 dark:border-[#334155] p-3 text-[11px] font-bold text-slate-600 dark:text-[#94a3b8]">
            <ShieldCheck className="w-4 h-4 text-[#58cc02] shrink-0" />
            <span>Şifre gerekmez &bull; Güvenli Google OAuth &amp; Supabase Altyapısı</span>
          </div>

          {/* Already have account? */}
          <div className="pt-2 text-center border-t border-slate-200 dark:border-[#334155]">
            <p className="text-xs font-bold text-slate-600 dark:text-[#94a3b8]">
              Zaten bir hesabın var mı?{' '}
              <Link
                href={`/login${redirect !== '/dashboard' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                onClick={() => sounds.playClick()}
                className="font-black text-[#1cb0f6] dark:text-[#38bdf8] hover:underline"
              >
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer & Legal Disclosure */}
      <footer className="mx-auto w-full max-w-4xl text-center pt-6">
        <LegalDisclosureAccordion />
      </footer>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] dark:bg-[#0f172a]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1cb0f6] border-t-transparent" />
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
