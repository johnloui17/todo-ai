import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TaskList from '@/components/tasks/TaskList';
import { ArrowLeft, MoreVertical, Plus } from 'lucide-react';
import { repository } from '@/db/repository';

export default function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [categoryName, setCategoryName] = useState('Loading...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const cats = await repository.getCategories();
        const cat = cats.find(c => c.id === id);
        if (cat) {
          setCategoryName(cat.name);
          
          // Calculate progress (duplicated logic for now, could be in repository)
          const catTasks = await repository.getTasks(id);
          let totalItems = 0;
          let completedItems = 0;
          for (const task of catTasks) {
            totalItems++;
            if (task.status === 'completed') completedItems++;
            const subtasks = await repository.getSubtasks(task.id);
            for (const sub of subtasks) {
              totalItems++;
              if (sub.status === 'completed') completedItems++;
            }
          }
          setProgress(totalItems === 0 ? 0 : (completedItems / totalItems) * 100);
        }
      } catch (err) {
        console.error('Failed to fetch category details:', err);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  useEffect(() => {
    const handleRefresh = () => {
      const fetchCategory = async () => {
        try {
          const cats = await repository.getCategories();
          const cat = cats.find(c => c.id === id);
          if (cat) {
            setCategoryName(cat.name);
            const catTasks = await repository.getTasks(id);
            let totalItems = 0;
            let completedItems = 0;
            for (const task of catTasks) {
              totalItems++;
              if (task.status === 'completed') completedItems++;
              const subtasks = await repository.getSubtasks(task.id);
              for (const sub of subtasks) {
                totalItems++;
                if (sub.status === 'completed') completedItems++;
              }
            }
            setProgress(totalItems === 0 ? 0 : (completedItems / totalItems) * 100);
          }
        } catch (err) {
          console.error('Failed to refresh category details:', err);
        }
      };
      if (id) fetchCategory();
    };
    window.addEventListener('task-added', handleRefresh);
    return () => window.removeEventListener('task-added', handleRefresh);
  }, [id]);

  const handleInlineSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
      const title = (e.target as HTMLInputElement).value.trim();
      await repository.createTask(title, 'todo', id);
      (e.target as HTMLInputElement).value = '';
      window.dispatchEvent(new CustomEvent('task-added'));
    }
  };

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
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-zinc-500">{Math.round(progress)}%</span>
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
            onKeyDown={handleInlineSubmit}
            className="w-full bg-zinc-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
        </div>

        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">Tasks</h2>
        <TaskList categoryId={id} />
      </div>
    </>
  );
}
