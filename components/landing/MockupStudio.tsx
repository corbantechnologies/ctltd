"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Receipt,
  ShoppingBag,
  Send,
  Truck,
  Ticket,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Layers,
  Lock,
} from "lucide-react";

interface ProductPillar {
  id: string;
  rank: number;
  name: string;
  shortTag: string;
  category: string;
  statusBadge: string;
  statusTone: "emerald" | "amber" | "blue";
  liveDomain?: string;
  detailUrl: string;
  summary: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  techStack: string[];
  mockup: {
    browserUrl: string;
    windowTitle: string;
    metrics: { label: string; value: string; trend?: string }[];
    previewType: "sacco" | "finance" | "retail" | "marketing" | "logistics" | "events";
  };
}

const products: ProductPillar[] = [
  {
    id: "sacco",
    rank: 1,
    name: "SACCO & Cooperative Core Platform",
    shortTag: "SACCO Platform",
    category: "Financial Technology",
    statusBadge: "3 Kenyan SACCOs Live",
    statusTone: "emerald",
    liveDomain: "wananchimali.co.ke",
    detailUrl: "/products/sacco",
    summary:
      "Enterprise core banking engine built for Kenyan SACCOs, chamas, and microfinances. Features full double-entry GL accounting, member self-service portals, admin branch manager workspaces, Safaricom Daraja M-Pesa STK Push deposits, and automated loan appraisal.",
    highlights: [
      "Member CRM with unique account IDs, NOK, and bulk CSV onboarding",
      "Multi-pot savings: Shares, holiday, emergency, and monthly deposits",
      "Dual loan engine: Diminishing balance & flat rate interest calculators",
      "Safaricom Daraja API: STK Push deposits & B2C automated disbursements",
      "Full GL Accounting: Balance Sheet, Trial Balance, P&L, Debtors ledgers",
    ],
    specs: [
      { label: "Deployments", value: "3 Active SACCOs" },
      { label: "Compliance", value: "SASRA & KRA Ready" },
      { label: "M-Pesa SLA", value: "Sub-second Webhooks" },
      { label: "Hosting", value: "Dedicated GCP Instance" },
    ],
    techStack: ["Next.js 15", "Django REST Framework", "PostgreSQL", "Daraja API"],
    mockup: {
      browserUrl: "https://portal.wananchimali.co.ke/admin/dashboard",
      windowTitle: "Wananchi Mali SACCO — Branch Core Management",
      metrics: [
        { label: "Total Asset Base", value: "KES 42.8M", trend: "+14% MoM" },
        { label: "Active Members", value: "1,420+", trend: "3 Cooperatives" },
        { label: "M-Pesa Collections", value: "KES 8.4M", trend: "Real-time" },
      ],
      previewType: "sacco",
    },
  },
  {
    id: "finance",
    rank: 2,
    name: "Finance & Accounting Intelligence",
    shortTag: "Finance Suite",
    category: "Fintech & Analytics",
    statusBadge: "FedhaHub & MannaBooks",
    statusTone: "blue",
    detailUrl: "/products/finance",
    summary:
      "Integrated financial software pairing FedhaHub's advanced analytical engine (SACCO dividend computation, loan amortization models, PAYE tax brackets) with MannaBooks' double-entry bookkeeping, invoicing, quotations, and automated journal ledger posting for SMEs.",
    highlights: [
      "FedhaHub: Multi-tier dividend distribution computation for SACCO AGM reports",
      "Kenyan KRA PAYE tax bracket engine and statutory deduction calculations",
      "MannaBooks: Double-entry Chart of Accounts, quotes, and customer invoices",
      "Multi-currency support with automated receipting and journal reconciliation",
      "Exportable executive financial statements in standard CSV and PDF formats",
    ],
    specs: [
      { label: "Engines", value: "FedhaHub + MannaBooks" },
      { label: "Tax Engine", value: "Kenyan KRA PAYE Ready" },
      { label: "Accounting", value: "Double-Entry GL" },
      { label: "Audits", value: "Full Historical Logs" },
    ],
    techStack: ["React / Next.js", "Drizzle ORM", "PostgreSQL", "Python Analytics"],
    mockup: {
      browserUrl: "https://fedhahub.corbantechnologies.org/analytics/dividends",
      windowTitle: "FedhaHub Financial Intelligence & Dividend Engine",
      metrics: [
        { label: "Calculated Dividends", value: "KES 14.2M", trend: "Optimized" },
        { label: "PAYE Tax Reconciled", value: "100%", trend: "KRA Compliant" },
        { label: "SME Invoices Cleared", value: "KES 3.1M", trend: "Double-entry" },
      ],
      previewType: "finance",
    },
  },
  {
    id: "retail",
    rank: 3,
    name: "Omnichannel Commerce & POS",
    shortTag: "Gift Shop / Retail",
    category: "E-Commerce & Retail",
    statusBadge: "Live Client Deployment",
    statusTone: "emerald",
    detailUrl: "/products/retail",
    summary:
      "High-speed retail infrastructure uniting digital customer storefronts with a barcode Point-of-Sale (POS) terminal, inventory stock level management, instant customer M-Pesa payments, and multi-branch revenue tracking.",
    highlights: [
      "Online customer product catalog with real-time stock availability",
      "Cashier Point-of-Sale (POS) interface with fast barcode scanning",
      "Instant M-Pesa STK push checkout at counter and online cart",
      "Inventory batch control with low-stock alerts and supplier logs",
      "Daily sales reports, cash drawer reconciliations, and receipt printing",
    ],
    specs: [
      { label: "Client Deployment", value: "GearHouse Kenya" },
      { label: "Terminal Mode", value: "Online & Cashier POS" },
      { label: "Payment", value: "M-Pesa STK + Cash" },
      { label: "Inventory", value: "Real-Time Sync" },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Django REST API", "Daraja API"],
    mockup: {
      browserUrl: "https://gearhouse.co.ke/pos/terminal",
      windowTitle: "GearHouse Retail & Point of Sale Terminal",
      metrics: [
        { label: "Daily Transactions", value: "KES 284,500", trend: "+22% Today" },
        { label: "Catalog SKUs", value: "850+ Items", trend: "Synced" },
        { label: "Avg. Checkout Speed", value: "12 Seconds", trend: "M-Pesa STK" },
      ],
      previewType: "retail",
    },
  },
  {
    id: "marketing",
    rank: 4,
    name: "Marketing CRM & Telecom Suite",
    shortTag: "Marketing Engine",
    category: "Enterprise Marketing",
    statusBadge: "Client Pilot Testing",
    statusTone: "amber",
    liveDomain: "ljkmarketingagency.co.ke",
    detailUrl: "/products/marketing",
    summary:
      "Enterprise marketing operations engine designed for agencies and high-volume businesses. Delivers high-throughput telecom routing, custom alphanumeric sender IDs, contact segmentation, campaign ROI analytics, and client billing funnels.",
    highlights: [
      "Custom Alphanumeric Sender ID dispatch and telecom gateway routing",
      "Client CRM deal pipelines, lead capture forms, and automated follow-ups",
      "Multi-channel broadcast scheduler with audience segment filtering",
      "Automated M-Pesa credit top-ups and wallet-based billing engine",
      "Granular delivery analytics: Sent, Delivered, Bounced, and Click attribution",
    ],
    specs: [
      { label: "Pilot Partner", value: "LJK Marketing Agency" },
      { label: "Sender IDs", value: "Alphanumeric Certified" },
      { label: "Throughput", value: "500 msgs/sec" },
      { label: "CRM Pipeline", value: "End-to-End Funnels" },
    ],
    techStack: ["Next.js 15", "Django REST", "PostgreSQL", "Telecom Gateways"],
    mockup: {
      browserUrl: "https://app.ljk.co.ke/business/campaigns",
      windowTitle: "LJK Marketing Agency — Business Telecom Workspace",
      metrics: [
        { label: "Campaigns Dispatched", value: "128,400", trend: "99.2% Delivery" },
        { label: "Active Sender IDs", value: "Verified", trend: "Telecom Route" },
        { label: "Lead Conversions", value: "32.4%", trend: "Tracked" },
      ],
      previewType: "marketing",
    },
  },
  {
    id: "logistics",
    rank: 5,
    name: "Freight & Courier Logistics OS",
    shortTag: "Logistics OS",
    category: "Supply Chain & Fleet",
    statusBadge: "Enterprise Ready",
    statusTone: "blue",
    detailUrl: "/products/logistics",
    summary:
      "Digital logistics workspace engineered for cargo transporters, parcel couriers, and regional fleet operators. Simplifies waybill generation, shipment tracking timelines, dispatch manifest scheduling, driver assignations, and proof-of-delivery receipts.",
    highlights: [
      "Automated waybill creation with tracking number barcode generation",
      "Milestone-based shipment tracking timeline for senders and receivers",
      "Fleet vehicle dispatch scheduling and driver route assignments",
      "Customer SMS notifications on dispatch, transit, and arrival",
      "Proof of delivery (POD) capture with digital signatures and timestamps",
    ],
    specs: [
      { label: "Platform", value: "CT Logistics" },
      { label: "Tracking", value: "Real-Time Milestones" },
      { label: "Waybills", value: "Automated PDF & Barcode" },
      { label: "Fleet Mode", value: "Multi-Hub Dispatch" },
    ],
    techStack: ["Next.js", "Drizzle ORM", "PostgreSQL", "Cloud Compute"],
    mockup: {
      browserUrl: "https://logistics.corbantechnologies.org/dispatch/manifest",
      windowTitle: "CT Logistics — Fleet & Waybill Dispatch Center",
      metrics: [
        { label: "Active Waybills", value: "342 Parcels", trend: "In Transit" },
        { label: "On-Time Dispatch", value: "98.8%", trend: "Mombasa-Nairobi" },
        { label: "Fleet Capacity", value: "18 Trucks", trend: "Allocated" },
      ],
      previewType: "logistics",
    },
  },
  {
    id: "events",
    rank: 6,
    name: "Event Ticketing & Gate Scanner",
    shortTag: "Events Platform",
    category: "Ticketing & Media",
    statusBadge: "Live Ticketing Engine",
    statusTone: "emerald",
    detailUrl: "/products/events",
    summary:
      "End-to-end event ticketing ecosystem for concert organizers, conferences, and sports venues across Kenya. Offers direct Safaricom Daraja ticket purchasing, anti-counterfeit QR code passes, real-time gate scanner mobile app, and instant organizer settlements.",
    highlights: [
      "Dynamic ticket tier creation (Early Bird, VIP, Regular, Group passes)",
      "Instant Safaricom Daraja STK push checkout with zero friction",
      "Unique encrypted QR codes sent via SMS and email with wallet pass support",
      "High-speed gate scanner validation preventing duplicate entries",
      "Organizer live attendance dashboard with real-time revenue analytics",
    ],
    specs: [
      { label: "Platform", value: "Sherehe Tickets Kenya" },
      { label: "Gate Scanning", value: "Sub-Second QR Validate" },
      { label: "Checkout", value: "Instant Daraja STK" },
      { label: "Organizer SLA", value: "Automated Payouts" },
    ],
    techStack: ["Next.js", "PostgreSQL", "Daraja API", "QR Crypto"],
    mockup: {
      browserUrl: "https://sherehe.corbantechnologies.org/organizer/gate-scan",
      windowTitle: "Sherehe Tickets Kenya — Gate Admission Controller",
      metrics: [
        { label: "Tickets Scanned", value: "3,850", trend: "Zero duplicates" },
        { label: "Gross Box Office", value: "KES 5.2M", trend: "Daraja Verified" },
        { label: "Gate Scan Speed", value: "0.4s / pass", trend: "Encrypted QR" },
      ],
      previewType: "events",
    },
  },
];

export default function MockupStudio() {
  const [activeTab, setActiveTab] = useState<string>("sacco");
  const currentProduct = products.find((p) => p.id === activeTab) || products[0];

  return (
    <section id="products" className="w-full bg-white py-16 border-b border-slate-200">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-10 pb-4 border-b border-slate-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary mb-2">
              <Layers className="w-3.5 h-3.5" />
              Engineered &amp; Cloud-Hosted Portfolio
            </div>
            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
              Our Core Software Platforms &amp; Systems
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Over the past year, Corban Technologies has built, refined, and deployed 6 mission-critical systems. Explore the live platforms powering businesses across East Africa.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-semibold text-corporate-primary hover:text-orange-600 transition-colors shrink-0"
          >
            View Full Product Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tab Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {products.map((product) => {
            const isActive = activeTab === product.id;
            return (
              <button
                key={product.id}
                onClick={() => setActiveTab(product.id)}
                className={`p-3 rounded text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isActive
                        ? "bg-slate-800 text-corporate-primary"
                        : "bg-white text-slate-500 border border-slate-200"
                    }`}
                  >
                    Rank #{product.rank}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight line-clamp-1">
                    {product.shortTag}
                  </p>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isActive ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {product.category}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Showcase Card */}
        <div className="rounded border border-slate-200 bg-white overflow-hidden shadow-sm">
          {/* Header Strip */}
          <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-semibold">
                  Rank #{currentProduct.rank}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
                    currentProduct.statusTone === "emerald"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : currentProduct.statusTone === "blue"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}
                >
                  {currentProduct.statusBadge}
                </span>
                {currentProduct.liveDomain && (
                  <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                    {currentProduct.liveDomain}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {currentProduct.name}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={currentProduct.detailUrl}
                className="px-4 py-2 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                View Full Platform Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
              >
                Request Demo
              </Link>
            </div>
          </div>

          {/* Body Content & Mockup Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Detailed Info & Specifications */}
            <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentProduct.summary}
                </p>

                {/* Key Capabilities */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Core Capabilities
                  </p>
                  <ul className="space-y-2">
                    {currentProduct.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-corporate-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {currentProduct.specs.map((spec, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200/80">
                      <p className="text-[10px] uppercase font-semibold text-slate-500">
                        {spec.label}
                      </p>
                      <p className="font-semibold text-slate-900 text-xs">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-medium text-slate-500 mr-1">
                    Tech Stack:
                  </span>
                  {currentProduct.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: High-Fidelity UI Browser Mockup */}
            <div className="lg:col-span-7 p-6 bg-slate-50/70 flex flex-col justify-center">
              {/* Browser Window Frame */}
              <div className="rounded border border-slate-300/80 bg-white shadow-sm overflow-hidden">
                {/* Browser Top Bar */}
                <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  </div>
                  <div className="flex-1 max-w-sm mx-auto bg-white border border-slate-200 rounded px-2.5 py-0.5 flex items-center justify-between text-[11px] font-mono text-slate-600">
                    <span className="truncate">{currentProduct.mockup.browserUrl}</span>
                    <Lock className="w-2.5 h-2.5 text-emerald-600 shrink-0 ml-2" />
                  </div>
                </div>

                {/* Mockup Canvas Screen */}
                <div className="p-5 bg-white space-y-4">
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-corporate-primary">
                        System Interface Preview
                      </p>
                      <p className="text-xs font-semibold text-slate-900">
                        {currentProduct.mockup.windowTitle}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                      Live Production
                    </span>
                  </div>

                  {/* KPI Mini-Dashboard */}
                  <div className="grid grid-cols-3 gap-3">
                    {currentProduct.mockup.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded bg-slate-50 border border-slate-200"
                      >
                        <p className="text-[10px] font-semibold text-slate-500 truncate">
                          {metric.label}
                        </p>
                        <p className="text-sm font-semibold text-slate-900 mt-0.5">
                          {metric.value}
                        </p>
                        {metric.trend && (
                          <p className="text-[10px] font-medium text-emerald-700 mt-0.5">
                            {metric.trend}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* UI Representation Table / Cards */}
                  <div className="rounded border border-slate-200 overflow-hidden text-xs">
                    <div className="bg-slate-50 px-3 py-1.5 font-semibold text-slate-700 border-b border-slate-200 flex items-center justify-between text-[11px]">
                      <span>Active Transaction Stream &amp; Module Ledger</span>
                      <span className="text-corporate-primary font-mono text-[10px]">
                        Operational
                      </span>
                    </div>

                    {currentProduct.id === "sacco" && (
                      <div className="divide-y divide-slate-100">
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              M-Pesa STK Deposit — Account #WM-4091
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Member: J. Mwangi · Share Capital Pot
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-emerald-700">
                            +KES 15,000.00
                          </span>
                        </div>
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              Loan Disbursement — Diminishing Balance
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Approved by SACCO Admin · B2C Daraja
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-slate-900">
                            -KES 150,000.00
                          </span>
                        </div>
                      </div>
                    )}

                    {currentProduct.id === "finance" && (
                      <div className="divide-y divide-slate-100">
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              Dividend Batch Run — AGM Projections
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Weighted Share Capital Ratio · 12.5% Rate
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-corporate-primary">
                            Processed
                          </span>
                        </div>
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              Double-Entry Journal #JRN-2026-08
                            </p>
                            <p className="text-[11px] text-slate-500">
                              KRA Statutory PAYE vs General Ledger
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-emerald-700">
                            Balanced
                          </span>
                        </div>
                      </div>
                    )}

                    {currentProduct.id === "retail" && (
                      <div className="divide-y divide-slate-100">
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              POS Counter Sale #ORD-8921 (Barcode Scanned)
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Payment: M-Pesa STK Push Instant Receipt
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-emerald-700">
                            +KES 4,500.00
                          </span>
                        </div>
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              Inventory Batch Sync — GearHouse Hub
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Stock Alert: 48 Units Remaining
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-slate-700">
                            In Stock
                          </span>
                        </div>
                      </div>
                    )}

                    {currentProduct.id === "marketing" && (
                      <div className="divide-y divide-slate-100">
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              LJK Telecom Broadcast — Alphanumeric Sender
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Batch #LJK-774 · 24,000 Delivered SMS
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-emerald-700">
                            99.4% Delivery
                          </span>
                        </div>
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              CRM Deal Conversion Funnel
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Lead Attribution &amp; Client Wallet Debited
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-corporate-primary">
                            Active
                          </span>
                        </div>
                      </div>
                    )}

                    {currentProduct.id === "logistics" && (
                      <div className="divide-y divide-slate-100">
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              Waybill #CT-MBS-9021 (Mombasa to Nairobi)
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Carrier Manifest: Truck KBZ 412M · In Transit
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-blue-700">
                            Out for Delivery
                          </span>
                        </div>
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              Digital Proof of Delivery (POD)
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Recipient Signature Verified via OTP
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-emerald-700">
                            Confirmed
                          </span>
                        </div>
                      </div>
                    )}

                    {currentProduct.id === "events" && (
                      <div className="divide-y divide-slate-100">
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              Gate QR Scanner #GATE-02 (VIP Pass)
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Attendee: D. Otieno · Sherehe Tickets Kenya
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-emerald-700">
                            ADMITTED
                          </span>
                        </div>
                        <div className="p-2.5 flex items-center justify-between bg-white text-xs">
                          <div>
                            <p className="font-semibold text-slate-900">
                              M-Pesa STK Instant Checkout
                            </p>
                            <p className="text-[11px] text-slate-500">
                              2x Early Bird Tickets · Daraja B2C Cleared
                            </p>
                          </div>
                          <span className="font-mono font-semibold text-slate-900">
                            KES 3,000.00
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
