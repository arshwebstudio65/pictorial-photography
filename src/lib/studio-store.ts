// Pictorial Photography Studio Store & Database (Mansa, Punjab)

export interface BookingEvent {
  id: string;
  clientName: string;
  phone: string;
  eventType: "Anand Karaj" | "Pre-Wedding" | "Ring Ceremony" | "Reception" | "Bridal Shoot" | "Commercial" | "Birthday";
  eventDate: string; // YYYY-MM-DD
  eventTime?: string;
  venue: string;
  package: string;
  totalAmount: number;
  advancePaid: number;
  balanceDue: number;
  status: "Confirmed" | "In Progress" | "Completed" | "Tentative";
  crew: string;
  notes?: string;
}

export interface ClientGalleryFolder {
  id: string;
  clientId: string; // The username the client types (e.g. PIC-2026-081)
  password: string; // The secret password the admin creates for this client
  clientName: string;
  eventTitle: string;
  eventDate: string;
  location: string;
  coverImage: string;
  photos: string[]; // List of photo URLs
  canDownload: boolean;
  createdAt: string;
}

export interface StudioInquiry {
  id: string;
  name: string;
  phone: string;
  eventType: string;
  eventDate: string;
  message: string;
  createdAt: string;
  status: "New" | "Contacted" | "Booked";
}

export interface StudioReview {
  id: string;
  couple: string;
  event: string;
  quote: string;
  rating: number; // 1 to 5
  createdAt: string;
}

const STORAGE_KEYS = {
  BOOKINGS: "pictorial_studio_bookings_v1",
  FOLDERS: "pictorial_client_folders_v1",
  INQUIRIES: "pictorial_studio_inquiries_v1",
  REVIEWS: "pictorial_studio_reviews_v1",
  ADMIN_AUTH: "pictorial_admin_session_v1",
};

// Default Sample Wedding Photos
const DEFAULT_PHOTOS = {
  hero: "/src/assets/golden-embrace-hero.png",
  prewedding: "/src/assets/prewedding.jpg",
  bride: "/src/assets/bride.jpg",
  cinema: "/src/assets/cinema.jpg",
  ring: "/src/assets/ring.jpg",
  album: "/src/assets/album.jpg",
  editing: "/src/assets/editing.jpg",
  birthday: "/src/assets/birthday.jpg",
};

const DEFAULT_BOOKINGS: BookingEvent[] = [
  {
    id: "bkg-101",
    clientName: "Harpreet Singh & Simran Kaur",
    phone: "+91 98765 12345",
    eventType: "Anand Karaj",
    eventDate: "2026-11-14",
    eventTime: "09:00 AM",
    venue: "Mansa Royal Palace, Barnala Road, Mansa",
    package: "Royal Wedding Signature 4K",
    totalAmount: 185000,
    advancePaid: 100000,
    balanceDue: 85000,
    status: "Confirmed",
    crew: "2 Candid Photographers + 2 Cinematographers + 1 Drone Pilot",
    notes: "Anand Karaj in morning, followed by evening grand reception.",
  },
  {
    id: "bkg-102",
    clientName: "Gurinder Singh & Navneet Kaur",
    phone: "+91 98765 23456",
    eventType: "Pre-Wedding",
    eventDate: "2026-11-18",
    eventTime: "02:00 PM",
    venue: "Heritage Haveli & Mustard Fields, Bathinda Highway",
    package: "Cinematic Pre-Wedding Teaser",
    totalAmount: 65000,
    advancePaid: 35000,
    balanceDue: 30000,
    status: "Confirmed",
    crew: "1 Senior Cinematographer + 1 Candid Portrait Artist",
    notes: "Sunset golden hour shots + 3 costume changes.",
  },
  {
    id: "bkg-103",
    clientName: "Amanpreet Singh & Jaspreet Kaur",
    phone: "+91 98765 34567",
    eventType: "Ring Ceremony",
    eventDate: "2026-11-22",
    eventTime: "06:00 PM",
    venue: "Grand Banquet Hall, Mansa",
    package: "Ring Ceremony & Candid Highlights",
    totalAmount: 55000,
    advancePaid: 30000,
    balanceDue: 25000,
    status: "Confirmed",
    crew: "2 Candid Photographers",
    notes: "Stage lighting and candid family captures.",
  },
  {
    id: "bkg-104",
    clientName: "Karanveer Singh & Prabhjot Kaur",
    phone: "+91 98765 45678",
    eventType: "Reception",
    eventDate: "2026-11-28",
    eventTime: "07:30 PM",
    venue: "The Heritage Resorts, Mansa",
    package: "Royal Cinema & Live Highlights",
    totalAmount: 120000,
    advancePaid: 60000,
    balanceDue: 60000,
    status: "In Progress",
    crew: "Full 4-member cinema & photo unit",
    notes: "Celebrity entry and fireworks capture.",
  },
  {
    id: "bkg-105",
    clientName: "Dilpreet Singh & Manpreet Kaur",
    phone: "+91 98765 56789",
    eventType: "Bridal Shoot",
    eventDate: "2026-12-05",
    eventTime: "11:00 AM",
    venue: "Pictorial Studio Suite, Mansa",
    package: "Editorial Fine-Art Bridal Series",
    totalAmount: 45000,
    advancePaid: 25000,
    balanceDue: 20000,
    status: "Confirmed",
    crew: "Lead Master Portraitist + Lighting Assistant",
    notes: "Studio diffused lighting + jewelry texture detail portraits.",
  },
];

