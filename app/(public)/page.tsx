"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Server, Sparkles, Building2, CheckCircle2, ChevronRight } from "lucide-react";
import TrustMetricsBar from "@/components/landing/TrustMetricsBar";
import ClientTrustWall from "@/components/landing/ClientTrustWall";
import MockupStudio from "@/components/landing/MockupStudio";
import IndustryNavigator from "@/components/landing/IndustryNavigator";
import CloudPartnersGrid from "@/components/landing/CloudPartnersGrid";
import HostingArchitecture from "@/components/landing/HostingArchitecture";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── 1. CORPORATE HERO SECTION (FULL WIDTH) ──────────────────────── */}
      <section className="relative w-full bg-white border-b border-slate-200 pt-16 pb-16 overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="max-w-4xl space-y-6">
            {/* Top Micro-Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
                <Building2 className="w-3.5 h-3.5" />
                Corban Technologies LTD · Mombasa, Kenya
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Enterprise Software &amp; Cloud Infrastructure
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
              We Build, Refine &amp; Cloud-Host Mission-Critical Software Platforms Across East Africa
            </h1>

            {/* Value Proposition */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              From digital core banking powering 3 Kenyan SACCOs to high-throughput telecom marketing engines, omnichannel retail POS, and logistics operating systems — Corban Technologies delivers custom architecture, dedicated cloud infrastructure, and 24/7 reliability.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Start Client Onboarding <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="#products"
                className="px-5 py-2.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
              >
                Explore 6 Core Platforms <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>

            {/* Quick Proof Highlights */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-6 text-xs text-slate-600 max-w-2xl">
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-900">3 Live SACCOs</p>
                <p className="text-[11px] text-slate-500">M-Pesa &amp; GL Banking</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-900">99.9% Uptime</p>
                <p className="text-[11px] text-slate-500">Dedicated Cloud Hosting</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-900">100% Kenyan</p>
                <p className="text-[11px] text-slate-500">KRA &amp; M-Pesa Rails</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST METRICS STRIP ───────────────────────────────────── */}
      <TrustMetricsBar />

      {/* ── 3. CLIENT TRUST WALL ─────────────────────────────────────── */}
      <ClientTrustWall />

      {/* ── 4. 6-PILLAR INTERACTIVE MOCKUP STUDIO ────────────────────── */}
      <MockupStudio />

      {/* ── 5. CLIENT JOURNEY & INDUSTRY NAVIGATOR ───────────────────── */}
      <IndustryNavigator />

      {/* ── 6. CLOUD & TECH PARTNERS ─────────────────────────────────── */}
      <CloudPartnersGrid />

      {/* ── 7. HOSTING ARCHITECTURE & 24/7 SLA ───────────────────────── */}
      <HostingArchitecture />

      {/* ── 8. CLOSING ONBOARDING CALL TO ACTION ─────────────────────── */}
      <section className="w-full bg-slate-50 py-16">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="p-8 rounded bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-corporate-primary">
                <Sparkles className="w-3.5 h-3.5" />
                Begin Your Digital Transformation
              </div>
              <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                Ready to Onboard Your Cooperative, Retail Business, or Enterprise?
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our engineering and cloud operations teams are ready to deploy, customize, and manage the right platform for your organization.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm text-center inline-flex items-center justify-center gap-1.5"
              >
                Schedule Technical Scoping <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/products"
                className="w-full sm:w-auto px-5 py-3 rounded bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors text-center inline-flex items-center justify-center"
              >
                View All 6 Platforms
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
