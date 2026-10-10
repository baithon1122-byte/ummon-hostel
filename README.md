# Ummon Hostel — Boutique Hostel in Tashkent, Uzbekistan

A production-grade, modern, and responsive website and management system for **Ummon Hostel**, located in Tashkent, Uzbekistan (Xonabodtepa, 100081, Toshkent shahri).

Built with **React (Vite)**, **Tailwind CSS**, **Framer Motion**, **Lucide Icons**, **Recharts**, and **Firebase** (Authentication, Firestore, Storage).

---

## 🌟 Features Overview

### 1. Public Guest-Facing Portal
- **Sticky Glassmorphic Navbar**: Logo, navigation links, Language Switcher (English, Uzbek, Russian), Currency Toggle (USD and UZS), Dark/Light theme toggle, and "Book Now" CTA.
- **Hero Section**: Full-screen Silk Road atmosphere with interactive booking search bar (Check-in, Check-out, Guests counter, and room type selector).
- **Quick Info Strip**: Instant overview of 14:00 check-in / 12:00 check-out, direct address, phone, and 24/7 reception desk status.
- **Rooms & Dormitories Showcase**: Dynamically loaded from Firestore. Photo carousels, bed counts, live pricing in USD/UZS, capacity, and comprehensive amenities.
- **Real-Time Booking Flow**:
  - Live bed availability check against Firestore to **prevent double-booking**.
  - Guest contact collection (Name, Phone, Email, optional Passport ID for fast e-Mehmon check-in).
  - Immediate booking generation with persistent tracking ID (`BK-XXXXX`).
  - Celebratory confetti and voucher details.
- **Thoughtful Boutique Facilities**: High-speed 300 Mbps fiber Wi-Fi, whisper-quiet AC/heating, rainfall hot showers, guest kitchen, laundry, secure under-bed lockers, luggage storage, airport transfer, and breakfast.
- **About Section**: Silk Road heritage narrative, traditional tapchan lounge, and animated hospitality counters (2,400+ guests, 9.8 score, 54+ countries).
- **Atmospheric Photo Gallery**: Masonry layout with filter tabs (Rooms, Common Area, Tashkent Highlights) and high-res lightbox viewer.
- **Attractions Around Tashkent**: Highlights for Chorsu Bazaar, Amir Temur Square, Tashkent Metro, Hazrati Imam (Uthman Quran), and the Tashkent TV Tower.
- **Verified Reviews & Moderation**: Testimonials slider + interactive modal for guests to submit reviews (saved to Firestore awaiting admin approval).
- **Interactive FAQ**: Common questions covering Uzbek tourist registration (`e-Mehmon`), transport, currencies, and services.
- **Contact & Map**: Direct inquiry form, embedded Google Map of Tashkent, click-to-call, and one-click WhatsApp/Telegram links.
- **Floating Concierge**: 24/7 floating chat launcher with WhatsApp, Telegram, and direct phone.

---

### 2. Secure Admin & Owner Dashboard (`/admin` or `#admin`)
- **Authentication**:
  - Google Sign-In with Popup (configured with project owner `baithon1122@gmail.com`).
  - Email/Password login.
  - Instant One-Click Test Demo access (`Owner Access` and `Staff Access`).
- **Role-Based Access Control (RBAC)**:
  - **Owner**: Complete system control including financial logs, profit reports, staff accounts, and system configuration.
  - **Staff**: Operational focus on live reservations, room inventory, guest check-ins, and guest inquiries.
- **Overview Dashboard**:
  - Daily metrics: Today's check-ins, today's check-outs, current bed occupancy rate (%), pending reservations, and total gross revenue.
  - Interactive Recharts graphs: 7-day revenue trend area chart, bed occupancy bar chart, room type pie chart, and booking sources breakdown.
  - Walk-In guest button and one-click Demo Data Seeder.
- **Bookings Management**:
  - Search by guest name, email, phone, or ID.
  - Filters by booking status (`Pending`, `Confirmed`, `Checked-in`, `Checked-out`, `Cancelled`) and room category.
  - Status transitions (Confirm, Check-In with payment collection, Check-Out, Cancel).
  - Walk-in guest creation modal with immediate check-in and payment recording.
  - Export reservations to CSV.
- **Monthly Availability Calendar**:
  - Matrix view of every room and bed across each day of the month with color-coded status badges.
- **Rooms & Beds Management**:
  - Add, edit, or delete rooms.
  - Set rates in USD & UZS, guest capacity, bed counts, and amenities.
  - Manage multiple photo URLs and active/inactive status.
