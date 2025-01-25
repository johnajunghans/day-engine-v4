'use client';

import { Theme, useTheme } from '@/context/theme-provider';
import { useEffect, useState } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    // Read from localStorage
    const storedTheme = localStorage.getItem("theme") as Theme;
        if (storedTheme) {
            document.documentElement.setAttribute('data-theme', storedTheme);
            setTheme(storedTheme);
        }
    setIsReady(true);
  }, [setTheme]);

  return (
    <>
      { isReady && children }
    </>
  );
}
