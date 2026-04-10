'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, Trash2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

export type TaskStatus = 'pending' | 'completed' | 'avoided' | 'failed';
export type TaskType = 'todo' | 'not_todo';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  type: TaskType;
  categoryId?: string | null;
}

export interface Subtask {
  id: string;
  title: string;
  status: 'pending' | 'completed';
}

interface TaskItemProps {
  task: Task;
  subtasks?: Subtask[];
  onToggle?: (taskId: string) => void;
  onToggleSubtask?: (subtaskId: string) => void;
  onDelete?: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, subtasks = [], onToggle, onToggleSubtask, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = task.status === 'completed';
  const hasSubtasks = subtasks.length > 0;
  const completedSubtasksCount = subtasks.filter(s => s.status === 'completed').length;
  const progressPercent = hasSubtasks ? (completedSubtasksCount / subtasks.length) * 100 : 0;

  // Drag logic for swipe to delete
  const x = useMotionValue(0);
  const backgroundOpacity = useTransform(x, [-100, -50, 0], [1, 0.5, 0]);
  const deleteIconScale = useTransform(x, [-100, -50], [1, 0.5]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -80) {
      onDelete?.(task.id);
    }
  };

  // Extracted Tailwind class variables for better readability
  const containerClasses = "relative overflow-hidden border-b border-zinc-100 dark:border-zinc-800 last:border-none";
  const mainRowClasses = "flex items-center gap-4 py-4 px-2 group cursor-pointer bg-white dark:bg-zinc-950";
  const titleClasses = `text-base font-medium truncate transition-colors ${
    isCompleted ? 'text-zinc-400 line-through' : 'text-zinc-900 dark:text-zinc-100'
  }`;
  const subtaskContainerClasses = "overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl mb-2 ml-10 mr-2";

  return (
    <div className={containerClasses}>
      {/* Delete Background Indicator */}
      <motion.div 
        style={{ opacity: backgroundOpacity }}
        className="absolute inset-0 bg-red-500 flex items-center justify-end px-6 z-0"
      >
        <motion.div style={{ scale: deleteIconScale }}>
          <Trash2 className="text-white" size={24} />
        </motion.div>
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x }}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={mainRowClasses}
        onClick={() => hasSubtasks ? setIsExpanded(!isExpanded) : onToggle?.(task.id)}
        aria-expanded={isExpanded}
        data-testid="task-item-main"
      >
        <div 
          className="flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.(task.id);
          }}
          data-testid="task-checkbox"
        >
          {isCompleted ? (
            <CheckCircle2 className="text-emerald-500" size={24} />
          ) : (
            <Circle className="text-zinc-300 dark:text-zinc-600 group-hover:text-indigo-400" size={24} />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={titleClasses}>
            {task.title}
          </h4>
          {hasSubtasks && (
            <div className="flex items-center gap-2 mt-1" data-testid="task-progress">
              <div className="h-1 flex-1 max-w-[60px] bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">
                {completedSubtasksCount}/{subtasks.length}
              </span>
            </div>
          )}
        </div>
        
        {hasSubtasks && (
          <motion.div 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="flex-shrink-0 text-zinc-400"
            data-testid="expand-chevron"
          >
            <ChevronDown size={18} />
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {isExpanded && hasSubtasks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={subtaskContainerClasses}
          >
            <div className="py-3 px-2 space-y-3" data-testid="subtask-list">
              {subtasks.map((subtask) => (
                <div 
                  key={subtask.id}
                  className="flex items-center gap-3 py-1 group/sub cursor-pointer"
                  onClick={() => onToggleSubtask?.(subtask.id)}
                >
                  {subtask.status === 'completed' ? (
                    <CheckCircle2 className="text-emerald-500/70" size={18} />
                  ) : (
                    <Circle className="text-zinc-300 dark:text-zinc-700 group-hover/sub:text-indigo-400" size={18} />
                  )}
                  <span className={`text-sm ${subtask.status === 'completed' ? 'text-zinc-400 line-through' : 'text-zinc-700 dark:text-zinc-300'}`}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskItem;
