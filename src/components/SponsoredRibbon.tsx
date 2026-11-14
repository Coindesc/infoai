import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SPONSOR_ADS } from '../data/ads';
import { Sparkles, ExternalLink } from 'lucide-react';

export const SponsoredRibbon: React.FC = () => {
  const { language } = useLanguage();
  const ad = SPONSOR_ADS.find((a) => a.type === 'ribbon');

  if (!ad) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
      <div className="rounded-[12px] border border-[#E5E7EB] dark:border-[#1E293B] bg-[#FFFFFF] dark:bg-[#161E2E] p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all shadow-sm">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-[8px] bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 text-[#2563EB] dark:text-[#3B82F6] border border-[#2563EB]/20 dark:border-[#3B82F6]/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded bg-[#FAFAFA] dark:bg-[#0B0F17] text-[#2563EB] dark:text-[#3B82F6] border border-[#E5E7EB] dark:border-[#1E293B]">
                {ad.badge[language]}
              </span>
              <span className="text-xs font-semibold text-[#111827] dark:text-[#F8FAFC]">
                {ad.sponsorName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#94A3B8]">
              {ad.tagline[language]}
            </p>
          </div>
        </div>

        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] bg-[#FAFAFA] dark:bg-[#0B0F17] hover:bg-[#E5E7EB]/50 dark:hover:bg-[#1E293B] text-[#2563EB] dark:text-[#3B82F6] border border-[#E5E7EB] dark:border-[#1E293B] text-xs font-semibold transition-all shrink-0 hover:scale-[1.02]"
        >
          <span>{ad.callToAction[language]}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
