import React, { useState } from 'react';
import { MessageCircle, Send, X, PhoneCall } from 'lucide-react';

interface FloatingChatProps {
  whatsapp?: string;
  telegram?: string;
  phone?: string;
}

export const FloatingChat: React.FC<FloatingChatProps> = ({
  whatsapp = 'https://wa.me/998773260777',
  telegram = 'https://t.me/ummonhostel',
  phone = '+998 77 326 07 77',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded popup */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-[#0B2B2E] border border-[#F2A93B]/40 shadow-2xl p-4 text-xs text-white animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-sm">Ummon Front Desk</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-300 text-xs mb-3 font-light">
            Need urgent assistance, airport pickup, or booking help? Connect directly with our front desk:
          </p>

          <div className="space-y-2">
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 w-full p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Message on WhatsApp</span>
            </a>

            <a
              href={telegram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 w-full p-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 font-semibold transition-colors"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span>Message on Telegram</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2.5 w-full p-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-semibold transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Direct Call: {phone}</span>
            </a>
          </div>
        </div>
      )}

      {/* Main trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#2EC4B6] to-[#F2A93B] text-[#0B2B2E] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
        title="24/7 Hostel Chat & Call"
        aria-label="Open chat desk"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </button>
    </div>
  );
};
