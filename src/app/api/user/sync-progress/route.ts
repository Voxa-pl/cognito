import { NextResponse } from 'next/server';
import { validateProgressSync, checkRateLimit } from '@/lib/security/antiCheat';
import { upsertProfileToSupabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    if (!checkRateLimit(`user_sync:${ip}`, 60, 60)) {
      return NextResponse.json(
        { success: false, message: 'Senkronizasyon istek limiti aşıldı.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      userId,
      email,
      fullName,
      currentStreak = 0,
      totalXP = 0,
      level = 1,
      gems = 100,
      hearts = 5,
      grade = 9,
      isRepeater = false,
      learningMode = 'standard',
      lastActiveDate,
      previousXP,
      previousStreak,
    } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı kimliği eksik.' },
        { status: 400 }
      );
    }

    // Anti-cheat verification
    const validation = validateProgressSync({
      userId,
      currentStreak: Number(currentStreak),
      totalXP: Number(totalXP),
      level: Number(level),
      lastActiveDate: String(lastActiveDate || ''),
      previousXP: previousXP !== undefined ? Number(previousXP) : undefined,
      previousStreak: previousStreak !== undefined ? Number(previousStreak) : undefined,
    });

    const effectiveTotalXP = validation.valid ? Number(totalXP) : validation.correctedState?.totalXP ?? Number(totalXP);
    const effectiveLevel = validation.valid ? Number(level) : validation.correctedState?.level ?? Number(level);
    const effectiveStreak = validation.valid ? Number(currentStreak) : validation.correctedState?.currentStreak ?? Number(currentStreak);

    // Sync to PostgreSQL Supabase if configured
    if (isSupabaseConfigured() && email) {
      await upsertProfileToSupabase({
        id: userId,
        email,
        full_name: fullName,
        grade,
        is_repeater: isRepeater,
        learning_mode: learningMode,
        total_xp: effectiveTotalXP,
        xp: effectiveTotalXP,
        level: effectiveLevel,
        streak: effectiveStreak,
        gems: Number(gems),
        hearts: Number(hearts),
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      valid: validation.valid,
      message: validation.valid
        ? 'İlerleme başarıyla doğrulandı ve eşitlendi.'
        : validation.reason,
      state: {
        totalXP: effectiveTotalXP,
        level: effectiveLevel,
        currentStreak: effectiveStreak,
        gems: Number(gems),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Senkronizasyon hatası.', error: error?.message },
      { status: 500 }
    );
  }
}
