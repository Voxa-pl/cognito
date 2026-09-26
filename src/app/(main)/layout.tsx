'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import { useUserStore } from '@/stores/useUserStore';
import { AppLoadingScreen } from '@/components/common/AppLoadingScreen';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Route Protection: Unauthenticated users get redirected to /register
    if (!user.isAuthenticated) {
      router.replace(`/register?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Authenticated users who haven't completed onboarding get sent to /onboarding
    if (!user.isOnboarded) {
      router.replace('/onboarding');
      return;
    }
  }, [mounted, user.isAuthenticated, user.isOnboarded, pathname, router]);

  // Prestigious animated loading screen replacing the abrupt pop-in
  if (!mounted || !user.isAuthenticated || !user.isOnboarded) {
    return <AppLoadingScreen isReady={false} />;
  }

  const isFullScreenMode =
    (pathname.startsWith('/quiz/') && pathname !== '/quiz') ||
    pathname.startsWith('/exams/placement') ||
    pathname.startsWith('/exams/scenario');

  // In active quiz or exam mode, provide full screen PC experience without sidebar/topnav
  if (isFullScreenMode) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f172a]">
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f7f7] dark:bg-[#0f172a] text-[#3c3c3c] dark:text-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen pb-8">
        <TopNav />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
