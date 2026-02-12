"use client";

import { useFetchFinancialYear } from "@/hooks/financialyears/actions";
import { useFetchJournalTypes } from "@/hooks/journaltypes/actions";
import FiscalYearJournals from "@/components/financialyears/FiscalYearJournals";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import {
  CalendarRange,
  Calendar,
  Activity,
  Plus,
  BookOpen,
  ArrowRight,
  UserPlus,
  Settings2,
  BookPlus,
  ChevronDown,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateJournal from "@/forms/journals/CreateJournal";
import CreatePartner from "@/forms/partners/CreatePartner";
import CreatePartnerType from "@/forms/partnertypes/CreatePartnerType";
import CreateJournalType from "@/forms/journaltypes/CreateJournalType";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function FiscalYearDetail() {
  const { reference } = useParams();
  const {
    isLoading,
    data: fiscalYear,
    refetch: refetchFiscalYear,
  } = useFetchFinancialYear(reference as string);
  const { data: journalTypes, isLoading: isLoadingTypes } =
    useFetchJournalTypes();
  const [openCreateJournal, setOpenCreateJournal] = useState(false);
  const [openPartner, setOpenPartner] = useState(false);
  const [openPartnerType, setOpenPartnerType] = useState(false);
  const [openJournalType, setOpenJournalType] = useState(false);

  const [selectedJournalType, setSelectedJournalType] = useState<
    string | undefined
  >();
  const queryClient = useQueryClient();

  if (isLoading || isLoadingTypes) return <LoadingSpinner />;
  if (!fiscalYear)
    return (
      <div className="p-12 text-center font-bold text-gray-300">
        Fiscal Year not found.
      </div>
    );

  const handleCreateJournal = (type?: string) => {
    setSelectedJournalType(type);
    setOpenCreateJournal(true);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/finance/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/finance/fiscal-years">
                  Years
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {fiscalYear.code}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#045138] flex items-center justify-center text-white shadow-md shadow-[#045138]/20">
              <CalendarRange className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-black tracking-tight leading-none">
                {fiscalYear.code}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  {fiscalYear.estimated_profit}
                </span>
                {fiscalYear.is_active ? (
                  <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      Active
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      Closed
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Dropdown */}
        {fiscalYear.is_active && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-9 px-4 bg-[#045138] hover:bg-black text-white rounded-xl text-[10px] uppercase font-bold tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New
                  <ChevronDown className="w-3 h-3 opacity-50 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 rounded-xl p-2 bg-white">
                <DropdownMenuLabel className="text-xs uppercase tracking-widest text-black/40 font-bold px-2 py-1.5">
                  Transactions
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => handleCreateJournal()}
                  className="rounded-lg p-2 focus:bg-[#045138]/5 focus:text-[#045138] cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-md bg-[#045138]/10 text-[#045138] flex items-center justify-center mr-3">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">Journal Entry</span>
                    <span className="text-[9px] text-black/50">Record new transaction</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-black/5" />

                <DropdownMenuLabel className="text-xs uppercase tracking-widest text-black/40 font-bold px-2 py-1.5">
                  Entities & Configuration
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => setOpenPartner(true)}
                  className="rounded-lg p-2 focus:bg-[#045138]/5 focus:text-[#045138] cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center mr-3">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">New Partner</span>
                    <span className="text-[9px] text-black/50">Register supplier/customer</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setOpenPartnerType(true)}
                  className="rounded-lg p-2 focus:bg-[#045138]/5 focus:text-[#045138] cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
                    <Settings2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">Partner Type</span>
                    <span className="text-[9px] text-black/50">Define partner category</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setOpenJournalType(true)}
                  className="rounded-lg p-2 focus:bg-[#045138]/5 focus:text-[#045138] cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center mr-3">
                    <BookPlus className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs">Journal Type</span>
                    <span className="text-[9px] text-black/50">Configure ledger types</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Hidden Dialogs Controlled by State */}
            <Dialog open={openPartnerType} onOpenChange={setOpenPartnerType}>
              <DialogContent className="max-w-2xl bg-transparent border-none p-0 shadow-none">
                <CreatePartnerType onSuccess={() => setOpenPartnerType(false)} rolePrefix="finance" />
              </DialogContent>
            </Dialog>

            <Dialog open={openPartner} onOpenChange={setOpenPartner}>
              <DialogContent className="max-w-3xl bg-transparent border-none p-0 shadow-none">
                <CreatePartner onSuccess={() => setOpenPartner(false)} onClose={() => setOpenPartner(false)} rolePrefix="finance" />
              </DialogContent>
            </Dialog>

            <Dialog open={openJournalType} onOpenChange={setOpenJournalType}>
              <DialogContent className="max-w-xl bg-transparent border-none p-0 shadow-none">
                <CreateJournalType onSuccess={() => setOpenJournalType(false)} rolePrefix="finance" />
              </DialogContent>
            </Dialog>

          </div>
        )}
      </div>

      {/* Compact Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            icon: Calendar,
            label: "Start Date",
            value: new Date(fiscalYear.start_date).toLocaleDateString(),
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            icon: Calendar,
            label: "End Date",
            value: new Date(fiscalYear.end_date).toLocaleDateString(),
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            icon: Activity,
            label: "Total Entries",
            value: `${fiscalYear.journals?.length || 0}`,
            color: "text-[#045138]",
            bg: "bg-green-50",
          },
          {
            icon: BookOpen,
            label: "J. Types",
            value: `${journalTypes?.length || 0}`,
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3"
          >
            <div
              className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}
            >
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-widest text-black/40">
                {stat.label}
              </p>
              <p className="text-sm font-bold text-black tracking-tight">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pt-2">
        {/* Associated Journals Section (Left - 4/5) */}
        <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-black tracking-tight">
              Period Journals
            </h2>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <FiscalYearJournals
            journals={fiscalYear.journals || []}
            rolePrefix="finance"
            fiscalYearReference={reference as string}
          />
        </div>

        {/* Journal Types List (Right - 1/4) */}
        <div className="lg:col-span-1 space-y-3 order-1 lg:order-2">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[9px] font-bold uppercase tracking-widest text-black/50">
              Quick Entry
            </h3>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="space-y-2 sticky top-6">
            {journalTypes?.map((type) => (
              <Card
                key={type.reference}
                onClick={() => handleCreateJournal(type.name)}
                className="group cursor-pointer border-none shadow-sm hover:shadow-md transition-all duration-200 bg-white rounded-xl overflow-hidden"
              >
                <CardContent className="flex items-center gap-3 p-3">
                  <div className="w-8 h-8 rounded-lg bg-[#045138]/5 group-hover:bg-[#045138] flex items-center justify-center text-[#045138] group-hover:text-white transition-colors duration-200 flex-shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-black text-xs truncate group-hover:text-[#045138] transition-colors">
                      {type.name}
                    </h3>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#045138] transition-colors" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Manual Modal Implementation for Create Journal */}
      {/* Kept existing logic for Journal Batch creation as it has custom routing/logic */}
      {openCreateJournal && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <CreateJournal
            refetch={refetchFiscalYear}
            fiscalYear={fiscalYear?.code}
            initialJournalType={selectedJournalType}
            rolePrefix="finance"
            onSuccess={() => setOpenCreateJournal(false)}
            onClose={() => setOpenCreateJournal(false)}
            className="min-h-screen border-none shadow-none rounded-none"
          />
        </div>
      )}
    </div>
  );
}
