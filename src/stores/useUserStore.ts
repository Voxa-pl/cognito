"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  UserProfile,
  TopicProgress,
  QuizAttempt,
  StreakDay,
  DailyQuest,
  PlacementExamResult,
  ScenarioExamAttempt,
  AcademicClan,
  MistakeRecord,
  Question,
  AssessmentQuestion,
  DuelRoom,
  DuelQuestion,
} from '@/types';
import { calculateLevel } from '@/lib/gamification/xp';
import { calculateStreak } from '@/lib/gamification/streaks';
import { getTodayISO } from '@/lib/utils';
import { upsertProfileToSupabase, syncTopicProgressToSupabase, recordQuizAttemptToSupabase, syncMistakeRecordToSupabase } from '@/lib/supabase';
import { sounds } from '@/lib/sound';
import { initialClans } from '@/data/clans';
import { createSecureStorage } from '@/lib/security/clientIntegrity';
import { calculateNextReviewDate, processReviewOutcome } from '@/lib/gamification/spacedRepetition';
import { getTopicById } from '@/data/curriculum';
import {
  generateDuelRoomCode,
  compileDuelQuestions,
  calculateDuelAnswerScore,
  getSubjectDisplayName,
  normalizeDuelRoomCode,
} from '@/lib/gamification/duels';

export type GameMode = 'challenge' | 'practice';

const defaultUser: UserProfile = {
  id: 'student-main',
  username: 'Öğrenci',
  fullName: '',
  email: '',
  avatarUrl: 'user',
  totalXP: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: getTodayISO(),
  badges: [],
  gems: 0,
  hearts: 5,
  grade: 9,
  isRepeater: false,
  learningMode: 'standard',
  isOnboarded: false,
  isAuthenticated: false,
  placementTickets: 1,
  lastWeeklyClaimDate: getTodayISO(),
  clanId: null,
  clanRole: null,
  clanContributionXP: 0,
  masteredMistakesCount: 0,
  settings: {
    theme: 'dark',
    soundEnabled: true,
    dailyGoalMinutes: 30
  }
};

const defaultQuests: DailyQuest[] = [
  {
    id: 'quest-1',
    type: 'quiz',
    description: '10 Quiz Sorusu Çöz',
    targetValue: 10,
    currentValue: 0,
    xpReward: 15,
    completed: false
  },
  {
    id: 'quest-2',
    type: 'topic',
    description: '1 Yeni Konuyu Tamamla',
    targetValue: 1,
    currentValue: 0,
    xpReward: 20,
    completed: false
  },
  {
    id: 'quest-3',
    type: 'pomodoro',
    description: '25 Dakika Odaklanarak Çalış',
    targetValue: 25,
    currentValue: 0,
    xpReward: 25,
    completed: false
  }
];

const initialTopicProgress: Record<string, TopicProgress> = {};

const initialQuizHistory: QuizAttempt[] = [];

const initialMistakeVault: MistakeRecord[] = [];

const initialDuelRooms: DuelRoom[] = [
  {
    id: 'duel-room-seed-1',
    code: 'COG-842',
    hostUserId: 'user-kemal-9',
    hostUserName: 'Kemal Yılmaz',
    hostAvatarUrl: 'user',
    subjectSlug: 'matematik',
    subjectName: 'Matematik',
    status: 'waiting',
    questions: compileDuelQuestions('matematik'),
    currentQuestionIndex: 0,
    hostScore: 0,
    guestScore: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'duel-room-seed-2',
    code: 'COG-319',
    hostUserId: 'user-zeynep-fen',
    hostUserName: 'Zeynep Kaya',
    hostAvatarUrl: 'user',
    subjectSlug: 'fizik',
    subjectName: 'Fizik',
    status: 'waiting',
    questions: compileDuelQuestions('fizik'),
    currentQuestionIndex: 0,
    hostScore: 0,
    guestScore: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'duel-room-seed-3',
    code: 'COG-587',
    hostUserId: 'user-can-tarih',
    hostUserName: 'Can Demir',
    hostAvatarUrl: 'user',
    subjectSlug: 'tarih',
    subjectName: 'Tarih',
    status: 'waiting',
    questions: compileDuelQuestions('tarih'),
    currentQuestionIndex: 0,
    hostScore: 0,
    guestScore: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
  }
];

interface UserState {
  user: UserProfile;
  selectedMode: GameMode;
  activeSubjectSlug: string;
  claimedChests: string[];
  topicProgress: Record<string, TopicProgress>;
  quizHistory: QuizAttempt[];
  streakDays: StreakDay[];
  dailyQuests: DailyQuest[];
  placementExamResults: PlacementExamResult[];
  scenarioAttempts: ScenarioExamAttempt[];
  clans: AcademicClan[];
  mistakeVault: MistakeRecord[];
  duelRooms: DuelRoom[];
  activeDuel: DuelRoom | null;
  
  // Actions
  setActiveSubject: (slug: string) => void;
  claimChest: (chestId: string, gemAmount: number, xpAmount: number) => void;
  addGems: (amount: number) => void;
  setGameMode: (mode: GameMode) => void;
  setUsername: (username: string) => void;
  initUser: (username: string) => void;
  addXP: (amount: number) => void;
  updateTopicProgress: (topicId: string, result: boolean | { correctCount: number; totalCount: number }) => void;
  addQuizAttempt: (attempt: Omit<QuizAttempt, 'id'>) => void;
  recordStudyActivity: (minutesStudied: number, xpEarned: number, questionsAnswered: number) => void;
  generateDailyQuests: () => void;
  updateDailyQuestProgress: (questId: string, value: number) => void;
  addBadge: (badgeSlug: string) => void;
  resetUser: () => void;
  loginWithGoogle: (account: { id?: string; email: string; fullName: string; avatarUrl?: string; isOnboarded?: boolean }) => void;
  completeOnboarding: (data: { grade: 9 | 10 | 11 | 12; isRepeater: boolean; fullName: string }) => void;
  setGrade: (grade: 9 | 10 | 11 | 12) => void;
  setRepeater: (isRepeater: boolean) => void;
  setLearningMode: (mode: 'standard' | 'phoenix') => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setSoundEnabled: (enabled: boolean) => void;
  setDailyGoalMinutes: (minutes: number) => void;
  updateFullName: (fullName: string) => void;
  logout: () => void;

  // Placement Exam Actions
  claimWeeklyTicket: () => { success: boolean; message: string };
  buyPlacementTicket: (currency: 'xp' | 'gems') => { success: boolean; message: string };
  usePlacementTicket: () => boolean;
  recordPlacementResult: (result: PlacementExamResult) => void;

  // Academic Scenario Actions
  recordScenarioAttempt: (attempt: ScenarioExamAttempt) => void;

  // Clan Actions
  joinClan: (clanId: string) => { success: boolean; message: string };
  leaveClan: () => void;
  createClan: (clanData: { name: string; tag: string; motto: string; description: string; category: AcademicClan['category']; badgeIcon: string }) => { success: boolean; message: string; clan?: AcademicClan };
  contributeClanXP: (amount: number) => void;
  addClanAnnouncement: (clanId: string, content: string) => void;
  claimClanQuestReward: (questId: string) => void;

