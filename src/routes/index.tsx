import { createFileRoute, Link } from "@tanstack/react-router";
import {
  authenticateClientGallery,
  addStudioInquiry,
  type ClientGalleryFolder,
} from "@/lib/studio-store";
import { useState, useEffect } from "react";
import {
  Camera,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Play,
  Calendar,
  Users,
  Award,
  ShieldCheck,
  Heart,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Menu,
  X,
  ChevronLeft, ChevronRight, Layers, Film, Grid, Sliders,
  Lock,
  ExternalLink,
  CheckCircle2,
  Star,
  Quote,
  Sun,
  Moon,
  Download,
  ZoomIn,
  Share2,
  LogOut,
  Key,
} from "lucide-react";

import heroImg from "@/assets/golden-embrace-hero.png";
import brideImg from "@/assets/bride.jpg";
import preweddingImg from "@/assets/prewedding.jpg";
import ringImg from "@/assets/ring.jpg";
import cinemaImg from "@/assets/cinema.jpg";
import editingImg from "@/assets/editing.jpg";
import birthdayImg from "@/assets/birthday.jpg";
import albumImg from "@/assets/album.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE_NUMBER = "+919700598098";
const WHATSAPP_URL = `https://wa.me/919700598098?text=${encodeURIComponent(
  "Hello Pictorial Photography! I would like to inquire about booking a shoot for an upcoming event."
)}`;

