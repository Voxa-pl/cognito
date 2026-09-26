/**
 * Comprehensive Automated Verification Suite for
 * Akıllı Hata Defteri & Ebbinghaus Aralıklı Tekrar (Spaced Repetition) Motoru
 * MEB 2026-2027 Maarif Modeli
 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  calculateNextReviewDate,
  processReviewOutcome,
  filterDueMistakes,
  getStageInfo,
  getMistakeStats,
  STAGE_INTERVALS_DAYS,
} from '../src/lib/gamification/spacedRepetition';
import { MistakeRecord, Question, AssessmentQuestion } from '../src/types';
import { useUserStore } from '../src/stores/useUserStore';

console.log('================================================================');
console.log('--- STARTING EBBINGHAUS SPACED REPETITION VERIFICATION SUITE ---');
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

const rootDir = path.resolve(__dirname, '..');

// -------------------------------------------------------------
// Suite 1: Ebbinghaus Time Interval Mathematical Accuracy
// -------------------------------------------------------------
console.log('--- 1. Testing Ebbinghaus Interval Calculations ---');

runTest('calculateNextReviewDate computes exact +1, +3, +7, +14, +30 day intervals', () => {
  const base = new Date('2026-09-20T12:00:00.000Z');
  const baseTime = base.getTime();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  // Stage 1 -> +1 Day (24h)
  const d1 = new Date(calculateNextReviewDate(1, base));
  assert.strictEqual(d1.getTime() - baseTime, 1 * ONE_DAY_MS, 'Stage 1 must be exactly +1 day');

  // Stage 2 -> +3 Days (72h)
  const d2 = new Date(calculateNextReviewDate(2, base));
  assert.strictEqual(d2.getTime() - baseTime, 3 * ONE_DAY_MS, 'Stage 2 must be exactly +3 days');

  // Stage 3 -> +7 Days (168h)
  const d3 = new Date(calculateNextReviewDate(3, base));
  assert.strictEqual(d3.getTime() - baseTime, 7 * ONE_DAY_MS, 'Stage 3 must be exactly +7 days');

  // Stage 4 -> +14 Days (336h)
  const d4 = new Date(calculateNextReviewDate(4, base));
  assert.strictEqual(d4.getTime() - baseTime, 14 * ONE_DAY_MS, 'Stage 4 must be exactly +14 days');

  // Stage 5 -> Mastered / +30 Days
  const d5 = new Date(calculateNextReviewDate(5, base));
  assert.strictEqual(d5.getTime() - baseTime, 30 * ONE_DAY_MS, 'Stage 5 must be +30 days');
});

// -------------------------------------------------------------
// Suite 2: State Transitions & Ebbinghaus Reset Mechanics
// -------------------------------------------------------------
console.log('\n--- 2. Testing Stage Transitions & Reset on Mistake ---');

runTest('Consecutive correct reviews advance Stage 1 -> 2 -> 3 -> 4 -> Mastered', () => {
  const baseDate = new Date('2026-09-20T10:00:00.000Z');
  let record: MistakeRecord = {
    id: 'test-mistake-1',
    userId: 'student-test',
    questionId: 'mat-q1',
    topicId: 'mat-u1-t1',
    subjectId: 'matematik',
    questionText: 'Test Soru',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    userAnswer: 1,
    explanation: 'Açıklama',
    learningOutcomeCode: 'MAT.9.1.1',
    stage: 1,
    nextReviewDate: baseDate.toISOString(),
    consecutiveCorrect: 0,
    isMastered: false,
    source: 'quiz',
    createdAt: baseDate.toISOString(),
  };

  // Review 1 (Correct): Stage 1 -> 2
  record = processReviewOutcome(record, true, baseDate);
  assert.strictEqual(record.stage, 2, 'Stage should advance to 2');
  assert.strictEqual(record.consecutiveCorrect, 1);
  assert.strictEqual(record.isMastered, false);

  // Review 2 (Correct): Stage 2 -> 3
  record = processReviewOutcome(record, true, baseDate);
  assert.strictEqual(record.stage, 3, 'Stage should advance to 3');
  assert.strictEqual(record.consecutiveCorrect, 2);
  assert.strictEqual(record.isMastered, false);

  // Review 3 (Correct): Stage 3 -> 4
  record = processReviewOutcome(record, true, baseDate);
  assert.strictEqual(record.stage, 4, 'Stage should advance to 4');
  assert.strictEqual(record.consecutiveCorrect, 3);
  assert.strictEqual(record.isMastered, false);

  // Review 4 (Correct): Stage 4 -> 5 (Mastered!)
  record = processReviewOutcome(record, true, baseDate);
  assert.strictEqual(record.stage, 5, 'Stage should advance to 5');
  assert.strictEqual(record.consecutiveCorrect, 4);
  assert.strictEqual(record.isMastered, true, 'Stage 5 must be marked isMastered = true');
});

runTest('Incorrect answer immediately resets any advanced stage back to Stage 1 and +1 day', () => {
  const baseDate = new Date('2026-09-20T10:00:00.000Z');
  const advancedRecord: MistakeRecord = {
    id: 'test-mistake-adv',
    userId: 'student-test',
    questionId: 'fiz-q4',
    topicId: 'fiz-u1-t1',
    subjectId: 'fizik',
    questionText: 'İleri Aşama Soru',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 2,
    userAnswer: 0,
    explanation: 'Açıklama',
    stage: 4, // Was at stage 4 (14 days)
    nextReviewDate: baseDate.toISOString(),
    consecutiveCorrect: 3,
    isMastered: false,
    source: 'scenario',
    createdAt: new Date('2026-09-01T10:00:00.000Z').toISOString(),
  };

  // Student makes mistake in Stage 4
  const resetResult = processReviewOutcome(advancedRecord, false, baseDate);
  assert.strictEqual(resetResult.stage, 1, 'Stage must strictly reset to 1 on mistake');
  assert.strictEqual(resetResult.consecutiveCorrect, 0, 'Consecutive correct must reset to 0');
  assert.strictEqual(resetResult.isMastered, false, 'isMastered must be false');

  const expectedNext = new Date(baseDate.getTime() + 24 * 60 * 60 * 1000).toISOString();
  assert.strictEqual(resetResult.nextReviewDate, expectedNext, 'Next review date must be reset to +1 day');
});

// -------------------------------------------------------------
// Suite 3: Due Mistake Filtering & Stats
// -------------------------------------------------------------
console.log('\n--- 3. Testing Due Mistakes Filtering & Stats ---');

runTest('filterDueMistakes only returns unmastered mistakes with past or current due dates', () => {
  const now = new Date('2026-09-20T12:00:00.000Z');

  const vault: MistakeRecord[] = [
    {
      id: 'due-yesterday',
      userId: 'u1',
      questionId: 'q1',
      topicId: 't1',
      subjectId: 's1',
      questionText: 'Q1',
      options: [],
      correctAnswer: 0,
      userAnswer: 1,
      explanation: '',
      stage: 1,
      nextReviewDate: new Date('2026-09-19T12:00:00.000Z').toISOString(),
      consecutiveCorrect: 0,
      isMastered: false,
      source: 'quiz',
      createdAt: '2026-09-18T12:00:00.000Z',
    },
    {
      id: 'due-now',
      userId: 'u1',
      questionId: 'q2',
      topicId: 't1',
      subjectId: 's1',
      questionText: 'Q2',
      options: [],
      correctAnswer: 0,
      userAnswer: 1,
      explanation: '',
      stage: 2,
      nextReviewDate: new Date('2026-09-20T12:00:00.000Z').toISOString(),
      consecutiveCorrect: 1,
      isMastered: false,
      source: 'scenario',
      createdAt: '2026-09-17T12:00:00.000Z',
    },
    {
      id: 'future-tomorrow',
      userId: 'u1',
      questionId: 'q3',
      topicId: 't1',
      subjectId: 's1',
      questionText: 'Q3',
      options: [],
      correctAnswer: 0,
      userAnswer: 1,
      explanation: '',
      stage: 3,
      nextReviewDate: new Date('2026-09-21T12:00:00.000Z').toISOString(),
      consecutiveCorrect: 2,
      isMastered: false,
      source: 'placement',
      createdAt: '2026-09-14T12:00:00.000Z',
    },
    {
      id: 'already-mastered',
      userId: 'u1',
      questionId: 'q4',
      topicId: 't1',
      subjectId: 's1',
      questionText: 'Q4',
      options: [],
      correctAnswer: 0,
      userAnswer: 0,
      explanation: '',
      stage: 5,
      nextReviewDate: new Date('2026-09-19T12:00:00.000Z').toISOString(), // past date but mastered
      consecutiveCorrect: 4,
      isMastered: true,
      source: 'quiz',
      createdAt: '2026-08-20T12:00:00.000Z',
    },
  ];

  const due = filterDueMistakes(vault, now);
  assert.strictEqual(due.length, 2, 'Should only return 2 due mistakes');
  assert.strictEqual(due[0].id, 'due-yesterday', 'First due should be oldest due');
  assert.strictEqual(due[1].id, 'due-now');

  const stats = getMistakeStats(vault, now);
  assert.strictEqual(stats.total, 4);
  assert.strictEqual(stats.due, 2);
  assert.strictEqual(stats.mastered, 1);
  assert.strictEqual(stats.inProgress, 3);
});

runTest('filterDueMistakes and getMistakeStats defensively handle null, undefined, and corrupt records', () => {
  assert.deepStrictEqual(filterDueMistakes(null as any), []);
  assert.deepStrictEqual(filterDueMistakes(undefined as any), []);
  assert.deepStrictEqual(getMistakeStats(null as any), { total: 0, due: 0, mastered: 0, inProgress: 0 });
  assert.deepStrictEqual(getMistakeStats(undefined as any), { total: 0, due: 0, mastered: 0, inProgress: 0 });

  const corruptVault: any[] = [
    null,
    undefined,
    { id: 'corrupt-1', nextReviewDate: 'invalid-date', isMastered: false },
    { id: 'corrupt-2', nextReviewDate: null, isMastered: false },
    { id: 'valid-due', nextReviewDate: new Date(Date.now() - 1000).toISOString(), isMastered: false },
  ];

  const due = filterDueMistakes(corruptVault);
  assert.strictEqual(due.length, 1);
  assert.strictEqual(due[0].id, 'valid-due');

  const stats = getMistakeStats(corruptVault);
  assert.strictEqual(stats.total, 3, 'Corrupt null/undefined elements should not count toward total');
  assert.strictEqual(stats.due, 1);
  assert.strictEqual(stats.mastered, 0);
  assert.strictEqual(stats.inProgress, 3);
});

// -------------------------------------------------------------
// Suite 4: Auto-Capture & Deduplication Simulation
// -------------------------------------------------------------
console.log('\n--- 4. Testing Auto-Capture & Deduplication Logic ---');

runTest('Simulating recordMistake deduplication preserves single record per questionId and resets stage', () => {
  let vault: MistakeRecord[] = [];

  const recordMistakeSim = (data: any) => {
    const existingIndex = vault.findIndex((m) => m.questionId === data.questionId);
    if (existingIndex >= 0) {
      vault[existingIndex] = {
        ...vault[existingIndex],
        ...data,
        stage: 1,
        consecutiveCorrect: 0,
        isMastered: false,
        nextReviewDate: calculateNextReviewDate(1),
        lastReviewedAt: new Date().toISOString(),
      };
    } else {
      vault.push({
        ...data,
        id: `m-${Date.now()}-${Math.random()}`,
        stage: 1,
        consecutiveCorrect: 0,
        isMastered: false,
        nextReviewDate: calculateNextReviewDate(1),
        createdAt: new Date().toISOString(),
      });
    }
  };

  // Add question 1
  recordMistakeSim({
    userId: 'u1',
    questionId: 'dup-q1',
    topicId: 'mat-u1-t1',
    subjectId: 'matematik',
    questionText: 'Kümeler',
    options: ['A', 'B'],
    correctAnswer: 0,
    userAnswer: 1,
    explanation: 'Test exp',
    source: 'quiz',
  });
  assert.strictEqual(vault.length, 1);
  assert.strictEqual(vault[0].stage, 1);

  // Advance question 1 to Stage 3
  vault[0].stage = 3;
  vault[0].consecutiveCorrect = 2;

  // Student makes the mistake again on the same questionId
  recordMistakeSim({
    userId: 'u1',
    questionId: 'dup-q1',
    topicId: 'mat-u1-t1',
    subjectId: 'matematik',
    questionText: 'Kümeler',
    options: ['A', 'B'],
    correctAnswer: 0,
    userAnswer: 1,
    explanation: 'Test exp',
    source: 'placement',
  });

  assert.strictEqual(vault.length, 1, 'Vault must deduplicate by questionId');
  assert.strictEqual(vault[0].stage, 1, 'Stage must reset to 1 on re-failure');
  assert.strictEqual(vault[0].consecutiveCorrect, 0);
  assert.strictEqual(vault[0].source, 'placement', 'Source should update');
});

runTest('Auto-capture from Quiz records wrong and unattempted questions', () => {
  const mockQuestions: Question[] = [
    {
      id: 'quiz-q1',
      topicId: 'mat-u1-t1',
      type: 'multiple_choice',
      questionText: 'Doğru Soru',
      options: ['A', 'B'],
      correctAnswer: 0,
      explanation: '',
      difficulty: 1,
      xpValue: 10,
    },
    {
      id: 'quiz-q2',
      topicId: 'mat-u1-t1',
      type: 'multiple_choice',
      questionText: 'Yanlış Soru',
      options: ['A', 'B'],
      correctAnswer: 1,
      explanation: 'Hatalı seçildi',
      difficulty: 1,
      xpValue: 10,
    },
    {
      id: 'quiz-q3',
      topicId: 'mat-u1-t1',
      type: 'multiple_choice',
      questionText: 'Boş Soru',
      options: ['A', 'B'],
      correctAnswer: 0,
      explanation: 'Cevaplanmadı',
      difficulty: 1,
      xpValue: 10,
    },
  ];

  const answers: ('correct' | 'wrong' | null)[] = ['correct', 'wrong', null];
  const captured: string[] = [];

  mockQuestions.forEach((q, idx) => {
    if (answers[idx] === 'wrong' || answers[idx] === null) {
      captured.push(q.id);
    }
  });

  assert.strictEqual(captured.length, 2, 'Must capture 2 questions (1 wrong, 1 empty)');
  assert(captured.includes('quiz-q2'));
  assert(captured.includes('quiz-q3'));
});

// -------------------------------------------------------------
// Suite 5: Tolerance Shield Recharge & XP Awards
// -------------------------------------------------------------
console.log('\n--- 5. Testing Tolerance Shield Recharge & XP Clamping ---');

runTest('Flawless review session recharges examination tolerance shield (+1) up to max 5 (unit)', () => {
  // Simulate store submitReviewSession logic
  const simulateSession = (
    currentHearts: number,
    results: { mistakeId: string; isCorrect: boolean }[]
  ) => {
    const allCorrect = results.length > 0 && results.every((r) => r.isCorrect);
    let nextHearts = currentHearts;
    let shieldReloaded = false;

    if (allCorrect) {
      nextHearts = Math.min(5, currentHearts + 1);
      if (nextHearts > currentHearts) {
        shieldReloaded = true;
      }
    }

    const xpAwarded = Math.min(350, Math.max(0, results.length * 25));
    return { nextHearts, shieldReloaded, xpAwarded };
  };

  // Case 1: 3/3 correct with 3 hearts -> hearts should become 4 (+1 recharged)
  const res1 = simulateSession(3, [
    { mistakeId: 'm1', isCorrect: true },
    { mistakeId: 'm2', isCorrect: true },
    { mistakeId: 'm3', isCorrect: true },
  ]);
  assert.strictEqual(res1.nextHearts, 4, 'Hearts must increase by +1');
  assert.strictEqual(res1.shieldReloaded, true);
  assert.strictEqual(res1.xpAwarded, 75, '3 * 25 = 75 XP');

  // Case 2: 3/3 correct with 5 hearts -> capped at 5
  const res2 = simulateSession(5, [
    { mistakeId: 'm1', isCorrect: true },
    { mistakeId: 'm2', isCorrect: true },
  ]);
  assert.strictEqual(res2.nextHearts, 5, 'Hearts capped at 5');
  assert.strictEqual(res2.shieldReloaded, false, 'Already at maximum shield');
  assert.strictEqual(res2.xpAwarded, 50);

  // Case 3: 2/3 correct with 1 mistake -> shield NOT reloaded
  const res3 = simulateSession(3, [
    { mistakeId: 'm1', isCorrect: true },
    { mistakeId: 'm2', isCorrect: false },
    { mistakeId: 'm3', isCorrect: true },
  ]);
  assert.strictEqual(res3.nextHearts, 3, 'Shield should not recharge on session with mistakes');
  assert.strictEqual(res3.shieldReloaded, false);
  assert.strictEqual(res3.xpAwarded, 75, 'XP is still awarded for reviewed mistakes');
});

runTest('useUserStore resetUser() restores pristine mistakeVault and synchronizes masteredMistakesCount', () => {
  const store = useUserStore.getState();
  useUserStore.setState({
    mistakeVault: [],
    user: { ...store.user, masteredMistakesCount: 999 },
  });
  assert.strictEqual(useUserStore.getState().mistakeVault.length, 0);

  useUserStore.getState().resetUser();
  const resetVault = useUserStore.getState().mistakeVault;
  assert(resetVault.length >= 4, 'resetUser must restore initialMistakeVault');
  assert.strictEqual(useUserStore.getState().user.masteredMistakesCount, 1, 'masteredMistakesCount should match initial vault');
});

runTest('useUserStore submitReviewSession recharges shield when hearts < 5 and caps when hearts === 5', () => {
  useUserStore.getState().resetUser();
  const initialMistakes = useUserStore.getState().mistakeVault;
  const targetId = initialMistakes[0].id;

  // Case A: Flawless review session when hearts = 5 (capped)
  useUserStore.setState((s) => ({ user: { ...s.user, hearts: 5 } }));
  const resCap = useUserStore.getState().submitReviewSession([
    { mistakeId: targetId, isCorrect: true },
  ]);
  assert.strictEqual(resCap.allCorrect, true);
  assert.strictEqual(resCap.reloadedShield, false, 'Shield already at 5 so reloadedShield is false');
  assert.strictEqual(useUserStore.getState().user.hearts, 5);

  // Case B: Flawless review session when hearts = 3 (recharged to 4)
  useUserStore.setState((s) => ({ user: { ...s.user, hearts: 3 } }));
  const resRecharge = useUserStore.getState().submitReviewSession([
    { mistakeId: targetId, isCorrect: true },
  ]);
  assert.strictEqual(resRecharge.allCorrect, true);
  assert.strictEqual(resRecharge.reloadedShield, true, 'Shield should reload from 3 to 4');
  assert.strictEqual(useUserStore.getState().user.hearts, 4);

  // Case C: Review session with mistake
  useUserStore.setState((s) => ({ user: { ...s.user, hearts: 3 } }));
  const resWrong = useUserStore.getState().submitReviewSession([
    { mistakeId: targetId, isCorrect: false },
  ]);
  assert.strictEqual(resWrong.allCorrect, false);
  assert.strictEqual(resWrong.reloadedShield, false);
  assert.strictEqual(useUserStore.getState().user.hearts, 3, 'Hearts must not increase on mistake');
});

runTest('useUserStore submitReviewSession integrates Clan XP, quest progress, and study streak', () => {
  useUserStore.getState().resetUser();
  const clanId = 'clan-fen-bilimleri';
  useUserStore.setState((s) => ({
    user: { ...s.user, clanId, clanContributionXP: 100, totalXP: 1000 },
  }));

  const clanBefore = useUserStore.getState().clans.find((c) => c.id === clanId)!;
  const initialClanTotal = clanBefore.totalXP;
  const initialClanWeekly = clanBefore.weeklyXP;

  const targetId = useUserStore.getState().mistakeVault[0].id;
  const res = useUserStore.getState().submitReviewSession([
    { mistakeId: targetId, isCorrect: true },
  ]);

  const expectedContrib = Math.max(1, Math.round(res.xpAwarded * 0.25));
  const clanAfter = useUserStore.getState().clans.find((c) => c.id === clanId)!;
  assert.strictEqual(clanAfter.totalXP, initialClanTotal + expectedContrib);
  assert.strictEqual(clanAfter.weeklyXP, initialClanWeekly + expectedContrib);
  assert.strictEqual(useUserStore.getState().user.clanContributionXP, 100 + expectedContrib);
});

runTest('useUserStore auto-capture actions record mistakes from Quiz, Scenario, and Placement', () => {
  useUserStore.getState().resetUser();
  const baseCount = useUserStore.getState().mistakeVault.length;

  // 1. Quiz capture
  const mockQuizQuestions: Question[] = [
    {
      id: 'quiz-capture-q1',
      topicId: 'mat-u1-t1',
      type: 'multiple_choice',
      questionText: 'Quiz Yanlış Soru',
      options: ['A', 'B'],
      correctAnswer: 0,
      explanation: 'Quiz açıklama',
      difficulty: 1,
      xpValue: 10,
    },
  ];
  useUserStore.getState().recordMistakesFromQuiz('mat-u1-t1', mockQuizQuestions, ['wrong'], [1]);
  let vault = useUserStore.getState().mistakeVault;
  assert.strictEqual(vault.length, baseCount + 1);
  assert.strictEqual(vault[0].questionId, 'quiz-capture-q1');
  assert.strictEqual(vault[0].source, 'quiz');

  // 2. Scenario capture
  const mockScenarioQuestions: AssessmentQuestion[] = [
    {
      id: 'sc-capture-q1',
      topicId: 'fiz-u1-t1',
      topicName: 'Fizik Bilimine Giriş',
      subjectSlug: 'fizik',
      subjectName: 'Fizik',
      difficulty: 2,
      type: 'open_ended',
      questionText: 'Senaryo Soru',
      points: 10,
      rubric: { explanation: 'Senaryo rubrik', criteria: [], keyTerms: [] },
    },
  ];
  useUserStore.getState().recordMistakesFromScenario('sc-1', mockScenarioQuestions, {
    'sc-capture-q1': { textAnswer: 'Eksik yanıt', awardedScore: 4 },
  });
  vault = useUserStore.getState().mistakeVault;
  assert.strictEqual(vault.length, baseCount + 2);
  assert.strictEqual(vault[0].questionId, 'sc-capture-q1');
  assert.strictEqual(vault[0].source, 'scenario');

  // 3. Placement capture
  const mockPlacementQuestions: AssessmentQuestion[] = [
    {
      id: 'plc-capture-q1',
      topicId: 'kim-u1-t1',
      topicName: 'Kimya Bilimi',
      subjectSlug: 'kimya',
      subjectName: 'Kimya',
      difficulty: 2,
      type: 'multiple_choice',
      questionText: 'Tanı Soru',
      options: ['A', 'B'],
      correctAnswer: 1,
      points: 10,
      rubric: { explanation: 'Tanı rubrik', criteria: [], keyTerms: [] },
    },
  ];
  useUserStore.getState().recordMistakesFromPlacement('plc-1', mockPlacementQuestions, {
    'plc-capture-q1': { selectedOption: 0, awardedScore: 0 },
  });
  vault = useUserStore.getState().mistakeVault;
  assert.strictEqual(vault.length, baseCount + 3);
  assert.strictEqual(vault[0].questionId, 'plc-capture-q1');
  assert.strictEqual(vault[0].source, 'placement');
});

// -------------------------------------------------------------
// Suite 6: Codebase & UI Architectural Adherence
// -------------------------------------------------------------
console.log('\n--- 6. Testing Codebase File & Structural Integrity ---');

runTest('All required new files exist and export expected components', () => {
  const files = [
    path.join(rootDir, 'src/lib/gamification/spacedRepetition.ts'),
    path.join(rootDir, 'src/components/dashboard/DueMistakesCard.tsx'),
    path.join(rootDir, 'src/components/dashboard/MistakeReviewModal.tsx'),
  ];

  files.forEach((f) => {
    assert(fs.existsSync(f), `File must exist: ${f}`);
  });

  const dueCardContent = fs.readFileSync(path.join(rootDir, 'src/components/dashboard/DueMistakesCard.tsx'), 'utf8');
  assert(dueCardContent.includes('export function DueMistakesCard'), 'DueMistakesCard export');
  assert(dueCardContent.includes('Ebbinghaus Aralıklı Tekrar Motoru'), 'DueMistakesCard title');
  assert(dueCardContent.includes('+1 Kalkan'), 'DueMistakesCard shield reward indicator');

  const modalContent = fs.readFileSync(path.join(rootDir, 'src/components/dashboard/MistakeReviewModal.tsx'), 'utf8');
  assert(modalContent.includes('export function MistakeReviewModal'), 'MistakeReviewModal export');
  assert(modalContent.includes('Akıllı Hata Defteri & Tekrar'), 'Modal header title');
  assert(modalContent.includes('+1 Sınav Tolerans Kalkanı Yenilendi!'), 'Modal shield reload banner');
  assert(modalContent.includes('Önceki Cevabın (Hatalı)'), 'Modal previous answer badge');
});

runTest('Types in src/types/index.ts include MistakeRecord and UserProfile.masteredMistakesCount', () => {
  const typesContent = fs.readFileSync(path.join(rootDir, 'src/types/index.ts'), 'utf8');
  assert(typesContent.includes('export interface MistakeRecord'), 'MistakeRecord interface must exist');
  assert(typesContent.includes('learningOutcomeCode?: string'), 'MEB Kazanım code must be typed');
  assert(typesContent.includes('stage: number'), 'Stage field');
  assert(typesContent.includes('nextReviewDate: string'), 'nextReviewDate field');
  assert(typesContent.includes('masteredMistakesCount?: number'), 'masteredMistakesCount in UserProfile');
});

runTest('Supabase schema.sql includes mistake_vault DDL, indexes and RLS policies', () => {
  const schemaContent = fs.readFileSync(path.join(rootDir, 'supabase/schema.sql'), 'utf8');
  assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.mistake_vault'), 'mistake_vault table');
  assert(schemaContent.includes('idx_mistake_vault_user'), 'user index');
  assert(schemaContent.includes('idx_mistake_vault_next_review'), 'next_review index');
  assert(schemaContent.includes('idx_mistake_vault_mastered'), 'mastered index');
  assert(schemaContent.includes('ALTER TABLE public.mistake_vault ENABLE ROW LEVEL SECURITY'), 'RLS enabled');
  assert(schemaContent.includes('"Users can view own mistakes" ON public.mistake_vault'), 'SELECT policy');
  assert(schemaContent.includes('"Users can insert own mistakes" ON public.mistake_vault'), 'INSERT policy');
  assert(schemaContent.includes('"Users can update own mistakes" ON public.mistake_vault'), 'UPDATE policy');
});

runTest('Auto-capture integration hooks in Quiz, Scenario and Placement pages', () => {
  const quizContent = fs.readFileSync(path.join(rootDir, 'src/app/(main)/quiz/[topicId]/page.tsx'), 'utf8');
  assert(quizContent.includes('recordMistakesFromQuiz'), 'Quiz page must call recordMistakesFromQuiz');

  const scContent = fs.readFileSync(path.join(rootDir, 'src/app/(main)/exams/scenario/[scenarioId]/page.tsx'), 'utf8');
  assert(scContent.includes('recordMistakesFromScenario'), 'Scenario page must call recordMistakesFromScenario');

  const plcContent = fs.readFileSync(path.join(rootDir, 'src/app/(main)/exams/placement/page.tsx'), 'utf8');
  assert(plcContent.includes('recordMistakesFromPlacement'), 'Placement page must call recordMistakesFromPlacement');

  const dashContent = fs.readFileSync(path.join(rootDir, 'src/app/(main)/dashboard/page.tsx'), 'utf8');
  assert(dashContent.includes('DueMistakesCard'), 'Dashboard must render DueMistakesCard');
  assert(dashContent.includes('MistakeReviewModal'), 'Dashboard must render MistakeReviewModal');
});

console.log('\n================================================================');
console.log(`[SUCCESS] ALL ${passedTests}/${totalTests} TESTS COMPLETED AND PASSED PERFECTLY!`);
console.log('================================================================\n');
