import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: t('faqQ1'), a: t('faqA1') },
    { q: t('faqQ2'), a: t('faqA2') },
    { q: t('faqQ3'), a: t('faqA3') },
    { q: t('faqQ4'), a: t('faqA4') },
    { q: t('faqQ5'), a: t('faqA5') },
  ];

  return (
    <section id="faq" className="py-24 bg-[#071e20] relative overflow-hidden bg-silk-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B2B2E] border border-[#2EC4B6]/30 text-[#2EC4B6] text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span>Clear Answers</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t('faqTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('faqSubtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0B2B2E] border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 text-white font-semibold text-sm sm:text-base hover:text-[#F2A93B] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#2EC4B6] shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180 text-[#F2A93B]' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-light border-t border-white/5 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
