import React, { useState } from 'react';
import { Booking, Room } from '../../types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users } from 'lucide-react';

interface AdminCalendarProps {
  bookings: Booking[];
  rooms: Room[];
}

export const AdminCalendar: React.FC<AdminCalendarProps> = ({ bookings, rooms }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Function to find booking on a specific day for a specific room
  const getBookingForDay = (roomId: string, day: number) => {
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const targetTime = new Date(dayStr).getTime();

    return bookings.find((b) => {
      if (b.roomTypeId !== roomId) return false;
      if (b.status === 'cancelled') return false;
      const inTime = new Date(b.checkInDate).getTime();
      const outTime = new Date(b.checkOutDate).getTime();
      return targetTime >= inTime && targetTime < outTime;
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Availability & Room Calendar
          </h2>
          <p className="text-xs text-slate-400">
            Interactive monthly occupancy timeline across all beds and private suites.
          </p>
        </div>

        {/* Month switcher */}
        <div className="flex items-center gap-3 bg-[#0B2B2E] border border-white/10 px-3 py-1.5 rounded-xl">
          <button
            onClick={prevMonth}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-serif font-bold text-white text-sm min-w-[130px] text-center">
            {monthName}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 bg-[#0B2B2E] p-3 rounded-xl border border-white/10">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span>Confirmed / Checked-in</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span>Pending Confirmation</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#071e20] border border-white/20"></span>
          <span>Vacant / Available</span>
        </span>
      </div>

      {/* Interactive Matrix */}
      <div className="rounded-2xl bg-[#0B2B2E] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#071e20] text-slate-400 border-b border-white/10">
                <th className="py-3 px-4 font-semibold min-w-[180px] sticky left-0 bg-[#071e20] z-10 border-r border-white/10">
                  Room / Capacity
                </th>
                {daysArray.map((day) => {
                  const isToday =
                    day === new Date().getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear();

                  return (
                    <th
                      key={day}
                      className={`py-2 px-1 text-center font-mono min-w-[36px] ${
                        isToday ? 'bg-[#F2A93B]/20 text-[#F2A93B] font-bold' : ''
                      }`}
                    >
                      {day}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 sticky left-0 bg-[#0B2B2E] z-10 border-r border-white/10">
                    <div className="font-semibold text-white truncate max-w-[160px]">
                      {room.name}
                    </div>
                    <div className="text-[10px] text-[#2EC4B6]">
                      {room.bedsCount} beds · ${room.priceUsd}/nt
                    </div>
                  </td>

                  {daysArray.map((day) => {
                    const booking = getBookingForDay(room.id, day);

                    return (
                      <td key={day} className="p-1 text-center">
                        {booking ? (
                          <div
                            className={`w-full h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-[#0B2B2E] cursor-pointer transition-transform hover:scale-105 shadow-sm ${
                              booking.status === 'pending'
                                ? 'bg-amber-400'
                                : 'bg-emerald-400'
                            }`}
                            title={`${booking.guestName} (${booking.checkInDate} to ${booking.checkOutDate})`}
                          >
                            {booking.guestName.split(' ')[0].slice(0, 3)}
                          </div>
                        ) : (
                          <div className="w-full h-8 rounded-lg bg-[#071e20]/60 border border-white/5 flex items-center justify-center text-[9px] text-slate-600 hover:border-[#2EC4B6]/40 hover:text-slate-400">
                            -
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
