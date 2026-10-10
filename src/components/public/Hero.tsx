import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Calendar,
  Users,
  Search,
  BedDouble,
  ShieldCheck,
  Star,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onSearch: (params: { checkIn: string; checkOut: string; guests: number; roomType: string }) => void;
  headline?: string;
  subtext?: string;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, headline, subtext }) => {
  const { t } = useLanguage();

  const today = new Date().toISOString().split('T')[0];
  const nextTwoDays = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(nextTwoDays);
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, guests, roomType });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background imagery with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=2000&q=85"
          alt="Ummon Hostel Tashkent Courtyard"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.45] contrast-105"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071e20] via-[#071e20]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#071e20]/80 via-transparent to-[#071e20]/80"></div>
        {/* Subtle Silk Road decorative glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#2EC4B6]/15 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        {/* Top boutique badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B2B2E]/90 border border-[#F2A93B]/40 text-[#F2A93B] text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md mb-6 animate-pulse">
          <Sparkles className="w-4 h-4 text-[#F2A93B]" />
          <span>Boutique Silk Road Hospitality · Tashkent, Uzbekistan</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] mb-6 drop-shadow-md">
          {headline || t('heroHeadline')}
        </h1>

        {/* Subtext */}
        <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal drop-shadow">
          {subtext || t('heroSubtext')}
        </p>

        {/* Interactive Booking Search Bar (Glass Card) */}
        <div className="max-w-4xl mx-auto bg-[#0B2B2E]/85 backdrop-blur-xl border border-[#F2A93B]/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl shadow-black/60 text-left">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Check-in */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F2A93B]" />
                <span>{t('checkIn')}</span>
              </label>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (e.target.value >= checkOut) {
                    const next = new Date(new Date(e.target.value).getTime() + 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split('T')[0];
                    setCheckOut(next);
                  }
                }}
                className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F2A93B]"
              />
            </div>

            {/* Check-out */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2EC4B6]" />
                <span>{t('checkOut')}</span>
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F2A93B]"
              />
            </div>

            {/* Room Type & Guests */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#F2A93B]" />
                <span>{t('guests')}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-2 py-2.5 text-sm text-white focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? t('guestSingular') : t('guestsPlural')}
                    </option>
                  ))}
                </select>

                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-2 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="all">{t('allRoomTypes')}</option>
                  <option value="dorm">Dorm Beds</option>
                  <option value="private">Private Room</option>
                  <option value="family">Family Suite</option>
                </select>
              </div>
            </div>

            {/* Search / Check Availability Button */}
            <div>
              <button
                type="submit"
                className="w-full h-[46px] rounded-xl bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 text-[#0B2B2E] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#F2A93B]/20 transition-all transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>{t('checkAvailability')}</span>
              </button>
            </div>
          </form>

          {/* Micro trust guarantees */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('instantConfirmation')}</span>
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-[#F2A93B]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>9.8 Superb (450+ reviews)</span>
              </span>
              <span className="hidden sm:flex items-center gap-1 text-[#2EC4B6]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Official e-Mehmon Registered</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
