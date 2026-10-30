import React from 'react';
import { Mail, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracking }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div>
            <span className="text-base font-bold text-white block mb-1">
              TE DIGITAL
            </span>
            <p className="text-xs text-slate-400 max-w-md">
              Digitale Exzellenz, KI-Integration & datenschutzkonforme Prozessautomatisierung für den europäischen Mittelstand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.tedigital.de"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <span>www.tedigital.de</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <a
              href="mailto:torre@tedigital.de"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>torre@tedigital.de</span>
            </a>

            <button
              type="button"
              onClick={onOpenTracking}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Tracking-Pixel Snippets
            </button>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-900 text-slate-400 text-[11px] leading-relaxed">
          <strong className="text-slate-300 block mb-1">
            Rechtlicher Hinweis & Haftungsausschluss:
          </strong>
          Die in diesem interaktiven Compliance-Checker bereitgestellten Ergebnisse, Einstufungen und Handlungsempfehlungen basieren auf der Verordnung (EU) 2024/1689 (EU AI Act) und der Datenschutz-Grundverordnung (DSGVO). Sie dienen ausschließlich der unverbindlichen ersten Orientierung und Bestandsaufnahme für KMU. Sie begründen kein Mandatsverhältnis und ersetzen keine individuelle, anwaltliche oder datenschutzrechtliche Rechtsberatung durch einen zugelassenen Rechtsanwalt oder behördlich bestellten Datenschutzbeauftragten. Geben Sie keine geschützten oder personenbezogenen Realdaten in das Tool ein.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div>
            © {new Date().getFullYear()} TE DIGITAL. Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.tedigital.de" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              Impressum
            </a>
            <span>·</span>
            <a href="https://www.tedigital.de" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              Datenschutzerklärung
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
