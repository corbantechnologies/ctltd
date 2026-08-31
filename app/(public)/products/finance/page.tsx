import type { Metadata } from "next";
import Link from "next/link";
import {
  Receipt,
  BarChart3,
  BookOpen,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calculator,
  FileSpreadsheet,
  Coins,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Finance & Accounting Intelligence | Corban Technologies LTD",
  description:
    "FedhaHub & MannaBooks — advanced financial analytics, SACCO dividend distribution engines, Kenyan KRA PAYE tax calculators, and double-entry SME bookkeeping software.",
};

export default function FinanceProductPage() {
  const highlights = [
    { icon: Calculator, label: "FedhaHub Dividend Engine", desc: "Automated weighted average share capital dividend computation with withholding tax (WHT) calculations for SACCO AGM reports." },
    { icon: Coins, label: "Kenyan KRA PAYE Tax Calculator", desc: "Statutory tax bracket formulas, relief computations, NHIF/SHIF and NSSF deduction processing." },
    { icon: BookOpen, label: "MannaBooks Double-Entry GL", desc: "Strict Chart of Accounts, multi-tier account hierarchy, and automated journal batch posting." },
    { icon: Receipt, label: "Quotations & Invoicing", desc: "Professional PDF quotation generation, conversion to invoices, and automated payment receipts." },
    { icon: BarChart3, label: "Real-Time Financial Statements", desc: "Instant Balance Sheet, Profit & Loss, Trial Balance, and Cash Book generation with year filters." },
    { icon: TrendingUp, label: "Loan Amortization Modeling", desc: "Interactive diminishing balance and flat rate repayment schedule simulators for financial planners." },
  ];

  const modules = [
    {
      title: "FedhaHub: Advanced Financial Intelligence",
      desc: "Mathematical modeling engines tailored for cooperative boards and corporate financial analysts.",
      items: [
        "Multi-tier SACCO dividend distribution modeling based on monthly share balances",
        "Automated Kenyan PAYE income tax schedule computations",
        "Loan interest schedule generator comparing Diminishing vs Flat rate cost of credit",
        "Exportable Excel and CSV audit schedules for board meetings and AGMs",
        "Historical statutory tax bracket archive and compliance updates",
      ],
    },
    {
      title: "MannaBooks: SME Bookkeeping & Invoicing",
      desc: "Clean, double-entry financial software built for growing Kenyan small and medium enterprises.",
      items: [
        "Chart of Accounts (COA) management across Assets, Liabilities, Equity, Income, and Expenses",
        "Customer quote creation with one-click conversion into invoices",
        "M-Pesa, Bank, and Cash payment receipting with automated GL posting",
        "Vendor bill tracking and accounts payable schedules",
        "Detailed general ledger statement export per account",
      ],
    },
    {
      title: "Audit Trail & Compliance Reports",
      desc: "Complete transparency and historical data integrity for internal and external auditors.",
      items: [
        "Immutable journal transaction logs with user attribution timestamps",
        "Trial balance verification with automated debit/credit balancing checks",
        "Real-time Balance Sheet and P&L statement generation",
        "KRA tax withholding deduction summaries",
        "Multi-currency support with exchange rate ledger entries",
      ],
    },
    {
      title: "Dedicated Cloud Deployment & Security",
      desc: "Enterprise-grade database hosting with automated daily snapshots.",
      items: [
        "Drizzle ORM paired with high-performance PostgreSQL relational storage",
        "Daily automated geo-redundant database backups",
        "End-to-end TLS encryption and role-based access control (RBAC)",
        "Zero data sharing across multi-tenant deployments",
        "REST API endpoints for ERP and banking integration",
      ],
    },
  ];

  const techSpecs = [
    { label: "Engines Included", value: "FedhaHub + MannaBooks" },
    { label: "Accounting Basis", value: "Strict Double-Entry GL" },
    { label: "Tax System", value: "Kenyan KRA PAYE Ready" },
    { label: "Database", value: "PostgreSQL with Drizzle ORM" },
    { label: "Hosting", value: "Dedicated Cloud Instance" },
    { label: "Data Export", value: "PDF, Excel & CSV Schedules" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="relative w-full bg-white border-b border-slate-200 pt-16 pb-16">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
                <BarChart3 className="w-3.5 h-3.5" />
                Rank #2 · Financial Software Suite
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                FedhaHub &amp; MannaBooks
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
              Financial Intelligence, Tax Modeling &amp; Double-Entry SME Bookkeeping
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Corban Technologies unites FedhaHub&apos;s complex dividend and PAYE modeling engines with MannaBooks&apos; modern double-entry SME accounting system. Designed to eliminate spreadsheets, automate tax calculations, and maintain balanced general ledgers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact?product=finance"
                className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Request Financial Suite Demo <ArrowRight className="w-3.5 h-3.5" />
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
              Powerful Financial Algorithms Paired with Simple Business Accounting
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
              Architecture Breakdown
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              FedhaHub &amp; MannaBooks Core Features
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
                Streamline Your Financial Modeling &amp; General Ledger
              </h3>
              <p className="text-xs text-slate-300">
                Deploy FedhaHub and MannaBooks for your enterprise or accounting practice with dedicated cloud hosting.
              </p>
            </div>
            <Link
              href="/contact?product=finance"
              className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5 shrink-0"
            >
              Request Finance Consultation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
