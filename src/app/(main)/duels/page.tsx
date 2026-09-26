'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Swords,
  Trophy,
  Shield,
  Copy,
  Check,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Plus,
  Play,
  CheckCircle2,
  AlertCircle,
  Brain,
  BookOpen,
} from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { sounds } from '@/lib/sound';
import { subjects } from '@/data/subjects';
import { normalizeDuelRoomCode } from '@/lib/gamification/duels';

function DuelsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteUser = searchParams.get('inviteUser') || searchParams.get('invite');

  const {
    user,
    duelRooms,
    createDuelRoom,
    joinDuelRoom,
    setActiveDuel,
    activeDuel,
  } = useUserStore();

  const [selectedSubject, setSelectedSubject] = useState<string>('matematik');
  const [createdRoomCode, setCreatedRoomCode] = useState<string | null>(null);
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);
  const [joinCodeInput, setJoinCodeInput] = useState<string>('');
  const [joinError, setJoinError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isJoining, setIsJoining] = useState<boolean>(false);

  // Auto-fill invite modal/notice if coming from clan member list
  const [invitedOpponent, setInvitedOpponent] = useState<string | null>(inviteUser);

  const availableSubjects = [
    { slug: 'karma', name: 'Karma Akademik Deneme', description: 'Tüm branşlardan derlenmiş akademik sorular', color: 'border-[#1cb0f6]' },
    ...subjects.map((s) => ({
      slug: s.slug,
      name: s.name,
      description: s.description,
      color: 'border-[#e5e5e5] dark:border-[#334155]',
    })),
  ];

  const handleCreateRoom = async () => {
    sounds.playClick();
    setIsCreating(true);
    setJoinError(null);

    try {
      const selectedSub = availableSubjects.find((s) => s.slug === selectedSubject);
      // Local store room creation
      const newRoom = createDuelRoom({
        subjectSlug: selectedSubject,
        subjectName: selectedSub?.name,
      });

      // Set state synchronously so UI responds immediately
      setCreatedRoomCode(newRoom.code);
      setCreatedRoomId(newRoom.id);

      // Also persist to API in background
      try {
        await fetch('/api/duels', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            hostUserId: user.id,
            hostUserName: user.fullName || user.username,
            hostAvatarUrl: user.avatarUrl,
            subjectSlug: selectedSubject,
            subjectName: selectedSub?.name,
          }),
        });
      } catch {
        // Fallback to local store
      }
    } catch {
      setJoinError('Oda oluşturulurken bir hata oluştu.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyCode = (code: string) => {
    sounds.playClick();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinByCode = async (codeToJoin?: string) => {
    const rawCode = codeToJoin || joinCodeInput;
    if (!rawCode || rawCode.trim().length < 3) {
      setJoinError('Lütfen geçerli bir 6 haneli oda kodu girin.');
      return;
    }

    sounds.playClick();
    setIsJoining(true);
    setJoinError(null);

    const formattedCode = normalizeDuelRoomCode(rawCode);

    try {
      // 1. Try local store
      const result = joinDuelRoom(formattedCode);
      if (result.success && result.room) {
        sounds.playCorrect();
        router.push(`/duels/${result.room.id}`);
        return;
      }

      // 2. Try remote API
      const res = await fetch(`/api/duels?code=${encodeURIComponent(formattedCode)}`);
      const data = await res.json();

      if (data.success && data.room) {
        // Join via API
        const joinRes = await fetch(`/api/duels/${data.room.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'join',
            guestUserId: user.id,
            guestUserName: user.fullName || user.username,
            guestAvatarUrl: user.avatarUrl,
          }),
        });
        const joinData = await joinRes.json();
        if (joinData.success && joinData.room) {
          setActiveDuel(joinData.room);
          sounds.playCorrect();
          router.push(`/duels/${joinData.room.id}`);
          return;
        }
      }

      setJoinError(data.message || result.message || 'Geçerli bir oda bulunamadı.');
    } catch {
      setJoinError('Odaya bağlanırken bir sorun oluştu.');
    } finally {
      setIsJoining(false);
    }
  };

  // Filter active clan challenges
  const activeChallenges = duelRooms.filter(
    (r) => r.status === 'waiting' && r.hostUserId !== user.id
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0b0f17] text-[#3c3c3c] dark:text-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#ff4b4b]/10 text-[#ff4b4b] border border-[#ff4b4b]/20 text-xs font-black uppercase tracking-wider">
                <Swords className="w-4 h-4 stroke-[2.5]" />
                <span>Canlı Akademik Düello Arenası</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#3c3c3c] dark:text-[#f8fafc]">
                Klanlar Arası Bilişsel Hız Turu
              </h1>
              <p className="text-xs sm:text-sm text-[#777777] dark:text-[#94a3b8] font-medium max-w-2xl leading-relaxed">
                6 haneli oda koduyla arkadaşına meydan oku. 5 soruluk eşzamanlı akademik hız yarışında doğru yanıt ver, hız bonusunu kap, klanını ligde zirveye taşı!
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-3 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] block">
                  Galibiyet Ödülü
                </span>
                <span className="text-sm sm:text-base font-black text-[#58cc02]">
                  +15 XP • +10 Klan
                </span>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] block">
                  Süre Bonusu
                </span>
                <span className="text-sm sm:text-base font-black text-[#ff9600]">
                  +50 Puan
                </span>
              </div>
            </div>
          </div>

          {invitedOpponent && (
            <div className="mt-6 p-4 rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/15 border-2 border-[#84d8ff] dark:border-[#1cb0f6]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#1cb0f6] text-white flex items-center justify-center font-black">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#1cb0f6]">
                    Klan Daveti Aktif
                  </div>
                  <div className="text-xs font-semibold text-[#3c3c3c] dark:text-[#f8fafc]">
                    <span className="font-black">{invitedOpponent}</span> adlı klan üyesine meydan okumak için aşağıdan branşını seç ve oda kur!
                  </div>
                </div>
              </div>
              <button
                onClick={() => setInvitedOpponent(null)}
                className="text-xs font-black text-[#777777] dark:text-[#94a3b8] hover:text-[#ff4b4b] cursor-pointer"
              >
                Kapat
              </button>
            </div>
          )}
        </div>

        {/* Main Grid: Create Room vs Join Room */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Oda Kur (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e5] dark:border-[#334155]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[#ff4b4b]/10 text-[#ff4b4b] flex items-center justify-center font-black">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                    Özel Düello Odası Kur
                  </h2>
                  <p className="text-xs text-[#777777] dark:text-[#94a3b8] font-semibold">
                    Branşı belirle, 6 haneli oda kodunu arkadaşına gönder
                  </p>
                </div>
              </div>
            </div>

            {/* Subject Selector */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] block">
                Akademik Branş Seçimi (5 Soru)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {availableSubjects.map((sub) => {
                  const isSelected = selectedSubject === sub.slug;
                  return (
                    <button
                      key={sub.slug}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setSelectedSubject(sub.slug);
                        setCreatedRoomCode(null);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#ff4b4b] bg-[#ff4b4b]/5 dark:bg-[#ff4b4b]/10 shadow-xs'
                          : 'border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] hover:border-[#ff4b4b]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                          {sub.name}
                        </span>
                        {isSelected && (
                          <div className="h-5 w-5 rounded-full bg-[#ff4b4b] text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-[#777777] dark:text-[#94a3b8] line-clamp-1">
                        {sub.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Created Room Code Display */}
            {createdRoomCode ? (
              <div className="p-6 rounded-3xl bg-[#f0fdf4] dark:bg-[#58cc02]/10 border-2 border-[#58cc02]/40 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#58cc02]">
                    Oda Başarıyla Kuruldu!
                  </span>
                  <span className="text-[11px] font-semibold text-[#777777] dark:text-[#94a3b8] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    2 Saat Geçerli
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#1e293b] border-2 border-[#58cc02]/30">
                  <div>
                    <div className="text-[10px] font-black uppercase text-[#777777] dark:text-[#94a3b8]">
                      6 Haneli Oda Kodu
                    </div>
                    <div className="text-2xl sm:text-3xl font-black tracking-widest text-[#58cc02]">
                      {createdRoomCode}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(createdRoomCode)}
                    className="btn-duo btn-duo-green px-4 py-2.5 rounded-xl text-xs font-black text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Kodu Kopyala</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      if (createdRoomId) {
                        router.push(`/duels/${createdRoomId}`);
                      }
                    }}
                    className="flex-1 btn-duo btn-duo-green py-3.5 rounded-2xl text-xs sm:text-sm font-black uppercase text-white flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Arenaya Gir ve Bekle</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                disabled={isCreating}
                onClick={handleCreateRoom}
                className="w-full btn-duo btn-duo-red py-4 rounded-2xl text-xs sm:text-sm font-black uppercase text-white flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Swords className="w-5 h-5 stroke-[2.5]" />
                <span>{isCreating ? 'Oda Hazırlanıyor...' : 'Oda Kur & Kod Üret'}</span>
              </button>
            )}
          </div>

          {/* RIGHT: Odaya Katıl & Klan Meydan Okumaları (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Join By Code Card */}
            <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#e5e5e5] dark:border-[#334155]">
                <div className="h-10 w-10 rounded-2xl bg-[#1cb0f6]/10 text-[#1cb0f6] flex items-center justify-center font-black">
                  <Play className="w-5 h-5 fill-[#1cb0f6]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                    Odaya Katıl
                  </h3>
                  <p className="text-xs text-[#777777] dark:text-[#94a3b8] font-semibold">
                    Arkadaşının verdiği 6 haneli kodu gir
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] block mb-1.5">
                    Oda Kodu (örn: COG-842)
                  </label>
                  <input
                    type="text"
                    value={joinCodeInput}
                    onChange={(e) => {
                      setJoinCodeInput(e.target.value.toUpperCase());
                      setJoinError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleJoinByCode();
                      }
                    }}
                    placeholder="COG-842"
                    maxLength={10}
                    className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] text-[#3c3c3c] dark:text-[#f8fafc] font-black text-center text-lg tracking-widest uppercase focus:outline-none focus:border-[#1cb0f6]"
                  />
                </div>

                {joinError && (
                  <div className="p-3 rounded-xl bg-[#ff4b4b]/10 border border-[#ff4b4b]/30 text-[#ff4b4b] text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{joinError}</span>
                  </div>
                )}

                <button
                  type="button"
                  disabled={isJoining || !joinCodeInput.trim()}
                  onClick={() => handleJoinByCode()}
                  className="w-full btn-duo btn-duo-blue py-3.5 rounded-2xl text-xs sm:text-sm font-black uppercase text-white flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                  <span>{isJoining ? 'Bağlanılıyor...' : 'Katıl & Başla'}</span>
                </button>
              </div>
            </div>

            {/* Active Clan Challenges List */}
            <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5] dark:border-[#334155]">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#ff9600]" />
                  <h3 className="text-base font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                    Klan Meydan Okumaları
                  </h3>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#ff9600]/10 text-[#ff9600]">
                  Canlı
                </span>
              </div>

              {activeChallenges.length > 0 ? (
                <div className="space-y-3">
                  {activeChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="p-3.5 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc] flex items-center gap-2">
                          <span>{challenge.hostUserName}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#1cb0f6]/15 text-[#1cb0f6]">
                            {challenge.code}
                          </span>
                        </div>
                        <div className="text-[11px] font-semibold text-[#777777] dark:text-[#94a3b8] flex items-center gap-2">
                          <span>{challenge.subjectName}</span>
                          <span>•</span>
                          <span>5 Branş Sorusu</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleJoinByCode(challenge.code)}
                        className="btn-duo btn-duo-red px-3 py-1.5 rounded-xl text-[11px] font-black uppercase text-white flex items-center gap-1 cursor-pointer shrink-0 shadow-xs"
                      >
                        <Swords className="w-3.5 h-3.5" />
                        <span>Meydan Oku</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-[#777777] dark:text-[#94a3b8] text-xs font-semibold space-y-2">
                  <Clock className="w-8 h-8 text-[#afafaf] dark:text-[#64748b] mx-auto stroke-[1.5]" />
                  <p>Şu an açıkta bekleyen meydan okuma yok.</p>
                  <p className="text-[11px] text-[#afafaf] dark:text-[#64748b]">
                    Yukarıdan ilk odayı sen kurarak arkadaşlarını davet et!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DuelsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 text-center font-bold">Yükleniyor...</div>}>
      <DuelsContent />
    </Suspense>
  );
}
