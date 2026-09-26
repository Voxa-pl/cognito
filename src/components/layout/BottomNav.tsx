'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, BookOpen, Swords, GraduationCap, User } from 'lucide-react';
import { sounds } from '@/lib/sound';

export default function BottomNav() {
  const pathname = usePathname();

  // Hide BottomNav on active quiz, exam, or duel flow for pure focus
  if (
    (pathname.startsWith('/quiz/') && pathname !== '/quiz') ||
    pathname.startsWith('/exams/placement') ||
    pathname.startsWith('/exams/scenario') ||
    (pathname.startsWith('/duels/') && pathname !== '/duels')
  ) {
    return null;
  }

  const navItems = [
    { name: 'Öğren', href: '/dashboard', icon: Compass },
    { name: 'Dersler', href: '/subjects', icon: BookOpen },
    { name: 'Düello', href: '/duels', icon: Swords },
    { name: 'Sınavlar', href: '/exams', icon: GraduationCap },
    { name: 'Profil', href: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t-2 border-[#e5e5e5] dark:border-[#334155] bg-white dark:bg-[#131f24] px-2 md:hidden shadow-lg transition-colors">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => sounds.playClick()}
            className={`flex flex-col items-center justify-center gap-1 w-16 py-1 transition-all ${
              isActive ? 'text-[#1cb0f6] font-black' : 'text-[#afafaf] dark:text-[#64748b] hover:text-[#4b4b4b] dark:hover:text-[#f8fafc]'
            }`}
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                isActive ? 'bg-[#ddf4ff] dark:bg-[#1cb0f6]/20 text-[#1cb0f6]' : ''
              }`}
            >
              <Icon className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold tracking-tight">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