function StudioLogo({ size = "default" }: { size?: "default" | "large" }) {
  const isLarge = size === "large";
  return (
    <a href="#" className="group flex items-center gap-3.5 transition-all">
      {/* Luxury Golden Camera & Aperture Crest */}
      <div className="relative shrink-0">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C6A46A]/20 via-[#FFE29A]/30 to-[#9E782F]/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div
          className={`relative rounded-full bg-gradient-to-b from-[#1C1811] to-[#0A0A0A] p-0.5 border border-[#C6A46A]/60 shadow-[0_4px_16px_rgba(0,0,0,0.8)] group-hover:border-[#FFE29A] transition-all duration-300 ${
            isLarge ? "w-14 h-14" : "w-11 h-11 sm:w-12 sm:h-12"
          } flex items-center justify-center`}
        >
          {/* Inner ring & Camera Aperture SVG */}
          <svg
            className="w-full h-full p-1.5"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF4D0" />
                <stop offset="50%" stopColor="#C6A76A" />
                <stop offset="100%" stopColor="#8F6A24" />
              </linearGradient>
              <linearGradient id="goldRadial" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C6A46A" />
                <stop offset="50%" stopColor="#FFF0C8" />
                <stop offset="100%" stopColor="#8A631B" />
              </linearGradient>
            </defs>

            {/* Fine outer luxury bezel */}
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="url(#goldRadial)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.8"
            />
            <circle cx="50" cy="50" r="42" stroke="url(#goldShine)" strokeWidth="1.5" />
            <circle
              cx="50"
              cy="50"
              r="38"
              stroke="url(#goldRadial)"
              strokeWidth="0.8"
              opacity="0.6"
            />

            {/* Aperture blades */}
            <path
              d="M50 20 L68 38"
              stroke="url(#goldShine)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M68 38 L68 62"
              stroke="url(#goldShine)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M68 62 L50 80"
              stroke="url(#goldShine)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M50 80 L32 62"
              stroke="url(#goldShine)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M32 62 L32 38"
              stroke="url(#goldShine)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M32 38 L50 20"
              stroke="url(#goldShine)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Camera Lens Core */}
            <circle
              cx="50"
              cy="50"
              r="14"
              fill="#0B0B0B"
              stroke="url(#goldShine)"
              strokeWidth="1.5"
            />
            <circle cx="50" cy="50" r="8" fill="url(#goldShine)" />
            <circle cx="47" cy="47" r="2.5" fill="#FFFFFF" opacity="0.9" />

            {/* Top Star Sparkle */}
            <polygon
              points="50,2 52,9 58,11 52,13 50,20 48,13 42,11 48,9"
              fill="url(#goldShine)"
            />
          </svg>
        </div>
      </div>

      {/* Typography Block */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={`studio-logo-title font-cinzel tracking-[0.14em] sm:tracking-[0.18em] font-bold leading-none transition-all duration-300 ${
              isLarge ? "text-2xl sm:text-3xl" : "text-sm sm:text-base md:text-lg lg:text-xl"
            }`}
          >
            PICTORIAL PHOTOGRAPHY
          </span>
        </div>

        {/* Subline with Gold Diamond Accents */}
        <div className="studio-logo-subline flex items-center gap-1.5 mt-1 font-cinzel">
          <span className="w-3 h-px bg-gradient-to-r from-transparent to-[#C6A76A]" />
          <span className="text-[8px] sm:text-[9px] tracking-[0.28em] text-[#C6A76A] font-semibold uppercase leading-none">
            CINEMATIC FILMS
          </span>
          <span className="text-[7px] text-[#E0C58F]">✦</span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.28em] text-[#C6A76A] font-semibold uppercase leading-none">
            MANSA
          </span>
          <span className="w-3 h-px bg-gradient-to-l from-transparent to-[#C6A76A]" />
        </div>
      </div>
    </a>
  );
}

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Black and White Theme State
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [portfolioMode, setPortfolioMode] = useState<"hub" | "marriages" | "cinematic" | "prewedding" | "bridal" | "engagements">("hub");
  const [weddingSlideIndex, setWeddingSlideIndex] = useState(0);
  const [activeCinemaModal, setActiveCinemaModal] = useState<null | {
    title: string;
    subtitle: string;
    desc: string;
    duration: string;
    resolution: string;
    audio: string;
    cover: string;
  }>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [selectedServiceModal, setSelectedServiceModal] = useState<null | {
    title: string;
    category?: string;
    desc: string;
    img: string;
    deliverables: string[];
    whatsappMsg: string;
  }>(null);
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    title: string;
    category: string;
    description: string;
  }>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Client Gallery Authentication & Vault State
  const [clientIdInput, setClientIdInput] = useState("");
  const [clientPasswordInput, setClientPasswordInput] = useState("");
  const [clientAuthError, setClientAuthError] = useState("");
  const [unlockedGallery, setUnlockedGallery] = useState<ClientGalleryFolder | null>(null);
  const [activeGalleryLightboxImg, setActiveGalleryLightboxImg] = useState<string | null>(null);

  const handleClientGalleryLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setClientAuthError("");
    if (!clientIdInput.trim() || !clientPasswordInput.trim()) {
      setClientAuthError("ਕਿਰਪਾ ਕਰਕੇ Client ID ਅਤੇ Password ਦੋਵੇਂ ਦਰਜ ਕਰੋ। (Please enter both ID & password)");
      return;
    }
    const folder = authenticateClientGallery(clientIdInput, clientPasswordInput);
    if (folder) {
      setUnlockedGallery(folder);
      setClientAuthError("");
    } else {
      setClientAuthError(
        "ਗਲਤ Client ID ਜਾਂ Password। ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ID/ਪਾਸਵਰਡ ਭਰੋ ਜਾਂ ਸਟੂਡੀਓ ਨਾਲ ਸੰਪਰਕ ਕਰੋ (+91 97005 98098)"
      );
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "Wedding",
    eventDate: "",
    message: "",
  });

  const portfolioItems = [
    {
      id: 1,
      src: heroImg,
      title: "Golden Garden Wedding Embrace",
      category: "wedding",
      tag: "Wedding",
      description: "Majestic Sikh wedding traditions, royal crimson lehenga, and sunset romance captured in Mansa, Punjab.",
    },
    {
      id: 2,
      src: brideImg,
      title: "Regal Bridal Portrait",
      category: "portraits",
      tag: "Bridal",
      description: "Intimate bridal elegance highlighting traditional jewelry and timeless emotion.",
    },
    {
      id: 3,
      src: preweddingImg,
      title: "Sunset Pre-Wedding Romance",
      category: "prewedding",
      tag: "Pre-Wedding",
      description: "Warm golden-hour shoot crafted with dreamy outdoor light and authentic smiles.",
    },
    {
      id: 4,
      src: ringImg,
      title: "Ring Ceremony & Engagement",
      category: "events",
      tag: "Engagement",
      description: "Capturing the sacred moment of promises, joy, and family togetherness.",
    },
    {
      id: 5,
      src: cinemaImg,
      title: "Cinematic Cinema Production",
      category: "cinematic",
      tag: "Films",
      description: "High-end 4K cinema gear and drone cinematography for full-length wedding films.",
    },
    {
      id: 6,
      src: albumImg,
      title: "Handcrafted Heirloom Albums",
      category: "wedding",
      tag: "Albums",
      description: "Fine-art leatherbound printed albums designed to last across generations.",
    },
    {
      id: 7,
      src: editingImg,
      title: "Master Color Grading Suite",
      category: "cinematic",
      tag: "Post-Production",
      description: "Every photo and film frame meticulously color graded for cinematic warmth.",
    },
    {
      id: 8,
      src: birthdayImg,
      title: "Milestone Birthday Celebration",
      category: "events",
      tag: "Celebration",
      description: "Candid joy, cake ceremonies, and festive family reunions preserved forever.",
    },
  ];

  
  // Freya-Inspired Editorial Portfolio Collections & Templates
  const weddingSlides = [
    {
      slideNumber: "01",
      subtitle: "The Royal Anand Karaj & Crimson Elegance",
      photos: [
        { src: heroImg, title: "Royal Crimson Lehenga Entrance", tag: "Ceremony", subtitle: "Traditional Golden Embroidery" },
        { src: brideImg, title: "Sacred Floral Mandap & Vows", tag: "Sacred Vows", subtitle: "Family Blessings & Joy" },
        { src: preweddingImg, title: "Sunset Garden Palace Embrace", tag: "Golden Hour", subtitle: "Mansa Royal Heritage" },
      ],
    },
    {
      slideNumber: "02",
      subtitle: "Grandeur Sangeet & Joyous Celebrations",
      photos: [
        { src: ringImg, title: "The Sacred Ring Exchange", tag: "Engagement", subtitle: "Promises Forever" },
        { src: heroImg, title: "The Majestic Sunset Vows", tag: "Anand Karaj", subtitle: "Sacred Lavaan Pheras" },
        { src: brideImg, title: "Heirloom Antique Kundan Jewelry", tag: "Details", subtitle: "Candid Emotional Tear" },
      ],
    },
    {
      slideNumber: "03",
      subtitle: "Handcrafted Heirlooms & Legacy Prints",
      photos: [
        { src: albumImg, title: "Italian Leather Bound Album", tag: "Heirloom", subtitle: "Gold Embossed Archival Prints" },
        { src: editingImg, title: "Master Studio Color Science Suite", tag: "Post-Production", subtitle: "Cinematic Warm Grading" },
        { src: cinemaImg, title: "Sony FX3 4K Cinema Production", tag: "4K Motion", subtitle: "Ultra-HD Drone Aerials" },
      ],
    },
  ];

  const preweddingDuo = [
    {
      src: preweddingImg,
      title: "Golden Hour Field Romance",
      location: "Mansa, Punjab",
      tag: "Sunset Romance",
      quote: "Captured in the warm mustard sunset, where pure emotion meets timeless love.",
    },
    {
      src: heroImg,
      title: "Palace Courtyard Embrace",
      location: "Royal Destination Heritage",
      tag: "Editorial Couple",
      quote: "A quiet, candid heartbeat shared amidst the grand celebrations.",
    },
  ];

  const tiledGalleryItems = [
    { src: ringImg, title: "The Diamond Ring Ceremony", tag: "Engagement", aspect: "aspect-[4/5]" },
    { src: heroImg, title: "Royal Anand Karaj Embrace", tag: "Wedding", aspect: "aspect-[3/4]" },
    { src: brideImg, title: "Regal Bride Heritage Gaze", tag: "Bridal", aspect: "aspect-[4/5]" },
    { src: preweddingImg, title: "Sunset Romance Across Mustard Fields", tag: "Romance", aspect: "aspect-[3/4]" },
    { src: birthdayImg, title: "Joyful Sangeet & Festive Dance", tag: "Celebration", aspect: "aspect-[4/5]" },
    { src: cinemaImg, title: "Cinematic Camera Operator Gear", tag: "Cinema", aspect: "aspect-[16/10]" },
    { src: albumImg, title: "Archival Wedding Album Art", tag: "Heirloom", aspect: "aspect-[4/5]" },
    { src: editingImg, title: "Color Grading Suite Precision", tag: "Studio Craft", aspect: "aspect-[16/10]" },
  ];

  const cinematicFilms = [
    {
      id: "film-1",
      title: "The Royal Anand Karaj — Harpreet & Simran",
      subtitle: "4K Master Film • Mansa Destination Shoot",
      runtime: "3:45 4K Master Teaser",
      camera: "Sony FX3 + 85mm G-Master",
      audio: "Original Punjabi Folk Fusion & Sacred Shabad Audio",
      cover: heroImg,
      desc: "A breathtaking wedding film capturing royal crimson velvet lehenga, Anand Karaj chants, and heartfelt tears of joy.",
    },
    {
      id: "film-2",
      title: "Sunset Romance & Mustard Whispers — Gurinder & Navneet",
      subtitle: "Cinematic Pre-Wedding Teaser",
      runtime: "4:12 Ultra-HD Teaser",
      camera: "4K 120fps Cinema Drone + Gimbal",
      audio: "Acoustic Warm Guitar & Candid Dialogue",
      cover: preweddingImg,
      desc: "Golden-hour pre-wedding love story shot across Punjab's scenic landscapes with golden lens flares and authentic laughter.",
    },
    {
      id: "film-3",
      title: "Grand Sangeet Night & Royal Reception",
      subtitle: "High-Energy Evening Film",
      runtime: "2:55 Slow-Motion 120FPS",
      camera: "Dual Cinema Rig + Low-Light Prime Lenses",
      audio: "Live Dhol Beats & Family Speeches",
      cover: birthdayImg,
      desc: "Vibrant family celebration, sparkling fireworks, and slow-motion cinematic dance moves documented in pristine clarity.",
    },
  ];

  const bridalFineArt = [
    {
      src: brideImg,
      title: "The Heirloom Veil & Antique Kundan",
      tag: "Fine-Art Bridal",
      desc: "Traditional bridal portrait highlighting intricate gold maang tikka, nath, and crimson velvet embroidery.",
    },
    {
      src: heroImg,
      title: "The Royal Bridal Arrival",
      tag: "Anand Karaj",
      desc: "Candid emotional glance under the phulkari chaadar as the bride walks toward the sacred Guru Granth Sahib Ji.",
    },
    {
      src: ringImg,
      title: "Sacred Mehndi & Gold Bangles",
      tag: "Couture Details",
      desc: "Macro close-up capturing dark henna motifs, diamond rings, and handcrafted royal bridal chooda.",
    },
  ];

  const filteredPortfolio =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const curatedServices = [
    {
      id: "wedding",
      number: "01",
      title: "Royal Wedding Photography",
      subtitle: "The Signature Royal Wedding Experience",
      tag: "SIGNATURE EXPERIENCE",
      badge: "Most Celebrated",
      desc: "Complete, sacred visual storytelling for your wedding celebrations. From dawn Anand Karaj chants to late-night reception fireworks, our master cinema team documents authentic candid tears, family joy, and royal bridal couture without disrupting sacred moments.",
      img: heroImg,
      deliverables: [
        "Full Day Coverage: Anand Karaj, Sangeet, Haldi & Reception",
        "2 Senior Candid Masters + 2 Traditional Photographers",
        "4K UHD Cinematic Highlight Teaser & Full-Length Film",
        "Handcrafted Italian Leather Bound Heirloom Album (40 Spreads)",
        "Master Skin Retouching & Bespoke Color Science",
        "Encrypted Private Cloud Gallery with Unlimited Downloads",
      ],
      whatsappMsg: "Hi Pictorial Photography! I would love to check availability and packages for 'Royal Wedding Photography'.",
    },
    {
      id: "prewedding",
      number: "02",
      title: "Cinematic Pre-Wedding Shoots",
      subtitle: "Outdoor Storytelling & Romance",
      tag: "POPULAR EXPERIENCE",
      badge: "Trending",
      desc: "Scenic destination and outdoor storytelling sessions tailored to each couple's unique romance. Captured at golden hour in lush Punjabi mustard fields, historic havelis, or dream destination retreats with prime cinema lenses and drone aerials.",
      img: preweddingImg,
      deliverables: [
        "Full-Day Outdoor Destination Shoot (Up to 3 Scenic Locations)",
        "Multiple Costume Changes & Drone Aerial Cinematography",
        "3 to 4 Minute Cinematic Love Story Video Teaser",
        "50+ Hand-Retouched High-Resolution Editorial Portraits",
        "Cinematic Music Scoring & Color Grading",
        "Exclusive Save-the-Date Digital Announcement Reel",
      ],
      whatsappMsg: "Hi Pictorial Photography! I am interested in planning a 'Cinematic Pre-Wedding Shoot'. Can you share packages and dates?",
    },
    {
      id: "portraits",
      number: "03",
      title: "Regal Bridal Fine-Art Portraits",
      subtitle: "Editorial Fashion & Bridal Glamour",
      tag: "EDITORIAL COLLECTION",
      badge: "Editorial",
      desc: "Fine-art editorial portraits capturing every intricate detail of your bridal attire, jewelry, henna, and emotional expressions. Lit with diffused cinematic lighting for timeless magazine-worthy elegance.",
      img: brideImg,
      deliverables: [
        "Dedicated Bridal Preparation & Getting-Ready Coverage",
        "Close-up Fine Art Jewelry & Attire Texture Detail Shots",
        "Editorial Posing Direction & Flattering Soft Lighting",
        "Bespoke High-End Skin Tone Color Retouching",
        "15 Ultra-HD Framed Archival Print Masterpieces",
        "Instant Same-Day Digital Sneak Peeks for Socials",
      ],
      whatsappMsg: "Hi Pictorial Photography! I want to book 'Regal Bridal Fine-Art Portraits' for my upcoming wedding.",
    },
    {
      id: "cinema",
      number: "04",
      title: "Cinematic Wedding Films & Teasers",
      subtitle: "4K/6K Feature Production",
      tag: "4K CINEMA MASTER",
      badge: "Feature Film",
      desc: "Hollywood-grade cinema production featuring stabilized gimbal cameras, drone aerials, studio soundscapes, and crisp audio recording of vows and family blessings. Delivered as viral reels and a documentary film.",
      img: cinemaImg,
      deliverables: [
        "4K/6K Cinema Cameras & Fast Prime Lenses",
        "Licensed High-Fidelity Cinematic Soundscapes",
        "Dedicated Drone Aerials for Royal Venues",
        "1-Minute Instagram Reels + 5-Minute Cinematic Trailer",
        "Full-Length Documentary Video of All Rituals",
        "Delivered in Custom Wooden Engraved Studio USB Drive",
      ],
      whatsappMsg: "Hi Pictorial Photography! I would like to book 'Cinematic Wedding Films & 4K Teasers'.",
    },
  ];

  const additionalServices = [
    {
      title: "Handcrafted Heirloom Albums",
      desc: "Ultra-HD archival prints in Italian leather, gold foil embossing, and velvet casing.",
      tag: "Heirloom",
      img: albumImg,
    },
    {
      title: "Master Color Science & Grading",
      desc: "Every frame hand-graded in our Mansa studio for warm, royal cinematic tones.",
      tag: "Studio",
      img: editingImg,
    },
    {
      title: "Ring Ceremony & Engagement",
      desc: "Candid moments capturing the spark of commitment and joyful celebration.",
      tag: "Milestone",
      img: ringImg,
    },
    {
      title: "Anniversaries & Milestones",
      desc: "Energetic family celebrations, milestone birthdays, and joyful reunions.",
      tag: "Festive",
      img: birthdayImg,
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudioInquiry({
      name: formData.name,
      phone: formData.phone,
      eventType: formData.eventType,
      eventDate: formData.eventDate || "Not specified",
      message: formData.message || "Enquiry from website contact form",
    });
    const text = `*New Website Enquiry - Pictorial Photography*\nName: ${formData.name}\nPhone: ${formData.phone}\nEvent Type: ${formData.eventType}\nDate: ${formData.eventDate || "Not specified"}\nMessage: ${formData.message}`;
    const url = `https://wa.me/919700598098?text=${encodeURIComponent(text)}`;
    setFormSubmitted(true);
    window.open(url, "_blank");
  };

  return (
    <div className={`min-h-screen ${theme === "light" ? "theme-light" : "theme-dark"} bg-[#0B0B0D] text-[#F5F0E8] antialiased selection:bg-[#C6A76A] selection:text-[#0B0B0D] transition-colors duration-300`}>
      {/* Top Notification Bar - Responsive & Single-Line on Mobile */}
      <div className="top-notification-bar bg-[#202023] border-b border-[#35332F] py-2 px-3 sm:px-4 text-[11px] sm:text-xs text-center text-[#B8B5AF] transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[#C6A76A] font-medium font-cinzel text-[11px] sm:text-xs whitespace-nowrap">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E0C58F]" />
            <span className="sm:hidden">Bookings Open 2026–27</span>
            <span className="hidden sm:inline">Bookings Open for 2026–2027 Wedding Season</span>
          </span>
          <span className="text-[#C6A76A]/40">•</span>
          <span className="hidden md:inline text-[#B8B5AF]">Mansa, Punjab & Worldwide Destination Shoots</span>
          <span className="hidden md:inline text-[#C6A76A]/40">•</span>
          <a
            href="tel:+919700598098"
            className="text-[#C6A76A] hover:text-[#E0C58F] hover:underline font-semibold flex items-center gap-1 whitespace-nowrap transition-colors"
          >
            <Phone className="w-3 h-3" /> +91 9700598098
          </a>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0B0B0D]/92 backdrop-blur-md border-b border-[#35332F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          {/* Brand Logo */}
          <StudioLogo />

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-xs font-semibold tracking-[0.15em] 2xl:tracking-[0.2em] uppercase font-cinzel text-[#B8B5AF]">
            <a href="#home" className="hover:text-[#C6A76A] transition-colors relative py-1">
              Home
            </a>
            <a href="#services" className="hover:text-[#C6A76A] transition-colors relative py-1">
              Services
            </a>
            <a href="#portfolio" className="hover:text-[#C6A76A] transition-colors relative py-1">
              Portfolio
            </a>
            <a href="#about" className="hover:text-[#C6A76A] transition-colors relative py-1">
              About
            </a>
            <a href="#why-us" className="hover:text-[#C6A76A] transition-colors relative py-1">
              Why Us
            </a>
            <a href="#reviews" className="hover:text-[#C6A76A] transition-colors relative py-1">
              Reviews
            </a>
            <a href="#contact" className="hover:text-[#C6A76A] transition-colors relative py-1">
              Contact
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden xl:flex items-center gap-3">
            {/* Theme Toggle Button (Black & White Mode) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Black & White theme"
              className="theme-toggle-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#35332F] bg-[#171719] hover:border-[#C6A76A] hover:bg-[#202023] transition-all text-xs font-cinzel font-semibold group shadow-sm"
              title={theme === "dark" ? "Switch to White Theme" : "Switch to Black Theme"}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#C6A76A] group-hover:rotate-45 transition-transform" />
                  <span className="text-[#F5F0E8] group-hover:text-[#C6A76A] text-[10px] tracking-widest uppercase">
                    White Theme
                  </span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#C6A76A] group-hover:-rotate-12 transition-transform" />
                  <span className="text-[#171412] group-hover:text-[#A07C35] text-[10px] tracking-widest uppercase">
                    Black Theme
                  </span>
                </>
              )}
            </button>

            <a
              href="#client-gallery"
              className="inline-flex items-center gap-2 border border-[#35332F] text-[#C6A76A] hover:bg-[#C6A76A]/10 hover:border-[#E0C58F] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider font-cinzel transition-all"
            >
              <Lock className="w-3.5 h-3.5" /> Client Gallery
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] hover:shadow-[0_0_20px_rgba(229,196,120,0.45)] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider font-cinzel transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Book Shoot
            </a>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Black & White theme"
              className="p-2 rounded-full border border-[#35332F] bg-[#171719] text-[#C6A76A] transition-all shadow-sm"
              title={theme === "dark" ? "White Theme" : "Black Theme"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F5F0E8] hover:text-[#C6A76A] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#14110E] border-b border-[#35332F] px-6 py-6 space-y-4 font-cinzel text-xs tracking-wider">
            <div className="pb-4 border-b border-[#35332F]">
              <StudioLogo />
            </div>
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase text-[#B8B5AF] hover:text-[#C6A76A]"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase text-[#B8B5AF] hover:text-[#C6A76A]"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase text-[#B8B5AF] hover:text-[#C6A76A]"
            >
              Portfolio
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase text-[#B8B5AF] hover:text-[#C6A76A]"
            >
              About Studio
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase text-[#B8B5AF] hover:text-[#C6A76A]"
            >
              Why Choose Us
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase text-[#B8B5AF] hover:text-[#C6A76A]"
            >
              Client Reviews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium uppercase text-[#B8B5AF] hover:text-[#C6A76A]"
            >
              Contact & Enquiries
            </a>
            <div className="pt-3 border-t border-[#35332F] flex items-center justify-between pb-1">
              <span className="text-xs uppercase text-[#B8B5AF]">Website Theme (ਥੀਮ):</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#35332F] bg-[#202023] text-xs font-semibold"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#C6A76A]" />
                    <span className="text-[#F5F0E8]">White Theme</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#C6A76A]" />
                    <span className="text-[#171412]">Black Theme</span>
                  </>
                )}
              </button>
            </div>
            <div className="pt-3 border-t border-[#35332F] flex flex-col gap-3">
              <a
                href="#client-gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-[#C6A76A] text-[#C6A76A] text-xs font-semibold uppercase tracking-wider"
              >
                Client Gallery Login
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-lg bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] text-xs font-bold uppercase tracking-wider"
              >
                Book via WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-end sm:justify-center overflow-hidden bg-[#0B0B0D]">
        {/* Background Photo - Centered on Couple for Both Mobile & Desktop */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Royal Wedding Couple in Mansa - Pictorial Photography"
            className="w-full h-full object-cover object-[50%_20%] sm:object-[68%_35%] lg:object-[72%_35%] transition-all duration-700"
          />

          {/* Top ambient dark gradient for header and navbar readability */}
          <div className="hero-top-overlay absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#0B0B0D]/85 via-[#0B0B0D]/40 to-transparent" />

          {/* Desktop Left-to-Right directional fade: Dark on the left behind text, 100% TRANSPARENT on the couple */}
          <div className="hero-side-overlay hidden sm:block absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/95 via-[#0B0B0D]/60 to-transparent" />

          {/* Mobile Vertical Gradient: Soft dark fade at bottom behind text, couple clearly visible in open top/middle */}
          <div className="hero-mobile-overlay sm:hidden absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/85 via-45% to-transparent" />

          {/* Bottom gentle fade to blend seamlessly into services */}
          <div className="hero-bottom-overlay absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-[#171719] via-[#171719]/70 to-transparent" />
        </div>

        {/* Hero Content - Perfectly responsive on mobile & desktop */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 sm:py-24 lg:py-28 w-full">
          <div className="hero-content-box max-w-lg lg:max-w-xl text-center sm:text-left mx-auto sm:mx-0 transition-all duration-300">
            {/* Top Studio Badge */}
            <div className="hero-studio-badge inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#C6A76A] bg-[#0B0B0D]/85 text-[#C6A76A] text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.24em] font-cinzel uppercase mb-3.5 sm:mb-6 shadow-xl shadow-black/60">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E0C58F]" />
              <span>Mansa's Premier Studio</span>
              <span className="hidden sm:inline">&amp; Cinematic Studio</span>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E0C58F]" />
            </div>

            {/* Headline with High-Contrast Typography & Drop Shadows */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.14] text-[#F5F0E8] mb-3 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Where Pure Emotion <br className="hidden sm:inline" />
              <span className="italic font-light text-[#C6A76A] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                Meets Cinematic Artistry
              </span>
            </h1>

            {/* Subtitle with deep readability shadow */}
            <p className="text-xs sm:text-base lg:text-lg text-[#B8B5AF] font-light leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto sm:mx-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Crafting timeless visual heirlooms with royal aesthetics, candid warmth, and 4K cinema precision for luxury weddings in Mansa, Punjab and worldwide destinations.
            </p>

            {/* Call to Actions - Side-by-side buttons on mobile & desktop */}
            <div className="flex flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-7 sm:mb-12">
              <a
                href="#portfolio"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-bold text-xs sm:text-sm tracking-wider uppercase font-cinzel px-5 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all shadow-lg hover:scale-105"
              >
                Explore Works <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#C6A76A]/10 border border-[#C6A76A] text-[#F5F0E8] hover:text-[#E0C58F] hover:border-[#E0C58F] font-semibold text-xs sm:text-sm tracking-wider uppercase font-cinzel px-5 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all shadow-xl"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C6A76A]" /> WhatsApp
              </a>
            </div>

            {/* Quick Metrics - Compact 4-column row on mobile */}
            <div className="hero-metrics-grid pt-4 sm:pt-6 border-t border-[#35332F] grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6 text-center sm:text-left">
              <div>
                <div className="hero-metric-number font-serif text-lg sm:text-2xl lg:text-3xl font-semibold text-[#C6A76A] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] whitespace-nowrap">
                  500+
                </div>
                <div className="hero-metric-label text-[9px] sm:text-[11px] uppercase tracking-wider text-[#D4CEC2] mt-0.5 font-medium drop-shadow">
                  Weddings
                </div>
              </div>
              <div>
                <div className="hero-metric-number font-serif text-lg sm:text-2xl lg:text-3xl font-semibold text-[#C6A76A] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] whitespace-nowrap">
                  10+
                </div>
                <div className="hero-metric-label text-[9px] sm:text-[11px] uppercase tracking-wider text-[#D4CEC2] mt-0.5 font-medium drop-shadow">
                  Years Craft
                </div>
              </div>
              <div>
                <div className="hero-metric-number font-serif text-lg sm:text-2xl lg:text-3xl font-semibold text-[#C6A76A] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] whitespace-nowrap">
                  4K / 6K
                </div>
                <div className="hero-metric-label text-[9px] sm:text-[11px] uppercase tracking-wider text-[#D4CEC2] mt-0.5 font-medium drop-shadow whitespace-nowrap">
                  Cinema Gear
                </div>
              </div>
              <div>
                <div className="hero-metric-number font-serif text-lg sm:text-2xl lg:text-3xl font-semibold text-[#C6A76A] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] whitespace-nowrap">
                  100%
                </div>
                <div className="hero-metric-label text-[9px] sm:text-[11px] uppercase tracking-wider text-[#D4CEC2] mt-0.5 font-medium drop-shadow">
                  Delighted
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Royal Editorial Magazine Layout in Rich Warm Espresso & Gold */}
      <section id="services" className="py-24 bg-[#171719] text-[#F5F0E8] border-t border-[#35332F] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="border-b border-[#35332F] pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#C6A76A] font-semibold block mb-2">
                Bespoke Offerings &amp; Collections
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-wider text-[#F5F0E8] leading-none">
                SERVICES
              </h2>
            </div>
            <div className="text-left md:text-right">
              <span className="font-serif italic text-xl sm:text-2xl text-[#C6A76A] font-light block">
                Mansa, Punjab &amp; Worldwide
              </span>
              <span className="text-xs text-[#B8B5AF] uppercase tracking-widest font-cinzel">
                Limited Dates for 2026–2027 Season
              </span>
            </div>
          </div>

          {/* Asymmetrical Top Grid - EXACT match to reference layout in warm luxury palette */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* Left Big Portrait: Bride & Groom full-length wedding shot */}
            <div
              onClick={() => setSelectedServiceModal(curatedServices[0] ?? null)}
              className="service-featured-card lg:col-span-6 relative h-[520px] sm:h-[620px] lg:h-[700px] overflow-hidden group cursor-pointer bg-[#0B0B0D] rounded-2xl border border-[#35332F] shadow-2xl hover:border-[#C6A76A]/60 transition-all"
            >
              <img
                src={heroImg}
                alt="Royal Wedding Couple"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-[#0B0B0D]/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 left-4 bg-[#202023]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#35332F] shadow-lg">
                <span className="font-cinzel text-[10px] tracking-widest text-[#C6A76A] font-bold uppercase">
                  Featured Experience
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-cinzel text-[10px] uppercase tracking-widest text-[#C6A76A] font-bold block mb-1">
                  01 / Signature Collection
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-[#F5F0E8]">
                  Royal Wedding Photography &amp; Anand Karaj
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-[#F5F0E8] font-cinzel uppercase tracking-wider mt-2 group-hover:text-[#C6A76A] transition-colors">
                  View Experience Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C6A76A]" />
                </span>
              </div>
            </div>

            {/* Right Column: 2 smaller photos + Category menu */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
              {/* 2-Photo Split Row */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div
                  onClick={() => setSelectedServiceModal(curatedServices[1] ?? null)}
                  className="relative h-64 sm:h-72 overflow-hidden group cursor-pointer bg-[#0B0B0D] rounded-2xl border border-[#35332F] shadow-xl hover:border-[#C6A76A]/60 transition-all"
                >
                  <img
                    src={preweddingImg}
                    alt="Pre-Wedding Romance"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-[#0B0B0D]/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="font-cinzel text-[9px] uppercase tracking-wider text-[#C6A76A] font-bold block">02 / Romance</span>
                    <h4 className="font-serif text-base sm:text-lg text-[#F5F0E8] leading-tight">Pre-Wedding Shoots</h4>
                  </div>
                </div>

                <div
                  onClick={() => setSelectedServiceModal(curatedServices[2] ?? null)}
                  className="relative h-64 sm:h-72 overflow-hidden group cursor-pointer bg-[#0B0B0D] rounded-2xl border border-[#35332F] shadow-xl hover:border-[#C6A76A]/60 transition-all"
                >
                  <img
                    src={brideImg}
                    alt="Regal Bride Portrait"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-[#0B0B0D]/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="font-cinzel text-[9px] uppercase tracking-wider text-[#C6A76A] font-bold block">03 / Editorial</span>
                    <h4 className="font-serif text-base sm:text-lg text-[#F5F0E8] leading-tight">Regal Bridal Portraits</h4>
                  </div>
                </div>
              </div>

              {/* Categories Menu (Warm Luxury Surface) */}
              <div className="services-menu-card bg-gradient-to-b from-[#202023] to-[#171719] p-6 sm:p-8 rounded-2xl border border-[#35332F] shadow-2xl">
                <h3 className="font-serif text-2xl sm:text-3xl tracking-wide uppercase text-[#F5F0E8] mb-1">
                  FOR THE TIMELESS &amp; REGAL
                </h3>
                <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#C6A76A] uppercase block mb-6 font-semibold">
                  PRICING &amp; BESPOKE INFORMATION
                </span>

                <div className="divide-y divide-[#C6A76A]/15">
                  {curatedServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedServiceModal(service)}
                      className="w-full py-3.5 flex items-center justify-between text-left group hover:pl-2 transition-all"
                    >
                      <span className="font-cinzel text-xs sm:text-sm tracking-wider uppercase text-[#F5F0E8] group-hover:text-[#E0C58F] font-medium flex items-center gap-2.5">
                        <span className="text-[#C6A76A] font-serif text-sm font-semibold">{service.number}</span>
                        {service.title}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#C6A76A] group-hover:text-[#E0C58F] group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      setSelectedServiceModal({
                        title: "Handcrafted Italian Leather Albums",
                        desc: "Fine-art printed archival photobooks with Italian leather, gold foil debossing, velvet casing, and lay-flat panoramic pages designed to last across generations.",
                        img: albumImg,
                        deliverables: [
                          "Italian Full-Grain Leather or Velvet Covers",
                          "Gold / Silver Foil Custom Couple Name Embossing",
                          "Ultra-HD Archival 300gsm Lay-Flat Photographic Paper",
                          "Custom Luxury Wooden Presentation Gift Box",
                          "Complimentary Parent Mini Heirloom Albums",
                          "Worldwide Safe Courier Delivery to Your Doorstep",
                        ],
                        whatsappMsg: "Hi Pictorial Photography! I would like to inquire about ordering a 'Handcrafted Leather Heirloom Album'.",
                      })
                    }
                    className="w-full py-3.5 flex items-center justify-between text-left group hover:pl-2 transition-all"
                  >
                    <span className="font-cinzel text-xs sm:text-sm tracking-wider uppercase text-[#F5F0E8] group-hover:text-[#E0C58F] font-medium flex items-center gap-2.5">
                      <span className="text-[#C6A76A] font-serif text-sm font-semibold">05</span>
                      Handcrafted Heirloom Albums
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#C6A76A] group-hover:text-[#E0C58F] group-hover:translate-x-1 transition-all" />
                  </button>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-cinzel font-bold text-xs uppercase tracking-widest py-3.5 rounded-full transition-all shadow-lg shadow-[#C6A76A]/25 hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current text-[#0B0B0D]" /> Inquire For Your Wedding Date
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 6-Photo Editorial Gallery Grid */}
          <div className="mb-16">
            <div className="text-center mb-6">
              <span className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-[#C6A76A] font-semibold">
                ✦ The Pictorial Visual Archive ✦
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
              {[
                { title: "Royal Wedding Ceremony", sub: "Anand Karaj • Mansa", img: heroImg, srv: curatedServices[0] },
                { title: "Sunset Golden Hour Romance", sub: "Pre-Wedding Session", img: preweddingImg, srv: curatedServices[1] },
                { title: "Regal Bridal Fine-Art", sub: "Jewelry & Attire", img: brideImg, srv: curatedServices[2] },
                { title: "4K Cinematic Cinema Production", sub: "Feature Reels & Aerials", img: cinemaImg, srv: curatedServices[3] },
                { title: "Ring Ceremony & Promises", sub: "Sacred Engagements", img: ringImg, srv: curatedServices[0] },
                { title: "Handcrafted Leather Heirloom", sub: "Archival Photo Album", img: albumImg, srv: curatedServices[0] },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedServiceModal(item.srv ?? null)}
                  className="service-photo-card group relative h-56 sm:h-72 overflow-hidden cursor-pointer rounded-2xl bg-[#0B0B0D] border border-[#35332F] hover:border-[#C6A76A]/60 shadow-xl transition-all"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-[#0B0B0D]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <span className="font-cinzel text-[9px] uppercase tracking-wider text-[#C6A76A] font-bold">
                      {item.sub}
                    </span>
                    <h5 className="font-serif text-base sm:text-lg text-[#F5F0E8] leading-tight">
                      {item.title}
                    </h5>
                    <span className="text-[10px] text-[#F5F0E8]/80 uppercase tracking-wider font-cinzel mt-1 inline-flex items-center gap-1">
                      Explore Package <ChevronRight className="w-3 h-3 text-[#C6A76A]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stat Ribbon (Warm Mocha & Antique Gold) */}
          <div className="services-stats-card grid grid-cols-1 md:grid-cols-3 border border-[#35332F] py-8 text-center bg-gradient-to-r from-[#202023] via-[#202023] to-[#202023] rounded-2xl shadow-2xl">
            <div className="py-4 md:py-0 md:border-r border-[#35332F] px-6">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#C6A76A] tracking-wide">
                500+ WEDDINGS
              </div>
              <div className="font-cinzel text-[10px] tracking-widest text-[#B8B5AF] uppercase mt-1">
                Beautifully Documented Across Punjab
              </div>
            </div>
            <div className="py-4 md:py-0 md:border-r border-[#35332F] px-6">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#C6A76A] tracking-wide">
                10+ YEARS EXPERIENCE
              </div>
              <div className="font-cinzel text-[10px] tracking-widest text-[#B8B5AF] uppercase mt-1">
                Capturing Authentic Love Stories
              </div>
            </div>
            <div className="py-4 md:py-0 px-6">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#C6A76A] tracking-wide">
                100% 5-STAR RATED
              </div>
              <div className="font-cinzel text-[10px] tracking-widest text-[#B8B5AF] uppercase mt-1">
                Mansa's Most Celebrated Studio
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Service Package Modal */}
        {selectedServiceModal && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedServiceModal(null)}
          >
            <div
              className="service-detail-modal relative max-w-3xl w-full bg-[#202023] text-[#F5F0E8] rounded-2xl overflow-hidden border border-[#35332F] shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors border border-[#35332F]"
              >
                <X className="w-5 h-5 text-[#C6A76A]" />
              </button>

              <div className="md:w-1/2 bg-black min-h-[280px]">
                <img
                  src={selectedServiceModal.img}
                  alt={selectedServiceModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-cinzel text-[10px] tracking-widest uppercase text-[#C6A76A] font-semibold block mb-1">
                    Bespoke Experience
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F5F0E8] leading-tight">
                    {selectedServiceModal.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-[#C6A76A] my-3" />
                  <p className="text-xs sm:text-sm text-[#B8B5AF] leading-relaxed mb-6">
                    {selectedServiceModal.desc}
                  </p>

                  <div className="bg-[#120F0D] p-4 rounded-xl border border-[#35332F] mb-6">
                    <span className="font-cinzel text-[10px] uppercase tracking-wider text-[#C6A76A] block mb-2 font-bold">
                      Included Luxuries &amp; Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#B8B5AF]">
                      {selectedServiceModal.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A76A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <a
                    href={`https://wa.me/919700598098?text=${encodeURIComponent(selectedServiceModal.whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-cinzel font-bold text-xs uppercase tracking-widest py-3.5 rounded-full transition-all shadow-md hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current text-[#0B0B0D]" /> Book This Package on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Featured Portfolio Showcase */}
      <section id="portfolio" className="py-24 bg-[#0B0B0D] border-t border-[#35332F] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#C6A76A] uppercase tracking-[0.28em] text-xs font-semibold font-cinzel">
              Curated Editorial Gallery • Freya Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal mt-2 text-[#F5F0E8]">
              {portfolioMode === "hub" && "Timeless Moments In Frame"}
              {portfolioMode === "marriages" && "Weddings — The Sliding Gallery"}
              {portfolioMode === "cinematic" && "Cinematic Wedding Films — 4K Motion"}
              {portfolioMode === "prewedding" && "Couples — The Full Screen Gallery"}
              {portfolioMode === "bridal" && "Bridal Portraits — Fine-Art Editorial"}
              {portfolioMode === "engagements" && "Engagements & Rituals — The Tiled Gallery"}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="w-12 h-px bg-[#C6A76A]/50" />
              <span className="text-xs text-[#C6A76A]">✦</span>
              <span className="w-12 h-px bg-[#C6A76A]/50" />
            </div>
            <p className="text-[#B8B5AF] text-sm sm:text-base mt-4 font-light">
              {portfolioMode === "hub" && "Explore our multi-corner editorial gallery hub. Click any collection card below to open its custom sliding, tiled, or full-screen layout."}
              {portfolioMode === "marriages" && "A curated horizontal sliding journey through sacred Sikh Anand Karaj vows, royal crimson lehengas, and heartfelt family emotions."}
              {portfolioMode === "cinematic" && "High-end 4K cinema cameras, aerial drone cinematography, and Hollywood-level color grading crafted in our Mansa studio."}
              {portfolioMode === "prewedding" && "Romantic golden-hour destination stories, natural laughter, and candid glances captured in Punjab's scenic landscapes."}
              {portfolioMode === "bridal" && "Fine-art close-up bridal jewelry, antique kundan embroidery, and royal Punjabi heritage portraits."}
              {portfolioMode === "engagements" && "A high-density tiled mosaic gallery of ring exchanges, vibrant haldi splashes, and festive family reunions."}
            </p>
          </div>

          {/* Top Quick Navigation Pills (Switch between Hub and Specific Galleries) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: "hub", label: "Visual Hub (All Corners)" },
              { id: "marriages", label: "Marriages (Sliding Gallery)" },
              { id: "cinematic", label: "Cinematic (4K Motion)" },
              { id: "prewedding", label: "Pre-Wedding (Full Screen)" },
              { id: "bridal", label: "Bridal (Fine-Art)" },
              { id: "engagements", label: "Engagements (Tiled Gallery)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setPortfolioMode(tab.id as any);
                  if (tab.id === "marriages") setWeddingSlideIndex(0);
                }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] font-cinzel transition-all duration-300 ${
                  portfolioMode === tab.id
                    ? "bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] shadow-lg shadow-[#C6A76A]/25 font-bold scale-105"
                    : "bg-[#171719] text-[#B8B5AF] hover:text-[#F5F0E8] border border-[#35332F] hover:border-[#C6A76A]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ========================================================
              LAYOUT 1: MAIN VISUAL HUB (CORNER-TO-CORNER MOODBOARD)
             ======================================================== */}
          {portfolioMode === "hub" && (
            <div className="space-y-10 animate-fadeIn">
              {/* 5-Card Multi-Corner Grid exactly matching user request */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                
                {/* 1. UP-LEFT CORNER: Marriages */}
                <div
                  onClick={() => { setPortfolioMode("marriages"); setWeddingSlideIndex(0); }}
                  className="lg:col-span-4 group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer border border-[#35332F] hover:border-[#C6A76A] transition-all shadow-2xl bg-[#14110E] hover:-translate-y-1.5 duration-500"
                >
                  <img
                    src={heroImg}
                    alt="Marriages & Anand Karaj"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/95 via-[#0B0B0D]/40 to-transparent" />
                  
                  {/* Up-Left Corner Badge */}
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C6A76A]/50 text-[#C6A76A] text-[10px] font-cinzel font-bold tracking-widest uppercase">
                    UP-LEFT • COLLECTION
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A76A] font-cinzel font-bold block mb-1">
                      Weddings &amp; Anand Karaj
                    </span>
                    <h3 className="font-serif text-2xl text-white font-normal mb-2">
                      Marriages
                    </h3>
                    <p className="text-xs text-[#D1CBC0] line-clamp-2 mb-4">
                      Royal Sikh wedding ceremonies, golden hour garden embraces, and timeless vows.
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6A76A] group-hover:bg-[#E0C58F] text-[#0B0B0D] text-xs font-cinzel font-bold uppercase tracking-wider transition-all shadow-md group-hover:scale-105"
                    >
                      Open Sliding Gallery <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2. CENTER: Pre-Wedding Romance (Tall Centerpiece) */}
                <div
                  onClick={() => setPortfolioMode("prewedding")}
                  className="lg:col-span-4 group relative h-[460px] lg:h-[500px] -mt-0 lg:-mt-4 rounded-3xl overflow-hidden cursor-pointer border-2 border-[#C6A76A]/60 hover:border-[#C6A76A] transition-all shadow-2xl bg-[#14110E] z-10 hover:-translate-y-2 duration-500"
                >
                  <img
                    src={preweddingImg}
                    alt="Pre-Wedding Romance Stories"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/95 via-[#0B0B0D]/35 to-transparent" />
                  
                  {/* Center Badge */}
                  <div className="absolute top-4 left-4 bg-[#C6A76A] px-3.5 py-1.5 rounded-full text-[#0B0B0D] text-[10px] font-cinzel font-extrabold tracking-widest uppercase shadow-lg">
                    CENTER • FEATURED
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A76A] font-cinzel font-bold block mb-1">
                      Couples In Love
                    </span>
                    <h3 className="font-serif text-3xl text-white font-normal mb-2">
                      Pre-Wedding Stories
                    </h3>
                    <p className="text-xs text-[#D1CBC0] line-clamp-2 mb-4">
                      Intimate outdoor destinations, golden hour light, and natural romantic smiles.
                    </p>
                    <button
                      type="button"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C6A76A] group-hover:bg-[#E0C58F] text-[#0B0B0D] text-xs font-cinzel font-bold uppercase tracking-wider transition-all shadow-lg group-hover:scale-105"
                    >
                      Explore Full-Screen Gallery <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 3. UP-RIGHT CORNER: Cinematic Films */}
                <div
                  onClick={() => setPortfolioMode("cinematic")}
                  className="lg:col-span-4 group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer border border-[#35332F] hover:border-[#C6A76A] transition-all shadow-2xl bg-[#14110E] hover:-translate-y-1.5 duration-500"
                >
                  <img
                    src={cinemaImg}
                    alt="Cinematic 4K Wedding Films"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/95 via-[#0B0B0D]/40 to-transparent" />
                  
                  {/* Up-Right Badge */}
                  <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C6A76A]/50 text-[#C6A76A] text-[10px] font-cinzel font-bold tracking-widest uppercase">
                    UP-RIGHT • CINEMATIC
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A76A] font-cinzel font-bold block mb-1">
                      4K Sony FX3 Motion
                    </span>
                    <h3 className="font-serif text-2xl text-white font-normal mb-2">
                      Cinematic
                    </h3>
                    <p className="text-xs text-[#D1CBC0] line-clamp-2 mb-4">
                      Master color-graded wedding teasers, drone aerials, and emotional sound design.
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6A76A] group-hover:bg-[#E0C58F] text-[#0B0B0D] text-xs font-cinzel font-bold uppercase tracking-wider transition-all shadow-md group-hover:scale-105"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Watch Film Teasers
                    </button>
                  </div>
                </div>

                {/* 4. DOWN-LEFT CORNER: Bridal Fine-Art */}
                <div
                  onClick={() => setPortfolioMode("bridal")}
                  className="lg:col-span-6 group relative h-[360px] rounded-3xl overflow-hidden cursor-pointer border border-[#35332F] hover:border-[#C6A76A] transition-all shadow-2xl bg-[#14110E] hover:-translate-y-1.5 duration-500"
                >
                  <img
                    src={brideImg}
                    alt="Regal Bridal Portraits"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/95 via-[#0B0B0D]/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C6A76A]/50 text-[#C6A76A] text-[10px] font-cinzel font-bold tracking-widest uppercase">
                    DOWN-LEFT • BRIDAL
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A76A] font-cinzel font-bold block mb-1">
                      Heirloom Couture
                    </span>
                    <h3 className="font-serif text-2xl text-white font-normal mb-2">
                      Bridal Portraits
                    </h3>
                    <p className="text-xs text-[#D1CBC0] line-clamp-2 mb-4">
                      Intimate bridal elegance, antique kundan jewelry, and candid warmth.
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A76A] text-[#C6A76A] group-hover:bg-[#C6A76A] group-hover:text-[#0B0B0D] text-xs font-cinzel font-bold uppercase tracking-wider transition-all shadow-md"
                    >
                      Explore Bridal Gallery <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 5. DOWN-RIGHT CORNER: Engagements & Ceremonies */}
                <div
                  onClick={() => setPortfolioMode("engagements")}
                  className="lg:col-span-6 group relative h-[360px] rounded-3xl overflow-hidden cursor-pointer border border-[#35332F] hover:border-[#C6A76A] transition-all shadow-2xl bg-[#14110E] hover:-translate-y-1.5 duration-500"
                >
                  <img
                    src={ringImg}
                    alt="Engagements & Ceremonies"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/95 via-[#0B0B0D]/40 to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C6A76A]/50 text-[#C6A76A] text-[10px] font-cinzel font-bold tracking-widest uppercase">
                    DOWN-RIGHT • CEREMONIES
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A76A] font-cinzel font-bold block mb-1">
                      Sacred Promises
                    </span>
                    <h3 className="font-serif text-2xl text-white font-normal mb-2">
                      Engagements &amp; Rituals
                    </h3>
                    <p className="text-xs text-[#D1CBC0] line-clamp-2 mb-4">
                      Ring exchanges, joyous haldi rituals, and vibrant family celebrations.
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A76A] text-[#C6A76A] group-hover:bg-[#C6A76A] group-hover:text-[#0B0B0D] text-xs font-cinzel font-bold uppercase tracking-wider transition-all shadow-md"
                    >
                      Explore Tiled Gallery <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Editorial Accent Strip (Freya Style Moodboard Footer) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#171719] border border-[#35332F] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-4">
                    <img src={heroImg} className="w-12 h-12 rounded-full border-2 border-[#C6A76A] object-cover" />
                    <img src={brideImg} className="w-12 h-12 rounded-full border-2 border-[#C6A76A] object-cover" />
                    <img src={preweddingImg} className="w-12 h-12 rounded-full border-2 border-[#C6A76A] object-cover" />
                    <img src={albumImg} className="w-12 h-12 rounded-full border-2 border-[#C6A76A] object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base sm:text-lg text-[#F5F0E8] leading-tight">
                      Handcrafted Heirlooms &amp; Master Color Science
                    </h4>
                    <p className="text-xs text-[#B8B5AF]">
                      Fine-art leatherbound printed albums designed to last across generations.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-6 py-3 rounded-full bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] text-xs font-cinzel font-bold uppercase tracking-wider transition-all text-center"
                  >
                    Discuss Your Shoot on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              LAYOUT 2: WEDDINGS — THE SLIDING GALLERY (TOP CENTER TEMPLATE)
             ======================================================== */}
          {portfolioMode === "marriages" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Sliding Gallery Controls & Info */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#35332F] pb-6">
                <div>
                  <button
                    onClick={() => setPortfolioMode("hub")}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A76A] hover:underline font-cinzel mb-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Visual Hub
                  </button>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8]">
                    {weddingSlides[weddingSlideIndex]?.subtitle}
                  </h3>
                </div>

                {/* Slider Previous / Next Controls */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setWeddingSlideIndex((prev) => (prev > 0 ? prev - 1 : weddingSlides.length - 1))}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#35332F] bg-[#171719] hover:border-[#C6A76A] hover:bg-[#202023] text-xs font-cinzel font-semibold text-[#F5F0E8] transition"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#C6A76A]" /> PREVIOUS
                  </button>
                  <span className="font-cinzel text-xs text-[#C6A76A] px-2 font-bold">
                    {weddingSlides[weddingSlideIndex]?.slideNumber} / 0{weddingSlides.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setWeddingSlideIndex((prev) => (prev < weddingSlides.length - 1 ? prev + 1 : 0))}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#35332F] bg-[#171719] hover:border-[#C6A76A] hover:bg-[#202023] text-xs font-cinzel font-semibold text-[#F5F0E8] transition"
                  >
                    NEXT <ChevronRight className="w-4 h-4 text-[#C6A76A]" />
                  </button>
                </div>
              </div>

              {/* 3 Vertical Sliding Frames side-by-side matching the Freya template */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {(weddingSlides[weddingSlideIndex]?.photos ?? []).map((photo, pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() =>
                      setSelectedImage({
                        src: photo.src,
                        title: photo.title,
                        category: "wedding",
                        description: photo.subtitle,
                      })
                    }
                    className="portfolio-photo-card group relative h-[480px] sm:h-[540px] rounded-3xl overflow-hidden cursor-pointer border border-[#35332F] hover:border-[#C6A76A] bg-[#14110E] transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-[#0B0B0D]/30 to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#C6A76A]/40 text-[#C6A76A] text-[9px] font-cinzel font-bold tracking-widest uppercase">
                      {photo.tag}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h4 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-[#D1CBC0]">{photo.subtitle}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#C6A76A] font-cinzel uppercase tracking-wider mt-2 group-hover:underline">
                        View Ultra-HD Lightbox <ZoomIn className="w-3.5 h-3.5 ml-1" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Back & WhatsApp Action */}
              <div className="pt-6 border-t border-[#35332F] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setPortfolioMode("hub")}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B8B5AF] hover:text-[#C6A76A] font-cinzel"
                >
                  ← BACK TO ALL PORTFOLIO COLLECTIONS
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] text-xs font-cinzel font-bold uppercase tracking-wider shadow-lg"
                >
                  Book Royal Wedding Coverage on WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* ========================================================
              LAYOUT 3: PRE-WEDDING — THE FULL SCREEN GALLERY (LEFT TEMPLATE)
             ======================================================== */}
          {portfolioMode === "prewedding" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#35332F] pb-4 flex items-center justify-between">
                <button
                  onClick={() => setPortfolioMode("hub")}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A76A] hover:underline font-cinzel"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Visual Hub
                </button>
                <span className="font-cinzel text-xs text-[#C6A76A]">Couples • Full Screen Duo</span>
              </div>

              {/* 2 Large Vertical Full-Height Frames Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                {preweddingDuo.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    onClick={() =>
                      setSelectedImage({
                        src: item.src,
                        title: item.title,
                        category: "prewedding",
                        description: item.quote,
                      })
                    }
                    className="portfolio-photo-card group relative h-[520px] sm:h-[620px] rounded-3xl overflow-hidden cursor-pointer border border-[#35332F] hover:border-[#C6A76A] bg-[#14110E] transition-all duration-700 hover:-translate-y-2 shadow-2xl"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/95 via-[#0B0B0D]/30 to-transparent" />

                    <div className="absolute top-5 left-5 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C6A76A]/50 text-[#C6A76A] text-[10px] font-cinzel font-bold tracking-widest uppercase">
                      {item.tag} • {item.location}
                    </div>

                    <div className="absolute bottom-8 left-8 right-8">
                      <h4 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                        {item.title}
                      </h4>
                      <p className="font-serif italic text-sm text-[#D1CBC0] leading-relaxed mb-3">
                        "{item.quote}"
                      </p>
                      <span className="text-xs text-[#C6A76A] uppercase font-cinzel tracking-wider flex items-center gap-1">
                        Click to Expand Frame <ZoomIn className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Freya Style Love Notes Editorial Quote Box */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#171719] border border-[#35332F] text-center max-w-2xl mx-auto shadow-xl">
                <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#C6A76A] block mb-2">
                  Love Notes • Mansa &amp; Worldwide
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-[#F5F0E8] leading-relaxed">
                  "Every love story has its own rhythm, quiet laughter, and wild celebration. We craft visual memories that let you relive every glance."
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={() => setPortfolioMode("hub")}
                    className="px-6 py-2.5 rounded-full border border-[#35332F] text-xs uppercase tracking-widest font-cinzel text-[#B8B5AF] hover:border-[#C6A76A]"
                  >
                    ← All Collections
                  </button>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] text-xs uppercase tracking-wider font-cinzel font-bold shadow-lg"
                  >
                    Book Pre-Wedding Shoot
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              LAYOUT 4: ENGAGEMENTS — THE TILED GALLERY (RIGHT TEMPLATE)
             ======================================================== */}
          {portfolioMode === "engagements" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#35332F] pb-4 flex items-center justify-between">
                <button
                  onClick={() => setPortfolioMode("hub")}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A76A] hover:underline font-cinzel"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Visual Hub
                </button>
                <span className="font-cinzel text-xs text-[#C6A76A]">Ceremonies • Mosaic Tile Grid</span>
              </div>

              {/* High-Density Tiled Mosaic Grid (Matching Right of Freya Template) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {tiledGalleryItems.map((tile, tIdx) => (
                  <div
                    key={tIdx}
                    onClick={() =>
                      setSelectedImage({
                        src: tile.src,
                        title: tile.title,
                        category: "events",
                        description: `Sacred rituals and candid celebration moments captured in Mansa, Punjab.`,
                      })
                    }
                    className={`portfolio-photo-card group relative ${tile.aspect} rounded-2xl overflow-hidden cursor-pointer border border-[#35332F] hover:border-[#C6A76A] bg-[#14110E] transition-all duration-500 hover:-translate-y-1.5 shadow-xl`}
                  >
                    <img
                      src={tile.src}
                      alt={tile.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/95 via-[#0B0B0D]/30 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#C6A76A] block mb-0.5">
                        {tile.tag}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base text-white leading-tight">
                        {tile.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#35332F] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setPortfolioMode("hub")}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B8B5AF] hover:text-[#C6A76A] font-cinzel"
                >
                  ← BACK TO ALL PORTFOLIO COLLECTIONS
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] text-xs font-cinzel font-bold uppercase tracking-wider shadow-lg"
                >
                  Book Ring Ceremony / Sangeet on WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* ========================================================
              LAYOUT 5: CINEMATIC — THE 4K MOTION SUITE
             ======================================================== */}
          {portfolioMode === "cinematic" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#35332F] pb-4 flex items-center justify-between">
                <button
                  onClick={() => setPortfolioMode("hub")}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A76A] hover:underline font-cinzel"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Visual Hub
                </button>
                <span className="font-cinzel text-xs text-[#C6A76A]">4K Cinema • Sony FX3 Motion</span>
              </div>

              {/* 3 Cinema Teaser Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {cinematicFilms.map((film, fIdx) => (
                  <div
                    key={fIdx}
                    className="group rounded-3xl overflow-hidden border border-[#35332F] hover:border-[#C6A76A] bg-[#171719] shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
                  >
                    <div
                      className="relative h-64 sm:h-72 overflow-hidden cursor-pointer"
                      onClick={() =>
                        setActiveCinemaModal({
                          title: film.title,
                          subtitle: film.subtitle,
                          desc: film.desc,
                          duration: film.runtime,
                          resolution: film.camera,
                          audio: film.audio,
                          cover: film.cover,
                        })
                      }
                    >
                      <img
                        src={film.cover}
                        alt={film.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#C6A76A] text-[#0B0B0D] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-cinzel font-bold tracking-wider text-[#C6A76A] border border-[#C6A76A]/40">
                        {film.runtime}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#C6A76A] font-cinzel font-bold block mb-1">
                          {film.camera}
                        </span>
                        <h4 className="font-serif text-xl text-[#F5F0E8] leading-tight mb-2">
                          {film.title}
                        </h4>
                        <p className="text-xs text-[#B8B5AF] leading-relaxed mb-4">
                          {film.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#35332F] flex items-center justify-between">
                        <button
                          onClick={() =>
                            setActiveCinemaModal({
                              title: film.title,
                              subtitle: film.subtitle,
                              desc: film.desc,
                              duration: film.runtime,
                              resolution: film.camera,
                              audio: film.audio,
                              cover: film.cover,
                            })
                          }
                          className="text-xs text-[#C6A76A] hover:underline font-cinzel font-semibold inline-flex items-center gap-1"
                        >
                          Play Teaser Preview →
                        </button>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-full bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] text-[11px] font-bold font-cinzel"
                        >
                          Inquire Film
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#35332F] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setPortfolioMode("hub")}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B8B5AF] hover:text-[#C6A76A] font-cinzel"
                >
                  ← BACK TO ALL PORTFOLIO COLLECTIONS
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] text-xs font-cinzel font-bold uppercase tracking-wider shadow-lg"
                >
                  Book 4K Wedding Cinema Film on WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* ========================================================
              LAYOUT 6: BRIDAL PORTRAITS — REGAL EDITORIAL FINE-ART
             ======================================================== */}
          {portfolioMode === "bridal" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-[#35332F] pb-4 flex items-center justify-between">
                <button
                  onClick={() => setPortfolioMode("hub")}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A76A] hover:underline font-cinzel"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Visual Hub
                </button>
                <span className="font-cinzel text-xs text-[#C6A76A]">Bridal • Fine-Art Editorial</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {bridalFineArt.map((item, bIdx) => (
                  <div
                    key={bIdx}
                    onClick={() =>
                      setSelectedImage({
                        src: item.src,
                        title: item.title,
                        category: "portraits",
                        description: item.desc,
                      })
                    }
                    className="portfolio-photo-card group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-[#35332F] hover:border-[#C6A76A] bg-[#14110E] transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/95 via-[#0B0B0D]/30 to-transparent" />

                    <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-[#C6A76A]/40 text-[#C6A76A] text-[9px] font-cinzel font-bold tracking-widest uppercase">
                      {item.tag}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h4 className="font-serif text-2xl text-white font-normal mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#D1CBC0] line-clamp-2 mb-2">
                        {item.desc}
                      </p>
                      <span className="text-[11px] text-[#C6A76A] uppercase font-cinzel tracking-wider flex items-center gap-1">
                        Expand Fine-Art Ultra-HD <ZoomIn className="w-3.5 h-3.5 ml-1" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#35332F] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setPortfolioMode("hub")}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B8B5AF] hover:text-[#C6A76A] font-cinzel"
                >
                  ← BACK TO ALL PORTFOLIO COLLECTIONS
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] text-xs font-cinzel font-bold uppercase tracking-wider shadow-lg"
                >
                  Book Regal Bridal Shoot on WhatsApp
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Cinematic Film Teaser Modal */}
      {activeCinemaModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveCinemaModal(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#171719] rounded-3xl overflow-hidden border border-[#C6A76A] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCinemaModal(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/80 text-white hover:text-[#C6A76A] border border-[#35332F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Mockup with Cover */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeCinemaModal.cover}
                alt={activeCinemaModal.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#C6A76A] text-[#0B0B0D] flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <span className="text-white font-cinzel text-xs tracking-widest uppercase mt-4 bg-black/70 px-4 py-1.5 rounded-full border border-white/20">
                  4K Master Cinema Stream Active
                </span>
              </div>
            </div>

            {/* Details & Specs */}
            <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C6A76A] font-cinzel font-bold">
                  {activeCinemaModal.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#F5F0E8] mt-1">
                  {activeCinemaModal.title}
                </h3>
                <p className="text-sm text-[#B8B5AF] mt-2 leading-relaxed">
                  {activeCinemaModal.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#E0DBD0]">
                  <span className="px-3 py-1 rounded-full bg-[#202023] border border-[#35332F]">
                    🎥 {activeCinemaModal.resolution}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#202023] border border-[#35332F]">
                    🎵 {activeCinemaModal.audio}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#202023] border border-[#35332F]">
                    ⏱️ Runtime: {activeCinemaModal.duration}
                  </span>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <a
                  href={`https://wa.me/919700598098?text=${encodeURIComponent(
                    `Hi Pictorial Photography! I watched the teaser "${activeCinemaModal.title}" and would love to book full 4K cinema coverage for our wedding!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-cinzel font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" /> Book Cinema Film on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0B0B0D]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-gradient-to-b from-[#202023] to-[#100E0C] rounded-2xl overflow-hidden border border-[#35332F] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(229,196,120,0.15)] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#0B0B0D]/80 text-[#F5F0E8] hover:text-[#C6A76A] border border-[#35332F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-3/5 bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>

            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C6A76A]">
                  Pictorial Photography
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#F5F0E8] mt-2">
                  {selectedImage.title}
                </h3>
                <div className="w-12 h-0.5 bg-[#C6A76A] my-3" />
                <p className="text-sm text-[#B8B5AF] leading-relaxed">
                  {selectedImage.description}
                </p>
                <div className="mt-6 flex flex-col gap-2.5 text-xs text-[#E0DBD0]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A76A]" /> 4K Ultra-HD Resolution
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A76A]" /> Full Studio Color Grading
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A76A]" /> Mansa & Worldwide Availability
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#35332F]">
                <a
                  href={`https://wa.me/919700598098?text=${encodeURIComponent(
                    `Hi Pictorial Photography! I saw your work "${selectedImage.title}" and would love to discuss a similar shoot!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-cinzel font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-[#C6A76A]/25"
                >
                  <MessageCircle className="w-4 h-4 fill-current" /> Book This Style on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About & Studio Philosophy */}
      <section id="about" className="py-24 bg-[#171719] border-t border-[#35332F] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#35332F] shadow-2xl">
                <img
                  src={brideImg}
                  alt="Bride portrait by Pictorial Photography"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent" />
              </div>

              {/* Decorative Floating Card */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-[#0B0B0D]/95 border border-[#C6A76A] p-6 rounded-2xl shadow-2xl backdrop-blur-md max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#C6A76A]/15 text-[#C6A76A] rounded-xl border border-[#35332F]">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-serif text-lg font-medium text-[#F5F0E8]">Mansa, Punjab</h5>
                    <p className="text-xs text-[#B8B5AF]">Luxury Studio & Outdoor Shoots</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div>
              <span className="text-[#C6A76A] uppercase tracking-[0.28em] text-xs font-semibold font-cinzel">
                Our Story & Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal mt-2 text-[#F5F0E8] leading-tight">
                Preserving Love Stories As Timeless Works of Art
              </h2>
              <div className="flex items-center gap-2 my-5">
                <span className="w-12 h-px bg-[#C6A76A]/50" />
                <span className="text-xs text-[#C6A76A]">✦</span>
                <span className="w-12 h-px bg-[#C6A76A]/50" />
              </div>

              <p className="text-[#B8B5AF] text-sm sm:text-base font-light leading-relaxed mb-6">
                Based in Mansa, Punjab, <strong className="text-[#F5F0E8] font-medium">Pictorial Photography</strong> was founded on a simple passion: to honor the depth, sacred rituals, and candid laughter of authentic celebrations without staging or artificiality.
              </p>
              <p className="text-[#B8B5AF] text-sm sm:text-base font-light leading-relaxed mb-8">
                From morning Anand Karaj chants to tears of joy during the Vidai, our team works unobtrusively with premier cinema cameras, prime lenses, and bespoke color grading to deliver memories you will treasure for generations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="about-feature-card flex items-start gap-3 p-5 rounded-xl bg-gradient-to-b from-[#202023] to-[#110F0D] border border-[#35332F] hover:border-[#C6A76A] transition-all">
                  <ShieldCheck className="w-5 h-5 text-[#C6A76A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F0E8]">100% Client Privacy</h4>
                    <p className="text-xs text-[#B8B5AF] mt-1">Private password-locked cloud gallery for your family.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-5 rounded-xl bg-gradient-to-b from-[#202023] to-[#110F0D] border border-[#35332F] hover:border-[#C6A76A] transition-all">
                  <Award className="w-5 h-5 text-[#C6A76A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5F0E8]">Bespoke Color Science</h4>
                    <p className="text-xs text-[#B8B5AF] mt-1">Every picture hand-retouched with regal tones.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-cinzel font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-lg shadow-[#C6A76A]/25 hover:scale-105"
                >
                  Schedule A Consultation <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-[#0B0B0D] border-t border-[#35332F] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C6A76A] uppercase tracking-[0.28em] text-xs font-semibold font-cinzel">
              The Pictorial Distinction
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal mt-2 text-[#F5F0E8]">
              Why Celebrated Families Trust Us
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="w-12 h-px bg-[#C6A76A]/50" />
              <span className="text-xs text-[#C6A76A]">✦</span>
              <span className="w-12 h-px bg-[#C6A76A]/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="why-us-card p-8 rounded-2xl bg-gradient-to-b from-[#202023] to-[#100E0C] border border-[#35332F] text-center hover:border-[#C6A76A]/55 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(229,196,120,0.15)]">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#C6A76A]/15 text-[#C6A76A] border border-[#35332F] flex items-center justify-center mb-6">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#F5F0E8]">Cinematic Film Reels</h3>
              <p className="text-xs text-[#B8B5AF] mt-3 leading-relaxed">
                4K UHD video production, custom soundscapes, speech audio recording, and stabilized gimbal work that feels like a feature film.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#202023] to-[#100E0C] border border-[#35332F] text-center hover:border-[#C6A76A]/55 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(229,196,120,0.15)]">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#C6A76A]/15 text-[#C6A76A] border border-[#35332F] flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#F5F0E8]">Unobtrusive Candid Moments</h3>
              <p className="text-xs text-[#B8B5AF] mt-3 leading-relaxed">
                We let your celebration unfold naturally without interrupting sacred moments, capturing the true warmth of family tears and laughter.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#202023] to-[#100E0C] border border-[#35332F] text-center hover:border-[#C6A76A]/55 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(229,196,120,0.15)]">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#C6A76A]/15 text-[#C6A76A] border border-[#35332F] flex items-center justify-center mb-6">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#F5F0E8]">Private Client Gallery</h3>
              <p className="text-xs text-[#B8B5AF] mt-3 leading-relaxed">
                Couples receive unique encrypted login access to view, favorite, and download full-resolution wedding media safely from anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials / Reviews */}
      <section id="reviews" className="py-24 bg-[#171719] border-t border-[#35332F] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C6A76A] uppercase tracking-[0.28em] text-xs font-semibold font-cinzel">
              Client Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal mt-2 text-[#F5F0E8]">
              Cherished Words From Our Couples
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="w-12 h-px bg-[#C6A76A]/50" />
              <span className="text-xs text-[#C6A76A]">✦</span>
              <span className="w-12 h-px bg-[#C6A76A]/50" />
            </div>
            <p className="text-[#B8B5AF] text-sm sm:text-base mt-4 font-light">
              Real reflections of trust, joyful tears, and lifelong memories captured across Punjab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Pictorial Photography covered our Anand Karaj and evening reception in Mansa with such royal grace! The 4K cinematic trailer brought tears to our parents' eyes. Every candid moment was captured without interrupting our rituals.",
                couple: "Harpreet & Simran Kaur",
                event: "Royal Wedding • Mansa, Punjab",
                rating: 5,
              },
              {
                quote:
                  "The sunset pre-wedding shoot was pure magic! They made us feel so comfortable in front of the camera, and the colors look like an editorial magazine shoot. Our wedding album is the most treasured keepsake in our home.",
                couple: "Gurinder Singh & Navneet",
                event: "Pre-Wedding & Wedding • Bathinda",
                rating: 5,
              },
              {
                quote:
                  "Hands down the best photography and cinematography team in the region! Unmatched color grading, top-tier cinema lenses, and ultra-fast private gallery delivery. Highly recommended to every couple!",
                couple: "Amanpreet & Jaspreet",
                event: "Luxury Wedding • Mansa",
                rating: 5,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="review-card p-8 rounded-2xl bg-gradient-to-b from-[#202023] to-[#100E0C] border border-[#35332F] flex flex-col justify-between hover:border-[#C6A76A]/55 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.7),0_0_20px_rgba(229,196,120,0.12)]"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4 text-[#C6A76A]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#D8D2C5] font-light leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-[#35332F] flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-medium text-[#F5F0E8]">
                      {item.couple}
                    </h4>
                    <p className="text-[11px] text-[#C6A76A] tracking-wider uppercase font-cinzel font-semibold mt-0.5">
                      {item.event}
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-[#C6A76A]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Gallery Preview Section */}
      <section id="client-gallery" className="py-24 bg-[#0B0B0D] border-t border-[#35332F] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {!unlockedGallery ? (
            /* LOCKED LOGIN STATE */
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-[#C6A76A]/15 text-[#C6A76A] mb-4 border border-[#35332F]">
                <Lock className="w-7 h-7" />
              </div>
              <span className="block text-[#C6A76A] uppercase tracking-[0.28em] text-xs font-semibold font-cinzel">
                Private Access Portal
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal mt-2 text-[#F5F0E8]">
                Your Memories, Just One Login Away
              </h2>
              <div className="flex items-center justify-center gap-2 my-4">
                <span className="w-12 h-px bg-[#C6A76A]/50" />
                <span className="text-xs text-[#C6A76A]">✦</span>
                <span className="w-12 h-px bg-[#C6A76A]/50" />
              </div>
              <p className="text-[#B8B5AF] max-w-xl mx-auto text-sm sm:text-base font-light mb-8">
                Every client booked with Pictorial Photography receives dedicated Client ID & Password credentials created by our studio admin. Log in below to view and download your full-resolution wedding gallery.
              </p>

              <div className="client-login-card max-w-md mx-auto bg-gradient-to-b from-[#202023] to-[#100E0C] p-7 sm:p-9 rounded-2xl border border-[#35332F] hover:border-[#C6A76A]/60 transition-all shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(229,196,120,0.15)] text-left">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] font-cinzel text-[#C6A76A] mb-4 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Client Gallery Access
                </h4>

                {clientAuthError && (
                  <div className="mb-4 p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-200 text-xs">
                    {clientAuthError}
                  </div>
                )}

                <form onSubmit={handleClientGalleryLogin} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#B8B5AF] mb-1.5 font-medium">
                      Client ID
                    </label>
                    <input
                      type="text"
                      value={clientIdInput}
                      onChange={(e) => setClientIdInput(e.target.value)}
                      placeholder="e.g. PIC-2026-081"
                      required
                      className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#777064] focus:outline-none focus:border-[#C6A76A] focus:ring-1 focus:ring-[#C6A76A] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#B8B5AF] mb-1.5 font-medium">
                      Private Access Password
                    </label>
                    <input
                      type="password"
                      value={clientPasswordInput}
                      onChange={(e) => setClientPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#777064] focus:outline-none focus:border-[#C6A76A] focus:ring-1 focus:ring-[#C6A76A] transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-cinzel font-bold text-xs uppercase tracking-[0.15em] transition-all mt-2 shadow-lg shadow-[#C6A76A]/25"
                  >
                    Access My Album
                  </button>
                </form>

                {/* Sample credentials demo helper */}
                <div className="mt-5 pt-4 border-t border-[#35332F] text-center">
                  <p className="text-[10px] uppercase tracking-wider text-[#8E8779] mb-2 font-cinzel">
                    Demo Client Vault Quick Fill:
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setClientIdInput("PIC-2026-081");
                        setClientPasswordInput("simran@2026");
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#0B0B0D] border border-[#35332F] hover:border-[#C6A76A] text-[#C6A76A] transition"
                    >
                      Harpreet & Simran
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setClientIdInput("PIC-2026-082");
                        setClientPasswordInput("navneet@2026");
                      }}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#0B0B0D] border border-[#35332F] hover:border-[#C6A76A] text-[#C6A76A] transition"
                    >
                      Gurinder & Navneet
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-center text-[#9E9789] mt-4">
                  Need your Client ID or password reset?{" "}
                  <a
                    href={WHATSAPP_URL}
                    className="text-[#C6A76A] hover:text-[#C6A76A] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Studio
                  </a>
                </p>
              </div>
            </div>
          ) : (
            /* UNLOCKED CLIENT ALBUM PORTAL */
            <div className="space-y-8 animate-fadeIn">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-[#202023] via-[#202023] to-[#14110E] border border-[#35332F] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6A76A]/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-[#C6A76A]/20 border border-[#35332F] text-[#C6A76A] font-cinzel text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> Private Vault • {unlockedGallery.clientId}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-[10px] font-medium">
                        Active Client Session
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F0E8]">
                      {unlockedGallery.clientName}
                    </h2>
                    <p className="text-[#C6A76A] text-sm sm:text-base font-cinzel tracking-wider mt-1">
                      {unlockedGallery.eventTitle}
                    </p>
                    <p className="text-xs text-[#A8A49C] mt-1.5 flex items-center gap-3">
                      <span>📅 {unlockedGallery.eventDate}</span>
                      <span>•</span>
                      <span>📍 {unlockedGallery.location}</span>
                      <span>•</span>
                      <span className="text-[#C6A76A] font-semibold">{unlockedGallery.photos.length} High-Res Photographs</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        // Download prompt
                        alert("Starting download of full resolution wedding photos...");
                      }}
                      className="px-5 py-3 rounded-xl bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-[#C6A76A]/20"
                    >
                      <Download className="w-4 h-4" /> Download All
                    </button>

                    <button
                      onClick={() => {
                        setUnlockedGallery(null);
                        setClientIdInput("");
                        setClientPasswordInput("");
                      }}
                      className="px-4 py-3 rounded-xl bg-[#0B0B0D] border border-[#35332F] hover:border-red-500 hover:text-red-400 text-[#B8B5AF] text-xs font-medium flex items-center gap-2 transition"
                    >
                      <LogOut className="w-4 h-4" /> Exit Gallery
                    </button>
                  </div>
                </div>
              </div>

              {/* Photo Masonry / Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {unlockedGallery.photos.map((photoUrl, pIdx) => (
                  <div
                    key={pIdx}
                    className="group relative rounded-2xl overflow-hidden bg-[#202023] border border-[#35332F] hover:border-[#C6A76A] shadow-xl cursor-pointer aspect-[4/5]"
                    onClick={() => setActiveGalleryLightboxImg(photoUrl)}
                  >
                    <img
                      src={photoUrl}
                      alt={`${unlockedGallery.clientName} - Photo ${pIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                      <div className="flex justify-end">
                        <span className="p-2 rounded-full bg-black/60 backdrop-blur-md text-[#C6A76A] border border-[#35332F]">
                          <ZoomIn className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-white">
                        <span className="font-cinzel tracking-wider">Photo #{pIdx + 1}</span>
                        <span className="text-[#C6A76A] text-[11px]">Click to Expand Ultra-HD</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Client Gallery Lightbox Modal */}
        {activeGalleryLightboxImg && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveGalleryLightboxImg(null)}
          >
            <div
              className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveGalleryLightboxImg(null)}
                className="absolute -top-12 right-0 p-2 text-[#B8B5AF] hover:text-white bg-[#202023]/80 rounded-full border border-[#35332F] transition"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={activeGalleryLightboxImg}
                alt="Enlarged"
                className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-[#35332F]"
              />

              <div className="mt-4 flex items-center gap-4">
                <a
                  href={activeGalleryLightboxImg}
                  download="pictorial-photography.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <Download className="w-4 h-4" /> Download Ultra-HD File
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Contact & Enquiry Booking */}
      <section id="contact" className="py-24 bg-[#171719] border-t border-[#35332F] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Details */}
            <div>
              <span className="text-[#C6A76A] uppercase tracking-[0.25em] text-xs font-semibold font-cinzel">
                Get In Touch
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal mt-2 text-[#F5F0E8] leading-tight">
                Let's Create Timeless Cinema For Your Big Day
              </h2>
              <div className="w-20 h-0.5 bg-[#C6A76A] my-6" />

              <p className="text-[#B8B5AF] text-sm sm:text-base font-light leading-relaxed mb-8">
                Dates for the upcoming wedding season fill quickly. Send us an enquiry to check availability for your wedding, pre-wedding, or celebration in Mansa or beyond.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#202023] border border-[#35332F] text-[#C6A76A] rounded-xl shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#A8A49C] uppercase tracking-wider">Phone & WhatsApp</span>
                    <a
                      href="tel:+919700598098"
                      className="block text-base font-medium text-[#F5F0E8] hover:text-[#C6A76A] transition-colors"
                    >
                      +91 9700598098
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#202023] border border-[#35332F] text-[#C6A76A] rounded-xl shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#A8A49C] uppercase tracking-wider">Studio Location</span>
                    <p className="text-base font-medium text-[#F5F0E8]">
                      Mansa, Punjab — 151505, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#202023] border border-[#35332F] text-[#C6A76A] rounded-xl shadow-md">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#A8A49C] uppercase tracking-wider">Instagram</span>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-base font-medium text-[#F5F0E8] hover:text-[#C6A76A] transition-colors"
                    >
                      @pictorialphotography
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#1A1613] to-[#120F0D] border border-[#35332F] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                  <h4 className="text-sm font-semibold text-[#F5F0E8]">Prefer Instant Chat?</h4>
                  <p className="text-xs text-[#B8B5AF] mt-0.5">We reply promptly on WhatsApp.</p>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-cinzel font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full whitespace-nowrap transition-all shadow-lg shadow-[#C6A76A]/25 hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 fill-current" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="contact-form-card bg-gradient-to-b from-[#202023] to-[#100E0C] p-8 sm:p-10 rounded-2xl border border-[#35332F] shadow-2xl">
              <h3 className="font-serif text-2xl font-medium text-[#F5F0E8] mb-2">
                Send Direct Enquiry
              </h3>
              <p className="text-xs text-[#B8B5AF] mb-6">
                Fill the details below to receive our studio brochure and custom pricing quote.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-[#142315] border border-green-500/40 text-center">
                  <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h4 className="font-serif text-xl font-medium text-[#F5F0E8]">Thank You!</h4>
                  <p className="text-xs text-[#D1CBC0] mt-2">
                    Your enquiry details have been forwarded to our WhatsApp studio team (+91 9700598098). We will connect with you shortly!
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 text-xs font-semibold text-[#C6A76A] hover:underline"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B8B5AF] mb-1.5 font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Gurpreet Singh"
                      className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#777064] focus:outline-none focus:border-[#C6A76A] focus:ring-1 focus:ring-[#C6A76A] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B8B5AF] mb-1.5 font-medium">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#777064] focus:outline-none focus:border-[#C6A76A] focus:ring-1 focus:ring-[#C6A76A] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#B8B5AF] mb-1.5 font-medium">
                        Event Type
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] focus:outline-none focus:border-[#C6A76A] focus:ring-1 focus:ring-[#C6A76A] transition-all"
                      >
                        <option value="Wedding" className="bg-[#202023] text-[#F5F0E8]">Royal Wedding</option>
                        <option value="Pre-Wedding" className="bg-[#202023] text-[#F5F0E8]">Pre-Wedding Shoot</option>
                        <option value="Bridal Portrait" className="bg-[#202023] text-[#F5F0E8]">Bridal Portraits</option>
                        <option value="Ring Ceremony" className="bg-[#202023] text-[#F5F0E8]">Ring Ceremony / Engagement</option>
                        <option value="Cinematic Film" className="bg-[#202023] text-[#F5F0E8]">Cinematic Film Only</option>
                        <option value="Birthday / Party" className="bg-[#202023] text-[#F5F0E8]">Birthday / Milestone</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#B8B5AF] mb-1.5 font-medium">
                        Expected Event Date
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] focus:outline-none focus:border-[#C6A76A] focus:ring-1 focus:ring-[#C6A76A] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B8B5AF] mb-1.5 font-medium">
                      Event Location & Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your wedding venue, dates, or specific cinematic expectations..."
                      className="w-full bg-[#0B0B0D] border border-[#35332F] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#777064] focus:outline-none focus:border-[#C6A76A] focus:ring-1 focus:ring-[#C6A76A] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#C6A76A] hover:bg-[#E0C58F] text-[#0B0B0D] font-cinzel font-bold text-xs uppercase tracking-[0.15em] transition-all shadow-xl shadow-[#C6A76A]/25 flex items-center justify-center gap-2 hover:brightness-105"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" /> Submit & Connect on WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-50">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2ae26e] hover:to-[#179f8f] text-white px-5 py-3.5 rounded-full shadow-2xl shadow-green-950/60 transition-all hover:scale-105 group border border-emerald-400/30"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="text-xs font-bold tracking-wider uppercase font-cinzel hidden sm:inline">
            WhatsApp Us
          </span>
        </a>
      </aside>

      {/* Footer */}
      <footer className="bg-[#0B0B0D] border-t border-[#35332F] py-14 text-[#B8B5AF] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div
            onClick={(e) => {
              e.preventDefault();
              const now = Date.now();
              const win = window as any;
              if (!win._secClicks || now - win._secLastClick > 2000) {
                win._secClicks = 1;
              } else {
                win._secClicks += 1;
              }
              win._secLastClick = now;
              if (win._secClicks >= 5) {
                win._secClicks = 0;
                window.location.href = "/admin#pictorial-mansa-2580";
              }
            }}
          >
            <StudioLogo size="large" />
          </div>

          <div className="flex flex-wrap justify-center gap-7 text-[#B8B5AF] font-cinzel text-xs tracking-wider uppercase">
            <a href="#home" className="hover:text-[#C6A76A] transition-colors">
              Home
            </a>
            <a href="#services" className="hover:text-[#C6A76A] transition-colors">
              Services
            </a>
            <a href="#portfolio" className="hover:text-[#C6A76A] transition-colors">
              Portfolio
            </a>
            <a href="#about" className="hover:text-[#C6A76A] transition-colors">
              About
            </a>
            <a href="#client-gallery" className="hover:text-[#C6A76A] transition-colors">
              Client Portal
            </a>
            <a href="#contact" className="hover:text-[#C6A76A] transition-colors">
              Book Shoot
            </a>

          </div>

          <div className="text-center md:text-right">
            <p className="text-[#B8B5AF]">© {new Date().getFullYear()} Pictorial Photography. All rights reserved.</p>
            <p className="text-[11px] text-[#8E8779] mt-1 font-cinzel tracking-wider">Mansa, Punjab • Contact: +91 9700598098</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
