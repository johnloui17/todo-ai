'use client';

import React from 'react';
import TaskList from '@/components/tasks/TaskList';
import { Trash2 } from 'lucide-react';

export default function PoolPage() {
  return (
    <>
      <header className="flex items-center justify-between mb-8 mt-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Task Pool</h1>
          <p className="text-zinc-500">Triage your unassigned tasks</p>
        </div>
        <button className="p-3 rounded-2xl bg-zinc-100 text-zinc-500 hover:bg-red-50 hover:text-red-500 transition-colors dark:bg-zinc-800 dark:text-zinc-400">
          <Trash2 size={20} />
        </button>
      </header>

      <section className="mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 flex gap-3">
        {['Personal', 'Work', 'Health', 'Finance', 'Travel'].map((cat) => (
          <div 
            key={cat}
            className="flex-shrink-0 px-5 py-3 rounded-2xl bg-indigo-50 text-indigo-600 font-bold text-sm border-2 border-dashed border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400"
          >
            {cat}
          </div>
        ))}
      </section>

      <div className="bg-white rounded-3xl p-4 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 min-h-[400px]">
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">Unassigned</h2>
        <TaskList />
      </div>
    </>
  );
}
