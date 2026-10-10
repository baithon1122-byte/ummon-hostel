import React, { useState } from 'react';
import { Review, Room } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { submitReview } from '../../firebase/services';
import {
  Star,
  MessageSquarePlus,
  Quote,
  CheckCircle2,
  Sparkles,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  rooms: Room[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, rooms }) => {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestCountry, setGuestCountry] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [roomType, setRoomType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !comment) return;

    setIsSubmitting(true);
    try {
      await submitReview({
        guestName,
        guestCountry: guestCountry || 'International Traveler',
        rating,
        comment,
        roomType: roomType || undefined
      });
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setModalOpen(false);
        setGuestName('');
        setGuestCountry('');
        setComment('');
      }, 3000);
    } catch (err) {
      console.error('Review submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-[#0B2B2E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071e20] border border-[#F2A93B]/30 text-[#F2A93B] text-xs font-semibold mb-3">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>9.8 / 10 · Exceptional Guest Rating</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              {t('reviewsTitle')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t('reviewsSubtitle')}
            </p>
          </div>

          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 shadow-lg shadow-[#F2A93B]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{t('submitReviewBtn')}</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-[#071e20]/80 border border-white/10 hover:border-[#F2A93B]/30 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#F2A93B]">
                    {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/15" />
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">
                    {rev.guestName}
                  </h4>
                  <p className="text-[11px] text-[#2EC4B6]">
                    {rev.guestCountry || 'Traveler'}
                  </p>
                </div>
                {rev.roomType && (
                  <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-md max-w-[100px] truncate" title={rev.roomType}>
                    {rev.roomType}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0B2B2E] border border-[#F2A93B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
              {t('reviewModalTitle')}
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Your feedback inspires our team and helps fellow Silk Road wanderers.
            </p>

            {submittedSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-white">Review Submitted!</h4>
                <p className="text-xs text-slate-200">
                  {t('reviewPendingNotice')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('reviewName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Liam Walker"
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t('reviewCountry')}
                    </label>
                    <input
                      type="text"
                      value={guestCountry}
                      onChange={(e) => setGuestCountry(e.target.value)}
                      placeholder="e.g. Australia"
                      className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t('reviewRating')}
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                      <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                      <option value={3}>⭐⭐⭐ 3 Stars</option>
                      <option value={2}>⭐⭐ 2 Stars</option>
                      <option value={1}>⭐ 1 Star</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('reviewRoomType')}
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                  >
                    <option value="">Select Room (Optional)</option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('reviewComment')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the beds, atmosphere, staff, cleanliness..."
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-bold text-sm text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>{t('reviewSubmit')}</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
