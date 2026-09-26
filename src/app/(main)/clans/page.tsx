'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Shield,
  Trophy,
  Award,
  Sparkles,
  Flame,
  MessageSquare,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Compass,
  BookOpen,
  Send,
  LogOut,
  Target,
  ChevronRight,
  Check,
  Swords,
} from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { AcademicClan, ClanQuest } from '@/types';
import { sounds } from '@/lib/sound';

export default function ClansPage() {
  const user = useUserStore((state) => state.user);
  const clans = useUserStore((state) => state.clans);
  const joinClan = useUserStore((state) => state.joinClan);
  const leaveClan = useUserStore((state) => state.leaveClan);
  const createClan = useUserStore((state) => state.createClan);
  const addClanAnnouncement = useUserStore((state) => state.addClanAnnouncement);
  const claimClanQuestReward = useUserStore((state) => state.claimClanQuestReward);

  const [activeTab, setActiveTab] = useState<'my_clan' | 'explore' | 'leaderboard'>('my_clan');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Create clan modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [clanForm, setClanForm] = useState({
    name: '',
    tag: '',
    motto: '',
    description: '',
    category: 'Genel Akademik Zirve' as AcademicClan['category'],
    badgeIcon: 'Shield',
  });

  // Announcement state
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const userClan = clans.find((c) => c.id === user?.clanId);

  // If user is not in a clan, default to explore tab
  const displayTab = !userClan && activeTab === 'my_clan' ? 'explore' : activeTab;

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleJoin = (clanId: string) => {
    sounds.playClick();
    const res = joinClan(clanId);
    showToast(res.success ? 'success' : 'error', res.message);
    if (res.success) {
      setActiveTab('my_clan');
    }
  };

  const handleLeave = () => {
    sounds.playClick();
    leaveClan();
    showToast('success', 'Klandan ayrıldınız.');
    setActiveTab('explore');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = clanForm.name.trim();
    const cleanTag = clanForm.tag.trim();

    if (!cleanName || !cleanTag) {
      showToast('error', 'Lütfen klan adı ve kısaltma etiketini giriniz.');
      return;
    }
    sounds.playClick();
    const res = createClan({
      name: cleanName,
      tag: cleanTag,
      motto: clanForm.motto || 'Birlikte Zirveye!',
      description: clanForm.description || 'Akademik çalışma ve sınav hazırlık klanı.',
      category: clanForm.category,
      badgeIcon: clanForm.badgeIcon,
    });

    if (!res.success) {
      showToast('error', res.message);
      return;
    }

    setCreateModalOpen(false);
    setClanForm({
      name: '',
      tag: '',
      motto: '',
      description: '',
      category: 'Genel Akademik Zirve',
      badgeIcon: 'Shield',
    });
    showToast('success', res.message);
    setActiveTab('my_clan');
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.trim() || !userClan) return;
    addClanAnnouncement(userClan.id, newAnnouncement.trim());
    setNewAnnouncement('');
    showToast('success', 'Duyuru klan panosunda paylaşıldı!');
  };

  // Filter clans
  const filteredClans = clans.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Global clans leaderboard sorted by weekly XP
  const globalRankings = [...clans].sort((a, b) => b.weeklyXP - a.weeklyXP);

  return (
    <div className="container max-w-6xl mx-auto px-2 py-4 pb-24 space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2.5 rounded-2xl bg-[#1e293b] text-white px-5 py-3.5 shadow-2xl border-2 border-[#334155] animate-in fade-in slide-in-from-top-4 duration-200">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#58cc02]" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#ff4b4b]" />
          )}
          <span className="text-xs sm:text-sm font-black tracking-wide">
            {toastMessage.text}
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border border-[#84d8ff] dark:border-[#1cb0f6]/40 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#1cb0f6]">
                Akademik Takımlar & Loncalar
              </span>
              <span className="rounded-full bg-[#fff0db] dark:bg-[#ff9600]/20 border border-[#ffb74d] dark:border-[#ff9600]/40 px-3 py-1 text-xs font-black text-[#ff9600]">
                2026-2027 Akademik Model
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#3c3c3c] dark:text-[#f8fafc] tracking-tight flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40">
                <Users className="w-7 h-7 stroke-[2.5]" />
              </div>
              <span>Akademik Klan Sistemi</span>
            </h1>
            <p className="text-[#777777] dark:text-[#94a3b8] text-xs sm:text-sm font-semibold max-w-2xl leading-relaxed">
              Öğrenciler arası ciddi ve motive edici akademik dayanışma. Ortak soru hedefleri tamamlayın, haftalık XP havuzunu büyütün ve lig sıralamasında yükselin.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                setCreateModalOpen(true);
              }}
              className="btn-duo btn-duo-green px-5 py-3 rounded-2xl text-xs font-black uppercase text-white flex items-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Yeni Klan Kur</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-8 pt-6 border-t border-[#e5e5e5] dark:border-[#334155] flex flex-wrap gap-2.5">
          {userClan && (
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('my_clan');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-b-4 transition-all cursor-pointer ${
                displayTab === 'my_clan'
                  ? 'bg-[#1cb0f6] border-[#1899d6] border-b-[#168ec7] text-white shadow-md'
                  : 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] text-[#777777] dark:text-[#94a3b8]'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Klanım ({userClan.tag})</span>
            </button>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('explore');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-b-4 transition-all cursor-pointer ${
              displayTab === 'explore'
                ? 'bg-[#1cb0f6] border-[#1899d6] border-b-[#168ec7] text-white shadow-md'
                : 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] text-[#777777] dark:text-[#94a3b8]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Klanları Keşfet</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('leaderboard');
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-b-4 transition-all cursor-pointer ${
              displayTab === 'leaderboard'
                ? 'bg-[#1cb0f6] border-[#1899d6] border-b-[#168ec7] text-white shadow-md'
                : 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] border-b-[#cecece] dark:border-b-[#1e293b] text-[#777777] dark:text-[#94a3b8]'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Küresel Lig Sıralaması</span>
          </button>
        </div>
      </div>

      {/* TAB 1: KLANIM (MY CLAN DASHBOARD) */}
      {displayTab === 'my_clan' && userClan && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Clan Overview Card */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e5e5e5] dark:border-[#334155]">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-3xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 border-2 border-[#84d8ff] dark:border-[#1cb0f6]/40 flex items-center justify-center text-[#1cb0f6] shadow-md shrink-0">
                  <Shield className="w-8 h-8 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-[#1cb0f6] text-white shadow-xs">
                      {userClan.tag}
                    </span>
                    <span className="text-xs font-bold text-[#ff9600] bg-[#fff0db] dark:bg-[#ff9600]/20 px-2.5 py-0.5 rounded-md border border-[#ffb74d] dark:border-[#ff9600]/30">
                      Seviye {userClan.level} Klan
                    </span>
                    <span className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8]">
                      Lider: {userClan.leaderName}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                    {userClan.name}
                  </h2>
                  <p className="text-xs font-bold text-[#1cb0f6] italic">
                    "{userClan.motto}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <button
                  onClick={handleLeave}
                  className="btn-duo btn-duo-white px-4 py-2.5 rounded-2xl text-xs font-black text-[#ea2b2b] border-[#ffb4b4] dark:border-[#ff4b4b]/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Klandan Ayrıl</span>
                </button>
              </div>
            </div>

            {/* Clan Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6">
              <div className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-center">
                <span className="text-[10px] font-black uppercase text-[#777777] dark:text-[#94a3b8]">
                  Haftalık Klan XP
                </span>
                <div className="text-xl font-black text-[#1cb0f6] mt-1">
                  {userClan.weeklyXP} XP
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-center">
                <span className="text-[10px] font-black uppercase text-[#777777] dark:text-[#94a3b8]">
                  Klan Üye Sayısı
                </span>
                <div className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc] mt-1">
                  {userClan.memberCount} / 10
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-center">
                <span className="text-[10px] font-black uppercase text-[#777777] dark:text-[#94a3b8]">
                  Sizin Katkınız
                </span>
                <div className="text-xl font-black text-[#58cc02] mt-1">
                  {user?.clanContributionXP || 0} XP
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-center">
                <span className="text-[10px] font-black uppercase text-[#777777] dark:text-[#94a3b8]">
                  Toplam Klan XP
                </span>
                <div className="text-xl font-black text-[#ffc800] mt-1">
                  {userClan.totalXP} XP
                </div>
              </div>
            </div>
          </div>

          {/* Clan Quests & Member Leaderboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Weekly Clan Quests */}
            <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-base text-[#3c3c3c] dark:text-[#f8fafc] flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#ff9600]" />
                  <span>Haftalık Ortak Çalışma Hedefleri</span>
                </h3>
                <span className="text-[11px] font-bold text-[#afafaf] dark:text-[#64748b]">
                  Pazar Gecesi Yenilenir
                </span>
              </div>

              <div className="space-y-3.5">
                {userClan.weeklyQuests.map((quest) => {
                  const percent = Math.min(100, Math.round((quest.currentValue / quest.targetValue) * 100));
                  return (
                    <div
                      key={quest.id}
                      className="p-4 rounded-2xl border-2 border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a] space-y-2.5"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc]">
                            {quest.title}
                          </div>
                          <div className="text-[11px] font-semibold text-[#777777] dark:text-[#94a3b8]">
                            {quest.description}
                          </div>
                        </div>
                        <span className="text-[11px] font-black text-[#58cc02] bg-[#e5f8d0] dark:bg-[#58cc02]/20 px-2 py-0.5 rounded-md shrink-0">
                          +{quest.rewardXP} XP
                        </span>
                      </div>

                      <div className="h-2.5 w-full bg-[#e5e5e5] dark:bg-[#334155] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            quest.completed ? 'bg-[#58cc02]' : 'bg-[#1cb0f6]'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-bold text-[#777777] dark:text-[#94a3b8]">
                        <span>{quest.currentValue} / {quest.targetValue}</span>
                        {quest.claimed ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#58cc02] bg-[#d7ffb8] dark:bg-[#58cc02]/20 px-2.5 py-0.5 rounded-lg border border-[#bcf087] dark:border-[#58cc02]/40">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Ödül Alındı</span>
                          </span>
                        ) : quest.completed ? (
                          <button
                            onClick={() => claimClanQuestReward(quest.id)}
                            className="btn-duo btn-duo-green px-3 py-1 rounded-lg text-[10px] font-black text-white cursor-pointer"
                          >
                            Ödülü Al (+{quest.rewardXP} XP)
                          </button>
                        ) : (
                          <span>%{percent} Tamamlandı</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Member Contribution Leaderboard */}
            <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-base text-[#3c3c3c] dark:text-[#f8fafc] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#ffc800]" />
                  <span>Klan İçi Katkı Sıralaması</span>
                </h3>
                <span className="text-[11px] font-bold text-[#afafaf] dark:text-[#64748b]">
                  {userClan.members.length} Üye
                </span>
              </div>

              <div className="space-y-2">
                {[...userClan.members]
                  .sort((a, b) => b.weeklyXPContribution - a.weeklyXPContribution)
                  .map((mem, idx) => {
                    const isCurrentUser = mem.name === (user?.fullName || user?.username);
                    return (
                      <div
                        key={mem.id || idx}
                        className={`p-3 rounded-2xl border-2 flex items-center justify-between ${
                          isCurrentUser
                            ? 'border-[#1cb0f6] bg-[#ddf4ff]/50 dark:bg-[#1cb0f6]/20'
                            : 'border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 text-center font-black text-xs ${
                              idx === 0
                                ? 'text-[#ffc800]'
                                : idx === 1
                                ? 'text-[#a0aec0]'
                                : idx === 2
                                ? 'text-[#d97706]'
                                : 'text-[#777777] dark:text-[#94a3b8]'
                            }`}
                          >
                            {`#${idx + 1}`}
                          </span>
                          <div>
                            <div className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc] flex items-center gap-1.5">
                              <span>{mem.name}</span>
                              {mem.role === 'leader' && (
                                <span className="text-[9px] font-black uppercase text-[#ff9600] bg-[#fff0db] dark:bg-[#ff9600]/20 px-1.5 py-0.2 rounded">
                                  Lider
                                </span>
                              )}
                              {isCurrentUser && (
                                <span className="text-[9px] font-black uppercase text-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 px-1.5 py-0.2 rounded">
                                  Siz
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#777777] dark:text-[#94a3b8] font-semibold">
                              {mem.grade}. Sınıf
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-black text-[#58cc02]">
                            +{mem.weeklyXPContribution} XP
                          </span>
                          {!isCurrentUser && (
                            <Link
                              href={`/duels?inviteUser=${encodeURIComponent(mem.name)}`}
                              onClick={() => sounds.playClick()}
                              className="px-2.5 py-1.5 rounded-xl bg-[#ff4b4b]/10 hover:bg-[#ff4b4b]/20 text-[#ff4b4b] border border-[#ff4b4b]/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                              title="Akademik Düelloya Davet Et"
                            >
                              <Swords className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Düelloya Davet Et</span>
                              <span className="sm:hidden">Düello</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Clan Announcements & Motivation Board */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
            <h3 className="font-black text-base text-[#3c3c3c] dark:text-[#f8fafc] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#1cb0f6]" />
              <span>Klan Dayanışma & Duyuru Panosu</span>
            </h3>

            {/* Post Announcement */}
            <form onSubmit={handlePostAnnouncement} className="flex gap-2">
              <input
                type="text"
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                placeholder="Takım arkadaşlarınızla bir çalışma hedefi veya motivasyon mesajı paylaşın..."
                className="flex-1 px-4 py-2.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-xs font-semibold text-[#3c3c3c] dark:text-[#f8fafc] outline-none focus:border-[#1cb0f6] transition-colors"
              />
              <button
                type="submit"
                className="btn-duo btn-duo-blue px-4 py-2.5 rounded-2xl text-xs font-black text-white flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Paylaş</span>
              </button>
            </form>

            <div className="space-y-2.5 pt-2">
              {userClan.announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border border-[#e5e5e5] dark:border-[#334155] space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-[#1cb0f6]">
                      {ann.authorName} ({ann.authorRole})
                    </span>
                    <span className="text-[10px] text-[#afafaf] dark:text-[#64748b]">
                      {new Date(ann.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#3c3c3c] dark:text-[#f8fafc] leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXPLORE CLANS */}
      {displayTab === 'explore' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Filter Bar */}
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Klan ara (İsim, etiket veya kategori)..."
              className="px-4 py-2.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-xs font-semibold text-[#3c3c3c] dark:text-[#f8fafc] outline-none focus:border-[#1cb0f6] transition-colors md:w-80"
            />

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'Tümü' },
                { id: 'Fen & Matematik', label: 'Fen & Matematik' },
                { id: 'Genel Akademik Zirve', label: 'Zirve Takımları' },
                { id: 'Sosyal Bilimler', label: 'Sosyal Bilimler' },
                { id: 'Yeniden Doğuş / Phoenix', label: 'Phoenix Telafi' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap border cursor-pointer transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#1cb0f6] border-[#1899d6] text-white'
                      : 'bg-[#f7f7f7] dark:bg-[#0f172a] border-[#e5e5e5] dark:border-[#334155] text-[#777777] dark:text-[#94a3b8]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clans Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClans.map((clan) => {
              const isMember = user?.clanId === clan.id;
              const isLevelOk = (user?.level || 1) >= clan.minLevelRequired;
              const maxMembers = clan.maxMembers || 10;
              const isFull = clan.memberCount >= maxMembers;

              return (
                <div
                  key={clan.id}
                  className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6] flex items-center justify-center font-black text-lg border border-[#84d8ff] dark:border-[#1cb0f6]/40">
                          <Shield className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-black uppercase text-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 px-2 py-0.5 rounded">
                              {clan.tag}
                            </span>
                            <span className="text-[10px] font-black uppercase text-[#ff9600] bg-[#fff0db] dark:bg-[#ff9600]/20 px-2 py-0.5 rounded">
                              L{clan.level}
                            </span>
                            {isFull && (
                              <span className="text-[10px] font-black uppercase text-[#ef4444] bg-[#fee2e2] dark:bg-[#ef4444]/20 border border-[#fca5a5] dark:border-[#ef4444]/40 px-2 py-0.5 rounded">
                                Kontenjan Dolu (10/10)
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-black text-[#3c3c3c] dark:text-[#f8fafc] mt-0.5">
                            {clan.name}
                          </h3>
                        </div>
                      </div>

                      <span className="text-xs font-black text-[#58cc02]">
                        {clan.weeklyXP} XP / Hafta
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#777777] dark:text-[#94a3b8] leading-relaxed">
                      {clan.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] font-bold text-[#777777] dark:text-[#94a3b8] pt-1">
                      <span className={isFull ? 'text-[#ef4444] font-black' : ''}>
                        Üyeler: {clan.memberCount} / 10
                      </span>
                      <span>•</span>
                      <span>Min Seviye: {clan.minLevelRequired}</span>
                      <span>•</span>
                      <span>Lider: {clan.leaderName}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#e5e5e5] dark:border-[#334155] flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#afafaf] dark:text-[#64748b]">
                      {clan.category}
                    </span>

                    {isMember ? (
                      <span className="text-xs font-black text-[#58cc02] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Mevcut Klanınız
                      </span>
                    ) : isFull ? (
                      <button
                        disabled
                        className="btn-duo btn-duo-disabled opacity-60 px-4 py-2 rounded-xl text-xs font-black uppercase cursor-not-allowed text-[#ef4444]"
                      >
                        Kontenjan Dolu (10/10)
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoin(clan.id)}
                        disabled={!isLevelOk}
                        className={`btn-duo px-5 py-2 rounded-xl text-xs font-black uppercase cursor-pointer ${
                          isLevelOk ? 'btn-duo-blue text-white' : 'btn-duo-disabled opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {isLevelOk ? 'Klana Katıl' : `Min Seviye ${clan.minLevelRequired}`}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: GLOBAL LEADERBOARD */}
      {displayTab === 'leaderboard' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#e5e5e5] dark:border-[#334155] pb-4">
              <div>
                <h2 className="text-lg font-black text-[#3c3c3c] dark:text-[#f8fafc] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#ffc800]" />
                  <span>Türkiye Geneli Akademik Klan Ligi</span>
                </h2>
                <p className="text-xs text-[#777777] dark:text-[#94a3b8] font-semibold">
                  Haftalık XP havuzuna göre Türkiye genelindeki en başarılı takımlar.
                </p>
              </div>

              <span className="text-xs font-black text-[#ffc800] bg-[#fff8db] dark:bg-[#ffc800]/20 border border-[#ffc800]/40 px-3 py-1 rounded-xl">
                Altın Lig
              </span>
            </div>

            <div className="space-y-2.5">
              {globalRankings.map((clan, idx) => {
                const isUserClan = user?.clanId === clan.id;
                return (
                  <div
                    key={clan.id}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                      isUserClan
                        ? 'border-[#1cb0f6] bg-[#ddf4ff]/50 dark:bg-[#1cb0f6]/20 shadow-sm'
                        : 'border-[#e5e5e5] dark:border-[#334155] bg-[#f7f7f7] dark:bg-[#0f172a]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-8 text-center font-black text-base ${
                          idx === 0
                            ? 'text-[#ffc800]'
                            : idx === 1
                            ? 'text-[#a0aec0]'
                            : idx === 2
                            ? 'text-[#d97706]'
                            : 'text-[#777777] dark:text-[#94a3b8]'
                        }`}
                      >
                        {`#${idx + 1}`}
                      </span>

                      <div className="h-10 w-10 rounded-xl bg-white dark:bg-[#1e293b] text-[#1cb0f6] flex items-center justify-center border border-[#e5e5e5] dark:border-[#334155]">
                        <Shield className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="text-sm font-black text-[#3c3c3c] dark:text-[#f8fafc] flex items-center gap-2">
                          <span>{clan.name}</span>
                          <span className="text-[10px] font-black uppercase text-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 px-1.5 py-0.2 rounded">
                            {clan.tag}
                          </span>
                          {isUserClan && (
                            <span className="text-[10px] font-black text-[#58cc02] bg-[#e5f8d0] dark:bg-[#58cc02]/20 px-1.5 py-0.2 rounded">
                              Takımınız
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#777777] dark:text-[#94a3b8] font-semibold">
                          Seviye {clan.level} • {clan.memberCount} Üye • Lider: {clan.leaderName}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-[#1cb0f6]">
                        {clan.weeklyXP} XP
                      </div>
                      <span className="text-[10px] text-[#afafaf] dark:text-[#64748b] font-bold">
                        Toplam {clan.totalXP} XP
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CREATE CLAN MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-6 border-b-[#cecece] dark:border-b-[#1e293b] bg-white dark:bg-[#1e293b] p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <h3 className="text-xl font-black text-[#3c3c3c] dark:text-[#f8fafc] mb-1">
              Yeni Akademik Klan Kur
            </h3>
            <p className="text-xs text-[#777777] dark:text-[#94a3b8] font-semibold mb-6">
              Lise akademik programında birlikte çalışacağınız öğrenci takımınızı oluşturun.
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] mb-1.5">
                  Klan Adı
                </label>
                <input
                  type="text"
                  required
                  value={clanForm.name}
                  onChange={(e) => setClanForm({ ...clanForm, name: e.target.value })}
                  placeholder="Örn: Anadolu Liseleri Zirve Takımı"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc] outline-none focus:border-[#1cb0f6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] mb-1.5">
                    Etiket / Tag (Kısaltma)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={clanForm.tag}
                    onChange={(e) => setClanForm({ ...clanForm, tag: e.target.value })}
                    placeholder="Örn: [ZİRVE]"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc] outline-none focus:border-[#1cb0f6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] mb-1.5">
                    Kategori
                  </label>
                  <select
                    value={clanForm.category}
                    onChange={(e) => setClanForm({ ...clanForm, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc] outline-none focus:border-[#1cb0f6]"
                  >
                    <option value="Genel Akademik Zirve">Genel Akademik Zirve</option>
                    <option value="Fen & Matematik">Fen & Matematik</option>
                    <option value="Sosyal Bilimler">Sosyal Bilimler</option>
                    <option value="Yeniden Doğuş / Phoenix">Yeniden Doğuş / Phoenix</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] mb-1.5">
                  Klan Sloganı / Motto
                </label>
                <input
                  type="text"
                  value={clanForm.motto}
                  onChange={(e) => setClanForm({ ...clanForm, motto: e.target.value })}
                  placeholder="Örn: Disiplin, İstikrar ve Tam Akademik Başarı."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-xs font-semibold text-[#3c3c3c] dark:text-[#f8fafc] outline-none focus:border-[#1cb0f6]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#777777] dark:text-[#94a3b8] mb-1.5">
                  Açıklama & Hedefler
                </label>
                <textarea
                  rows={3}
                  value={clanForm.description}
                  onChange={(e) => setClanForm({ ...clanForm, description: e.target.value })}
                  placeholder="Klanınızın amaçlarını ve çalışma vizyonunu belirtin..."
                  className="w-full px-4 py-2 rounded-2xl bg-[#f7f7f7] dark:bg-[#0f172a] border-2 border-[#e5e5e5] dark:border-[#334155] text-xs font-semibold text-[#3c3c3c] dark:text-[#f8fafc] outline-none focus:border-[#1cb0f6] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="btn-duo btn-duo-white flex-1 py-3 rounded-2xl text-xs font-black cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="btn-duo btn-duo-green flex-1 py-3 rounded-2xl text-xs font-black text-white cursor-pointer"
                >
                  Klanı Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
