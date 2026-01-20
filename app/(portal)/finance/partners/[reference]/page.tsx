"use client";

import { useFetchPartner } from "@/hooks/partners/actions";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import UpdatePartner from "@/forms/partners/UpdatePartner";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Building2,
  Calendar,
  CreditCard,
  Edit2,
  Receipt,
  FileText,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PartnerDetailPage() {
  const { reference } = useParams();
  const router = useRouter();
  const { isLoading, data: partner } = useFetchPartner(reference as string);
  const [openUpdatePartner, setOpenUpdatePartner] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (!partner)
    return (
      <div className="p-12 text-center font-bold text-black/20">
        Partner not found.
      </div>
    );

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/finance/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/finance/partners">
              Partners Hub
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{partner.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full border-black/5 bg-white shadow-sm hover:bg-black/5"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Badge
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border-none ${
                partner.is_active
                  ? "bg-green-500/10 text-green-600 shadow-sm shadow-green-500/10"
                  : "bg-red-500/10 text-red-600 shadow-sm shadow-red-500/10"
              }`}
            >
              {partner.is_active ? "Active Partner" : "Inactive Partner"}
            </Badge>
          </div>
          <div>
            <h1 className="text-xl font-bold text-black tracking-tighter mb-2">
              {partner.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm font-bold ">
              <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg border border-black/5">
                <Building2 className="w-4 h-4" /> {partner.partner_type}
              </span>
              {(partner.division || "Global") && (
                <span className="bg-[#045138]/10 text-[#045138] px-3 py-1 rounded-lg uppercase tracking-wider text-[10px]">
                  {partner.division || "Global Division"}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={() => setOpenUpdatePartner(true)}
          className="h-12 bg-white hover:bg-black/5 text-black border border-black/5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm flex items-center gap-2 transition-all"
        >
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-[24px] shadow-sm">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest  flex items-center gap-2">
              <Mail className="w-3 h-3" /> Contact Info
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2 space-y-2">
            <div className="font-bold text-black truncate">{partner.email}</div>
            <div className="font-bold text-black/60">{partner.phone}</div>
          </CardContent>
        </Card>
        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-[24px] shadow-sm">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest  flex items-center gap-2">
              <CreditCard className="w-3 h-3" /> Financial Meta
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold ">Currency</span>
              <span className="font-bold text-black">{partner.currency}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold ">Tax PIN</span>
              <span className="font-bold text-black font-mono">
                {partner.tax_pin || "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-black/5 bg-white/60 backdrop-blur-xl rounded-[24px] shadow-sm">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest  flex items-center gap-2">
              <Calendar className="w-3 h-3" /> Terms & Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold ">WHT Rate</span>
              <span className="font-bold text-black">{partner.wht_rate}%</span>
            </div>
            <div className="text-xs font-bold text-black/60 truncate mt-1">
              {partner.payment_terms || "Standard Terms"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History (Journal Entries) */}
      <Card className="border-black/5 bg-white/50 backdrop-blur-xl rounded-[32px] overflow-hidden shadow-xl shadow-black/5 pb-12">
        <div className="p-8 border-b border-black/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl font-bold text-black tracking-tight flex items-center gap-3">
            <Receipt className="w-5 h-5 text-[#045138]" />
            Transaction Ledger
          </h3>
          <span className="bg-black/5 px-3 py-1 rounded-full text-xs font-bold text-black/60">
            {partner.journal_entries?.length || 0} Records
          </span>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black/5 border-b border-black/5 text-left">
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest ">
                    Book & Date
                  </th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest  text-right">
                    Debit
                  </th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest  text-right">
                    Credit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 font-medium text-sm">
                {partner.journal_entries?.map((entry) => (
                  <tr
                    key={entry.reference}
                    className="hover:bg-white/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-black">{entry.book}</div>
                      <div className="text-[10px] uppercase  tracking-wider">
                        {entry.created_at
                          ? new Date(entry.created_at).toLocaleDateString()
                          : "—"}
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono text-black/80">
                      {parseFloat(entry.debit) > 0
                        ? new Intl.NumberFormat("en-KE", {
                            style: "decimal",
                            minimumFractionDigits: 2,
                          }).format(parseFloat(entry.debit))
                        : "—"}
                    </td>
                    <td className="p-4 text-right font-mono text-black/80">
                      {parseFloat(entry.credit) > 0
                        ? new Intl.NumberFormat("en-KE", {
                            style: "decimal",
                            minimumFractionDigits: 2,
                          }).format(parseFloat(entry.credit))
                        : "—"}
                    </td>
                  </tr>
                ))}
                {(!partner.journal_entries ||
                  partner.journal_entries.length === 0) && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center">
                      No transactions recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Manual Modal Implementation for Update Partner */}
      {openUpdatePartner && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
          <UpdatePartner
            partner={partner}
            rolePrefix="finance"
            onSuccess={() => setOpenUpdatePartner(false)}
            onClose={() => setOpenUpdatePartner(false)}
            className="min-h-screen border-none shadow-none rounded-none"
          />
        </div>
      )}
    </div>
  );
}
