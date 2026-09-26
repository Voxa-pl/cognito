/**
 * Backend Anti-Cheat & Anti-Tamper Security Engine
 * Protects against Tampermonkey/userscripts, 0-second auto-solvers, and XP/streak spoofing.
 */

import { hmacSha256, sha256 } from './sha256';
import { calculateLevel } from '@/lib/gamification/xp';

// Secret key for HMAC signing (uses env var or robust fallback)
const HMAC_SECRET = process.env.SECURITY_HMAC_SECRET || 'cognito-ac-secret-meb-2026-auth';

// Minimum realistic seconds a human takes to read and answer a question (ultra-fast human threshold: 0.5s, blocks 0ms scripts)
export const MIN_SECONDS_PER_QUESTION = 0.5;

// Maximum allowed quiz duration (3 hours)
export const MAX_QUIZ_DURATION_SEC = 3 * 3600;

// Maximum XP that can legitimately be earned from a single quiz (disciplined 2-3 XP standard)
export const MAX_XP_PER_QUIZ = 50;

// Replay protection cache (stores consumed session IDs and consumption timestamps)
const consumedSessions = new Map<string, number>();

/**
 * Prunes consumed sessions older than 2 hours to prevent memory leak while maintaining replay defense.
 */
function pruneConsumedSessions(): void {
  const now = Date.now();
  const maxAge = 2 * 3600 * 1000;
  for (const [id, timestamp] of consumedSessions.entries()) {
    if (now - timestamp > maxAge) {
      consumedSessions.delete(id);
    }
  }
}

// Rate limiting in-memory store
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitStore = new Map<string, RateLimitRecord>();

export interface QuizSessionPayload {
  sessionId: string;
  userId: string;
  topicId: string;
  questionCount: number;
  mode: 'challenge' | 'practice';
  issuedAt: number; // ms timestamp
  nonce: string;
}

export interface QuizSubmissionData {
  sessionToken: string;
  topicId: string;
  score: number;
  questionCount: number;
  timeSpentSec: number;
  answers: (number | 'correct' | 'wrong' | null)[];
}

export interface VerificationResult {
  valid: boolean;
  code: 'OK' | 'INVALID_TOKEN' | 'EXPIRED_TOKEN' | 'SESSION_REPLAYED' | 'SPEED_HACK' | 'INVALID_SCORE' | 'PAYLOAD_MISMATCH';
  message: string;
  verifiedScore?: number;
  verifiedXp?: number;
  verifiedGems?: number;
  timeSpentSec?: number;
  verificationSignature?: string;
}

/**
 * Base64url encode helper
 */
function base64UrlEncode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64url');
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Base64url decode helper
 */
function base64UrlDecode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64url').toString('utf8');
  }
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

/**
 * Creates a cryptographically signed HMAC token for a new quiz session.
 */
