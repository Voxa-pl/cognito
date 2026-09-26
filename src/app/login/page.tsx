'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BrainCircuit,
  ShieldCheck,
} from 'lucide-react';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { useUserStore } from '@/stores/useUserStore';
import { sounds } from '@/lib/sound';
import { CognitoLogo } from '@/components/ui/CognitoLogo';
import LegalDisclosureAccordion from '@/components/common/LegalDisclosureAccordion';

function LoginContent() {
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#0f172a] text-[#1a202c] dark:text-[#f8fafc] flex flex-col justify-between p-4 sm:p-6 md:p-10 transition-colors duration-200">
      {/* Header */}
      <header className="mx-auto w-full max-w-md flex items-center justify-between pb-6">
        <Link
          href="/"
          onClick={() => sounds.playClick()}
          className="flex items-center gap-3 group"
        >
          <CognitoLogo size="md" showTagline={false} />
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="mx-auto w-full max-w-md my-auto">
        <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-8 border-b-[#cecece] dark:border-b-[#0f172a] bg-white dark:bg-[#1e293b] p-7 sm:p-9 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1cb0f6] to-[#0b84c7] text-white border-b-4 border-[#086da5] shadow-md mb-3">
              <BrainCircuit className="w-9 h-9 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1a202c] dark:text-[#f8fafc]">
              Tekrar Hoş Geldin!
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#718096] dark:text-[#94a3b8]">
              Kaldığın yerden öğrenmeye devam etmek için Google ile giriş yap.
            </p>
          </div>

          {/* Large Google Sign-In Tactile 3D Button */}
          <div className="pt-2">
            <GoogleSignInButton
              text="Google ile Giriş Yap"
              redirectTo={redirect}
              size="large"
            />
          </div>

          {/* Trust Banner */}
          <div className="flex items-center justify-center gap-2 rounded-2xl bg-slate-50 dark:bg-[#0f172a]/70 border border-slate-200 dark:border-[#334155] p-3 text-[11px] font-bold text-slate-600 dark:text-[#94a3b8]">
            <ShieldCheck className="w-4 h-4 text-[#58cc02] shrink-0" />
            <span>Tek tıkla güvenli Google girişi (OAuth 2.0)</span>
          </div>

          {/* Don't have an account link */}
          <div className="pt-2 text-center border-t border-slate-200 dark:border-[#334155]">
            <p className="text-xs font-bold text-slate-600 dark:text-[#94a3b8]">
              Hesabın yok mu?{' '}
              <Link
                href={`/register${redirect !== '/dashboard' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}
                onClick={() => sounds.playClick()}
                className="font-black text-[#1cb0f6] dark:text-[#38bdf8] hover:underline"
              >
                Hemen Kayıt Ol
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer & Legal Disclosure */}
      <footer className="mx-auto w-full max-w-lg text-center pt-6">
        <LegalDisclosureAccordion />
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] dark:bg-[#0f172a]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1cb0f6] border-t-transparent" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
