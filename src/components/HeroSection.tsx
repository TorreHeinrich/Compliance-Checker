import React from 'react';
import { ArrowRight, ShieldCheck, Scale, FileCheck2, AlertCircle } from 'lucide-react';

interface HeroSectionProps {
  onStartChecker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartChecker }) => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          {/* Subtle unboxed metadata kicker */}
          <div className="flex items-center gap-2 text-xs font-medium text-blue-400 mb-4 tracking-wide uppercase">
            <span>Verordnung (EU) 2024/1689</span>
            <span aria-hidden="true">·</span>
            <span>DSGVO-Konformität für den Mittelstand</span>
            <span aria-hidden="true">·</span>
            <span>Stand 2025/2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
            EU AI Act & DSGVO Compliance-Checker für KMU
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Ermitteln Sie in wenigen Minuten, ob Ihr geplanter KI-Einsatz im Betrieb als 
            <strong> minimales</strong>, <strong>transparenzpflichtiges</strong> oder 
            <strong> reguliertes Hochrisiko-System</strong> eingestuft wird – inklusive konkreter 
            DSGVO-Auflagen, Pflichtenheft und Handlungsempfehlungen für Geschäftsführer und IT-Verantwortliche.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={onStartChecker}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 whitespace-nowrap cursor-pointer"
            >
              <span>Compliance-Check starten</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#lead-audit"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap"
            >
              Experten-Audit anfragen
            </a>
          </div>
        </div>

        {/* 3 Key Trust & Fact Pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-blue-400 mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">EU AI Act Risikoklassen</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Ampelsystem von verbotenen Praktiken (Art. 5) über Hochrisiko-Systeme (Art. 6 & Anhang III) bis hin zu Transparenzpflichten für Chatbots (Art. 50).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-500">
              Bußgelder bis zu 35 Mio. € bzw. 7 % des Jahresumsatzes
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-800/40 flex items-center justify-center text-indigo-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">DSGVO & Datenschutz</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Prüfung von Rechtsgrundlagen (Art. 6), Verbot automatisierter Einzelfallentscheidungen (Art. 22), AVV mit US-Cloud-Providern und DSFA-Pflichten.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-500">
              Strikter Schutz sensibler Mitarbeiter- & Kundendaten
            </div>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-emerald-400 mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Praxisnaher KMU-Fahrplan</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Direkt umsetzbare 5-Schritte-Checkliste inklusive KI-Verzeichnis, Modell-Nutzungsverträge, Opt-Out für Trainingsdaten und Transparenzkennzeichnung.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-500">
              Inklusive PDF-Druckexport & Lead-Anbindung an TE DIGITAL
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
