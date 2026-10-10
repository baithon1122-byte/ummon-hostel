import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface QuickInfoStripProps {
  checkInTime?: string;
  checkOutTime?: string;
  address?: string;
  phone?: string;
}

export const QuickInfoStrip: React.FC<QuickInfoStripProps> = ({
  checkInTime = '14:00',
  checkOutTime = '12:00',
  address = 'Xonabodtepa, 100081, Toshkent shahri, Uzbekistan',
  phone = '+998 77 326 07 77',
}) => {
  const { t } = useLanguage();

  return (
    <div className="relative z-20 bg-[#0B2B2E] border-y border-[#F2A93B]/20 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Item 1: Check-in / Check-out */}
        <div className="flex items-center gap-3.5 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="w-10 h-10 rounded-lg bg-[#2EC4B6]/15 border border-[#2EC4B6]/30 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-[#2EC4B6]" />
          </div>
          <div>
            <p className="text-xs uppercase font-medium text-slate-400">{t('checkInTimeTitle')}</p>
            <p className="text-sm font-semibold text-white">
              {checkInTime} / {checkOutTime}
            </p>
          </div>
        </div>

        {/* Item 2: Address */}
        <div className="flex items-center gap-3.5 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="w-10 h-10 rounded-lg bg-[#F2A93B]/15 border border-[#F2A93B]/30 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-[#F2A93B]" />
          </div>
          <div className="truncate">
            <p className="text-xs uppercase font-medium text-slate-400">{t('addressTitle')}</p>
            <p className="text-sm font-semibold text-white truncate" title={address}>
              {address}
            </p>
          </div>
        </div>

        {/* Item 3: Phone */}
        <div className="flex items-center gap-3.5 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="w-10 h-10 rounded-lg bg-[#2EC4B6]/15 border border-[#2EC4B6]/30 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-[#2EC4B6]" />
          </div>
          <div>
            <p className="text-xs uppercase font-medium text-slate-400">{t('phoneTitle')}</p>
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="text-sm font-semibold text-white hover:text-[#F2A93B] transition-colors"
            >
              {phone}
            </a>
          </div>
        </div>

        {/* Item 4: 24/7 Reception */}
        <div className="flex items-center gap-3.5 p-2 rounded-xl bg-white/5 border border-white/5">
          <div className="w-10 h-10 rounded-lg bg-[#F2A93B]/15 border border-[#F2A93B]/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#F2A93B]" />
          </div>
          <div>
            <p className="text-xs uppercase font-medium text-slate-400">{t('receptionTitle')}</p>
            <p className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{t('receptionVal')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
