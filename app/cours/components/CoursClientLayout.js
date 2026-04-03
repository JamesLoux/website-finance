// Wrapper client pour la mise en page des cours
// Gère l'état ouvert/fermé de la sidebar sur mobile
// Les children (pages de cours) restent des Server Components

'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';

export default function CoursClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-1 relative">

      {/* Overlay sombre sur mobile quand la sidebar est ouverte */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar de navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Zone de contenu principale */}
      <div className="flex-1 min-w-0">

        {/* Barre hamburger — mobile uniquement */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-300 bg-white sticky top-[57px] z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
            aria-label="Ouvrir la navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm text-gray-500">Navigation des cours</span>
        </div>

        {children}
      </div>

      {/* TOC flottante — visible uniquement sur grands écrans (xl+) */}
      <TableOfContents />
    </div>
  );
}
