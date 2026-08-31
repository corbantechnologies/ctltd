import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  PiggyBank,
  CreditCard,
  Smartphone,
  BarChart3,
  BookOpen,
  Settings,
  Receipt,
  CheckCircle,
  ArrowRight,
  Globe,
  ExternalLink,
  ShieldCheck,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SACCO & Cooperative Core Banking Platform | Corban Technologies LTD",
  description:
    "Wananchi Mali SACCO Core Banking Platform — a complete digital cooperative management system powering Kenyan SACCOs. Multi-pot savings, dual loan engines, automated double-entry GL, and Safaricom Daraja M-Pesa.",
  alternates: {
    canonical: "https://www.corbantechnologies.org/sacco-platform",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.corbantechnologies.org/sacco-platform",
    title: "SACCO & Cooperative Core Banking Platform | Corban Technologies LTD",
    description:
      "Wananchi Mali SACCO Core Banking Platform — complete digital cooperative core banking powering SACCOs across Kenya with multi-pot savings, loans, and Daraja M-Pesa.",
    siteName: "Corban Technologies LTD",
  },
  twitter: {
    card: "summary_large_image",
    title: "SACCO & Cooperative Core Banking Platform | Corban Technologies LTD",
    description:
      "Wananchi Mali SACCO Core Banking Platform — complete digital cooperative core banking powering SACCOs across Kenya.",
    creator: "@corbantechltd",
  },
};

const highlights = [
  { icon: Users, label: "Member CRM", desc: "Full CRM with bulk CSV onboarding, NOK tracking, and role-based access" },
  { icon: PiggyBank, label: "Multi-Pot Savings", desc: "Share Capital, Holiday, Emergency, and monthly deposits tracked in real time" },
  { icon: CreditCard, label: "Dual Loan Engine", desc: "Diminishing Balance and Flat Rate interest logic for any cooperative model" },
  { icon: Smartphone, label: "M-Pesa Daraja API", desc: "Live Safaricom Daraja STK Push deposits and B2C loan disbursements" },
  { icon: BookOpen, label: "Full GL Accounting", desc: "Automatic double-entry posting on every transaction with zero manual work" },
  { icon: BarChart3, label: "Executive Reporting", desc: "Live Balance Sheet, Trial Balance, Profit & Loss, and Debtors ledger" },
];

const onboardingSteps = [
  { step: "01", title: "SACCO Configuration", desc: "SACCO brand, fee structures, savings products, and loan models are set up." },
  { step: "02", title: "Payment & Daraja Setup", desc: "M-Pesa paybills, bank accounts, and Safaricom Daraja credentials linked to GL accounts." },
  { step: "03", title: "Chart of Accounts (COA)", desc: "Double-entry GL accounts are mapped and opening balances posted via journals." },
  { step: "04", title: "Bulk Member Loading", desc: "Members loaded via bulk CSV. Each receives a unique member ID and login portal link." },
  { step: "05", title: "Live Operations", desc: "Process bulk payments, receive automated M-Pesa deposits, and approve loans live." },
];

const modules = [
  {
    icon: Users,
    title: "Member CRM & Directory",
    items: [
      "Unique SACCO member numbering",
      "Bulk CSV member creation with instant validation",
      "Next of Kin (NOK) relationship tracking",
      "Role-based access (Member, Admin, Superuser)",
      "Active members CSV export for regulatory audits",
    ],
  },
  {
    icon: PiggyBank,
    title: "Savings & Deposit Tracking",
    items: [
      "Multiple savings pots per member (Shares, Holiday, Emergency)",
      "Real-time balance computation and statement downloads",
      "M-Pesa STK Push instant deposit confirmation",
      "Bulk CSV deposit upload with pre-filled templates",
      "Automated monthly contribution reminders",
    ],
  },
  {
    icon: Receipt,
    title: "Fee Payments & Dues",
    items: [
      "Multiple recurring and one-off fee types",
      "Outstanding balance visible in bulk templates",
      "Double-entry GL auto-posting on fee receipt",
      "Cleared account detection preventing overpayments",
    ],
  },
  {
    icon: CreditCard,
    title: "Loan Engine & Appraisal",
    items: [
      "Member self-service loan application portal",
      "Automated eligibility calculation based on savings ratio",
      "Guarantor request and digital approval workflow",
      "Diminishing balance & flat rate interest schedules",
      "Repayment tracking with penalty rules",
    ],
  },
  {
    icon: Smartphone,
    title: "Safaricom Daraja Integration",
    items: [
      "Sub-second C2B STK Push deposits",
      "Automated B2C disbursement for approved loans",
      "High-reliability webhook listener engine",
      "Automatic journal entry on M-Pesa receipt",
    ],
  },
  {
    icon: BookOpen,
    title: "Double-Entry GL Accounting",
    items: [
      "Automatic double-entry general ledger on every transaction",
      "Trial Balance, Balance Sheet, and P&L reports",
      "Manual journal batches and bank reconciliations",
      "Year-filtered financial statements",
    ],
  },
];

