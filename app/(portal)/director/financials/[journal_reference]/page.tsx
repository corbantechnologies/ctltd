"use client";

import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { useFetchJournal } from "@/hooks/journals/actions";
import { useParams } from "next/navigation";
import {
  FileText,
  History,
  ArrowUpRight,
  Receipt,
  CheckCircle2,
  Clock,
  Calendar,
  User,
  ExternalLink,
  ArrowRight,
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

export default function JournalDetailPage() {
  const { journal_reference } = useParams<{ journal_reference: string }>();

  const { isLoading: isLoadingJournal, data: journal } =
    useFetchJournal(journal_reference);

  if (isLoadingJournal) {
    return <LoadingSpinner />;
  }

  // Calculate totals
  const totalDebit =
    journal?.journal_entries?.reduce(
      (sum, entry) => sum + parseFloat(entry.debit),
      0,
    ) || 0;
  const totalCredit =
    journal?.journal_entries?.reduce(
      (sum, entry) => sum + parseFloat(entry.credit),
      0,
    ) || 0;

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/director/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/director/financials">
              Financials
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/director/financials/${journal?.reference}`}>
              Journal: {journal?.reference}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#D0402B] flex items-center justify-center text-white shadow-lg shadow-[#D0402B]/20">
              <FileText className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D0402B]">
              Journal Detail Analysis
            </p>
          </div>
          <h1 className="text-xl font-bold text-black tracking-tighter italic">
            {journal?.description || "Financial Record"}
          </h1>
          <p className="text-black/40 font-bold mt-1 text-sm italic">
            Registry Code: <span className="text-black">{journal?.code}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {journal?.is_posted ? (
            <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl">
              <CheckCircle2 className="w-3 h-3 mr-2" /> Posted to Ledger
            </Badge>
          ) : (
            <Badge className="bg-orange-500/10 text-orange-600 border-none font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl text-center">
              <Clock className="w-3 h-3 mr-2" /> Pending Finalization
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">
              Total Debit
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/5 flex items-center justify-center text-green-600">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold text-green-600 tracking-tight">
                KES{" "}
                {totalDebit.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                Total Credit
              </p>
              <p className="text-xl font-bold text-[#D0402B] tracking-tight">
                KES{" "}
                {totalCredit.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nested Entries Table */}
      <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl shadow-black/5 pb-6">
        <CardHeader className="p-8 border-b border-black/5 flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D0402B]/10 flex items-center justify-center text-[#D0402B]">
              <History className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-black tracking-tight italic">
                Journal <span className="text-[#D0402B]">Entries</span>
              </CardTitle>
              <CardDescription className="text-black/30 font-bold uppercase text-[9px] tracking-widest mt-0.5">
                Detailed ledger breakdown for {journal?.reference}
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-black/5 text-black border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-xl">
            {journal?.journal_entries?.length || 0} Line Items
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 bg-black/5">
                  <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Ledger Book
                  </th>
                  <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Division
                  </th>
                  <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Partner
                  </th>
                  <th className="text-right py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Debit
                  </th>
                  <th className="text-right py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Credit
                  </th>
                  <th className="text-right py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60 text-center">
                    Explore
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {journal?.journal_entries &&
                  journal.journal_entries.length > 0 ? (
                  journal.journal_entries.map((entry) => (
                    <tr
                      key={entry.reference}
                      className="hover:bg-orange-50/20 transition-colors group"
                    >
                      <td className="py-2.5 px-4 border-b border-black/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black/40">
                            <Receipt className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-black group-hover:text-[#D0402B] transition-colors">
                              {entry.book}
                            </p>
                            <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest">
                              General Ledger
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 border-b border-black/5">
                        <Badge className="bg-black/5 text-black hover:bg-black hover:text-white transition-all border-none font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-none">
                          {entry.division || "Entity Core"}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-4 border-b border-black/5">
                        <p className="text-xs font-bold text-black/60 truncate max-w-[120px]">
                          {entry.partner || (
                            <span className="text-black/20 italic">
                              No Partner
                            </span>
                          )}
                        </p>
                      </td>
                      <td className="py-2.5 px-4 border-b border-black/5 text-right underline decoration-green-500/20 underline-offset-4 pointer-events-none">
                        <p className="text-sm font-medium text-green-600">
                          {entry.currency}{" "}
                          {parseFloat(entry.debit).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </td>
                      <td className="py-2.5 px-4 border-b border-black/5 text-right underline decoration-[#D0402B]/20 underline-offset-4">
                        <p className="text-sm font-medium text-[#D0402B]">
                          {entry.currency}{" "}
                          {parseFloat(entry.credit).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </td>
                      <td className="py-2.5 px-4 border-b border-black/5">
                        <div className="flex justify-center">
                          <button
                            className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-[#D0402B] shadow-sm"
                            title="View Ledger Detail"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-black/10">
                        <History className="w-12 h-12 mb-4" />
                        <p className="text-xs font-bold uppercase tracking-[0.2em]">
                          No transactional movements found
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Notes / Meta Footer */}
      {journal?.description && (
        <div className="p-8 bg-black/[0.02] border border-black/5 rounded-[32px] border-dashed">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-black/40">
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-black/60 italic">
              Administrative Records &{" "}
              <span className="text-[#D0402B]">Annotations</span>
            </h4>
          </div>
          <p className="text-sm font-bold text-black/40 leading-relaxed max-w-2xl bg-white/40 p-6 rounded-2xl italic shadow-inner">
            &quot;{journal.description}&quot; &mdash; System generated entry for
            internal ledger synchronization. All values are calculated based on
            the underlying transaction data and verified against the
            organization&apos;s fiscal policies.
          </p>
        </div>
      )}
    </div>
  );
}
