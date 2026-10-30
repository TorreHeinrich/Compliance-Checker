import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-blue-400 transition-colors"
        >
          TE DIGITAL
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#checker"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Compliance-Checker
          </a>
          <a
            href="#risikoklassen"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Risikoklassen
          </a>
          <a
            href="#dsgvo"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            DSGVO-Leitfaden
          </a>
          <a
            href="https://www.tedigital.de"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors whitespace-nowrap shrink-0 text-slate-400"
          >
            <span>Agentur-Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#lead-audit"
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-blue-500/20"
          >
            Audit anfragen
          </a>
        </div>
      </div>
    </header>
  );
};
