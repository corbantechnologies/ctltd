"use client";

import { useFetchQuotations } from "@/hooks/quotations/actions";
import { convertQuotationToInvoice } from "@/services/quotations";
import LoadingSpinner from "@/components/portal/LoadingSpinner";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { downloadPDF } from "@/lib/download";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  FileBadge,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Mail,
  Search,
  ChevronLeft,
  ChevronRight,
  Building2,
  Calendar,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface QuotationsListProps {
  rolePrefix: string;
}

export default function QuotationsList({ rolePrefix }: QuotationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const headers = useAxiosAuth();
  const { isLoading, data: quotations } = useFetchQuotations();

  const filteredQuotations = useMemo(() => {
    if (!quotations) return [];
    return quotations.filter(
      (quotation) =>
        quotation.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (quotation.partner?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (quotation.lead?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [quotations, searchQuery]);

  const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage);
  const paginatedQuotations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredQuotations.slice(start, start + itemsPerPage);
  }, [filteredQuotations, currentPage]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "SENT":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "REJECTED":
        return "bg-red-50 text-red-600 border-red-100";
      case "EXPIRED":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  const handleDownload = async (quotation: any) => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const url = `${backendUrl}/api/v1/quotations/${quotation.reference}/download/`;
    await downloadPDF(url, `Quotation_${quotation.code}.pdf`, headers);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="relative w-full lg:max-w-md group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
          <input
            type="text"
            placeholder="Search quotations by code, client, or lead..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 pl-14 pr-6 rounded border border-slate-200 bg-white focus:border-slate-900 focus:ring-0 transition-all font-semibold text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded shadow-2xl shadow-slate-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="text-left py-6 px-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">Proposal</th>
                <th className="text-left py-6 px-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">Target Entity</th>
                <th className="text-left py-6 px-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">Valid Until</th>
                <th className="text-left py-6 px-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                <th className="text-right py-6 px-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedQuotations.map((quotation) => (
                <tr key={quotation.reference} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                        <FileBadge className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm tracking-tight">{quotation.code}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {new Intl.DateTimeFormat('en-GB').format(new Date(quotation.date))}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-300" />
                      <span className="text-sm font-semibold text-slate-700">{quotation.partner || quotation.lead || "Discovery Lead"}</span>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-300" />
                      {new Intl.DateTimeFormat('en-GB').format(new Date(quotation.expiry_date))}
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border", getStatusStyle(quotation.status))}>
                      {quotation.status === "ACCEPTED" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      {quotation.status}
                    </div>
                  </td>
                  <td className="py-6 px-8 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {quotation.status === "ACCEPTED" && (quotation.partner || quotation.lead) && (
                        <ConvertQuotationToInvoiceButton quotation={quotation} rolePrefix={rolePrefix} />
                      )}
                      <button
                        onClick={() => handleDownload(quotation)}
                        className="w-10 h-10 rounded bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center shadow-lg active:scale-90"
                        title="Download PDF"
                      >
                        <Download className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ConvertQuotationToInvoiceButton({ quotation, rolePrefix }: { quotation: any, rolePrefix: string }) {
  const [isPending, setIsPending] = useState(false);
  const authHeaders = useAxiosAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleConvert = async () => {
    setIsPending(true);
    try {
      const data = await convertQuotationToInvoice(quotation.reference, authHeaders);
      queryClient.invalidateQueries({ queryKey: ["quotations"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Quotation successfully converted to Invoice");
      router.push(`/${rolePrefix}/invoices/${data.invoice_reference}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Conversion failed");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      disabled={isPending}
      onClick={handleConvert}
      className="w-10 h-10 rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-lg active:scale-90 disabled:opacity-50"
      title="Convert to Invoice"
    >
      {isPending ? (
        <RefreshCw className="w-4.5 h-4.5 animate-spin" />
      ) : (
        <RefreshCw className="w-4.5 h-4.5" />
      )}
    </button>
  );
}
