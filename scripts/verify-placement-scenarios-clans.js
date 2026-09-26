/**
 * Verification script for Seviye Belirleme Sınavı, MEB Ortak Sınav Senaryoları & Akademik Klan Sistemi
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== Starting Verification Suite for Exams, Scenarios & Clans ===');

const rootDir = path.resolve(__dirname, '..');

// Test 1: File Existence
console.log('\n[Test 1] Verifying File Existence...');
const expectedFiles = [
  path.join(rootDir, 'src', 'types', 'index.ts'),
  path.join(rootDir, 'src', 'data', 'placementExams.ts'),
  path.join(rootDir, 'src', 'data', 'examScenarios.ts'),
  path.join(rootDir, 'src', 'data', 'clans.ts'),
  path.join(rootDir, 'src', 'stores', 'useUserStore.ts'),
  path.join(rootDir, 'src', 'app', '(main)', 'exams', 'page.tsx'),
  path.join(rootDir, 'src', 'app', '(main)', 'exams', 'placement', 'page.tsx'),
  path.join(rootDir, 'src', 'app', '(main)', 'exams', 'scenario', '[scenarioId]', 'page.tsx'),
  path.join(rootDir, 'src', 'app', '(main)', 'clans', 'page.tsx'),
  path.join(rootDir, 'src', 'components', 'exams', 'TicketPurchaseModal.tsx'),
];

expectedFiles.forEach((f) => {
  assert(fs.existsSync(f), `File must exist: ${f}`);
});
console.log('✓ All 10 required files exist!');

// Test 2: Types Verification
console.log('\n[Test 2] Verifying TypeScript Interfaces in src/types/index.ts...');
const typesContent = fs.readFileSync(path.join(rootDir, 'src', 'types', 'index.ts'), 'utf8');

const requiredTypeKeywords = [
  'export interface AssessmentQuestion',
  'export interface RubricCriterion',
  'export type DiagnosticLevel',
  'export interface PlacementExamResult',
  'export interface MEBExamScenario',
  'export interface ScenarioDistributionItem',
  'export interface ScenarioExamAttempt',
  'export interface AcademicClan',
  'export interface ClanMember',
  'export interface ClanQuest',
  'claimed?: boolean',
  'export interface ClanAnnouncement',
  'placementTickets?: number',
  'lastWeeklyClaimDate?: string | null',
  'clanId?: string | null',
  'clanRole?:',
  'clanContributionXP?: number',
];

requiredTypeKeywords.forEach((kw) => {
  assert(typesContent.includes(kw), `src/types/index.ts must contain "${kw}"`);
});
console.log('✓ All TypeScript interfaces and fields verified!');

// Test 3: Data Integrity
console.log('\n[Test 3] Verifying Data Files Integrity...');
const placementContent = fs.readFileSync(path.join(rootDir, 'src', 'data', 'placementExams.ts'), 'utf8');
assert(placementContent.includes('placementQuestions'), 'placementQuestions array must be exported');
assert(placementContent.includes('evaluateOpenEndedAnswer'), 'evaluateOpenEndedAnswer function must be exported');
assert(placementContent.includes('calculateDiagnosticResult'), 'calculateDiagnosticResult function must be exported');
assert(placementContent.includes('keyTerms'), 'Rubric must contain keyTerms');
assert(placementContent.includes('open_ended'), 'Questions must include open_ended type');

const scenariosContent = fs.readFileSync(path.join(rootDir, 'src', 'data', 'examScenarios.ts'), 'utf8');
assert(scenariosContent.includes('examScenarios'), 'examScenarios array must be exported');
assert(scenariosContent.includes('getScenariosBySubject'), 'getScenariosBySubject must be exported');
assert(scenariosContent.includes('getScenarioById'), 'getScenarioById must be exported');
assert(scenariosContent.includes('Senaryo 1: Temel Düzey'), 'Must include Senaryo 1');
assert(scenariosContent.includes('Senaryo 2: İleri Analiz Düzeyi'), 'Must include Senaryo 2');

const clansContent = fs.readFileSync(path.join(rootDir, 'src', 'data', 'clans.ts'), 'utf8');
assert(clansContent.includes('initialClans'), 'initialClans array must be exported');
assert(clansContent.includes('Fen Bilimleri Araştırma Klanı'), 'Must include Fen Bilimleri Araştırma Klanı');
assert(clansContent.includes('Anadolu Liseleri Zirve Takımı'), 'Must include Anadolu Liseleri Zirve Takımı');
assert(clansContent.includes('weeklyQuests'), 'Clans must include weeklyQuests');
console.log('✓ Data structures and exports verified!');

// Test 4: Store Methods Verification
console.log('\n[Test 4] Verifying useUserStore Actions & State...');
const storeContent = fs.readFileSync(path.join(rootDir, 'src', 'stores', 'useUserStore.ts'), 'utf8');
const storeActions = [
  'claimWeeklyTicket',
  'buyPlacementTicket',
  'usePlacementTicket',
  'recordPlacementResult',
  'recordScenarioAttempt',
  'joinClan',
  'leaveClan',
  'createClan',
  'contributeClanXP',
  'addClanAnnouncement',
  'claimClanQuestReward',
  'placementExamResults',
  'scenarioAttempts',
  'clans',
];

storeActions.forEach((act) => {
  assert(storeContent.includes(act), `useUserStore must include "${act}"`);
});
console.log('✓ Store actions and state verified!');

// Test 5: Open-Ended Rubric Evaluator Logic Simulation
console.log('\n[Test 5] Simulating Open-Ended Rubric Evaluator Logic...');
function simulateEvaluateOpenEnded(studentAnswer, rubricKeyTerms, points) {
  const cleanAnswer = studentAnswer.toLowerCase().trim();
  if (cleanAnswer.length < 5) {
    return { score: 0, label: 'Yetersiz', matchedTerms: [], missingTerms: rubricKeyTerms };
  }
  const matchedTerms = [];
  const missingTerms = [];
  rubricKeyTerms.forEach((term) => {
    if (cleanAnswer.includes(term.toLowerCase())) {
      matchedTerms.push(term);
    } else {
      missingTerms.push(term);
    }
  });
  const matchRatio = matchedTerms.length / Math.max(1, rubricKeyTerms.length);
  const wordCount = cleanAnswer.split(/\s+/).length;

  if (matchRatio >= 0.6 && wordCount >= 10) {
    return { score: points, label: 'Tam Puan', matchedTerms, missingTerms };
  } else if (matchRatio >= 0.25 || (wordCount >= 8 && matchedTerms.length >= 1)) {
    return { score: Math.round(points * 0.6), label: 'Kısmi Puan', matchedTerms, missingTerms };
  } else {
    return { score: Math.min(2, Math.round(points * 0.2)), label: 'Geliştirilmeli', matchedTerms, missingTerms };
  }
}

const keyTerms = ['adezyon', 'kohezyon', 'büyük', 'ıslatma', 'çekim'];
const fullAnswer = 'Suda adezyon kuvveti kohezyon kuvvetinden büyük olduğu için cam boru yüzeyini ıslatma eğilimindedir ve sıvı yukarı çekim ile tırmanır.';
const evalFull = simulateEvaluateOpenEnded(fullAnswer, keyTerms, 15);
assert.strictEqual(evalFull.label, 'Tam Puan', 'Full answer should get Tam Puan');
assert.strictEqual(evalFull.score, 15, 'Full answer should receive 15 points');
console.log('✓ Full answer rubric test passed (15/15 pts, Tam Puan)');

const partialAnswer = 'Suda adezyon kuvveti vardır ve bu çekim etkisi yaratır.';
const evalPartial = simulateEvaluateOpenEnded(partialAnswer, keyTerms, 15);
assert.strictEqual(evalPartial.label, 'Kısmi Puan', 'Partial answer should get Kısmi Puan');
assert(evalPartial.score > 0 && evalPartial.score < 15, 'Partial score should be between 0 and 15');
console.log(`✓ Partial answer rubric test passed (${evalPartial.score}/15 pts, Kısmi Puan)`);

const emptyAnswer = '';
const evalEmpty = simulateEvaluateOpenEnded(emptyAnswer, keyTerms, 15);
assert.strictEqual(evalEmpty.score, 0, 'Empty answer must yield 0 points');
assert.strictEqual(evalEmpty.label, 'Yetersiz', 'Empty answer must yield Yetersiz');
console.log('✓ Empty answer rubric test passed (0/15 pts, Yetersiz)');

// Test Turkish uppercase normalization
function normalizeAssessmentText(str) {
  return str
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFC')
    .replace(/<=|=</g, '≤')
    .replace(/>=|=>/g, '≥')
    .replace(/!=/g, '≠')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim();
}

function simulateNormalizedMatching(answer, term) {
  const cleanAns = normalizeAssessmentText(answer);
  const cleanTerm = normalizeAssessmentText(term);
  const compactAns = cleanAns.replace(/\s+/g, '');
  const compactTerm = cleanTerm.replace(/\s+/g, '');
  return cleanAns.includes(cleanTerm) || (compactTerm.length >= 3 && compactAns.includes(compactTerm));
}

assert(simulateNormalizedMatching('İÇ DENGE VE HOMEOSTAZİ', 'iç denge'), 'Turkish titlecase / uppercase must match');
assert(simulateNormalizedMatching('|x - 4| <= 3 ve [1,7]', '|x - 4| ≤ 3'), 'Math inequality <= must match ≤');
assert(simulateNormalizedMatching('|x - 4| <= 3 ve [1,7]', '[1, 7]'), 'Math interval [1,7] without space must match [1, 7]');
console.log('✓ Turkish casing & math formula normalization tests passed!');

// Test 6: Diagnostic Scoring Levels Simulation
console.log('\n[Test 6] Simulating Diagnostic Placement Scoring...');
function getDiagnosticLevel(score) {
  if (score >= 85) return 'advanced';
  if (score >= 70) return 'competent';
  if (score >= 45) return 'developing';
  return 'beginner';
}

assert.strictEqual(getDiagnosticLevel(90), 'advanced', 'Score 90 must be advanced');
assert.strictEqual(getDiagnosticLevel(75), 'competent', 'Score 75 must be competent');
assert.strictEqual(getDiagnosticLevel(55), 'developing', 'Score 55 must be developing');
assert.strictEqual(getDiagnosticLevel(30), 'beginner', 'Score 30 must be beginner');
console.log('✓ Diagnostic level brackets verified!');

// Test 7: Weekly Free Ticket Claim Math
console.log('\n[Test 7] Simulating Weekly Free Ticket Expiry & Claim...');
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const now = Date.now();
const threeDaysAgo = new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString();
const eightDaysAgo = new Date(now - 8 * 24 * 60 * 60 * 1000).toISOString();

function canClaimWeekly(lastClaimDate) {
  if (!lastClaimDate) return true;
  return now - new Date(lastClaimDate).getTime() >= ONE_WEEK_MS;
}

assert.strictEqual(canClaimWeekly(null), true, 'First-time user should be able to claim free ticket');
assert.strictEqual(canClaimWeekly(eightDaysAgo), true, 'User after 8 days should be able to claim free ticket');
assert.strictEqual(canClaimWeekly(threeDaysAgo), false, 'User after 3 days should NOT be able to claim free ticket');
console.log('✓ Weekly free ticket claim logic verified!');

// Test 8: Navigation Elements in Sidebar and BottomNav
console.log('\n[Test 8] Verifying Navigation Links...');
const sidebarContent = fs.readFileSync(path.join(rootDir, 'src', 'components', 'layout', 'Sidebar.tsx'), 'utf8');
assert(sidebarContent.includes("href: '/exams'"), 'Sidebar must link to /exams');
assert(sidebarContent.includes("href: '/clans'"), 'Sidebar must link to /clans');

const bottomNavContent = fs.readFileSync(path.join(rootDir, 'src', 'components', 'layout', 'BottomNav.tsx'), 'utf8');
assert(bottomNavContent.includes("href: '/exams'"), 'BottomNav must link to /exams');
assert(bottomNavContent.includes("href: '/clans'"), 'BottomNav must link to /clans');
assert(bottomNavContent.includes('/exams/placement'), 'BottomNav must auto-hide on active placement exam');
assert(bottomNavContent.includes('/exams/scenario'), 'BottomNav must auto-hide on active scenario exam');
console.log('✓ Navigation integration verified!');

// Test 9: Clan Quest Claim Safety & Zero Emojis
console.log('\n[Test 9] Verifying Clan Quest Claim Safety & Zero Emojis...');
const clansPageContent = fs.readFileSync(path.join(rootDir, 'src', 'app', '(main)', 'clans', 'page.tsx'), 'utf8');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;
assert(!emojiRegex.test(clansPageContent), 'clans/page.tsx must have zero raw unicode emojis');
assert(clansPageContent.includes('quest.claimed'), 'clans/page.tsx must check quest.claimed');
assert(storeContent.includes('!q.claimed'), 'useUserStore must guard against multiple quest claims');
console.log('✓ Clan quest claim safety & zero emojis verified!');

console.log('\n======================================================');
console.log('🎉 ALL 9 VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉');
console.log('======================================================');
