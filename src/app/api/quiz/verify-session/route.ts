import { NextResponse } from 'next/server';
import { validateQuizSubmission, checkRateLimit, QuizSubmissionData, verifyQuizSessionToken } from '@/lib/security/antiCheat';
import { logSecurityViolationToSupabase, updateQuizSessionInSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // Rate limit check: max 60 submissions per minute
    if (!checkRateLimit(`quiz_submit:${ip}`, 60, 60)) {
      return NextResponse.json(
        { success: false, code: 'RATE_LIMITED', message: 'Çok fazla test gönderimi yapıldı. Lütfen biraz bekleyin.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { sessionToken, topicId, score, questionCount, timeSpentSec, answers, userId = 'guest' } = body;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, code: 'MISSING_TOKEN', message: 'İmzalı test oturum belirteci (session token) eksik.' },
        { status: 400 }
      );
    }

    const submission: QuizSubmissionData = {
      sessionToken,
      topicId: String(topicId || ''),
      score: Number(score ?? 0),
      questionCount: Number(questionCount ?? 10),
      timeSpentSec: Number(timeSpentSec ?? 0),
      answers: Array.isArray(answers) ? answers : [],
    };

    const tokenData = verifyQuizSessionToken(sessionToken);
    const sessionId = tokenData.payload?.sessionId || 'unknown';
    const effectiveUserId = tokenData.payload?.userId || userId;

    const verification = validateQuizSubmission(submission);

    if (!verification.valid) {
      // Asynchronously log violation to database
      const violationType =
        verification.code === 'SPEED_HACK' ? 'SPEED_HACK' :
        verification.code === 'INVALID_TOKEN' ? 'TOKEN_TAMPER' :
        verification.code === 'INVALID_SCORE' ? 'XP_SPOOF' : 'TOKEN_TAMPER';

      logSecurityViolationToSupabase({
        userId: effectiveUserId,
        violationType,
        details: {
          code: verification.code,
          message: verification.message,
          topicId,
          declaredScore: score,
          timeSpentSec,
          sessionId,
        },
        ipAddress: ip,
      }).catch(() => {});

      if (sessionId !== 'unknown') {
        updateQuizSessionInSupabase({
          sessionId,
          verified: false,
          verifiedScore: 0,
          verifiedXp: 0,
          timeSpentSec: verification.timeSpentSec || Number(timeSpentSec ?? 0),
          speedHackFlagged: verification.code === 'SPEED_HACK',
        }).catch(() => {});
      }

      return NextResponse.json(
        {
          success: false,
          code: verification.code,
          message: verification.message,
          timeSpentSec: verification.timeSpentSec,
        },
        { status: 400 }
      );
    }

    // Success audit logging
    if (sessionId !== 'unknown') {
      updateQuizSessionInSupabase({
        sessionId,
        verified: true,
        verifiedScore: verification.verifiedScore ?? 0,
        verifiedXp: verification.verifiedXp ?? 0,
        timeSpentSec: verification.timeSpentSec ?? 0,
        speedHackFlagged: false,
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      code: 'OK',
      message: 'Test oturumu ve sonuçları başarıyla doğrulandı.',
      verifiedScore: verification.verifiedScore,
      verifiedXp: verification.verifiedXp,
      verifiedGems: verification.verifiedGems,
      timeSpentSec: verification.timeSpentSec,
      verificationSignature: verification.verificationSignature,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, code: 'SERVER_ERROR', message: 'Sonuç doğrulanırken sunucu hatası oluştu.', error: error?.message },
      { status: 500 }
    );
  }
}
