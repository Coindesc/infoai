import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CategoryKey } from '../types';
import { CATEGORY_LABELS } from '../i18n/translations';
import { 
  Compass, 
  Landmark, 
  TrendingUp, 
  Globe2, 
  Cpu, 
  Trophy, 
  Microscope, 
  Film 
} from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: CategoryKey;
  onSelectCategory: (cat: CategoryKey) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { language } = useLanguage();

  const categories: { key: CategoryKey; icon: React.ReactNode }[] = [
    { key: 'all', icon: <Compass className="w-3.5 h-3.5" /> },
    { key: 'politica', icon: <Landmark className="w-3.5 h-3.5" /> },
    { key: 'economia', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { key: 'mundo', icon: <Globe2 className="w-3.5 h-3.5" /> },
    { key: 'tecnologia', icon: <Cpu className="w-3.5 h-3.5" /> },
    { key: 'esportes', icon: <Trophy className="w-3.5 h-3.5" /> },
    { key: 'ciencia_saude', icon: <Microscope className="w-3.5 h-3.5" /> },
    { key: 'cultura', icon: <Film className="w-3.5 h-3.5" /> },
  ];

  return (
    <nav className="bg-[#FFFFFF]/95 dark:bg-[#0B0F17]/95 border-b border-[#E5E7EB] dark:border-[#1E293B] sticky top-[57px] z-30 shadow-sm backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2.5">
          {categories.map(({ key, icon }) => {
            const isActive = selectedCategory === key;
            const label = CATEGORY_LABELS[key][language];

            return (
              <button
                key={key}
                onClick={() => onSelectCategory(key)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#2563EB] dark:bg-[#3B82F6] text-white shadow-sm font-bold scale-[1.02]'
                    : 'text-[#4B5563] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-[#F8FAFC] hover:bg-[#FAFAFA] dark:hover:bg-[#161E2E]'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-[#4B5563] dark:text-[#94A3B8]'}>
                  {icon}
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
