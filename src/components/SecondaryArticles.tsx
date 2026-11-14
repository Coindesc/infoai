import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Article, CategoryKey } from '../types';
import { CATEGORY_LABELS } from '../i18n/translations';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface SecondaryArticlesProps {
  articles: Article[];
  selectedCategory: CategoryKey;
  onClearFilter: () => void;
}

export const SecondaryArticles: React.FC<SecondaryArticlesProps> = ({
  articles,
  selectedCategory,
  onClearFilter,
}) => {
  const { language, t } = useLanguage();

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-[#E5E7EB] dark:border-[#1E293B]">
      {/* Header and Filter Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#2563EB] dark:text-[#3B82F6] uppercase">
            {selectedCategory === 'all' ? 'Cobertura Multitemática' : 'Caderno Temático'}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#F8FAFC] mt-1">
            {selectedCategory === 'all'
              ? t.sectionTitle
              : `${t.filterShowing} ${CATEGORY_LABELS[selectedCategory][language]}`}
          </h3>
        </div>

        {selectedCategory !== 'all' && (
          <button
            onClick={onClearFilter}
            className="self-start sm:self-auto text-xs text-[#2563EB] dark:text-[#3B82F6] hover:underline font-medium"
          >
            ← Voltar para todas as editorias
          </button>
        )}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center rounded-[12px] border border-[#E5E7EB] dark:border-[#1E293B] bg-[#FFFFFF] dark:bg-[#161E2E] text-[#4B5563] dark:text-[#94A3B8]">
          <p className="text-sm">Nenhuma notícia nesta categoria no momento.</p>
          <button
            onClick={onClearFilter}
            className="mt-3 text-xs text-[#2563EB] dark:text-[#3B82F6] hover:underline font-semibold"
          >
            Ver todas as editorias
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => {
            const catLabel = CATEGORY_LABELS[article.category][language];

            return (
              <div
                key={article.id}
                className="flex flex-col justify-between rounded-[12px] border border-[#E5E7EB] dark:border-[#1E293B] bg-[#FFFFFF] dark:bg-[#161E2E] overflow-hidden hover:border-[#2563EB]/40 dark:hover:border-[#3B82F6]/40 transition-all hover:-translate-y-0.5 shadow-sm group"
              >
                {/* 1. Imagem de Capa da Notícia */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={article.imageUrl}
                    alt={article.title[language]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  {/* Category badge floating on image */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="font-semibold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                      {catLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-slate-200">
                      <Clock className="w-3 h-3 text-[#3B82F6]" />
                      {article.readTime} {t.minRead}
                    </span>
                  </div>
                </div>

                {/* 2. Conteúdo da Notícia */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h4 className="font-serif text-lg font-bold text-[#111827] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors leading-snug mb-3">
                      {article.title[language]}
                    </h4>

                    {/* Executive Brief: Why it matters */}
                    <div className="rounded-[8px] bg-[#FAFAFA] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1E293B] p-3 mb-4">
                      <p className="text-[11px] font-semibold text-[#2563EB] dark:text-[#3B82F6] uppercase tracking-wider mb-1">
                        {t.whyItMatters}:
                      </p>
                      <p className="text-xs text-[#4B5563] dark:text-[#94A3B8] leading-relaxed font-sans font-normal">
                        {article.whyItMatters[language]}
                      </p>
                    </div>

                    {/* Paragraph Snippet */}
                    <div className="space-y-2 text-xs text-[#4B5563] dark:text-[#94A3B8] leading-relaxed font-sans font-normal">
                      {article.content[language]?.map((para, idx) => (
                        <p key={idx} className="line-clamp-3">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Sources & Read More */}
                  <div className="pt-4 mt-4 border-t border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between text-xs text-[#16A34A] dark:text-[#22C55E]">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {article.sourcesCrossedCount} {t.sourcesVerified}
                    </span>
                    <span className="text-[#4B5563] dark:text-[#94A3B8] group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors flex items-center gap-1 font-medium">
                      {t.readMore} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
