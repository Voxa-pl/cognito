'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '@/types';
import { allQuestions, getQuestionsByTopic, questionsBySubject } from '@/data/questions';
import { getTopicName, getTopicById } from '@/data/curriculum';
import { subjects } from '@/data/subjects';
import { QuizCard } from '@/components/quiz/QuizCard';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuizResult } from '@/components/quiz/QuizResult';
import { Check, X, ArrowRight, AlertCircle } from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { sounds } from '@/lib/sound';

// Enthusiastic Turkish praise options for correct answers
const praiseWords = ['Harika!', 'Süpersin!', 'Mükemmel!', 'Doğru Bildin!', 'Çok İyisin!'];

export default function QuizPage({ params }: { params: Promise<{ topicId: string }> }) {
  const resolvedParams = use(params);
  const { topicId } = resolvedParams;
  const router = useRouter();

  const selectedMode = useUserStore((state) => state.selectedMode);
  const addXP = useUserStore((state) => state.addXP);
  const addGems = useUserStore((state) => state.addGems);
  const updateTopicProgress = useUserStore((state) => state.updateTopicProgress);
  const addQuizAttempt = useUserStore((state) => state.addQuizAttempt);
  const recordStudyActivity = useUserStore((state) => state.recordStudyActivity);
  const recordMistakesFromQuiz = useUserStore((state) => state.recordMistakesFromQuiz);

  // Load questions with reliable fallbacks
  const [questions, setQuestions] = useState<Question[]>(() => {
    let filtered: Question[] = [];
    if (topicId === 'mixed') {
      filtered = allQuestions;
    } else {
      filtered = getQuestionsByTopic(topicId);
      // Fallback: If topic has no specific questions, get from its subject
      if (filtered.length === 0) {
        const topicObj = getTopicById(topicId);
        const sub = subjects.find((s) => s.id === topicObj?.subjectId || s.slug === topicObj?.subjectId);
        const subSlug = sub?.slug;
        if (subSlug && questionsBySubject[subSlug]?.length > 0) {
          filtered = questionsBySubject[subSlug];
        } else {
          filtered = allQuestions;
        }
      }
    }
    return [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [answers, setAnswers] = useState<('correct' | 'wrong' | null)[]>(() =>
    new Array(questions.length).fill(null)
  );
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>(() =>
    new Array(questions.length).fill(null)
  );
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [startTime, setStartTime] = useState<number>(() => Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [praiseText, setPraiseText] = useState('Harika!');
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [securityWarning, setSecurityWarning] = useState<string | null>(null);

  const topicDisplayName = topicId === 'mixed' ? 'Karışık Akademik Deneme Quizi' : getTopicName(topicId);

  useEffect(() => {
    let filtered: Question[] = [];
    if (topicId === 'mixed') {
      filtered = allQuestions;
    } else {
      filtered = getQuestionsByTopic(topicId);
      if (filtered.length === 0) {
        const topicObj = getTopicById(topicId);
        const sub = subjects.find((s) => s.id === topicObj?.subjectId || s.slug === topicObj?.subjectId);
        const subSlug = sub?.slug;
        if (subSlug && questionsBySubject[subSlug]?.length > 0) {
          filtered = questionsBySubject[subSlug];
        } else {
          filtered = allQuestions;
        }
      }
    }

    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
    setAnswers(new Array(shuffled.length).fill(null));
    setSelectedOptions(new Array(shuffled.length).fill(null));
    setStartTime(Date.now());
    setHearts(5);
    setIsGameOver(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsRevealed(false);
    setScore(0);
    setXpEarned(0);
    setIsFinished(false);
    setSecurityWarning(null);

    // Issue cryptographically signed session token from backend
    fetch('/api/quiz/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topicId,
        questionCount: shuffled.length,
        mode: selectedMode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.sessionToken) {
          setSessionToken(data.sessionToken);
        }
      })
      .catch(() => {});
  }, [topicId, selectedMode]);

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (index: number) => {
    if (!isRevealed && !isGameOver) {
      setSelectedAnswer(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null || !currentQuestion || isRevealed) return;

    setIsRevealed(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = isCorrect ? 'correct' : 'wrong';
    setAnswers(newAnswers);

    const newSelectedOpts = [...selectedOptions];
    newSelectedOpts[currentIndex] = selectedAnswer;
    setSelectedOptions(newSelectedOpts);

    if (isCorrect) {
      // Pick random praise
      setPraiseText(praiseWords[Math.floor(Math.random() * praiseWords.length)]);
      sounds.playCorrect();
      setScore((s) => s + 1);
      setXpEarned((xp) => xp + currentQuestion.xpValue);
    } else {
      sounds.playWrong();
      if (selectedMode === 'challenge') {
        const newHearts = Math.max(0, hearts - 1);
        setHearts(newHearts);
        if (newHearts === 0) {
          setIsGameOver(true);
        }
      }
    }
  };

  const handleContinue = () => {
    sounds.playClick();
    if (isGameOver) {
      finishQuiz(true);
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      finishQuiz(false);
    }
  };

  const finishQuiz = async (gameOverState: boolean) => {
    const endTime = Date.now();
    const duration = Math.max(1, Math.floor((endTime - startTime) / 1000));
    setTimeSpent(duration);
    setIsFinished(true);
    setIsGameOver(gameOverState);

    let awardedXp = xpEarned;
    let awardedGems = Math.max(5, Math.floor(score * 2));
    let isValidAttempt = true;

    // Backend Anti-Cheat verification
    if (sessionToken) {
      try {
        const res = await fetch('/api/quiz/verify-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionToken,
            topicId,
            score,
            questionCount: questions.length,
            timeSpentSec: duration,
            answers,
          }),
        });
        const data = await res.json();
        if (data.success) {
          awardedXp = data.verifiedXp ?? awardedXp;
          awardedGems = data.verifiedGems ?? awardedGems;
        } else {
          // Security verification failed (SPEED_HACK, INVALID_TOKEN, SESSION_REPLAYED, etc.)
          setSecurityWarning(data.message || 'Güvenlik doğrulaması başarısız oldu: Oturum geçersiz sayıldı.');
          awardedXp = 0;
          awardedGems = 0;
          isValidAttempt = false;
        }
      } catch {
        // Network failure / offline: do not award arbitrary unverified progress
        setSecurityWarning('Sunucu doğrulama katmanına erişilemedi veya bağlantı kesildi. Adil oyun ilkeleri gereği çevrimdışı kazanımlar kaydedilemez.');
        awardedXp = 0;
        awardedGems = 0;
        isValidAttempt = false;
      }
    } else {
      setSecurityWarning('Geçerli bir test oturumu doğrulanamadı. İlerleme kaydedilemedi.');
      awardedXp = 0;
      awardedGems = 0;
      isValidAttempt = false;
    }

    // Save progress only if verification succeeded
    if (isValidAttempt && topicId !== 'mixed' && !topicId.startsWith('trophy-')) {
      updateTopicProgress(topicId, { correctCount: score, totalCount: questions.length });
    }
    if (awardedXp > 0) {
      addXP(awardedXp);
    }
    if (awardedGems > 0) {
      addGems(awardedGems);
    }
    if (isValidAttempt) {
      addQuizAttempt({
        topicId,
        score,
        totalQuestions: questions.length,
        xpEarned: awardedXp,
        timeSpentSec: duration,
        completedAt: new Date().toISOString(),
      });
      recordStudyActivity(Math.max(1, Math.round(duration / 60)), awardedXp, questions.length);
    }

    // Auto-Capture wrong or unattempted questions into mistakeVault
    recordMistakesFromQuiz(topicId, questions, answers, selectedOptions);
  };

  const handleRetry = () => {
    let filtered: Question[] = [];
    if (topicId === 'mixed') {
      filtered = allQuestions;
    } else {
      filtered = getQuestionsByTopic(topicId);
      if (filtered.length === 0) {
        filtered = allQuestions;
      }
    }
    const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsRevealed(false);
    setAnswers(new Array(shuffled.length).fill(null));
    setScore(0);
    setXpEarned(0);
    setHearts(5);
    setIsGameOver(false);
    setStartTime(Date.now());
    setIsFinished(false);
    setSecurityWarning(null);

    // Request fresh session token for the retry
    fetch('/api/quiz/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topicId,
        questionCount: shuffled.length,
        mode: selectedMode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.sessionToken) {
          setSessionToken(data.sessionToken);
        }
      })
      .catch(() => {});
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f172a] flex flex-col justify-center items-center px-4 py-8">
        {securityWarning && (
          <div className="mb-6 max-w-lg w-full rounded-2xl bg-[#fee2e2] dark:bg-[#ef4444]/20 border-2 border-[#fca5a5] dark:border-[#ef4444]/40 p-4 text-center animate-in fade-in duration-200">
            <div className="flex items-center justify-center gap-2 text-[#b91c1c] dark:text-[#f87171] font-black text-sm mb-1">
              <AlertCircle className="w-5 h-5" />
              <span>GÜVENLİK VE ADİL OYUN UYARISI</span>
            </div>
            <p className="text-xs text-[#991b1b] dark:text-[#fca5a5] font-semibold">
              {securityWarning}
            </p>
            <p className="text-[11px] text-[#7f1d1d] dark:text-[#fecaca] mt-1 font-bold">
              Bu test için sunucu tarafından XP ve Başarı Kredisi tanımlanmadı.
            </p>
          </div>
        )}
        <QuizResult
          score={score}
          totalQuestions={questions.length}
          xpEarned={securityWarning ? 0 : xpEarned}
          timeSpentSec={timeSpent}
          topicName={topicDisplayName}
          isGameOver={isGameOver}
          onRetry={handleRetry}
          onGoBack={() => router.push('/dashboard')}
        />
      </div>
    );
  }

  const isCurrentCorrect = selectedAnswer !== null && currentQuestion && selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0f172a]">
      {/* Top Bar: Close 'X' + Progress Bar + Hearts */}
      <div className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md px-4 sm:px-8 pt-4 pb-2">
        <div className="max-w-2xl mx-auto">
          <QuizProgress
            current={currentIndex}
            total={questions.length}
            mode={selectedMode}
            hearts={hearts}
            onClose={() => setShowExitModal(true)}
          />
        </div>
      </div>

      {/* Main Question Area (with bottom padding to avoid sticky bar collision) */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-6 pb-36 pt-4">
        {currentQuestion && (
          <QuizCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            isRevealed={isRevealed}
            onSelectAnswer={handleSelectAnswer}
          />
        )}
      </main>

      {/* Sticky Bottom Action Bar & Bottom Sheet Feedback */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-200 ${
          isRevealed
            ? isCurrentCorrect
              ? 'bg-[#d7ffb8] dark:bg-[#14532d] border-t-2 border-[#bcf087] dark:border-[#22c55e] animate-slide-up shadow-2xl'
              : 'bg-[#ffdfe0] dark:bg-[#7f1d1d] border-t-2 border-[#ffb3b5] dark:border-[#ef4444] animate-slide-up shadow-2xl'
            : 'bg-white dark:bg-[#1e293b] border-t-2 border-[#e5e5e5] dark:border-[#334155]'
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left Side: Feedback or Empty */}
          {!isRevealed ? (
            <div className="hidden sm:block text-xs font-bold text-[#777777] dark:text-[#94a3b8]">
              {selectedAnswer === null ? 'Devam etmek için bir seçenek belirle' : 'Cevabını kontrol etmeye hazırsın!'}
            </div>
          ) : (
            <div className="flex items-start gap-4 flex-1">
              {/* Circular White Icon Badge */}
              <div
                className={`flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-white dark:bg-[#0f172a] shadow-md ${
                  isCurrentCorrect ? 'text-[#58cc02]' : 'text-[#ea2b2b]'
                }`}
              >
                {isCurrentCorrect ? (
                  <Check className="w-8 h-8 sm:w-9 sm:h-9 stroke-[3.5]" />
                ) : (
                  <X className="w-8 h-8 sm:w-9 sm:h-9 stroke-[3.5]" />
                )}
              </div>

              {/* Feedback Content */}
              <div className="flex flex-col text-left">
                {isCurrentCorrect ? (
                  <>
                    <h3 className="text-xl sm:text-2xl font-black text-[#58a700] dark:text-[#86efac] tracking-tight">
                      {praiseText}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-[#4b7a00] dark:text-[#bbf7d0] leading-snug mt-0.5 max-w-lg">
                      {currentQuestion.explanation || 'Doğru seçeneği başarıyla işaretledin!'}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg sm:text-xl font-black text-[#ea2b2b] dark:text-[#fca5a5] tracking-tight">
                      Doğru cevap:{' '}
                      <span className="font-extrabold text-[#9c1c1c] dark:text-[#fecaca]">
                        {currentQuestion.options[currentQuestion.correctAnswer]}
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#8c1d1d] dark:text-[#fca5a5] leading-snug mt-0.5 max-w-lg">
                      {currentQuestion.explanation}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Right Side: 3D Tactile Action Button */}
          <div className="w-full sm:w-auto shrink-0">
            {!isRevealed ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
                className={`btn-duo w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-black tracking-wider ${
                  selectedAnswer !== null
                    ? 'btn-duo-green text-white shadow-md'
                    : 'btn-duo-disabled'
                }`}
              >
                KONTROL ET
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className={`btn-duo w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-black tracking-wider text-white shadow-lg ${
                  isCurrentCorrect ? 'btn-duo-green' : 'btn-duo-red'
                }`}
              >
                {isCurrentCorrect ? 'DEVAM ET' : 'ANLADIM'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#283a45] bg-white dark:bg-[#1e293b] p-6 text-center shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffdfe0] dark:bg-[#ff4b4b]/20 text-[#ff4b4b] border border-transparent dark:border-[#ff4b4b]/30">
              <AlertCircle className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc] mb-2">
              Ayrılmak istediğine emin misin?
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#777777] dark:text-[#94a3b8] mb-6">
              Şimdi ayrılırsan bu testteki ilerlemen ve kazanılmamış XP'ler kaydedilmeyebilir.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowExitModal(false);
                }}
                className="btn-duo btn-duo-blue w-full py-3.5 rounded-2xl text-sm font-black text-white cursor-pointer"
              >
                TESTE DEVAM ET
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  router.push('/dashboard');
                }}
                className="btn-duo btn-duo-white w-full py-3 rounded-2xl text-xs font-black text-[#ea2b2b] hover:text-[#ea2b2b] dark:bg-[#1e293b] dark:border-[#334155] dark:border-b-[#283a45] cursor-pointer"
              >
                AYRIL VE DÖN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
