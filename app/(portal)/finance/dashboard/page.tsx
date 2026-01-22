/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useFetchDivisions } from "@/hooks/divisions/actions";
import { useFetchJournalTypes } from "@/hooks/journaltypes/actions";
import { useFetchPartnerTypes } from "@/hooks/partnertypes/actions";
import { useFetchCOAs } from "@/hooks/coa/actions";
import { useFetchBooks } from "@/hooks/books/actions";
import { useFetchFinancialYears } from "@/hooks/financialyears/actions";
import { useFetchJournalEntries } from "@/hooks/journalentries/actions";
import CreateJournalType from "@/forms/journaltypes/CreateJournalType";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePartnerType from "@/forms/partnertypes/CreatePartnerType";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlobalSearch } from "@/components/navigation/GlobalSearch";
import ReportsDashboard from "@/components/reports/ReportsDashboard";

import AccountDistributionChart from "@/components/analytics/AccountDistributionChart";
import RecentActivityFeed from "@/components/analytics/RecentActivityFeed";
import {
  Layers,
  Settings2,
  Users,
  Plus,
  BookOpen,
  X,
  Building2,
  Briefcase,
  CalendarRange,
  Book,
  ScrollText,
} from "lucide-react";

export default function FinanceDashboard() {
  const { data: divisions, isLoading: isLoadingDivisions } =
    useFetchDivisions();
  const { data: journalTypes, isLoading: isLoadingJournalTypes } =
    useFetchJournalTypes();
  const { data: partnerTypes, isLoading: isLoadingPartnerTypes } =
    useFetchPartnerTypes();
  const { data: coas } = useFetchCOAs();
  const { data: books } = useFetchBooks();
  const { data: years } = useFetchFinancialYears();
  const { data: entries } = useFetchJournalEntries();

  const [openCreateJournalType, setOpenCreateJournalType] = useState(false);
  const [openCreatePartnerType, setOpenCreatePartnerType] = useState(false);

  if (isLoadingDivisions || isLoadingJournalTypes || isLoadingPartnerTypes)
    return <LoadingSpinner />;

  // Analytics Data
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
    {
      label: "Journal Types",
      value: journalTypes?.length || 0,
      icon: BookOpen,
      description: "Transaction Categories",
    },
    {
      label: "Partner Types",
      value: partnerTypes?.length || 0,
      icon: Users,
      description: "Entity Classifications",
    },
  ];

  return (
    <div className="space-y-6 pb-6">
      <GlobalSearch role="finance" />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-black tracking-tighter">
            Finance Portal
          </h1>
          <p className="text-black/60 font-medium italic text-xs mt-0.5">
            Overview and system configuration
          </p>
        </div>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="bg-white/50 backdrop-blur-md p-1 rounded-xl border border-black/5 h-auto">
          <TabsTrigger
            value="reports"
            className="rounded-lg px-4 py-2 text-xs font-bold data-[state=active]:bg-[#045138] data-[state=active]:text-white transition-all"
          >
            Financial Reports
          </TabsTrigger>
          <TabsTrigger
            value="overview"
            className="rounded-lg px-4 py-2 text-xs font-bold data-[state=active]:bg-[#045138] data-[state=active]:text-white transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="configuration"
            className="rounded-lg px-4 py-2 text-xs font-bold data-[state=active]:bg-[#045138] data-[state=active]:text-white transition-all"
          >
            Configuration
          </TabsTrigger>

        </TabsList>

        {/* Overview Tab (Analytics) */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl rounded overflow-hidden"
              >
                <CardContent className="p-4 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#045138]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#045138]/10 flex items-center justify-center text-[#045138]">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-black font-medium uppercase tracking-widest text-[9px] mb-1">
                        {stat.label}
                      </p>
                      <h3 className="text-xl font-semibold text-black tracking-tighter">
                        {stat.value}
                      </h3>
                      <p className="font-normal italic text-xs mt-1">
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
            <Card className="col-span-1 border-none shadow-xl shadow-black/5 bg-[#045138] rounded-[32px] text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => setOpenCreateJournalType(true)}
                    className="bg-white text-[#045138] hover:bg-white/90 font-bold rounded-xl h-12 px-6"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Journal Type
                  </Button>
                  <Button
                    onClick={() => setOpenCreatePartnerType(true)}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 font-bold rounded-xl h-12 px-6"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Partner Type
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent
          value="configuration"
          className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Divisions Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-black flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#045138]" />
                  Divisions
                </h2>
                <Badge variant="secondary" className="bg-black/5 text-black">
                  {divisions?.length || 0}
                </Badge>
              </div>
              <div className="space-y-3">
                {divisions?.map((division) => (
                  <Card
                    key={division.reference}
                    className="group border-black/5 hover:border-[#045138]/20 bg-white/60 backdrop-blur-xl transition-all shadow-sm hover:shadow-md rounded-2xl"
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#045138]/5 flex items-center justify-center text-[#045138] group-hover:bg-[#045138] group-hover:text-white transition-colors">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-sm">
                          {division.name}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Journal Types Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-black flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#045138]" />
                  Journal Types
                </h2>
                <Button
                  size="sm"
                  onClick={() => setOpenCreateJournalType(true)}
                  className="h-8 bg-[#045138]/10 hover:bg-[#045138] text-[#045138] hover:text-white border-none rounded-lg text-xs font-semibold uppercase tracking-wider"
                >
                  <Plus className="w-3 h-3 mr-1" /> New
                </Button>
              </div>
              <div className="space-y-3">
                {journalTypes?.map((type) => (
                  <Card
                    key={type.reference}
                    className="group border-black/5 hover:border-[#045138]/20 bg-white/60 backdrop-blur-xl transition-all shadow-sm hover:shadow-md rounded-2xl"
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#045138]/5 flex items-center justify-center text-[#045138] group-hover:bg-[#045138] group-hover:text-white transition-colors">
                        <Settings2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-sm">
                          {type.name}
                        </h3>
                        <p className="text-xs font-medium line-clamp-1">
                          {type.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Partner Types Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-black flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#045138]" />
                  Partner Types
                </h2>
                <Button
                  size="sm"
                  onClick={() => setOpenCreatePartnerType(true)}
                  className="h-8 bg-[#045138]/10 hover:bg-[#045138] text-[#045138] hover:text-white border-none rounded-lg text-xs font-semibold uppercase tracking-wider"
                >
                  <Plus className="w-3 h-3 mr-1" /> New
                </Button>
              </div>
              <div className="space-y-3">
                {partnerTypes?.map((type) => (
                  <Card
                    key={type.reference}
                    className="group border-black/5 hover:border-[#045138]/20 bg-white/60 backdrop-blur-xl transition-all shadow-sm hover:shadow-md rounded-2xl"
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#045138]/5 flex items-center justify-center text-[#045138] group-hover:bg-[#045138] group-hover:text-white transition-colors">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black text-sm">
                          {type.name}
                        </h3>
                        <p className="text-xs font-medium line-clamp-1">
                          {type.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ReportsDashboard />
        </TabsContent>
      </Tabs>

      {/* Manual Modals */}
      {openCreateJournalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl animate-in zoom-in-95 duration-200">
            <Button
              onClick={() => setOpenCreateJournalType(false)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-red-50 hover:text-red-600 z-10"
              size="icon"
            >
              <X className="w-5 h-5" />
            </Button>
            <CreateJournalType
              rolePrefix="finance"
              onSuccess={() => setOpenCreateJournalType(false)}
            />
          </div>
        </div>
      )}

      {openCreatePartnerType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl animate-in zoom-in-95 duration-200">
            <Button
              onClick={() => setOpenCreatePartnerType(false)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-black shadow-lg hover:bg-red-50 hover:text-red-600 z-10"
              size="icon"
            >
              <X className="w-5 h-5" />
            </Button>
            <CreatePartnerType
              rolePrefix="finance"
              onSuccess={() => setOpenCreatePartnerType(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
