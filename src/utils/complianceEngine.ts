/**
 * EU AI Act (Verordnung (EU) 2024/1689) & DSGVO Compliance Engine
 * Entwickelt für KMU-orientierte automatisierte Risiko- und Datenschutzanalysen.
 */

export type UseCaseId =
  | 'hr-recruiting'
  | 'customer-service'
  | 'marketing-content'
  | 'code-automation'
  | 'credit-scoring'
  | 'biometrics'
  | 'health-medical';

export type AutomationLevel = 'advisory' | 'semi-auto' | 'fully-auto';

export type DataSensitivity = 'none-or-synthetic' | 'standard-personal' | 'art9-special';

export type DomainScope = 'internal-staff' | 'b2b-clients' | 'b2c-consumers' | 'critical-sector';

export type RiskLevel = 'unacceptable' | 'high' | 'transparency' | 'minimal';

export interface UseCaseConfig {
  id: UseCaseId;
  title: string;
  shortDesc: string;
  examples: string;
  defaultScope: DomainScope;
  baseRisk: RiskLevel;
}

export interface ComplianceInput {
  useCase: UseCaseId;
  automation: AutomationLevel;
  dataSensitivity: DataSensitivity;
  scope: DomainScope;
}

export interface RiskAnalysis {
  riskLevel: RiskLevel;
  riskBadge: 'ROT' | 'GELB' | 'GRÜN';
  title: string;
  subtitle: string;
  euAiActArticle: string;
  legalSummary: string;
  isBannedOrHigh: boolean;
  transparencyRequired: boolean;
  
  // DSGVO (GDPR) Flags
  dsgvo: {
    requiresDSFA: boolean; // Datenschutz-Folgenabschätzung Art. 35
    requiresAVV: boolean;  // Auftragsverarbeitungsvertrag Art. 28
    art22ViolationRisk: boolean; // Verbot automatisierter Einzelfallentscheidung
    art9SpecialDataInvolved: boolean; // Besondere Kategorien sensibler Daten
    recommendedLegalBasis: string;
    transparencyObligations: string[];
    drittlandTransfer: boolean;
  };

  // KMU Roadmap
  actionPlan: Array<{
    step: number;
    title: string;
    description: string;
    priority: 'Dringend' | 'Hoch' | 'Mittel' | 'Standard';
    deadlineNotice: string;
  }>;
}

