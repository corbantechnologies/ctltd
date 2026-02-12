"use client";

import { useFetchAccount } from "@/hooks/accounts/actions";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import DivisionsList from "@/components/divisions/DivisionsList";
import CreateDivisionModal from "@/forms/divisions/CreateDivisionModal";
import {
  Building2,
  Layers,
  Book,
  ScrollText,
  CalendarRange,
} from "lucide-react";
import { useFetchCOAs } from "@/hooks/coa/actions";
import { useFetchBooks } from "@/hooks/books/actions";
import { useFetchFinancialYears } from "@/hooks/financialyears/actions";
import { useFetchJournalEntries } from "@/hooks/journalentries/actions";
import { useFetchDivisions } from "@/hooks/divisions/actions";
import { Card, CardContent } from "@/components/ui/card";
import { GlobalSearch } from "@/components/navigation/GlobalSearch";
import AccountDistributionChart from "@/components/analytics/AccountDistributionChart";
import RecentActivityFeed from "@/components/analytics/RecentActivityFeed";
import ReportsDashboard from "@/components/reports/ReportsDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="space-y-6 pb-6">
      {/* Ctrl + K */}
      <GlobalSearch role="director" />
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-[#D0402B] flex items-center justify-center text-white shadow-md shadow-[#D0402B]/20">
              <Building2 className="w-3 h-3" />
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D0402B]">
              Administrative Portal
            </p>
          </div>
          <h1 className="text-xl font-bold text-black tracking-tighter italic">
            Director <span className="text-[#D0402B]">Dashboard</span>
          </h1>
          <p className="text-black/40 font-bold mt-0.5 text-xs max-w-md">
            Welcome, {account?.first_name} {account?.last_name}. Oversee
            corporate infrastructure and division management.
          </p>
        </div>
        <CreateDivisionModal />
      </div>

      {/* Stats Grid */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/50 border border-black/5 p-1 h-auto rounded-xl">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-[#D0402B] data-[state=active]:shadow-md rounded-lg px-4 py-2 text-sm font-bold text-black/60 data-[state=active]:text-white transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="financials"
            className="data-[state=active]:bg-[#D0402B] data-[state=active]:shadow-md rounded-lg px-4 py-2 text-sm font-bold text-black/60 data-[state=active]:text-white transition-all"
          >
            Financial Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 focus-visible:outline-none">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden"
              >
                <CardContent className="p-5 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#D0402B]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D0402B]/10 flex items-center justify-center text-[#D0402B]">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-black/40 font-bold uppercase tracking-widest text-[9px] mb-1">
                        {stat.label}
                      </p>
                      <h3 className="text-xl font-bold text-black tracking-tighter">
                        {stat.value}
                      </h3>
                      <p className="text-[10px] font-bold text-black/40 mt-1">
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
          <div className="space-y-6 pt-6 border-t border-black/5">
            <div className="flex items-center justify-between border-b border-black/5 pb-6">
              <h2 className="text-xl font-bold text-black tracking-tight">
                Corporate Divisions
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                Real-time status
              </p>
            </div>
            <DivisionsList rolePrefix="director" />
          </div>
        </TabsContent>

        <TabsContent value="financials" className="focus-visible:outline-none">
          {/* Financial Reports Section */}
          <div className="space-y-6">
            <ReportsDashboard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
