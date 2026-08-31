import type { Metadata } from "next";
import Link from "next/link";
import {
  Ticket,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  QrCode,
  Scan,
  Coins,
  BarChart3,
  Calendar,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Event Ticketing & QR Gate Scanner | Corban Technologies LTD",
  description:
    "Sherehe Tickets Kenya — high-speed event ticketing platform featuring instant Safaricom Daraja checkout, encrypted QR code passes, sub-second mobile gate validation, and real-time organizer revenue settlements.",
};

export default function EventsProductPage() {
  const highlights = [
    { icon: QrCode, label: "Encrypted Anti-Counterfeit QR Passes", desc: "Dynamic single-use QR codes sent via SMS, email, and Apple/Google wallet passes with zero ticket forgery risk." },
    { icon: Smartphone, label: "Frictionless Daraja STK Push Checkout", desc: "Attendees enter their phone number and receive an instant M-Pesa PIN prompt for sub-5-second checkout." },
    { icon: Scan, label: "Sub-Second Gate Scanner Validation", desc: "Dedicated mobile scanner app for event gate stewards validating tickets in 0.4 seconds and catching duplicates." },
    { icon: Ticket, label: "Multi-Tier Ticket & Promo Management", desc: "Create Early Bird, Regular, VIP, VVIP, and Group ticket bundles with automated countdown timers." },
    { icon: BarChart3, label: "Live Organizer Revenue Dashboard", desc: "Real-time ticket sales volume, gate admission velocity heatmaps, and gross box office tracking." },
    { icon: Coins, label: "Automated Organizer Settlements", desc: "Automated B2C disbursement and bank settlement payouts following successful event reconciliations." },
  ];

  const modules = [
    {
      title: "Event Organizer Console & Ticketing Setup",
      desc: "Comprehensive web management dashboard for event promoters, venues, and festival directors.",
      items: [
        "Rapid event landing page creation with custom branding, posters, and venue maps",
        "Multi-tier ticket categories with custom quantity limits and sales start/end times",
        "Promo code and discount coupon engine with percentage or fixed fee deductions",
        "Affiliate marketing links allowing promoters to track ticket referral conversions",
        "Complimentary VIP pass generation and direct digital dispatch",
      ],
    },
    {
      title: "High-Speed Mobile Gate Scanner App",
      desc: "Ultra-fast mobile gate check-in application built for high-throughput venue turnstiles.",
      items: [
        "Instant camera barcode / QR code scanning under 0.4 seconds per attendee",
        "Visual and audio feedback (Green Chime = Valid, Red Alarm = Duplicate / Invalid)",
        "Offline ticket database caching allowing validation even if venue Wi-Fi drops",
        "Gate admission logs showing which gate, time, and steward scanned each pass",
        "Real-time inside-venue attendee headcount tracking",
      ],
    },
    {
      title: "Frictionless Attendee Checkout Experience",
      desc: "Designed to maximize checkout conversions with zero unnecessary registration hurdles.",
      items: [
        "Instant mobile-optimized checkout requiring only attendee name, phone, and email",
        "Safaricom Daraja STK Push trigger directly to the buyer's handset",
        "Immediate SMS with direct link to view and download high-resolution QR tickets",
        "Digital PDF ticket attachment sent to email with venue directions and calendar invite",
        "Apple Wallet and Google Wallet pass generation support",
      ],
    },
    {
      title: "Financial Settlement & Reconciliation Engine",
      desc: "Transparent, automated revenue distribution for event organizers and venue partners.",
      items: [
        "Real-time gross box office reconciliation against Safaricom Paybill collections",
        "Transparent platform fee deduction with zero hidden charges",
        "Direct B2C M-Pesa or Bank wire payouts to organizer accounts",
        "Detailed financial audit statements for accounting and KRA withholding tax compliance",
        "Post-event comprehensive attendee demographics and sales report",
      ],
    },
  ];

  const techSpecs = [
    { label: "Platform Brand", value: "Sherehe Tickets Kenya" },
    { label: "Gate Scan Latency", value: "0.4s / Pass (Sub-Second)" },
    { label: "Payment Verification", value: "Instant Daraja STK Webhooks" },
    { label: "Security Engine", value: "Time-Signed Encrypted QR" },
    { label: "Hosting Infrastructure", value: "Edge-Cached Next.js + Postgres" },
    { label: "Offline Mode", value: "Gate Scanner Cache Resilient" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
                <Ticket className="w-3.5 h-3.5" />
                Rank #6 · Digital Event Ticketing
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                Live Platform (Sherehe Tickets)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
              Instant M-Pesa Ticketing, Encrypted QR Passes &amp; Gate Scanner Validation
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Engineered and cloud-hosted by Corban Technologies. Sherehe Tickets Kenya gives concert promoters, festival organizers, and corporate conferences instant Safaricom Daraja checkout, anti-counterfeit QR passes, and sub-second mobile gate scanning.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact?product=events"
                className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Request Ticketing Demo &amp; Setup <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/products"
                className="px-5 py-2.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
              >
                View All Platforms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Strip */}
      <section className="w-full bg-slate-50 border-b border-slate-200 py-8">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {techSpecs.map((spec, idx) => (
              <div key={idx} className="p-3 rounded bg-white border border-slate-200">
                <p className="text-[10px] uppercase font-semibold text-slate-500">{spec.label}</p>
                <p className="text-xs font-semibold text-slate-900 mt-0.5">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="w-full bg-white py-14 border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Core Capabilities
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Frictionless Ticket Sales &amp; Rapid Gate Ingress
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((item, idx) => (
              <div key={idx} className="p-5 rounded bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="w-7 h-7 bg-white border border-slate-200 rounded flex items-center justify-center text-corporate-primary">
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Modules */}
      <section className="w-full bg-slate-50 py-14 border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Platform Modules
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Complete Event Ticketing Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((m, idx) => (
              <div key={idx} className="p-6 rounded bg-white border border-slate-200 shadow-sm space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{m.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{m.desc}</p>
                </div>
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {m.items.map((it, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-corporate-primary shrink-0 mt-0.5" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white py-14">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="p-8 rounded bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-base font-semibold text-white">
                Ready to Launch Ticketing for Your Next Event?
              </h3>
              <p className="text-xs text-slate-300">
                Corban Technologies sets up your event pages, M-Pesa paybill rails, steward scanner logins, and dedicated hosting.
              </p>
            </div>
            <Link
              href="/contact?product=events"
              className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5 shrink-0"
            >
              Start Event Onboarding <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
