'use client';

import React from 'react';
import { Plus, Scan } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalFAB: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-center gap-3">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-lg dark:bg-blue-900/40 dark:text-blue-400"
              title="Scan Screenshot"
            >
              <Scan size={24} />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-colors"
        title="Add Task"
      >
        <Plus size={28} className={`transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
      </motion.button>
    </div>
  );
};

export default GlobalFAB;
