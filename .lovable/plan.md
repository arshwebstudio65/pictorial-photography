# Pictorial Photography — Website Plan

A luxury, cinematic site for Pictorial Photography (Mansa, Punjab) with a public portfolio and a secure private client gallery. Built in two phases so the public site is live quickly, then the gallery system is added on Lovable Cloud.

## Look and feel
- Matte black (#0B0B0B), charcoal (#171717), champagne gold (#C6A46A), soft ivory (#F7F4EE).
- Elegant serif headings (Cormorant Garamond) with a clean sans body (Manrope).
- Full-width imagery, generous spacing, subtle gold lines, gentle fades on scroll.
- Sample cinematic images are generated as clearly replaceable placeholders until the owner uploads real work (labelled "Sample" in the admin).

## Phase 1 — Public website
Pages, each with its own title, description and social tags (local SEO for Mansa):
- **Home**: full-screen hero (video placeholder with poster + dark overlay), intro, 6 service cards, featured portfolio grid, cinematic film showcase with fullscreen player, "Why choose us" (no unsupported claims), Client Gallery preview ("Your Memories, Just One Login Away."), Instagram section, contact CTA, footer.
- **About Us**: philosophy, approach, storytelling — no invented names, history or years.
- **Services**: 8 services (A–H) each with image, description, WhatsApp enquiry button with a prefilled message. No prices.
- **Portfolio**: category filters (All, Wedding, Pre-Wedding, Birthday, Engagement, Ring Ceremony, Other Events, Cinematic Films), masonry grid, lightbox with prev/next, video playback, lazy loading.
- **Contact**: details (WhatsApp +91 9700598098, Instagram, Mansa), enquiry form (name, phone, event type, date, message) with validation; enquiries saved and viewable by admin.
- Floating WhatsApp button, mobile menu, distinct gold "Client Gallery" nav button, sitemap.xml and robots.txt (private pages excluded / noindex).

## Phase 2 — Private client gallery (Lovable Cloud)
- **/client-gallery login**: Client ID + password, show/hide, loading and error states, "contact the studio to reset" note. No public sign-up.
- **Client dashboard**: welcome, their albums only, event names/dates, photo and video counts.
- **Album page**: photo grid, fullscreen viewer with prev/next, single download, "download all" only if the admin enabled it; video player with download only if allowed.
- **Admin dashboard** (admin role only): create/edit/deactivate/delete clients, auto-generate Client ID and temporary password, reset password, create albums (title, event, date, download toggle), upload photos/videos with progress and type/size checks, manage public portfolio items, view contact enquiries, edit basic contact info.
- First admin account: you sign up once via a hidden admin setup step, then it locks.

## Security
- Accounts handled by Lovable Cloud auth (hashed passwords); Client ID maps to an internal login email so clients only ever see their ID.
- Separate roles table (admin / client); every album and media row protected by database access rules so a client can only read their own.
- Private media in a private storage bucket, delivered via short-lived signed links; public portfolio in a separate public bucket.
- Client creation and password resets run server-side, admin-verified.
- Basic login rate limiting (attempt tracking per Client ID).
- Tested with two separate client accounts to confirm neither can see the other's albums.

## Technical details
- TanStack Start routes: `/`, `/about`, `/services`, `/portfolio`, `/contact`, `/client-gallery`, `/_authenticated/gallery`, `/_authenticated/gallery/$albumId`, `/_authenticated/admin/*`.
- Tables: user_roles, clients (client_id, name, active), albums, media, portfolio_items, enquiries, login_attempts, site_settings — all with GRANTs + RLS.
- Buckets: `client-media` (private, size limit), `portfolio` (public).
- Server functions with requireSupabaseAuth + has_role checks for admin actions; supabaseAdmin only inside admin-verified handlers.

## Your input needed later
- Real photos/videos to replace the samples (upload via the admin dashboard).
