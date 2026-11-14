import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Language } from '../types';
import { ShieldCheck, MessageCircle, Clock, Globe, ArrowDownCircle, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onOpenWhatsApp: () => void;
  onScrollToSubscribe: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenWhatsApp, onScrollToSubscribe }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt', label: 'PT', flag: '🇧🇷' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'de', label: 'DE', flag: '🇩🇪' },
    { code: 'zh', label: 'ZH', flag: '🇨🇳' },
  ];

  const currentDateFormatted = new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="border-b border-[#E5E7EB] dark:border-[#1E293B] bg-[#FFFFFF]/90 dark:bg-[#0B0F17]/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      {/* Top utility bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-[#E5E7EB] dark:border-[#1E293B]/60 text-xs flex flex-wrap items-center justify-between gap-3 text-[#4B5563] dark:text-[#94A3B8]">
        <div className="flex items-center gap-4">
          <span className="capitalize font-medium text-[#111827] dark:text-[#F8FAFC] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
            {currentDateFormatted}
          </span>
          <span className="hidden md:inline-block text-[#E5E7EB] dark:text-[#1E293B]">|</span>
          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#16A34A] dark:text-[#22C55E] border border-emerald-500/20 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] dark:bg-[#22C55E] animate-pulse"></span>
              {t.systemStatusOnline}
            </span>
          </div>
        </div>

        {/* Right tools: Language Switcher + Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button (Sol/Lua) */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-[#E5E7EB] dark:border-[#1E293B] bg-[#FAFAFA] dark:bg-[#161E2E] text-[#111827] dark:text-[#F8FAFC] hover:border-[#2563EB] dark:hover:border-[#3B82F6] transition-all"
            title={theme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-700" />
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-[#FAFAFA] dark:bg-[#161E2E] p-1 rounded-lg border border-[#E5E7EB] dark:border-[#1E293B]">
            <Globe className="w-3.5 h-3.5 text-[#4B5563] dark:text-[#94A3B8] ml-1 mr-0.5" />
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                  language === l.code
                    ? 'bg-[#2563EB] dark:bg-[#3B82F6] text-white shadow-sm'
                    : 'text-[#4B5563] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-white'
                }`}
                title={l.label}
              >
                <span className="mr-1">{l.flag}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 text-[#2563EB] dark:text-[#3B82F6] border border-[#2563EB]/20 dark:border-[#3B82F6]/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.editionBadge} #001 • NO HYPE
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111827] dark:text-[#F8FAFC] uppercase">
            INFO<span className="text-[#2563EB] dark:text-[#3B82F6]">AI</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm uppercase tracking-widest text-[#4B5563] dark:text-[#94A3B8] font-sans font-medium">
            The Autonomous Chronicle
          </p>
          <p className="mt-2 text-sm text-[#4B5563] dark:text-[#94A3B8] max-w-2xl font-light">
            {t.mastheadSub}
          </p>

          {/* Action CTAs */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#16A34A] dark:bg-[#22C55E] hover:opacity-90 text-white font-medium text-xs sm:text-sm transition-all shadow-sm hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              {t.readOnWhatsApp}
            </button>
            <button
              onClick={onScrollToSubscribe}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] dark:bg-[#3B82F6] hover:opacity-90 text-white font-medium text-xs sm:text-sm transition-all shadow-sm hover:scale-[1.02]"
            >
              <ArrowDownCircle className="w-4 h-4" />
              {t.subscribeBtn}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
