import React, { useState } from 'react';
import {
  RiskAnalysis,
  ComplianceInput,
  USE_CASES,
} from '../utils/complianceEngine.ts';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  FileText,
  Printer,
  RotateCcw,
  ShieldCheck,
  Scale,
  ExternalLink,
  Mail,
  Check,
  Lock,
  Building,
} from 'lucide-react';

interface EvaluationResultProps {
  analysis: RiskAnalysis;
  input: ComplianceInput;
  onReset: () => void;
  onSelectForLead: () => void;
}

export const EvaluationResult: React.FC<EvaluationResultProps> = ({
  analysis,
  input,
  onReset,
  onSelectForLead,
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const useCaseConfig = USE_CASES[input.useCase];

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Ampel Visuals
  const getBadgeConfig = () => {
    switch (analysis.riskBadge) {
      case 'ROT':
        return {
          containerBg: 'bg-red-950/40 border-red-500/40 text-red-200',
          badgeBg: 'bg-red-600 text-white',
          glowBorder: 'border-red-500/50 shadow-red-900/20',
          icon: <AlertOctagon className="w-8 h-8 text-red-400" />,
          statusText: 'Ampel: ROT – Hohes Risiko / Verbotene Praxis',
        };
      case 'GELB':
        return {
          containerBg: 'bg-amber-950/40 border-amber-500/40 text-amber-200',
          badgeBg: 'bg-amber-500 text-slate-950',
          glowBorder: 'border-amber-500/50 shadow-amber-900/20',
          icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
          statusText: 'Ampel: GELB – Spezifische Transparenzpflichten',
        };
      case 'GRÜN':
      default:
        return {
          containerBg: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200',
          badgeBg: 'bg-emerald-600 text-white',
          glowBorder: 'border-emerald-500/50 shadow-emerald-900/20',
          icon: <CheckCircle className="w-8 h-8 text-emerald-400" />,
          statusText: 'Ampel: GRÜN – Minimales Risiko nach AI Act',
        };
    }
  };

  const badgeConfig = getBadgeConfig();

  const getAutomationLabel = () => {
    switch (input.automation) {
      case 'advisory':
        return 'Reiner Vorschlag (Human-in-the-loop)';
      case 'semi-auto':
        return 'Teilautomatisiert (menschliche Freigabe)';
      case 'fully-auto':
        return 'Vollautomatische Entscheidung (Art. 22 DSGVO)';
    }
  };

  const getDataLabel = () => {
    switch (input.dataSensitivity) {
      case 'none-or-synthetic':
        return 'Keine personenbezogenen Daten';
      case 'standard-personal':
        return 'Standard-personenbezogene Daten';
      case 'art9-special':
        return 'Besondere Kategorien nach Art. 9 DSGVO';
    }
  };

  const getScopeLabel = () => {
    switch (input.scope) {
      case 'internal-staff':
        return 'Interne Mitarbeiter / Arbeitsplatz';
      case 'b2b-clients':
        return 'B2B-Kunden';
      case 'b2c-consumers':
        return 'B2C-Endverbraucher & Öffentlichkeit';
      case 'critical-sector':
        return 'Kritische Infrastruktur / Kredit / Hochrisiko';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Summary Card */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border ${badgeConfig.glowBorder} ${badgeConfig.containerBg} shadow-xl relative overflow-hidden print-card`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 shrink-0">
              {badgeConfig.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1 text-xs">
                <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${badgeConfig.badgeBg}`}>
                  {analysis.riskBadge}
                </span>
                <span className="text-slate-300 font-mono">
                  {analysis.euAiActArticle}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {analysis.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {analysis.legalSummary}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 print-hide">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Bericht drucken / PDF</span>
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Neuer Check</span>
            </button>
          </div>
        </div>

        {/* Selected Parameters Review Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Gewählter KI-Einsatz:</span>
            <span className="font-semibold text-white">{useCaseConfig.title}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Automatisierungsgrad:</span>
            <span className="font-semibold text-white">{getAutomationLabel()}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Datensensibilität:</span>
            <span className="font-semibold text-white">{getDataLabel()}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Einsatzbereich:</span>
            <span className="font-semibold text-white">{getScopeLabel()}</span>
          </div>
        </div>
      </div>

      {/* Grid: DSGVO Analysis & EU AI Act Pflichten */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: DSGVO-Matrix */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between print-card">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Datenschutz-Grundverordnung (DSGVO) Status</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">
              Datenschutzrechtliche Pflichten für Ihr KMU
            </h3>

            <div className="space-y-3.5 text-sm">
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3">
                <div>
                  <span className="font-semibold text-white block">
                    Datenschutz-Folgenabschätzung (DSFA nach Art. 35 DSGVO)
                  </span>
                  <span className="text-xs text-slate-400">
                    {analysis.dsgvo.requiresDSFA
                      ? 'Zwingend erforderlich bei hohem Risiko, Profiling oder sensiblen Daten.'
                      : 'Aktuell voraussichtlich nicht zwingend erforderlich, jedoch Prüfung des Einzelfalls empfohlen.'}
                  </span>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded font-bold shrink-0 ${
                    analysis.dsgvo.requiresDSFA
                      ? 'bg-red-950 text-red-300 border border-red-800/60'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                  }`}
                >
                  {analysis.dsgvo.requiresDSFA ? 'PFLICHT' : 'FREI'}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3">
                <div>
                  <span className="font-semibold text-white block">
                    Auftragsverarbeitungsvertrag (AVV nach Art. 28 DSGVO)
                  </span>
                  <span className="text-xs text-slate-400">
                    {analysis.dsgvo.requiresAVV
                      ? 'Zwingend erforderlich mit KI-Cloud-Providern (OpenAI, Microsoft Azure, Google Cloud etc.).'
                      : 'Keine personenbezogenen Daten betroffen, daher kein AVV nötig.'}
                  </span>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded font-bold shrink-0 ${
                    analysis.dsgvo.requiresAVV
                      ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                  }`}
                >
                  {analysis.dsgvo.requiresAVV ? 'ERFORDERLICH' : 'NICHT NÖTIG'}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3">
                <div>
                  <span className="font-semibold text-white block">
                    Verbot automatisierter Einzelfallentscheidungen (Art. 22 DSGVO)
                  </span>
                  <span className="text-xs text-slate-400">
                    {analysis.dsgvo.art22ViolationRisk
                      ? 'Kritisch: Vollautomatische Entscheidungen mit Rechtswirkung sind verboten, außer bei ausdrücklicher Ausnahme!'
                      : 'Keine unzulässige Vollautomatisierung festgestellt (Human-in-the-loop gewahrt).'}
                  </span>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded font-bold shrink-0 ${
                    analysis.dsgvo.art22ViolationRisk
                      ? 'bg-red-950 text-red-300 border border-red-800/60'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                  }`}
                >
                  {analysis.dsgvo.art22ViolationRisk ? 'KRITISCH' : 'KONFORM'}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs text-slate-400 block mb-1">
                  Empfohlene DSGVO-Rechtsgrundlage:
                </span>
                <span className="font-semibold text-blue-300 text-xs sm:text-sm">
                  {analysis.dsgvo.recommendedLegalBasis}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <strong>Hinweis zum Drittlandtransfer:</strong> Bei Nutzung von US-gehosteten Cloud-Modellen muss das EU-US Data Privacy Framework (DPF) oder Standardvertragsklauseln (SCC) inkl. Transfer Impact Assessment nachgewiesen werden.
          </div>
        </div>

        {/* Right: EU AI Act Pflichten & Auflagen */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between print-card">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
              <Scale className="w-4 h-4" />
              <span>EU AI Act (Verordnung (EU) 2024/1689) Auflagen</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">
              Pflichten als Betreiber (Deployer) im Unternehmen
            </h3>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <strong className="text-white">Menschliche Aufsicht (Human Oversight):</strong>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Das System darf nicht blind Entscheidungen treffen. Personal muss geschult sein, Ausgaben kritisch zu hinterfragen und im Zweifel manuell zu überstimmen.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <strong className="text-white">Transparenz & Kennzeichnung (Art. 50):</strong>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Kommunizieren Sie gegenüber Nutzern und Kunden unmissverständlich, wenn KI-Systeme Inhalte generieren oder Kundenanfragen automatisiert bearbeiten.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <strong className="text-white">Logging & Nachvollziehbarkeit:</strong>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Protokollieren Sie Eingaben, Systemversionen und getroffene Entscheidungen für mindestens 6 Monate, um im Streitfall Rechenschaft ablegen zu können.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <div>
                  <strong className="text-white">Mitarbeiter-Befähigung (AI Literacy Art. 4):</strong>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Seit Februar 2025 gilt die gesetzliche Pflicht, dass alle Mitarbeiter, die KI beruflich nutzen, über ausreichende KI-Kompetenz verfügen müssen.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Zuständige deutsche Aufsicht:</span>
            <span className="text-slate-300 font-medium">BfDI & Bundesnetzagentur</span>
          </div>
        </div>
      </div>

      {/* Action Plan Checklist */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 print-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Schritt-für-Schritt-Umsetzung
            </div>
            <h3 className="text-xl font-bold text-white">
              Individueller KMU-Maßnahmenkatalog
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Haken Sie erledigte Schritte direkt ab, um Ihren Compliance-Status im Betrieb zu dokumentieren.
            </p>
          </div>

          <div className="text-xs text-slate-400 shrink-0">
            Fortschritt:{' '}
            <span className="text-emerald-400 font-bold tabular-nums">
              {Object.values(completedSteps).filter(Boolean).length} von {analysis.actionPlan.length}
            </span>{' '}
            Schritten
          </div>
        </div>

        <div className="space-y-4">
          {analysis.actionPlan.map((action) => {
            const isDone = completedSteps[action.step] || false;
            return (
              <div
                key={action.step}
                onClick={() => toggleStep(action.step)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isDone
                    ? 'bg-slate-950/40 border-emerald-500/40 opacity-75'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  aria-label={`Schritt ${action.step} als ${isDone ? 'offen' : 'erledigt'} markieren`}
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'border-slate-700 bg-slate-900 text-transparent hover:border-slate-500'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-500">
                      Schritt 0{action.step}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded font-semibold bg-slate-800 text-slate-300">
                      {action.priority}
                    </span>
                    <span className="text-xs text-amber-400/90 font-mono">
                      Frist: {action.deadlineNotice}
                    </span>
                  </div>
                  <h4
                    className={`text-base font-semibold transition-colors ${
                      isDone ? 'line-through text-slate-400' : 'text-white'
                    }`}
                  >
                    {action.title}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lead Hook Banner within Report */}
        <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print-hide">
          <div>
            <h4 className="text-base font-bold text-white">
              Brauchen Sie Unterstützung bei der rechtssicheren Umsetzung?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              TE DIGITAL begleitet mittelständische Unternehmen bei der Erstellung von KI-Richtlinien, AVV-Prüfungen, Datenschutz-Folgenabschätzungen und Mitarbeiter-Schulungen.
            </p>
          </div>
          <button
            type="button"
            onClick={onSelectForLead}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shadow-md shadow-blue-600/20 shrink-0 cursor-pointer"
          >
            Individuelles Audit anfragen
          </button>
        </div>
      </div>
    </div>
  );
};
