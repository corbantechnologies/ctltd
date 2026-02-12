"use client";

import { useFetchFinancialYear } from "@/hooks/financialyears/actions";
import FiscalYearJournals from "@/components/financialyears/FiscalYearJournals";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { CalendarRange, Calendar, Activity } from "lucide-react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
    reference as string,
  );

  if (isLoading) return <LoadingSpinner />;
  if (!fiscalYear)
    return (
      <div className="p-12 text-center font-bold text-gray-300">
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
                <BreadcrumbLink href="/director/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/director/fiscal-years">
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
              <h1 className="text-xl font-bold text-black tracking-tighter italic leading-none">
                {fiscalYear.code}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-black text-white border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg">
                  REF: {fiscalYear.reference}
                </Badge>
                {fiscalYear.is_active ? (
                  <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Active
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
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
        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black/40">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                  Fiscal Start
                </p>
                <p className="text-base font-bold text-black tracking-tight">
                  {new Date(fiscalYear.start_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black/40">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                  Fiscal End
                </p>
                <p className="text-base font-bold text-black tracking-tight">
                  {new Date(fiscalYear.end_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${fiscalYear.is_active
                  ? "bg-green-500/10 text-green-600"
                  : "bg-black/5 text-black/40"
                  }`}
              >
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                  Status
                </p>
                <p
                  className={`text-base font-bold tracking-tight ${fiscalYear.is_active ? "text-green-600" : "text-black/60"
                    }`}
                >
                  {fiscalYear.is_active ? "Active Period" : "Closed Period"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Associated Journals Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-100" />
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-black">
            Period Journal Entries
          </h2>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <FiscalYearJournals
          journals={fiscalYear.journals || []}
          rolePrefix="director"
          fiscalYearReference={reference as string}
        />
      </div>
    </div>
  );
}
