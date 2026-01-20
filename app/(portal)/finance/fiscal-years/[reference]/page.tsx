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
import CreateJournal from "@/forms/journals/CreateJournal";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function FiscalYearDetail() {
  const { reference } = useParams();
  const { isLoading, data: fiscalYear } = useFetchFinancialYear(
    reference as string,
  );
  const { data: journalTypes, isLoading: isLoadingTypes } =
    useFetchJournalTypes();
  const [openCreateJournal, setOpenCreateJournal] = useState(false);
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
    <div className="space-y-6 pb-12">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
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
                  Fiscal Years
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{fiscalYear.code}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#045138] flex items-center justify-center text-white shadow-md shadow-[#045138]/20">
              <CalendarRange className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black tracking-tighter italic leading-none">
                {fiscalYear.code}
              </h1>
              <div className="flex items-center gap-2 mt-1">
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

        {/* create journal */}
        {fiscalYear.is_active === true && (
          <Button
            onClick={() => handleCreateJournal()}
            className="h-10 px-4 bg-[#045138] hover:bg-black text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            New Journal Batch
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            label: "Journal Entries",
            value: `${fiscalYear.journals?.length || 0} Records`,
            color: "text-[#045138]",
            bg: "bg-green-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                  {stat.label}
                </p>
                <p className="text-base font-bold text-black tracking-tight">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pt-2">
        {/* Associated Journals Section (Left - 4/5) */}
        <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-black tracking-tight">
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
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/40">
              Quick Entry
            </h3>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="space-y-2 sticky top-6">
            {journalTypes?.map((type) => (
              <Card
                key={type.reference}
                onClick={() => handleCreateJournal(type.name)}
                className="group cursor-pointer border-none shadow-sm hover:shadow-md transition-all duration-200 bg-white rounded-lg overflow-hidden"
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-[#045138]/5 group-hover:bg-[#045138] flex items-center justify-center text-[#045138] group-hover:text-white transition-colors duration-200 flex-shrink-0">
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
      {openCreateJournal && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <CreateJournal
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
