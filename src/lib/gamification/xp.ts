import { Difficulty } from '@/types';

/**
 * Platform Geneli Prestijli Zorlu XP Ekonomisi
 * Level 1: 0 - 99 XP
 * Level 2: 100 - 349 XP
 * Level 3: 350 - 799 XP
 * Level 4: 800 - 1,499 XP
 * Level 5: 1,500 - 2,499 XP
 * Level 6: 2,500 - 3,999 XP
 * Level 7: 4,000 - 5,999 XP
 * Level 8: 6,000 - 8,499 XP
 * Level 9: 8,500 - 11,999 XP
 * Level 10: 12,000+ XP
 */

export const LEVEL_THRESHOLDS: { level: number; minXP: number; maxXP: number }[] = [
  { level: 1, minXP: 0, maxXP: 99 },
  { level: 2, minXP: 100, maxXP: 349 },
  { level: 3, minXP: 350, maxXP: 799 },
  { level: 4, minXP: 800, maxXP: 1499 },
  { level: 5, minXP: 1500, maxXP: 2499 },
  { level: 6, minXP: 2500, maxXP: 3999 },
  { level: 7, minXP: 4000, maxXP: 5999 },
  { level: 8, minXP: 6000, maxXP: 8499 },
  { level: 9, minXP: 8500, maxXP: 11999 },
  { level: 10, minXP: 12000, maxXP: Infinity },
];

export function calculateLevel(totalXP: number): number {
  if (totalXP <= 0) return 1;
  if (totalXP < 100) return 1;
  if (totalXP < 350) return 2;
  if (totalXP < 800) return 3;
  if (totalXP < 1500) return 4;
  if (totalXP < 2500) return 5;
  if (totalXP < 4000) return 6;
  if (totalXP < 6000) return 7;
  if (totalXP < 8500) return 8;
  if (totalXP < 12000) return 9;
  return 10 + Math.floor((totalXP - 12000) / 4000);
}

export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  switch (level) {
    case 2: return 100;
    case 3: return 350;
    case 4: return 800;
    case 5: return 1500;
    case 6: return 2500;
    case 7: return 4000;
    case 8: return 6000;
    case 9: return 8500;
    case 10: return 12000;
    default:
      return 12000 + (level - 10) * 4000;
  }
}

export function calculateNextLevelXP(levelOrXP: number): number {
  if (levelOrXP <= 0) return 100;
  // If value is >= 100, it represents total XP (e.g. 450 XP -> Level 3 -> next level is Level 4: 800 XP)
  if (levelOrXP >= 100) {
    const currentLevel = calculateLevel(levelOrXP);
    return xpForLevel(currentLevel + 1);
  }
  // Otherwise, it represents a level number (1..99). Level 1 -> 100 XP, Level 10 -> 16000 XP, Level 11 -> 20000 XP
  return xpForLevel(Math.floor(levelOrXP) + 1);
}

export function xpToNextLevel(totalXP: number): { current: number; needed: number; progress: number } {
  const level = calculateLevel(totalXP);
  const currentLevelBaseXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);
  
  const current = Math.max(0, totalXP - currentLevelBaseXP);
  const needed = Math.max(1, nextLevelXP - currentLevelBaseXP);
  const progress = Math.min(1, Math.max(0, current / needed));
  
  return { current, needed, progress };
}

export function getXPForDifficulty(difficulty: Difficulty): number {
  switch (difficulty) {
    case 1: return 2;
    case 2: return 3;
    case 3: return 4;
    default: return 2;
  }
}
