import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Wifi,
  Wind,
  Droplets,
  UtensilsCrossed,
  Shirt,
  ShieldCheck,
  Luggage,
  Car,
  Compass,
  Clock,
  Coffee,
  Sparkles
} from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const { t } = useLanguage();

  const facilities = [
    {
      icon: <Wifi className="w-6 h-6 text-[#2EC4B6]" />,
      title: t('wifiTitle'),
      desc: t('wifiDesc')
    },
    {
      icon: <Wind className="w-6 h-6 text-[#F2A93B]" />,
      title: t('acTitle'),
      desc: t('acDesc')
    },
    {
      icon: <Droplets className="w-6 h-6 text-[#2EC4B6]" />,
      title: t('showerTitle'),
      desc: t('showerDesc')
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6 text-[#F2A93B]" />,
      title: t('kitchenTitle'),
      desc: t('kitchenDesc')
    },
    {
      icon: <Shirt className="w-6 h-6 text-[#2EC4B6]" />,
      title: t('laundryTitle'),
      desc: t('laundryDesc')
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#F2A93B]" />,
      title: t('lockersTitle'),
      desc: t('lockersDesc')
    },
    {
      icon: <Luggage className="w-6 h-6 text-[#2EC4B6]" />,
      title: t('luggageTitle'),
      desc: t('luggageDesc')
    },
    {
      icon: <Car className="w-6 h-6 text-[#F2A93B]" />,
      title: t('transferTitle'),
      desc: t('transferDesc')
    },
    {
      icon: <Compass className="w-6 h-6 text-[#2EC4B6]" />,
      title: t('toursTitle'),
      desc: t('toursDesc')
    },
    {
      icon: <Clock className="w-6 h-6 text-[#F2A93B]" />,
      title: t('receptionFacilityTitle'),
      desc: t('receptionFacilityDesc')
    },
    {
      icon: <Coffee className="w-6 h-6 text-[#2EC4B6]" />,
      title: t('breakfastTitle'),
      desc: t('breakfastDesc')
    }
  ];

  return (
    <section id="facilities" className="py-24 bg-[#0B2B2E] relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2EC4B6]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#071e20] border border-[#F2A93B]/30 text-[#F2A93B] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span>Comfort & Hospitality</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t('facilitiesTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('facilitiesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#071e20]/80 border border-white/10 hover:border-[#F2A93B]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-[#F2A93B]/5"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-[#F2A93B] transition-colors">
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
