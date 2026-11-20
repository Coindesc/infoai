import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CURRENT_EDITION } from '../data/mockEditions';
import { X, Copy, Check, MessageCircle, Smartphone } from 'lucide-react';

interface WhatsAppPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload?: string;
}

export const WhatsAppPreviewModal: React.FC<WhatsAppPreviewModalProps> = ({ isOpen, onClose, payload }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const activePayload = payload || CURRENT_EDITION.whatsAppPayload;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(activePayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-[12px] border border-[#E5E7EB] dark:border-[#1E293B] bg-[#FFFFFF] dark:bg-[#161E2E] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAFAFA] dark:bg-[#0B0F17] border-b border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[8px] bg-emerald-500/10 text-[#16A34A] dark:text-[#22C55E] border border-emerald-500/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111827] dark:text-[#F8FAFC]">
                {t.whatsAppModalTitle}
              </h4>
              <p className="text-xs text-[#4B5563] dark:text-[#94A3B8]">
                {t.whatsAppModalSub}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[6px] text-[#4B5563] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-[#F8FAFC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Mobile Frame Preview */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FAFAFA] dark:bg-[#0B0F17] text-xs sm:text-sm font-sans space-y-3">
          <div className="bg-[#FFFFFF] dark:bg-[#121B22] border border-emerald-500/20 rounded-[10px] p-4 text-[#111827] dark:text-slate-200 shadow-sm relative">
            <div className="flex items-center gap-2 text-[10px] text-[#16A34A] dark:text-[#22C55E] font-mono mb-2 border-b border-emerald-500/20 pb-1">
              <Smartphone className="w-3.5 h-3.5" />
              <span>InfoAI Bot • Disparo Agendado (Evolution API)</span>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed text-[#111827] dark:text-slate-200 selection:bg-emerald-500/30">
              {activePayload}
            </pre>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#FAFAFA] dark:bg-[#0B0F17] border-t border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-[8px] bg-[#16A34A] dark:bg-[#22C55E] hover:opacity-90 text-white font-semibold text-xs transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                {t.copied}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {t.copyWhatsAppText}
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-[8px] bg-[#FFFFFF] dark:bg-[#161E2E] border border-[#E5E7EB] dark:border-[#1E293B] text-[#4B5563] dark:text-[#94A3B8] font-medium text-xs transition-colors hover:text-[#111827] dark:hover:text-[#F8FAFC]"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};
