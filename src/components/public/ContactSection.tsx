import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { submitContactMessage } from '../../firebase/services';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Instagram,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  address?: string;
  phone?: string;
  email?: string;
  telegram?: string;
  whatsapp?: string;
  instagram?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  address = 'Xonabodtepa, 100081, Toshkent shahri, Uzbekistan',
  phone = '+998 77 326 07 77',
  email = 'info@ummonhostel.uz',
  telegram = 'https://t.me/ummonhostel',
  whatsapp = 'https://wa.me/998773260777',
  instagram = 'https://instagram.com/ummonhostel',
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !guestEmail || !message) return;

    setIsSubmitting(true);
    try {
      await submitContactMessage({
        name,
        email: guestEmail,
        phone: guestPhone || undefined,
        subject: subject || 'General Inquiry',
        message
      });
      setSentSuccess(true);
      setName('');
      setGuestEmail('');
      setGuestPhone('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSentSuccess(false), 5000);
    } catch (err) {
      console.error('Contact form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0B2B2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071e20] border border-[#2EC4B6]/30 text-[#2EC4B6] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F2A93B]" />
            <span>24/7 Front Desk</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t('contactTitle')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Social Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#071e20] border border-white/10 space-y-6 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-white">
                Ummon Hostel Front Desk
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F2A93B]/15 border border-[#F2A93B]/30 flex items-center justify-center shrink-0 text-[#F2A93B] mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 block mb-0.5">Location</span>
                    <p className="text-white font-medium">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2EC4B6]/15 border border-[#2EC4B6]/30 flex items-center justify-center shrink-0 text-[#2EC4B6] mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 block mb-0.5">Phone & WhatsApp</span>
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="text-white font-medium hover:text-[#F2A93B] transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 block mb-0.5">Direct Email</span>
                    <a
                      href={`mailto:${email}`}
                      className="text-white font-medium hover:text-[#F2A93B] transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant Social Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <span className="text-xs uppercase font-bold text-slate-400 block">Instant Chat Channels</span>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/30 text-xs font-bold transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram</span>
                  </a>
                </div>

                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram @ummonhostel</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-xl h-60 bg-black/40">
              <iframe
                title="Ummon Hostel Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47936.50570533251!2d69.20668045!3d41.3110813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa58445!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#071e20] border border-white/10 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                Have special requirements, questions about Samarkand trains, or group bookings? Write to us directly.
              </p>

              {sentSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{t('contactSuccess')}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t('contactFormName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-[#0B2B2E] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t('contactFormEmail')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full bg-[#0B2B2E] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t('contactFormPhone')}
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+998 77 326 07 77"
                      className="w-full bg-[#0B2B2E] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t('contactFormSubject')}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Airport pickup / Visa letter"
                      className="w-full bg-[#0B2B2E] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('contactFormMessage')} *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help make your stay exceptional..."
                    className="w-full bg-[#0B2B2E] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-[#F2A93B]/20 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('contactFormSend')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
