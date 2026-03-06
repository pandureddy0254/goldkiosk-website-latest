"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const FRAME_COUNT = 226;
const FRAME_SPEED = 1.6;
const IMAGE_SCALE = 0.78;

/* Content sections that swap on scroll — investor-friendly copy */
const SECTIONS = [
  {
    label: "THE FUTURE OF GOLD TRADING",
    heading: "Sell Gold.\nInstantly.",
    body: "AI-powered self-service kiosks enabling real-time precious metals appraisals and instant cash payouts — transforming a $13 trillion market opportunity.",
    enter: 0,
    leave: 0.18,
    noFade: true, // first section never fades
  },
  {
    label: "001 / Real-Time Pricing",
    heading: "Every Ounce Priced\nat Market Value.",
    body: "Our platform connects to live precious metals market feeds, delivering transparent spot-price valuations with zero middlemen. Customers receive top-dollar offers updated in real time — building trust and driving repeat transactions.",
    enter: 0.18,
    leave: 0.36,
  },
  {
    label: "002 / AI Technology",
    heading: "Patented A.I.\n99.9% Accuracy.",
    body: "Proprietary XRF spectroscopic analysis paired with AI vision determines exact purity, weight, and authenticity of any gold or silver item — achieving scientific precision that surpasses traditional appraisal methods.",
    enter: 0.36,
    leave: 0.52,
  },
  {
    label: "003 / Speed",
    heading: "Five Minutes.\nAppraisal to Payout.",
    body: "A fully automated 5-step process — from ID verification and biometric authentication through AI analysis to instant cash or cryptocurrency payout. No staff required. 24/7 operation.",
    enter: 0.52,
    leave: 0.68,
  },
  {
    label: "004 / Bank-Grade Security",
    heading: "Built for Trust.\nBacked by Compliance.",
    body: "End-to-end encrypted transactions with government ID scanning, biometric authentication, automated KYC/AML checks, and full digital audit trails. Designed to meet and exceed banking-grade regulatory standards.",
    enter: 0.68,
    leave: 0.82,
  },
  {
    label: "005 / Partnership Opportunity",
    heading: "Deploy AI GoldKiosk\nat Your Location.",
    body: "Zero upfront capital. Revenue from day one. Our turnkey partnership model provides the hardware, software, compliance framework, and 24/7 support — you provide the floor space.",
    enter: 0.82,
    leave: 1.0,
    isCTA: true,
    noFade: true, // last section never fades
  },
];