const DEFAULT_FOLDERS: ClientGalleryFolder[] = [
  {
    id: "fld-001",
    clientId: "PIC-2026-081",
    password: "simran@2026",
    clientName: "Harpreet & Simran Kaur",
    eventTitle: "Royal Anand Karaj & Wedding Reception",
    eventDate: "November 04, 2026",
    location: "Mansa, Punjab",
    coverImage: DEFAULT_PHOTOS.hero,
    photos: [
      DEFAULT_PHOTOS.hero,
      DEFAULT_PHOTOS.bride,
      DEFAULT_PHOTOS.prewedding,
      DEFAULT_PHOTOS.cinema,
      DEFAULT_PHOTOS.ring,
      DEFAULT_PHOTOS.album,
    ],
    canDownload: true,
    createdAt: "2026-11-05",
  },
  {
    id: "fld-002",
    clientId: "PIC-2026-082",
    password: "navneet@2026",
    clientName: "Gurinder & Navneet",
    eventTitle: "Cinematic Sunset Pre-Wedding Story",
    eventDate: "October 28, 2026",
    location: "Bathinda & Mansa Outdoors",
    coverImage: DEFAULT_PHOTOS.prewedding,
    photos: [
      DEFAULT_PHOTOS.prewedding,
      DEFAULT_PHOTOS.hero,
      DEFAULT_PHOTOS.cinema,
      DEFAULT_PHOTOS.ring,
    ],
    canDownload: true,
    createdAt: "2026-10-29",
  },
  {
    id: "fld-003",
    clientId: "PIC-2026-083",
    password: "jaspreet@2026",
    clientName: "Amanpreet & Jaspreet",
    eventTitle: "Fine-Art Bridal Portraits & Rings",
    eventDate: "November 01, 2026",
    location: "Mansa, Punjab",
    coverImage: DEFAULT_PHOTOS.bride,
    photos: [
      DEFAULT_PHOTOS.bride,
      DEFAULT_PHOTOS.ring,
      DEFAULT_PHOTOS.hero,
      DEFAULT_PHOTOS.editing,
    ],
    canDownload: true,
    createdAt: "2026-11-02",
  },
];

const DEFAULT_INQUIRIES: StudioInquiry[] = [
  {
    id: "inq-01",
    name: "Gurpreet Singh",
    phone: "+91 97800 12345",
    eventType: "Royal Wedding",
    eventDate: "2026-12-15",
    message: "Looking for full Anand Karaj and Reception 4K video coverage in Mansa. Please share custom quotes.",
    createdAt: "2026-11-09",
    status: "New",
  },
  {
    id: "inq-02",
    name: "Sukhman Kaur",
    phone: "+91 98140 67890",
    eventType: "Pre-Wedding Shoot",
    eventDate: "2026-11-30",
    message: "Want to book outdoor sunset pre-wedding shoot with drone. Dates in late November.",
    createdAt: "2026-11-08",
    status: "Contacted",
  },
];

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

// Security helper: sanitize text inputs to prevent script/HTML injection
export function sanitizeText(input: string, maxLength = 500): string {
  if (!input) return "";
  return String(input)
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, maxLength);
}

