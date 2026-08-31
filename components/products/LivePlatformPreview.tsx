"use client";

import React, { useState } from "react";
import {
  Building2,
  BookOpen,
  ShoppingBag,
  Send,
  Truck,
  Ticket,
  Store,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  Lock,
  Search,
  Plus,
  RefreshCw,
  QrCode,
  Smartphone,
  ScanBarcode,
  ArrowUpRight,
  ShieldCheck,
  Calculator,
  UserCheck,
  Coins,
  Receipt,
  Clock,
  Printer,
  ChevronDown,
  Star,
  Layers,
  Banknote,
  CreditCard,
  Trash2,
  Minus,
  Check,
  AlertCircle,
  FileText,
  PieChart,
  Landmark,
  User,
  LogOut,
  Sparkles,
} from "lucide-react";

interface LivePlatformPreviewProps {
  slug: string;
  liveUrl: string;
  liveDomain: string;
}

export default function LivePlatformPreview({
  slug,
  liveUrl,
  liveDomain,
}: LivePlatformPreviewProps) {
  const normSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. WANANCHI MALI SACCO (Replicated directly from Sacco/ctltdsacco/app/(private)/member)
  // ─────────────────────────────────────────────────────────────────────────────
  if (normSlug.includes("wananchi") || normSlug === "sacco") {
    return (
      <div className="w-full rounded border border-slate-200 bg-white overflow-hidden shadow-xs text-xs font-sans">
        {/* Browser Top Chrome */}
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[11px] font-mono text-slate-700 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>https://app.wananchimali.com/member/dashboard</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            MEMBER NO: WM-4091
          </span>
        </div>

        {/* Member Dashboard Content */}
        <div className="p-4 sm:p-5 space-y-4 bg-slate-50/60">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div>
              <h4 className="text-base font-semibold text-slate-900">Member Portal Dashboard</h4>
              <p className="text-xs text-slate-500">
                Welcome back, <span className="font-semibold text-corporate-primary">John Mwangi</span> &bull; Wananchi Mali Cooperative
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-700">
                FY 2025/2026
              </span>
              <button className="px-3 py-1 rounded bg-corporate-primary text-white font-semibold text-[11px] shadow-xs">
                + Deposit Funds
              </button>
            </div>
          </div>

          {/* 3 Core Member Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[11px] font-medium">Total Member Savings</span>
                <Coins className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-lg font-semibold text-slate-900 font-mono">KES 405,000</p>
              <span className="text-[10px] text-emerald-600 font-medium font-mono">4 Pots Active</span>
            </div>

            <div className="p-3.5 rounded bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[11px] font-medium">Active Loan Book</span>
                <CreditCard className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-lg font-semibold text-slate-900 font-mono">KES 150,000</p>
              <span className="text-[10px] text-slate-500 font-medium font-mono">Diminishing Balance</span>
            </div>

            <div className="p-3.5 rounded bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-[11px] font-medium">Guarantor Available</span>
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-lg font-semibold text-slate-900 font-mono">KES 120,000</p>
              <span className="text-[10px] text-purple-600 font-medium font-mono">2 Active Guarantees</span>
            </div>
          </div>

          {/* Member Savings Pots Breakdown */}
          <div className="rounded border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Savings Pots (Running Ledger Balances)</span>
              <span className="text-[10px] text-slate-500 font-mono">Real-Time Reconciliation</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="p-2.5 flex items-center justify-between hover:bg-slate-50/80">
                <div>
                  <span className="font-semibold text-slate-900">Share Capital Pot</span>
                  <span className="text-[10px] text-slate-500 block">Non-withdrawable &bull; AGM Dividend Qualifying</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-semibold text-slate-900">KES 50,000.00</span>
                  <span className="text-[10px] text-emerald-600 block">14.2% Est. Dividend</span>
                </div>
              </div>

              <div className="p-2.5 flex items-center justify-between hover:bg-slate-50/80">
                <div>
                  <span className="font-semibold text-slate-900">Monthly Member Deposits</span>
                  <span className="text-[10px] text-slate-500 block">Loan multiplier collateral &bull; M-Pesa STK linked</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-semibold text-slate-900">KES 280,000.00</span>
                  <span className="text-[10px] text-slate-500 block">3x Loan Eligibility</span>
                </div>
              </div>

              <div className="p-2.5 flex items-center justify-between hover:bg-slate-50/80">
                <div>
                  <span className="font-semibold text-slate-900">Holiday &amp; Emergency Pots</span>
                  <span className="text-[10px] text-slate-500 block">Instant withdrawal to M-Pesa via Daraja B2C</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-semibold text-slate-900">KES 75,000.00</span>
                  <span className="text-[10px] text-blue-600 block">Liquid Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-mono">Direct URL: {liveDomain}</span>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-corporate-primary hover:underline"
          >
            Open Wananchi Mali Portal <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. MANNA BOOKS (Replicated directly from Finance/mannabooks/src/app/workspaces/[slug])
  // ─────────────────────────────────────────────────────────────────────────────
  if (normSlug.includes("manna") || (normSlug === "finance" && !normSlug.includes("fedha"))) {
    return (
      <div className="w-full rounded border border-slate-200 bg-white overflow-hidden shadow-xs text-xs font-sans">
        {/* Browser Top Chrome */}
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[11px] font-mono text-slate-700 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>https://app.mannabooks.co.ke/workspaces/corban-technologies/dashboard</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            5-CLASS GL &bull; eTIMS
          </span>
        </div>

        {/* MannaBooks Workspace UI */}
        <div className="p-4 sm:p-5 space-y-4 bg-slate-50/60">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                M
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Manna Books Workspace</h4>
                <p className="text-[11px] text-slate-500">Corban Technologies Ltd &bull; Base Currency: KES</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-mono text-emerald-700 font-semibold">
                KRA 20th VAT: Cleared
              </span>
              <button className="px-3 py-1 rounded bg-slate-900 text-white font-semibold text-[11px] shadow-xs">
                + New Invoice
              </button>
            </div>
          </div>

          {/* 4 Dashboard Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded bg-white border border-slate-200 shadow-xs space-y-0.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Revenue MTD</span>
              <p className="text-base font-semibold text-slate-900 font-mono">KES 4,218,500</p>
              <span className="text-[10px] text-emerald-600 font-medium">+18.4% vs last mo</span>
            </div>
            <div className="p-3 rounded bg-white border border-slate-200 shadow-xs space-y-0.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Pending Invoices</span>
              <p className="text-base font-semibold text-slate-900 font-mono">KES 285,000</p>
              <span className="text-[10px] text-amber-600 font-medium">3 Clients Due</span>
            </div>
            <div className="p-3 rounded bg-white border border-slate-200 shadow-xs space-y-0.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Statutory Payroll</span>
              <p className="text-base font-semibold text-slate-900 font-mono">KES 480,000</p>
              <span className="text-[10px] text-slate-500 font-medium">PAYE/SHIF/NSSF</span>
            </div>
            <div className="p-3 rounded bg-white border border-slate-200 shadow-xs space-y-0.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">GL Balance Check</span>
              <p className="text-base font-semibold text-emerald-600 font-mono">0.00 Diff</p>
              <span className="text-[10px] text-emerald-600 font-medium">100% Balanced</span>
            </div>
          </div>

          {/* Double-Entry Document Ledger Table */}
          <div className="rounded border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Recent Fiscal Documents (eTIMS QR Synced)</span>
              <span className="text-[10px] text-corporate-primary font-mono font-semibold">View All 42 Docs &rarr;</span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="p-2.5 flex items-center justify-between hover:bg-slate-50/80">
                <div>
                  <span className="font-semibold text-slate-900">#INV-2026-1092 &bull; Tax Invoice (16% VAT)</span>
                  <span className="text-[10px] text-slate-500 block">Client: Safaricom Dealer Network &bull; Paid via M-Pesa</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-semibold text-emerald-600">+KES 285,000.00</span>
                  <span className="text-[9px] text-slate-400 block">PAID &bull; eTIMS Synced</span>
                </div>
              </div>

              <div className="p-2.5 flex items-center justify-between hover:bg-slate-50/80">
                <div>
                  <span className="font-semibold text-slate-900">#PAY-AUG-2026 &bull; Statutory Payroll Run</span>
                  <span className="text-[10px] text-slate-500 block">11-Col A4 PDF Vouchers &bull; SHIF 2.75%, AHL 1.5%</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-semibold text-slate-900">-KES 480,000.00</span>
                  <span className="text-[9px] text-emerald-600 block">KRA Reconciled</span>
                </div>
              </div>

              <div className="p-2.5 flex items-center justify-between hover:bg-slate-50/80">
                <div>
                  <span className="font-semibold text-slate-900">#POS-58MM &bull; Walk-in Retail Ticket</span>
                  <span className="text-[10px] text-slate-500 block">Silent Kiosk Thermal Mode &bull; Change Calculator Checked</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-semibold text-emerald-600">+KES 8,500.00</span>
                  <span className="text-[9px] text-slate-400 block">Inventory Reduced</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-mono">Production SaaS: {liveDomain}</span>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-corporate-primary hover:underline"
          >
            Launch Manna Books <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. GEARHOUSE AFRICA (Replicated directly from Gift Shop/gearhouse/app/(private)/pos/register)
  // ─────────────────────────────────────────────────────────────────────────────
  if (normSlug.includes("gearhouse") || normSlug === "gift-shop" || normSlug === "retail") {
    return (
      <div className="w-full rounded border border-slate-200 bg-white overflow-hidden shadow-xs text-xs font-sans">
        {/* Browser Top Chrome */}
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[11px] font-mono text-slate-700 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>https://app.gearhouse.co.ke/pos/register</span>
          </div>
          <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            TILL 01 &bull; SHIFT #14
          </span>
        </div>

        {/* GearHouse POS Register Interface */}
        <div className="p-4 sm:p-5 space-y-3 bg-slate-50/60">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">GearHouse Africa &bull; Cashier Register</h4>
              <p className="text-[11px] text-slate-500">Cashier: Esther K. &bull; Opening Float: KES 5,000.00 (Verified)</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded text-[10px] font-mono text-emerald-700">
              <Check className="w-3 h-3" /> Drawer Balanced
            </div>
          </div>

          {/* Barcode Search & Cart Columns */}
          <div className="grid grid-cols-12 gap-3">
            {/* Products / SKU Scanner Column (7 cols) */}
            <div className="col-span-7 space-y-2">
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-400 shadow-2xs">
                <ScanBarcode className="w-3.5 h-3.5 text-corporate-primary" />
                <span className="font-mono text-slate-500 text-[11px]">Scan Barcode / Search SKU...</span>
              </div>
              <div className="space-y-1.5">
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between text-xs hover:border-blue-400 transition-colors cursor-pointer">
                  <div>
                    <span className="font-semibold text-slate-900 block">Heavy Duty Impact Drill 850W</span>
                    <span className="text-[10px] text-slate-500 font-mono">SKU: HD-DRL-850 &bull; Stock: 14 pcs</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-900">KES 8,500</span>
                </div>

                <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between text-xs hover:border-blue-400 transition-colors cursor-pointer">
                  <div>
                    <span className="font-semibold text-slate-900 block">Precision Screwdriver Set (24-pc)</span>
                    <span className="text-[10px] text-slate-500 font-mono">SKU: SCR-SET-24 &bull; Stock: 28 pcs</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-900">KES 4,300</span>
                </div>
              </div>
            </div>

            {/* Cart & Payment Split Column (5 cols) */}
            <div className="col-span-5 p-3 rounded bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-2.5">
              <div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 text-[11px]">
                  <span className="font-semibold text-slate-700">Active Cart (2 Items)</span>
                  <span className="text-corporate-primary font-mono text-[10px]">+128 Pts</span>
                </div>
                <div className="pt-2 text-right space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Payable</span>
                  <p className="text-base font-semibold text-slate-900 font-mono">KES 12,800.00</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <button className="w-full py-1.5 px-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] shadow-xs flex items-center justify-center gap-1.5">
                  <Smartphone className="w-3 h-3" /> Daraja STK Push
                </button>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <button className="py-1 px-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium">
                    Cash Tender
                  </button>
                  <button className="py-1 px-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium">
                    Card Terminal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-mono">Live Retail Platform: {liveDomain}</span>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-corporate-primary hover:underline"
          >
            Visit GearHouse Africa <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. CLATE COSMETICS (Replicated directly from Gift Shop/cosmetics-shop)
  // ─────────────────────────────────────────────────────────────────────────────
  if (normSlug.includes("clate") || normSlug.includes("cosmetics")) {
    return (
      <div className="w-full rounded border border-slate-200 bg-white overflow-hidden shadow-xs text-xs font-sans">
        {/* Browser Top Chrome */}
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[11px] font-mono text-slate-700 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>https://www.clatecosmetics.com/shop</span>
          </div>
          <span className="text-[10px] font-semibold text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded">
            BAG: 2 ITEMS
          </span>
        </div>

        {/* Clate Cosmetics Luxury Storefront UI */}
        <div className="p-4 sm:p-5 space-y-3 bg-slate-50/60">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
            <div>
              <h4 className="text-sm font-semibold font-serif text-slate-900">Clate Cosmetics &bull; Curated Excellence</h4>
              <p className="text-[11px] text-slate-500">Luxury Skincare &bull; Instant Daraja M-Pesa Checkout</p>
            </div>
            <span className="text-[10px] font-mono text-pink-700 font-semibold bg-pink-50 border border-pink-200 px-2 py-0.5 rounded">
              Free Shipping over KES 3,000
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Product Card 1 */}
            <div className="p-3 rounded bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="h-16 rounded bg-pink-50/60 border border-pink-100 flex items-center justify-center text-pink-800 font-serif text-xs font-semibold">
                Vitamin C Glow Serum
              </div>
              <div>
                <div className="flex items-center gap-1 text-[10px] text-amber-500 mb-0.5">
                  <span>★ 5.0</span>
                  <span className="text-slate-400">(124 reviews)</span>
                </div>
                <p className="font-semibold text-slate-900 text-xs">Radiance Boost Formula (30ml)</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-300 border border-slate-300" />
                  <span className="text-[10px] text-slate-500 ml-1">2 Shade Options</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="font-mono font-semibold text-slate-900">KES 2,800</span>
                <span className="text-[10px] text-emerald-600 font-semibold">In Stock</span>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="p-3 rounded bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="h-16 rounded bg-pink-50/60 border border-pink-100 flex items-center justify-center text-pink-800 font-serif text-xs font-semibold">
                Gentle Foaming Cleanser
              </div>
              <div>
                <div className="flex items-center gap-1 text-[10px] text-amber-500 mb-0.5">
                  <span>★ 4.9</span>
                  <span className="text-slate-400">(89 reviews)</span>
                </div>
                <p className="font-semibold text-slate-900 text-xs">Hydrating Botanical Extract (150ml)</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-200 border border-slate-300" />
                  <span className="text-[10px] text-slate-500 ml-1">Pump Dispenser</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="font-mono font-semibold text-slate-900">KES 1,700</span>
                <span className="text-[10px] text-emerald-600 font-semibold">In Stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-mono">Live Cosmetics Platform: {liveDomain}</span>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-pink-700 hover:underline"
          >
            Visit Clate Cosmetics <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. LJK MARKETING AGENCY (Replicated directly from Marketing/marketingagency)
  // ─────────────────────────────────────────────────────────────────────────────
  if (normSlug.includes("ljk") || normSlug.includes("marketing")) {
    return (
      <div className="w-full rounded border border-slate-200 bg-white overflow-hidden shadow-xs text-xs font-sans">
        {/* Browser Top Chrome */}
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[11px] font-mono text-slate-700 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>https://app.ljkmarketingagency.co.ke/business/dashboard</span>
          </div>
          <span className="text-[10px] font-semibold text-[#581c87] bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
            SENDER: LJKAGENCY
          </span>
        </div>

        {/* LJK Marketing Dashboard UI */}
        <div className="p-4 sm:p-5 space-y-3 bg-slate-50/60">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-50 border border-purple-200 text-[10px] font-semibold text-[#581c87] mb-1">
                Workspace: Corban Enterprise &bull; Code: MA26001
              </div>
              <h4 className="text-sm font-semibold text-slate-900">SMS &amp; Customer Messaging Dashboard</h4>
            </div>
            <button className="py-1 px-3 bg-[#581c87] hover:bg-[#4a1572] text-white text-[11px] font-semibold rounded transition-colors shadow-xs">
              + Launch Bulk SMS
            </button>
          </div>

          {/* 4 Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded bg-white border border-slate-200 shadow-xs space-y-0.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Available SMS Balance</span>
              <p className="text-base font-semibold text-[#581c87] font-mono">48,500 <span className="text-[10px] font-normal text-slate-500">Units</span></p>
              <span className="text-[9px] text-emerald-600 font-medium font-mono">M-Pesa Prepaid</span>
            </div>
            <div className="p-2.5 rounded bg-white border border-slate-200 shadow-xs space-y-0.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Total Messages Sent</span>
              <p className="text-base font-semibold text-slate-900 font-mono">128,400</p>
              <span className="text-[9px] text-purple-600 font-medium">This Billing Cycle</span>
            </div>
            <div className="p-2.5 rounded bg-white border border-slate-200 shadow-xs space-y-0.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Delivery Rate SLA</span>
              <p className="text-base font-semibold text-emerald-600 font-mono">99.4%</p>
              <span className="text-[9px] text-emerald-600 font-medium">Safaricom/Airtel</span>
            </div>
            <div className="p-2.5 rounded bg-white border border-slate-200 shadow-xs space-y-0.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Sending Windows</span>
              <p className="text-base font-semibold text-slate-900 font-mono">7AM – 8PM</p>
              <span className="text-[9px] text-slate-500 font-medium">CA Compliant</span>
            </div>
          </div>

          {/* Dynamic Broadcast Composer Preview */}
          <div className="p-3 rounded bg-white border border-slate-200 space-y-1.5 shadow-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Dynamic Tag Broadcast Template</span>
              <span className="text-[#581c87] font-mono text-[10px] font-semibold">1 SMS Unit / Handset</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed">
              Habari <span className="text-[#581c87] bg-purple-50 px-1 rounded font-semibold">&#123;first_name&#125;</span>, your account balance is KES <span className="text-[#581c87] bg-purple-50 px-1 rounded font-semibold">&#123;balance&#125;</span>. Flash sale this weekend at GearHouse.
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-mono">Direct URL: {liveDomain}</span>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#581c87] hover:underline"
          >
            Open LJK Marketing Portal <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. CT DRIVE LOGISTICS (Replicated directly from Logistics/ctlogistics/app/admin/(dashboard)/dispatch)
  // ─────────────────────────────────────────────────────────────────────────────
  if (normSlug.includes("drive") || normSlug.includes("logistics")) {
    return (
      <div className="w-full rounded border border-slate-200 bg-white overflow-hidden shadow-xs text-xs font-sans">
        {/* Browser Top Chrome */}
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[11px] font-mono text-slate-700 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>https://app.ctdrive.co.ke/admin/dispatch</span>
          </div>
          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            IN DEVELOPMENT &bull; PRIVATE BETA
          </span>
        </div>

        {/* CT Drive Logistics Dispatch UI */}
        <div className="p-4 sm:p-5 space-y-3 bg-slate-50/60">
          {/* In Development Notice */}
          <div className="flex items-center gap-2 px-3 py-2 rounded bg-amber-50/90 border border-amber-200 text-amber-900 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span><strong>Platform in Development:</strong> Dispatch watchtower, corridor routing, and waybill engine currently in private pilot testing.</span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Dispatch Watchtower</h4>
              <p className="text-[11px] text-slate-500">Mombasa Port &rarr; Voi Depot &rarr; Nairobi Central Hub</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Pilot Build Active</span>
            </div>
          </div>

          {/* Active Waybill Manifest Card */}
          <div className="p-3.5 rounded bg-white border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-semibold text-slate-900">Waybill #CT-MBS-9021</span>
                <span className="text-[10px] text-slate-500 font-mono block">Code-128 Barcode &bull; 420 kg Freight</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 font-mono text-[10px] font-semibold">
                IN TRANSIT (LEG 2/3)
              </span>
            </div>

            {/* Corridor Milestone Tracker */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-600 font-mono">
                <span className="text-emerald-600 font-semibold">✓ Mombasa Intake</span>
                <span className="text-emerald-600 font-semibold">✓ Manifested</span>
                <span className="text-amber-600 font-bold">● En Route (Voi)</span>
                <span className="text-slate-400">○ Nairobi Depot</span>
                <span className="text-slate-400">○ OTP POD</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-3/5 rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 border-t border-slate-100">
              <span>Assigned Asset: Scania R500 (KBZ 412M &bull; 88% Load)</span>
              <span className="text-emerald-600 font-mono font-semibold">Driver: Peter O.</span>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-mono">Direct URL: {liveDomain}</span>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline"
          >
            Open CT Drive Watchtower <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. SHEREHE DIGITAL TICKETING (Replicated directly from Events/shereheticketskenya)
  // ─────────────────────────────────────────────────────────────────────────────
  if (normSlug.includes("sherehe") || normSlug.includes("events")) {
    return (
      <div className="w-full rounded border border-slate-200 bg-white overflow-hidden shadow-xs text-xs font-sans">
        {/* Browser Top Chrome */}
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[11px] font-mono text-slate-700 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>https://app.sherehe.co.ke/organizer/gate-scanner</span>
          </div>
          <span className="text-[10px] font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded">
            GATE 02 &bull; 0.38s SCAN
          </span>
        </div>

        {/* Sherehe Organizer & Gate Scanner UI */}
        <div className="p-4 sm:p-5 space-y-3 bg-slate-50/60">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Sherehe Organizer Portal &bull; Gate Admission</h4>
              <p className="text-[11px] text-slate-500">Nairobi Tech Summit 2026 &bull; Anti-Counterfeit Encrypted QR</p>
            </div>
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-500 block">Admitted Headcount</span>
              <span className="text-sm font-semibold text-emerald-600">3,850 Attendees</span>
            </div>
          </div>

          {/* Pass Verification Card */}
          <div className="p-3.5 rounded bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-900">Pass #SH-VIP-4081 &bull; VIP All-Access</span>
              <p className="text-[11px] text-slate-500">Holder: Dennis Otieno &bull; Safaricom Daraja STK Cleared</p>
              <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-mono pt-1">
                <span>✓ Valid Pass</span>
                <span>✓ Zero Duplicate</span>
                <span>✓ 0.38s Scan Latency</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-mono text-[9px] text-center p-1 font-semibold">
              [ QR PASS ]
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-mono">Direct URL: {liveDomain}</span>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:underline"
          >
            Open Sherehe Portal <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. FEDHAHUB (Replicated directly from Finance/fedhahub)
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full rounded border border-slate-200 bg-white overflow-hidden shadow-xs text-xs font-sans">
      {/* Browser Top Chrome */}
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[11px] font-mono text-slate-700 flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>https://www.fedhahub.co.ke/sacco-dividends</span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
          AGM 2026 CALCULATOR
        </span>
      </div>

      {/* FedhaHub Content UI */}
      <div className="p-4 sm:p-5 space-y-3 bg-slate-50/60">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              <span className="text-emerald-600">FedhaHub</span> Finance &bull; SACCO Dividend Modeling Hub
            </h4>
            <p className="text-[11px] text-slate-500">Expert insights, latest financial news &bull; 2026 PAYE &amp; Dividend Models</p>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
            Open-Access Tools
          </span>
        </div>

        {/* Dividend Model Calculator Card */}
        <div className="p-3.5 rounded bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-900">Weighted Share Capital Model (14.2% Proposed AGM Rate)</span>
            <span className="text-emerald-600 font-mono font-semibold">+KES 42,600 Payout</span>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-mono">
            Formula: (Share Capital &times; 14.2%) + (Monthly Deposits &times; 8.5%) &minus; WHT (5%)
          </div>
          <p className="text-[10px] text-slate-500">
            Empowering cooperative leaders and SME founders across Kenya with verified financial calculators.
          </p>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-500 font-mono">Direct URL: {liveDomain}</span>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
        >
          Explore FedhaHub <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
