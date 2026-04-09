'use client';

import React from 'react';
import { Check, X, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export interface NotTodoTask {
  id: string;
  title: string;
  status: 'pending' | 'avoided' | 'failed';
  type: 'not_todo';
}

interface NotTodoItemProps {
  task: NotTodoTask;
  streak: number;
  onStatusChange?: (id: string, status: 'avoided' | 'failed') => void;
}

const NotTodoItem: React.FC<NotTodoItemProps> = ({ task, streak, onStatusChange }) => {
  const isAvoided = task.status === 'avoided';
  const isFailed = task.status === 'failed';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex flex-col gap-4 p-5 mb-4 rounded-[2rem] border transition-all duration-300 ${
        isAvoided 
          ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/30' 
          : isFailed 
            ? 'bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 opacity-75' 
            : 'bg-red-50/50 border-red-100 dark:bg-red-950/10 dark:border-red-900/30'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h4 className={`text-lg font-bold transition-colors ${
          isAvoided ? 'text-emerald-900 dark:text-emerald-400' : 'text-red-900 dark:text-red-400'
        }`}>
          {task.title}
        </h4>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-200 dark:border-orange-900/30 shadow-sm">
          <Flame size={14} fill="currentColor" className="animate-pulse" />
          <span className="text-xs font-black">{streak}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onStatusChange?.(task.id, 'avoided')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm shadow-sm transition-all active:scale-95 ${
            isAvoided 
              ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none' 
              : 'bg-white text-emerald-600 hover:bg-emerald-50 dark:bg-zinc-900 dark:text-emerald-400 dark:hover:bg-emerald-950/30'
          }`}
        >
          <Check size={18} strokeWidth={3} />
          Avoided
        </button>
        <button 
          onClick={() => onStatusChange?.(task.id, 'failed')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm shadow-sm transition-all active:scale-95 ${
            isFailed 
              ? 'bg-zinc-800 text-white dark:bg-zinc-700' 
              : 'bg-white text-red-600 hover:bg-red-50 dark:bg-zinc-900 dark:text-red-400 dark:hover:bg-red-950/30'
          }`}
        >
          <X size={18} strokeWidth={3} />
          Failed
        </button>
      </div>
    </motion.div>
  );
};

export default NotTodoItem;
