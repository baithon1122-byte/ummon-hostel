import React, { useState } from 'react';
import { Booking, Room, BookingStatus, PaymentStatus } from '../../types';
import { getStatusBadge, getPaymentBadge, formatPrice } from '../../utils/formatters';
import {
  Search,
  Filter,
  Download,
  Plus,
  CheckCircle,
  XCircle,
  LogIn,
  LogOut,
  Trash2,
  Calendar,
  Users,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AdminBookingsProps {
  bookings: Booking[];
  rooms: Room[];
  onUpdateStatus: (id: string, status: BookingStatus, paymentStatus?: PaymentStatus) => void;
  onDeleteBooking: (id: string) => void;
  onOpenWalkIn: () => void;
  uzsRate?: number;
}

export const AdminBookings: React.FC<AdminBookingsProps> = ({
  bookings,
  rooms,
  onUpdateStatus,
  onDeleteBooking,
  onOpenWalkIn,
  uzsRate = 12800,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roomFilter, setRoomFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guestPhone.includes(searchTerm) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesRoom = roomFilter === 'all' || b.roomTypeId === roomFilter;

    return matchesSearch && matchesStatus && matchesRoom;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CSV Export
  const exportToCsv = () => {
    const headers = [
      'Booking ID',
      'Guest Name',
      'Email',
      'Phone',
      'Room',
      'Check-In',
      'Check-Out',
      'Nights',
      'Guests',
      'Total USD',
      'Status',
      'Payment Status',
      'Source',
    ];
    const rows = filteredBookings.map((b) => [
      b.id,
      `"${b.guestName}"`,
      b.guestEmail,
      `"${b.guestPhone}"`,
      `"${b.roomName}"`,
      b.checkInDate,
      b.checkOutDate,
      b.nights,
      b.guestsCount,
      b.totalPriceUsd,
      b.status,
      b.paymentStatus,
      b.source,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ummon_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Reservations & Bookings
          </h2>
          <p className="text-xs text-slate-400">
            Manage live guest arrivals, cancellations, room allocations, and walk-ins.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportToCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors"
          >
            <Download className="w-4 h-4 text-[#2EC4B6]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenWalkIn}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Walk-In Guest</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#0B2B2E] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by guest name, email, phone, ID..."
            className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="all">All Statuses ({bookings.length})</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked_in">Checked In</option>
            <option value="checked_out">Checked Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Room Filter */}
        <div>
          <select
            value={roomFilter}
            onChange={(e) => {
              setRoomFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
          >
            <option value="all">All Room Types</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-[#0B2B2E] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#071e20] text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Guest Details</th>
                <th className="py-3.5 px-4">Room & Dates</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No bookings found matching current filters.
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((b) => {
                  const statusBadge = getStatusBadge(b.status);
                  const paymentBadge = getPaymentBadge(b.paymentStatus);

                  return (
                    <tr key={b.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#F2A93B]">
                        {b.id}
                        <span className="block text-[10px] text-slate-400 font-normal uppercase mt-0.5">
                          {b.source}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{b.guestName}</div>
                        <div className="text-[11px] text-slate-400">{b.guestEmail}</div>
                        <div className="text-[11px] text-slate-400">{b.guestPhone}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-white font-medium truncate max-w-[150px]">
                          {b.roomName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {b.checkInDate} → {b.checkOutDate}
                        </div>
                        <div className="text-[10px] text-[#2EC4B6]">
                          {b.nights} {b.nights === 1 ? 'Night' : 'Nights'} · {b.guestsCount} Guest(s)
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">
                          ${b.totalPriceUsd}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          ≈ {b.totalPriceUzs.toLocaleString()} UZS
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${statusBadge.bg}`}>
                          {statusBadge.label}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${paymentBadge.bg}`}>
                          {paymentBadge.label}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Confirm */}
                          {b.status === 'pending' && (
                            <button
                              onClick={() => onUpdateStatus(b.id, 'confirmed')}
                              className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 transition-colors"
                              title="Confirm Booking"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Check-in */}
                          {b.status === 'confirmed' && (
                            <button
                              onClick={() => onUpdateStatus(b.id, 'checked_in', 'paid')}
                              className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors"
                              title="Check In Guest (Mark Paid)"
                            >
                              <LogIn className="w-4 h-4" />
                            </button>
                          )}

                          {/* Check-out */}
                          {b.status === 'checked_in' && (
                            <button
                              onClick={() => onUpdateStatus(b.id, 'checked_out')}
                              className="p-1.5 rounded-lg bg-slate-500/20 hover:bg-slate-500/30 text-slate-300 transition-colors"
                              title="Check Out Guest"
                            >
                              <LogOut className="w-4 h-4" />
                            </button>
                          )}

                          {/* Cancel */}
                          {b.status !== 'cancelled' && b.status !== 'checked_out' && (
                            <button
                              onClick={() => onUpdateStatus(b.id, 'cancelled')}
                              className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 transition-colors"
                              title="Cancel Booking"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this booking record permanently?')) {
                                onDeleteBooking(b.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="p-4 bg-[#071e20] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of{' '}
              {filteredBookings.length} bookings
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-semibold text-white">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
