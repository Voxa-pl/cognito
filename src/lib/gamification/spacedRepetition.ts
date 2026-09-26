/**
 * Ebbinghaus Spaced Repetition (Aralıklı Tekrar) Motoru
 * MEB 2026-2027 Maarif Modeli için bilişsel unutma eğrisi algoritması.
 * 
 * Unutma Aşamaları:
 * Aşama 1: 1. Gün (24 saat)
 * Aşama 2: 3. Gün (72 saat)
 * Aşama 3: 7. Gün (168 saat)
 * Aşama 4: 14. Gün (336 saat)
 * Aşama 5: Kalıcı Hafıza (Mühürlendi / Usta)
 */

import { MistakeRecord } from '@/types';

export const STAGE_INTERVALS_DAYS: Record<number, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
};

/**
 * Calculates the next review date based on Ebbinghaus stage.
 */
export function calculateNextReviewDate(stage: number, baseDate: Date = new Date()): string {
  const days = STAGE_INTERVALS_DAYS[stage] ?? 1;
  const targetTime = baseDate.getTime() + days * 24 * 60 * 60 * 1000;
  return new Date(targetTime).toISOString();
}

/**
 * Updates a mistake record based on whether the student answered correctly.
 * If correct: advances stage (+1) up to 5, updates nextReviewDate, increments consecutiveCorrect.
 * If incorrect: resets stage to 1, resets consecutiveCorrect to 0, sets nextReviewDate to +1 day.
 */
export function processReviewOutcome(
  record: MistakeRecord,
  isCorrect: boolean,
  reviewDate: Date = new Date()
): MistakeRecord {
  const reviewIso = reviewDate.toISOString();

  if (isCorrect) {
    const currentStage = Math.max(1, record.stage || 1);
    const nextStage = Math.min(5, currentStage + 1);
    const isMastered = nextStage >= 5;
    const nextReviewDate = isMastered
      ? calculateNextReviewDate(5, reviewDate)
      : calculateNextReviewDate(nextStage, reviewDate);

    return {
      ...record,
      stage: nextStage,
      consecutiveCorrect: Math.max(0, record.consecutiveCorrect || 0) + 1,
      isMastered,
      nextReviewDate,
      lastReviewedAt: reviewIso,
    };
  }

  // Incorrect answer resets to Stage 1 per Ebbinghaus curve
  return {
    ...record,
    stage: 1,
    consecutiveCorrect: 0,
    isMastered: false,
    nextReviewDate: calculateNextReviewDate(1, reviewDate),
    lastReviewedAt: reviewIso,
  };
}

/**
 * Filters records that are due for review (nextReviewDate <= asOfDate and not mastered).
 */
export function filterDueMistakes(
  records: MistakeRecord[],
  asOfDate: Date = new Date()
): MistakeRecord[] {
  if (!records || !Array.isArray(records)) return [];
  const cutoff = asOfDate.getTime();
  return records
    .filter((r) => {
      if (!r || r.isMastered || !r.nextReviewDate) return false;
      const t = new Date(r.nextReviewDate).getTime();
      return !isNaN(t) && t > 0 && t <= cutoff;
    })
    .sort((a, b) => {
      const ta = (a?.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0) || 0;
      const tb = (b?.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0) || 0;
      return ta - tb;
    });
}

export interface StageInfo {
  stage: number;
  label: string;
  intervalLabel: string;
  progressPercent: number;
  description: string;
}

export function getStageInfo(stage: number): StageInfo {
  switch (stage) {
    case 1:
      return {
        stage: 1,
        label: '1. Aşama',
        intervalLabel: '1 Gün Sonra',
        progressPercent: 25,
        description: 'İlk öğrenme ve 24 saatlik kritik unutma eşiği kontrolü.',
      };
    case 2:
      return {
        stage: 2,
        label: '2. Aşama',
        intervalLabel: '3 Gün Sonra',
        progressPercent: 50,
        description: 'Kısa süreli hafızadan orta süreli pekiştirmeye geçiş.',
      };
    case 3:
      return {
        stage: 3,
        label: '3. Aşama',
        intervalLabel: '7 Gün Sonra',
        progressPercent: 75,
        description: 'Haftalık aralıklı pekiştirme ve kavrama konsolidasyonu.',
      };
    case 4:
      return {
        stage: 4,
        label: '4. Aşama',
        intervalLabel: '14 Gün Sonra',
        progressPercent: 90,
        description: 'Kalıcı hafıza öncesi 2 haftalık nihai denetim fazı.',
      };
    case 5:
    default:
      return {
        stage: 5,
        label: 'Kalıcı Hafıza',
        intervalLabel: 'Mühürlendi',
        progressPercent: 100,
        description: 'Kazanım uzun süreli hafızada tam yetkinlikle mühürlendi.',
      };
  }
}

export interface MistakeVaultStats {
  total: number;
  due: number;
  mastered: number;
  inProgress: number;
}

export function getMistakeStats(
  records: MistakeRecord[],
  asOfDate: Date = new Date()
): MistakeVaultStats {
  if (!records || !Array.isArray(records)) {
    return { total: 0, due: 0, mastered: 0, inProgress: 0 };
  }
  const validRecords = records.filter((r) => Boolean(r));
  const due = filterDueMistakes(validRecords, asOfDate).length;
  const mastered = validRecords.filter((r) => Boolean(r?.isMastered)).length;
  const total = validRecords.length;
  const inProgress = Math.max(0, total - mastered);

  return {
    total,
    due,
    mastered,
    inProgress,
  };
}
