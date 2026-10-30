import React, { useState } from 'react';
import { Mail, ExternalLink, CheckCircle2, ShieldCheck, ArrowRight, Building, Phone, Send } from 'lucide-react';
import { RiskAnalysis, ComplianceInput, USE_CASES } from '../utils/complianceEngine.ts';

interface LeadSectionProps {
  currentAnalysis: RiskAnalysis | null;
  currentInput: ComplianceInput | null;
}

export const LeadSection: React.FC<LeadSectionProps> = ({ currentAnalysis, currentInput }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const prefilledUseCaseTitle = currentInput ? USE_CASES[currentInput.useCase].title : 'Allgemeines KI-System';
  const prefilledRiskBadge = currentAnalysis ? currentAnalysis.riskBadge : 'Noch nicht ausgewertet';

  const generateMailtoHref = () => {
    const subject = encodeURIComponent(`Anfrage KI-Compliance-Audit (${company ? company : 'KMU'}) | EU AI Act & DSGVO`);
    const bodyLines = [
      `Hallo Herr Ehlers, hallo TE DIGITAL Team,`,
      ``,
      `wir möchten unseren geplanten KI-Einsatz auf Konformität mit dem EU AI Act und der DSGVO auditieren lassen.`,
      ``,
      `--- Angaben aus dem Compliance-Checker ---`,
      `Geplanter KI-Einsatz: ${prefilledUseCaseTitle}`,
      `Ermittelte Ampel / Risikoklasse: ${prefilledRiskBadge} (${currentAnalysis?.title || 'Offen'})`,
      currentAnalysis?.dsgvo.requiresDSFA ? `DSFA-Status: Erforderlich nach Art. 35 DSGVO` : ``,
      ``,
      `--- Unternehmensdaten ---`,
      `Ansprechpartner: ${name || 'N/A'}`,
      `Unternehmen: ${company || 'N/A'}`,
      `E-Mail: ${email || 'N/A'}`,
      `Telefon: ${phone || 'N/A'}`,
      `Anmerkungen / Vorhaben: ${notes || 'Keine zusätzlichen Angaben'}`,
      ``,
      `Bitte kontaktieren Sie uns für ein unverbindliches Erstgespräch.`,
      ``,
      `Mit freundlichen Grüßen,`,
      `${name || company || 'Interessent'}`,
    ].filter(Boolean);

    return `mailto:torre@tedigital.de?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Bitte geben Sie eine gültige geschäftliche E-Mail-Adresse ein.');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);

    // Google Ads & GA4 Tracking Event Placeholder Trigger
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'lead_audit_requested',
        conversion_value: 1,
        company_name: company,
        use_case: prefilledUseCaseTitle,
        risk_badge: prefilledRiskBadge,
      });
    }
  };

  return (
    <section id="lead-audit" className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Agency Pitch & Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <span>TE DIGITAL · B2B Audit & Beratung</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Rechtssicher in die KI-Zukunft mit TE DIGITAL
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Die Fristen des EU AI Act laufen bereits. Strafen für Verstöße gegen verbotene Praktiken oder mangelhafte Hochrisiko-Dokumentation betragen bis zu <strong>35 Mio. Euro oder 7 % des weltweiten Jahresumsatzes</strong>.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-950 border border-blue-800/60 text-blue-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Individuelle KI-Risikoanalyse</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Rechtskonforme Prüfung Ihrer bestehenden und geplanten KI-Systeme nach Verordnung (EU) 2024/1689.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-950 border border-blue-800/60 text-blue-400 shrink-0 mt-0.5">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">DSGVO & AVV-Vertragscheck</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Prüfung der Auftragsverarbeitungsverträge mit LLM-Providern (OpenAI, Microsoft, Google) & Ausschluss von Trainingsdaten-Nutzung.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs text-slate-400 font-medium">Direktkontakt TE DIGITAL:</div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.tedigital.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  <span>www.tedigital.de</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href="mailto:torre@tedigital.de"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>torre@tedigital.de</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Lead Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl relative">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Vielen Dank für Ihre Anfrage!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Wir haben Ihre Angaben zu Ihrem Vorhaben (<strong>{prefilledUseCaseTitle}</strong>) erfasst. Unser Compliance-Team von TE DIGITAL setzt sich innerhalb von 24 Stunden mit Ihnen in Verbindung.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={generateMailtoHref()}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>E-Mail-Client mit Daten öffnen</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Formular erneut bearbeiten
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Kostenloses Erstgespräch anfordern
                    </h3>
                    <p className="text-xs text-slate-400">
                      Erhalten Sie eine verbindliche Ersteinschätzung und ein Angebot für ein vollständiges Audit.
                    </p>
                  </div>

                  {/* Pre-filled Status Bar if user ran the test */}
                  {currentInput && currentAnalysis && (
                    <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/40 text-xs flex flex-wrap items-center justify-between gap-2">
                      <span className="text-slate-300">
                        Übertragener Check: <strong>{prefilledUseCaseTitle}</strong>
                      </span>
                      <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-slate-900 text-blue-300 border border-slate-700">
                        Ergebnis: {prefilledRiskBadge}
                      </span>
                    </div>
                  )}

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Vor- & Nachname *
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="z. B. Max Mustermann"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-company" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Unternehmen / KMU *
                      </label>
                      <input
                        id="lead-company"
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="z. B. Muster GmbH & Co. KG"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Geschäftliche E-Mail-Adresse *
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@unternehmen.de"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-phone" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Telefonnummer (optional)
                      </label>
                      <input
                        id="lead-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+49 (0) 123 456789"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-notes" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Besondere Fragestellungen oder Details zum KI-Einsatz
                    </label>
                    <textarea
                      id="lead-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="z. B. Wir planen einen Kundensupport-Chatbot basierend auf OpenAI GPT-4o und möchten wissen, welche Klauseln in unsere Datenschutzerklärung müssen..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Audit-Anfrage absenden</span>
                    </button>

                    <a
                      href={generateMailtoHref()}
                      className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span>Oder direkt via E-Mail an torre@tedigital.de</span>
                    </a>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                    Mit dem Absenden erklären Sie sich damit einverstanden, dass TE DIGITAL Sie bezüglich Ihrer Anfrage kontaktiert. Keine Weitergabe an Dritte.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
