'use client';

import React, { useEffect } from 'react';
import BottomNavBar from './BottomNavBar';
import GlobalFAB from './GlobalFAB';
import { setupPowerSync } from '@/db/powersync';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  useEffect(() => {
    setupPowerSync().catch(console.error);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100 font-sans">
      <main className="flex-1 pb-32 pt-4 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto w-full">
        {children}
      </main>
      
      <GlobalFAB />
      <BottomNavBar />
    </div>
  );
};

export default AppLayout;
