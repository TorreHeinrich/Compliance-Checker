import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      id="disclaimer-banner"
      role="alert"
      className="bg-amber-950/40 border-b border-amber-500/30 text-amber-200 px-4 py-3 relative transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">
              Wichtiger Datenschutz- & Vertraulichkeitshinweis:
            </span>{' '}
            <span>
              Bitte geben Sie <strong>KEINE sensiblen, personenbezogenen oder vertraulichen Unternehmensdaten</strong> (wie Klarnamen, Kundendaten oder Geschäftsgeheimnisse) in dieses Tool ein.
            </span>
            {!collapsed && (
              <p className="mt-1 text-xs text-amber-300/80 leading-relaxed">
                Diese Anwendung läuft als öffentliches Web-Tool auf Standard-Servern. Die Auswertung dient der ersten fachlichen Orientierung und ersetzt keine anwaltliche oder datenschutzrechtliche Rechtsberatung.
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="text-xs text-amber-300/90 hover:text-amber-100 flex items-center gap-1 shrink-0 self-end md:self-center px-2 py-1 rounded hover:bg-amber-900/40 transition-colors"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Datenschutzhinweis erweitern" : "Datenschutzhinweis reduzieren"}
        >
          {collapsed ? (
            <>
              <span>Details einblenden</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Weniger anzeigen</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
