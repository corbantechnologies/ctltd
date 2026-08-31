import { Metadata } from "next";
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
  ShieldCheck,
  Server,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Products & Platforms | Corban Technologies LTD",
  description:
    "Explore Corban Technologies' 6 core enterprise software platforms: SACCO core banking, financial intelligence, retail POS, marketing CRM, logistics, and digital event ticketing.",
};

interface ProductItem {
  id: string;
  rank: number;
  name: string;
  category: string;
  statusBadge: string;
  domain?: string;
  detailUrl: string;
  description: string;
  capabilities: string[];
  specs: { label: string; value: string }[];
  techStack: string[];
}

const productsList: ProductItem[] = [
  {
    id: "sacco",
    rank: 1,
    name: "SACCO & Cooperative Management Platform",
    category: "Financial Technology (Fintech)",
    statusBadge: "3 Kenyan SACCOs Live",
    domain: "wananchimali.co.ke",
    detailUrl: "/products/sacco",
    description:
      "A complete digital cooperative core management ecosystem. Features double-entry GL accounting, member self-service portal, branch administration workspace, Safaricom Daraja M-Pesa STK Push deposits, B2C loan disbursements, and SASRA regulatory reporting.",
    capabilities: [
      "Member CRM with unique account IDs, NOK, and bulk CSV creation",
      "Multi-pot savings: Shares, Holiday, Emergency, and Monthly Deposits",
      "Dual Loan Engine: Diminishing balance and flat-rate interest calculations",
      "Safaricom Daraja API: STK Push deposits and automated B2C disbursements",
      "Automated Double-Entry GL: Balance Sheet, Trial Balance, P&L, Debtors ledgers",
      "Role-based security: Member, Branch Admin, Auditor, and Multi-tenant Superuser",
    ],
    specs: [
      { label: "Deployments", value: "3 Active SACCOs" },
      { label: "Compliance", value: "SASRA & KRA Ready" },
      { label: "Database", value: "Isolated PostgreSQL Schema" },
      { label: "Hosting", value: "Google Cloud Platform (GCP)" },
    ],
    techStack: ["Next.js", "Django REST Framework", "PostgreSQL", "Daraja API"],
  },
  {
    id: "finance",
    rank: 2,
    name: "Finance Analytics & SME Bookkeeping Suite",
    category: "Fintech & Corporate Finance",
    statusBadge: "FedhaHub + MannaBooks",
    detailUrl: "/products/finance",
    description:
      "Comprehensive financial intelligence software pairing FedhaHub's advanced analytical modeling (SACCO dividend formulas, loan schedules, Kenyan KRA PAYE tax brackets) with MannaBooks' double-entry SME accounting, quotations, invoices, and ledger posting.",
    capabilities: [
      "FedhaHub: Multi-tier dividend distribution computation for SACCO AGM reports",
      "Automated Kenyan KRA PAYE tax bracket engine & statutory deductions",
      "MannaBooks: Double-entry Chart of Accounts, quotes, and customer invoices",
      "Multi-currency support with automated receipting and journal reconciliation",
      "Real-time Balance Sheet, Trial Balance, and Profit & Loss generation",
      "Audit trail with historical journal logs and CSV export capabilities",
    ],
    specs: [
      { label: "Engines", value: "FedhaHub + MannaBooks" },
      { label: "Tax System", value: "Kenyan KRA PAYE Ready" },
      { label: "Accounting", value: "Strict Double-Entry GL" },
      { label: "Database", value: "Drizzle ORM + PostgreSQL" },
    ],
    techStack: ["React / Next.js", "Drizzle ORM", "PostgreSQL", "Python Analytics"],
  },
  {
    id: "retail",
    rank: 3,
    name: "Omnichannel Retail Commerce & Point of Sale",
    category: "E-Commerce & Retail Systems",
    statusBadge: "Live Client Deployment (GearHouse)",
    detailUrl: "/products/retail",
    description:
      "Enterprise retail infrastructure uniting digital customer storefronts with barcode Point-of-Sale (POS) cashier terminals, real-time inventory tracking, and instantaneous Safaricom Daraja payment reconciliation.",
    capabilities: [
      "Online customer product catalog with live stock availability",
      "High-speed cashier Point-of-Sale (POS) with barcode scanner support",
      "Instant M-Pesa STK push checkout at counter and online cart",
      "Inventory batch control with low-stock alerts and supplier logs",
      "Daily sales reports, cash drawer reconciliations, and thermal receipt printing",
      "Multi-branch inventory syncing with centralized admin management",
    ],
    specs: [
      { label: "Client Partner", value: "GearHouse Kenya" },
      { label: "Terminal Mode", value: "Online Store + Cashier POS" },
      { label: "Payments", value: "M-Pesa STK + Cash" },
      { label: "Sync Speed", value: "Real-Time Multi-Branch" },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Django REST API", "Daraja API"],
  },
  {
    id: "marketing",
    rank: 4,
    name: "Marketing CRM & Business Telecom Engine",
    category: "Marketing Operations & Telecom",
    statusBadge: "Client Pilot (LJK Marketing)",
    domain: "ljkmarketingagency.co.ke",
    detailUrl: "/products/marketing",
    description:
      "High-throughput telecom and marketing operations engine built for agencies and scaling enterprises. Features custom alphanumeric sender ID dispatch, CRM deal tracking, automated follow-ups, and prepaid client billing funnels.",
    capabilities: [
      "Custom Alphanumeric Sender ID setup and telecom gateway routing",
      "Client CRM deal pipelines, lead capture forms, and automated follow-ups",
      "Multi-channel broadcast scheduler with audience segment filtering",
      "Automated M-Pesa credit top-ups and wallet-based billing engine",
      "Granular delivery analytics: Sent, Delivered, Bounced, and Click attribution",
      "Security center with 2FA OTP verification and password reset workflows",
    ],
    specs: [
      { label: "Pilot Partner", value: "LJK Marketing Agency" },
      { label: "Throughput", value: "500 msgs/sec High-Volume" },
      { label: "Sender IDs", value: "Alphanumeric Certified" },
      { label: "Billing", value: "Automated M-Pesa Wallet" },
    ],
    techStack: ["Next.js 15", "Django REST", "PostgreSQL", "Telecom Gateways"],
  },
  {
    id: "logistics",
    rank: 5,
    name: "Freight, Waybills & Fleet Logistics OS",
    category: "Logistics & Supply Chain",
    statusBadge: "Enterprise Ready",
    detailUrl: "/products/logistics",
    description:
      "End-to-end logistics platform engineered for parcel courier firms, cargo transporters, and fleet operators. Streamlines waybill generation, shipment tracking timelines, fleet vehicle manifests, and digital proof-of-delivery receipts.",
    capabilities: [
      "Automated waybill creation with tracking number barcode generation",
      "Milestone-based shipment tracking timeline for senders and receivers",
      "Fleet vehicle dispatch scheduling and driver route assignments",
      "Customer SMS notifications on dispatch, transit, and arrival",
      "Proof of delivery (POD) capture with digital signatures and timestamps",
      "Multi-hub depot routing from Mombasa to Nairobi and regional branches",
    ],
    specs: [
      { label: "Platform", value: "CT Logistics" },
      { label: "Tracking", value: "Real-Time Milestones" },
      { label: "Waybills", value: "Automated PDF & Barcode" },
      { label: "Fleet Mode", value: "Multi-Hub Dispatch" },
    ],
    techStack: ["Next.js", "Drizzle ORM", "PostgreSQL", "Cloud Compute"],
  },
  {
    id: "events",
    rank: 6,
    name: "Digital Event Ticketing & QR Gate Passes",
    category: "Events, Entertainment & Media",
    statusBadge: "Live Platform (Sherehe Tickets)",
    detailUrl: "/products/events",
    description:
      "Kenya's high-speed digital event ticketing platform for concert promoters, conferences, and sports venues. Delivers friction-free Safaricom Daraja checkout, anti-counterfeit QR passes, mobile gate scanner validation, and instant organizer settlements.",
    capabilities: [
      "Dynamic ticket tier creation (Early Bird, VIP, Regular, Group passes)",
      "Instant Safaricom Daraja STK push checkout with zero checkout friction",
      "Unique encrypted QR codes sent via SMS and email with wallet pass support",
      "High-speed gate scanner validation preventing duplicate entries",
      "Organizer live attendance dashboard with real-time gross revenue analytics",
      "Automated revenue payouts and ticket audit reports",
    ],
    specs: [
      { label: "Platform", value: "Sherehe Tickets Kenya" },
      { label: "Gate Scanning", value: "Sub-Second QR Validate" },
      { label: "Checkout", value: "Instant Daraja STK" },
      { label: "Security", value: "Encrypted Single-Use QR" },
    ],
    techStack: ["Next.js", "PostgreSQL", "Daraja API", "QR Crypto"],
  },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="relative w-full bg-white border-b border-slate-200 pt-16 pb-14">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
              <Layers className="w-3.5 h-3.5" />
              Software Portfolio &amp; Platform Rankings
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
              Enterprise Platforms Engineered &amp; Cloud-Hosted by Corban Technologies
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Over the past year, our engineers have developed, tested, and deployed 6 core systems tailored for Kenyan and East African enterprise workflows. Every platform is backed by dedicated cloud hosting, database isolation, and 99.9% uptime.
            </p>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="py-12 bg-slate-50 flex-grow">
        <div className="w-full px-6 sm:px-10 lg:px-16 space-y-8">
          {productsList.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="p-6 sm:p-8 rounded bg-white border border-slate-200 shadow-sm"
            >
              {/* Product Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-semibold">
                      Rank #{product.rank}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {product.statusBadge}
                    </span>
                    {product.domain && (
                      <span className="text-xs font-mono text-slate-500">
                        {product.domain}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 mt-1">
                    {product.name}
                  </h2>
                  <p className="text-xs font-medium text-corporate-primary">
                    {product.category}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={product.detailUrl}
                    className="px-4 py-2 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    View Platform Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/contact?product=${product.id}`}
                    className="px-4 py-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                {/* Left: Description & Specs */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                      Overview &amp; Architecture
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Specs Matrix */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {product.specs.map((spec, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded bg-slate-50 border border-slate-200/80"
                      >
                        <p className="text-[10px] uppercase font-semibold text-slate-500">
                          {spec.label}
                        </p>
                        <p className="font-semibold text-slate-900 text-xs mt-0.5">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-medium text-slate-500 mr-1">
                      Tech Stack:
                    </span>
                    {product.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Capabilities Checklist */}
                <div className="lg:col-span-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Core Capabilities &amp; Modules
                  </p>
                  <ul className="space-y-2">
                    {product.capabilities.map((cap, idx) => (
                      <li
                        key={idx}
                        className="p-2.5 rounded bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-corporate-primary shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
