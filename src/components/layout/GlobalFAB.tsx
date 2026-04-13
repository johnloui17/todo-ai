'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Scan, Type, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickEntryModal from '../modals/QuickEntryModal';
import { aiService, ExtractedTask } from '@/lib/ai/ocr';
import { repository } from '@/db/repository';

const GlobalFAB: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prefillData, setPrefillData] = useState<Partial<ExtractedTask> | null>(null);
  const [availableCategories, setAvailableCategories] = useState<{id: string, name: string}[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCats = async () => {
      const cats = await repository.getCategories();
      setAvailableCategories(cats.map(c => ({ id: c.id, name: c.name })));
    };
    fetchCats();
  }, []);

  const handleSuccess = () => {
    // Emit a custom event so pages can refresh their data
    window.dispatchEvent(new CustomEvent('task-added'));
    setPrefillData(null);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setIsMenuOpen(false);
    setError(null);

    try {
      // 1. Process with real AI Service
      const categoryNames = availableCategories.map(c => c.name);
      // Fallback categories if none exist
      const candidates = categoryNames.length > 0 ? categoryNames : ['Work', 'Personal', 'Shopping', 'Health'];
      
      const results = await aiService.processScreenshot(file, candidates);
      
      if (results && results.length > 0) {
        // For now, take the first task extracted. 
        // Future: Show a list of all extracted tasks to confirm.
        const firstTask = results[0];
        
        // Find matching category ID
        const matchedCat = availableCategories.find(c => c.name.toLowerCase() === firstTask.category.toLowerCase());
        
        setPrefillData({
          title: firstTask.title,
          category: matchedCat?.id || firstTask.category
        });
        
        setIsModalOpen(true);
      } else {
        setError("No tasks found in screenshot.");
      }
    } catch (err: any) {
      console.error('AI Processing Error:', err);
      setError("AI failed to process image. Try manual entry.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-24 right-6 z-40 flex flex-col items-center gap-4">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-12 right-0 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs font-medium whitespace-nowrap"
            >
              <AlertCircle size={14} />
              {error}
            </motion.div>
          )}

          {isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -top-20 right-0 bg-indigo-600 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 whitespace-nowrap"
            >
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <div className="flex flex-col">
                <span className="text-xs font-bold">AI Scanning...</span>
                <span className="text-[10px] opacity-80 italic">May take a few seconds on first run</span>
              </div>
            </motion.div>
          )}
          
          {isMenuOpen && (
            <>
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-xl border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-indigo-400"
                title="Scan Screenshot"
              >
                <Scan size={22} />
              </motion.button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept="image/*" 
                className="hidden" 
              />
              
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                onClick={() => {
                  setPrefillData(null);
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
        onClose={() => {
          setIsModalOpen(false);
          setPrefillData(null);
        }} 
        onSuccess={handleSuccess}
        prefillData={prefillData}
      />
    </>
  );
};

export default GlobalFAB;
