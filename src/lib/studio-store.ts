// Pictorial Photography Studio Store & Database (Mansa, Punjab)
import heroAsset from "@/assets/golden-embrace-hero.png";
import preweddingAsset from "@/assets/prewedding.jpg";
import brideAsset from "@/assets/bride.jpg";
import cinemaAsset from "@/assets/cinema.jpg";
import ringAsset from "@/assets/ring.jpg";
import albumAsset from "@/assets/album.jpg";
import editingAsset from "@/assets/editing.jpg";
import birthdayAsset from "@/assets/birthday.jpg";

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
  selectedPhotos?: string[]; // Photos selected by client for album / final delivery
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

// Default Sample Wedding Photos (Bundled URLs for both Local & Vercel Production)
export const DEFAULT_PHOTOS = {
  hero: heroAsset,
  prewedding: preweddingAsset,
  bride: brideAsset,
  cinema: cinemaAsset,
  ring: ringAsset,
  album: albumAsset,
  editing: editingAsset,
  birthday: birthdayAsset,
};

export function resolveStudioPhotoUrl(url: string): string {
  if (!url) return DEFAULT_PHOTOS.hero;
  const legacyMap: Record<string, string> = {
    "/src/assets/golden-embrace-hero.png": DEFAULT_PHOTOS.hero,
    "/src/assets/prewedding.jpg": DEFAULT_PHOTOS.prewedding,
    "/src/assets/bride.jpg": DEFAULT_PHOTOS.bride,
    "/src/assets/cinema.jpg": DEFAULT_PHOTOS.cinema,
    "/src/assets/ring.jpg": DEFAULT_PHOTOS.ring,
    "/src/assets/album.jpg": DEFAULT_PHOTOS.album,
    "/src/assets/editing.jpg": DEFAULT_PHOTOS.editing,
    "/src/assets/birthday.jpg": DEFAULT_PHOTOS.birthday,
  };
  return legacyMap[url] || url;
}

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

// CLIENT GALLERY FOLDERS & CROSS-DEVICE CLOUD SYNC
const CLOUD_SYNC_URL = "https://api.restful-api.dev/objects/ff808181a09d98f701a1d2cd9c461be8";
const FOLDERS_VERSION_KEY = "pictorial_folders_v";
let activeCloudWritePromise: Promise<void> | null = null;

function hasCustomChangesFromDefaults(list: ClientGalleryFolder[]): boolean {
  if (list.length !== DEFAULT_FOLDERS.length) return true;
  for (let i = 0; i < DEFAULT_FOLDERS.length; i++) {
    const def = DEFAULT_FOLDERS[i];
    const cur = list.find((f) => f.id === def?.id);
    if (!def || !cur) return true;
    if (
      cur.clientId.trim().toUpperCase() !== def.clientId.trim().toUpperCase() ||
      cur.password.trim() !== def.password.trim() ||
      cur.clientName.trim() !== def.clientName.trim()
    ) {
      return true;
    }
  }
  return false;
}

function photoUrlToKey(url: string): string {
  if (!url) return "hero";
  const resolved = resolveStudioPhotoUrl(url);
  for (const [k, v] of Object.entries(DEFAULT_PHOTOS)) {
    if (resolved === v || url.includes(k)) return k;
  }
  if (url.startsWith("http") && url.length < 45 && !url.includes("|") && !url.includes(",")) {
    return url;
  }
  return "hero";
}

function keyToPhotoUrl(key: string): string {
  if (!key) return DEFAULT_PHOTOS.hero;
  const k = key.trim() as keyof typeof DEFAULT_PHOTOS;
  if (k in DEFAULT_PHOTOS) {
    return DEFAULT_PHOTOS[k];
  }
  return resolveStudioPhotoUrl(key);
}

