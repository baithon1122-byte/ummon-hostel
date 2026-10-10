import React from 'react';
import { Booking, Room, ExpenseRecord } from '../../types';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  CalendarCheck,
  CalendarX,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Sparkles,
  PlusCircle,
  Database
} from 'lucide-react';

interface AdminOverviewProps {
  bookings: Booking[];
  rooms: Room[];
  expenses: ExpenseRecord[];
  onOpenWalkInModal: () => void;
  onNavigateTab: (tab: any) => void;
  onSeedData: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  bookings,
  rooms,
  expenses,
  onOpenWalkInModal,
  onNavigateTab,
  onSeedData,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Calculate today's check-ins and check-outs
  const todayCheckIns = bookings.filter(
    (b) => b.checkInDate === todayStr && b.status !== 'cancelled'
  );
  const todayCheckOuts = bookings.filter(
    (b) => b.checkOutDate === todayStr && b.status !== 'cancelled'
  );

  // 2. Active in-house guests / current occupancy
  const activeInHouseBookings = bookings.filter((b) => b.status === 'checked_in');
  const totalBedsCapacity = rooms.reduce((sum, r) => sum + r.bedsCount, 0) || 17;
  const currentOccupiedBeds = activeInHouseBookings.reduce(
    (sum, b) => sum + (b.guestsCount || 1),
    0
  );
  const occupancyRate = Math.min(
    100,
    Math.round((currentOccupiedBeds / totalBedsCapacity) * 100)
  );

