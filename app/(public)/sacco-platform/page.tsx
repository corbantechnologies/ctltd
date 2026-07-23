import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
    Users, PiggyBank, CreditCard, Smartphone, BarChart3,
    BookOpen, ShieldCheck, Settings, GitBranch, Receipt,
    CheckCircle, ArrowRight, Upload, Download, CalendarDays,
    Banknote, Scale, Building2, TrendingUp, Wallet,
    AlertCircle, FileDown, Activity, Globe, ExternalLink,
    FileSpreadsheet, Mail, UserCheck
} from "lucide-react"

export const metadata: Metadata = {
    title: "SACCO Platform | Corban Technologies LTD",
    description: "The CTLTD SACCO Platform — a complete digital cooperative management system powering SACCOs, Chamas, and Microfinances across Kenya. Built by Corban Technologies.",
    keywords: ["SACCO System", "Cooperative Management", "Fintech Kenya", "CTLTD SACCO", "Wananchi Mali", "Corban Technologies"],
}

const highlights = [
    { icon: Users, label: "Member Management", desc: "Full CRM with bulk onboarding, NOK tracking, and role-based access" },
    { icon: PiggyBank, label: "Multi-Pot Savings", desc: "Deposits, Share Capital, Holiday, Emergency — all tracked in real-time" },
    { icon: CreditCard, label: "Dual Loan Engine", desc: "Diminishing Balance and Flat Rate interest logic for any cooperative type" },
    { icon: Smartphone, label: "M-Pesa Integration", desc: "Live Daraja API — STK Push deposits and B2C loan disbursements" },
    { icon: BookOpen, label: "Full GL Accounting", desc: "Automatic double-entry posting on every transaction" },
    { icon: BarChart3, label: "Executive Reporting", desc: "Balance Sheet, P&L, Trial Balance, and Debtors list — live" },
]

const onboardingSteps = [
    { step: "01", title: "SACCO Configuration", desc: "Name, logo, fee types, savings products, and loan products are set up by the Wananchi Mali team." },
    { step: "02", title: "Payment Accounts", desc: "M-Pesa paybills, bank accounts, and Daraja API credentials are linked to GL control accounts." },
    { step: "03", title: "Chart of Accounts", desc: "GL accounts are built or imported. Opening balances are posted via journal batches." },
    { step: "04", title: "Member Onboarding", desc: "Members are loaded via bulk CSV. Each receives a unique member number and an email activation link." },
    { step: "05", title: "Go Live", desc: "Admins process bulk payments via CSV, receive M-Pesa deposits in real-time, and approve loans from the admin portal." },
]

const modules = [
    {
        icon: Users,
        title: "Member CRM",
        color: "text-blue-600",
        bg: "bg-blue-50",
        items: ["Unique member numbers", "Bulk CSV creation", "NOK management", "Role-based access (Member / Admin / Superuser)", "Active members CSV export for audits"],
    },
    {
        icon: PiggyBank,
        title: "Savings & Deposits",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        items: ["Multiple savings pots per member", "Real-time balance tracking", "M-Pesa STK Push deposits", "Bulk CSV deposit upload with pre-filled templates", "Transaction Date auto-fill (end of month)"],
    },
    {
        icon: Receipt,
        title: "Fee Payments",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        items: ["Multiple fee types per SACCO", "Outstanding balance shown in CSV template", "Bulk CSV upload with GL auto-posting", "Per-row payment method support", "Cleared account detection (no double-paying)"],
    },
    {
        icon: CreditCard,
        title: "Loan Management",
        color: "text-purple-600",
        bg: "bg-purple-50",
        items: ["Member loan application portal", "Auto eligibility from savings multiples", "Guarantor workflow", "Admin appraisal & approval", "Repayment schedule & penalty tracking"],
    },
    {
        icon: Smartphone,
        title: "M-Pesa / Fintech",
        color: "text-green-600",
        bg: "bg-green-50",
        items: ["Full Daraja API (Safaricom)", "STK Push for savings", "B2C disbursement for loans", "Real-time callback processing", "Automatic GL entry on confirmation"],
    },
    {
        icon: BookOpen,
        title: "GL Accounting",
        color: "text-red-600",
        bg: "bg-red-50",
        items: ["Double-entry General Ledger", "Trial Balance, Balance Sheet, P&L", "Cash Book & Debtors list", "Manual journal batches", "Year-based financial filtering"],
    },
]

