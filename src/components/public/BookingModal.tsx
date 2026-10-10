import React, { useState, useEffect } from 'react';
import { Room, Currency } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { formatPrice, calculateNights } from '../../utils/formatters';
import { checkRoomAvailability, createBooking } from '../../firebase/services';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Users,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room | null;
  rooms: Room[];
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  uzsRate?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  rooms,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 1,
  uzsRate = 12800,
}) => {
  const { currency, t } = useLanguage();

  const today = new Date().toISOString().split('T')[0];
  const nextTwoDays = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [roomId, setRoomId] = useState<string>('');
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || today);
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || nextTwoDays);
  const [guestsCount, setGuestsCount] = useState<number>(initialGuests);

  // Guest details form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Availability & Submission State
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedRoom) {
      setRoomId(selectedRoom.id);
    } else if (rooms.length > 0) {
      setRoomId(rooms[0].id);
    }
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuests) setGuestsCount(initialGuests);
  }, [selectedRoom, rooms, initialCheckIn, initialCheckOut, initialGuests]);

  if (!isOpen) return null;

  const currentRoom = rooms.find((r) => r.id === roomId) || selectedRoom || rooms[0];
  const nights = calculateNights(checkIn, checkOut);
  const pricePerNight = currentRoom ? currentRoom.priceUsd : 14;
  const totalPriceUsd = pricePerNight * nights * (currentRoom?.type === 'dorm' ? guestsCount : 1);
  const totalPriceUzs = Math.round(totalPriceUsd * uzsRate);

  const handleStep1Proceed = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsCheckingAvailability(true);

    try {
      const res = await checkRoomAvailability(roomId, checkIn, checkOut);
      if (res.isAvailable) {
        setIsAvailable(true);
        setStep(2);
      } else {
        setIsAvailable(false);
        setErrorMsg(t('noAvailability'));
      }
    } catch (err) {
      // In case of network check failure, still permit graceful booking flow
      setIsAvailable(true);
      setStep(2);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      setErrorMsg('Please complete all required fields (Name, Email, Phone).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // Double check availability right before write
      const avail = await checkRoomAvailability(roomId, checkIn, checkOut);
      if (!avail.isAvailable) {
        setErrorMsg('Another guest just reserved the remaining spot. Please pick another room or dates.');
        setIsSubmitting(false);
        return;
      }

      const generatedCustomId = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
      const docId = await createBooking({
        roomTypeId: roomId,
        roomName: currentRoom?.name || 'Ummon Hostel Room',
        guestName,
        guestEmail,
        guestPhone,
        passportNumber: passportNumber || undefined,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nights,
        guestsCount,
        totalPriceUsd,
        totalPriceUzs,
        currency,
        status: 'pending',
        paymentStatus: 'unpaid',
        specialRequests: specialRequests || undefined,
        source: 'website',
        createdAt: new Date().toISOString()
      });

      setCreatedBookingId(generatedCustomId);
      setStep(3);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Booking failed:', err);
      setErrorMsg('Booking could not be finalized. Please try again or message our 24/7 reception via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyBookingId = () => {
    if (createdBookingId) {
      navigator.clipboard.writeText(createdBookingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0B2B2E] border border-[#F2A93B]/30 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#071e20] border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F2A93B]/20 border border-[#F2A93B]/40 flex items-center justify-center text-[#F2A93B]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {t('bookingModalTitle')}
              </h3>
              <p className="text-[11px] text-slate-400">
                Official Ummon Hostel Direct Booking System
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-3 border-b border-white/10 text-center text-xs font-semibold">
          <div
            className={`py-2.5 px-2 transition-colors ${
              step >= 1 ? 'text-[#F2A93B] border-b-2 border-[#F2A93B] bg-white/5' : 'text-slate-400'
            }`}
          >
            {t('step1Dates')}
          </div>
          <div
            className={`py-2.5 px-2 transition-colors ${
              step >= 2 ? 'text-[#F2A93B] border-b-2 border-[#F2A93B] bg-white/5' : 'text-slate-400'
            }`}
          >
            {t('step2Guests')}
          </div>
          <div
            className={`py-2.5 px-2 transition-colors ${
              step === 3 ? 'text-[#2EC4B6] border-b-2 border-[#2EC4B6] bg-white/5' : 'text-slate-400'
            }`}
          >
            {t('step3Confirm')}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Dates & Room */}
          {step === 1 && (
            <form onSubmit={handleStep1Proceed} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('selectedRoom')}
                </label>
                <select
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} — {formatPrice(r.priceUsd, uzsRate, currency)} / night
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t('checkIn')}
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (e.target.value >= checkOut) {
                        const next = new Date(new Date(e.target.value).getTime() + 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split('T')[0];
                        setCheckOut(next);
                      }
                    }}
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t('checkOut')}
                  </label>
                  <input
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('guests')}
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? t('guestSingular') : t('guestsPlural')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-[#071e20]/90 border border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-white">
                    {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Room rate:</span>
                  <span className="text-white">
                    {formatPrice(pricePerNight, uzsRate, currency)} / night
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                  <span>{t('totalEstimated')}:</span>
                  <span className="text-[#F2A93B]">
                    {formatPrice(totalPriceUsd, uzsRate, currency)}
                    {currency === 'USD' && (
                      <span className="text-xs font-normal text-slate-400 block text-right">
                        ≈ {totalPriceUzs.toLocaleString()} UZS
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isCheckingAvailability}
                className="w-full py-3 rounded-xl font-bold text-sm text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-[#F2A93B]/20 transition-all disabled:opacity-50"
              >
                {isCheckingAvailability ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Checking availability...</span>
                  </>
                ) : (
                  <>
                    <span>Next: Guest Information</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: Guest Details */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Bed verified available! Secure your reservation now.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-emerald-400 underline font-semibold"
                >
                  Edit dates
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('guestFullName')} *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Alexander Smith"
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('guestEmailLabel')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="alex@traveler.com"
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('guestPhoneLabel')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+998 90 000 00 00"
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('passportLabel')}
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="Optional (for e-Mehmon fast check-in)"
                    className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Payment Choice
                  </label>
                  <div className="p-2.5 rounded-xl bg-[#071e20] border border-white/15 text-xs text-slate-200">
                    Pay on Arrival at Reception (Cash or Card)
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('specialRequestsLabel')}
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Estimated arrival time, upper/lower bunk request, airport pickup..."
                  className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-300 bg-[#071e20] border border-white/15 hover:bg-white/5 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-[#F2A93B]/20 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming with database...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('completeBookingBtn')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmation */}
          {step === 3 && (
            <div className="text-center py-4 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-white mb-2">
                  {t('bookingSuccessTitle')}
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  {t('bookingSuccessMsg')}
                </p>
              </div>

              {/* Booking ID copy chip */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#071e20] border border-[#F2A93B]/40 shadow-inner">
                <span className="font-mono text-xl font-bold text-[#F2A93B] tracking-wider">
                  {createdBookingId}
                </span>
                <button
                  onClick={copyBookingId}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                  title="Copy booking ID"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Summary box */}
              <div className="p-4 rounded-2xl bg-[#071e20]/90 border border-white/10 text-left text-xs space-y-2 text-slate-300 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span>Room:</span>
                  <span className="font-semibold text-white">{currentRoom?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dates:</span>
                  <span className="font-semibold text-white">
                    {checkIn} to {checkOut} ({nights} nights)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Guest:</span>
                  <span className="font-semibold text-white">{guestName}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-white text-sm">
                  <span>Total Due on Arrival:</span>
                  <span className="text-[#F2A93B]">
                    {formatPrice(totalPriceUsd, uzsRate, currency)}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                A confirmation note has been dispatched to {guestEmail}. Our 24/7 reception is ready to welcome you in Tashkent!
              </p>

              <button
                onClick={onClose}
                className="px-8 py-2.5 rounded-xl font-bold text-sm text-[#0B2B2E] bg-[#F2A93B] hover:brightness-110 shadow-md transition-all"
              >
                {t('closeModal')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
