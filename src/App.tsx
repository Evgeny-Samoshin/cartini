/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { PageId } from './types';
import { getRouteTitle, pagePaths, resolveRoute } from './routing';
import Header from './components/Header';
import Footer from './components/Footer';
import CallbackModal from './components/CallbackModal';

// All subpages imports
import MainPage from './components/MainPage';
import ServicesPage from './components/ServicesPage';
import PortfolioPage from './components/PortfolioPage';
import CaseDetailPage from './components/CaseDetailPage';
import HowWeWorkPage from './components/HowWeWorkPage';
import AboutPage from './components/AboutPage';
import VkFeedPage from './components/VkFeedPage';
import SeoLandingPage from './components/SeoLandingPage';
import ContactsPage from './components/ContactsPage';

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps) {
  const getRouteState = () => resolveRoute(typeof window === 'undefined' ? initialPath ?? '/' : window.location.pathname);
  const initialRoute = getRouteState();
  const [currentPage, setCurrentPage] = useState<PageId>(initialRoute.page);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string>(initialRoute.caseId);
  const [activeSeoSlug, setActiveSeoSlug] = useState<string>(initialRoute.seoSlug);
  
  // Callback popup states
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackInitialNiche, setCallbackInitialNiche] = useState('');

  const updateUrl = (path: string) => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const route = resolveRoute(window.location.pathname);
      setCurrentPage(route.page);
      setActiveCaseStudyId(route.caseId);
      setActiveSeoSlug(route.seoSlug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = getRouteTitle({ page: currentPage, caseId: activeCaseStudyId, seoSlug: activeSeoSlug });
  }, [activeCaseStudyId, activeSeoSlug, currentPage]);

  const handleNavigate = (page: PageId) => {
    updateUrl(pagePaths[page] ?? '/');
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCase = (caseId: string) => {
    updateUrl(`/portfolio/${caseId}`);
    setActiveCaseStudyId(caseId);
    setCurrentPage('case-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSEO = (slug: string) => {
    updateUrl(`/${slug}`);
    setActiveSeoSlug(slug);
    setCurrentPage('seo-landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCallback = (niche = '') => {
    setCallbackInitialNiche(niche);
    setIsCallbackOpen(true);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <MainPage
            onNavigate={handleNavigate}
            onNavigateToCase={handleNavigateToCase}
            onNavigateSEO={handleNavigateToSEO}
            onOpenCallback={handleOpenCallback}
          />
        );
      case 'services':
        return <ServicesPage onOpenCallback={handleOpenCallback} />;
      case 'portfolio':
        return (
          <PortfolioPage
            onNavigateToCase={handleNavigateToCase}
            onOpenCallback={handleOpenCallback}
          />
        );
      case 'case-detail':
        return (
          <CaseDetailPage
            caseStudyId={activeCaseStudyId}
            onNavigateBack={() => handleNavigate('portfolio')}
            onNavigateToCase={handleNavigateToCase}
            onOpenCallback={handleOpenCallback}
          />
        );
      case 'how-we-work':
        return <HowWeWorkPage onOpenCallback={handleOpenCallback} />;
      case 'about':
        return <AboutPage onOpenCallback={handleOpenCallback} onNavigate={handleNavigate} />;
      case 'vk-feed':
        return <VkFeedPage />;
      case 'seo-landing':
        return (
          <SeoLandingPage
            slug={activeSeoSlug}
            onNavigateToCase={handleNavigateToCase}
            onOpenCallback={handleOpenCallback}
            onNavigate={handleNavigate}
          />
        );
      case 'contacts':
        return <ContactsPage />;
      default:
        return (
          <MainPage
            onNavigate={handleNavigate}
            onNavigateToCase={handleNavigateToCase}
            onNavigateSEO={handleNavigateToSEO}
            onOpenCallback={handleOpenCallback}
          />
        );
    }
  };

  return (
    <div className="page-shell min-h-screen flex flex-col justify-between font-sans antialiased text-primary selection:bg-accent selection:text-white">
      {/* Top sticky navigation block */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCallback={() => handleOpenCallback('')}
      />

      {/* Main viewport zone */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Footer information bar */}
      <Footer
        onNavigate={handleNavigate}
        onNavigateSEO={handleNavigateToSEO}
      />

      {/* Shared Lead Forms Popup */}
      <CallbackModal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        initialNiche={callbackInitialNiche}
      />
    </div>
  );
}
