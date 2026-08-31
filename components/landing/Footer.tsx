"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner */}
      <div className="w-full px-6 sm:px-10 lg:px-16 py-10 border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-semibold text-white">
            Ready to deploy or cloud-host your business platform?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Partner with Corban Technologies LTD for custom engineering, dedicated hosting, and 99.9% uptime.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded bg-corporate-primary hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5 shrink-0"
        >
          Book Technical Consultation <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Footer Links */}
      <div className="w-full px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Corban Technologies LTD"
                width={160}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Corban Technologies LTD is an East African software engineering and cloud infrastructure firm based in Mombasa, Kenya. We build and host mission-critical systems for financial institutions, retailers, logistics providers, and growing enterprises.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-corporate-primary shrink-0" />
                <span>Mombasa, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-corporate-primary shrink-0" />
                <span>+254 768 978 865</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-corporate-primary shrink-0" />
                <span>info@corbantechnologies.org</span>
              </div>
            </div>
          </div>

          {/* Product Pillars */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">
              Core Platforms
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/products/sacco" className="hover:text-corporate-primary transition-colors">
                  1. SACCO Platform (Wananchi Mali)
                </Link>
              </li>
              <li>
                <Link href="/products/finance" className="hover:text-corporate-primary transition-colors">
                  2. Finance &amp; GL (MannaBooks)
                </Link>
              </li>
              <li>
                <Link href="/products/gift-shop" className="hover:text-corporate-primary transition-colors">
                  3. Retail &amp; E-Shop (GearHouse &amp; Clate)
                </Link>
              </li>
              <li>
                <Link href="/products/marketing" className="hover:text-corporate-primary transition-colors">
                  4. Marketing CRM (LJK)
                </Link>
              </li>
              <li>
                <Link href="/products/logistics" className="hover:text-corporate-primary transition-colors">
                  5. Logistics OS
                </Link>
              </li>
              <li>
                <Link href="/products/events" className="hover:text-corporate-primary transition-colors">
                  6. Events &amp; QR Passes
                </Link>
              </li>
            </ul>
          </div>

          {/* Cloud & Tech Ecosystem */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">
              Cloud Ecosystem
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Google Cloud Platform (GCP)</li>
              <li>Railway Infrastructure</li>
              <li>Vercel Edge Network</li>
              <li>Safaricom Daraja (M-Pesa)</li>
              <li>PostgreSQL / Supabase</li>
              <li>Resend Enterprise SMTP</li>
            </ul>
          </div>

          {/* Company & Compliance */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">
              Company &amp; Legal
            </p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-corporate-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-corporate-primary transition-colors">
                  Client Onboarding
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Double-Entry Accounting &amp; KRA Ready</span>
              </li>
              <li>
                <span className="text-slate-500">99.9% Uptime Guarantee</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 sm:px-10 lg:px-16 py-5 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>&copy; {currentYear} Corban Technologies LTD. All rights reserved. Registered in Kenya.</p>
        <p className="flex items-center gap-1.5 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Production Systems Operational
        </p>
      </div>
    </footer>
  );
}
