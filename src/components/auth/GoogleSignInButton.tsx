'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { sounds } from '@/lib/sound';
import { isSupabaseConfigured, signInWithGoogleOAuth } from '@/lib/supabase';
import { useUserStore } from '@/stores/useUserStore';
import GoogleAccountModal from './GoogleAccountModal';

interface GoogleSignInButtonProps {
  text?: string;
  redirectTo?: string;
  className?: string;
  size?: 'normal' | 'large';
  onSuccess?: () => void;
}

export default function GoogleSignInButton({
  text = 'Google ile Devam Et',
  redirectTo = '/dashboard',
  className = '',
  size = 'large',
  onSuccess,
}: GoogleSignInButtonProps) {
  const router = useRouter();
  const loginWithGoogle = useUserStore((state) => state.loginWithGoogle);

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = async () => {
    sounds.playClick();
    setErrorMessage(null);

    // 1. If Supabase is configured with credentials, trigger real Google OAuth redirect directly!
    if (isSupabaseConfigured()) {
      try {
        setLoading(true);
        if (typeof window !== 'undefined' && redirectTo) {
          localStorage.setItem('auth_redirect', redirectTo);
        }
        const { error } = await signInWithGoogleOAuth(redirectTo);
        if (error) {
          console.error('Supabase OAuth returned error:', error.message);
          setErrorMessage(error.message);
          setModalOpen(true);
        }
      } catch (err: any) {
        console.error('OAuth trigger exception:', err);
        setErrorMessage(err?.message || 'Google OAuth başlatılamadı.');
        setModalOpen(true);
      } finally {
        setLoading(false);
      }
    } else {
      // 2. Supabase environment variables are not yet configured:
      // Show clean, high-contrast developer setup & demo bypass modal
      setModalOpen(true);
    }
  };

  const handleAccountSelect = (account: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    isOnboarded?: boolean;
  }) => {
    setModalOpen(false);
    loginWithGoogle(account);

    if (onSuccess) {
      onSuccess();
    }

    // Check if user was already onboarded with this email or explicitly set in demo
    const currentUser = useUserStore.getState().user;
    if (currentUser.isOnboarded) {
      router.push(redirectTo);
    } else {
      router.push('/onboarding');
    }
  };

  const isLarge = size === 'large';

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`btn-duo btn-duo-white flex w-full items-center justify-center gap-3.5 rounded-2xl shadow-sm transition-all cursor-pointer bg-white dark:bg-[#1e293b] border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#0f172a] hover:bg-slate-50 dark:hover:bg-[#283a45] ${
          isLarge ? 'px-6 py-4 sm:py-4.5 text-base font-black' : 'px-5 py-3 text-sm font-bold'
        } ${className}`}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin text-[#1cb0f6] dark:text-[#38bdf8]" />
        ) : (
          /* Official Multicolored Google 'G' Logo SVG */
          <svg className={isLarge ? 'w-6 h-6 shrink-0' : 'w-5 h-5 shrink-0'} viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span className="text-slate-800 dark:text-[#f8fafc] font-black tracking-wide">
          {loading ? 'Bağlanılıyor...' : text}
        </span>
      </button>

      {errorMessage && (
        <div className="mt-2.5 rounded-xl border border-[#ea2b2b]/30 bg-[#ea2b2b]/10 p-2.5 text-center text-xs font-semibold text-[#ea2b2b] dark:text-[#f87171]">
          {errorMessage}
        </div>
      )}

      {/* Developer OAuth Configuration & Demo Access Modal */}
      <GoogleAccountModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectAccount={handleAccountSelect}
        redirectTo={redirectTo}
        errorMessage={errorMessage}
      />
    </>
  );
}
