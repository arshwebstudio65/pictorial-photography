import { describe, it, expect, beforeEach } from "vitest";
import {
  ADMIN_CREDENTIALS,
  getStudioBookings,
  saveStudioBooking,
  deleteStudioBooking,
  getClientFolders,
  saveClientFolder,
  deleteClientFolder,
  authenticateClientGallery,
  getStudioInquiries,
  addStudioInquiry,
  type BookingEvent,
  type ClientGalleryFolder,
} from "../lib/studio-store";

describe("Pictorial Studio Store & Admin System", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should have correct admin credentials as specified by user", () => {
    // Credentials are now obfuscated — verify via the .verify() method
    expect(ADMIN_CREDENTIALS.verify("harprem123", "pictorial@2580")).toBe(true);
    expect(ADMIN_CREDENTIALS.verify("wronguser", "wrongpass")).toBe(false);
  });

  it("should retrieve default studio wedding bookings in Mansa", () => {
    const bookings = getStudioBookings();
    expect(bookings.length).toBeGreaterThan(0);
    expect(bookings[0]).toHaveProperty("clientName");
    expect(bookings[0]).toHaveProperty("eventDate");
    expect(bookings[0]).toHaveProperty("totalAmount");
  });

  it("should add a new wedding booking and calculate balance", () => {
    const newBooking: BookingEvent = {
      id: "bkg-test-1",
      clientName: "Simranjeet Singh & Amanjot Kaur",
      phone: "+91 98765 99999",
      eventType: "Anand Karaj",
      eventDate: "2026-12-20",
      eventTime: "10:00 AM",
      venue: "Royal Palace Mansa",
      package: "Signature 4K Wedding",
      totalAmount: 180000,
      advancePaid: 80000,
      balanceDue: 100000,
      status: "Confirmed",
      crew: "2 Candid + 2 Cinema",
      notes: "Morning ceremony",
    };

    saveStudioBooking(newBooking);
    const updated = getStudioBookings();
    const found = updated.find((b) => b.id === "bkg-test-1");
    expect(found).toBeDefined();
    expect(found?.clientName).toBe("Simranjeet Singh & Amanjot Kaur");
    expect(found?.balanceDue).toBe(100000);
  });

  it("should allow admin to create custom client folder and authenticate client with that ID and password", () => {
    const newFolder: ClientGalleryFolder = {
      id: "fld-test-1",
      clientId: "PIC-2026-999",
      password: "customSecret@2026",
      clientName: "Rajveer & Jasmine",
      eventTitle: "Luxury Destination Pre-Wedding",
      eventDate: "December 10, 2026",
      location: "Mansa, Punjab",
      coverImage: "/src/assets/hero.jpg",
      photos: ["/src/assets/hero.jpg", "/src/assets/bride.jpg"],
      canDownload: true,
      createdAt: "2026-11-10",
    };

    saveClientFolder(newFolder);

    // Verify authentication succeeds with the exact credentials
    const authed = authenticateClientGallery("PIC-2026-999", "customSecret@2026");
    expect(authed).not.toBeNull();
    expect(authed?.clientName).toBe("Rajveer & Jasmine");
    expect(authed?.photos.length).toBe(2);

    // Verify case-insensitive client ID match
    const authedCase = authenticateClientGallery("pic-2026-999", "customSecret@2026");
    expect(authedCase).not.toBeNull();

    // Verify wrong password fails
    const failed = authenticateClientGallery("PIC-2026-999", "wrongPassword");
    expect(failed).toBeNull();
  });

  it("should add website inquiries and display in admin leads list", () => {
    const inq = addStudioInquiry({
      name: "Harman Singh",
      phone: "+91 97000 11111",
      eventType: "Wedding Film",
      eventDate: "2026-12-25",
      message: "Please share price details for wedding in Mansa",
    });

    const allInquiries = getStudioInquiries();
    expect(allInquiries.some((i) => i.id === inq.id)).toBe(true);
  });
});
