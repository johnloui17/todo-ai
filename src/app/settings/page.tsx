'use client';

import React from 'react';
import { User, RefreshCw, Database, LogOut, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  return (
    <>
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Settings</h1>
        <p className="text-zinc-500">Manage your account and data</p>
      </header>

      <div className="space-y-6">
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
              <span className="text-sm font-bold text-zinc-500">1.2 MB</span>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Danger Zone</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 text-red-600 font-bold py-3 px-1 hover:bg-red-50 rounded-xl transition-colors dark:text-red-400 dark:hover:bg-red-950/20">
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
