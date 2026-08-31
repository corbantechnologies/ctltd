import type { Metadata } from "next";
import Link from "next/link";
import {
  Send,
  Users,
  Smartphone,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Radio,
  BarChart3,
  ExternalLink,
  Lock,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Marketing CRM & Telecom Operations Suite | Corban Technologies LTD",
  description:
    "LJK Marketing Engine — high-throughput telecom routing, custom Alphanumeric Sender ID dispatch, client CRM funnels, campaign scheduling, and automated M-Pesa billing.",
};

export default function MarketingProductPage() {
  const highlights = [
    { icon: Radio, label: "Alphanumeric Sender ID Dispatch", desc: "Custom branded telecom sender IDs routed through certified high-throughput mobile network channels." },
    { icon: Users, label: "Client CRM & Lead Funnels", desc: "Interactive deal pipeline, lead intake forms, contact segmentation, and customer communication timelines." },
    { icon: Send, label: "High-Volume Campaign Scheduler", desc: "Schedule targeted bulk broadcast batches with dynamic tag merge variables and audience filtering." },
    { icon: Wallet, label: "Automated M-Pesa Prepaid Billing", desc: "Instant wallet top-ups via Daraja STK Push with transparent per-message pricing and real-time balance debits." },
    { icon: BarChart3, label: "Real-Time Delivery Analytics", desc: "Detailed breakdown of sent, delivered, failed, and bounced messages with carrier delivery receipts (DLR)." },
    { icon: Lock, label: "Enterprise Security & OTPs", desc: "High-priority OTP authentication routes for sensitive customer logins and verification workflows." },
  ];

  const modules = [
    {
      title: "Telecom Messaging & Broadcast Engine",
      desc: "Engineered for marketing agencies and enterprises requiring dependable high-speed message delivery.",
      items: [
        "High-throughput telecom queue processing up to 500 messages per second",
        "Personalized SMS broadcasting with dynamic tags (e.g. Member Name, Balance, Custom Link)",
        "Automated opt-out (STOP) management ensuring telecom compliance",
        "Multi-lingual character encoding support and long-message concatenation",
        "Scheduled campaign drafts with automatic time-zone delivery windows",
      ],
    },
    {
      title: "Client CRM & Deal Management",
      desc: "Comprehensive client pipeline tailored for marketing consultancies and B2B service firms.",
      items: [
        "Visual deal stages from 'Lead Captured' to 'Proposal Sent' and 'Closed Won'",
        "Contact management with custom tags, interaction history, and notes",
        "Automated client welcome emails and workspace onboarding links",
        "Shared team inbox for incoming inquiries and client correspondence",
        "Client project tracking with milestone status indicators",
      ],
    },
    {
      title: "Prepaid Wallet & Billing Automation",
      desc: "Zero-friction financial rails ensuring continuous campaign dispatch without credit bottlenecks.",
      items: [
        "Self-service M-Pesa STK Push wallet top-ups directly within the dashboard",
        "Automated VAT tax invoices generated and emailed upon credit replenishment",
        "Low-balance alert triggers warning managers before credits deplete",
        "Multi-tier volume discount rules for enterprise clients",
        "Real-time ledger statements detailing every credit deduction",
      ],
    },
    {
      title: "Telecom Gateway Integration & APIs",
      desc: "Developer-first REST APIs allowing third-party ERPs and web platforms to trigger messages.",
      items: [
        "API key generation with granular permission scopes and rate limiting",
        "Sub-second transactional OTP delivery for multi-factor authentication",
        "Real-time webhook listener dispatching delivery status updates to client servers",
        "Comprehensive API documentation with cURL, Python, and JavaScript snippets",
        "Dedicated cloud infrastructure with 99.9% uptime SLA",
      ],
    },
  ];

  const techSpecs = [
    { label: "Pilot Partner", value: "LJK Marketing Agency" },
    { label: "Live Domain", value: "ljkmarketingagency.co.ke" },
    { label: "Throughput", value: "500 Messages / Second" },
    { label: "Payment Rails", value: "Automated Daraja M-Pesa Wallet" },
    { label: "Architecture", value: "Next.js 15 + Django REST + Postgres" },
    { label: "Carrier Routes", value: "Certified East African Telecom" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
                <Send className="w-3.5 h-3.5" />
                Rank #4 · Marketing CRM &amp; Telecom Suite
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                Client Pilot Testing (LJK Marketing)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
              Alphanumeric Telecom Broadcasts, Client CRM &amp; Automated Billing
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Engineered and cloud-hosted by Corban Technologies. The LJK Marketing platform empowers agencies to run high-throughput telecom campaigns, manage client deal pipelines, and automate M-Pesa billing in one unified system.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact?product=marketing"
                className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Request Marketing CRM Pilot <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="https://ljkmarketingagency.co.ke"
                target="_blank"
                className="px-5 py-2.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
              >
                Visit LJK Portal <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
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
              High-Velocity Campaign Operations for Scaling Teams
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
              End-to-End Marketing &amp; Telecom Capabilities
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
                Launch Your Custom Marketing &amp; Telecom Workspace
              </h3>
              <p className="text-xs text-slate-300">
                Corban Technologies configures your Alphanumeric Sender IDs, campaign workflows, and dedicated cloud hosting.
              </p>
            </div>
            <Link
              href="/contact?product=marketing"
              className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5 shrink-0"
            >
              Get Started Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
