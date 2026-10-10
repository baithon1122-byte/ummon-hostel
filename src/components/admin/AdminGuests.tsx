import React, { useState } from 'react';
import { Booking } from '../../types';
import { Search, Download, Mail, Phone, Calendar, ShieldCheck, User } from 'lucide-react';

interface AdminGuestsProps {
  bookings: Booking[];
}

export const AdminGuests: React.FC<AdminGuestsProps> = ({ bookings }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Group unique guests by email
  const guestMap = new Map<
    string,
    {
      name: string;
      email: string;
      phone: string;
      passport?: string;
      bookingsCount: number;
      totalSpentUsd: number;
      lastVisit: string;
      specialNotes: string[];
    }
  >();

  bookings.forEach((b) => {
    const key = b.guestEmail.toLowerCase().trim();
    if (!guestMap.has(key)) {
      guestMap.set(key, {
        name: b.guestName,
        email: b.guestEmail,
        phone: b.guestPhone,
        passport: b.passportNumber,
        bookingsCount: 1,
        totalSpentUsd: b.status !== 'cancelled' ? b.totalPriceUsd : 0,
        lastVisit: b.checkInDate,
        specialNotes: b.specialRequests ? [b.specialRequests] : [],
      });
    } else {
      const g = guestMap.get(key)!;
      g.bookingsCount += 1;
      if (b.status !== 'cancelled') {
        g.totalSpentUsd += b.totalPriceUsd;
      }
      if (b.checkInDate > g.lastVisit) {
        g.lastVisit = b.checkInDate;
      }
      if (b.specialRequests) {
        g.specialNotes.push(b.specialRequests);
      }
    }
  });

  const guestsList = Array.from(guestMap.values()).filter((g) => {
    return (
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm)
    );
  });

  const exportGuestsCsv = () => {
    const headers = ['Name', 'Email', 'Phone', 'Passport', 'Total Bookings', 'Total Spent USD', 'Last Visit'];
    const rows = guestsList.map((g) => [
      `"${g.name}"`,
      g.email,
      `"${g.phone}"`,
      g.passport || '',
      g.bookingsCount,
      g.totalSpentUsd,
      g.lastVisit,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ummon_guests_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Guest Database & CRM
          </h2>
          <p className="text-xs text-slate-400">
            Roster of global travelers, loyalty records, contact details, and e-Mehmon IDs.
          </p>
        </div>

        <button
          onClick={exportGuestsCsv}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors"
        >
          <Download className="w-4 h-4 text-[#2EC4B6]" />
          <span>Export Guests CSV</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="p-3 rounded-2xl bg-[#0B2B2E] border border-white/10 max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="w-full bg-[#071e20] border border-white/15 focus:border-[#F2A93B] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Guests Table */}
      <div className="rounded-2xl bg-[#0B2B2E] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#071e20] text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Guest</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Passport / ID</th>
                <th className="py-3.5 px-4">Visits</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4">Last Stay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {guestsList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No guest profiles found.
                  </td>
                </tr>
              ) : (
                guestsList.map((g, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#2EC4B6]/20 text-[#2EC4B6] font-bold flex items-center justify-center text-xs">
                          {g.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-semibold text-white block">{g.name}</span>
                          {g.bookingsCount > 1 && (
                            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                              Repeat Traveler
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{g.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-0.5">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{g.phone}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      {g.passport || 'On file at desk'}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-white">
                      {g.bookingsCount} booking(s)
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-400">
                      ${g.totalSpentUsd}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400">
                      {g.lastVisit}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