const STATS = [
  { value: 99.9, decimals: 1, suffix: "%", label: "Appraisal Accuracy" },
  { value: 5, decimals: 0, suffix: " min", label: "Average Transaction" },
  { value: 24, decimals: 0, suffix: "/7", label: "Kiosk Availability" },
  { value: 50, decimals: 0, suffix: "K+", label: "Transactions Completed" },
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Always start at top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [sectionOpacity, setSectionOpacity] = useState(1);
  const [showStats, setShowStats] = useState(false);
  const [counterValues, setCounterValues] = useState<number[]>(STATS.map(() => 0));
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const frames: HTMLImageElement[] = [];
    let currentFrame = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const container = canvas.parentElement;
      if (!container) return;
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      ctx!.scale(dpr, dpr);
      drawFrame(currentFrame);
    }

    function drawFrame(index: number) {
      const img = frames[index];
      if (!img || !canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const container = canvas.parentElement;
      if (!container) return;
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.min(cw / iw, ch / ih) * IMAGE_SCALE;
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    // Preload frames
    let loadedCount = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.webp`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
          resizeCanvas();
          drawFrame(0);
          initScrollEngine();
        }
      };
      frames[i - 1] = img;
    }

    function initScrollEngine() {
      // @ts-expect-error - Lenis loaded via CDN
      const lenis = new window.Lenis({
        duration: 1.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
      });

      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time: number) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      const scrollContainer = document.getElementById("scroll-container");

      // Frame-to-scroll binding
      ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self: any) => {
          const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
          const index = Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1);
          if (index !== currentFrame) {
            currentFrame = index;
            requestAnimationFrame(() => drawFrame(currentFrame));
          }

          // Determine active section
          const p = self.progress;
          let newActive = 0;
          for (let i = SECTIONS.length - 1; i >= 0; i--) {
            if (p >= SECTIONS[i].enter) {
              newActive = i;
              break;
            }
          }
          setActiveSection(newActive);

          // Calculate opacity — first and last sections never fade
          const sec = SECTIONS[newActive];
          if (sec.noFade) {
            setSectionOpacity(1);
          } else {
            const sectionDuration = sec.leave - sec.enter;
            const relP = (p - sec.enter) / sectionDuration;
            const fadePortion = 0.15;
            let opacity = 1;
            if (relP < fadePortion) {
              opacity = relP / fadePortion;
            } else if (relP > 1 - fadePortion) {
              opacity = (1 - relP) / fadePortion;
            }
            opacity = Math.max(0, Math.min(1, opacity));
            opacity = opacity * opacity * (3 - 2 * opacity); // smoothstep
            setSectionOpacity(opacity);
          }

          // Stats visibility (show during section 3 - Speed)
          setShowStats(p >= 0.52 && p <= 0.68);

          // Counter animation
          if (p >= 0.52 && p <= 0.68) {
            const localP = Math.min(1, (p - 0.52) / 0.08);
            const eased = 1 - Math.pow(1 - localP, 3);
            setCounterValues(STATS.map((s) => s.value * eased));
          }

          // Header state
          setHeaderScrolled(p > 0.02);

          // Show footer when at the very end
          setShowFooter(p > 0.95);
        },
      });
    }

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const section = SECTIONS[activeSection];

  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" strategy="beforeInteractive" />

      {/* Loader */}
      <div id="loader" style={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "all", transition: "opacity 0.8s ease" }}>
        <div className="loader-brand">
          <Image src="/logo-gold.png" alt="AI GoldKiosk" width={64} height={64} style={{ objectFit: "contain" }} />
          <span>AI GOLDKIOSK</span>
        </div>
        <div id="loader-bar">
          <div id="loader-fill" style={{ width: `${loadProgress}%` }} />
        </div>
        <div id="loader-percent">{loadProgress}%</div>
      </div>

      {/* Header */}
      <header className={`site-header${headerScrolled ? " scrolled" : ""}`}>
        <nav>
          <a href="/" className="nav-logo">
            <Image src="/logo-gold.png" alt="AI GoldKiosk" width={48} height={48} style={{ objectFit: "contain" }} />
            <span>AI GOLDKIOSK</span>
          </a>
          <div className="nav-links">
            <a href="/" className="nav-link active">Home</a>
            <Link href="/partner-with-us" className="nav-link">Partner With Us</Link>
            <Link href="/contact-us" className="nav-link">Contact Us</Link>
          </div>
        </nav>
      </header>

      {/* ===== SPLIT LAYOUT: Text Left + Animation Right ===== */}
      <div className="split-layout">
        {/* LEFT: Text content that changes on scroll */}
        <div className="split-left">
          <div className="split-text-content" style={{ opacity: sectionOpacity }}>
            <span className="section-label">{section.label}</span>
            <h2 className="section-heading">
              {section.heading.split("\n").map((line, i) => (
                <span key={`${activeSection}-${i}`}>
                  {i > 0 && <br />}
                  {activeSection === 0 && i === 1 ? (
                    <span className="text-gold italic">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>
            <p className="section-body">{section.body}</p>

            {section.isCTA && (
              <div className="split-cta-actions">
                <Link href="/partner-with-us" className="cta-button">
                  Explore Partnership
                </Link>
                <div className="cta-contact-row">
                  <a href="tel:+18009690506" className="cta-link">+1 (800) 969-0506</a>
                  <span className="cta-divider">&bull;</span>
                  <a href="mailto:partnerships@goldkiosk.com" className="cta-link">partnerships@goldkiosk.com</a>
                </div>
              </div>
            )}

            {/* Stats bar */}
            <div className={`split-stats${showStats ? " visible" : ""}`}>
              {STATS.map((stat, i) => (
                <div className="split-stat" key={i}>
                  <span className="stat-number">
                    {counterValues[i].toFixed(stat.decimals)}{stat.suffix}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section indicators */}
          <div className="section-dots">
            {SECTIONS.map((_, i) => (
              <div key={i} className={`section-dot${activeSection === i ? " active" : ""}`} />
            ))}
          </div>

          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <div className="scroll-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT: Canvas animation */}
        <div className="split-right">
          <div className="canvas-container">
            <canvas id="canvas" ref={canvasRef} />
          </div>
        </div>
      </div>

      {/* Scroll height driver */}
      <div id="scroll-container" />

      {/* Footer — appears after last scroll section */}
      <footer className={`site-footer${showFooter ? " visible" : ""}`}>
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
    </>
  );
}
