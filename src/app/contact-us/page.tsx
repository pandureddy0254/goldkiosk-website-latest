"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

interface ContactForm {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface KioskLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  status: "active" | "coming-soon";
}

const KIOSK_LOCATIONS: KioskLocation[] = [
  { id: 1, name: "Westfield Mall", address: "1131 S Wickham Rd", city: "Melbourne", state: "FL", country: "USA", lat: 28.0836, lng: -80.6081, status: "active" },
  { id: 2, name: "Dover Central Plaza", address: "8 The Green, STE B", city: "Dover", state: "DE", country: "USA", lat: 39.1582, lng: -75.5244, status: "active" },
  { id: 3, name: "Times Square Kiosk", address: "235 W 46th St", city: "New York", state: "NY", country: "USA", lat: 40.7580, lng: -73.9855, status: "active" },
  { id: 4, name: "Trincity Mall", address: "Churchill Roosevelt Hwy", city: "Trincity", state: "Trinidad", country: "Trinidad & Tobago", lat: 10.6314, lng: -61.3483, status: "active" },
  { id: 5, name: "Gulf City Mall", address: "South Trunk Rd", city: "La Romaine", state: "Trinidad", country: "Trinidad & Tobago", lat: 10.2768, lng: -61.4683, status: "active" },
  { id: 6, name: "Aventura Mall", address: "19501 Biscayne Blvd", city: "Aventura", state: "FL", country: "USA", lat: 25.9567, lng: -80.1420, status: "active" },
  { id: 7, name: "King of Prussia Mall", address: "160 N Gulph Rd", city: "King of Prussia", state: "PA", country: "USA", lat: 40.0892, lng: -75.3929, status: "coming-soon" },
  { id: 8, name: "Galleria Dallas", address: "13350 Dallas Pkwy", city: "Dallas", state: "TX", country: "USA", lat: 32.9308, lng: -96.8225, status: "active" },
  { id: 9, name: "Ala Moana Center", address: "1450 Ala Moana Blvd", city: "Honolulu", state: "HI", country: "USA", lat: 21.2912, lng: -157.8437, status: "coming-soon" },
];

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function ContactUs() {
  const [form, setForm] = useState<ContactForm>({ fullName: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [sortByNearest, setSortByNearest] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<KioskLocation | null>(null);
  const [locatingUser, setLocatingUser] = useState(false);

  const countries = useMemo(() => {
    const c = new Set(KIOSK_LOCATIONS.map((l) => l.country));
    return ["All", ...Array.from(c)];
  }, []);

  const filteredLocations = useMemo(() => {
    let results = KIOSK_LOCATIONS.filter((loc) => {
      const matchCity = searchCity === "" || loc.city.toLowerCase().includes(searchCity.toLowerCase()) || loc.state.toLowerCase().includes(searchCity.toLowerCase()) || loc.name.toLowerCase().includes(searchCity.toLowerCase());
      const matchCountry = countryFilter === "All" || loc.country === countryFilter;
      const matchStatus = statusFilter === "All" || loc.status === statusFilter;
      return matchCity && matchCountry && matchStatus;
    });

    if (sortByNearest && userLocation) {
      results = [...results].sort((a, b) => {
        const dA = getDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const dB = getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return dA - dB;
      });
    }

    return results;
  }, [searchCity, countryFilter, statusFilter, sortByNearest, userLocation]);

  const handleFindNearest = () => {
    if (!navigator.geolocation) return;
    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setSortByNearest(true);
        setLocatingUser(false);
      },
      () => {
        setLocatingUser(false);
        setUserLocation({ lat: 40.7128, lng: -74.006 });
        setSortByNearest(true);
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const mapCenter = selectedLocation
    ? `${selectedLocation.lat},${selectedLocation.lng}`
    : "20,0";
  const mapZoom = selectedLocation ? 14 : 2;

  return (
    <div className="subpage">
      <header className="subpage-header">
        <nav>
          <Link href="/" className="nav-logo">
            <Image src="/logo-gold.png" alt="AI GoldKiosk" width={48} height={48} style={{ objectFit: "contain" }} />
            <span>AI GOLDKIOSK</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/partner-with-us" className="nav-link">Partner With Us</Link>
            <Link href="/contact-us" className="nav-link active">Contact Us</Link>
          </div>
        </nav>
      </header>

      {/* Hero with banner */}
      <section className="subpage-hero" style={{ backgroundImage: "url(/banner-contact.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="subpage-hero-inner">
          <span className="subpage-label">CONTACT US</span>
          <h1 className="subpage-title">Let&apos;s Start a<br />Conversation</h1>
          <p className="subpage-subtitle">
            Whether you&apos;re exploring a partnership, have a customer inquiry,
            or need technical support — our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="contact-section">
        <div className="contact-layout">
          <div className="contact-info">
            <span className="subpage-label">REACH US</span>
            <h2 className="form-section-title">Get in Touch</h2>
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <span className="contact-item-label">USA Toll Free</span>
                  <a href="tel:+18009690506" className="contact-item-value">+1 (800) 969-0506</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="contact-item-label">General Inquiries</span>
                  <a href="mailto:support@goldkiosk.com" className="contact-item-value">support@goldkiosk.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="contact-item-label">Partnerships</span>
                  <a href="mailto:partnerships@goldkiosk.com" className="contact-item-value">partnerships@goldkiosk.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="contact-item-label">Headquarters</span>
                  <span className="contact-item-value">8 The Green, STE B, Dover, DE 19901, USA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="partner-form-card">
            {submitted ? (
              <div className="form-success">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="form-card-title">Send Us a Message</h3>
                <input type="text" name="fullName" placeholder="Full name *" value={form.fullName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email address *" value={form.email} onChange={handleChange} required />
                <input type="text" name="subject" placeholder="Subject *" value={form.subject} onChange={handleChange} required />
                <textarea name="message" placeholder="Your message *" value={form.message} onChange={handleChange} rows={5} required />
                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                <p className="form-terms">
                  By submitting, you agree to our terms and privacy policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Kiosk Locator */}
      <section className="locator-section">
        <div className="locator-header">
          <span className="subpage-label">KIOSK LOCATOR</span>
          <h2 className="benefits-title">Find an AI GoldKiosk Near You</h2>
        </div>

        <div className="locator-filters">
          <div className="filter-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search by city, state, or name..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
          </div>
          <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
            {countries.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All Countries" : c}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="coming-soon">Coming Soon</option>
          </select>
          <button className="nearest-btn" onClick={handleFindNearest} disabled={locatingUser}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
            {locatingUser ? "Locating..." : sortByNearest ? "Sorted by Nearest" : "Find Nearest"}
          </button>
        </div>

        <div className="locator-layout">
          <div className="locator-map">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "8px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${mapCenter}&zoom=${mapZoom}&maptype=roadmap`}
              title="AI GoldKiosk Locations"
            />
            {!selectedLocation && (
              <div className="map-overlay">
                <p>Select a location to view on map</p>
              </div>
            )}
          </div>

          <div className="locator-list">
            <div className="locator-count">
              {filteredLocations.length} location{filteredLocations.length !== 1 ? "s" : ""} found
            </div>
            {filteredLocations.map((loc) => (
              <div
                key={loc.id}
                className={`location-card ${selectedLocation?.id === loc.id ? "selected" : ""}`}
                onClick={() => setSelectedLocation(loc)}
              >
                <div className="location-card-top">
                  <h4 className="location-name">{loc.name}</h4>
                  <span className={`location-status ${loc.status}`}>
                    {loc.status === "active" ? "Active" : "Coming Soon"}
                  </span>
                </div>
                <p className="location-address">{loc.address}</p>
                <p className="location-city">{loc.city}, {loc.state}, {loc.country}</p>
                {sortByNearest && userLocation && (
                  <span className="location-distance">
                    {Math.round(getDistance(userLocation.lat, userLocation.lng, loc.lat, loc.lng))} mi away
                  </span>
                )}
              </div>
            ))}
            {filteredLocations.length === 0 && (
              <div className="no-results">
                <p>No kiosks match your filters. Try adjusting your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="site-footer subpage-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Image src="/logo-gold.png" alt="AI GoldKiosk" width={40} height={40} style={{ objectFit: "contain" }} />
            <span>AI GOLDKIOSK</span>
          </div>
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms &amp; Conditions</a>
            <a href="/disclaimer">Disclaimer</a>
          </div>
          <p className="footer-copy">&copy;2026 AI Kiosk International Inc. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
