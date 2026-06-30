'use client';

import { useState, ReactNode } from 'react';
import Sidebar, { Icon, ICONS } from '@/components/dashboard/Sidebar';

// ── Top Bar ───────────────────────────────────────────────────────────────────
interface TopbarProps {
  title: string;
  subtitle?: string;
  onToggle: () => void;
}
export function Topbar({ title, subtitle, onToggle }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 h-14 flex items-center px-4 sm:px-6 gap-4
      bg-white dark:bg-[#1a1d27] border-b border-slate-100 dark:border-[#2a2d3a] shadow-sm">
      <button
        onClick={onToggle}
        className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white flex-shrink-0 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Icon d={ICONS.menu} className="w-5 h-5" />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="text-base font-extrabold text-slate-900 dark:text-white leading-none">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-[#2a2d3a] rounded-xl px-3 h-9 gap-2 w-56 flex-shrink-0">
        <Icon d={ICONS.search} className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent text-xs text-slate-700 dark:text-slate-300 focus:outline-none placeholder-slate-400 dark:placeholder-slate-600 flex-1"
        />
      </div>

      {/* Notification bell */}
      <button className="relative text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white flex-shrink-0 transition-colors">
        <Icon d={ICONS.bell} className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-[9px] font-extrabold text-white flex items-center justify-center">
          5
        </span>
      </button>
    </header>
  );
}

// ── Dashboard Layout ──────────────────────────────────────────────────────────
interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] dark:bg-[#0f1117] font-sans text-slate-800 dark:text-slate-100">
      {/* Sidebar — reads darkMode from ThemeContext directly */}
      <Sidebar open={sidebarOpen} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-[margin] duration-300 ease-in-out
          ${sidebarOpen ? 'ml-[220px]' : 'ml-[64px]'}`}
      >
        <Topbar
          title={title}
          subtitle={subtitle}
          onToggle={() => setSidebarOpen(o => !o)}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
