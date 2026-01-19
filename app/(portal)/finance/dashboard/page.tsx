"use client";

import { useState } from "react";
import { useFetchDivisions } from "@/hooks/divisions/actions";
import { useFetchJournalTypes } from "@/hooks/journaltypes/actions";
import { useFetchPartnerTypes } from "@/hooks/partnertypes/actions";
import { useFetchCOAs } from "@/hooks/coa/actions"; // analytics
import CreateJournalType from "@/forms/journaltypes/CreateJournalType";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePartnerType from "@/forms/partnertypes/CreatePartnerType";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Settings2,
  Users,
  Plus,
  BookOpen,
  X,
  Building2,
  Briefcase,
} from "lucide-react";

export default function FinanceDashboard() {
  const { data: divisions, isLoading: isLoadingDivisions } =
    useFetchDivisions();
  const { data: journalTypes, isLoading: isLoadingJournalTypes } =
    useFetchJournalTypes();
  const { data: partnerTypes, isLoading: isLoadingPartnerTypes } =
    useFetchPartnerTypes();
  const { data: coas } = useFetchCOAs();

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
    {
      label: "Chart of Accounts",
      value: coas?.length || 0,
      icon: Layers,
      description: "Active Ledgers",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-black tracking-tighter">
            Finance Portal
          </h1>
          <p className="text-sm text-black/60 font-medium mt-1">
            Overview and system configuration
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/50 backdrop-blur-md p-1 rounded-xl border border-black/5 h-auto">
          <TabsTrigger
            value="overview"
            className="rounded-lg px-4 py-2 text-sm font-bold data-[state=active]:bg-[#045138] data-[state=active]:text-white transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="configuration"
            className="rounded-lg px-4 py-2 text-sm font-bold data-[state=active]:bg-[#045138] data-[state=active]:text-white transition-all"
          >
            Configuration
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab (Analytics) */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="border-none shadow-lg shadow-black/5 bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden"
              >
                <CardContent className="p-5 relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#045138]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#045138]/10 flex items-center justify-center text-[#045138]">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-black/40 font-black uppercase tracking-widest text-[9px] mb-1">
                        {stat.label}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-black text-black tracking-tighter">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg shadow-black/5 bg-[#045138] rounded-2xl text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-black">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => setOpenCreateJournalType(true)}
                    className="bg-white text-[#045138] hover:bg-white/90 font-bold rounded-lg h-10 px-4 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Journal Type
                  </Button>
                  <Button
                    onClick={() => setOpenCreatePartnerType(true)}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 font-bold rounded-lg h-10 px-4 text-sm"
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
          className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Divisions Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-black flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#045138]" />
                  Divisions
                </h2>
                <Badge
                  variant="secondary"
                  className="bg-black/5 text-black text-xs"
                >
                  {divisions?.length || 0}
                </Badge>
              </div>
              <div className="space-y-2">
                {divisions?.map((division) => (
                  <Card
                    key={division.reference}
                    className="group border-black/5 hover:border-[#045138]/20 bg-white/60 backdrop-blur-xl transition-all shadow-sm hover:shadow-md rounded-xl"
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#045138]/5 flex items-center justify-center text-[#045138] group-hover:bg-[#045138] group-hover:text-white transition-colors">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-black text-xs md:text-sm">
                          {division.name}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Journal Types Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-black flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#045138]" />
                  Journal Types
                </h2>
                <Button
                  size="sm"
                  onClick={() => setOpenCreateJournalType(true)}
                  className="h-7 bg-[#045138]/10 hover:bg-[#045138] text-[#045138] hover:text-white border-none rounded-md text-[10px] font-black uppercase tracking-wider px-2"
                >
                  <Plus className="w-3 h-3 mr-1" /> New
                </Button>
              </div>
              <div className="space-y-2">
                {journalTypes?.map((type) => (
                  <Card
                    key={type.reference}
                    className="group border-black/5 hover:border-[#045138]/20 bg-white/60 backdrop-blur-xl transition-all shadow-sm hover:shadow-md rounded-xl"
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#045138]/5 flex items-center justify-center text-[#045138] group-hover:bg-[#045138] group-hover:text-white transition-colors">
                        <Settings2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-black text-xs md:text-sm">
                          {type.name}
                        </h3>
                        <p className="text-[9px] font-bold text-black/40 line-clamp-1">
                          {type.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Partner Types Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-black flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#045138]" />
                  Partner Types
                </h2>
                <Button
                  size="sm"
                  onClick={() => setOpenCreatePartnerType(true)}
                  className="h-7 bg-[#045138]/10 hover:bg-[#045138] text-[#045138] hover:text-white border-none rounded-md text-[10px] font-black uppercase tracking-wider px-2"
                >
                  <Plus className="w-3 h-3 mr-1" /> New
                </Button>
              </div>
              <div className="space-y-2">
                {partnerTypes?.map((type) => (
                  <Card
                    key={type.reference}
                    className="group border-black/5 hover:border-[#045138]/20 bg-white/60 backdrop-blur-xl transition-all shadow-sm hover:shadow-md rounded-xl"
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#045138]/5 flex items-center justify-center text-[#045138] group-hover:bg-[#045138] group-hover:text-white transition-colors">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-black text-xs md:text-sm">
                          {type.name}
                        </h3>
                        <p className="text-[9px] font-bold text-black/40 line-clamp-1">
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
