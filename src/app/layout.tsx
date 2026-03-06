import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goldkiosk.com"),
  title: {
    default: "AI GoldKiosk — Automated Precious Metals Trading Platform",
    template: "%s | AI GoldKiosk",
  },
  description:
    "AI GoldKiosk is the world's most advanced automated self-service kiosk platform for buying, selling, and trading gold and silver. AI-powered appraisals, real-time market pricing, and instant payouts — transforming a $13T+ market.",
  keywords: [
    "AI gold kiosk",
    "automated gold trading",
    "sell gold instantly",
    "precious metals kiosk",
    "gold appraisal AI",
    "cash for gold",
    "gold buying kiosk",
    "XRF gold analysis",
    "real-time gold price",
    "gold investment kiosk",
    "precious metals trading",
    "bank gold partnership",
    "fintech gold",
  ],
  authors: [{ name: "AI Kiosk International Inc." }],
  creator: "AI GoldKiosk",
  publisher: "AI Kiosk International Inc.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://goldkiosk.com",
    siteName: "AI GoldKiosk",
    title: "AI GoldKiosk — Automated Precious Metals Trading Platform",
    description:
      "The world's most advanced automated kiosk platform for gold and silver trading. AI-powered appraisals in under 5 minutes. Zero capital required for partners.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI GoldKiosk — Automated Precious Metals Trading Kiosk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI GoldKiosk — Sell Gold & Silver Instantly",
    description:
      "AI-powered appraisals in under 5 minutes. Real-time market prices. Instant cash or crypto payout.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://goldkiosk.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AI GoldKiosk",
              legalName: "AI Kiosk International Inc.",
              url: "https://goldkiosk.com",
              logo: "https://goldkiosk.com/logo-gold.png",
              description:
                "World's most advanced automated self-service kiosk platform for buying, selling, and trading precious metals with AI-powered appraisals.",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-800-969-0506",
                  contactType: "customer service",
                  areaServed: "US",
                  availableLanguage: "English",
                },
              ],
              sameAs: [
                "https://www.instagram.com/goldkioskofficial/",
                "https://www.facebook.com/goldkiosk",
                "https://www.linkedin.com/company/goldkiosk",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "AI GoldKiosk Automated Trading Platform",
              description:
                "AI-powered self-service kiosk for instant gold and silver appraisals with real-time market pricing and instant payouts.",
              brand: {
                "@type": "Brand",
                name: "AI GoldKiosk",
              },
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/InStock",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "2400",
              },
            }),
          }}
        />
      </head>
      <body className={`${dmSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
