'use client';

import React, { useEffect, useState } from 'react';
import TaskItem, { Task, Subtask } from './TaskItem';
import { repository } from '@/db/repository';

interface TaskListProps {
  categoryId?: string | null;
  isPool?: boolean;
}

interface EnhancedTask extends Task {
  subtasks: Subtask[];
}

const TaskList: React.FC<TaskListProps> = ({ categoryId, isPool }) => {
  const [tasks, setTasks] = useState<EnhancedTask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const fetchedTasks = isPool 
        ? await repository.getPoolTasks() 
        : await repository.getTasks(categoryId);
      
      const enhanced = await Promise.all(fetchedTasks.map(async (task) => {
        const subs = await repository.getSubtasks(task.id);
        return {
          ...task,
          status: task.status as any,
          type: task.type as any,
          subtasks: subs.map(s => ({ ...s, status: s.status as any }))
        };
      }));
      setTasks(enhanced);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId, isPool]);

  useEffect(() => {
    const handleRefresh = () => fetchData();
    window.addEventListener('task-added', handleRefresh);
    return () => window.removeEventListener('task-added', handleRefresh);
  }, [categoryId, isPool]);

  const handleToggleTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await repository.updateTaskStatus(taskId, newStatus);
    fetchData();
  };

  const handleToggleSubtask = async (subtaskId: string) => {
    // Find subtask to get current status
    let subtask;
    for (const task of tasks) {
      subtask = task.subtasks.find(s => s.id === subtaskId);
      if (subtask) break;
    }
    if (!subtask) return;

    const newStatus = subtask.status === 'completed' ? 'pending' : 'completed';
    await repository.updateSubtaskStatus(subtaskId, newStatus);
    fetchData();
  };

  const handleDeleteTask = async (taskId: string) => {
    await repository.deleteTask(taskId);
    fetchData();
  };

  if (loading) {
    return (
      <div className="mt-4 flex flex-col animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 border-b border-zinc-100 dark:border-zinc-800 last:border-none" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            subtasks={task.subtasks} 
            onToggle={handleToggleTask}
            onToggleSubtask={handleToggleSubtask}
            onDelete={handleDeleteTask}
          />
        ))
      ) : (
        <div className="text-center py-12 text-zinc-500">
          <p className="font-bold">No tasks found</p>
          <p className="text-xs mt-1">Ready to add something new?</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
