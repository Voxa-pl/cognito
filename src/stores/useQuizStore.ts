"use client";

import { create } from 'zustand';
import { Question } from '@/types';
import { getXPForDifficulty } from '@/lib/gamification/xp';

export type GameMode = 'challenge' | 'practice';

interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];  // user's selected option index for each question
  isComplete: boolean;
  startTime: number | null;
  mode: GameMode;
  hearts: number;              // 5 hearts for challenge mode
  maxHearts: number;
  gameOver: boolean;
  
  // Actions  
  setGameMode: (mode: GameMode) => void;
  startQuiz: (questions: Question[], mode?: GameMode) => void;
  answerQuestion: (optionIndex: number) => { isCorrect: boolean; isGameOver: boolean };
  loseHeart: () => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  
  // Computed-like
  getCurrentQuestion: () => Question | null;
  getScore: () => { correct: number; total: number; xpEarned: number };
  getTimeSpent: () => number;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: [],
  currentIndex: 0,
  answers: [],
  isComplete: false,
  startTime: null,
  mode: 'challenge',
  hearts: 5,
  maxHearts: 5,
  gameOver: false,
  
  setGameMode: (mode: GameMode) => set({ mode }),

  startQuiz: (questions: Question[], mode: GameMode = 'challenge') => set({
    questions,
    currentIndex: 0,
    answers: new Array(questions.length).fill(null),
    isComplete: false,
    startTime: Date.now(),
    mode,
    hearts: 5,
    gameOver: false,
  }),
  
  loseHeart: () => set((state) => {
    const newHearts = Math.max(0, state.hearts - 1);
    return {
      hearts: newHearts,
      gameOver: state.mode === 'challenge' && newHearts === 0
    };
  }),

  answerQuestion: (optionIndex: number) => {
    const state = get();
    if (state.isComplete || state.gameOver) return { isCorrect: false, isGameOver: state.gameOver };
    
    const currentQ = state.questions[state.currentIndex];
    const isCorrect = currentQ && currentQ.correctAnswer === optionIndex;
    
    const newAnswers = [...state.answers];
    newAnswers[state.currentIndex] = optionIndex;
    
    let newHearts = state.hearts;
    let isGameOver = false;
    
    if (!isCorrect && state.mode === 'challenge') {
      newHearts = Math.max(0, state.hearts - 1);
      if (newHearts === 0) {
        isGameOver = true;
      }
    }
    
    set({
      answers: newAnswers,
      hearts: newHearts,
      gameOver: isGameOver,
      isComplete: isGameOver ? true : state.isComplete
    });

    return { isCorrect, isGameOver };
  },
  
  nextQuestion: () => set((state) => {
    if (state.currentIndex < state.questions.length - 1) {
      return { currentIndex: state.currentIndex + 1 };
    }
    return state;
  }),
  
  completeQuiz: () => set({ isComplete: true }),
  
  resetQuiz: () => set({
    questions: [],
    currentIndex: 0,
    answers: [],
    isComplete: false,
    startTime: null,
    hearts: 5,
    gameOver: false
  }),
  
  getCurrentQuestion: () => {
    const state = get();
    if (state.questions.length === 0 || state.currentIndex >= state.questions.length) return null;
    return state.questions[state.currentIndex];
  },
  
  getScore: () => {
    const state = get();
    let correct = 0;
    let xpEarned = 0;
    
    state.questions.forEach((q, idx) => {
      if (state.answers[idx] === q.correctAnswer) {
        correct++;
        xpEarned += q.xpValue || getXPForDifficulty(q.difficulty);
      }
    });
    
    return { correct, total: state.questions.length, xpEarned };
  },
  
  getTimeSpent: () => {
    const state = get();
    if (!state.startTime) return 0;
    return Math.floor((Date.now() - state.startTime) / 1000); // in seconds
  }
}));