  // Spaced Repetition (Hata Defteri) Actions
  recordMistake: (
    record: Omit<MistakeRecord, 'id' | 'createdAt' | 'stage' | 'consecutiveCorrect' | 'isMastered' | 'nextReviewDate'> & {
      nextReviewDate?: string;
    }
  ) => void;
  recordMistakesFromQuiz: (
    topicId: string,
    questions: Question[],
    userAnswers: ('correct' | 'wrong' | null)[],
    selectedOptions?: (number | null)[]
  ) => void;
  recordMistakesFromScenario: (
    scenarioId: string,
    questions: AssessmentQuestion[],
    answers: Record<string, { selectedOption?: number | null; textAnswer?: string; awardedScore: number }>
  ) => void;
  recordMistakesFromPlacement: (
    examId: string,
    questions: AssessmentQuestion[],
    answers: Record<string, { selectedOption?: number | null; textAnswer?: string; awardedScore: number }>
  ) => void;
  submitReviewSession: (results: { mistakeId: string; isCorrect: boolean }[]) => {
    allCorrect: boolean;
    reloadedShield: boolean;
    xpAwarded: number;
    masteredCount: number;
  };

  // Duel Actions
  createDuelRoom: (params: { subjectSlug: string; subjectName?: string }) => DuelRoom;
  joinDuelRoom: (roomCodeOrId: string) => { success: boolean; message: string; room?: DuelRoom };
  setActiveDuel: (room: DuelRoom) => void;
  submitDuelAnswer: (questionIndex: number, answerIndex: number | null, remainingSeconds: number) => { isCorrect: boolean; points: number; hostScore: number; guestScore: number; isDuelFinished: boolean };
  advanceDuelQuestion: () => void;
  finishDuel: (roomId?: string) => { winner: string; hostScore: number; guestScore: number; xpEarned: number; clanPointsEarned: number; mistakesRecorded: number };
  recordMistakesFromDuel: (duel: DuelRoom, userAnswers: (number | null)[]) => number;

  // Anti-Cheat & Sync Actions
  syncProgress: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      selectedMode: 'challenge',
      activeSubjectSlug: 'matematik',
      claimedChests: [],
      topicProgress: initialTopicProgress,
      quizHistory: initialQuizHistory,
      streakDays: [],
      dailyQuests: defaultQuests,
      placementExamResults: [],
      scenarioAttempts: [],
      clans: initialClans,
      mistakeVault: initialMistakeVault,
      duelRooms: initialDuelRooms,
      activeDuel: null,
      
      setActiveSubject: (slug: string) => set({ activeSubjectSlug: slug }),

      addGems: (amount: number) => set((state) => {
        const safeAmount = Math.max(0, Math.min(50, Math.floor(amount || 0)));
        if (safeAmount <= 0) return state;
        return {
          user: {
            ...state.user,
            gems: (state.user.gems || 0) + safeAmount
          }
        };
      }),

      claimChest: (chestId: string, gemAmount: number, xpAmount: number) => set((state) => {
        if (state.claimedChests.includes(chestId)) return state;
        const safeXp = Math.min(100, Math.max(0, xpAmount));
        const safeGems = Math.min(50, Math.max(0, gemAmount));
        const newTotalXP = state.user.totalXP + safeXp;
        const newLevel = Math.max(1, calculateLevel(newTotalXP));
        return {
          claimedChests: [...state.claimedChests, chestId],
          user: {
            ...state.user,
            totalXP: newTotalXP,
            level: newLevel,
            gems: (state.user.gems || 0) + safeGems
          }
        };
      }),
      
      setGameMode: (mode: GameMode) => set({ selectedMode: mode }),

      setUsername: (username: string) => set((state) => ({
        user: { ...state.user, username }
      })),
      
      initUser: (username: string) => set({
        user: {
          ...defaultUser,
          id: Math.random().toString(36).substring(2, 9),
          username: username.trim() || 'Öğrenci',
          lastActiveDate: getTodayISO()
        },
        topicProgress: initialTopicProgress,
        quizHistory: initialQuizHistory,
        streakDays: [
          { date: getTodayISO(), minutesStudied: 20, xpEarned: 100, questionsAnswered: 10 }
        ],
        dailyQuests: defaultQuests
      }),
      
      addXP: (amount: number) => set((state) => {
        // Enforce anti-cheat limit: single XP increment cannot exceed 350 XP
        const safeAmount = Math.max(0, Math.min(350, Math.floor(amount || 0)));
        if (safeAmount <= 0) return state;

        const newTotalXP = state.user.totalXP + safeAmount;
        const newLevel = Math.max(1, calculateLevel(newTotalXP));

        let updatedClans = state.clans;
        let userClanContrib = state.user.clanContributionXP || 0;

        if (state.user.clanId) {
          const contribAmount = Math.max(1, Math.round(safeAmount * 0.25));
          userClanContrib += contribAmount;

          updatedClans = state.clans.map((c) => {
            if (c.id === state.user.clanId) {
              const newClanWeekly = c.weeklyXP + contribAmount;
              const newClanTotal = c.totalXP + contribAmount;
              const newClanLevel = Math.max(c.level, Math.floor(newClanTotal / 5000) + 1);

              const updatedQuests = c.weeklyQuests.map((q) => {
                if (q.type === 'total_xp' && !q.completed) {
                  const newCurrent = Math.min(q.targetValue, q.currentValue + contribAmount);
                  return { ...q, currentValue: newCurrent, completed: newCurrent >= q.targetValue };
                }
                return q;
              });

              const userName = state.user.fullName || state.user.username || 'Öğrenci';
              let memberFound = false;
              const updatedMembers = c.members.map((m) => {
                if (m.name === userName || m.id === state.user.id) {
                  memberFound = true;
                  return { ...m, weeklyXPContribution: m.weeklyXPContribution + contribAmount };
                }
                return m;
              });

              if (!memberFound) {
                updatedMembers.push({
                  id: state.user.id,
                  name: userName,
                  avatarUrl: state.user.avatarUrl || 'user',
                  role: state.user.clanRole || 'member',
                  weeklyXPContribution: contribAmount,
                  joinedAt: getTodayISO(),
                  grade: state.user.grade || 9,
                });
              }

              return {
                ...c,
                weeklyXP: newClanWeekly,
                totalXP: newClanTotal,
                level: newClanLevel,
                weeklyQuests: updatedQuests,
                members: updatedMembers,
              };
            }
            return c;
          });
        }

        return {
          user: {
            ...state.user,
            totalXP: newTotalXP,
            level: newLevel,
            clanContributionXP: userClanContrib,
          },
          clans: updatedClans,
        };
      }),
      
      updateTopicProgress: (
        topicId: string,
        result: boolean | { correctCount: number; totalCount: number }
      ) => set((state) => {
        const current = state.topicProgress[topicId] || {
          topicId,
          masteryLevel: 0,
          correctCount: 0,
          totalAttempts: 0,
          lastStudied: new Date().toISOString()
        };
        
        const addedCorrect = typeof result === 'boolean' ? (result ? 1 : 0) : result.correctCount;
        const addedTotal = typeof result === 'boolean' ? 1 : result.totalCount;

        const newCorrectCount = current.correctCount + addedCorrect;
        const newTotalAttempts = current.totalAttempts + addedTotal;
        const newMasteryLevel = Math.min(100, Math.round((newCorrectCount / Math.max(1, newTotalAttempts)) * 100));
        
        // Background sync if user is active
        if (state.user.id && state.user.isAuthenticated) {
          syncTopicProgressToSupabase({
            userId: state.user.id,
            topicId,
            masteryScore: newMasteryLevel,
            completed: newMasteryLevel >= 70,
          }).catch(() => {});
        }

        return {
          topicProgress: {
            ...state.topicProgress,
            [topicId]: {
              ...current,
              topicId,
              masteryLevel: newMasteryLevel,
              correctCount: newCorrectCount,
              totalAttempts: newTotalAttempts,
              lastStudied: new Date().toISOString()
            }
          }
        };
      }),
      
