import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CURRENT_EDITION } from '../data/mockEditions';
import { CATEGORY_LABELS } from '../i18n/translations';
import { Flame } from 'lucide-react';

export const BreakingTicker: React.FC = () => {
  const { language, t } = useLanguage();

  const tickerItems = [
    { title: CURRENT_EDITION.leadArticle.title[language], cat: CURRENT_EDITION.leadArticle.category },
    ...CURRENT_EDITION.articles.map((a) => ({
      title: a.title[language],
      cat: a.category,
    })),
  ];

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0B0F17] border-y border-[#E5E7EB] dark:border-[#1E293B] py-2.5 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex items-center gap-1.5 bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 text-[#2563EB] dark:text-[#3B82F6] border border-[#2563EB]/20 dark:border-[#3B82F6]/20 px-2.5 py-1 rounded text-xs font-bold tracking-wider uppercase shrink-0 mr-4">
          <Flame className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6] animate-pulse" />
          <span>{t.breakingNews}</span>
        </div>

        <div className="overflow-x-auto no-scrollbar whitespace-nowrap text-xs sm:text-sm text-[#4B5563] dark:text-[#94A3B8] flex items-center gap-6">
          {tickerItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#FFFFFF] dark:bg-[#161E2E] text-[#2563EB] dark:text-[#3B82F6] border border-[#E5E7EB] dark:border-[#1E293B]">
                {CATEGORY_LABELS[item.cat][language]}
              </span>
              <span className="hover:text-[#111827] dark:hover:text-[#F8FAFC] transition-colors cursor-default">
                {item.title}
              </span>
              {idx < tickerItems.length - 1 && (
                <span className="text-[#E5E7EB] dark:text-[#1E293B] ml-2">✦</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
