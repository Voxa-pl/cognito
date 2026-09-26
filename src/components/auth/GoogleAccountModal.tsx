'use client';

import { useState } from 'react';
import {
  X,
  KeyRound,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Loader2,
} from 'lucide-react';
import { sounds } from '@/lib/sound';
import {
  saveSupabaseCredentials,
  getSupabaseCredentials,
  signInWithGoogleOAuth,
} from '@/lib/supabase';

interface GoogleAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (account: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    isOnboarded?: boolean;
  }) => void;
  redirectTo?: string;
  errorMessage?: string | null;
}

export default function GoogleAccountModal({
  isOpen,
  onClose,
  onSelectAccount,
  redirectTo,
  errorMessage,
}: GoogleAccountModalProps) {
  const existingCreds = typeof window !== 'undefined' ? getSupabaseCredentials() : { url: '', key: '' };
  const [supabaseUrl, setSupabaseUrl] = useState(existingCreds.url.includes('placeholder') ? '' : existingCreds.url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(existingCreds.key.includes('placeholder') ? '' : existingCreds.key);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!isOpen) return null;

  const envSnippet = `# S:/Workforschool/studyquest/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key`;

  const handleCopy = () => {
    sounds.playClick();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(envSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveAndConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanUrl = supabaseUrl.trim();
    const cleanKey = supabaseAnonKey.trim();

    if (!cleanUrl || !cleanUrl.startsWith('http')) {
      setLocalError('Lütfen geçerli bir Supabase URL adresi girin (https://...).');
      return;
    }

    if (!cleanKey || cleanKey.length < 15) {
      setLocalError('Lütfen geçerli bir Supabase Anon Key girin.');
      return;
    }

    try {
      setSubmitting(true);
      sounds.playClick();

      // 1. Save to local storage for immediate browser session
      saveSupabaseCredentials(cleanUrl, cleanKey);

      // 2. Persist to .env.local via API
      try {
        await fetch('/api/auth/setup-env', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            supabaseUrl: cleanUrl,
            supabaseAnonKey: cleanKey,
          }),
        });
      } catch {
        // Continue even if local API call fails; localStorage handles immediate auth
      }

      // 3. Directly trigger real Google OAuth redirect
      const { error } = await signInWithGoogleOAuth(redirectTo);
      if (error) {
        setLocalError(`Google OAuth Hatası: ${error.message}. Lütfen Supabase konsolunda Google provider ayarlarını kontrol edin.`);
        setSubmitting(false);
      }
    } catch (err: any) {
      setLocalError(err?.message || 'Bağlantı hatası oluştu.');
      setSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    sounds.playClick();
    onClose();
    onSelectAccount({
      id: 'cognito-demo-user',
      email: 'demo@cognito.edu.tr',
      fullName: '',
      avatarUrl: 'user',
      isOnboarded: false,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-slate-200 dark:border-[#334155] border-b-8 border-b-slate-300 dark:border-b-[#0f172a] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-2xl text-left transition-all">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:text-slate-700 dark:text-[#94a3b8] dark:hover:text-[#f8fafc] hover:bg-slate-100 dark:hover:bg-[#334155] transition-colors cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 pb-5 border-b border-slate-200 dark:border-[#334155]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1cb0f6] to-[#0284c7] text-white shadow-md border-b-2 border-[#026aa2]">
            <KeyRound className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#1cb0f6]/10 dark:bg-[#1cb0f6]/20 border border-[#1cb0f6]/30 px-2.5 py-0.5 text-[11px] font-black text-[#1cb0f6] dark:text-[#38bdf8] mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Geliştirici &amp; OAuth Yapılandırması</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-[#f8fafc]">
              Gerçek Google OAuth Bağlantısı
            </h2>
            <p className="text-xs font-semibold text-slate-600 dark:text-[#94a3b8] mt-0.5">
              Cognito, doğrudan Google OAuth (<code className="font-mono text-[#1cb0f6] dark:text-[#38bdf8]">accounts.google.com</code>) ve Supabase altyapısıyla çalışır.
            </p>
          </div>
        </div>

        {/* Error Banner if any */}
        {(errorMessage || localError) && (
          <div className="mt-4 rounded-2xl border-2 border-[#ea2b2b]/30 bg-[#ea2b2b]/10 p-3.5 text-xs font-bold text-[#ea2b2b] dark:text-[#f87171] leading-relaxed">
            {localError || errorMessage}
          </div>
        )}

        {/* Primary Demo Student Bypass Button */}
        <div className="mt-5 space-y-2">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="btn-duo btn-duo-green flex w-full items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black text-white cursor-pointer shadow-md transition-transform hover:scale-[1.01]"
          >
            <UserCheck className="w-5 h-5" />
            <span>Demo Öğrenci Olarak Başla (Sınıf &amp; Seviye Soruları ile)</span>
          </button>
          <p className="text-center text-[11px] font-semibold text-slate-500 dark:text-[#94a3b8] leading-relaxed">
            Sınıf seviyesi ve sınıf tekrarı (Phoenix modu) sorularını yanıtlayarak platforma hemen giriş yapın.
          </p>
        </div>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-[#334155]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-[#94a3b8] bg-white dark:bg-[#1e293b] px-3">
            VEYA GELİŞTİRİCİ SUPABASE BAĞLANTISI
          </div>
        </div>

        {/* Fast Browser Connect Form */}
        <form onSubmit={handleSaveAndConnect} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-xs font-black text-slate-800 dark:text-[#f8fafc]">
              Supabase Project URL
            </label>
            <input
              type="url"
              placeholder="https://your-project.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#0f172a] px-3.5 py-2 text-xs sm:text-sm font-mono text-slate-900 dark:text-[#f8fafc] placeholder:text-slate-400 dark:placeholder:text-[#94a3b8]/70 focus:border-[#1cb0f6] focus:dark:border-[#1cb0f6] outline-hidden transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-black text-slate-800 dark:text-[#f8fafc]">
              Supabase Anon Key
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={supabaseAnonKey}
              onChange={(e) => setSupabaseAnonKey(e.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#0f172a] px-3.5 py-2 text-xs sm:text-sm font-mono text-slate-900 dark:text-[#f8fafc] placeholder:text-slate-400 dark:placeholder:text-[#94a3b8]/70 focus:border-[#1cb0f6] focus:dark:border-[#1cb0f6] outline-hidden transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-duo btn-duo-blue flex w-full items-center justify-center gap-2 py-3 rounded-2xl text-xs sm:text-sm font-black text-white cursor-pointer shadow-sm transition-all"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Google&apos;a Yönlendiriliyor...</span>
              </>
            ) : (
              <>
                <span>Kaydet &amp; Gerçek Google ile Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Copyable .env.local Reference */}
        <div className="mt-3.5 rounded-2xl bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-[#334155] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-600 dark:text-[#94a3b8]">
              Manuel Kurulum (<code className="font-mono">.env.local</code>)
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[10px] font-black text-[#1cb0f6] dark:text-[#38bdf8] hover:underline cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#58cc02]" />
                  <span className="text-[#58cc02]">Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Kopyala</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 overflow-x-auto select-all leading-relaxed">
            {envSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}