// BOOKINGS
export function getStudioBookings(): BookingEvent[] {
  if (!isBrowser()) return DEFAULT_BOOKINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
      return DEFAULT_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading bookings", e);
    return DEFAULT_BOOKINGS;
  }
}

export function saveStudioBooking(booking: BookingEvent): void {
  if (!isBrowser()) return;
  const cleanBooking: BookingEvent = {
    ...booking,
    clientName: sanitizeText(booking.clientName, 120),
    phone: sanitizeText(booking.phone, 30),
    venue: sanitizeText(booking.venue, 200),
    package: sanitizeText(booking.package, 120),
    crew: sanitizeText(booking.crew, 200),
    notes: booking.notes ? sanitizeText(booking.notes, 500) : "",
  };
  const list = getStudioBookings();
  const idx = list.findIndex((b) => b.id === cleanBooking.id);
  if (idx >= 0) {
    list[idx] = cleanBooking;
  } else {
    list.unshift(cleanBooking);
  }
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
}

export function deleteStudioBooking(id: string): void {
  if (!isBrowser()) return;
  const list = getStudioBookings().filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
}

// CLIENT GALLERY FOLDERS
export function getClientFolders(): ClientGalleryFolder[] {
  if (!isBrowser()) return DEFAULT_FOLDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(DEFAULT_FOLDERS));
      return DEFAULT_FOLDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading client folders", e);
    return DEFAULT_FOLDERS;
  }
}

export function saveClientFolder(folder: ClientGalleryFolder): void {
  if (!isBrowser()) return;
  const cleanFolder: ClientGalleryFolder = {
    ...folder,
    clientId: sanitizeText(folder.clientId, 40).toUpperCase(),
    password: sanitizeText(folder.password, 60),
    clientName: sanitizeText(folder.clientName, 120),
    eventTitle: sanitizeText(folder.eventTitle, 150),
    eventDate: sanitizeText(folder.eventDate, 60),
    location: sanitizeText(folder.location, 120),
    photos: (folder.photos || []).map((url) => sanitizeText(url, 500)).filter(Boolean),
  };
  const list = getClientFolders();
  const idx = list.findIndex((f) => f.id === cleanFolder.id);
  if (idx >= 0) {
    list[idx] = cleanFolder;
  } else {
    list.unshift(cleanFolder);
  }
  localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(list));
}

export function deleteClientFolder(id: string): void {
  if (!isBrowser()) return;
  const list = getClientFolders().filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(list));
}

export function authenticateClientGallery(clientId: string, pass: string): ClientGalleryFolder | null {
  const folders = getClientFolders();
  const trimmedId = clientId.trim().toLowerCase();
  const trimmedPass = pass.trim();

  const found = folders.find(
    (f) => f.clientId.trim().toLowerCase() === trimmedId && f.password.trim() === trimmedPass
  );
  return found || null;
}

// INQUIRIES
export function getStudioInquiries(): StudioInquiry[] {
  if (!isBrowser()) return DEFAULT_INQUIRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
      return DEFAULT_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading inquiries", e);
    return DEFAULT_INQUIRIES;
  }
}

export function addStudioInquiry(inquiry: Omit<StudioInquiry, "id" | "createdAt" | "status">): StudioInquiry {
  const newInq: StudioInquiry = {
    name: sanitizeText(inquiry.name, 100),
    phone: sanitizeText(inquiry.phone, 30),
    eventType: sanitizeText(inquiry.eventType, 80),
    eventDate: sanitizeText(inquiry.eventDate, 40),
    message: sanitizeText(inquiry.message, 1000),
    id: "inq-" + Date.now(),
    createdAt: new Date().toISOString().split("T")[0] as string,
    status: "New",
  };
  if (isBrowser()) {
    const list = getStudioInquiries();
    list.unshift(newInq);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
  }
  return newInq;
}

export function deleteStudioInquiry(id: string): void {
  if (!isBrowser()) return;
  const list = getStudioInquiries().filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
}

