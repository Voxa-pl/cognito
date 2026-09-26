/**
 * Verification Suite for Dark Mode & Profile Settings
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('================================================================');
console.log('--- VERIFYING DARK MODE & PROFILE SETTINGS IMPLEMENTATION ---');
console.log('================================================================\n');

const rootDir = path.resolve(__dirname, '..');

// Test 1: Layout & Default Dark Mode
console.log('Test 1: Verifying layout.tsx for Default Dark Mode...');
const layoutContent = fs.readFileSync(path.join(rootDir, 'src/app/layout.tsx'), 'utf8');
assert(layoutContent.includes('className="dark"'), 'html tag must have className="dark"');
assert(layoutContent.includes("var t = 'dark'"), 'inline script must default to dark');
assert(layoutContent.includes('ThemeSync'), 'ThemeSync component must be integrated into RootLayout');
console.log('✓ layout.tsx verified!\n');

// Test 2: globals.css Super Duolingo Dark Aesthetic
console.log('Test 2: Verifying globals.css Super Duolingo Dark Theme...');
const cssContent = fs.readFileSync(path.join(rootDir, 'src/app/globals.css'), 'utf8');
assert(cssContent.includes('--bg-page: #0f172a;'), ':root must have deep luxurious dark slate #0f172a');
assert(cssContent.includes('--bg-card: #1e293b;'), ':root must have card color #1e293b');
assert(cssContent.includes('--border-subtle: #334155;'), ':root must have border #334155');
assert(cssContent.includes('--text-primary: #f8fafc;'), ':root must have text primary #f8fafc');
assert(cssContent.includes('--duo-green-shadow: #3f9600;'), ':root must have green shadow #3f9600');
assert(cssContent.includes('--duo-blue-shadow: #168ec7;'), ':root must have blue shadow #168ec7');
assert(cssContent.includes('--duo-yellow-shadow: #d49b00;'), ':root must have gold shadow #d49b00');
assert(cssContent.includes('html.light,'), 'globals.css must support light theme overrides');
assert(cssContent.includes('.btn-duo-white'), 'globals.css must style secondary buttons for dark mode');
console.log('✓ globals.css verified!\n');

// Test 3: useUserStore Settings & Default Dark Theme
console.log('Test 3: Verifying useUserStore.ts default theme & actions...');
const storeContent = fs.readFileSync(path.join(rootDir, 'src/stores/useUserStore.ts'), 'utf8');
assert(storeContent.includes("theme: 'dark'"), "defaultUser must have theme: 'dark'");
assert(storeContent.includes('setTheme:'), 'useUserStore must export setTheme action');
assert(storeContent.includes('setSoundEnabled:'), 'useUserStore must export setSoundEnabled action');
assert(storeContent.includes('setDailyGoalMinutes:'), 'useUserStore must export setDailyGoalMinutes action');
assert(storeContent.includes('updateFullName:'), 'useUserStore must export updateFullName action');
console.log('✓ useUserStore.ts verified!\n');

// Test 4: sound.ts Web Audio API Toggle Integration
console.log('Test 4: Verifying sound.ts toggle integration...');
const soundContent = fs.readFileSync(path.join(rootDir, 'src/lib/sound.ts'), 'utf8');
assert(soundContent.includes('setEnabled(enabled: boolean)'), 'SoundEffects must have setEnabled');
assert(soundContent.includes('isEnabled(): boolean'), 'SoundEffects must have isEnabled');
assert(soundContent.includes('if (!this.enabled) return null;'), 'getContext must respect sound enabled state');
console.log('✓ sound.ts verified!\n');

// Test 5: Profile Settings Page Subsections
console.log('Test 5: Verifying profile/page.tsx settings sections...');
const profileContent = fs.readFileSync(path.join(rootDir, 'src/app/(main)/profile/page.tsx'), 'utf8');
assert(profileContent.includes('Görünüm & Tema') || profileContent.includes('Görünüm &amp; Tema'), 'Must have Görünüm & Tema section');
assert(profileContent.includes('Ses Efektleri'), 'Must have Ses Efektleri section');
assert(profileContent.includes('Akademik Profil & Öğrenme Modu') || profileContent.includes('Akademik Profil &amp; Öğrenme Modu'), 'Must have Akademik Profil & Öğrenme Modu section');
assert(profileContent.includes('Hesap Bilgileri'), 'Must have Hesap Bilgileri section');
assert(profileContent.includes('Hesap İşlemleri'), 'Must have Hesap İşlemleri section');
assert(profileContent.includes('Zirveye İlerle (Standart Mod)'), 'Must have Standart Mod option');
assert(profileContent.includes('Yeniden Doğuş / Phoenix'), 'Must have Phoenix mode option');
assert(profileContent.includes('İlerlemeyi Sıfırla'), 'Must have İlerlemeyi Sıfırla button with modal');
assert(profileContent.includes('Çıkış Yap'), 'Must have Çıkış Yap button');
assert(profileContent.includes('Günlük Çalışma Hedefi'), 'Must have Günlük Hedef options');
console.log('✓ profile/page.tsx verified!\n');

console.log('================================================================');
console.log('--- ALL DARK MODE & SETTINGS VERIFICATIONS PASSED (100%) ---');
console.log('================================================================');
