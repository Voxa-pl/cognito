'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { sounds } from '@/lib/sound';

export default function ThemeSync() {
  const theme = useUserStore((state) => state.user?.settings?.theme);
  const soundEnabled = useUserStore((state) => state.user?.settings?.soundEnabled);

  useEffect(() => {
    const currentTheme = theme || 'dark';
    const root = document.documentElement;

    if (currentTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  useEffect(() => {
    sounds.setEnabled(soundEnabled ?? true);
  }, [soundEnabled]);

  return null;
}
