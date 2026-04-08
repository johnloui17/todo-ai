'use client';

import React from 'react';
import CategoryGrid from '@/components/dashboard/CategoryGrid';

export default function DashboardPage() {
  return (
    <>
      <header className="mb-6 mt-4">
        <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Keep track of your progress</p>
      </header>
      
      <CategoryGrid />
      
      <section className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Today's Focus</h2>
          <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">View All</button>
        </div>
        <div className="rounded-3xl bg-white p-2 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
          <p className="p-4 text-center text-zinc-500 text-sm italic">You're doing great! Finish 2 more tasks to hit your daily goal.</p>
        </div>
      </section>
    </>
  );
}
