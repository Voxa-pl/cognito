/**
 * Comprehensive Automated Verification Suite for Duels & Prestigious XP Economy
 * Türkiye'nin Yeni Nesil Akademik Öğrenme Platformu (MEB 2026-2027)
 */

import assert from 'assert';
import {
  calculateLevel,
  calculateNextLevelXP,
  xpForLevel,
  xpToNextLevel,
  getXPForDifficulty,
  LEVEL_THRESHOLDS,
} from '../src/lib/gamification/xp';
import {
  generateDuelRoomCode,
  normalizeDuelRoomCode,
  compileDuelQuestions,
  calculateDuelAnswerScore,
} from '../src/lib/gamification/duels';
import {
  MIN_SECONDS_PER_QUESTION,
  MAX_XP_PER_QUIZ,
  generateQuizSessionToken,
  validateQuizSubmission,
} from '../src/lib/security/antiCheat';
import { useUserStore } from '../src/stores/useUserStore';
import { hmacSha256 } from '../src/lib/security/sha256';

console.log('================================================================');
console.log('--- COGNITO DUELS & PRESTIGIOUS XP ECONOMY VERIFICATION ---');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name: string, fn: () => void) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err: any) {
    console.error(`  [FAIL] ${name}`);
    console.error(`    Error: ${err.message}`);
    throw err;
  }
}

// -------------------------------------------------------------
// Suite 1: Platform-Wide Prestigious XP Economy & Level Curve
// -------------------------------------------------------------
console.log('--- 1. Testing Hard-Earned Prestigious XP Level Curve ---');

runTest('Level 1: 0 - 99 XP', () => {
  assert.strictEqual(calculateLevel(0), 1);
  assert.strictEqual(calculateLevel(50), 1);
  assert.strictEqual(calculateLevel(99), 1);
});

runTest('Level 2: 100 - 349 XP', () => {
  assert.strictEqual(calculateLevel(100), 2);
  assert.strictEqual(calculateLevel(250), 2);
  assert.strictEqual(calculateLevel(349), 2);
});

runTest('Level 3: 350 - 799 XP (Initial default user 450 XP is Level 3)', () => {
  assert.strictEqual(calculateLevel(350), 3);
  assert.strictEqual(calculateLevel(450), 3);
  assert.strictEqual(calculateLevel(799), 3);
});

runTest('Level 4: 800 - 1,499 XP', () => {
  assert.strictEqual(calculateLevel(800), 4);
  assert.strictEqual(calculateLevel(1200), 4);
  assert.strictEqual(calculateLevel(1499), 4);
});

runTest('Level 5: 1,500 - 2,499 XP', () => {
  assert.strictEqual(calculateLevel(1500), 5);
  assert.strictEqual(calculateLevel(2499), 5);
});

runTest('Level 6: 2,500 - 3,999 XP', () => {
  assert.strictEqual(calculateLevel(2500), 6);
  assert.strictEqual(calculateLevel(3999), 6);
});

runTest('Level 7: 4,000 - 5,999 XP', () => {
  assert.strictEqual(calculateLevel(4000), 7);
  assert.strictEqual(calculateLevel(5999), 7);
});

runTest('Level 8: 6,000 - 8,499 XP', () => {
  assert.strictEqual(calculateLevel(6000), 8);
  assert.strictEqual(calculateLevel(8499), 8);
});

runTest('Level 9: 8,500 - 11,999 XP', () => {
  assert.strictEqual(calculateLevel(8500), 9);
  assert.strictEqual(calculateLevel(11999), 9);
});

runTest('Level 10: 12,000+ XP (Maarif Zirvesi)', () => {
  assert.strictEqual(calculateLevel(12000), 10);
  assert.strictEqual(calculateLevel(15000), 10);
});

