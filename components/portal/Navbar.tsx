/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useFetchAccount } from "@/hooks/accounts/actions";
import { useFetchFinancialYears } from "@/hooks/financialyears/actions";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  LayoutDashboard,
  Database,
  FileText,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: account, isLoading } = useFetchAccount();
  const [menuOpen, setMenuOpen] = useState(false);

  const isDirector = account?.is_director;
  const isFinance = account?.is_finance;
  const isEmployee = account?.is_employee;

  const rolePrefix = isDirector
    ? "director"
    : isFinance
      ? "finance"
      : isEmployee
        ? "employee"
        : "portal";

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Fetch financial years to find active one for direct linking
  const { data: years } = useFetchFinancialYears();
  const activeYear = years?.find(
    (y: { is_active: boolean; reference: string }) => y.is_active,
  );

  const navItems = [
    {
      name: "Dashboard",
      href: `/${rolePrefix}/dashboard`,
      icon: LayoutDashboard,
      show: isDirector || isFinance,
    },
    {
      name: "Reports",
      href: `/${rolePrefix}/reports`,
      icon: FileText,
      show: isDirector || isFinance,
    },
    {
      name: "Divisions",
      href: `/${rolePrefix}/divisions`,
      icon: Database,
      show: isDirector,
    },
    {
      name: "COA",
      href: `/${rolePrefix}/coa`,
      icon: FileText,
      show: isDirector || isFinance,
    },
    {
      name: "Fiscal Year",
      // If there is an active year, link directly to it. Otherwise, link to the list.
      href: activeYear
        ? `/${rolePrefix}/fiscal-years/${activeYear.reference}`
        : `/${rolePrefix}/fiscal-years`,
      icon: FileText,
      show: isDirector || isFinance,
    },
    {
      name: "Partners",
      href: `/${rolePrefix}/partners`,
      icon: FileText,
      show: isDirector || isFinance,
    },
    {
      name: "Financials",
      href: `/${rolePrefix}/financials`,
      icon: FileText,
      show: isDirector,
    },
  ];

  return (
    <>
      <nav className="sticky top-0 w-full z-40 bg-white border-b border-black/5 py-3 pr-2 shadow-sm">
        <div className="mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95"
          >
            <Image
              src="/logo.png"
              alt="Corban Technologies Logo"
              width={140}
              height={38}
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Controls & Nav */}
          <div className="flex items-center gap-2">
            {/* Account Info - Visible on larger screens */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end mr-1">
                <span className="text-sm font-bold text-black leading-none">
                  {isLoading
                    ? "..."
                    : `${account?.first_name} ${account?.last_name}`}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-corporate-primary">
                  {isDirector ? "Director" : isFinance ? "Finance" : "Portal"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Global Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded text-black hover:bg-orange-50"
                  onClick={() => setMenuOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side Menu Drawer */}
      <aside
        className={cn(
          "fixed right-0 top-0 h-full w-[300px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-6 border-b border-black/5 flex items-center justify-between">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={32}
              className="h-6 w-auto object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              className="rounded hover:bg-orange-50"
              onClick={() => setMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* User Info inside Drawer */}
          <div className="p-6 bg-orange-50/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-orange-100 flex items-center justify-center text-corporate-primary font-bold text-lg">
                {account?.first_name?.[0]}
                {account?.last_name?.[0]}
              </div>
              <div>
                <p className="font-bold text-black leading-tight">
                  {account?.first_name} {account?.last_name}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-corporate-primary mt-1">
                  {isDirector ? "Director" : isFinance ? "Finance" : "Portal"}
                </p>
              </div>
            </div>
          </div>

          {/* Drawer Links */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">
              Navigation
            </div>
            {navItems
              .filter((item) => item.show)
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between p-4 rounded font-bold text-sm transition-all group",
                      isActive
                        ? "bg-orange-50 text-corporate-primary"
                        : "text-black/60 hover:bg-orange-50/50 hover:text-black",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded flex items-center justify-center transition-colors",
                          isActive
                            ? "bg-white shadow-sm"
                            : "bg-black/5 shadow-none",
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      {item.name}
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity",
                        isActive && "opacity-100",
                      )}
                    />
                  </Link>
                );
              })}
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-black/5">
            <Button
              variant="outline"
              className="w-full h-14 bg-black hover:bg-red-600 text-white hover:text-white rounded font-bold flex items-center justify-center gap-3 transition-all border-none"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
