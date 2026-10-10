import React, { useState } from 'react';
import { Room } from '../../types';
import { RoomCard } from './RoomCard';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles } from 'lucide-react';

interface RoomsSectionProps {
  rooms: Room[];
  onBookRoom: (room: Room) => void;
  uzsRate?: number;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ rooms, onBookRoom, uzsRate = 12800 }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'dorm' | 'private' | 'family'>('all');

  const filteredRooms = rooms.filter((r) => {
    if (!r.isActive) return false;
    if (activeFilter === 'all') return true;
    return r.type === activeFilter;
  });

  return (
    <section id="rooms" className="py-24 bg-[#071e20] relative overflow-hidden bg-silk-pattern">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F2A93B]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#2EC4B6]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B2B2E] border border-[#2EC4B6]/30 text-[#2EC4B6] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span>Silk Road Comfort</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t('roomsTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('roomsSubtitle')}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Accommodations' },
              { id: 'dorm', label: 'Bunk Pod Dorms' },
              { id: 'private', label: 'Private Deluxe' },
              { id: 'family', label: 'Family Suite' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-[#F2A93B] text-[#0B2B2E] shadow-md shadow-[#F2A93B]/20'
                    : 'bg-[#0B2B2E] text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onBook={onBookRoom}
              uzsRate={uzsRate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
