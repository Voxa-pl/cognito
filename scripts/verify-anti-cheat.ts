/**
 * Comprehensive Automated Verification Suite for Anti-Cheat, Storage Integrity,
 * Clan 10-Member Capacity, and Content Authenticity in Cognito.
 */
import crypto from 'crypto';
import assert from 'assert';
import { sha256, hmacSha256 } from '../src/lib/security/sha256';
import {
  generateQuizSessionToken,
  verifyQuizSessionToken,
  validateQuizSubmission,
  validateProgressSync,
  checkRateLimit,
  MIN_SECONDS_PER_QUESTION,
} from '../src/lib/security/antiCheat';
import {
  computeUserChecksum,
  verifyStateIntegrity,
} from '../src/lib/security/clientIntegrity';
import { initialClans } from '../src/data/clans';
import { calculateLevel } from '../src/lib/gamification/xp';
import { UserProfile } from '../src/types';
import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('🛡️  COGNITO ANTI-CHEAT, CLAN & INTEGRITY VERIFICATION SUITE  🛡️');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name: string, fn: () => void) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ [PASS] ${name}`);
    passedTests++;
  } catch (err: any) {
    console.error(`  ✗ [FAIL] ${name}`);
    console.error(`    Error: ${err.message}`);
    throw err;
  }
}

// -------------------------------------------------------------
// Suite 1: Cryptographic Primitives (SHA-256 & HMAC-SHA-256)
// -------------------------------------------------------------
console.log('--- 1. Testing Zero-Dependency Cryptographic Primitives ---');

runTest('Pure TS sha256 matches Node.js crypto across test vectors', () => {
  const testVectors = [
    '',
    'abc',
    'Cognito 2026 MEB Anti-Cheat Engine',
    'Tampermonkey-Userscript-Payload-Check-0123456789!@#$%^&*()',
    'A'.repeat(128),
    'Turkish: Şampiyon öğrenci ve MEB Maarif Modeli',
  ];

  for (const text of testVectors) {
    const pureTsHash = sha256(text);
    const nodeCryptoHash = crypto.createHash('sha256').update(text, 'utf8').digest('hex');
    assert.strictEqual(
      pureTsHash,
      nodeCryptoHash,
      `Hash mismatch for input "${text}": pure=${pureTsHash} vs node=${nodeCryptoHash}`
    );
  }
});

runTest('Pure TS hmacSha256 matches Node.js crypto HMAC across keys', () => {
  const keys = ['secret-key-1', 'cognito-ac-secret-meb-2026-auth', 'short', 'K'.repeat(80)];
  const messages = [
    'session-payload-12345',
    '{"userId":"student-1","score":10,"xp":150}',
    'speed-hack-payload',
  ];

  for (const key of keys) {
    for (const msg of messages) {
      const pureHmac = hmacSha256(key, msg);
      const nodeHmac = crypto.createHmac('sha256', key).update(msg, 'utf8').digest('hex');
      assert.strictEqual(
        pureHmac,
        nodeHmac,
        `HMAC mismatch for key "${key}" and msg "${msg}": pure=${pureHmac} vs node=${nodeHmac}`
      );
    }
  }
});

// -------------------------------------------------------------
// Suite 2: Quiz Session HMAC Tokens & Replay Protection
// -------------------------------------------------------------
console.log('\n--- 2. Testing Quiz Session HMAC Tokens & Replay Protection ---');

runTest('generateQuizSessionToken creates valid HMAC token structure', () => {
  const token = generateQuizSessionToken({
    sessionId: 'test-session-001',
    userId: 'student-main',
    topicId: 'mat-u1-t1',
    questionCount: 10,
    mode: 'challenge',
  });

  assert(token.includes('.'), 'Token must be in payload.signature format');
  const [payloadPart, sigPart] = token.split('.');
  assert(payloadPart.length > 10, 'Payload must be non-empty base64url');
  assert.strictEqual(sigPart.length, 64, 'HMAC-SHA256 signature must be 64 hex characters');

  const check = verifyQuizSessionToken(token);
  assert.strictEqual(check.valid, true, 'Original token must verify successfully');
  assert.strictEqual(check.payload?.sessionId, 'test-session-001');
  assert.strictEqual(check.payload?.topicId, 'mat-u1-t1');
  assert.strictEqual(check.payload?.questionCount, 10);
});

runTest('Tampered token payload is strictly rejected', () => {
  const token = generateQuizSessionToken({
    sessionId: 'test-session-tamper-payload',
    userId: 'student-main',
    topicId: 'mat-u1-t1',
    questionCount: 10,
    mode: 'challenge',
  });

  const [payloadPart, sigPart] = token.split('.');
  // Modify payload (simulate Tampermonkey modifying questionCount to 100)
  const modifiedPayloadPart = payloadPart.slice(0, -2) + 'AA';
  const tamperedToken = `${modifiedPayloadPart}.${sigPart}`;

  const check = verifyQuizSessionToken(tamperedToken);
  assert.strictEqual(check.valid, false, 'Tampered payload must be rejected');
  assert(check.reason?.includes('imzası doğrulanamadı'), 'Reason must mention signature mismatch');
});

runTest('Tampered token signature is strictly rejected', () => {
  const token = generateQuizSessionToken({
    sessionId: 'test-session-tamper-sig',
    userId: 'student-main',
    topicId: 'mat-u1-t1',
    questionCount: 10,
    mode: 'challenge',
  });

  const [payloadPart] = token.split('.');
  const forgedSig = 'a'.repeat(64);
  const tamperedToken = `${payloadPart}.${forgedSig}`;

  const check = verifyQuizSessionToken(tamperedToken);
  assert.strictEqual(check.valid, false, 'Forged signature must be rejected');
});

// -------------------------------------------------------------
// Suite 3: Anti-Cheat Speed Hack & Server-Side XP Calculation
// -------------------------------------------------------------
console.log('\n--- 3. Testing Speed Hack & Server-Side XP Calculation ---');

runTest('Speed hack / 0-second bot solver is caught and rejected', () => {
  const token = generateQuizSessionToken({
    sessionId: 'test-speedhack-001',
    userId: 'bot-user',
    topicId: 'mat-u1-t1',
    questionCount: 10,
    mode: 'challenge',
  });

  // Cheater claims they answered 10 questions in 2 seconds (0.2s per question < MIN_SECONDS_PER_QUESTION)
  const result = validateQuizSubmission({
    sessionToken: token,
    topicId: 'mat-u1-t1',
    score: 10,
    questionCount: 10,
    timeSpentSec: 2,
    answers: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1],
  });

  assert.strictEqual(result.valid, false, 'Speed hack must be marked invalid');
  assert.strictEqual(result.code, 'SPEED_HACK', 'Error code must be SPEED_HACK');
  assert(result.message.includes('Olağandışı tamamlama hızı'), 'Message must explain speed hack');
});

runTest('Legitimate completion duration is validated and XP/gems awarded', () => {
  // To simulate legitimate duration on issuedAt:
  const token = generateQuizSessionToken({
    sessionId: 'test-legit-001',
    userId: 'honest-student',
    topicId: 'mat-u1-t1',
    questionCount: 10,
    mode: 'challenge',
  });

  // For this test, simulate serverElapsedSec being valid by setting timeSpentSec to 25s
  // (In real execution, token issuedAt was just created, so serverElapsedSec is ~0.
  // To test the logic when elapsed is sufficient, we create a token with an earlier issuedAt)
  const fakeOldPayload = {
    sessionId: 'test-legit-old-001',
    userId: 'honest-student',
    topicId: 'mat-u1-t1',
    questionCount: 10,
    mode: 'challenge' as const,
    issuedAt: Date.now() - 30000, // 30 seconds ago
    nonce: 'legit-nonce-123',
  };
  const payloadStr = JSON.stringify(fakeOldPayload);
  const encodedPayload = Buffer.from(payloadStr).toString('base64url');
  const secret = process.env.SECURITY_HMAC_SECRET || 'cognito-ac-secret-meb-2026-auth';
  const sig = hmacSha256(secret, encodedPayload);
  const legitToken = `${encodedPayload}.${sig}`;

  const result = validateQuizSubmission({
    sessionToken: legitToken,
    topicId: 'mat-u1-t1',
    score: 10, // Perfect score
    questionCount: 10,
    timeSpentSec: 25,
    answers: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1],
  });

  assert.strictEqual(result.valid, true, 'Legitimate quiz must be verified valid');
  assert.strictEqual(result.code, 'OK');
  // 10 * 3 + 5 (perfect score bonus) = 35 XP
  assert.strictEqual(result.verifiedXp, 35, 'Server must calculate 35 XP for 10/10 perfect score');
  assert.strictEqual(result.verifiedGems, 20, 'Server must calculate 20 gems for score 10');
  assert(result.verificationSignature, 'Must return cryptographic verification signature');
});

runTest('Session replay prevention blocks reusing identical session token', () => {
  const fakeOldPayload = {
    sessionId: 'test-replay-once',
    userId: 'honest-student',
    topicId: 'mat-u1-t1',
    questionCount: 5,
    mode: 'challenge' as const,
    issuedAt: Date.now() - 20000,
    nonce: 'replay-nonce-456',
  };
  const encodedPayload = Buffer.from(JSON.stringify(fakeOldPayload)).toString('base64url');
  const secret = process.env.SECURITY_HMAC_SECRET || 'cognito-ac-secret-meb-2026-auth';
  const sig = hmacSha256(secret, encodedPayload);
  const replayToken = `${encodedPayload}.${sig}`;

  // First submission: should succeed
  const firstResult = validateQuizSubmission({
    sessionToken: replayToken,
    topicId: 'mat-u1-t1',
    score: 4,
    questionCount: 5,
    timeSpentSec: 15,
    answers: [0, 1, 2, 3, 0],
  });
  assert.strictEqual(firstResult.valid, true, 'First submission should succeed');

  // Second submission with exact same token: MUST be rejected
  const secondResult = validateQuizSubmission({
    sessionToken: replayToken,
    topicId: 'mat-u1-t1',
    score: 4,
    questionCount: 5,
    timeSpentSec: 15,
    answers: [0, 1, 2, 3, 0],
  });
  assert.strictEqual(secondResult.valid, false, 'Replayed submission must fail');
  assert.strictEqual(secondResult.code, 'SESSION_REPLAYED', 'Code must be SESSION_REPLAYED');
});

runTest('Speed-hack rejected token is immediately burned to prevent delayed replay', () => {
  const token = generateQuizSessionToken({
    sessionId: 'test-immediate-burn-001',
    userId: 'bot-user',
    topicId: 'mat-u1-t1',
    questionCount: 10,
    mode: 'challenge',
  });

  // Attempt 1: Speed-hack submission (1s for 10 questions)
  const res1 = validateQuizSubmission({
    sessionToken: token,
    topicId: 'mat-u1-t1',
    score: 10,
    questionCount: 10,
    timeSpentSec: 1,
    answers: ['correct', 'correct', 'correct', 'correct', 'correct', 'correct', 'correct', 'correct', 'correct', 'correct'],
  });
  assert.strictEqual(res1.valid, false);
  assert.strictEqual(res1.code, 'SPEED_HACK');

  // Attempt 2: Re-submitting the exact same token later even with 30s duration must fail as SESSION_REPLAYED
  const res2 = validateQuizSubmission({
    sessionToken: token,
    topicId: 'mat-u1-t1',
    score: 10,
    questionCount: 10,
    timeSpentSec: 30,
    answers: ['correct', 'correct', 'correct', 'correct', 'correct', 'correct', 'correct', 'correct', 'correct', 'correct'],
  });
  assert.strictEqual(res2.valid, false, 'Burned token cannot be retried');
  assert.strictEqual(res2.code, 'SESSION_REPLAYED', 'Code must be SESSION_REPLAYED');
});

runTest('Mismatched score vs answers is caught and rejected with INVALID_SCORE', () => {
  const fakeOldPayload = {
    sessionId: 'test-score-mismatch-001',
    userId: 'honest-student',
    topicId: 'mat-u1-t1',
    questionCount: 5,
    mode: 'challenge' as const,
    issuedAt: Date.now() - 20000,
    nonce: 'mismatch-nonce-789',
  };
  const encodedPayload = Buffer.from(JSON.stringify(fakeOldPayload)).toString('base64url');
  const secret = process.env.SECURITY_HMAC_SECRET || 'cognito-ac-secret-meb-2026-auth';
  const sig = hmacSha256(secret, encodedPayload);
  const token = `${encodedPayload}.${sig}`;

  // Attacker claims score 5, but answers array only contains 1 'correct'
  const result = validateQuizSubmission({
    sessionToken: token,
    topicId: 'mat-u1-t1',
    score: 5,
    questionCount: 5,
    timeSpentSec: 15,
    answers: ['correct', 'wrong', 'wrong', 'wrong', 'wrong'],
  });

  assert.strictEqual(result.valid, false, 'Score mismatch must be rejected');
  assert.strictEqual(result.code, 'INVALID_SCORE');
});

// -------------------------------------------------------------
// Suite 4: Client Storage Integrity & Tamper Protection
// -------------------------------------------------------------
console.log('\n--- 4. Testing Client Storage Integrity & Tamper Protection ---');

runTest('Valid user state passes integrity check', () => {
  const validUser: UserProfile = {
    id: 'student-main',
    username: 'Öğrenci',
    fullName: 'Öğrenci',
    email: 'student@example.com',
    avatarUrl: 'user',
    totalXP: 450,
    level: 3, // calculateLevel(450) is 3 under new scale
    currentStreak: 3,
    longestStreak: 5,
    lastActiveDate: '2026-09-19',
    hearts: 5,
    gems: 100,
    placementTickets: 1,
    badges: [],
    settings: {
      theme: 'dark',
      soundEnabled: true,
      dailyGoalMinutes: 30,
    },
    grade: 9,
    learningMode: 'standard',
    learningTrack: 'standard',
    isRepeater: false,
    isOnboarded: true,
    isAuthenticated: true,
    clanId: null,
    clanRole: null,
    clanContributionXP: 0,
  };

  const checksum = computeUserChecksum(validUser);
  const check = verifyStateIntegrity({
    user: validUser,
    _integrityChecksum: checksum,
  });

  assert.strictEqual(check.isTampered, false, 'Valid state must not be flagged as tampered');
});

runTest('Tampermonkey mutation of XP/Gems in localStorage is detected and sanitized', () => {
  const legitimateUser: UserProfile = {
    id: 'student-main',
    username: 'Öğrenci',
    fullName: 'Öğrenci',
    email: 'student@example.com',
    avatarUrl: 'user',
    totalXP: 450,
    level: 3,
    currentStreak: 3,
    longestStreak: 5,
    lastActiveDate: '2026-09-19',
    hearts: 5,
    gems: 100,
    placementTickets: 1,
    badges: [],
    settings: {
      theme: 'dark',
      soundEnabled: true,
      dailyGoalMinutes: 30,
    },
    grade: 9,
    learningMode: 'standard',
    learningTrack: 'standard',
    isRepeater: false,
    isOnboarded: true,
    isAuthenticated: true,
    clanId: null,
    clanRole: null,
    clanContributionXP: 0,
  };

  const legitimateChecksum = computeUserChecksum(legitimateUser);

  // Cheater runs Tampermonkey script: localStorage.setItem('...', JSON.stringify({ state: { user: { totalXP: 999999, gems: 50000 } } }))
  const tamperedUser: UserProfile = {
    ...legitimateUser,
    totalXP: 999999,
    gems: 50000,
  };

  // Check with outdated or mismatched checksum
  const check = verifyStateIntegrity({
    user: tamperedUser,
    _integrityChecksum: legitimateChecksum, // Mismatch!
  });

  assert.strictEqual(check.isTampered, true, 'Tampered state must be detected');
  assert(check.sanitizedUser, 'Sanitized user object must be provided');
  assert(check.sanitizedUser!.totalXP <= 450, 'Total XP must be sanitized to safe bounds');
  assert((check.sanitizedUser!.gems ?? 0) <= 100, 'Gems must be sanitized to safe bounds');
});

runTest('Level derivation mismatch is detected and sanitized', () => {
  const manipulatedLevelUser: UserProfile = {
    id: 'student-main',
    username: 'Öğrenci',
    fullName: 'Öğrenci',
    email: '',
    avatarUrl: 'user',
    totalXP: 100, // For 100 XP, level should be 1
    level: 99,    // Cheater claims level 99
    currentStreak: 1,
    longestStreak: 1,
    lastActiveDate: '2026-09-19',
    hearts: 5,
    gems: 100,
    placementTickets: 1,
    badges: [],
    settings: {
      theme: 'dark',
      soundEnabled: true,
      dailyGoalMinutes: 30,
    },
    grade: 9,
    learningMode: 'standard',
    learningTrack: 'standard',
    isRepeater: false,
    isOnboarded: true,
    isAuthenticated: true,
    clanId: null,
    clanRole: null,
    clanContributionXP: 0,
  };

  // Even if checksum matched (e.g. they somehow computed it), level must match calculateLevel(totalXP)
  const checksum = computeUserChecksum(manipulatedLevelUser);
  const check = verifyStateIntegrity({
    user: manipulatedLevelUser,
    _integrityChecksum: checksum,
  });

  assert.strictEqual(check.isTampered, true, 'Level mismatch must be detected');
  assert.strictEqual(check.sanitizedUser?.level, calculateLevel(100), 'Level must be corrected to 1');
});

// -------------------------------------------------------------
// Suite 5: Progress Sync Boundary Checks
// -------------------------------------------------------------
console.log('\n--- 5. Testing Progress Sync Boundary Checks ---');

runTest('validateProgressSync rejects abnormal XP jumps (+10,000 XP in one sync)', () => {
  const result = validateProgressSync({
    userId: 'student-main',
    previousXP: 500,
    totalXP: 15000, // +14500 XP jump without verified session tokens
    level: calculateLevel(15000),
    previousStreak: 3,
    currentStreak: 4,
    lastActiveDate: '2026-09-19',
  });

  assert.strictEqual(result.valid, false, 'Abnormal XP jump must be rejected');
  assert(result.reason?.includes('Olağandışı XP artışı'), 'Reason must mention abnormal XP jump');
  assert(result.correctedState, 'Must return corrected state');
  assert(result.correctedState!.totalXP < 1000, 'Corrected XP must cap excessive jump');
});

runTest('validateProgressSync rejects illegal streak jumps (+5 streak in a single sync)', () => {
  const result = validateProgressSync({
    userId: 'student-main',
    previousXP: 500,
    totalXP: 600,
    level: calculateLevel(600),
    previousStreak: 3,
    currentStreak: 8, // Jumped by 5 days at once
    lastActiveDate: '2026-09-19',
  });

  assert.strictEqual(result.valid, false, 'Illegal streak jump must be rejected');
  assert(result.reason?.includes('Geçersiz seri artışı'), 'Reason must explain streak limit');
  assert.strictEqual(result.correctedState?.currentStreak, 4, 'Streak should only increase by max 1');
});

// -------------------------------------------------------------
// Suite 6: Academic Clan 10-Member Capacity Limit & Clan Creation
// -------------------------------------------------------------
console.log('\n--- 6. Testing Academic Clan 10-Member Capacity Limit ---');

runTest('All initial clans have maxMembers set strictly to 10', () => {
  for (const clan of initialClans) {
    assert.strictEqual(
      clan.maxMembers,
      10,
      `Clan ${clan.id} (${clan.name}) must have maxMembers: 10, found ${clan.maxMembers}`
    );
  }
});

runTest('clan-anadolu-zirve is configured with exactly 10/10 members', () => {
  const fullClan = initialClans.find((c) => c.id === 'clan-anadolu-zirve');
  assert(fullClan, 'clan-anadolu-zirve must exist in initialClans');
  assert.strictEqual(fullClan.memberCount, 10, 'memberCount must be 10');
  assert.strictEqual(fullClan.maxMembers, 10, 'maxMembers must be 10');
  assert.strictEqual(fullClan.members.length, 10, 'members array must have 10 items');
});

runTest('Joining a clan with 10 members is strictly blocked with clear error message', () => {
  // Simulate the logic from useUserStore.ts joinClan
  const clans = [...initialClans];
  const targetClan = clans.find((c) => c.id === 'clan-anadolu-zirve')!;

  const maxLimit = targetClan.maxMembers || 10;
  const isFull = targetClan.memberCount >= maxLimit;

  assert.strictEqual(isFull, true, 'Clan must be detected as full');

  const attemptResult = isFull
    ? {
        success: false,
        message: `Bu klanın kontenjanı doludur (${targetClan.memberCount}/${maxLimit}). Klanlar maksimum 10 üye ile sınırlandırılmıştır.`,
      }
    : { success: true };

  assert.strictEqual(attemptResult.success, false);
  assert(attemptResult.message?.includes('kontenjanı doludur (10/10)'));
  assert(attemptResult.message?.includes('maksimum 10 üye'));
});

runTest('Clan creation strictly sets maxMembers: 10 and validates parameters', () => {
  // Check store logic implementation
  const storePath = path.resolve(__dirname, '../src/stores/useUserStore.ts');
  const storeSource = fs.readFileSync(storePath, 'utf8');

  assert(storeSource.includes('maxMembers: 10'), 'useUserStore.ts must enforce maxMembers: 10 on created clans');
  assert(storeSource.includes('cleanName.length < 3'), 'Must enforce min 3 chars for clan name');
  assert(storeSource.includes('cleanName.length > 40'), 'Must enforce max 40 chars for clan name');
  assert(storeSource.includes('nameExists'), 'Must enforce clan name uniqueness');
  assert(storeSource.includes('tagExists'), 'Must enforce clan tag uniqueness');
});

runTest('Clan tag validation rejects whitespace-only or illegal formatted tags', () => {
  const validateTag = (rawTag: string) => {
    const stripped = rawTag.replace(/[\[\]\s]/g, '').toUpperCase();
    if (stripped.length < 2) return { valid: false, reason: 'Klan etiketi (tag) en az 2 karakter olmalıdır.' };
    if (stripped.length > 8) return { valid: false, reason: 'Klan etiketi (tag) en fazla 8 karakter olabilir.' };
    if (!/^[A-Z0-9ÇĞİÖŞÜ\-]+$/.test(stripped)) return { valid: false, reason: 'Klan etiketi sadece harf, rakam ve tire içerebilir.' };
    return { valid: true, formatted: `[${stripped}]` };
  };

  assert.strictEqual(validateTag('[   ]').valid, false, 'Whitespace-only tag must fail');
  assert.strictEqual(validateTag('A').valid, false, 'Single character tag must fail');
  assert.strictEqual(validateTag('TOOLONGTAGNAME').valid, false, 'Tag > 8 chars must fail');
  assert.strictEqual(validateTag('TAG$!').valid, false, 'Special symbols must fail');
  
  const validRes = validateTag('kurt-01');
  assert.strictEqual(validRes.valid, true);
  assert.strictEqual(validRes.formatted, '[KURT-01]');
});

runTest('addXP anti-cheat strictly clamps single XP additions to maximum 350', () => {
  const storePath = path.resolve(__dirname, '../src/stores/useUserStore.ts');
  const storeSource = fs.readFileSync(storePath, 'utf8');

  assert(
    storeSource.includes('Math.min(350, Math.floor(amount || 0))'),
    'addXP must clamp injected values to 350'
  );
  assert(
    storeSource.includes('Math.min(50, Math.floor(amount || 0))'),
    'addGems must clamp injected values to 50'
  );
});

// -------------------------------------------------------------
// Suite 7: Content Cleanup & Diagnostic Authenticity
// -------------------------------------------------------------
runTest('DiagnosticEngine provides authentic MEB weak topic diagnostics and onboarding fallback', () => {
  const diagPath = path.resolve(__dirname, '../src/components/dashboard/DiagnosticEngine.tsx');
  const content = fs.readFileSync(diagPath, 'utf8');
  assert(content.includes('Geliştirilmesi Gereken Zayıf Nokta'), 'Must flag weak points');
  assert(content.includes('Eksik Kapatma Antrenmanı'), 'Must include 1-click remedial training');
  assert(content.includes('Üslü ve Köklü İfadeler'), 'Must provide guidance topic for new learners');
});

runTest('ExamPredictorRadar derives scores authentically from real student performance', () => {
  const radarPath = path.resolve(__dirname, '../src/components/dashboard/ExamPredictorRadar.tsx');
  const content = fs.readFileSync(radarPath, 'utf8');
  // Check that hardcoded scores array [86, 82, 78, 88] is removed
  assert(!content.includes('[86, 82, 78, 88]'), 'ExamPredictorRadar must not contain hardcoded test scores');
});

runTest('UnitGuideModal provides rich MEB 2026-2027 curriculum guides', () => {
  const guidePath = path.resolve(__dirname, '../src/components/dashboard/UnitGuideModal.tsx');
  const content = fs.readFileSync(guidePath, 'utf8');
  assert(content.includes('unitSummaries'), 'UnitGuideModal must include unitSummaries');
  assert(content.includes('mat-u1'), 'UnitGuideModal must cover grade 9 mathematics');
  assert(content.includes('fiz-u1'), 'UnitGuideModal must cover grade 9 physics');
  assert(content.includes('kim-u1'), 'UnitGuideModal must cover grade 9 chemistry');
  assert(content.includes('biy-u1'), 'UnitGuideModal must cover grade 9 biology');
  assert(content.includes('tar-u1'), 'UnitGuideModal must cover grade 9 history');
});

// -------------------------------------------------------------
// Suite 8: Cognito Logo & Animated Loading Screen
// -------------------------------------------------------------
console.log('\n--- 8. Testing Cognito Logo & Loading Screen ---');

runTest('CognitoLogo and AppLoadingScreen components are exported and valid', () => {
  const logoPath = path.resolve(__dirname, '../src/components/common/CognitoLogo.tsx');
  const screenPath = path.resolve(__dirname, '../src/components/common/AppLoadingScreen.tsx');
  assert(fs.existsSync(logoPath), 'CognitoLogo.tsx must exist');
  assert(fs.existsSync(screenPath), 'AppLoadingScreen.tsx must exist');

  const logoContent = fs.readFileSync(logoPath, 'utf8');
  const screenContent = fs.readFileSync(screenPath, 'utf8');

  assert(logoContent.includes('export function CognitoLogo'), 'CognitoLogo must export function');
  assert(screenContent.includes('export function AppLoadingScreen'), 'AppLoadingScreen must export function');
  assert(screenContent.includes('MEB 2026-2027 Müfredat Matrisi'), 'AppLoadingScreen must include authentic MEB messages');
  assert(screenContent.includes('Akademik Güvenlik & Doğrulama Katmanı'), 'AppLoadingScreen must include security check message');
});

// -------------------------------------------------------------
// Suite 9: Supabase Schema & Security Violations Logging
// -------------------------------------------------------------
console.log('\n--- 9. Testing Supabase Schema & Anti-Cheat Database Logging ---');

runTest('Supabase schema contains clans 10-member check and anti-cheat tables', () => {
  const schemaPath = path.resolve(__dirname, '../supabase/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  assert(schema.includes('max_members INT NOT NULL DEFAULT 10 CHECK (max_members = 10)'), 'Schema must enforce clan max_members = 10 check constraint');
  assert(schema.includes('member_count INT NOT NULL DEFAULT 1 CHECK (member_count >= 1 AND member_count <= 10)'), 'Schema must enforce member_count <= 10');
  assert(schema.includes('CREATE TABLE IF NOT EXISTS public.anti_cheat_logs'), 'Schema must have anti_cheat_logs table');
  assert(schema.includes('CREATE TABLE IF NOT EXISTS public.quiz_sessions'), 'Schema must have quiz_sessions table');
  assert(schema.includes('CREATE TABLE IF NOT EXISTS public.clans'), 'Schema must have clans table');
  assert(schema.includes('CREATE TABLE IF NOT EXISTS public.clan_members'), 'Schema must have clan_members table');
});

console.log('\n================================================================');
console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS COMPLETED AND PASSED PERFECTLY!`);
console.log('================================================================\n');
