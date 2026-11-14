import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { BreakingTicker } from './components/BreakingTicker';
import { SponsoredRibbon } from './components/SponsoredRibbon';
import { LeadArticle } from './components/LeadArticle';
import { NativeAdCard } from './components/NativeAdCard';
import { SecondaryArticles } from './components/SecondaryArticles';
import { SubscribeSection } from './components/SubscribeSection';
import { WhatsAppPreviewModal } from './components/WhatsAppPreviewModal';
import { Footer } from './components/Footer';
import { CURRENT_EDITION } from './data/mockEditions';
import { CategoryKey } from './types';

export const MainContent: React.FC = () => {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');

  const handleScrollToSubscribe = () => {
    const el = document.getElementById('subscribe');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: CategoryKey) => {
    setSelectedCategory(cat);
    if (cat !== 'all') {
      const el = document.getElementById('cadernos-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0B0F17] text-[#111827] dark:text-[#F8FAFC] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB] transition-colors duration-200">
      {/* 1. Header with masthead, language selector & theme toggle */}
      <Header
        onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
        onScrollToSubscribe={handleScrollToSubscribe}
      />

      {/* 2. G1-inspired Clean Sticky Category Navigation Bar */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Real-time Multi-topic Breaking News Ticker */}
      <BreakingTicker />

      {/* 4. Top Non-Intrusive Sponsored Ribbon */}
      <SponsoredRibbon />

      {/* 5. Main Lead Story (Super Manchete) */}
      <main className="flex-1">
        {selectedCategory === 'all' && (
          <LeadArticle article={CURRENT_EDITION.leadArticle} />
        )}

        {/* 6. In-Feed Editorial Native Ad (Clean & Non-Intrusive) */}
        <NativeAdCard />

        {/* 7. Comprehensive Editorial Desks & Articles Grid */}
        <div id="cadernos-section">
          <SecondaryArticles
            articles={CURRENT_EDITION.articles}
            selectedCategory={selectedCategory}
            onClearFilter={() => setSelectedCategory('all')}
          />
        </div>

        {/* 8. Portal de Assinatura e Disparo Personalizado por Editoria (Regra 1A / 5C) */}
        <SubscribeSection />
      </main>

      {/* 9. Editorial Footer */}
      <Footer />

      {/* 10. WhatsApp Express Payload Modal */}
      <WhatsAppPreviewModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
