import { NextResponse } from 'next/server';
import { DuelRoom } from '@/types';
import {
  generateDuelRoomCode,
  normalizeDuelRoomCode,
  compileDuelQuestions,
  getSubjectDisplayName,
  getMemoryRoom,
  setMemoryRoom,
  getActiveMemoryRooms,
} from '@/lib/gamification/duels';
import {
  createDuelRoomInSupabase,
  fetchActiveDuelRoomsFromSupabase,
  fetchDuelRoomFromSupabase,
  isSupabaseConfigured,
} from '@/lib/supabase';
import { checkRateLimit } from '@/lib/security/antiCheat';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
      const normalizedCode = normalizeDuelRoomCode(code);
      let room = getMemoryRoom(normalizedCode);
      if (!room && isSupabaseConfigured()) {
        const { data } = await fetchDuelRoomFromSupabase(normalizedCode);
        if (data) room = data as DuelRoom;
      }

      if (!room) {
        return NextResponse.json(
          { success: false, message: 'Belirtilen kodla aktif bir düello odası bulunamadı.' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, room });
    }

    // List active rooms
    const activeRooms: DuelRoom[] = getActiveMemoryRooms();
    const seenIds = new Set<string>(activeRooms.map((r) => r.id));

    if (isSupabaseConfigured()) {
      const { data } = await fetchActiveDuelRoomsFromSupabase();
      if (data && Array.isArray(data)) {
        for (const item of data) {
          if (!seenIds.has(item.id)) {
            seenIds.add(item.id);
            activeRooms.push(item as DuelRoom);
          }
        }
      }
    }

    return NextResponse.json({ success: true, rooms: activeRooms });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Düello odaları getirilemedi.', error: err?.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(`duel_create:${ip}`, 30, 60)) {
      return NextResponse.json(
        { success: false, message: 'Çok fazla oda oluşturma isteği gönderildi.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      hostUserId = 'student-main',
      hostUserName = 'Öğrenci',
      hostAvatarUrl = 'user',
      subjectSlug = 'matematik',
      subjectName,
    } = body;

    let code = generateDuelRoomCode();
    // Ensure uniqueness
    while (getMemoryRoom(code)) {
      code = generateDuelRoomCode();
    }

    const finalSubjectName = subjectName || getSubjectDisplayName(subjectSlug);
    const questions = compileDuelQuestions(subjectSlug);
    const roomId = `duel-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newRoom: DuelRoom = {
      id: roomId,
      code,
      hostUserId,
      hostUserName,
      hostAvatarUrl,
      subjectSlug,
      subjectName: finalSubjectName,
      status: 'waiting',
      questions,
      currentQuestionIndex: 0,
      hostScore: 0,
      guestScore: 0,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    };

    setMemoryRoom(newRoom);

    if (isSupabaseConfigured()) {
      await createDuelRoomInSupabase(newRoom);
    }

    return NextResponse.json({
      success: true,
      message: 'Düello odası başarıyla oluşturuldu.',
      room: newRoom,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Düello odası oluşturulamadı.', error: err?.message },
      { status: 500 }
    );
  }
}
