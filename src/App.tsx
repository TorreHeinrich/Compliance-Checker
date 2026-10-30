/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { DisclaimerBanner } from './components/DisclaimerBanner.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ComplianceWizard } from './components/ComplianceWizard.tsx';
import { KnowledgeBase } from './components/KnowledgeBase.tsx';
import { LeadSection } from './components/LeadSection.tsx';
import { Footer } from './components/Footer.tsx';
import { TrackingModal } from './components/TrackingModal.tsx';
import { RiskAnalysis, ComplianceInput } from './utils/complianceEngine.ts';

export default function App() {
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<RiskAnalysis | null>(null);
  const [currentInput, setCurrentInput] = useState<ComplianceInput | null>(null);

  const handleStartChecker = () => {
    document.getElementById('checker')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLeadRequest = (analysis: RiskAnalysis, input: ComplianceInput) => {
    setCurrentAnalysis(analysis);
    setCurrentInput(input);
    document.getElementById('lead-audit')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Prominent Privacy Disclaimer Banner at the very top */}
      <DisclaimerBanner />

      {/* 3-Zone Top Bar Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onStartChecker={handleStartChecker} />

        {/* 3-Step Interactive Wizard */}
        <ComplianceWizard onLeadRequest={handleLeadRequest} />

        {/* Educational Knowledge Base (Risikoklassen & DSGVO-Leitfaden) */}
        <KnowledgeBase />

        {/* Lead & Monetization CTA Section */}
        <LeadSection
          currentAnalysis={currentAnalysis}
          currentInput={currentInput}
        />
      </main>

      {/* Agency Footer */}
      <Footer onOpenTracking={() => setIsTrackingModalOpen(true)} />

      {/* Google Ads & Analytics Tracking Modal */}
      <TrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
      />
    </div>
  );
}
