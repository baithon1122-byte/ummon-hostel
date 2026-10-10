import { Currency, BookingStatus, PaymentStatus } from '../types';

export function formatPrice(amountUsd: number, uzsRate = 12800, currency: Currency = 'USD'): string {
  if (currency === 'UZS') {
    const uzs = Math.round(amountUsd * uzsRate);
    return `${uzs.toLocaleString('en-US')} UZS`;
  }
  return `$${amountUsd}`;
}

export function formatRawUzs(amountUzs: number): string {
  return `${amountUzs.toLocaleString('en-US')} UZS`;
}

export function formatDateRange(checkIn: string, checkOut: string): string {
  if (!checkIn || !checkOut) return '';
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  return `${d1.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} — ${d2.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const d1 = new Date(checkIn).getTime();
  const d2 = new Date(checkOut).getTime();
  const diffDays = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export function getStatusBadge(status: BookingStatus) {
  switch (status) {
    case 'confirmed':
      return { label: 'Confirmed', bg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' };
    case 'checked_in':
      return { label: 'Checked In', bg: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' };
    case 'checked_out':
      return { label: 'Checked Out', bg: 'bg-slate-500/20 text-slate-300 border border-slate-500/30' };
    case 'cancelled':
      return { label: 'Cancelled', bg: 'bg-rose-500/20 text-rose-400 border border-rose-500/30' };
    case 'pending':
    default:
      return { label: 'Pending', bg: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' };
  }
}

export function getPaymentBadge(status: PaymentStatus) {
  switch (status) {
    case 'paid':
      return { label: 'Paid', bg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' };
    case 'partial':
      return { label: 'Partial', bg: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' };
    case 'unpaid':
    default:
      return { label: 'Unpaid', bg: 'bg-rose-500/20 text-rose-400 border border-rose-500/30' };
  }
}
