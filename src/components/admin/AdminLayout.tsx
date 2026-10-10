import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  LayoutDashboard,
  CalendarDays,
  CalendarRange,
  BedDouble,
  Users,
  BadgeDollarSign,
  Star,
  Image,
  Edit3,
  Mail,
  UserCheck,
  Settings,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Bell,
  Menu,
  X,
  Database
} from 'lucide-react';

export type AdminTab =
  | 'overview'
  | 'bookings'
  | 'calendar'
  | 'rooms'
  | 'guests'
  | 'finance'
  | 'reviews'
  | 'gallery'
  | 'content'
  | 'messages'
  | 'staff'
  | 'settings'
  | 'logs';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onBackToWebsite: () => void;
  children: React.ReactNode;
  pendingBookingsCount?: number;
  unreadMessagesCount?: number;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onBackToWebsite,
  children,
  pendingBookingsCount = 0,
  unreadMessagesCount = 0,
}) => {
  const { user, logout, isOwner } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number; ownerOnly?: boolean }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'bookings', label: 'Bookings', icon: <CalendarDays className="w-4 h-4" />, badge: pendingBookingsCount },
    { id: 'calendar', label: 'Availability Calendar', icon: <CalendarRange className="w-4 h-4" /> },
    { id: 'rooms', label: 'Rooms & Beds', icon: <BedDouble className="w-4 h-4" /> },
    { id: 'guests', label: 'Guests Database', icon: <Users className="w-4 h-4" /> },
    { id: 'finance', label: 'Finance & Payments', icon: <BadgeDollarSign className="w-4 h-4" /> },
    { id: 'reviews', label: 'Reviews Moderation', icon: <Star className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery Manager', icon: <Image className="w-4 h-4" /> },
    { id: 'content', label: 'Website Content', icon: <Edit3 className="w-4 h-4" /> },
    { id: 'messages', label: 'Inquiries Inbox', icon: <Mail className="w-4 h-4" />, badge: unreadMessagesCount },
    { id: 'staff', label: 'Staff Management', icon: <UserCheck className="w-4 h-4" />, ownerOnly: true },
    { id: 'logs', label: 'Activity Logs', icon: <History className="w-4 h-4" /> },
    { id: 'settings', label: 'Hostel Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const visibleNavItems = navItems.filter((item) => !item.ownerOnly || isOwner);

  return (
    <div className="min-h-screen bg-[#071e20] text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#0B2B2E] border-b border-white/10 px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-white/5 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#F2A93B]" />
            <span className="font-serif font-bold text-white text-base">Ummon Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToWebsite}
            className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-slate-200"
          >
            Public Site
          </button>
          <button
            onClick={logout}
            className="p-1.5 rounded-md bg-rose-500/20 text-rose-300"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-[#0B2B2E] border-r border-white/10 flex flex-col justify-between transition-all duration-300 ${
          collapsed ? 'lg:w-20' : 'lg:w-64'
        } ${mobileMenuOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div>
          {/* Brand header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? 'hidden lg:hidden' : 'flex'}`}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B2B2E] via-[#164246] to-[#2EC4B6] border border-[#F2A93B]/40 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-[#F2A93B]" />
              </div>
              <div className="truncate">
                <h1 className="font-serif font-bold text-base text-white truncate leading-none">
                  Ummon Hostel
                </h1>
                <span className="text-[10px] text-[#2EC4B6] font-medium uppercase tracking-wider">
                  Management
                </span>
              </div>
            </div>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* User profile snippet */}
          <div className={`p-3.5 border-b border-white/10 ${collapsed ? 'text-center' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F2A93B]/20 border border-[#F2A93B]/40 flex items-center justify-center text-[#F2A93B] font-bold text-xs shrink-0">
                {user?.displayName?.charAt(0).toUpperCase() || 'A'}
              </div>
              {!collapsed && (
                <div className="truncate flex-1">
                  <p className="text-xs font-semibold text-white truncate leading-tight">
                    {user?.displayName || 'Admin'}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                        user?.role === 'owner'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      }`}
                    >
                      {user?.role}
                    </span>
                    {user?.isDemo && (
                      <span className="text-[9px] text-slate-400 italic">(Demo Mode)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            {visibleNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentTab === item.id
                    ? 'bg-[#F2A93B] text-[#0B2B2E] shadow-md shadow-[#F2A93B]/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                } ${collapsed ? 'justify-center' : 'justify-between'}`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3 truncate">
                  <div className="shrink-0">{item.icon}</div>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!collapsed && item.badge && item.badge > 0 ? (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      currentTab === item.id ? 'bg-[#0B2B2E] text-white' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar bottom: return & logout */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <button
            onClick={onBackToWebsite}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Public Website"
          >
            <ExternalLink className="w-4 h-4 text-[#2EC4B6]" />
            {!collapsed && <span>Public Website</span>}
          </button>

          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col bg-[#071e20] overflow-y-auto">
        {/* Desktop Top Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-[#0B2B2E]/50 border-b border-white/10 backdrop-blur-sm sticky top-0 z-30">
          <div>
            <h2 className="font-serif text-xl font-bold text-white capitalize">
              {visibleNavItems.find((n) => n.id === currentTab)?.label || 'Dashboard'}
            </h2>
            <p className="text-[11px] text-slate-400">
              Ummon Hostel Central Asian Operations Hub
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onBackToWebsite}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white/5 border border-white/10 hover:border-[#F2A93B] text-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#2EC4B6]" />
              <span>Preview Website</span>
            </button>

            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-slate-300 font-mono">Live DB Sync</span>
            </div>
          </div>
        </header>

        {/* Child views */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
      </main>
    </div>
  );
};
