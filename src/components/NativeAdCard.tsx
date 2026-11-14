import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SPONSOR_ADS } from '../data/ads';
import { ExternalLink, Database } from 'lucide-react';

export const NativeAdCard: React.FC = () => {
  const { language } = useLanguage();
  const ad = SPONSOR_ADS.find((a) => a.type === 'infeed');

  if (!ad) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="rounded-[12px] border border-[#E5E7EB] dark:border-[#1E293B] bg-[#FFFFFF] dark:bg-[#161E2E] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#2563EB]/40 dark:hover:border-[#3B82F6]/40 transition-all shadow-sm">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-[10px] bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 border border-[#2563EB]/20 dark:border-[#3B82F6]/20 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAFAFA] dark:bg-[#0B0F17] text-[#4B5563] dark:text-[#94A3B8] border border-[#E5E7EB] dark:border-[#1E293B]">
                {ad.badge[language]}
              </span>
              <span className="text-sm font-semibold text-[#111827] dark:text-[#F8FAFC]">
                {ad.sponsorName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
              {ad.tagline[language]}
            </p>
          </div>
        </div>

        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#2563EB] dark:bg-[#3B82F6] hover:opacity-90 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm shrink-0 hover:scale-105"
        >
          <span>{ad.callToAction[language]}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