- **Guests Database (CRM)**:
  - Grouped traveler profiles, repeat guest flags, total lifetime spend, contact details, and CSV export.
- **Finance & Profitability**:
  - Payment transactions ledger (Cash USD, Cash UZS, Card, Bank/Uzcard).
  - Operational expense tracker (Utilities, laundry, food/tea, maintenance, staff).
  - Real-time Net Profit calculation (Revenue − Expenses).
- **Reviews Moderation**:
  - Approve or unpublish submitted guest reviews before they appear on the public site.
- **Gallery Manager**:
  - Add new gallery photos with title, category, and image URL; delete outdated images.
- **Website Content Editor**:
  - Modify homepage hero headlines, subtext, about story, check-in/out hours, phone, address, and exchange rates without touching code.
- **Inquiries Inbox**:
  - Read incoming contact messages, mark as read/unread, and reply via Email or WhatsApp.
- **Staff Management (Owner Only)**:
  - Add and remove staff accounts, assigning Owner or Staff roles.
- **System Settings & Cloud Diagnostics**:
  - Test live connection to Google Cloud Firestore.
  - One-click database seed trigger to populate demo records.

---

## 🛠️ Project Structure

```
├── firebase-applet-config.json     # Provisioned Firebase app configuration
├── firebase-blueprint.json         # Intermediate Representation (IR) schema
├── firestore.rules                 # Hardened ABAC & Zero-Trust security rules
├── security_spec.md                # Security specifications & invariants
├── src/
│   ├── components/
│   │   ├── admin/                  # Admin dashboard modules
│   │   │   ├── AdminActivityLogs.tsx
│   │   │   ├── AdminBookings.tsx
│   │   │   ├── AdminCalendar.tsx
│   │   │   ├── AdminContentEditor.tsx
│   │   │   ├── AdminFinance.tsx
│   │   │   ├── AdminGallery.tsx
│   │   │   ├── AdminGuests.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminMessages.tsx
│   │   │   ├── AdminOverview.tsx
│   │   │   ├── AdminReviews.tsx
│   │   │   ├── AdminRooms.tsx
│   │   │   ├── AdminSettings.tsx
│   │   │   ├── AdminStaff.tsx
│   │   │   └── AdminWalkInModal.tsx
│   │   └── public/                 # Guest-facing website components
│   │       ├── AboutSection.tsx
│   │       ├── AttractionsSection.tsx
│   │       ├── BookingModal.tsx
│   │       ├── ContactSection.tsx
│   │       ├── FacilitiesSection.tsx
│   │       ├── FaqSection.tsx
│   │       ├── FloatingChat.tsx
│   │       ├── Footer.tsx
│   │       ├── GallerySection.tsx
│   │       ├── Hero.tsx
│   │       ├── Navbar.tsx
│   │       ├── QuickInfoStrip.tsx
│   │       ├── ReviewsSection.tsx
│   │       ├── RoomCard.tsx
│   │       └── RoomsSection.tsx
│   ├── context/
│   │   ├── AuthContext.tsx         # Firebase Auth & RBAC state
│   │   └── LanguageContext.tsx     # Multi-language (EN, UZ, RU), currency, & theme
│   ├── firebase/
│   │   ├── errors.ts               # Structured Firestore error handling
│   │   ├── firebase.ts             # Firebase SDK client initialization
│   │   ├── seedData.ts             # Initial boutique seed dataset
│   │   └── services.ts             # Firestore CRUD and availability checks
│   ├── types/
│   │   └── index.ts                # TypeScript data interfaces
│   ├── utils/
│   │   ├── formatters.ts           # Currency and date utilities
│   │   └── translations.ts         # English, Uzbek, and Russian dictionaries
│   ├── App.tsx                     # Main application entry point
│   ├── index.css                   # Global styles & Silk Road color scheme
│   └── main.tsx
└── package.json
```

---

## 🚀 Getting Started Locally

1. **Clone repository and install dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The application runs on `http://localhost:3000`.

3. **Switch between Public and Admin views**:
   - Public Website: `http://localhost:3000`
   - Admin Portal: Click the **Admin Portal** link in the navbar or visit `http://localhost:3000/#admin`.

4. **Default Admin Login**:
   - Click **Sign In with Google** to log in using the owner account (`baithon1122@gmail.com`).
   - Or click **Owner Access** under the Quick Access test options.
   - Once logged in, click **Seed Demo Data** in the Overview or Settings tab if you wish to populate the database with complete sample records.