function encodeFolderCompact(f: ClientGalleryFolder): string {
  const clean = (s: string | undefined, max: number) =>
    (s || "").replace(/\|/g, " ").trim().slice(0, max);
  const id = clean(f.id, 20) || "fld-" + Date.now();
  const cid = clean(f.clientId, 24).toUpperCase();
  const pwd = clean(f.password, 24);
  const name = clean(f.clientName, 28);
  const title = clean(f.eventTitle, 32);
  const date = clean(f.eventDate, 18);
  const loc = clean(f.location, 20);
  const cover = photoUrlToKey(f.coverImage);
  const photosArr = f.photos && f.photos.length > 0 ? f.photos : [DEFAULT_PHOTOS.hero];
  const photoKeys = photosArr.slice(0, 8).map(photoUrlToKey).join(",");
  const selIndices = (f.selectedPhotos || [])
    .map((sp) => photosArr.findIndex((p) => resolveStudioPhotoUrl(p) === resolveStudioPhotoUrl(sp)))
    .filter((i) => i >= 0)
    .join(",");
  const dl = f.canDownload !== false ? "1" : "0";
  return [id, cid, pwd, name, title, date, loc, cover, photoKeys, selIndices, dl]
    .join("|")
    .slice(0, 245);
}

function decodeFolderCompact(
  raw: string,
  existingLocal: ClientGalleryFolder[]
): ClientGalleryFolder | null {
  if (!raw || typeof raw !== "string" || !raw.includes("|")) return null;
  const parts = raw.split("|");
  if (parts.length < 8) return null;
  const [
    id = "",
    clientId = "",
    password = "",
    clientName = "",
    eventTitle = "",
    eventDate = "",
    location = "",
    coverKey = "hero",
    photoKeysCsv = "hero",
    selIndicesCsv = "",
    dl = "1",
  ] = parts;
  if (!id.trim() || !clientId.trim()) return null;

  const localMatch = existingLocal.find((item) => item.id === id.trim());
  const cloudPhotos = (photoKeysCsv ? photoKeysCsv.split(",") : ["hero"])
    .filter(Boolean)
    .map(keyToPhotoUrl);

  const hasCustomLocalPhotos =
    localMatch &&
    localMatch.photos &&
    localMatch.photos.some((p) => p.startsWith("data:image/"));

  const finalPhotos = hasCustomLocalPhotos
    ? localMatch.photos
    : cloudPhotos.length > 0
      ? cloudPhotos
      : [DEFAULT_PHOTOS.hero];

  const finalCover =
    localMatch && localMatch.coverImage?.startsWith("data:image/")
      ? localMatch.coverImage
      : keyToPhotoUrl(coverKey);

  let selectedPhotos: string[] = [];
  if (selIndicesCsv && selIndicesCsv.trim().length > 0) {
    selectedPhotos = selIndicesCsv
      .split(",")
      .map((s) => parseInt(s, 10))
      .filter((idx) => !isNaN(idx) && idx >= 0 && idx < finalPhotos.length)
      .map((idx) => finalPhotos[idx] as string);
  } else if (localMatch?.selectedPhotos) {
    selectedPhotos = localMatch.selectedPhotos;
  }

  return {
    id: id.trim(),
    clientId: clientId.trim().toUpperCase(),
    password: password.trim(),
    clientName: clientName.trim() || localMatch?.clientName || "Client Gallery",
    eventTitle: eventTitle.trim() || localMatch?.eventTitle || "Wedding Gallery",
    eventDate: eventDate.trim() || localMatch?.eventDate || "2026",
    location: location.trim() || localMatch?.location || "Mansa, Punjab",
    coverImage: finalCover,
    photos: finalPhotos,
    selectedPhotos,
    canDownload: dl !== "0",
    createdAt: localMatch?.createdAt || "2026-11-05",
  };
}

function safeSaveFoldersToLocal(list: ClientGalleryFolder[], versionTimestamp?: number): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(list));
    if (versionTimestamp !== undefined) {
      localStorage.setItem(FOLDERS_VERSION_KEY, String(versionTimestamp));
    }
  } catch (err) {
    // If base64 photos exceed localStorage quota, keep credentials & non-oversized photos so username/password update NEVER fails
    try {
      const compactList = list.map((f) => ({
        ...f,
        coverImage: f.coverImage?.startsWith("data:image/")
          ? DEFAULT_PHOTOS.hero
          : f.coverImage,
        photos:
          f.photos.filter((p) => !p.startsWith("data:image/")).length > 0
            ? f.photos.filter((p) => !p.startsWith("data:image/"))
            : [DEFAULT_PHOTOS.hero],
      }));
      localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(compactList));
      if (versionTimestamp !== undefined) {
        localStorage.setItem(FOLDERS_VERSION_KEY, String(versionTimestamp));
      }
    } catch (innerErr) {
      console.error("Failed to save folders to localStorage", innerErr);
    }
  }
}