      addQuizAttempt: (attempt: Omit<QuizAttempt, 'id'>) => set((state) => {
        if (state.user.id && state.user.isAuthenticated) {
          recordQuizAttemptToSupabase({
            userId: state.user.id,
            topicId: attempt.topicId,
            score: attempt.score,
            totalQuestions: attempt.totalQuestions,
            xpEarned: attempt.xpEarned,
            timeSpentSec: attempt.timeSpentSec,
          }).catch(() => {});
        }
        return {
          quizHistory: [
            { ...attempt, id: Math.random().toString(36).substring(2, 9) },
            ...state.quizHistory
          ]
        };
      }),
      
      recordStudyActivity: (minutesStudied: number, xpEarned: number, questionsAnswered: number) => set((state) => {
        const today = getTodayISO();
        const existingDayIndex = state.streakDays.findIndex(d => d.date === today);
        let newStreakDays = [...state.streakDays];
        
        if (existingDayIndex >= 0) {
          newStreakDays[existingDayIndex] = {
            ...newStreakDays[existingDayIndex],
            minutesStudied: newStreakDays[existingDayIndex].minutesStudied + minutesStudied,
            xpEarned: newStreakDays[existingDayIndex].xpEarned + xpEarned,
            questionsAnswered: newStreakDays[existingDayIndex].questionsAnswered + questionsAnswered
          };
        } else {
          newStreakDays.push({
            date: today,
            minutesStudied,
            xpEarned,
            questionsAnswered
          });
        }
        
        const currentStreak = calculateStreak(newStreakDays);
        let newLongestStreak = state.user.longestStreak || 0;
        if (currentStreak > newLongestStreak) {
          newLongestStreak = currentStreak;
        }

        // Also update clan question quests if user is in a clan
        let updatedClans = state.clans;
        if (state.user.clanId && questionsAnswered > 0) {
          updatedClans = state.clans.map((c) => {
            if (c.id === state.user.clanId) {
              const updatedQuests = c.weeklyQuests.map((q) => {
                if (q.type === 'questions' && !q.completed) {
                  const newCurrent = Math.min(q.targetValue, q.currentValue + questionsAnswered);
                  return { ...q, currentValue: newCurrent, completed: newCurrent >= q.targetValue };
                }
                return q;
              });
              return { ...c, weeklyQuests: updatedQuests };
            }
            return c;
          });
        }

        return {
          streakDays: newStreakDays,
          clans: updatedClans,
          user: {
            ...state.user,
            currentStreak,
            longestStreak: newLongestStreak,
            lastActiveDate: today
          }
        };
      }),
      
      generateDailyQuests: () => set(() => ({
        dailyQuests: defaultQuests
      })),
      
      updateDailyQuestProgress: (questId: string, value: number) => set((state) => {
        const newQuests = state.dailyQuests.map(q => {
          if (q.id === questId && !q.completed) {
            const newValue = Math.min(q.targetValue, q.currentValue + value);
            return {
              ...q,
              currentValue: newValue,
              completed: newValue >= q.targetValue
            };
          }
          return q;
        });
        return { dailyQuests: newQuests };
      }),
      
      addBadge: (badgeSlug: string) => set((state) => {
        if (state.user.badges.includes(badgeSlug)) return state;
        return {
          user: {
            ...state.user,
            badges: [...state.user.badges, badgeSlug]
          }
        };
      }),
      
