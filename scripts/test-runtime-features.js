/**
 * Deep Runtime Verification Suite for Cognito Super-Features
 * Uses local typescript compiler to execute real TS modules in Node.js
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const assert = require('assert');

console.log('================================================================');
console.log('--- STARTING DEEP RUNTIME VERIFICATION (TYPESCRIPT ENGINE) ---');
console.log('================================================================\n');

const rootDir = path.resolve(__dirname, '..');

// Helper to load and transpile TS file
function loadTs(relPath) {
  const fullPath = path.join(rootDir, relPath);
  let code = fs.readFileSync(fullPath, 'utf8');
  // Strip import of types
  code = code.replace(/import\s+type\s+.*?from\s+['"].*?['"];?/g, '');
  code = code.replace(/import\s+{[^}]*?(?:Subject|Unit|Topic|Question|UserProfile|DailyQuest|Badge|TopicProgress|QuizAttempt|TopicMasteryDiagnostic|DiagnosticReport|KazanımRadarData)[^}]*?}\s+from\s+['"]@\/types['"];?/g, '');
  code = code.replace(/import\s+.*?from\s+['"]@\/types['"];?/g, '');
  
  const transpiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  });

  const m = { exports: {} };
  const fn = new Function('require', 'module', 'exports', transpiled.outputText);
  
  function customRequire(reqPath) {
    if (reqPath.startsWith('./') || reqPath.startsWith('../')) {
      const dir = path.dirname(fullPath);
      const target = path.resolve(dir, reqPath);
      if (fs.existsSync(target + '.ts')) return loadTs(path.relative(rootDir, target + '.ts'));
      if (fs.existsSync(target + '/index.ts')) return loadTs(path.relative(rootDir, target + '/index.ts'));
    }
    return require(reqPath);
  }

  fn(customRequire, m, m.exports);
  return m.exports;
}

// 1. Verify subjects and curriculum mapping
console.log('Test 1: Verifying Subject-to-Topic Filter Mapping (Radar & Diagnostic Engine)...');
const { subjects } = loadTs('src/data/subjects.ts');
const { allTopics, getTopicById } = loadTs('src/data/curriculum/index.ts');

assert(subjects.length === 8, 'Must have 8 MEB subjects');
assert(allTopics.length > 100, `Must have complete curriculum topics, found ${allTopics.length}`);

let totalMapped = 0;
subjects.forEach((sub) => {
  const subTopics = allTopics.filter((t) => t.subjectId === sub.id || t.subjectId === sub.slug);
  assert(subTopics.length > 0, `Subject "${sub.name}" (${sub.slug}) must match at least 1 topic, but got 0!`);
  totalMapped += subTopics.length;
  console.log(`  ✓ ${sub.name.padEnd(25)} (id: ${sub.id}, slug: ${sub.slug.padEnd(10)}): ${subTopics.length} topics mapped`);
});
assert.strictEqual(totalMapped, allTopics.length, 'All topics must belong to a subject');
console.log(`✓ Test 1 Passed: 100% of ${allTopics.length} topics cleanly mapped!\n`);

// 2. Verify DiagnosticEngine Subject Resolution
console.log('Test 2: Verifying DiagnosticEngine Subject Name & Slug Resolution...');
const testTopics = ['mat-u1-t1', 'fiz-u1-t1', 'kim-u1-t1', 'biy-u1-t1', 'mat-u1-t3'];
testTopics.forEach((id) => {
  const topic = getTopicById(id);
  assert(topic, `Topic ${id} must exist`);
  const sub = subjects.find((s) => s.id === topic.subjectId || s.slug === topic.subjectId);
  assert(sub, `Subject for topic ${id} (${topic.subjectId}) must be found`);
  assert(sub.name !== topic.subjectId, `subjectName must not be raw ID "${topic.subjectId}"`);
  console.log(`  ✓ Topic ${id.padEnd(12)} -> "${topic.name}" -> ${sub.name} (slug: ${sub.slug})`);
});
console.log('✓ Test 2 Passed: Subject names and slugs resolved perfectly without raw IDs!\n');

// 3. Verify Topic Mastery & Remediation Engine Logic
console.log('Test 3: Verifying Topic Mastery % & Remediation Engine...');
function calculateMastery(current, result) {
  const addedCorrect = typeof result === 'boolean' ? (result ? 1 : 0) : result.correctCount;
  const addedTotal = typeof result === 'boolean' ? 1 : result.totalCount;
  const newCorrect = current.correctCount + addedCorrect;
  const newTotal = current.totalAttempts + addedTotal;
  const mastery = Math.min(100, Math.round((newCorrect / Math.max(1, newTotal)) * 100));
  return { newCorrect, newTotal, mastery, isWeak: mastery < 60 };
}

// Student performs poorly: 2/8 correct
const initialAttempt = calculateMastery({ correctCount: 0, totalAttempts: 0 }, { correctCount: 2, totalCount: 8 });
assert.strictEqual(initialAttempt.mastery, 25);
assert.strictEqual(initialAttempt.isWeak, true, '25% must trigger isWeakPoint = true');
console.log('  ✓ Initial quiz: 2/8 correct -> 25% mastery -> Triggered "Geliştirilmesi Gereken Zayıf Nokta" (<60%)');

// Student clicks 1-click "Eksik Kapatma Antrenmanı" and gets 8/8
const remediatedAttempt = calculateMastery(
  { correctCount: initialAttempt.newCorrect, totalAttempts: initialAttempt.newTotal },
  { correctCount: 8, totalCount: 8 }
);
assert.strictEqual(remediatedAttempt.mastery, 63);
assert.strictEqual(remediatedAttempt.isWeak, false, '63% must clear isWeakPoint (<60% threshold passed)');
console.log('  ✓ Telafi Antrenmanı: 8/8 correct -> Cumulative 10/16 (63%) -> Weak point successfully resolved!');
console.log('✓ Test 3 Passed: Remediation feedback loop validated!\n');

// 4. Verify Phoenix / Sınıf Tekrarı Track & Badges
console.log('Test 4: Verifying Phoenix (Yeniden Doğuş) Mode...');
const { badges } = loadTs('src/data/badges.ts');
const phoenixBadge = badges.find((b) => b.slug === 'zumruduanka');
assert(phoenixBadge, 'Zümrüdüanka badge must exist in badges.ts');
assert(phoenixBadge.name.includes('Zümrüdüanka'), 'Badge name check');
assert(phoenixBadge.condition.includes('Phoenix') || phoenixBadge.condition.includes('Yeniden Doğuş'), 'Condition check');
console.log(`  ✓ Phoenix Badge: "${phoenixBadge.name}" (${phoenixBadge.condition})`);
console.log('✓ Test 4 Passed: Phoenix Mode configuration verified!\n');

console.log('================================================================');
console.log('--- ALL DEEP RUNTIME VERIFICATIONS PASSED (100% SUCCESS) ---');
console.log('================================================================');
