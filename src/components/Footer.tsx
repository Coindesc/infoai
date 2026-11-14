import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Cpu, Server, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#E5E7EB] dark:border-[#1E293B] bg-[#FFFFFF] dark:bg-[#0B0F17] text-[#4B5563] dark:text-[#94A3B8] text-xs py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#E5E7EB] dark:border-[#1E293B]/60">
          <div>
            <h4 className="font-serif text-xl font-black text-[#111827] dark:text-[#F8FAFC] uppercase tracking-tight">
              INFO<span className="text-[#2563EB] dark:text-[#3B82F6]">AI</span>
            </h4>
            <p className="text-xs text-[#4B5563] dark:text-[#94A3B8] mt-1 max-w-md">
              {t.autonomousPledge}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[#FAFAFA] dark:bg-[#161E2E] border border-[#E5E7EB] dark:border-[#1E293B] text-[#111827] dark:text-[#F8FAFC]">
              <Cpu className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
              <span>Gemini 3.8 Flash Core</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[#FAFAFA] dark:bg-[#161E2E] border border-[#E5E7EB] dark:border-[#1E293B] text-[#111827] dark:text-[#F8FAFC]">
              <Server className="w-4 h-4 text-[#16A34A] dark:text-[#22C55E]" />
              <span>Pronto para VPS Hostinger</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 border border-[#2563EB]/20 dark:border-[#3B82F6]/20 text-[#2563EB] dark:text-[#3B82F6]">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.systemStatusOnline}</span>
            </div>
          </div>
        </div>

        {/* Ethical commitment & Advertising policy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#4B5563] dark:text-[#94A3B8] text-[11px] leading-relaxed">
          <div>
            <h5 className="font-semibold text-[#111827] dark:text-[#F8FAFC] uppercase tracking-wider mb-2">
              Política Editorial Autônoma
            </h5>
            <p>
              Operação de jornalismo sintético independente. O sistema investiga, cruza no mínimo 3 fontes globais por notícia e redige com voz autoral sem dependência de intervenção humana.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-[#111827] dark:text-[#F8FAFC] uppercase tracking-wider mb-2">
              Espaço Publicitário Não-Invasivo
            </h5>
            <p>
              Monetização ética por meio de anúncios nativos e patrocínios editoriais claramente identificados. O portal rejeita pop-ups intrusivos, janelas sobrepostas e scripts de rastreamento abusivo.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-[#111827] dark:text-[#F8FAFC] uppercase tracking-wider mb-2">
              Tecnologia & Infraestrutura
            </h5>
            <p>
              Construído com React, Tailwind CSS e TypeScript. Banco de dados gerenciado no Supabase com disparos via Evolution API (WhatsApp) e SMTP/Resend (E-mail).
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#E5E7EB] dark:border-[#1E293B]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#4B5563] dark:text-[#94A3B8]">
          <p>© {new Date().getFullYear()} {t.footerRights}</p>
          <p className="flex items-center gap-1.5">
            Design editorial minimalista ultra-clean <Heart className="w-3.5 h-3.5 text-red-500 inline" />
          </p>
        </div>

      </div>
    </footer>
  );
};
