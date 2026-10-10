import React, { useState, useEffect, useRef } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import {
  Room,
  Booking,
  Review,
  ContactMessage,
  HostelSettings,
  GalleryItem,
  ExpenseRecord,
  PaymentTransaction,
  BookingStatus,
  PaymentStatus
} from './types';
import {
  fetchRooms,
  saveRoom,
  deleteRoom,
  fetchBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking,
  fetchApprovedReviews,
  fetchAllReviews,
  updateReviewApproval,
  deleteReview,
  fetchMessages,
  markMessageAsRead,
  deleteMessage,
  fetchSettings,
  saveSettings,
  fetchGallery,
  addGalleryItem,
  deleteGalleryItem,
  fetchExpenses,
  recordExpense,
  deleteExpense,
  fetchPayments,
  recordPayment,
  seedDatabaseIfEmpty,
  logActivity,
  fetchActivityLogs
} from './firebase/services';
import { INITIAL_ROOMS, INITIAL_SETTINGS, INITIAL_REVIEWS, INITIAL_GALLERY } from './firebase/seedData';

// Public components
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
import { QuickInfoStrip } from './components/public/QuickInfoStrip';
import { RoomsSection } from './components/public/RoomsSection';
import { BookingModal } from './components/public/BookingModal';
import { FacilitiesSection } from './components/public/FacilitiesSection';
import { AboutSection } from './components/public/AboutSection';
import { GallerySection } from './components/public/GallerySection';
import { AttractionsSection } from './components/public/AttractionsSection';
import { ReviewsSection } from './components/public/ReviewsSection';
import { FaqSection } from './components/public/FaqSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { FloatingChat } from './components/public/FloatingChat';

// Admin components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminBookings } from './components/admin/AdminBookings';
import { AdminCalendar } from './components/admin/AdminCalendar';
import { AdminRooms } from './components/admin/AdminRooms';
import { AdminGuests } from './components/admin/AdminGuests';
import { AdminFinance } from './components/admin/AdminFinance';
import { AdminReviews } from './components/admin/AdminReviews';
import { AdminGallery } from './components/admin/AdminGallery';
import { AdminContentEditor } from './components/admin/AdminContentEditor';
import { AdminMessages } from './components/admin/AdminMessages';
import { AdminStaff } from './components/admin/AdminStaff';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminActivityLogs } from './components/admin/AdminActivityLogs';
import { AdminWalkInModal } from './components/admin/AdminWalkInModal';

// Toast indicator for new bookings
import { Bell, CheckCircle2, X } from 'lucide-react';

