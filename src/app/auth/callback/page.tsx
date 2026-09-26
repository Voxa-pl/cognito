'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { supabase, isSupabaseConfigured, fetchProfileFromSupabase } from '@/lib/supabase';
import { useUserStore } from '@/stores/useUserStore';

export default function AuthCallbackPage() {
  const router = useRouter();
  const loginWithGoogle = useUserStore((state) => state.loginWithGoogle);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function handleAuthCallback() {
      if (!isSupabaseConfigured()) {
        router.replace('/login');
        return;
      }

      try {
        let paramRedirect: string | null = null;
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search);
          const hashParams = new URLSearchParams(
            window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash
          );

          paramRedirect = urlParams.get('redirect') || hashParams.get('redirect');

          const oauthError = urlParams.get('error') || hashParams.get('error');
          const oauthErrorDesc = urlParams.get('error_description') || hashParams.get('error_description');

          if (oauthError || oauthErrorDesc) {
            setErrorMsg(oauthErrorDesc || oauthError || 'Google yetkilendirme işlemi iptal edildi veya başarısız oldu.');
            return;
          }

          const code = urlParams.get('code') || hashParams.get('code');
          if (code) {
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (exchangeError) {
              console.error('Code exchange error:', exchangeError);
              setErrorMsg(exchangeError.message);
              return;
            }
          }
        }

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          setErrorMsg(sessionError?.message || 'Oturum açılamadı. Google ile giriş işlemi tamamlanamadı.');
          return;
        }

        const authUser = session.user;
        const meta = authUser.user_metadata || {};
        const fullName = meta.full_name || meta.name || authUser.email?.split('@')[0] || 'Öğrenci';
        const avatarUrl = meta.avatar_url || meta.picture || 'user';

        // Check if profile exists in Supabase
        const { data: profile } = await fetchProfileFromSupabase(authUser.id);

        loginWithGoogle({
          id: authUser.id,
          email: authUser.email || '',
          fullName,
          avatarUrl,
        });

        let targetRedirect = paramRedirect || '/dashboard';
        try {
          const saved = localStorage.getItem('auth_redirect');
          if (saved) {
            targetRedirect = saved;
            localStorage.removeItem('auth_redirect');
          }
        } catch {
          // Ignore storage error
        }

        if (profile?.grade) {
          useUserStore.getState().completeOnboarding({
            grade: (profile.grade as 9 | 10 | 11 | 12) || 9,
            isRepeater: Boolean(profile.is_repeater),
            fullName: profile.full_name || fullName,
          });
          router.replace(targetRedirect);
        } else {
          router.replace('/onboarding');
        }
      } catch (err: any) {
        console.error('Callback error:', err);
        setErrorMsg(err?.message || 'Beklenmeyen bir oturum doğrulama hatası oluştu.');
      }
    }

    handleAuthCallback();
  }, [router, loginWithGoogle]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f7f7] dark:bg-[#0f172a] p-4 text-center transition-colors duration-200">
      {errorMsg ? (
        <div className="w-full max-w-md rounded-3xl border-2 border-[#ea2b2b]/30 bg-white dark:bg-[#1e293b] p-7 shadow-xl space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ea2b2b]/10 text-[#ea2b2b]">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-[#f8fafc]">
            Giriş Tamamlanamadı
          </h2>
          <p className="text-xs font-semibold text-slate-600 dark:text-[#94a3b8] leading-relaxed">
            {errorMsg}
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="btn-duo btn-duo-blue flex w-full items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black text-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Giriş Sayfasına Dön</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-[#1cb0f6] dark:text-[#38bdf8]" />
          <h2 className="text-xl font-black text-slate-900 dark:text-[#f8fafc]">
            Google ile Giriş Doğrulanıyor...
          </h2>
          <p className="text-sm font-semibold text-slate-600 dark:text-[#94a3b8]">
            Hesabınız güvenli bir şekilde bağlanıyor, lütfen bekleyin.
          </p>
        </div>
      )}
    </div>
  );
}
