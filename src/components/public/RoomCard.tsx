import React, { useState } from 'react';
import { Room } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { formatPrice } from '../../utils/formatters';
import {
  Users,
  BedDouble,
  Wifi,
  Wind,
  Shield,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  CalendarCheck
} from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
  uzsRate?: number;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onBook, uzsRate = 12800 }) => {
  const { currency, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = room.images && room.images.length > 0
    ? room.images
    : ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80'];

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group rounded-3xl bg-[#0B2B2E]/90 border border-white/10 hover:border-[#F2A93B]/50 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#F2A93B]/10 flex flex-col h-full">
      {/* Image Slider */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
        <img
          src={images[currentImageIndex]}
          alt={room.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#071e20]/80 backdrop-blur-md text-[#F2A93B] border border-[#F2A93B]/30 shadow-md">
            {room.type === 'dorm' ? 'Shared Pod Dorm' : room.type === 'private' ? 'Private Ensuite' : 'Family Suite'}
          </span>
        </div>

        {/* Carousel arrows */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              aria-label="Previous photo"
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next photo"
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-[#F2A93B] w-3' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Room Specs & Capacity */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-300 mb-2.5">
            <span className="flex items-center gap-1.5 text-[#2EC4B6]">
              <Users className="w-3.5 h-3.5" />
              <span>
                {room.capacity} {t('capacity')}
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <BedDouble className="w-3.5 h-3.5" />
              <span>
                {room.bedsCount} {t('beds')}
              </span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#F2A93B] transition-colors mb-2">
            {room.name}
          </h3>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed font-light">
            {room.shortDescription || room.description}
          </p>

          {/* Key Amenities */}
          <div className="space-y-1.5 mb-6 pt-3 border-t border-white/10">
            {room.amenities.slice(0, 4).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                <Check className="w-3.5 h-3.5 text-[#2EC4B6] shrink-0" />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Price & CTA */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
              {t('perNight')}
            </span>
            <span className="font-serif text-2xl font-bold text-white text-gradient">
              {formatPrice(room.priceUsd, uzsRate, currency)}
            </span>
          </div>

          <button
            onClick={() => onBook(room)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 shadow-lg shadow-[#F2A93B]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{t('bookThisRoom')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
