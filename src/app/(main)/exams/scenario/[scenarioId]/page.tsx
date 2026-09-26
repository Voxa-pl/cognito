'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  ChevronRight,
  RotateCcw,
  Award,
  Check,
  X,
  Flag,
  Shield,
} from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { getScenarioById } from '@/data/examScenarios';
import { evaluateOpenEndedAnswer } from '@/data/placementExams';
import { sounds } from '@/lib/sound';

export default function ScenarioExamPage({ params }: { params: Promise<{ scenarioId: string }> }) {
  const resolvedParams = use(params);
  const { scenarioId } = resolvedParams;
  const router = useRouter();

  const recordScenarioAttempt = useUserStore((state) => state.recordScenarioAttempt);
  const recordMistakesFromScenario = useUserStore((state) => state.recordMistakesFromScenario);

  const scenario = getScenarioById(scenarioId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<
      string,
      {
        selectedOption?: number | null;
        textAnswer?: string;
        evaluated?: boolean;
        awardedScore: number;
        flagged?: boolean;
        rubricFeedback?: {
          label: string;
          feedback: string;
          matchedTerms: string[];
          missingTerms: string[];
        };
      }
    >
  >({});

  const [timeLeftSec, setTimeLeftSec] = useState(40 * 60); // 40 minutes official exam duration
  const [isFinished, setIsFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  if (!scenario) {
    return (
      <div className="container max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="h-16 w-16 mx-auto rounded-3xl bg-[#ffdfe0] dark:bg-[#ff4b4b]/20 text-[#ff4b4b] flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
          Sınav Senaryosu Bulunamadı
        </h1>
        <p className="text-xs text-[#777777] dark:text-[#94a3b8]">
          Talep edilen senaryo kimliği sistemde kayıtlı değil.
        </p>
        <Link
          href="/exams"
          className="btn-duo btn-duo-blue inline-flex items-center px-6 py-2.5 rounded-xl text-xs font-black text-white cursor-pointer"
        >
          Sınav Merkezine Dön
        </Link>
      </div>
    );
  }

  const currentQ = scenario.questions[currentIndex];
  const currentAns = currentQ ? answers[currentQ.id] : undefined;

  const handleSelectOption = (optIdx: number) => {
    if (!currentQ || currentAns?.evaluated) return;
    sounds.playClick();
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedOption: optIdx,
        awardedScore: optIdx === currentQ.correctAnswer ? currentQ.points : 0,
        evaluated: false,
      },
    }));
  };

  const handleTextChange = (text: string) => {
    if (!currentQ || currentAns?.evaluated) return;
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

  const toggleFlag = () => {
    if (!currentQ) return;
    sounds.playClick();
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        awardedScore: prev[currentQ.id]?.awardedScore || 0,
        flagged: !prev[currentQ.id]?.flagged,
      },
    }));
  };

  const handleCheckAnswer = () => {
    if (!currentQ) return;
    sounds.playClick();

    if (currentQ.type === 'open_ended') {
      const studentText = currentAns?.textAnswer || '';
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
      const isCorrect = currentAns?.selectedOption === currentQ.correctAnswer;
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

  const finishExam = () => {
    sounds.playChest();
    let scoreAcc = 0;
    scenario.questions.forEach((q) => {
      const ans = answers[q.id];
      scoreAcc += ans?.awardedScore || 0;
    });

    const scaled = Math.min(100, Math.round((scoreAcc / Math.max(1, scenario.totalPoints)) * 100));
    setTotalScore(scaled);

    // Cognitive level breakdown
    const cogBreakdown = scenario.distribution.map((d) => ({
      level: d.cognitiveLevel,
      score: Math.round(scaled * 0.9), // approximate mapping
      total: 100,
    }));

    recordScenarioAttempt({
      id: `sc-attempt-${Date.now()}`,
      scenarioId: scenario.id,
      subjectName: scenario.subjectName,
      title: scenario.title,
      score: scaled,
      totalPoints: 100,
      completedAt: new Date().toISOString(),
      durationSeconds: 40 * 60 - timeLeftSec,
      cognitiveBreakdown: cogBreakdown,
      feedback:
        scaled >= 85
          ? 'Tebrikler! Yazılı senaryo standartlarında üst düzey başarı sergilediniz.'
          : scaled >= 70
          ? 'İyi bir seviye. Açık uçlu sorularda anahtar terimlerin kullanımına biraz daha özen gösterebilirsiniz.'
          : 'Temel kazanımları pekiştirmek için ünite testlerine dönmeniz önerilir.',
    });

    // Auto-capture wrong or incomplete scenario questions into mistakeVault
    recordMistakesFromScenario(scenario.id, scenario.questions, answers);

    setShowSubmitModal(false);
    setIsFinished(true);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isFinished) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
        <div className="rounded-3xl border-2 border-[#1cb0f6] border-b-6 border-b-[#1899d6] bg-white dark:bg-[#1e293b] p-6 sm:p-10 shadow-xl text-center space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] shadow-md border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40">
            <GraduationCap className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="rounded-full bg-[#e5f8d0] dark:bg-[#58cc02]/20 border border-[#bcf087] dark:border-[#58cc02]/40 px-3.5 py-1 text-xs font-black uppercase text-[#58cc02]">
              Akademik Ortak Yazılı Sınav Karnesi
            </span>
            <h1 className="text-xl sm:text-3xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
              {scenario.title}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#777777] dark:text-[#94a3b8] max-w-lg mx-auto">
              Sınav süresi ve ölçme değerlendirme rubriği tamamlandı.
            </p>
          </div>

          {/* Big Score Certificate */}
          <div className="p-6 rounded-3xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] max-w-sm mx-auto space-y-2">
            <div className="text-xs font-black uppercase text-[#777777] dark:text-[#94a3b8]">
              Yazılı Sınav Puanı
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[#1cb0f6]">
              {totalScore} <span className="text-xl text-[#afafaf] dark:text-[#64748b]">/ 100</span>
            </div>
            <div className="text-xs font-bold text-[#58cc02] pt-1">
              +{Math.max(25, Math.round(totalScore * 1.5))} Akademik XP Havuzunuza Eklendi!
            </div>
          </div>

          {/* Cognitive Breakdown */}
          <div className="space-y-3 text-left pt-4 border-t border-[#e5e5e5] dark:border-[#334155]">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8]">
              Bilişsel Düzey Kazanım Dağılımı
            </h3>
            <div className="space-y-2">
              {scenario.distribution.map((d, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-[#3c3c3c] dark:text-[#f8fafc] max-w-sm">
                    {d.learningOutcome}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg font-black text-[11px] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6]">
                    {d.cognitiveLevel}
                  </span>
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

  return (
    <div className="container max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Top Bar: Exam Title + Timer + Question Navigator */}
      <div className="p-4 sm:p-5 rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-white dark:bg-[#1e293b] shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="rounded-md bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 px-2 py-0.5 text-[10px] font-black uppercase text-[#1cb0f6]">
                Yazılı Senaryosu {scenario.scenarioNumber}
              </span>
              <span className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                {scenario.subjectName}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-[#3c3c3c] dark:text-[#f8fafc] truncate max-w-md">
              {scenario.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#f7f7f7] dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155] shrink-0">
            <Clock className="w-4 h-4 text-[#ff9600]" />
            <span className="text-xs font-black text-[#ff9600] font-mono">
              {formatTimer(timeLeftSec)}
            </span>
          </div>
        </div>

        {/* Question Palette Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {scenario.questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const ans = answers[q.id];
            const isAnswered = ans?.selectedOption !== undefined || (ans?.textAnswer && ans.textAnswer.length > 0);
            const isFlagged = ans?.flagged;

            let badgeClass = 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] text-[#777777] dark:text-[#94a3b8]';
            if (isCurrent) {
              badgeClass = 'bg-[#1cb0f6] border-[#1899d6] text-white shadow-sm';
            } else if (isFlagged) {
              badgeClass = 'bg-[#fff0db] dark:bg-[#ff9600]/20 border-[#ffb74d] text-[#ff9600]';
            } else if (isAnswered) {
              badgeClass = 'bg-[#e5f8d0] dark:bg-[#58cc02]/20 border-[#58cc02] text-[#4b7a00] dark:text-[#58cc02]';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  sounds.playClick();
                  setCurrentIndex(idx);
                }}
                className={`h-9 w-9 rounded-xl font-black text-xs border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all ${badgeClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3 py-0.5 text-[10px] font-black uppercase text-[#1cb0f6]">
              {currentQ.type === 'open_ended' ? 'Açık Uçlu Analitik Soru' : 'Çoktan Seçmeli'}
            </span>
            <span className="text-xs font-black text-[#58cc02]">
              {currentQ.points} Puan
            </span>
          </div>

          <button
            onClick={toggleFlag}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black border transition-colors cursor-pointer ${
              currentAns?.flagged
                ? 'bg-[#fff0db] dark:bg-[#ff9600]/20 border-[#ff9600] text-[#ff9600]'
                : 'bg-white dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] text-[#777777] dark:text-[#94a3b8]'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${currentAns?.flagged ? 'fill-[#ff9600]' : ''}`} />
            <span>{currentAns?.flagged ? 'İşaretli' : 'İşaretle'}</span>
          </button>
        </div>

        <h2 className="text-base sm:text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc] leading-relaxed">
          {currentQ.questionText}
        </h2>

        {/* Options / Text Input */}
        {currentQ.type === 'multiple_choice' && currentQ.options && (
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = currentAns?.selectedOption === idx;
              const isEvaluated = currentAns?.evaluated;
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

        {currentQ.type === 'open_ended' && (
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] mb-2">
                Sınav Yanıt Metni (Çözüm Adımları & Bilimsel Gerekçelendirme)
              </label>
              <textarea
                rows={5}
                disabled={currentAns?.evaluated}
                value={currentAns?.textAnswer || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Açık uçlu yanıtınızı ve çözüm basamaklarınızı buraya yazınız..."
                className="w-full p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] text-sm font-semibold text-[#3c3c3c] dark:text-[#f8fafc] outline-none focus:border-[#1cb0f6] transition-colors resize-none"
              />
            </div>

            {currentAns?.evaluated && currentAns.rubricFeedback && (
              <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 bg-[#ddf4ff]/40 dark:bg-[#1cb0f6]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#1cb0f6]">
                    Puanlama Rubriği Sonucu:
                  </span>
                  <span className="text-xs font-black text-[#58cc02] bg-[#e5f8d0] dark:bg-[#58cc02]/20 px-2.5 py-0.5 rounded-md">
                    {currentAns.awardedScore} / {currentQ.points} Puan ({currentAns.rubricFeedback.label})
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#3c3c3c] dark:text-[#f8fafc]">
                  {currentAns.rubricFeedback.feedback}
                </p>
                {currentQ.sampleAnswer && (
                  <div className="pt-2 border-t border-[#84d8ff]/40 dark:border-[#1cb0f6]/30">
                    <span className="text-[11px] font-black uppercase text-[#1cb0f6] block mb-1">
                      Örnek İdeal Çözüm:
                    </span>
                    <p className="text-xs font-bold text-[#666666] dark:text-[#cbd5e1] whitespace-pre-line">
                      {currentQ.sampleAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-[#e5e5e5] dark:border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => {
              sounds.playClick();
              if (currentIndex > 0) setCurrentIndex((i) => i - 1);
            }}
            disabled={currentIndex === 0}
            className="btn-duo btn-duo-white px-4 py-2.5 rounded-xl text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Önceki Soru</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!currentAns?.evaluated ? (
              <button
                onClick={handleCheckAnswer}
                disabled={
                  currentQ.type === 'multiple_choice'
                    ? currentAns?.selectedOption === undefined
                    : !currentAns?.textAnswer || currentAns.textAnswer.trim().length < 2
                }
                className="btn-duo btn-duo-blue px-6 py-3 rounded-xl text-xs font-black text-white disabled:opacity-50 cursor-pointer"
              >
                {currentQ.type === 'open_ended' ? 'RUBRİKLE DEĞERLENDİR' : 'CEVABI ONAYLA'}
              </button>
            ) : null}

            {currentIndex < scenario.questions.length - 1 ? (
              <button
                onClick={() => {
                  sounds.playClick();
                  setCurrentIndex((i) => i + 1);
                }}
                className="btn-duo btn-duo-white px-6 py-3 rounded-xl text-xs font-black text-[#1cb0f6] flex items-center gap-1 cursor-pointer"
              >
                <span>Sonraki Soru</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowSubmitModal(true);
                }}
                className="btn-duo btn-duo-green px-8 py-3 rounded-xl text-xs font-black text-white flex items-center gap-1 cursor-pointer"
              >
                <span>SINAVI BİTİR</span>
                <Check className="w-4 h-4 stroke-[3]" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="max-w-md w-full rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  Sınavı Tamamla ve Gönder?
                </h3>
                <p className="text-xs text-[#777777] dark:text-[#94a3b8] font-semibold">
                  Tüm yanıtlarınız puanlama sistemine işlenecektir.
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold text-[#666666] dark:text-[#cbd5e1] leading-relaxed">
              Sınavı teslim ettiğinizde sınav karneniz ve bilişsel basamak analiziniz hesaplanacaktır.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowSubmitModal(false);
                }}
                className="btn-duo btn-duo-white flex-1 py-3 rounded-2xl text-xs font-black cursor-pointer"
              >
                Sınava Devam Et
              </button>
              <button
                onClick={finishExam}
                className="btn-duo btn-duo-green flex-1 py-3 rounded-2xl text-xs font-black text-white cursor-pointer"
              >
                Evet, Teslim Et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