export default function SaccoPlatformPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
                <Building2 className="w-3.5 h-3.5" />
                Wananchi Mali · Flagship SACCO Platform
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                3 Kenyan SACCOs Running Live
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
              The Complete Digital Core Banking System for SACCOs &amp; Cooperatives
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              Engineered and cloud-hosted by Corban Technologies. A fully integrated cooperative platform covering member CRM, savings pots, loans, fees, Safaricom Daraja M-Pesa, and automated double-entry GL accounting.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Request SACCO Onboarding Demo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="https://wananchimali.co.ke"
                target="_blank"
                className="px-5 py-2.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
              >
                Visit Wananchi Mali Portal <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ────────────────────────────────────────────────── */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {highlights.map((h, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded p-4 flex flex-col gap-2.5 shadow-sm"
              >
                <div className="w-7 h-7 bg-slate-50 border border-slate-200 rounded flex items-center justify-center text-corporate-primary">
                  <h.icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">{h.label}</p>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONBOARDING STEPS ──────────────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Onboarding Process
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              From Setup to Go-Live in 5 Structured Steps
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Our engineering team handles configuration and data migration. Your administrative staff are fully trained before go-live.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {onboardingSteps.map((s) => (
              <div
                key={s.step}
                className="border border-slate-200 rounded p-4 bg-slate-50 flex flex-col justify-between"
              >
                <div className="text-xl font-semibold text-slate-400 mb-2 font-mono">
                  {s.step}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 mb-1">{s.title}</p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES ───────────────────────────────────────────────────── */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Core Modules
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Everything a Cooperative SACCO Needs in One Unified System
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              All modules share the same double-entry database. An M-Pesa deposit instantly reconciles balances, posts to the GL, and notifies the member.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m) => (
              <div
                key={m.title}
                className="bg-white border border-slate-200 rounded p-4 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <div className="w-6 h-6 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-corporate-primary">
                    <m.icon className="h-3.5 w-3.5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-900">{m.title}</p>
                </div>
                <ul className="space-y-1.5">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[11px] text-slate-600 leading-relaxed">
                      <CheckCircle className="h-3 w-3 text-corporate-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TWO PORTALS ───────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              System Architecture
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Two Dedicated Portals: Member Self-Service &amp; Branch Administration
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Strict role-based isolation guarantees member privacy while empowering administrators with executive operational tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Member Portal */}
            <div className="border border-slate-200 rounded p-6 bg-slate-50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white border border-slate-200 rounded flex items-center justify-center text-emerald-600">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Member Portal (Mobile &amp; Web)</p>
                  <p className="text-[11px] text-slate-500">Self-service for SACCO members</p>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  "Savings deposit via Safaricom Daraja STK Push",
                  "Loan application with automated savings eligibility check",
                  "Guarantor request accept / decline notifications",
                  "Account statement generation per savings pot",
                  "Next of Kin (NOK) beneficiary management",
                  "Instant email and SMS notification receipts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admin Portal */}
            <div className="border border-slate-200 rounded p-6 bg-slate-50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white border border-slate-200 rounded flex items-center justify-center text-corporate-primary">
                  <Settings className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Branch Administration Workspace</p>
                  <p className="text-[11px] text-slate-500">Full operational and financial control</p>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  "Bulk CSV upload for deposits, fee collections, and journals",
                  "Loan appraisal, guarantor review, and B2C disbursement",
                  "Member directory with real-time financial summaries",
                  "GL reports: Balance Sheet, Trial Balance, Profit & Loss",
                  "Annual AGM dividend batch computation and distribution",
                  "Active member audit export and balance sheets",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle className="h-3.5 w-3.5 text-corporate-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ONBOARDING CTA ────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="p-8 rounded bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-corporate-primary">
                3 SACCOs Live in Production
              </span>
              <h3 className="text-base font-semibold text-white">
                Ready to Deploy the Platform for Your Cooperative?
              </h3>
              <p className="text-xs text-slate-300">
                Corban Technologies handles migration, configuration, staff training, and dedicated GCP cloud hosting.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Schedule SACCO Consultation <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
