import { NextResponse } from 'next/server';
import { generateQuizSessionToken, checkRateLimit } from '@/lib/security/antiCheat';
import { recordQuizSessionToSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Rate limit check: max 60 session requests per minute
    if (!checkRateLimit(`quiz_session:${ip}`, 60, 60)) {
      return NextResponse.json(
        { success: false, message: 'Çok fazla istek gönderildi. Lütfen biraz bekleyin.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { topicId, questionCount = 10, mode = 'challenge', userId = 'guest' } = body;

    if (!topicId || typeof topicId !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz konu parametresi.' },
        { status: 400 }
      );
    }

    const sessionId = `qs-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const token = generateQuizSessionToken({
      sessionId,
      userId,
      topicId,
      questionCount: Math.min(50, Math.max(1, Number(questionCount))),
      mode: mode === 'practice' ? 'practice' : 'challenge',
    });

    // Record session into PostgreSQL audit table asynchronously
    recordQuizSessionToSupabase({
      sessionId,
      userId,
      topicId,
      questionCount: Math.min(50, Math.max(1, Number(questionCount))),
      sessionToken: token,
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      sessionId,
      sessionToken: token,
      issuedAt: Date.now(),
      minDurationSec: Math.round(Number(questionCount) * 1.8),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Oturum oluşturulurken hata meydana geldi.', error: error?.message },
      { status: 500 }
    );
  }
}
