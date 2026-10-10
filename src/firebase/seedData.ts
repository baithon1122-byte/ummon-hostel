import { Room, Review, HostelSettings, GalleryItem, Booking, ExpenseRecord } from '../types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'dorm-4-deluxe',
    name: '4-Bed Deluxe Mixed Dorm',
    slug: '4-bed-deluxe-mixed-dorm',
    type: 'dorm',
    bedsCount: 4,
    capacity: 4,
    priceUsd: 14,
    priceUzs: 179200,
    shortDescription: 'Spacious handcrafted wooden bunk beds with privacy curtains, orthopedic mattresses, and secure personal lockers.',
    description: 'Our most peaceful shared experience. Features custom-built sound-dampened birchwood bunks, dual international power outlets, personal LED reading lights, velvet privacy curtains, hotel-grade cotton bedding, and generous floor space.',
    amenities: [
      'Privacy Curtains',
      'Personal Locker with Key',
      'Orthopedic Mattress',
      'Individual Reading Lamp',
      'Dual Power Sockets + USB',
      'Air Conditioning & Heating',
      'Daily Housekeeping',
      'High-Speed Fiber Wi-Fi'
    ],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4b69?auto=format&fit=crop&w=1200&q=80'
    ],
    isActive: true
  },
  {
    id: 'dorm-8-social',
    name: '8-Bed Silk Road Social Dorm',
    slug: '8-bed-silk-road-social-dorm',
    type: 'dorm',
    bedsCount: 8,
    capacity: 8,
    priceUsd: 10,
    priceUzs: 128000,
    shortDescription: 'Ideal for solo backpackers looking to meet travelers along the Silk Road. Ultra-cozy pods with maximum comfort.',
    description: 'Designed for global wanderers, cyclists, and Silk Road adventurers. Solid acoustic frames prevent bed squeaks, while built-in blackout shades ensure restful sleep after a day exploring Chorsu Bazaar and the old city.',
    amenities: [
      'Blackout Privacy Pods',
      'Under-Bed Luggage Chest',
      'Universal Power & Type-C',
      'Climate Control AC',
      'Shared Marble Bathroom Access',
      'Free Linens & Towels',
      'Ultra Fast 300Mbps Wi-Fi'
    ],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    isActive: true
  },
  {
    id: 'private-oasis',
    name: 'Private Deluxe Queen Room',
    slug: 'private-deluxe-queen-room',
    type: 'private',
    bedsCount: 1,
    capacity: 2,
    priceUsd: 36,
    priceUzs: 460800,
    shortDescription: 'Boutique sanctuary featuring an ensuite rainfall shower, king-size bed, authentic Uzbek ceramic decor, and garden view.',
    description: 'A serene hideaway for couples and digital nomads seeking private comfort with hostel warmth. Enjoy a luxury queen bed, handcrafted Suzani wall art, dedicated workspace, private en-suite bathroom with rainfall shower, smart TV, and tea station.',
    amenities: [
      'Private En-suite Rain Shower',
      'Queen Bed with Premium Linens',
      'Ergonomic Work Desk & Chair',
      '43" Smart 4K TV with Streaming',
      'Tea & Coffee Kettle Set',
      'Mini Fridge & Safe Box',
      'Complimentary Uzbek Sweets',
      'Quiet Courtyard View'
    ],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    isActive: true
  },
  {
    id: 'family-suite',
    name: 'Boutique Family Suite (4 Guests)',
    slug: 'boutique-family-suite',
    type: 'family',
    bedsCount: 3,
    capacity: 4,
    priceUsd: 55,
    priceUzs: 704000,
    shortDescription: 'Comfortable family suite with 1 Double Bed + 2 Single Beds, private lounge nook, and spacious en-suite bathroom.',
    description: 'Generous suite crafted specifically for small families or travel groups. Features two distinct sleeping areas, traditional oriental carpet motifs, large walk-in shower, ample luggage storage, and child-friendly amenities.',
    amenities: [
      '1 Double Bed + 2 Twin Beds',
      'Private En-suite Luxury Bathroom',
      'Lounge Seating Area',
      'Family Dining Corner',
      'Smart TV & Board Games',
      'Soundproofed Double Glazing',
      'Complimentary Breakfast Included'
    ],
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    isActive: true
  }
];

