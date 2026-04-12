'use client';

import React, { useEffect, useState, useCallback } from 'react';
import CategoryManager from '@/components/dashboard/CategoryManager';
import TaskItem from '@/components/tasks/TaskItem';
import { repository } from '@/db/repository';

export default function DashboardPage() {
  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecent = useCallback(async () => {
    try {
      const tasks = await repository.getAllRecentTasks(3);
      setRecentTasks(tasks);
    } catch (err) {
      console.error('UI ERROR: fetchRecent:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  useEffect(() => {
    const handleRefresh = () => {
      fetchRecent();
    };
    window.addEventListener('task-added', handleRefresh);
    return () => window.removeEventListener('task-added', handleRefresh);
  }, [fetchRecent]);

  return (
    <>
      <header className="mb-6 mt-4">
        <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Keep track of your progress</p>
      </header>
      
      <CategoryManager />
      
      <section className="mt-12">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xl font-bold">Recent Tasks</h2>
        </div>
        
        <div className="rounded-3xl bg-white p-2 shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 min-h-[100px]">
          {loading ? (
            <div className="p-4 animate-pulse space-y-3">
              <div className="h-12 bg-zinc-50 dark:bg-zinc-800 rounded-2xl" />
              <div className="h-12 bg-zinc-50 dark:bg-zinc-800 rounded-2xl" />
            </div>
          ) : recentTasks.length > 0 ? (
            <div className="flex flex-col">
              {recentTasks.map((task, index) => (
                <TaskItem key={`${task.id}-${index}`} task={task} />
              ))}
            </div>
          ) : (
            <p className="p-10 text-center text-zinc-400 text-xs italic">
              No recent tasks. Tap the + button to begin.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