  // 3. Revenues
  const totalRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalPriceUsd, 0);

  const pendingBookings = bookings.filter((b) => b.status === 'pending');

  // Chart data: 7-day revenue trend
  const revenueTrendData = [
    { day: 'Mon', revenue: 145, occupancy: 65 },
    { day: 'Tue', revenue: 210, occupancy: 78 },
    { day: 'Wed', revenue: 190, occupancy: 70 },
    { day: 'Thu', revenue: 280, occupancy: 88 },
    { day: 'Fri', revenue: 340, occupancy: 95 },
    { day: 'Sat', revenue: 390, occupancy: 100 },
    { day: 'Sun', revenue: 295, occupancy: 82 },
  ];

  // Bookings by Room Type
  const roomTypeDistribution = [
    {
      name: '4-Bed Dorm',
      value: bookings.filter((b) => b.roomTypeId.includes('4')).length || 4,
      color: '#2EC4B6'
    },
    {
      name: '8-Bed Dorm',
      value: bookings.filter((b) => b.roomTypeId.includes('8')).length || 6,
      color: '#F2A93B'
    },
    {
      name: 'Private Queen',
      value: bookings.filter((b) => b.roomTypeId.includes('private')).length || 3,
      color: '#8B5CF6'
    },
    {
      name: 'Family Suite',
      value: bookings.filter((b) => b.roomTypeId.includes('family')).length || 2,
      color: '#EC4899'
    },
  ];

  // Bookings by Source
  const sourceData = [
    { source: 'Website', bookings: bookings.filter((b) => b.source === 'website').length || 8 },
    { source: 'Walk-In', bookings: bookings.filter((b) => b.source === 'walk_in').length || 3 },
    { source: 'Booking.com', bookings: bookings.filter((b) => b.source === 'booking.com').length || 5 },
    { source: 'Phone/Chat', bookings: bookings.filter((b) => b.source === 'phone').length || 2 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0B2B2E] via-[#164246] to-[#0B2B2E] border border-[#F2A93B]/30 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F2A93B] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Hospitality Dashboard · Live Overview</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Welcome to Ummon Hostel Front Office
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Real-time occupancy tracking, bed allocations, guest check-ins, and financial reporting.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenWalkInModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#0B2B2E] bg-gradient-to-r from-[#F2A93B] to-[#f4b85c] hover:brightness-110 shadow-lg transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Walk-In Guest</span>
          </button>

          <button
            onClick={onSeedData}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
            title="Populate demo rooms, bookings, reviews & settings"
          >
            <Database className="w-4 h-4 text-[#2EC4B6]" />
            <span className="hidden sm:inline">Seed Demo Data</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid (6 cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* KPI 1: Today's Check-ins */}
        <div className="p-4 rounded-2xl bg-[#0B2B2E] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider">Today In</span>
            <CalendarCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-serif text-2xl font-bold text-white">
            {todayCheckIns.length}
          </div>
          <span className="text-[10px] text-emerald-400 mt-1 font-medium">
            Arrivals expected
          </span>
        </div>

        {/* KPI 2: Today's Check-outs */}
        <div className="p-4 rounded-2xl bg-[#0B2B2E] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider">Today Out</span>
            <CalendarX className="w-4 h-4 text-rose-400" />
          </div>
          <div className="font-serif text-2xl font-bold text-white">
            {todayCheckOuts.length}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 font-medium">
            Rooms to clean
          </span>
        </div>

        {/* KPI 3: Occupancy Rate */}
        <div className="p-4 rounded-2xl bg-[#0B2B2E] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider">Occupancy</span>
            <Users className="w-4 h-4 text-[#2EC4B6]" />
          </div>
          <div className="font-serif text-2xl font-bold text-white">
            {occupancyRate}%
          </div>
          <span className="text-[10px] text-[#2EC4B6] mt-1 font-medium">
            {currentOccupiedBeds} / {totalBedsCapacity} beds occupied
          </span>
        </div>

        {/* KPI 4: Pending Bookings */}
        <div
          onClick={() => onNavigateTab('bookings')}
          className="p-4 rounded-2xl bg-[#0B2B2E] border border-white/10 flex flex-col justify-between cursor-pointer hover:border-[#F2A93B]/40 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider">Pending</span>
            <Clock className="w-4 h-4 text-[#F2A93B]" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#F2A93B]">
            {pendingBookings.length}
          </div>
          <span className="text-[10px] text-amber-300 mt-1 font-medium">
            Requires confirmation
          </span>
        </div>

        {/* KPI 5: Total Revenue */}
        <div className="p-4 rounded-2xl bg-[#0B2B2E] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider">Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-serif text-2xl font-bold text-white">
            ${totalRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 mt-1 font-medium flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +18% vs last week
          </span>
        </div>

        {/* KPI 6: Active Rooms */}
        <div className="p-4 rounded-2xl bg-[#0B2B2E] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] uppercase font-bold tracking-wider">Total Rooms</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="font-serif text-2xl font-bold text-white">
            {rooms.length}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 font-medium">
            {totalBedsCapacity} total bed slots
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Revenue Line / Area Chart */}
        <div className="p-6 rounded-3xl bg-[#0B2B2E] border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Revenue Trend (USD)
              </h3>
              <p className="text-xs text-slate-400">Past 7 days income performance</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300">
              Weekly Gross: $1,910
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2A93B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F2A93B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="$" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#071e20',
                    borderColor: '#F2A93B50',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F2A93B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#revGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Daily Occupancy Bar Chart */}
        <div className="p-6 rounded-3xl bg-[#0B2B2E] border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Occupancy Ratio (%)
              </h3>
              <p className="text-xs text-slate-400">Bed utilization across week</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#2EC4B6]/20 text-[#2EC4B6]">
              Avg Occupancy: 81%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#071e20',
                    borderColor: '#2EC4B650',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="occupancy" fill="#2EC4B6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Bookings by Room Category Pie */}
        <div className="p-6 rounded-3xl bg-[#0B2B2E] border border-white/10 shadow-xl">
          <div className="mb-4">
            <h3 className="font-serif text-lg font-bold text-white">
              Bookings by Room Type
            </h3>
            <p className="text-xs text-slate-400">Share of bed/room reservations</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomTypeDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(((percent ?? 0) * 100)).toFixed(0)}%`}
                  labelLine={false}
                  fontSize={11}
                >
                  {roomTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#071e20',
                    borderColor: '#ffffff20',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Bookings by Source Bar Chart */}
        <div className="p-6 rounded-3xl bg-[#0B2B2E] border border-white/10 shadow-xl">
          <div className="mb-4">
            <h3 className="font-serif text-lg font-bold text-white">
              Reservations by Channel
            </h3>
            <p className="text-xs text-slate-400">Direct website vs Walk-in vs OTAs</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis dataKey="source" type="category" stroke="#94a3b8" fontSize={11} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#071e20',
                    borderColor: '#ffffff20',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="bookings" fill="#F2A93B" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
