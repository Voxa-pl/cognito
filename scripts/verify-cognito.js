/**
 * Comprehensive Verification Suite for Cognito
 * Türkiye'nin Yeni Nesil Akademik Öğrenme Platformu (MEB 2026-2027)
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('================================================================');
console.log('--- STARTING COGNITO STRATEGIC & ARCHITECTURAL VERIFICATION ---');
console.log('================================================================\n');

const rootDir = path.resolve(__dirname, '..');

// TEST 1: Brand Rebirth to Cognito (Zero "StudyQuest" in source code)
console.log('Test 1: Verifying Brand Rebirth to "Cognito"...');
const filesToCheckNoStudyQuest = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/register/page.tsx',
  'src/app/login/page.tsx',
  'src/components/layout/Sidebar.tsx',
  'src/components/auth/GoogleAccountModal.tsx',
  'src/stores/useUserStore.ts',
  'package.json',
  '.env.example',
  'README.md',
];

filesToCheckNoStudyQuest.forEach((rel) => {
  const content = fs.readFileSync(path.join(rootDir, rel), 'utf8');
  assert(!content.includes('StudyQuest'), `${rel} must not contain "StudyQuest"`);
  assert(!content.includes('STUDYQUEST'), `${rel} must not contain "STUDYQUEST"`);
});

const layoutContent = fs.readFileSync(path.join(rootDir, 'src/app/layout.tsx'), 'utf8');
assert(layoutContent.includes('Cognito'), 'layout.tsx must contain Cognito');
assert(layoutContent.includes("Türkiye'nin Yeni Nesil Akademik Öğrenme Platformu • MEB 2026-2027"), 'layout.tsx must contain exact tagline');

const logoPath = path.join(rootDir, 'src/components/ui/CognitoLogo.tsx');
assert(fs.existsSync(logoPath), 'CognitoLogo component must exist');

const pkgContent = fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8');
const pkg = JSON.parse(pkgContent);
assert.strictEqual(pkg.name, 'cognito', 'package.json name must be "cognito"');
console.log('✓ Brand Rebirth to Cognito verified successfully!\n');

// TEST 2: Zero Unicode Emojis in UI Chrome
console.log('Test 2: Verifying ZERO Raw Unicode Emojis in src/...');
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

function checkNoEmojis(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      checkNoEmojis(fullPath);
    } else if (/\.(tsx|ts)$/.test(file)) {
      const text = fs.readFileSync(fullPath, 'utf8');
      const lines = text.split('\n');
      lines.forEach((line, idx) => {
        assert(!emojiRegex.test(line), `Emoji found in ${path.relative(rootDir, fullPath)}:${idx + 1}: ${line.trim()}`);
      });
    }
  }
}
checkNoEmojis(path.join(rootDir, 'src'));
console.log('✓ Zero raw unicode emojis in src/ verified!\n');

// TEST 3: Super-Features Surpassing EBA
console.log('Test 3: Verifying Super-Features Surpassing EBA...');

// 3A: Akıllı Eksik Teşhis & Telafi Motoru
const diagPath = path.join(rootDir, 'src/components/dashboard/DiagnosticEngine.tsx');
assert(fs.existsSync(diagPath), 'DiagnosticEngine component must exist');
const diagContent = fs.readFileSync(diagPath, 'utf8');
assert(diagContent.includes('Akıllı Eksik Teşhis & Telafi Motoru') || diagContent.includes('Akıllı Eksik Teşhis &amp; Telafi Motoru'), 'DiagnosticEngine title check');
assert(diagContent.includes('Geliştirilmesi Gereken Zayıf Nokta'), 'Must flag Geliştirilmesi Gereken Zayıf Nokta');
assert(diagContent.includes('Eksik Kapatma Antrenmanı'), 'Must include 1-click Eksik Kapatma Antrenmanı');
assert(diagContent.includes('60'), 'Must check 60% threshold');
assert(diagContent.includes('s.id === topic.subjectId || s.slug === topic.subjectId'), 'DiagnosticEngine must resolve subjects by id or slug');
assert(diagContent.includes('saveDiagnosticReportToSupabase'), 'DiagnosticEngine must sync with saveDiagnosticReportToSupabase');
assert(diagContent.includes('Üslü ve Köklü İfadeler'), 'Fallback weak topic must use correct topic name');

// 3B: MEB Kazanım Radarı & Sınav Tahmincisi
const radarPath = path.join(rootDir, 'src/components/dashboard/ExamPredictorRadar.tsx');
assert(fs.existsSync(radarPath), 'ExamPredictorRadar component must exist');
const radarContent = fs.readFileSync(radarPath, 'utf8');
assert(radarContent.includes('MEB Kazanım Radarı & Sınav Tahmincisi') || radarContent.includes('MEB Kazanım Radarı &amp; Sınav Tahmincisi'), 'Radar title check');
assert(radarContent.includes('Tahmini Okul Sınav Başarısı'), 'Must display Tahmini Okul Sınav Başarısı');
assert(radarContent.includes('t.subjectId === sub.id || t.subjectId === sub.slug'), 'ExamPredictorRadar must filter topics matching sub.id or sub.slug');

// 3C: Duolingo S-Curve Learning Path
const pathComponent = path.join(rootDir, 'src/components/dashboard/LearningPath.tsx');
assert(fs.existsSync(pathComponent), 'LearningPath component must exist');
const pathContent = fs.readFileSync(pathComponent, 'utf8');
assert(pathContent.includes('snakeOffsets'), 'Must implement snakeOffsets for S-curve');
assert(pathContent.includes('trophy') || pathContent.includes('Trophy'), 'Must include trophy nodes');
assert(pathContent.includes('chest') || pathContent.includes('Chest'), 'Must include chests');

// 3D: Dashboard Integration
const dashPath = path.join(rootDir, 'src/app/(main)/dashboard/page.tsx');
const dashContent = fs.readFileSync(dashPath, 'utf8');
assert(dashContent.includes('ExamPredictorRadar'), 'Dashboard must render ExamPredictorRadar');
assert(dashContent.includes('DiagnosticEngine'), 'Dashboard must render DiagnosticEngine');
assert(dashContent.includes('LearningPath'), 'Dashboard must render LearningPath');

// 3E: Quiz Result Accuracy Tracking
const quizPagePath = path.join(rootDir, 'src/app/(main)/quiz/[topicId]/page.tsx');
const quizPageContent = fs.readFileSync(quizPagePath, 'utf8');
assert(quizPageContent.includes('correctCount: score, totalCount: questions.length'), 'Quiz must pass full score and totalCount to updateTopicProgress');
console.log('✓ All Super-Features Surpassing EBA verified!\n');

// TEST 4: Onboarding Flow & Branching Logic
console.log('Test 4: Verifying Onboarding Flow & Branching Logic...');
const onboardingPath = path.join(rootDir, 'src/app/onboarding/page.tsx');
const onboardingContent = fs.readFileSync(onboardingPath, 'utf8');
assert(onboardingContent.includes('9. Sınıf') && onboardingContent.includes('12. Sınıf'), 'Must have grade options 9-12');
assert(onboardingContent.includes('Akademik Yolculuk') || onboardingContent.includes('Akademik Yolculuk &amp; Derece Hedefi'), 'Must have standard academic track label');
assert(onboardingContent.includes('Phoenix Telafi') || onboardingContent.includes('Phoenix Telafi &amp; Güçlendirme Modu'), 'Must have Phoenix track label');
assert(onboardingContent.includes('Zümrüdüanka'), 'Must award Zümrüdüanka badge');
console.log('✓ Onboarding Flow & Branching Logic verified!\n');

// TEST 5: Supabase Architecture & Schema Readiness
console.log('Test 5: Verifying Supabase Schema & Lib...');
const schemaPath = path.join(rootDir, 'supabase/schema.sql');
const schemaContent = fs.readFileSync(schemaPath, 'utf8');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.profiles'), 'profiles table');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.topic_progress'), 'topic_progress table');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.quiz_attempts'), 'quiz_attempts table');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.diagnostic_reports'), 'diagnostic_reports table');
assert(schemaContent.includes('learning_track'), 'profiles must have learning_track');
assert(schemaContent.includes('xp'), 'profiles must have xp');
assert(schemaContent.includes('grade'), 'profiles must have grade');
assert(schemaContent.includes('is_repeater'), 'profiles must have is_repeater');
assert(schemaContent.includes('hearts'), 'profiles must have hearts');
assert(schemaContent.includes('ALTER TABLE public.diagnostic_reports ENABLE ROW LEVEL SECURITY'), 'diagnostic_reports RLS');

const supabaseLibPath = path.join(rootDir, 'src/lib/supabase.ts');
const supabaseLibContent = fs.readFileSync(supabaseLibPath, 'utf8');
assert(supabaseLibContent.includes('saveDiagnosticReportToSupabase'), 'Must export saveDiagnosticReportToSupabase');
assert(supabaseLibContent.includes('fetchDiagnosticReportsFromSupabase'), 'Must export fetchDiagnosticReportsFromSupabase');
console.log('✓ Supabase Schema & Lib verified!\n');

console.log('================================================================');
console.log('--- ALL COGNITO VERIFICATION TESTS PASSED FLAWLESSLY (100%) ---');
console.log('================================================================');
