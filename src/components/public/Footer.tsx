import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Compass, Mail, Heart, Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC<{ onNavigateAdmin: () => void }> = ({ onNavigateAdmin }) => {
  const { t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#051517] border-t border-white/10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2B2E] via-[#164246] to-[#2EC4B6] border border-[#F2A93B]/40 flex items-center justify-center text-[#F2A93B]">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white">
                Ummon <span className="text-[#F2A93B]">Hostel</span>
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed font-light max-w-sm">
              {t('footerDesc')}
            </p>
            <p className="text-slate-400">
              Xonabodtepa, 100081, Toshkent shahri, Uzbekistan
              <br />
              Direct Phone: +998 77 326 07 77
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#rooms" className="hover:text-[#F2A93B] transition-colors">
                  {t('navRooms')}
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-[#F2A93B] transition-colors">
                  {t('navFacilities')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#F2A93B] transition-colors">
                  {t('navGallery')}
                </a>
              </li>
              <li>
                <a href="#attractions" className="hover:text-[#F2A93B] transition-colors">
                  {t('navAttractions')}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#F2A93B] transition-colors">
                  {t('navReviews')}
                </a>
              </li>
            </ul>
          </div>

          {/* Travel Help */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Assistance
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="hover:text-[#F2A93B] transition-colors">
                  {t('navFaq')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#F2A93B] transition-colors">
                  {t('navContact')}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/998773260777"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp 24/7 Desk
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/ummonhostel"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  Telegram Channel
                </a>
              </li>
              <li>
                <button
                  onClick={onNavigateAdmin}
                  className="text-[#2EC4B6] hover:underline transition-colors text-left"
                >
                  Admin / Staff Login
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t('newsletterTitle')}
            </h4>
            <p className="text-slate-300 text-xs mb-3 font-light">
              {t('newsletterSub')}
            </p>
            {subscribed ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="traveler@email.com"
                  className="w-full bg-[#0B2B2E] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-[#F2A93B] hover:brightness-110 text-[#0B2B2E] font-bold text-xs transition-colors"
                >
                  {t('newsletterBtn')}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ummon Hostel Tashkent. {t('footerRights')}</p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Hospitality along the Silk Road</span>
            <span className="text-[#F2A93B]">✦</span>
            <span>Toshkent, O'zbekiston</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
