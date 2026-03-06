# Gold Kiosk — Next.js Landing Page

A premium, scroll-driven product landing page for **Gold Kiosk** — AI-powered automated kiosks for selling gold and silver instantly.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js 15.2.3** (App Router, TypeScript)
- **Tailwind CSS 4**
- **GSAP + ScrollTrigger** (scroll-driven animations)
- **Lenis** (smooth scroll)
- **226 WebP frames** (scroll-driven product video)

## Features

- Full dark mode (pure black background)
- Scroll-driven canvas video animation
- Circle-wipe hero-to-product transition
- 6 animated content sections (varied entrance animations)
- Animated stat counters with dark overlay
- Horizontal marquee text
- Responsive navigation (Home, Partner With Us, Contact Us)
- SEO: OpenGraph, Twitter Cards, JSON-LD, sitemap, robots.txt

## Project Structure

```
src/app/
  layout.tsx          — Root layout + SEO metadata + JSON-LD
  page.tsx            — Main landing page (scroll engine)
  globals.css         — Premium dark mode styles
  partner-with-us/    — Partner page
  contact-us/         — Contact page
  sitemap.ts          — Dynamic sitemap
  robots.ts           — Robots config
public/
  frames/             — 226 WebP frames for scroll animation
```