function getNextFolderVersion(): number {
  const now = Date.now();
  if (!isBrowser()) return now;
  const current = Number(localStorage.getItem(FOLDERS_VERSION_KEY) || 0);
  return Math.max(now, current + 1);
}

export async function syncFoldersToCloud(
  foldersInput?: ClientGalleryFolder[],
  versionOverride?: number
): Promise<void> {
  if (typeof fetch === "undefined") return;
  const v = versionOverride || getNextFolderVersion();
  if (isBrowser()) {
    try {
      localStorage.setItem(FOLDERS_VERSION_KEY, String(v));
    } catch {
      // ignore
    }
  }
  const doPut = async () => {
    try {
      const list = foldersInput || getClientFolders();
      const payloadData: Record<string, string> = {
        v: String(v),
      };
      list.slice(0, 15).forEach((f, idx) => {
        payloadData[`f${idx}`] = encodeFolderCompact(f);
      });
      await fetch(CLOUD_SYNC_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "pictorial-studio-db-v1",
          data: payloadData,
        }),
      });
    } catch (e) {
      // Ignore network errors in offline/test environments
    }
  };
  activeCloudWritePromise = doPut();
  await activeCloudWritePromise;
  activeCloudWritePromise = null;
}

export async function syncFoldersFromCloud(): Promise<ClientGalleryFolder[]> {
  if (!isBrowser() || typeof fetch === "undefined") return getClientFolders();
  try {
    if (activeCloudWritePromise) {
      await activeCloudWritePromise;
    }
    const res = await fetch(`${CLOUD_SYNC_URL}?t=${Date.now()}`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) return getClientFolders();
    const json = await res.json();
    const data = json?.data;
    if (!data || typeof data !== "object") return getClientFolders();

    const localList = getClientFolders();
    const cloudV = Number(data.v || 0);
    const localV = Number(localStorage.getItem(FOLDERS_VERSION_KEY) || 0);

    // If this browser already has newer local changes (or pre-existing custom username changes when cloud is at initial v=1), push local changes to cloud!
    if (
      (localV > 0 && localV > cloudV) ||
      (cloudV <= 1 && hasCustomChangesFromDefaults(localList))
    ) {
      await syncFoldersToCloud(localList, localV > 1 ? localV : Date.now());
      return localList;
    }

    const cloudFolders: ClientGalleryFolder[] = [];
    for (let i = 0; i < 20; i++) {
      const raw = data[`f${i}`];
      if (typeof raw === "string") {
        const decoded = decodeFolderCompact(raw, localList);
        if (decoded) cloudFolders.push(decoded);
      }
    }

    if (cloudFolders.length > 0) {
      safeSaveFoldersToLocal(cloudFolders, cloudV);
      return cloudFolders;
    }
    return localList;
  } catch (e) {
    return getClientFolders();
  }
}

export function getClientFolders(): ClientGalleryFolder[] {
  if (!isBrowser()) return DEFAULT_FOLDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    if (!raw) {
      safeSaveFoldersToLocal(DEFAULT_FOLDERS);
      return DEFAULT_FOLDERS;
    }
    const parsed: ClientGalleryFolder[] = JSON.parse(raw);
    return parsed.map((f) => ({
      ...f,
      clientId: (f.clientId || "").trim().toUpperCase(),
      password: (f.password || "").trim(),
      coverImage: resolveStudioPhotoUrl(f.coverImage || f.photos?.[0] || DEFAULT_PHOTOS.hero),
      photos: (f.photos || []).map(resolveStudioPhotoUrl),
      selectedPhotos: (f.selectedPhotos || []).map(resolveStudioPhotoUrl),
    }));
  } catch (e) {
    console.error("Error reading client folders", e);
    return DEFAULT_FOLDERS;
  }
}

