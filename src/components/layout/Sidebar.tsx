'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, BookOpen, Brain, User, Trophy, Sparkles, Flame, GraduationCap, Users, Swords } from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { CognitoLogo } from '@/components/ui/CognitoLogo';
import { sounds } from '@/lib/sound';
import { xpToNextLevel } from '@/lib/gamification/xp';

export default function Sidebar() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const navItems = [
    { name: 'ÖĞREN', href: '/dashboard', icon: Compass },
    { name: 'DERSLER', href: '/subjects', icon: BookOpen },
    { name: 'ALIŞTIRMA', href: '/quiz', icon: Brain },
    { name: 'SINAVLAR', href: '/exams', icon: GraduationCap },
    { name: 'DÜELLO', href: '/duels', icon: Swords },
    { name: 'KLANLAR', href: '/clans', icon: Users },
    { name: 'PROFİL', href: '/profile', icon: User },
  ];

  const currentLevel = user?.level || 1;
  const currentXP = user?.totalXP || 0;
  const { current: xpInLevel, needed: xpNeededForNext, progress } = xpToNextLevel(currentXP);
  const xpPercent = Math.min(100, Math.round(progress * 100));
  const remainingForNext = Math.max(0, xpNeededForNext - xpInLevel);

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col justify-between border-r-2 border-[#e5e5e5] dark:border-[#334155] bg-white dark:bg-[#131f24] p-6 md:flex z-40 transition-colors">
      <div>
        {/* Brand Header */}
        <Link
          href="/dashboard"
          onClick={() => sounds.playClick()}
          className="mb-8 block group"
        >
          <CognitoLogo size="md" showTagline={false} />
          <div className="mt-1 flex items-center gap-1.5 pl-0.5">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#a0aec0] dark:text-[#94a3b8]">
              {user?.grade || 9}. Sınıf &bull; Akademik Program
            </span>
            {user?.learningMode === 'phoenix' && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#fff0db] dark:bg-[#ff9600]/20 px-1.5 py-0.5 text-[9px] font-black text-[#d97706] dark:text-[#ff9600] border border-[#ffb74d] dark:border-[#ff9600]/40">
                <Flame className="w-2.5 h-2.5 fill-[#ff9600] text-[#ff9600]" />
                <span>Phoenix</span>
              </span>
            )}
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => sounds.playClick()}
                className={`flex items-center gap-4 rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-wider transition-all duration-150 ${
                  isActive
                    ? 'border-2 border-[#84d8ff] dark:border-[#1cb0f6]/60 border-b-4 border-b-[#1cb0f6] bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6]'
                    : 'border-2 border-transparent text-[#777777] dark:text-[#94a3b8] hover:bg-[#f7f7f7] dark:hover:bg-[#1e293b] hover:text-[#4b4b4b] dark:hover:text-[#f8fafc]'
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
                    isActive ? 'text-[#1cb0f6]' : 'text-[#afafaf] dark:text-[#64748b]'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Level & XP Progress Card */}
      <div className="rounded-3xl border-2 border-[#e5e5e5] dark:border-[#334155] border-b-4 border-b-[#cecece] dark:border-b-[#283a45] bg-[#f7f7f7] dark:bg-[#1e293b] p-4 shadow-sm">
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#ffc800] text-[#1e293b] shadow-sm">
              <Trophy className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xs font-black text-[#3c3c3c] dark:text-[#f8fafc] uppercase tracking-wider">
              Seviye {currentLevel}
            </span>
          </div>
          <span className="text-xs font-black text-[#58cc02]">{currentXP} XP</span>
        </div>

        {/* Smooth Green Progress Bar */}
        <div className="h-3 w-full rounded-full bg-[#e5e5e5] dark:bg-[#334155] overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-[#58cc02] transition-all duration-500"
            style={{ width: `${Math.max(8, xpPercent)}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-[#777777] dark:text-[#94a3b8]">
          <span>Seviye {currentLevel + 1} için</span>
          <span className="text-[#3c3c3c] dark:text-[#f8fafc]">{remainingForNext} XP</span>
        </div>
      </div>
    </aside>
  );
}
