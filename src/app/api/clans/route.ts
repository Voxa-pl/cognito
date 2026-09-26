import { NextResponse } from 'next/server';
import { initialClans } from '@/data/clans';
import { fetchClansFromSupabase, createClanInSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/security/antiCheat';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await fetchClansFromSupabase();
      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, clans: data });
      }
    }
    return NextResponse.json({ success: true, clans: initialClans });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Klanlar yüklenemedi.', error: err?.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(`clan_create:${ip}`, 10, 60)) {
      return NextResponse.json(
        { success: false, message: 'Çok fazla klan oluşturma isteği gönderildi.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, tag, motto, description, category, leaderName = 'Öğrenci' } = body;

    const cleanName = String(name || '').trim();
    const rawTag = String(tag || '').trim();
    const cleanTagStripped = rawTag.replace(/[\[\]\s]/g, '').toUpperCase();

    // 1. Name validation
    if (cleanName.length < 3 || cleanName.length > 40) {
      return NextResponse.json(
        { success: false, message: 'Klan adı 3 ile 40 karakter arasında olmalıdır.' },
        { status: 400 }
      );
    }

    // 2. Tag validation
    if (cleanTagStripped.length < 2 || cleanTagStripped.length > 8) {
      return NextResponse.json(
        { success: false, message: 'Klan etiketi (tag) 2 ile 8 karakter arasında olmalıdır.' },
        { status: 400 }
      );
    }

    if (!/^[A-Z0-9ÇĞİÖŞÜ\-]+$/.test(cleanTagStripped)) {
      return NextResponse.json(
        { success: false, message: 'Klan etiketi sadece harf, rakam ve tire içerebilir.' },
        { status: 400 }
      );
    }

    const formattedTag = `[${cleanTagStripped}]`;

    // 3. Category validation
    const validCategories = [
      'Fen & Matematik',
      'Sosyal Bilimler',
      'Genel Akademik Zirve',
      'Yeniden Doğuş / Phoenix',
    ];
    const cleanCategory = validCategories.includes(category) ? category : 'Genel Akademik Zirve';

    const newClanId = `clan-${Date.now()}`;
    const clanRecord = {
      id: newClanId,
      name: cleanName,
      tag: formattedTag,
      motto: String(motto || 'Birlikte Zirveye!').trim(),
      description: String(description || 'Akademik dayanışma ve ortak sınav hazırlık takımı.').trim(),
      badge_icon: 'Shield',
      badge_color: '#1cb0f6',
      level: 1,
      weekly_xp: 0,
      total_xp: 0,
      member_count: 1,
      max_members: 10, // STRICT 10 MEMBERS
      min_level_required: 1,
      category: cleanCategory,
      leader_name: String(leaderName).trim() || 'Öğrenci',
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await createClanInSupabase(clanRecord);
      if (error) {
        return NextResponse.json(
          { success: false, message: 'Klan veritabanına kaydedilemedi.', error: (error as any)?.message || String(error) },
          { status: 400 }
        );
      }
      return NextResponse.json({ success: true, message: 'Klan başarıyla oluşturuldu.', clan: data });
    }

    return NextResponse.json({
      success: true,
      message: `${cleanName} klanı 10 kişilik kontenjan ile başarıyla kuruldu.`,
      clan: clanRecord,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Klan kurulurken sunucu hatası oluştu.', error: err?.message },
      { status: 500 }
    );
  }
}
