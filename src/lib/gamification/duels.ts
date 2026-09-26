import { DuelQuestion, DuelRoom, Question } from '@/types';
import { questionsBySubject, allQuestions } from '@/data/questions';
import { subjects } from '@/data/subjects';

/**
 * Generates an authentic 6-character room code in the COG-XXX format.
 * Example: COG-842, COG-714, COG-935
 */
export function generateDuelRoomCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomSuffix = '';
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    randomSuffix += chars[idx];
  }
  return `COG-${randomSuffix}`;
}

/**
 * Normalizes input code to handle lowercase, missing prefixes, etc.
 */
export function normalizeDuelRoomCode(input: string): string {
  const clean = input.trim().toUpperCase();
  if (clean.startsWith('COG-')) {
    return clean;
  }
  if (clean.length === 3) {
    return `COG-${clean}`;
  }
  return clean;
}

/**
 * Compiles 5 authentic MEB questions for the chosen subject.
 */
export function compileDuelQuestions(subjectSlug: string): DuelQuestion[] {
  let sourceQuestions: Question[] = [];
  const filterStandard = (q: Question) => Array.isArray(q.options) && q.options.length >= 4;

  if (subjectSlug === 'karma' || !subjectSlug) {
    // Pick 5 from across different subjects
    const candidates = allQuestions.filter(filterStandard);
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    sourceQuestions = shuffled.slice(0, 5);
  } else {
    const list = (questionsBySubject[subjectSlug] || []).filter(filterStandard);
    if (list.length >= 5) {
      const shuffled = [...list].sort(() => 0.5 - Math.random());
      sourceQuestions = shuffled.slice(0, 5);
    } else if (list.length > 0) {
      sourceQuestions = [...list];
      const remainder = 5 - sourceQuestions.length;
      const otherQuestions = allQuestions.filter(filterStandard).filter((q) => !sourceQuestions.some((sq) => sq.id === q.id));
      const extra = [...otherQuestions].sort(() => 0.5 - Math.random()).slice(0, remainder);
      sourceQuestions = [...sourceQuestions, ...extra];
    } else {
      sourceQuestions = allQuestions.filter(filterStandard).sort(() => 0.5 - Math.random()).slice(0, 5);
    }
  }

  return sourceQuestions.map((q, idx) => {
    const qSubjectSlug =
      subjectSlug !== 'karma' && subjectSlug
        ? subjectSlug
        : q.topicId.split('-')[0] === 'mat'
        ? 'matematik'
        : q.topicId.split('-')[0] === 'fiz'
        ? 'fizik'
        : q.topicId.split('-')[0] === 'kim'
        ? 'kimya'
        : q.topicId.split('-')[0] === 'biy'
        ? 'biyoloji'
        : 'matematik';

    const shortCode = qSubjectSlug.slice(0, 3).toUpperCase();
    return {
      id: q.id || `duel-q-${idx + 1}`,
      topicId: q.topicId,
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty || 2,
      learningOutcomeCode: `${shortCode}.9.${(idx % 4) + 1}`,
      subjectSlug: qSubjectSlug,
    };
  });
}

/**
 * Calculates score for an answer:
 * 100 base points + up to 50 points speed bonus (based on 30s timer).
 */
export function calculateDuelAnswerScore(
  isCorrect: boolean,
  remainingSeconds: number
): { isCorrect: boolean; basePoints: number; speedBonus: number; totalPoints: number } {
  if (!isCorrect) {
    return {
      isCorrect: false,
      basePoints: 0,
      speedBonus: 0,
      totalPoints: 0,
    };
  }

  const basePoints = 100;
  // Timer is 30 seconds: 30s remaining => +50 bonus, 15s remaining => +25 bonus, 0s remaining => +0 bonus
  const clampedSeconds = Math.max(0, Math.min(30, remainingSeconds));
  const speedBonus = Math.round((clampedSeconds / 30) * 50);
  const totalPoints = basePoints + speedBonus;

  return {
    isCorrect: true,
    basePoints,
    speedBonus,
    totalPoints,
  };
}

/**
 * Returns subject display name from slug.
 */
export function getSubjectDisplayName(slug: string): string {
  if (slug === 'karma') return 'Karma Akademik Deneme';
  const found = subjects.find((s) => s.slug === slug || s.id === slug);
  return found ? found.name : 'Genel Akademik';
}

// Server-side / in-memory cache for live duel rooms
const memoryDuelRooms = new Map<string, DuelRoom>();

// Seed with initial academic challenge rooms from clan members
if (memoryDuelRooms.size === 0) {
  const seedRoom1: DuelRoom = {
    id: 'room-seed-1',
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
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
  };
  const seedRoom2: DuelRoom = {
    id: 'room-seed-2',
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
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
  };
  memoryDuelRooms.set(seedRoom1.id, seedRoom1);
  memoryDuelRooms.set(seedRoom1.code, seedRoom1);
  memoryDuelRooms.set(seedRoom2.id, seedRoom2);
  memoryDuelRooms.set(seedRoom2.code, seedRoom2);
}

export function getMemoryRoom(idOrCode: string): DuelRoom | undefined {
  const normalized = normalizeDuelRoomCode(idOrCode);
  return memoryDuelRooms.get(idOrCode) || memoryDuelRooms.get(normalized);
}

export function setMemoryRoom(room: DuelRoom): void {
  memoryDuelRooms.set(room.id, room);
  memoryDuelRooms.set(room.code, room);
}

export function getActiveMemoryRooms(): DuelRoom[] {
  const activeRooms: DuelRoom[] = [];
  const seenIds = new Set<string>();

  for (const room of memoryDuelRooms.values()) {
    if (!seenIds.has(room.id) && (room.status === 'waiting' || room.status === 'ready')) {
      seenIds.add(room.id);
      activeRooms.push(room);
    }
  }
  return activeRooms;
}