export const USE_CASES: Record<UseCaseId, UseCaseConfig> = {
  'hr-recruiting': {
    id: 'hr-recruiting',
    title: 'HR, Recruiting & CV-Screening',
    shortDesc: 'Bewerberauswahl, automatisierte Lebenslauf-Analysen, Leistungsbewertung oder Beförderungsvorschläge.',
    examples: 'z.B. KI-Vorauswahl von Kandidaten, Ranking von Bewerbern, KI-Videointerviews.',
    defaultScope: 'internal-staff',
    baseRisk: 'high',
  },
  'customer-service': {
    id: 'customer-service',
    title: 'Kundenservice & Support-Chatbots',
    shortDesc: 'Automatisierte Beantwortung von Kundenanfragen, Voicebots oder Website-Assistenten.',
    examples: 'z.B. 24/7 Kunden-Chatbot auf der Website, Ticket-Triage, FAQ-Assistent.',
    defaultScope: 'b2c-consumers',
    baseRisk: 'transparency',
  },
  'marketing-content': {
    id: 'marketing-content',
    title: 'Marketing, Content- & Text-Generierung',
    shortDesc: 'Erstellung von Werbetexten, Blogartikeln, Social-Media-Posts oder Bild-/Audiomaterial.',
    examples: 'z.B. ChatGPT/Claude für Blogbeiträge, Midjourney/FLUX für Marketing-Grafiken.',
    defaultScope: 'b2b-clients',
    baseRisk: 'minimal',
  },
  'code-automation': {
    id: 'code-automation',
    title: 'Code- & Interne Prozessautomatisierung',
    shortDesc: 'Entwickler-Copiloten, Workflow-Automatisierung, interne Zusammenfassungen.',
    examples: 'z.B. GitHub Copilot, Datenextraktion aus internen PDFs, Meeting-Transkription.',
    defaultScope: 'internal-staff',
    baseRisk: 'minimal',
  },
  'credit-scoring': {
    id: 'credit-scoring',
    title: 'Bonitätsprüfung & Kredit-Scoring',
    shortDesc: 'Bewertung der Kreditwürdigkeit oder Ausfallwahrscheinlichkeit natürlicher Personen.',
    examples: 'z.B. automatisierte Bonitätsprüfung im Checkout, Kredit-Risikobewertung.',
    defaultScope: 'b2c-consumers',
    baseRisk: 'high',
  },
  'biometrics': {
    id: 'biometrics',
    title: 'Biometrische Erkennung & Emotion Recognition',
    shortDesc: 'Gesichtserkennung, Stimmprofilierung oder Erkennung von Emotionen am Arbeitsplatz.',
    examples: 'z.B. Zugangskontrolle via FaceID, KI-Stimmungsanalyse in Teams-Meetings.',
    defaultScope: 'internal-staff',
    baseRisk: 'unacceptable',
  },
  'health-medical': {
    id: 'health-medical',
    title: 'Gesundheits- & Medizinische Assistenz',
    shortDesc: 'Symptom-Checker, Auswertung von Gesundheitsdaten oder medizinische Beratungs-Tools.',
    examples: 'z.B. KI-Triage von Patientensymptomen, Vitaldaten-Analyse.',
    defaultScope: 'b2c-consumers',
    baseRisk: 'high',
  },
};

/**
 * Kernfunktion zur Einstufung nach EU AI Act und DSGVO
 */
