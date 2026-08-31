"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface IndustryTrack {
  id: string;
  name: string;
  audience: string;
  recommendedPlatform: string;
  deploymentTime: string;
  hostingSetup: string;
  deliverables: string[];
  ctaLink: string;
}

const tracks: IndustryTrack[] = [
  {
    id: "saccos",
    name: "SACCOs & Microfinances",
    audience: "Cooperative leaders, credit managers, and SACCO board members.",
    recommendedPlatform: "Wananchi Mali SACCO Core Banking Platform",
    deploymentTime: "2 to 3 Weeks (Including Member Data Migration)",
    hostingSetup: "Dedicated Isolated Database & Virtual Server on GCP",
    deliverables: [
      "Custom-branded Member Self-Service Portal",
      "Branch Admin Operations Workspace",
      "Safaricom Daraja Paybill STK & B2C Integration",
      "Full GL Accounting & Automatic Double-Entry Ledger",
      "Cooperative accounting & dividend formulas",
    ],
    ctaLink: "/products/sacco",
  },
  {
    id: "retail",
    name: "Retailers & E-Commerce",
    audience: "Boutiques, online beauty shops (e.g. Clate Cosmetics), and gear retailers (e.g. GearHouse).",
    recommendedPlatform: "GearHouse POS & Clate-Grade E-Commerce Storefronts",
    deploymentTime: "1 to 2 Weeks",
    hostingSetup: "Vercel Edge Frontend + High-Speed Django Product API",
    deliverables: [
      "Online customer shopping catalog & mobile cart",
      "Cashier Barcode POS terminal interface",
      "Direct M-Pesa STK Push payments at checkout",
      "Real-time inventory stock level tracking & alerts",
      "Multi-branch daily reconciliation reports",
    ],
    ctaLink: "/products/gift-shop",
  },
  {
    id: "marketing",
    name: "Marketing Agencies & Telecom",
    audience: "Digital marketing agencies, consultancy firms, and growth teams.",
    recommendedPlatform: "LJK-Grade Marketing CRM & Telecom Engine",
    deploymentTime: "1 Week",
    hostingSetup: "Scalable Railway Containerized Worker Services",
    deliverables: [
      "Alphanumeric Sender ID setup and telecom routing",
      "CRM deal pipeline & client onboarding flows",
      "Bulk SMS campaign scheduler with audience segmentation",
      "Automated M-Pesa wallet billing & credit top-ups",
      "Granular delivery rate & lead conversion metrics",
    ],
    ctaLink: "/products/marketing",
  },
  {
    id: "finance",
    name: "SMEs & Corporate Finance",
    audience: "Founders, finance directors, and accounting firms.",
    recommendedPlatform: "MannaBooks Double-Entry SME Accounting Suite",
    deploymentTime: "3 to 5 Days",
    hostingSetup: "High-Availability Relational PostgreSQL Database",
    deliverables: [
      "Chart of Accounts (COA) and double-entry general ledger",
      "Kenyan KRA PAYE tax bracket automation",
      "Quotations, customer invoicing, and receipts",
      "P&L, Balance Sheet, and Trial Balance generation",
      "Multi-currency transaction recording",
    ],
    ctaLink: "/products/finance",
  },
  {
    id: "logistics",
    name: "Logistics & Fleet Operators",
    audience: "Courier agencies, freight companies, and fleet dispatchers.",
    recommendedPlatform: "CT Logistics Management System",
    deploymentTime: "2 Weeks",
    hostingSetup: "Dedicated Cloud Server with Real-time Event Queue",
    deliverables: [
      "Waybill issuance with barcode generation",
      "Milestone-based shipment tracking timeline",
      "Fleet vehicle and driver dispatch manifest",
      "Automated SMS delivery notifications",
      "Digital Proof of Delivery (POD) mobile capture",
    ],
    ctaLink: "/products/logistics",
  },
  {
    id: "events",
    name: "Event Organizers & Venues",
    audience: "Concert promoters, conference organizers, and sports venues.",
    recommendedPlatform: "Sherehe Tickets Kenya Platform",
    deploymentTime: "48 Hours",
    hostingSetup: "Edge-Cached High Concurrency Ticket Dispatch",
    deliverables: [
      "Online ticket sales page with multi-tier passes",
      "Instant M-Pesa Daraja payment checkout",
      "Encrypted QR code tickets dispatched via SMS/email",
      "High-speed gate scanner mobile validation app",
      "Live attendance dashboard & instant organizer payouts",
    ],
    ctaLink: "/products/events",
  },
];

export default function IndustryNavigator() {
  const [selectedId, setSelectedId] = useState<string>("saccos");
  const currentTrack = tracks.find((t) => t.id === selectedId) || tracks[0];

  return (
    <section className="w-full bg-slate-50 py-16 border-b border-slate-200">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-corporate-primary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Client Journey &amp; Solutions Navigator
          </div>
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
            How We Partner With Your Industry
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Select your sector to discover the exact software architecture, deployment timeline, and enterprise cloud hosting setup Corban Technologies delivers for your business.
          </p>
        </div>

        {/* Industry Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {tracks.map((track) => {
            const isSelected = selectedId === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedId(track.id)}
                className={`p-3 rounded text-left transition-all border ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <p className="text-xs font-semibold leading-tight">
                  {track.name}
                </p>
                <p
                  className={`text-[10px] mt-1 ${
                    isSelected ? "text-corporate-primary font-semibold" : "text-slate-500"
                  }`}
                >
                  {isSelected ? "Active Track" : "Click to view"}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Track Details */}
        <div className="rounded border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Overview & Scope */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-corporate-primary">
                  Recommended Architecture
                </span>
                <h3 className="text-lg font-semibold text-slate-900 mt-1">
                  {currentTrack.recommendedPlatform}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  <span className="font-semibold text-slate-900">Target Users: </span>
                  {currentTrack.audience}
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                  Included Engineering Deliverables
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentTrack.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-start gap-2 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-corporate-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Timeline, Hosting Specs & CTA */}
            <div className="lg:col-span-5 p-5 rounded bg-slate-50 border border-slate-200 space-y-5">
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-500">
                  Estimated Deployment Timeline
                </p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">
                  {currentTrack.deploymentTime}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <p className="text-[10px] uppercase font-semibold text-slate-500">
                  Cloud Infrastructure &amp; SLA
                </p>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  {currentTrack.hostingSetup}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Includes 99.9% uptime guarantee, automated regional backups, and SSL encryption.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
                <Link
                  href={currentTrack.ctaLink}
                  className="w-full bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold py-2.5 px-4 rounded text-center transition-colors shadow-sm inline-flex items-center justify-center gap-1.5"
                >
                  Explore Solution Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold py-2 px-4 rounded text-center transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  Schedule Technical Scoping Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