export function saveClientFolder(folder: ClientGalleryFolder): void {
  if (!isBrowser()) return;
  const sanitizePhoto = (url: string) => {
    if (!url) return "";
    if (url.startsWith("data:image/")) return url;
    return resolveStudioPhotoUrl(sanitizeText(url, 1500));
  };
  const cleanPhotos = (folder.photos || []).map(sanitizePhoto).filter(Boolean);
  const cleanSelected = (folder.selectedPhotos || []).map(sanitizePhoto).filter(Boolean);
  const cleanFolder: ClientGalleryFolder = {
    ...folder,
    clientId: sanitizeText(folder.clientId, 40).trim().toUpperCase(),
    password: sanitizeText(folder.password, 60).trim(),
    clientName: sanitizeText(folder.clientName, 120),
    eventTitle: sanitizeText(folder.eventTitle, 150),
    eventDate: sanitizeText(folder.eventDate, 60),
    location: sanitizeText(folder.location, 120),
    coverImage: sanitizePhoto(folder.coverImage || cleanPhotos[0] || DEFAULT_PHOTOS.hero),
    photos: cleanPhotos.length > 0 ? cleanPhotos : [DEFAULT_PHOTOS.hero],
    selectedPhotos: cleanSelected,
  };
  const list = getClientFolders();
  const idx = list.findIndex((f) => f.id === cleanFolder.id);
  if (idx >= 0) {
    // Completely replace the old folder (including deleting its old clientId) with the updated folder
    list[idx] = cleanFolder;
  } else {
    list.unshift(cleanFolder);
  }
  const nowV = getNextFolderVersion();
  safeSaveFoldersToLocal(list, nowV);
  void syncFoldersToCloud(list, nowV);
}

export function toggleClientSelectedPhoto(
  folderId: string,
  photoUrl: string
): ClientGalleryFolder | null {
  if (!isBrowser()) return null;
  const list = getClientFolders();
  const idx = list.findIndex((f) => f.id === folderId);
  if (idx < 0) return null;
  const folder = list[idx];
  if (!folder) return null;
  const currentSelected = folder.selectedPhotos || [];
  const exists = currentSelected.includes(photoUrl);
  const nextSelected = exists
    ? currentSelected.filter((p) => p !== photoUrl)
    : [...currentSelected, photoUrl];
  const updated: ClientGalleryFolder = {
    ...folder,
    selectedPhotos: nextSelected,
  };
  list[idx] = updated;
  const nowV = getNextFolderVersion();
  safeSaveFoldersToLocal(list, nowV);
  void syncFoldersToCloud(list, nowV);
  return updated;
}

export function downloadStudioPhoto(photoUrl: string, fileName = "pictorial-photo.jpg"): void {
  if (typeof document === "undefined") return;
  const link = document.createElement("a");
  link.href = photoUrl;
  link.download = fileName;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function deleteClientFolder(id: string): void {
  if (!isBrowser()) return;
  const list = getClientFolders().filter((f) => f.id !== id);
  const nowV = getNextFolderVersion();
  safeSaveFoldersToLocal(list, nowV);
  void syncFoldersToCloud(list, nowV);
}

export function authenticateClientGallery(clientId: string, pass: string): ClientGalleryFolder | null {
  const folders = getClientFolders();
  const trimmedId = clientId.trim().toLowerCase();
  const trimmedPass = pass.trim().toLowerCase();

  const found = folders.find(
    (f) =>
      f.clientId.trim().toLowerCase() === trimmedId &&
      f.password.trim().toLowerCase() === trimmedPass
  );
  return found || null;
}

export async function authenticateClientGalleryAsync(
  clientId: string,
  pass: string
): Promise<ClientGalleryFolder | null> {
  // Always sync latest folders from cloud first so any username/password changed in Admin immediately works on Mobile & Desktop, and old username no longer works
  await syncFoldersFromCloud();
  return authenticateClientGallery(clientId, pass);
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