export function evaluateCompliance(input: ComplianceInput): RiskAnalysis {
  let riskLevel: RiskLevel = 'minimal';

  // 1. Spezifische Verbote nach Art. 5 EU AI Act prüfen (Unannehmbares Risiko)
  if (
    input.useCase === 'biometrics' &&
    (input.scope === 'internal-staff' || input.automation === 'fully-auto')
  ) {
    // Emotionserkennung am Arbeitsplatz oder in Bildungseinrichtungen ist nach Art. 5 Abs. 1 lit. f EU AI Act verboten!
    riskLevel = 'unacceptable';
  } else if (
    input.useCase === 'hr-recruiting' ||
    input.useCase === 'credit-scoring' ||
    input.useCase === 'health-medical' ||
    input.scope === 'critical-sector'
  ) {
    // Hochrisiko-KI-Systeme nach Art. 6 i.V.m. Anhang III
    // Anhang III Nr. 4: Beschäftigung, Personalmanagement und Zugang zur Selbstständigkeit
    // Anhang III Nr. 5: Zugang zu wesentlichen privaten und öffentlichen Dienstleistungen (Kreditwürdigkeit)
    riskLevel = 'high';
  } else if (input.automation === 'fully-auto' && input.dataSensitivity !== 'none-or-synthetic') {
    // Vollautomatisierte Entscheidungen mit personenbezogenen Daten
    riskLevel = 'high';
  } else if (input.useCase === 'customer-service' || input.useCase === 'biometrics') {
    // Transparenzpflichten nach Art. 50 Abs. 1 (Chatbots)
    riskLevel = 'transparency';
  } else if (input.useCase === 'marketing-content' && input.scope === 'b2c-consumers') {
    // Generierte Medien mit Veröffentlichungspflicht Art. 50 Abs. 2/4
    riskLevel = 'transparency';
  } else {
    riskLevel = 'minimal';
  }

  // Ampelsystem mapping
  const riskBadge: 'ROT' | 'GELB' | 'GRÜN' =
    riskLevel === 'unacceptable' || riskLevel === 'high'
      ? 'ROT'
      : riskLevel === 'transparency'
      ? 'GELB'
      : 'GRÜN';

  // DSGVO Berechnungen
  const requiresDSFA =
    riskLevel === 'high' ||
    riskLevel === 'unacceptable' ||
    input.dataSensitivity === 'art9-special' ||
    input.automation === 'fully-auto';

  const requiresAVV = input.dataSensitivity !== 'none-or-synthetic';

  const art22ViolationRisk =
    input.automation === 'fully-auto' && input.dataSensitivity !== 'none-or-synthetic';

  const art9SpecialDataInvolved = input.dataSensitivity === 'art9-special';

  let recommendedLegalBasis = 'Art. 6 Abs. 1 lit. f DSGVO (Berechtigtes Interesse mit Abwägung)';
  if (art9SpecialDataInvolved) {
    recommendedLegalBasis =
      'Art. 9 Abs. 2 lit. a DSGVO (Ausdrückliche, informierte Einwilligung) - Grundsatz: Verbot mit Erlaubnisvorbehalt';
  } else if (input.scope === 'internal-staff') {
    recommendedLegalBasis =
      '§ 26 BDSG / Art. 6 Abs. 1 lit. b DSGVO (Zwecke des Beschäftigungsverhältnisses; hohe Anforderungen bei Einwilligung)';
  } else if (input.automation === 'fully-auto') {
    recommendedLegalBasis =
      'Art. 22 Abs. 2 lit. c i.V.m. Art. 6 Abs. 1 lit. a DSGVO (Ausdrückliche Einwilligung mit Recht auf menschliches Eingreifen)';
  }

  const transparencyObligations: string[] = [];
  if (riskLevel === 'transparency' || input.useCase === 'customer-service') {
    transparencyObligations.push('Kennzeichnungspflicht nach Art. 50 Abs. 1 EU AI Act (Nutzer muss wissen, dass er mit KI interagiert)');
  }
  if (input.dataSensitivity !== 'none-or-synthetic') {
    transparencyObligations.push('Informationspflichten nach Art. 13 & 14 DSGVO (Datenschutzerklärung inkl. Nennung von Logik und Tragweite)');
  }
  if (art22ViolationRisk) {
    transparencyObligations.push('Recht auf menschliches Eingreifen, Erläuterung und Anfechtung der Entscheidung (Art. 22 Abs. 3 DSGVO)');
  }

  // Text & Title Details
  let title = '';
  let subtitle = '';
  let euAiActArticle = '';
  let legalSummary = '';

  switch (riskLevel) {
    case 'unacceptable':
      title = 'Verbotene KI-Praxis / Unannehmbares Risiko';
      subtitle = 'Der geplante Einsatz fällt unter verbotene Praktiken nach Art. 5 EU AI Act.';
      euAiActArticle = 'Verordnung (EU) 2024/1689 – Artikel 5 Abs. 1 lit. f (Verbotene Praktiken)';
      legalSummary =
        'Dieser Einsatz ist in der Europäischen Union gesetzlich verboten. Insbesondere Systeme zur Emotionserkennung am Arbeitsplatz oder zur biometrischen Echtzeitüberwachung dürfen im betrieblichen KMU-Alltag nicht eingesetzt werden. Es drohen empfindliche Bußgelder von bis zu 35 Mio. Euro oder 7 % des weltweiten Jahresumsatzes.';
      break;

    case 'high':
      title = 'Hohes Risiko (High-Risk AI System)';
      subtitle = 'Umfassende Konformitäts-, Dokumentations- und Aufsichtspflichten nach Art. 6 & Anhang III.';
      euAiActArticle = 'Verordnung (EU) 2024/1689 – Art. 6 & Anhang III (Hochrisiko-Systeme)';
      legalSummary =
        'Ihr System fällt unter die Hochrisiko-Kategorie (z. B. HR/Personalmanagement oder automatische Entscheidungen). Sie müssen als Betreiber (Deployer) strenge Auflagen erfüllen: Risikomanagementsystem, lückenlose Protokollierung (Logging), menschliche Aufsicht (Human-in-the-loop), CE-Kennzeichnung und zwingend eine DSGVO-Datenschutz-Folgenabschätzung (DSFA).';
      break;

    case 'transparency':
      title = 'Spezifisches Transparenzrisiko';
      subtitle = 'Transparenz- und Informationspflichten nach Art. 50 EU AI Act.';
      euAiActArticle = 'Verordnung (EU) 2024/1689 – Artikel 50 (Transparenzpflichten für Betreiber)';
      legalSummary =
        'Das System unterliegt spezifischen Transparenzauflagen: Nutzer müssen klar und unmittelbar darauf hingewiesen werden, dass sie mit einem KI-System kommunizieren (Art. 50 Abs. 1). Generierte Inhalte (Texte, Audio, Deepfakes) müssen maschinenlesbar gekennzeichnet werden. Auf DSGVO-Ebene ist ein AVV nach Art. 28 DSGVO mit dem Modellanbieter obligatorisch.';
      break;

    case 'minimal':
    default:
      title = 'Minimales / Geringes Risiko';
      subtitle = 'Keine regulatorischen Sonderhürden im AI Act – Standard-DSGVO beachten.';
      euAiActArticle = 'Verordnung (EU) 2024/1689 – Artikel 69 & Erwägungsgrund 165 (Freiwillige Verhaltenskodizes)';
      legalSummary =
        'Der Einsatz ist regulierungsarm im Sinne des EU AI Acts. Es greifen keine Zulassungs- oder Zertifizierungspflichten. Dennoch gelten die allgemeinen Vorgaben der DSGVO (Rechtsgrundlage, AV-Vertrag bei externen Cloud-LLMs, Zweckbindung und Ausschluss sensibler Geschäftsdaten).';
      break;
  }

  // Generierung des KMU-Maßnahmenplans
  const actionPlan = generateKMUActionPlan(riskLevel, requiresDSFA, requiresAVV, art22ViolationRisk);

  return {
    riskLevel,
    riskBadge,
    title,
    subtitle,
    euAiActArticle,
    legalSummary,
    isBannedOrHigh: riskLevel === 'unacceptable' || riskLevel === 'high',
    transparencyRequired: riskLevel === 'transparency' || riskLevel === 'high',
    dsgvo: {
      requiresDSFA,
      requiresAVV,
      art22ViolationRisk,
      art9SpecialDataInvolved,
      recommendedLegalBasis,
      transparencyObligations,
      drittlandTransfer: input.dataSensitivity !== 'none-or-synthetic',
    },
    actionPlan,
  };
}