export function generateQuizSessionToken(payload: Omit<QuizSessionPayload, 'issuedAt' | 'nonce'>): string {
  const fullPayload: QuizSessionPayload = {
    ...payload,
    issuedAt: Date.now(),
    nonce: Math.random().toString(36).substring(2, 12) + Date.now().toString(36),
  };

  const payloadStr = JSON.stringify(fullPayload);
  const encodedPayload = base64UrlEncode(payloadStr);
  const signature = hmacSha256(HMAC_SECRET, encodedPayload);

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies the authenticity and validity of a quiz session token.
 */
export function verifyQuizSessionToken(token: string): { valid: boolean; payload?: QuizSessionPayload; reason?: string } {
  if (!token || typeof token !== 'string') {
    return { valid: false, reason: 'Eksik veya geçersiz token formatı.' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, reason: 'Bozuk token yapısı.' };
  }

  const [encodedPayload, providedSignature] = parts;
  const expectedSignature = hmacSha256(HMAC_SECRET, encodedPayload);

  if (providedSignature !== expectedSignature) {
    return { valid: false, reason: 'Token imzası doğrulanamadı (yetkisiz müdahale).' };
  }

  try {
    const payloadStr = base64UrlDecode(encodedPayload);
    const payload: QuizSessionPayload = JSON.parse(payloadStr);

    // Expiration check (2 hours max)
    const ageMs = Date.now() - payload.issuedAt;
    if (ageMs > 2 * 3600 * 1000) {
      return { valid: false, reason: 'Oturum süresi doldu (2 saat sınırı).' };
    }

    // Replay check
    if (consumedSessions.has(payload.sessionId)) {
      return { valid: false, reason: 'Bu test oturumu daha önce kullanılmış (tekrar kullanım engellendi).' };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, reason: 'Token verisi çözümlenemedi.' };
  }
}

/**
 * Validates a quiz submission against the signed session token,
 * checking minimum time spent (bot/speed hack), score limits, and calculating verified XP.
 */
export function validateQuizSubmission(submission: QuizSubmissionData): VerificationResult {
  const tokenCheck = verifyQuizSessionToken(submission.sessionToken);

  if (!tokenCheck.valid || !tokenCheck.payload) {
    return {
      valid: false,
      code: tokenCheck.reason?.includes('daha önce') ? 'SESSION_REPLAYED' : 'INVALID_TOKEN',
      message: tokenCheck.reason || 'Geçersiz test oturumu.',
    };
  }

  const session = tokenCheck.payload;

  // IMMEDIATELY burn session token to prevent any replay or second-chance retries on failed submissions
  consumedSessions.set(session.sessionId, Date.now());
  if (consumedSessions.size > 10000) {
    pruneConsumedSessions();
  }

  // Question count verification
  if (submission.questionCount && session.questionCount && Number(submission.questionCount) !== session.questionCount) {
    return {
      valid: false,
      code: 'PAYLOAD_MISMATCH',
      message: `Soru adedi uyumsuzluğu: Oturum ${session.questionCount} soru içeriyor, bildirilen ${submission.questionCount}.`,
    };
  }

  // Topic match verification
  if (submission.topicId && session.topicId && submission.topicId !== session.topicId) {
    return {
      valid: false,
      code: 'PAYLOAD_MISMATCH',
      message: 'Oturum konusu ile gönderilen konu uyuşmuyor.',
    };
  }

  // Calculate actual elapsed duration
  const serverElapsedSec = (Date.now() - session.issuedAt) / 1000;
  const declaredElapsedSec = Number(submission.timeSpentSec) || serverElapsedSec;

  if (serverElapsedSec > MAX_QUIZ_DURATION_SEC) {
    return {
      valid: false,
      code: 'EXPIRED_TOKEN',
      message: 'Test süresi izin verilen maksimum süreyi (3 saat) aştı.',
    };
  }

  // Speed-hack / Bot detection: Questions cannot realistically be answered in less than 0.5s each (human reading lower bound)
  const minRequiredTime = session.questionCount * MIN_SECONDS_PER_QUESTION;
  const effectiveTimeSpent = Math.min(serverElapsedSec, declaredElapsedSec);

  if (serverElapsedSec < minRequiredTime || declaredElapsedSec < minRequiredTime) {
    return {
      valid: false,
      code: 'SPEED_HACK',
      message: `Olağandışı tamamlama hızı tespit edildi. ${session.questionCount} soru için minimum ${minRequiredTime.toFixed(1)} saniye gereklidir (Geçen süre: ${effectiveTimeSpent.toFixed(1)}s).`,
      timeSpentSec: Math.round(effectiveTimeSpent),
    };
  }

  // Score validation
  const declaredScore = Math.floor(Number(submission.score ?? 0));
  if (isNaN(declaredScore) || declaredScore < 0 || declaredScore > session.questionCount) {
    return {
      valid: false,
      code: 'INVALID_SCORE',
      message: 'Geçersiz başarı skoru tespit edildi (soru sınırlarının dışında).',
    };
  }

  // Cross-verify with answers array if provided
  if (Array.isArray(submission.answers) && submission.answers.length > 0) {
    if (submission.answers.length > session.questionCount) {
      return {
        valid: false,
        code: 'INVALID_SCORE',
        message: 'Cevap dizisi soru sayısından fazla öğe içeriyor.',
      };
    }
    const correctAnswersCount = submission.answers.filter((a) => a === 'correct').length;
    const hasLabelAnswers = submission.answers.some((a) => a === 'correct' || a === 'wrong');
    if (hasLabelAnswers && correctAnswersCount !== declaredScore) {
      return {
        valid: false,
        code: 'INVALID_SCORE',
        message: `Bildirilen skor (${declaredScore}) ile cevaplardaki doğru sayısı (${correctAnswersCount}) uyuşmuyor.`,
      };
    }
  }

  const score = declaredScore;

  // Server-side XP calculation (NEVER trust client's claimed XP amount)
  // Standard 2-3 XP per question + perfect score bonus (5 XP)
  const baseQuestionXP = 3;
  let calculatedXp = score * baseQuestionXP;
  if (score === session.questionCount && session.questionCount > 0) {
    calculatedXp += 5; // Perfect score bonus
  }
  calculatedXp = Math.min(MAX_XP_PER_QUIZ, calculatedXp);

  // Server-side gems calculation
  const calculatedGems = Math.max(5, Math.floor(score * 2));

  // Generate cryptographic verification signature for client store
  const verificationPayload = `${session.sessionId}:${session.userId}:${score}:${calculatedXp}:${calculatedGems}:${Date.now()}`;
  const verificationSignature = hmacSha256(HMAC_SECRET, verificationPayload);

  return {
    valid: true,
    code: 'OK',
    message: 'Test oturumu başarıyla doğrulandı.',
    verifiedScore: score,
    verifiedXp: calculatedXp,
    verifiedGems: calculatedGems,
    timeSpentSec: Math.round(effectiveTimeSpent),
    verificationSignature: `${base64UrlEncode(verificationPayload)}.${verificationSignature}`,
  };
}

/**
 * Validates progress synchronization (streak, total XP, level) to block client-side injection.
 */
export function validateProgressSync(params: {
  userId: string;
  currentStreak: number;
  totalXP: number;
  level: number;
  lastActiveDate: string;
  previousXP?: number;
  previousStreak?: number;
}): { valid: boolean; correctedState?: { level: number; totalXP: number; currentStreak: number }; reason?: string } {
  const { totalXP, level, currentStreak, previousXP = 0, previousStreak = 0 } = params;

  // Level derivation verification
  const derivedLevel = calculateLevel(totalXP);
  if (level !== derivedLevel) {
    return {
      valid: false,
      reason: `Seviye uyumsuzluğu tespit edildi: XP ${totalXP} için beklenen seviye ${derivedLevel}, bildirilen ${level}.`,
      correctedState: {
        totalXP,
        level: derivedLevel,
        currentStreak: Math.min(currentStreak, (previousStreak || 0) + 1),
      },
    };
  }

  // XP jump sanity check (cannot jump by > 5000 XP in a single sync without verified proofs)
  const xpDelta = totalXP - previousXP;
  if (previousXP > 0 && xpDelta > 5000) {
    return {
      valid: false,
      reason: `Olağandışı XP artışı tespit edildi (+${xpDelta} XP).`,
      correctedState: {
        totalXP: previousXP + 250,
        level: calculateLevel(previousXP + 250),
        currentStreak: previousStreak,
      },
    };
  }

  // Streak jump check (cannot jump by more than 1 in a day)
  if (previousStreak > 0 && currentStreak > previousStreak + 1) {
    return {
      valid: false,
      reason: `Geçersiz seri artışı: Seri bir günde birden fazla artırılamaz.`,
      correctedState: {
        totalXP,
        level: derivedLevel,
        currentStreak: previousStreak + 1,
      },
    };
  }

  return { valid: true };
}

/**
 * Basic rate limiting helper for API endpoints
 */
export function checkRateLimit(key: string, maxRequests: number = 40, windowSec: number = 60): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}