runTest('calculateNextLevelXP correctly determines thresholds for levels and XP', () => {
  assert.strictEqual(calculateNextLevelXP(0), 100);
  assert.strictEqual(calculateNextLevelXP(1), 100);
  assert.strictEqual(calculateNextLevelXP(2), 350);
  assert.strictEqual(calculateNextLevelXP(3), 800);
  assert.strictEqual(calculateNextLevelXP(4), 1500);
  assert.strictEqual(calculateNextLevelXP(5), 2500);
  assert.strictEqual(calculateNextLevelXP(6), 4000);
  assert.strictEqual(calculateNextLevelXP(7), 6000);
  assert.strictEqual(calculateNextLevelXP(8), 8500);
  assert.strictEqual(calculateNextLevelXP(9), 12000);
  assert.strictEqual(calculateNextLevelXP(10), 16000);
  assert.strictEqual(calculateNextLevelXP(11), 20000);
  // Passed as total XP
  assert.strictEqual(calculateNextLevelXP(450), 800); // 450 XP is Level 3 -> next level is Level 4 (800 XP)
  assert.strictEqual(calculateNextLevelXP(12500), 16000); // 12500 XP is Level 10 -> next level is Level 11 (16000 XP)
});

runTest('xpToNextLevel calculates correct progress for 450 XP', () => {
  const { current, needed, progress } = xpToNextLevel(450);
  // Level 3 base is 350, next is 800, needed = 450, current = 100
  assert.strictEqual(current, 100);
  assert.strictEqual(needed, 450);
  assert(Math.abs(progress - (100 / 450)) < 0.001);
});

runTest('Disciplined base question XP (2-3 XP) across difficulties', () => {
  assert.strictEqual(getXPForDifficulty(1), 2);
  assert.strictEqual(getXPForDifficulty(2), 3);
  assert.strictEqual(getXPForDifficulty(3), 4);
});

runTest('Clamped quiz maximum XP (50 XP max)', () => {
  assert.strictEqual(MAX_XP_PER_QUIZ, 50);
});

// -------------------------------------------------------------
// Suite 2: Duel Room Code Generation & Question Compilation
// -------------------------------------------------------------
console.log('\n--- 2. Testing Duel Room Code Generation & MEB Questions ---');

runTest('generateDuelRoomCode creates authentic COG-XXX pattern', () => {
  const pattern = /^COG-[2-9A-Z]{3}$/;
  for (let i = 0; i < 50; i++) {
    const code = generateDuelRoomCode();
    assert(pattern.test(code), `Code "${code}" does not match COG-XXX pattern`);
  }
});

runTest('normalizeDuelRoomCode handles lowercase and missing prefixes', () => {
  assert.strictEqual(normalizeDuelRoomCode('842'), 'COG-842');
  assert.strictEqual(normalizeDuelRoomCode('cog-842'), 'COG-842');
  assert.strictEqual(normalizeDuelRoomCode('  COG-319  '), 'COG-319');
});

runTest('compileDuelQuestions compiles 5 authentic MEB questions with outcomes', () => {
  const subjectsToTest = ['matematik', 'fizik', 'kimya', 'biyoloji', 'edebiyat', 'karma'];

  for (const sub of subjectsToTest) {
    const questions = compileDuelQuestions(sub);
    assert.strictEqual(questions.length, 5, `Subject ${sub} must compile exactly 5 questions`);
    for (const q of questions) {
      assert(q.questionText && q.questionText.length > 5, 'Question text must be populated');
      assert(Array.isArray(q.options) && q.options.length >= 4, 'Question must have at least 4 options');
      assert(typeof q.correctAnswer === 'number', 'Correct answer index must be number');
      assert(q.learningOutcomeCode && q.learningOutcomeCode.length >= 5, 'Must have MEB outcome code');
    }
  }
});

// -------------------------------------------------------------
// Suite 3: Score Calculation with 30s Speed Bonus
// -------------------------------------------------------------
console.log('\n--- 3. Testing Score Calculation & Speed Bonus ---');

runTest('Instant answer (30s remaining) gets max 50 speed bonus = 150 points', () => {
  const res = calculateDuelAnswerScore(true, 30);
  assert.strictEqual(res.isCorrect, true);
  assert.strictEqual(res.basePoints, 100);
  assert.strictEqual(res.speedBonus, 50);
  assert.strictEqual(res.totalPoints, 150);
});

runTest('Halfway answer (15s remaining) gets 25 speed bonus = 125 points', () => {
  const res = calculateDuelAnswerScore(true, 15);
  assert.strictEqual(res.isCorrect, true);
  assert.strictEqual(res.basePoints, 100);
  assert.strictEqual(res.speedBonus, 25);
  assert.strictEqual(res.totalPoints, 125);
});

