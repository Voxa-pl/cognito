'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  FileText,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Award,
  Check,
  X,
  Target,
} from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { placementQuestions, evaluateOpenEndedAnswer, calculateDiagnosticResult } from '@/data/placementExams';
import { AssessmentQuestion, PlacementExamResult } from '@/types';
import { sounds } from '@/lib/sound';

function PlacementExamRunner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const examType = (searchParams.get('type') as 'karma' | 'open_ended' | 'multiple_choice') || 'karma';

  const recordPlacementResult = useUserStore((state) => state.recordPlacementResult);
  const recordMistakesFromPlacement = useUserStore((state) => state.recordMistakesFromPlacement);

  // Filter questions based on type
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for user answers: questionId -> { selectedOption, textAnswer, evaluated, score, rubricFeedback }
  const [answers, setAnswers] = useState<
    Record<
      string,
      {
        selectedOption?: number | null;
        textAnswer?: string;
        evaluated?: boolean;
        awardedScore: number;
        rubricFeedback?: {
          label: string;
          feedback: string;
          matchedTerms: string[];
          missingTerms: string[];
        };
      }
    >
  >({});

  const [timeLeftSec, setTimeLeftSec] = useState(25 * 60); // 25 minutes
  const [isFinished, setIsFinished] = useState(false);
  const [finalReport, setFinalReport] = useState<PlacementExamResult | null>(null);

  useEffect(() => {
    let qList = [...placementQuestions];
    if (examType === 'open_ended') {
      qList = qList.filter((q) => q.type === 'open_ended');
    } else if (examType === 'multiple_choice') {
      qList = qList.filter((q) => q.type === 'multiple_choice');
    }
    setQuestions(qList);
  }, [examType]);

  // Timer countdown
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, questions, answers]);

  const currentQ = questions[currentIndex];
  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;

  const handleSelectOption = (idx: number) => {
    if (!currentQ || currentAnswer?.evaluated) return;
    sounds.playClick();
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedOption: idx,
        awardedScore: idx === currentQ.correctAnswer ? currentQ.points : 0,
        evaluated: false,
      },
    }));
  };

  const handleTextChange = (text: string) => {
    if (!currentQ || currentAnswer?.evaluated) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        textAnswer: text,
        awardedScore: 0,
        evaluated: false,
      },
    }));
  };

  const handleCheckAnswer = () => {
    if (!currentQ) return;
    sounds.playClick();

    if (currentQ.type === 'open_ended') {
      const studentText = currentAnswer?.textAnswer || '';
      const evalRes = evaluateOpenEndedAnswer(studentText, currentQ);
      if (evalRes.score > 0) {
        sounds.playCorrect();
      } else {
        sounds.playWrong();
      }

      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: {
          ...prev[currentQ.id],
          awardedScore: evalRes.score,
          evaluated: true,
          rubricFeedback: evalRes,
        },
      }));
    } else {
      // Multiple choice check
      const isCorrect = currentAnswer?.selectedOption === currentQ.correctAnswer;
      if (isCorrect) {
        sounds.playCorrect();
      } else {
        sounds.playWrong();
      }

      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: {
          ...prev[currentQ.id],
          awardedScore: isCorrect ? currentQ.points : 0,
          evaluated: true,
        },
      }));
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      handleFinishExam();
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleFinishExam = () => {
    sounds.playChest();
    const formattedAnswers = questions.map((q) => {
      const ans = answers[q.id];
      return {
        questionId: q.id,
        selectedOption: ans?.selectedOption,
        textAnswer: ans?.textAnswer,
        awardedScore: ans?.awardedScore || 0,
      };
    });

    const report = calculateDiagnosticResult(questions, formattedAnswers, examType);
    recordPlacementResult(report);
    // Auto-capture wrong or incomplete placement questions into mistakeVault
    recordMistakesFromPlacement('placement', questions, answers);
    setFinalReport(report);
    setIsFinished(true);
  };

  // Format timer MM:SS
  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Report Screen
  if (isFinished && finalReport) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
        <div className="rounded-3xl border-2 border-[#58cc02] border-b-6 border-b-[#3f9600] bg-white dark:bg-[#1e293b] p-6 sm:p-10 shadow-xl text-center space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#e5f8d0] dark:bg-[#58cc02]/20 text-[#58cc02] shadow-md border-2 border-[#bcf087] dark:border-[#58cc02]/40">
            <Award className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3.5 py-1 text-xs font-black uppercase text-[#1cb0f6]">
              2026-2027 Bilişsel Seviye Raporu
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
              {finalReport.levelTitle}
            </h1>
            <p className="text-sm font-semibold text-[#777777] dark:text-[#94a3b8] max-w-xl mx-auto leading-relaxed">
              {finalReport.levelDescription}
            </p>
          </div>

          {/* Score Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155]">
            <span className="text-xs font-black uppercase text-[#777777] dark:text-[#94a3b8]">
              Genel Başarı Puanı:
            </span>
            <span className="text-2xl font-black text-[#58cc02]">
              %{finalReport.score} / 100
            </span>
          </div>

          {/* Subject Breakdown */}
          <div className="space-y-3 text-left pt-4 border-t border-[#e5e5e5] dark:border-[#334155]">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8]">
              Branş Bazında Seviye Durumu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {finalReport.subjectScores.map((sub) => (
                <div
                  key={sub.subjectSlug}
                  className="p-3.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a]"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                      {sub.subjectName}
                    </span>
                    <span className="text-xs font-black text-[#1cb0f6]">
                      %{sub.percentage}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#e5e5e5] dark:bg-[#334155] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#1cb0f6]"
                      style={{ width: `${Math.max(8, sub.percentage)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Remediation Plan */}
          <div className="space-y-3 text-left pt-4 border-t border-[#e5e5e5] dark:border-[#334155]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ff9600]" />
              <h3 className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                Kişiselleştirilmiş Eksik Kapatma Eylem Planı
              </h3>
            </div>

            <div className="space-y-2.5">
              {finalReport.remediationPlan.map((plan, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase text-[#ff9600] bg-[#fff0db] dark:bg-[#ff9600]/20 px-2 py-0.5 rounded-md border border-[#ffb74d] dark:border-[#ff9600]/30">
                        {plan.priority === 'high' ? 'Öncelikli Eksik' : 'Pekiştirme'}
                      </span>
                      <span className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                        {plan.topicName}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                      {plan.action}
                    </p>
                  </div>

                  <Link
                    href={`/quiz/${plan.topicId}`}
                    onClick={() => sounds.playClick()}
                    className="btn-duo btn-duo-blue px-4 py-2 rounded-xl text-xs font-black text-white shrink-0 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Hemen Pekiştir</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/exams"
              onClick={() => sounds.playClick()}
              className="btn-duo btn-duo-green px-8 py-3.5 rounded-2xl text-xs font-black uppercase text-white cursor-pointer"
            >
              Sınav Merkezine Dön
            </Link>
            <Link
              href="/dashboard"
              onClick={() => sounds.playClick()}
              className="btn-duo btn-duo-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase text-[#3c3c3c] dark:text-[#f8fafc] cursor-pointer"
            >
              Öğrenme Yoluna Git
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-3">
          <div className="animate-spin text-[#1cb0f6] inline-block">
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-xs font-bold text-[#777777] dark:text-[#94a3b8]">
            Sınav hazırlanıyor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Top bar: Question navigation + Countdown */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-white dark:bg-[#1e293b] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] font-black text-sm">
            {currentIndex + 1}/{questions.length}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#afafaf] dark:text-[#64748b]">
              {currentQ.subjectName}
            </span>
            <div className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc] truncate max-w-[180px] sm:max-w-xs">
              {currentQ.topicName}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#f7f7f7] dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155]">
          <Clock className="w-4 h-4 text-[#ff9600]" />
          <span className="text-xs font-black text-[#ff9600] font-mono">
            {formatTimer(timeLeftSec)}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3 py-0.5 text-[10px] font-black uppercase text-[#1cb0f6]">
            {currentQ.type === 'open_ended' ? 'Açık Uçlu Analitik Soru' : 'Çoktan Seçmeli Test'}
          </span>
          <span className="text-xs font-black text-[#58cc02]">
            {currentQ.points} Puan
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc] leading-relaxed">
          {currentQ.questionText}
        </h2>

        {/* INPUT MODE: Multiple Choice */}
        {currentQ.type === 'multiple_choice' && currentQ.options && (
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = currentAnswer?.selectedOption === idx;
              const isEvaluated = currentAnswer?.evaluated;
              const isCorrect = idx === currentQ.correctAnswer;

              let btnClass = 'border-[#e5e5e5] dark:border-[#334155] bg-white dark:bg-[#0f172a] text-[#3c3c3c] dark:text-[#f8fafc] hover:bg-[#f7f7f7] dark:hover:bg-[#1e293b]';
              if (isSelected && !isEvaluated) {
                btnClass = 'border-[#1cb0f6] border-b-[#1899d6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6]';
              } else if (isEvaluated) {
                if (isCorrect) {
                  btnClass = 'border-[#58cc02] border-b-[#3f9600] bg-[#e5f8d0] dark:bg-[#58cc02]/20 text-[#4b7a00] dark:text-[#58cc02]';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'border-[#ff4b4b] border-b-[#ea2b2b] bg-[#ffdfe0] dark:bg-[#ff4b4b]/20 text-[#ea2b2b]';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isEvaluated}
                  className={`w-full p-4 rounded-2xl border-2 border-b-4 text-left font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isEvaluated && isCorrect && <Check className="w-5 h-5 text-[#58cc02]" />}
                  {isEvaluated && isSelected && !isCorrect && <X className="w-5 h-5 text-[#ff4b4b]" />}
                </button>
              );
            })}
          </div>
        )}

        {/* INPUT MODE: Open Ended */}
        {currentQ.type === 'open_ended' && (
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] mb-2">
                Çözüm Adımlarınız ve Gerekçeli Yanıtınız
              </label>
              <textarea
                rows={5}
                disabled={currentAnswer?.evaluated}
                value={currentAnswer?.textAnswer || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Yanıtınızı ve matematiksel/bilimsel gerekçelerinizi buraya yazınız..."
                className="w-full p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] text-sm font-semibold text-[#3c3c3c] dark:text-[#f8fafc] outline-none focus:border-[#1cb0f6] transition-colors resize-none"
              />
            </div>

            {/* Live Rubric Feedback Drawer */}
            {currentAnswer?.evaluated && currentAnswer.rubricFeedback && (
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 bg-[#ddf4ff]/40 dark:bg-[#1cb0f6]/10 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-[#1cb0f6]">
                      Puanlama Rubriği Analizi:
                    </span>
                    <span className="text-xs font-black text-[#58cc02] bg-[#e5f8d0] dark:bg-[#58cc02]/20 px-2 py-0.5 rounded-md">
                      {currentAnswer.awardedScore} / {currentQ.points} Puan ({currentAnswer.rubricFeedback.label})
                    </span>
                  </div>
                </div>

                <p className="text-xs font-semibold text-[#3c3c3c] dark:text-[#f8fafc] leading-relaxed">
                  {currentAnswer.rubricFeedback.feedback}
                </p>

                {/* Key terms analysis */}
                {currentAnswer.rubricFeedback.matchedTerms && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-bold text-[#777777] dark:text-[#94a3b8] mr-1">
                      Kullanılan Anahtar Terimler:
                    </span>
                    {currentAnswer.rubricFeedback.matchedTerms.map((term, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-md bg-[#e5f8d0] dark:bg-[#58cc02]/20 px-2 py-0.5 text-[10px] font-black text-[#4b7a00] dark:text-[#58cc02]"
                      >
                        <Check className="w-3 h-3 text-[#4b7a00] dark:text-[#58cc02]" />
                        <span>{term}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Exemplar Ideal Answer */}
                {currentQ.sampleAnswer && (
                  <div className="pt-3 border-t border-[#84d8ff]/40 dark:border-[#1cb0f6]/30 space-y-1">
                    <div className="text-[11px] font-black uppercase text-[#1cb0f6]">
                      Örnek İdeal Çözüm:
                    </div>
                    <p className="text-xs font-bold text-[#666666] dark:text-[#cbd5e1] whitespace-pre-line leading-relaxed">
                      {currentQ.sampleAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action button: Kontrol Et or Devam Et */}
        <div className="pt-4 border-t border-[#e5e5e5] dark:border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-duo btn-duo-white px-4 py-2.5 rounded-xl text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Önceki Soru</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!currentAnswer?.evaluated ? (
              <button
                onClick={handleCheckAnswer}
                disabled={
                  currentQ.type === 'multiple_choice'
                    ? currentAnswer?.selectedOption === undefined || currentAnswer?.selectedOption === null
                    : !currentAnswer?.textAnswer || currentAnswer.textAnswer.trim().length < 3
                }
                className="btn-duo btn-duo-blue px-6 py-3 rounded-xl text-xs font-black text-white w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {currentQ.type === 'open_ended' ? 'RUBRİK İLE DEĞERLENDİR' : 'CEVABI KONTROL ET'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-duo btn-duo-green px-8 py-3 rounded-xl text-xs font-black text-white flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
              >
                <span>{currentIndex === questions.length - 1 ? 'SINAVI BİTİR' : 'SONRAKİ SORU'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlacementExamPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-bold text-[#777777]">Sınav yükleniyor...</div>}>
      <PlacementExamRunner />
    </Suspense>
  );
}
