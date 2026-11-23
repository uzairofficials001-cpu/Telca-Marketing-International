/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, InsightArticle } from './types';
import { servicesData } from './data/servicesData';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { BusinessAuditModal } from './components/BusinessAuditModal';
import { PrivacyConsentBanner } from './components/PrivacyConsentBanner';
import { LegalModal } from './components/LegalModal';
import { ArticleModal } from './components/ArticleModal';
import { AuthModal } from './components/AuthModal';
import { TimedAuthPopup } from './components/TimedAuthPopup';
import { initVisitorSession, trackEvent, trackButtonClick, trackPageTime } from './utils/analytics';

import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';
import { AllServicesPage } from './pages/AllServicesPage';
import { ServicePage } from './pages/ServicePage';
import { AboutPage } from './pages/AboutPage';
import { WorkPage } from './pages/WorkPage';
import { InsightsPage } from './pages/InsightsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

function AppContent() {
  // Sync state with URL hash
  const getPageFromHash = (): PageId => {
    const rawHash = window.location.hash.replace('#', '').trim();
    const hash = rawHash.split('?')[0];
    if (!hash || hash === 'home') return 'home';
    if (hash === 'services') return 'services';
    if (hash === 'pricing' || hash === 'bundles') return 'pricing';
    if (hash === 'about') return 'about';
    if (hash === 'work' || hash === 'portfolio') return 'work';
    if (hash === 'insights' || hash === 'blog') return 'insights';
    if (hash === 'contact') return 'contact';
    if (hash === 'admin') return 'admin';

    if (hash.startsWith('services/')) {
      const sub = hash.replace('services/', '');
      if (sub === 'paid-advertising') return 'service-paid-advertising';
      if (sub === 'creative-production') return 'service-creative-production';
      if (sub === 'social-media') return 'service-social-media';
      if (sub === 'email-marketing') return 'service-email-marketing';
      if (sub === 'ai-automation') return 'service-ai-automation';
    }

    if (hash.startsWith('service-')) {
      return hash as PageId;
    }

    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [defaultConsultationService, setDefaultConsultationService] = useState<string | undefined>(undefined);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'forgot'>('signin');

  // Initialize privacy-respecting visitor session on mount
  useEffect(() => {
    initVisitorSession();
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'resetPassword' && params.get('oobCode')) {
      setAuthModalMode('forgot');
      setAuthModalOpen(true);
    }
  }, []);

  // Sync hash changes (back/forward browser navigation)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // First-party real analytics event & journey tracking (Page views & time spent)
  useEffect(() => {
    const pageStartTime = Date.now();
    trackEvent('pageview', `Visited ${currentPage} page`, currentPage);

    // Heartbeat every 20 seconds to record continuous engaged time on long sessions
    const interval = setInterval(() => {
      const seconds = Math.round((Date.now() - pageStartTime) / 1000);
      if (seconds >= 20 && seconds % 20 === 0) {
        trackPageTime(currentPage, seconds);
      }
    }, 20000);

    return () => {
      clearInterval(interval);
      const totalSeconds = Math.round((Date.now() - pageStartTime) / 1000);
      if (totalSeconds >= 2) {
        trackPageTime(currentPage, totalSeconds);
      }
    };
  }, [currentPage]);

  // Track button interactions across the website
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement)?.closest('button, a[href]');
      if (btn) {
        const text = btn.textContent?.trim().slice(0, 45) || btn.getAttribute('aria-label') || btn.getAttribute('title');
        if (text && text.length > 1 && !['Close', 'X', 'Done'].includes(text)) {
          trackButtonClick(text, currentPage);
        }
      }
    };
    document.addEventListener('click', handleGlobalClick, { passive: true });
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [currentPage]);

  const navigateTo = (pageId: PageId) => {
    setCurrentPage(pageId);
    let targetHash: string = pageId;
    if (pageId.startsWith('service-')) {
      targetHash = `services/${pageId.replace('service-', '')}`;
    }
    window.location.hash = targetHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (serviceName?: string) => {
    setDefaultConsultationService(serviceName);
    setConsultationModalOpen(true);
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' | 'forgot' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectCaseStudyFromHome = (studyId: string) => {
    setSelectedCaseStudyId(studyId);
    navigateTo('work');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
            onOpenAudit={() => setAuditModalOpen(true)}
            onSelectCaseStudy={handleSelectCaseStudyFromHome}
          />
        );

      case 'pricing':
        return (
          <PricingPage
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
          />
        );

      case 'services':
        return (
          <AllServicesPage
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
            onOpenAudit={() => setAuditModalOpen(true)}
          />
        );

      case 'service-paid-advertising':
        return (
          <ServicePage
            service={servicesData['paid-advertising']}
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
            onOpenAudit={() => setAuditModalOpen(true)}
          />
        );

      case 'service-creative-production':
        return (
          <ServicePage
            service={servicesData['creative-production']}
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
            onOpenAudit={() => setAuditModalOpen(true)}
          />
        );

      case 'service-social-media':
        return (
          <ServicePage
            service={servicesData['social-media']}
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
            onOpenAudit={() => setAuditModalOpen(true)}
          />
        );

      case 'service-email-marketing':
        return (
          <ServicePage
            service={servicesData['email-marketing']}
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
            onOpenAudit={() => setAuditModalOpen(true)}
          />
        );

      case 'service-ai-automation':
        return (
          <ServicePage
            service={servicesData['ai-automation']}
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
            onOpenAudit={() => setAuditModalOpen(true)}
          />
        );

      case 'about':
        return (
          <AboutPage
            onNavigate={navigateTo}
            onOpenConsultation={() => handleOpenConsultation()}
          />
        );

      case 'work':
        return (
          <WorkPage
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
            selectedCaseStudyId={selectedCaseStudyId}
            onClearSelectedCaseStudy={() => setSelectedCaseStudyId(null)}
          />
        );

      case 'insights':
        return (
          <InsightsPage
            onNavigate={navigateTo}
            onOpenConsultation={() => handleOpenConsultation()}
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        );

      case 'contact':
        return (
          <ContactPage
            onNavigate={navigateTo}
            onOpenLegal={(type) => setLegalModalType(type)}
          />
        );

      case 'admin':
        return (
          <AdminPage
            onNavigateHome={() => navigateTo('home')}
            onOpenAuth={handleOpenAuth}
          />
        );

      default:
        return (
          <HomePage
            onNavigate={navigateTo}
            onOpenConsultation={handleOpenConsultation}
            onOpenAudit={() => setAuditModalOpen(true)}
            onSelectCaseStudy={handleSelectCaseStudyFromHome}
          />
        );
    }
  };

  const isModalActive = 
    consultationModalOpen || 
    auditModalOpen ||
    legalModalType !== null || 
    selectedArticle !== null || 
    authModalOpen;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FC] text-[#202A3A]">
      {/* Navigation Bar (hidden on dedicated admin page for full workspace view) */}
      {currentPage !== 'admin' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenAudit={() => setAuditModalOpen(true)}
          onOpenAuth={handleOpenAuth}
        />
      )}

      {/* Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer (hidden on admin page) */}
      {currentPage !== 'admin' && (
        <Footer
          onNavigate={navigateTo}
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenAudit={() => setAuditModalOpen(true)}
          onOpenLegal={(type) => setLegalModalType(type)}
        />
      )}

      {/* Modals & Overlays */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        defaultService={defaultConsultationService}
      />

      <BusinessAuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
        onSwitchToConsultation={() => {
          setAuditModalOpen(false);
          handleOpenConsultation();
        }}
      />

      <LegalModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Privacy Consent Banner */}
      <PrivacyConsentBanner onOpenPrivacy={() => setLegalModalType('privacy')} />

      {/* Timed Non-intrusive Visitor Community Popup (45 seconds) */}
      <TimedAuthPopup
        currentRoute={currentPage}
        isModalOpen={isModalActive}
        onOpenAuth={handleOpenAuth}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
