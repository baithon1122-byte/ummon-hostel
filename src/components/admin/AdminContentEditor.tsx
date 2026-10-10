import React, { useState } from 'react';
import { HostelSettings } from '../../types';
import { Save, CheckCircle2, Loader2, Sparkles, RefreshCw } from 'lucide-react';

interface AdminContentEditorProps {
  settings: HostelSettings;
  onSaveSettings: (settings: Partial<HostelSettings>) => Promise<void>;
}

export const AdminContentEditor: React.FC<AdminContentEditorProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [heroHeadline, setHeroHeadline] = useState(settings.heroHeadline);
  const [heroSubtext, setHeroSubtext] = useState(settings.heroSubtext);
  const [aboutStory, setAboutStory] = useState(settings.aboutStory);
  const [address, setAddress] = useState(settings.address);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [telegram, setTelegram] = useState(settings.telegram);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [checkInTime, setCheckInTime] = useState(settings.checkInTime);
  const [checkOutTime, setCheckOutTime] = useState(settings.checkOutTime);
  const [uzsRate, setUzsRate] = useState(settings.uzsRate || 12800);

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveSettings({
        heroHeadline,
        heroSubtext,
        aboutStory,
        address,
        phone,
        email,
        telegram,
        whatsapp,
        instagram,
        checkInTime,
        checkOutTime,
        uzsRate: Number(uzsRate)
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Save settings error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Website Content & Text Editor
          </h2>
          <p className="text-xs text-slate-400">
            Edit live hero copy, about history, reception contacts, and exchange rates in real time.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Changes Published Live!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Section 1: Hero Copy */}
        <div className="p-6 rounded-2xl bg-[#0B2B2E] border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-white font-serif font-bold text-base border-b border-white/10 pb-3">
            <Sparkles className="w-4 h-4 text-[#F2A93B]" />
            <span>Homepage Hero Banner</span>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Main Hero Headline
            </label>
            <input
              type="text"
              value={heroHeadline}
              onChange={(e) => setHeroHeadline(e.target.value)}
              className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Hero Subtext Description
            </label>
            <textarea
              rows={2}
              value={heroSubtext}
              onChange={(e) => setHeroSubtext(e.target.value)}
              className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-white"
            />
          </div>
        </div>

        {/* Section 2: About Story */}
        <div className="p-6 rounded-2xl bg-[#0B2B2E] border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-white font-serif font-bold text-base border-b border-white/10 pb-3">
            Hostel Heritage Story
          </h3>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              About Text (Silk Road Story)
            </label>
            <textarea
              rows={4}
              value={aboutStory}
              onChange={(e) => setAboutStory(e.target.value)}
              className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-white leading-relaxed"
            />
          </div>
        </div>

        {/* Section 3: Operations & Currency */}
        <div className="p-6 rounded-2xl bg-[#0B2B2E] border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-white font-serif font-bold text-base border-b border-white/10 pb-3">
            Operations & Exchange Rates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Check-in Time
              </label>
              <input
                type="text"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Check-out Time
              </label>
              <input
                type="text"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                USD to UZS Rate (1 USD = X UZS)
              </label>
              <input
                type="number"
                value={uzsRate}
                onChange={(e) => setUzsRate(Number(e.target.value))}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Contact & Channels */}
        <div className="p-6 rounded-2xl bg-[#0B2B2E] border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-white font-serif font-bold text-base border-b border-white/10 pb-3">
            Front Desk Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">WhatsApp URL</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Telegram URL</label>
              <input
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] text-[#0B2B2E] hover:brightness-110 shadow-lg shadow-[#F2A93B]/20 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save & Publish All Content</span>
          </button>
        </div>
      </form>
    </div>
  );
};
