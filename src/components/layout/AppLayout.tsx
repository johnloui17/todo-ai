'use client';

import React from 'react';
import BottomNavBar from './BottomNavBar';
import GlobalFAB from './GlobalFAB';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-black dark:text-gray-100">
      <main className="flex-1 pb-32 pt-4 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto w-full">
        {children}
      </main>
      
      <GlobalFAB />
      <BottomNavBar />
    </div>
  );
};

export default AppLayout;
