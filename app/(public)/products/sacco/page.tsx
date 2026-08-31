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
  Server,
  Database,
  Lock,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SACCO & Cooperative Management Platform | Corban Technologies LTD",
  description:
    "Wananchi Mali SACCO Platform — complete digital core banking powering 3 live Kenyan SACCOs. Multi-pot savings, dual loan engines, Safaricom Daraja M-Pesa, double-entry GL accounting, and SASRA regulatory compliance.",
};

export default function SaccoProductPage() {
  const highlights = [
    { icon: Users, label: "Member CRM & Directory", desc: "Full CRM with bulk CSV onboarding, NOK tracking, role-based access, and audit exports." },
    { icon: PiggyBank, label: "Multi-Pot Savings", desc: "Share Capital, Holiday, Emergency, and monthly deposits tracked in real time." },
    { icon: CreditCard, label: "Dual Loan Engine", desc: "Diminishing Balance and Flat Rate interest logic with automated guarantor workflows." },
    { icon: Smartphone, label: "M-Pesa Daraja Integration", desc: "Live Safaricom Daraja STK Push deposits and B2C loan disbursements." },
    { icon: BookOpen, label: "Automated Double-Entry GL", desc: "Real-time ledger posting on every transaction with zero manual accounting work." },
    { icon: BarChart3, label: "Executive Reporting", desc: "Live Balance Sheet, Trial Balance, Profit & Loss, and SASRA compliance schedules." },
  ];

  const modules = [
    {
      title: "Member Self-Service Portal",
      desc: "Responsive web & mobile portal giving cooperative members 24/7 visibility into their accounts.",
      items: [
        "Instant savings deposits via Safaricom Daraja STK Push",
        "Loan application with automated savings eligibility appraisal",
        "Digital guarantor requests with instant SMS/email approvals",
        "Per-pot statement downloads and transaction history",
        "Next of Kin (NOK) relationship management",
      ],
    },
    {
      title: "Branch Administration Workspace",
      desc: "Comprehensive operations console for SACCO tellers, loan officers, and branch managers.",
      items: [
        "Bulk CSV upload for deposits, recurring fees, and loan repayments",
        "Multi-stage loan approval pipeline with guarantor verification",
        "Automated B2C M-Pesa loan disbursement upon approval",
        "Member KYC directory with active balance summaries",
        "Daily cash book and teller reconciliation sheets",
      ],
    },
    {
      title: "Core Double-Entry General Ledger",
      desc: "Financial accounting engine built from the ground up for strict cooperative compliance.",
      items: [
        "Automatic double-entry posting on every deposit, loan, and fee",
        "Real-time Trial Balance, Balance Sheet, and P&L generation",
        "Manual journal batches for adjustments and bank reconciliation",
        "Year-based financial filtering and multi-year audit logs",
        "Debtors aging analysis and non-performing loan provisions",
      ],
    },
    {
      title: "Dividend & AGM Distribution Engine",
      desc: "Advanced mathematical engine calculating member dividend shares accurately.",
      items: [
        "Weighted average share capital dividend calculations",
        "Customizable dividend payout rates approved at AGMs",
        "Automated withholding tax (WHT) deductions",
        "One-click batch distribution directly into member savings pots",
        "Exportable AGM member dividend schedules",
      ],
    },
  ];

  const techSpecs = [
    { label: "Active Deployments", value: "3 Kenyan SACCOs in Production" },
    { label: "Public Brand", value: "Wananchi Mali (wananchimali.co.ke)" },
    { label: "Regulatory Ready", value: "SASRA & KRA ITMS Compliant" },
    { label: "Payment Rails", value: "Safaricom Daraja API (STK & B2C)" },
    { label: "Cloud Hosting", value: "Dedicated GCP Compute & Postgres" },
    { label: "Data Isolation", value: "Tenant Schema Boundary Isolation" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
                <Building2 className="w-3.5 h-3.5" />
                Rank #1 · Flagship SACCO Platform
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                3 Kenyan SACCOs Running Live
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
              The Complete Digital Core Banking System for SACCOs &amp; Cooperatives
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Engineered and cloud-hosted by Corban Technologies under our Wananchi Mali platform. A fully integrated cooperative platform covering member CRM, savings pots, diminishing &amp; flat loan engines, Safaricom Daraja M-Pesa, and automated double-entry GL accounting.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact?product=sacco"
                className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Schedule SACCO Demo &amp; Migration <ArrowRight className="w-3.5 h-3.5" />
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

      {/* Feature Highlights Grid */}
      <section className="w-full bg-white py-14 border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Platform Pillars
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Built for Scale, Reliability &amp; Regulatory Compliance
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

      {/* Deep Dive Modules */}
      <section className="w-full bg-slate-50 py-14 border-b border-slate-200">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="mb-8 pb-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-1">
              Module Deep-Dive
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              End-to-End Cooperative Management Modules
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
                Ready to Digitise Your Cooperative SACCO?
              </h3>
              <p className="text-xs text-slate-300">
                Corban Technologies handles historical member data migration, chart of accounts setup, staff training, and dedicated GCP cloud hosting.
              </p>
            </div>
            <Link
              href="/contact?product=sacco"
              className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5 shrink-0"
            >
              Start SACCO Onboarding <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
