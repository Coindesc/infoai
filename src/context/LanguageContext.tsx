import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof UI_TRANSLATIONS['pt'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('infoai_language') as Language;
    if (saved && ['pt', 'en', 'es', 'fr', 'de', 'zh'].includes(saved)) {
      return saved;
    }
    // Auto-detect browser language
    const navLang = navigator.language.slice(0, 2);
    if (['pt', 'en', 'es', 'fr', 'de', 'zh'].includes(navLang)) {
      return navLang as Language;
    }
    return 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('infoai_language', lang);
  };

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.pt;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