      resetUser: () => {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        }
        sounds.setEnabled(true);
        set({
          user: {
            ...defaultUser,
            settings: {
              theme: 'dark',
              soundEnabled: true,
              dailyGoalMinutes: 30,
            },
          },
          activeSubjectSlug: 'matematik',
          claimedChests: [],
          topicProgress: initialTopicProgress,
          quizHistory: initialQuizHistory,
          streakDays: [],
          dailyQuests: defaultQuests,
          placementExamResults: [],
          scenarioAttempts: [],
          clans: initialClans,
          mistakeVault: initialMistakeVault,
        });
      },

      loginWithGoogle: (account) => {
        const current = get().user;
        const isSameUser = Boolean(current.email && current.email === account.email);
        const isAlreadyOnboarded = account.isOnboarded !== undefined
          ? account.isOnboarded
          : Boolean(isSameUser && current.isOnboarded);

        const baseUser = isSameUser ? current : defaultUser;

        const updatedUser: UserProfile = {
          ...baseUser,
          id: account.id || (isSameUser && current.id ? current.id : `google-${Date.now()}`),
          email: account.email,
          fullName: account.fullName,
          username: account.fullName || 'Öğrenci',
          avatarUrl: account.avatarUrl || 'user',
          isAuthenticated: true,
          isOnboarded: isAlreadyOnboarded,
          lastActiveDate: getTodayISO(),
        };

        set({ user: updatedUser });

        upsertProfileToSupabase({
          id: updatedUser.id,
          email: updatedUser.email || account.email || `${updatedUser.id}@guest.cognito`,
          full_name: updatedUser.fullName,
          avatar_url: updatedUser.avatarUrl,
          grade: updatedUser.grade,
          is_repeater: updatedUser.isRepeater,
          learning_mode: updatedUser.learningMode,
          learning_track: updatedUser.learningMode,
          total_xp: updatedUser.totalXP,
          xp: updatedUser.totalXP,
          level: updatedUser.level,
          streak: updatedUser.currentStreak,
          hearts: updatedUser.hearts || 5,
          gems: updatedUser.gems || 100,
        }).catch(() => {});
      },

      completeOnboarding: (data) => {
        const mode: 'standard' | 'phoenix' = data.isRepeater ? 'phoenix' : 'standard';
        set((state) => {
          const badges = [...(state.user.badges || [])];
          if (data.isRepeater && !badges.includes('zumruduanka')) {
            badges.push('zumruduanka');
          }

          let quests = [...state.dailyQuests];
          if (data.isRepeater && !quests.some((q) => q.id === 'phoenix-quest-1')) {
            quests.unshift({
              id: 'phoenix-quest-1',
              type: 'quiz',
              description: 'Phoenix Telafi: Temelleri Sağlamlaştır (5 Soru Pekiştir)',
              targetValue: 5,
              currentValue: 0,
              xpReward: 100,
              completed: false,
            });
          }

          const updatedUser: UserProfile = {
            ...state.user,
            fullName: data.fullName.trim() || state.user.fullName || 'Öğrenci',
            username: data.fullName.trim() || state.user.username || 'Öğrenci',
            grade: data.grade,
            isRepeater: data.isRepeater,
            learningMode: mode,
            learningTrack: mode,
            isOnboarded: true,
            isAuthenticated: true,
            badges,
          };

          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(`cognito_onboarded_${updatedUser.id}`, 'true');
            } catch {
              // Ignore storage error
            }
          }

          upsertProfileToSupabase({
            id: updatedUser.id,
            email: updatedUser.email || `${updatedUser.id}@guest.cognito`,
            full_name: updatedUser.fullName,
            avatar_url: updatedUser.avatarUrl,
            grade: updatedUser.grade,
            is_repeater: updatedUser.isRepeater,
            learning_mode: updatedUser.learningMode,
            learning_track: updatedUser.learningMode,
            total_xp: updatedUser.totalXP,
            xp: updatedUser.totalXP,
            level: updatedUser.level,
            streak: updatedUser.currentStreak,
            hearts: updatedUser.hearts || 5,
            gems: updatedUser.gems || 100,
          }).catch(() => {});

          return {
            user: updatedUser,
            dailyQuests: quests,
          };
        });
      },

      setGrade: (grade) => set((state) => ({
        user: { ...state.user, grade }
      })),

      setRepeater: (isRepeater) => set((state) => {
        const learningMode = isRepeater ? 'phoenix' : 'standard';
        const badges = [...(state.user.badges || [])];
        if (isRepeater && !badges.includes('zumruduanka')) {
          badges.push('zumruduanka');
        }
        return {
          user: {
            ...state.user,
            isRepeater,
            learningMode,
            badges,
          }
        };
      }),

      setLearningMode: (learningMode) => set((state) => {
        const isRepeater = learningMode === 'phoenix';
        const badges = [...(state.user.badges || [])];
        if (isRepeater && !badges.includes('zumruduanka')) {
          badges.push('zumruduanka');
        }
        return {
          user: {
            ...state.user,
            learningMode,
            learningTrack: learningMode,
            isRepeater,
            badges,
          },
        };
      }),

      setTheme: (theme) => set((state) => {
        if (typeof document !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
          } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
          }
        }
        return {
          user: {
            ...state.user,
            settings: {
              ...state.user.settings,
              theme,
            },
          },
        };
      }),

      setSoundEnabled: (soundEnabled) => set((state) => {
        sounds.setEnabled(soundEnabled);
        return {
          user: {
            ...state.user,
            settings: {
              ...state.user.settings,
              soundEnabled,
            },
          },
        };
      }),

      setDailyGoalMinutes: (dailyGoalMinutes) => set((state) => ({
        user: {
          ...state.user,
          settings: {
            ...state.user.settings,
            dailyGoalMinutes,
          },
        },
      })),

      updateFullName: (fullName) => set((state) => {
        const cleanName = fullName.trim();
        return {
          user: {
            ...state.user,
            fullName: cleanName || state.user.fullName || 'Öğrenci',
            username: cleanName || state.user.username || 'Öğrenci',
          },
        };
      }),

      // Placement Exam Actions
      claimWeeklyTicket: () => {
        const user = get().user;
        const now = Date.now();
        const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
        if (user.lastWeeklyClaimDate) {
          const lastClaim = new Date(user.lastWeeklyClaimDate).getTime();
          if (now - lastClaim < ONE_WEEK_MS) {
            const diffMs = ONE_WEEK_MS - (now - lastClaim);
            const daysLeft = Math.ceil(diffMs / (24 * 60 * 60 * 1000));
            return {
              success: false,
              message: `Haftalık ücretsiz hakkınız henüz yenilenmedi (${daysLeft} gün kaldı). Dilerseniz Akademik XP veya Kredi ile hemen yeni hak alabilirsiniz.`
            };
          }
        }

        sounds.playChest();
        set((state) => ({
          user: {
            ...state.user,
            placementTickets: (state.user.placementTickets || 0) + 1,
            lastWeeklyClaimDate: new Date().toISOString()
          }
        }));
        return {
          success: true,
          message: 'Haftalık 1 adet ücretsiz seviye belirleme sınav hakkı başarıyla hesabınıza tanımlandı!'
        };
      },

      buyPlacementTicket: (currency: 'xp' | 'gems') => {
        const user = get().user;
        if (currency === 'xp') {
          if (user.totalXP < 150) {
            return { success: false, message: 'Yetersiz Akademik XP! 1 Bilet için en az 150 XP gereklidir.' };
          }
          sounds.playChest();
          const newTotalXP = user.totalXP - 150;
          const newLevel = Math.max(1, calculateLevel(newTotalXP));
          set((state) => ({
            user: {
              ...state.user,
              totalXP: newTotalXP,
              level: newLevel,
              placementTickets: (state.user.placementTickets || 0) + 1
            }
          }));
          return { success: true, message: '150 XP karşılığında 1 Seviye Belirleme Sınavı bileti satın alındı!' };
        } else {
          const currentGems = user.gems || 0;
          if (currentGems < 50) {
            return { success: false, message: 'Yetersiz Başarı Kredisi! 1 Bilet için en az 50 Kredi gereklidir.' };
          }
          sounds.playChest();
          set((state) => ({
            user: {
              ...state.user,
              gems: currentGems - 50,
              placementTickets: (state.user.placementTickets || 0) + 1
            }
          }));
          return { success: true, message: '50 Başarı Kredisi karşılığında 1 Seviye Belirleme Sınavı bileti satın alındı!' };
        }
      },

      usePlacementTicket: () => {
        const tickets = get().user.placementTickets || 0;
        if (tickets > 0) {
          set((state) => ({
            user: {
              ...state.user,
              placementTickets: Math.max(0, (state.user.placementTickets || 1) - 1)
            }
          }));
          return true;
        }
        return false;
      },

      recordPlacementResult: (result: PlacementExamResult) => {
        sounds.playChest();
        set((state) => {
          const newTotalXP = state.user.totalXP + 100;
          const newLevel = Math.max(1, calculateLevel(newTotalXP));
          return {
            placementExamResults: [result, ...state.placementExamResults],
            user: {
              ...state.user,
              totalXP: newTotalXP,
              level: newLevel
            }
          };
        });
      },

      recordScenarioAttempt: (attempt: ScenarioExamAttempt) => {
        sounds.playChest();
        set((state) => {
          const xpEarned = Math.max(25, Math.round(attempt.score * 1.5));
          const newTotalXP = state.user.totalXP + xpEarned;
          const newLevel = Math.max(1, calculateLevel(newTotalXP));

          let updatedClans = state.clans;
          if (state.user.clanId) {
            updatedClans = state.clans.map((c) => {
              if (c.id === state.user.clanId) {
                const updatedQuests = c.weeklyQuests.map((q) => {
                  if (q.type === 'scenarios' && !q.completed) {
                    const newCurrent = Math.min(q.targetValue, q.currentValue + 1);
                    return { ...q, currentValue: newCurrent, completed: newCurrent >= q.targetValue };
                  }
                  return q;
                });
                return { ...c, weeklyQuests: updatedQuests };
              }
              return c;
            });
          }

          return {
            scenarioAttempts: [attempt, ...state.scenarioAttempts],
            clans: updatedClans,
            user: {
              ...state.user,
              totalXP: newTotalXP,
              level: newLevel
            }
          };
        });
      },

      // Clan Actions
      joinClan: (clanId: string) => {
        if (get().user.clanId === clanId) {
          return { success: false, message: 'Zaten bu klanın üyesisiniz.' };
        }

        const clan = get().clans.find((c) => c.id === clanId);
        if (!clan) return { success: false, message: 'Klan bulunamadı.' };

        // Strictly enforce 10-member capacity
        const maxLimit = clan.maxMembers || 10;
        if (clan.memberCount >= maxLimit) {
          return {
            success: false,
            message: `Bu klanın kontenjanı doludur (${clan.memberCount}/${maxLimit}). Klanlar maksimum 10 üye ile sınırlandırılmıştır.`
          };
        }

        const userLevel = get().user.level || 1;
        if (userLevel < clan.minLevelRequired) {
          return {
            success: false,
            message: `Bu klana katılmak için en az Seviye ${clan.minLevelRequired} olmalısınız (Mevcut Seviyeniz: ${userLevel}).`
          };
        }

        sounds.playCorrect();
        set((state) => {
          const userName = state.user.fullName || state.user.username || 'Öğrenci';
          const updatedClans = state.clans.map((c) => {
            if (c.id === state.user.clanId && c.id !== clanId) {
              const remaining = c.members.filter((m) => m.name !== userName && m.id !== state.user.id);
              return {
                ...c,
                memberCount: Math.max(0, remaining.length),
                members: remaining
              };
            }
            if (c.id === clanId) {
              const alreadyMember = c.members.some((m) => m.name === userName || m.id === state.user.id);
              const members = alreadyMember
                ? c.members
                : [
                    ...c.members,
                    {
                      id: state.user.id,
                      name: userName,
                      avatarUrl: state.user.avatarUrl || 'user',
                      role: 'member' as const,
                      weeklyXPContribution: 0,
                      joinedAt: getTodayISO(),
                      grade: state.user.grade || 9
                    }
                  ];
              return {
                ...c,
                memberCount: alreadyMember ? c.memberCount : Math.min(10, c.memberCount + 1),
                maxMembers: 10,
                members
              };
            }
            return c;
          });

          return {
            clans: updatedClans,
            user: {
              ...state.user,
              clanId,
              clanRole: 'member',
              clanContributionXP: 0
            }
          };
        });

        return { success: true, message: `${clan.name} klanına başarıyla katıldınız!` };
      },

      leaveClan: () => {
        sounds.playClick();
        set((state) => {
          const userName = state.user.fullName || state.user.username || 'Öğrenci';
          const currentClanId = state.user.clanId;
          const updatedClans = state.clans
            .map((c) => {
              if (c.id === currentClanId) {
                const remainingMembers = c.members.filter((m) => m.name !== userName && m.id !== state.user.id);
                return {
                  ...c,
                  memberCount: Math.max(0, remainingMembers.length),
                  members: remainingMembers
                };
              }
              return c;
            })
            .filter((c) => c.members.length > 0 || c.id.startsWith('clan-fen') || c.id.startsWith('clan-anadolu') || c.id.startsWith('clan-maarif') || c.id.startsWith('clan-phoenix'));

          return {
            clans: updatedClans,
            user: {
              ...state.user,
              clanId: null,
              clanRole: null,
              clanContributionXP: 0
            }
          };
        });
      },

      createClan: (clanData) => {
        const state = get();
        const cleanName = clanData.name.trim();
        const cleanTag = clanData.tag.trim();

        if (cleanName.length < 3) {
          return { success: false, message: 'Klan adı en az 3 karakter olmalıdır.' };
        }
        if (cleanName.length > 40) {
          return { success: false, message: 'Klan adı en fazla 40 karakter olabilir.' };
        }

        const nameExists = state.clans.some(
          (c) => c.name.toLowerCase() === cleanName.toLowerCase()
        );
        if (nameExists) {
          return { success: false, message: 'Bu isimde bir klan zaten mevcut. Lütfen benzersiz bir klan adı seçin.' };
        }

        const cleanTagStripped = cleanTag.replace(/[\[\]\s]/g, '').toUpperCase();
        if (cleanTagStripped.length < 2) {
          return { success: false, message: 'Klan etiketi (tag) en az 2 karakter olmalıdır.' };
        }
        if (cleanTagStripped.length > 8) {
          return { success: false, message: 'Klan etiketi (tag) en fazla 8 karakter olabilir.' };
        }
        if (!/^[A-Z0-9ÇĞİÖŞÜ\-]+$/.test(cleanTagStripped)) {
          return { success: false, message: 'Klan etiketi sadece harf, rakam ve tire içerebilir.' };
        }

        const formattedTag = `[${cleanTagStripped}]`;

        const tagExists = state.clans.some(
          (c) => c.tag.toUpperCase() === formattedTag
        );
        if (tagExists) {
          return { success: false, message: 'Bu klan etiketi (tag) zaten kullanımda. Farklı bir etiket belirleyin.' };
        }

        sounds.playChest();
        const userName = state.user.fullName || state.user.username || 'Öğrenci';
        const newClanId = `clan-${Date.now()}`;
        const newClan: AcademicClan = {
          id: newClanId,
          name: cleanName,
          tag: formattedTag,
          motto: clanData.motto.trim() || 'Birlikte Zirveye!',
          description: clanData.description.trim() || 'Akademik dayanışma ve ortak sınav hazırlık takımı.',
          badgeIcon: clanData.badgeIcon || 'Shield',
          badgeColor: '#1cb0f6',
          level: 1,
          weeklyXP: 0,
          totalXP: 0,
          memberCount: 1,
          maxMembers: 10, // STRICTLY 10 MEMBERS
          minLevelRequired: 1,
          category: clanData.category,
          leaderName: userName,
          members: [
            {
              id: state.user.id,
              name: userName,
              avatarUrl: state.user.avatarUrl || 'user',
              role: 'leader',
              weeklyXPContribution: 0,
              joinedAt: getTodayISO(),
              grade: state.user.grade || 9
            }
          ],
          weeklyQuests: [
            {
              id: `cq-${newClanId}-1`,
              title: 'Haftalık 400 Soru Seferi',
              description: 'Klan üyeleri birlikte toplam 400 soru çözsün.',
              targetValue: 400,
              currentValue: 0,
              rewardXP: 300,
              completed: false,
              claimed: false,
              type: 'questions'
            },
            {
              id: `cq-${newClanId}-2`,
              title: 'Akademik Havuz 3000 XP',
              description: 'Klan havuzuna toplam 3000 XP kazandırın.',
              targetValue: 3000,
              currentValue: 0,
              rewardXP: 350,
              completed: false,
              claimed: false,
              type: 'total_xp'
            }
          ],
          announcements: [
            {
              id: `ann-${newClanId}-1`,
              authorName: userName,
              authorRole: 'Klan Kurucusu',
              content: `Hoş geldiniz! ${cleanName} klanı kuruldu. Kontenjanımız 10 kişi ile sınırlıdır. Akademik hedeflerimizi birlikte tamamlayalım!`,
              createdAt: new Date().toISOString()
            }
          ]
        };

        const oldClanId = state.user.clanId;
        const cleanedClans = oldClanId
          ? state.clans.map((c) => {
              if (c.id === oldClanId) {
                const remaining = c.members.filter((m) => m.name !== userName && m.id !== state.user.id);
                return {
                  ...c,
                  memberCount: Math.max(0, remaining.length),
                  members: remaining
                };
              }
              return c;
            })
          : state.clans;

        set(() => ({
          clans: [newClan, ...cleanedClans],
          user: {
            ...state.user,
            clanId: newClan.id,
            clanRole: 'leader',
            clanContributionXP: 0
          }
        }));

        return { success: true, message: `${cleanName} klanı 10 kişilik kontenjan ile başarıyla kuruldu!`, clan: newClan };
      },

      contributeClanXP: (amount: number) => {
        set((state) => {
          if (!state.user.clanId) return state;
          const updatedClans = state.clans.map((c) => {
            if (c.id === state.user.clanId) {
              return {
                ...c,
                weeklyXP: c.weeklyXP + amount,
                totalXP: c.totalXP + amount
              };
            }
            return c;
          });
          return {
            clans: updatedClans,
            user: {
              ...state.user,
              clanContributionXP: (state.user.clanContributionXP || 0) + amount
            }
          };
        });
      },

      addClanAnnouncement: (clanId: string, content: string) => {
        sounds.playClick();
        set((state) => {
          const userName = state.user.fullName || state.user.username || 'Öğrenci';
          const updatedClans = state.clans.map((c) => {
            if (c.id === clanId) {
              return {
                ...c,
                announcements: [
                  {
                    id: `ann-${Date.now()}`,
                    authorName: userName,
                    authorRole: state.user.clanRole === 'leader' ? 'Klan Lideri' : 'Üye',
                    content: content.trim(),
                    createdAt: new Date().toISOString()
                  },
                  ...c.announcements
                ]
              };
            }
            return c;
          });
          return { clans: updatedClans };
        });
      },

      claimClanQuestReward: (questId: string) => {
        sounds.playChest();
        set((state) => {
          let rewardToAward = 0;
          const updatedClans = state.clans.map((c) => {
            if (c.id === state.user.clanId) {
              const updatedQuests = c.weeklyQuests.map((q) => {
                if (q.id === questId && q.completed && !q.claimed) {
                  rewardToAward = q.rewardXP;
                  return { ...q, claimed: true };
                }
                return q;
              });
              return { ...c, weeklyQuests: updatedQuests };
            }
            return c;
          });

          if (rewardToAward > 0) {
            const newTotalXP = state.user.totalXP + rewardToAward;
            const newLevel = Math.max(1, calculateLevel(newTotalXP));
            return {
              clans: updatedClans,
              user: {
                ...state.user,
                totalXP: newTotalXP,
                level: newLevel
              }
            };
          }
          return { clans: updatedClans };
        });
      },

      recordMistake: (record) => {
        set((state) => {
          const existingIndex = state.mistakeVault.findIndex(
            (m) => m.questionId === record.questionId
          );
          const nowIso = new Date().toISOString();
          const nextDate = calculateNextReviewDate(1);
          let updatedVault: MistakeRecord[];

          if (existingIndex >= 0) {
            updatedVault = [...state.mistakeVault];
            const existing = updatedVault[existingIndex];
            const updated: MistakeRecord = {
              ...existing,
              ...record,
              stage: 1,
              consecutiveCorrect: 0,
              isMastered: false,
              nextReviewDate: nextDate,
              lastReviewedAt: nowIso,
            };
            updatedVault[existingIndex] = updated;
            syncMistakeRecordToSupabase(updated);
          } else {
            const newRecord: MistakeRecord = {
              ...record,
              id: `mistake-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              stage: 1,
              consecutiveCorrect: 0,
              isMastered: false,
              nextReviewDate: nextDate,
              createdAt: nowIso,
            };
            updatedVault = [newRecord, ...state.mistakeVault];
            syncMistakeRecordToSupabase(newRecord);
          }

          const currentMastered = updatedVault.filter((m) => m.isMastered).length;
          return {
            mistakeVault: updatedVault,
            user: {
              ...state.user,
              masteredMistakesCount: currentMastered,
            },
          };
        });
      },

      recordMistakesFromQuiz: (topicId, questions, userAnswers, selectedOptions) => {
        const state = get();
        const userId = state.user.id || 'student-main';
        const topic = getTopicById(topicId);
        const subjectId = topic?.subjectId || topicId.split('-')[0] || 'genel';

        questions.forEach((q, idx) => {
          const ans = userAnswers?.[idx];
          const isWrongOrEmpty =
            !ans ||
            ans === 'wrong' ||
            (ans as unknown) === false ||
            (typeof ans === 'number' && ans !== q.correctAnswer);

          if (isWrongOrEmpty) {
            const chosenOpt =
              selectedOptions?.[idx] !== undefined && selectedOptions?.[idx] !== null
                ? selectedOptions[idx]
                : typeof ans === 'number'
                ? ans
                : 'Boş';

            get().recordMistake({
              userId,
              questionId: q.id,
              topicId: q.topicId || topicId,
              subjectId,
              questionText: q.questionText,
              options: q.options || [],
              correctAnswer: q.correctAnswer,
              userAnswer: chosenOpt,
              explanation: q.explanation || 'Bu kazanımda dikkat edilmesi gereken temel kural.',
              learningOutcomeCode: `${subjectId.slice(0, 3).toUpperCase()}.9.${(idx % 4) + 1}`,
              nextReviewDate: calculateNextReviewDate(1),
              source: 'quiz',
            });
          }
        });
      },

      recordMistakesFromScenario: (scenarioId, questions, answers) => {
        const state = get();
        const userId = state.user.id || 'student-main';

        questions.forEach((q) => {
          let userAns: any = undefined;
          if (Array.isArray(answers)) {
            userAns = (answers as any[]).find((a) => a?.questionId === q.id || a?.id === q.id);
          } else if (answers && typeof answers === 'object') {
            userAns = (answers as any)[q.id];
          }

          const isWrong = !userAns || userAns.awardedScore < q.points;
          if (isWrong) {
            const chosen = userAns?.selectedOption !== undefined && userAns?.selectedOption !== null
              ? userAns.selectedOption
              : (userAns?.textAnswer || 'Boş');
            get().recordMistake({
              userId,
              questionId: q.id,
              topicId: q.topicId,
              subjectId: q.subjectSlug || 'genel',
              questionText: q.questionText,
              options: q.options || [],
              correctAnswer: q.correctAnswer !== undefined ? q.correctAnswer : (q.sampleAnswer || 'Açık uçlu cevap'),
              userAnswer: chosen,
              explanation: q.rubric?.explanation || 'Akademik senaryo değerlendirme kriterlerine göre geliştirilmesi gereken nokta.',
              learningOutcomeCode: `${(q.subjectSlug || 'AKD').slice(0, 3).toUpperCase()}.9.SENARYO`,
              nextReviewDate: calculateNextReviewDate(1),
              source: 'scenario',
            });
          }
        });
      },

      recordMistakesFromPlacement: (examId, questions, answers) => {
        const state = get();
        const userId = state.user.id || 'student-main';

        questions.forEach((q) => {
          let userAns: any = undefined;
          if (Array.isArray(answers)) {
            userAns = (answers as any[]).find((a) => a?.questionId === q.id || a?.id === q.id);
          } else if (answers && typeof answers === 'object') {
            userAns = (answers as any)[q.id];
          }

          const isWrong = !userAns || userAns.awardedScore < q.points;
          if (isWrong) {
            const chosen = userAns?.selectedOption !== undefined && userAns?.selectedOption !== null
              ? userAns.selectedOption
              : (userAns?.textAnswer || 'Boş');
            get().recordMistake({
              userId,
              questionId: q.id,
              topicId: q.topicId,
              subjectId: q.subjectSlug || 'genel',
              questionText: q.questionText,
              options: q.options || [],
              correctAnswer: q.correctAnswer !== undefined ? q.correctAnswer : (q.sampleAnswer || 'Açık uçlu cevap'),
              userAnswer: chosen,
              explanation: q.rubric?.explanation || 'Seviye belirleme sınavında tespit edilen temel eksiklik.',
              learningOutcomeCode: `${(q.subjectSlug || 'AKD').slice(0, 3).toUpperCase()}.9.TANI`,
              nextReviewDate: calculateNextReviewDate(1),
              source: 'placement',
            });
          }
        });
      },

      submitReviewSession: (results) => {
        let newlyMastered = 0;
        const currentVault = get().mistakeVault;
        // Deduplicate results by mistakeId
        const resultsMap = new Map<string, boolean>();
        results.forEach((r) => {
          resultsMap.set(r.mistakeId, r.isCorrect);
        });

        const updatedVault = currentVault.map((item) => {
          if (!resultsMap.has(item.id)) return item;
          const isCorrect = resultsMap.get(item.id)!;
          const updated = processReviewOutcome(item, isCorrect);
          if (!item.isMastered && updated.isMastered) {
            newlyMastered++;
          }
          syncMistakeRecordToSupabase(updated);
          return updated;
        });

        const allCorrect = results.length > 0 && results.every((r) => r.isCorrect);
        const currentHearts = get().user.hearts ?? 5;
        let nextHearts = currentHearts;
        let shieldReloaded = false;

        if (allCorrect) {
          nextHearts = Math.min(5, currentHearts + 1);
          if (nextHearts > currentHearts) {
            shieldReloaded = true;
          }
        }

        // Anti-cheat clamped XP reward (+25 XP per reviewed unique mistake)
        const uniqueMistakeCount = resultsMap.size;
        const xpReward = Math.min(350, Math.max(0, uniqueMistakeCount * 25));
        const newTotalXP = (get().user.totalXP || 0) + xpReward;
        const newLevel = Math.max(1, calculateLevel(newTotalXP));

        // Clan XP integration
        let updatedClans = get().clans;
        let userClanContrib = get().user.clanContributionXP || 0;

        if (get().user.clanId && xpReward > 0) {
          const contribAmount = Math.max(1, Math.round(xpReward * 0.25));
          userClanContrib += contribAmount;

          updatedClans = get().clans.map((c) => {
            if (c.id === get().user.clanId) {
              const newClanWeekly = c.weeklyXP + contribAmount;
              const newClanTotal = c.totalXP + contribAmount;
              const newClanLevel = Math.max(c.level, Math.floor(newClanTotal / 5000) + 1);

              const updatedQuests = c.weeklyQuests.map((q) => {
                if (q.type === 'total_xp' && !q.completed) {
                  const newCurrent = Math.min(q.targetValue, q.currentValue + contribAmount);
                  return { ...q, currentValue: newCurrent, completed: newCurrent >= q.targetValue };
                }
                return q;
              });

              const userName = get().user.fullName || get().user.username || 'Öğrenci';
              let memberFound = false;
              const updatedMembers = c.members.map((m) => {
                if (m.name === userName || m.id === get().user.id) {
                  memberFound = true;
                  return { ...m, weeklyXPContribution: m.weeklyXPContribution + contribAmount };
                }
                return m;
              });

              if (!memberFound) {
                updatedMembers.push({
                  id: get().user.id,
                  name: userName,
                  avatarUrl: get().user.avatarUrl || 'user',
                  role: get().user.clanRole || 'member',
                  weeklyXPContribution: contribAmount,
                  joinedAt: getTodayISO(),
                  grade: get().user.grade || 9,
                });
              }

              return {
                ...c,
                weeklyXP: newClanWeekly,
                totalXP: newClanTotal,
                level: newClanLevel,
                weeklyQuests: updatedQuests,
                members: updatedMembers,
              };
            }
            return c;
          });
        }

        const totalMastered = updatedVault.filter((m) => m.isMastered).length;

        set((state) => ({
          mistakeVault: updatedVault,
          clans: updatedClans,
          user: {
            ...state.user,
            hearts: nextHearts,
            totalXP: newTotalXP,
            level: newLevel,
            clanContributionXP: userClanContrib,
            masteredMistakesCount: totalMastered,
          },
        }));

        // Credit study activity for daily streak and questions answered
        if (results.length > 0) {
          get().recordStudyActivity(Math.max(1, Math.round(results.length * 0.5)), xpReward, results.length);
        }

        if (allCorrect) {
          sounds.playChest();
        } else {
          sounds.playCorrect();
        }

        return {
          allCorrect,
          reloadedShield: shieldReloaded,
          xpAwarded: xpReward,
          masteredCount: newlyMastered,
        };
      },

      // --- Duel Store Actions ---
      createDuelRoom: ({ subjectSlug, subjectName }) => {
        const state = get();
        const user = state.user;
        const code = generateDuelRoomCode();
        const questions = compileDuelQuestions(subjectSlug);
        const displayName = subjectName || getSubjectDisplayName(subjectSlug);

        const newRoom: DuelRoom = {
          id: `room-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          code,
          hostUserId: user.id || 'student-main',
          hostUserName: user.fullName || user.username || 'Öğrenci',
          hostAvatarUrl: user.avatarUrl || 'user',
          subjectSlug,
          subjectName: displayName,
          status: 'waiting',
          questions,
          currentQuestionIndex: 0,
          hostScore: 0,
          guestScore: 0,
          hostAnswers: [],
          guestAnswers: [],
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
        };

        set((prev) => ({
          duelRooms: [newRoom, ...prev.duelRooms],
          activeDuel: newRoom,
        }));

        return newRoom;
      },

      joinDuelRoom: (roomCodeOrId) => {
        const state = get();
        const user = state.user;
        const normalized = normalizeDuelRoomCode(roomCodeOrId);

        let room = state.duelRooms.find(
          (r) => r.code === normalized || r.id === roomCodeOrId || r.code === roomCodeOrId
        );

        if (!room) {
          return { success: false, message: 'Belirtilen kodla bir düello odası bulunamadı.' };
        }

        if (room.status === 'completed') {
          return { success: false, message: 'Bu düello odası tamamlanmıştır.' };
        }

        if (room.hostUserId === user.id) {
          set({ activeDuel: room });
          return { success: true, message: 'Kendi odanıza girdiniz.', room };
        }

        const updatedRoom: DuelRoom = {
          ...room,
          guestUserId: user.id || 'guest-student',
          guestUserName: user.fullName || user.username || 'Misafir Öğrenci',
          guestAvatarUrl: user.avatarUrl || 'user',
          status: 'active',
        };

        set((prev) => ({
          duelRooms: prev.duelRooms.map((r) => (r.id === room.id ? updatedRoom : r)),
          activeDuel: updatedRoom,
        }));

        return { success: true, message: 'Düelloya katıldınız! Başarılar!', room: updatedRoom };
      },

      setActiveDuel: (room: DuelRoom) => {
        set((prev) => ({
          activeDuel: room,
          duelRooms: prev.duelRooms.some((r) => r.id === room.id)
            ? prev.duelRooms.map((r) => (r.id === room.id ? room : r))
            : [room, ...prev.duelRooms],
        }));
      },

      submitDuelAnswer: (questionIndex, answerIndex, remainingSeconds) => {
        const state = get();
        const activeDuel = state.activeDuel;
        if (!activeDuel) {
          return { isCorrect: false, points: 0, hostScore: 0, guestScore: 0, isDuelFinished: false };
        }

        const question = activeDuel.questions[questionIndex];
        if (!question) {
          return { isCorrect: false, points: 0, hostScore: activeDuel.hostScore, guestScore: activeDuel.guestScore, isDuelFinished: false };
        }

        const isUserHost = activeDuel.hostUserId === state.user.id;
        const isCorrect = answerIndex !== null && answerIndex === question.correctAnswer;
        const scoreResult = calculateDuelAnswerScore(isCorrect, remainingSeconds);

        let newHostScore = activeDuel.hostScore;
        let newGuestScore = activeDuel.guestScore;
        const hostAnswers = [...(activeDuel.hostAnswers || [])];
        const guestAnswers = [...(activeDuel.guestAnswers || [])];

        // Opponent realistic simulation in local test/mock mode
        const oppCorrect = Math.random() > 0.3;
        const oppRemaining = Math.floor(Math.random() * 14) + 12;
        const oppScore = calculateDuelAnswerScore(oppCorrect, oppRemaining).totalPoints;
        const oppAnswerIndex = oppCorrect ? question.correctAnswer : (question.correctAnswer + 1) % question.options.length;

        if (isUserHost) {
          newHostScore += scoreResult.totalPoints;
          hostAnswers[questionIndex] = answerIndex;
          newGuestScore += oppScore;
          guestAnswers[questionIndex] = oppAnswerIndex;
        } else {
          newGuestScore += scoreResult.totalPoints;
          guestAnswers[questionIndex] = answerIndex;
          newHostScore += oppScore;
          hostAnswers[questionIndex] = oppAnswerIndex;
        }

        const isDuelFinished = questionIndex >= activeDuel.questions.length - 1;

        const updatedRoom: DuelRoom = {
          ...activeDuel,
          hostScore: newHostScore,
          guestScore: newGuestScore,
          hostAnswers,
          guestAnswers,
          hostAnsweredCurrent: true,
          guestAnsweredCurrent: true,
          status: isDuelFinished ? 'completed' : activeDuel.status,
          winnerUserId: isDuelFinished
            ? newHostScore > newGuestScore
              ? activeDuel.hostUserId
              : newGuestScore > newHostScore
              ? activeDuel.guestUserId || 'guest'
              : 'tie'
            : undefined,
        };

        set((prev) => ({
          activeDuel: updatedRoom,
          duelRooms: prev.duelRooms.map((r) => (r.id === activeDuel.id ? updatedRoom : r)),
        }));

        if (isCorrect) {
          sounds.playCorrect();
        } else {
          sounds.playWrong();
        }

        return {
          isCorrect,
          points: scoreResult.totalPoints,
          hostScore: newHostScore,
          guestScore: newGuestScore,
          isDuelFinished,
        };
      },

      advanceDuelQuestion: () => {
        const state = get();
        const activeDuel = state.activeDuel;
        if (!activeDuel) return;

        const nextIndex = Math.min(activeDuel.questions.length - 1, activeDuel.currentQuestionIndex + 1);
        const updatedRoom: DuelRoom = {
          ...activeDuel,
          currentQuestionIndex: nextIndex,
          hostAnsweredCurrent: false,
          guestAnsweredCurrent: false,
        };

        set((prev) => ({
          activeDuel: updatedRoom,
          duelRooms: prev.duelRooms.map((r) => (r.id === activeDuel.id ? updatedRoom : r)),
        }));
      },

      recordMistakesFromDuel: (duel, userAnswers) => {
        const state = get();
        const userId = state.user.id || 'student-main';
        let recordedCount = 0;

        duel.questions.forEach((q, idx) => {
          const ans = userAnswers[idx];
          const isWrongOrEmpty = ans === null || ans === undefined || ans !== q.correctAnswer;

          if (isWrongOrEmpty) {
            recordedCount++;
            const safeSubject = q.subjectSlug || 'matematik';
            state.recordMistake({
              userId,
              questionId: q.id,
              topicId: q.topicId || `${safeSubject}-duel-t1`,
              subjectId: safeSubject,
              questionText: q.questionText,
              options: q.options || [],
              correctAnswer: q.correctAnswer,
              userAnswer: ans !== null && ans !== undefined ? ans : 'Boş',
              explanation: q.explanation || 'Bilişsel düello soru analizi.',
              learningOutcomeCode: q.learningOutcomeCode || `${safeSubject.slice(0, 3).toUpperCase()}.9.1`,
              nextReviewDate: calculateNextReviewDate(1),
              source: 'duel',
            });
          }
        });

        return recordedCount;
      },

      finishDuel: (roomId) => {
        const state = get();
        const activeDuel = (state.activeDuel && (!roomId || state.activeDuel.id === roomId))
          ? state.activeDuel
          : roomId
          ? state.duelRooms.find((r) => r.id === roomId) || state.activeDuel
          : state.activeDuel;

        if (!activeDuel) {
          return { winner: 'tie', hostScore: 0, guestScore: 0, xpEarned: 3, clanPointsEarned: 3, mistakesRecorded: 0 };
        }

        const isUserHost = activeDuel.hostUserId === state.user.id;
        let winner = activeDuel.winnerUserId;
        if (!winner) {
          if (activeDuel.hostScore > activeDuel.guestScore) winner = activeDuel.hostUserId;
          else if (activeDuel.guestScore > activeDuel.hostScore) winner = activeDuel.guestUserId || 'guest';
          else winner = 'tie';
        }

        const isUserWinner = winner === state.user.id || (isUserHost && winner === activeDuel.hostUserId);
        const isTie = winner === 'tie';

        const xpEarned = isUserWinner ? 15 : isTie ? 8 : 3;
        const clanPointsEarned = isUserWinner ? 10 : isTie ? 5 : 3;

        // Idempotency: If already completed, do NOT grant duplicate XP, duplicate clan points, or duplicate mistakes
        if (activeDuel.status === 'completed') {
          return {
            winner: winner || 'tie',
            hostScore: activeDuel.hostScore,
            guestScore: activeDuel.guestScore,
            xpEarned,
            clanPointsEarned,
            mistakesRecorded: 0,
          };
        }

        // Add XP and Clan Points (ensuring net clan points matches clanPointsEarned)
        state.addXP(xpEarned);
        const autoContributedFromXP = state.user.clanId ? Math.max(1, Math.round(xpEarned * 0.25)) : 0;
        const additionalClanNeeded = Math.max(0, clanPointsEarned - autoContributedFromXP);
        if (state.user.clanId && additionalClanNeeded > 0) {
          state.contributeClanXP(additionalClanNeeded);
        }

        // Automatic mistake routing to Akıllı Hata Defteri
        const userAnswers = isUserHost ? (activeDuel.hostAnswers || []) : (activeDuel.guestAnswers || []);
        const mistakesRecorded = state.recordMistakesFromDuel(activeDuel, userAnswers);

        const completedDuel: DuelRoom = {
          ...activeDuel,
          status: 'completed',
          winnerUserId: winner,
        };

        set((prev) => ({
          activeDuel: completedDuel,
          duelRooms: prev.duelRooms.map((r) => (r.id === activeDuel.id ? completedDuel : r)),
        }));

        if (isUserWinner) {
          sounds.playLevelUp();
        } else {
          sounds.playCorrect();
        }

        return {
          winner: winner || 'tie',
          hostScore: activeDuel.hostScore,
          guestScore: activeDuel.guestScore,
          xpEarned,
          clanPointsEarned,
          mistakesRecorded,
        };
      },

      syncProgress: async () => {
        const state = get();
        if (typeof window === 'undefined') return;
        try {
          const res = await fetch('/api/user/sync-progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: state.user.id,
              email: state.user.email,
              fullName: state.user.fullName,
              currentStreak: state.user.currentStreak,
              totalXP: state.user.totalXP,
              level: state.user.level,
              gems: state.user.gems,
              hearts: state.user.hearts,
              grade: state.user.grade,
              isRepeater: state.user.isRepeater,
              learningMode: state.user.learningMode,
              lastActiveDate: state.user.lastActiveDate,
            }),
          });
          const data = await res.json();
          if (data && data.success && data.state) {
            set((prev) => ({
              user: {
                ...prev.user,
                totalXP: data.state.totalXP ?? prev.user.totalXP,
                level: data.state.level ?? prev.user.level,
                currentStreak: data.state.currentStreak ?? prev.user.currentStreak,
                gems: data.state.gems ?? prev.user.gems,
              },
            }));
          }
        } catch {
          // Silent catch in offline mode
        }
      },

      logout: () => {
        set(() => ({
          user: {
            ...defaultUser,
            isAuthenticated: false,
            isOnboarded: false,
            email: '',
          },
        }));
      },
    }),
    {
      name: 'cognito-storage',
      storage: createJSONStorage(() => createSecureStorage()),
    }
  )
);
