"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Building2,
  Sparkles,
  ShoppingBag,
  Send,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Truck,
  Ticket,
  Store,
  BarChart3,
} from "lucide-react";

interface ClientStory {
  id: string;
  name: string;
  category: string;
  status: string;
  scope: string;
  impact: string;
  domain: string;
  liveUrl: string;
  detailUrl: string;
  icon: typeof Building2;
}

const clientStories: ClientStory[] = [
  {
    id: "sacco",
    name: "Wananchi Mali SACCO (3 Cooperatives)",
    category: "Financial Sector / SACCO Core Banking",
    status: "Live in Production",
    scope: "Core banking platform, double-entry GL, member self-service portal, and Safaricom Daraja M-Pesa automated reconciliation.",
    impact: "Automated loan disbursements, member deposit reconciliation, and monthly dividend analytics.",
    domain: "wananchimali.com",
    liveUrl: "https://www.wananchimali.com/",
    detailUrl: "/products/sacco/wananchi-mali",
    icon: Building2,
  },
  {
    id: "mannabooks",
    name: "Manna Books Accounting",
    category: "Fintech & SME General Ledger",
    status: "Flagship Accounting SaaS",
    scope: "5-class Chart of Accounts (COA), walk-in POS with eTIMS thermal printing, statutory payroll (PAYE, SHIF, AHL, NSSF), and inventory reconciler.",
    impact: "Maintains balanced general ledgers, automates tax schedules, and generates instant P&L and Balance Sheet reports.",
    domain: "mannabooks.co.ke",
    liveUrl: "https://www.mannabooks.co.ke/",
    detailUrl: "/products/finance/mannabooks",
    icon: BookOpen,
  },
  {
    id: "clate",
    name: "Clate Cosmetics",
    category: "Beauty & Skincare E-Commerce",
    status: "Live Client Deployment",
    scope: "Online beauty storefront catalog, dynamic product variant selectors, shopping cart, and automated Daraja M-Pesa checkout.",
    impact: "Powers end-to-end digital sales, order dispatch workflows, and customer beauty order tracking across Kenya.",
    domain: "clatecosmetics.com",
    liveUrl: "https://www.clatecosmetics.com/",
    detailUrl: "/products/gift-shop/clate-cosmetics",
    icon: Store,
  },
  {
    id: "gearhouse",
    name: "GearHouse Africa",
    category: "Omnichannel Retail & Barcode POS",
    status: "Live Retail Deployment",
    scope: "Cashier Point-of-Sale (POS) multi-till register, opening/closing float declarations, shift cash discrepancy calculation, and atomic voiding.",
    impact: "Real-time stock level synchronization between physical retail shelves and instant counter M-Pesa receipts.",
    domain: "gearhouse.co.ke",
    liveUrl: "https://www.gearhouse.co.ke/",
    detailUrl: "/products/gift-shop/gearhouse",
    icon: ShoppingBag,
  },
  {
    id: "ljk",
    name: "LJK Marketing Agency",
    category: "Enterprise Telecom & Marketing CRM",
    status: "Live Client Ecosystem",
    scope: "11-character Alphanumeric Sender ID dispatch, prepaid SMS wallet with M-Pesa top-ups, 1-Click CSV contact lists, and dynamic campaign scheduler.",
    impact: "Powers high-velocity telecom campaigns and lead attribution with instantaneous transaction confirmations.",
    domain: "ljkmarketingagency.co.ke",
    liveUrl: "https://www.ljkmarketingagency.co.ke/",
    detailUrl: "/products/marketing/ljk-marketing",
    icon: Send,
  },
  {
    id: "ctdrive",
    name: "CT Drive Logistics",
    category: "Freight, Waybills & Fleet OS",
    status: "Enterprise Logistics Platform",
    scope: "Automated waybill Code-128 barcode issuance, milestone tracking timeline, fleet truck manifests, and digital POD with OTP verification.",
    impact: "Streamlines parcel intake, depot route dispatch from Mombasa to Nairobi, and verified OTP delivery receipts.",
    domain: "ctdrive.co.ke",
    liveUrl: "https://www.ctdrive.co.ke/",
    detailUrl: "/products/logistics/ct-drive",
    icon: Truck,
  },
  {
    id: "sherehe",
    name: "Sherehe Digital Ticketing",
    category: "Events, Entertainment & Passes",
    status: "Live Platform Deployment",
    scope: "Multi-tier ticket setup, instant Safaricom Daraja STK Push checkout, encrypted single-use QR gate passes, and sub-0.4s scanner mobile app.",
    impact: "Sub-second gate admission with zero counterfeit passes and automated organizer revenue settlements.",
    domain: "sherehe.co.ke",
    liveUrl: "https://www.sherehe.co.ke/",
    detailUrl: "/products/events/sherehe",
    icon: Ticket,
  },
  {
    id: "fedhahub",
    name: "FedhaHub Financial Blog",
    category: "Fintech Media & Dividend Analytics",
    status: "Knowledge & Analytics Hub",
    scope: "In-depth financial advisory publications, SACCO AGM dividend calculation models, and loan amortization simulators.",
    impact: "Equips cooperative boards, financial analysts, and SME founders with accurate calculation tools and research.",
    domain: "fedhahub.co.ke",
    liveUrl: "https://www.fedhahub.co.ke/",
    detailUrl: "/products/finance/fedhahub",
    icon: BarChart3,
  },
];

export default function ClientTrustWall() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white py-14 border-b border-slate-200">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Client Deployments &amp; Live Systems
            </div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              Trusted by East Africa&apos;s Growing Enterprises
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              We design, build, and cloud-host production software for financial cooperatives, retail brands, logistics operators, and marketing agencies across Kenya.
            </p>
          </div>

          {/* Navigation Controls & Catalog Link */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-8 h-8 rounded border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-8 h-8 rounded border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary transition-colors shrink-0 shadow-sm"
            >
              Explore All Divisions <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent -mx-2 px-2"
        >
          {clientStories.map((client) => (
            <div
              key={client.id}
              className="w-[320px] sm:w-[360px] shrink-0 snap-start p-5 rounded bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded bg-white border border-slate-200 text-corporate-primary shrink-0">
                      <client.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                        {client.name}
                      </h3>
                      <p className="text-[11px] text-slate-600 font-medium">
                        {client.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scope & Impact */}
                <p className="text-xs text-slate-700 leading-relaxed mb-3">
                  <span className="font-semibold text-slate-900">Scope: </span>
                  {client.scope}
                </p>

                <div className="p-2.5 rounded bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed mb-3">
                  <span className="font-semibold text-slate-900">Value Delivered: </span>
                  {client.impact}
                </div>
              </div>

              {/* Card Footer with Domain & Action Links */}
              <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <a
                  href={client.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-corporate-primary hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  {client.domain} <ExternalLink className="w-3 h-3" />
                </a>
                <Link
                  href={client.detailUrl}
                  className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