function MainApplication() {
  const { user } = useAuth();

  // Mode: public or admin (check hash or query or default to public)
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin';
  });

  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // Shared Data States
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [approvedReviews, setApprovedReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [allReviews, setAllReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [settings, setSettings] = useState<HostelSettings>(INITIAL_SETTINGS);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);

  // Public Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [modalSelectedRoom, setModalSelectedRoom] = useState<Room | null>(null);
  const [bookingPrefill, setBookingPrefill] = useState<{
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>({});

  // Admin Walk-in Modal State
  const [walkInModalOpen, setWalkInModalOpen] = useState(false);

  // Real-time toast alert state
  const [toastAlert, setToastAlert] = useState<string | null>(null);
  const initialLoadDone = useRef(false);

  // Initial Data Loading
  const loadAllData = async () => {
    try {
      const [
        roomsData,
        bookingsData,
        reviewsApproved,
        reviewsAll,
        galleryData,
        settingsData,
        messagesData,
        expensesData,
        paymentsData,
        logsData,
      ] = await Promise.all([
        fetchRooms(),
        fetchBookings(),
        fetchApprovedReviews(),
        fetchAllReviews(),
        fetchGallery(),
        fetchSettings(),
        fetchMessages(),
        fetchExpenses(),
        fetchPayments(),
        fetchActivityLogs(),
      ]);

      setRooms(roomsData);
      setBookings(bookingsData);
      setApprovedReviews(reviewsApproved);
      setAllReviews(reviewsAll);
      setGallery(galleryData);
      setSettings(settingsData);
      setMessages(messagesData);
      setExpenses(expensesData);
      setPayments(paymentsData);
      setActivityLogs(logsData);
    } catch (err) {
      console.warn('Initial data loading fallback:', err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Listen for hash changes to sync navigation with #admin
  useEffect(() => {
    const handleHash = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Handle open booking modal with room
  const handleOpenBookingWithRoom = (room: Room) => {
    setModalSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  // Handle hero search
  const handleHeroSearch = (params: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
  }) => {
    let matchedRoom: Room | null = null;
    if (params.roomType !== 'all') {
      matchedRoom = rooms.find((r) => r.type === params.roomType) || null;
    }
    setModalSelectedRoom(matchedRoom);
    setBookingPrefill({
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      guests: params.guests,
    });
    setIsBookingModalOpen(true);
  };

  // Navigation handlers
  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
  };

  const navigateToPublic = () => {
    window.location.hash = '';
    setIsAdminView(false);
  };

  // Admin action triggers
  const handleUpdateBookingStatus = async (
    id: string,
    status: BookingStatus,
    paymentStatus?: PaymentStatus
  ) => {
    await updateBookingStatus(id, status, paymentStatus);
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, ...(paymentStatus ? { paymentStatus } : {}) } : b))
    );
    await logActivity({
      action: `Updated booking ${id} status to ${status}`,
      actorEmail: user?.email || 'admin',
      actorRole: user?.role || 'staff',
    });
  };

  const handleDeleteBooking = async (id: string) => {
    await deleteBooking(id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
    await logActivity({
      action: `Deleted booking record ${id}`,
      actorEmail: user?.email || 'admin',
      actorRole: user?.role || 'staff',
    });
  };

  const handleAddWalkIn = async (booking: Omit<Booking, 'id'>) => {
    const docId = await createBooking(booking);
    const newRecord: Booking = { id: docId, ...booking };
    setBookings((prev) => [newRecord, ...prev]);

    // Record income payment if paid
    if (booking.paymentStatus === 'paid') {
      await recordPayment({
        bookingId: docId,
        guestName: booking.guestName,
        amountUsd: booking.totalPriceUsd,
        amountUzs: booking.totalPriceUzs,
        method: (booking.paymentMethod as any) || 'cash_usd',
        type: 'income',
        date: booking.checkInDate,
        notes: `Walk-in guest payment for ${docId}`,
      });
      const updatedPayments = await fetchPayments();
      setPayments(updatedPayments);
    }

    setToastAlert(`Walk-in guest ${booking.guestName} registered and checked in!`);
    setTimeout(() => setToastAlert(null), 4000);
  };

  const handleSaveRoom = async (room: Room) => {
    await saveRoom(room);
    setRooms((prev) => {
      const exists = prev.some((r) => r.id === room.id);
      return exists ? prev.map((r) => (r.id === room.id ? room : r)) : [...prev, room];
    });
    await logActivity({
      action: `Saved room: ${room.name}`,
      actorEmail: user?.email || 'admin',
      actorRole: user?.role || 'staff',
    });
  };

  const handleDeleteRoom = async (roomId: string) => {
    await deleteRoom(roomId);
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
    await logActivity({
      action: `Deleted room: ${roomId}`,
      actorEmail: user?.email || 'admin',
      actorRole: user?.role || 'staff',
    });
  };

  const handleApproveReview = async (id: string, isApproved: boolean) => {
    await updateReviewApproval(id, isApproved);
    setAllReviews((prev) => prev.map((r) => (r.id === id ? { ...r, isApproved } : r)));
    const approved = await fetchApprovedReviews();
    setApprovedReviews(approved);
  };

  const handleDeleteReview = async (id: string) => {
    await deleteReview(id);
    setAllReviews((prev) => prev.filter((r) => r.id !== id));
    setApprovedReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddGallery = async (item: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    const id = await addGalleryItem(item);
    setGallery((prev) => [...prev, { id, createdAt: new Date().toISOString(), ...item }]);
  };

  const handleDeleteGallery = async (id: string) => {
    await deleteGalleryItem(id);
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const handleSaveSettings = async (newSettings: Partial<HostelSettings>) => {
    await saveSettings(newSettings);
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleSeedDatabase = async () => {
    const res = await seedDatabaseIfEmpty();
    if (res.success) {
      await loadAllData();
      setToastAlert('Database initialized with complete boutique demo records!');
      setTimeout(() => setToastAlert(null), 4000);
    }
  };

  const handleMarkMessageRead = async (id: string, isRead: boolean) => {
    await markMessageAsRead(id, isRead);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead } : m)));
  };

  const handleDeleteMessage = async (id: string) => {
    await deleteMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddPayment = async (p: Omit<PaymentTransaction, 'id' | 'createdAt'>) => {
    const id = await recordPayment(p);
    setPayments((prev) => [{ id, createdAt: new Date().toISOString(), ...p }, ...prev]);
  };

  const handleAddExpense = async (e: Omit<ExpenseRecord, 'id' | 'createdAt'>) => {
    const id = await recordExpense(e);
    setExpenses((prev) => [{ id, createdAt: new Date().toISOString(), ...e }, ...prev]);
  };

  const handleDeleteExpense = async (id: string) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const pendingBookingsCount = bookings.filter((b) => b.status === 'pending').length;
  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-[#071e20] text-slate-100 flex flex-col font-sans">
      {/* Toast Alert */}
      {toastAlert && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-[#0B2B2E] border border-[#F2A93B] shadow-2xl flex items-center gap-3 text-xs text-white animate-bounce">
          <Bell className="w-5 h-5 text-[#F2A93B]" />
          <span>{toastAlert}</span>
          <button onClick={() => setToastAlert(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Render Public or Admin View */}
      {isAdminView ? (
        !user ? (
          <AdminLogin onBackToSite={navigateToPublic} />
        ) : (
          <AdminLayout
            currentTab={adminTab}
            onSelectTab={setAdminTab}
            onBackToWebsite={navigateToPublic}
            pendingBookingsCount={pendingBookingsCount}
            unreadMessagesCount={unreadMessagesCount}
          >
            {adminTab === 'overview' && (
              <AdminOverview
                bookings={bookings}
                rooms={rooms}
                expenses={expenses}
                onOpenWalkInModal={() => setWalkInModalOpen(true)}
                onNavigateTab={setAdminTab}
                onSeedData={handleSeedDatabase}
              />
            )}

            {adminTab === 'bookings' && (
              <AdminBookings
                bookings={bookings}
                rooms={rooms}
                onUpdateStatus={handleUpdateBookingStatus}
                onDeleteBooking={handleDeleteBooking}
                onOpenWalkIn={() => setWalkInModalOpen(true)}
                uzsRate={settings.uzsRate}
              />
            )}

            {adminTab === 'calendar' && (
              <AdminCalendar bookings={bookings} rooms={rooms} />
            )}

            {adminTab === 'rooms' && (
              <AdminRooms
                rooms={rooms}
                onSaveRoom={handleSaveRoom}
                onDeleteRoom={handleDeleteRoom}
                uzsRate={settings.uzsRate}
              />
            )}

            {adminTab === 'guests' && <AdminGuests bookings={bookings} />}

            {adminTab === 'finance' && (
              <AdminFinance
                payments={payments}
                expenses={expenses}
                onAddPayment={handleAddPayment}
                onAddExpense={handleAddExpense}
                onDeleteExpense={handleDeleteExpense}
                uzsRate={settings.uzsRate}
              />
            )}

            {adminTab === 'reviews' && (
              <AdminReviews
                reviews={allReviews}
                onApproveReview={handleApproveReview}
                onDeleteReview={handleDeleteReview}
              />
            )}

            {adminTab === 'gallery' && (
              <AdminGallery
                galleryItems={gallery}
                onAddItem={handleAddGallery}
                onDeleteItem={handleDeleteGallery}
              />
            )}

            {adminTab === 'content' && (
              <AdminContentEditor
                settings={settings}
                onSaveSettings={handleSaveSettings}
              />
            )}

            {adminTab === 'messages' && (
              <AdminMessages
                messages={messages}
                onMarkRead={handleMarkMessageRead}
                onDeleteMessage={handleDeleteMessage}
              />
            )}

            {adminTab === 'staff' && <AdminStaff />}

            {adminTab === 'logs' && <AdminActivityLogs logs={activityLogs} />}

            {adminTab === 'settings' && (
              <AdminSettings
                settings={settings}
                onSaveSettings={handleSaveSettings}
                onSeedData={handleSeedDatabase}
              />
            )}

            {/* Admin Walk-In Modal */}
            <AdminWalkInModal
              isOpen={walkInModalOpen}
              onClose={() => setWalkInModalOpen(false)}
              rooms={rooms}
              onAddBooking={handleAddWalkIn}
              uzsRate={settings.uzsRate}
            />
          </AdminLayout>
        )
      ) : (
        /* PUBLIC GUEST-FACING WEBSITE */
        <>
          <Navbar
            onOpenBooking={() => {
              setModalSelectedRoom(null);
              setIsBookingModalOpen(true);
            }}
            onNavigateAdmin={navigateToAdmin}
          />

          <main className="flex-1">
            <Hero
              onSearch={handleHeroSearch}
              headline={settings.heroHeadline}
              subtext={settings.heroSubtext}
            />

            <QuickInfoStrip
              checkInTime={settings.checkInTime}
              checkOutTime={settings.checkOutTime}
              address={settings.address}
              phone={settings.phone}
            />

            <RoomsSection
              rooms={rooms}
              onBookRoom={handleOpenBookingWithRoom}
              uzsRate={settings.uzsRate}
            />

            <FacilitiesSection />

            <AboutSection storyText={settings.aboutStory} />

            <GallerySection galleryItems={gallery} />

            <AttractionsSection />

            <ReviewsSection reviews={approvedReviews} rooms={rooms} />

            <FaqSection />

            <ContactSection
              address={settings.address}
              phone={settings.phone}
              email={settings.email}
              telegram={settings.telegram}
              whatsapp={settings.whatsapp}
              instagram={settings.instagram}
            />
          </main>

          <Footer onNavigateAdmin={navigateToAdmin} />

          <FloatingChat
            whatsapp={settings.whatsapp}
            telegram={settings.telegram}
            phone={settings.phone}
          />

          {/* Public Booking Flow Modal */}
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            selectedRoom={modalSelectedRoom}
            rooms={rooms}
            initialCheckIn={bookingPrefill.checkIn}
            initialCheckOut={bookingPrefill.checkOut}
            initialGuests={bookingPrefill.guests}
            uzsRate={settings.uzsRate}
          />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApplication />
      </AuthProvider>
    </LanguageProvider>
  );
}
