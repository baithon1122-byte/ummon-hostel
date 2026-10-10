import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'rooms' | 'common' | 'tashkent'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="gallery" className="py-24 bg-[#0B2B2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071e20] border border-[#2EC4B6]/30 text-[#2EC4B6] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span>Visual Tour</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t('galleryTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('gallerySubtitle')}
          </p>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: 'all', label: t('tabAll') },
              { id: 'rooms', label: t('tabRooms') },
              { id: 'common', label: t('tabCommon') },
              { id: 'tashkent', label: t('tabTashkent') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#F2A93B] text-[#0B2B2E] shadow-md shadow-[#F2A93B]/20'
                    : 'bg-[#071e20] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/40 cursor-pointer border border-white/10 hover:border-[#F2A93B]/60 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <span className="text-xs uppercase font-bold text-[#F2A93B] tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-white mb-1">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {item.caption}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#2EC4B6]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl mb-4 border border-white/20"
            />
            <div className="text-center text-white">
              <h4 className="font-serif text-xl font-bold text-[#F2A93B]">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-sm text-slate-300 max-w-lg mt-1">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
