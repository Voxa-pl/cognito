/**
 * Client-side Storage Integrity & Anti-Tamper Protection
 * Defends localStorage against Tampermonkey scripts and manual DevTools modifications.
 */

import { sha256 } from './sha256';
import { calculateLevel } from '@/lib/gamification/xp';
import { UserProfile } from '@/types';

const INTEGRITY_SALT = 'cognito_client_integrity_meb2026_salt';

/**
 * Computes an integrity hash for user state fields sensitive to cheating.
 */
export function computeUserChecksum(user: Partial<UserProfile>): string {
  const parts = [
    user.id || '',
    user.totalXP ?? 0,
    user.level ?? 1,
    user.gems ?? 100,
    user.currentStreak ?? 0,
    user.placementTickets ?? 1,
    INTEGRITY_SALT,
  ];
  return sha256(parts.join('::'));
}

export interface TamperDetectionResult {
  isTampered: boolean;
  reason?: string;
  sanitizedUser?: UserProfile;
}

/**
 * Verifies the integrity of a hydrated user object.
 * If tampered, sanitizes suspicious values and returns security status.
 */
export function verifyStateIntegrity(storedState: any): TamperDetectionResult {
  if (!storedState || !storedState.user) {
    return { isTampered: false };
  }

  const user = storedState.user as UserProfile;
  const storedChecksum = storedState._integrityChecksum;

  // 1. If checksum is completely missing: only default starting stats are allowed without a checksum
  if (!storedChecksum) {
    const isPristineDefault =
      user.totalXP <= 450 &&
      (user.gems ?? 100) <= 150 &&
      (user.currentStreak ?? 0) <= 3 &&
      (user.level ?? 1) <= 3;

    if (!isPristineDefault) {
      return {
        isTampered: true,
        reason: 'Eksik güvenlik imzası: İlerleme verisinde doğrulanamayan artış tespit edildi.',
        sanitizedUser: {
          ...user,
          totalXP: Math.min(450, user.totalXP),
          level: calculateLevel(Math.min(450, user.totalXP)),
          gems: Math.min(150, user.gems || 100),
          currentStreak: Math.min(3, user.currentStreak),
        },
      };
    }
  }

  // 2. Checksum validation if present
  if (storedChecksum) {
    const expectedChecksum = computeUserChecksum(user);
    if (storedChecksum !== expectedChecksum) {
      // Checksum mismatch -> Someone edited localStorage directly (e.g. Tampermonkey userscript)
      return {
        isTampered: true,
        reason: 'Yetkisiz veri müdahalesi: Yerel depolama verilerinde manipülasyon algılandı.',
        sanitizedUser: {
          ...user,
          totalXP: 450,
          level: calculateLevel(450),
          gems: 100,
          currentStreak: 3,
        },
      };
    }
  }

  // 3. Logical consistency verification: level must match calculateLevel(totalXP)
  const expectedLevel = Math.max(1, calculateLevel(user.totalXP || 0));
  if (user.level !== expectedLevel) {
    return {
      isTampered: true,
      reason: `Seviye uyumsuzluğu: Seviye ${user.level} XP (${user.totalXP}) ile örtüşmüyor. Düzeltildi: ${expectedLevel}.`,
      sanitizedUser: {
        ...user,
        level: expectedLevel,
      },
    };
  }

  return { isTampered: false };
}

/**
 * Custom storage wrapper for Zustand persist middleware with SHA-256 integrity signature.
 */
export function createSecureStorage() {
  if (typeof window === 'undefined') {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }

  return {
    getItem: (name: string): string | null => {
      try {
        const raw = window.localStorage.getItem(name);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        if (parsed && parsed.state && parsed.state.user) {
          const check = verifyStateIntegrity(parsed.state);
          if (check.isTampered) {
            console.warn('[Cognito Security]', check.reason);
            if (check.sanitizedUser) {
              parsed.state.user = check.sanitizedUser;
              parsed.state._integrityChecksum = computeUserChecksum(check.sanitizedUser);
              window.localStorage.setItem(name, JSON.stringify(parsed));
            }
          }
        }
        return JSON.stringify(parsed);
      } catch (e) {
        return window.localStorage.getItem(name);
      }
    },
    setItem: (name: string, value: string): void => {
      try {
        const parsed = JSON.parse(value);
        if (parsed && parsed.state && parsed.state.user) {
          const u = parsed.state.user;
          // Invariant validation: level must match calculateLevel(totalXP)
          const expectedLvl = Math.max(1, calculateLevel(u.totalXP || 0));
          if (u.level !== expectedLvl) {
            u.level = expectedLvl;
          }
          if (u.currentStreak && u.currentStreak > 365) {
            u.currentStreak = 365;
          }
          if (u.placementTickets && u.placementTickets > 20) {
            u.placementTickets = 20;
          }
          parsed.state._integrityChecksum = computeUserChecksum(u);
        }
        window.localStorage.setItem(name, JSON.stringify(parsed));
      } catch (e) {
        window.localStorage.setItem(name, value);
      }
    },
    removeItem: (name: string): void => {
      window.localStorage.removeItem(name);
    },
  };
}
