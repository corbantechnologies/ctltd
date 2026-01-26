"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when resizing to desktop or clicking a link
  useEffect(() => {
    const closeMenu = () => setMobileMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Offers", href: "/offers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-black/5 py-3 shadow-md"
            : "bg-transparent border-transparent py-5",
        )}
      >
        <div className="mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src="/logo.png"
              alt="Corban Technologies Logo"
              width={180}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm transition-colors duration-200 font-extrabold tracking-widest uppercase",
                  scrolled
                    ? "text-black hover:text-corporate-primary"
                    : "text-black hover:text-corporate-primary",
                )}
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-corporate-primary hover:bg-orange-600 text-white font-bold rounded-none px-4 py-4 h-auto transition-all active:scale-95 shadow shadow-orange-500/30 uppercase tracking-tighter flex items-center gap-2">
              Get in Touch <ChevronRight className="w-5 h-5 stroke-[3px]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-none hover:bg-orange-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-7 w-7 text-black" />
          </button>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-[300px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-8 border-b border-black/5">
          <Image
            src="/logo.png"
            alt="Corban Technologies Logo"
            width={150}
            height={40}
            className="h-8 w-auto object-contain"
          />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-none hover:bg-orange-50 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-black" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col p-8 gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center justify-between text-xl font-bold text-black hover:text-corporate-primary transition-colors"
            >
              {item.name}
              <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-corporate-primary" />
            </Link>
          ))}

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="bg-corporate-primary hover:bg-orange-600 text-white w-full mt-6 font-bold py-4 rounded-none shadow-lg transition-all active:scale-95 uppercase tracking-tighter"
          >
            <Link
              href="/contact"
              className="block w-full h-full flex items-center justify-center gap-2"
            >
              Get in Touch <ChevronRight className="w-5 h-5 stroke-[3px]" />
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
