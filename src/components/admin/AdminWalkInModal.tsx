import React, { useState } from 'react';
import { Room, Booking } from '../../types';
import { calculateNights } from '../../utils/formatters';
import { X, Plus, Calendar, Users, DollarSign, Loader2 } from 'lucide-react';

interface AdminWalkInModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  onAddBooking: (booking: Omit<Booking, 'id'>) => Promise<void>;
  uzsRate?: number;
}

export const AdminWalkInModal: React.FC<AdminWalkInModalProps> = ({
  isOpen,
  onClose,
  rooms,
  onAddBooking,
  uzsRate = 12800,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [roomId, setRoomId] = useState(rooms[0]?.id || '');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guestsCount, setGuestsCount] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'unpaid'>('paid');
  const [paymentMethod, setPaymentMethod] = useState('cash_usd');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  if (!isOpen) return null;

  const currentRoom = rooms.find((r) => r.id === roomId) || rooms[0];
  const nights = calculateNights(checkIn, checkOut);
  const pricePerNight = currentRoom ? currentRoom.priceUsd : 14;
  const totalPriceUsd = pricePerNight * nights * (currentRoom?.type === 'dorm' ? guestsCount : 1);
  const totalPriceUzs = Math.round(totalPriceUsd * uzsRate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName) return;

    setIsBusy(true);
    try {
      await onAddBooking({
        roomTypeId: roomId,
        roomName: currentRoom ? currentRoom.name : 'Ummon Room',
        guestName,
        guestEmail: guestEmail || `${guestName.toLowerCase().replace(/\s+/g, '')}@walkin.guest`,
        guestPhone: guestPhone || '+998 00 000 00 00',
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nights,
        guestsCount,
        totalPriceUsd,
        totalPriceUzs,
        currency: 'USD',
        status: 'checked_in', // Walk-in is immediately checked-in
        paymentStatus,
        paymentMethod,
        specialRequests: specialRequests || 'Walk-in arrival at reception',
        source: 'walk_in',
        createdAt: new Date().toISOString(),
      });
      onClose();
    } catch (err) {
      console.error('Walk-in booking error:', err);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0B2B2E] border border-[#F2A93B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-serif text-2xl font-bold text-white mb-1">
          Register Walk-In Guest
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Direct check-in for arriving travelers at front desk.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Room / Bed *</label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-white"
            >
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} (${r.priceUsd}/nt)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Guest Full Name *</label>
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email (Optional)</label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="guest@mail.com"
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone / WhatsApp</label>
              <input
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder="+998..."
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Check-In</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Check-Out</label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Guests</label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-2 py-2 text-white"
              >
                {[1, 2, 3, 4, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Payment</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as any)}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-2 py-2 text-white"
              >
                <option value="paid">Paid Now</option>
                <option value="unpaid">Pay Later</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-[#071e20] border border-white/15 rounded-xl px-2 py-2 text-white"
              >
                <option value="cash_usd">Cash USD</option>
                <option value="cash_uzs">Cash UZS</option>
                <option value="card">Card</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#071e20] border border-white/10 flex items-center justify-between font-semibold">
            <span className="text-slate-300">Total Due ({nights} nights):</span>
            <span className="text-[#F2A93B] text-sm">
              ${totalPriceUsd} (≈ {totalPriceUzs.toLocaleString()} UZS)
            </span>
          </div>

          <button
            type="submit"
            disabled={isBusy}
            className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] text-[#0B2B2E] flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Check In & Register Guest</span>}
          </button>
        </form>
      </div>
    </div>
  );
};
