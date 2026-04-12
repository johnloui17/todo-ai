'use client';

import React, { useEffect, useState } from 'react';
import { User, RefreshCw, Database, LogOut, Trash2, Moon, Sun } from 'lucide-react';
import { repository } from '@/db/repository';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize theme from localStorage or document class
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const isDark = savedTheme === 'dark' || (!savedTheme && document.documentElement.classList.contains('dark'));
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== 'undefined') {
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  const handleClearData = async () => {
    if (confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
      try {
        await repository.clearAllData();
        window.localStorage.clear();
        alert('All data has been cleared. App will now reload.');
        window.location.reload();
      } catch (err) {
        console.error('Failed to clear data:', err);
        alert('Failed to clear some data. Please try again.');
      }
    }
  };

  const handleCreateSampleData = async () => {
    try {
      const results = await repository.createCategory('Work', 'blue');
      // result is typically an array from .returning()
      const catId = (results as any)?.[0]?.id;
      
      await repository.createTask('Complete Project Plan', 'todo', catId);
      await repository.createTask('Email Team', 'todo', catId);
      await repository.createTask('Exercise', 'todo', null);
      await repository.createTask('Check Social Media', 'not_todo', null);
      
      alert('Sample data created!');
      window.dispatchEvent(new CustomEvent('task-added'));
    } catch (err) {
      console.error(err);
      alert('Failed to create sample data. Make sure database is initialized.');
    }
  };

  return (
    <>
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Settings</h1>
        <p className="text-zinc-500">Manage your account and data</p>
      </header>

      <div className="space-y-6">
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={20} className="text-indigo-400" /> : <Sun size={20} className="text-amber-500" />}
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Dark Mode</span>
            </div>
            <button 
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-indigo-600' : 'bg-zinc-200'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
              <User size={32} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg leading-tight text-zinc-900 dark:text-zinc-100">Anonymous User</h3>
              <p className="text-sm text-zinc-500">Sign in to sync your tasks</p>
            </div>
          </div>
          <button className="w-full mt-4 py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md transition-transform hover:scale-102 active:scale-98">
            Sign in with Google
          </button>
        </section>

        <section className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">System</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw size={20} className="text-emerald-500" />
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Sync Status</span>
              </div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Online</span>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
              <div className="flex items-center gap-3">
                <Database size={20} className="text-indigo-600" />
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Local Data</span>
              </div>
              <span className="text-sm font-bold text-zinc-500">Active</span>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Danger Zone</h2>
          <div className="space-y-4">
            <button 
              onClick={handleCreateSampleData}
              className="w-full flex items-center gap-3 text-indigo-600 font-bold py-3 px-1 hover:bg-zinc-50 rounded-xl transition-colors dark:text-indigo-400 dark:hover:bg-zinc-800/30"
            >
              <RefreshCw size={20} />
              Create Sample Data
            </button>
            <button 
              onClick={handleClearData}
              className="w-full flex items-center gap-3 text-red-600 font-bold py-3 px-1 hover:bg-red-50 rounded-xl transition-colors dark:text-red-400 dark:hover:bg-red-950/20"
            >
              <Trash2 size={20} />
              Clear All Data
            </button>
            <button className="w-full flex items-center gap-3 text-zinc-500 font-bold py-3 px-1 hover:bg-zinc-50 rounded-xl transition-colors dark:text-zinc-400 dark:hover:bg-zinc-800/30">
              <LogOut size={20} />
              Log Out
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
