"use client";

import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { useFetchBook } from "@/hooks/books/actions";
import { useParams } from "next/navigation";
import {
  Book as BookIcon,
  History,
  ArrowUpRight,
  Receipt,
  ShieldCheck,
  Landmark,
  Activity,
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

export default function FinanceBookDetailPage() {
  const { reference, book_reference } = useParams<{
    reference: string;
    book_reference: string;
  }>();

  const { isLoading: isLoadingBook, data: book } = useFetchBook(book_reference);

  if (isLoadingBook) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/finance">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/finance/coa">COA</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/finance/coa/${reference}`}>
              {book?.account_type}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/finance/coa/${reference}/${book?.reference}`}
            >
              {book?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#045138] flex items-center justify-center text-white shadow-lg shadow-[#045138]/20">
              {book?.is_bank ? (
                <Landmark className="w-4 h-4" />
              ) : (
                <BookIcon className="w-4 h-4" />
              )}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#045138]">
              Ledger Account Deep-Dive
            </p>
          </div>
          <h1 className="text-xl font-bold text-black tracking-tighter">
            {book?.name}
          </h1>
          <p className="text-black/40 font-bold mt-1 text-sm italic">
            Classification:{" "}
            <span className="text-black uppercase">{book?.account_type}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {book?.is_active ? (
            <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl">
              Active Ledger
            </Badge>
          ) : (
            <Badge className="bg-black/5 text-black/40 border-none font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl">
              Retired
            </Badge>
          )}
        </div>
      </div>

      {/* Meta Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-black/5 bg-white/50 backdrop-blur-xl rounded-[28px] overflow-hidden shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-black/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                  Registry Code
                </p>
                <p className="text-base font-bold text-black tracking-tight">
                  {book?.code}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 bg-white/50 backdrop-blur-xl rounded-[28px] overflow-hidden shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-black/40">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                  Tax Compliance
                </p>
                <div className="flex items-center gap-2">
                  {book?.is_tax ? (
                    <Badge className="bg-orange-500/10 text-orange-600 border-none text-[10px] font-bold px-2 py-0.5 rounded-full">
                      TAXABLE
                    </Badge>
                  ) : (
                    <p className="text-xs font-bold text-black/20">
                      Non-Taxable
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 bg-white/50 backdrop-blur-xl rounded-[28px] overflow-hidden shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-black/40">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                  Financial Channel
                </p>
                <p className="text-xs font-bold text-black">
                  {book?.is_bank
                    ? "Banking Institution"
                    : book?.is_cash
                      ? "Cash Account"
                      : "General Ledger"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 bg-white/50 backdrop-blur-xl rounded-[28px] overflow-hidden shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-black/40">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                  Internal Ref
                </p>
                <p className="text-xs font-mono font-bold text-black truncate max-w-[120px]">
                  {book?.reference}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="border-black/5 bg-white/50 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-xl shadow-black/5 pb-6">
        <CardHeader className="p-8 border-b border-black/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#045138]/10 flex items-center justify-center text-[#045138]">
                <History className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-black tracking-tight">
                  Ledger History
                </CardTitle>
                <CardDescription className="text-black/30 font-bold uppercase text-[9px] tracking-widest mt-0.5">
                  Chronological Transaction Records
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 bg-black/5">
                  <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Post Date
                  </th>
                  <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Reference
                  </th>
                  <th className="text-left py-2 px-4 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    Partner / Branch
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
                {book?.journal_entries && book.journal_entries.length > 0 ? (
                  book.journal_entries.map((entry) => (
                    <tr
                      key={entry.reference}
                      className="hover:bg-green-50/20 transition-colors group"
                    >
                      <td className="py-2.5 px-4 border-b border-black/5">
                        <p className="text-sm font-medium text-black">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-[10px] font-bold text-black/30 uppercase mt-0.5">
                          {new Date(entry.created_at).toLocaleTimeString()}
                        </p>
                      </td>
                      <td className="py-2.5 px-4 border-b border-black/5">
                        <div className="flex items-center gap-2">
                          <Receipt className="w-3.5 h-3.5 text-[#045138]" />
                          <p className="text-sm font-medium text-black">
                            {entry.reference}
                          </p>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 border-b border-black/5">
                        <Badge className="bg-black/5 text-black hover:bg-black hover:text-white transition-all border-none font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-none">
                          {entry.division || "Entity Core"}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-4 border-b border-black/5 text-right">
                        <p className="text-sm font-medium text-green-600">
                          {entry.currency}{" "}
                          {parseFloat(entry.debit).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </td>
                      <td className="py-2.5 px-4 border-b border-black/5 text-right">
                        <p className="text-sm font-medium text-[#045138]">
                          {entry.currency}{" "}
                          {parseFloat(entry.credit).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </td>
                      <td className="py-2.5 px-4 border-b border-black/5">
                        <div className="flex justify-center">
                          <button className="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-[#045138]">
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
                          No financial history detected
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
    </div>
  );
}
