import { StreakDay } from '@/types';
import { getTodayISO } from '../utils';

export function isStreakActive(lastActiveDate: string): boolean {
  if (!lastActiveDate) return false;
  const lastActive = new Date(lastActiveDate).setHours(0, 0, 0, 0);
  const today = new Date(getTodayISO()).setHours(0, 0, 0, 0);
  const yesterday = today - 86400000;
  return lastActive === today || lastActive === yesterday;
}

export function calculateStreak(streakDays: StreakDay[]): number {
  if (!streakDays || streakDays.length === 0) return 0;
  
  // Sort descending by date
  const sorted = [...streakDays].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const todayDate = getTodayISO();
  let streak = 0;
  let currentDate = new Date(todayDate).setHours(0, 0, 0, 0);
  
  // Check if active today
  let startIndex = 0;
  const firstDay = new Date(sorted[0].date).setHours(0, 0, 0, 0);
  
  if (firstDay === currentDate) {
    // Active today
  } else if (firstDay === currentDate - 86400000) {
    // Active yesterday
    currentDate = currentDate - 86400000;
  } else {
    // Not active today or yesterday
    return 0;
  }

  for (let i = 0; i < sorted.length; i++) {
    const dayDate = new Date(sorted[i].date).setHours(0, 0, 0, 0);
    if (dayDate === currentDate) {
      streak++;
      currentDate -= 86400000; // Move to previous day
    } else if (dayDate > currentDate) {
      continue;
    } else {
      break;
    }
  }
  
  return streak;
}

export function shouldShowStreakWarning(lastActiveDate: string): boolean {
  if (!lastActiveDate) return false;
  const lastActive = new Date(lastActiveDate).setHours(0, 0, 0, 0);
  const today = new Date(getTodayISO()).setHours(0, 0, 0, 0);
  const yesterday = today - 86400000;
  return lastActive === yesterday;
}

export function getStreakIcon(streak: number): string {
  if (streak >= 100) return 'flame';
  if (streak >= 50) return 'zap';
  if (streak >= 30) return 'star';
  if (streak >= 14) return 'award';
  if (streak >= 7) return 'sparkles';
  if (streak >= 3) return 'thumbs-up';
  return 'sprout';
}

export function getStreakEmoji(streak: number): string {
  return getStreakIcon(streak);
}
