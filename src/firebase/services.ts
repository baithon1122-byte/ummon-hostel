import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';
import { handleFirestoreError, OperationType } from './errors';
import {
  Room,
  Booking,
  Review,
  ContactMessage,
  HostelSettings,
  PaymentTransaction,
  ExpenseRecord,
  GalleryItem,
  StaffUser,
  ActivityLog
} from '../types';
import {
  INITIAL_ROOMS,
  INITIAL_SETTINGS,
  INITIAL_REVIEWS,
  INITIAL_GALLERY,
  INITIAL_BOOKINGS,
  INITIAL_EXPENSES
} from './seedData';

// ROOMS
export async function fetchRooms(): Promise<Room[]> {
  try {
    const snap = await getDocs(collection(db, 'rooms'));
    if (snap.empty) {
      return INITIAL_ROOMS;
    }
    const rooms = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Room, 'id'>) }));
    return rooms.length ? rooms : INITIAL_ROOMS;
  } catch (error) {
    console.warn('Could not fetch rooms from Firestore, falling back to local dataset:', error);
    return INITIAL_ROOMS;
  }
}

export async function saveRoom(room: Room): Promise<void> {
  const path = `rooms/${room.id}`;
  try {
    await setDoc(doc(db, 'rooms', room.id), {
      ...room,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function deleteRoom(roomId: string): Promise<void> {
  const path = `rooms/${roomId}`;
  try {
    await deleteDoc(doc(db, 'rooms', roomId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// BOOKINGS
export async function createBooking(booking: Omit<Booking, 'id'>): Promise<string> {
  const path = 'bookings';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...booking,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function fetchBookings(): Promise<Booking[]> {
  try {
    const snap = await getDocs(collection(db, 'bookings'));
    if (snap.empty) {
      return INITIAL_BOOKINGS;
    }
    const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Booking, 'id'>) }));
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.warn('Could not fetch bookings from Firestore, falling back to local dataset:', error);
    return INITIAL_BOOKINGS;
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: Booking['status'],
  paymentStatus?: Booking['paymentStatus']
): Promise<void> {
  const path = `bookings/${bookingId}`;
  try {
    const updateData: Partial<Booking> = {
      status,
      updatedAt: new Date().toISOString()
    };
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }
    await updateDoc(doc(db, 'bookings', bookingId), updateData);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function deleteBooking(bookingId: string): Promise<void> {
  const path = `bookings/${bookingId}`;
  try {
    await deleteDoc(doc(db, 'bookings', bookingId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// Check availability for a specific room across existing bookings
export async function checkRoomAvailability(
  roomTypeId: string,
  checkIn: string,
  checkOut: string
): Promise<{ isAvailable: boolean; bookedCount: number; maxCapacity: number }> {
  try {
    const bookings = await fetchBookings();
    const rooms = await fetchRooms();
    const room = rooms.find((r) => r.id === roomTypeId);
    const capacity = room ? room.bedsCount : 4;

    const inDate = new Date(checkIn).getTime();
    const outDate = new Date(checkOut).getTime();

    // Overlapping bookings where status is not cancelled
    const overlapping = bookings.filter((b) => {
      if (b.roomTypeId !== roomTypeId) return false;
      if (b.status === 'cancelled') return false;

      const bIn = new Date(b.checkInDate).getTime();
      const bOut = new Date(b.checkOutDate).getTime();
      // overlap condition: (bIn < outDate) && (bOut > inDate)
      return bIn < outDate && bOut > inDate;
    });

    const bookedCount = overlapping.reduce((sum, b) => sum + (b.guestsCount || 1), 0);
    const isAvailable = bookedCount < capacity;

    return { isAvailable, bookedCount, maxCapacity: capacity };
  } catch (err) {
    console.error('Availability check error:', err);
    return { isAvailable: true, bookedCount: 0, maxCapacity: 4 };
  }
}

// REVIEWS
export async function fetchApprovedReviews(): Promise<Review[]> {
  try {
    const q = query(collection(db, 'reviews'), where('isApproved', '==', true));
    const snap = await getDocs(q);
    if (snap.empty) {
      return INITIAL_REVIEWS;
    }
    const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Review, 'id'>) }));
    return list.length ? list : INITIAL_REVIEWS;
  } catch (error) {
    console.warn('Reviews fallback:', error);
    return INITIAL_REVIEWS;
  }
}

export async function fetchAllReviews(): Promise<Review[]> {
  try {
    const snap = await getDocs(collection(db, 'reviews'));
    if (snap.empty) {
      return INITIAL_REVIEWS;
    }
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Review, 'id'>) }));
  } catch (error) {
    return INITIAL_REVIEWS;
  }
}

export async function submitReview(review: Omit<Review, 'id' | 'isApproved' | 'createdAt'>): Promise<string> {
  const path = 'reviews';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...review,
      isApproved: false,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function updateReviewApproval(reviewId: string, isApproved: boolean): Promise<void> {
  const path = `reviews/${reviewId}`;
  try {
    await updateDoc(doc(db, 'reviews', reviewId), { isApproved });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function deleteReview(reviewId: string): Promise<void> {
  const path = `reviews/${reviewId}`;
  try {
    await deleteDoc(doc(db, 'reviews', reviewId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// MESSAGES / INQUIRIES
export async function submitContactMessage(msg: Omit<ContactMessage, 'id' | 'isRead' | 'createdAt'>): Promise<string> {
  const path = 'messages';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...msg,
      isRead: false,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function fetchMessages(): Promise<ContactMessage[]> {
  try {
    const snap = await getDocs(collection(db, 'messages'));
    if (snap.empty) return [];
    const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ContactMessage, 'id'>) }));
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    return [];
  }
}

export async function markMessageAsRead(msgId: string, isRead: boolean): Promise<void> {
  const path = `messages/${msgId}`;
  try {
    await updateDoc(doc(db, 'messages', msgId), { isRead });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function deleteMessage(msgId: string): Promise<void> {
  const path = `messages/${msgId}`;
  try {
    await deleteDoc(doc(db, 'messages', msgId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// SETTINGS
export async function fetchSettings(): Promise<HostelSettings> {
  try {
    const docSnap = await getDoc(doc(db, 'settings', 'general'));
    if (docSnap.exists()) {
      return { ...INITIAL_SETTINGS, ...(docSnap.data() as HostelSettings) };
    }
    return INITIAL_SETTINGS;
  } catch (error) {
    return INITIAL_SETTINGS;
  }
}

export async function saveSettings(settings: Partial<HostelSettings>): Promise<void> {
  const path = 'settings/general';
  try {
    await setDoc(doc(db, 'settings', 'general'), {
      ...settings,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// GALLERY
export async function fetchGallery(): Promise<GalleryItem[]> {
  try {
    const snap = await getDocs(collection(db, 'gallery'));
    if (snap.empty) {
      return INITIAL_GALLERY;
    }
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryItem, 'id'>) }));
  } catch (error) {
    return INITIAL_GALLERY;
  }
}

export async function addGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<string> {
  const path = 'gallery';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...item,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function deleteGalleryItem(itemId: string): Promise<void> {
  const path = `gallery/${itemId}`;
  try {
    await deleteDoc(doc(db, 'gallery', itemId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// PAYMENTS & EXPENSES
export async function fetchPayments(): Promise<PaymentTransaction[]> {
  try {
    const snap = await getDocs(collection(db, 'payments'));
    if (snap.empty) {
      // derive sample payment records from bookings
      return INITIAL_BOOKINGS.filter((b) => b.paymentStatus === 'paid').map((b, i) => ({
        id: `pmt-${i + 1}`,
        bookingId: b.id,
        guestName: b.guestName,
        amountUsd: b.totalPriceUsd,
        amountUzs: b.totalPriceUzs,
        method: (b.paymentMethod as any) || 'cash_usd',
        type: 'income',
        date: b.checkInDate,
        notes: `Payment for booking ${b.id}`,
        createdAt: b.createdAt
      }));
    }
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PaymentTransaction, 'id'>) }));
  } catch (error) {
    return [];
  }
}

export async function recordPayment(payment: Omit<PaymentTransaction, 'id' | 'createdAt'>): Promise<string> {
  const path = 'payments';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...payment,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function fetchExpenses(): Promise<ExpenseRecord[]> {
  try {
    const snap = await getDocs(collection(db, 'expenses'));
    if (snap.empty) {
      return INITIAL_EXPENSES;
    }
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ExpenseRecord, 'id'>) }));
  } catch (error) {
    return INITIAL_EXPENSES;
  }
}

export async function recordExpense(expense: Omit<ExpenseRecord, 'id' | 'createdAt'>): Promise<string> {
  const path = 'expenses';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...expense,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function deleteExpense(expenseId: string): Promise<void> {
  const path = `expenses/${expenseId}`;
  try {
    await deleteDoc(doc(db, 'expenses', expenseId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// ACTIVITY LOG
export async function logActivity(log: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<void> {
  try {
    await addDoc(collection(db, 'activityLogs'), {
      ...log,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Logging error:', err);
  }
}

export async function fetchActivityLogs(): Promise<ActivityLog[]> {
  try {
    const snap = await getDocs(collection(db, 'activityLogs'));
    if (snap.empty) return [];
    const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ActivityLog, 'id'>) }));
    return list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    return [];
  }
}

// SEED DATABASE BATCH ACTION
export async function seedDatabaseIfEmpty(): Promise<{ success: boolean; message: string }> {
  try {
    const batch = writeBatch(db);

    // 1. Rooms
    INITIAL_ROOMS.forEach((room) => {
      const ref = doc(db, 'rooms', room.id);
      batch.set(ref, room);
    });

    // 2. Settings
    const settingsRef = doc(db, 'settings', 'general');
    batch.set(settingsRef, INITIAL_SETTINGS);

    // 3. Reviews
    INITIAL_REVIEWS.forEach((review) => {
      const ref = doc(db, 'reviews', review.id);
      batch.set(ref, review);
    });

    // 4. Gallery
    INITIAL_GALLERY.forEach((item) => {
      const ref = doc(db, 'gallery', item.id);
      batch.set(ref, item);
    });

    // 5. Sample Bookings
    INITIAL_BOOKINGS.forEach((booking) => {
      const ref = doc(db, 'bookings', booking.id);
      batch.set(ref, booking);
    });

    // 6. Sample Expenses
    INITIAL_EXPENSES.forEach((exp) => {
      const ref = doc(db, 'expenses', exp.id);
      batch.set(ref, exp);
    });

    await batch.commit();
    return { success: true, message: 'Database successfully seeded with rooms, reviews, gallery & initial records!' };
  } catch (err) {
    console.error('Seeding error:', err);
    return { success: false, message: err instanceof Error ? err.message : String(err) };
  }
}
