'use client';

import React from 'react';
import { Check, X, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface NotTodoItemProps {
  id: string;
  title: string;
  streak: number;
}

const NotTodoItem: React.FC<NotTodoItemProps> = ({ title, streak }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3 p-5 mb-4 rounded-3xl bg-red-50/50 border border-red-100 shadow-sm dark:bg-red-950/10 dark:border-red-900/30"
    >
      <div className="flex items-start justify-between">
        <h4 className="text-lg font-bold text-red-900 dark:text-red-400">
          {title}
        </h4>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
          <Flame size={14} fill="currentColor" />
          <span className="text-xs font-bold">{streak}d</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-green-100 text-green-700 font-bold text-sm shadow-sm transition-transform hover:scale-105 active:scale-95 dark:bg-green-900/30 dark:text-green-400">
          <Check size={18} strokeWidth={3} />
          Avoided
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-100 text-red-700 font-bold text-sm shadow-sm transition-transform hover:scale-105 active:scale-95 dark:bg-red-900/30 dark:text-red-400">
          <X size={18} strokeWidth={3} />
          Failed
        </button>
      </div>
    </motion.div>
  );
};

export default NotTodoItem;