function generateKMUActionPlan(
  riskLevel: RiskLevel,
  requiresDSFA: boolean,
  requiresAVV: boolean,
  art22ViolationRisk: boolean
) {
  const plan = [];

  if (riskLevel === 'unacceptable') {
    plan.push({
      step: 1,
      title: 'Sofortiger Projektstopp & Umgestaltung',
      description:
        'Der geplante Einsatz in dieser Form ist rechtswidrig. Prüfen Sie alternative Architekturen (z. B. Verzicht auf Emotionserkennung, reine anonyme Prozessmetriken ohne Personenbezug).',
      priority: 'Dringend' as const,
      deadlineNotice: 'Gilt seit 2. Februar 2025 verbindlich!',
    });
    plan.push({
      step: 2,
      title: 'Rechtsberatung & Risikobewertung durch Experten',
      description:
        'Konsultieren Sie einen spezialisierten Datenschutz- und KI-Auditor (z. B. TE DIGITAL), um rechtssichere Alternativen zu erarbeiten.',
      priority: 'Dringend' as const,
      deadlineNotice: 'Unverzüglich',
    });
    return plan;
  }

  // Step 1: Inventory & Role definition
  plan.push({
    step: 1,
    title: 'KI-Verzeichnis anlegen & Betreiber-Rolle (Deployer) definieren',
    description:
      'Dokumentieren Sie das KI-System im betrieblichen Verzeichnis von Verarbeitungstätigkeiten (VVT nach Art. 30 DSGVO) sowie im internen KI-Register nach EU AI Act.',
    priority: 'Dringend' as const,
    deadlineNotice: 'Vor Produktivstart',
  });

  // Step 2: Contracts & Vendor audit
  plan.push({
    step: 2,
    title: requiresAVV
      ? 'Auftragsverarbeitungsvertrag (AVV) & Opt-Out für Modelltraining'
      : 'Vertragliche Nutzung & IP-Schutz mit Software-Provider prüfen',
    description: requiresAVV
      ? 'Schließen Sie mit dem KI-Provider (z. B. OpenAI, Microsoft, Google) einen DSGVO-konformen AVV (Art. 28) ab. Stellen Sie sicher, dass Ihre Daten nicht für das Training von Fremdmodellen genutzt werden (Zero-Data-Retention).'
      : 'Überprüfen Sie Nutzungsbedingungen und Vertraulichkeitsvereinbarungen bezüglich betrieblicher Betriebs- und Geschäftsgeheimnisse.',
    priority: 'Hoch' as const,
    deadlineNotice: 'Vor Übermittlung erster Daten',
  });

  // Step 3: DSFA or Human-in-the-loop
  if (requiresDSFA || art22ViolationRisk) {
    plan.push({
      step: 3,
      title: 'Datenschutz-Folgenabschätzung (DSFA Art. 35) & Human-in-the-Loop',
      description:
        'Führen Sie eine formelle DSFA durch. Etablieren Sie zwingend ein Vier-Augen-Prinzip: KI darf nur Vorarbeiten leisten, die finale Entscheidung muss nachweisbar durch qualifiziertes Personal erfolgen (Art. 22 Abs. 3 DSGVO).',
      priority: 'Dringend' as const,
      deadlineNotice: 'Gesetzliche Pflicht vor Inbetriebnahme',
    });
  } else {
    plan.push({
      step: 3,
      title: 'Mitarbeiter-Richtlinie & Prompt-Hygiene (KI-Policy)',
      description:
        'Verfassen Sie verbindliche interne Leitlinien für Mitarbeiter: Keine sensiblen Kundendaten oder Passwörter in Prompts eingeben, Ergebnisse vor Verwendung auf Korrektheit prüfen.',
      priority: 'Mittel' as const,
      deadlineNotice: 'Laufender Betrieb',
    });
  }

  // Step 4: Transparency & Marking
  plan.push({
    step: 4,
    title: 'Transparenzhinweise & Kennzeichnung (Art. 50 AI Act & Art. 13 DSGVO)',
    description:
      riskLevel === 'transparency'
        ? 'Binden Sie im Chatfenster bzw. auf der Website einen klaren Hinweis ein: "Sie chatten mit einem KI-Assistenten". Aktualisieren Sie Ihre Datenschutzerklärung.'
        : 'Passen Sie Ihre Datenschutzerklärung an und informieren Sie Betroffene transparent über den KI-Einsatz.',
    priority: 'Hoch' as const,
    deadlineNotice: 'Gilt verbindlich ab 2. August 2026',
  });

  // Step 5: Regular Audit
  plan.push({
    step: 5,
    title: 'Regelmäßiges Compliance-Audit & Monitoring',
    description:
      'Überprüfen Sie vierteljährlich Modellupdates, Genauigkeit, Fehlerquoten und rechtliche Neuerungen durch ein strukturiertes TE DIGITAL Compliance-Review.',
    priority: 'Standard' as const,
    deadlineNotice: 'Zyklisch alle 6-12 Monate',
  });

  return plan;
}
