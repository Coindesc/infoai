import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SubscriberFormData, CategoryKey } from '../types';
import { CATEGORY_LABELS } from '../i18n/translations';
import { saveSubscriber } from '../lib/supabase';
import { Mail, MessageCircle, Clock, CheckCircle2, Send, Sparkles } from 'lucide-react';

export const SubscribeSection: React.FC = () => {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState<SubscriberFormData>({
    fullName: '',
    channel: 'both',
    email: '',
    phone: '',
    dispatchTime: '07:30',
    interests: ['politica', 'economia', 'tecnologia', 'mundo']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const timePresets = ['07:00', '08:00', '12:30', '18:00', '21:00'];
  const allCategories: CategoryKey[] = [
    'politica',
    'economia',
    'mundo',
    'tecnologia',
    'esportes',
    'ciencia_saude',
    'cultura'
  ];

  const handleInterestToggle = (cat: CategoryKey) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(cat)
        ? prev.interests.filter((i) => i !== cat)
        : [...prev.interests, cat]
    }));
  };

  const handleSelectAll = () => {
    if (formData.interests.length === allCategories.length) {
      setFormData((prev) => ({ ...prev, interests: [] }));
    } else {
      setFormData((prev) => ({ ...prev, interests: [...allCategories] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Por favor informe seu nome.');
      return;
    }

    if ((formData.channel === 'email' || formData.channel === 'both') && !formData.email) {
      setErrorMsg('Por favor informe seu endereço de e-mail.');
      return;
    }

    if ((formData.channel === 'whatsapp' || formData.channel === 'both') && !formData.phone) {
      setErrorMsg('Por favor informe seu número de WhatsApp.');
      return;
    }

    setIsSubmitting(true);
    const result = await saveSubscriber(formData);
    setIsSubmitting(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setErrorMsg(result.message || 'Erro ao processar assinatura.');
    }
  };

  return (
    <section id="subscribe" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Editorial Minimalist Ultra-Clean Card (border-radius: 12px, soft shadow) */}
      <div className="rounded-[12px] border border-[#E5E7EB] dark:border-[#1E293B] bg-[#FFFFFF] dark:bg-[#161E2E] p-6 sm:p-10 shadow-sm transition-colors">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 text-[#2563EB] dark:text-[#3B82F6] border border-[#2563EB]/20 dark:border-[#3B82F6]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Portal de Distribuição Personalizada
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#F8FAFC] mb-2">
            {t.subscribeTitle}
          </h3>
          <p className="text-sm text-[#4B5563] dark:text-[#94A3B8]">
            {t.subscribeSubtitle}
          </p>
        </div>

        {success ? (
          <div className="rounded-[12px] border border-emerald-500/30 bg-emerald-500/5 p-8 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#16A34A] dark:text-[#22C55E] mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#111827] dark:text-[#F8FAFC] mb-2">
              Assinatura Registrada com Sucesso
            </h4>
            <p className="text-sm text-[#4B5563] dark:text-[#94A3B8] max-w-lg mx-auto mb-6">
              {t.subscribeSuccess}
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#4B5563] dark:text-[#94A3B8] bg-[#FAFAFA] dark:bg-[#0B0F17] px-4 py-2 rounded-[8px] border border-[#E5E7EB] dark:border-[#1E293B]">
              <Clock className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
              Horário configurado: <strong className="text-[#111827] dark:text-[#F8FAFC]">{formData.dispatchTime}</strong> ({formData.channel.toUpperCase()})
            </div>
            <div className="mt-6">
              <button
                onClick={() => setSuccess(false)}
                className="text-xs text-[#2563EB] dark:text-[#3B82F6] hover:underline font-semibold"
              >
                Cadastrar outro assinante ou atualizar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-3 rounded-[8px] bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            {/* 1. Nome Completo */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#111827] dark:text-[#F8FAFC] mb-2">
                1. {t.fullNameLabel}
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={t.fullNamePlaceholder}
                className="w-full px-4 py-3 rounded-[8px] bg-[#FAFAFA] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1E293B] text-[#111827] dark:text-[#F8FAFC] placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] dark:focus:border-[#3B82F6] transition-colors"
              />
            </div>

            {/* 2. Canal de Preferência (Destaque WhatsApp verde) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#111827] dark:text-[#F8FAFC] mb-2">
                2. {t.channelLabel}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, channel: 'email' })}
                  className={`p-3 rounded-[8px] border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    formData.channel === 'email'
                      ? 'bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 border-[#2563EB] dark:border-[#3B82F6] text-[#2563EB] dark:text-[#3B82F6] font-bold shadow-sm'
                      : 'bg-[#FAFAFA] dark:bg-[#0B0F17] border-[#E5E7EB] dark:border-[#1E293B] text-[#4B5563] dark:text-[#94A3B8] hover:border-slate-400'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  {t.channelEmail}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, channel: 'whatsapp' })}
                  className={`p-3 rounded-[8px] border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    formData.channel === 'whatsapp'
                      ? 'bg-emerald-500/10 border-[#16A34A] dark:border-[#22C55E] text-[#16A34A] dark:text-[#22C55E] font-bold shadow-sm'
                      : 'bg-[#FAFAFA] dark:bg-[#0B0F17] border-[#E5E7EB] dark:border-[#1E293B] text-[#4B5563] dark:text-[#94A3B8] hover:border-slate-400'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-[#16A34A] dark:text-[#22C55E]" />
                  {t.channelWhatsApp}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, channel: 'both' })}
                  className={`p-3 rounded-[8px] border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                    formData.channel === 'both'
                      ? 'bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 border-[#2563EB] dark:border-[#3B82F6] text-[#2563EB] dark:text-[#3B82F6] font-bold shadow-sm'
                      : 'bg-[#FAFAFA] dark:bg-[#0B0F17] border-[#E5E7EB] dark:border-[#1E293B] text-[#4B5563] dark:text-[#94A3B8] hover:border-slate-400'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {t.channelBoth}
                </button>
              </div>
            </div>

            {/* 3. Contatos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(formData.channel === 'email' || formData.channel === 'both') && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#111827] dark:text-[#F8FAFC] mb-2">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-[8px] bg-[#FAFAFA] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1E293B] text-[#111827] dark:text-[#F8FAFC] placeholder-slate-400 text-sm focus:outline-none focus:border-[#2563EB] dark:focus:border-[#3B82F6] transition-colors"
                  />
                </div>
              )}

              {(formData.channel === 'whatsapp' || formData.channel === 'both') && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#111827] dark:text-[#F8FAFC] mb-2">
                    {t.whatsappLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.whatsappPlaceholder}
                    className="w-full px-4 py-3 rounded-[8px] bg-[#FAFAFA] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1E293B] text-[#111827] dark:text-[#F8FAFC] placeholder-slate-400 text-sm focus:outline-none focus:border-[#16A34A] dark:focus:border-[#22C55E] transition-colors"
                  />
                </div>
              )}
            </div>

            {/* 4. Horário de Recebimento Predefinido */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] dark:text-[#F8FAFC]">
                  4. {t.scheduleTimeLabel}
                </label>
                <span className="text-xs text-[#4B5563] dark:text-[#94A3B8]">
                  {t.scheduleTimeHint}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                {timePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setFormData({ ...formData, dispatchTime: preset })}
                    className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-all ${
                      formData.dispatchTime === preset
                        ? 'bg-[#2563EB] dark:bg-[#3B82F6] text-white font-bold shadow-sm'
                        : 'bg-[#FAFAFA] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1E293B] text-[#4B5563] dark:text-[#94A3B8] hover:text-[#111827] dark:hover:text-[#F8FAFC]'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
                
                <div className="flex items-center gap-1.5 bg-[#FAFAFA] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1E293B] rounded-[8px] px-2.5 py-1">
                  <Clock className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
                  <input
                    type="time"
                    value={formData.dispatchTime}
                    onChange={(e) => setFormData({ ...formData, dispatchTime: e.target.value })}
                    className="bg-transparent text-[#111827] dark:text-[#F8FAFC] text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 5. Editorias Selecionadas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#111827] dark:text-[#F8FAFC]">
                  5. {t.interestsLabel}
                </label>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs text-[#2563EB] dark:text-[#3B82F6] hover:underline font-medium"
                >
                  {formData.interests.length === allCategories.length ? 'Desmarcar todas' : 'Marcar todas'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {allCategories.map((catKey) => {
                  const active = formData.interests.includes(catKey);
                  const label = CATEGORY_LABELS[catKey][language];

                  return (
                    <button
                      key={catKey}
                      type="button"
                      onClick={() => handleInterestToggle(catKey)}
                      className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-all ${
                        active
                          ? 'bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 text-[#2563EB] dark:text-[#3B82F6] border border-[#2563EB]/30 dark:border-[#3B82F6]/30 shadow-sm'
                          : 'bg-[#FAFAFA] dark:bg-[#0B0F17] border border-[#E5E7EB] dark:border-[#1E293B] text-[#4B5563] dark:text-[#94A3B8] hover:border-slate-400'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-[8px] bg-[#2563EB] dark:bg-[#3B82F6] hover:opacity-95 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  {t.submitting}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t.submitSubscribe}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
