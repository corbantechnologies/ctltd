"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronRight, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMobileMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  const navItems = [
    { name: "Products & Platforms", href: "/products" },
    { name: "SACCO Platform", href: "/products/sacco" },
    { name: "About Us", href: "/about" },
    { name: "Contact & Onboarding", href: "/contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 w-full z-50 transition-all duration-300 border-b bg-white border-slate-200 py-3.5 shadow-sm">
        <div className="w-full px-6 sm:px-10 lg:px-16 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.png"
              alt="Corban Technologies LTD"
              width={160}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs font-semibold text-slate-700 hover:text-corporate-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-corporate-primary hover:bg-orange-600 text-white px-4 py-2 rounded text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              Start Onboarding <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded border border-slate-200 hover:bg-slate-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-slate-900" />
          </button>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 md:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-[280px] bg-white shadow-xl z-50 transform transition-transform duration-200 ease-in-out md:hidden flex flex-col justify-between",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <Image
              src="/logo.png"
              alt="Corban Technologies LTD"
              width={130}
              height={32}
              className="h-7 w-auto object-contain"
            />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-4 w-4 text-slate-900" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col p-5 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-xs font-semibold text-slate-800 hover:text-corporate-primary transition-colors py-2 border-b border-slate-100"
              >
                {item.name}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-5 border-t border-slate-200 space-y-2">
          <Link
            onClick={() => setMobileMenuOpen(false)}
            href="/contact"
            className="bg-corporate-primary hover:bg-orange-600 text-white w-full text-xs font-semibold py-2.5 rounded text-center transition-colors shadow-sm block"
          >
            Start Client Onboarding
          </Link>
        </div>
      </div>
    </>
  );
}