runTest('Last-second answer (0s remaining) gets 0 speed bonus = 100 points', () => {
  const res = calculateDuelAnswerScore(true, 0);
  assert.strictEqual(res.isCorrect, true);
  assert.strictEqual(res.basePoints, 100);
  assert.strictEqual(res.speedBonus, 0);
  assert.strictEqual(res.totalPoints, 100);
});

runTest('Incorrect or empty answer gets 0 points', () => {
  const resWrong = calculateDuelAnswerScore(false, 28);
  assert.strictEqual(resWrong.isCorrect, false);
  assert.strictEqual(resWrong.totalPoints, 0);
  assert.strictEqual(resWrong.speedBonus, 0);
});

// -------------------------------------------------------------
// Suite 4: Bot Protection Threshold at 0.5s
// -------------------------------------------------------------
console.log('\n--- 4. Testing Bot Protection Threshold at 0.5s ---');

runTest('MIN_SECONDS_PER_QUESTION is calibrated to 0.5s', () => {
  assert.strictEqual(MIN_SECONDS_PER_QUESTION, 0.5);
});

runTest('Non-human script spam (< 0.5s per question) is strictly blocked', () => {
  const token = generateQuizSessionToken({
    sessionId: 'test-bot-001',
    userId: 'bot-student',
    topicId: 'mat-u1-t1',
    questionCount: 10,
    mode: 'challenge',
  });

  // Cheater submits 10 questions in 3 seconds (0.3s each < 0.5s)
  const result = validateQuizSubmission({
    sessionToken: token,
    topicId: 'mat-u1-t1',
    score: 10,
    questionCount: 10,
    timeSpentSec: 3,
    answers: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1],
  });

  assert.strictEqual(result.valid, false);
  assert.strictEqual(result.code, 'SPEED_HACK');
});

runTest('Ultra-fast legitimate reader (>= 0.5s per question) is permitted', () => {
  const fakeOldPayload = {
    sessionId: 'test-fast-human-001',
    userId: 'fast-student',
    topicId: 'mat-u1-t1',
    questionCount: 6,
    mode: 'challenge' as const,
    issuedAt: Date.now() - 10000, // 10 seconds ago
    nonce: 'fast-nonce-999',
  };
  const payloadStr = JSON.stringify(fakeOldPayload);
  const encodedPayload = Buffer.from(payloadStr).toString('base64url');
  const secret = process.env.SECURITY_HMAC_SECRET || 'cognito-ac-secret-meb-2026-auth';
  const sig = hmacSha256(secret, encodedPayload);
  const token = `${encodedPayload}.${sig}`;

  // 6 questions answered in 4.5 seconds (0.75s per question > 0.5s)
  const result = validateQuizSubmission({
    sessionToken: token,
    topicId: 'mat-u1-t1',
    score: 6,
    questionCount: 6,
    timeSpentSec: 4.5,
    answers: [0, 1, 2, 3, 0, 1],
  });

  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.code, 'OK');
  // 6 questions * 3 XP + 5 perfect bonus = 23 XP
  assert.strictEqual(result.verifiedXp, 23);
});

// -------------------------------------------------------------
// Suite 5: Duel Store Actions & Automatic Mistake Routing
// -------------------------------------------------------------
console.log('\n--- 5. Testing Duel Actions & Mistake Routing to Akilli Hata Defteri ---');

runTest('useUserStore can create and join duel room', () => {
  const store = useUserStore.getState();
  const room = store.createDuelRoom({ subjectSlug: 'matematik' });

  assert(room.id, 'Room ID must be defined');
  assert(room.code.startsWith('COG-'), 'Room code must start with COG-');
  assert.strictEqual(room.questions.length, 5, 'Must have 5 questions');
  assert.strictEqual(room.status, 'waiting');

  // Join the newly created room
  const joinRes = store.joinDuelRoom(room.code);
  assert.strictEqual(joinRes.success, true);
});

