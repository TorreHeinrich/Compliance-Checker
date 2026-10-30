import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle, ShieldCheck, Clock, FileText } from 'lucide-react';

export const KnowledgeBase: React.FC = () => {
  return (
    <section id="risikoklassen" className="py-16 md:py-20 border-t border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section 1: EU AI Act Risikoklassen im Detail */}
        <div>
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Regulatorischer Rahmen
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Die Risikoklassen des EU AI Act (Verordnung (EU) 2024/1689)
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Der EU AI Act verfolgt einen risikobasierten Ansatz. Je höher das potenzielle Risiko für Grundrechte und Sicherheit natürlicher Personen, desto strenger sind die gesetzlichen Anforderungen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ROT: Verboten / Hohes Risiko */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-red-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-800/40 text-red-400">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600 text-white uppercase">
                    ROT
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Verboten & Hochrisiko
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  <strong>Verbotene Praktiken (Art. 5):</strong> Social Scoring, kognitive Verhaltensmanipulation, biometrische Emotionserkennung am Arbeitsplatz.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Hochrisiko-Systeme (Art. 6 & Anhang III):</strong> CV-Screening & Recruiting, Bonitätsbewertung, Notrufdienste, kritische Infrastruktur.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-red-300/80">
                Pflicht zu Risikomanagement, Logging, CE-Kennzeichnung & DSFA.
              </div>
            </div>

            {/* GELB: Transparenzpflichten */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-amber-950/80 border border-amber-800/40 text-amber-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950 uppercase">
                    GELB
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Transparenzrisiko (Art. 50)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  <strong>Interaktive Systeme & Chatbots:</strong> Nutzer müssen unmittelbar und barrierefrei erfahren, dass sie mit einer KI interagieren.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Generative Inhalte & Deepfakes:</strong> Generierte Texte, Audioaufnahmen oder Videos müssen maschinenlesbar und optisch markiert werden.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-amber-300/80">
                Kennzeichnungspflicht & Information in der Datenschutzerklärung.
              </div>
            </div>

            {/* GRÜN: Minimales Risiko */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800/40 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-600 text-white uppercase">
                    GRÜN
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Minimales / Kein Risiko
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  <strong>Regulierungsarme Systeme:</strong> Interne Rechtschreibkorrekturen, Spamfilter, Programmierassistenten ohne Kundendaten.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Keine Zulassungshürden oder Zertifizierungen nach dem AI Act. Es gelten die allgemeinen Vorgaben der DSGVO und freiwillige Kodizes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-emerald-300/80">
                Standard-Compliance, AV-Vertrag & Know-How-Schutz genügen.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: DSGVO-Leitfaden & Fristen */}
        <div id="dsgvo" className="pt-8 border-t border-slate-800/80 scroll-mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: DSGVO-Paragraphen Übersicht */}
            <div className="space-y-4">
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Datenschutzrechtliche Säulen
              </div>
              <h3 className="text-2xl font-bold text-white">
                Die wichtigsten DSGVO-Artikel für den betrieblichen KI-Einsatz
              </h3>

              <div className="space-y-3 pt-2 text-sm">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">
                    Art. 6 DSGVO – Rechtmäßigkeit der Verarbeitung
                  </strong>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Jede KI-Verarbeitung personenbezogener Daten erfordert eine valide Rechtsgrundlage: Vertragserfüllung (lit. b), rechtliche Verpflichtung (lit. c), berechtigtes Interesse mit Abwägung (lit. f) oder informierte Einwilligung (lit. a).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">
                    Art. 22 DSGVO – Verbot vollautomatisierter Einzelfallentscheidungen
                  </strong>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Betroffene Personen haben das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung beruhenden Entscheidung unterworfen zu werden, die ihnen gegenüber rechtliche Wirkung entfaltet. Ein Human-in-the-loop ist essenziell.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">
                    Art. 28 DSGVO – Auftragsverarbeitungsvertrag (AVV)
                  </strong>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Werden Kundendaten oder Mitarbeiterdaten über Cloud-APIs (OpenAI, Anthropic, MS Azure, Google Cloud) verarbeitet, ist ein AVV Pflicht. Prüfen Sie, ob der Provider vertraglich garantiert, Ihre Prompts nicht für Modelltrainings zu verwenden (Zero Data Retention).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-1">
                    Art. 35 DSGVO – Datenschutz-Folgenabschätzung (DSFA)
                  </strong>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Bei neuen Technologien mit voraussichtlich hohem Risiko für die Rechte und Freiheiten natürlicher Personen (z. B. Scoring, Verhaltensüberwachung, KI im Personalbereich) ist vorab eine formelle DSFA durchzuführen.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: AI Act Timeline & KMU-Erleichterungen */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Übergangsfristen</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3">
                  Wichtige Stichtage des EU AI Act
                </h4>
                
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-3 p-2.5 rounded bg-slate-950/60 border border-slate-850">
                    <span className="font-mono font-bold text-blue-400 shrink-0">02. Feb 2025</span>
                    <div>
                      <strong className="text-white">Verbote & AI Literacy (Art. 4 & 5):</strong>
                      <p className="text-slate-400 mt-0.5">Verbotene KI-Praktiken gelten sofort. Pflicht zur Schulung von Mitarbeitern in KI-Kompetenz.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded bg-slate-950/60 border border-slate-850">
                    <span className="font-mono font-bold text-blue-400 shrink-0">02. Aug 2025</span>
                    <div>
                      <strong className="text-white">GPAI-Modelle (Art. 51-56):</strong>
                      <p className="text-slate-400 mt-0.5">Regulierung von General Purpose AI / Basismodellen (Foundation Models).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded bg-slate-950/60 border border-slate-850">
                    <span className="font-mono font-bold text-blue-400 shrink-0">02. Aug 2026</span>
                    <div>
                      <strong className="text-white">Hochrisiko-Systeme (Anhang III):</strong>
                      <p className="text-slate-400 mt-0.5">Vollanwendung aller Betreiber- & Anbieterpflichten für HR, Bonität und kritische Sektoren.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* KMU-Erleichterungen Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/30 to-slate-900 border border-blue-900/40">
                <h4 className="text-base font-bold text-white mb-2">
                  Sonderregeln für KMU & Start-ups
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Der Gesetzgeber hat in Art. 62 und 63 EU AI Act spezielle Erleichterungen für kleine und mittlere Unternehmen verankert:
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Vorrangiger Zugang zu behördlichen KI-Reallaboren (Regulatory Sandboxes).</li>
                  <li>Vereinfachte Dokumentations- und Berichtspflichten für Kleinstunternehmen.</li>
                  <li>Verhältnismäßigkeit bei Bußgeldern (strikte Deckelung für KMU).</li>
                  <li>Kostenlose behördliche Leitfäden und standardisierte Vorlagen.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
