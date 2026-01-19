"use client";

import { useFetchAccount } from "@/hooks/accounts/actions";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import DivisionsList from "@/components/divisions/DivisionsList";
import CreateDivisionModal from "@/forms/divisions/CreateDivisionModal";
import { Building2, Layers, Book, ScrollText, CalendarRange } from "lucide-react";
import { useFetchCOAs } from "@/hooks/coa/actions";
import { useFetchBooks } from "@/hooks/books/actions";
import { useFetchFinancialYears } from "@/hooks/financialyears/actions";
import { useFetchJournalEntries } from "@/hooks/journalentries/actions";
import { useFetchDivisions } from "@/hooks/divisions/actions";
import { Card, CardContent } from "@/components/ui/card";
import { GlobalSearch } from "@/components/navigation/GlobalSearch";
import AccountDistributionChart from "@/components/analytics/AccountDistributionChart";
import RecentActivityFeed from "@/components/analytics/RecentActivityFeed";

export default function DirectorDashboard() {
  const { isLoading, data: account } = useFetchAccount();
  const { data: coas } = useFetchCOAs();
  const { data: books } = useFetchBooks();
  const { data: years } = useFetchFinancialYears();
  const { data: entries } = useFetchJournalEntries();
  const { data: divisions } = useFetchDivisions();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const stats = [
    {
      label: "Total Divisions",
      value: divisions?.length || 0,
      icon: Building2,
      description: "Operational Units",
    },
    {
      label: "Active Fiscal Year",
      value: years?.find((y: any) => y.is_active)?.code || "N/A",
      icon: CalendarRange,
      description: `${years?.length || 0} Years Configured`,
    },
    {
      label: "Chart of Accounts",
      value: coas?.length || 0,
      icon: Layers,
      description: "Active Ledgers",
    },
    {
      label: "Ledger Books",
      value: books?.length || 0,
      icon: Book,
      description: "Sub-accounts",
    },
    {
      label: "Journal Entries",
      value: entries?.length || 0,
      icon: ScrollText,
      description: "Total Transactions",
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Ctrl + K */}
      <GlobalSearch role="director" />
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#D0402B] flex items-center justify-center text-white shadow-lg shadow-[#D0402B]/20">
              <Building2 className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D0402B]">
              Administrative Portal
            </p>
          </div>
          <h1 className="text-3xl font-black text-black tracking-tighter italic">
            Director <span className="text-[#D0402B]">Dashboard</span>
          </h1>
          <p className="text-black/40 font-bold mt-1 text-sm max-w-md">
            Welcome, {account?.first_name} {account?.last_name}. Oversee
            corporate infrastructure and division management.
          </p>
        </div>
        <CreateDivisionModal />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-[32px] overflow-hidden"
          >
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D0402B]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D0402B]/10 flex items-center justify-center text-[#D0402B]">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-black/40 font-black uppercase tracking-widest text-[10px] mb-1">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-black text-black tracking-tighter">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-bold text-black/40 mt-1">
                    {stat.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AccountDistributionChart data={coas || []} />
        <RecentActivityFeed entries={entries || []} />
      </div>

      {/* Divisions Section */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between border-b border-black/5 pb-6">
          <h2 className="text-2xl font-black text-black tracking-tight">
            Corporate Divisions
          </h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-black/40">
            Real-time status
          </p>
        </div>
        <DivisionsList rolePrefix="director" />
      </div>
    </div>
  );
}
