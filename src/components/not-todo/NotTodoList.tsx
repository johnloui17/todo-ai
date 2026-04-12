'use client';

import React, { useEffect, useState, useCallback } from 'react';
import NotTodoItem, { NotTodoTask } from './NotTodoItem';
import { repository } from '@/db/repository';

interface EnhancedNotTodo extends NotTodoTask {
  streak: number;
}

const NotTodoList: React.FC = () => {
  const [items, setItems] = useState<EnhancedNotTodo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const notTodos = await repository.getNotTodos();
      const enhanced = await Promise.all(notTodos.map(async (task) => {
        const streak = await repository.getStreak(task.id);
        return {
          ...task,
          status: task.status as any,
          type: 'not_todo' as const,
          streak
        };
      }));
      setItems(enhanced);
    } catch (err) {
      console.error('UI ERROR: NotTodoList fetchData:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleRefresh = () => {
      fetchData();
    };
    window.addEventListener('task-added', handleRefresh);
    return () => window.removeEventListener('task-added', handleRefresh);
  }, [fetchData]);

  const handleStatusChange = async (id: string, status: 'avoided' | 'failed') => {
    await repository.updateTaskStatus(id, status);
    fetchData(); // Refresh data
  };

  if (loading) {
    return (
      <div className="mt-6 space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={`loader-nt-${i}`} className="h-32 bg-zinc-100 dark:bg-zinc-800 rounded-[2rem]" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6">
      {items.length > 0 ? (
        items.map((item, index) => (
          <NotTodoItem 
            key={`${item.id}-${index}`} 
            task={item} 
            streak={item.streak} 
            onStatusChange={handleStatusChange}
          />
        ))
      ) : (
        <div className="text-center py-12 text-zinc-500 bg-red-50/20 dark:bg-red-950/5 rounded-[2rem] border border-dashed border-red-100 dark:border-red-900/20">
          <p className="font-bold text-sm">No Not-Todos listed</p>
          <p className="text-[10px] mt-1">Start tracking habits you want to avoid</p>
        </div>
      )}
    </div>
  );
};

export default NotTodoList;
