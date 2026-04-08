'use client';

import React from 'react';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskItemProps {
  id: string;
  title: string;
  isCompleted: boolean;
  hasSubtasks?: boolean;
  onToggle?: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, isCompleted, hasSubtasks, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 py-4 px-2 group cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-none"
      onClick={onToggle}
    >
      <div className="flex-shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="text-green-500" size={24} />
        ) : (
          <Circle className="text-gray-300 dark:text-gray-600" size={24} />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className={`text-base font-medium truncate ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'}`}>
          {title}
        </h4>
      </div>
      
      {hasSubtasks && (
        <div className="flex-shrink-0 text-gray-400">
          <ChevronRight size={18} />
        </div>
      )}
    </motion.div>
  );
};

export default TaskItem;
