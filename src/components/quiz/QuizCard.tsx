'use client';

import { Question } from '@/types';
import { Check, X, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sound';

interface QuizCardProps {
  question: Question;
  selectedAnswer: number | null;
  isRevealed: boolean;
  onSelectAnswer: (index: number) => void;
}

export function QuizCard({
  question,
  selectedAnswer,
  isRevealed,
  onSelectAnswer,
}: QuizCardProps) {
  const letters = ['A', 'B', 'C', 'D'];

  const getOptionClasses = (index: number) => {
    const isSelected = selectedAnswer === index;
    const isCorrect = question.correctAnswer === index;

    // Normal state before check
    if (!isRevealed) {
      if (isSelected) {
        return 'bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-[#1cb0f6] border-b-[5px] border-b-[#1899d6] text-[#1899d6] dark:text-[#38bdf8] translate-y-[-2px] shadow-sm';
      }
      return 'bg-white dark:bg-[#1e293b] border-[#e5e5e5] dark:border-[#334155] border-b-[5px] border-b-[#cecece] dark:border-b-[#283a45] text-[#3c3c3c] dark:text-[#f8fafc] hover:bg-[#f7f7f7] dark:hover:bg-[#283a45] hover:border-[#d0d0d0] dark:hover:border-[#475569] active:translate-y-[2px] active:border-b-2';
    }

    // Revealed state after check
    if (isCorrect) {
      return 'bg-[#d7ffb8] dark:bg-[#58cc02]/20 border-[#58cc02] border-b-[5px] border-b-[#58a700] text-[#58a700] dark:text-[#86efac]';
    }

    if (isSelected && !isCorrect) {
      return 'bg-[#ffdfe0] dark:bg-[#ff4b4b]/20 border-[#ea2b2b] border-b-[5px] border-b-[#ea2b2b] text-[#ea2b2b] dark:text-[#fca5a5]';
    }

    return 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] border-b-2 opacity-40 text-[#afafaf] dark:text-[#64748b] cursor-not-allowed';
  };

  const getLetterBadgeClasses = (index: number) => {
    const isSelected = selectedAnswer === index;
    const isCorrect = question.correctAnswer === index;

    if (!isRevealed) {
      if (isSelected) {
        return 'bg-[#1cb0f6] text-white border-2 border-[#1cb0f6]';
      }
      return 'bg-white dark:bg-[#0f172a] text-[#777777] dark:text-[#94a3b8] border-2 border-[#e5e5e5] dark:border-[#334155] group-hover:border-[#cecece] dark:group-hover:border-[#475569]';
    }

    if (isCorrect) {
      return 'bg-[#58cc02] text-white border-2 border-[#58cc02]';
    }

    if (isSelected && !isCorrect) {
      return 'bg-[#ea2b2b] text-white border-2 border-[#ea2b2b]';
    }

    return 'bg-[#e5e5e5] dark:bg-[#334155] text-[#afafaf] dark:text-[#64748b] border-2 border-[#cecece] dark:border-[#475569]';
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto py-2">
      {/* Category Pill & XP Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-black uppercase tracking-wider text-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 px-3 py-1 rounded-full border border-[#84d8ff] dark:border-[#1cb0f6]/40">
          {question.type === 'true_false' ? 'Doğru / Yanlış' : 'Çoktan Seçmeli'}
        </span>

        <span className="flex items-center gap-1 text-xs font-black text-[#ffc800] bg-[#fff8db] dark:bg-[#ffc800]/20 px-3 py-1 rounded-full border border-[#ffe066] dark:border-[#ffc800]/40">
          <Sparkles className="w-3.5 h-3.5 fill-[#ffc800]" />
          +{question.xpValue} XP
        </span>
      </div>

      {/* Large Readable Turkish Question Text */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#3c3c3c] dark:text-[#f8fafc] leading-snug tracking-tight">
          {question.questionText}
        </h2>
      </div>

      {/* 3D Tactile Option Buttons */}
      <div
        className={`grid gap-3.5 ${
          question.type === 'true_false' ? 'grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.correctAnswer === index;

          return (
            <button
              key={index}
              disabled={isRevealed}
              onClick={() => {
                sounds.playClick();
                onSelectAnswer(index);
              }}
              className={`group flex items-center justify-between p-4 sm:p-5 rounded-2xl border-2 text-left font-extrabold text-sm sm:text-base transition-all duration-150 cursor-pointer ${getOptionClasses(
                index
              )}`}
            >
              <div className="flex items-center gap-3.5 flex-1 pr-2">
                {/* Letter Box (A, B, C, D) */}
                <div
                  className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl text-xs sm:text-sm font-black transition-all ${getLetterBadgeClasses(
                    index
                  )}`}
                >
                  {isRevealed && isCorrect ? (
                    <Check className="w-5 h-5 stroke-[3.5]" />
                  ) : isRevealed && isSelected && !isCorrect ? (
                    <X className="w-5 h-5 stroke-[3.5]" />
                  ) : question.type === 'true_false' ? (
                    index === 0 ? 'D' : 'Y'
                  ) : (
                    letters[index]
                  )}
                </div>

                {/* Option Text */}
                <span className="leading-snug">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
