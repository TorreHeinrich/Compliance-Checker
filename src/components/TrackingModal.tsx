import React, { useState } from 'react';
import { X, Copy, Check, Code, ShieldCheck, Activity } from 'lucide-react';

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const gtmHeadSnippet = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->`;

  const ga4Snippet = `<!-- Google tag (gtag.js) - Google Analytics 4 & Google Ads -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX'); // Google Analytics 4 ID
  gtag('config', 'AW-XXXXXXXXX'); // Google Ads Conversion ID
</script>`;

  const eventSnippet = `// Bereits im Code integrierte DataLayer-Events:

// 1. Bei Start des 3-Schritte-Wizards:
window.dataLayer.push({
  event: 'ai_compliance_check_started',
  use_case: 'customer-service'
});

// 2. Bei Fertigstellung der Risikoklassen-Auswertung:
window.dataLayer.push({
  event: 'ai_compliance_check_completed',
  risk_level: 'high',
  risk_badge: 'ROT',
  use_case: 'hr-recruiting',
  requires_dsfa: true
});

// 3. Bei Absenden der Audit-Lead-Anfrage (Google Ads Conversion):
window.dataLayer.push({
  event: 'lead_audit_requested',
  conversion_value: 1,
  company_name: 'Muster GmbH',
  use_case: 'HR Recruiting'
});`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-950 border border-blue-800/60 text-blue-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Google Ads & Analytics Tracking-Pixel Konfiguration
              </h3>
              <p className="text-xs text-slate-400">
                Einsatzfertige Snippets & Events für Ihr GitHub / Vercel Deployment
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200">
            <strong>Hinweis für Vercel & Web-Hosting:</strong> In der Datei <code className="text-white bg-slate-900 px-1.5 py-0.5 rounded">index.html</code> sind bereits auskommentierte Tracking-Platzhalter vorbereitet. Ersetzen Sie einfach <code className="text-white bg-slate-900 px-1.5 py-0.5 rounded">GTM-XXXXXXX</code> oder <code className="text-white bg-slate-900 px-1.5 py-0.5 rounded">G-XXXXXXXXXX</code> mit Ihrer ID.
          </div>

          {/* Block 1: Google Tag Manager */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-white text-xs uppercase tracking-wider">
                1. Google Tag Manager (GTM)
              </span>
              <button
                type="button"
                onClick={() => handleCopy(gtmHeadSnippet, 'gtm')}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
              >
                {copiedKey === 'gtm' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopieren</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre">
              {gtmHeadSnippet}
            </pre>
          </div>

          {/* Block 2: GA4 & Google Ads gtag.js */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-white text-xs uppercase tracking-wider">
                2. Google Analytics 4 (GA4) & Google Ads Tag
              </span>
              <button
                type="button"
                onClick={() => handleCopy(ga4Snippet, 'ga4')}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
              >
                {copiedKey === 'ga4' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopieren</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre">
              {ga4Snippet}
            </pre>
          </div>

          {/* Block 3: Wired Events */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-white text-xs uppercase tracking-wider">
                3. Integrierte Lead & Conversion DataLayer-Events
              </span>
              <button
                type="button"
                onClick={() => handleCopy(eventSnippet, 'events')}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
              >
                {copiedKey === 'events' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopieren</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-blue-300 overflow-x-auto whitespace-pre">
              {eventSnippet}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
