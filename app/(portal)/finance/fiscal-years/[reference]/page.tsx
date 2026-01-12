"use client";

import { useFetchFinancialYear } from "@/hooks/financialyears/actions";
import FiscalYearJournals from "@/components/financialyears/FiscalYearJournals";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { CalendarRange, Edit3, Calendar, Activity } from "lucide-react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function FiscalYearDetail() {
  const { reference } = useParams();
  const { isLoading, data: fiscalYear } = useFetchFinancialYear(
    reference as string
  );

  if (isLoading) return <LoadingSpinner />;
  if (!fiscalYear)
    return (
      <div className="p-12 text-center font-black text-gray-300">
        Fiscal Year not found.
      </div>
    );

  return (
    <div className="space-y-12 pb-12">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
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

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#045138] flex items-center justify-center text-white shadow-xl shadow-[#045138]/20">
              <CalendarRange className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-black tracking-tighter italic leading-none">
                {fiscalYear.code}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-black text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg">
                  REF: {fiscalYear.reference}
                </Badge>
                {fiscalYear.is_active ? (
                  <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Active
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Closed
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-lg font-black text-black tracking-tight">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Associated Journals Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100" />
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black">
            Period Journal Entries
          </h2>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <FiscalYearJournals
          journals={fiscalYear.journals || []}
          rolePrefix="finance"
          fiscalYearReference={reference as string}
        />
      </div>
    </div>
  );
}
