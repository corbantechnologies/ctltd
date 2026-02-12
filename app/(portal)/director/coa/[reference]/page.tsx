"use client";

import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { useFetchCOA } from "@/hooks/coa/actions";
import { useParams } from "next/navigation";
import {
  Database,
  Book as BookIcon,
  ShieldCheck,
  Hash,
  ArrowUpDown,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BooksList from "@/components/coa/BooksList";

export default function COADetailPage() {
  const { reference } = useParams<{ reference: string }>();

  const { isLoading: isLoadingCOA, data: coa } = useFetchCOA(reference);

  if (isLoadingCOA) {
    return <LoadingSpinner />;
  }

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
            <BreadcrumbLink href="/director/coa">COA</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/director/coa/${coa?.reference}`}>
              {coa?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#D0402B] flex items-center justify-center text-white shadow-lg shadow-[#D0402B]/20">
              <Hash className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D0402B]">
              Account Classification
            </p>
          </div>
          <h1 className="text-xl font-bold text-black tracking-tighter">
            {coa?.name}
          </h1>
          <p className="text-black/40 font-bold mt-1 text-sm italic">
            Registry Code: <span className="text-black">{coa?.code}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {coa?.is_active ? (
            <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl">
              Active Classification
            </Badge>
          ) : (
            <Badge className="bg-black/5 text-black/40 border-none font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl">
              Deactivated
            </Badge>
          )}
        </div>
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-black/5 bg-white/50 backdrop-blur-xl rounded-[28px] overflow-hidden shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D0402B]/5 flex items-center justify-center text-[#D0402B]">
                <ArrowUpDown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                  Normal Balance
                </p>
                <p className="text-base font-bold text-black tracking-tight">
                  {coa?.normal_balance} Side
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/30">
                  Current Balance
                </p>
                <p className="text-base font-bold text-green-600 tracking-tight">
                  KES{" "}
                  {parseFloat((coa as any).balance).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-12 border-t border-black/5">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black/40">
              <BookIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black tracking-tight italic">
                Associated Ledger <span className="text-[#D0402B]">Books</span>
              </h2>
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-widest mt-0.5">
                Segmented accounts under {coa?.name}
              </p>
            </div>
          </div>
        </div>

        <BooksList
          books={coa?.books || []}
          rolePrefix="director"
          coaReference={reference}
        />
      </div>
    </div >
  );
}
