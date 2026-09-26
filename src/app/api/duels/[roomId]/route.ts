import { NextResponse } from 'next/server';
import { DuelRoom } from '@/types';
import { calculateDuelAnswerScore, getMemoryRoom, setMemoryRoom } from '@/lib/gamification/duels';
import {
  fetchDuelRoomFromSupabase,
  updateDuelRoomInSupabase,
  isSupabaseConfigured,
} from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params;
    let room = getMemoryRoom(roomId);

    if (!room && isSupabaseConfigured()) {
      const { data } = await fetchDuelRoomFromSupabase(roomId);
      if (data) {
        room = data as DuelRoom;
        setMemoryRoom(room);
      }
    }

    if (!room) {
      return NextResponse.json(
        { success: false, message: 'Düello odası bulunamadı.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, room });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Oda bilgisi alınamadı.', error: err?.message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params;
    const body = await request.json();
    const { action } = body;

    let room = getMemoryRoom(roomId);
    if (!room && isSupabaseConfigured()) {
      const { data } = await fetchDuelRoomFromSupabase(roomId);
      if (data) {
        room = data as DuelRoom;
        setMemoryRoom(room);
      }
    }

    if (!room) {
      return NextResponse.json(
        { success: false, message: 'İşlem yapılacak düello odası bulunamadı.' },
        { status: 404 }
      );
    }

    // 1. JOIN ACTION
    if (action === 'join') {
      const {
        guestUserId = 'guest-student',
        guestUserName = 'Misafir Öğrenci',
        guestAvatarUrl = 'user',
      } = body;

      if (room.hostUserId === guestUserId) {
        // Host joining own room
        return NextResponse.json({ success: true, room, role: 'host' });
      }

      if (room.status === 'completed') {
        return NextResponse.json(
          { success: false, message: 'Bu düello tamamlanmıştır.' },
          { status: 400 }
        );
      }

      room.guestUserId = guestUserId;
      room.guestUserName = guestUserName;
      room.guestAvatarUrl = guestAvatarUrl;
      room.status = 'active';

      setMemoryRoom(room);
      if (isSupabaseConfigured()) {
        await updateDuelRoomInSupabase(room.id, {
          status: 'active',
          guestUserId,
          guestUserName,
          guestAvatarUrl,
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Odaya başarıyla katılındı.',
        room,
        role: 'guest',
      });
    }

    // 2. ANSWER ACTION
    if (action === 'answer') {
      const {
        userId,
        questionIndex,
        answerIndex,
        remainingSeconds = 15,
      } = body;

      const qIndex = Number(questionIndex ?? room.currentQuestionIndex);
      const question = room.questions[qIndex];

      if (!question) {
        return NextResponse.json(
          { success: false, message: 'Geçersiz soru indeksi.' },
          { status: 400 }
        );
      }

      const isHost = userId === room.hostUserId;
      const isCorrect = Number(answerIndex) === question.correctAnswer;
      const scoreResult = calculateDuelAnswerScore(isCorrect, Number(remainingSeconds));

      if (isHost) {
        room.hostScore += scoreResult.totalPoints;
        room.hostAnsweredCurrent = true;
        if (!room.hostAnswers) room.hostAnswers = [];
        room.hostAnswers[qIndex] = answerIndex !== null ? Number(answerIndex) : null;
      } else {
        room.guestScore += scoreResult.totalPoints;
        room.guestAnsweredCurrent = true;
        if (!room.guestAnswers) room.guestAnswers = [];
        room.guestAnswers[qIndex] = answerIndex !== null ? Number(answerIndex) : null;
      }

      // Check if both answered or single player test mode
      const isDuelFinished = qIndex >= room.questions.length - 1;

      setMemoryRoom(room);
      if (isSupabaseConfigured()) {
        await updateDuelRoomInSupabase(room.id, {
          hostScore: room.hostScore,
          guestScore: room.guestScore,
          currentQuestionIndex: room.currentQuestionIndex,
        });
      }

      return NextResponse.json({
        success: true,
        isCorrect,
        points: scoreResult.totalPoints,
        speedBonus: scoreResult.speedBonus,
        room,
        isDuelFinished,
      });
    }

    // 3. NEXT QUESTION ACTION
    if (action === 'next_question') {
      room.currentQuestionIndex = Math.min(room.questions.length - 1, room.currentQuestionIndex + 1);
      room.hostAnsweredCurrent = false;
      room.guestAnsweredCurrent = false;

      setMemoryRoom(room);
      if (isSupabaseConfigured()) {
        await updateDuelRoomInSupabase(room.id, {
          currentQuestionIndex: room.currentQuestionIndex,
        });
      }

      return NextResponse.json({ success: true, room });
    }

    // 4. FINISH ACTION
    if (action === 'finish') {
      room.status = 'completed';
      if (room.hostScore > room.guestScore) {
        room.winnerUserId = room.hostUserId;
      } else if (room.guestScore > room.hostScore) {
        room.winnerUserId = room.guestUserId || 'guest';
      } else {
        room.winnerUserId = 'tie';
      }

      setMemoryRoom(room);
      if (isSupabaseConfigured()) {
        await updateDuelRoomInSupabase(room.id, {
          status: 'completed',
          winnerUserId: room.winnerUserId,
          hostScore: room.hostScore,
          guestScore: room.guestScore,
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Düello tamamlandı.',
        room,
        winner: room.winnerUserId,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Bilinmeyen işlem türü.' },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'İşlem yürütülemedi.', error: err?.message },
      { status: 500 }
    );
  }
}
