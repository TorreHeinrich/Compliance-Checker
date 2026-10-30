import React, { useState, useEffect } from 'react';
import {
  UseCaseId,
  AutomationLevel,
  DataSensitivity,
  DomainScope,
  ComplianceInput,
  evaluateCompliance,
  USE_CASES,
  RiskAnalysis,
} from '../utils/complianceEngine.ts';
import { EvaluationResult } from './EvaluationResult.tsx';
import {
  Users,
  Bot,
  FileEdit,
  Code2,
  CreditCard,
  Fingerprint,
  HeartPulse,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface ComplianceWizardProps {
  onLeadRequest: (analysis: RiskAnalysis, input: ComplianceInput) => void;
}

export const ComplianceWizard: React.FC<ComplianceWizardProps> = ({ onLeadRequest }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseId>('customer-service');
  const [automation, setAutomation] = useState<AutomationLevel>('advisory');
  const [dataSensitivity, setDataSensitivity] = useState<DataSensitivity>('standard-personal');
  const [scope, setScope] = useState<DomainScope>('b2c-consumers');
  const [analysisResult, setAnalysisResult] = useState<RiskAnalysis | null>(null);

  // Check URL parameters (e.g. ?autostart=1 or pre-selected useCase)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      // Evaluate immediately
      handleEvaluate();
    }
  }, []);

  const getUseCaseIcon = (id: UseCaseId) => {
    switch (id) {
      case 'hr-recruiting':
        return <Users className="w-5 h-5 text-indigo-400" />;
      case 'customer-service':
        return <Bot className="w-5 h-5 text-blue-400" />;
      case 'marketing-content':
        return <FileEdit className="w-5 h-5 text-emerald-400" />;
      case 'code-automation':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'credit-scoring':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      case 'biometrics':
        return <Fingerprint className="w-5 h-5 text-rose-400" />;
      case 'health-medical':
        return <HeartPulse className="w-5 h-5 text-purple-400" />;
    }
  };

  const handleSelectUseCase = (id: UseCaseId) => {
    setSelectedUseCase(id);
    const config = USE_CASES[id];
    setScope(config.defaultScope);
  };

  const handleProceedToQuestions = () => {
    // Tracking Event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'ai_compliance_check_started',
        use_case: selectedUseCase,
      });
    }
    setCurrentStep(2);
    // Scroll to checker container smoothly
    document.getElementById('checker')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEvaluate = () => {
    const input: ComplianceInput = {
      useCase: selectedUseCase,
      automation,
      dataSensitivity,
      scope,
    };

    const result = evaluateCompliance(input);
    setAnalysisResult(result);
    setCurrentStep(3);

    // Push Tracking Event for GA4 / Google Ads / GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'ai_compliance_check_completed',
        risk_level: result.riskLevel,
        risk_badge: result.riskBadge,
        use_case: input.useCase,
        requires_dsfa: result.dsgvo.requiresDSFA,
      });
    }

    document.getElementById('checker')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAnalysisResult(null);
    document.getElementById('checker')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="checker" className="py-16 md:py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Progress Indicator */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
            <span>Interaktiver 3-Schritte-Check</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            EU AI Act & DSGVO Konformitäts-Prüfung
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Wählen Sie Ihren Anwendungsfall und beantworten Sie 3 präzise Fragen zur Bestimmung der Risikoklasse.
          </p>

          {/* Step Breadcrumbs */}
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4 print-hide">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentStep === 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-950/40 flex items-center justify-center text-[11px]">1</span>
              <span>1. KI-Einsatz wählen</span>
            </button>

            <span className="text-slate-600 text-xs">→</span>

            <button
              type="button"
              onClick={() => {
                if (currentStep >= 2) setCurrentStep(2);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentStep === 2
                  ? 'bg-blue-600 text-white'
                  : currentStep > 2
                  ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  : 'bg-slate-900/50 text-slate-600 border border-slate-800/40 cursor-not-allowed'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-950/40 flex items-center justify-center text-[11px]">2</span>
              <span>2. Drei Fragen</span>
            </button>

            <span className="text-slate-600 text-xs">→</span>

            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                currentStep === 3
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900/50 text-slate-600 border border-slate-800/40'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-950/40 flex items-center justify-center text-[11px]">3</span>
              <span>3. Auswertung & Fahrplan</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* STEP 1: USE CASE SELECTION */}
        {/* ============================================================== */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.keys(USE_CASES) as UseCaseId[]).map((key) => {
                const uc = USE_CASES[key];
                const isSelected = selectedUseCase === key;
                return (
                  <div
                    key={key}
                    onClick={() => handleSelectUseCase(key)}
                    className={`p-5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-950/30 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                          {getUseCaseIcon(key)}
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1.5">
                        {uc.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {uc.shortDesc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                      {uc.examples}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleProceedToQuestions}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <span>Weiter zu den 3 Fragen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 2: 3 SHORT QUESTIONS */}
        {/* ============================================================== */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl mx-auto">
            {/* Active Use Case Indicator */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  {getUseCaseIcon(selectedUseCase)}
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Ausgewählter KI-Einsatz:</span>
                  <span className="text-sm font-bold text-white">
                    {USE_CASES[selectedUseCase].title}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
              >
                Ändern
              </button>
            </div>

            {/* Frage 1: Automatisierungsgrad & Entscheidungsautonomie */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                <span>Frage 01 von 03 · Entscheidungsautonomie</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Wie hoch ist der Automatisierungsgrad bei Entscheidungen?
              </h3>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Entscheidet das KI-System autonom mit rechtlicher oder wesentlicher Tragweite (z. B. Bewerberabsage, Kreditverweigerung) oder agiert es rein vorbereitend mit menschlicher Letztentscheidung?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div
                  onClick={() => setAutomation('advisory')}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    automation === 'advisory'
                      ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm text-white mb-1">
                    Reiner Vorschlag (Human-in-the-loop)
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Mensch entscheidet völlig frei und autonom. KI liefert lediglich Rohentwürfe, Ideen oder Textkorrekturen.
                  </p>
                </div>

                <div
                  onClick={() => setAutomation('semi-auto')}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    automation === 'semi-auto'
                      ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm text-white mb-1">
                    Teilautomatisiert (Vorauswahl)
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    KI sortiert oder filtert vor. Der Mensch gibt die Entscheidung meist routinemäßig frei.
                  </p>
                </div>

                <div
                  onClick={() => setAutomation('fully-auto')}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    automation === 'fully-auto'
                      ? 'bg-red-950/40 border-red-500 ring-1 ring-red-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm text-red-200 mb-1">
                    Vollautomatisch (Art. 22 DSGVO)
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    System entscheidet ohne jede menschliche Nachprüfung verbindlich mit Wirkung für Personen.
                  </p>
                </div>
              </div>
            </div>

            {/* Frage 2: Datenkategorien & Sensibilität (Art. 9 DSGVO) */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                <span>Frage 02 von 03 · Datensensibilität</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Welche Art von Daten werden durch das System verarbeitet?
              </h3>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Die DSGVO unterscheidet streng zwischen reinen Sachdaten, gewöhnlichen personenbezogenen Daten und besonders schützenswerten sensiblen Daten (Art. 9 DSGVO).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div
                  onClick={() => setDataSensitivity('none-or-synthetic')}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    dataSensitivity === 'none-or-synthetic'
                      ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm text-white mb-1">
                    Keine personenbezogenen Daten
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Reine Testdaten, Open-Source-Code, anonymisierte Metriken oder allgemeine Wissensdokumente.
                  </p>
                </div>

                <div
                  onClick={() => setDataSensitivity('standard-personal')}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    dataSensitivity === 'standard-personal'
                      ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm text-white mb-1">
                    Standard-Personendaten
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Namen, geschäftliche E-Mail-Adressen, Chatverläufe mit Kunden, Adressdaten oder normale Lebensläufe.
                  </p>
                </div>

                <div
                  onClick={() => setDataSensitivity('art9-special')}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    dataSensitivity === 'art9-special'
                      ? 'bg-red-950/40 border-red-500 ring-1 ring-red-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm text-red-200 mb-1">
                    Besondere Kategorien (Art. 9)
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Gesundheitsdaten, Biometrie, religiöse/politische Ansichten, Gewerkschaftszugehörigkeit.
                  </p>
                </div>
              </div>
            </div>

            {/* Frage 3: Einsatzbereich & Zielgruppe */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                <span>Frage 03 von 03 · Einsatzbereich & Betroffene</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                In welchem Kontext und für welche Zielgruppe wird die KI eingesetzt?
              </h3>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Der EU AI Act stuft Systeme nach dem Schutzbedarf der betroffenen Personen ein (z. B. Arbeitnehmer, Verbraucher oder Hochrisikosektoren).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div
                  onClick={() => setScope('internal-staff')}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    scope === 'internal-staff'
                      ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm text-white mb-1">
                    Mitarbeiter & HR
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Interner Einsatz am Arbeitsplatz, Arbeitsvertrags- oder Bewerberkontext.
                  </p>
                </div>

                <div
                  onClick={() => setScope('b2b-clients')}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    scope === 'b2b-clients'
                      ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm text-white mb-1">
                    B2B-Kunden
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Unternehmenskunden und professionelle Geschäftspartner.
                  </p>
                </div>

                <div
                  onClick={() => setScope('b2c-consumers')}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    scope === 'b2c-consumers'
                      ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm text-white mb-1">
                    B2C Endverbraucher
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Öffentlichkeit, Webseitenbesucher, Privatkunden.
                  </p>
                </div>

                <div
                  onClick={() => setScope('critical-sector')}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    scope === 'critical-sector'
                      ? 'bg-red-950/40 border-red-500 ring-1 ring-red-500'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm text-red-200 mb-1">
                    Kritischer Sektor
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Kreditvergabe, kritische Infrastruktur, Gesundheit, Justiz.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück zur Auswahl</span>
              </button>

              <button
                type="button"
                onClick={handleEvaluate}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <span>Risikoklasse & DSGVO auswerten</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 3: EVALUATION RESULT */}
        {/* ============================================================== */}
        {currentStep === 3 && analysisResult && (
          <EvaluationResult
            analysis={analysisResult}
            input={{
              useCase: selectedUseCase,
              automation,
              dataSensitivity,
              scope,
            }}
            onReset={handleReset}
            onSelectForLead={() => {
              onLeadRequest(analysisResult, {
                useCase: selectedUseCase,
                automation,
                dataSensitivity,
                scope,
              });
            }}
          />
        )}
      </div>
    </section>
  );
};
