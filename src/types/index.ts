export type Language = 'en' | 'uz' | 'ru';
export type Currency = 'USD' | 'UZS';
export type ThemeMode = 'dark' | 'light';

export type RoomType = 'dorm' | 'private' | 'family';

export interface Room {
  id: string;
  name: string;
  slug: string;
  type: RoomType;
  bedsCount: number;
  capacity: number;
  priceUsd: number;
  priceUzs: number;
  description: string;
  shortDescription: string;
  amenities: string[];
  images: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid';
export type BookingSource = 'website' | 'walk_in' | 'booking.com' | 'phone';

export interface Booking {
  id: string;
  roomTypeId: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  passportNumber?: string;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  nights: number;
  guestsCount: number;
  totalPriceUsd: number;
  totalPriceUzs: number;
  currency: Currency;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  specialRequests?: string;
  source: BookingSource;
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  guestName: string;
  guestCountry: string;
  rating: number; // 1 - 5
  comment: string;
  roomType?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface HostelSettings {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  telegram: string;
  whatsapp: string;
  instagram: string;
  checkInTime: string;
  checkOutTime: string;
  uzsRate: number; // e.g. 12800 UZS per 1 USD
  taxPercentage: number;
  heroHeadline: string;
  heroSubtext: string;
  aboutStory: string;
  stats: {
    happyGuests: string;
    ratingScore: string;
    countriesVisited: string;
    freeToursOrganized: string;
  };
  updatedAt?: string;
}

export interface PaymentTransaction {
  id: string;
  bookingId?: string;
  guestName: string;
  amountUsd: number;
  amountUzs: number;
  method: 'cash_usd' | 'cash_uzs' | 'card' | 'transfer';
  type: 'income' | 'deposit' | 'refund';
  date: string;
  notes?: string;
  createdAt: string;
}

export interface ExpenseRecord {
  id: string;
  category: 'utilities' | 'linen_laundry' | 'supplies' | 'repairs' | 'staff' | 'marketing' | 'food_tea' | 'other';
  title: string;
  amountUsd: number;
  amountUzs: number;
  date: string;
  notes?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'rooms' | 'common' | 'tashkent';
  imageUrl: string;
  caption?: string;
  createdAt: string;
}

export interface StaffUser {
  id: string;
  uid: string;
  name: string;
  email: string;
  role: 'owner' | 'staff';
  isActive: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  actorEmail: string;
  actorRole: string;
  details?: string;
  timestamp: string;
}
