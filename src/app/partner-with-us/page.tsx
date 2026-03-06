"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface PartnerForm {
  firstName: string;
  lastName: string;
  workEmail: string;
  companyName: string;
  location: string;
  message: string;
}

const highlights = [
  { value: "$13T+", label: "Global Gold Market" },
  { value: "73%", label: "Prefer Bank Channels" },
  { value: "45%", label: "Retail Gold Growth YoY" },
  { value: "$0", label: "Capital Outlay for Partners" },
];

const benefits = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="1.5">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: "Zero Risk, Immediate Revenue",
    desc: "No capital investment, no operational overhead. Revenue from day one with a simple revenue-share agreement — banks earn 8-12% of every transaction.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="1.5">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    title: "Increased Foot Traffic",
    desc: "Gold kiosks attract new customers to your location — people who may not otherwise visit. New customer acquisition channel built in.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Fully Automated Operations",
    desc: "Zero staff involvement required. The kiosk runs 24/7 autonomously — AI-powered analysis, real-time pricing, instant payouts, and automated compliance.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Bank-Grade Security",
    desc: "Government ID scanning, biometric authentication, automated KYC/AML, end-to-end encryption, and full digital audit trails for every transaction.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Real-Time Analytics Dashboard",
    desc: "Dedicated partner portal with live kiosk status, transaction analytics, customer insights, inventory management, and custom branded reports.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E4B437" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: "Future-Ready Technology",
    desc: "Position your business at the forefront of fintech innovation with AI, robotics, XRF analysis, and cryptocurrency payout capabilities.",
  },
];


const timeline = [
  { week: "Week 1-2", title: "Site Assessment", desc: "Location evaluation, space planning, and connectivity check" },
  { week: "Week 3-4", title: "Installation", desc: "Kiosk delivery, hardware setup, and system configuration" },
  { week: "Week 5", title: "Testing", desc: "Full system test, staff orientation, compliance verification" },
  { week: "Week 6", title: "Go Live", desc: "Customer launch, marketing activation, performance monitoring" },
];

export default function PartnerWithUs() {
  const initialForm: PartnerForm = {
    firstName: "",
    lastName: "",
    workEmail: "",
    companyName: "",
    location: "",
    message: "",
  };

  const [form, setForm] = useState<PartnerForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link href="/partner-with-us" className="nav-link active">Partner With Us</Link>
            <Link href="/contact-us" className="nav-link">Contact Us</Link>
          </div>
          <button className={`hamburger${mobileMenuOpen ? " open" : ""}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </nav>
      </header>

      <div className={`mobile-menu-overlay${mobileMenuOpen ? " open" : ""}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <Image src="/logo-gold.png" alt="AI GoldKiosk" width={40} height={40} style={{ objectFit: "contain" }} />
            <span>AI GOLDKIOSK</span>
          </div>
          <div className="mobile-menu-links">
            <Link href="/" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/partner-with-us" className="mobile-menu-link active" onClick={() => setMobileMenuOpen(false)}>Partner With Us</Link>
            <Link href="/contact-us" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
          </div>
          <div className="mobile-menu-footer">
            <a href="tel:+18009690506" className="mobile-menu-contact">+1 (800) 969-0506</a>
            <a href="mailto:partnerships@goldkiosk.com" className="mobile-menu-contact">partnerships@goldkiosk.com</a>
          </div>
        </div>
      </div>

      {/* Hero with banner */}
      <section className="subpage-hero" style={{ backgroundImage: "url(/banner-partner.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="subpage-hero-inner">
          <span className="subpage-label">BANK &amp; LOCATION PARTNERSHIP</span>
          <h1 className="subpage-title">Transform Your Location Into<br />a Gold Trading Destination</h1>
          <p className="subpage-subtitle">
            Zero upfront investment. Immediate revenue generation. AI GoldKiosk provides the complete
            hardware, software, compliance, and support infrastructure — you provide the floor space.
          </p>
        </div>
      </section>

      {/* Market Opportunity Highlights */}
      <section className="benefits-section">
        <div className="highlights-grid">
          {highlights.map((h, i) => (
            <div className="highlight-card" key={i}>
              <span className="highlight-value">{h.value}</span>
              <span className="highlight-label">{h.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* What is AI GoldKiosk */}
      <section className="benefits-section" style={{ paddingTop: 0 }}>
        <div className="benefits-header">
          <span className="subpage-label">THE PLATFORM</span>
          <h2 className="benefits-title">What is AI GoldKiosk?</h2>
          <p className="subpage-subtitle" style={{ maxWidth: 700, margin: "1rem auto 0" }}>
            AI GoldKiosk operates fully automated, AI-powered kiosks that enable customers to buy, sell,
            and trade precious metals using real-time market pricing, XRF spectroscopic analysis,
            and instant cash or cryptocurrency payouts.
          </p>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="benefits-section">
        <div className="benefits-header">
          <span className="subpage-label">WHY PARTNER WITH AI GOLDKIOSK</span>
          <h2 className="benefits-title">A Turnkey Revenue Opportunity</h2>
        </div>
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div className="benefit-card" key={i}>
              <div className="benefit-icon">{b.icon}</div>
              <h3 className="benefit-name">{b.title}</h3>
              <p className="benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deployment Timeline */}
      <section className="benefits-section">
        <div className="benefits-header">
          <span className="subpage-label">DEPLOYMENT</span>
          <h2 className="benefits-title">Go Live in 6 Weeks</h2>
        </div>
        <div className="timeline-grid">
          {timeline.map((step, i) => (
            <div className="timeline-step" key={i}>
              <span className="timeline-week">{step.week}</span>
              <div className="timeline-dot" />
              <h3 className="timeline-title">{step.title}</h3>
              <p className="timeline-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Form */}
      <section className="partner-form-section" id="partner-form">
        <div className="partner-form-layout">
          <div className="partner-form-info">
            <span className="subpage-label">GET STARTED</span>
            <h2 className="form-section-title">Schedule a Demo</h2>
            <p className="form-section-desc">
              Fill out the form and our partnership team will reach out within 24 hours
              to discuss deployment plans, revenue models, and next steps.
            </p>
            <div className="partner-stats-row-centered">
              <div className="partner-stat">
                <span className="partner-stat-num">6</span>
                <span className="partner-stat-unit">weeks</span>
                <span className="partner-stat-label">To Go Live</span>
              </div>
              <div className="partner-stat">
                <span className="partner-stat-num">8-12</span>
                <span className="partner-stat-unit">%</span>
                <span className="partner-stat-label">Revenue Share</span>
              </div>
              <div className="partner-stat">
                <span className="partner-stat-num">24</span>
                <span className="partner-stat-unit">/7</span>
                <span className="partner-stat-label">Support</span>
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
                <h3>Thank you!</h3>
                <p>Your partnership inquiry has been submitted. Our team will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input type="text" name="firstName" placeholder="First name *" value={form.firstName} onChange={handleChange} required />
                  <input type="text" name="lastName" placeholder="Last name *" value={form.lastName} onChange={handleChange} required />
                </div>
                <input type="email" name="workEmail" placeholder="Work email *" value={form.workEmail} onChange={handleChange} required />
                <input type="text" name="companyName" placeholder="Company / Organization *" value={form.companyName} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Preferred deployment location (city / state)" value={form.location} onChange={handleChange} />
                <textarea name="message" placeholder="Tell us about your business and partnership goals..." value={form.message} onChange={handleChange} rows={4} />
                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Request Partnership Demo"}
                </button>
                <p className="form-terms">
                  By submitting this form, you agree to our terms and privacy policy. All inquiries are confidential.
                </p>
              </form>
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
