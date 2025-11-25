"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const navItems = [
    { name: "SACCO Platform", href: "/sacco-platform" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[#0F172A]/80 backdrop-blur-xl border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold tracking-tighter">
          Corban<span className="text-teal-500">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-slate-300 hover:text-teal-500 transition font-medium"
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-teal-600 hover:bg-teal-700">
            Get in Touch
          </Button>
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#0F172A] border-slate-800">
            <div className="flex flex-col gap-6 mt-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xl text-slate-300 hover:text-teal-500"
                >
                  {item.name}
                </Link>
              ))}
              <Button className="bg-teal-600 hover:bg-teal-700 w-full mt-6">
                Get in Touch
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
