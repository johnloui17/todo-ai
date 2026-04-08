'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import TaskList from '@/components/tasks/TaskList';
import { ArrowLeft, MoreVertical, Plus } from 'lucide-react';

export default function CategoryDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Mock category data finding
  const categoryName = 'Personal';

  return (
    <>
      <header className="sticky top-0 z-10 bg-zinc-50 dark:bg-zinc-950 pt-4 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">{categoryName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 w-24 bg-zinc-200 rounded-full overflow-hidden dark:bg-zinc-800">
                <div className="h-full bg-indigo-600 w-[65%]" />
              </div>
              <span className="text-[10px] font-bold text-zinc-500">65%</span>
            </div>
          </div>
        </div>
        <button className="p-2 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400">
          <MoreVertical size={20} />
        </button>
      </header>

      <div className="bg-white rounded-3xl p-4 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 min-h-[500px]">
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Add a task..." 
            className="w-full bg-zinc-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
        </div>

        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">Tasks</h2>
        <TaskList />
      </div>
    </>
  );
}
