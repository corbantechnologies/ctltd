"use client";

import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { useFetchDivision } from "@/hooks/divisions/actions";
import { useParams } from "next/navigation";
import {
  Building2,
  History,
  Calendar,
  Hash,
  Activity,
  ArrowUpRight,
  Receipt,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DivisionDetail() {
  const { reference } = useParams<{ reference: string }>();

  const { isLoading: isLoadingDivision, data: division } =
    useFetchDivision(reference);

  if (isLoadingDivision) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/director/divisions">
              Divisions
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/director/divisions/${division?.reference}`}>
              {division?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#D0402B] flex items-center justify-center text-white shadow-lg shadow-[#D0402B]/20">
              <Building2 className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D0402B]">
              Division Insight
            </p>
          </div>
          <h1 className="text-xl font-bold text-black tracking-tighter">
            {division?.name}
          </h1>
          <p className="text-black/40 font-bold mt-1 text-sm">
            Detailed operational and financial overview for {division?.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {division?.is_active ? (
            <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl">
              Operational
            </Badge>
          ) : (
            <Badge className="bg-black/5 text-black/40 border-none font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl">
              Inactive
            </Badge>
          )}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/60 backdrop-blur-xl border-black/5 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black/40">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">
                  Established
                </p>
                <p className="text-lg font-bold text-black tracking-tight">
                  {division?.created_at
                    ? new Date(division.created_at).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-xl border-black/5 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black/40">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">
                  Partners
                </p>
                <p className="text-lg font-bold text-black tracking-tight">
                  {division?.partners?.length || 0} Registered
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 backdrop-blur-xl border-black/5 shadow-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black/40">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">
                  Department Type
                </p>
                <p className="text-lg font-bold text-black tracking-tight uppercase">
                  Operational Unit
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partners List Section */}
      <Card className="bg-white/60 backdrop-blur-xl border-black/5 shadow-sm rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-black/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#045138]/10 flex items-center justify-center text-[#045138]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-black tracking-tight">
                Associated Partners
              </h3>
              <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
                Team Members & Stakeholders
              </p>
            </div>
          </div>
          <Badge className="bg-black text-white hover:bg-black/90 border-none">
            {division?.partners?.length || 0} Members
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5 bg-black/5">
                <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                  Date
                </th>
                <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                  Reference
                </th>
                <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                  Batch
                </th>
                <th className="text-right py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                  Debit
                </th>
                <th className="text-right py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                  Credit
                </th>
                <th className="text-right py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {division?.journal_entries &&
                division.journal_entries.length > 0 ? (
                division.journal_entries.map((entry) => (
                  <tr
                    key={entry.reference}
                    className="hover:bg-orange-50/20 transition-colors group"
                  >
                    <td className="py-2.5 px-4 border-b border-black/5">
                      <p className="text-sm font-medium text-black">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] text-black/40 mt-0.5">
                        {new Date(entry.created_at).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="py-2.5 px-4 border-b border-black/5">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-3.5 h-3.5 text-[#D0402B]" />
                        <p className="text-sm font-medium text-black">
                          {entry.reference}
                        </p>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 border-b border-black/5">
                      <Badge className="bg-black/5 text-black/70 hover:bg-black hover:text-white transition-all border-none font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 shadow-none">
                        {entry.journal}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-4 text-right border-b border-black/5">
                      <p className="text-sm font-bold text-black/80">
                        {entry.currency}{" "}
                        {parseFloat(entry.debit).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </td>
                    <td className="py-2.5 px-4 text-right border-b border-black/5">
                      <p className="text-sm font-bold text-[#D0402B]">
                        {entry.currency}{" "}
                        {parseFloat(entry.credit).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </td>
                    <td className="py-2.5 px-4 border-b border-black/5">
                      <div className="flex justify-center">
                        <button className="w-7 h-7 rounded-md bg-black/5 text-black flex items-center justify-center hover:bg-[#D0402B] hover:text-white transition-all">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black/20 mb-3">
                        <History className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-black/30 uppercase tracking-widest">
                        No financial entries found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div >
  );
}
