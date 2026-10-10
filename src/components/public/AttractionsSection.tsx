import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Navigation, Sparkles, ExternalLink } from 'lucide-react';

export const AttractionsSection: React.FC = () => {
  const { t } = useLanguage();

  const attractions = [
    {
      title: t('chorsuTitle'),
      distance: t('chorsuDist'),
      desc: t('chorsuDesc'),
      image: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=800&q=80',
      badge: 'Historic Dome Bazaar'
    },
    {
      title: t('khastImamTitle'),
      distance: t('khastImamDist'),
      desc: t('khastImamDesc'),
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      badge: 'Ancient Quran Sanctuary'
    },
    {
      title: t('temurTitle'),
      distance: t('temurDist'),
      desc: t('temurDesc'),
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
      badge: 'City Center Hub'
    },
    {
      title: t('metroTitle'),
      distance: t('metroDist'),
      desc: t('metroDesc'),
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
      badge: 'Architectural Masterpiece'
    },
    {
      title: t('tvTowerTitle'),
      distance: t('tvTowerDist'),
      desc: t('tvTowerDesc'),
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
      badge: 'Panoramic Skyline'
    }
  ];

  return (
    <section id="attractions" className="py-24 bg-[#071e20] relative overflow-hidden bg-silk-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B2B2E] border border-[#2EC4B6]/30 text-[#2EC4B6] text-xs font-semibold mb-3">
            <Navigation className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span>Discover Tashkent</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t('attractionsTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('attractionsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((att, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#0B2B2E] border border-white/10 hover:border-[#F2A93B]/40 overflow-hidden shadow-xl transition-all duration-300 group hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={att.image}
                  alt={att.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#071e20]/85 backdrop-blur-md text-[#F2A93B] border border-[#F2A93B]/30 shadow-md">
                    {att.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#2EC4B6] font-semibold mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{att.distance}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#F2A93B] transition-colors mb-2">
                    {att.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {att.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Front desk provides directions & taxi guidance</span>
                  <Navigation className="w-4 h-4 text-[#F2A93B]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
