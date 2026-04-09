'use client';

import React, { useState } from 'react';
import { Plus, Scan, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickEntryModal from '../modals/QuickEntryModal';

const GlobalFAB: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    // Emit a custom event so pages can refresh their data
    window.dispatchEvent(new CustomEvent('task-added'));
  };

  return (
    <>
      <div className="fixed bottom-24 right-6 z-40 flex flex-col items-center gap-4">
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                onClick={() => {
                  // AI scan logic will go here in Phase 5
                  setIsMenuOpen(false);
                }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-xl border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-indigo-400"
                title="Scan Screenshot"
              >
                <Scan size={22} />
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-xl border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-indigo-400"
                title="Quick Entry"
              >
                <Type size={22} />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-2xl transition-all duration-300 ${
            isMenuOpen 
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-black rotate-45' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
          title="Add Task"
        >
          <Plus size={28} />
        </motion.button>
      </div>

      <QuickEntryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default GlobalFAB;