runTest('Automatic mistake routing sends wrong/blank questions to mistakeVault', () => {
  const store = useUserStore.getState();
  const room = store.createDuelRoom({ subjectSlug: 'fizik' });

  const initialMistakeCount = store.mistakeVault.length;

  // Student answers: Q0 wrong, Q1 correct, Q2 empty/blank, Q3 correct, Q4 correct
  const correctQ0 = room.questions[0].correctAnswer;
  const wrongAnswerQ0 = (correctQ0 + 1) % 4;
  const userAnswers: (number | null)[] = [
    wrongAnswerQ0,
    room.questions[1].correctAnswer,
    null, // Blank
    room.questions[3].correctAnswer,
    room.questions[4].correctAnswer,
  ];

  const recordedCount = store.recordMistakesFromDuel(room, userAnswers);

  assert.strictEqual(recordedCount, 2, 'Exactly 2 mistakes must be identified and recorded');

  const updatedVault = useUserStore.getState().mistakeVault;
  assert.strictEqual(
    updatedVault.length,
    initialMistakeCount + 2,
    'Vault must contain 2 additional mistake records'
  );

  const recordedDuelMistakes = updatedVault.filter((m) => m.source === 'duel');
  assert(recordedDuelMistakes.length >= 2, 'Must have recorded duel mistakes');
  assert(
    recordedDuelMistakes.some((m) => m.questionId === room.questions[0].id),
    'Q0 must be present in mistake vault'
  );
  assert(
    recordedDuelMistakes.some((m) => m.questionId === room.questions[2].id),
    'Q2 (blank) must be present in mistake vault'
  );
});

runTest('finishDuel awards +15 XP for winner and +10 clan league points', () => {
  const store = useUserStore.getState();
  const initialXP = store.user.totalXP;
  const initialClanXP = store.user.clanContributionXP || 0;

  // Set up an active duel with winning score
  const room = store.createDuelRoom({ subjectSlug: 'kimya' });
  useUserStore.setState({
    activeDuel: {
      ...room,
      hostUserId: store.user.id,
      hostScore: 500,
      guestScore: 300,
      hostAnswers: [0, 1, 2, 3, 0],
    },
  });

  const summary = store.finishDuel(room.id);

  assert.strictEqual(summary.winner, store.user.id, 'User must be winner');
  assert.strictEqual(summary.xpEarned, 15, 'Winner must earn 15 XP');
  assert.strictEqual(summary.clanPointsEarned, 10, 'Winner must earn 10 clan league points');

  const finalUser = useUserStore.getState().user;
  assert.strictEqual(finalUser.totalXP, initialXP + 15, 'Total XP must increase by 15');
  assert.strictEqual(
    finalUser.clanContributionXP,
    initialClanXP + 10,
    'Clan contribution must increase by 10'
  );

  // Calling finishDuel again on completed room MUST be idempotent (no duplicate XP)
  const secondSummary = store.finishDuel(room.id);
  assert.strictEqual(secondSummary.xpEarned, 15);
  const userAfterDuplicate = useUserStore.getState().user;
  assert.strictEqual(userAfterDuplicate.totalXP, finalUser.totalXP, 'Calling finishDuel twice must not grant duplicate XP');
});

runTest('setActiveDuel sets store state and allows submitDuelAnswer without crashing', () => {
  const store = useUserStore.getState();
  const testRoom = store.createDuelRoom({ subjectSlug: 'biyoloji' });
  store.setActiveDuel(testRoom);

  assert.strictEqual(useUserStore.getState().activeDuel?.id, testRoom.id);
  const ansResult = store.submitDuelAnswer(0, testRoom.questions[0].correctAnswer, 20);
  assert.strictEqual(ansResult.isCorrect, true);
  assert(ansResult.points > 100, 'Score must include speed bonus');
});

runTest('Supabase schema.sql includes duel_rooms and mistake_vault source duel check', () => {
  const fs = require('fs');
  const path = require('path');
  const schemaPath = path.resolve(process.cwd(), 'supabase', 'schema.sql');
  const content = fs.readFileSync(schemaPath, 'utf8');

  assert(content.includes('CREATE TABLE IF NOT EXISTS public.duel_rooms'), 'duel_rooms table must exist in schema');
  assert(content.includes("'duel'"), 'mistake_vault source check constraint must include duel');
  assert(content.includes('id TEXT PRIMARY KEY'), 'duel_rooms id must be TEXT PRIMARY KEY to accommodate room and duel string IDs');
});

console.log('================================================================');
console.log(`[RESULTS] All ${passedTests}/${totalTests} tests passed successfully!`);
console.log('================================================================\n');
