import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Article } from '../types';
import { CATEGORY_LABELS } from '../i18n/translations';
import { Clock, CheckCircle2, Bookmark } from 'lucide-react';

interface LeadArticleProps {
  article: Article;
}

export const LeadArticle: React.FC<LeadArticleProps> = ({ article }) => {
  const { language, t } = useLanguage();
  const catLabel = CATEGORY_LABELS[article.category]?.[language] || 'Tecnologia & IA';

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cover Image Column (7 cols) */}
        <div className="lg:col-span-7">
          <div className="relative group overflow-hidden rounded-[12px] border border-[#E5E7EB] dark:border-[#1E293B] bg-[#FFFFFF] dark:bg-[#161E2E] shadow-sm">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title[language]}
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-102"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            ) : (
              <div className="w-full h-[360px] bg-[#FAFAFA] dark:bg-[#161E2E] flex items-center justify-center">
                <Bookmark className="w-12 h-12 text-[#E5E7EB] dark:text-[#1E293B]" />
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="px-2.5 py-1 rounded-[6px] bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[11px]">
                Capa Editorial IA
              </span>
              <span className="px-2.5 py-1 rounded-[6px] bg-[#2563EB]/90 dark:bg-[#3B82F6]/90 text-white backdrop-blur-md font-medium text-[11px]">
                Super Manchete
              </span>
            </div>
          </div>
        </div>

        {/* Text & Editorial Analysis Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 text-[#2563EB] dark:text-[#3B82F6] border border-[#2563EB]/20 dark:border-[#3B82F6]/20">
              {catLabel}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#4B5563] dark:text-[#94A3B8]">
              <Clock className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
              {article.readTime} {t.minRead}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#16A34A] dark:text-[#22C55E]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {article.sourcesCrossedCount} {t.sourcesVerified}
            </span>
          </div>

          {/* Magnetic Headline */}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] dark:text-[#F8FAFC] leading-tight tracking-tight mb-4">
            {article.title[language]}
          </h2>

          {/* "Por que isso importa" Executive Brief Card */}
          <div className="rounded-[12px] border border-[#E5E7EB] dark:border-[#1E293B] bg-[#FFFFFF] dark:bg-[#161E2E] p-5 mb-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5 text-[#2563EB] dark:text-[#3B82F6] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#3B82F6] animate-ping"></span>
              {t.whyItMatters}
            </div>
            <p className="text-sm text-[#4B5563] dark:text-[#94A3B8] leading-relaxed font-sans font-normal">
              {article.whyItMatters[language]}
            </p>
          </div>

          {/* Body paragraphs */}
          <div className="space-y-3.5 text-sm text-[#4B5563] dark:text-[#94A3B8] leading-relaxed font-sans font-normal">
            {article.content[language]?.map((para, i) => (
              <p key={i} className="text-justify">
                {para}
              </p>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};
