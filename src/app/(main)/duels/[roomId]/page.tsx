'use client';

import { useState, useEffect, use, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Swords,
  Trophy,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Brain,
  Shield,
  User,
  Zap,
  Copy,
  Check,
} from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { sounds } from '@/lib/sound';
import { DuelRoom } from '@/types';

interface DuelArenaProps {
  params: Promise<{ roomId: string }>;
}

export default function DuelArenaPage({ params }: DuelArenaProps) {
  const { roomId } = use(params);
  const router = useRouter();

  const {
    user,
    activeDuel,
    duelRooms,
    joinDuelRoom,
    setActiveDuel,
    submitDuelAnswer,
    advanceDuelQuestion,
    finishDuel,
  } = useUserStore();

  const [room, setRoom] = useState<DuelRoom | null>(activeDuel?.id === roomId ? activeDuel : null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [lastEarnedPoints, setLastEarnedPoints] = useState<number | null>(null);
  const [lastSpeedBonus, setLastSpeedBonus] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [duelSummary, setDuelSummary] = useState<{
    winner: string;
    hostScore: number;
    guestScore: number;
    xpEarned: number;
    clanPointsEarned: number;
    mistakesRecorded: number;
  } | null>(null);
  const [opponentAnsweredState, setOpponentAnsweredState] = useState<boolean>(false);

  const completeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isCompletingRef = useRef<boolean>(false);

  // Initialize room from local store or remote API
  useEffect(() => {
    let current = activeDuel;
    if (!current || current.id !== roomId) {
      const foundInStore = duelRooms.find((r) => r.id === roomId || r.code === roomId);
      if (foundInStore) {
        joinDuelRoom(foundInStore.code || foundInStore.id);
        current = foundInStore;
      }
    }

    if (current) {
      setRoom(current);
      if (current.status === 'completed') {
        const summary = finishDuel(current.id);
        setDuelSummary(summary);
        setIsFinished(true);
      }
    } else {
      // Fetch from API
      fetch(`/api/duels/${roomId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.room) {
            setActiveDuel(data.room);
            setRoom(data.room);
            if (data.room.status === 'completed') {
              const summary = finishDuel(data.room.id);
              setDuelSummary(summary);
              setIsFinished(true);
            }
          }
        })
        .catch(() => {
          // Ignore
        });
    }
  }, [roomId, activeDuel, duelRooms, joinDuelRoom, setActiveDuel, finishDuel]);

  // Keep local room in sync with store
  useEffect(() => {
    if (activeDuel && activeDuel.id === roomId) {
      setRoom(activeDuel);
      if (activeDuel.status === 'completed' && !isFinished) {
        const summary = finishDuel(activeDuel.id);
        setDuelSummary(summary);
        setIsFinished(true);
      }
    }
  }, [activeDuel, roomId, isFinished, finishDuel]);

  // Poll for opponent joining if room is in waiting status
  useEffect(() => {
    if (!room || room.status !== 'waiting' || isFinished) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/duels/${room.id}`);
        const data = await res.json();
        if (data.success && data.room) {
          if (data.room.status === 'active' || data.room.guestUserId) {
            setActiveDuel(data.room);
            setRoom(data.room);
          }
        }
      } catch {
        // Ignore network errors in polling
      }
    }, 2500);

    return () => clearInterval(pollInterval);
  }, [room?.id, room?.status, isFinished, setActiveDuel]);

  // Simulated opponent answering timing (1-5 seconds after question loads)
  useEffect(() => {
    if (!room || room.status === 'waiting' || hasAnswered || isFinished) return;
    setOpponentAnsweredState(false);

    const opponentTimer = setTimeout(() => {
      setOpponentAnsweredState(true);
    }, Math.floor(Math.random() * 4000) + 1800);

    return () => clearTimeout(opponentTimer);
  }, [room?.currentQuestionIndex, hasAnswered, isFinished, room?.status]);

  // 30-Second Countdown Timer (runs only when active, not when waiting for guest)
  useEffect(() => {
    if (!room || room.status === 'waiting' || hasAnswered || isFinished || room.status === 'completed') return;

    if (timeLeft <= 0) {
      // Time is up! Submit as blank (null)
      handleAnswer(null, 0);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [room?.status, timeLeft, hasAnswered, isFinished]);

  const handleAnswer = (optionIdx: number | null, remainingSec?: number) => {
    if (!room || hasAnswered || isFinished) return;

    const currentSeconds = remainingSec !== undefined ? remainingSec : timeLeft;
    setSelectedOption(optionIdx);
    setHasAnswered(true);

    const result = submitDuelAnswer(room.currentQuestionIndex, optionIdx, currentSeconds);
    setLastEarnedPoints(result.points);
    setLastSpeedBonus(Math.max(0, result.points - 100));

    // Also sync to backend API if available
    fetch(`/api/duels/${room.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'answer',
        userId: user.id,
        questionIndex: room.currentQuestionIndex,
        answerIndex: optionIdx,
        remainingSeconds: currentSeconds,
      }),
    }).catch(() => {});

    // If this was the last question (index 4)
    if (result.isDuelFinished) {
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
      completeTimeoutRef.current = setTimeout(() => {
        completeMatch();
      }, 2200);
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (!room) return;

    if (room.currentQuestionIndex >= room.questions.length - 1) {
      completeMatch();
      return;
    }

    advanceDuelQuestion();
    setSelectedOption(null);
    setHasAnswered(false);
    setTimeLeft(30);
    setLastEarnedPoints(null);
    setLastSpeedBonus(null);

    // Sync next to API
    fetch(`/api/duels/${room.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'next_question' }),
    }).catch(() => {});
  };

  const completeMatch = () => {
    if (isCompletingRef.current) return;
    isCompletingRef.current = true;
    if (completeTimeoutRef.current) {
      clearTimeout(completeTimeoutRef.current);
      completeTimeoutRef.current = null;
    }

    const summary = finishDuel(room?.id);
    setDuelSummary(summary);
    setIsFinished(true);

    // Sync finish to API
    if (room) {
      fetch(`/api/duels/${room.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'finish' }),
      }).catch(() => {});
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#fafafa] dark:bg-[#0b0f17]">
        <div className="text-center space-y-4">
          <Swords className="w-12 h-12 text-[#ff4b4b] mx-auto animate-pulse" />
          <h2 className="text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc]">
            Düello Odası Yükleniyor...
          </h2>
        </div>
      </div>
    );
  }

  const isUserHost = room.hostUserId === user.id;
  const currentQIndex = room.currentQuestionIndex || 0;
  const currentQ = room.questions[currentQIndex];

  const myScore = isUserHost ? room.hostScore : room.guestScore;
  const opponentScore = isUserHost ? room.guestScore : room.hostScore;
  const opponentName = isUserHost ? (room.guestUserName || 'Rakip Bekleniyor') : room.hostUserName;

  // Final summary stats
  const isWinner = duelSummary?.winner === user.id || (isUserHost && duelSummary?.winner === room.hostUserId);
  const isTie = duelSummary?.winner === 'tie';

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0b0f17] text-[#3c3c3c] dark:text-[#f8fafc] p-3 sm:p-6 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Top Arena Split Header */}
        <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-4 sm:p-6 shadow-sm">
          {/* Soru Sayaç & Branş */}
          <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e5] dark:border-[#334155] mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-[#ff4b4b]/10 text-[#ff4b4b] border border-[#ff4b4b]/20 flex items-center gap-1.5">
                <Swords className="w-3.5 h-3.5" />
                <span>Bilişsel Hız Turu</span>
              </span>
              <span className="text-xs font-black text-[#777777] dark:text-[#94a3b8]">
                {room.subjectName}
              </span>
            </div>

            <div className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc] bg-[#f7f7f7] dark:bg-[#0f172a] px-3 py-1 rounded-xl border border-[#e5e5e5] dark:border-[#334155]">
              Soru {currentQIndex + 1} / {room.questions.length}
            </div>
          </div>

          {/* Dual Avatars & Live Scores */}
          <div className="grid grid-cols-11 items-center gap-2 sm:gap-4">
            {/* User (Left - 5 cols) */}
            <div className="col-span-5 flex items-center gap-3 p-3 rounded-2xl bg-[#ddf4ff]/50 dark:bg-[#1cb0f6]/10 border-2 border-[#1cb0f6]/40">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-[#1cb0f6] text-white flex items-center justify-center font-black shrink-0 shadow-sm">
                <User className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc] truncate">
                  Sen ({user.fullName || user.username})
                </div>
                <div className="text-xs sm:text-base font-black text-[#1cb0f6]">
                  {myScore} Puan
                </div>
              </div>
            </div>

            {/* VS Badge & Countdown (Center - 1 col) */}
            <div className="col-span-1 text-center flex flex-col items-center justify-center">
              <div
                className={`h-11 w-11 sm:h-12 sm:w-12 rounded-full border-3 flex items-center justify-center font-black text-xs sm:text-sm shadow-md transition-colors ${
                  room.status === 'waiting'
                    ? 'border-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6]'
                    : timeLeft <= 5
                    ? 'border-[#ff4b4b] bg-[#ff4b4b] text-white animate-bounce'
                    : timeLeft <= 10
                    ? 'border-[#ff9600] bg-[#fff0db] dark:bg-[#ff9600]/20 text-[#ff9600]'
                    : 'border-[#58cc02] bg-[#f0fdf4] dark:bg-[#58cc02]/20 text-[#58cc02]'
                }`}
              >
                {room.status === 'waiting' ? (
                  <Clock className="w-5 h-5 animate-spin text-[#1cb0f6]" />
                ) : (
                  `${timeLeft}s`
                )}
              </div>
            </div>

            {/* Opponent (Right - 5 cols) */}
            <div className="col-span-5 flex items-center justify-end gap-3 p-3 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-right">
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc] truncate flex items-center justify-end gap-1.5">
                  <span>{opponentName}</span>
                </div>
                <div className="text-xs sm:text-base font-black text-[#ff9600]">
                  {opponentScore} Puan
                </div>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-[#ff9600] text-white flex items-center justify-center font-black shrink-0 shadow-sm">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Opponent Status Indicator */}
          <div className="mt-3 flex items-center justify-end gap-2 text-[11px] font-bold text-[#777777] dark:text-[#94a3b8]">
            {room.status === 'waiting' ? (
              <span className="inline-flex items-center gap-1 text-[#1cb0f6]">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Rakip bekleniyor (Oda Kodu: {room.code})</span>
              </span>
            ) : opponentAnsweredState ? (
              <span className="inline-flex items-center gap-1 text-[#58cc02]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Rakip yanıtladı!</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#ff9600]">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Rakip düşünüyor...</span>
              </span>
            )}
          </div>
        </div>

        {/* Waiting Lobby Card (when waiting for opponent to join) */}
        {room.status === 'waiting' && !isFinished && (
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-10 shadow-sm text-center space-y-6 animate-in fade-in duration-200">
            <div className="h-16 w-16 rounded-3xl bg-[#1cb0f6]/10 text-[#1cb0f6] mx-auto flex items-center justify-center">
              <Clock className="w-8 h-8 stroke-[2.5] animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                Rakip Bekleniyor...
              </h2>
              <p className="text-xs sm:text-sm text-[#777777] dark:text-[#94a3b8] font-semibold max-w-md mx-auto">
                Klan arkadaşına veya rakibine aşağıdaki 6 haneli kodu ilet. Katıldığı an 5 soruluk sürat turu başlayacak!
              </p>
            </div>

            <div className="max-w-xs mx-auto p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#1cb0f6]/40 flex items-center justify-between gap-3">
              <div className="text-left">
                <div className="text-[10px] font-black uppercase text-[#777777] dark:text-[#94a3b8]">
                  Oda Kodu
                </div>
                <div className="text-2xl font-black tracking-widest text-[#1cb0f6]">
                  {room.code}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  navigator.clipboard.writeText(room.code);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="btn-duo btn-duo-blue px-3.5 py-2 rounded-xl text-xs font-black text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copiedCode ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  const updated: DuelRoom = { ...room, status: 'active', guestUserName: 'Akademi Botu' };
                  setActiveDuel(updated);
                  setRoom(updated);
                }}
                className="flex-1 btn-duo btn-duo-green py-3 rounded-2xl text-xs font-black uppercase text-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Beklemeden Başla (Pratik)</span>
              </button>
            </div>
          </div>
        )}

        {/* Question Card */}
        {room.status !== 'waiting' && currentQ && !isFinished && (
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
            {/* Question Header & Kazanım */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] sm:text-xs font-black uppercase px-2.5 py-0.5 rounded-md bg-[#e5e5e5] dark:bg-[#334155] text-[#777777] dark:text-[#94a3b8]">
                {currentQ.learningOutcomeCode || 'Kazanım Değerlendirme'}
              </span>
              <span className="text-[11px] font-bold text-[#afafaf] dark:text-[#64748b]">
                Soru {currentQIndex + 1}
              </span>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-bold text-[#3c3c3c] dark:text-[#f8fafc] leading-relaxed">
              {currentQ.questionText}
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswer;
                const optionLetters = ['A', 'B', 'C', 'D', 'E'];

                let optionStyle = 'border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] hover:border-[#1cb0f6]';

                if (hasAnswered) {
                  if (isCorrect) {
                    optionStyle = 'border-[#58cc02] bg-[#f0fdf4] dark:bg-[#58cc02]/20 text-[#58cc02] shadow-xs';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-[#ff4b4b] bg-[#fef2f2] dark:bg-[#ff4b4b]/20 text-[#ff4b4b] shadow-xs';
                  } else {
                    optionStyle = 'opacity-40 border-[#e5e5e5] dark:border-[#334155]';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={hasAnswered}
                    onClick={() => handleAnswer(idx)}
                    className={`p-4 rounded-2xl border-2 border-b-4 text-left transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${optionStyle}`}
                  >
                    <div
                      className={`h-7 w-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        hasAnswered && isCorrect
                          ? 'bg-[#58cc02] text-white'
                          : hasAnswered && isSelected && !isCorrect
                          ? 'bg-[#ff4b4b] text-white'
                          : 'bg-[#e5e5e5] dark:bg-[#334155] text-[#3c3c3c] dark:text-[#f8fafc]'
                      }`}
                    >
                      {optionLetters[idx] || idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold flex-1 leading-snug pt-0.5">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Speed Bonus Bar */}
            {hasAnswered && (
              <div className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-150">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    {selectedOption === currentQ.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-[#58cc02]" />
                        <span className="text-sm font-black text-[#58cc02]">
                          Doğru Yanıt! +{lastEarnedPoints} Puan
                        </span>
                        {lastSpeedBonus && lastSpeedBonus > 0 ? (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#ff9600]/10 text-[#ff9600]">
                            +{lastSpeedBonus} Sürat Bonusu
                          </span>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-[#ff4b4b]" />
                        <span className="text-sm font-black text-[#ff4b4b]">
                          {selectedOption === null ? 'Süre Doldu! (0 Puan)' : 'Yanlış Yanıt! (0 Puan)'}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] font-medium text-[#777777] dark:text-[#94a3b8] max-w-xl">
                    {currentQ.explanation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="btn-duo btn-duo-green px-6 py-3 rounded-2xl text-xs font-black uppercase text-white flex items-center gap-2 cursor-pointer shrink-0 shadow-md"
                >
                  <span>{currentQIndex >= room.questions.length - 1 ? 'Sonuçları Gör' : 'Sonraki Soru'}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* DUEL SUMMARY SCREEN / CELEBRATION */}
        {isFinished && duelSummary && (
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-10 shadow-lg space-y-8 text-center animate-in zoom-in-95 duration-200">
            {/* Header / Trophy */}
            <div className="space-y-3">
              <div
                className={`h-20 w-20 rounded-3xl mx-auto flex items-center justify-center shadow-lg ${
                  isWinner
                    ? 'bg-[#ffc800] text-[#1e293b]'
                    : isTie
                    ? 'bg-[#1cb0f6] text-white'
                    : 'bg-[#ff4b4b] text-white'
                }`}
              >
                {isWinner ? (
                  <Trophy className="w-10 h-10 stroke-[2.5]" />
                ) : isTie ? (
                  <Award className="w-10 h-10 stroke-[2.5]" />
                ) : (
                  <Shield className="w-10 h-10 stroke-[2.5]" />
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                {isWinner ? 'Akademik Zafer!' : isTie ? 'Dostça Beraberlik!' : 'Zorlu Mücadele!'}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#777777] dark:text-[#94a3b8] max-w-md mx-auto">
                {isWinner
                  ? 'Harika bir sürat ve akademik refleks gösterdin. Klanına lig puanı kazandırdın!'
                  : isTie
                  ? 'Eşit güçte iki zihin karşılaştı. Her iki oyuncu da klan puanı kazandı.'
                  : 'Bu maçta kaçan sorular telafi için Akıllı Hata Defterine eklendi. Tekrar çalış ve geri dön!'}
              </p>
            </div>

            {/* Score Comparison Box */}
            <div className="p-6 rounded-3xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] max-w-md mx-auto grid grid-cols-3 items-center">
              <div className="text-center">
                <div className="text-[11px] font-black uppercase text-[#1cb0f6]">
                  Sen
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  {isUserHost ? duelSummary.hostScore : duelSummary.guestScore}
                </div>
              </div>

              <div className="text-xs font-black text-[#777777] dark:text-[#94a3b8] uppercase tracking-widest">
                VS
              </div>

              <div className="text-center">
                <div className="text-[11px] font-black uppercase text-[#ff9600]">
                  Rakip
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                  {isUserHost ? duelSummary.guestScore : duelSummary.hostScore}
                </div>
              </div>
            </div>

            {/* Rewards Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="p-4 rounded-2xl bg-[#f0fdf4] dark:bg-[#58cc02]/10 border-2 border-[#58cc02]/40 text-center space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#58cc02] block">
                  Kazanılan Prestijli XP
                </span>
                <span className="text-xl font-black text-[#58cc02]">
                  +{duelSummary.xpEarned} XP
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/10 border-2 border-[#1cb0f6]/40 text-center space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1cb0f6] block">
                  Klan Ligi Katkısı
                </span>
                <span className="text-xl font-black text-[#1cb0f6]">
                  +{duelSummary.clanPointsEarned} Klan Puanı
                </span>
              </div>
            </div>

            {/* Mistake Routing Badge (Requirement 3) */}
            {duelSummary.mistakesRecorded > 0 ? (
              <div className="p-4 rounded-2xl bg-[#fff0db] dark:bg-[#ff9600]/10 border-2 border-[#ff9600]/30 max-w-md mx-auto flex items-center gap-3 text-left">
                <Brain className="w-6 h-6 text-[#ff9600] shrink-0" />
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-[#ff9600]">
                    Akıllı Hata Defterine Kaydedildi
                  </div>
                  <div className="text-[11px] font-semibold text-[#777777] dark:text-[#94a3b8]">
                    {duelSummary.mistakesRecorded} hatalı/boş soru Ebbinghaus hafıza eğrisine göre telafi için defterine eklendi.
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-[#f0fdf4] dark:bg-[#58cc02]/10 border-2 border-[#58cc02]/30 max-w-md mx-auto text-xs font-black text-[#58cc02]">
                Kusursuz Performans! 5 sorunun 5&apos;i de doğru yanıtlandı.
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <Link
                href="/quiz"
                onClick={() => sounds.playClick()}
                className="flex-1 btn-duo btn-duo-blue py-3.5 rounded-2xl text-xs font-black uppercase text-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Hata Defterine Git</span>
              </Link>
              <Link
                href="/duels"
                onClick={() => sounds.playClick()}
                className="flex-1 btn-duo btn-duo-green py-3.5 rounded-2xl text-xs font-black uppercase text-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Yeni Düello</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