export const INITIAL_SETTINGS: HostelSettings = {
  name: 'Ummon Hostel',
  tagline: 'Your Home in the Heart of Tashkent',
  address: 'Xonabodtepa, 100081, Toshkent shahri, Uzbekistan',
  phone: '+998 77 326 07 77',
  email: 'info@ummonhostel.uz',
  telegram: 'https://t.me/ummonhostel',
  whatsapp: 'https://wa.me/998773260777',
  instagram: 'https://instagram.com/ummonhostel',
  checkInTime: '14:00',
  checkOutTime: '12:00',
  uzsRate: 12800,
  taxPercentage: 0,
  heroHeadline: 'Your Home in the Heart of Tashkent',
  heroSubtext: 'Boutique comfort infused with legendary Silk Road hospitality. Modern dorms, private rooms, tranquil courtyards, and 24/7 travel assistance in Uzbekistan’s vibrant capital.',
  aboutStory: 'Ummon Hostel was born from a passion to introduce travelers to the genuine warmth of Uzbekistan. Situated in the peaceful Xonabodtepa quarter of Tashkent, we combine contemporary boutique amenities with traditional Central Asian hospitality. Whether you are venturing along the ancient Silk Road, stopping over on the Trans-Caspian route, or exploring modern Tashkent, Ummon provides a peaceful haven, hearty breakfasts, and lifelong friendships.',
  stats: {
    happyGuests: '2,400+',
    ratingScore: '9.8 / 10',
    countriesVisited: '54+',
    freeToursOrganized: '120+'
  }
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    guestName: 'Julian Meyer',
    guestCountry: 'Germany',
    rating: 5,
    comment: 'Hands down the cleanest and friendliest hostel in Tashkent! The wooden bunks have thick curtains and actual soundproofing. The staff helped me book my train ticket to Samarkand at 10 PM. The breakfast tea is extraordinary.',
    roomType: '4-Bed Deluxe Mixed Dorm',
    isApproved: true,
    createdAt: '2026-09-18T10:00:00Z'
  },
  {
    id: 'rev-2',
    guestName: 'Elena Rostova',
    guestCountry: 'Kazakhstan',
    rating: 5,
    comment: 'Great location in Tashkent, very quiet street so you can sleep peacefully after walking around Chorsu Bazaar. The AC in the Private Queen room was whisper quiet and the shower had amazing water pressure.',
    roomType: 'Private Deluxe Queen Room',
    isApproved: true,
    createdAt: '2026-09-29T14:30:00Z'
  },
  {
    id: 'rev-3',
    guestName: 'Takashi Yamamoto',
    guestCountry: 'Japan',
    rating: 5,
    comment: 'Super fast WiFi (I work remotely on Zoom without any drops). Reception is 24/7 which saved me when my flight arrived at 3 AM. Incredible tea and local pastries in the common lounge.',
    roomType: '8-Bed Silk Road Social Dorm',
    isApproved: true,
    createdAt: '2026-10-02T08:15:00Z'
  },
  {
    id: 'rev-4',
    guestName: 'Chloe Bennett',
    guestCountry: 'United Kingdom',
    rating: 5,
    comment: 'Stayed 4 nights while organizing my visa. Beautiful Uzbek tile motifs throughout the hostel, spotlessly clean bathrooms, and the beds are super cozy. 10/10 recommendation!',
    roomType: '4-Bed Deluxe Mixed Dorm',
    isApproved: true,
    createdAt: '2026-10-06T16:00:00Z'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Warm Common Courtyard & Tea Terrace',
    category: 'common',
    imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    caption: 'Traditional tapchan seating with green tea and authentic rugs for evening chats.',
    createdAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'gal-2',
    title: 'Custom Wooden Pod Bunks',
    category: 'rooms',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Thoughtfully built bunk beds with privacy curtains and personal lighting.',
    createdAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'gal-3',
    title: 'Chorsu Bazaar Spice Dome',
    category: 'tashkent',
    imageUrl: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=1200&q=80',
    caption: 'The legendary turquoise cupola of Chorsu Bazaar, just minutes away.',
    createdAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'gal-4',
    title: 'Private Queen Ensuite Sanctuary',
    category: 'rooms',
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    caption: 'High-thread linens, Uzbek handicrafts, and serene courtyard ambience.',
    createdAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'gal-5',
    title: 'Guest Kitchen & Dining Space',
    category: 'common',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    caption: 'Modern guest kitchen fully stocked with spices, tea, fridge, and cookware.',
    createdAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'gal-6',
    title: 'Hazrati Imam Square & Quran Complex',
    category: 'tashkent',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    caption: 'The spiritual heart of historic Tashkent with exquisite mosaic facades.',
    createdAt: '2026-09-01T00:00:00Z'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-10821',
    roomTypeId: 'dorm-4-deluxe',
    roomName: '4-Bed Deluxe Mixed Dorm',
    guestName: 'Marc Dubois',
    guestEmail: 'marc.dubois@wanderlust.fr',
    guestPhone: '+33 6 12 34 56 78',
    checkInDate: '2026-10-10',
    checkOutDate: '2026-10-13',
    nights: 3,
    guestsCount: 1,
    totalPriceUsd: 42,
    totalPriceUzs: 537600,
    currency: 'USD',
    status: 'checked_in',
    paymentStatus: 'paid',
    paymentMethod: 'cash_usd',
    specialRequests: 'Arriving from Tashkent South Station late afternoon',
    source: 'website',
    createdAt: '2026-10-05T09:12:00Z'
  },
  {
    id: 'BK-10822',
    roomTypeId: 'private-oasis',
    roomName: 'Private Deluxe Queen Room',
    guestName: 'Sarah & David Miller',
    guestEmail: 'smiller@californiatravel.com',
    guestPhone: '+1 415 555 8921',
    checkInDate: '2026-10-10',
    checkOutDate: '2026-10-14',
    nights: 4,
    guestsCount: 2,
    totalPriceUsd: 144,
    totalPriceUzs: 1843200,
    currency: 'USD',
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    specialRequests: 'Would love an early check-in if possible after morning flight',
    source: 'website',
    createdAt: '2026-10-07T14:40:00Z'
  },
  {
    id: 'BK-10823',
    roomTypeId: 'dorm-8-social',
    roomName: '8-Bed Silk Road Social Dorm',
    guestName: 'Akmal Karimov',
    guestEmail: 'akmal.karimov@mail.uz',
    guestPhone: '+998 90 123 45 67',
    checkInDate: '2026-10-11',
    checkOutDate: '2026-10-12',
    nights: 1,
    guestsCount: 1,
    totalPriceUsd: 10,
    totalPriceUzs: 128000,
    currency: 'UZS',
    status: 'pending',
    paymentStatus: 'unpaid',
    specialRequests: 'Pay on arrival in cash UZS',
    source: 'website',
    createdAt: '2026-10-09T18:20:00Z'
  },
  {
    id: 'BK-10824',
    roomTypeId: 'family-suite',
    roomName: 'Boutique Family Suite (4 Guests)',
    guestName: 'Anja Lindholm',
    guestEmail: 'anja.lindholm@nordicexp.se',
    guestPhone: '+46 70 889 1234',
    checkInDate: '2026-10-12',
    checkOutDate: '2026-10-16',
    nights: 4,
    guestsCount: 4,
    totalPriceUsd: 220,
    totalPriceUzs: 2816000,
    currency: 'USD',
    status: 'confirmed',
    paymentStatus: 'partial',
    paymentMethod: 'transfer',
    specialRequests: 'Traveling with 2 teenagers, need airport pickup info',
    source: 'booking.com',
    createdAt: '2026-10-08T11:05:00Z'
  }
];

export const INITIAL_EXPENSES: ExpenseRecord[] = [
  {
    id: 'exp-1',
    category: 'utilities',
    title: 'Electricity & High-speed Internet (Uztelecom)',
    amountUsd: 65,
    amountUzs: 832000,
    date: '2026-10-01',
    notes: 'Monthly optical fiber and grid power',
    createdAt: '2026-10-01T10:00:00Z'
  },
  {
    id: 'exp-2',
    category: 'linen_laundry',
    title: 'Eco Laundry & Linen Sanitization',
    amountUsd: 40,
    amountUzs: 512000,
    date: '2026-10-04',
    notes: 'Fresh towels, duvet covers, pillowcases batch',
    createdAt: '2026-10-04T12:00:00Z'
  },
  {
    id: 'exp-3',
    category: 'food_tea',
    title: 'Breakfast Tea, Bread (Non), Jam & Fresh Fruit',
    amountUsd: 35,
    amountUzs: 448000,
    date: '2026-10-07',
    notes: 'Chorsu market weekly breakfast supply',
    createdAt: '2026-10-07T08:30:00Z'
  }
];
