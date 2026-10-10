import React, { useState } from 'react';
import { Review } from '../../types';
import { Star, CheckCircle, XCircle, Trash2, ShieldCheck, Clock } from 'lucide-react';

interface AdminReviewsProps {
  reviews: Review[];
  onApproveReview: (id: string, isApproved: boolean) => void;
  onDeleteReview: (id: string) => void;
}

export const AdminReviews: React.FC<AdminReviewsProps> = ({
  reviews,
  onApproveReview,
  onDeleteReview,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const filtered = reviews.filter((r) => {
    if (filter === 'pending') return !r.isApproved;
    if (filter === 'approved') return r.isApproved;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Guest Reviews Moderation
          </h2>
          <p className="text-xs text-slate-400">
            Verify submitted testimonials before they display on the public website.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0B2B2E] p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filter === 'all' ? 'bg-[#F2A93B] text-[#0B2B2E]' : 'text-slate-300'
            }`}
          >
            All ({reviews.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filter === 'pending' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300'
            }`}
          >
            Pending ({reviews.filter((r) => !r.isApproved).length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filter === 'approved' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300'
            }`}
          >
            Approved ({reviews.filter((r) => r.isApproved).length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 py-12 text-center text-slate-400 bg-[#0B2B2E] rounded-2xl border border-white/10">
            No reviews matching this filter.
          </div>
        ) : (
          filtered.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-[#0B2B2E] border border-white/10 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-[#F2A93B]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      rev.isApproved
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {rev.isApproved ? 'Live on Website' : 'Pending Approval'}
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>

                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <div className="font-semibold text-white">{rev.guestName}</div>
                  <div>Origin: {rev.guestCountry || 'Traveler'}</div>
                  {rev.roomType && <div>Room: {rev.roomType}</div>}
                  <div className="text-[10px] text-slate-500">
                    Date: {new Date(rev.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  {!rev.isApproved ? (
                    <button
                      onClick={() => onApproveReview(rev.id, true)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onApproveReview(rev.id, false)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Unpublish</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('Delete this review permanently?')) {
                      onDeleteReview(rev.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