export default function SaccoPlatformPage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* ── HERO ──────────────────────────────────────────────────── */}
            <section className="relative bg-slate-900 text-white pt-24 pb-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/3 w-[700px] h-[700px] bg-corporate-primary/10 rounded-full blur-3xl opacity-30" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-3xl opacity-20" />
                </div>
                <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-semibold text-corporate-primary mb-8">
                        <Activity className="h-3.5 w-3.5" />
                        Wananchi Mali Division · SACCO Platform
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5 max-w-3xl leading-tight">
                        The Complete Digital SACCO Management System
                    </h1>
                    <p className="text-slate-300 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
                        Built by Corban Technologies and delivered through our Wananchi Mali division. A fully integrated platform covering members, loans, savings, fees, M-Pesa, and accounting — deployed as a white-label solution for cooperatives across Kenya.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="https://www.wananchimali.com/platform"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-7 py-3 bg-corporate-primary hover:bg-orange-600 text-white text-sm font-semibold rounded transition-colors shadow-lg shadow-orange-900/20"
                        >
                            Full Platform Details <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded ring-1 ring-slate-700 transition-colors"
                        >
                            Request a Demo <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── HIGHLIGHTS ──────────────────────────────────────────────── */}
            <section className="py-16 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {highlights.map((h) => (
                            <div key={h.label} className="bg-white border border-slate-200 rounded p-5 flex flex-col gap-3">
                                <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded flex items-center justify-center">
                                    <h.icon className="h-4 w-4 text-corporate-primary" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900">{h.label}</div>
                                    <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{h.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ONBOARDING ──────────────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="mb-12">
                        <div className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-3">Getting Started</div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">From Setup to Go-Live in 5 Steps</h2>
                        <p className="text-slate-500 text-sm max-w-xl">Our team handles the full configuration. Your staff are trained and ready before the first member is onboarded.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {onboardingSteps.map((s, i) => (
                            <div key={s.step} className={`border rounded p-5 flex flex-col gap-3 ${i === 4 ? "lg:col-span-1 sm:col-span-2" : ""}`}>
                                <div className="text-3xl font-bold text-slate-100">{s.step}</div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900 mb-1">{s.title}</div>
                                    <div className="text-xs text-slate-500 leading-relaxed">{s.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MODULES ─────────────────────────────────────────────────── */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="mb-12">
                        <div className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-3">Core Modules</div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Everything a SACCO Needs in One System</h2>
                        <p className="text-slate-500 text-sm max-w-xl">Every module shares the same data. A loan disbursement posts to the GL. An M-Pesa payment updates balances and triggers an email. Nothing is manual.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {modules.map((m) => (
                            <div key={m.title} className="bg-white border border-slate-200 rounded overflow-hidden">
                                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
                                    <div className={`w-7 h-7 rounded flex items-center justify-center ${m.bg}`}>
                                        <m.icon className={`h-3.5 w-3.5 ${m.color}`} />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-900">{m.title}</span>
                                </div>
                                <ul className="px-4 py-3 space-y-1.5">
                                    {m.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TWO PORTALS ─────────────────────────────────────────────── */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="mb-12 text-center">
                        <div className="text-xs font-semibold text-corporate-primary uppercase tracking-wider mb-3">Two Portals</div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Built for Both Admins and Members</h2>
                        <p className="text-slate-500 text-sm max-w-xl mx-auto">Separate, secure portals ensure members only access what they own, while admins have full operational control.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Member Portal */}
                        <div className="border border-slate-200 rounded p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-emerald-50 rounded flex items-center justify-center">
                                    <Globe className="h-4.5 w-4.5 text-emerald-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900">Member Portal</div>
                                    <div className="text-xs text-slate-400">Self-service for SACCO members</div>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                {[
                                    "Savings deposit via M-Pesa STK Push",
                                    "Loan application and eligibility check",
                                    "Guarantor request accept / decline",
                                    "Account statements per module",
                                    "Next of Kin management",
                                    "Notification emails on key events",
                                ].map(item => (
                                    <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Admin Portal */}
                        <div className="border border-slate-200 rounded p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-slate-100 rounded flex items-center justify-center">
                                    <Settings className="h-4.5 w-4.5 text-slate-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900">Admin Portal</div>
                                    <div className="text-xs text-slate-400">Full operational control</div>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                {[
                                    "Bulk CSV upload for savings, fees, and loans",
                                    "Loan appraisal, approval, and disbursement",
                                    "Member directory with financial summaries",
                                    "GL reports: Balance Sheet, P&L, Trial Balance",
                                    "Year-filtered SACCO summary dashboard",
                                    "Active member list export for audit",
                                ].map(item => (
                                    <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                                        <CheckCircle className="h-3.5 w-3.5 text-corporate-primary flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────────────── */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-5xl mx-auto bg-slate-900 rounded p-10 md:p-14 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-corporate-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Ready to Digitise Your SACCO?
                        </h2>
                        <p className="text-slate-300 text-sm mb-8 max-w-lg mx-auto">
                            Corban Technologies delivers end-to-end implementation, configuration, and training. Get in touch with us or visit the Wananchi Mali platform page for full feature documentation.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-7 py-3 bg-corporate-primary hover:bg-orange-600 text-white text-sm font-semibold rounded transition-colors shadow-lg shadow-orange-900/20"
                            >
                                Contact Us <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="https://www.wananchimali.com"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-7 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded ring-1 ring-slate-700 transition-colors"
                            >
                                Visit Wananchi Mali <ExternalLink className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