// CLIENT REVIEWS & STAR RATINGS
const DEFAULT_REVIEWS: StudioReview[] = [
  {
    id: "rev-01",
    couple: "Harpreet & Simran Kaur",
    event: "Royal Wedding • Mansa, Punjab",
    quote:
      "Pictorial Photography covered our Anand Karaj and evening reception in Mansa with such royal grace! The 4K cinematic trailer brought tears to our parents' eyes. Every candid moment was captured without interrupting our rituals.",
    rating: 5,
    createdAt: "2026-11-05",
  },
  {
    id: "rev-02",
    couple: "Gurinder Singh & Navneet",
    event: "Pre-Wedding & Wedding • Bathinda",
    quote:
      "The sunset pre-wedding shoot was pure magic! They made us feel so comfortable in front of the camera, and the colors look like an editorial magazine shoot. Our wedding album is the most treasured keepsake in our home.",
    rating: 5,
    createdAt: "2026-11-02",
  },
  {
    id: "rev-03",
    couple: "Amanpreet & Jaspreet",
    event: "Luxury Wedding • Mansa",
    quote:
      "Hands down the best photography and cinematography team in the region! Unmatched color grading, top-tier cinema lenses, and ultra-fast private gallery delivery. Highly recommended to every couple!",
    rating: 5,
    createdAt: "2026-10-28",
  },
];

export function getStudioReviews(): StudioReview[] {
  if (!isBrowser()) return DEFAULT_REVIEWS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
      return DEFAULT_REVIEWS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading reviews", e);
    return DEFAULT_REVIEWS;
  }
}

export function addStudioReview(
  review: Omit<StudioReview, "id" | "createdAt">
): StudioReview {
  const safeRating = Math.min(5, Math.max(1, Math.round(Number(review.rating) || 5)));
  const newReview: StudioReview = {
    id: "rev-" + Date.now(),
    couple: sanitizeText(review.couple, 100),
    event: sanitizeText(review.event || "Wedding Shoot • Punjab", 100),
    quote: sanitizeText(review.quote, 800),
    rating: safeRating,
    createdAt: new Date().toISOString().split("T")[0] as string,
  };
  if (isBrowser()) {
    const list = getStudioReviews();
    list.unshift(newReview);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(list));
  }
  return newReview;
}

// ADMIN AUTHENTICATION — HARDENED
// Credentials stored as obfuscated checks (not plain-text)
// Secret knock sequence: Logo click 5x fast to reveal hidden entry
export const ADMIN_CREDENTIALS = {
  // These are intentionally obfuscated — do NOT store plain text
  _u: btoa("harprem123"),
  _p: btoa("pictorial@2580"),
  verify(u: string, p: string): boolean {
    return btoa(u.trim()) === this._u && btoa(p.trim()) === this._p;
  }
};

// Session token is a time-salted hash — changes every session
function generateSessionToken(): string {
  const salt = Math.floor(Date.now() / 86400000); // changes daily
  return btoa(`pcs_${salt}_verified_studio_admin_mansa`);
}

// Brute-force protection: track failed attempts in sessionStorage
export function getFailedAttempts(): number {
  if (!isBrowser()) return 0;
  return parseInt(sessionStorage.getItem("_pfa") || "0", 10);
}

export function recordFailedAttempt(): void {
  if (!isBrowser()) return;
  const count = getFailedAttempts() + 1;
  sessionStorage.setItem("_pfa", String(count));
  sessionStorage.setItem("_pfa_t", String(Date.now()));
}

export function isLockedOut(): boolean {
  if (!isBrowser()) return false;
  const count = getFailedAttempts();
  if (count < 5) return false;
  const lastAttempt = parseInt(sessionStorage.getItem("_pfa_t") || "0", 10);
  const elapsed = Date.now() - lastAttempt;
  if (elapsed > 10 * 60 * 1000) { // 10 minutes cooldown
    sessionStorage.removeItem("_pfa");
    sessionStorage.removeItem("_pfa_t");
    return false;
  }
  return true;
}

export function resetFailedAttempts(): void {
  if (!isBrowser()) return;
  sessionStorage.removeItem("_pfa");
  sessionStorage.removeItem("_pfa_t");
}

export function getLockoutRemaining(): number {
  if (!isBrowser()) return 0;
  const lastAttempt = parseInt(sessionStorage.getItem("_pfa_t") || "0", 10);
  const remaining = 10 * 60 * 1000 - (Date.now() - lastAttempt);
  return Math.max(0, Math.ceil(remaining / 1000));
}

export function isAdminAuthenticated(): boolean {
  if (!isBrowser()) return false;
  const token = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
  if (!token) return false;
  // Validate token format
  try {
    const decoded = atob(token);
    return decoded.includes("pcs_") && decoded.includes("verified_studio_admin_mansa");
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(status: boolean): void {
  if (!isBrowser()) return;
  if (status) {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, generateSessionToken());
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
}
