'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Calendar, Hash, Tag } from 'lucide-react';
import { repository } from '@/db/repository';

interface QuickEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const QuickEntryModal: React.FC<QuickEntryModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'todo' | 'not_todo'>('todo');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    if (isOpen) {
      const fetchCats = async () => {
        const cats = await repository.getCategories();
        setCategories(cats);
      };
      fetchCats();
      setTitle('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await repository.createTask(title, type, type === 'todo' ? categoryId : null);
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 inset-x-0 bg-white dark:bg-zinc-950 rounded-t-[2.5rem] z-50 p-6 pb-12 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black">Quick Entry</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  autoFocus
                  type="text"
                  placeholder="What needs to be done?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-lg font-bold bg-transparent border-none focus:ring-0 p-0 placeholder-zinc-300 dark:placeholder-zinc-700 dark:text-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType('todo')}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                    type === 'todo' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                      : 'bg-zinc-50 text-zinc-500 dark:bg-zinc-900'
                  }`}
                >
                  To-do
                </button>
                <button
                  type="button"
                  onClick={() => setType('not_todo')}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                    type === 'not_todo' 
                      ? 'bg-red-600 text-white shadow-lg shadow-red-200 dark:shadow-none' 
                      : 'bg-zinc-50 text-zinc-500 dark:bg-zinc-900'
                  }`}
                >
                  Not-todo
                </button>
              </div>

              {type === 'todo' && categories.length > 0 && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Add to Category (Optional)</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setCategoryId(null)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        categoryId === null 
                          ? 'bg-zinc-800 text-white dark:bg-white dark:text-black' 
                          : 'bg-zinc-50 text-zinc-500 dark:bg-zinc-900'
                      }`}
                    >
                      Task Pool
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategoryId(cat.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          categoryId === cat.id 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-zinc-50 text-zinc-500 dark:bg-zinc-900'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!title.trim()}
                className="w-full py-4 rounded-2xl bg-zinc-900 text-white font-black text-lg shadow-xl disabled:opacity-30 transition-all active:scale-[0.98] dark:bg-white dark:text-black"
              >
                Save Task
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickEntryModal;
