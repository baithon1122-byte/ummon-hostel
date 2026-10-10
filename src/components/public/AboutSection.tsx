import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Users, Star, Globe, Compass, Heart, Award } from 'lucide-react';

interface AboutSectionProps {
  storyText?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ storyText }) => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: <Users className="w-5 h-5 text-[#F2A93B]" />,
      val: '2,400+',
      label: t('statHappyGuests')
    },
    {
      icon: <Star className="w-5 h-5 text-[#2EC4B6]" />,
      val: '9.8 / 10',
      label: t('statRating')
    },
    {
      icon: <Globe className="w-5 h-5 text-[#F2A93B]" />,
      val: '54+',
      label: t('statCountries')
    },
    {
      icon: <Compass className="w-5 h-5 text-[#2EC4B6]" />,
      val: '120+',
      label: t('statTours')
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#071e20] relative overflow-hidden bg-silk-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images collage */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border border-[#F2A93B]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=80"
                alt="Ummon Hostel courtyard tea garden"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071e20] via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B2B2E]/90 backdrop-blur-md border border-white/10 text-xs text-slate-200">
                <span className="font-semibold text-[#F2A93B] block mb-1">
                  Traditional Tapchan Lounge
                </span>
                Where travelers gather every evening for fresh mountain green tea, Uzbek halva, and travel stories.
              </div>
            </div>

            {/* Inset floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 z-20 p-5 rounded-2xl bg-[#0B2B2E] border border-[#2EC4B6]/40 shadow-2xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2EC4B6]/20 flex items-center justify-center text-[#2EC4B6]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Central Asian Boutique</h4>
                  <p className="text-[11px] text-slate-300">Modern comfort with heritage hospitality</p>
                </div>
              </div>
            </div>
          </div>

          {/* Story & Philosophy */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B2B2E] border border-[#2EC4B6]/30 text-[#2EC4B6] text-xs font-semibold mb-4">
              <Heart className="w-3.5 h-3.5 text-[#F2A93B]" />
              <span>Silk Road Roots</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              {t('aboutTitle')}
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-10">
              <p>{storyText || t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
            </div>

            {/* Why Choose Us Stats Grid */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="font-serif text-lg font-bold text-[#F2A93B] mb-6">
                {t('whyChooseUs')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#0B2B2E] border border-white/5 text-center">
                    <div className="flex justify-center mb-1.5">{s.icon}</div>
                    <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {s.val}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-medium leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
