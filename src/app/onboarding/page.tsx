'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  Flame,
  Sparkles,
  ShieldCheck,
  Award,
  BookOpen,
} from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { sounds } from '@/lib/sound';

type GradeOption = 9 | 10 | 11 | 12;

export default function OnboardingPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGrade, setSelectedGrade] = useState<GradeOption>(user?.grade || 9);
  const [isRepeater, setIsRepeater] = useState<boolean>(user?.isRepeater ?? false);
  const [fullName, setFullName] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Protect onboarding: user must be authenticated
  useEffect(() => {
    if (hasMounted && !user.isAuthenticated) {
      router.push('/register');
    }
  }, [hasMounted, user.isAuthenticated, router]);

  if (!hasMounted || !user.isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] dark:bg-[#0f172a]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1cb0f6] border-t-transparent" />
      </div>
    );
  }

  const handleNextStep = () => {
    sounds.playClick();
    setNameError(null);
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!fullName.trim()) {
        setNameError('Lütfen adınızı ve soyadınızı yazınız.');
        return;
      }
      // Complete onboarding
      sounds.playChest();
      completeOnboarding({
        grade: selectedGrade,
        isRepeater,
        fullName: fullName.trim(),
      });
      router.push('/dashboard');
    }
  };

  const handlePrevStep = () => {
    sounds.playClick();
    if (step > 1) {
      setStep((step - 1) as 1 | 2);
    }
  };

  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#0f172a] text-[#1a202c] dark:text-[#f8fafc] flex flex-col justify-between p-4 sm:p-6 md:p-8 transition-colors duration-200">
      {/* Top Header & Progress Bar */}
      <header className="mx-auto w-full max-w-2xl pt-2 sm:pt-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          {step > 1 ? (
            <button
              onClick={handlePrevStep}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-white dark:bg-[#1e293b] text-[#777777] dark:text-[#94a3b8] hover:bg-[#f1f1f1] dark:hover:bg-[#283a45] transition-colors cursor-pointer"
              aria-label="Önceki Adım"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40">
              <GraduationCap className="w-5 h-5 stroke-[2.5]" />
            </div>
          )}

          {/* Duolingo style green progress track */}
          <div className="flex-1 h-3.5 bg-[#e5e5e5] dark:bg-[#334155] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-[#58cc02] rounded-full transition-all duration-400 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span className="text-xs font-black text-[#afafaf] dark:text-[#64748b] uppercase tracking-wider">
            {step} / 3
          </span>
        </div>
      </header>

      {/* Step Content Container */}
      <main className="mx-auto w-full max-w-2xl my-auto py-6">
        {/* STEP 1: SINIF SEÇİMİ */}
        {step === 1 && (
          <section className="animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center mb-8">
              <span className="inline-block rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-4 py-1 text-xs font-black uppercase tracking-wider text-[#1cb0f6] mb-3">
                1. Adım: Sınıf Seviyesi
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#3c3c3c] dark:text-[#f8fafc] tracking-tight">
                Hangi Sınıftasın?
              </h1>
              <p className="mt-2 text-sm sm:text-base font-semibold text-[#777777] dark:text-[#94a3b8] max-w-md mx-auto">
                Akademik lise standartlarına ve soru bankalarına tam uyumlu derslerini senin sınıfına göre hazırlayacağız.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 9. Sınıf */}
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setSelectedGrade(9);
                }}
                className={`p-5 rounded-3xl border-2 border-b-6 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
                  selectedGrade === 9
                    ? 'border-[#1cb0f6] border-b-[#1899d6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 shadow-md -translate-y-1'
                    : 'border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#283a45]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">9. Sınıf</span>
                  {selectedGrade === 9 && (
                    <div className="h-7 w-7 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-white/80 dark:bg-[#0f172a]/80 text-[11px] font-black text-[#1cb0f6] border border-[#84d8ff] dark:border-[#1cb0f6]/40 mb-1">
                    Akademik Lise Programı
                  </span>
                  <p className="text-xs font-bold text-[#777777] dark:text-[#94a3b8]">
                    Liseye ilk adım, 8 temel ders ve temel kavramlar.
                  </p>
                </div>
              </button>

              {/* 10. Sınıf */}
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setSelectedGrade(10);
                }}
                className={`p-5 rounded-3xl border-2 border-b-6 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
                  selectedGrade === 10
                    ? 'border-[#1cb0f6] border-b-[#1899d6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 shadow-md -translate-y-1'
                    : 'border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#283a45]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">10. Sınıf</span>
                  {selectedGrade === 10 && (
                    <div className="h-7 w-7 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-white/80 dark:bg-[#0f172a]/80 text-[11px] font-black text-[#1cb0f6] border border-[#84d8ff] dark:border-[#1cb0f6]/40 mb-1">
                    Gelişme & Kavram Derinliği
                  </span>
                  <p className="text-xs font-bold text-[#777777] dark:text-[#94a3b8]">
                    Branşlaşma temelleri ve derinleşen soru tipleri.
                  </p>
                </div>
              </button>

              {/* 11. Sınıf */}
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setSelectedGrade(11);
                }}
                className={`p-5 rounded-3xl border-2 border-b-6 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
                  selectedGrade === 11
                    ? 'border-[#1cb0f6] border-b-[#1899d6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 shadow-md -translate-y-1'
                    : 'border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#283a45]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">11. Sınıf</span>
                  {selectedGrade === 11 && (
                    <div className="h-7 w-7 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-white/80 dark:bg-[#0f172a]/80 text-[11px] font-black text-[#1cb0f6] border border-[#84d8ff] dark:border-[#1cb0f6]/40 mb-1">
                    Alan Seçimi & YKS Temeli
                  </span>
                  <p className="text-xs font-bold text-[#777777] dark:text-[#94a3b8]">
                    Sayısal, Eşit Ağırlık ve Sözel branş konuları.
                  </p>
                </div>
              </button>

              {/* 12. Sınıf */}
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setSelectedGrade(12);
                }}
                className={`p-5 rounded-3xl border-2 border-b-6 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
                  selectedGrade === 12
                    ? 'border-[#1cb0f6] border-b-[#1899d6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 shadow-md -translate-y-1'
                    : 'border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#283a45]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">12. Sınıf</span>
                  {selectedGrade === 12 && (
                    <div className="h-7 w-7 rounded-full bg-[#1cb0f6] text-white flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-lg bg-white/80 dark:bg-[#0f172a]/80 text-[11px] font-black text-[#1cb0f6] border border-[#84d8ff] dark:border-[#1cb0f6]/40 mb-1">
                    YKS Zirve & Üniversite
                  </span>
                  <p className="text-xs font-bold text-[#777777] dark:text-[#94a3b8]">
                    TYT ve AYT denemeleri, yoğun tekrar ve zirve hazırlık.
                  </p>
                </div>
              </button>
            </div>
          </section>
        )}

        {/* STEP 2: SINIF TEKRARI MI? */}
        {step === 2 && (
          <section className="animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center mb-8">
              <span className="inline-block rounded-full bg-[#fff0db] dark:bg-[#ff9600]/20 border border-[#ffb74d] dark:border-[#ff9600]/40 px-4 py-1 text-xs font-black uppercase tracking-wider text-[#ff9600] mb-3">
                2. Adım: Öğrenme Durumu
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#3c3c3c] dark:text-[#f8fafc] tracking-tight">
                Bu Yıl Sınıf Tekrarı Yapıyor Musun?
              </h1>
              <p className="mt-2 text-sm sm:text-base font-semibold text-[#777777] dark:text-[#94a3b8] max-w-lg mx-auto">
                Sana en uygun öğrenme temposunu ve güçlendirme desteğini sunabilmemiz için bu tercih çok değerlidir.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Option: Hayır */}
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setIsRepeater(false);
                }}
                className={`p-6 rounded-3xl border-2 border-b-6 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  !isRepeater
                    ? 'border-[#58cc02] border-b-[#58a700] bg-[#e5f8d0] dark:bg-[#58cc02]/20 shadow-md -translate-y-1'
                    : 'border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#283a45]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-white dark:bg-[#0f172a] text-[#58cc02] border-2 border-[#bcf087] dark:border-[#58cc02]/40 flex items-center justify-center shadow-xs">
                      <Compass className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    {!isRepeater && (
                      <div className="h-7 w-7 rounded-full bg-[#58cc02] text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                    Hayır, İlk Defa Bu Sınıftayım
                  </h3>
                  <span className="inline-block mt-1 text-xs font-black text-[#58cc02] uppercase tracking-wide">
                    Akademik Yolculuk &amp; Derece Hedefi
                  </span>
                </div>

                <p className="mt-4 text-xs font-bold text-[#777777] dark:text-[#94a3b8] leading-relaxed border-t border-[#d8f0be] dark:border-[#334155] pt-3">
                  Standart öğrenme yolu ile tüm üniteleri sırayla tamamla, rozetleri topla ve başarıyla sınıfını geç.
                </p>
              </button>

              {/* Option: Evet (Phoenix Mode) */}
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setIsRepeater(true);
                }}
                className={`p-6 rounded-3xl border-2 border-b-6 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isRepeater
                    ? 'border-[#ff9600] border-b-[#e68700] bg-[#fff4e6] dark:bg-[#ff9600]/20 shadow-md -translate-y-1 ring-2 ring-[#ff9600]/30'
                    : 'border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#283a45]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#ff9600] to-[#ea2b2b] text-white flex items-center justify-center shadow-md">
                      <Flame className="w-7 h-7 fill-white animate-pulse" />
                    </div>
                    {isRepeater && (
                      <div className="h-7 w-7 rounded-full bg-[#ff9600] text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                      Evet, Sınıfımı Tekrar Ediyorum
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 mt-1 text-xs font-black text-[#e68700] dark:text-[#ff9600] uppercase tracking-wide">
                    <Flame className="w-3.5 h-3.5 fill-[#e68700] text-[#e68700]" />
                    <span>Yeniden Doğuş / Phoenix Telafi &amp; Güçlendirme Modu</span>
                  </span>
                </div>

                <div className="mt-4 border-t border-[#ffe0b2] dark:border-[#334155] pt-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-[#d97706] dark:text-[#ff9600]">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>Özel Zümrüdüanka Rozeti tanımlanır</span>
                  </div>
                  <p className="text-xs font-bold text-[#777777] dark:text-[#94a3b8] leading-relaxed">
                    Eksik konularını avantaja çevir! Küllerinden doğan azimle temelleri sağlamlaştıran telafi görevleri seni bekliyor.
                  </p>
                </div>
              </button>
            </div>
          </section>
        )}

        {/* STEP 3: İSİM SOYİSİM & PROFİL ONAYI */}
        {step === 3 && (
          <section className="animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center mb-8">
              <span className="inline-block rounded-full bg-[#e5f8d0] dark:bg-[#58cc02]/20 border border-[#bcf087] dark:border-[#58cc02]/40 px-4 py-1 text-xs font-black uppercase tracking-wider text-[#58cc02] mb-3">
                3. Adım: Kişiselleştirme
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#3c3c3c] dark:text-[#f8fafc] tracking-tight">
                Çalışmaya Başlamaya Hazır Mısın?
              </h1>
              <p className="mt-2 text-sm sm:text-base font-semibold text-[#777777] dark:text-[#94a3b8] max-w-md mx-auto">
                Sana derslerde ve akademik değerlendirmelerde nasıl hitap edelim?
              </p>
            </div>

            <div className="bg-white dark:bg-[#1e293b] rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#afafaf] dark:text-[#94a3b8] mb-2">
                  Öğrenci Adı ve Soyadı
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (nameError) setNameError(null);
                  }}
                  placeholder="Örn: Ahmet Yılmaz"
                  className={`w-full rounded-2xl border-2 bg-white dark:bg-[#0f172a] px-4 py-3.5 text-base sm:text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc] focus:border-[#1cb0f6] outline-none transition-all ${
                    nameError
                      ? 'border-[#ea2b2b] focus:border-[#ea2b2b]'
                      : 'border-[#e5e5e5] dark:border-[#334155]'
                  }`}
                  autoFocus
                />
                {nameError ? (
                  <p className="mt-1.5 text-xs font-bold text-[#ea2b2b]">
                    {nameError}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs font-semibold text-[#afafaf] dark:text-[#64748b]">
                    Derslerinizde, sınav karnenizde ve klanınızda bu isim kullanılacaktır.
                  </p>
                )}
              </div>

              {/* Summary Card */}
              <div className="rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] p-4 space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-[#afafaf] dark:text-[#64748b]">
                  Öğrenim Planı Özeti
                </div>

                <div className="flex items-center justify-between text-sm font-black">
                  <span className="text-[#777777] dark:text-[#94a3b8]">Sınıf:</span>
                  <span className="text-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 px-3 py-1 rounded-xl">
                    {selectedGrade}. Sınıf &bull; Akademik
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-black">
                  <span className="text-[#777777] dark:text-[#94a3b8]">Öğrenme Modu:</span>
                  {isRepeater ? (
                    <span className="text-[#ff9600] bg-[#fff0db] dark:bg-[#ff9600]/20 px-3 py-1 rounded-xl flex items-center gap-1.5">
                      <Flame className="w-4 h-4 fill-[#ff9600]" />
                      <span>Phoenix Telafi &amp; Güçlendirme Modu</span>
                    </span>
                  ) : (
                    <span className="text-[#58cc02] bg-[#e5f8d0] dark:bg-[#58cc02]/20 px-3 py-1 rounded-xl flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 fill-[#58cc02]" />
                      <span>Akademik Yolculuk &amp; Derece Hedefi</span>
                    </span>
                  )}
                </div>

                {isRepeater && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-[#fff3e0] to-[#ffe0b2] dark:from-[#ff9600]/20 dark:to-[#ff9600]/10 border border-[#ffb74d] dark:border-[#ff9600]/30 text-xs font-bold text-[#b78103] dark:text-[#ff9600]">
                    <Sparkles className="w-4 h-4 text-[#f57c00] shrink-0" />
                    <span>
                      &quot;Küllerinden Doğan Azim&quot; rozeti ve hedefli eksik kapatma görevleri profilinde aktifleşecek!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Sticky Action Bar */}
      <footer className="mx-auto w-full max-w-2xl pt-4 border-t border-[#e5e5e5] dark:border-[#334155]">
        <button
          type="button"
          onClick={handleNextStep}
          className="btn-duo btn-duo-green w-full py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-black text-white flex items-center justify-center gap-3 cursor-pointer"
        >
          <span>{step === 3 ? 'ÖĞRENMEYE BAŞLA' : 'DEVAM ET'}</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </footer>
    </div>
  );
}
