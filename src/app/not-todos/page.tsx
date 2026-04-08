'use client';

import React from 'react';
import NotTodoList from '@/components/not-todo/NotTodoList';

export default function NotTodosPage() {
  return (
    <>
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-black tracking-tight text-red-600 dark:text-red-500">Not-Todos</h1>
        <p className="text-zinc-500">Avoidance tracking for your habits</p>
      </header>
      
      <NotTodoList />
      
      <section className="mt-12 bg-red-50/50 p-6 rounded-3xl border border-red-100 dark:bg-red-950/10 dark:border-red-900/30">
        <h3 className="text-sm font-bold text-red-800 dark:text-red-400 uppercase tracking-widest mb-2">Did you know?</h3>
        <p className="text-sm text-red-900/70 dark:text-red-300/60 leading-relaxed italic">
          Studies show that identifying and actively avoiding bad habits is 2x more effective than just starting new good ones.
        </p>
      </section>
    </>
  );
}
