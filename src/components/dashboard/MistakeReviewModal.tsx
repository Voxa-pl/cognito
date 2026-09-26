'use client';

import { useState, useMemo } from 'react';
import {
  X,
  Check,
  RotateCcw,
  Shield,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Award,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { MistakeRecord } from '@/types';
import { useUserStore } from '@/stores/useUserStore';
import { filterDueMistakes, getStageInfo } from '@/lib/gamification/spacedRepetition';
import { sounds } from '@/lib/sound';

interface MistakeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MistakeReviewModal({ isOpen, onClose }: MistakeReviewModalProps) {
  const mistakeVault = useUserStore((state) => state.mistakeVault);
  const submitReviewSession = useUserStore((state) => state.submitReviewSession);

  // Review list: Prioritize due questions, fallback to all unmastered or all questions
  const reviewList = useMemo(() => {
    const due = filterDueMistakes(mistakeVault || []);
    if (due.length > 0) return due;
    const unmastered = (mistakeVault || []).filter((m) => !m.isMastered);
    if (unmastered.length > 0) return unmastered;
    return mistakeVault || [];
  }, [mistakeVault]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [sessionResults, setSessionResults] = useState<{ mistakeId: string; isCorrect: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [summaryData, setSummaryData] = useState<{
    allCorrect?: boolean;
    reloadedShield: boolean;
    xpAwarded: number;
    masteredCount: number;
  } | null>(null);

  if (!isOpen) return null;

  // Empty state if no mistakes at all in vault
  if (reviewList.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
        <div className="w-full max-w-lg rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#0f172a] bg-white dark:bg-[#1e293b] p-6 sm:p-8 text-center space-y-5 shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e0f2fe] dark:bg-[#1cb0f6]/20 text-[#0284c7] dark:text-[#38bdf8] border border-[#bae6fd] dark:border-[#1cb0f6]/30">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-[#1e293b] dark:text-[#f8fafc]">
            Hata Defteri Henüz Boş
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
            Konu testlerinde, seviye belirleme sınavında veya yazılı senaryo sınavlarında yanlış yaptığın tüm sorular otomatik olarak bu deftere kaydedilecek ve Ebbinghaus aralıklı tekrar planına dahil edilecektir.
          </p>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="btn-duo btn-duo-blue w-full py-3 rounded-2xl text-xs font-black text-white cursor-pointer"
          >
            Kokpite Dön
          </button>
        </div>
      </div>
    );
  }

  const safeIndex = Math.min(Math.max(0, currentIndex), reviewList.length - 1);
  const currentMistake: MistakeRecord | undefined = reviewList[safeIndex];

  if (!currentMistake) return null;

  const stageInfo = getStageInfo(currentMistake.stage);
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];
  const isOpenEnded = !currentMistake.options || currentMistake.options.length === 0;

  const handleSelectOption = (idx: number) => {
    if (isRevealed) return;
    sounds.playClick();
    setSelectedAnswer(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || String(selectedAnswer).trim() === '' || isRevealed) return;

    let initialCorrect = false;
    if (isOpenEnded) {
      const normalizedInput = String(selectedAnswer).trim().toLowerCase();
      const normalizedTarget = String(currentMistake.correctAnswer).trim().toLowerCase();
      initialCorrect = normalizedInput.length > 0 && (normalizedInput === normalizedTarget);
    } else {
      initialCorrect =
        typeof currentMistake.correctAnswer === 'number'
          ? selectedAnswer === currentMistake.correctAnswer
          : String(selectedAnswer).trim().toLowerCase() === String(currentMistake.correctAnswer).trim().toLowerCase();
    }

    setIsRevealed(true);
    setIsCurrentCorrect(initialCorrect);
    if (initialCorrect) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }
  };

  const handleSetSelfAssessment = (correct: boolean) => {
    sounds.playClick();
    setIsCurrentCorrect(correct);
    if (correct) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    const evaluatedCorrect = isCurrentCorrect ?? false;
    const updatedResults = [
      ...sessionResults,
      { mistakeId: currentMistake.id, isCorrect: evaluatedCorrect },
    ];
    setSessionResults(updatedResults);

    if (safeIndex < reviewList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
      setIsCurrentCorrect(null);
      setShowHint(false);
    } else {
      // Session finished, submit to store
      const res = submitReviewSession(updatedResults);
      setSummaryData(res);
      setIsFinished(true);
    }
  };

  const handleCloseModal = () => {
    sounds.playClick();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsRevealed(false);
    setIsCurrentCorrect(null);
    setShowHint(false);
    setSessionResults([]);
    setIsFinished(false);
    setSummaryData(null);
    onClose();
  };

  // Convert previous answer to human readable text
  const previousAnswerLabel = (() => {
    if (currentMistake.userAnswer === 'Boş' || currentMistake.userAnswer === -1) {
      return 'Boş Bırakıldı';
    }
    if (typeof currentMistake.userAnswer === 'number' && currentMistake.options?.[currentMistake.userAnswer]) {
      return `${optionLetters[currentMistake.userAnswer] || ''}: ${currentMistake.options[currentMistake.userAnswer]}`;
    }
    return String(currentMistake.userAnswer);
  })();

  // Progress percentage
  const progressPercent = Math.round(((safeIndex + (isRevealed ? 1 : 0)) / reviewList.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-2xl rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#0f172a] bg-white dark:bg-[#1e293b] p-5 sm:p-8 shadow-2xl space-y-6 my-auto transition-colors">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5] dark:border-[#334155]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e0f2fe] dark:bg-[#1cb0f6]/20 text-[#0284c7] dark:text-[#38bdf8] border border-[#bae6fd] dark:border-[#1cb0f6]/30">
              <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#1e293b] dark:text-[#f8fafc]">
                Akıllı Hata Defteri & Tekrar
              </h2>
              <span className="text-[11px] font-bold text-[#64748b] dark:text-[#94a3b8]">
                Akademik Program &bull; Ebbinghaus Aralıklı Bilişsel Pekiştirme
              </span>
            </div>
          </div>

          <button
            onClick={handleCloseModal}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#94a3b8] hover:text-[#1e293b] dark:hover:text-[#f8fafc] hover:bg-[#f1f5f9] dark:hover:bg-[#334155] transition-colors cursor-pointer"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SUMMARY SCREEN */}
        {isFinished && summaryData ? (
          <div className="space-y-6 py-2 animate-in fade-in">
            <div
              className={`p-6 sm:p-7 rounded-3xl border-2 text-center space-y-4 shadow-sm ${
                summaryData.reloadedShield || summaryData.allCorrect
                  ? 'bg-gradient-to-br from-[#ecfdf5] via-[#d1fae5] to-[#a7f3d0]/50 dark:from-[#064e3b]/30 dark:via-[#065f46]/20 dark:to-[#022c22]/40 border-[#6ee7b7] dark:border-[#059669]'
                  : 'bg-[#f8fafc] dark:bg-[#0f172a] border-[#e2e8f0] dark:border-[#334155]'
              }`}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white dark:bg-[#1e293b] shadow-md border-2 border-current text-[#10b981]">
                {summaryData.reloadedShield || summaryData.allCorrect ? (
                  <Shield className="w-10 h-10 fill-[#10b981] text-[#10b981] animate-bounce" />
                ) : (
                  <Award className="w-10 h-10 stroke-[2.5]" />
                )}
              </div>

              <div className="space-y-1.5">
                <span className="rounded-full bg-[#10b981] text-white px-3.5 py-0.5 text-xs font-black uppercase tracking-wider">
                  Oturum Başarıyla Tamamlandı
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1e293b] dark:text-[#f8fafc]">
                  {summaryData.reloadedShield
                    ? '+1 Sınav Tolerans Kalkanı Yenilendi!'
                    : summaryData.allCorrect
                    ? 'Kusursuz Tekrar! Tolerans Kalkanı Tam Dolu (5/5)'
                    : 'Aralıklı Tekrarlar Güncellendi'}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#475569] dark:text-[#94a3b8] max-w-md mx-auto leading-relaxed">
                  {summaryData.reloadedShield
                    ? 'Tüm soruları hatasız tamamladın! Akademik sınav modundaki hata tolerans kalkanın yenilendi.'
                    : summaryData.allCorrect
                    ? 'Tüm soruları hatasız tamamladın! Hata tolerans kalkanın zaten maksimum seviyede (5/5). Soruların Ebbinghaus aşamaları başarıyla ilerletildi.'
                    : 'Doğru bildiğin sorular Ebbinghaus eğrisinde bir üst aşamaya taşındı, hatalı sorular ise 1. Aşamaya sıfırlanarak hafızaya alınmak üzere kaydedildi.'}
                </p>
              </div>

              {/* Reward Pills */}
              <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-[#e2e8f0] dark:border-[#334155] shadow-xs text-xs font-black text-[#1cb0f6]">
                  <Sparkles className="w-4 h-4 fill-[#1cb0f6]" />
                  <span>+{summaryData.xpAwarded} Deneyim Puanı (XP)</span>
                </div>

                {summaryData.masteredCount > 0 && (
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-[#86efac] dark:border-[#22c55e]/40 shadow-xs text-xs font-black text-[#15803d] dark:text-[#4ade80]">
                    <Award className="w-4 h-4" />
                    <span>{summaryData.masteredCount} Soru Kalıcı Mühürlendi!</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              className="btn-duo btn-duo-green w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>KOKPİTE DÖN</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        ) : (
          /* ACTIVE QUESTION STEP */
          <div className="space-y-5">
            {/* Progress Bar & Stage Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-[#64748b] dark:text-[#94a3b8]">
                <span>
                  Soru {currentIndex + 1} / {reviewList.length}
                </span>
                <span className="flex items-center gap-1 text-[#0284c7] dark:text-[#38bdf8]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{stageInfo.label} ({stageInfo.intervalLabel})</span>
                </span>
              </div>

              <div className="h-2.5 w-full rounded-full bg-[#f1f5f9] dark:bg-[#0f172a] overflow-hidden border border-[#e2e8f0] dark:border-[#334155]">
                <div
                  className="h-full bg-gradient-to-r from-[#1cb0f6] to-[#0284c7] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Badges & Previous Answer Alert */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-[#1cb0f6]">
                {currentMistake.subjectId.toUpperCase()}
              </span>

              {currentMistake.learningOutcomeCode && (
                <span className="rounded-full bg-[#f1f5f9] dark:bg-[#334155] px-2.5 py-0.5 text-[11px] font-bold text-[#475569] dark:text-[#cbd5e1] border border-[#e2e8f0] dark:border-[#475569]">
                  {currentMistake.learningOutcomeCode}
                </span>
              )}

              <span className="rounded-full bg-[#fef3c7] dark:bg-[#f59e0b]/20 border border-[#fde68a] dark:border-[#f59e0b]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#b45309] dark:text-[#fbbf24]">
                Kaynak: {currentMistake.source === 'quiz' ? 'Konu Testi' : currentMistake.source === 'placement' ? 'Seviye Belirleme' : 'Yazılı Senaryosu'}
              </span>
            </div>

            {/* Previous Answer Badge */}
            <div className="p-3 rounded-2xl bg-[#fff1f2] dark:bg-[#ff4b4b]/15 border border-[#fecdd3] dark:border-[#ff4b4b]/30 flex items-start gap-2.5 text-xs text-[#be123c] dark:text-[#fda4af]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#e11d48]" />
              <div>
                <strong className="font-black">Önceki Cevabın (Hatalı):</strong>{' '}
                <span className="font-semibold">{previousAnswerLabel}</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#f8fafc] dark:bg-[#0f172a] border-2 border-[#e2e8f0] dark:border-[#334155]">
              <p className="text-sm sm:text-base font-black text-[#1e293b] dark:text-[#f8fafc] leading-relaxed">
                {currentMistake.questionText}
              </p>
            </div>

            {/* Collapsible Solution Hint / Explanation Accordion */}
            <div className="rounded-2xl border border-[#e2e8f0] dark:border-[#334155] overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setShowHint((prev) => !prev);
                }}
                className="w-full p-3 flex items-center justify-between text-xs font-black text-[#0284c7] dark:text-[#38bdf8] bg-[#f0f9ff] dark:bg-[#0f172a]/60 hover:bg-[#e0f2fe] dark:hover:bg-[#1e293b] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Kritik Çözüm İpucu & Çözüm Açıklaması</span>
                </div>
                {showHint ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showHint && (
                <div className="p-4 bg-white dark:bg-[#1e293b] border-t border-[#e2e8f0] dark:border-[#334155] text-xs font-semibold text-[#475569] dark:text-[#cbd5e1] leading-relaxed animate-in fade-in">
                  {currentMistake.explanation || 'Bu kazanımda soru kökündeki şartlara ve temel tanımlara dikkat ediniz.'}
                </div>
              )}
            </div>

            {/* Multiple Choice Options */}
            {!isOpenEnded && currentMistake.options && currentMistake.options.length > 0 ? (
              <div className="space-y-2.5 pt-1">
                {currentMistake.options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrectAnswer = isRevealed && idx === currentMistake.correctAnswer;
                  const isWrongSelection = isRevealed && isSelected && !isCorrectAnswer;

                  let cardStyle =
                    'border-[#e2e8f0] dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#334155] dark:text-[#f8fafc] hover:border-[#94a3b8] dark:hover:border-[#64748b]';

                  if (isSelected && !isRevealed) {
                    cardStyle =
                      'border-[#1cb0f6] bg-[#f0f9ff] dark:bg-[#1cb0f6]/20 text-[#0284c7] dark:text-[#38bdf8] shadow-xs';
                  } else if (isCorrectAnswer) {
                    cardStyle =
                      'border-[#22c55e] bg-[#f0fdf4] dark:bg-[#22c55e]/20 text-[#15803d] dark:text-[#4ade80] shadow-sm';
                  } else if (isWrongSelection) {
                    cardStyle =
                      'border-[#ef4444] bg-[#fef2f2] dark:bg-[#ef4444]/20 text-[#b91c1c] dark:text-[#f87171] shadow-sm';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black border ${
                            isSelected && !isRevealed
                              ? 'bg-[#1cb0f6] text-white border-[#1899d6]'
                              : isCorrectAnswer
                              ? 'bg-[#22c55e] text-white border-[#16a34a]'
                              : isWrongSelection
                              ? 'bg-[#ef4444] text-white border-[#dc2626]'
                              : 'bg-[#f1f5f9] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8] border-[#e2e8f0] dark:border-[#334155]'
                          }`}
                        >
                          {optionLetters[idx] || idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-bold leading-normal">{opt}</span>
                      </div>

                      {isCorrectAnswer && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#22c55e] text-white shrink-0">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                      {isWrongSelection && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ef4444] text-white shrink-0">
                          <X className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Open Ended Text Response Input */
              <div className="space-y-3">
                <label className="block text-xs font-black text-[#475569] dark:text-[#94a3b8]">
                  Cevabınızı Giriniz:
                </label>
                <textarea
                  value={String(selectedAnswer ?? '')}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  disabled={isRevealed}
                  placeholder="Kazanım cevabınızı buraya yazınız..."
                  className="w-full h-24 p-3 rounded-2xl border-2 border-[#e2e8f0] dark:border-[#334155] bg-white dark:bg-[#0f172a] text-xs font-bold text-[#1e293b] dark:text-[#f8fafc] focus:border-[#1cb0f6] outline-hidden resize-none"
                />

                {isOpenEnded && isRevealed && (
                  <div className="space-y-3 p-4 rounded-2xl bg-[#f0f9ff] dark:bg-[#0f172a] border-2 border-[#bae6fd] dark:border-[#1e3a8a]/40 animate-in fade-in">
                    <div className="flex items-center gap-2 text-xs font-black text-[#0284c7] dark:text-[#38bdf8]">
                      <BookOpen className="w-4 h-4" />
                      <span>Örnek İdeal Çözüm & Değerlendirme Kriteri</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-[#1e293b] text-xs font-bold text-[#334155] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155] leading-relaxed">
                      {String(currentMistake.correctAnswer)}
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="block text-[11px] font-black text-[#64748b] dark:text-[#94a3b8]">
                        İdeal çözüm kriterine göre kendi cevabınızı değerlendirin:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleSetSelfAssessment(true)}
                          className={`p-3 rounded-xl border-2 text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            isCurrentCorrect === true
                              ? 'bg-[#22c55e] text-white border-[#16a34a] shadow-xs'
                              : 'bg-white dark:bg-[#1e293b] text-[#15803d] dark:text-[#4ade80] border-[#86efac] dark:border-[#22c55e]/30 hover:bg-[#f0fdf4]'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Cevabım İdeal Çözümle Uyuşuyor</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSetSelfAssessment(false)}
                          className={`p-3 rounded-xl border-2 text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            isCurrentCorrect === false
                              ? 'bg-[#ef4444] text-white border-[#dc2626] shadow-xs'
                              : 'bg-white dark:bg-[#1e293b] text-[#b91c1c] dark:text-[#f87171] border-[#fecaca] dark:border-[#ef4444]/30 hover:bg-[#fef2f2]'
                          }`}
                        >
                          <X className="w-4 h-4 stroke-[3]" />
                          <span>Eksiklerim Var (Hatalı)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Instant Feedback Banner */}
            {isRevealed && (
              <div
                className={`p-4 rounded-2xl border-2 flex items-start gap-3 animate-in fade-in duration-200 ${
                  isCurrentCorrect
                    ? 'bg-[#f0fdf4] dark:bg-[#22c55e]/15 border-[#86efac] dark:border-[#22c55e]/40 text-[#15803d] dark:text-[#4ade80]'
                    : 'bg-[#fef2f2] dark:bg-[#ef4444]/15 border-[#fecaca] dark:border-[#ef4444]/40 text-[#b91c1c] dark:text-[#f87171]'
                }`}
              >
                {isCurrentCorrect ? (
                  <Check className="w-5 h-5 shrink-0 mt-0.5 text-[#16a34a] dark:text-[#4ade80]" />
                ) : (
                  <RotateCcw className="w-5 h-5 shrink-0 mt-0.5 text-[#dc2626] dark:text-[#f87171]" />
                )}
                <div className="space-y-1">
                  <div className="text-xs font-black">
                    {isCurrentCorrect
                      ? currentMistake.stage >= 4
                        ? 'Harika! Aşama 4/4 → Kalıcı Hafıza (Mühürlendi) seviyesine ulaşıldı!'
                        : `Harika! Aşama ${currentMistake.stage}/4 → Aşama ${currentMistake.stage + 1}/4 seviyesine ilerletildi.`
                      : 'Hatalı Yanıt: Ebbinghaus kuralları gereği bu soru 1. Aşamaya sıfırlandı (+1 Gün).'}
                  </div>
                  <div className="text-[11px] font-semibold opacity-90">
                    {currentMistake.explanation}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-2">
              {!isRevealed ? (
                <button
                  type="button"
                  disabled={selectedAnswer === null || String(selectedAnswer).trim() === ''}
                  onClick={handleCheckAnswer}
                  className="btn-duo btn-duo-blue w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  KONTROL ET
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="btn-duo btn-duo-green w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>
                    {safeIndex < reviewList.length - 1 ? 'SONRAKİ SORUYA GEÇ' : 'OTURUMU TAMAMLA'}
                  </span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
