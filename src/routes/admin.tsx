import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useId, useRef } from "react";
import {
  Calendar as CalendarIcon,
  Folder,
  FolderPlus,
  Users,
  DollarSign,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  Lock,
  Search,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Download,
  Image as ImageIcon,
  FileText,
  X,
  AlertCircle,
  MapPin,
  TrendingUp,
  Share2,
  Sun,
  Moon,
} from "lucide-react";

import {
  ADMIN_CREDENTIALS,
  DEFAULT_PHOTOS,
  isAdminAuthenticated,
  setAdminAuthenticated,
  getStudioBookings,
  saveStudioBooking,
  deleteStudioBooking,
  getClientFolders,
  saveClientFolder,
  deleteClientFolder,
  getStudioInquiries,
  deleteStudioInquiry,
  recordFailedAttempt,
  resetFailedAttempts,
  isLockedOut,
  getLockoutRemaining,
  downloadStudioPhoto,
  toggleClientSelectedPhoto,
  type BookingEvent,
  type ClientGalleryFolder,
  type StudioInquiry,
} from "@/lib/studio-store";

export const Route = createFileRoute("/admin")({
  component: AdminPortal,
});

export default function AdminPortal() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pictorial_theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "light") {
        document.documentElement.classList.add("theme-light");
        document.documentElement.classList.remove("theme-dark");
      } else {
        document.documentElement.classList.add("theme-dark");
        document.documentElement.classList.remove("theme-light");
      }
      localStorage.setItem("pictorial_theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [logoClickTimer, setLogoClickTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"calendar" | "folders" | "inquiries">("calendar");

  // Data states
  const [bookings, setBookings] = useState<BookingEvent[]>([]);
  const [folders, setFolders] = useState<ClientGalleryFolder[]>([]);
  const [inquiries, setInquiries] = useState<StudioInquiry[]>([]);

  // Calendar states
  const [selectedDate, setSelectedDate] = useState<string>("2026-11-14");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 10, 1)); // Nov 2026

  // Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<BookingEvent | null>(null);
  const [bookingForm, setBookingForm] = useState<Partial<BookingEvent>>({
    eventType: "Anand Karaj",
    status: "Confirmed",
    eventDate: "2026-11-15",
    totalAmount: 150000,
    advancePaid: 50000,
    balanceDue: 100000,
    crew: "2 Candid Photographers + 2 Cinematographers",
  });

  // Client Folder Modal
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<ClientGalleryFolder | null>(null);
  const [folderForm, setFolderForm] = useState<Partial<ClientGalleryFolder>>({
    clientId: "",
    password: "",
    clientName: "",
    eventTitle: "",
    eventDate: "",
    location: "Mansa, Punjab",
    canDownload: true,
    photos: [],
  });
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const photoFileInputRef = useRef<HTMLInputElement | null>(null);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewingSelectedFolder, setViewingSelectedFolder] = useState<ClientGalleryFolder | null>(null);

  // Initialize & Check Secret Hash
  useEffect(() => {
    const auth = isAdminAuthenticated();
    if (auth) {
      setIsAuthenticated(true);
      loadData();
      return undefined;
    }

    // Check if accessed via Secret URL Hash (#pictorial-mansa-2580)
    if (typeof window !== "undefined") {
      const checkHash = () => {
        if (window.location.hash === "#pictorial-mansa-2580") {
          setSecretUnlocked(true);
          // Clean hash from URL bar so nobody looking at screen sees it
          window.history.replaceState(null, "", window.location.pathname);
        }
      };
      checkHash();
      window.addEventListener("hashchange", checkHash);
      return () => window.removeEventListener("hashchange", checkHash);
    }
    return undefined;
  }, []);

  const loadData = () => {
    setBookings(getStudioBookings());
    setFolders(getClientFolders());
    setInquiries(getStudioInquiries());
  };

  // Lockout countdown effect
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const t = setTimeout(() => setLockoutSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [lockoutSeconds]);

  // Secret knock: click camera icon 7 times quickly → unlocks secret login vault
  const handleSecretKnock = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    if (logoClickTimer) clearTimeout(logoClickTimer);
    if (newCount >= 7) {
      setLogoClickCount(0);
      setSecretUnlocked(true);
    } else {
      const t = setTimeout(() => setLogoClickCount(0), 2000);
      setLogoClickTimer(t);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Lockout check
    if (isLockedOut()) {
      const remaining = getLockoutRemaining();
      setLockoutSeconds(remaining);
      setLoginError(`ਜ਼ਿਆਦਾ ਗਲਤ ਕੋਸ਼ਿਸ਼ਾਂ! ${Math.ceil(remaining / 60)} ਮਿੰਟ ਬਾਅਦ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ। (Too many attempts — wait ${Math.ceil(remaining / 60)} min)`);
      return;
    }

    if (ADMIN_CREDENTIALS.verify(username, password)) {
      resetFailedAttempts();
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      loadData();
    } else {
      recordFailedAttempt();
      const remaining = getLockoutRemaining();
      if (isLockedOut()) {
        setLockoutSeconds(remaining);
        setLoginError(`ਜ਼ਿਆਦਾ ਗਲਤ ਕੋਸ਼ਿਸ਼ਾਂ! 10 ਮਿੰਟ ਲਈ ਲੌਕ ਹੋ ਗਿਆ। (Locked for 10 min)`);
      } else {
        const left = 5 - parseInt(sessionStorage.getItem("_pfa") || "0");
        setLoginError(`ਗਲਤ ਯੂਜ਼ਰਨੇਮ ਜਾਂ ਪਾਸਵਰਡ। ${left > 0 ? left + " ਕੋਸ਼ਿਸ਼ਾਂ ਬਾਕੀ।" : ""} (Invalid credentials)`);
      }
      // Clear password on failure for security
      setPassword("");
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    setSecretUnlocked(false);
    setUsername("");
    setPassword("");
  };

  // Calendar Helpers
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthNames = [
    "ਜਨਵਰੀ (January)",
    "ਫ਼ਰਵਰੀ (February)",
    "ਮਾਰਚ (March)",
    "ਅਪ੍ਰੈਲ (April)",
    "ਮਈ (May)",
    "ਜੂਨ (June)",
    "ਜੁਲਾਈ (July)",
    "ਅਗਸਤ (August)",
    "ਸਤੰਬਰ (September)",
    "ਅਕਤੂਬਰ (October)",
    "ਨਵੰਬਰ (November)",
    "ਦਸੰਬਰ (December)",
  ];

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const formatDateStr = (d: number) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const getBookingsForDate = (dateStr: string) => {
    return bookings.filter((b) => b.eventDate === dateStr);
  };

  const selectedDateBookings = getBookingsForDate(selectedDate);

  // Financial KPIs
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  const totalAdvance = bookings.reduce((sum, b) => sum + (Number(b.advancePaid) || 0), 0);
  const totalBalanceDue = bookings.reduce((sum, b) => sum + (Number(b.balanceDue) || 0), 0);

  // Booking CRUD Handlers
  const openNewBookingModal = (defaultDate?: string) => {
    const d = defaultDate || selectedDate || "2026-11-15";
    setEditingBooking(null);
    setBookingForm({
      id: "bkg-" + Date.now(),
      clientName: "",
      phone: "+91 ",
      eventType: "Anand Karaj",
      eventDate: d,
      eventTime: "10:00 AM",
      venue: "Mansa, Punjab",
      package: "Royal Wedding Signature 4K",
      totalAmount: 150000,
      advancePaid: 50000,
      balanceDue: 100000,
      status: "Confirmed",
      crew: "2 Candid Photographers + 2 Cinematographers",
      notes: "",
    });
    setIsBookingModalOpen(true);
  };

  const openEditBookingModal = (b: BookingEvent) => {
    setEditingBooking(b);
    setBookingForm({ ...b });
    setIsBookingModalOpen(true);
  };

  const handleSaveBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.clientName || !bookingForm.eventDate) return;

    const total = Number(bookingForm.totalAmount) || 0;
    const advance = Number(bookingForm.advancePaid) || 0;
    const balance = Math.max(0, total - advance);

    const updated: BookingEvent = {
      id: editingBooking ? editingBooking.id : "bkg-" + Date.now(),
      clientName: bookingForm.clientName || "",
      phone: bookingForm.phone || "",
      eventType: (bookingForm.eventType as any) || "Anand Karaj",
      eventDate: bookingForm.eventDate || "",
      eventTime: bookingForm.eventTime || "10:00 AM",
      venue: bookingForm.venue || "",
      package: bookingForm.package || "",
      totalAmount: total,
      advancePaid: advance,
      balanceDue: balance,
      status: (bookingForm.status as any) || "Confirmed",
      crew: bookingForm.crew || "",
      notes: bookingForm.notes || "",
    };

    saveStudioBooking(updated);
    loadData();
    setIsBookingModalOpen(false);
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm("ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਇਹ ਬੁਕਿੰਗ ਡਿਲੀਟ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ? (Delete this booking?)")) {
      deleteStudioBooking(id);
      loadData();
    }
  };

  // Folder CRUD Handlers
  const openNewFolderModal = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    setEditingFolder(null);
    setFolderForm({
      id: "fld-" + Date.now(),
      clientId: `PIC-2026-${randomNum}`,
      password: `mansa@${randomNum}`,
      clientName: "",
      eventTitle: "Royal Anand Karaj & Reception",
      eventDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      location: "Mansa, Punjab",
      coverImage: DEFAULT_PHOTOS.hero,
      photos: [
        DEFAULT_PHOTOS.hero,
        DEFAULT_PHOTOS.bride,
        DEFAULT_PHOTOS.prewedding,
        DEFAULT_PHOTOS.cinema,
      ],
      canDownload: true,
      createdAt: new Date().toISOString().split("T")[0] as string,
    });
    setNewPhotoUrl("");
    setIsFolderModalOpen(true);
  };

  const openEditFolderModal = (folder: ClientGalleryFolder) => {
    setEditingFolder(folder);
    setFolderForm({ ...folder });
    setNewPhotoUrl("");
    setIsFolderModalOpen(true);
  };

  const handleSaveFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderForm.clientId || !folderForm.password || !folderForm.clientName) {
      alert("ਕਿਰਪਾ ਕਰਕੇ Client ID, Password ਅਤੇ Client Name ਭਰੋ!");
      return;
    }

    const updated: ClientGalleryFolder = {
      id: editingFolder ? editingFolder.id : "fld-" + Date.now(),
      clientId: folderForm.clientId.trim().toUpperCase(),
      password: folderForm.password.trim(),
      clientName: folderForm.clientName.trim(),
      eventTitle: folderForm.eventTitle || "Wedding Gallery",
      eventDate: folderForm.eventDate || "",
      location: folderForm.location || "Mansa, Punjab",
      coverImage: folderForm.coverImage || folderForm.photos?.[0] || DEFAULT_PHOTOS.hero,
      photos: folderForm.photos && folderForm.photos.length > 0 ? folderForm.photos : [DEFAULT_PHOTOS.hero],
      canDownload: folderForm.canDownload ?? true,
      createdAt: folderForm.createdAt || (new Date().toISOString().split("T")[0] as string),
    };

    saveClientFolder(updated);
    loadData();
    setIsFolderModalOpen(false);
  };

  const handleDeleteFolder = (id: string) => {
    if (window.confirm("ਕੀ ਤੁਸੀਂ ਇਹ ਕਲਾਇੰਟ ਗੈਲਰੀ ਫੋਲਡਰ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ? (Delete this client gallery folder?)")) {
      deleteClientFolder(id);
      loadData();
    }
  };

  // Compress & convert selected Phone Gallery / PC Image files into high-quality Data URLs
  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const resultStr = ev.target?.result as string;
        if (!resultStr) return reject(new Error("Empty file"));
        const img = new window.Image();
        img.onload = () => {
          const maxDim = 1280;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(resultStr);
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };
        img.onerror = () => resolve(resultStr);
        img.src = resultStr;
      };
      reader.onerror = () => reject(new Error("File read error"));
      reader.readAsDataURL(file);
    });
  };

  const handleDevicePhotosSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setIsUploadingPhotos(true);
    try {
      const filesArray = Array.from(fileList);
      const dataUrls: string[] = [];
      for (const file of filesArray) {
        if (file.type.startsWith("image/")) {
          const compressed = await compressImageFile(file);
          dataUrls.push(compressed);
        }
      }
      if (dataUrls.length > 0) {
        setFolderForm((prev) => {
          const existing = prev.photos || [];
          const updatedPhotos = [...existing, ...dataUrls];
          return {
            ...prev,
            coverImage: prev.coverImage || updatedPhotos[0] || DEFAULT_PHOTOS.hero,
            photos: updatedPhotos,
          };
        });
      }
    } catch (err) {
      console.error("Error adding photos from device:", err);
    } finally {
      setIsUploadingPhotos(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleAddPhotoToForm = () => {
    // If no URL is typed, clicking "+ ਸ਼ਾਮਲ ਕਰੋ" directly opens Phone Gallery / PC File Picker!
    if (!newPhotoUrl.trim()) {
      photoFileInputRef.current?.click();
      return;
    }
    const current = folderForm.photos || [];
    setFolderForm({
      ...folderForm,
      photos: [...current, newPhotoUrl.trim()],
    });
    setNewPhotoUrl("");
  };

  const handleRemovePhotoFromForm = (idx: number) => {
    const current = folderForm.photos || [];
    setFolderForm({
      ...folderForm,
      photos: current.filter((_, i) => i !== idx),
    });
  };

  const copyCredentials = (folder: ClientGalleryFolder) => {
    const text = `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਜੀ! Pictorial Photography Studio ਵਲੋਂ ਤੁਹਾਡੀ ਪ੍ਰਾਈਵੇਟ ਵੈੱਡਿੰਗ ਗੈਲਰੀ ਤਿਆਰ ਹੈ:\n\n🌐 ਵੈੱਬਸਾਈਟ: https://pictorialphotography.in/#client-gallery\n🔑 Client ID: ${folder.clientId}\n🔒 Password: ${folder.password}\n\nਧੰਨਵਾਦ! Pictorial Photography, Mansa (+91 97005 98098)`;
    navigator.clipboard.writeText(text);
    setCopiedId(folder.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  // ----------------------------------------------------
  // STEALTH PROTECTION: NO NORMAL ADMIN LOGIN ALLOWED!
  // Anyone visiting /admin normally sees a 404 Page Not Found decoy.
  // Only unlocking via Secret URL (#pictorial-mansa-2580) or 7x Secret Knock reveals the Vault.
  // ----------------------------------------------------
  if (!isAuthenticated) {
    if (!secretUnlocked) {
      return (
        <div className={`admin-login-screen min-h-screen ${theme === "light" ? "theme-light" : "theme-dark"} bg-[#0B0B0D] text-[#F5F0E8] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none`}>
          <div className="admin-login-card w-full max-w-md bg-[#202023]/90 backdrop-blur-xl border border-[#35332F]/80 rounded-2xl shadow-2xl p-8 text-center relative z-10">
            {/* Hidden 7-Click Trigger on Camera Icon */}
            <div
              onClick={handleSecretKnock}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#35332F] bg-[#0B0B0D]/60 mb-4 cursor-default"
            >
              <Camera className="w-6 h-6 text-[#B8B5AF]/50" />
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C6A76A] font-semibold">
              Error 404
            </p>
            <h1 className="text-2xl font-serif tracking-wider text-[#F5F0E8] mt-1">
              Page Not Found
            </h1>
            <p className="text-xs text-[#B8B5AF] mt-2 leading-relaxed">
              ਇਹ ਪੇਜ ਮੌਜੂਦ ਨਹੀਂ ਹੈ ਜਾਂ ਹਟਾ ਦਿੱਤਾ ਗਿਆ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਮੁੱਖ ਵੈੱਬਸਾਈਟ ਤੇ ਵਾਪਸ ਜਾਓ।
            </p>
            <div className="mt-6 pt-5 border-t border-[#35332F]/80">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-semibold text-xs uppercase tracking-wider transition"
              >
                <span>ਮੁੱਖ ਸਾਈਟ ਤੇ ਵਾਪਸ ਜਾਓ (Back to Home)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`admin-login-screen min-h-screen ${theme === "light" ? "theme-light" : "theme-dark"} bg-[#0B0B0D] text-[#F5F0E8] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#C6A76A]/30 transition-colors duration-300`}>
        {/* Ambient luxury lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C6A76A]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 right-10 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="admin-login-card w-full max-w-md bg-[#202023]/90 backdrop-blur-xl border border-[#35332F]/80 rounded-2xl shadow-2xl p-8 relative z-10">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#C6A76A]/40 bg-[#0B0B0D]/80 mb-4 shadow-lg shadow-[#C6A76A]/10 select-none"
              title="Pictorial Secret Vault"
            >
              <ShieldCheck className="w-8 h-8 text-[#C6A76A]" />
            </div>
            <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] uppercase tracking-widest mb-2">
              ✓ Secret Gate Unlocked
            </div>
            <h1 className="text-2xl font-serif tracking-widest text-[#F5F0E8] uppercase">
              Pictorial Photography
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C6A76A] font-semibold mt-1">
              Secret Studio Vault • Mansa
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#B8B5AF] font-medium mb-1.5">
                Admin Username (ਯੂਜ਼ਰ ਨੇਮ)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  required
                  disabled={lockoutSeconds > 0}
                  autoComplete="off"
                  className="w-full bg-[#0B0B0D]/80 border border-[#35332F] rounded-lg px-4 py-3 text-[#F5F0E8] placeholder-stone-600 focus:outline-none focus:border-[#C6A76A] transition text-sm disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#B8B5AF] font-medium mb-1.5">
                Admin Password (ਪਾਸਵਰਡ)
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  disabled={lockoutSeconds > 0}
                  autoComplete="current-password"
                  className="w-full bg-[#0B0B0D]/80 border border-[#35332F] rounded-lg px-4 py-3 text-[#F5F0E8] placeholder-stone-600 focus:outline-none focus:border-[#C6A76A] transition text-sm disabled:opacity-50"
                />
              </div>
            </div>

            {lockoutSeconds > 0 && (
              <div className="p-3 rounded-lg bg-orange-950/60 border border-orange-800/80 text-orange-200 text-xs flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-orange-400" />
                <span>🔒 ਲੌਕ ਹੈ — {Math.ceil(lockoutSeconds / 60)}m {lockoutSeconds % 60}s ਬਾਅਦ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ</span>
              </div>
            )}

            <button
              type="submit"
              disabled={lockoutSeconds > 0}
              className="w-full bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-semibold py-3.5 px-4 rounded-lg text-sm tracking-wider uppercase transition shadow-lg shadow-[#C6A76A]/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Lock className="w-4 h-4" />
              <span>ਸਟੂਡੀਓ ਪੈਨਲ ਵਿੱਚ ਦਾਖਲ ਹੋਵੋ (Login)</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#35332F]/80 text-center">
            <p className="text-xs text-[#B8B5AF]">
              🔒 ਸੁਰੱਖਿਅਤ ਪ੍ਰਾਈਵੇਟ ਐਕਸੈੱਸ — Secure Private Access Only
            </p>
            <div className="mt-4">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-[#B8B5AF] hover:text-[#C6A76A] transition"
              >
                <span>ਮੁੱਖ ਸਾਈਟ ਤੇ ਵਾਪਸ ਜਾਓ (Back to Website)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // ----------------------------------------------------
  return (
    <div className={`admin-dashboard min-h-screen ${theme === "light" ? "theme-light" : "theme-dark"} bg-[#0B0B0D] text-[#F5F0E8] font-sans selection:bg-[#C6A76A]/30 transition-colors duration-300`}>
      {/* Top Navigation Bar */}
      <header className="admin-topbar sticky top-0 z-40 bg-[#0B0B0D]/90 backdrop-blur-md border-b border-[#35332F]/80 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#C6A76A]/50 bg-[#202023] flex items-center justify-center">
            <Camera className="w-5 h-5 text-[#C6A76A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif tracking-widest text-lg text-[#F5F0E8] font-bold">
                PICTORIAL
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#C6A76A]/20 text-[#C6A76A] border border-[#C6A76A]/30">
                Studio Admin
              </span>
            </div>
            <p className="text-[11px] text-[#B8B5AF] flex items-center gap-1.5">
              <span>Mansa, Punjab</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Cloud Sync
              </span>
            </p>
          </div>
        </div>

        {/* Center Tab Buttons */}
        <div className="admin-tab-switcher hidden md:flex items-center gap-1 bg-[#202023]/90 border border-[#35332F] p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition ${
              activeTab === "calendar"
                ? "bg-gradient-to-r from-[#C6A76A] to-[#C6A76A] text-[#0B0B0D] shadow-md"
                : "text-[#B8B5AF] hover:text-white hover:bg-[#171719]/60"
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>ਕੈਲੰਡਰ ਤੇ ਪ੍ਰੋਗਰਾਮ ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("folders")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition ${
              activeTab === "folders"
                ? "bg-gradient-to-r from-[#C6A76A] to-[#C6A76A] text-[#0B0B0D] shadow-md"
                : "text-[#B8B5AF] hover:text-white hover:bg-[#171719]/60"
            }`}
          >
            <Folder className="w-4 h-4" />
            <span>ਕਲਾਇੰਟ ਗੈਲਰੀ ਫੋਲਡਰ ({folders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition ${
              activeTab === "inquiries"
                ? "bg-gradient-to-r from-[#C6A76A] to-[#C6A76A] text-[#0B0B0D] shadow-md"
                : "text-[#B8B5AF] hover:text-white hover:bg-[#171719]/60"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>ਵੈੱਬਸਾਈਟ ਇਨਕੁਆਰੀਆਂ ({inquiries.length})</span>
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Black & White Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Black & White theme"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#35332F] bg-[#202023]/90 hover:border-[#C6A76A] text-xs font-semibold text-[#B8B5AF] hover:text-[#C6A76A] transition shadow-sm"
            title={theme === "dark" ? "Switch to White Theme" : "Switch to Black Theme"}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#C6A76A]" />
                <span className="hidden sm:inline">White Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#C6A76A]" />
                <span className="hidden sm:inline">Black Mode</span>
              </>
            )}
          </button>

          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#35332F] hover:border-[#35332F] bg-[#202023]/80 text-xs text-[#B8B5AF] hover:text-[#C6A76A] transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>ਸਾਈਟ ਖੋਲ੍ਹੋ</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-200 text-xs font-medium transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Mobile Tab Bar */}
      <div className="admin-mobile-tabbar md:hidden flex border-b border-[#35332F] bg-[#0B0B0D] px-2 py-2 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab("calendar")}
          className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-semibold whitespace-nowrap ${
            activeTab === "calendar"
              ? "bg-[#C6A76A] text-[#0B0B0D]"
              : "bg-[#202023] text-[#B8B5AF]"
          }`}
        >
          📅 ਕੈਲੰਡਰ ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab("folders")}
          className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-semibold whitespace-nowrap ${
            activeTab === "folders"
              ? "bg-[#C6A76A] text-[#0B0B0D]"
              : "bg-[#202023] text-[#B8B5AF]"
          }`}
        >
          📁 ਕਲਾਇੰਟ ਫੋਲਡਰ ({folders.length})
        </button>
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-semibold whitespace-nowrap ${
            activeTab === "inquiries"
              ? "bg-[#C6A76A] text-[#0B0B0D]"
              : "bg-[#202023] text-[#B8B5AF]"
          }`}
        >
          📩 ਇਨਕੁਆਰੀਜ਼ ({inquiries.length})
        </button>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="admin-kpi-card bg-[#202023]/80 border border-[#35332F]/90 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#B8B5AF] font-medium">
                ਕੁੱਲ ਬੁਕਿੰਗਾਂ (Total Bookings)
              </p>
              <p className="text-2xl font-bold font-serif text-[#F5F0E8] mt-1">
                {totalBookingsCount}
              </p>
              <p className="text-[11px] text-[#B8B5AF] mt-0.5">ਸ਼ਡਿਊਲ ਕੀਤੇ ਪ੍ਰੋਗਰਾਮ</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#171719] flex items-center justify-center text-[#C6A76A]">
              <CalendarIcon className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* TAB 1: CALENDAR & BOOKINGS */}
        {activeTab === "calendar" && (
          <div className="space-y-6">
            {/* Header with Month Nav & Add Booking */}
            <div className="admin-section-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#202023]/90 border border-[#35332F] p-4 sm:p-5 rounded-2xl">
              <div>
                <h2 className="text-xl font-serif text-[#F5F0E8] font-bold flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#C6A76A]" />
                  <span>ਸਟੂਡੀਓ ਪ੍ਰੋਗਰਾਮ ਕੈਲੰਡਰ (Shoot Schedule & Calendar)</span>
                </h2>
                <p className="text-xs text-[#B8B5AF] mt-1">
                  ਤਰੀਕ ਚੁਣ ਕੇ ਉਸ ਦਿਨ ਦੇ ਪ੍ਰੋਗਰਾਮ, ਕਲਾਇੰਟ ਡਿਟੇਲ ਅਤੇ ਪੇਮੈਂਟ ਵੇਰਵੇ ਵੇਖੋ
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-1 bg-[#0B0B0D] border border-[#35332F] rounded-lg p-1">
                  <button
                    onClick={prevMonth}
                    className="p-1.5 hover:bg-[#171719] text-[#B8B5AF] hover:text-[#F5F0E8] rounded transition"
                    title="ਪਿਛਲਾ ਮਹੀਨਾ (Previous Month)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#F5F0E8] min-w-[140px] text-center">
                    {monthNames[month]} {year}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="p-1.5 hover:bg-[#171719] text-[#B8B5AF] hover:text-[#F5F0E8] rounded transition"
                    title="ਅਗਲਾ ਮਹੀਨਾ (Next Month)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => openNewBookingModal()}
                  className="bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-semibold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#C6A76A]/20 transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>ਨਵੀਂ ਬੁਕਿੰਗ ਜੋੜੋ (+ Add Booking)</span>
                </button>
              </div>
            </div>

            {/* Calendar Grid + Selected Date Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: The Month Calendar Grid (7 columns) */}
              <div className="admin-calendar-panel lg:col-span-7 bg-[#202023]/70 border border-[#35332F] rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs text-[#B8B5AF] uppercase tracking-wider pb-3 border-b border-[#35332F]">
                  <span className="text-red-400">ਐਤ (Sun)</span>
                  <span>ਸੋਮ (Mon)</span>
                  <span>ਮੰਗਲ (Tue)</span>
                  <span>ਬੁੱਧ (Wed)</span>
                  <span>ਵੀਰ (Thu)</span>
                  <span>ਸ਼ੁੱਕਰ (Fri)</span>
                  <span className="text-[#C6A76A]">ਸ਼ਨਿਚਰ (Sat)</span>
                </div>

                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-3">
                  {/* Empty offsets for first day of week */}
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-16 sm:h-20 rounded-lg bg-[#0B0B0D]/20" />
                  ))}

                  {/* Days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateStr = formatDateStr(dayNum);
                    const dayBookings = getBookingsForDate(dateStr);
                    const isSelected = selectedDate === dateStr;
                    const hasBookings = dayBookings.length > 0;

                    return (
                      <div
                        key={`day-${dayNum}`}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`h-16 sm:h-20 rounded-xl p-1.5 sm:p-2 cursor-pointer transition border flex flex-col justify-between relative group ${
                          isSelected
                            ? "bg-[#C6A76A]/15 border-[#C6A76A] shadow-lg shadow-[#C6A76A]/10"
                            : hasBookings
                            ? "bg-[#0B0B0D]/90 border-[#35332F]/80 hover:border-[#C6A76A]/50"
                            : "bg-[#0B0B0D]/40 border-[#35332F]/50 hover:border-[#35332F] hover:bg-[#202023]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs sm:text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center ${
                              isSelected
                                ? "bg-[#C6A76A] text-[#0B0B0D] font-bold"
                                : hasBookings
                                ? "text-[#F5F0E8]"
                                : "text-[#B8B5AF]"
                            }`}
                          >
                            {dayNum}
                          </span>
                          {hasBookings && (
                            <span className="w-2 h-2 rounded-full bg-[#C6A76A] animate-pulse" />
                          )}
                        </div>

                        {/* Events Badges */}
                        <div className="space-y-0.5 overflow-hidden">
                          {dayBookings.slice(0, 2).map((b) => (
                            <div
                              key={b.id}
                              className="text-[9px] sm:text-[10px] truncate px-1 py-0.5 rounded bg-[#202023] border border-[#35332F]/60 text-[#C6A76A] font-medium"
                              title={`${b.clientName} - ${b.eventType}`}
                            >
                              {b.eventType}
                            </div>
                          ))}
                          {dayBookings.length > 2 && (
                            <div className="text-[9px] text-[#B8B5AF] font-mono pl-1">
                              +{dayBookings.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Selected Date Inspector */}
              <div className="admin-date-inspector lg:col-span-5 bg-[#202023]/90 border border-[#35332F] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#35332F]">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#B8B5AF]">ਚੁਣੀ ਗਈ ਤਰੀਕ (Selected Date)</p>
                      <h3 className="text-lg font-serif font-bold text-[#F5F0E8] mt-0.5">
                        {new Date(selectedDate + "T00:00:00").toLocaleDateString("pa-IN", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </h3>
                      <p className="text-xs text-[#C6A76A] font-mono mt-0.5">{selectedDate}</p>
                    </div>

                    <button
                      onClick={() => openNewBookingModal(selectedDate)}
                      className="px-3 py-1.5 bg-[#171719] hover:bg-[#C6A76A] hover:text-[#0B0B0D] text-[#F5F0E8] rounded-lg text-xs font-medium transition flex items-center gap-1 border border-[#35332F]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ਬੁਕਿੰਗ ਸ਼ਡਿਊਲ ਕਰੋ</span>
                    </button>
                  </div>

                  {/* Bookings on this day */}
                  <div className="mt-4 space-y-4 max-h-[480px] overflow-y-auto pr-1">
                    {selectedDateBookings.length === 0 ? (
                      <div className="text-center py-12 px-4 rounded-xl border border-dashed border-[#35332F] bg-[#0B0B0D]/40">
                        <CalendarIcon className="w-10 h-10 text-stone-600 mx-auto mb-2 opacity-50" />
                        <p className="text-[#B8B5AF] font-medium text-sm">
                          ਇਸ ਤਰੀਕ ਲਈ ਕੋਈ ਬੁਕਿੰਗ ਸ਼ਡਿਊਲ ਨਹੀਂ ਹੈ
                        </p>
                        <p className="text-xs text-[#B8B5AF] mt-1">
                          No shoot booked for this day. Click button below to add.
                        </p>
                        <button
                          onClick={() => openNewBookingModal(selectedDate)}
                          className="mt-4 px-4 py-2 bg-[#C6A76A]/20 border border-[#C6A76A]/40 text-[#F5F0E8] hover:bg-[#C6A76A] hover:text-[#0B0B0D] rounded-lg text-xs font-semibold transition"
                        >
                          + ਇਸ ਦਿਨ ਨਵਾਂ ਪ੍ਰੋਗਰਾਮ ਜੋੜੋ
                        </button>
                      </div>
                    ) : (
                      selectedDateBookings.map((b) => (
                        <div
                          key={b.id}
                          className="p-4 rounded-xl bg-[#0B0B0D]/90 border border-[#35332F] hover:border-[#C6A76A]/40 transition space-y-3 relative group"
                        >
                          {/* Top row */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#C6A76A]/20 text-[#C6A76A] border border-[#C6A76A]/30">
                                  {b.eventType}
                                </span>
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                    b.status === "Confirmed"
                                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                      : b.status === "In Progress"
                                      ? "bg-amber-950 text-amber-300 border border-amber-800"
                                      : "bg-[#171719] text-[#B8B5AF]"
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </div>
                              <h4 className="text-base font-serif font-bold text-[#F5F0E8] mt-1.5">
                                {b.clientName}
                              </h4>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => openEditBookingModal(b)}
                                className="p-1.5 hover:bg-[#171719] text-[#B8B5AF] hover:text-[#F5F0E8] rounded transition"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="p-1.5 hover:bg-red-950 text-[#B8B5AF] hover:text-red-400 rounded transition"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Event info */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#B8B5AF]">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                              <span>{b.eventTime || "10:00 AM"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                              <span className="truncate">{b.venue || "Mansa, Punjab"}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                              <a
                                href={`tel:${b.phone}`}
                                className="hover:underline text-[#B8B5AF]"
                              >
                                {b.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Camera className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                              <span className="truncate">{b.package}</span>
                            </div>
                          </div>

                          {/* Crew and notes */}
                          {b.crew && (
                            <div className="text-[11px] bg-[#202023] p-2 rounded border border-[#35332F]/80 text-[#B8B5AF]">
                              <span className="text-[#C6A76A] font-semibold">ਟੀਮ / ਕੈਮਰਾਮੈਨ:</span> {b.crew}
                            </div>
                          )}

                          {b.notes && (
                            <div className="text-[11px] text-[#B8B5AF] italic">
                              "{b.notes}"
                            </div>
                          )}

                          {/* Financial Breakdown */}
                          <div className="pt-2 border-t border-[#35332F]/80 flex items-center justify-between text-xs">
                            <div>
                              <span className="text-[#B8B5AF]">ਕੁੱਲ ਰਕਮ:</span>{" "}
                              <span className="font-semibold text-[#F5F0E8]">
                                ₹{b.totalAmount.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <div>
                              <span className="text-emerald-400">ਐਡਵਾਂਸ:</span>{" "}
                              <span className="font-semibold text-emerald-400">
                                ₹{b.advancePaid.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <div>
                              <span className="text-amber-400">ਬਾਕੀ:</span>{" "}
                              <span className="font-semibold text-amber-400">
                                ₹{b.balanceDue.toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>

                          {/* Direct WhatsApp link */}
                          <div className="pt-1 flex gap-2">
                            <a
                              href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਜੀ! Pictorial Photography Studio, Mansa ਵਲੋਂ ਤੁਹਾਡੇ ${b.eventType} ਪ੍ਰੋਗਰਾਮ (${b.eventDate}) ਸਬੰਧੀ ਜਾਣਕਾਰੀ।`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full py-1.5 rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp ਤੇ ਗੱਲਬਾਤ ਕਰੋ</span>
                            </a>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Bottom all bookings quick counter */}
                <div className="mt-4 pt-3 border-t border-[#35332F] text-xs text-[#B8B5AF] flex items-center justify-between">
                  <span>ਸਾਰੀਆਂ ਬੁਕਿੰਗਾਂ: {bookings.length}</span>
                  <button
                    onClick={() => {
                      const allDates = bookings.map((b) => b.eventDate);
                      if (allDates.length > 0) setSelectedDate(allDates[0] ?? selectedDate);
                    }}
                    className="text-[#C6A76A] hover:underline"
                  >
                    ਸਭ ਤੋਂ ਅਗਲਾ ਪ੍ਰੋਗਰਾਮ ਵੇਖੋ
                  </button>
                </div>
              </div>
            </div>

            {/* Complete Bookings Table View */}
            <div className="admin-table-panel bg-[#202023]/80 border border-[#35332F] rounded-2xl p-5 shadow-xl overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-[#F5F0E8] text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C6A76A]" />
                  <span>ਸਾਰੀਆਂ ਬੁਕਿੰਗਾਂ ਦੀ ਸੂਚੀ (All Confirmed & Tentative Shoots)</span>
                </h3>
                <span className="text-xs text-[#B8B5AF]">{bookings.length} ਪ੍ਰੋਗਰਾਮ ਦਰਜ ਹਨ</span>
              </div>

              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#35332F] text-[#B8B5AF] uppercase tracking-wider">
                    <th className="py-2.5 px-3">ਤਰੀਕ (Date)</th>
                    <th className="py-2.5 px-3">ਕਲਾਇੰਟ (Client)</th>
                    <th className="py-2.5 px-3">ਪ੍ਰੋਗਰਾਮ (Event)</th>
                    <th className="py-2.5 px-3">ਥਾਂ (Venue)</th>
                    <th className="py-2.5 px-3">ਫੋਨ (Phone)</th>
                    <th className="py-2.5 px-3">ਕੁੱਲ (Total)</th>
                    <th className="py-2.5 px-3">ਐਡਵਾਂਸ (Advance)</th>
                    <th className="py-2.5 px-3">ਬਕਾਇਆ (Balance)</th>
                    <th className="py-2.5 px-3 text-right">ਐਕਸ਼ਨ (Actions)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#171719]/40 transition">
                      <td className="py-3 px-3 font-mono text-[#C6A76A] whitespace-nowrap">
                        {b.eventDate}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#F5F0E8] whitespace-nowrap">
                        {b.clientName}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-[#171719] text-[#F5F0E8] font-medium">
                          {b.eventType}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#B8B5AF] max-w-[200px] truncate">
                        {b.venue}
                      </td>
                      <td className="py-3 px-3 text-[#B8B5AF] font-mono">
                        {b.phone}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#F5F0E8]">
                        ₹{b.totalAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3 text-emerald-400">
                        ₹{b.advancePaid.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3 text-amber-400 font-semibold">
                        ₹{b.balanceDue.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedDate(b.eventDate);
                            window.scrollTo({ top: 300, behavior: "smooth" });
                          }}
                          className="px-2 py-1 bg-[#171719] hover:bg-stone-700 text-[#F5F0E8] rounded text-[11px]"
                        >
                          ਵੇਖੋ
                        </button>
                        <button
                          onClick={() => openEditBookingModal(b)}
                          className="px-2 py-1 bg-[#C6A76A]/20 hover:bg-[#C6A76A] hover:text-[#0B0B0D] text-[#C6A76A] rounded text-[11px] transition"
                        >
                          ਐਡਿਟ
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="px-2 py-1 bg-red-950/60 hover:bg-red-900 text-red-300 rounded text-[11px]"
                        >
                          ਹਟਾਓ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CLIENT GALLERIES & FOLDERS */}
        {activeTab === "folders" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="admin-section-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#202023]/90 border border-[#35332F] p-4 sm:p-5 rounded-2xl">
              <div>
                <h2 className="text-xl font-serif text-[#F5F0E8] font-bold flex items-center gap-2">
                  <Folder className="w-5 h-5 text-[#C6A76A]" />
                  <span>ਕਲਾਇੰਟ ਗੈਲਰੀ ਫੋਲਡਰ ਅਤੇ ਪਾਸਵਰਡ ਮੈਨੇਜਮੈਂਟ (Client Gallery Vaults)</span>
                </h2>
                <p className="text-xs text-[#B8B5AF] mt-1">
                  ਹਰ ਕਲਾਇੰਟ ਲਈ ਨਵਾਂ ਫੋਲਡਰ ਬਣਾਓ, ਉਹਨਾਂ ਦਾ ਵੱਖਰਾ Client ID ਅਤੇ ਗੁਪਤ Password ਸੈੱਟ ਕਰੋ
                </p>
              </div>

              <button
                onClick={openNewFolderModal}
                className="bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-semibold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#C6A76A]/20 transition shrink-0"
              >
                <FolderPlus className="w-4 h-4" />
                <span>ਨਵਾਂ ਕਲਾਇੰਟ ਫੋਲਡਰ ਬਣਾਓ (+ Create Folder)</span>
              </button>
            </div>

            {/* Folder Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {folders.map((folder) => {
                const isPassVisible = showPasswords[folder.id];
                const isJustCopied = copiedId === folder.id;

                return (
                  <div
                    key={folder.id}
                    className="admin-folder-card bg-[#202023]/80 border border-[#35332F] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#C6A76A]/40 transition"
                  >
                    {/* Cover Image & Quick Badge */}
                    <div className="relative h-48 bg-[#0B0B0D] overflow-hidden">
                      <img
                        src={folder.coverImage}
                        alt={folder.clientName}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          // Fallback placeholder
                          (e.target as any).src = DEFAULT_PHOTOS.hero;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-[#0B0B0D]/80 backdrop-blur-md border border-[#C6A76A]/40 text-[#F5F0E8] font-mono text-xs font-bold">
                          {folder.clientId}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-[10px] font-medium">
                          Active Vault
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1">
                        <button
                          onClick={() => openEditFolderModal(folder)}
                          className="p-1.5 rounded-md bg-[#0B0B0D]/80 border border-[#35332F] text-[#B8B5AF] hover:text-[#C6A76A] transition"
                          title="Edit Folder"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFolder(folder.id)}
                          className="p-1.5 rounded-md bg-[#0B0B0D]/80 border border-red-800/80 text-red-300 hover:bg-red-950 transition"
                          title="Delete Folder"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-lg font-serif font-bold text-white leading-tight">
                          {folder.clientName}
                        </h4>
                        <p className="text-xs text-[#B8B5AF] font-light mt-0.5">
                          {folder.eventTitle}
                        </p>
                      </div>
                    </div>

                    {/* Details Body */}
                    <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2 text-xs text-[#B8B5AF]">
                        <div className="flex items-center justify-between py-1 border-b border-[#35332F]/70">
                          <span className="text-[#B8B5AF]">ਤਰੀਕ (Event Date):</span>
                          <span className="font-medium text-[#F5F0E8]">{folder.eventDate}</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-[#35332F]/70">
                          <span className="text-[#B8B5AF]">ਥਾਂ (Location):</span>
                          <span className="font-medium text-[#F5F0E8]">{folder.location}</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-[#35332F]/70">
                          <span className="text-[#B8B5AF]">ਫੋਟੋਆਂ (Photos):</span>
                          <span className="font-mono text-[#C6A76A] font-semibold">
                            {folder.photos.length} Photos Uploaded
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-[#35332F]/70">
                          <span className="text-[#B8B5AF]">ਚੁਣੀਆਂ ਫੋਟੋਆਂ (Client Selected):</span>
                          <span className="font-mono text-emerald-400 font-bold">
                            {(folder.selectedPhotos || []).length} Selected in Folder
                          </span>
                        </div>

                        {/* Client Selected Photos Folder Box (For Studio Owner Access & Download) */}
                        <div className="bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-700/50 flex items-center justify-between gap-2 mt-2">
                          <div className="flex items-center gap-2">
                            <Folder className="w-4 h-4 text-emerald-400 shrink-0" />
                            <div>
                              <span className="block text-[11px] font-bold text-emerald-300">
                                ਕਲਾਇੰਟ Selected Pics ਫੋਲਡਰ ({(folder.selectedPhotos || []).length})
                              </span>
                              <span className="block text-[10px] text-[#B8B5AF]">
                                ਕਲਾਇੰਟ ਵੱਲੋਂ ਸਿਲੈਕਟ ਕੀਤੀਆਂ ਫੋਟੋਆਂ ਡਾਊਨਲੋਡ ਕਰੋ
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setViewingSelectedFolder(folder)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shrink-0 shadow transition"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>ਖੋਲ੍ਹੋ ਤੇ ਡਾਊਨਲੋਡ</span>
                          </button>
                        </div>

                        {/* Password Box */}
                        <div className="bg-[#0B0B0D] p-2.5 rounded-xl border border-[#35332F] flex items-center justify-between mt-2">
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider text-[#B8B5AF]">
                              ਗੁਪਤ ਪਾਸਵਰਡ (Client Password)
                            </span>
                            <span className="font-mono text-sm font-semibold text-[#C6A76A]">
                              {isPassVisible ? folder.password : "••••••••••••"}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                [folder.id]: !prev[folder.id],
                              }))
                            }
                            className="p-1.5 text-[#B8B5AF] hover:text-[#F5F0E8] rounded"
                          >
                            {isPassVisible ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Photo Preview Mini Strip */}
                      <div className="flex items-center gap-1.5 overflow-x-auto py-2">
                        {folder.photos.slice(0, 5).map((p, pIdx) => (
                          <img
                            key={pIdx}
                            src={p}
                            alt=""
                            className="w-12 h-12 object-cover rounded-md border border-[#35332F] shrink-0"
                            onError={(e) => {
                              (e.target as any).src = DEFAULT_PHOTOS.hero;
                            }}
                          />
                        ))}
                        {folder.photos.length > 5 && (
                          <div className="w-12 h-12 rounded-md bg-[#0B0B0D] border border-[#35332F] flex items-center justify-center text-[10px] text-[#B8B5AF] font-mono shrink-0">
                            +{folder.photos.length - 5}
                          </div>
                        )}
                      </div>

                      {/* Action Share Buttons */}
                      <div className="pt-2 border-t border-[#35332F] flex gap-2">
                        <button
                          onClick={() => copyCredentials(folder)}
                          className="flex-1 py-2 px-3 rounded-lg bg-[#171719] hover:bg-[#C6A76A] hover:text-[#0B0B0D] text-[#F5F0E8] text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                        >
                          {isJustCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>ਕਾਪੀ ਹੋ ਗਿਆ! (Copied)</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>ID ਤੇ ਪਾਸਵਰਡ ਕਾਪੀ ਕਰੋ</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                            `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਜੀ! Pictorial Photography Studio ਵਲੋਂ ਤੁਹਾਡੀ ਵੈੱਡਿੰਗ ਗੈਲਰੀ ਦਾ ਲਿੰਕ:\n\n🌐 ਵੈੱਬਸਾਈਟ: https://pictorialphotography.in/#client-gallery\n🔑 Client ID: ${folder.clientId}\n🔒 Password: ${folder.password}\n\nਧੰਨਵਾਦ! Pictorial Photography Studio, Mansa`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 transition"
                          title="Share to Client on WhatsApp"
                        >
                          <Share2 className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="admin-section-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#202023]/90 border border-[#35332F] p-4 sm:p-5 rounded-2xl">
              <div>
                <h2 className="text-xl font-serif text-[#F5F0E8] font-bold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#C6A76A]" />
                  <span>ਵੈੱਬਸਾਈਟ ਲੀਡਜ਼ ਤੇ ਪੁੱਛਗਿੱਛਾਂ (Website Inquiries & Leads)</span>
                </h2>
                <p className="text-xs text-[#B8B5AF] mt-1">
                  ਜਿਨ੍ਹਾਂ ਗ੍ਰਾਹਕਾਂ ਨੇ ਮੁੱਖ ਵੈੱਬਸਾਈਟ ਰਾਹੀਂ ਫੋਟੋਸ਼ੂਟ ਜਾਂ ਵੈੱਡਿੰਗ ਲਈ ਪੁੱਛਗਿੱਛ ਭੇਜੀ ਹੈ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiries.length === 0 ? (
                <div className="col-span-2 text-center py-16 bg-[#202023]/40 rounded-2xl border border-[#35332F]">
                  <MessageCircle className="w-12 h-12 text-stone-600 mx-auto mb-2" />
                  <p className="text-[#B8B5AF] font-medium">ਕੋਈ ਨਵੀਂ ਇਨਕੁਆਰੀ ਨਹੀਂ ਹੈ</p>
                  <p className="text-xs text-[#B8B5AF] mt-1">No new inquiries right now.</p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="admin-inquiry-card p-5 rounded-2xl bg-[#202023]/90 border border-[#35332F] space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                          {inq.status} Lead
                        </span>
                        <h4 className="text-base font-serif font-bold text-[#F5F0E8] mt-2">
                          {inq.name}
                        </h4>
                        <p className="text-xs text-[#B8B5AF]">{inq.phone}</p>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm("ਕੀ ਤੁਸੀਂ ਇਹ ਇਨਕੁਆਰੀ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?")) {
                            deleteStudioInquiry(inq.id);
                            loadData();
                          }
                        }}
                        className="p-1.5 hover:bg-red-950 text-[#B8B5AF] hover:text-red-400 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-[#0B0B0D]/80 p-3 rounded-xl border border-[#35332F]/80 text-xs text-[#B8B5AF] space-y-1">
                      <div className="flex items-center justify-between text-[#B8B5AF] text-[11px]">
                        <span>ਪ੍ਰੋਗਰਾਮ: <strong className="text-[#F5F0E8]">{inq.eventType}</strong></span>
                        <span>ਤਰੀਕ: <strong className="text-[#F5F0E8]">{inq.eventDate}</strong></span>
                      </div>
                      <p className="mt-2 text-[#B8B5AF] italic">"{inq.message}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] text-[#B8B5AF] font-mono">
                        ਦਰਜ: {inq.createdAt}
                      </span>
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ${inq.name} ਜੀ! Pictorial Photography Studio, Mansa ਵਲੋਂ ਤੁਹਾਡੀ ਇਨਕੁਆਰੀ ਸਬੰਧੀ ਸੁਨੇਹਾ।`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-medium rounded-lg flex items-center gap-1.5 transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp ਤੇ ਜਵਾਬ ਦਿਓ</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* ---------------------------------------------------- */}
      {/* MODAL: ADD / EDIT BOOKING */}
      {/* ---------------------------------------------------- */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="admin-modal bg-[#202023] border border-[#35332F] w-full max-w-xl rounded-2xl shadow-2xl p-6 relative my-8">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[#B8B5AF] hover:text-[#F5F0E8] rounded-lg bg-[#171719]/60 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-serif font-bold text-[#F5F0E8] mb-1">
              {editingBooking ? "ਬੁਕਿੰਗ ਐਡਿਟ ਕਰੋ (Edit Booking)" : "ਨਵੀਂ ਬੁਕਿੰਗ ਸ਼ਡਿਊਲ ਕਰੋ (Schedule New Shoot)"}
            </h3>
            <p className="text-xs text-[#B8B5AF] mb-6">
              ਕਲਾਇੰਟ, ਪ੍ਰੋਗਰਾਮ ਦੀ ਤਰੀਕ, ਥਾਂ ਅਤੇ ਪੇਮੈਂਟ ਵੇਰਵੇ ਭਰੋ
            </p>

            <form onSubmit={handleSaveBooking} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਕਲਾਇੰਟ ਦਾ ਨਾਮ (Client Name) *</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.clientName || ""}
                    onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                    placeholder="e.g. Harpreet Singh & Simran Kaur"
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਫੋਨ / WhatsApp ਨੰਬਰ *</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.phone || ""}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਪ੍ਰੋਗਰਾਮ (Event Type)</label>
                  <select
                    value={bookingForm.eventType || "Anand Karaj"}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventType: e.target.value as any })}
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  >
                    <option value="Anand Karaj">ਅਨੰਦ ਕਾਰਜ (Anand Karaj)</option>
                    <option value="Pre-Wedding">ਪ੍ਰੀ-ਵੈੱਡਿੰਗ (Pre-Wedding)</option>
                    <option value="Ring Ceremony">ਰਿੰਗ ਸੈਰੇਮਨੀ (Ring Ceremony)</option>
                    <option value="Reception">ਰਿਸੈਪਸ਼ਨ (Reception)</option>
                    <option value="Bridal Shoot">ਬ੍ਰਾਈਡਲ ਸ਼ੂਟ (Bridal Shoot)</option>
                    <option value="Birthday">ਬਰਥਡੇ (Birthday Party)</option>
                    <option value="Commercial">ਕਮਰਸ਼ੀਅਲ (Commercial)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਤਰੀਕ (Event Date) *</label>
                  <input
                    type="date"
                    required
                    value={bookingForm.eventDate || ""}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਸਮਾਂ (Event Time)</label>
                  <input
                    type="text"
                    value={bookingForm.eventTime || ""}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventTime: e.target.value })}
                    placeholder="10:00 AM"
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਥਾਂ / ਪੈਲੇਸ (Venue & Address)</label>
                  <input
                    type="text"
                    value={bookingForm.venue || ""}
                    onChange={(e) => setBookingForm({ ...bookingForm, venue: e.target.value })}
                    placeholder="Mansa Royal Palace, Mansa"
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਪੈਕੇਜ (Selected Package)</label>
                  <input
                    type="text"
                    value={bookingForm.package || ""}
                    onChange={(e) => setBookingForm({ ...bookingForm, package: e.target.value })}
                    placeholder="Royal Wedding Signature 4K"
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  />
                </div>
              </div>

              {/* Financial calculations */}
              <div className="p-3.5 bg-[#0B0B0D] rounded-xl border border-[#35332F] space-y-3">
                <p className="font-semibold text-[#F5F0E8]">ਪੇਮੈਂਟ ਵੇਰਵੇ (Financials)</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#B8B5AF] mb-1">ਕੁੱਲ ਰਕਮ (Total ₹)</label>
                    <input
                      type="number"
                      value={bookingForm.totalAmount ?? 0}
                      onChange={(e) => {
                        const total = Number(e.target.value);
                        const adv = Number(bookingForm.advancePaid ?? 0);
                        setBookingForm({
                          ...bookingForm,
                          totalAmount: total,
                          balanceDue: Math.max(0, total - adv),
                        });
                      }}
                      className="w-full bg-[#202023] border border-[#35332F] rounded px-2.5 py-1.5 text-[#F5F0E8] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-400 mb-1">ਐਡਵਾਂਸ ਦਿੱਤਾ (Advance ₹)</label>
                    <input
                      type="number"
                      value={bookingForm.advancePaid ?? 0}
                      onChange={(e) => {
                        const adv = Number(e.target.value);
                        const total = Number(bookingForm.totalAmount ?? 0);
                        setBookingForm({
                          ...bookingForm,
                          advancePaid: adv,
                          balanceDue: Math.max(0, total - adv),
                        });
                      }}
                      className="w-full bg-[#202023] border border-[#35332F] rounded px-2.5 py-1.5 text-emerald-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-400 mb-1">ਬਾਕੀ ਬਕਾਇਆ (Balance ₹)</label>
                    <div className="w-full bg-[#202023]/60 border border-amber-900/60 rounded px-2.5 py-1.5 text-amber-300 font-bold">
                      ₹{(Number(bookingForm.totalAmount ?? 0) - Number(bookingForm.advancePaid ?? 0)).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#B8B5AF] font-medium mb-1">ਟੀਮ ਤੇ ਕੈਮਰਾਮੈਨ (Crew Assigned)</label>
                <input
                  type="text"
                  value={bookingForm.crew || ""}
                  onChange={(e) => setBookingForm({ ...bookingForm, crew: e.target.value })}
                  placeholder="2 Candid Photographers + 2 Cinematographers + 1 Drone Pilot"
                  className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#B8B5AF] font-medium mb-1">ਵਿਸ਼ੇਸ਼ ਨੋਟ (Special Notes)</label>
                <textarea
                  rows={2}
                  value={bookingForm.notes || ""}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  placeholder="e.g. Anand Karaj starts early morning, evening reception in main hall"
                  className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#35332F]">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 bg-[#171719] hover:bg-stone-700 text-[#F5F0E8] rounded-lg font-medium transition"
                >
                  ਰੱਦ ਕਰੋ (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-bold rounded-lg transition shadow-md"
                >
                  ਸੇਵ ਕਰੋ (Save Booking)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: CREATE / EDIT CLIENT FOLDER */}
      {/* ---------------------------------------------------- */}
      {isFolderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#202023] border border-[#35332F] w-full max-w-xl rounded-2xl shadow-2xl p-6 relative my-8">
            <button
              onClick={() => setIsFolderModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[#B8B5AF] hover:text-[#F5F0E8] rounded-lg bg-[#171719]/60 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-serif font-bold text-[#F5F0E8] mb-1">
              {editingFolder ? "ਕਲਾਇੰਟ ਫੋਲਡਰ ਐਡਿਟ ਕਰੋ (Edit Client Folder)" : "ਨਵਾਂ ਕਲਾਇੰਟ ਫੋਲਡਰ ਬਣਾਓ (Create Client Vault)"}
            </h3>
            <p className="text-xs text-[#B8B5AF] mb-6">
              ਕਲਾਇੰਟ ਲਈ ਆਪਣੀ ਮਰਜ਼ੀ ਦਾ Client ID ਅਤੇ ਗੁਪਤ Password ਬਣਾਓ ਅਤੇ ਫੋਟੋਆਂ ਸ਼ਾਮਲ ਕਰੋ
            </p>

            <form onSubmit={handleSaveFolder} className="space-y-4 text-xs">
              {/* Credentials Section */}
              <div className="p-4 bg-[#0B0B0D] rounded-xl border border-[#C6A76A]/40 space-y-3">
                <p className="font-semibold text-[#C6A76A] flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  <span>ਕਲਾਇੰਟ ਲੌਗਇਨ ਵੇਰਵੇ (Client Login Credentials)</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#B8B5AF] font-medium mb-1">
                      Client ID (e.g. PIC-2026-085) *
                    </label>
                    <input
                      type="text"
                      required
                      value={folderForm.clientId || ""}
                      onChange={(e) => setFolderForm({ ...folderForm, clientId: e.target.value.toUpperCase() })}
                      placeholder="PIC-2026-085"
                      className="w-full bg-[#202023] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] font-mono font-bold focus:border-[#C6A76A] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#B8B5AF] font-medium mb-1">
                      Private Password (ਗੁਪਤ ਪਾਸਵਰਡ) *
                    </label>
                    <input
                      type="text"
                      required
                      value={folderForm.password || ""}
                      onChange={(e) => setFolderForm({ ...folderForm, password: e.target.value })}
                      placeholder="e.g. simran@2026"
                      className="w-full bg-[#202023] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] font-mono focus:border-[#C6A76A] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Client & Event Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਕਲਾਇੰਟ ਦਾ ਨਾਮ (Client Name) *</label>
                  <input
                    type="text"
                    required
                    value={folderForm.clientName || ""}
                    onChange={(e) => setFolderForm({ ...folderForm, clientName: e.target.value })}
                    placeholder="Harpreet & Simran Kaur"
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਪ੍ਰੋਗਰਾਮ ਟਾਈਟਲ (Event Title)</label>
                  <input
                    type="text"
                    value={folderForm.eventTitle || ""}
                    onChange={(e) => setFolderForm({ ...folderForm, eventTitle: e.target.value })}
                    placeholder="Royal Anand Karaj & Reception"
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਤਰੀਕ (Date Display)</label>
                  <input
                    type="text"
                    value={folderForm.eventDate || ""}
                    onChange={(e) => setFolderForm({ ...folderForm, eventDate: e.target.value })}
                    placeholder="November 14, 2026"
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#B8B5AF] font-medium mb-1">ਸ਼ਹਿਰ / ਥਾਂ (Location)</label>
                  <input
                    type="text"
                    value={folderForm.location || ""}
                    onChange={(e) => setFolderForm({ ...folderForm, location: e.target.value })}
                    placeholder="Mansa, Punjab"
                    className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] focus:border-[#C6A76A] outline-none"
                  />
                </div>
              </div>

              {/* Photos Management */}
              <div className="p-3.5 bg-[#0B0B0D] rounded-xl border border-[#35332F] space-y-3">
                <p className="font-semibold text-[#F5F0E8] flex items-center justify-between">
                  <span>ਫੋਟੋਆਂ ਸ਼ਾਮਲ ਕਰੋ (Photos in this Folder - {folderForm.photos?.length || 0})</span>
                  <span className="text-[11px] text-[#B8B5AF] font-normal">ਫੋਨ ਗੈਲਰੀ / ਕੰਪਿਊਟਰ ਜਾਂ ਲਿੰਕ</span>
                </p>

                {/* Hidden File Input for Phone Gallery & PC File Explorer */}
                <input
                  ref={photoFileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleDevicePhotosSelected}
                />

                {/* Direct Upload Button from Phone Gallery / PC */}
                <button
                  type="button"
                  onClick={() => photoFileInputRef.current?.click()}
                  disabled={isUploadingPhotos}
                  className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#C6A76A] bg-[#C6A76A]/15 hover:bg-[#C6A76A] text-[#C6A76A] hover:text-[#0B0B0D] font-semibold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>
                    {isUploadingPhotos
                      ? "ਫੋਟੋਆਂ ਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ... (Uploading Photos...)"
                      : "📷 ਫੋਨ ਗੈਲਰੀ ਜਾਂ ਕੰਪਿਊਟਰ ਵਿੱਚੋਂ ਫੋਟੋਆਂ ਚੁਣੋ (+ Select from Phone / PC)"}
                  </span>
                </button>

                {/* Add Photo Input (or click + ਸ਼ਾਮਲ ਕਰੋ to open Gallery/Files) */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="ਜਾਂ ਫੋਟੋ ਲਿੰਕ ਪੇਸਟ ਕਰੋ (Or paste image URL / click + ਸ਼ਾਮਲ ਕਰੋ)"
                    className="flex-1 bg-[#202023] border border-[#35332F] rounded-lg px-3 py-2 text-[#F5F0E8] text-xs outline-none focus:border-[#C6A76A]"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhotoToForm}
                    className="px-3 py-2 bg-[#171719] hover:bg-[#C6A76A] hover:text-[#0B0B0D] text-[#F5F0E8] rounded-lg font-medium transition shrink-0"
                  >
                    + ਸ਼ਾਮਲ ਕਰੋ
                  </button>
                </div>

                {/* Preset Studio Photos Picker */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] text-[#B8B5AF]">ਸਟੂਡੀਓ ਨਮੂਨੇ:</span>
                  {[
                    { label: "Hero Wedding", url: DEFAULT_PHOTOS.hero },
                    { label: "Bridal", url: DEFAULT_PHOTOS.bride },
                    { label: "Pre-Wedding", url: DEFAULT_PHOTOS.prewedding },
                    { label: "Cinema", url: DEFAULT_PHOTOS.cinema },
                    { label: "Ring", url: DEFAULT_PHOTOS.ring },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        const current = folderForm.photos || [];
                        if (!current.includes(preset.url)) {
                          setFolderForm({
                            ...folderForm,
                            photos: [...current, preset.url],
                          });
                        }
                      }}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#202023] border border-[#35332F] text-[#B8B5AF] hover:border-[#C6A76A] transition"
                    >
                      +{preset.label}
                    </button>
                  ))}
                </div>

                {/* Current Photos list */}
                <div className="flex items-center gap-2 overflow-x-auto py-2">
                  {(folderForm.photos || []).map((photo, pIdx) => (
                    <div key={pIdx} className="relative group shrink-0">
                      <img
                        src={photo}
                        alt=""
                        className="w-16 h-16 object-cover rounded-lg border border-[#35332F]"
                        onError={(e) => {
                          (e.target as any).src = DEFAULT_PHOTOS.hero;
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhotoFromForm(pIdx)}
                        className="absolute -top-1.5 -right-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full p-0.5 shadow transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download toggle */}
              <div className="flex items-center justify-between p-3 bg-[#0B0B0D] rounded-xl border border-[#35332F]">
                <div>
                  <span className="font-semibold text-[#F5F0E8] block">ਕਲਾਇੰਟ ਡਾਊਨਲੋਡ ਦੀ ਇਜਾਜ਼ਤ (Allow Downloads)</span>
                  <span className="text-[#B8B5AF] text-[11px]">
                    ਗ੍ਰਾਹਕ ਆਪਣੀ ਗੈਲਰੀ ਵਿੱਚੋਂ ਫੁੱਲ ਰੈਜ਼ੋਲੂਸ਼ਨ ਫੋਟੋਆਂ ਡਾਊਨਲੋਡ ਕਰ ਸਕੇਗਾ
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={folderForm.canDownload ?? true}
                  onChange={(e) => setFolderForm({ ...folderForm, canDownload: e.target.checked })}
                  className="w-4 h-4 accent-[#C6A76A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#35332F]">
                <button
                  type="button"
                  onClick={() => setIsFolderModalOpen(false)}
                  className="px-4 py-2 bg-[#171719] hover:bg-stone-700 text-[#F5F0E8] rounded-lg font-medium transition"
                >
                  ਰੱਦ ਕਰੋ (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-bold rounded-lg transition shadow-md"
                >
                  ਫੋਲਡਰ ਸੇਵ ਕਰੋ (Save Folder)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CLIENT SELECTED PHOTOS FOLDER (STUDIO OWNER ACCESS & DOWNLOAD) */}
      {viewingSelectedFolder && (
        <div className="fixed inset-0 z-50 bg-[#0B0B0D]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="admin-modal bg-[#202023] border border-[#35332F] rounded-2xl max-w-4xl w-full p-6 shadow-2xl my-8 max-h-[90vh] flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#35332F]">
              <div>
                <div className="flex items-center gap-2">
                  <Folder className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-serif font-bold text-[#F5F0E8]">
                    ਕਲਾਇੰਟ ਵੱਲੋਂ ਚੁਣੀਆਂ ਫੋਟੋਆਂ ਦਾ ਫੋਲਡਰ (Client Selected Photos Folder)
                  </h3>
                </div>
                <p className="text-xs text-[#B8B5AF] mt-1">
                  {viewingSelectedFolder.clientName} ({viewingSelectedFolder.clientId}) •{" "}
                  <span className="text-emerald-400 font-semibold">
                    {(viewingSelectedFolder.selectedPhotos || []).length} Photos Selected
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                {(viewingSelectedFolder.selectedPhotos || []).length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      const selectedList = viewingSelectedFolder.selectedPhotos || [];
                      selectedList.forEach((photoUrl, idx) => {
                        setTimeout(() => {
                          downloadStudioPhoto(
                            photoUrl,
                            `${viewingSelectedFolder.clientId}-selected-${idx + 1}.jpg`
                          );
                        }, idx * 300);
                      });
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>ਸਾਰੀਆਂ ਡਾਊਨਲੋਡ ਕਰੋ (Download All Selected)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setViewingSelectedFolder(null)}
                  className="p-2 rounded-lg bg-[#171719] text-[#B8B5AF] hover:text-[#F5F0E8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="py-5 overflow-y-auto flex-1">
              {(viewingSelectedFolder.selectedPhotos || []).length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Folder className="w-10 h-10 text-[#B8B5AF] mx-auto opacity-60" />
                  <p className="text-sm font-semibold text-[#F5F0E8]">
                    ਇਸ ਕਲਾਇੰਟ ਨੇ ਹਜੇ ਕੋਈ ਫੋਟੋ ਸਿਲੈਕਟ ਨਹੀਂ ਕੀਤੀ ਹੈ (No photos selected by client yet)
                  </p>
                  <p className="text-xs text-[#B8B5AF] max-w-md mx-auto">
                    ਜਦੋਂ ਕਲਾਇੰਟ ਆਪਣੀ Client Gallery ਵਿੱਚ ਲੌਗਇਨ ਕਰਕੇ ਫੋਟੋਆਂ ਉੱਪਰ "+ Select Photo" ਦਬਾਏਗਾ, ਉਹ ਸਾਰੀਆਂ ਫੋਟੋਆਂ ਆਪਣੇ-ਆਪ ਇਸ ਫੋਲਡਰ ਵਿੱਚ ਆ ਜਾਣਗੀਆਂ।
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {(viewingSelectedFolder.selectedPhotos || []).map((photoUrl, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl overflow-hidden bg-[#0B0B0D] border border-[#35332F] flex flex-col"
                    >
                      <div className="aspect-[4/5] w-full overflow-hidden bg-[#141416]">
                        <img
                          src={photoUrl}
                          alt={`Selected ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          onError={(e) => {
                            (e.target as any).src = DEFAULT_PHOTOS.hero;
                          }}
                        />
                      </div>
                      <div className="p-2.5 flex items-center justify-between gap-2 bg-[#171719] border-t border-[#35332F]">
                        <span className="text-[11px] font-mono text-[#B8B5AF]">
                          Selected #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            downloadStudioPhoto(
                              photoUrl,
                              `${viewingSelectedFolder.clientId}-selected-${idx + 1}.jpg`
                            )
                          }
                          className="px-2.5 py-1 rounded bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] text-[11px] font-bold flex items-center gap-1 transition"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
