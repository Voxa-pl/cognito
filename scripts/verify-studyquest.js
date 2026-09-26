/**
 * Comprehensive verification script for StudyQuest Auth, Onboarding & Supabase Architecture
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- Starting StudyQuest Verification Suite ---');

const rootDir = path.resolve(__dirname, '..');

// Test 1: Verify supabase/schema.sql
console.log('Test 1: Verifying supabase/schema.sql...');
const schemaPath = path.join(rootDir, 'supabase', 'schema.sql');
assert(fs.existsSync(schemaPath), 'supabase/schema.sql must exist');
const schemaContent = fs.readFileSync(schemaPath, 'utf8');

const requiredSchemaKeywords = [
  'CREATE TABLE IF NOT EXISTS public.profiles',
  'CREATE TABLE IF NOT EXISTS public.topic_progress',
  'CREATE TABLE IF NOT EXISTS public.quiz_attempts',
  'learning_mode TEXT CHECK (learning_mode IN (\'standard\', \'phoenix\'))',
  'grade INT CHECK (grade >= 9 AND grade <= 12)',
  'is_repeater BOOLEAN DEFAULT FALSE',
  'ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY',
  'ALTER TABLE public.topic_progress ENABLE ROW LEVEL SECURITY',
  'ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY',
  'CREATE OR REPLACE FUNCTION public.handle_new_user()',
  'CREATE OR REPLACE FUNCTION public.handle_updated_at()'
];

requiredSchemaKeywords.forEach((kw) => {
  assert(schemaContent.includes(kw), `Schema must contain "${kw}"`);
});
console.log('✓ supabase/schema.sql verification passed!');

// Test 2: Verify .env.example
console.log('Test 2: Verifying .env.example...');
const envPath = path.join(rootDir, '.env.example');
assert(fs.existsSync(envPath), '.env.example must exist');
const envContent = fs.readFileSync(envPath, 'utf8');
assert(envContent.includes('NEXT_PUBLIC_SUPABASE_URL'), '.env.example must specify NEXT_PUBLIC_SUPABASE_URL');
assert(envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY'), '.env.example must specify NEXT_PUBLIC_SUPABASE_ANON_KEY');
console.log('✓ .env.example verification passed!');

// Test 3: Verify badges.ts contains zumruduanka
console.log('Test 3: Verifying Zümrüdüanka badge in badges.ts...');
const badgesPath = path.join(rootDir, 'src', 'data', 'badges.ts');
const badgesContent = fs.readFileSync(badgesPath, 'utf8');
assert(badgesContent.includes('zumruduanka'), 'badges.ts must include zumruduanka badge');
assert(badgesContent.includes('Zümrüdüanka'), 'badges.ts must include Turkish name Zümrüdüanka');
console.log('✓ badges.ts verification passed!');

// Test 4: Verify Supabase client module
console.log('Test 4: Verifying src/lib/supabase.ts...');
const supabaseLibPath = path.join(rootDir, 'src', 'lib', 'supabase.ts');
assert(fs.existsSync(supabaseLibPath), 'src/lib/supabase.ts must exist');
const supabaseLibContent = fs.readFileSync(supabaseLibPath, 'utf8');
assert(supabaseLibContent.includes('isSupabaseConfigured'), 'supabase.ts must export isSupabaseConfigured');
assert(supabaseLibContent.includes('signInWithGoogleOAuth'), 'supabase.ts must export signInWithGoogleOAuth');
assert(supabaseLibContent.includes('upsertProfileToSupabase'), 'supabase.ts must export upsertProfileToSupabase');
console.log('✓ src/lib/supabase.ts verification passed!');

// Test 5: Verify Auth Components & Pages
console.log('Test 5: Verifying Auth Components & Pages...');
const filesToCheck = [
  'src/components/auth/GoogleAccountModal.tsx',
  'src/components/auth/GoogleSignInButton.tsx',
  'src/app/register/page.tsx',
  'src/app/login/page.tsx',
  'src/app/onboarding/page.tsx',
  'src/app/auth/callback/page.tsx',
];

filesToCheck.forEach((relPath) => {
  const fullPath = path.join(rootDir, relPath);
  assert(fs.existsSync(fullPath), `${relPath} must exist`);
});
console.log('✓ All auth & onboarding pages exist!');

// Test 6: Verify Route Guard in (main)/layout.tsx
console.log('Test 6: Verifying Route Guard in (main)/layout.tsx...');
const mainLayoutPath = path.join(rootDir, 'src', 'app', '(main)', 'layout.tsx');
const mainLayoutContent = fs.readFileSync(mainLayoutPath, 'utf8');
assert(mainLayoutContent.includes('!user.isAuthenticated'), 'layout.tsx must check !user.isAuthenticated');
assert(mainLayoutContent.includes('/register'), 'layout.tsx must redirect unauthenticated users to /register');
assert(mainLayoutContent.includes('/onboarding'), 'layout.tsx must redirect un-onboarded users to /onboarding');
console.log('✓ Route Guard verification passed!');

// Test 7: Verify Phoenix mode support in Dashboard & Profile
console.log('Test 7: Verifying Phoenix mode support in Dashboard & Profile...');
const dashboardPath = path.join(rootDir, 'src', 'app', '(main)', 'dashboard', 'page.tsx');
const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
assert(dashboardContent.includes('phoenix'), 'Dashboard must contain Phoenix mode branch');
assert(dashboardContent.includes('ZÜMRÜDÜANKA'), 'Dashboard must display Zümrüdüanka badge');

const profilePath = path.join(rootDir, 'src', 'app', '(main)', 'profile', 'page.tsx');
const profileContent = fs.readFileSync(profilePath, 'utf8');
assert(profileContent.includes('phoenix'), 'Profile must contain Phoenix mode branch');
assert(profileContent.includes('Zümrüdüanka'), 'Profile must display Zümrüdüanka info');
assert(profileContent.includes('logout'), 'Profile must provide logout action');
console.log('✓ Phoenix mode in Dashboard & Profile verification passed!');

console.log('\n--- ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
